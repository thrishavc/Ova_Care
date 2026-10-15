import React, { useState, useMemo } from 'react';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Edit2,
  Trash2,
  AlertCircle,
  Clock,
  Sparkles,
  Shield,
  Info,
  Check,
  X,
  Droplet,
  ArrowRight,
} from 'lucide-react';
import { useHealthData } from '../context/HealthDataContext';
import { useLanguage } from '../i18n/LanguageContext';
import { PeriodEntry } from '../types/health';

interface PeriodTrackerProps {
  onNavigateToHistory: () => void;
  onNavigateToDashboard: () => void;
}

export const PeriodTracker: React.FC<PeriodTrackerProps> = ({
  onNavigateToHistory,
  onNavigateToDashboard,
}) => {
  const { t, language } = useLanguage();
  const { periods, stats, addPeriod, updatePeriod, deletePeriod, storageMode } = useHealthData();

  // Calendar view date state (year and month, 0-indexed month)
  const today = useMemo(() => new Date(), []);
  const [currentYear, setCurrentYear] = useState<number>(() => today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState<number>(() => today.getMonth());

  // Form modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<PeriodEntry | null>(null);
  const [formData, setFormData] = useState({
    startDate: today.toISOString().split('T')[0],
    endDate: today.toISOString().split('T')[0],
    flowIntensity: 'medium' as 'light' | 'medium' | 'heavy',
    notes: '',
  });
  const [formError, setFormError] = useState<string | null>(null);

  // Delete confirmation state
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Month navigation helpers
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const handleGoToToday = () => {
    setCurrentYear(today.getFullYear());
    setCurrentMonth(today.getMonth());
  };

  // Build calendar matrix for currentMonth
  const calendarDays = useMemo(() => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
    const startDayOfWeek = firstDayOfMonth.getDay(); // 0 is Sunday
    const daysInMonth = lastDayOfMonth.getDate();

    const days: Array<{
      dateStr: string;
      dayNumber: number;
      isCurrentMonth: boolean;
      isToday: boolean;
      isRecordedPeriod: boolean;
      isPeriodStart: boolean;
      isPeriodEnd: boolean;
      isEstimatedPeriod: boolean;
      periodEntry?: PeriodEntry;
    }> = [];

    // Previous month padding
    const prevMonthLastDay = new Date(currentYear, currentMonth, 0).getDate();
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      const dayNum = prevMonthLastDay - i;
      const prevDate = new Date(currentYear, currentMonth - 1, dayNum);
      const dateStr = prevDate.toISOString().split('T')[0];
      days.push({
        dateStr,
        dayNumber: dayNum,
        isCurrentMonth: false,
        isToday: false,
        isRecordedPeriod: false,
        isPeriodStart: false,
        isPeriodEnd: false,
        isEstimatedPeriod: false,
      });
    }

    // Current month days
    for (let dayNum = 1; dayNum <= daysInMonth; dayNum++) {
      const thisDate = new Date(currentYear, currentMonth, dayNum);
      const dateStr = thisDate.toISOString().split('T')[0];
      const isToday =
        thisDate.getFullYear() === today.getFullYear() &&
        thisDate.getMonth() === today.getMonth() &&
        thisDate.getDate() === today.getDate();

      // Check if inside recorded period
      let isRecordedPeriod = false;
      let isPeriodStart = false;
      let isPeriodEnd = false;
      let matchedEntry: PeriodEntry | undefined = undefined;

      for (const p of periods) {
        if (dateStr >= p.startDate && dateStr <= p.endDate) {
          isRecordedPeriod = true;
          matchedEntry = p;
          if (dateStr === p.startDate) isPeriodStart = true;
          if (dateStr === p.endDate) isPeriodEnd = true;
          break;
        }
      }

      // Check if inside estimated next period
      let isEstimatedPeriod = false;
      if (
        stats.hasSufficientHistory &&
        stats.estimatedNextPeriodStart &&
        stats.estimatedNextPeriodEnd
      ) {
        if (
          dateStr >= stats.estimatedNextPeriodStart &&
          dateStr <= stats.estimatedNextPeriodEnd &&
          !isRecordedPeriod
        ) {
          isEstimatedPeriod = true;
        }
      }

      days.push({
        dateStr,
        dayNumber: dayNum,
        isCurrentMonth: true,
        isToday,
        isRecordedPeriod,
        isPeriodStart,
        isPeriodEnd,
        isEstimatedPeriod,
        periodEntry: matchedEntry,
      });
    }

    // Next month padding to fill complete weeks (multiple of 7)
    const remaining = 7 - (days.length % 7);
    if (remaining < 7) {
      for (let dayNum = 1; dayNum <= remaining; dayNum++) {
        const nextDate = new Date(currentYear, currentMonth + 1, dayNum);
        const dateStr = nextDate.toISOString().split('T')[0];
        days.push({
          dateStr,
          dayNumber: dayNum,
          isCurrentMonth: false,
          isToday: false,
          isRecordedPeriod: false,
          isPeriodStart: false,
          isPeriodEnd: false,
          isEstimatedPeriod: false,
        });
      }
    }

    return days;
  }, [currentYear, currentMonth, periods, stats, today]);

  // Form open handlers
  const handleOpenNewPeriodModal = (preselectedDate?: string) => {
    const defaultDate = preselectedDate || today.toISOString().split('T')[0];
    setEditingEntry(null);
    setFormData({
      startDate: defaultDate,
      endDate: defaultDate,
      flowIntensity: 'medium',
      notes: '',
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleEditEntry = (entry: PeriodEntry) => {
    setEditingEntry(entry);
    setFormData({
      startDate: entry.startDate,
      endDate: entry.endDate,
      flowIntensity: entry.flowIntensity || 'medium',
      notes: entry.notes || '',
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleQuickLogPeriodToday = () => {
    const todayStr = today.toISOString().split('T')[0];
    handleOpenNewPeriodModal(todayStr);
  };

  const handleSavePeriod = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!formData.startDate) {
      setFormError('Please select a period start date.');
      return;
    }
    if (!formData.endDate) {
      setFormError('Please select a period end date.');
      return;
    }
    if (formData.endDate < formData.startDate) {
      setFormError('End date cannot precede the start date.');
      return;
    }

    // Check for overlap with existing entries other than editingEntry
    const hasOverlap = periods.some((p) => {
      if (editingEntry && p.id === editingEntry.id) return false;
      return (
        (formData.startDate >= p.startDate && formData.startDate <= p.endDate) ||
        (formData.endDate >= p.startDate && formData.endDate <= p.endDate) ||
        (formData.startDate <= p.startDate && formData.endDate >= p.endDate)
      );
    });

    if (hasOverlap) {
      setFormError('The selected dates overlap with an existing period record.');
      return;
    }

    if (editingEntry) {
      updatePeriod(editingEntry.id, {
        startDate: formData.startDate,
        endDate: formData.endDate,
        flowIntensity: formData.flowIntensity,
        notes: formData.notes.trim(),
      });
    } else {
      addPeriod({
        startDate: formData.startDate,
        endDate: formData.endDate,
        flowIntensity: formData.flowIntensity,
        notes: formData.notes.trim(),
      });
    }

    setIsModalOpen(false);
  };

  const handleDeleteConfirmed = () => {
    if (deletingId) {
      deletePeriod(deletingId);
      setDeletingId(null);
    }
  };

  // Localized month name
  const monthName = useMemo(() => {
    const date = new Date(currentYear, currentMonth, 1);
    const locale = language === 'kn' ? 'kn-IN' : language === 'hi' ? 'hi-IN' : 'en-US';
    return date.toLocaleDateString(locale, { month: 'long', year: 'numeric' });
  }, [currentYear, currentMonth, language]);

  // Weekday header names
  const weekDays = useMemo(() => {
    if (language === 'kn') {
      return ['ಭಾನು', 'ಸೋಮ', 'ಮಂಗಳ', 'ಬುಧ', 'ಗುರು', 'ಶುಕ್ರ', 'ಶನಿ'];
    }
    if (language === 'hi') {
      return ['रवि', 'सोम', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि'];
    }
    return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  }, [language]);

  return (
    <div className="py-10 bg-[#FFFDF9] min-h-[calc(100vh-140px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#EDE5F3]">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D98CA3]">
              <CalendarIcon className="w-3.5 h-3.5" />
              <span>{t('tracker.badge')}</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#29252D] font-normal mt-1">
              {t('tracker.title')}
            </h1>
            <p className="text-xs text-[#77717B] mt-1 max-w-xl leading-relaxed">
              {t('tracker.subtitle')}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={handleQuickLogPeriodToday}
              className="px-4.5 py-2.5 rounded-full bg-gradient-to-r from-[#653B68] to-[#4A264D] hover:from-[#4A264D] hover:to-[#38183B] text-white text-xs font-semibold shadow-xs hover:shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>{t('tracker.recordPeriodBtn')}</span>
            </button>
            <button
              type="button"
              onClick={onNavigateToHistory}
              className="px-4 py-2.5 rounded-full bg-white border border-[#EDE5F3] hover:border-[#D98CA3] text-[#29252D] text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <span>{t('tracker.viewCycleHistoryBtn')}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#653B68]" />
            </button>
          </div>
        </div>

        {/* 4 Summary Metric Cards based STRICTLY on actual recorded data */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Last Period Start & End */}
          <div className="p-5 rounded-2xl bg-white border border-[#EDE5F3] shadow-xs space-y-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#77717B] block">
              {t('tracker.cardLastPeriod')}
            </span>
            {stats.lastPeriodStart ? (
              <div>
                <p className="font-serif text-xl font-medium text-[#29252D]">
                  {stats.lastPeriodStart}
                </p>
                <p className="text-xs text-[#77717B] mt-0.5">
                  {t('tracker.endedOn')}: <span className="font-medium text-[#29252D]">{stats.lastPeriodEnd}</span>
                </p>
              </div>
            ) : (
              <div>
                <p className="font-serif text-base text-[#77717B] italic">
                  {t('tracker.noRecordsYet')}
                </p>
                <p className="text-[11px] text-[#77717B]/80 mt-1">
                  {t('tracker.clickToRecordFirst')}
                </p>
              </div>
            )}
          </div>

          {/* Card 2: Period Duration */}
          <div className="p-5 rounded-2xl bg-white border border-[#EDE5F3] shadow-xs space-y-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#77717B] block">
              {t('tracker.cardPeriodDuration')}
            </span>
            {stats.lastPeriodDuration ? (
              <div>
                <p className="font-serif text-2xl font-medium text-[#653B68]">
                  {stats.lastPeriodDuration}{' '}
                  <span className="text-xs font-sans text-[#77717B]">{t('tracker.daysUnit')}</span>
                </p>
                {stats.averagePeriodDuration && (
                  <p className="text-[11px] text-[#77717B] mt-0.5">
                    {t('tracker.avgDuration')}: {stats.averagePeriodDuration} {t('tracker.daysUnit')}
                  </p>
                )}
              </div>
            ) : (
              <p className="font-serif text-base text-[#77717B] italic">
                {t('tracker.notAvailableYet')}
              </p>
            )}
          </div>

          {/* Card 3: Estimated Cycle Length */}
          <div className="p-5 rounded-2xl bg-white border border-[#EDE5F3] shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#77717B] block">
                {t('tracker.cardCycleLength')}
              </span>
              {stats.hasSufficientHistory && (
                <span className="text-[10px] font-bold text-[#653B68] bg-[#EDE5F3] px-2 py-0.5 rounded-full uppercase">
                  {t('tracker.estimateBadge')}
                </span>
              )}
            </div>
            {stats.hasSufficientHistory && stats.averageCycleLength ? (
              <div>
                <p className="font-serif text-2xl font-medium text-[#29252D]">
                  ~{stats.averageCycleLength}{' '}
                  <span className="text-xs font-sans text-[#77717B]">{t('tracker.daysUnit')}</span>
                </p>
                <p className="text-[11px] text-[#77717B] mt-0.5">
                  {t('tracker.basedOnRecordedStarts')}
                </p>
              </div>
            ) : (
              <div>
                <p className="font-serif text-sm text-[#77717B] italic">
                  {t('tracker.requiresTwoStarts')}
                </p>
                <p className="text-[10px] text-[#77717B]/80 mt-1 leading-tight">
                  {t('tracker.cycleLengthExplanation')}
                </p>
              </div>
            )}
          </div>

          {/* Card 4: Estimated Next Period */}
          <div className="p-5 rounded-2xl bg-white border border-[#EDE5F3] shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#77717B] block">
                {t('tracker.cardNextPeriod')}
              </span>
              {stats.hasSufficientHistory && (
                <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full uppercase">
                  {t('tracker.estimateBadge')}
                </span>
              )}
            </div>
            {stats.hasSufficientHistory && stats.estimatedNextPeriodStart ? (
              <div>
                <p className="font-serif text-lg font-medium text-[#29252D]">
                  {stats.estimatedNextPeriodStart}
                </p>
                <p className="text-[11px] text-[#77717B] mt-0.5">
                  ~ {stats.estimatedNextPeriodEnd} ({t('tracker.expectedWindow')})
                </p>
              </div>
            ) : (
              <div>
                <p className="font-serif text-sm text-[#77717B] italic">
                  {t('tracker.noPredictionYet')}
                </p>
                <p className="text-[10px] text-[#77717B]/80 mt-1 leading-tight">
                  {t('tracker.cyclesVaryNotice')}
                </p>
              </div>
            )}
          </div>

        </div>

        {/* Calendar Section */}
        <div className="bg-white rounded-3xl border border-[#EDE5F3] shadow-xs p-6 sm:p-8 space-y-6">
          
          {/* Calendar Header with Navigation Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EDE5F3]">
            <div className="flex items-center gap-3">
              <span className="font-serif text-2xl text-[#29252D] font-normal capitalize">
                {monthName}
              </span>
              <button
                type="button"
                onClick={handleGoToToday}
                className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-[#EDE5F3]/70 hover:bg-[#EDE5F3] text-[#653B68] transition-colors cursor-pointer"
              >
                {t('tracker.todayBtn')}
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrevMonth}
                aria-label="Previous Month"
                className="p-2 rounded-xl border border-[#EDE5F3] hover:border-[#D98CA3] text-[#29252D] transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNextMonth}
                aria-label="Next Month"
                className="p-2 rounded-xl border border-[#EDE5F3] hover:border-[#D98CA3] text-[#29252D] transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Visual Legend */}
          <div className="flex flex-wrap items-center gap-5 text-xs text-[#77717B] pb-2">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-[#653B68]" />
              <span className="font-medium text-[#29252D]">{t('tracker.legendRecordedPeriod')}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full border-2 border-dashed border-[#D98CA3] bg-[#F8E5EA]" />
              <span>{t('tracker.legendEstimatedNext')}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full ring-2 ring-[#653B68] bg-white" />
              <span>{t('tracker.legendToday')}</span>
            </div>
          </div>

          {/* Day of Week Headers */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center text-xs font-semibold text-[#77717B] uppercase tracking-wider">
            {weekDays.map((d, i) => (
              <div key={i} className="py-1">
                {d}
              </div>
            ))}
          </div>

          {/* 7-column Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2">
            {calendarDays.map((cell, idx) => {
              const isCellRecorded = cell.isRecordedPeriod;
              const isCellEstimated = cell.isEstimatedPeriod;

              return (
                <div
                  key={idx}
                  onClick={() => {
                    if (cell.periodEntry) {
                      handleEditEntry(cell.periodEntry);
                    } else if (cell.isCurrentMonth) {
                      handleOpenNewPeriodModal(cell.dateStr);
                    }
                  }}
                  className={`min-h-[64px] sm:min-h-[82px] p-1.5 sm:p-2 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between select-none relative group ${
                    !cell.isCurrentMonth
                      ? 'bg-gray-50/50 border-transparent text-gray-300 pointer-events-none'
                      : isCellRecorded
                      ? 'bg-[#F8E5EA] border-[#D98CA3] text-[#653B68] shadow-2xs hover:scale-[1.02]'
                      : isCellEstimated
                      ? 'bg-[#FFF9FB] border-dashed border-[#D98CA3]/60 text-[#B76681] hover:bg-[#F8E5EA]/40'
                      : 'bg-[#FFFDF9] border-[#EDE5F3]/80 hover:border-[#D98CA3] text-[#29252D] hover:bg-white'
                  } ${cell.isToday ? 'ring-2 ring-[#653B68] ring-offset-1' : ''}`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs sm:text-sm font-semibold rounded-full w-6 h-6 flex items-center justify-center ${
                        cell.isToday
                          ? 'bg-[#653B68] text-white'
                          : isCellRecorded
                          ? 'text-[#653B68] font-bold'
                          : ''
                      }`}
                    >
                      {cell.dayNumber}
                    </span>

                    {/* Flow indicator icon if recorded */}
                    {isCellRecorded && (
                      <span
                        className="text-[#D98CA3]"
                        title={
                          cell.periodEntry?.flowIntensity
                            ? `Flow: ${cell.periodEntry.flowIntensity}`
                            : 'Recorded Period'
                        }
                      >
                        <Droplet className="w-3.5 h-3.5 fill-[#D98CA3]" />
                      </span>
                    )}
                  </div>

                  {/* Badges inside calendar cell */}
                  <div>
                    {cell.isPeriodStart && (
                      <span className="block text-[9px] font-bold text-white bg-[#653B68] px-1 py-0.2 rounded truncate">
                        {t('tracker.startBadge')}
                      </span>
                    )}
                    {cell.isPeriodEnd && !cell.isPeriodStart && (
                      <span className="block text-[9px] font-bold text-[#653B68] bg-white/80 border border-[#D98CA3]/50 px-1 py-0.2 rounded truncate mt-0.5">
                        {t('tracker.endBadge')}
                      </span>
                    )}
                    {isCellEstimated && (
                      <span className="block text-[9px] font-medium italic text-amber-800 bg-amber-50 border border-amber-200 px-1 py-0.2 rounded truncate">
                        {t('tracker.estimateLabel')}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Helpful Calendar Action Footnote */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs text-[#77717B] border-t border-[#EDE5F3]">
            <span className="flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-[#D98CA3]" />
              <span>{t('tracker.calendarClickHint')}</span>
            </span>

            <button
              type="button"
              onClick={() => handleOpenNewPeriodModal()}
              className="font-semibold text-[#653B68] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{t('tracker.addNewEntryAction')}</span>
            </button>
          </div>

        </div>

        {/* Privacy & Storage Transparency Banner */}
        <div className="p-5 rounded-2xl bg-[#EDE5F3]/40 border border-[#D98CA3]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#77717B]">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-[#653B68] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold text-[#29252D]">
                {t('tracker.privacyHeader')}: {storageMode === 'session' ? 'Local Session Storage' : 'In-Memory Only'}
              </p>
              <p className="leading-relaxed">
                {t('tracker.privacyBody')}
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* MODAL: Record / Edit Period Form */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200"
        >
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#EDE5F3] space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-[#EDE5F3]">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-[#F8E5EA] text-[#653B68]">
                  <Droplet className="w-4 h-4 fill-[#D98CA3]" />
                </span>
                <div>
                  <h3 className="font-serif text-lg font-medium text-[#29252D]">
                    {editingEntry ? t('tracker.modalEditTitle') : t('tracker.modalAddTitle')}
                  </h3>
                  <p className="text-xs text-[#77717B]">
                    {t('tracker.modalSubtitle')}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-[#77717B] hover:text-[#29252D] rounded-xl cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSavePeriod} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="period-start" className="block text-xs font-semibold text-[#29252D] mb-1">
                    {t('tracker.startDateLabel')} *
                  </label>
                  <input
                    id="period-start"
                    type="date"
                    required
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EDE5F3] focus:border-[#D98CA3] focus:ring-1 focus:ring-[#D98CA3] text-sm text-[#29252D] bg-[#FFFDF9] outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="period-end" className="block text-xs font-semibold text-[#29252D] mb-1">
                    {t('tracker.endDateLabel')} *
                  </label>
                  <input
                    id="period-end"
                    type="date"
                    required
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EDE5F3] focus:border-[#D98CA3] focus:ring-1 focus:ring-[#D98CA3] text-sm text-[#29252D] bg-[#FFFDF9] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#29252D] mb-1">
                  {t('tracker.flowLabel')}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['light', 'medium', 'heavy'] as const).map((flow) => (
                    <button
                      key={flow}
                      type="button"
                      onClick={() => setFormData({ ...formData, flowIntensity: flow })}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold capitalize border transition-all cursor-pointer ${
                        formData.flowIntensity === flow
                          ? 'bg-[#653B68] text-white border-[#653B68] shadow-2xs'
                          : 'bg-[#FFFDF9] border-[#EDE5F3] text-[#77717B] hover:text-[#29252D]'
                      }`}
                    >
                      {flow}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="period-notes" className="block text-xs font-semibold text-[#29252D] mb-1">
                  {t('tracker.notesLabel')}
                </label>
                <textarea
                  id="period-notes"
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder={t('tracker.notesPlaceholder')}
                  className="w-full p-3 rounded-xl border border-[#EDE5F3] focus:border-[#D98CA3] focus:ring-1 focus:ring-[#D98CA3] text-sm text-[#29252D] bg-[#FFFDF9] outline-none"
                />
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[#EDE5F3]">
                {editingEntry ? (
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      setDeletingId(editingEntry.id);
                    }}
                    className="text-xs font-semibold text-rose-600 hover:text-rose-700 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>{t('tracker.deleteEntryBtn')}</span>
                  </button>
                ) : (
                  <span />
                )}

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-[#77717B] hover:text-[#29252D] border border-[#EDE5F3] cursor-pointer"
                  >
                    {t('common.cancel')}
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-[#653B68] hover:bg-[#4A264D] transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>{t('tracker.saveRecordBtn')}</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deletingId && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200"
        >
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-rose-100 space-y-4">
            <div className="flex items-center gap-3 text-rose-600">
              <span className="p-2 rounded-xl bg-rose-50">
                <Trash2 className="w-5 h-5" />
              </span>
              <h3 className="font-serif text-lg font-medium text-[#29252D]">
                {t('tracker.confirmDeleteTitle')}
              </h3>
            </div>

            <p className="text-xs text-[#77717B] leading-relaxed">
              {t('tracker.confirmDeleteBody')}
            </p>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeletingId(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#77717B] hover:text-[#29252D] border border-[#EDE5F3] cursor-pointer"
              >
                {t('common.cancel')}
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirmed}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 transition-colors cursor-pointer shadow-xs"
              >
                {t('tracker.confirmDeleteAction')}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
