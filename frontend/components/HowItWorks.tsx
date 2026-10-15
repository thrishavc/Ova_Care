import React, { useState, useRef } from 'react';
import { MessageSquareText, Compass, Stethoscope, Printer, ArrowRight, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { InteractiveTiltCard } from './InteractiveTiltCard';
import { useLanguage } from '../i18n/LanguageContext';

interface HowItWorksProps {
  onStartSymptoms: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onStartSymptoms }) => {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const steps = [
    {
      num: '01',
      icon: MessageSquareText,
      title: t('how.step1Title'),
      desc: t('how.step1Desc'),
      tag: t('how.step1Tag'),
    },
    {
      num: '02',
      icon: Compass,
      title: t('how.step2Title'),
      desc: t('how.step2Desc'),
      tag: t('how.step2Tag'),
    },
    {
      num: '03',
      icon: Stethoscope,
      title: t('how.step3Title'),
      desc: t('how.step3Desc'),
      tag: t('how.step3Tag'),
    },
    {
      num: '04',
      icon: Printer,
      title: t('how.step4Title'),
      desc: t('how.step4Desc'),
      tag: t('how.step4Tag'),
    },
  ];

  const handleNext = () => {
    setActiveStep((prev) => (prev + 1) % steps.length);
  };

  const handlePrev = () => {
    setActiveStep((prev) => (prev - 1 + steps.length) % steps.length);
  };

  return (
    <section id="how-it-works-section" className="scroll-mt-20 py-20 bg-[#FFFDF9] relative overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-[#EDE5F3]/50 rounded-full blur-3xl pointer-events-none -z-10 animate-drift-slow" />
      <div className="absolute top-10 left-10 w-80 h-80 bg-[#F8E5EA]/40 rounded-full blur-3xl pointer-events-none -z-10 animate-drift-slow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Step Selector */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-[#D98CA3] mb-2 bg-[#F8E5EA]/60 px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t('how.badge')}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#29252D]">
              {t('how.heading')}
            </h2>
            <p className="mt-2 text-sm text-[#77717B] leading-relaxed">
              {t('how.subtext')}
            </p>
          </div>

          {/* Step Selector Pills & Carousel Controls */}
          <div className="flex items-center gap-2 self-start md:self-auto bg-white border border-[#EDE5F3] p-1.5 rounded-2xl shadow-xs">
            <button
              onClick={handlePrev}
              aria-label="Previous step"
              className="p-2 rounded-xl text-[#29252D] hover:bg-[#F8E5EA] active:scale-95 transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-1.5 px-2">
              {steps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveStep(i)}
                  className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    activeStep === i
                      ? 'bg-[#653B68] text-white shadow-xs'
                      : 'bg-[#EDE5F3]/50 text-[#77717B] hover:bg-[#EDE5F3] hover:text-[#29252D]'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button
              onClick={handleNext}
              aria-label="Next step"
              className="p-2 rounded-xl text-[#29252D] hover:bg-[#F8E5EA] active:scale-95 transition-all cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Responsive Staggered Step Cards with Smooth Scroll Reveal */}
        <div ref={containerRef} className="overflow-visible">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isSelected = activeStep === idx;

              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <InteractiveTiltCard
                    onClick={() => setActiveStep(idx)}
                    className={`p-7 rounded-3xl bg-white border hover:border-[#D98CA3] shadow-xs hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group cursor-pointer h-full ${
                      isSelected
                        ? 'border-[#D98CA3] ring-2 ring-[#D98CA3]/30 shadow-md scale-[1.02]'
                        : 'border-[#EDE5F3]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <span className="font-serif text-3xl font-light text-[#D98CA3] group-hover:scale-110 transition-transform">
                          {step.num}
                        </span>
                        <div className="w-12 h-12 rounded-2xl bg-[#EDE5F3]/60 group-hover:bg-[#F8E5EA] flex items-center justify-center text-[#653B68] group-hover:scale-110 transition-all duration-300 shadow-2xs">
                          <Icon className="w-6 h-6" />
                        </div>
                      </div>

                      <span className="inline-block text-[10px] font-semibold uppercase tracking-wider text-[#653B68] mb-2 bg-[#EDE5F3]/70 px-2.5 py-1 rounded-md border border-[#D98CA3]/20">
                        {step.tag}
                      </span>

                      <h3 className="font-serif text-lg font-medium text-[#29252D] mb-2.5 group-hover:text-[#653B68] transition-colors">
                        {step.title}
                      </h3>

                      <p className="text-xs leading-relaxed text-[#77717B]">
                        {step.desc}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-[#EDE5F3] flex items-center justify-between text-[11px] font-semibold text-[#653B68]">
                      <span>{step.num} / 04</span>
                      <div
                        className={`w-2.5 h-2.5 rounded-full transition-all ${
                          isSelected ? 'bg-[#653B68] scale-125' : 'bg-[#D98CA3] opacity-60'
                        }`}
                      />
                    </div>
                  </InteractiveTiltCard>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom Action Button */}
        <div className="mt-12 text-center">
          <button
            onClick={onStartSymptoms}
            className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-[#653B68] to-[#4A264D] hover:from-[#4A264D] hover:to-[#38183B] rounded-full shadow-md hover:shadow-xl active:scale-[0.98] transition-all duration-200 cursor-pointer"
          >
            <span>{t('how.ctaButton')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
