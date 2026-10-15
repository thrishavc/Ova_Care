import React, { useState } from 'react';
import { Search, Clock, ArrowRight, ExternalLink, AlertTriangle, X } from 'lucide-react';
import { EDUCATIONAL_ARTICLES, getLocalizedArticle } from '../data/educationalTopics';
import { EducationalArticle } from '../types/health';
import { useLanguage } from '../i18n/LanguageContext';

interface EducationalLibraryProps {
  selectedArticleId?: string | null;
  onSelectArticle: (article: EducationalArticle | null) => void;
  onStartSymptoms: () => void;
}

export const EducationalLibrary: React.FC<EducationalLibraryProps> = ({
  selectedArticleId,
  onSelectArticle,
  onStartSymptoms,
}) => {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [articleModal, setArticleModal] = useState<EducationalArticle | null>(() => {
    if (selectedArticleId) {
      const art = EDUCATIONAL_ARTICLES.find((a) => a.id === selectedArticleId);
      return art ? getLocalizedArticle(art, 'en') : null;
    }
    return null;
  });

  const categories = [
    'All',
    'Menstrual Health',
    'Cycle Changes',
    'Pain & Comfort',
    'Hormonal Health',
    'Chronic Conditions',
    'Fertility',
    'Maternal Care',
    'Life Transitions',
  ];

  const localizedArticles = EDUCATIONAL_ARTICLES.map((art) => getLocalizedArticle(art, language));

  const filteredArticles = localizedArticles.filter((article) => {
    const matchesCategory =
      selectedCategory === 'All' || article.category === selectedCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.plainLanguageIntro.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleOpenArticle = (article: EducationalArticle) => {
    setArticleModal(article);
    onSelectArticle(article);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloseArticle = () => {
    setArticleModal(null);
    onSelectArticle(null);
  };

  return (
    <div className="py-10 bg-[#FFFDF9] min-h-[calc(100vh-140px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header Hero Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-white border border-[#EDE5F3] p-8 sm:p-12 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <p className="text-xs font-semibold tracking-wider uppercase text-[#D98CA3]">
                {t('library.badge')}
              </p>
              <h1 className="font-serif text-3xl sm:text-4xl text-[#29252D] font-normal leading-tight">
                {t('library.title')}
              </h1>
              <p className="text-sm text-[#77717B] max-w-xl leading-relaxed">
                {t('library.subtitle')}
              </p>

              {/* Search Bar */}
              <div className="pt-2 max-w-md">
                <div className="relative">
                  <Search className="w-4 h-4 text-[#77717B] absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t('library.searchPlaceholder')}
                    className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#FFFDF9] border border-[#EDE5F3] rounded-full focus:border-[#D98CA3] focus:outline-none focus:ring-1 focus:ring-[#D98CA3] text-[#29252D] placeholder:text-[#77717B]"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-2.5 text-xs text-[#77717B] hover:text-[#29252D]"
                    >
                      {t('library.clearSearch')}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Right Side Editorial Desk Image */}
            <div className="lg:col-span-4 hidden lg:block">
              <div className="rounded-2xl overflow-hidden border border-[#EDE5F3] shadow-xs">
                {/* Decorative static image from /public; a plain <img> keeps the original layout. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/educational-cover.jpg"
                  alt="Calming wellness consultation desk"
                  referrerPolicy="no-referrer"
                  className="w-full h-44 object-cover"
                />
                <div className="p-3 bg-white text-[11px] text-[#77717B] flex items-center justify-between border-t border-[#EDE5F3]">
                  <span>Vetted Literature</span>
                  <span className="text-[#653B68] font-medium">8 Detailed Guides</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Category Filters Bar (Smoothly floats sticky below navbar while browsing guides) */}
        <div className="sticky top-[72px] z-20 bg-[#FFFDF9]/95 backdrop-blur-md py-3 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 border-b border-[#EDE5F3]/70 transition-all duration-200">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-[#653B68] text-white shadow-xs'
                    : 'bg-white text-[#77717B] border border-[#EDE5F3] hover:text-[#29252D] hover:border-[#D98CA3]/50'
                }`}
              >
                {cat === 'All' ? t('library.allCategories') : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              onClick={() => handleOpenArticle(article)}
              className="p-6 rounded-2xl bg-white border border-[#EDE5F3] hover:border-[#D98CA3] hover:shadow-xs transition-all duration-200 cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center gap-2 text-[11px] text-[#77717B] mb-2.5">
                  <span className="font-medium text-[#653B68]">{article.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#77717B]" />
                    {article.readingTime}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-medium text-[#29252D] group-hover:text-[#653B68] transition-colors mb-2 leading-snug">
                  {article.title}
                </h3>

                <p className="text-xs text-[#77717B] leading-relaxed line-clamp-3 mb-4">
                  {article.summary}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#EDE5F3] flex items-center justify-between text-xs font-semibold text-[#653B68]">
                <span>{t('edu.readGuide')}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="p-12 text-center bg-white rounded-3xl border border-[#EDE5F3] space-y-3">
            <p className="text-sm font-medium text-[#29252D]">{t('library.noResults')} &quot;{searchQuery}&quot;</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="text-xs font-semibold text-[#653B68] hover:underline cursor-pointer"
            >
              {t('library.clearSearch')}
            </button>
          </div>
        )}

        {/* Detailed Article Reader Modal */}
        {articleModal && (
          <div className="fixed inset-0 z-50 bg-[#29252D]/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <div className="relative bg-white rounded-3xl border border-[#EDE5F3] shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-10 space-y-8 my-8">
              
              {/* Close Button */}
              <button
                onClick={handleCloseArticle}
                aria-label="Close reader"
                className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-[#77717B] hover:text-[#29252D] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Reader Header */}
              <div className="space-y-2 pr-8">
                <div className="flex items-center gap-2 text-xs text-[#77717B]">
                  <span className="font-semibold text-[#653B68]">{articleModal.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{articleModal.readingTime}</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#29252D]">
                  {articleModal.title}
                </h2>
                <p className="text-xs text-[#77717B] italic">
                  {articleModal.subtitle}
                </p>
              </div>

              {/* Introduction */}
              <div className="p-5 rounded-2xl bg-[#FFFDF9] border border-[#EDE5F3] text-sm text-[#29252D] leading-relaxed">
                {articleModal.plainLanguageIntro}
              </div>

              {/* Common Experiences */}
              <div className="space-y-3">
                <h3 className="font-serif text-lg font-medium text-[#29252D]">
                  {t('library.modalTabIntro')}
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#77717B]">
                  {articleModal.commonSymptoms.map((sym, idx) => (
                    <li key={idx} className="p-3 rounded-xl bg-white border border-[#EDE5F3] flex items-start gap-2">
                      <span className="text-[#D98CA3] font-bold">•</span>
                      <span>{sym}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Educational Physiology */}
              <div className="space-y-3">
                <h3 className="font-serif text-lg font-medium text-[#29252D]">
                  Physiological Understanding
                </h3>
                <div className="space-y-2 text-xs text-[#29252D] leading-relaxed">
                  {articleModal.educationalOverview.map((item, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-[#FFFDF9] border border-[#EDE5F3]">
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* When to Consult a Doctor */}
              <div className="space-y-3">
                <h3 className="font-serif text-lg font-medium text-[#29252D]">
                  {t('library.modalTabDoctor')}
                </h3>
                <ul className="space-y-2 text-xs text-[#77717B]">
                  {articleModal.whenToConsultDoctor.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#653B68] shrink-0 mt-1.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Red-Flag Urgent Warnings */}
              <div className="p-5 rounded-2xl bg-red-50/70 border border-red-200 space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-red-900">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  <span>{t('library.urgentRedFlagsTitle')}</span>
                </div>
                <ul className="space-y-1 text-xs text-red-800">
                  {articleModal.urgentRedFlags.map((flag, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-red-500 font-bold">•</span>
                      <span>{flag}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Lifestyle and Care */}
              <div className="space-y-3">
                <h3 className="font-serif text-lg font-medium text-[#29252D]">
                  {t('library.modalTabCare')}
                </h3>
                <ul className="space-y-2 text-xs text-[#77717B]">
                  {articleModal.lifestyleAndCare.map((habit, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#A9BCA8] shrink-0 mt-1.5" />
                      <span>{habit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Verified Sources */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#653B68]">
                  Verified Academic & Clinical Citations
                </h4>
                <div className="space-y-2">
                  {articleModal.verifiedSources.map((source, idx) => (
                    <a
                      key={idx}
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl border border-[#EDE5F3] bg-[#FFFDF9] hover:border-[#D98CA3] transition-colors flex items-center justify-between group text-xs"
                    >
                      <div>
                        <span className="font-semibold text-[#29252D] group-hover:text-[#653B68]">
                          {source.title}
                        </span>
                        <p className="text-[11px] text-[#77717B]">{source.organization}</p>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-[#77717B]" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Article Disclaimer */}
              <div className="p-4 rounded-xl bg-[#EDE5F3]/40 border border-[#EDE5F3] text-[11px] text-[#77717B] leading-relaxed">
                <strong>Disclaimer: </strong>{articleModal.disclaimer}
              </div>

              {/* Footer Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-[#EDE5F3]">
                <button
                  onClick={handleCloseArticle}
                  className="px-5 py-2 text-xs font-medium text-[#77717B] hover:text-[#29252D] cursor-pointer"
                >
                  {t('library.modalClose')}
                </button>
                <button
                  onClick={() => {
                    handleCloseArticle();
                    onStartSymptoms();
                  }}
                  className="px-6 py-2.5 text-xs font-semibold text-white bg-[#653B68] hover:bg-[#4A264D] rounded-full shadow-xs cursor-pointer"
                >
                  {t('nav.describeSymptoms')} →
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
