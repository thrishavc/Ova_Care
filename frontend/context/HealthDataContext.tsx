import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import {
  PeriodEntry,
  CalculatedCycle,
  CycleStats,
  StoredHealthReport,
  SymptomAnalysisResult,
} from '../types/health';

interface HealthDataContextType {
  periods: PeriodEntry[];
  cycles: CalculatedCycle[];
  stats: CycleStats;
  reports: StoredHealthReport[];
  addPeriod: (entry: {
    startDate: string;
    endDate: string;
    flowIntensity?: 'light' | 'medium' | 'heavy';
    notes?: string;
  }) => PeriodEntry;
  updatePeriod: (
    id: string,
    updates: {
      startDate?: string;
      endDate?: string;
      flowIntensity?: 'light' | 'medium' | 'heavy';
      notes?: string;
    }
  ) => void;
  deletePeriod: (id: string) => void;
  addReport: (
    analysis: SymptomAnalysisResult,
    summary?: {
      englishSummary?: string;
      translatedSummary?: string;
      language?: string;
    }
  ) => StoredHealthReport;
  updateReportSummary: (
    id: string,
    summary: {
      englishSummary: string;
      translatedSummary: string;
      language?: string;
    }
  ) => void;
  deleteReport: (id: string) => void;
  getReportById: (id: string) => StoredHealthReport | undefined;
  storageMode: 'session' | 'memory';
  setStorageMode: (mode: 'session' | 'memory') => void;
  clearAllData: () => void;
}

const SESSION_PERIODS_KEY = 'ovacare_session_periods_v1';
const SESSION_REPORTS_KEY = 'ovacare_session_reports_v1';
const SESSION_MODE_KEY = 'ovacare_storage_mode_v1';

const HealthDataContext = createContext<HealthDataContextType | undefined>(undefined);

function calculateDuration(startDate: string, endDate: string): number {
  try {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(1, diffDays + 1);
  } catch {
    return 1;
  }
}

