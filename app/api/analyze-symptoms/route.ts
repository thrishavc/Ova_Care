// Frontend adapter: the symptom screen posts { symptoms, language } here.
// Runs our full pipeline (red flags → extraction → cited sources → safety filter).
import { analyzeWithDeadline, toSymptomAnalysisResult } from "@/lib/ai/frontendAdapter";

const MAX_TEXT_CHARS = 2000;

const fail = (status: number, error: string) => Response.json({ success: false, error }, { status });

export async function POST(request: Request) {
  let body: { symptoms?: unknown };
  try {
    body = await request.json();
  } catch {
    return fail(400, "Please send your symptoms as JSON.");
  }
  const text = typeof body.symptoms === "string" ? body.symptoms.trim() : "";
  if (!text) return fail(400, "Please describe your symptoms.");
  if (text.length > MAX_TEXT_CHARS) return fail(400, `Please keep your message under ${MAX_TEXT_CHARS} characters.`);

  try {
    const result = await analyzeWithDeadline(text);
    if (!result) {
      return fail(504, "This is taking longer than usual. Please try again in a moment.");
    }
    return Response.json({ success: true, data: toSymptomAnalysisResult(result, text) });
  } catch (err) {
    console.error("[analyze-symptoms] failed:", err instanceof Error ? err.message : err);
    return fail(503, "We were unable to analyze your symptoms right now. Please try again.");
  }
}
