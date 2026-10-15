import { SymptomAnalysisResult, TranscriptionResponse, SummaryResponse } from '../contract';

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL || '').replace(/\/$/, '');
const TRANSCRIBE_ENDPOINT = `${API_BASE_URL}/api/transcribe`;
const SUMMARY_ENDPOINT = `${API_BASE_URL}/api/summary`;

export interface TranscribeAudioOptions {
  audioBlob: Blob;
  audioMimeType: string;
  language?: string;
  signal?: AbortSignal;
}

/**
 * Sends recorded audio to the existing transcription endpoint (/api/transcribe).
 * Uses multipart/form-data and avoids setting the Content-Type header manually.
 * Passes the exact audioMimeType provided by MediaRecorder.
 */
export async function transcribeAudio({
  audioBlob,
  audioMimeType,
  language,
  signal,
}: TranscribeAudioOptions): Promise<TranscriptionResponse> {
  const formData = new FormData();
  
  // Choose an extension that reflects the container if possible, but keep blob intact
  const ext = audioMimeType.includes('mp4')
    ? 'mp4'
    : audioMimeType.includes('ogg')
    ? 'ogg'
    : audioMimeType.includes('wav')
    ? 'wav'
    : 'webm';
    
  formData.append('audio', audioBlob, `recording.${ext}`);
  formData.append('audioMimeType', audioMimeType);
  if (language) {
    formData.append('language', language);
  }

  const response = await fetch(TRANSCRIBE_ENDPOINT, {
    method: 'POST',
    body: formData,
    signal,
  });

  if (!response.ok) {
    let errorDetail = `Server returned status ${response.status}`;
    try {
      const errJson = await response.json();
      if (errJson.error || errJson.message) {
        errorDetail = errJson.error || errJson.message;
      }
    } catch {
      // ignore json parse error
    }
    throw new Error(errorDetail);
  }

  const data = await response.json();
  const transcript = typeof data.transcript === 'string'
    ? data.transcript
    : typeof data.text === 'string'
    ? data.text
    : '';

  return {
    transcript,
    text: transcript,
    detectedLanguage: data.detectedLanguage || language,
    success: data.success ?? true,
    error: data.error,
  };
}

export interface RequestSummaryOptions {
  analysis: SymptomAnalysisResult;
  language?: string;
  signal?: AbortSignal;
}

/**
 * Sends { analysis } to the consultation summary endpoint (/api/summary).
 * Returns the English and translated summaries from the backend response.
 */
export async function fetchConsultationSummary({
  analysis,
  language,
  signal,
}: RequestSummaryOptions): Promise<SummaryResponse> {
  const response = await fetch(SUMMARY_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      analysis,
      language,
    }),
    signal,
  });

  if (!response.ok) {
    let errorDetail = `Summary request failed (${response.status})`;
    try {
      const errJson = await response.json();
      if (errJson.error || errJson.message) {
        errorDetail = errJson.error || errJson.message;
      }
    } catch {
      // ignore json parse error
    }
    throw new Error(errorDetail);
  }

  const data = await response.json();

  // Support direct fields as well as nested data object
  const root = data.data || data;
  const englishSummary = root.englishSummary || root.english || root.summaryEnglish || '';
  const translatedSummary = root.translatedSummary || root.translated || root.summaryTranslated || '';

  return {
    englishSummary,
    translatedSummary,
    language: root.language || language,
    detectedLanguage: root.detectedLanguage,
    success: root.success ?? true,
    error: root.error,
  };
}
