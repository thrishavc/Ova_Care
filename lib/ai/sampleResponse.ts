import type { AnalyzeResponse } from "@/lib/types";

// Hard-coded Phase 1 reply so the frontend can be built before Gemini is wired in.
export const SAMPLE_RESPONSE: AnalyzeResponse = {
  urgency: "soon",
  redFlags: [],
  detectedLanguage: "hi-Latn",
  transcript: "3 mahine se periods nahi aaye, face pe acne",
  symptoms: [
    { name: "missed periods", duration: "3 months", severity: "unknown" },
    { name: "acne on face", duration: "unknown", severity: "unknown" },
  ],
  explanation:
    "Aapne bataya ki 3 mahine se periods nahi aaye aur face pe acne hai. Periods ka time pe na aana aur acne kai wajah se ho sakta hai. Yeh lakshan aksar PCOS, thyroid mein badlav ya stress se jude hote hain. Sirf doctor jaanch karke sahi wajah bata sakte hain.",
  possibleAssociations: ["PCOS", "thyroid changes", "stress"],
  careRecommendation: { type: "gynaecologist", when: "within 2-4 weeks" },
  questionsForDoctor: [
    "Kya mujhe PCOS ya thyroid ke liye koi test karwana chahiye?",
    "Mere periods regular karne ke liye kya kiya ja sakta hai?",
  ],
  followUpQuestions: [
    "Kya aapka cycle aam taur par 35 din se lamba hota hai?",
    "Kya chehre ya body par baal badh rahe hain?",
  ],
  sources: [
    {
      title: "WHO — Polycystic ovary syndrome fact sheet",
      url: "https://www.who.int/news-room/fact-sheets/detail/polycystic-ovary-syndrome",
    },
    {
      title: "NHS — Polycystic ovary syndrome",
      url: "https://www.nhs.uk/conditions/polycystic-ovary-syndrome-pcos/",
    },
  ],
  disclaimer:
    "Ova_Care gives general information, not a diagnosis. Please see a doctor for advice about your health.",
};
