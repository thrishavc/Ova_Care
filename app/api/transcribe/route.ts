// Frontend adapter: the mic button uploads the recording (multipart form) and shows
// "We heard: …" for the user to check before analysis. The transcript then goes through
// /api/analyze-symptoms, so red flags are still checked first.
import { callGemini } from "@/lib/ai/gemini";

const MAX_AUDIO_BYTES = 2_600_000; // ~60 s of browser audio, under Vercel's 4.5 MB body limit
const AUDIO_TYPES = new Set([
  "audio/webm", "audio/ogg", "audio/mp4", "audio/mpeg", "audio/mp3",
  "audio/wav", "audio/x-wav", "audio/aac", "audio/flac",
]);

const SCHEMA = {
  type: "object",
  properties: { transcript: { type: "string" }, detectedLanguage: { type: "string" } },
  required: ["transcript", "detectedLanguage"],
};

const PROMPT =
  "Transcribe this voice note exactly as spoken. Keep the speaker's language and script: Hinglish " +
  "stays in Roman letters, Hindi in Devanagari, Kannada in Kannada script. Do not translate, " +
  'summarise or add anything. detectedLanguage: "en", "hi", "hi-Latn" (Hinglish), "kn", or another ISO code.';

const fail = (status: number, error: string) => Response.json({ success: false, error }, { status });

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return fail(400, "Please send the recording as a form upload.");
  }
  const audio = form.get("audio");
  if (!(audio instanceof Blob) || audio.size === 0) return fail(400, "No recording received.");
  if (audio.size > MAX_AUDIO_BYTES) return fail(400, "Please keep your recording under 60 seconds.");

  const declared = form.get("audioMimeType");
  const mimeType = (typeof declared === "string" && declared ? declared : audio.type)
    .split(";")[0].trim().toLowerCase();
  if (!AUDIO_TYPES.has(mimeType)) return fail(400, "We could not read that recording. Please type instead.");

  try {
    const base64 = Buffer.from(await audio.arrayBuffer()).toString("base64");
    const out = await callGemini<{ transcript: string; detectedLanguage: string }>(PROMPT, SCHEMA, {
      parts: [{ inlineData: { data: base64, mimeType } }],
    });
    return Response.json({ success: true, transcript: out.transcript, text: out.transcript, detectedLanguage: out.detectedLanguage });
  } catch (err) {
    console.error("[transcribe] failed:", err instanceof Error ? err.message : err);
    return fail(503, "We could not understand the recording. Please try again or type instead.");
  }
}
