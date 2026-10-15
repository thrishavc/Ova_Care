import type { AnalyzeResponse, SummaryResponse } from "@/lib/types";
import { normalize } from "@/lib/ai/redFlags";
import { DEMO_INPUTS, type DemoInput } from "@/lib/ai/demo/inputs";
import savedResponses from "@/lib/ai/demo/responses.json";

// Demo cache: saved real answers for the fixed demo inputs (see inputs.ts).

export interface DemoFixture {
  input: DemoInput;
  analysis: AnalyzeResponse;
  summary: SummaryResponse | null;
  generatedAt: string;
}

const fixtures = savedResponses as Record<string, DemoFixture>;

const words = (s: string) => new Set(normalize(s).split(" ").filter(Boolean));

/** Share of words two texts have in common (Jaccard similarity, 0-1). */
function similarity(a: string, b: string) {
  const wa = words(a);
  const wb = words(b);
  if (wa.size === 0 || wb.size === 0) return 0;
  let shared = 0;
  for (const w of wa) if (wb.has(w)) shared++;
  return shared / (wa.size + wb.size - shared);
}

// Typed demo text should match almost exactly; a voice transcript can differ by a word or two.
const TYPED_THRESHOLD = 0.9;
const SPOKEN_THRESHOLD = 0.7;

/** Finds the saved demo answer for this text, if it is one of the demo inputs. */
export function findDemoFixture(
  text: string,
  language: string,
  spoken = false,
): DemoFixture | null {
  if (!text) return null;
  const threshold = spoken ? SPOKEN_THRESHOLD : TYPED_THRESHOLD;
  let best: { fixture: DemoFixture; score: number } | null = null;
  for (const input of DEMO_INPUTS) {
    const fixture = fixtures[input.id];
    if (!fixture) continue;
    if (language !== "auto" && input.language !== "auto" && language !== input.language) continue;
    const score = similarity(text, input.text);
    if (score >= threshold && (!best || score > best.score)) best = { fixture, score };
  }
  return best?.fixture ?? null;
}

/** Saved summary for a demo analysis (matched by its transcript). */
export function findDemoSummary(analysis: AnalyzeResponse): SummaryResponse | null {
  const fixture = analysis.transcript
    ? findDemoFixture(analysis.transcript, "auto", true)
    : null;
  return fixture?.summary ?? null;
}
