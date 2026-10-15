import type { AnalyzeResponse, DoctorSummary, SummaryResponse } from "@/lib/types";
import { callGemini } from "@/lib/ai/gemini";
import { loadPrompt } from "@/lib/ai/prompts";
import { findBannedContent } from "@/lib/ai/safety";
import { DISCLAIMER, toUiLanguage } from "@/lib/ai/messages";

// /api/summary: a one-page doctor-visit summary in English and in her language.

const SUMMARY_SCHEMA = {
  type: "object",
  properties: {
    heading: { type: "string" },
    reasonForVisit: { type: "string" },
    symptoms: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: { type: "string" },
          duration: { type: "string" },
          severity: { type: "string" },
        },
        required: ["name", "duration", "severity"],
      },
    },
    recommendedCare: { type: "string" },
    questionsForDoctor: { type: "array", items: { type: "string" } },
    note: { type: "string" },
  },
  required: ["heading", "reasonForVisit", "symptoms", "recommendedCare", "questionsForDoctor", "note"],
};

const SCHEMA = {
  type: "object",
  properties: { english: SUMMARY_SCHEMA, translated: SUMMARY_SCHEMA },
  required: ["english", "translated"],
};

const isEnglish = (lang: string) => lang.toLowerCase().startsWith("en");

function careLine(a: AnalyzeResponse) {
  const type = a.careRecommendation.type;
  return `${type.charAt(0).toUpperCase()}${type.slice(1)} — ${a.careRecommendation.when}`;
}

/** No-AI English summary built straight from the analysis. Used if Gemini fails. */
export function basicSummary(a: AnalyzeResponse): DoctorSummary {
  const names = a.symptoms.map((s) => s.name);
  return {
    heading: "Summary for my doctor's visit",
    reasonForVisit: names.length
      ? `I would like to talk about: ${names.join(", ")}.`
      : "I would like to talk about my symptoms.",
    symptoms: a.symptoms.map((s) => ({ ...s })),
    recommendedCare: careLine(a),
    // Her questions may be in another language; show them as she received them.
    questionsForDoctor: a.questionsForDoctor,
    note: DISCLAIMER.en,
  };
}

export async function makeSummary(a: AnalyzeResponse): Promise<SummaryResponse> {
  const createdAt = new Date().toISOString();
  const wantTranslation = !isEnglish(a.detectedLanguage);
  const fallback: SummaryResponse = {
    language: a.detectedLanguage,
    english: basicSummary(a),
    translated: null,
    createdAt,
  };

  const facts = {
    symptoms: a.symptoms,
    urgency: a.urgency,
    whatSheSaid: a.transcript ?? null,
    commonlyAssociatedWith: a.possibleAssociations,
    recommendedCare: careLine(a),
    questionsForDoctor: a.questionsForDoctor,
  };
  const prompt = [
    loadPrompt("summary.md"),
    `Her language for "translated": ${wantTranslation ? a.detectedLanguage : "en (repeat the English summary)"}`,
    `Use this exact note in "english": ${DISCLAIMER.en}`,
    wantTranslation ? `Use this exact note in "translated": ${DISCLAIMER[toUiLanguage(a.detectedLanguage)]}` : "",
    `FACTS:\n${JSON.stringify(facts, null, 2)}`,
  ]
    .filter(Boolean)
    .join("\n\n");

  try {
    const out = await callGemini<{ english: DoctorSummary; translated: DoctorSummary }>(
      prompt,
      SCHEMA,
      { system: loadPrompt("system.md") },
    );
    const texts = [out.english, out.translated].flatMap((s) => [s.reasonForVisit, ...s.questionsForDoctor]);
    const banned = findBannedContent(texts);
    if (banned.length > 0) {
      console.warn(`[summary] banned content (${banned.length}), using basic summary`);
      return fallback;
    }
    return {
      language: a.detectedLanguage,
      english: out.english,
      translated: wantTranslation ? out.translated : null,
      createdAt,
    };
  } catch (err) {
    console.error("[summary] Gemini failed, using basic summary:", err instanceof Error ? err.message : err);
    return fallback;
  }
}
