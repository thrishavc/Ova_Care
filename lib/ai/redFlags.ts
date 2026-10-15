import redFlagList from "@/content/red-flags.json";

// Step A: deterministic red-flag check that runs before any AI call.
// Matches Member 4's exact phrases (content/red-flags.json) plus the keyword rules below,
// because real users rarely type a whole phrase word for word.
// DRAFT keyword rules — Member 4 to review and extend (regional languages, spellings).

export type RedFlagCategory =
  | "very_heavy_bleeding"
  | "fainting_or_severe_dizziness"
  | "sudden_severe_abdominal_pain"
  | "fever_with_pelvic_pain"
  | "possible_pregnancy_with_pain_or_bleeding"
  | "bleeding_after_menopause"
  | "self_harm_risk";

interface RedFlagEntry {
  phrase: string;
  language: string;
  category: string;
  action: string;
}

interface KeywordRule {
  category: RedFlagCategory;
  /** Every group must match; a group matches if any of its terms appears. */
  allOf: string[][];
}

const KEYWORD_RULES: KeywordRule[] = [
  {
    category: "very_heavy_bleeding",
    allOf: [[
      "soaking a pad", "soaked a pad", "soaking pads", "pad every hour", "pads every hour",
      "very heavy bleeding", "bleeding very heavily", "bleeding heavily", "heavy bleeding with clots",
      "bahut zyada bleeding", "bahut jyada bleeding", "bahut zyada khoon", "bahut jyada khoon",
      "bahut bleeding", "pad har ghante", "har ghante pad",
      "बहुत ज्यादा खून", "बहुत ज्यादा ब्लीडिंग", "बहुत खून", "हर घंटे पैड",
    ]],
  },
  {
    category: "fainting_or_severe_dizziness",
    allOf: [[
      "faint", "passed out", "pass out", "unconscious", "dizzy", "dizziness",
      "behosh", "behoshi", "chakkar", "chakar",
      "बेहोश", "चक्कर",
    ]],
  },
  {
    category: "sudden_severe_abdominal_pain",
    allOf: [[
      "severe abdominal pain", "severe stomach pain", "severe belly pain", "severe pelvic pain",
      "sudden severe pain", "unbearable pain", "unbearable stomach pain",
      "bahut tez dard", "bahut tej dard", "achanak tez dard", "achanak tej dard",
      "achanak bahut dard", "sehan nahi", "sahan nahi",
      "बहुत तेज दर्द", "अचानक तेज दर्द", "अचानक बहुत दर्द", "असहनीय दर्द",
    ]],
  },
  {
    category: "fever_with_pelvic_pain",
    allOf: [
      ["fever", "bukhar", "bukhaar", "बुखार"],
      ["pelvic pain", "lower abdomen", "lower belly", "lower stomach", "pelvic",
        "pet dard", "pet mein dard", "pet me dard", "neeche dard", "niche dard",
        "पेट में दर्द", "पेट दर्द", "निचले हिस्से"],
    ],
  },
  {
    category: "possible_pregnancy_with_pain_or_bleeding",
    allOf: [
      ["pregnant", "pregnancy", "garbh", "garbhvati", "गर्भ", "प्रेग्नेंट", "प्रेगनेंसी"],
      ["pain", "bleeding", "bleed", "blood", "spotting", "dard", "khoon",
        "दर्द", "खून", "ब्लीडिंग"],
    ],
  },
  {
    category: "bleeding_after_menopause",
    allOf: [
      ["menopause", "post menopause", "postmenopausal", "मेनोपॉज", "रजोनिवृत्ति"],
      ["bleeding", "blood", "spotting", "khoon", "खून", "ब्लीडिंग"],
    ],
  },
  {
    category: "self_harm_risk",
    allOf: [[
      "hurt myself", "hurting myself", "harm myself", "harming myself", "kill myself",
      "suicide", "suicidal", "end my life", "want to die", "dont want to live",
      "khud ko harm", "khud ko nuksan", "khud ko nuksaan", "khud ko maar",
      "marna chahti", "mar jaana chahti", "jeena nahi chahti", "aatmahatya", "atmahatya",
      "खुद को नुकसान", "खुद को मार", "आत्महत्या", "मरना चाहती", "जीना नहीं चाहती",
    ]],
  },
];

/** Lowercase, drop Devanagari nukta, strip punctuation, collapse spaces. */
export function normalize(text: string): string {
  return text
    .normalize("NFC")
    .toLowerCase()
    .replace(/़/g, "")
    .replace(/[’']/g, "")
    .replace(/[^\p{L}\p{M}\p{N}]+/gu, " ")
    .trim();
}

const isLatin = (term: string) => /^[a-z0-9 ]+$/.test(term);

/** Latin terms must start at a word boundary ("faint" matches "fainting", not "complaint"). */
function containsTerm(haystack: string, term: string): boolean {
  const t = normalize(term);
  if (!t) return false;
  if (!isLatin(t)) return haystack.includes(t);
  return ` ${haystack}`.includes(` ${t}`);
}

export interface RedFlagMatch {
  category: RedFlagCategory;
  action: string;
}

const actionByCategory = new Map<string, string>(
  (redFlagList as RedFlagEntry[]).map((e) => [e.category, e.action]),
);

/** Returns every red-flag category found in the text (empty array = none). */
export function checkRedFlags(text: string): RedFlagMatch[] {
  const haystack = normalize(text);
  if (!haystack) return [];
  const found = new Set<RedFlagCategory>();

  for (const entry of redFlagList as RedFlagEntry[]) {
    if (containsTerm(haystack, entry.phrase)) found.add(entry.category as RedFlagCategory);
  }
  for (const rule of KEYWORD_RULES) {
    if (rule.allOf.every((group) => group.some((term) => containsTerm(haystack, term)))) {
      found.add(rule.category);
    }
  }

  return [...found].map((category) => ({
    category,
    action: actionByCategory.get(category) ?? "urgent_medical_care",
  }));
}
