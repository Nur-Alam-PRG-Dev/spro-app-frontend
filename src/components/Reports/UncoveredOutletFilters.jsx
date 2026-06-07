import React, { useState, useEffect } from 'react';
import { Search, ArrowRight, RotateCcw, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import Card from '@/components/ui/Card';

const getDynamicPresets = () => {
  const today = new Date();

  const formatDate = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  const todayStr = formatDate(today);

  // Yesterday
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  return [
    { label: 'Today', date: todayStr },
    { label: 'Yesterday', date: formatDate(yesterday) }
  ];
};

const PRESETS = getDynamicPresets();

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const UncoveredOutletFilters = ({
  aempId, onAempIdChange,
  roleId, onRoleIdChange,
  countryId, onCountryIdChange,
  date, onDateChange,
  onClearFilters,
  onSearch,
  isLoading
}) => {
  const hasActiveFilters = aempId || roleId || countryId || date;

  // Calendar states
  const [isOpen, setIsOpen] = useState(false);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());

  useEffect(() => {
    if (date) {
      const d = new Date(date);
      setCurrentYear(d.getFullYear());
      setCurrentMonth(d.getMonth());
    }
  }, [date]);

  const formatDateLabel = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();

  const paddingDays = Array(firstDayOfWeek).fill(null);
  const monthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const getDayString = (year, month, day) => {
    const mm = String(month + 1).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    return `${year}-${mm}-${dd}`;
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonth(prev => prev + 1);
    }
  };

  const handleDayClick = (dateStr) => {
    onDateChange(dateStr);
    setIsOpen(false);
  };

  return (
    <Card className="p-4 sm:p-5 border border-[var(--color-border)] shadow-sm bg-white overflow-visible mb-6">
      <div className="flex flex-col gap-4">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[var(--color-border)]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0 border border-emerald-100">
              <Search size={16} className="stroke-[2.5px]" />
            </div>
            <div>
              <h3 className="font-black text-sm sm:text-base text-[var(--color-text-main)] tracking-tight">
                Search Filters
              </h3>
              <p className="text-[10px] sm:text-xs text-[var(--color-text-muted)] font-semibold uppercase tracking-wider mt-0.5">
                Find Unvisited Outlets
              </p>
            </div>
          </div>
        </div>

        {/* Filters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-extrabold text-[var(--color-text-muted)] uppercase tracking-wider ml-1">
              AEMP ID
            </label>
            <input
              type="text"
              placeholder="e.g. 547944"
              value={aempId}
              onChange={(e) => onAempIdChange(e.target.value)}
              className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs sm:text-sm font-bold text-zinc-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder:text-zinc-400 placeholder:font-semibold"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-extrabold text-[var(--color-text-muted)] uppercase tracking-wider ml-1">
              Role ID
            </label>
            <input
              type="text"
              placeholder="e.g. 2"
              value={roleId}
              onChange={(e) => onRoleIdChange(e.target.value)}
              className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs sm:text-sm font-bold text-zinc-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder:text-zinc-400 placeholder:font-semibold"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-extrabold text-[var(--color-text-muted)] uppercase tracking-wider ml-1">
              Country ID
            </label>
            <input
              type="text"
              placeholder="e.g. 26"
              value={countryId}
              onChange={(e) => onCountryIdChange(e.target.value)}
              className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs sm:text-sm font-bold text-zinc-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder:text-zinc-400 placeholder:font-semibold"
            />
          </div>

          <div className="space-y-1.5 relative">
            <label className="text-[10px] font-extrabold text-[var(--color-text-muted)] uppercase tracking-wider ml-1">
              Date Selector
            </label>
            <div
              onClick={() => setIsOpen(!isOpen)}
              className={`flex items-center gap-1.5 sm:gap-2 bg-zinc-50 border rounded-xl px-4 py-2.5 shadow-2xs hover:border-zinc-400 transition-all cursor-pointer ${isOpen ? 'border-[var(--color-primary)] bg-white ring-1 ring-[var(--color-primary)]' : 'border-zinc-200'
                }`}
            >
              <Calendar size={16} className="text-emerald-800/70 shrink-0" />
              <span className={`text-xs sm:text-sm font-semibold select-none flex-1 truncate ${date ? 'text-zinc-900' : 'text-zinc-400'}`}>
                {date ? formatDateLabel(date) : 'Select Date'}
              </span>
            </div>

            {/* Dropdown Calendar Panel */}
            {isOpen && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setIsOpen(false)} />
                <div className="absolute right-0 mt-2 bg-white border border-[var(--color-border)] rounded-2xl p-4 shadow-xl z-40 w-72 sm:w-80 select-none">
                  {/* Header: Month/Year navigation */}
                  <div className="flex items-center justify-between pb-3 border-b border-[var(--color-border)] mb-3">
                    <button
                      onClick={handlePrevMonth}
                      className="p-1 hover:bg-zinc-100 rounded-lg transition-colors cursor-pointer text-zinc-500"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <span className="text-xs sm:text-sm font-extrabold text-[var(--color-text-main)]">
                      {MONTH_NAMES[currentMonth]} {currentYear}
                    </span>
                    <button
                      onClick={handleNextMonth}
                      className="p-1 hover:bg-zinc-100 rounded-lg transition-colors cursor-pointer text-zinc-500"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>

                  {/* Weekdays header */}
                  <div className="grid grid-cols-7 text-center text-[10px] font-black text-[var(--color-text-muted)] uppercase mb-2">
                    {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
                      <div key={d} className="py-1">{d}</div>
                    ))}
                  </div>

                  {/* Days grid */}
                  <div className="grid grid-cols-7 text-center text-xs font-semibold">
                    {paddingDays.map((_, i) => (
                      <div key={`pad-${i}`} className="py-2" />
                    ))}
                    {monthDays.map((day) => {
                      const dateStr = getDayString(currentYear, currentMonth, day);
                      const isSelected = date === dateStr;

                      let cellClass = "py-2 cursor-pointer transition-colors relative flex items-center justify-center h-8 sm:h-9 rounded-full ";
                      let innerClass = "w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full ";

                      if (isSelected) {
                        cellClass += "bg-emerald-50 text-emerald-800";
                        innerClass += "bg-emerald-800 text-white font-extrabold shadow-sm";
                      } else {
                        innerClass += "text-[var(--color-text-main)] hover:bg-zinc-100";
                      }

                      return (
                        <div
                          key={day}
                          className={cellClass}
                          onClick={() => handleDayClick(dateStr)}
                        >
                          <span className={innerClass}>{day}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Actions bar */}
                  <div className="flex items-center justify-between gap-4 mt-4 pt-3 border-t border-[var(--color-border)]">
                    <button
                      onClick={() => onDateChange('')}
                      className="text-[10px] font-bold text-zinc-500 hover:text-rose-600 transition-colors cursor-pointer"
                    >
                      Clear Date
                    </button>
                    <div className="flex flex-wrap gap-2 justify-end">
                      {PRESETS.map((p) => (
                        <button
                          key={p.label}
                          onClick={() => {
                            onDateChange(p.date);
                            setIsOpen(false);
                          }}
                          className="px-2 py-1 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-md text-[10px] font-extrabold transition-colors cursor-pointer"
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-[var(--color-border)]">
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="flex items-center gap-1.5 hover:text-rose-600 transition-colors cursor-pointer text-rose-500 font-extrabold text-xs shrink-0"
          >
            <RotateCcw size={14} />
            <span>Reset</span>
          </button>
        )}
        <button
          onClick={onSearch}
          disabled={isLoading}
          className={`flex items-center gap-1.5 px-6 py-2 rounded-xl text-xs sm:text-sm font-black shadow-md transition-all uppercase tracking-wide shrink-0 ${
            isLoading 
              ? 'bg-emerald-900/50 text-emerald-100 cursor-not-allowed border border-emerald-900/20' 
              : 'bg-emerald-800 hover:bg-emerald-900 text-white hover:shadow-lg cursor-pointer border border-emerald-900/50'
          }`}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Searching...
            </span>
          ) : (
            <span className="flex items-center gap-1.5">
              <span>Search</span>
              <ArrowRight size={14} className="stroke-[3px]" />
            </span>
          )}
        </button>
      </div>
    </Card>
  );
};

export default UncoveredOutletFilters;
