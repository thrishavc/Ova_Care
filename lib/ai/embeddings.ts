import { GoogleGenAI } from "@google/genai";

// Gemini embeddings for the knowledge base and for search queries.
// Changing the model or dimensions means re-running ingest and rebuilding the vector index.
export const EMBEDDING_MODEL = process.env.GEMINI_EMBEDDING_MODEL || "gemini-embedding-2";
export const EMBEDDING_DIMENSIONS = 768;

const PARALLEL = 5;

let client: GoogleGenAI | null = null;
function getClient() {
  if (!client) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("GEMINI_API_KEY is not set (add it to .env.local)");
    client = new GoogleGenAI({ apiKey });
  }
  return client;
}

type Purpose = "document" | "query";

async function embedOne(text: string, purpose: Purpose): Promise<number[]> {
  const res = await getClient().models.embedContent({
    model: EMBEDDING_MODEL,
    // One text per request: gemini-embedding-2 is multimodal and merges a list of texts
    // into a single vector, so batching would give every chunk the same embedding.
    contents: text,
    config: {
      outputDimensionality: EMBEDDING_DIMENSIONS,
      taskType: purpose === "document" ? "RETRIEVAL_DOCUMENT" : "RETRIEVAL_QUERY",
      abortSignal: AbortSignal.timeout(10_000),
    },
  });
  const values = res.embeddings?.[0]?.values ?? [];
  if (res.embeddings?.length !== 1 || values.length !== EMBEDDING_DIMENSIONS) {
    throw new Error(`Embedding failed: expected 1x${EMBEDDING_DIMENSIONS} vector`);
  }
  return values;
}

/** Embeds texts, a few in parallel. Use "document" for knowledge chunks and "query" for searches. */
export async function embed(texts: string[], purpose: Purpose): Promise<number[][]> {
  const vectors: number[][] = [];
  for (let i = 0; i < texts.length; i += PARALLEL) {
    vectors.push(...(await Promise.all(texts.slice(i, i + PARALLEL).map((t) => embedOne(t, purpose)))));
  }
  return vectors;
}
