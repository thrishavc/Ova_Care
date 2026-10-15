import { readFileSync } from "node:fs";
import path from "node:path";

const cache = new Map<string, string>();

/** Reads a prompt file from lib/ai/prompts/ (cached after the first read). */
export function loadPrompt(name: string): string {
  let text = cache.get(name);
  if (text === undefined) {
    text = readFileSync(path.join(process.cwd(), "lib", "ai", "prompts", name), "utf8");
    cache.set(name, text);
  }
  return text;
}
