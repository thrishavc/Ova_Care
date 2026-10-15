import React, { useState, useRef } from 'react';
import { ArrowRight, BookOpen, Sparkles, Heart, ShieldCheck, HeartPulse, CheckCircle2 } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useLanguage } from '../i18n/LanguageContext';

interface HeroSectionProps {
  onStartSymptoms: (initialText?: string) => void;
  onExploreHealth: () => void;
  onStartChat?: (initialText?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartSymptoms,
  onExploreHealth,
  onStartChat,
}) => {
  const [imageLoaded, setImageLoaded] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();

  // Extremely subtle, lightweight scroll parallax that never hijacks scrolling
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const yParallaxImage = useTransform(scrollYProgress, [0, 1], [0, 20]);
  const yParallaxBadge1 = useTransform(scrollYProgress, [0, 1], [0, -25]);
  const yParallaxBadge2 = useTransform(scrollYProgress, [0, 1], [0, -15]);

  const quickSymptomsByLang: Record<string, Array<{ label: string; query: string }>> = {
    en: [
      { label: '🌸 Irregular Cycles', query: 'My periods have been irregular for two months and I have lower abdominal pain.' },
      { label: '⚡ Severe Cramps', query: 'Severe, debilitating menstrual cramps that leave me bedridden for two to three days.' },
      { label: '🌿 PCOS & Acne', query: 'Irregular cycles, persistent hormonal acne along the jawline, and excess facial hair.' },
      { label: '💧 Heavy Bleeding', query: 'Extremely heavy menstrual flow soaking through multiple pads and feeling exhausted.' },
    ],
    hi: [
      { label: '🌸 अनियमित पीरियड्स', query: 'मेरे पीरियड्स दो महीने से अनियमित हैं और कभी-कभी पेट के निचले हिस्से में दर्द होता है।' },
      { label: '⚡ गंभीर ऐंठन व दर्द', query: 'मासिक धर्म के दौरान बहुत तेज़ असहनीय ऐंठन और दर्द होता है जो 2-3 दिन रहता है।' },
      { label: '🌿 पीसीओएस और मुंहासे', query: 'अनियमित पीरियड्स, चेहरे पर अनचाहे बाल और जबड़े के पास मुंहासे की समस्या।' },
      { label: '💧 अत्यधिक रक्तस्राव', query: 'पीरियड्स के दौरान बहुत अधिक रक्तस्राव होना और अत्यधिक कमजोरी महसूस होना।' },
    ],
    kn: [
      { label: '🌸 ಅನಿಯಮಿತ ಮುಟ್ಟು', query: 'ನನ್ನ ಮುಟ್ಟು ಕಳೆದ ೨ ತಿಂಗಳುಗಳಿಂದ ಸರಿ ಇಲ್ಲ ಮತ್ತು ಹೊಟ್ಟೆಯ ಕೆಳಭಾಗದಲ್ಲಿ ನೋವು ಬರುತ್ತಿದೆ.' },
      { label: '⚡ ತೀವ್ರ ಹೊಟ್ಟೆ ನೋವು', query: 'ಮುಟ್ಟಿನ ಸಮಯದಲ್ಲಿ ತೀವ್ರವಾದ ಅಸಹನೀಯ ಹೊಟ್ಟೆ ನೋವು ಮತ್ತು ಸೊಂಟ ನೋವು ಬರುತ್ತದೆ.' },
      { label: '🌿 ಪಿಸಿಒಎಸ್ ಮತ್ತು ಮೊಡವೆ', query: 'ಮುಟ್ಟಿನ ದಿನಾಂಕಗಳು ಸರಿಯಾಗಿಲ್ಲ, ಮುಖದಲ್ಲಿ ಮೊಡವೆಗಳು ಮತ್ತು ಕೂದಲು ಬೆಳೆಯುವ ಲಕ್ಷಣಗಳು.' },
      { label: '💧 ಅತಿಯಾದ ರಕ್ತಸ್ರಾವ', query: 'ಮುಟ್ಟಿನ ಸಮಯದಲ್ಲಿ ಅತಿಯಾದ ರಕ್ತಸ್ರಾವ ಮತ್ತು ನಿಶ್ಯಕ್ತಿ ಉಂಟಾಗುತ್ತಿದೆ.' },
    ],
  };

  const quickSymptoms = quickSymptomsByLang[language] || quickSymptomsByLang.en;

  return (
    <section ref={containerRef} id="hero-section" className="relative overflow-hidden pt-6 pb-20 md:pt-12 md:pb-24">
      {/* Gentle ambient background glows */}
      <div className="absolute top-0 right-1/4 w-[420px] h-[420px] bg-gradient-to-tr from-[#F8E5EA]/50 to-[#EDE5F3]/50 rounded-full blur-3xl pointer-events-none -z-10 animate-drift-slow" />
      <div className="absolute bottom-6 left-10 w-[360px] h-[360px] bg-gradient-to-br from-[#EDE5F3]/40 to-[#F1F6F0]/40 rounded-full blur-3xl pointer-events-none -z-10 animate-drift-slow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Trust & Safety Banner with gentle entrance */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-8 inline-flex items-center gap-2 text-xs text-[#77717B] bg-white/85 backdrop-blur-xs px-3.5 py-1.5 rounded-full border border-[#EDE5F3] shadow-xs"
        >
          <span className="w-2 h-2 rounded-full bg-[#D98CA3]" />
          <span className="font-semibold text-[#653B68]">{t('hero.trustBanner')}</span>
          <span aria-hidden="true" className="text-[#D98CA3]">·</span>
          <span>{t('hero.trustDisclaimer')}</span>
        </motion.div>

        {/* 2-Column Split: Content & Animated Wellness Illustration */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & Actions with smooth load entrance */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Main Headline Entrance */}
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#29252D] leading-[1.14]"
            >
              {t('hero.headlineMain')} <br />
              <span className="italic text-[#D98CA3] font-serif relative inline-block">
                {t('hero.headlineHighlight')}
                <motion.svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-[#D98CA3]/40"
                  viewBox="0 0 200 12"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.4 }}
                >
                  <path d="M2 9C50 3 150 3 198 9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </motion.svg>
              </span>
            </motion.h1>

            {/* Description Entrance */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg text-[#77717B] max-w-xl leading-relaxed font-normal"
            >
              {t('hero.subheadline')}
            </motion.p>

            {/* Buttons Entrance */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5"
            >
              <button
                onClick={() => (onStartChat ? onStartChat() : onStartSymptoms())}
                className="px-7 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-[#653B68] to-[#4A264D] hover:from-[#4A264D] hover:to-[#38183B] rounded-full shadow-md hover:shadow-lg active:scale-[0.98] transition-all duration-200 whitespace-nowrap cursor-pointer flex items-center justify-center gap-2 group relative overflow-hidden"
              >
                <span>{t('hero.ctaChat')}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onStartSymptoms()}
                className="px-6 py-3.5 text-sm font-semibold text-[#653B68] bg-[#F8E5EA]/80 hover:bg-[#F8E5EA] border border-[#D98CA3]/30 rounded-full shadow-2xs hover:shadow-xs active:scale-[0.98] transition-all duration-200 whitespace-nowrap cursor-pointer flex items-center justify-center gap-2"
              >
                <HeartPulse className="w-4 h-4 text-[#D98CA3]" />
                <span>{t('hero.ctaForm')}</span>
              </button>

              <button
                onClick={onExploreHealth}
                className="px-5 py-3.5 text-sm font-semibold text-[#29252D] hover:text-[#653B68] bg-white hover:bg-[#F8E5EA]/40 border border-[#EDE5F3] hover:border-[#D98CA3]/50 rounded-full shadow-xs hover:shadow-sm active:scale-[0.98] transition-all duration-200 whitespace-nowrap cursor-pointer flex items-center justify-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-[#D98CA3]" />
                <span>{t('hero.ctaLibrary')}</span>
              </button>
            </motion.div>

            {/* Quick Symptom Chips Entrance */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className="pt-4 space-y-2"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-[#77717B] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#D98CA3]" />
                <span>{t('hero.popularInquiries')}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {quickSymptoms.map((qs, i) => (
                  <button
                    key={i}
                    onClick={() => onStartSymptoms(qs.query)}
                    className="text-xs py-1.5 px-3 rounded-full bg-white/95 border border-[#EDE5F3] hover:border-[#D98CA3] hover:bg-[#F8E5EA]/50 text-[#29252D] font-medium shadow-2xs hover:shadow-xs active:scale-[0.96] transition-all cursor-pointer"
                  >
                    {qs.label}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Quality Pillars Entrance */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="pt-6 border-t border-[#EDE5F3]/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#77717B]"
            >
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#6C856B] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#29252D]">{t('hero.pillarLanguageTitle')}</p>
                  <p className="mt-0.5">{t('hero.pillarLanguageDesc')}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#6C856B] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#29252D]">{t('hero.pillarDoctorTitle')}</p>
                  <p className="mt-0.5">{t('hero.pillarDoctorDesc')}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#6C856B] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#29252D]">{t('hero.pillarSafetyTitle')}</p>
                  <p className="mt-0.5">{t('hero.pillarSafetyDesc')}</p>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Hero Illustration with Subtle Floating Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            {/* Soft decorative ring behind image */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-[#F8E5EA] to-[#EDE5F3] rounded-[2.5rem] -rotate-1 blur-xs opacity-70 -z-10" />

            {/* Floating Parallax Container */}
            <motion.div
              style={{ y: yParallaxImage }}
              className="relative rounded-3xl overflow-hidden border border-[#EDE5F3] bg-[#FFFDF9] shadow-xl group"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-[#F8E5EA]/30 relative">
                {imageLoaded ? (
                  <img
                    src="/images/hero.jpg"
                    alt="Ova Care women wellness illustration"
                    onError={() => setImageLoaded(false)}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-tr from-[#F8E5EA] to-[#EDE5F3] p-8 text-center">
                    <Heart className="w-16 h-16 text-[#D98CA3] mb-4 animate-float-gentle" />
                    <span className="font-serif text-2xl text-[#653B68]">Ova Care</span>
                    <span className="text-xs text-[#77717B] mt-1">Holistic Women's Health & Symptom Guidance</span>
                  </div>
                )}
              </div>

              {/* Parallax Floating Badge 1: Clinical Guidance */}
              <motion.div
                style={{ y: yParallaxBadge1 }}
                className="absolute top-4 right-4 bg-white/95 backdrop-blur-md border border-[#EDE5F3] p-3 rounded-2xl shadow-lg flex items-center gap-2.5 max-w-[210px]"
              >
                <div className="w-8 h-8 rounded-full bg-[#F8E5EA] flex items-center justify-center text-[#653B68] shrink-0 shadow-2xs">
                  <ShieldCheck className="w-4 h-4 text-[#653B68]" />
                </div>
                <div className="text-[11px] leading-tight">
                  <span className="font-bold text-[#29252D] block">Evidence-Based</span>
                  <span className="text-[#77717B] text-[10px]">ACOG & WHO Grounded</span>
                </div>
              </motion.div>

              {/* Parallax Floating Badge 2: Doctor Preparation */}
              <motion.div
                style={{ y: yParallaxBadge2 }}
                className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md border border-[#EDE5F3] p-3 rounded-2xl shadow-lg flex items-center gap-2.5"
              >
                <div className="w-8 h-8 rounded-full bg-[#EDE5F3] flex items-center justify-center text-[#653B68] shrink-0 shadow-2xs">
                  <HeartPulse className="w-4 h-4 text-[#D98CA3]" />
                </div>
                <div className="text-[11px] leading-tight">
                  <span className="font-bold text-[#29252D] block">Doctor Consultation Sheet</span>
                  <span className="text-[#77717B] text-[10px]">Printable patient summary</span>
                </div>
              </motion.div>

            </motion.div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
