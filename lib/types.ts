// Shared API contract (plan section 4). Frontend and backend both import from here.
// Change this file only after telling the whole team.

export type Urgency = "routine" | "soon" | "urgent";

export type CareType =
  | "gynaecologist"
  | "general doctor"
  | "endocrinologist"
  | "emergency";

/** POST /api/analyze request body */
export interface AnalyzeRequest {
  text: string | null;
  audioBase64: string | null;
  audioMimeType: string | null;
  /** "auto" or a BCP-47 tag such as "en", "hi", "hi-Latn" (Hinglish), "ta" */
  language: string;
  sessionId: string;
}

export interface Symptom {
  name: string;
  duration: string;
  severity: "mild" | "moderate" | "severe" | "unknown";
}

export interface Source {
  title: string;
  url: string;
}

export interface CareRecommendation {
  type: CareType;
  when: string;
}

/** POST /api/analyze response body */
export interface AnalyzeResponse {
  urgency: Urgency;
  redFlags: string[];
  detectedLanguage: string;
  /** What we understood from voice input, shown as "We heard: …" */
  transcript?: string;
  symptoms: Symptom[];
  explanation: string;
  possibleAssociations: string[];
  careRecommendation: CareRecommendation;
  questionsForDoctor: string[];
  followUpQuestions: string[];
  sources: Source[];
  disclaimer: string;
}

/** POST /api/summary request body: the result she got from /api/analyze */
export interface SummaryRequest {
  analysis: AnalyzeResponse;
}

/** One printable doctor-visit summary in a single language */
export interface DoctorSummary {
  /** e.g. "Summary for my doctor's visit" */
  heading: string;
  /** One or two sentences: why she is visiting */
  reasonForVisit: string;
  symptoms: { name: string; duration: string; severity: string }[];
  /** e.g. "Gynaecologist — within 2-4 weeks" */
  recommendedCare: string;
  questionsForDoctor: string[];
  /** Not-a-diagnosis note */
  note: string;
}

/** POST /api/summary response body. Show `english` and `translated` side by side. */
export interface SummaryResponse {
  /** Language of `translated`, e.g. "hi-Latn" */
  language: string;
  english: DoctorSummary;
  /** Same summary in her language; null when she used English */
  translated: DoctorSummary | null;
  /** ISO date the summary was made, for the printout */
  createdAt: string;
}

/** Returned with a non-2xx status when something goes wrong */
export interface ApiError {
  error: string;
  /** Friendly message safe to show the user */
  message: string;
}
