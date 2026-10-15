// Fixed safety text shown without any AI involvement.
// Helplines: 112 (emergency), 108 (ambulance), Tele-MANAS 14416 (mental health) — check them
// against official government pages whenever this text changes.

export type UiLanguage = "en" | "hi" | "hi-Latn";

/** Picks en / hi / hi-Latn from a detected language tag. Anything unknown falls back to English. */
export function toUiLanguage(tag: string | undefined): UiLanguage {
  const t = (tag ?? "").toLowerCase();
  if (t === "hi-latn" || t === "hinglish") return "hi-Latn";
  if (t.startsWith("hi")) return "hi";
  return "en";
}

/** Cheap script check for the urgent path, which runs before Gemini detects the language. */
export function guessLanguage(text: string): UiLanguage {
  if (/[ऀ-ॿ]/.test(text)) return "hi";
  const hinglishWords = /\b(hai|hain|ho|raha|rahi|mujhe|mera|meri|nahi|bahut|dard|khoon|aa|se|pe|ke|ki)\b/i;
  return hinglishWords.test(text) ? "hi-Latn" : "en";
}

export const DISCLAIMER: Record<UiLanguage, string> = {
  en: "Ova_Care gives general information, not a diagnosis. Please see a doctor for advice about your health.",
  hi: "Ova_Care सामान्य जानकारी देता है, यह कोई निदान नहीं है। अपनी सेहत के बारे में सलाह के लिए कृपया डॉक्टर से मिलें।",
  "hi-Latn":
    "Ova_Care sirf general jaankari deta hai, yeh diagnosis nahi hai. Apni sehat ke baare mein salah ke liye doctor se zaroor milein.",
};

export const URGENT_MESSAGE: Record<UiLanguage, string> = {
  en: "What you describe can be a sign that you need medical care right away. Please go to the nearest hospital now, or call 112 (emergency) or 108 (ambulance). If possible, ask someone to stay with you.",
  hi: "आपने जो बताया वह इस बात का संकेत हो सकता है कि आपको तुरंत डॉक्टर की ज़रूरत है। कृपया अभी नज़दीकी अस्पताल जाएँ, या 112 (इमरजेंसी) या 108 (एम्बुलेंस) पर कॉल करें। हो सके तो किसी को अपने पास रहने के लिए कहें।",
  "hi-Latn":
    "Aapne jo bataya woh is baat ka sanket ho sakta hai ki aapko turant doctor ki zaroorat hai. Kripya abhi nazdeeki hospital jaayein, ya 112 (emergency) ya 108 (ambulance) par call karein. Ho sake to kisi ko apne paas rehne ke liye kahein.",
};

export const SELF_HARM_MESSAGE: Record<UiLanguage, string> = {
  en: "You are not alone, and help is available right now. Please call Tele-MANAS at 14416 (free, 24x7) or 112 if you are in immediate danger. Talking to someone you trust can also help.",
  hi: "आप अकेली नहीं हैं, और मदद अभी उपलब्ध है। कृपया Tele-MANAS को 14416 (मुफ़्त, 24x7) पर कॉल करें, या तुरंत खतरा हो तो 112 पर कॉल करें। किसी भरोसेमंद व्यक्ति से बात करना भी मदद कर सकता है।",
  "hi-Latn":
    "Aap akeli nahi hain, aur madad abhi uplabdh hai. Kripya Tele-MANAS ko 14416 (free, 24x7) par call karein, ya turant khatra ho to 112 par call karein. Kisi bharosemand insaan se baat karna bhi madad kar sakta hai.",
};

/** Shown when we cannot give a grounded explanation (no sources, or the safety filter failed twice). */
export const SAFE_FALLBACK: Record<UiLanguage, string> = {
  en: "We could not find trusted information that matches what you described. The best next step is to talk to a doctor, who can examine you and explain what is going on.",
  hi: "आपने जो बताया उससे मेल खाती भरोसेमंद जानकारी हमें नहीं मिली। सबसे अच्छा अगला कदम है डॉक्टर से बात करना, जो जाँच करके आपको सही बात बता सकें।",
  "hi-Latn":
    "Aapne jo bataya usse milti-julti bharosemand jaankari humein nahi mili. Sabse achha agla kadam hai doctor se baat karna, jo jaanch karke aapko sahi baat bata sakein.",
};
