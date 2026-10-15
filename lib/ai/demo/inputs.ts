// The demo-day inputs (plan section 10). Their real pipeline answers are saved in responses.json
// by `npm run demo:warm`, so the live demo never waits on the free-tier Gemini API.
// Only these fixed phrases are cached — never real users' text.

export interface DemoInput {
  id: string;
  text: string;
  /** What the language picker will be set to during the demo */
  language: string;
}

export const DEMO_INPUTS: DemoInput[] = [
  {
    id: "case1-hinglish-voice",
    text: "Teen mahine se periods nahi aaye, chehre pe bahut acne hai, weight bhi badh raha hai.",
    language: "auto",
  },
  {
    id: "hinglish-short",
    text: "3 mahine se periods nahi aaye, face pe acne",
    language: "auto",
  },
  {
    id: "case2-regional",
    // Hindi in Devanagari script
    text: "पीरियड्स बहुत अनियमित हैं और चेहरे पर बाल बढ़ रहे हैं",
    language: "auto",
  },
  {
    id: "english",
    text: "My periods come every two months and I have hair growing on my chin",
    language: "auto",
  },
  {
    id: "case3-red-flag",
    text: "Bahut zyada bleeding ho rahi hai, chakkar aa rahe hain.",
    language: "auto",
  },
];
