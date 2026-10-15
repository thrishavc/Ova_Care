import React from 'react';
import { Shield, Sparkles, Heart, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface AboutSectionProps {
  onStartSymptoms: () => void;
  onExploreLibrary: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onStartSymptoms,
  onExploreLibrary,
}) => {
  const { t } = useLanguage();

  return (
    <div className="py-12 bg-[#FFFDF9] min-h-[calc(100vh-140px)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="space-y-4">
          <p className="text-xs font-semibold tracking-wider uppercase text-[#D98CA3]">
            {t('about.badge')}
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#29252D] font-normal leading-tight">
            {t('about.title')} — <br />
            <span className="italic text-[#653B68]">{t('about.missionHeading')}</span>
          </h1>
          <p className="text-base text-[#77717B] leading-relaxed">
            {t('about.missionText')}
          </p>
        </div>

        {/* Core Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-[#EDE5F3] shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#F8E5EA] flex items-center justify-center text-[#653B68]">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-medium text-[#29252D]">
              {t('hero.pillarLanguageTitle')}
            </h3>
            <p className="text-xs text-[#77717B] leading-relaxed">
              Medical vocabulary should never be a gatekeeper to understanding one's own body. Ova Care welcomes everyday descriptions in English, Hindi, and Kannada without requiring intimidating medical terms.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#EDE5F3] shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#EDE5F3] flex items-center justify-center text-[#653B68]">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-medium text-[#29252D]">
              {t('about.privacyTitle')}
            </h3>
            <ul className="text-xs text-[#77717B] leading-relaxed space-y-1.5">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6C856B]" />
                <span>{t('about.privacyPoint1')}</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6C856B]" />
                <span>{t('about.privacyPoint2')}</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6C856B]" />
                <span>{t('about.privacyPoint3')}</span>
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#EDE5F3] shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#F1F6F0] flex items-center justify-center text-[#6C856B]">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-medium text-[#29252D]">
              Evidence Grounding (ACOG & WHO)
            </h3>
            <p className="text-xs text-[#77717B] leading-relaxed">
              All physiological explanations and association frameworks are grounded strictly in established literature from the American College of Obstetricians and Gynecologists (ACOG), the World Health Organization (WHO), and the NHS.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#EDE5F3] shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#FDF4F6] flex items-center justify-center text-[#B76681]">
              <AlertCircle className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-medium text-[#29252D]">
              {t('about.disclaimerHeading')}
            </h3>
            <p className="text-xs text-[#77717B] leading-relaxed">
              {t('about.disclaimerText')}
            </p>
          </div>
        </div>

        {/* Global Multilingual Support Summary */}
        <div className="p-8 rounded-3xl bg-white border border-[#EDE5F3] space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#653B68]">
            <Sparkles className="w-4 h-4 text-[#D98CA3]" />
            <span>Inclusive Linguistic Access</span>
          </div>
          <h2 className="font-serif text-2xl font-medium text-[#29252D]">
            Global Multilingual Platform
          </h2>
          <div className="space-y-3 text-xs text-[#77717B] leading-relaxed">
            <p>
              Ova Care offers a unified global language switch available in the top navigation bar of every screen. Switch seamlessly between English, हिन्दी (Hindi), and ಕನ್ನಡ (Kannada). Your preference is saved across sessions without tracking your identity.
            </p>
          </div>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <button
              onClick={onStartSymptoms}
              className="px-6 py-2.5 text-xs font-semibold text-white bg-[#653B68] hover:bg-[#4A264D] rounded-full shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <span>{t('hero.ctaForm')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onExploreLibrary}
              className="px-5 py-2.5 text-xs font-semibold text-[#29252D] bg-[#FFFDF9] border border-[#EDE5F3] hover:border-[#D98CA3] rounded-full cursor-pointer"
            >
              {t('dashboard.actionLibraryTitle')}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
