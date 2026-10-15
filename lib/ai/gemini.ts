import { ApiError, GoogleGenAI, type Part } from "@google/genai";

// Free-tier fast model. Override with GEMINI_MODEL in .env.local if AI Studio shows a different one.
const MODEL = process.env.GEMINI_MODEL || "gemini-flash-latest";
const TIMEOUT_MS = 20_000;
const RATE_LIMIT_RETRY_MS = 2_000;

let client: GoogleGenAI | null = null;

function getClient() {
  if (!client) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("GEMINI_API_KEY is not set (add it to .env.local)");
    client = new GoogleGenAI({ apiKey });
  }
  return client;
}

export interface CallGeminiOptions {
  /** System prompt (rules the model must always follow) */
  system?: string;
  /** Extra parts such as inline audio: { inlineData: { data, mimeType } } */
  parts?: Part[];
}

/**
 * Sends a prompt to Gemini and returns the reply parsed as JSON matching `schema`.
 * `schema` is a plain JSON Schema object. Retries once on HTTP 429; times out after 20 s.
 */
export async function callGemini<T>(
  prompt: string,
  schema: object,
  options: CallGeminiOptions = {},
): Promise<T> {
  const request = () =>
    getClient().models.generateContent({
      model: MODEL,
      contents: [{ role: "user", parts: [{ text: prompt }, ...(options.parts ?? [])] }],
      config: {
        systemInstruction: options.system,
        responseMimeType: "application/json",
        responseJsonSchema: schema,
        abortSignal: AbortSignal.timeout(TIMEOUT_MS),
      },
    });

  let response;
  try {
    response = await request();
  } catch (err) {
    if (!(err instanceof ApiError && err.status === 429)) throw err;
    await new Promise((resolve) => setTimeout(resolve, RATE_LIMIT_RETRY_MS));
    response = await request();
  }

  const text = response.text;
  if (!text) throw new Error("Gemini returned an empty response");
  return JSON.parse(text) as T;
}
