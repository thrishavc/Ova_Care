import React from 'react';
import {
  Activity,
  BookOpen,
  FileText,
  Shield,
  Sparkles,
  HeartPulse,
  Calendar,
  History,
  Clock,
  ArrowRight,
  Plus,
  Droplet,
  CheckCircle2,
} from 'lucide-react';
import { EDUCATIONAL_ARTICLES, getLocalizedArticle } from '../data/educationalTopics';
import { EducationalArticle } from '../types/health';
import { useLanguage } from '../i18n/LanguageContext';
import { useHealthData } from '../context/HealthDataContext';

interface HealthDashboardProps {
  onStartSymptoms: (query?: string) => void;
  onExploreLibrary: () => void;
  onSelectArticle: (article: EducationalArticle) => void;
  onNavigateToTracker?: () => void;
  onNavigateToHistory?: () => void;
  onNavigateToReports?: () => void;
  recentAnalysisCount?: number;
}

export const HealthDashboard: React.FC<HealthDashboardProps> = ({
  onStartSymptoms,
  onExploreLibrary,
  onSelectArticle,
  onNavigateToTracker,
  onNavigateToHistory,
  onNavigateToReports,
}) => {
  const { t, language } = useLanguage();
  const { periods, stats, reports, storageMode } = useHealthData();

  const quickCategoriesByLang: Record<string, Array<{ label: string; desc: string; query: string }>> = {
    en: [
      { label: 'Irregular Cycles', desc: 'Missed periods, unexpected shifts', query: 'My periods have been irregular for two months with lower abdominal pain.' },
      { label: 'Severe Cramps & Pain', desc: 'Dysmenorrhea, debilitating cramps', query: 'Severe debilitating menstrual cramps every month that leave me bedridden.' },
      { label: 'PCOS & Hormonal Health', desc: 'Acne, androgen signs, hair changes', query: 'Irregular periods, adult jawline acne, and excess facial hair.' },
      { label: 'Early Pregnancy Questions', desc: 'Early symptoms, safety markers', query: 'Missed period, morning nausea, breast tenderness, and early questions.' },
    ],
    hi: [
      { label: 'अनियमित चक्र', desc: 'मासिक धर्म में देरी, अप्रत्याशित बदलाव', query: 'मेरे पीरियड्स दो महीने से अनियमित हैं और कभी-कभी पेट के निचले हिस्से में दर्द होता है।' },
      { label: 'गंभीर ऐंठन व दर्द', desc: 'डिसमेनोरिया, बिस्तर पर रहने योग्य दर्द', query: 'मासिक धर्म के दौरान बहुत तेज़ असहनीय ऐंठन और दर्द होता है जो 2-3 दिन रहता है।' },
      { label: 'पीसीओएस और हार्मोन', desc: 'मुंहासे, बालों में बदलाव, वजन', query: 'अनियमित पीरियड्स, चेहरे पर अनचाहे बाल और जबड़े के पास मुंहासे की समस्या।' },
      { label: 'गर्भावस्था से जुड़े प्रश्न', desc: 'शुरुआती लक्षण, मतली, थकान', query: 'पीरियड मिस होना, सुबह मतली, स्तनों में संवेदनशीलता और शुरुआती प्रश्न।' },
    ],
    kn: [
      { label: 'ಅನಿಯಮಿತ ಮುಟ್ಟು', desc: 'ತಡವಾದ ಮುಟ್ಟು, ದಿನಾಂಕಗಳ ಬದಲಾವಣೆ', query: 'ನನ್ನ ಮುಟ್ಟು ಕಳೆದ ೨ ತಿಂಗಳುಗಳಿಂದ ಸರಿ ಇಲ್ಲ ಮತ್ತು ಹೊಟ್ಟೆಯ ಕೆಳಭಾಗದಲ್ಲಿ ನೋವು ಬರುತ್ತಿದೆ.' },
      { label: 'ತೀವ್ರ ಹೊಟ್ಟೆ ನೋವು', desc: 'ಮುಟ್ಟಿನ ಅಸಹನೀಯ ಸೆಳೆತ ಮತ್ತು ನೋವು', query: 'ಮುಟ್ಟಿನ ಸಮಯದಲ್ಲಿ ತೀವ್ರವಾದ ಅಸಹನೀಯ ಹೊಟ್ಟೆ ನೋವು ಮತ್ತು ಸೊಂಟ ನೋವು ಬರುತ್ತದೆ.' },
      { label: 'ಪಿಸಿಒಎಸ್ ಮತ್ತು ಹಾರ್ಮೋನ್', desc: 'ಮೊಡವೆ, ಮುಖದಲ್ಲಿ ಕೂದಲು, ತೂಕ ಹೆಚ್ಚಳ', query: 'ಮುಟ್ಟಿನ ದಿನಾಂಕಗಳು ಸರಿಯಾಗಿಲ್ಲ, ಮುಖದಲ್ಲಿ ಮೊಡವೆಗಳು ಮತ್ತು ಕೂದಲು ಬೆಳೆಯುವ ಲಕ್ಷಣಗಳು.' },
      { label: 'ಗರ್ಭಧಾರಣೆಯ ಲಕ್ಷಣಗಳು', desc: 'ಆರಂಭಿಕ ಬದಲಾವಣೆಗಳು, ಆಯಾಸ', query: 'ಮುಟ್ಟು ತಪ್ಪಿದ ದಿನಗಳು, ವಾಕರಿಕೆ, ಎದೆ ನೋವು ಮತ್ತು ಆರಂಭಿಕ ಪ್ರಶ್ನೆಗಳು.' },
    ],
  };

  const quickCategories = quickCategoriesByLang[language] || quickCategoriesByLang.en;

  return (
    <div className="py-10 bg-[#FFFDF9] min-h-[calc(100vh-140px)] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-[#F8E5EA]/40 rounded-full blur-3xl pointer-events-none -z-10 animate-drift-slow" />
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-[#EDE5F3]/40 rounded-full blur-3xl pointer-events-none -z-10 animate-drift-slow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Welcoming Header Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#F8E5EA]/90 via-white to-[#EDE5F3]/80 p-8 sm:p-10 border border-[#EDE5F3] shadow-xs">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 text-xs text-[#653B68] bg-white/80 px-3 py-1 rounded-full border border-[#EDE5F3]">
              <Sparkles className="w-3.5 h-3.5 text-[#D98CA3]" />
              <span className="font-semibold">{t('dashboard.title')}</span>
              <span aria-hidden="true">·</span>
              <span>{storageMode === 'session' ? 'Local Session' : 'Private Memory'}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl text-[#29252D] font-normal leading-tight">
              {t('dashboard.title')}
            </h1>

            <p className="text-sm text-[#77717B] leading-relaxed">
              {t('dashboard.subtitle')}
            </p>

            <div className="pt-3 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onStartSymptoms()}
                className="px-6 py-3.5 text-xs font-semibold text-white bg-gradient-to-r from-[#653B68] to-[#4A264D] hover:from-[#4A264D] hover:to-[#38183B] active:scale-[0.98] rounded-full shadow-xs hover:shadow-md transition-all duration-150 cursor-pointer flex items-center gap-2"
              >
                <Activity className="w-4 h-4 text-[#D98CA3]" />
                <span>{t('hero.ctaForm')}</span>
              </button>
              
              {onNavigateToTracker && (
                <button
                  type="button"
                  onClick={onNavigateToTracker}
                  className="px-5 py-3.5 text-xs font-semibold text-[#653B68] bg-[#F8E5EA] hover:bg-[#EDE5F3] border border-[#D98CA3]/30 active:scale-[0.98] rounded-full transition-all duration-150 cursor-pointer flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-[#653B68]" />
                  <span>{t('nav.tracker')}</span>
                </button>
              )}

              <button
                type="button"
                onClick={onExploreLibrary}
                className="px-5 py-3.5 text-xs font-semibold text-[#29252D] bg-white hover:bg-[#FFFDF9] border border-[#EDE5F3] hover:border-[#D98CA3]/50 active:scale-[0.98] rounded-full transition-all duration-150 cursor-pointer flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-[#D98CA3]" />
                <span>{t('dashboard.actionLibraryTitle')}</span>
              </button>
            </div>
          </div>

          {/* Privacy Note */}
          <div className="mt-8 pt-4 border-t border-[#EDE5F3]/70 flex flex-wrap items-center justify-between text-[11px] text-[#77717B] gap-4">
            <span className="flex items-center gap-1.5 text-[#6C856B] font-medium">
              <Shield className="w-3.5 h-3.5" />
              {t('dashboard.privacyNotice')}
            </span>
            <span className="text-[#77717B]">
              {periods.length} {t('dashboard.statRecordedPeriods')} · {reports.length} {t('dashboard.statReportsAvailable')}
            </span>
          </div>
        </div>

        {/* 7 ACTUAL SUMMARY METRIC CARDS BASED STRICTLY ON USER DATA */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-xl sm:text-2xl text-[#29252D] font-normal">
              {t('dashboard.summaryMetricsTitle')}
            </h2>
            <span className="text-xs text-[#77717B]">
              {t('dashboard.actualDataOnlyNotice')}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Card 1: Last Recorded Period */}
            <div className="p-5 rounded-2xl bg-white border border-[#EDE5F3] shadow-xs space-y-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#77717B]">
                    {t('tracker.cardLastPeriod')}
                  </span>
                  <Droplet className="w-4 h-4 text-[#D98CA3]" />
                </div>
                {stats.lastPeriodStart ? (
                  <div className="mt-2">
                    <p className="font-serif text-xl font-medium text-[#29252D]">
                      {stats.lastPeriodStart}
                    </p>
                    <p className="text-xs text-[#77717B] mt-0.5">
                      {t('tracker.endedOn')}: <span className="font-medium text-[#29252D]">{stats.lastPeriodEnd}</span>
                    </p>
                  </div>
                ) : (
                  <div className="mt-2 space-y-1">
                    <p className="font-serif text-sm text-[#77717B] italic">
                      {t('tracker.noRecordsYet')}
                    </p>
                    <p className="text-[11px] text-[#77717B]">
                      {t('dashboard.emptyPeriodsPrompt')}
                    </p>
                  </div>
                )}
              </div>

              {onNavigateToTracker && !stats.lastPeriodStart && (
                <button
                  type="button"
                  onClick={onNavigateToTracker}
                  className="mt-3 text-xs font-semibold text-[#653B68] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{t('tracker.recordPeriodBtn')}</span>
                </button>
              )}
            </div>

            {/* Card 2: Period Duration */}
            <div className="p-5 rounded-2xl bg-white border border-[#EDE5F3] shadow-xs space-y-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#77717B]">
                    {t('tracker.cardPeriodDuration')}
                  </span>
                  <Clock className="w-4 h-4 text-[#653B68]" />
                </div>
                {stats.lastPeriodDuration ? (
                  <div className="mt-2">
                    <p className="font-serif text-2xl font-medium text-[#653B68]">
                      {stats.lastPeriodDuration}{' '}
                      <span className="text-xs font-sans text-[#77717B]">{t('tracker.daysUnit')}</span>
                    </p>
                    {stats.averagePeriodDuration && (
                      <p className="text-[11px] text-[#77717B] mt-0.5">
                        {t('tracker.avgDuration')}: {stats.averagePeriodDuration} {t('tracker.daysUnit')}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="mt-2">
                    <p className="font-serif text-sm text-[#77717B] italic">
                      {t('tracker.notAvailableYet')}
                    </p>
                    <p className="text-[11px] text-[#77717B] mt-1">
                      {t('dashboard.durationCalculatedNotice')}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Card 3: Average Cycle Length */}
            <div className="p-5 rounded-2xl bg-white border border-[#EDE5F3] shadow-xs space-y-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#77717B]">
                    {t('tracker.cardCycleLength')}
                  </span>
                  {stats.hasSufficientHistory && (
                    <span className="text-[10px] font-bold text-[#653B68] bg-[#EDE5F3] px-2 py-0.5 rounded-full uppercase">
                      {t('tracker.estimateBadge')}
                    </span>
                  )}
                </div>
                {stats.hasSufficientHistory && stats.averageCycleLength ? (
                  <div className="mt-2">
                    <p className="font-serif text-2xl font-medium text-[#29252D]">
                      ~{stats.averageCycleLength}{' '}
                      <span className="text-xs font-sans text-[#77717B]">{t('tracker.daysUnit')}</span>
                    </p>
                    <p className="text-[11px] text-[#77717B] mt-0.5">
                      {t('tracker.basedOnRecordedStarts')}
                    </p>
                  </div>
                ) : (
                  <div className="mt-2">
                    <p className="font-serif text-sm text-[#77717B] italic">
                      {t('tracker.requiresTwoStarts')}
                    </p>
                    <p className="text-[10px] text-[#77717B]/80 mt-1 leading-tight">
                      {t('tracker.cycleLengthExplanation')}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Card 4: Estimated Next Period */}
            <div className="p-5 rounded-2xl bg-white border border-[#EDE5F3] shadow-xs space-y-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#77717B]">
                    {t('tracker.cardNextPeriod')}
                  </span>
                  {stats.hasSufficientHistory && (
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full uppercase">
                      {t('tracker.estimateBadge')}
                    </span>
                  )}
                </div>
                {stats.hasSufficientHistory && stats.estimatedNextPeriodStart ? (
                  <div className="mt-2">
                    <p className="font-serif text-lg font-medium text-[#29252D]">
                      {stats.estimatedNextPeriodStart}
                    </p>
                    <p className="text-[11px] text-[#77717B] mt-0.5">
                      ~ {stats.estimatedNextPeriodEnd} ({t('tracker.expectedWindow')})
                    </p>
                  </div>
                ) : (
                  <div className="mt-2">
                    <p className="font-serif text-sm text-[#77717B] italic">
                      {t('tracker.noPredictionYet')}
                    </p>
                    <p className="text-[10px] text-[#77717B]/80 mt-1 leading-tight">
                      {t('tracker.cyclesVaryNotice')}
                    </p>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Additional 3 Cards for Cycles & Reports */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            
            {/* Card 5: Total Recorded Cycles */}
            <div className="p-5 rounded-2xl bg-white border border-[#EDE5F3] shadow-xs flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#77717B] block">
                  {t('history.colCycle')} History
                </span>
                <p className="font-serif text-2xl font-medium text-[#29252D]">
                  {periods.length}{' '}
                  <span className="text-xs font-sans text-[#77717B]">
                    {periods.length === 1 ? 'period' : 'periods'}
                  </span>
                </p>
              </div>
              {onNavigateToHistory && (
                <button
                  type="button"
                  onClick={onNavigateToHistory}
                  className="px-3 py-1.5 rounded-lg bg-[#FFFDF9] border border-[#EDE5F3] hover:border-[#D98CA3] text-xs font-semibold text-[#653B68] transition-colors cursor-pointer"
                >
                  {t('history.title')} →
                </button>
              )}
            </div>

            {/* Card 6: Recent Symptom Analyses */}
            <div className="p-5 rounded-2xl bg-white border border-[#EDE5F3] shadow-xs flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#77717B] block">
                  {t('dashboard.statConsultations')}
                </span>
                <p className="font-serif text-2xl font-medium text-[#653B68]">
                  {reports.length}{' '}
                  <span className="text-xs font-sans text-[#77717B]">
                    {reports.length === 1 ? 'analysis' : 'analyses'}
                  </span>
                </p>
              </div>
              <button
                type="button"
                onClick={() => onStartSymptoms()}
                className="px-3 py-1.5 rounded-lg bg-[#F8E5EA] text-xs font-semibold text-[#653B68] hover:bg-[#EDE5F3] transition-colors cursor-pointer"
              >
                {t('hero.ctaForm')} →
              </button>
            </div>

            {/* Card 7: Recently Generated Doctor Reports */}
            <div className="p-5 rounded-2xl bg-white border border-[#EDE5F3] shadow-xs flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#77717B] block">
                  {t('reports.title')}
                </span>
                <p className="font-serif text-2xl font-medium text-[#29252D]">
                  {reports.length}{' '}
                  <span className="text-xs font-sans text-[#77717B]">
                    {reports.length === 1 ? 'report' : 'reports'}
                  </span>
                </p>
              </div>
              {onNavigateToReports && (
                <button
                  type="button"
                  onClick={onNavigateToReports}
                  className="px-3 py-1.5 rounded-lg bg-[#FFFDF9] border border-[#EDE5F3] hover:border-[#D98CA3] text-xs font-semibold text-[#653B68] transition-colors cursor-pointer"
                >
                  {t('reports.badge')} →
                </button>
              )}
            </div>

          </div>
        </div>

        {/* Quick Launchpad & Clinical Tip Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Quick Inquiries */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl text-[#29252D]">
                {t('dashboard.quickActionsTitle')}
              </h2>
              <span className="text-xs text-[#77717B]">
                {t('hero.popularInquiries')}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {quickCategories.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onStartSymptoms(item.query)}
                  className="p-5 rounded-2xl bg-white border border-[#EDE5F3] hover:border-[#D98CA3] shadow-xs hover:shadow-md transition-all text-left flex flex-col justify-between group cursor-pointer"
                >
                  <div>
                    <h3 className="font-serif text-base font-medium text-[#29252D] group-hover:text-[#653B68] transition-colors">
                      {item.label}
                    </h3>
                    <p className="text-xs text-[#77717B] mt-1">
                      {item.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#EDE5F3] flex items-center justify-between text-xs font-semibold text-[#653B68]">
                    <span>{t('hero.ctaForm')}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Clinical Consultation Tip */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#EDE5F3]/70 to-[#FFFDF9] rounded-3xl p-6 sm:p-8 border border-[#EDE5F3] shadow-xs space-y-4">
            <div className="w-10 h-10 rounded-xl bg-white border border-[#EDE5F3] flex items-center justify-center text-[#653B68] shadow-2xs">
              <Sparkles className="w-5 h-5 text-[#D98CA3]" />
            </div>

            <h3 className="font-serif text-xl font-medium text-[#29252D]">
              {t('dashboard.wellnessTipTitle')}
            </h3>

            <p className="text-xs text-[#77717B] leading-relaxed">
              {t('dashboard.wellnessTipBody')}
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => onStartSymptoms()}
                className="w-full py-2.5 px-4 bg-[#653B68] hover:bg-[#4A264D] text-white rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              >
                {t('features.card1Action')}
              </button>
            </div>
          </div>

        </div>

        {/* Featured Educational Reads (Localized) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl text-[#29252D]">
              {t('edu.heading')}
            </h2>
            <button
              type="button"
              onClick={onExploreLibrary}
              className="text-xs font-semibold text-[#653B68] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>{t('edu.viewAll')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {EDUCATIONAL_ARTICLES.slice(0, 4).map((rawArt) => {
              const art = getLocalizedArticle(rawArt, language);
              return (
                <div
                  key={art.id}
                  onClick={() => onSelectArticle(art)}
                  className="p-5 rounded-2xl bg-white border border-[#EDE5F3] hover:border-[#D98CA3] shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div>
                    <span className="text-[10px] font-semibold text-[#653B68] bg-[#EDE5F3]/60 px-2 py-0.5 rounded-md">
                      {art.category}
                    </span>
                    <h4 className="font-serif text-base font-medium text-[#29252D] mt-2 group-hover:text-[#653B68] transition-colors leading-snug">
                      {art.title}
                    </h4>
                    <p className="text-xs text-[#77717B] mt-1.5 line-clamp-2 leading-relaxed">
                      {art.summary}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#EDE5F3] flex items-center justify-between text-xs font-semibold text-[#653B68]">
                    <span>{t('edu.readGuide')}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
