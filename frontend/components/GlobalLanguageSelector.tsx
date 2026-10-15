import React from 'react';
import { Languages } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { SupportedLanguage } from '../i18n/translations';

interface GlobalLanguageSelectorProps {
  className?: string;
  variant?: 'compact' | 'full' | 'pill';
  showLabel?: boolean;
}

export const GlobalLanguageSelector: React.FC<GlobalLanguageSelectorProps> = ({
  className = '',
  variant = 'compact',
  showLabel = false,
}) => {
  const { language, setLanguage, t } = useLanguage();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value as SupportedLanguage;
    if (val === 'en' || val === 'hi' || val === 'kn') {
      setLanguage(val);
    }
  };

  if (variant === 'pill') {
    return (
      <div className={`flex items-center gap-1 p-1 bg-[#FFFDF9] border border-[#EDE5F3] rounded-2xl shadow-2xs ${className}`}>
        {(['en', 'hi', 'kn'] as SupportedLanguage[]).map((lang) => (
          <button
            key={lang}
            type="button"
            onClick={() => setLanguage(lang)}
            className={`px-3 py-1 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
              language === lang
                ? 'bg-[#653B68] text-white shadow-2xs'
                : 'text-[#77717B] hover:text-[#29252D] hover:bg-[#F8E5EA]/60'
            }`}
          >
            {lang === 'en' ? 'EN' : lang === 'hi' ? 'हिन्दी' : 'ಕನ್ನಡ'}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center gap-1.5 bg-[#FFFDF9] border border-[#EDE5F3] hover:border-[#D98CA3] px-3 py-1.5 rounded-xl text-xs font-medium text-[#29252D] shadow-2xs transition-colors group ${className}`}
    >
      <Languages className="w-3.5 h-3.5 text-[#D98CA3] group-hover:rotate-12 transition-transform" />
      {showLabel && (
        <span className="text-[#77717B] font-medium hidden sm:inline">
          {t('lang.selectLanguage')}:
        </span>
      )}
      <select
        aria-label="Global Language Selector"
        value={language}
        onChange={handleLanguageChange}
        className="bg-transparent border-none outline-none cursor-pointer text-[#29252D] font-medium pr-1"
      >
        <option value="en">English</option>
        <option value="hi">हिन्दी (Hindi)</option>
        <option value="kn">ಕನ್ನಡ (Kannada)</option>
      </select>
    </div>
  );
};
