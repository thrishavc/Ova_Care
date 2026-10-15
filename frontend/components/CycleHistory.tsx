import React, { useState } from 'react';
import {
  History,
  Edit2,
  Trash2,
  Plus,
  ArrowRight,
  AlertCircle,
  Clock,
  Info,
  Check,
  X,
} from 'lucide-react';
import { useHealthData } from '../context/HealthDataContext';
import { useLanguage } from '../i18n/LanguageContext';
import { PeriodEntry } from '../types/health';

interface CycleHistoryProps {
  onNavigateToTracker: () => void;
  onNavigateToDashboard: () => void;
}

export const CycleHistory: React.FC<CycleHistoryProps> = ({
  onNavigateToTracker,
  onNavigateToDashboard,
}) => {
  const { t } = useLanguage();
  const { periods, cycles, stats, updatePeriod, deletePeriod } = useHealthData();

  // Edit / Delete modal states
  const [editingEntry, setEditingEntry] = useState<PeriodEntry | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    flowIntensity: 'medium' as 'light' | 'medium' | 'heavy',
    notes: '',
  });
  const [formError, setFormError] = useState<string | null>(null);

  // Sorting: newest first or oldest first
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');

  const sortedCycles = [...cycles].sort((a, b) => {
    const timeA = new Date(a.periodEntry.startDate).getTime();
    const timeB = new Date(b.periodEntry.startDate).getTime();
    return sortOrder === 'desc' ? timeB - timeA : timeA - timeB;
  });

  const handleOpenEdit = (entry: PeriodEntry) => {
    setEditingEntry(entry);
    setFormData({
      startDate: entry.startDate,
      endDate: entry.endDate,
      flowIntensity: entry.flowIntensity || 'medium',
      notes: entry.notes || '',
    });
    setFormError(null);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEntry) return;

    if (!formData.startDate) {
      setFormError('Start date is required.');
      return;
    }
    if (!formData.endDate) {
      setFormError('End date is required.');
      return;
    }
    if (formData.endDate < formData.startDate) {
      setFormError('End date cannot precede the start date.');
      return;
    }

    updatePeriod(editingEntry.id, {
      startDate: formData.startDate,
      endDate: formData.endDate,
      flowIntensity: formData.flowIntensity,
      notes: formData.notes.trim(),
    });

    setEditingEntry(null);
  };

  const handleDeleteConfirmed = () => {
    if (deletingId) {
      deletePeriod(deletingId);
      setDeletingId(null);
    }
  };

  return (
    <div className="py-10 bg-[#FFFDF9] min-h-[calc(100vh-140px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#EDE5F3]">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D98CA3]">
              <History className="w-3.5 h-3.5" />
              <span>{t('history.badge')}</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#29252D] font-normal mt-1">
              {t('history.title')}
            </h1>
            <p className="text-xs text-[#77717B] mt-1 max-w-xl leading-relaxed">
              {t('history.subtitle')}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={onNavigateToTracker}
              className="px-4.5 py-2.5 rounded-full bg-gradient-to-r from-[#653B68] to-[#4A264D] hover:from-[#4A264D] hover:to-[#38183B] text-white text-xs font-semibold shadow-xs hover:shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>{t('history.addPeriodBtn')}</span>
            </button>
            <button
              type="button"
              onClick={onNavigateToDashboard}
              className="px-4 py-2.5 rounded-full bg-white border border-[#EDE5F3] hover:border-[#D98CA3] text-[#29252D] text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <span>{t('nav.dashboard')}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#653B68]" />
            </button>
          </div>
        </div>

        {/* Calculation Clarity Notice */}
        <div className="p-4 rounded-2xl bg-white border border-[#EDE5F3] flex items-start gap-3 text-xs text-[#77717B] shadow-2xs">
          <Info className="w-4 h-4 text-[#653B68] shrink-0 mt-0.5" />
          <div className="leading-relaxed space-y-1">
            <span className="font-semibold text-[#29252D]">{t('history.howCalculatedTitle')}: </span>
            <span>{t('history.howCalculatedBody')}</span>
          </div>
        </div>

        {/* Table Container */}
        {periods.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-3xl border border-[#EDE5F3] shadow-xs p-10 sm:p-16 text-center max-w-xl mx-auto space-y-5">
            <div className="w-16 h-16 rounded-3xl bg-[#F8E5EA] border border-[#D98CA3]/30 mx-auto flex items-center justify-center text-[#653B68]">
              <History className="w-8 h-8 text-[#D98CA3]" />
            </div>
            <div className="space-y-2">
              <h3 className="font-serif text-2xl text-[#29252D] font-normal">
                {t('history.emptyTitle')}
              </h3>
              <p className="text-xs text-[#77717B] leading-relaxed max-w-md mx-auto">
                {t('history.emptyBody')}
              </p>
            </div>
            <div className="pt-2">
              <button
                type="button"
                onClick={onNavigateToTracker}
                className="px-6 py-3 rounded-full bg-[#653B68] hover:bg-[#4A264D] text-white text-xs font-semibold transition-all cursor-pointer shadow-xs inline-flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>{t('history.recordFirstPeriodBtn')}</span>
              </button>
            </div>
          </div>
        ) : (
          /* Recorded Cycles Table */
          <div className="bg-white rounded-3xl border border-[#EDE5F3] shadow-xs overflow-hidden">
            
            {/* Table Control Bar */}
            <div className="p-5 border-b border-[#EDE5F3] flex flex-wrap items-center justify-between gap-4 bg-[#FFFDF9]">
              <div className="flex items-center gap-2">
                <span className="font-serif text-lg font-medium text-[#29252D]">
                  {t('history.tableHeading')} ({periods.length})
                </span>
                {stats.averageCycleLength && (
                  <span className="text-xs font-semibold text-[#653B68] bg-[#EDE5F3] px-2.5 py-0.5 rounded-full">
                    {t('tracker.avgDuration')}: {stats.averageCycleLength} {t('tracker.daysUnit')}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-[#77717B]">{t('history.sortOrder')}:</span>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as 'desc' | 'asc')}
                  className="px-2.5 py-1 bg-white border border-[#EDE5F3] rounded-lg text-[#29252D] font-medium outline-none cursor-pointer"
                >
                  <option value="desc">{t('history.newestFirst')}</option>
                  <option value="asc">{t('history.oldestFirst')}</option>
                </select>
              </div>
            </div>

            {/* Desktop Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FFFDF9] border-b border-[#EDE5F3] text-[#77717B] font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="py-3.5 px-5">{t('history.colCycle')}</th>
                    <th className="py-3.5 px-5">{t('history.colStartDate')}</th>
                    <th className="py-3.5 px-5">{t('history.colEndDate')}</th>
                    <th className="py-3.5 px-5">{t('history.colDuration')}</th>
                    <th className="py-3.5 px-5">{t('history.colCycleLength')}</th>
                    <th className="py-3.5 px-5">{t('history.colStatus')}</th>
                    <th className="py-3.5 px-5 text-right">{t('history.colActions')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EDE5F3]">
                  {sortedCycles.map((cycleItem) => {
                    const entry = cycleItem.periodEntry;
                    const hasCycleLength = cycleItem.isCalculable && cycleItem.cycleLengthDays !== undefined;

                    return (
                      <tr key={entry.id} className="hover:bg-[#FFFDF9]/60 transition-colors">
                        {/* Cycle Number */}
                        <td className="py-4 px-5 font-semibold text-[#653B68]">
                          Cycle #{cycleItem.cycleNumber}
                        </td>

                        {/* Start Date */}
                        <td className="py-4 px-5 text-[#29252D] font-medium whitespace-nowrap">
                          {entry.startDate}
                        </td>

                        {/* End Date */}
                        <td className="py-4 px-5 text-[#29252D] font-medium whitespace-nowrap">
                          {entry.endDate}
                        </td>

                        {/* Duration */}
                        <td className="py-4 px-5 whitespace-nowrap">
                          <span className="px-2 py-0.5 rounded-md font-semibold bg-[#F8E5EA] text-[#653B68]">
                            {entry.durationDays} {t('tracker.daysUnit')}
                          </span>
                        </td>

                        {/* Cycle Length (Calculated strictly from consecutive starts) */}
                        <td className="py-4 px-5 whitespace-nowrap">
                          {hasCycleLength ? (
                            <span className="font-semibold text-[#29252D]">
                              {cycleItem.cycleLengthDays} {t('tracker.daysUnit')}
                            </span>
                          ) : (
                            <span className="text-[#77717B]/70 italic text-[11px]">
                              {t('history.cycleLengthPending')}
                            </span>
                          )}
                        </td>

                        {/* Status */}
                        <td className="py-4 px-5 whitespace-nowrap">
                          {hasCycleLength ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                              <Check className="w-3 h-3" />
                              <span>{t('history.statusRecorded')}</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                              <Clock className="w-3 h-3" />
                              <span>{t('history.statusInProgress')}</span>
                            </span>
                          )}
                        </td>

                        {/* Edit & Delete Action Buttons */}
                        <td className="py-4 px-5 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleOpenEdit(entry)}
                              title={t('history.editTooltip')}
                              aria-label={t('history.editTooltip')}
                              className="p-1.5 rounded-lg border border-[#EDE5F3] hover:border-[#D98CA3] text-[#77717B] hover:text-[#653B68] transition-colors cursor-pointer"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => setDeletingId(entry.id)}
                              title={t('history.deleteTooltip')}
                              aria-label={t('history.deleteTooltip')}
                              className="p-1.5 rounded-lg border border-[#EDE5F3] hover:border-rose-300 text-[#77717B] hover:text-rose-600 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Table Footer */}
            <div className="p-4 bg-[#FFFDF9] border-t border-[#EDE5F3] flex flex-wrap items-center justify-between text-xs text-[#77717B] gap-3">
              <span>
                {t('history.totalRecords')}: <strong className="text-[#29252D]">{periods.length}</strong>
              </span>
              <button
                type="button"
                onClick={onNavigateToTracker}
                className="font-semibold text-[#653B68] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{t('history.addAnotherPeriod')}</span>
              </button>
            </div>

          </div>
        )}

      </div>

      {/* EDIT MODAL */}
      {editingEntry && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200"
        >
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#EDE5F3] space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#EDE5F3]">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-[#F8E5EA] text-[#653B68]">
                  <Edit2 className="w-4 h-4" />
                </span>
                <h3 className="font-serif text-lg font-medium text-[#29252D]">
                  {t('tracker.modalEditTitle')}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingEntry(null)}
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

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="edit-start" className="block text-xs font-semibold text-[#29252D] mb-1">
                    {t('tracker.startDateLabel')} *
                  </label>
                  <input
                    id="edit-start"
                    type="date"
                    required
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EDE5F3] focus:border-[#D98CA3] focus:ring-1 focus:ring-[#D98CA3] text-sm text-[#29252D] bg-[#FFFDF9] outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="edit-end" className="block text-xs font-semibold text-[#29252D] mb-1">
                    {t('tracker.endDateLabel')} *
                  </label>
                  <input
                    id="edit-end"
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
                <label htmlFor="edit-notes" className="block text-xs font-semibold text-[#29252D] mb-1">
                  {t('tracker.notesLabel')}
                </label>
                <textarea
                  id="edit-notes"
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder={t('tracker.notesPlaceholder')}
                  className="w-full p-3 rounded-xl border border-[#EDE5F3] focus:border-[#D98CA3] focus:ring-1 focus:ring-[#D98CA3] text-sm text-[#29252D] bg-[#FFFDF9] outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#EDE5F3]">
                <button
                  type="button"
                  onClick={() => setEditingEntry(null)}
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
