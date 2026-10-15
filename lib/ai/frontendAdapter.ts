// Converts between our API contract (lib/types.ts) and the shapes the frontend expects
// (frontend/contract.ts). The frontend's own routes (/api/analyze-symptoms, /api/chat, …) call
// these so every answer still goes through our pipeline: red flags first, cited sources,
// banned-word filter.

import type { AnalyzeResponse, DoctorSummary, SummaryResponse } from "@/lib/types";
import type { SymptomAnalysisResult, UrgencyLevel, VerifiedSource } from "@/frontend/contract";
import { analyze } from "@/lib/ai/pipeline";

export const REQUEST_DEADLINE_MS = 20_000;

/** Runs the pipeline with the 20 s deadline. Returns null on timeout. */
export async function analyzeWithDeadline(text: string): Promise<AnalyzeResponse | null> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const deadline = new Promise<null>((resolve) => {
    timer = setTimeout(() => resolve(null), REQUEST_DEADLINE_MS);
  });
  try {
    // "auto": answer in the language she wrote in (Hinglish in → Hinglish out).
    return await Promise.race([
      analyze({ text, audioBase64: null, audioMimeType: null, language: "auto", sessionId: "" }),
      deadline,
    ]);
  } finally {
    clearTimeout(timer);
  }
}

const URGENCY: Record<AnalyzeResponse["urgency"], UrgencyLevel> = {
  routine: "routine",
  soon: "prompt",
  urgent: "urgent",
};

export function toFrontendUrgency(u: AnalyzeResponse["urgency"]): UrgencyLevel {
  return URGENCY[u];
}

function organizationOf(title: string, url: string): string {
  const fromTitle = title.split(/\s+[—–-]\s+/)[0]?.trim();
  if (fromTitle && fromTitle !== title) return fromTitle;
  try {
    return new URL(url).hostname.replace(/^www\d?\./, "");
  } catch {
    return title;
  }
}

export function toVerifiedSources(a: AnalyzeResponse): VerifiedSource[] {
  return a.sources.map((s) => ({
    title: s.title,
    organization: organizationOf(s.title, s.url),
    url: s.url,
    summary: "",
  }));
}

function capitalise(s: string) {
  return s ? s[0].toUpperCase() + s.slice(1) : s;
}

/** Our /api/analyze result in the frontend's SymptomAnalysisResult shape. */
export function toSymptomAnalysisResult(a: AnalyzeResponse, originalInput: string): SymptomAnalysisResult & { ova: AnalyzeResponse } {
  const urgency = toFrontendUrgency(a.urgency);
  const care = `${capitalise(a.careRecommendation.type)} — ${a.careRecommendation.when}`;
  return {
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    originalInput,
    detectedLanguage: a.detectedLanguage,
    urgency,
    urgencyTitle:
      urgency === "urgent"
        ? "Please seek medical care now"
        : urgency === "prompt"
          ? "Please see a doctor soon"
          : "Plan a routine doctor visit",
    urgencyReason: urgency === "urgent" ? a.explanation : `Recommended: ${care}.`,
    understoodSymptoms: a.symptoms.map((s) => s.name),
    durationAndDetails: a.symptoms
      .map((s) => `${s.name}: ${s.duration === "unknown" ? "duration not mentioned" : s.duration}`)
      .join("; "),
    missingInformation: a.followUpQuestions,
    plainLanguageExplanation: a.explanation,
    commonAssociations: a.possibleAssociations.map((name) => ({
      name,
      description: "Commonly associated with these symptoms in our trusted sources. Only a doctor can find the actual cause.",
    })),
    nextSteps:
      urgency === "urgent"
        ? ["Go to the nearest hospital now, or call 112 (emergency) or 108 (ambulance)."]
        : [`See a ${a.careRecommendation.type} ${a.careRecommendation.when}.`, "Take your doctor summary with you."],
    suggestedDoctorQuestions: a.questionsForDoctor,
    verifiedSources: toVerifiedSources(a),
    disclaimer: a.disclaimer,
    isAiGenerated: true,
    // Our original result rides along so /api/summary can use it exactly.
    ova: a,
  };
}

/** Rebuilds enough of our AnalyzeResponse from a frontend analysis that lacks `ova`. */
export function fromSymptomAnalysisResult(r: SymptomAnalysisResult): AnalyzeResponse {
  const back: Record<UrgencyLevel, AnalyzeResponse["urgency"]> = { routine: "routine", prompt: "soon", urgent: "urgent" };
  return {
    urgency: back[r.urgency] ?? "routine",
    redFlags: [],
    detectedLanguage: r.detectedLanguage || "en",
    transcript: r.originalInput,
    symptoms: r.understoodSymptoms.map((name) => ({ name, duration: "unknown", severity: "unknown" })),
    explanation: r.plainLanguageExplanation,
    possibleAssociations: r.commonAssociations.map((c) => c.name),
    careRecommendation: { type: r.urgency === "urgent" ? "emergency" : "gynaecologist", when: r.urgency === "urgent" ? "now" : "within the next few weeks" },
    questionsForDoctor: r.suggestedDoctorQuestions,
    followUpQuestions: r.missingInformation,
    sources: r.verifiedSources.map((s) => ({ title: s.title, url: s.url })),
    disclaimer: r.disclaimer,
  };
}

/** One DoctorSummary as printable plain text. */
export function summaryToText(s: DoctorSummary): string {
  return [
    s.heading,
    "",
    s.reasonForVisit,
    "",
    "Symptoms:",
    ...s.symptoms.map((x) => `• ${x.name} — ${x.duration}${x.severity && x.severity !== "unknown" ? ` (${x.severity})` : ""}`),
    "",
    `Recommended care: ${s.recommendedCare}`,
    "",
    "Questions to ask:",
    ...s.questionsForDoctor.map((q, i) => `${i + 1}. ${q}`),
    "",
    s.note,
  ].join("\n");
}

export function toFrontendSummary(s: SummaryResponse) {
  const englishSummary = summaryToText(s.english);
  return {
    success: true,
    englishSummary,
    translatedSummary: s.translated ? summaryToText(s.translated) : englishSummary,
    language: s.language,
    detectedLanguage: s.language,
  };
}
