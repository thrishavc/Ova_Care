// Generates lib/ai/demo/responses.json: real pipeline answers for the demo inputs.
// Run after the knowledge base and retrieve() are live, and again after any
// prompt or knowledge change:   npm run demo:warm
// Flags: --only=<id>  regenerate one input;  --allow-no-sources  save answers without sources.

import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { analyze } from "@/lib/ai/pipeline";
import { makeSummary } from "@/lib/ai/summary";
import { DEMO_INPUTS } from "@/lib/ai/demo/inputs";
import type { DemoFixture } from "@/lib/ai/demo/cache";

const OUT = path.join(process.cwd(), "lib", "ai", "demo", "responses.json");
const SPACING_MS = 5_000; // stay under the free-tier rate limit
const ATTEMPTS = 3;

const args = process.argv.slice(2);
const only = args.find((a) => a.startsWith("--only="))?.split("=")[1];
const allowNoSources = args.includes("--allow-no-sources");

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const saved = JSON.parse(readFileSync(OUT, "utf8")) as Record<string, DemoFixture>;

let failures = 0;
for (const input of DEMO_INPUTS) {
  if (only && input.id !== only) continue;
  let fixture: DemoFixture | null = null;

  for (let attempt = 1; attempt <= ATTEMPTS && !fixture; attempt++) {
    try {
      const analysis = await analyze(
        { text: input.text, audioBase64: null, audioMimeType: null, language: input.language, sessionId: "demo" },
        { skipDemoCache: true },
      );
      if (analysis.urgency !== "urgent" && analysis.sources.length === 0 && !allowNoSources) {
        throw new Error("no sources (is retrieve() live?) — rerun with --allow-no-sources to save anyway");
      }
      await sleep(SPACING_MS);
      const summary = analysis.urgency === "urgent" ? null : await makeSummary(analysis);
      fixture = { input, analysis, summary, generatedAt: new Date().toISOString() };
    } catch (err) {
      console.warn(`  ${input.id} attempt ${attempt} failed: ${(err as Error).message}`);
      if (attempt < ATTEMPTS) await sleep(SPACING_MS);
    }
  }

  if (fixture) {
    saved[input.id] = fixture;
    const a = fixture.analysis;
    console.log(`✓ ${input.id}: ${a.urgency}, ${a.detectedLanguage}, ${a.sources.length} sources, summary=${fixture.summary ? "yes" : "no"}`);
  } else {
    failures++;
    console.error(`✗ ${input.id}: not saved (kept the previous answer if there was one)`);
  }
  writeFileSync(OUT, JSON.stringify(saved, null, 2) + "\n");
  await sleep(SPACING_MS);
}

console.log(failures ? `\n${failures} input(s) failed — rerun later.` : "\nAll demo answers saved. Review them, then commit lib/ai/demo/responses.json.");
process.exitCode = failures ? 1 : 0;
