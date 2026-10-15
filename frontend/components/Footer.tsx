import React from 'react';
import { Shield, AlertCircle, ExternalLink } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  return (
    <footer className="no-print bg-[#FFFDF9] border-t border-[#EDE5F3] pt-14 pb-12 mt-20 text-[#77717B] text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Col 1: Brand & Purpose */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#F8E5EA] border border-[#D98CA3]/30 flex items-center justify-center text-[#653B68]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="w-4 h-4">
                  <path d="M12 2C8.5 6 6 9.5 6 13.5A6 6 0 0 0 18 13.5C18 9.5 15.5 6 12 2Z" fill="#D98CA3" fillOpacity="0.25" />
                  <path d="M12 11V18" strokeLinecap="round" />
                </svg>
              </div>
              <span className="font-serif text-xl font-medium tracking-tight text-[#29252D]">
                Ova<span className="text-[#D98CA3]">Care</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed text-[#77717B]">
              {t('footer.description')}
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-[#6C856B]">
              <Shield className="w-3.5 h-3.5" />
              <span>{t('about.privacyTitle')}</span>
            </div>
          </div>

          {/* Col 2: Navigation & Tools */}
          <div>
            <h4 className="font-medium text-xs tracking-wider uppercase text-[#29252D] mb-4">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => { onNavigate('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#653B68] transition-colors cursor-pointer"
                >
                  {t('nav.home')}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => { onNavigate('dashboard'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#653B68] transition-colors cursor-pointer"
                >
                  {t('nav.dashboard')}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => { onNavigate('assistant'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#653B68] transition-colors cursor-pointer"
                >
                  {t('nav.assistant')}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => { onNavigate('tracker'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#653B68] transition-colors cursor-pointer"
                >
                  {t('nav.tracker')}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => { onNavigate('history'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#653B68] transition-colors cursor-pointer"
                >
                  {t('nav.history')}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => { onNavigate('reports'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#653B68] transition-colors cursor-pointer"
                >
                  {t('nav.reports')}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => { onNavigate('library'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#653B68] transition-colors cursor-pointer"
                >
                  {t('nav.library')}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => { onNavigate('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#653B68] transition-colors cursor-pointer"
                >
                  {t('nav.about')}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Verified References */}
          <div>
            <h4 className="font-medium text-xs tracking-wider uppercase text-[#29252D] mb-4">
              Verified Medical Sources
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href="https://www.acog.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#653B68] transition-colors inline-flex items-center gap-1"
                >
                  <span>ACOG Guidelines</span>
                  <ExternalLink className="w-3 h-3 text-[#77717B]" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.who.int"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#653B68] transition-colors inline-flex items-center gap-1"
                >
                  <span>World Health Organization (WHO)</span>
                  <ExternalLink className="w-3 h-3 text-[#77717B]" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.nhs.uk/womens-health/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#653B68] transition-colors inline-flex items-center gap-1"
                >
                  <span>NHS Women&apos;s Health Portal</span>
                  <ExternalLink className="w-3 h-3 text-[#77717B]" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.womenshealth.gov"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#653B68] transition-colors inline-flex items-center gap-1"
                >
                  <span>Office on Women&apos;s Health (HHS)</span>
                  <ExternalLink className="w-3 h-3 text-[#77717B]" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Verified Emergency Contacts */}
          <div>
            <h4 className="font-medium text-xs tracking-wider uppercase text-[#29252D] mb-4">
              {t('footer.emergency')}
            </h4>
            <div className="space-y-2 text-xs">
              <p className="text-[#29252D] font-medium">Pan-India Verified Helplines:</p>
              <div className="space-y-1 text-[#77717B]">
                <p>• {t('urgent.india')}</p>
                <p>• Women Helpline: <strong className="text-[#29252D]">1091</strong></p>
                <p>• Health Consultation: <strong className="text-[#29252D]">104</strong></p>
              </div>
              <div className="pt-2 text-[#77717B]">
                <p>• {t('urgent.us')}</p>
                <p>• {t('urgent.uk')}</p>
              </div>
            </div>
          </div>

        </div>

        {/* Medical & Legal Disclaimer Banner */}
        <div className="pt-8 border-t border-[#EDE5F3] space-y-4">
          <div className="p-4 rounded-xl bg-[#F8E5EA]/50 border border-[#D98CA3]/20 flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-[#B76681] shrink-0 mt-0.5" />
            <div className="text-xs text-[#29252D] leading-relaxed">
              <strong className="font-semibold text-[#653B68]">Disclaimer: </strong>
              {t('footer.disclaimer')}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#77717B]">
            <div>
              © {new Date().getFullYear()} Ova Care · {t('footer.copyright')}
            </div>
            <div className="flex items-center gap-3">
              <span>{t('hero.trustBanner')}</span>
              <span aria-hidden="true">·</span>
              <span>{t('hero.trustDisclaimer')}</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
