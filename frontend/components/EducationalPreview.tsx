import React from 'react';
import { ArrowRight, Clock, Sparkles } from 'lucide-react';
import { EDUCATIONAL_ARTICLES, getLocalizedArticle } from '../data/educationalTopics';
import { EducationalArticle } from '../types/health';
import { useLanguage } from '../i18n/LanguageContext';

interface EducationalPreviewProps {
  onSelectArticle: (article: EducationalArticle) => void;
  onViewAll: () => void;
}

export const EducationalPreview: React.FC<EducationalPreviewProps> = ({
  onSelectArticle,
  onViewAll,
}) => {
  const { t, language } = useLanguage();

  return (
    <section id="educational-preview-section" className="scroll-mt-20 py-20 bg-white border-t border-[#EDE5F3] relative overflow-hidden">
      {/* Decorative ambient background */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#F8E5EA]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-[#D98CA3] mb-2 bg-[#F8E5EA]/60 px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t('edu.badge')}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#29252D]">
              {t('edu.heading')}
            </h2>
            <p className="mt-2 text-sm text-[#77717B] max-w-xl">
              {t('edu.subtext')}
            </p>
          </div>

          <button
            onClick={onViewAll}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FFFDF9] border border-[#EDE5F3] hover:border-[#D98CA3] text-xs font-semibold text-[#653B68] hover:text-[#4A264D] shadow-2xs hover:shadow-xs active:scale-[0.98] transition-all cursor-pointer self-start md:self-auto"
          >
            <span>{t('edu.viewAll')}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 8 Topics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {EDUCATIONAL_ARTICLES.map((rawArticle) => {
            const article = getLocalizedArticle(rawArticle, language);

            return (
              <div
                key={article.id}
                onClick={() => {
                  onSelectArticle(article);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="p-6 rounded-3xl bg-[#FFFDF9] border border-[#EDE5F3] hover:border-[#D98CA3]/60 shadow-xs hover:shadow-xl hover:-translate-y-2 active:scale-[0.99] transition-all duration-300 cursor-pointer flex flex-col justify-between group relative overflow-hidden"
              >
                <div>
                  {/* Clean unboxed metadata with bullet separator */}
                  <div className="flex items-center gap-2 text-[11px] text-[#77717B] mb-3">
                    <span className="font-semibold text-[#653B68] bg-[#EDE5F3]/50 px-2 py-0.5 rounded-md">
                      {article.category}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#77717B]" />
                      {article.readingTime}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-medium text-[#29252D] group-hover:text-[#653B68] transition-colors mb-2 leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs text-[#77717B] leading-relaxed line-clamp-3">
                    {article.summary}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#EDE5F3] flex items-center justify-between text-xs font-semibold text-[#653B68]">
                  <span>{t('edu.readGuide')}</span>
                  <div className="w-6 h-6 rounded-full bg-[#F8E5EA] flex items-center justify-center group-hover:translate-x-1 group-hover:bg-[#653B68] group-hover:text-white transition-all duration-200">
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Responsible Education Disclaimer */}
        <div className="mt-12 p-4 rounded-2xl bg-[#EDE5F3]/40 border border-[#EDE5F3] text-xs text-[#77717B] text-center max-w-3xl mx-auto">
          {t('edu.disclaimer')}
        </div>

      </div>
    </section>
  );
};
