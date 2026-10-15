import type { AnalyzeRequest, AnalyzeResponse, Symptom } from "@/lib/types";
import { retrieve } from "@/lib/db/retrieve";
import { checkRedFlags, type RedFlagMatch } from "@/lib/ai/redFlags";
import { extractDetails, type Extraction } from "@/lib/ai/extract";
import { pickSources, writeExplanation } from "@/lib/ai/explain";
import { findBannedContent } from "@/lib/ai/safety";
import { findDemoFixture } from "@/lib/ai/demo/cache";
import {
  DISCLAIMER, SAFE_FALLBACK, SELF_HARM_MESSAGE, URGENT_MESSAGE,
  guessLanguage, toUiLanguage, type UiLanguage,
} from "@/lib/ai/messages";

// The /api/analyze pipeline (plan section 2): A red-flag keywords → B extraction (+ AI red-flag
// judgement) → C retrieval → D grounded explanation → E safety filter.

const isProd = process.env.NODE_ENV === "production";

function logStep(step: string, startedAt: number, extra = "") {
  // Never log the user's words in production.
  console.log(`[analyze] ${step} ${Date.now() - startedAt}ms ${extra}`.trim());
}

function urgentResponse(
  lang: UiLanguage,
  redFlags: string[],
  extras: { transcript?: string; symptoms?: Symptom[]; detectedLanguage?: string } = {},
): AnalyzeResponse {
  const selfHarm = redFlags.includes("self_harm_risk");
  return {
    urgency: "urgent",
    redFlags,
    detectedLanguage: extras.detectedLanguage ?? lang,
    transcript: extras.transcript,
    symptoms: extras.symptoms ?? [],
    explanation: selfHarm
      ? `${SELF_HARM_MESSAGE[lang]}\n\n${URGENT_MESSAGE[lang]}`
      : URGENT_MESSAGE[lang],
    possibleAssociations: [],
    careRecommendation: { type: "emergency", when: "now" },
    questionsForDoctor: [],
    followUpQuestions: [],
    sources: [],
    disclaimer: DISCLAIMER[lang],
  };
}

const categories = (matches: RedFlagMatch[]) => matches.map((m) => m.category);

export interface AnalyzeOptions {
  /** Skip saved demo answers (used by the script that generates them). */
  skipDemoCache?: boolean;
}

export async function analyze(
  req: AnalyzeRequest,
  { skipDemoCache = false }: AnalyzeOptions = {},
): Promise<AnalyzeResponse> {
  const t0 = Date.now();
  const text = req.text?.trim() ?? "";
  // A language picked in the UI wins; on "auto" we answer in the language she used.
  const picked = req.language && req.language !== "auto" ? req.language : null;

  // Step A — keyword red flags on typed text. A match stops here: no AI explanation.
  const typedFlags = checkRedFlags(text);
  logStep("A redFlags", t0, `matches=${typedFlags.length}`);
  if (typedFlags.length > 0) {
    return urgentResponse(picked ? toUiLanguage(picked) : guessLanguage(text), categories(typedFlags), {
      transcript: isProd ? undefined : text,
    });
  }

  // Demo cache, typed input — only after the red-flag check, so it can never hide an emergency.
  if (!skipDemoCache && !req.audioBase64) {
    const demo = findDemoFixture(text, req.language || "auto");
    if (demo) {
      logStep("demo cache hit", t0, demo.input.id);
      return demo.analysis;
    }
  }

  // Step B — extraction (also transcribes audio) and a second, AI-based red-flag judgement.
  const details: Extraction = await extractDetails({
    text,
    language: req.language || "auto",
    audio: req.audioBase64 && req.audioMimeType
      ? { base64: req.audioBase64, mimeType: req.audioMimeType }
      : undefined,
  });
  const answerLanguage = picked ?? details.detectedLanguage;
  const lang = toUiLanguage(answerLanguage);
  const spokenFlags = req.audioBase64 ? checkRedFlags(details.transcript) : [];
  logStep("B extract", t0, `urgent=${details.isUrgent} lang=${details.detectedLanguage}`);

  if (details.isUrgent || spokenFlags.length > 0) {
    const flags = [...new Set([...categories(spokenFlags), ...details.urgentReasons])];
    return urgentResponse(lang, flags.length ? flags : ["ai_judgement"], {
      transcript: details.transcript,
      symptoms: details.symptoms,
      detectedLanguage: details.detectedLanguage,
    });
  }

  // Demo cache, spoken input — matched on the transcript, after both red-flag checks.
  if (!skipDemoCache && req.audioBase64) {
    const demo = findDemoFixture(details.transcript, req.language || "auto", true);
    if (demo && demo.analysis.urgency !== "urgent") {
      logStep("demo cache hit (voice)", t0, demo.input.id);
      return { ...demo.analysis, transcript: details.transcript };
    }
  }

  const base = {
    redFlags: [],
    detectedLanguage: details.detectedLanguage,
    transcript: details.transcript,
    symptoms: details.symptoms,
    followUpQuestions: details.followUpQuestions,
    disclaimer: DISCLAIMER[lang],
  };
  const fallback: AnalyzeResponse = {
    ...base,
    urgency: "routine",
    explanation: SAFE_FALLBACK[lang],
    possibleAssociations: [],
    careRecommendation: { type: "general doctor", when: "within the next few weeks" },
    questionsForDoctor: [],
    sources: [],
  };

  // Step C — trusted sources. No sources means no explanation: we never answer ungrounded.
  const chunks = await retrieve(details.searchQuery || details.transcript);
  logStep("C retrieve", t0, `chunks=${chunks.length}`);
  if (chunks.length === 0) return fallback;

  // Step D + E — grounded explanation, then the safety filter (one regeneration allowed).
  let result = await writeExplanation(details, chunks, answerLanguage);
  const textsOf = (r: typeof result) => [r.explanation, ...r.questionsForDoctor];
  let banned = findBannedContent(textsOf(result));
  logStep("D explain", t0, `banned=${banned.length}`);
  if (banned.length > 0) {
    result = await writeExplanation(
      details,
      chunks,
      answerLanguage,
      "IMPORTANT: your previous answer broke the rules (diagnosis words or medicine names). " +
        "Rewrite it without saying she has any condition, and without naming any medicine, tablet or dose.",
    );
    banned = findBannedContent(textsOf(result));
    logStep("E regenerate", t0, `banned=${banned.length}`);
    if (banned.length > 0) return fallback;
  }

  return {
    ...base,
    urgency: result.urgency,
    explanation: result.explanation,
    possibleAssociations: result.possibleAssociations,
    careRecommendation: result.careRecommendation,
    questionsForDoctor: result.questionsForDoctor,
    sources: pickSources(chunks, result.sourceNumbers),
  };
}
