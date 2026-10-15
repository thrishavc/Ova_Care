import React, { useState } from 'react';
import {
  FileText,
  Printer,
  Calendar,
  ArrowRight,
  Trash2,
  Eye,
  X,
  Languages,
  Shield,
  Plus,
} from 'lucide-react';
import { useHealthData } from '../context/HealthDataContext';
import { useLanguage } from '../i18n/LanguageContext';
import { StoredHealthReport } from '../types/health';

interface MyHealthReportsProps {
  onStartSymptoms: () => void;
  onNavigateToDashboard: () => void;
}

export const MyHealthReports: React.FC<MyHealthReportsProps> = ({
  onStartSymptoms,
  onNavigateToDashboard,
}) => {
  const { t, language } = useLanguage();
  const { reports, deleteReport, storageMode } = useHealthData();

  // Selected report for full modal review & printing
  const [selectedReport, setSelectedReport] = useState<StoredHealthReport | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handlePrint = (report: StoredHealthReport) => {
    setSelectedReport(report);
    // Slight delay to ensure the modal/print view is rendered in DOM before triggering window.print()
    setTimeout(() => {
      window.print();
    }, 250);
  };

  const handleDeleteConfirmed = () => {
    if (deletingId) {
      deleteReport(deletingId);
      if (selectedReport && selectedReport.id === deletingId) {
        setSelectedReport(null);
      }
      setDeletingId(null);
    }
  };

  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      const locale = language === 'kn' ? 'kn-IN' : language === 'hi' ? 'hi-IN' : 'en-US';
      return date.toLocaleDateString(locale, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return isoString;
    }
  };

  return (
    <div className="py-10 bg-[#FFFDF9] min-h-[calc(100vh-140px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#EDE5F3]">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D98CA3]">
              <FileText className="w-3.5 h-3.5" />
              <span>{t('reports.badge')}</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#29252D] font-normal mt-1">
              {t('reports.title')}
            </h1>
            <p className="text-xs text-[#77717B] mt-1 max-w-xl leading-relaxed">
              {t('reports.subtitle')}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={onStartSymptoms}
              className="px-4.5 py-2.5 rounded-full bg-gradient-to-r from-[#653B68] to-[#4A264D] hover:from-[#4A264D] hover:to-[#38183B] text-white text-xs font-semibold shadow-xs hover:shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>{t('reports.newAnalysisBtn')}</span>
            </button>
            <button
              type="button"
              onClick={onNavigateToDashboard}
              className="px-4 py-2.5 rounded-full bg-white border border-[#EDE5F3] hover:border-[#D98CA3] text-[#29252D] text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <span>{t('nav.dashboard')}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#653B68]" />
            </button>
          </div>
        </div>

        {/* Privacy & Storage Transparency Notice */}
        <div className="no-print p-4 rounded-2xl bg-white border border-[#EDE5F3] flex items-start gap-3 text-xs text-[#77717B] shadow-2xs">
          <Shield className="w-4 h-4 text-[#653B68] shrink-0 mt-0.5" />
          <div className="leading-relaxed space-y-1">
            <span className="font-semibold text-[#29252D]">
              {t('reports.privacyNoticeTitle')}:{' '}
            </span>
            <span>
              {storageMode === 'session'
                ? t('reports.sessionStorageExplained')
                : t('reports.memoryStorageExplained')}
            </span>
          </div>
        </div>

        {/* Reports Listing or Empty State */}
        {reports.length === 0 ? (
          /* Empty State */
          <div className="no-print bg-white rounded-3xl border border-[#EDE5F3] shadow-xs p-10 sm:p-16 text-center max-w-xl mx-auto space-y-5">
            <div className="w-16 h-16 rounded-3xl bg-[#F8E5EA] border border-[#D98CA3]/30 mx-auto flex items-center justify-center text-[#653B68]">
              <FileText className="w-8 h-8 text-[#D98CA3]" />
            </div>
            <div className="space-y-2">
              <h3 className="font-serif text-2xl text-[#29252D] font-normal">
                {t('reports.emptyTitle')}
              </h3>
              <p className="text-xs text-[#77717B] leading-relaxed max-w-md mx-auto">
                {t('reports.emptyBody')}
              </p>
            </div>
            <div className="pt-2">
              <button
                type="button"
                onClick={onStartSymptoms}
                className="px-6 py-3 rounded-full bg-[#653B68] hover:bg-[#4A264D] text-white text-xs font-semibold transition-all cursor-pointer shadow-xs inline-flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>{t('reports.startFirstAnalysisBtn')}</span>
              </button>
            </div>
          </div>
        ) : (
          /* Reports Grid */
          <div className="no-print space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-xl font-medium text-[#29252D]">
                {t('reports.availableReportsHeading')} ({reports.length})
              </h2>
              <span className="text-xs text-[#77717B]">
                {t('reports.clickToViewOrPrint')}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reports.map((report) => {
                const analysis = report.analysis;
                const urgency = analysis.urgency || 'routine';
                const urgencyColor =
                  urgency === 'urgent'
                    ? 'border-rose-300 bg-rose-50/60 text-rose-900'
                    : urgency === 'prompt'
                    ? 'border-amber-300 bg-amber-50/60 text-amber-900'
                    : 'border-emerald-300 bg-emerald-50/60 text-emerald-900';

                return (
                  <div
                    key={report.id}
                    className="p-6 rounded-3xl bg-white border border-[#EDE5F3] hover:border-[#D98CA3] shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs text-[#77717B] flex items-center gap-1.5 font-medium">
                          <Calendar className="w-3.5 h-3.5 text-[#D98CA3]" />
                          <span>{formatDate(report.createdAt)}</span>
                        </span>
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${urgencyColor}`}
                        >
                          {analysis.urgencyTitle || urgency}
                        </span>
                      </div>

                      <div>
                        <h3 className="font-serif text-lg font-medium text-[#29252D] group-hover:text-[#653B68] transition-colors line-clamp-1">
                          {analysis.understoodSymptoms?.[0] || report.originalInput || 'Health Assessment Report'}
                        </h3>
                        <p className="text-xs text-[#77717B] mt-1 line-clamp-2 leading-relaxed">
                          &quot;{report.originalInput}&quot;
                        </p>
                      </div>

                      {/* Plain Language snippet */}
                      {analysis.plainLanguageExplanation && (
                        <p className="text-xs text-[#29252D] line-clamp-2 bg-[#FFFDF9] p-3 rounded-xl border border-[#EDE5F3]/70 leading-relaxed">
                          {analysis.plainLanguageExplanation}
                        </p>
                      )}

                      {/* Summaries indicator */}
                      {(report.englishSummary || report.translatedSummary) && (
                        <div className="flex items-center gap-2 text-[11px] text-[#653B68] font-medium pt-1">
                          <Languages className="w-3.5 h-3.5" />
                          <span>{t('reports.dualSummaryAvailableBadge')}</span>
                        </div>
                      )}
                    </div>

                    {/* Action Bar */}
                    <div className="pt-3 border-t border-[#EDE5F3] flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => setSelectedReport(report)}
                        className="px-4 py-2 rounded-xl bg-[#F8E5EA] hover:bg-[#653B68] text-[#653B68] hover:text-white text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>{t('reports.viewReportBtn')}</span>
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handlePrint(report)}
                          title={t('reports.printSavePdfBtn')}
                          aria-label={t('reports.printSavePdfBtn')}
                          className="px-3 py-2 rounded-xl border border-[#EDE5F3] hover:border-[#D98CA3] text-[#29252D] text-xs font-medium transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <Printer className="w-3.5 h-3.5 text-[#653B68]" />
                          <span className="hidden sm:inline">{t('reports.printSavePdfBtn')}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeletingId(report.id)}
                          title={t('reports.deleteReportTooltip')}
                          aria-label={t('reports.deleteReportTooltip')}
                          className="p-2 rounded-xl border border-[#EDE5F3] hover:border-rose-300 text-[#77717B] hover:text-rose-600 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>

      {/* FULL REPORT MODAL & PRINT CONTAINER */}
      {selectedReport && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/50 backdrop-blur-xs overflow-y-auto print:static print:p-0 print:bg-white print:overflow-visible"
        >
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-10 shadow-2xl border border-[#EDE5F3] my-8 space-y-6 print:m-0 print:p-0 print:border-none print:shadow-none print:max-w-none">
            
            {/* Modal Controls (Hidden in Print) */}
            <div className="no-print flex items-center justify-between pb-4 border-b border-[#EDE5F3]">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-[#653B68] text-white">
                  <FileText className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="font-serif text-lg font-medium text-[#29252D]">
                    {t('reports.clinicalConsultationNote')}
                  </h3>
                  <p className="text-xs text-[#77717B]">
                    {t('reports.doctorFriendlyFormat')}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-4 py-2 rounded-xl bg-[#653B68] text-white hover:bg-[#4A264D] text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 shadow-xs"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>{t('reports.printSavePdfBtn')}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedReport(null)}
                  className="p-2 text-[#77717B] hover:text-[#29252D] rounded-xl cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* PRINT-FRIENDLY CLINICAL REPORT CONTENT */}
            <div className="space-y-6 text-[#29252D]">
              
              {/* Document Header */}
              <div className="pb-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-2xl font-bold text-[#653B68]">Ova Care</span>
                    <span className="text-xs text-gray-500 font-medium">| Clinical Literacy Documentation</span>
                  </div>
                  <h2 className="font-serif text-xl sm:text-2xl text-[#29252D] font-normal mt-1">
                    {t('reports.headerPatientNote')}
                  </h2>
                </div>

                <div className="text-left sm:text-right text-xs space-y-1">
                  <p>
                    <strong className="text-gray-700">{t('reports.headingReportDate')}: </strong>
                    <span>{formatDate(selectedReport.createdAt)}</span>
                  </p>
                  <p>
                    <strong className="text-gray-700">Urgency Assessment: </strong>
                    <span className="capitalize font-semibold text-[#653B68]">
                      {selectedReport.analysis.urgency} ({selectedReport.analysis.urgencyTitle})
                    </span>
                  </p>
                </div>
              </div>

              {/* SECTION 1: Symptoms Described */}
              {selectedReport.originalInput && (
                <div className="space-y-1.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#653B68] border-b border-gray-100 pb-1">
                    1. {t('reports.headingSymptomsDescribed')}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-800 bg-[#FFFDF9] p-3.5 rounded-xl border border-gray-200 leading-relaxed font-sans">
                    &quot;{selectedReport.originalInput}&quot;
                  </p>
                </div>
              )}

              {/* SECTION 2: AI-Generated Health Information */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#653B68] border-b border-gray-100 pb-1">
                  2. {t('reports.headingAiInfo')}
                </h4>
                {selectedReport.analysis.plainLanguageExplanation && (
                  <p className="text-xs sm:text-sm text-gray-800 leading-relaxed">
                    {selectedReport.analysis.plainLanguageExplanation}
                  </p>
                )}

                {/* Understood Symptoms list */}
                {selectedReport.analysis.understoodSymptoms && selectedReport.analysis.understoodSymptoms.length > 0 && (
                  <div className="pt-1">
                    <span className="text-xs font-semibold text-gray-700">Identified Symptoms: </span>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {selectedReport.analysis.understoodSymptoms.map((symp, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-md bg-[#EDE5F3] text-[#653B68] text-xs font-medium"
                        >
                          {symp}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* SECTION 3: Suggested Next Steps */}
              {selectedReport.analysis.nextSteps && selectedReport.analysis.nextSteps.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#653B68] border-b border-gray-100 pb-1">
                    3. {t('reports.headingNextSteps')}
                  </h4>
                  <ul className="space-y-1 text-xs sm:text-sm text-gray-800 list-disc list-inside">
                    {selectedReport.analysis.nextSteps.map((step, i) => (
                      <li key={i} className="leading-relaxed">
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* SECTION 4: Questions to Discuss With Your Doctor */}
              {selectedReport.analysis.suggestedDoctorQuestions && selectedReport.analysis.suggestedDoctorQuestions.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#653B68] border-b border-gray-100 pb-1">
                    4. {t('reports.headingDoctorQuestions')}
                  </h4>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-gray-800">
                    {selectedReport.analysis.suggestedDoctorQuestions.map((q, i) => (
                      <li key={i} className="flex items-start gap-2 bg-[#FFFDF9] p-2.5 rounded-lg border border-gray-200">
                        <span className="font-bold text-[#D98CA3] shrink-0">Q{i + 1}:</span>
                        <span>{q}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* SECTION 5: Dual Summaries (English & Translated) when available */}
              {(selectedReport.englishSummary || selectedReport.translatedSummary) && (
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#653B68] border-b border-gray-100 pb-1">
                    5. Clinical Consultation Summaries
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedReport.englishSummary && (
                      <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-1.5">
                        <h5 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                          {t('summary.englishTitle')}
                        </h5>
                        <p className="text-xs text-gray-800 leading-relaxed font-sans">
                          {selectedReport.englishSummary}
                        </p>
                      </div>
                    )}

                    {selectedReport.translatedSummary && (
                      <div className="p-4 rounded-xl bg-[#FFFDF9] border border-[#EDE5F3] space-y-1.5">
                        <h5 className="text-xs font-bold text-[#653B68] uppercase tracking-wider">
                          {t('summary.translatedTitle')}
                        </h5>
                        <p className="text-xs text-gray-800 leading-relaxed font-sans">
                          {selectedReport.translatedSummary}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* SECTION 6: Verified Medical References */}
              {selectedReport.analysis.verifiedSources && selectedReport.analysis.verifiedSources.length > 0 && (
                <div className="space-y-1.5 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-600 border-b border-gray-100 pb-1">
                    Verified Guidelines Cited:
                  </h4>
                  <div className="flex flex-wrap gap-2 text-xs text-gray-600">
                    {selectedReport.analysis.verifiedSources.map((source, i) => (
                      <span key={i} className="px-2 py-0.5 rounded border border-gray-200 bg-gray-50">
                        {source.organization}: {source.title}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Formal Medical Disclaimer */}
              <div className="pt-4 border-t border-gray-200 text-[11px] text-gray-500 leading-relaxed">
                <strong className="text-gray-700">Medical Literacy Notice: </strong>
                {selectedReport.analysis.disclaimer ||
                  'This report was prepared with AI clinical literacy assistance from Ova Care for patient empowerment and healthcare consultation preparation. It does NOT constitute a confirmed medical diagnosis, therapeutic prescription, or physician consultation.'}
              </div>

            </div>

            {/* Modal Bottom Close / Print Bar */}
            <div className="no-print pt-4 border-t border-[#EDE5F3] flex items-center justify-between">
              <span className="text-xs text-[#77717B]">
                {t('reports.printSaveHint')}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedReport(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-[#77717B] hover:text-[#29252D] border border-[#EDE5F3] cursor-pointer"
                >
                  {t('common.close')}
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-[#653B68] hover:bg-[#4A264D] transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>{t('reports.printSavePdfBtn')}</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deletingId && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200"
        >
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-rose-100 space-y-4">
            <div className="flex items-center gap-3 text-rose-600">
              <span className="p-2 rounded-xl bg-rose-50">
                <Trash2 className="w-5 h-5" />
              </span>
              <h3 className="font-serif text-lg font-medium text-[#29252D]">
                {t('reports.confirmDeleteReportTitle')}
              </h3>
            </div>

            <p className="text-xs text-[#77717B] leading-relaxed">
              {t('reports.confirmDeleteReportBody')}
            </p>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeletingId(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#77717B] hover:text-[#29252D] border border-[#EDE5F3] cursor-pointer"
              >
                {t('common.cancel')}
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirmed}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 transition-colors cursor-pointer shadow-xs"
              >
                {t('reports.confirmDeleteReportAction')}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
