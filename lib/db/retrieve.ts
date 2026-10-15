// Finds the trusted source passages for an answer.
// /api/analyze depends on this signature — keep it.
import { getDb, COLLECTIONS, VECTOR_INDEX } from "@/lib/db/client";
import { embed } from "@/lib/ai/embeddings";

export interface KnowledgeChunk {
  text: string;
  topic: string;
  language: string;
  sourceTitle: string;
  sourceUrl: string;
  /** Every source listed for the passage's file (sourceTitle/sourceUrl is the first). */
  sources?: { title: string; url: string }[];
}

// $vectorSearch cosine scores run 0-1 (1 = identical). Measured with gemini-embedding-2 on our
// 18 chunks (2026-10-15): relevant questions score 0.82-0.94, unrelated ones ("I feel tired",
// "headache", "weather today") at most 0.81. Below the cut-off we cite nothing and the user gets
// the safe "see a doctor" answer. Re-check when the knowledge base grows.
const MIN_SCORE = Number(process.env.RETRIEVE_MIN_SCORE ?? 0.82);
const CANDIDATES_PER_RESULT = 20;

export interface RetrieveOptions {
  /** Only search these topics, e.g. ["pcos", "menstrual"] */
  topics?: string[];
}

/**
 * Returns up to `limit` knowledge chunks most relevant to `query`.
 * Never throws: if the database or embeddings are down it returns [] and the
 * pipeline gives its safe "see a doctor" answer.
 */
export async function retrieve(
  query: string,
  limit = 5,
  { topics }: RetrieveOptions = {},
): Promise<KnowledgeChunk[]> {
  if (!query.trim()) return [];
  try {
    const [queryVector] = await embed([query], "query");
    const db = await getDb();
    const results = await db
      .collection(COLLECTIONS.knowledge)
      .aggregate<KnowledgeChunk & { score: number }>([
        {
          $vectorSearch: {
            index: VECTOR_INDEX,
            path: "embedding",
            queryVector,
            numCandidates: limit * CANDIDATES_PER_RESULT,
            limit,
            ...(topics?.length ? { filter: { topic: { $in: topics } } } : {}),
          },
        },
        {
          $project: {
            _id: 0,
            text: 1,
            topic: 1,
            language: 1,
            sourceTitle: 1,
            sourceUrl: 1,
            sources: 1,
            score: { $meta: "vectorSearchScore" },
          },
        },
      ])
      .toArray();

    return results
      .filter((r) => r.score >= MIN_SCORE)
      .map(({ text, topic, language, sourceTitle, sourceUrl, sources }) => ({
        text, topic, language, sourceTitle, sourceUrl, sources,
      }));
  } catch (err) {
    console.error("[retrieve] failed, answering without sources:", err instanceof Error ? err.message : err);
    return [];
  }
}
