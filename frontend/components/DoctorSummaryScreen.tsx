import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Printer,
  ArrowLeft,
  Stethoscope,
  HelpCircle,
  AlertCircle,
  FileText,
  Languages,
  RotateCcw,
  Sparkles,
  Loader2,
} from 'lucide-react';
import { SymptomAnalysisResult, SummaryResponse } from '../contract';
import { useLanguage } from '../i18n/LanguageContext';
import { fetchConsultationSummary } from '../services/voiceSummaryApi';

import { useHealthData } from '../context/HealthDataContext';
import { errorMessage } from '../types/speech';

interface DoctorSummaryScreenProps {
  result: SymptomAnalysisResult;
  onBack: () => void;
  onNewSymptom: () => void;
}

export const DoctorSummaryScreen: React.FC<DoctorSummaryScreenProps> = ({
  result,
  onBack,
  onNewSymptom,
}) => {
  const { language, t } = useLanguage();
  const { reports, updateReportSummary } = useHealthData();
  const [summaryData, setSummaryData] = useState<SummaryResponse | null>(null);
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);
  const [summaryError, setSummaryError] = useState<string | null>(null);

  // Track the last analysis ID and language to prevent duplicate/repeated in-flight requests
  const activeRequestRef = useRef<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const loadSummary = useCallback(
    async (forceRetry = false) => {
      const requestKey = `${result.id}_${language}`;

      // Prevent duplicate fetches for the same analysis and language unless forced
      if (!forceRetry && activeRequestRef.current === requestKey && summaryData) {
        return;
      }

      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      const controller = new AbortController();
      abortControllerRef.current = controller;
      activeRequestRef.current = requestKey;

      setIsLoadingSummary(true);
      setSummaryError(null);

      try {
        const response = await fetchConsultationSummary({
          analysis: result,
          language,
          signal: controller.signal,
        });

        setSummaryData(response);

        // Sync dual summary with stored health report
        const matchingReport = reports.find(
          (r) => r.analysis.id === result.id || r.originalInput === result.originalInput
        );
        if (matchingReport) {
          updateReportSummary(matchingReport.id, {
            englishSummary: response.englishSummary,
            translatedSummary: response.translatedSummary,
            language,
          });
        }
      } catch (caught) {
        const err = caught instanceof Error ? caught : new Error(errorMessage(caught));
        if (err.name === 'AbortError') {
          return;
        }
        setSummaryError(
          err.message ||
            t('summary.fetchError') ||
            'Unable to load dual consultation summaries from the backend service.'
        );
      } finally {
        setIsLoadingSummary(false);
      }
    },
    // reports/updateReportSummary are read at call time; adding them would refetch on every save.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [result, language, summaryData, t]
  );

  // Fetch the summary when the result or language changes. loadSummary is left out of the
  // dependencies on purpose: it changes after every fetch and would loop.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadSummary();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.id, language]);

  const handlePrint = () => {
    window.print();
  };

  const formattedDate = new Date(result.timestamp).toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formattedTime = new Date(result.timestamp).toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="py-8 bg-[#FFFDF9] min-h-[calc(100vh-140px)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Navigation & Action Bar (Hidden when printing) */}
        <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EDE5F3]">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#77717B] hover:text-[#29252D] cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Symptom Analysis</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={onNewSymptom}
              className="px-4 py-2 text-xs font-medium text-[#77717B] hover:text-[#29252D] bg-white border border-[#EDE5F3] hover:border-[#D98CA3] rounded-full transition-colors cursor-pointer"
            >
              Start New Check
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold text-white bg-[#653B68] hover:bg-[#4A264D] rounded-full shadow-xs hover:shadow-sm transition-all duration-150 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save as PDF</span>
            </button>
          </div>
        </div>

        {/* The Printable Clinical Summary Sheet */}
        <div className="p-8 sm:p-12 bg-white rounded-3xl border border-[#EDE5F3] shadow-xs print:border-none print:shadow-none print:p-0 space-y-8 print:space-y-6">
          {/* Document Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b-2 border-[#29252D] print:pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#653B68] font-bold uppercase tracking-wider mb-1">
                <Stethoscope className="w-4 h-4 text-[#D98CA3]" />
                <span>Ova Care Clinical Consultation Sheet</span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-medium text-[#29252D]">
                Patient Symptom Summary
              </h1>
              <p className="text-xs text-[#77717B] mt-1 print:text-gray-600">
                Prepared by patient using Ova Care for healthcare consultation review
              </p>
            </div>

            <div className="text-left sm:text-right text-xs text-[#77717B] font-mono print:text-gray-700">
              <p>Generated: {formattedDate}</p>
              <p>Time: {formattedTime}</p>
              <p className="text-[11px] text-[#A9BCA8]">Doc ID: {result.id.slice(0, 14)}</p>
            </div>
          </div>

          {/* DUAL CONSULTATION SUMMARIES: English Summary and Translated Summary Side by Side */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#653B68]">
                <Sparkles className="w-4 h-4 text-[#D98CA3]" />
                <span>Dual-Language Clinical Summaries (/api/summary)</span>
              </div>
              {isLoadingSummary && (
                <span className="no-print inline-flex items-center gap-1.5 text-xs text-[#77717B]">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-[#653B68]" />
                  <span>Connecting...</span>
                </span>
              )}
            </div>

            {/* Loading State */}
            {isLoadingSummary && !summaryData && (
              <div className="no-print p-6 rounded-2xl bg-[#F8E5EA]/40 border border-[#D98CA3]/30 text-center space-y-2">
                <Loader2 className="w-6 h-6 mx-auto animate-spin text-[#653B68]" />
                <p className="text-xs font-medium text-[#29252D]">
                  {t('summary.loadingDual')}
                </p>
              </div>
            )}

            {/* Error & Retry State */}
            {summaryError && !isLoadingSummary && !summaryData && (
              <div className="no-print p-4 rounded-xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-amber-900">
                <div className="flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 shrink-0 text-amber-700 mt-0.5" />
                  <div>
                    <p className="font-semibold">{t('summary.fetchError')}</p>
                    <p className="text-amber-800/90 mt-0.5">{summaryError}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => loadSummary(true)}
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white border border-amber-300 hover:bg-amber-100 text-xs font-semibold text-amber-900 transition-colors cursor-pointer shrink-0"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{t('summary.retryFetch')}</span>
                </button>
              </div>
            )}

            {/* Summaries Display: Side by Side on Desktop, Stacked on Mobile */}
            {summaryData && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 pt-1">
                {/* English Summary Box */}
                <div className="p-5 rounded-2xl bg-[#FFFDF9] border border-[#EDE5F3] space-y-2.5 print:border-gray-300 print:p-4">
                  <div className="flex items-center justify-between pb-2 border-b border-[#EDE5F3] print:border-gray-200">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#653B68] flex items-center gap-1.5 print:text-black">
                      <FileText className="w-3.5 h-3.5 text-[#D98CA3]" />
                      <span>{t('summary.englishTitle')}</span>
                    </h3>
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 bg-white border border-[#EDE5F3] rounded text-[#77717B]">
                      EN
                    </span>
                  </div>
                  <div className="text-xs sm:text-sm text-[#29252D] leading-relaxed whitespace-pre-wrap break-words print:text-black">
                    {summaryData.englishSummary || 'No English summary content returned.'}
                  </div>
                </div>

                {/* Translated Summary Box */}
                <div className="p-5 rounded-2xl bg-[#F8E5EA]/30 border border-[#D98CA3]/30 space-y-2.5 print:border-gray-300 print:p-4">
                  <div className="flex items-center justify-between pb-2 border-b border-[#D98CA3]/20 print:border-gray-200">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#653B68] flex items-center gap-1.5 print:text-black">
                      <Languages className="w-3.5 h-3.5 text-[#653B68]" />
                      <span>{t('summary.translatedTitle')}</span>
                    </h3>
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 bg-white border border-[#D98CA3]/40 rounded text-[#653B68] font-semibold">
                      {language === 'hi' ? 'HI' : language === 'kn' ? 'KN' : 'EN'}
                    </span>
                  </div>
                  <div className="text-xs sm:text-sm text-[#29252D] leading-relaxed whitespace-pre-wrap break-words print:text-black">
                    {summaryData.translatedSummary ||
                      summaryData.englishSummary ||
                      'No translated summary content returned.'}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Section 1: Patient's Original Symptom Statement */}
          <div className="space-y-2 pt-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#653B68] print:text-black">
              1. Patient&apos;s Reported Description (In Their Own Words)
            </h2>
            <div className="p-4 rounded-xl bg-[#FFFDF9] border border-[#EDE5F3] text-sm text-[#29252D] font-normal leading-relaxed italic print:bg-gray-50 print:border-gray-300">
              &quot;{result.originalInput}&quot;
            </div>
            <p className="text-[11px] text-[#77717B]">
              Input language detected: {result.detectedLanguage}
            </p>
          </div>

          {/* Section 2: Identified Symptoms & Duration */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#653B68] print:text-black">
              2. Symptoms Identified
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#29252D]">
              {result.understoodSymptoms.map((symptom, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-lg border border-[#EDE5F3] bg-white flex items-center gap-2 print:border-gray-200"
                >
                  <span className="w-2 h-2 rounded-full bg-[#D98CA3] shrink-0 print:bg-black" />
                  <span>{symptom}</span>
                </div>
              ))}
            </div>

            {result.durationAndDetails && (
              <div className="p-3 rounded-lg bg-[#FFFDF9] border border-[#EDE5F3] text-xs text-[#29252D] print:bg-gray-50">
                <strong>Timeline & Severity Notes: </strong>
                <span>{result.durationAndDetails}</span>
              </div>
            )}
          </div>

          {/* Section 3: Essential Clinical Context to Clarify */}
          {result.missingInformation && result.missingInformation.length > 0 && (
            <div className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#653B68] print:text-black">
                3. Relevant Context to Discuss During Consultation
              </h2>
              <div className="p-4 rounded-xl border border-[#EDE5F3] bg-white print:border-gray-300">
                <ul className="space-y-2 text-xs text-[#29252D]">
                  {result.missingInformation.map((info, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="font-bold text-[#653B68] print:text-black">□</span>
                      <span>{info}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Section 4: Questions Suggested for the Doctor */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-[#653B68] print:text-black" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#653B68] print:text-black">
                4. Questions Prepared for the Physician
              </h2>
            </div>
            <div className="p-4 rounded-xl border border-[#EDE5F3] bg-[#FFFDF9] print:bg-white print:border-gray-300">
              <ol className="space-y-2.5 text-xs text-[#29252D] list-decimal pl-4">
                {result.suggestedDoctorQuestions.map((q, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {q}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Section 5: Physician Consultation & Physical Exam Notes Box (For handwritten or EHR notes) */}
          <div className="space-y-2 pt-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#653B68] print:text-black">
              5. Clinician Consultation Notes / Assessment & Plan
            </h2>
            <div className="h-32 border border-dashed border-[#77717B]/40 rounded-xl p-3 text-xs text-[#77717B] print:border-gray-400 print:text-gray-500">
              <span>
                (Space for examining physician or gynecologist notes, vitals, diagnostic orders, or
                referral plan)
              </span>
            </div>
          </div>

          {/* Document Footer Disclaimer */}
          <div className="pt-6 border-t border-[#EDE5F3] text-[11px] text-[#77717B] space-y-1 print:text-gray-600">
            <p>
              <strong>Notice: </strong>
              This summary is generated by Ova Care for patient communication and healthcare
              literacy. Ova Care is not a diagnostic device and does not substitute for clinical
              judgment.
            </p>
            <p>
              Verified Educational Literature Grounding: American College of Obstetricians and
              Gynecologists (ACOG), World Health Organization (WHO), NHS Guidelines.
            </p>
          </div>
        </div>

        {/* Bottom Print Hint (No Print) */}
        <div className="no-print p-4 rounded-xl bg-[#EDE5F3]/40 border border-[#EDE5F3] text-center text-xs text-[#77717B]">
          Tip: Click <strong className="text-[#653B68]">&quot;Print / Save as PDF&quot;</strong> to create a
          physical sheet for your doctor appointment or save directly to your mobile phone.
        </div>
      </div>
    </div>
  );
};
