import type { CareRecommendation, Source } from "@/lib/types";
import type { KnowledgeChunk } from "@/lib/db/retrieve";
import type { Extraction } from "@/lib/ai/extract";
import { callGemini } from "@/lib/ai/gemini";
import { loadPrompt } from "@/lib/ai/prompts";

// Step D: Gemini writes the explanation using only the retrieved source chunks.

export interface Explanation {
  urgency: "routine" | "soon";
  explanation: string;
  possibleAssociations: string[];
  careRecommendation: CareRecommendation;
  questionsForDoctor: string[];
  /** 1-based numbers of the SOURCES actually used */
  sourceNumbers: number[];
}

const SCHEMA = {
  type: "object",
  properties: {
    urgency: { type: "string", enum: ["routine", "soon"] },
    explanation: { type: "string" },
    possibleAssociations: { type: "array", items: { type: "string" } },
    careRecommendation: {
      type: "object",
      properties: {
        type: { type: "string", enum: ["gynaecologist", "general doctor", "endocrinologist"] },
        when: { type: "string" },
      },
      required: ["type", "when"],
    },
    questionsForDoctor: { type: "array", items: { type: "string" } },
    sourceNumbers: { type: "array", items: { type: "integer" } },
  },
  required: [
    "urgency", "explanation", "possibleAssociations",
    "careRecommendation", "questionsForDoctor", "sourceNumbers",
  ],
};

export async function writeExplanation(
  details: Extraction,
  chunks: KnowledgeChunk[],
  answerLanguage: string,
  correction?: string,
): Promise<Explanation> {
  const sources = chunks
    .map((c, i) => `[${i + 1}] ${c.sourceTitle}\n${c.text}`)
    .join("\n\n");

  const prompt = [
    loadPrompt("explain.md"),
    `Answer in this language and script: ${answerLanguage}`,
    `What she said:\n"""\n${details.transcript}\n"""`,
    `Symptoms we understood:\n${JSON.stringify(details.symptoms)}`,
    `SOURCES:\n${sources}`,
    correction ?? "",
  ]
    .filter(Boolean)
    .join("\n\n");

  return callGemini<Explanation>(prompt, SCHEMA, { system: loadPrompt("system.md") });
}

const MAX_SOURCES = 6;

/** Maps the model's source numbers back to unique {title, url} pairs (all of each passage's sources). */
export function pickSources(chunks: KnowledgeChunk[], numbers: number[]): Source[] {
  const used = numbers.map((n) => chunks[n - 1]).filter(Boolean);
  const list = used.length > 0 ? used : chunks;
  const seen = new Set<string>();
  const out: Source[] = [];
  for (const c of list) {
    for (const s of c.sources?.length ? c.sources : [{ title: c.sourceTitle, url: c.sourceUrl }]) {
      if (!seen.has(s.url)) {
        seen.add(s.url);
        out.push({ title: s.title, url: s.url });
      }
    }
  }
  return out.slice(0, MAX_SOURCES);
}
