// Loads the knowledge base (content/knowledge/*.md) into MongoDB Atlas with vector embeddings.
//
//   npm run ingest                 embed + load content/knowledge/*.md, create the vector index
//   npm run ingest -- --dry-run    only show how the files would be chunked (no API, no DB)
//   options: --dir=<folder>  --collection=<name>
//
// Two file formats are accepted:
//  1. Plain format: "# Title", "## Section" paragraphs, and a "## Sources" list at the end
//     ("- Name: https://…" or "1. Name" followed by the link on the next line). Topic comes from
//     TOPIC_BY_FILE below, language defaults to en.
//  2. A header block (overrides the above):
//   ---
//   title: What is PCOS?
//   sourceTitle: WHO — Polycystic ovary syndrome fact sheet
//   sourceUrl: https://www.who.int/news-room/fact-sheets/detail/polycystic-ovary-syndrome
//   topic: pcos
//   language: en
//   ---
// Every chunk carries all of its file's sources. Re-running is safe: each file's old chunks are
// replaced, and chunks of deleted files removed.

import { createHash } from "node:crypto";
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { getDb, closeDb, COLLECTIONS, VECTOR_INDEX } from "@/lib/db/client";
import { embed, EMBEDDING_DIMENSIONS, EMBEDDING_MODEL } from "@/lib/ai/embeddings";

const MIN_WORDS = 150;
const MAX_WORDS = 300;
// Topic per knowledge file (used for search filters). Unlisted files get "general".
const TOPIC_BY_FILE: Record<string, string> = {
  "pcos-what-is-it.md": "pcos",
  "acne-and-hair-growth.md": "pcos",
  "weight-and-insulin.md": "pcos",
  "tests-doctors-may-suggest.md": "pcos",
  "myths.md": "pcos",
  "irregular-periods.md": "menstrual",
  "when-to-see-a-doctor.md": "care",
  "which-doctor.md": "care",
};

const args = process.argv.slice(2);
const opt = (name: string) => args.find((a) => a.startsWith(`--${name}=`))?.split("=").slice(1).join("=");
const dryRun = args.includes("--dry-run");
const dir = path.resolve(opt("dir") ?? path.join(process.cwd(), "content", "knowledge"));
const collectionName = opt("collection") ?? COLLECTIONS.knowledge;

interface SourceRef {
  title: string;
  url: string;
}

interface Meta {
  title: string;
  topic: string;
  language: string;
  /** First source, kept for simple display */
  sourceTitle: string;
  sourceUrl: string;
  sources: SourceRef[];
}

interface ChunkDoc extends Meta {
  text: string;
  file: string;
  chunkIndex: number;
  contentHash: string;
}

interface SearchIndexInfo {
  name: string;
  status?: string;
  queryable?: boolean;
}

const URL_RE = /https?:\/\/[^\s)>\]]+/;

/** Reads a "## Sources" list: "- Name: https://…" or "1. Name" with the link on the next line. */
function parseSources(section: string): SourceRef[] {
  const sources: SourceRef[] = [];
  let pendingTitle = "";
  for (const line of section.split("\n").map((l) => l.trim()).filter(Boolean)) {
    const url = line.match(URL_RE)?.[0];
    const label = line
      .replace(URL_RE, "")
      .replace(/^(?:[-*]|\d+\.)\s*/, "")
      .replace(/[\s:—–-]+$/, "")
      .trim();
    if (url) {
      const title = label || pendingTitle || new URL(url).hostname;
      if (!sources.some((s) => s.url === url)) sources.push({ title, url });
      pendingTitle = "";
    } else if (label) {
      pendingTitle = label;
    }
  }
  return sources;
}

