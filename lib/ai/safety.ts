// Step E: last check on everything the model wrote before it reaches the user.
// Blocks diagnosis language, medicine names and doses. Member 3's eval harness uses the same list.

const BANNED_PATTERNS: RegExp[] = [
  // Diagnosis language (English, Hinglish, Hindi)
  /\byou have\b/i,
  /\byou(?:'ve| have) got\b/i,
  /diagnos/i,
  /\bconfirm(?:ed|s)?\b/i,
  /\baapko\s+(?:pcos|pcod|thyroid|diabetes|infection)\s+(?:hai|he|ho)\b/i,
  /निदान/,
  /पुष्टि/,
  /आपको\s+(?:PCOS|PCOD|पीसीओएस|पीसीओडी|थायरॉइड|डायबिटीज़?)\s+(?:है|हो)/i,
  // Medicines and doses
  /\b(?:metformin|clomiphene|clomid|letrozole|spironolactone|inositol|myo-inositol|progesterone|estrogen|oestrogen|levothyroxine|thyroxine|ibuprofen|paracetamol|mefenamic|tranexamic|norethisterone|meprate|dydrogesterone)\b/i,
  /\b(?:birth control|contraceptive) pills?\b/i,
  /\b\d+\s?(?:mg|mcg|ml|iu)\b/i,
  /\b(?:tablet|tablets|capsule|dose|dosage|goli)\b/i,
  /गोली|टैबलेट|दवा की खुराक/,
];

/** Returns the patterns that matched (empty = safe). */
export function findBannedContent(texts: string[]): string[] {
  const joined = texts.join("\n");
  return BANNED_PATTERNS.filter((p) => p.test(joined)).map((p) => p.source);
}
