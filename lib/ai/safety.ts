// Step E: last check on everything the model wrote before it reaches the user.
// Blocks diagnosis language, medicine names and doses. Member 3's eval harness uses the same list.

interface BannedRule {
  pattern: RegExp;
  /** Plain description, also used to tell the model exactly what to avoid on a retry */
  label: string;
  /** What to write instead */
  instead?: string;
}

const BANNED: BannedRule[] = [
  // Diagnosis language (English, Hinglish, Hindi)
  { pattern: /\byou have\b/i, label: `"you have"`, instead: `"you mentioned" or "you said there is"` },
  { pattern: /\byou(?:'ve| have) got\b/i, label: `"you've got"`, instead: `"you mentioned"` },
  { pattern: /diagnos/i, label: `"diagnose" / "diagnosis"`, instead: `"find the cause" or "check"` },
  { pattern: /\bconfirm(?:ed|s)?\b/i, label: `"confirm" / "confirmed"`, instead: `"check"` },
  { pattern: /\baapko\s+(?:pcos|pcod|thyroid|diabetes|infection)\s+(?:hai|he|ho)\b/i, label: `"aapko … hai" about a condition` },
  { pattern: /निदान/, label: `"निदान"`, instead: `"कारण पता करना"` },
  { pattern: /पुष्टि/, label: `"पुष्टि"`, instead: `"जाँच"` },
  { pattern: /आपको\s+(?:PCOS|PCOD|पीसीओएस|पीसीओडी|थायरॉइड|डायबिटीज़?)\s+(?:है|हो)/i, label: `"आपको … है" about a condition` },
  // Medicines and doses
  {
    pattern: /\b(?:metformin|clomiphene|clomid|letrozole|spironolactone|inositol|myo-inositol|progesterone|estrogen|oestrogen|levothyroxine|thyroxine|ibuprofen|paracetamol|mefenamic|tranexamic|norethisterone|meprate|dydrogesterone)\b/i,
    label: "medicine names",
    instead: `"treatment options"`,
  },
  { pattern: /\b(?:birth control|contraceptive) pills?\b/i, label: `"birth control pills"`, instead: `"treatment options"` },
  { pattern: /\b\d+\s?(?:mg|mcg|ml|iu)\b/i, label: "doses (mg, ml …)" },
  { pattern: /\b(?:tablet|tablets|capsule|dose|dosage|goli)\b/i, label: `"tablet" / "dose" / "goli"`, instead: `"medicine questions" or "treatment options"` },
  { pattern: /गोली|टैबलेट|दवा की खुराक/, label: `"गोली" / "टैबलेट"`, instead: `"इलाज के विकल्प"` },
];

/** Returns a plain label for each banned rule that matched (empty = safe). */
export function findBannedContent(texts: string[]): string[] {
  const joined = texts.join("\n");
  return BANNED.filter((r) => r.pattern.test(joined)).map((r) => r.label);
}

/** A precise rewrite instruction for the model, naming the words it used. */
export function rewriteInstruction(labels: string[]): string {
  const rules = BANNED.filter((r) => labels.includes(r.label));
  const lines = rules.map((r) => `- Do not write ${r.label}${r.instead ? `; write ${r.instead} instead` : ""}.`);
  return [
    "IMPORTANT: your previous answer used words we must never show. Rewrite the whole answer and",
    "avoid them everywhere, including when repeating what she said or asked:",
    ...lines,
    "Keep the same meaning, language and kind tone.",
  ].join("\n");
}
