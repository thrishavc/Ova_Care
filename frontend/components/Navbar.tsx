import React, { useState } from 'react';
import {
  Menu,
  X,
  Calendar,
  History,
  FileText,
  Activity,
  BookOpen,
  Info,
  Sparkles,
  Home,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { GlobalLanguageSelector } from './GlobalLanguageSelector';

interface NavbarProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  const handleNav = (tab: string) => {
    onNavigate(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { id: 'home', label: t('nav.home'), icon: Home },
    { id: 'dashboard', label: t('nav.dashboard'), icon: Activity },
    { id: 'assistant', label: t('nav.assistant'), icon: Sparkles },
    { id: 'tracker', label: t('nav.tracker'), icon: Calendar },
    { id: 'history', label: t('nav.history'), icon: History },
    { id: 'reports', label: t('nav.reports'), icon: FileText },
    { id: 'library', label: t('nav.library'), icon: BookOpen },
    { id: 'about', label: t('nav.about'), icon: Info },
  ];

  return (
    <header className="no-print sticky top-0 z-50 bg-[#FFFDF9]/95 backdrop-blur-md border-b border-[#EDE5F3] transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 h-18">
          
          {/* Zone 1: Wordmark */}
          <button
            type="button"
            onClick={() => handleNav('home')}
            className="flex items-center gap-2.5 text-left group transition-transform duration-200 active:scale-95 cursor-pointer shrink-0"
          >
            {/* Custom Ova Care Wellness Symbol */}
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#F8E5EA] to-[#EDE5F3] border border-[#D98CA3]/30 flex items-center justify-center text-[#653B68] shadow-xs group-hover:scale-105 group-hover:border-[#D98CA3] transition-all duration-300">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="w-5 h-5 transition-transform group-hover:rotate-6 duration-300">
                <path d="M12 2C8.5 6 6 9.5 6 13.5A6 6 0 0 0 18 13.5C18 9.5 15.5 6 12 2Z" fill="#D98CA3" fillOpacity="0.25" />
                <path d="M12 11V18" strokeLinecap="round" />
                <path d="M9.5 14.5C10.5 15 11.5 15.5 12 17" strokeLinecap="round" />
                <path d="M14.5 13C13.5 14 12.5 15 12 16.5" strokeLinecap="round" />
              </svg>
            </div>
            <span className="font-serif text-2xl font-medium tracking-tight text-[#29252D] whitespace-nowrap shrink-0">
              Ova<span className="text-[#D98CA3] font-normal">Care</span>
            </span>
          </button>

          {/* Zone 2: Desktop Navigation Links (Clean, readable layout with active indicators) */}
          <nav className="hidden xl:flex items-center gap-4 2xl:gap-6 text-xs font-medium text-[#77717B]">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNav(item.id)}
                  className={`hover:text-[#29252D] transition-colors whitespace-nowrap cursor-pointer py-1.5 px-2 relative rounded-lg ${
                    isActive ? 'text-[#653B68] font-bold bg-[#F8E5EA]/50' : 'hover:bg-[#F8E5EA]/20'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute -bottom-1 left-2 right-2 h-0.5 bg-[#D98CA3] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Large screens sub-nav or scroll indicator for medium-large laptops (1024px - 1280px) */}
          <nav className="hidden lg:flex xl:hidden items-center gap-3 text-xs font-medium text-[#77717B]">
            <button
              type="button"
              onClick={() => handleNav('dashboard')}
              className={`hover:text-[#29252D] py-1 px-2 rounded-lg cursor-pointer ${
                currentTab === 'dashboard' ? 'text-[#653B68] font-bold bg-[#F8E5EA]/60' : ''
              }`}
            >
              {t('nav.dashboard')}
            </button>
            <button
              type="button"
              onClick={() => handleNav('assistant')}
              className={`hover:text-[#29252D] py-1 px-2 rounded-lg cursor-pointer ${
                currentTab === 'assistant' ? 'text-[#653B68] font-bold bg-[#F8E5EA]/60' : ''
              }`}
            >
              {t('nav.assistant')}
            </button>
            <button
              type="button"
              onClick={() => handleNav('tracker')}
              className={`hover:text-[#29252D] py-1 px-2 rounded-lg cursor-pointer ${
                currentTab === 'tracker' ? 'text-[#653B68] font-bold bg-[#F8E5EA]/60' : ''
              }`}
            >
              {t('nav.tracker')}
            </button>
            <button
              type="button"
              onClick={() => handleNav('history')}
              className={`hover:text-[#29252D] py-1 px-2 rounded-lg cursor-pointer ${
                currentTab === 'history' ? 'text-[#653B68] font-bold bg-[#F8E5EA]/60' : ''
              }`}
            >
              {t('nav.history')}
            </button>
            <button
              type="button"
              onClick={() => handleNav('reports')}
              className={`hover:text-[#29252D] py-1 px-2 rounded-lg cursor-pointer ${
                currentTab === 'reports' ? 'text-[#653B68] font-bold bg-[#F8E5EA]/60' : ''
              }`}
            >
              {t('nav.reports')}
            </button>
          </nav>

          {/* Zone 3: Global Language Selector & Primary CTA Button */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            {/* Global Language Selector (accessible across all pages) */}
            <GlobalLanguageSelector />

            <button
              type="button"
              onClick={() => handleNav('assistant')}
              className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-[#653B68] to-[#4A264D] hover:from-[#4A264D] hover:to-[#38183B] rounded-full shadow-xs hover:shadow-md active:scale-[0.97] transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5"
            >
              <span>{t('nav.describeSymptoms')}</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>

          {/* Mobile menu trigger + mobile language selector */}
          <div className="flex lg:hidden items-center gap-2">
            <GlobalLanguageSelector />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              className="p-2 text-[#29252D] hover:bg-[#F8E5EA] active:scale-95 rounded-xl transition-all cursor-pointer border border-[#EDE5F3]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile & Tablet Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FFFDF9] border-b border-[#EDE5F3] px-5 py-4 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200 shadow-lg">
          <div className="pb-3 border-b border-[#EDE5F3] flex items-center justify-between">
            <span className="text-xs text-[#77717B] font-medium">{t('lang.selectLanguage')}:</span>
            <GlobalLanguageSelector />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
            {navItems.map((item) => {
              const IconComp = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNav(item.id)}
                  className={`w-full text-left py-2.5 px-3 rounded-xl text-xs font-medium transition-colors flex items-center gap-2.5 cursor-pointer ${
                    isActive
                      ? 'bg-[#F8E5EA] text-[#653B68] font-bold shadow-2xs'
                      : 'text-[#29252D] hover:bg-[#F8E5EA]/40'
                  }`}
                >
                  <IconComp className={`w-4 h-4 ${isActive ? 'text-[#653B68]' : 'text-[#77717B]'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[#EDE5F3] flex flex-col gap-2">
            <button
              type="button"
              onClick={() => handleNav('assistant')}
              className="w-full py-2.5 text-center text-xs font-semibold text-white bg-gradient-to-r from-[#653B68] to-[#4A264D] rounded-full shadow-xs active:scale-[0.98] transition-all cursor-pointer"
            >
              {t('nav.describeSymptoms')} →
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
