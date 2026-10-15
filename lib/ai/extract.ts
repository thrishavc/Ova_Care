import type { Part } from "@google/genai";
import type { Symptom } from "@/lib/types";
import { callGemini } from "@/lib/ai/gemini";
import { loadPrompt } from "@/lib/ai/prompts";

// Step B: Gemini pulls structured details out of the user's words and makes a second red-flag judgement.

export interface Extraction {
  /** What the user said, in her own words and script (transcribed if she sent audio) */
  transcript: string;
  /** BCP-47 style tag: "en", "hi" (Devanagari), "hi-Latn" (Hinglish), "ta", "te", "bn", ... */
  detectedLanguage: string;
  symptoms: Symptom[];
  isUrgent: boolean;
  urgentReasons: string[];
  /** Short English search query for finding trusted sources */
  searchQuery: string;
  /** 0-2 short questions in the user's language, only if key information is missing */
  followUpQuestions: string[];
}

const SCHEMA = {
  type: "object",
  properties: {
    transcript: { type: "string" },
    detectedLanguage: { type: "string" },
    symptoms: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: { type: "string" },
          duration: { type: "string" },
          severity: { type: "string", enum: ["mild", "moderate", "severe", "unknown"] },
        },
        required: ["name", "duration", "severity"],
      },
    },
    isUrgent: { type: "boolean" },
    urgentReasons: { type: "array", items: { type: "string" } },
    searchQuery: { type: "string" },
    followUpQuestions: { type: "array", items: { type: "string" }, maxItems: 2 },
  },
  required: [
    "transcript", "detectedLanguage", "symptoms", "isUrgent",
    "urgentReasons", "searchQuery", "followUpQuestions",
  ],
};

export interface ExtractInput {
  text: string;
  audio?: { base64: string; mimeType: string };
  /** "auto" or a language the user picked */
  language: string;
}

export async function extractDetails({ text, audio, language }: ExtractInput): Promise<Extraction> {
  const parts: Part[] = audio ? [{ inlineData: { data: audio.base64, mimeType: audio.mimeType } }] : [];
  const prompt = [
    loadPrompt("extract.md"),
    language !== "auto"
      ? `The user selected this language: ${language}. Write followUpQuestions in that language. ` +
        "Still set detectedLanguage to the language she actually used."
      : "",
    audio
      ? "The user's description is in the attached audio. Transcribe it first."
      : `User's description:\n"""\n${text}\n"""`,
  ]
    .filter(Boolean)
    .join("\n\n");

  return callGemini<Extraction>(prompt, SCHEMA, { system: loadPrompt("system.md"), parts });
}
