import React, { useState, useRef } from 'react';
import { Activity, BookOpen, FileCheck, ArrowRight, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { InteractiveTiltCard } from './InteractiveTiltCard';
import { useLanguage } from '../i18n/LanguageContext';

interface FeatureCardsProps {
  onNavigate: (tab: string) => void;
}

export const FeatureCards: React.FC<FeatureCardsProps> = ({ onNavigate }) => {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const constraintsRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const cards = [
    {
      id: 'assistant',
      icon: Activity,
      title: t('features.card1Title'),
      kicker: t('features.card1Kicker'),
      badge: t('features.card1Badge'),
      description: t('features.card1Desc'),
      actionText: t('features.card1Action'),
      gradient: 'from-[#F8E5EA] to-[#EDE5F3]',
    },
    {
      id: 'library',
      icon: BookOpen,
      title: t('features.card2Title'),
      kicker: t('features.card2Kicker'),
      badge: t('features.card2Badge'),
      description: t('features.card2Desc'),
      actionText: t('features.card2Action'),
      gradient: 'from-[#EDE5F3] to-[#F1F6F0]',
    },
    {
      id: 'dashboard',
      icon: FileCheck,
      title: t('features.card3Title'),
      kicker: t('features.card3Kicker'),
      badge: t('features.card3Badge'),
      description: t('features.card3Desc'),
      actionText: t('features.card3Action'),
      gradient: 'from-[#F1F6F0] to-[#F8E5EA]',
    },
  ];

  const handleNext = () => {
    setActiveCardIndex((prev) => (prev + 1) % cards.length);
  };

  const handlePrev = () => {
    setActiveCardIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  return (
    <section id="features-section" className="scroll-mt-20 py-16 bg-white border-y border-[#EDE5F3] relative overflow-hidden">
      {/* Ambient background blur */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#F8E5EA]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#EDE5F3]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header with Interactive View Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-[#D98CA3] mb-2 bg-[#F8E5EA]/60 px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t('features.badge')}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#29252D]">
              {t('features.heading')}
            </h2>
            <p className="mt-2 text-sm text-[#77717B] leading-relaxed">
              {t('features.subtext')}
            </p>
          </div>

          {/* Interactive Slider Navigation Controls */}
          <div className="flex items-center gap-2 self-start md:self-auto bg-[#FFFDF9] border border-[#EDE5F3] p-1.5 rounded-2xl shadow-xs">
            <button
              onClick={handlePrev}
              aria-label="Previous card"
              className="p-2 rounded-xl text-[#29252D] hover:bg-[#F8E5EA] active:scale-95 transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-1.5 px-2">
              {cards.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveCardIndex(i)}
                  aria-label={`Go to card ${i + 1}`}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    activeCardIndex === i ? 'w-6 bg-[#653B68]' : 'w-2 bg-[#EDE5F3] hover:bg-[#D98CA3]'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={handleNext}
              aria-label="Next card"
              className="p-2 rounded-xl text-[#29252D] hover:bg-[#F8E5EA] active:scale-95 transition-all cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <span className="h-4 w-px bg-[#EDE5F3] mx-1" />
            <div className="flex items-center gap-1 text-[11px] font-medium text-[#77717B] px-1">
              <Sparkles className="w-3.5 h-3.5 text-[#D98CA3]" />
              <span>Interactive</span>
            </div>
          </div>
        </div>

        {/* Responsive Staggered Cards Grid with Scroll-Triggered Reveal */}
        <div ref={constraintsRef} className="overflow-visible">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cards.map((card, idx) => {
              const Icon = card.icon;
              const isCurrent = activeCardIndex === idx;

              return (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                >
                  <InteractiveTiltCard
                    onClick={() => {
                      onNavigate(card.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`group p-8 rounded-3xl bg-[#FFFDF9] border hover:border-[#D98CA3] shadow-xs hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between relative overflow-hidden h-full ${
                      isCurrent ? 'border-[#D98CA3] ring-2 ring-[#D98CA3]/30 shadow-md' : 'border-[#EDE5F3]'
                    }`}
                  >
                    {/* Card top subtle highlight */}
                    <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${card.gradient}`} />

                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-white border border-[#EDE5F3] flex items-center justify-center text-[#653B68] shadow-xs group-hover:scale-110 group-hover:bg-[#F8E5EA] transition-all duration-300">
                          <Icon className="w-6 h-6 transition-transform group-hover:rotate-6 duration-300" />
                        </div>
                        <span className="text-[11px] font-semibold text-[#653B68] bg-[#EDE5F3]/70 px-2.5 py-1 rounded-full border border-[#D98CA3]/20">
                          {card.badge}
                        </span>
                      </div>

                      <p className="text-xs font-semibold tracking-wide uppercase text-[#77717B] mb-1">
                        {card.kicker}
                      </p>

                      <h3 className="font-serif text-xl font-medium text-[#29252D] mb-3 group-hover:text-[#653B68] transition-colors">
                        {card.title}
                      </h3>

                      <p className="text-xs leading-relaxed text-[#77717B]">
                        {card.description}
                      </p>
                    </div>

                    <div className="pt-6 mt-6 border-t border-[#EDE5F3] flex items-center justify-between text-xs font-semibold text-[#653B68]">
                      <span>{card.actionText}</span>
                      <div className="w-8 h-8 rounded-full bg-[#F8E5EA] flex items-center justify-center group-hover:translate-x-1.5 group-hover:bg-[#653B68] group-hover:text-white transition-all duration-200 shadow-2xs">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </InteractiveTiltCard>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
