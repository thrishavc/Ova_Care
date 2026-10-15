import { ApiError, GoogleGenAI, ThinkingLevel, type Part } from "@google/genai";

// Main model, and a different model used when the main one is overloaded or slow.
// Measured 2026-10-15 on the free tier: gemini-flash-latest (3.8) often 503s; gemini-3.5-flash
// was fastest (text ~3 s, audio ~6 s); flash-lite works but was slower under load.
const MODEL = process.env.GEMINI_MODEL || "gemini-3.5-flash";
const FALLBACK_MODEL =
  [process.env.GEMINI_FALLBACK_MODEL, "gemini-flash-lite-latest", "gemini-3.5-flash"].find(
    (m) => m && m !== MODEL,
  ) as string;
// Two attempts of 10 s each keep the whole call inside the plan's 20 s limit.
const ATTEMPT_TIMEOUT_MS = 10_000;
// Rate limit (429) and temporary overload (500, 503): worth one retry.
const RETRYABLE_STATUS = new Set([429, 500, 503]);

let client: GoogleGenAI | null = null;

function getClient() {
  if (!client) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("GEMINI_API_KEY is not set (add it to .env.local)");
    client = new GoogleGenAI({ apiKey });
  }
  return client;
}

function isRetryable(err: unknown) {
  if (err instanceof ApiError) return RETRYABLE_STATUS.has(err.status);
  if (!(err instanceof Error)) return false;
  // Our own timeout aborts the request; "fetch failed" is a dropped network connection.
  return err.name === "AbortError" || err.name === "TimeoutError" || err.message === "fetch failed";
}

function reason(err: unknown) {
  if (err instanceof ApiError) return `HTTP ${err.status}`;
  return err instanceof Error ? err.message : String(err);
}

export interface CallGeminiOptions {
  /** System prompt (rules the model must always follow) */
  system?: string;
  /** Extra parts such as inline audio: { inlineData: { data, mimeType } } */
  parts?: Part[];
  /** How much the model "thinks" before answering. More = slower. Default LOW (3.8-flash rejects MINIMAL). */
  thinking?: ThinkingLevel;
}

export { ThinkingLevel };

/**
 * Sends a prompt to Gemini and returns the reply parsed as JSON matching `schema`.
 * `schema` is a plain JSON Schema object. If the main model is rate-limited, overloaded or takes
 * longer than 10 s, retries once on the fallback model.
 */
export async function callGemini<T>(
  prompt: string,
  schema: object,
  options: CallGeminiOptions = {},
): Promise<T> {
  const request = (model: string) =>
    getClient().models.generateContent({
      model,
      contents: [{ role: "user", parts: [{ text: prompt }, ...(options.parts ?? [])] }],
      config: {
        systemInstruction: options.system,
        responseMimeType: "application/json",
        responseJsonSchema: schema,
        thinkingConfig: { thinkingLevel: options.thinking ?? ThinkingLevel.LOW },
        abortSignal: AbortSignal.timeout(ATTEMPT_TIMEOUT_MS),
      },
    });

  let response;
  try {
    response = await request(MODEL);
  } catch (err) {
    if (!isRetryable(err)) throw err;
    console.warn(`[gemini] ${MODEL} failed (${reason(err)}), retrying on ${FALLBACK_MODEL}`);
    response = await request(FALLBACK_MODEL);
  }

  const text = response.text;
  if (!text) throw new Error("Gemini returned an empty response");
  return JSON.parse(text) as T;
}
