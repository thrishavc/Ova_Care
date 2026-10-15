import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Mic,
  Sparkles,
  Send,
  AlertCircle,
  Info,
  RotateCcw,
  Languages,
  Square,
  X,
  Volume2,
  Check,
  FileEdit,
  Loader2,
  HelpCircle,
} from 'lucide-react';
import { SymptomAnalysisResult } from '../contract';
import { errorMessage, getSpeechRecognition, type SpeechRecognitionLike, type SpeechRecognitionEventLike, type SpeechRecognitionErrorEventLike } from '../types/speech';
import { useLanguage } from '../i18n/LanguageContext';
import { SupportedLanguage } from '../i18n/translations';
import { transcribeAudio } from '../services/voiceSummaryApi';

interface SymptomAssistantProps {
  initialText?: string;
  onAnalysisComplete: (result: SymptomAnalysisResult) => void;
  onCancel?: () => void;
  onSwitchToChat?: () => void;
}

type VoiceRecordingStatus = 'idle' | 'recording' | 'processing' | 'review';

/**
 * Checks supported audio MIME types dynamically using MediaRecorder.isTypeSupported.
 * Never assumes a single format is supported across all browsers.
 */
function getSupportedAudioMimeType(): string | undefined {
  if (typeof window === 'undefined' || typeof MediaRecorder === 'undefined') {
    return undefined;
  }
  if (typeof MediaRecorder.isTypeSupported !== 'function') {
    return undefined;
  }
  const candidateMimeTypes = [
    'audio/webm;codecs=opus',
    'audio/webm',
    'audio/ogg;codecs=opus',
    'audio/ogg',
    'audio/mp4',
    'audio/aac',
    'audio/wav',
  ];
  for (const mimeType of candidateMimeTypes) {
    if (MediaRecorder.isTypeSupported(mimeType)) {
      return mimeType;
    }
  }
  return undefined;
}

