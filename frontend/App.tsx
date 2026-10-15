import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';
import { Activity, ArrowUp, Sparkles } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { FeatureCards } from './components/FeatureCards';
import { HowItWorks } from './components/HowItWorks';
import { EducationalPreview } from './components/EducationalPreview';
import { HealthDashboard } from './components/HealthDashboard';
import { SymptomAssistant } from './components/SymptomAssistant';
import { PeriodTracker } from './components/PeriodTracker';
import { CycleHistory } from './components/CycleHistory';
import { MyHealthReports } from './components/MyHealthReports';
import { ResultsScreen } from './components/ResultsScreen';
import { UrgentCareScreen } from './components/UrgentCareScreen';
import { DoctorSummaryScreen } from './components/DoctorSummaryScreen';
import { EducationalLibrary } from './components/EducationalLibrary';
import { AboutSection } from './components/AboutSection';
import { ChatInterface } from './components/ChatInterface';
import { SymptomAnalysisResult, EducationalArticle } from './types/health';
import { HealthDataProvider, useHealthData } from './context/HealthDataContext';

export type AppTab =
  | 'home'
  | 'dashboard'
  | 'assistant'
  | 'tracker'
  | 'history'
  | 'reports'
  | 'library'
  | 'about'
  | 'chat'
  | 'results'
  | 'urgent'
  | 'summary';

