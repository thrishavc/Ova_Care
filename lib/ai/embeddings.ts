import { GoogleGenAI } from "@google/genai";

// Gemini embeddings for the knowledge base and for search queries.
// Changing the model or dimensions means re-running ingest and rebuilding the vector index.
export const EMBEDDING_MODEL = process.env.GEMINI_EMBEDDING_MODEL || "gemini-embedding-2";
export const EMBEDDING_DIMENSIONS = 768;

const BATCH_SIZE = 50;

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

/** Embeds texts in batches. Use "document" for knowledge chunks and "query" for searches. */
export async function embed(texts: string[], purpose: Purpose): Promise<number[][]> {
  const vectors: number[][] = [];
  for (let i = 0; i < texts.length; i += BATCH_SIZE) {
    const batch = texts.slice(i, i + BATCH_SIZE);
    const res = await getClient().models.embedContent({
      model: EMBEDDING_MODEL,
      contents: batch,
      config: {
        outputDimensionality: EMBEDDING_DIMENSIONS,
        taskType: purpose === "document" ? "RETRIEVAL_DOCUMENT" : "RETRIEVAL_QUERY",
        abortSignal: AbortSignal.timeout(10_000),
      },
    });
    const got = res.embeddings?.map((e) => e.values ?? []) ?? [];
    if (got.length !== batch.length || got.some((v) => v.length !== EMBEDDING_DIMENSIONS)) {
      throw new Error(`Embedding failed: expected ${batch.length}x${EMBEDDING_DIMENSIONS} vectors`);
    }
    vectors.push(...got);
  }
  return vectors;
}