export const SymptomAssistant: React.FC<SymptomAssistantProps> = ({
  initialText = '',
  onAnalysisComplete,
  onCancel,
  onSwitchToChat,
}) => {
  const { language, setLanguage, t } = useLanguage();
  const [symptoms, setSymptoms] = useState(initialText);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  // Dedicated speech/voice language (supports Kannada, Hindi, English)
  const [voiceLanguage, setVoiceLanguage] = useState<SupportedLanguage>(language);

  // Follow the global language whenever it changes
  const [prevLanguage, setPrevLanguage] = useState(language);
  if (language !== prevLanguage) {
    setPrevLanguage(language);
    setVoiceLanguage(language);
  }

  // Voice recording state
  const [recordingStatus, setRecordingStatus] = useState<VoiceRecordingStatus>('idle');
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [voiceError, setVoiceError] = useState<string | null>(null);
  const [canRetryTranscription, setCanRetryTranscription] = useState(false);
  const [emptySpeechDetected, setEmptySpeechDetected] = useState(false);
  const [weHeardTranscript, setWeHeardTranscript] = useState('');
  const [interimLiveSpeech, setInterimLiveSpeech] = useState('');
  const [showCombineOptions, setShowCombineOptions] = useState(false);

  // References for MediaStream, MediaRecorder, SpeechRecognition, Audio Chunks, and Timer
  const streamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const speechRecognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<number | null>(null);
  const lastRecordedBlobRef = useRef<{ blob: Blob; mimeType: string } | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const liveTranscriptAccumulatorRef = useRef<string>('');

  const sampleTexts: Record<SupportedLanguage, string> = {
    kn: 'ನನ್ನ ಮುಟ್ಟು ಕಳೆದ ೨ ತಿಂಗಳುಗಳಿಂದ ಸರಿ ಇಲ್ಲ ಮತ್ತು ಹೊಟ್ಟೆಯ ಕೆಳಭಾಗದಲ್ಲಿ ನೋವು ಬರುತ್ತಿದೆ.',
    hi: 'मेरे पीरियड्स दो महीने से अनियमित हैं और कभी-कभी पेट के निचले हिस्से में दर्द होता है।',
    en: 'My periods have been irregular for two months, and sometimes I experience lower abdominal pain.',
  };

  const placeholders: Record<SupportedLanguage, string> = {
    kn: 'ಉದಾಹರಣೆಗೆ: ನನ್ನ ಮುಟ್ಟು ಕಳೆದ ೨ ತಿಂಗಳುಗಳಿಂದ ಸರಿ ಇಲ್ಲ ಮತ್ತು ಹೊಟ್ಟೆಯ ಕೆಳಭಾಗದಲ್ಲಿ ನೋವು ಬರುತ್ತಿದೆ... ಅಥವಾ ನಿಮ್ಮದೇ ಮಾತುಗಳಲ್ಲಿ ವಿವರಿಸಿ.',
    hi: 'उदाहरण: मेरे पीरियड्स दो महीने से अनियमित हैं और कभी-कभी पेट के निचले हिस्से में दर्द होता है... या अपने शब्दों में लिखें।',
    en: 'Example: My periods have been irregular for two months, and sometimes I experience lower abdominal pain... or describe in your own words.',
  };

  const examplePromptsByLang: Record<SupportedLanguage, Array<{ label: string; text: string }>> = {
    en: [
      {
        label: '🌸 Irregular Cycles & Lower Abdominal Pain',
        text: 'My periods have been irregular for the last two months, and I have mild, persistent lower abdominal pain.',
      },
      {
        label: '⚡ Severe Debilitating Menstrual Cramps',
        text: 'I have intense, debilitating period cramps that keep me bedridden for two to three days each month, with nausea.',
      },
      {
        label: '🌿 Suspected PCOS (Acne & Hair Growth)',
        text: 'My cycle spans 45 to 60 days, and I have developed cystic jawline acne and dark coarse hairs on my chin.',
      },
      {
        label: '🚨 High Urgency (Sudden Severe Pain & Dizziness)',
        text: 'Sudden, extremely sharp pelvic pain on my right side that started an hour ago. I feel lightheaded and fainted once.',
      },
    ],
    hi: [
      {
        label: '🌸 अनियमित पीरियड्स और पेट में हल्का दर्द',
        text: 'मेरे पीरियड्स पिछले दो महीने से अनियमित हैं और कभी-कभी पेट के निचले हिस्से में हल्का दर्द होता है।',
      },
      {
        label: '⚡ गंभीर और असहनीय मासिक ऐंठन',
        text: 'मासिक धर्म के दौरान बहुत तेज़ और असहनीय ऐंठन होती है जो 2-3 दिन तक मुझे बिस्तर पर रहने को मजबूर कर देती है।',
      },
      {
        label: '🌿 पीसीओएस (अनियमितता, मुंहासे और बाल)',
        text: 'मेरा पीरियड चक्र 45 से 60 दिनों का हो गया है, जबड़े के पास मुंहासे निकल रहे हैं और चेहरे पर अनचाहे बाल बढ़ रहे हैं।',
      },
      {
        label: '🚨 गंभीर आपातकालीन लक्षण (तेज़ दर्द और बेहोशी)',
        text: 'पेट के दाहिने हिस्से में अचानक बहुत तेज़ असहनीय दर्द शुरू हुआ है और मुझे चक्कर और बेहोशी महसूस हो रही है।',
      },
    ],
    kn: [
      {
        label: '🌸 ಅನಿಯಮಿತ ಮುಟ್ಟು ಮತ್ತು ಹೊಟ್ಟೆ ನೋವು',
        text: 'ನನ್ನ ಮುಟ್ಟು ಕಳೆದ ೨ ತಿಂಗಳುಗಳಿಂದ ಸರಿ ಇಲ್ಲ ಮತ್ತು ಹೊಟ್ಟೆಯ ಕೆಳಭಾಗದಲ್ಲಿ ನೋವು ಬರುತ್ತಿದೆ.',
      },
      {
        label: '⚡ ಮುಟ್ಟಿನ ಅಸಹನೀಯ ಸೆಳೆತ ಮತ್ತು ನೋವು',
        text: 'ಮುಟ್ಟಿನ ಸಮಯದಲ್ಲಿ ತೀವ್ರವಾದ ಅಸಹನೀಯ ಹೊಟ್ಟೆ ನೋವು ಮತ್ತು ವಾಂತಿ ಬರುತ್ತದೆ, ೨-೩ ದಿನ ಹಾಸಿಗೆಯಿಂದ ಏಳಲು ಆಗುವುದಿಲ್ಲ.',
      },
      {
        label: '🌿 ಪಿಸಿಒಎಸ್ (ಮುಖದಲ್ಲಿ ಕೂದಲು ಮತ್ತು ಮೊಡವೆ)',
        text: 'ಮುಟ್ಟಿನ ಅಂತರ ೪೫ ರಿಂದ ೬೦ ದಿನಗಳಾಗಿದ್ದು, ಮುಖದಲ್ಲಿ ಮೊಡವೆಗಳು ಮತ್ತು ಗಲ್ಲದ ಮೇಲೆ ಕೂದಲು ಬೆಳೆಯುತ್ತಿದೆ.',
      },
      {
        label: '🚨 ತೀವ್ರ ತುರ್ತು ಲಕ್ಷಣ (ಹಠಾತ್ ನೋವು ಮತ್ತು ತಲೆತಿರುಗುವಿಕೆ)',
        text: 'ಹೊಟ್ಟೆಯ ಬಲಭಾಗದಲ್ಲಿ ಹಠಾತ್ ತೀವ್ರವಾದ ಚುಚ್ಚುವ ನೋವು ಉಂಟಾಗಿದ್ದು, ತಲೆತಿರುಗಿ ಒಮ್ಮೆ ಪ್ರಜ್ಞೆ ತಪ್ಪಿದೆ.',
      },
    ],
  };

  const examplePrompts = examplePromptsByLang[language] || examplePromptsByLang.en;

  // Cleanup helper to release media tracks, timers, and speech recognizers
  const stopMicrophoneTracks = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        try {
          track.stop();
        } catch {}
      });
      streamRef.current = null;
    }
    if (speechRecognitionRef.current) {
      try {
        speechRecognitionRef.current.stop();
      } catch {}
      speechRecognitionRef.current = null;
    }
  }, []);

  const clearTimer = useCallback(() => {
    if (timerIntervalRef.current !== null) {
      window.clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
  }, []);

  // Ensure microphone tracks and background jobs are cleaned up on unmount
  useEffect(() => {
    return () => {
      clearTimer();
      stopMicrophoneTracks();
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [clearTimer, stopMicrophoneTracks]);

  const handleGlobalLanguageChange = (newLang: SupportedLanguage) => {
    setLanguage(newLang);
    setVoiceLanguage(newLang);
    setValidationError(null);
    setServerError(null);

    // If symptoms are currently empty or equal to a known sample text, update it to the new language's sample
    if (!symptoms.trim() || Object.values(sampleTexts).includes(symptoms.trim())) {
      setSymptoms(sampleTexts[newLang]);
    }
  };

  const handleLoadSampleForCurrentLanguage = () => {
    const textToLoad = sampleTexts[language] || sampleTexts.en;
    setSymptoms(textToLoad);
    setValidationError(null);
    setServerError(null);
  };

  const handleSelectExample = (ex: { label: string; text: string }) => {
    setSymptoms(ex.text);
    setValidationError(null);
    setServerError(null);
  };

  /**
   * Dispatches the recorded audio blob straight to the transcription endpoint (/api/transcribe).
   * Passes the exact audioMimeType from MediaRecorder without hardcoding or tampering.
   */
  const sendForTranscription = async (blob: Blob, mimeType: string, langToUse?: SupportedLanguage) => {
    setRecordingStatus('processing');
    setVoiceError(null);
    setCanRetryTranscription(false);
    setEmptySpeechDetected(false);

    const activeLang = langToUse || voiceLanguage || language || 'en';

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const response = await transcribeAudio({
        audioBlob: blob,
        audioMimeType: mimeType,
        language: activeLang,
        signal: controller.signal,
      });

      // Prefer live speech transcript if recognized by browser, or backend transcription result
      let transcript = (response.transcript || response.text || '').trim();
      if (!transcript && liveTranscriptAccumulatorRef.current.trim()) {
        transcript = liveTranscriptAccumulatorRef.current.trim();
      }

      if (!transcript) {
        // No speech detected in recording
        setEmptySpeechDetected(true);
        setRecordingStatus('idle');
      } else {
        setWeHeardTranscript(transcript);
        setRecordingStatus('review');
        setShowCombineOptions(symptoms.trim().length > 0 && symptoms.trim() !== transcript);
      }
    } catch (caught) {
      const err = caught instanceof Error ? caught : new Error(errorMessage(caught));
      if (err.name === 'AbortError') return;

      // If network endpoint failed but live browser recognition captured speech, preserve the user's speech
      if (liveTranscriptAccumulatorRef.current.trim()) {
        const transcript = liveTranscriptAccumulatorRef.current.trim();
        setWeHeardTranscript(transcript);
        setRecordingStatus('review');
        setShowCombineOptions(symptoms.trim().length > 0 && symptoms.trim() !== transcript);
        return;
      }

      setVoiceError(
        err.message ||
          t('voice.transcriptionError') ||
          'Failed to transcribe audio. Please check connection and try again.'
      );
      setCanRetryTranscription(true);
      setRecordingStatus('idle');
    }
  };

  /**
   * Starts microphone recording in Kannada, Hindi, or English using MediaDevices, MediaRecorder,
   * and Web Speech Recognition API for seamless real-time capture.
   */
  const handleStartRecording = async (overrideLang?: SupportedLanguage) => {
    if (recordingStatus === 'recording' || recordingStatus === 'processing') {
      return; // Prevent multiple simultaneous recordings
    }

    const activeSpeechLang = overrideLang || voiceLanguage || language || 'en';
    if (overrideLang && overrideLang !== voiceLanguage) {
      setVoiceLanguage(overrideLang);
    }

    setVoiceError(null);
    setValidationError(null);
    setServerError(null);
    setEmptySpeechDetected(false);
    setCanRetryTranscription(false);
    setInterimLiveSpeech('');
    liveTranscriptAccumulatorRef.current = '';

    const hasMediaDevices =
      typeof window !== 'undefined' &&
      navigator.mediaDevices &&
      typeof navigator.mediaDevices.getUserMedia === 'function';
    const SpeechRecognition =
      typeof window !== 'undefined'
        ? getSpeechRecognition()
        : null;

    if (!hasMediaDevices && !SpeechRecognition) {
      setVoiceError(
        t('voice.notSupported') ||
          'Audio recording is not supported in this browser. Please type your symptoms or use quick speech samples.'
      );
      return;
    }

    let speechRecognizerStarted = false;
    let mediaRecorderStarted = false;

    // 1. Initialize Web Speech API for real-time transcription in the chosen language (Kannada, Hindi, English)
    if (SpeechRecognition) {
      try {
        const recognizer = new SpeechRecognition();
        speechRecognitionRef.current = recognizer;
        recognizer.continuous = true;
        recognizer.interimResults = true;
        recognizer.maxAlternatives = 1;

        // Set specific regional language model for Kannada, Hindi, or English
        if (activeSpeechLang === 'kn') {
          recognizer.lang = 'kn-IN'; // Kannada (India)
        } else if (activeSpeechLang === 'hi') {
          recognizer.lang = 'hi-IN'; // Hindi (India)
        } else {
          recognizer.lang = 'en-IN'; // English (India) / en-US
        }

        recognizer.onresult = (event: SpeechRecognitionEventLike) => {
          let fullTranscript = '';
          let interimTranscript = '';
          for (let i = 0; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              fullTranscript += event.results[i][0].transcript + ' ';
            } else {
              interimTranscript += event.results[i][0].transcript;
            }
          }
          const combined = (fullTranscript + interimTranscript).trim();
          if (combined) {
            setInterimLiveSpeech(combined);
            liveTranscriptAccumulatorRef.current = combined;
          }
        };

        recognizer.onerror = (e: SpeechRecognitionErrorEventLike) => {
          console.warn('SpeechRecognition notice:', e?.error);
        };

        recognizer.start();
        speechRecognizerStarted = true;
      } catch (e) {
        console.warn('Could not start real-time SpeechRecognition:', e);
      }
    }

    // 2. Request microphone stream for MediaRecorder audio capture
    if (hasMediaDevices) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
          },
        });
        streamRef.current = stream;

        // Select dynamically supported MIME type
        const preferredMimeType = getSupportedAudioMimeType();
        const recorderOptions: MediaRecorderOptions = {};
        if (preferredMimeType) {
          recorderOptions.mimeType = preferredMimeType;
        }

        const recorder = new MediaRecorder(stream, recorderOptions);
        mediaRecorderRef.current = recorder;
        audioChunksRef.current = [];

        recorder.ondataavailable = (event: BlobEvent) => {
          if (event.data && event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        recorder.onerror = () => {
          stopMicrophoneTracks();
          clearTimer();
          setVoiceError(t('voice.recordingError') || 'An error occurred during voice recording.');
          setRecordingStatus('idle');
        };

        recorder.onstop = () => {
          stopMicrophoneTracks();
          clearTimer();

          // Get actual recorded MIME type directly from MediaRecorder instance
          const recordedMimeType = recorder.mimeType || preferredMimeType || 'audio/webm';
          const audioBlob = new Blob(audioChunksRef.current, { type: recordedMimeType });

          if (audioBlob.size === 0 && !liveTranscriptAccumulatorRef.current.trim()) {
            setEmptySpeechDetected(true);
            setRecordingStatus('idle');
            return;
          }

          lastRecordedBlobRef.current = { blob: audioBlob, mimeType: recordedMimeType };
          sendForTranscription(audioBlob, recordedMimeType, activeSpeechLang);
        };

        // Start MediaRecorder in chunks
        recorder.start(250);
        mediaRecorderStarted = true;
      } catch (caughtMedia) {
        const mediaErr = caughtMedia instanceof Error ? caughtMedia : new Error(errorMessage(caughtMedia));
        console.warn('getUserMedia warning:', mediaErr);
        // If SpeechRecognition already started, do NOT fail the session!
        if (!speechRecognizerStarted) {
          stopMicrophoneTracks();
          clearTimer();

          if (mediaErr.name === 'NotAllowedError' || mediaErr.name === 'PermissionDeniedError') {
            setVoiceError(
              t('voice.permissionDenied') ||
                'Microphone access denied. Please click the camera/lock icon in your browser address bar to allow microphone access, or use the instant voice test below.'
            );
          } else {
            setVoiceError(
              mediaErr.message ||
                t('voice.recordingError') ||
                'Could not access microphone. Please check your audio settings.'
            );
          }
          setRecordingStatus('idle');
          return;
        }
      }
    }

    if (!speechRecognizerStarted && !mediaRecorderStarted) {
      stopMicrophoneTracks();
      clearTimer();
      setVoiceError(
        'Could not access microphone in this browser. Please allow microphone permissions or use one of the quick voice tests below.'
      );
      setRecordingStatus('idle');
      return;
    }

    setRecordingStatus('recording');
    setElapsedSeconds(0);

    // Start elapsed timer
    clearTimer();
    timerIntervalRef.current = window.setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
  };

  /**
   * Stop recording and submit audio for transcription
   */
  const handleStopRecording = () => {
    if (speechRecognitionRef.current) {
      try {
        speechRecognitionRef.current.stop();
      } catch {}
    }

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    } else if (liveTranscriptAccumulatorRef.current.trim()) {
      // If mediaRecorder was not running but speech recognition captured words
      stopMicrophoneTracks();
      clearTimer();
      setWeHeardTranscript(liveTranscriptAccumulatorRef.current.trim());
      setRecordingStatus('review');
      setShowCombineOptions(
        symptoms.trim().length > 0 && symptoms.trim() !== liveTranscriptAccumulatorRef.current.trim()
      );
    } else {
      stopMicrophoneTracks();
      clearTimer();
      setEmptySpeechDetected(true);
      setRecordingStatus('idle');
    }
  };

  /**
   * Cancel recording without submitting
   */
  const handleCancelRecording = () => {
    clearTimer();
    setElapsedSeconds(0);
    setInterimLiveSpeech('');
    liveTranscriptAccumulatorRef.current = '';

    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.onstop = null;
      if (mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
      mediaRecorderRef.current = null;
    }

    stopMicrophoneTracks();
    audioChunksRef.current = [];
    lastRecordedBlobRef.current = null;
    setRecordingStatus('idle');
    setVoiceError(null);
  };

  /**
   * Retry transcription of the last recorded audio blob
   */
  const handleRetryTranscription = () => {
    if (lastRecordedBlobRef.current) {
      sendForTranscription(
        lastRecordedBlobRef.current.blob,
        lastRecordedBlobRef.current.mimeType,
        voiceLanguage
      );
    } else {
      handleStartRecording(voiceLanguage);
    }
  };

  /**
   * Confirm "We heard" transcript as symptom description
   */
  const handleConfirmTranscript = (mode: 'replace' | 'append' = 'replace') => {
    const trimmedTranscript = weHeardTranscript.trim();
    if (!trimmedTranscript) {
      setRecordingStatus('idle');
      return;
    }

    if (mode === 'append' && symptoms.trim()) {
      setSymptoms((prev) => `${prev.trim()}\n\n${trimmedTranscript}`);
    } else {
      setSymptoms(trimmedTranscript);
    }

    setRecordingStatus('idle');
    setShowCombineOptions(false);
    setValidationError(null);
    setServerError(null);
  };

  /**
   * Discard voice transcript and return to normal text entry
   */
  const handleCancelTranscriptReview = () => {
    setWeHeardTranscript('');
    setRecordingStatus('idle');
    setShowCombineOptions(false);
  };

  /**
   * Load a voice simulation in the selected language (Kannada, Hindi, or English)
   * Helpful for testing when hardware microphone is blocked or not connected.
   */
  const handleTestVoiceSimulation = (langToTest: SupportedLanguage) => {
    setVoiceLanguage(langToTest);
    const sample = sampleTexts[langToTest];
    setWeHeardTranscript(sample);
    setRecordingStatus('review');
    setShowCombineOptions(symptoms.trim().length > 0 && symptoms.trim() !== sample);
    setVoiceError(null);
  };

  /**
   * Submit symptoms to the existing /api/analyze-symptoms endpoint
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading || recordingStatus === 'recording' || recordingStatus === 'processing') {
      return; // Prevent duplicate submissions or submitting while processing audio
    }

    setValidationError(null);
    setServerError(null);

    let trimmed = symptoms.trim();

    // If empty, automatically load sample
    if (!trimmed) {
      trimmed = sampleTexts[language] || sampleTexts.en;
      setSymptoms(trimmed);
    }

    if (trimmed.length < 2) {
      setValidationError('Please provide a symptom description to analyze.');
      return;
    }

    setIsLoading(true);
    setLoadingStep(1);

    const stepTimer = setInterval(() => {
      setLoadingStep((prev) => (prev < 3 ? prev + 1 : prev));
    }, 700);

    try {
      const response = await fetch('/api/analyze-symptoms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          symptoms: trimmed,
          language: language,
          isDemoMode: true,
        }),
      });

      clearInterval(stepTimer);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error || 'The server encountered an error processing your symptoms.'
        );
      }

      const data = await response.json();
      if (!data.success || !data.data) {
        throw new Error(data.error || 'Failed to generate symptom analysis.');
      }

      setIsLoading(false);
      onAnalysisComplete(data.data);
    } catch (caught) {
      const err = caught instanceof Error ? caught : new Error(errorMessage(caught));
      clearInterval(stepTimer);
      setIsLoading(false);
      setServerError(
        err.message || 'We were unable to analyze your symptoms right now. Please try again.'
      );
    }
  };

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isBusy = recordingStatus === 'recording' || recordingStatus === 'processing' || isLoading;

  // Language display labels for recording badge
  const languageNames: Record<SupportedLanguage, { label: string; native: string; codeTag: string }> = {
    kn: { label: 'Kannada', native: 'ಕನ್ನಡದಲ್ಲಿ ಮಾತನಾಡಿ', codeTag: 'kn-IN' },
    hi: { label: 'Hindi', native: 'हिन्दी में बोलिए', codeTag: 'hi-IN' },
    en: { label: 'English', native: 'Speak in English', codeTag: 'en-IN' },
  };

  return (
    <div className="py-10 bg-[#FFFDF9] min-h-[calc(100vh-140px)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <p className="text-xs font-semibold tracking-wider uppercase text-[#D98CA3]">
            {t('assistant.badge')}
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#29252D] font-normal">
            {t('assistant.title')}
          </h1>
          <p className="text-sm text-[#77717B] leading-relaxed">
            {t('assistant.subtitle')}
          </p>

          {onSwitchToChat && (
            <div className="pt-2">
              <button
                type="button"
                onClick={onSwitchToChat}
                disabled={isBusy}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F8E5EA] border border-[#D98CA3]/30 text-xs font-semibold text-[#653B68] hover:bg-[#653B68] hover:text-white transition-all cursor-pointer shadow-2xs disabled:opacity-50"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#D98CA3]" />
                <span>{t('assistant.switchChat')}</span>
              </button>
            </div>
          )}
        </div>

        {/* Input Card Container */}
        <div className="bg-white rounded-3xl border border-[#EDE5F3] shadow-xs p-6 sm:p-10 space-y-6">
          {/* Quick-Pick Example Prompts */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-medium text-[#77717B] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#D98CA3]" />
                <span>{t('assistant.examplesLabel')}</span>
              </span>
              <span className="text-[11px] text-[#653B68] font-medium hidden sm:inline">
                {t('assistant.archetypes')}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {examplePrompts.map((ex, i) => (
                <button
                  key={i}
                  type="button"
                  disabled={isBusy}
                  onClick={() => handleSelectExample(ex)}
                  className="text-xs py-2 px-3.5 rounded-xl bg-[#FFFDF9] border border-[#EDE5F3] hover:border-[#D98CA3] hover:bg-[#F8E5EA]/50 text-[#29252D] font-medium active:scale-95 transition-all text-left cursor-pointer shadow-2xs hover:shadow-xs disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {ex.label}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Global Language and Quick-Load Controls Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-3.5 rounded-2xl bg-[#FFFDF9] border border-[#EDE5F3]">
              {/* Synced Global Language Selector */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2">
                  <Languages className="w-4 h-4 text-[#653B68]" />
                  <label htmlFor="language-select" className="text-xs font-semibold text-[#29252D]">
                    {t('assistant.languageLabel')}
                  </label>
                  <select
                    id="language-select"
                    value={language}
                    disabled={isBusy}
                    onChange={(e) =>
                      handleGlobalLanguageChange(e.target.value as SupportedLanguage)
                    }
                    className="text-xs font-medium bg-white border border-[#EDE5F3] hover:border-[#D98CA3] rounded-xl px-3 py-1.5 text-[#29252D] focus:outline-none focus:ring-1 focus:ring-[#D98CA3] cursor-pointer shadow-2xs disabled:opacity-50"
                  >
                    <option value="en">English (English)</option>
                    <option value="hi">हिन्दी (Hindi)</option>
                    <option value="kn">ಕನ್ನಡ (Kannada)</option>
                  </select>
                </div>

                {/* Instant Sample Loader Button */}
                <button
                  type="button"
                  disabled={isBusy}
                  onClick={handleLoadSampleForCurrentLanguage}
                  className="text-xs py-1.5 px-3 rounded-lg bg-[#EDE5F3]/70 hover:bg-[#EDE5F3] text-[#653B68] font-semibold border border-[#D98CA3]/30 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                >
                  <Sparkles className="w-3 h-3 text-[#D98CA3]" />
                  <span>{t('assistant.loadSampleBtn')}</span>
                </button>
              </div>

              {/* Language Voice Hint */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-[#77717B]">Speech Engine:</span>
                <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-[#EDE5F3] text-[#653B68] border border-[#D98CA3]/30">
                  {languageNames[voiceLanguage].label} ({languageNames[voiceLanguage].codeTag})
                </span>
              </div>
            </div>

            {/* DEDICATED VOICE BAR: Language Switcher & Recording Controls */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-[#FFFDF9] via-[#F8E5EA]/30 to-[#EDE5F3]/40 border border-[#D98CA3]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
              <div className="flex items-center gap-3">
                <div
                  className={`p-2.5 rounded-xl flex items-center justify-center transition-all ${
                    recordingStatus === 'recording'
                      ? 'bg-rose-600 text-white animate-pulse'
                      : 'bg-[#653B68] text-white shadow-xs'
                  }`}
                >
                  <Mic className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#29252D]">
                      {language === 'kn'
                        ? 'ಧ್ವನಿ ಇನ್ಪುಟ್ (Voice Input)'
                        : language === 'hi'
                        ? 'वॉइस इनपुट (Voice Input)'
                        : 'Voice Recording & Transcription'}
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#EDE5F3] text-[#653B68]">
                      {voiceLanguage === 'kn'
                        ? 'ಕನ್ನಡ (kn-IN)'
                        : voiceLanguage === 'hi'
                        ? 'हिन्दी (hi-IN)'
                        : 'English (en-IN)'}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#77717B]">
                    {language === 'kn'
                      ? 'ಕನ್ನಡ, ಹಿಂದಿ ಅಥವಾ ಇಂಗ್ಲಿಷ್‌ನಲ್ಲಿ ಧ್ವನಿ ಮೂಲಕ ಹೇಳಿ'
                      : language === 'hi'
                      ? 'हिन्दी, कन्नड़ या अंग्रेजी में बोलकर लक्षण बताएं'
                      : 'Speak in Kannada, Hindi, or English to transcribe symptoms'}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {/* Spoken Language Toggle Buttons */}
                <div
                  className="inline-flex p-1 bg-white rounded-xl border border-[#EDE5F3] shadow-2xs"
                  role="group"
                  aria-label="Voice input language"
                >
                  <button
                    type="button"
                    disabled={isBusy}
                    onClick={() => setVoiceLanguage('en')}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                      voiceLanguage === 'en'
                        ? 'bg-[#653B68] text-white shadow-2xs'
                        : 'text-[#77717B] hover:text-[#29252D]'
                    }`}
                  >
                    English
                  </button>
                  <button
                    type="button"
                    disabled={isBusy}
                    onClick={() => setVoiceLanguage('hi')}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                      voiceLanguage === 'hi'
                        ? 'bg-[#653B68] text-white shadow-2xs'
                        : 'text-[#77717B] hover:text-[#29252D]'
                    }`}
                  >
                    हिन्दी
                  </button>
                  <button
                    type="button"
                    disabled={isBusy}
                    onClick={() => setVoiceLanguage('kn')}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                      voiceLanguage === 'kn'
                        ? 'bg-[#653B68] text-white shadow-2xs'
                        : 'text-[#77717B] hover:text-[#29252D]'
                    }`}
                  >
                    ಕನ್ನಡ
                  </button>
                </div>

                {/* Primary Voice Action Button */}
                {recordingStatus === 'recording' ? (
                  <button
                    type="button"
                    onClick={handleStopRecording}
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer animate-pulse"
                  >
                    <Square className="w-3.5 h-3.5 fill-white" />
                    <span>{t('voice.stop')}</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={recordingStatus === 'processing' || isLoading}
                    onClick={() => handleStartRecording(voiceLanguage)}
                    className="px-4 py-2 bg-[#653B68] hover:bg-[#4A264D] text-white rounded-xl text-xs font-semibold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <Mic className="w-3.5 h-3.5" />
                    <span>
                      {voiceLanguage === 'kn'
                        ? 'ಕನ್ನಡದಲ್ಲಿ ಮಾತನಾಡಿ'
                        : voiceLanguage === 'hi'
                        ? 'हिन्दी में बोलें'
                        : 'Record Symptoms'}
                    </span>
                  </button>
                )}
              </div>
            </div>

            {/* LIVE VOICE RECORDING BAR (Active Recording State) */}
            {recordingStatus === 'recording' && (
              <div
                role="status"
                aria-live="polite"
                className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-rose-50 via-rose-50/90 to-[#F8E5EA]/70 border-2 border-rose-300 shadow-xs flex flex-col gap-3 animate-in fade-in duration-200"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="relative flex h-4 w-4">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-4 w-4 bg-rose-600" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold text-rose-900 flex items-center gap-2">
                        <span>{t('voice.recording')}</span>
                        <span className="font-mono bg-white px-2 py-0.5 rounded border border-rose-200 text-rose-700 font-bold">
                          {formatTimer(elapsedSeconds)}
                        </span>
                        <span className="text-[11px] px-2 py-0.5 bg-rose-100 text-rose-800 rounded font-medium">
                          {languageNames[voiceLanguage].label} ({languageNames[voiceLanguage].native})
                        </span>
                      </p>
                      <p className="text-[11px] text-rose-700/80 mt-0.5">
                        {t('voice.privacyNote')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleCancelRecording}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-medium text-rose-700 hover:bg-rose-100 border border-rose-200 transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>{t('voice.cancel')}</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleStopRecording}
                      className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 transition-all cursor-pointer shadow-xs flex items-center gap-1.5"
                    >
                      <Square className="w-3 h-3 fill-white" />
                      <span>{t('voice.stop')}</span>
                    </button>
                  </div>
                </div>

                {/* Real-time speech preview banner */}
                {interimLiveSpeech ? (
                  <div className="p-3 bg-white/90 rounded-xl border border-rose-200 text-xs text-[#29252D] space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700">
                      Hearing live in {languageNames[voiceLanguage].label} ({languageNames[voiceLanguage].codeTag}):
                    </span>
                    <p className="font-medium italic text-sm text-[#29252D] leading-relaxed">
                      &quot;{interimLiveSpeech}&quot;
                    </p>
                  </div>
                ) : (
                  <div className="p-2.5 bg-white/60 rounded-xl border border-rose-200/50 text-[11px] text-rose-800 italic">
                    {voiceLanguage === 'kn'
                      ? 'ಮೈಕ್ರೊಫೋನ್ ಸಕ್ರಿಯವಾಗಿದೆ. ಕನ್ನಡದಲ್ಲಿ ಮಾತನಾಡಿ...'
                      : voiceLanguage === 'hi'
                      ? 'माइक्रोफ़ोन सक्रिय है। हिन्दी में अपने लक्षण बोलिए...'
                      : 'Microphone active. Speak your symptoms clearly in English...'}
                  </div>
                )}
              </div>
            )}

            {/* PROCESSING AUDIO STATE */}
            {recordingStatus === 'processing' && (
              <div
                role="status"
                aria-live="polite"
                className="p-5 rounded-2xl bg-[#EDE5F3]/50 border border-[#D98CA3]/30 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <Loader2 className="w-5 h-5 text-[#653B68] animate-spin" />
                  <div>
                    <p className="text-xs font-semibold text-[#653B68]">
                      {t('voice.processing')}
                    </p>
                    <p className="text-[11px] text-[#77717B]">
                      Transcribing speech in {languageNames[voiceLanguage].label} ({languageNames[voiceLanguage].native})...
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* "WE HEARD" TRANSCRIPTION REVIEW & EDIT SECTION */}
            {recordingStatus === 'review' && (
              <div
                role="region"
                aria-label="Transcribed audio review"
                className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#FFFDF9] via-[#F8E5EA]/20 to-[#EDE5F3]/30 border-2 border-[#D98CA3]/40 shadow-xs space-y-4 animate-in fade-in duration-200"
              >
                <div className="flex items-center justify-between pb-3 border-b border-[#EDE5F3]">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-[#653B68] text-white">
                      <Volume2 className="w-4 h-4" />
                    </span>
                    <div>
                      <h2 className="font-serif text-base sm:text-lg font-medium text-[#29252D]">
                        {t('voice.weHeard')}
                      </h2>
                      <p className="text-[11px] text-[#77717B]">{t('voice.editHint')}</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-[#653B68] bg-white px-2.5 py-1 rounded-full border border-[#D98CA3]/30">
                    {languageNames[voiceLanguage].label} ({languageNames[voiceLanguage].codeTag})
                  </span>
                </div>

                {/* Editable Transcript Area */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="we-heard-editor"
                    className="text-xs font-semibold text-[#29252D] flex items-center gap-1"
                  >
                    <FileEdit className="w-3.5 h-3.5 text-[#653B68]" />
                    <span>
                      {voiceLanguage === 'kn'
                        ? 'ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಸಂಪಾದಿಸಿ:'
                        : voiceLanguage === 'hi'
                        ? 'समीक्षा करें और संपादित करें:'
                        : 'Review & Edit Recognized Text:'}
                    </span>
                  </label>
                  <textarea
                    id="we-heard-editor"
                    rows={4}
                    value={weHeardTranscript}
                    onChange={(e) => setWeHeardTranscript(e.target.value)}
                    className="w-full p-3.5 text-sm text-[#29252D] bg-white border border-[#D98CA3]/50 rounded-xl focus:border-[#653B68] focus:ring-1 focus:ring-[#653B68] focus:outline-none transition-all leading-relaxed"
                  />
                </div>

                {/* Combine options if user already had typed symptoms */}
                {showCombineOptions && (
                  <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 space-y-2">
                    <p className="text-xs font-medium text-amber-900">
                      {t('voice.combineWithTyped')}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => handleConfirmTranscript('append')}
                        className="px-3.5 py-1.5 rounded-lg bg-[#653B68] text-white text-xs font-semibold hover:bg-[#4A264D] transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>{t('voice.appendToTyped')}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleConfirmTranscript('replace')}
                        className="px-3.5 py-1.5 rounded-lg bg-white border border-amber-300 text-amber-900 text-xs font-semibold hover:bg-amber-100 transition-colors cursor-pointer"
                      >
                        {t('voice.replaceTyped')}
                      </button>
                    </div>
                  </div>
                )}

                {/* Action Controls for We Heard Transcript */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleStartRecording(voiceLanguage)}
                      className="px-3 py-1.5 rounded-lg bg-white border border-[#EDE5F3] hover:border-[#D98CA3] text-xs font-medium text-[#77717B] hover:text-[#29252D] transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>{t('voice.recordAgain')}</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleCancelTranscriptReview}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium text-[#77717B] hover:text-rose-600 transition-colors cursor-pointer"
                    >
                      {t('voice.cancelTranscript')}
                    </button>
                  </div>

                  {!showCombineOptions && (
                    <button
                      type="button"
                      onClick={() => handleConfirmTranscript('replace')}
                      className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-[#653B68] hover:bg-[#4A264D] transition-all cursor-pointer shadow-xs flex items-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>{t('voice.confirm')}</span>
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Empty Speech Notice */}
            {emptySpeechDetected && (
              <div
                role="status"
                className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-amber-900"
              >
                <div className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold">
                      {voiceLanguage === 'kn'
                        ? 'ಯಾವುದೇ ಧ್ವನಿ ಕಂಡುಬಂದಿಲ್ಲ.'
                        : voiceLanguage === 'hi'
                        ? 'कोई आवाज़ नहीं मिली।'
                        : 'No speech detected.'}{' '}
                    </span>
                    <span>{t('voice.emptyTranscript')}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleStartRecording(voiceLanguage)}
                    className="px-3.5 py-1.5 bg-white border border-amber-300 rounded-lg text-xs font-semibold text-amber-900 hover:bg-amber-100 transition-colors cursor-pointer shrink-0"
                  >
                    {t('voice.recordAgain')}
                  </button>
                </div>
              </div>
            )}

            {/* Voice Recording / Transcription Error Notice */}
            {voiceError && (
              <div
                role="alert"
                className="p-4 rounded-xl bg-rose-50 border border-rose-200 space-y-3 text-xs text-rose-900"
              >
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold">Voice Notice: </span>
                    <span>{voiceError}</span>
                  </div>
                </div>

                {/* Helpful instructions & quick-test buttons for Kannada, Hindi, and English */}
                <div className="pt-2 border-t border-rose-200/60 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-[11px] text-rose-800 font-medium">
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Instant speech sample in your language:</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleTestVoiceSimulation('kn')}
                      className="px-2.5 py-1 bg-white border border-rose-300 rounded-lg text-[11px] font-semibold text-[#653B68] hover:bg-rose-100 transition-colors cursor-pointer"
                    >
                      ಕನ್ನಡ (Kannada)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleTestVoiceSimulation('hi')}
                      className="px-2.5 py-1 bg-white border border-rose-300 rounded-lg text-[11px] font-semibold text-[#653B68] hover:bg-rose-100 transition-colors cursor-pointer"
                    >
                      हिन्दी (Hindi)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleTestVoiceSimulation('en')}
                      className="px-2.5 py-1 bg-white border border-rose-300 rounded-lg text-[11px] font-semibold text-[#653B68] hover:bg-rose-100 transition-colors cursor-pointer"
                    >
                      English
                    </button>
                    {canRetryTranscription && (
                      <button
                        type="button"
                        onClick={handleRetryTranscription}
                        className="px-2.5 py-1 bg-rose-600 rounded-lg text-[11px] font-semibold text-white hover:bg-rose-700 transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>{t('voice.retryBtn')}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Large Text Area */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-[#77717B]">
                <label htmlFor="symptoms-input" className="font-semibold text-[#29252D]">
                  {t('assistant.title')}
                </label>
                <span>{symptoms.length} characters</span>
              </div>

              <div className="relative">
                <textarea
                  id="symptoms-input"
                  rows={6}
                  disabled={isBusy}
                  value={symptoms}
                  onChange={(e) => {
                    setSymptoms(e.target.value);
                    if (validationError) setValidationError(null);
                  }}
                  placeholder={placeholders[language] || placeholders.en}
                  className={`w-full p-4 pr-16 text-sm text-[#29252D] bg-[#FFFDF9] border rounded-2xl focus:border-[#D98CA3] focus:ring-1 focus:ring-[#D98CA3] focus:outline-none transition-all placeholder:text-[#77717B]/60 leading-relaxed disabled:opacity-60 disabled:cursor-not-allowed ${
                    validationError
                      ? 'border-rose-400 ring-1 ring-rose-200'
                      : 'border-[#EDE5F3]'
                  }`}
                />

                {/* Functional Microphone Button with Language Indicator */}
                <button
                  type="button"
                  aria-label={
                    recordingStatus === 'recording'
                      ? t('voice.stop')
                      : `Speak in ${languageNames[voiceLanguage].label} (${languageNames[voiceLanguage].native})`
                  }
                  title={
                    recordingStatus === 'recording'
                      ? t('voice.stop')
                      : `Speak in ${languageNames[voiceLanguage].label} (${languageNames[voiceLanguage].native})`
                  }
                  disabled={recordingStatus === 'processing' || isLoading}
                  onClick={
                    recordingStatus === 'recording'
                      ? handleStopRecording
                      : () => handleStartRecording(voiceLanguage)
                  }
                  className={`absolute bottom-3.5 right-3.5 p-2.5 rounded-xl transition-all cursor-pointer shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#653B68] flex items-center gap-1.5 ${
                    recordingStatus === 'recording'
                      ? 'bg-rose-600 text-white animate-pulse'
                      : recordingStatus === 'processing'
                      ? 'bg-[#EDE5F3] text-[#77717B] opacity-50 cursor-not-allowed'
                      : 'bg-white border border-[#EDE5F3] text-[#77717B] hover:text-[#653B68] hover:border-[#D98CA3]'
                  }`}
                >
                  {recordingStatus === 'recording' ? (
                    <>
                      <Square className="w-4 h-4 fill-white" />
                      <span className="text-[10px] font-bold tracking-wider uppercase hidden sm:inline">
                        Stop
                      </span>
                    </>
                  ) : (
                    <>
                      <Mic className="w-4 h-4" />
                      <span className="text-[10px] font-bold text-[#653B68] hidden sm:inline uppercase">
                        {voiceLanguage}
                      </span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Validation Notice with Quick Auto-Fill */}
            {validationError && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex flex-wrap items-center justify-between gap-2 text-xs text-rose-800">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{validationError}</span>
                </div>
                <button
                  type="button"
                  onClick={handleLoadSampleForCurrentLanguage}
                  className="px-2.5 py-1 bg-white border border-rose-300 rounded-lg text-xs font-semibold text-rose-900 hover:bg-rose-100 cursor-pointer"
                >
                  {t('assistant.loadSampleBtn')}
                </button>
              </div>
            )}

            {/* Server Error Message */}
            {serverError && (
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-2 text-xs text-amber-900">
                <div className="flex items-start gap-2 font-medium">
                  <AlertCircle className="w-4 h-4 shrink-0 text-amber-700 mt-0.5" />
                  <span>{serverError}</span>
                </div>
              </div>
            )}

            {/* Submit Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-2 text-xs text-[#77717B]">
                <Info className="w-4 h-4 text-[#D98CA3] shrink-0" />
                <span>{t('assistant.privacyNote')}</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                {onCancel && (
                  <button
                    type="button"
                    disabled={isBusy}
                    onClick={onCancel}
                    className="w-full sm:w-auto px-5 py-3 rounded-2xl border border-[#EDE5F3] text-xs font-semibold text-[#77717B] hover:text-[#29252D] hover:bg-[#FFFDF9] transition-all cursor-pointer disabled:opacity-50"
                  >
                    {t('assistant.cancelBtn')}
                  </button>
                )}

                <button
                  type="submit"
                  disabled={isBusy}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#653B68] to-[#4A264D] hover:from-[#4A264D] hover:to-[#38183B] text-white text-sm font-semibold shadow-sm hover:shadow-md active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>
                        {loadingStep === 1
                          ? 'Evaluating clinical patterns...'
                          : loadingStep === 2
                          ? 'Generating doctor summary...'
                          : 'Synthesizing health guidance...'}
                      </span>
                    </>
                  ) : (
                    <>
                      <span>{t('assistant.analyzeBtn')}</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Safety & Medical Literacy Disclaimer */}
        <div className="p-4 rounded-2xl bg-[#EDE5F3]/40 border border-[#D98CA3]/20 flex items-start gap-3 text-xs text-[#77717B]">
          <AlertCircle className="w-4 h-4 text-[#653B68] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-[#29252D] font-semibold">
              {t('assistant.medicalDisclaimerTitle')}:{' '}
            </strong>
            {t('assistant.medicalDisclaimerText')}
          </p>
        </div>
      </div>
    </div>
  );
};