export const HealthDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [storageMode, setStorageModeState] = useState<'session' | 'memory'>(() => {
    try {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        const saved = sessionStorage.getItem(SESSION_MODE_KEY);
        if (saved === 'memory' || saved === 'session') return saved;
      }
    } catch {}
    return 'session';
  });

  // Periods state
  const [periods, setPeriods] = useState<PeriodEntry[]>(() => {
    try {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        const saved = sessionStorage.getItem(SESSION_PERIODS_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) return parsed;
        }
      }
    } catch {}
    return [];
  });

  // Reports state
  const [reports, setReports] = useState<StoredHealthReport[]>(() => {
    try {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        const saved = sessionStorage.getItem(SESSION_REPORTS_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) return parsed;
        }
      }
    } catch {}
    return [];
  });

  // Sync to sessionStorage if mode is 'session'
  useEffect(() => {
    if (storageMode === 'session' && typeof window !== 'undefined' && window.sessionStorage) {
      try {
        sessionStorage.setItem(SESSION_PERIODS_KEY, JSON.stringify(periods));
        sessionStorage.setItem(SESSION_REPORTS_KEY, JSON.stringify(reports));
        sessionStorage.setItem(SESSION_MODE_KEY, storageMode);
      } catch (e) {
        console.warn('Session storage write error:', e);
      }
    } else if (storageMode === 'memory' && typeof window !== 'undefined' && window.sessionStorage) {
      try {
        sessionStorage.removeItem(SESSION_PERIODS_KEY);
        sessionStorage.removeItem(SESSION_REPORTS_KEY);
        sessionStorage.setItem(SESSION_MODE_KEY, 'memory');
      } catch {}
    }
  }, [periods, reports, storageMode]);

  const setStorageMode = (mode: 'session' | 'memory') => {
    setStorageModeState(mode);
    if (mode === 'memory' && typeof window !== 'undefined' && window.sessionStorage) {
      try {
        sessionStorage.removeItem(SESSION_PERIODS_KEY);
        sessionStorage.removeItem(SESSION_REPORTS_KEY);
      } catch {}
    }
  };

  const clearAllData = () => {
    setPeriods([]);
    setReports([]);
    if (typeof window !== 'undefined' && window.sessionStorage) {
      try {
        sessionStorage.removeItem(SESSION_PERIODS_KEY);
        sessionStorage.removeItem(SESSION_REPORTS_KEY);
      } catch {}
    }
  };

  const addPeriod = ({
    startDate,
    endDate,
    flowIntensity = 'medium',
    notes = '',
  }: {
    startDate: string;
    endDate: string;
    flowIntensity?: 'light' | 'medium' | 'heavy';
    notes?: string;
  }): PeriodEntry => {
    const finalEnd = endDate >= startDate ? endDate : startDate;
    const durationDays = calculateDuration(startDate, finalEnd);

    const newEntry: PeriodEntry = {
      id: `period-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      startDate,
      endDate: finalEnd,
      durationDays,
      flowIntensity,
      notes,
      recordedAt: new Date().toISOString(),
    };

    setPeriods((prev) => {
      const updated = [...prev, newEntry];
      // Sort chronologically ascending
      return updated.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
    });

    return newEntry;
  };

  const updatePeriod = (
    id: string,
    updates: {
      startDate?: string;
      endDate?: string;
      flowIntensity?: 'light' | 'medium' | 'heavy';
      notes?: string;
    }
  ) => {
    setPeriods((prev) => {
      const updated = prev.map((entry) => {
        if (entry.id !== id) return entry;
        const newStart = updates.startDate ?? entry.startDate;
        let newEnd = updates.endDate ?? entry.endDate;
        if (newEnd < newStart) newEnd = newStart;
        const durationDays = calculateDuration(newStart, newEnd);
        return {
          ...entry,
          ...updates,
          startDate: newStart,
          endDate: newEnd,
          durationDays,
        };
      });
      return updated.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
    });
  };

  const deletePeriod = (id: string) => {
    setPeriods((prev) => prev.filter((p) => p.id !== id));
  };

  const addReport = (
    analysis: SymptomAnalysisResult,
    summary?: {
      englishSummary?: string;
      translatedSummary?: string;
      language?: string;
    }
  ): StoredHealthReport => {
    const newReport: StoredHealthReport = {
      id: `report-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      createdAt: new Date().toISOString(),
      originalInput: analysis.originalInput || '',
      detectedLanguage: analysis.detectedLanguage || 'English',
      analysis,
      englishSummary: summary?.englishSummary,
      translatedSummary: summary?.translatedSummary,
      summaryLanguage: summary?.language,
    };

    setReports((prev) => [newReport, ...prev]);
    return newReport;
  };

  const updateReportSummary = (
    id: string,
    summary: {
      englishSummary: string;
      translatedSummary: string;
      language?: string;
    }
  ) => {
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...summary, summaryLanguage: summary.language } : r))
    );
  };

  const deleteReport = (id: string) => {
    setReports((prev) => prev.filter((r) => r.id !== id));
  };

  const getReportById = (id: string) => {
    return reports.find((r) => r.id === id);
  };

  // Derive calculated cycles from periods sorted chronologically
  const cycles = useMemo<CalculatedCycle[]>(() => {
    if (periods.length === 0) return [];

    const sorted = [...periods].sort(
      (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );

    return sorted.map((entry, index) => {
      const nextEntry = sorted[index + 1];
      let cycleLengthDays: number | undefined = undefined;
      let isCalculable = false;

      if (nextEntry) {
        const startCurrent = new Date(entry.startDate).getTime();
        const startNext = new Date(nextEntry.startDate).getTime();
        const diffDays = Math.round((startNext - startCurrent) / (1000 * 60 * 60 * 24));
        if (diffDays > 0) {
          cycleLengthDays = diffDays;
          isCalculable = true;
        }
      }

      return {
        id: `cycle-${entry.id}`,
        cycleNumber: index + 1,
        periodEntry: entry,
        nextPeriodEntry: nextEntry,
        cycleLengthDays,
        isCalculable,
        status: nextEntry ? 'recorded' : 'in_progress',
      };
    });
  }, [periods]);

  // Derive cycle statistics
  const stats = useMemo<CycleStats>(() => {
    const totalPeriodsRecorded = periods.length;
    if (totalPeriodsRecorded === 0) {
      return {
        totalPeriodsRecorded: 0,
        hasSufficientHistory: false,
      };
    }

    const sorted = [...periods].sort(
      (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );

    const lastPeriod = sorted[sorted.length - 1];
    const totalDurations = sorted.reduce((acc, curr) => acc + curr.durationDays, 0);
    const averagePeriodDuration = Math.round((totalDurations / sorted.length) * 10) / 10;

    // Calculate cycle lengths from consecutive start dates
    const cycleLengths: number[] = [];
    for (let i = 0; i < sorted.length - 1; i++) {
      const diffDays = Math.round(
        (new Date(sorted[i + 1].startDate).getTime() - new Date(sorted[i].startDate).getTime()) /
          (1000 * 60 * 60 * 24)
      );
      // Physiologically plausible range (15 to 90 days)
      if (diffDays >= 15 && diffDays <= 90) {
        cycleLengths.push(diffDays);
      }
    }

    const hasSufficientHistory = cycleLengths.length >= 1;

    let averageCycleLength: number | undefined = undefined;
    let estimatedNextPeriodStart: string | undefined = undefined;
    let estimatedNextPeriodEnd: string | undefined = undefined;

    if (hasSufficientHistory) {
      const sum = cycleLengths.reduce((a, b) => a + b, 0);
      averageCycleLength = Math.round(sum / cycleLengths.length);

      // Estimate next period start date = last start date + average cycle length
      const lastStart = new Date(lastPeriod.startDate);
      const nextStart = new Date(lastStart.getTime() + averageCycleLength * 86400000);
      estimatedNextPeriodStart = nextStart.toISOString().split('T')[0];

      // Estimated period end = estimated start + (avg duration - 1) days
      const durationForEstimate = Math.max(1, Math.round(averagePeriodDuration));
      const nextEnd = new Date(nextStart.getTime() + (durationForEstimate - 1) * 86400000);
      estimatedNextPeriodEnd = nextEnd.toISOString().split('T')[0];
    }

    return {
      totalPeriodsRecorded,
      lastPeriodStart: lastPeriod.startDate,
      lastPeriodEnd: lastPeriod.endDate,
      lastPeriodDuration: lastPeriod.durationDays,
      averagePeriodDuration,
      averageCycleLength,
      estimatedNextPeriodStart,
      estimatedNextPeriodEnd,
      hasSufficientHistory,
    };
  }, [periods]);

  return (
    <HealthDataContext.Provider
      value={{
        periods,
        cycles,
        stats,
        reports,
        addPeriod,
        updatePeriod,
        deletePeriod,
        addReport,
        updateReportSummary,
        deleteReport,
        getReportById,
        storageMode,
        setStorageMode,
        clearAllData,
      }}
    >
      {children}
    </HealthDataContext.Provider>
  );
};

export const useHealthData = (): HealthDataContextType => {
  const context = useContext(HealthDataContext);
  if (!context) {
    throw new Error('useHealthData must be used within a HealthDataProvider');
  }
  return context;
};
