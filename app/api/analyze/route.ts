import type { AnalyzeRequest, ApiError } from "@/lib/types";
import { analyze } from "@/lib/ai/pipeline";

const MAX_TEXT_CHARS = 2000;

function errorResponse(status: number, error: string, message: string) {
  const body: ApiError = { error, message };
  return Response.json(body, { status });
}

export async function POST(request: Request) {
  let body: Partial<AnalyzeRequest>;
  try {
    body = await request.json();
  } catch {
    return errorResponse(400, "bad_request", "Please send your symptoms as JSON.");
  }

  const text = typeof body.text === "string" ? body.text.trim() : "";
  if (!text && !body.audioBase64) {
    return errorResponse(400, "bad_request", "Please type or record your symptoms.");
  }
  if (text.length > MAX_TEXT_CHARS) {
    return errorResponse(400, "bad_request", `Please keep your message under ${MAX_TEXT_CHARS} characters.`);
  }

  try {
    const result = await analyze({
      text,
      audioBase64: body.audioBase64 ?? null,
      audioMimeType: body.audioMimeType ?? null,
      language: body.language ?? "auto",
      sessionId: body.sessionId ?? "",
    });
    return Response.json(result);
  } catch (err) {
    console.error("[analyze] failed:", err instanceof Error ? err.message : err);
    return errorResponse(
      503,
      "unavailable",
      "Something went wrong while understanding your symptoms. Please try again in a moment.",
    );
  }
}
