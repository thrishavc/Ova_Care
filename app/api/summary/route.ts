import type { AnalyzeResponse, ApiError, SummaryRequest, SummaryResponse } from "@/lib/types";
import type { SymptomAnalysisResult } from "@/frontend/contract";
import { makeSummary } from "@/lib/ai/summary";
import { findDemoSummary } from "@/lib/ai/demo/cache";
import { fromSymptomAnalysisResult, toFrontendSummary } from "@/lib/ai/frontendAdapter";

const MAX_BODY_CHARS = 60_000;

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

/** Member 2's frontend sends its own SymptomAnalysisResult shape (see frontend/contract.ts). */
function isFrontendAnalysis(a: unknown): a is SymptomAnalysisResult & { ova?: AnalyzeResponse } {
  if (!a || typeof a !== "object") return false;
  const x = a as Partial<SymptomAnalysisResult>;
  return typeof x.plainLanguageExplanation === "string" && Array.isArray(x.understoodSymptoms);
}

async function summarise(analysis: AnalyzeResponse): Promise<SummaryResponse> {
  const demo = findDemoSummary(analysis);
  if (demo) return { ...demo, createdAt: new Date().toISOString() };
  // makeSummary never throws: if Gemini fails it returns a basic English summary.
  return makeSummary(analysis);
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

  if (isFrontendAnalysis(body.analysis)) {
    const ours = isAnalysis(body.analysis.ova) ? body.analysis.ova : fromSymptomAnalysisResult(body.analysis);
    return Response.json(toFrontendSummary(await summarise(ours)));
  }
  if (!isAnalysis(body.analysis)) {
    return badRequest("Please send the result from /api/analyze as { analysis }.");
  }
  return Response.json(await summarise(body.analysis));
}