function parseFile(file: string, raw: string): { meta: Meta; body: string } {
  let text = raw.replace(/\r\n/g, "\n");
  const header: Record<string, string> = {};
  const fenced = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (fenced) {
    for (const line of fenced[1].split("\n")) {
      const kv = line.match(/^\s*([A-Za-z]+)\s*:\s*(.*?)\s*$/);
      if (kv) header[kv[1]] = kv[2].replace(/^["']|["']$/g, "");
    }
    text = fenced[2];
  }

  // Split off the "## Sources" section (everything after it).
  const sourcesAt = text.search(/^#{1,3}\s*(sources|references)\s*$/im);
  const body = sourcesAt >= 0 ? text.slice(0, sourcesAt) : text;
  const sources = sourcesAt >= 0 ? parseSources(text.slice(sourcesAt).replace(/^.*\n/, "")) : [];
  if (header.sourceUrl) {
    sources.unshift({ title: header.sourceTitle || new URL(header.sourceUrl).hostname, url: header.sourceUrl });
  }
  if (sources.length === 0) throw new Error(`${file}: no sources found (add a "## Sources" list with links)`);

  const title = header.title || body.match(/^#\s+(.+)$/m)?.[1]?.trim() || file.replace(/\.md$/, "");
  return {
    meta: {
      title,
      topic: header.topic || TOPIC_BY_FILE[file] || "general",
      language: header.language || "en",
      sourceTitle: sources[0].title,
      sourceUrl: sources[0].url,
      sources,
    },
    // The "# Title" line is stored as `title`, so drop it from the text.
    body: body.replace(/^#\s+.+$/m, ""),
  };
}

const wordCount = (s: string) => s.split(/\s+/).filter(Boolean).length;

/** Groups paragraphs into chunks of ~150-300 words; splits over-long paragraphs by sentence. */
function chunk(body: string): string[] {
  // Keep each "## Section" heading attached to the paragraph after it.
  const paragraphs: string[] = [];
  let heading = "";
  for (const p of body.split(/\n\s*\n/).map((s) => s.replace(/\s+/g, " ").trim()).filter(Boolean)) {
    if (/^#{1,6}\s/.test(p) && wordCount(p) <= 15) {
      heading = heading ? `${heading} ${p}` : p;
      continue;
    }
    paragraphs.push(heading ? `${heading.replace(/^#+\s*/, "")}: ${p}` : p);
    heading = "";
  }

  const pieces: string[] = [];
  for (const para of paragraphs) {
    if (wordCount(para) <= MAX_WORDS) {
      pieces.push(para);
      continue;
    }
    let current = "";
    for (const sentence of para.split(/(?<=[.!?।])\s+/)) {
      if (current && wordCount(current) + wordCount(sentence) > MAX_WORDS) {
        pieces.push(current);
        current = "";
      }
      current = current ? `${current} ${sentence}` : sentence;
    }
    if (current) pieces.push(current);
  }

  const chunks: string[] = [];
  let current = "";
  for (const piece of pieces) {
    if (current && wordCount(current) + wordCount(piece) > MAX_WORDS) {
      chunks.push(current);
      current = "";
    }
    current = current ? `${current}\n\n${piece}` : piece;
    if (wordCount(current) >= MIN_WORDS) {
      chunks.push(current);
      current = "";
    }
  }
  // A short leftover joins the previous chunk if it fits, otherwise stands alone.
  if (current) {
    const last = chunks.at(-1);
    if (last && wordCount(last) + wordCount(current) <= MAX_WORDS) chunks[chunks.length - 1] = `${last}\n\n${current}`;
    else chunks.push(current);
  }
  return chunks;
}

async function ensureVectorIndex() {
  const db = await getDb();
  if (!(await db.listCollections({ name: collectionName }).hasNext())) {
    await db.createCollection(collectionName);
  }
  const col = db.collection(collectionName);
  const existing = await col.listSearchIndexes(VECTOR_INDEX).toArray();
  if (existing.length === 0) {
    console.log(`Creating vector index ${VECTOR_INDEX} (${EMBEDDING_DIMENSIONS} dims, cosine)…`);
    await col.createSearchIndex({
      name: VECTOR_INDEX,
      type: "vectorSearch",
      definition: {
        fields: [
          { type: "vector", path: "embedding", numDimensions: EMBEDDING_DIMENSIONS, similarity: "cosine" },
          { type: "filter", path: "topic" },
          { type: "filter", path: "language" },
        ],
      },
    });
  }
  for (let i = 0; i < 40; i++) {
    const [idx] = (await col.listSearchIndexes(VECTOR_INDEX).toArray()) as SearchIndexInfo[];
    if (idx?.queryable) {
      console.log(`Vector index ${VECTOR_INDEX} is ready.`);
      return;
    }
    if (i === 0) console.log(`Waiting for the vector index to build (status: ${idx?.status ?? "pending"})…`);
    await new Promise((r) => setTimeout(r, 5_000));
  }
  console.warn("Vector index is still building — searches will work once Atlas shows it as READY.");
}

const files = readdirSync(dir).filter((f) => f.endsWith(".md") && f.toLowerCase() !== "readme.md").sort();
if (files.length === 0) {
  console.log(`No knowledge files in ${dir} yet (README.md is skipped).`);
  process.exit(0);
}

const docs: ChunkDoc[] = [];
let problems = 0;
for (const file of files) {
  try {
    const { meta, body } = parseFile(file, readFileSync(path.join(dir, file), "utf8"));
    chunk(body).forEach((text, chunkIndex) => {
      docs.push({
        ...meta,
        text,
        file,
        chunkIndex,
        contentHash: createHash("sha256").update(text).digest("hex").slice(0, 16),
      });
    });
  } catch (err) {
    problems++;
    console.error(`✗ ${(err as Error).message}`);
  }
}

console.log(`${files.length} files → ${docs.length} chunks${problems ? `, ${problems} file(s) skipped` : ""}`);
for (const d of docs) {
  console.log(`  ${d.file} #${d.chunkIndex}: ${wordCount(d.text)} words [${d.topic}/${d.language}]`);
}
if (dryRun) process.exit(problems ? 1 : 0);

console.log(`Embedding with ${EMBEDDING_MODEL}…`);
const vectors = await embed(docs.map((d) => `${d.title}\n\n${d.text}`), "document");
const now = new Date();
const withVectors = docs.map((d, i) => ({ ...d, embedding: vectors[i], ingestedAt: now }));

const col = (await getDb()).collection(collectionName);
const loadedFiles = [...new Set(docs.map((d) => d.file))];
for (const file of loadedFiles) {
  await col.deleteMany({ file });
  await col.insertMany(withVectors.filter((d) => d.file === file));
}
const removed = await col.deleteMany({ file: { $nin: loadedFiles } });
console.log(`Loaded ${withVectors.length} chunks into ${collectionName}` +
  (removed.deletedCount ? ` (removed ${removed.deletedCount} from deleted files)` : ""));

await ensureVectorIndex();
await closeDb();
process.exitCode = problems ? 1 : 0;
