/**
 * Ova Care - Core Data Contracts and API Types
 * Defined contracts for frontend-backend communication across symptom analysis,
 * audio transcription, and clinical consultation summarization.
 */

export type UrgencyLevel = 'routine' | 'prompt' | 'urgent';

export interface AssociationItem {
  name: string;
  description: string;
  prevalenceNote?: string;
}

export interface VerifiedSource {
  title: string;
  organization: string;
  url: string;
  summary: string;
}

export interface SymptomAnalysisResult {
  id: string;
  timestamp: string;
  originalInput: string;
  detectedLanguage: string;
  urgency: UrgencyLevel;
  urgencyTitle: string;
  urgencyReason: string;
  understoodSymptoms: string[];
  durationAndDetails: string;
  missingInformation: string[];
  plainLanguageExplanation: string;
  commonAssociations: AssociationItem[];
  nextSteps: string[];
  suggestedDoctorQuestions: string[];
  verifiedSources: VerifiedSource[];
  disclaimer: string;
  isAiGenerated: boolean;
  demoModelLabel?: string;
}

export interface EducationalArticle {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  readingTime: string;
  summary: string;
  plainLanguageIntro: string;
  commonSymptoms: string[];
  educationalOverview: string[];
  whenToConsultDoctor: string[];
  urgentRedFlags: string[];
  lifestyleAndCare: string[];
  verifiedSources: VerifiedSource[];
  disclaimer: string;
}

/**
 * Transcription API Contracts
 * Endpoint: POST /api/transcribe
 * Transmits recorded audio and exact MediaRecorder MIME type to the transcription endpoint.
 */
export interface TranscriptionRequest {
  audio: Blob | File;
  audioMimeType: string;
  language?: string;
}

export interface TranscriptionResponse {
  transcript: string;
  text?: string;
  detectedLanguage?: string;
  success?: boolean;
  error?: string;
}

/**
 * Summary API Contracts
 * Endpoint: POST /api/summary
 * Transmits { analysis } to the consultation summary service.
 */
export interface SummaryRequest {
  analysis: SymptomAnalysisResult;
  language?: string;
}

export interface SummaryResponse {
  englishSummary: string;
  translatedSummary: string;
  language?: string;
  detectedLanguage?: string;
  success?: boolean;
  error?: string;
}

/**
 * Period Tracking & Menstrual Cycle Types
 */
export interface PeriodEntry {
  id: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  durationDays: number;
  flowIntensity?: 'light' | 'medium' | 'heavy';
  notes?: string;
  recordedAt: string;
}

export interface CalculatedCycle {
  id: string;
  cycleNumber: number;
  periodEntry: PeriodEntry;
  nextPeriodEntry?: PeriodEntry;
  cycleLengthDays?: number; // Days between this start and next period start
  isCalculable: boolean;
  status: 'recorded' | 'in_progress';
}

export interface CycleStats {
  totalPeriodsRecorded: number;
  lastPeriodStart?: string;
  lastPeriodEnd?: string;
  lastPeriodDuration?: number;
  averagePeriodDuration?: number;
  averageCycleLength?: number;
  estimatedNextPeriodStart?: string;
  estimatedNextPeriodEnd?: string;
  hasSufficientHistory: boolean;
}

/**
 * Stored Health Report for My Health Reports section
 */
export interface StoredHealthReport {
  id: string;
  createdAt: string;
  originalInput: string;
  detectedLanguage: string;
  analysis: SymptomAnalysisResult;
  englishSummary?: string;
  translatedSummary?: string;
  summaryLanguage?: string;
}

