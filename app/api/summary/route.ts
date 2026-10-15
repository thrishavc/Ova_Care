import type { AnalyzeResponse, ApiError, SummaryRequest } from "@/lib/types";
import { makeSummary } from "@/lib/ai/summary";

const MAX_BODY_CHARS = 30_000;

function badRequest(message: string) {
  const body: ApiError = { error: "bad_request", message };
  return Response.json(body, { status: 400 });
}

function isAnalysis(a: unknown): a is AnalyzeResponse {
  if (!a || typeof a !== "object") return false;
  const x = a as Partial<AnalyzeResponse>;
  return (
    Array.isArray(x.symptoms) &&
    Array.isArray(x.questionsForDoctor) &&
    Array.isArray(x.possibleAssociations) &&
    typeof x.detectedLanguage === "string" &&
    typeof x.careRecommendation?.type === "string"
  );
}

export async function POST(request: Request) {
  const raw = await request.text();
  if (raw.length > MAX_BODY_CHARS) return badRequest("That summary request is too large.");

  let body: Partial<SummaryRequest>;
  try {
    body = JSON.parse(raw);
  } catch {
    return badRequest("Please send the analysis as JSON.");
  }
  if (!isAnalysis(body.analysis)) {
    return badRequest("Please send the result from /api/analyze as { analysis }.");
  }

  // makeSummary never throws: if Gemini fails it returns a basic English summary.
  return Response.json(await makeSummary(body.analysis));
}
