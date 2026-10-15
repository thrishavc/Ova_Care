import React from 'react';
import {
  AlertTriangle,
  Calendar,
  CheckCircle2,
  FileText,
  Edit3,
  Home,
  ExternalLink,
  ShieldAlert,
  ArrowRight,
  Info,
  Clock,
  Sparkles,
} from 'lucide-react';
import { motion } from 'motion/react';
import { SymptomAnalysisResult } from '../types/health';
import { useLanguage } from '../i18n/LanguageContext';

interface ResultsScreenProps {
  result: SymptomAnalysisResult;
  onEditSymptoms: () => void;
  onPrepareDoctorSummary: () => void;
  onNavigateHome: () => void;
  onViewUrgentScreen: () => void;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({
  result,
  onEditSymptoms,
  onPrepareDoctorSummary,
  onNavigateHome,
  onViewUrgentScreen,
}) => {
  const { t } = useLanguage();
  const isUrgent = result.urgency === 'urgent';
  const isPrompt = result.urgency === 'prompt';

  const urgencyConfig = {
    urgent: {
      badgeText: t('results.urgentBadge'),
      borderClass: 'border-red-300',
      bgClass: 'bg-red-50/70',
      titleColor: 'text-red-900',
      descColor: 'text-red-800',
      icon: AlertTriangle,
      iconColor: 'text-red-600',
    },
    prompt: {
      badgeText: t('results.promptBadge'),
      borderClass: 'border-amber-200',
      bgClass: 'bg-amber-50/50',
      titleColor: 'text-amber-950',
      descColor: 'text-amber-900',
      icon: Clock,
      iconColor: 'text-amber-700',
    },
    routine: {
      badgeText: t('results.routineBadge'),
      borderClass: 'border-emerald-200',
      bgClass: 'bg-emerald-50/40',
      titleColor: 'text-emerald-950',
      descColor: 'text-emerald-900',
      icon: CheckCircle2,
      iconColor: 'text-emerald-700',
    },
  }[result.urgency] || {
    badgeText: t('results.badge'),
    borderClass: 'border-slate-200',
    bgClass: 'bg-slate-50',
    titleColor: 'text-slate-900',
    descColor: 'text-slate-700',
    icon: Info,
    iconColor: 'text-slate-600',
  };

  const UrgencyIcon = urgencyConfig.icon;

  return (
    <div className="py-10 bg-[#FFFDF9] min-h-[calc(100vh-140px)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation Breadcrumb / Actions Bar */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-[#EDE5F3]"
        >
          <div className="flex items-center gap-2 text-xs text-[#77717B]">
            <button
              onClick={onNavigateHome}
              className="hover:text-[#653B68] transition-colors cursor-pointer"
            >
              {t('nav.home')}
            </button>
            <span aria-hidden="true">/</span>
            <span className="text-[#29252D] font-medium">{t('results.breadcrumb')}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onEditSymptoms}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#29252D] bg-white border border-[#EDE5F3] hover:border-[#D98CA3] active:scale-[0.98] rounded-full transition-all cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5 text-[#D98CA3]" />
              <span>{t('results.editSymptoms')}</span>
            </button>
            <button
              onClick={onPrepareDoctorSummary}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-[#653B68] to-[#4A264D] hover:from-[#4A264D] hover:to-[#38183B] active:scale-[0.98] rounded-full shadow-xs transition-all cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{t('results.prepareSummary')}</span>
            </button>
          </div>
        </motion.div>

        {/* Source & Mode Status Bar */}
        <div className="flex items-center justify-between text-xs text-[#77717B] px-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#29252D]">
              {result.isAiGenerated
                ? 'Clinical Assessment'
                : result.demoModelLabel || 'Clinical Guidance Profile'}
            </span>
            <span aria-hidden="true">·</span>
            <span>Language: {result.detectedLanguage}</span>
          </div>
          <span>
            {new Date(result.timestamp).toLocaleDateString(undefined, {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
        </div>

        {/* SECTION A: Urgency Indicator Banner with Entrance */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`p-6 sm:p-7 rounded-3xl border ${urgencyConfig.borderClass} ${urgencyConfig.bgClass} space-y-3 shadow-xs`}
        >
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#653B68]">
            <UrgencyIcon className={`w-4 h-4 ${urgencyConfig.iconColor}`} />
            <span>{urgencyConfig.badgeText}</span>
          </div>

          <h2 className={`font-serif text-2xl font-medium ${urgencyConfig.titleColor}`}>
            {result.urgencyTitle}
          </h2>

          <p className={`text-sm leading-relaxed ${urgencyConfig.descColor}`}>
            {result.urgencyReason}
          </p>

          {isUrgent && (
            <div className="pt-2">
              <button
                onClick={onViewUrgentScreen}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 active:scale-[0.98] text-white text-xs font-semibold rounded-full shadow-sm transition-all cursor-pointer"
              >
                <ShieldAlert className="w-4 h-4" />
                <span>{t('results.viewUrgent')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </motion.div>

        {/* SECTION B: What We Understood */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="p-6 sm:p-8 bg-white rounded-3xl border border-[#EDE5F3] shadow-xs space-y-4"
        >
          <h3 className="font-serif text-lg font-medium text-[#29252D]">
            {t('results.understoodSymptoms')}
          </h3>

          <div className="flex flex-wrap gap-2">
            {result.understoodSymptoms.map((symptom, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FFFDF9] border border-[#EDE5F3] text-xs font-medium text-[#29252D]"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#6C856B]" />
                {symptom}
              </span>
            ))}
          </div>

          {result.durationAndDetails && (
            <p className="text-xs text-[#77717B] pt-2 border-t border-[#EDE5F3]/70">
              <strong className="text-[#29252D]">{t('results.timeline')}: </strong>
              {result.durationAndDetails}
            </p>
          )}

          {/* Missing Context */}
          {result.missingInformation && result.missingInformation.length > 0 && (
            <div className="mt-4 p-4 rounded-2xl bg-[#FFFDF9] border border-[#EDE5F3] space-y-2">
              <p className="text-xs font-semibold text-[#653B68]">
                {t('results.missingContext')}:
              </p>
              <ul className="space-y-1.5 text-xs text-[#77717B]">
                {result.missingInformation.map((info, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#D98CA3]">•</span>
                    <span>{info}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>

        {/* SECTION C: General Plain Language Explanation */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="p-6 sm:p-8 bg-white rounded-3xl border border-[#EDE5F3] shadow-xs space-y-3"
        >
          <h3 className="font-serif text-lg font-medium text-[#29252D]">
            {t('results.physiology')}
          </h3>
          <p className="text-sm text-[#29252D] leading-relaxed whitespace-pre-line font-normal">
            {result.plainLanguageExplanation}
          </p>
        </motion.div>

        {/* SECTION D: Common Associations */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="p-6 sm:p-8 bg-white rounded-3xl border border-[#EDE5F3] shadow-xs space-y-4"
        >
          <div>
            <h3 className="font-serif text-lg font-medium text-[#29252D]">
              {t('results.commonAssociations')}
            </h3>
            <p className="text-xs text-[#77717B] mt-0.5">
              {t('hero.trustDisclaimer')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {result.commonAssociations.map((assoc, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-[#FFFDF9] border border-[#EDE5F3] space-y-1.5 hover:border-[#D98CA3]/50 transition-colors"
              >
                <h4 className="text-xs font-semibold text-[#653B68]">{assoc.name}</h4>
                <p className="text-xs text-[#77717B] leading-relaxed">{assoc.description}</p>
                {assoc.prevalenceNote && (
                  <p className="text-[11px] text-[#A9BCA8] font-medium pt-1">
                    {assoc.prevalenceNote}
                  </p>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* SECTION E: Next Steps Guidance */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="p-6 sm:p-8 bg-white rounded-3xl border border-[#EDE5F3] shadow-xs space-y-4"
        >
          <h3 className="font-serif text-lg font-medium text-[#29252D]">
            {t('results.nextSteps')}
          </h3>
          <ul className="space-y-2.5 text-xs text-[#29252D]">
            {result.nextSteps.map((step, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#F8E5EA] text-[#653B68] flex items-center justify-center font-semibold text-[11px] shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="leading-relaxed text-[#77717B]">{step}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* SECTION F: Verified Educational Sources */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="p-6 bg-[#FFFDF9] rounded-3xl border border-[#EDE5F3] space-y-3"
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-[#653B68]">
            {t('results.verifiedSources')}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {result.verifiedSources.map((source, idx) => (
              <a
                key={idx}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white rounded-2xl border border-[#EDE5F3] hover:border-[#D98CA3] hover:shadow-xs transition-all flex flex-col justify-between group"
              >
                <div>
                  <p className="text-xs font-semibold text-[#29252D] group-hover:text-[#653B68] flex items-center justify-between">
                    <span>{source.title}</span>
                    <ExternalLink className="w-3 h-3 text-[#77717B]" />
                  </p>
                  <p className="text-[11px] text-[#653B68] font-medium mt-0.5">
                    {source.organization}
                  </p>
                  <p className="text-[11px] text-[#77717B] mt-1 line-clamp-2">
                    {source.summary}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </motion.div>

        {/* SECTION G: Primary Actions Footer */}
        <div className="p-6 rounded-3xl bg-white border border-[#EDE5F3] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
          <div>
            <h4 className="font-serif text-base font-medium text-[#29252D]">
              {t('features.card3Title')}
            </h4>
            <p className="text-xs text-[#77717B]">
              {t('summary.subtitle')}
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onEditSymptoms}
              className="px-4 py-2.5 text-xs font-medium text-[#77717B] hover:text-[#29252D] rounded-full border border-[#EDE5F3] hover:bg-slate-50 active:scale-[0.98] transition-all cursor-pointer w-full sm:w-auto"
            >
              {t('results.editSymptoms')}
            </button>
            <button
              onClick={onPrepareDoctorSummary}
              className="px-6 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-[#653B68] to-[#4A264D] hover:from-[#4A264D] hover:to-[#38183B] active:scale-[0.98] rounded-full shadow-xs hover:shadow-md transition-all duration-150 cursor-pointer w-full sm:w-auto whitespace-nowrap"
            >
              {t('results.prepareSummary')} →
            </button>
          </div>
        </div>

        {/* Medical Disclaimer */}
        <div className="p-4 rounded-2xl bg-[#EDE5F3]/30 border border-[#EDE5F3] text-xs text-[#77717B] text-center leading-relaxed">
          {result.disclaimer}
        </div>
      </div>
    </div>
  );
};
