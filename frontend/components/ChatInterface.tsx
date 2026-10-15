import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Sparkles,
  RotateCcw,
  RefreshCw,
  Copy,
  Check,
  AlertCircle,
  ShieldCheck,
  Languages,
  Mic,
  MicOff,
  ChevronDown,
  ArrowDown,
  Heart,
  BookOpen,
  FileText,
  CornerDownLeft,
  MessageSquare,
  Bot,
  User,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { sendChatMessage, ChatRequest, ChatResponse, ChatHistoryEntry } from '../services/chatApi';
import { useLanguage } from '../i18n/LanguageContext';
import { GlobalLanguageSelector } from './GlobalLanguageSelector';

interface MessageItem {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  urgencyLevel?: 'routine' | 'prompt' | 'urgent';
  suggestions?: string[];
  sources?: Array<{ title: string; organization: string; url?: string }>;
  isError?: boolean;
}

interface ChatInterfaceProps {
  initialPrompt?: string;
  onNavigateToSummary?: (text: string) => void;
  onNavigateToLibrary?: () => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  initialPrompt,
  onNavigateToSummary,
  onNavigateToLibrary,
}) => {
  const { language, setLanguage, t } = useLanguage();
  const [conversationId, setConversationId] = useState<string>(() => `conv-${Date.now()}`);
  const [inputText, setInputText] = useState<string>(initialPrompt || '');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lastFailedMessage, setLastFailedMessage] = useState<string | null>(null);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [speechNotice, setSpeechNotice] = useState<string | null>(null);
  const [isAtBottom, setIsAtBottom] = useState<boolean>(true);

  // Active session message list
  const [messages, setMessages] = useState<MessageItem[]>(() => [
    {
      id: 'welcome-msg',
      sender: 'assistant',
      text: t('chat.welcome'),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestions: [
        '🌸 Irregular periods & cramping',
        '🌿 Symptoms associated with PCOS',
        '⚡ Differentiating bad cramps from endometriosis',
        '📋 What questions should I ask my gynecologist?',
      ],
    },
  ]);

  // When global language changes and only welcome message exists, update welcome message
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 1 && prev[0].id === 'welcome-msg') {
        return [
          {
            ...prev[0],
            text: t('chat.welcome'),
          },
        ];
      }
      return prev;
    });
  }, [language]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatScrollContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Scroll to bottom smoothly
  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  useEffect(() => {
    scrollToBottom('smooth');
  }, [messages, isLoading]);

  // Monitor scroll position to show / hide scroll-to-bottom indicator
  const handleScroll = () => {
    if (!chatScrollContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = chatScrollContainerRef.current;
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
    setIsAtBottom(distanceFromBottom < 100);
  };

  // Auto-resize textarea as user types
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${Math.min(Math.max(scrollHeight, 52), 160)}px`;
    }
  }, [inputText]);

  // Pre-fill initial prompt if supplied
  useEffect(() => {
    if (initialPrompt && initialPrompt.trim() !== '') {
      setInputText(initialPrompt);
    }
  }, [initialPrompt]);

  // Send message handler with duplicate protection and validation
  const handleSendMessage = async (textToSend?: string) => {
    const rawContent = textToSend !== undefined ? textToSend : inputText;
    const trimmed = rawContent.trim();

    if (!trimmed || isLoading) return;

    // Reset input immediately
    setInputText('');
    setLastFailedMessage(null);
    if (textareaRef.current) {
      textareaRef.current.style.height = '52px';
    }

    const userMessage: MessageItem = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsLoading(true);

    // Build history for backend request
    const historyPayload: ChatHistoryEntry[] = newMessages
      .slice(-6)
      .map((m) => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.text,
      }));

    const requestPayload: ChatRequest = {
      message: trimmed,
      conversationId,
      language,
      history: historyPayload,
      metadata: {
        platform: 'web',
        clientTimestamp: new Date().toISOString(),
      },
    };

    try {
      const response: ChatResponse = await sendChatMessage(requestPayload);

      const aiMessage: MessageItem = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: response.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        urgencyLevel: response.urgencyLevel,
        suggestions: response.suggestions,
        sources: response.sources,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err: any) {
      setLastFailedMessage(trimmed);
      const errorMessage: MessageItem = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text: "I couldn't connect with the health service just now. Please check your connection or tap **Retry** below.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Keyboard shortcut: Enter to submit, Shift+Enter for newline
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Retry sending failed message
  const handleRetry = () => {
    if (lastFailedMessage) {
      handleSendMessage(lastFailedMessage);
    }
  };

  // Start fresh conversation
  const handleNewChat = () => {
    const newConvId = `conv-${Date.now()}`;
    setConversationId(newConvId);
    setInputText('');
    setLastFailedMessage(null);
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'assistant',
        text: `Starting a fresh session. 🌸\n\nWhat would you like to discuss today? You can describe any symptoms, changes in your menstrual rhythm, or questions you have before seeing your doctor.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: [
          '🌸 Irregular cycles and fatigue',
          '⚡ Cramps that radiate to lower back',
          '🌿 When should I get tested for PCOS?',
          '💧 Heavy menstrual flow with blood clots',
        ],
      },
    ]);
  };

  // Copy message text
  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMessageId(id);
    setTimeout(() => setCopiedMessageId(null), 2000);
  };

  // Speech to text toggle
  // Speech to text toggle for Kannada, Hindi, and English
  const handleSpeechToggle = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    const sampleVoices: Record<string, string> = {
      kn: 'ನನ್ನ ಮುಟ್ಟು ಕಳೆದ ೨ ತಿಂಗಳುಗಳಿಂದ ಸರಿ ಇಲ್ಲ ಮತ್ತು ಹೊಟ್ಟೆಯ ಕೆಳಭಾಗದಲ್ಲಿ ನೋವು ಬರುತ್ತಿದೆ.',
      hi: 'मेरे पीरियड्स पिछले दो महीने से अनियमित हैं और पेट के निचले हिस्से में कभी-कभी दर्द होता है।',
      en: 'My periods have been irregular for two months, and sometimes I experience lower abdominal pain.',
    };

    if (isListening) {
      setIsListening(false);
      return;
    }

    if (!SpeechRecognition) {
      const fallbackText = sampleVoices[language] || sampleVoices.en;
      setInputText((prev) => (prev ? `${prev} ${fallbackText}` : fallbackText));
      setSpeechNotice(
        language === 'kn'
          ? 'ಧ್ವನಿ ಮಾದರಿಯನ್ನು ಸೇರಿಸಲಾಗಿದೆ (ಬ್ರೌಸರ್ ಮೈಕ್ರೊಫೋನ್ ಬೆಂಬಲಿಸುವುದಿಲ್ಲ).'
          : language === 'hi'
          ? 'वॉइस सैंपल जोड़ा गया (ब्राउज़र में सीधे माइक्रोफ़ोन असमर्थित)।'
          : 'Added voice text sample (browser does not support live speech recognition).'
      );
      setTimeout(() => setSpeechNotice(null), 4500);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;

      if (language === 'hi') {
        recognition.lang = 'hi-IN'; // Hindi (India)
      } else if (language === 'kn') {
        recognition.lang = 'kn-IN'; // Kannada (India)
      } else {
        recognition.lang = 'en-IN'; // English (India)
      }

      const listeningLabels: Record<string, string> = {
        kn: 'ಕನ್ನಡದಲ್ಲಿ ಆಲಿಸಲಾಗುತ್ತಿದೆ... ನಿಮ್ಮ ಲಕ್ಷಣಗಳನ್ನು ಸ್ಪಷ್ಟವಾಗಿ ಮಾತನಾಡಿ.',
        hi: 'हिन्दी में सुन रहे हैं... कृपया अपने लक्षण स्पष्ट बोलें।',
        en: 'Listening in English... Speak your symptoms clearly.',
      };

      recognition.onstart = () => {
        setIsListening(true);
        setSpeechNotice(listeningLabels[language] || listeningLabels.en);
      };

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = 0; i < event.results.length; ++i) {
          transcript += event.results[i][0].transcript;
        }
        if (transcript.trim()) {
          setInputText((prev) => (prev ? `${prev} ${transcript.trim()}` : transcript.trim()));
        }
        if (event.results[0].isFinal) {
          setIsListening(false);
          setSpeechNotice(null);
        }
      };

      recognition.onerror = (e: any) => {
        console.warn('SpeechRecognition error in chat:', e?.error);
        setIsListening(false);
        const fallbackText = sampleVoices[language] || sampleVoices.en;
        setInputText((prev) => (prev ? `${prev} ${fallbackText}` : fallbackText));
        setSpeechNotice(
          language === 'kn'
            ? 'ಮೈಕ್ರೊಫೋನ್ ಸಿಗಲಿಲ್ಲ; ಕನ್ನಡ ಧ್ವನಿ ಮಾದರಿಯನ್ನು ಸೇರಿಸಲಾಗಿದೆ.'
            : language === 'hi'
            ? 'माइक्रोफ़ोन नहीं मिला; हिन्दी वॉइस सैंपल जोड़ा गया।'
            : 'Microphone was not detected; loaded English speech sample.'
        );
        setTimeout(() => setSpeechNotice(null), 4500);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch {
      setIsListening(false);
      const fallbackText = sampleVoices[language] || sampleVoices.en;
      setInputText((prev) => (prev ? `${prev} ${fallbackText}` : fallbackText));
    }
  };

  // Simple Markdown renderer for bolding, bullet points, and code formatting
  const renderFormattedText = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, idx) => {
      // Empty line spacer
      if (!line.trim()) {
        return <div key={idx} className="h-2" />;
      }

      // Bullet line
      if (line.startsWith('• ') || line.startsWith('- ')) {
        const text = line.replace(/^[•-]\s*/, '');
        return (
          <div key={idx} className="flex items-start gap-2 my-1 pl-1">
            <span className="text-[#D98CA3] mt-1 shrink-0">•</span>
            <span>{renderInlineFormatting(text)}</span>
          </div>
        );
      }

      // Numbered line
      if (/^\d+\.\s/.test(line)) {
        const num = line.match(/^\d+/)?.[0];
        const text = line.replace(/^\d+\.\s*/, '');
        return (
          <div key={idx} className="flex items-start gap-2 my-1 pl-1">
            <span className="font-semibold text-[#653B68] shrink-0">{num}.</span>
            <span>{renderInlineFormatting(text)}</span>
          </div>
        );
      }

      return (
        <p key={idx} className="my-1 leading-relaxed">
          {renderInlineFormatting(line)}
        </p>
      );
    });
  };

  const renderInlineFormatting = (text: string) => {
    // Basic regex parser for **bold** and *italics*
    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={index} className="font-semibold text-[#29252D]">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        return (
          <em key={index} className="italic text-[#77717B]">
            {part.slice(1, -1)}
          </em>
        );
      }
      return part;
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 md:py-10">
      
      {/* Top Header Card */}
      <div className="bg-white rounded-3xl border border-[#EDE5F3] p-5 sm:p-6 shadow-xs mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#F8E5EA] to-[#EDE5F3] border border-[#D98CA3]/30 flex items-center justify-center text-[#653B68] shadow-xs shrink-0">
              <Bot className="w-6 h-6 text-[#653B68]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-2xl font-normal text-[#29252D]">
                  {t('chat.title')}
                </h1>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#653B68] bg-[#EDE5F3] px-2.5 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {t('nav.activeSession')}
                </span>
              </div>
              <p className="text-xs text-[#77717B] mt-0.5">
                {t('chat.subtitle')}
              </p>
            </div>
          </div>

          {/* Controls: Global Language Selector + New Chat Button */}
          <div className="flex items-center gap-2.5">
            
            {/* Global Language Selector */}
            <GlobalLanguageSelector />

            {/* New Chat Button */}
            <button
              onClick={handleNewChat}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-[#653B68] bg-[#F8E5EA]/70 hover:bg-[#F8E5EA] active:scale-95 transition-all duration-150 cursor-pointer border border-[#D98CA3]/30"
              title="Start a new conversation thread"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t('chat.newChat')}</span>
            </button>

          </div>

        </div>

        {/* Privacy Notice Banner */}
        <div className="mt-4 pt-3.5 border-t border-[#EDE5F3] flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#77717B]">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t('dashboard.privacyNotice')}</span>
          </div>
          <span className="italic">{t('hero.trustDisclaimer')}</span>
        </div>
      </div>

      {/* Main Chat Messages Container */}
      <div className="bg-white rounded-3xl border border-[#EDE5F3] shadow-xs flex flex-col h-[560px] md:h-[620px] overflow-hidden relative">
        
        {/* Messages Scroll Area */}
        <div
          ref={chatScrollContainerRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 scroll-smooth"
        >
          {messages.map((message) => {
            const isUser = message.sender === 'user';

            return (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {/* Assistant Avatar */}
                {!isUser && (
                  <div className="w-8 h-8 rounded-full bg-[#F8E5EA] border border-[#D98CA3]/30 flex items-center justify-center text-[#653B68] shrink-0 shadow-2xs mt-1">
                    <Heart className="w-4 h-4 text-[#653B68]" />
                  </div>
                )}

                {/* Bubble Container */}
                <div className={`max-w-[85%] sm:max-w-[78%] flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                  
                  {/* Sender Header */}
                  <div className="flex items-center gap-2 mb-1 px-1 text-[11px] text-[#77717B]">
                    <span className="font-medium text-[#29252D]">
                      {isUser ? 'You' : 'Ova Care AI'}
                    </span>
                    <span>•</span>
                    <span>{message.timestamp}</span>
                  </div>

                  {/* Message Card */}
                  <div
                    className={`rounded-3xl p-4 sm:p-5 text-sm shadow-xs ${
                      isUser
                        ? 'bg-gradient-to-r from-[#653B68] to-[#4A264D] text-white rounded-tr-none'
                        : message.isError
                        ? 'bg-rose-50 border border-rose-200 text-rose-900 rounded-tl-none'
                        : 'bg-[#FFFDF9] border border-[#EDE5F3] text-[#29252D] rounded-tl-none'
                    }`}
                  >
                    {/* Urgency Badge if flagged */}
                    {message.urgencyLevel && message.urgencyLevel !== 'routine' && (
                      <div className="mb-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-700" />
                        <span>Medical Review Recommended ({message.urgencyLevel})</span>
                      </div>
                    )}

                    {/* Formatted Text */}
                    <div className="text-[13.5px] leading-relaxed">
                      {isUser ? (
                        <p className="whitespace-pre-wrap">{message.text}</p>
                      ) : (
                        renderFormattedText(message.text)
                      )}
                    </div>

                    {/* Sources if present */}
                    {message.sources && message.sources.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-[#EDE5F3] text-xs text-[#77717B]">
                        <span className="font-semibold text-[#653B68] block mb-1">
                          Verified References:
                        </span>
                        <ul className="space-y-0.5">
                          {message.sources.map((src, i) => (
                            <li key={i} className="flex items-center gap-1.5 text-[11px]">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#A9BCA8]" />
                              <span>{src.title} — {src.organization}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Message Action Bar for AI */}
                    {!isUser && !message.isError && (
                      <div className="mt-3 pt-2.5 border-t border-[#EDE5F3] flex flex-wrap items-center justify-between gap-2 text-xs text-[#77717B]">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleCopyText(message.text, message.id)}
                            className="inline-flex items-center gap-1 hover:text-[#653B68] active:scale-95 transition-all cursor-pointer px-2 py-0.5 rounded-md hover:bg-[#F8E5EA]/60"
                            title="Copy reply text"
                          >
                            {copiedMessageId === message.id ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                                <span className="text-emerald-700 text-[11px] font-medium">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5 text-[#D98CA3]" />
                                <span className="text-[11px]">Copy</span>
                              </>
                            )}
                          </button>

                          {onNavigateToSummary && (
                            <button
                              onClick={() => onNavigateToSummary(message.text)}
                              className="inline-flex items-center gap-1 hover:text-[#653B68] active:scale-95 transition-all cursor-pointer px-2 py-0.5 rounded-md hover:bg-[#F8E5EA]/60 text-[11px]"
                              title="Export to doctor consultation sheet"
                            >
                              <FileText className="w-3.5 h-3.5 text-[#D98CA3]" />
                              <span>To Doctor Sheet</span>
                            </button>
                          )}

                          {onNavigateToLibrary && (
                            <button
                              onClick={onNavigateToLibrary}
                              className="inline-flex items-center gap-1 hover:text-[#653B68] active:scale-95 transition-all cursor-pointer px-2 py-0.5 rounded-md hover:bg-[#F8E5EA]/60 text-[11px]"
                              title="Search library guides"
                            >
                              <BookOpen className="w-3.5 h-3.5 text-[#D98CA3]" />
                              <span>Browse Guide</span>
                            </button>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Retry button on error */}
                    {message.isError && (
                      <div className="mt-3 pt-2 border-t border-rose-200">
                        <button
                          onClick={handleRetry}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-600 text-white rounded-xl text-xs font-semibold hover:bg-rose-700 active:scale-95 transition-all cursor-pointer shadow-xs"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          <span>Retry Message</span>
                        </button>
                      </div>
                    )}

                  </div>

                  {/* Suggestion Chips */}
                  {message.suggestions && message.suggestions.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {message.suggestions.map((suggestion, sIdx) => (
                        <button
                          key={sIdx}
                          onClick={() => handleSendMessage(suggestion)}
                          className="text-xs text-[#653B68] bg-[#F8E5EA]/70 hover:bg-[#F8E5EA] border border-[#D98CA3]/30 px-3 py-1 rounded-full text-left transition-all hover:scale-[1.02] active:scale-95 cursor-pointer shadow-2xs"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}

                </div>

                {/* User Avatar */}
                {isUser && (
                  <div className="w-8 h-8 rounded-full bg-[#653B68] flex items-center justify-center text-white shrink-0 shadow-2xs mt-1">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </motion.div>
            );
          })}

          {/* Loading Indicator */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-[#F8E5EA] border border-[#D98CA3]/30 flex items-center justify-center text-[#653B68] shrink-0 mt-1">
                <Heart className="w-4 h-4 animate-pulse text-[#D98CA3]" />
              </div>
              <div className="bg-[#FFFDF9] border border-[#EDE5F3] rounded-3xl rounded-tl-none p-4 shadow-xs max-w-sm">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-medium text-[#653B68]">Ova Care Assistant</span>
                  <span className="text-[10px] text-[#77717B]">Reviewing health data...</span>
                </div>
                <div className="flex items-center gap-1.5 py-1">
                  <span className="w-2 h-2 rounded-full bg-[#D98CA3] animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-2 h-2 rounded-full bg-[#653B68] animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-2 h-2 rounded-full bg-[#A9BCA8] animate-bounce" />
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Scroll-to-bottom Floating Button */}
        {!isAtBottom && (
          <button
            onClick={() => scrollToBottom('smooth')}
            className="absolute bottom-24 right-6 p-2 rounded-full bg-[#653B68] text-white shadow-lg hover:bg-[#4A264D] transition-all cursor-pointer z-20 flex items-center gap-1 text-xs px-3"
            aria-label="Scroll to newest messages"
          >
            <ArrowDown className="w-3.5 h-3.5" />
            <span>Latest</span>
          </button>
        )}

        {/* Speech Notice Toast */}
        {speechNotice && (
          <div className="bg-[#F8E5EA] border-t border-[#EDE5F3] px-4 py-2 text-xs text-[#653B68] flex items-center justify-between">
            <span>{speechNotice}</span>
            <button
              onClick={() => setSpeechNotice(null)}
              className="text-[#77717B] hover:text-[#29252D] font-bold"
            >
              ×
            </button>
          </div>
        )}

        {/* Large Message Input Area */}
        <div className="p-3 sm:p-4 bg-[#FFFDF9] border-t border-[#EDE5F3]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex flex-col sm:flex-row items-stretch sm:items-end gap-2.5"
          >
            {/* Input Box Wrapper */}
            <div className="flex-1 relative bg-white border border-[#EDE5F3] focus-within:border-[#D98CA3] focus-within:ring-2 focus-within:ring-[#D98CA3]/20 rounded-2xl p-2.5 transition-all shadow-xs flex items-end gap-2">
              
              {/* Expandable Textarea */}
              <textarea
                ref={textareaRef}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={
                  language === 'hi'
                    ? 'अपने लक्षण यहाँ लिखें (Enter दबाएं भेजने के लिए)...'
                    : language === 'kn'
                    ? 'ನಿಮ್ಮ ರೋಗಲಕ್ಷಣಗಳನ್ನು ಇಲ್ಲಿ ಬರೆಯಿರಿ...'
                    : 'Describe your symptoms in your own words (Enter to send, Shift+Enter for newline)...'
                }
                rows={1}
                disabled={isLoading}
                className="flex-1 max-h-40 min-h-[52px] bg-transparent text-sm text-[#29252D] placeholder-[#77717B] resize-none outline-none leading-relaxed px-1 py-1"
              />

              {/* Microphone Voice Button */}
              <button
                type="button"
                onClick={handleSpeechToggle}
                className={`p-2 rounded-xl transition-all cursor-pointer shrink-0 ${
                  isListening
                    ? 'bg-rose-500 text-white animate-pulse'
                    : 'text-[#77717B] hover:text-[#653B68] hover:bg-[#F8E5EA]'
                }`}
                title={isListening ? 'Stop listening' : 'Speak symptoms'}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>
            </div>

            {/* Send Button */}
            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className={`h-[52px] px-6 rounded-2xl flex items-center justify-center gap-2 text-sm font-semibold transition-all duration-200 cursor-pointer shrink-0 shadow-sm ${
                !inputText.trim() || isLoading
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#653B68] to-[#4A264D] hover:from-[#4A264D] hover:to-[#38183B] text-white active:scale-95 shadow-md hover:shadow-lg'
              }`}
            >
              {isLoading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <span>Send</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Keyboard tip */}
          <div className="mt-2 flex items-center justify-between text-[11px] text-[#77717B] px-1">
            <span>Press <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-[10px] text-gray-700 border">Enter</kbd> to send, <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-[10px] text-gray-700 border">Shift + Enter</kbd> for new line</span>
            <span className="hidden sm:inline">Backend: Configurable via <code>VITE_API_BASE_URL</code></span>
          </div>
        </div>

      </div>

    </div>
  );
};
