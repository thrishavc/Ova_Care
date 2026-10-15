import type { AnalyzeRequest, ApiError } from "@/lib/types";
import { analyze } from "@/lib/ai/pipeline";

const MAX_TEXT_CHARS = 2000;
// ~60 s of browser audio is well under this; it also keeps the body under Vercel's 4.5 MB limit.
const MAX_AUDIO_BASE64_CHARS = 3_500_000;
// What browser MediaRecorder produces (webm/ogg on Chrome & Firefox, mp4 on Safari) plus common files.
const AUDIO_TYPES = new Set([
  "audio/webm", "audio/ogg", "audio/mp4", "audio/mpeg", "audio/mp3",
  "audio/wav", "audio/x-wav", "audio/aac", "audio/flac",
]);

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
  const audioBase64 = typeof body.audioBase64 === "string" && body.audioBase64 ? body.audioBase64 : null;
  // "audio/webm;codecs=opus" → "audio/webm"
  const audioMimeType = typeof body.audioMimeType === "string"
    ? body.audioMimeType.split(";")[0].trim().toLowerCase()
    : null;

  if (!text && !audioBase64) {
    return errorResponse(400, "bad_request", "Please type or record your symptoms.");
  }
  if (text.length > MAX_TEXT_CHARS) {
    return errorResponse(400, "bad_request", `Please keep your message under ${MAX_TEXT_CHARS} characters.`);
  }
  if (audioBase64) {
    if (!audioMimeType || !AUDIO_TYPES.has(audioMimeType)) {
      return errorResponse(400, "bad_request", "We could not read that recording. Please try again or type instead.");
    }
    if (audioBase64.length > MAX_AUDIO_BASE64_CHARS) {
      return errorResponse(400, "bad_request", "Please keep your recording under 60 seconds.");
    }
  }

  try {
    const result = await analyze({
      text,
      audioBase64,
      audioMimeType,
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