function AppContent() {
  const [currentTab, setCurrentTab] = useState<AppTab>('home');
  const [currentResult, setCurrentResult] = useState<SymptomAnalysisResult | null>(null);
  const [symptomDraftText, setSymptomDraftText] = useState<string>('');
  const [chatDraftPrompt, setChatDraftPrompt] = useState<string>('');
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [analysisHistoryCount, setAnalysisHistoryCount] = useState<number>(0);
  const [showScrollFloatingCta, setShowScrollFloatingCta] = useState<boolean>(false);
  const [isNearBottom, setIsNearBottom] = useState<boolean>(false);

  const { addReport } = useHealthData();

  // Scroll Progress indicator
  const { scrollYProgress, scrollY } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    return scrollY.on('change', (latest) => {
      // Emerges smoothly after scrolling past the hero area
      setShowScrollFloatingCta(latest > 280);

      // Check if user is near the footer to prevent covering footer links
      if (typeof window !== 'undefined') {
        const scrollBottom = window.innerHeight + window.scrollY;
        const totalHeight = document.documentElement.scrollHeight;
        setIsNearBottom(scrollBottom >= totalHeight - 140);
      }
    });
  }, [scrollY]);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateTo = (tab: string) => {
    setCurrentTab(tab as AppTab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartSymptoms = (initialText?: string) => {
    if (initialText) {
      setSymptomDraftText(initialText);
    }
    navigateTo('assistant');
  };

  const handleStartChat = (initialText?: string) => {
    if (initialText) {
      setChatDraftPrompt(initialText);
    }
    navigateTo('chat');
  };

  const handleAnalysisComplete = (result: SymptomAnalysisResult) => {
    setCurrentResult(result);
    setAnalysisHistoryCount((prev) => prev + 1);
    // Automatically save actual resulting report into private health reports session
    addReport(result);
    navigateTo('results');
  };

  const handleEditSymptoms = () => {
    if (currentResult) {
      setSymptomDraftText(currentResult.originalInput);
    }
    navigateTo('assistant');
  };

  const handleArticleSelect = (article: EducationalArticle | null) => {
    if (article) {
      setSelectedArticleId(article.id);
      navigateTo('library');
    } else {
      setSelectedArticleId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] flex flex-col text-[#29252D] font-sans selection:bg-[#F8E5EA] selection:text-[#653B68] relative">
      
      {/* Scroll Progress Bar at the top of the browser */}
      <motion.div
        className="no-print fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D98CA3] via-[#653B68] to-[#A9BCA8] origin-left z-50 pointer-events-none"
        style={{ scaleX }}
      />

      {/* Navigation Bar */}
      <Navbar currentTab={currentTab} onNavigate={navigateTo} />

      {/* Main Screen Content with Page Transitions */}
      <main className="flex-1">
        
        {/* TAB 1: HOME */}
        {currentTab === 'home' && (
          <div>
            <HeroSection
              onStartSymptoms={handleStartSymptoms}
              onExploreHealth={() => navigateTo('library')}
              onStartChat={handleStartChat}
            />
            <FeatureCards onNavigate={navigateTo} />
            <HowItWorks onStartSymptoms={handleStartSymptoms} />
            <EducationalPreview
              onSelectArticle={handleArticleSelect}
              onViewAll={() => navigateTo('library')}
            />
          </div>
        )}

        {/* TAB 2: HEALTH DASHBOARD */}
        {currentTab === 'dashboard' && (
          <HealthDashboard
            onStartSymptoms={handleStartSymptoms}
            onExploreLibrary={() => navigateTo('library')}
            onSelectArticle={handleArticleSelect}
            onNavigateToTracker={() => navigateTo('tracker')}
            onNavigateToHistory={() => navigateTo('history')}
            onNavigateToReports={() => navigateTo('reports')}
            recentAnalysisCount={analysisHistoryCount}
          />
        )}

        {/* TAB 3: SYMPTOM ASSISTANT */}
        {currentTab === 'assistant' && (
          <SymptomAssistant
            initialText={symptomDraftText}
            onAnalysisComplete={handleAnalysisComplete}
            onCancel={() => navigateTo('home')}
            onSwitchToChat={() => navigateTo('chat')}
          />
        )}

        {/* TAB 4: PERIOD TRACKER */}
        {currentTab === 'tracker' && (
          <PeriodTracker
            onNavigateToHistory={() => navigateTo('history')}
            onNavigateToDashboard={() => navigateTo('dashboard')}
          />
        )}

        {/* TAB 5: CYCLE HISTORY */}
        {currentTab === 'history' && (
          <CycleHistory
            onNavigateToTracker={() => navigateTo('tracker')}
            onNavigateToDashboard={() => navigateTo('dashboard')}
          />
        )}

        {/* TAB 6: MY HEALTH REPORTS */}
        {currentTab === 'reports' && (
          <MyHealthReports
            onStartSymptoms={() => handleStartSymptoms()}
            onNavigateToDashboard={() => navigateTo('dashboard')}
          />
        )}

        {/* TAB 7: EDUCATIONAL HEALTH LIBRARY */}
        {currentTab === 'library' && (
          <EducationalLibrary
            selectedArticleId={selectedArticleId}
            onSelectArticle={(art) => setSelectedArticleId(art ? art.id : null)}
            onStartSymptoms={handleStartSymptoms}
          />
        )}

        {/* TAB 8: ABOUT */}
        {currentTab === 'about' && (
          <AboutSection
            onStartSymptoms={handleStartSymptoms}
            onExploreLibrary={() => navigateTo('library')}
          />
        )}

        {/* CONVERSATIONAL AI CHAT INTERFACE */}
        {currentTab === 'chat' && (
          <ChatInterface
            initialPrompt={chatDraftPrompt}
            onNavigateToSummary={(text) => {
              setSymptomDraftText(text);
              navigateTo('assistant');
            }}
            onNavigateToLibrary={() => navigateTo('library')}
          />
        )}

        {/* RESULTS SCREEN */}
        {currentTab === 'results' && currentResult && (
          <ResultsScreen
            result={currentResult}
            onEditSymptoms={handleEditSymptoms}
            onPrepareDoctorSummary={() => navigateTo('summary')}
            onNavigateHome={() => navigateTo('home')}
            onViewUrgentScreen={() => navigateTo('urgent')}
          />
        )}

        {/* Fallback if user lands on results without an active result */}
        {currentTab === 'results' && !currentResult && (
          <div className="py-20 text-center max-w-md mx-auto px-4 space-y-4">
            <h2 className="font-serif text-2xl text-[#29252D]">No Symptom Results Yet</h2>
            <p className="text-xs text-[#77717B]">
              Please describe your symptoms first to see educational analysis and recommendations.
            </p>
            <button
              onClick={() => handleStartSymptoms()}
              className="px-6 py-2.5 text-xs font-semibold text-white bg-[#653B68] rounded-full cursor-pointer"
            >
              Go to Symptom Assistant
            </button>
          </div>
        )}

        {/* DEDICATED URGENT CARE SCREEN */}
        {currentTab === 'urgent' && (
          <UrgentCareScreen
            result={currentResult}
            onBack={() => {
              if (currentResult) {
                navigateTo('results');
              } else {
                navigateTo('home');
              }
            }}
          />
        )}

        {/* DOCTOR-VISIT SUMMARY */}
        {currentTab === 'summary' && currentResult && (
          <DoctorSummaryScreen
            result={currentResult}
            onBack={() => navigateTo('results')}
            onNewSymptom={() => {
              setSymptomDraftText('');
              navigateTo('assistant');
            }}
          />
        )}

        {/* Fallback if user lands on summary without result */}
        {currentTab === 'summary' && !currentResult && (
          <div className="py-20 text-center max-w-md mx-auto px-4 space-y-4">
            <h2 className="font-serif text-2xl text-[#29252D]">No Active Consultation Summary</h2>
            <p className="text-xs text-[#77717B]">
              Please analyze your symptoms first so we can generate tailored notes and questions for your doctor.
            </p>
            <button
              onClick={() => handleStartSymptoms()}
              className="px-6 py-2.5 text-xs font-semibold text-white bg-[#653B68] rounded-full cursor-pointer"
            >
              Start Symptom Check
            </button>
          </div>
        )}

      </main>

      {/* Floating Action Quick Access Dock with Smooth Spring Transition & Scroll-to-Top */}
      <AnimatePresence>
        {showScrollFloatingCta && currentTab !== 'assistant' && currentTab !== 'chat' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 24 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: isNearBottom ? -24 : 0,
            }}
            exit={{ opacity: 0, scale: 0.88, y: 24 }}
            transition={{
              type: 'spring',
              stiffness: 380,
              damping: 28,
              mass: 0.8,
            }}
            className="no-print fixed bottom-5 right-4 sm:bottom-6 sm:right-6 md:right-8 z-40 select-none will-change-transform"
          >
            <div className="flex items-center gap-1 sm:gap-1.5 p-1.5 rounded-full bg-gradient-to-r from-[#653B68]/95 via-[#542F57]/95 to-[#4A264D]/95 text-white text-xs font-semibold shadow-[0_10px_35px_-5px_rgba(101,59,104,0.4)] border border-white/20 backdrop-blur-md">
              <button
                type="button"
                onClick={() => handleStartChat()}
                title="Open AI Health Chat"
                aria-label="Open AI Health Chat"
                className="px-2.5 sm:px-3 py-1.5 rounded-full hover:bg-white/15 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#D98CA3] focus-visible:outline-none"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#D98CA3]" />
                <span className="hidden xs:inline">AI Chat</span>
              </button>

              <span className="w-px h-3.5 bg-white/20" aria-hidden="true" />

              <button
                type="button"
                onClick={() => handleStartSymptoms()}
                title="Open Symptom Triage"
                aria-label="Open Symptom Triage"
                className="px-2.5 sm:px-3 py-1.5 rounded-full hover:bg-white/15 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#D98CA3] focus-visible:outline-none"
              >
                <Activity className="w-3.5 h-3.5 text-[#D98CA3]" />
                <span className="hidden sm:inline">Symptom Triage</span>
                <span className="sm:hidden">Triage</span>
              </button>

              <span className="w-px h-3.5 bg-white/20" aria-hidden="true" />

              <button
                type="button"
                onClick={handleScrollToTop}
                title="Scroll back to top"
                aria-label="Scroll back to top"
                className="p-1.5 rounded-full hover:bg-white/15 active:scale-95 transition-all flex items-center justify-center cursor-pointer text-white/90 hover:text-white focus-visible:ring-2 focus-visible:ring-[#D98CA3] focus-visible:outline-none"
              >
                <ArrowUp className="w-3.5 h-3.5 text-[#EDE5F3]" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <Footer onNavigate={navigateTo} />

    </div>
  );
}

export default function App() {
  return (
    <HealthDataProvider>
      <AppContent />
    </HealthDataProvider>
  );
}
