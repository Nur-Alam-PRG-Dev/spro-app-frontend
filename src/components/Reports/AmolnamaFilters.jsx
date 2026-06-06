'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, RotateCcw, User, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Card from '@/components/ui/Card';

const PRESETS = [
  { label: 'All Dates', start: '', end: '' },
  { label: 'Today', start: '2026-05-02', end: '2026-05-02' },
  { label: 'Last 3 Days', start: '2026-05-02', end: '2026-05-04' },
  { label: 'Active Range', start: '2026-05-02', end: '2026-05-05' }
];

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const AmolnamaFilters = ({
  employeeSearch,
  onEmployeeSearchChange,
  startDate,
  onStartDateChange,
  endDate,
  onEndDateChange,
  onClearFilters
}) => {
  const hasActiveFilters = employeeSearch || startDate || endDate;

  // Calendar states
  const [isOpen, setIsOpen] = useState(false);
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(4); // 4 = May (0-indexed)
  const [hoveredDate, setHoveredDate] = useState(null);

  /* eslint-disable react-hooks/set-state-in-effect */
  // Sync calendar display month with selected startDate when it changes
  useEffect(() => {
    if (startDate) {
      const date = new Date(startDate);
      const year = date.getFullYear();
      const month = date.getMonth();
      if (currentYear !== year) setCurrentYear(year);
      if (currentMonth !== month) setCurrentMonth(month);
    }
  }, [startDate, currentYear, currentMonth]);
  /* eslint-enable react-hooks/set-state-in-effect */

  // Helper to format date labels beautifully
  const formatDateLabel = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Helper to calculate total days in range
  const getDaysCount = (start, end) => {
    if (!start || !end) return 0;
    const sDate = new Date(start);
    const eDate = new Date(end);
    const diffTime = eDate - sDate;
    if (diffTime < 0) return 0;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  const daysCount = getDaysCount(startDate, endDate);
  let summaryText = 'Showing all activity logs';
  if (startDate && endDate) {
    if (startDate === endDate) {
      summaryText = `Showing activities for ${formatDateLabel(startDate)}`;
    } else {
      summaryText = `Showing activities from ${formatDateLabel(startDate)} to ${formatDateLabel(endDate)} (${daysCount} days)`;
    }
  } else if (startDate) {
    summaryText = `Showing activities since ${formatDateLabel(startDate)}`;
  } else if (endDate) {
    summaryText = `Showing activities until ${formatDateLabel(endDate)}`;
  }

  // Calendar month calculations
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
    if (!startDate || (startDate && endDate)) {
      onStartDateChange(dateStr);
      onEndDateChange('');
    } else {
      if (dateStr < startDate) {
        onStartDateChange(dateStr);
      } else {
        onEndDateChange(dateStr);
        setIsOpen(false); // Close dropdown when selection completes
      }
    }
  };

  return (
    <Card className="p-3.5 sm:p-5 -mt-10 lg:mt-0" hoverable={false}>
      <div className="flex flex-col gap-3 sm:gap-5 lg:flex-row lg:items-end">
        {/* Search Input Box */}
        <div className="flex-1 space-y-1 sm:space-y-1.5">
          <label className="block text-[9px] sm:text-[10px] font-black text-[var(--color-text-muted)] tracking-wider uppercase leading-none">
            Search Employee
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-3 sm:left-3.5 flex items-center pointer-events-none text-[var(--color-text-muted)]">
              <User size={14} className="sm:hidden text-emerald-800/70" />
              <User size={18} className="hidden sm:block text-emerald-800/70" />
            </span>
            <input
              type="text"
              value={employeeSearch}
              onChange={(e) => onEmployeeSearchChange(e.target.value)}
              placeholder="Search by ID or Name..."
              className="w-full pl-8 sm:pl-10 pr-8 sm:pr-10 py-1.5 sm:py-2.5 text-[11px] sm:text-sm bg-zinc-50 border border-[var(--color-border)] rounded-2xl outline-none focus:border-[var(--color-primary)] focus:bg-white transition-all text-[var(--color-text-main)] font-semibold shadow-2xs placeholder:text-zinc-400"
            />
            {employeeSearch && (
              <button
                onClick={() => onEmployeeSearchChange('')}
                className="absolute inset-y-0 right-3 sm:right-3.5 flex items-center text-xs font-bold text-zinc-400 hover:text-zinc-600 transition-colors"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Date Selector and presets */}
        <div className="flex-2 space-y-1 sm:space-y-1.5 lg:w-auto relative">
          <label className="block text-[9px] sm:text-[10px] font-black text-[var(--color-text-muted)] tracking-wider uppercase leading-none">
            Date Range Selector
          </label>
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
            {/* Unified Input Card Selector */}
            <div className="relative flex-1 min-w-[250px] sm:min-w-[280px]">
              <div
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-1.5 sm:gap-2 bg-zinc-50 border rounded-2xl px-2.5 sm:px-3.5 py-1.5 sm:py-2.5 shadow-2xs hover:border-zinc-400 transition-all cursor-pointer ${isOpen ? 'border-[var(--color-primary)] bg-white ring-1 ring-[var(--color-primary)]' : 'border-[var(--color-border)]'
                  }`}
              >
                <Calendar size={13} className="sm:hidden text-emerald-800/70 shrink-0" />
                <Calendar size={16} className="hidden sm:block text-emerald-800/70 shrink-0" />
                <span className={`text-[11px] sm:text-sm font-semibold select-none ${startDate ? 'text-[var(--color-text-main)]' : 'text-zinc-400'}`}>
                  {startDate ? formatDateLabel(startDate) : 'Start Date'}
                </span>
                <ArrowRight size={12} className="sm:hidden text-zinc-400 shrink-0 mx-0.5" />
                <ArrowRight size={14} className="hidden sm:block text-zinc-400 shrink-0 mx-1" />
                <span className={`text-[11px] sm:text-sm font-semibold select-none ${endDate ? 'text-[var(--color-text-main)]' : 'text-zinc-400'}`}>
                  {endDate ? formatDateLabel(endDate) : 'End Date'}
                </span>
              </div>

              {/* Dropdown Calendar Panel */}
              {isOpen && (
                <>
                  <div className="fixed inset-0 z-30" onClick={() => setIsOpen(false)} />
                  <div className="absolute left-0 mt-2 bg-white border border-[var(--color-border)] rounded-2xl p-4 shadow-xl z-40 w-72 sm:w-80 select-none">
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
                        const isStart = startDate === dateStr;
                        const isEnd = endDate === dateStr;
                        const isInRange = startDate && endDate && dateStr > startDate && dateStr < endDate;
                        const isHoverPreview = startDate && !endDate && hoveredDate && dateStr > startDate && dateStr <= hoveredDate;

                        let cellClass = "py-2 cursor-pointer transition-colors relative flex items-center justify-center h-8 sm:h-9 ";
                        let innerClass = "w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full ";

                        if (isStart && isEnd) {
                          innerClass += "bg-emerald-800 text-white font-extrabold shadow-sm";
                        } else if (isStart) {
                          cellClass += "bg-emerald-50 text-emerald-800 rounded-l-full";
                          innerClass += "bg-emerald-800 text-white font-extrabold shadow-sm";
                        } else if (isEnd) {
                          cellClass += "bg-emerald-50 text-emerald-800 rounded-r-full";
                          innerClass += "bg-emerald-800 text-white font-extrabold shadow-sm";
                        } else if (isInRange) {
                          cellClass += "bg-emerald-50 text-emerald-800 font-bold border-y border-emerald-100";
                          innerClass += "rounded-none";
                        } else if (isHoverPreview) {
                          cellClass += "bg-emerald-50/50 text-emerald-700/80 border-y border-dashed border-emerald-200";
                          innerClass += "rounded-none";
                        } else {
                          innerClass += "text-[var(--color-text-main)] hover:bg-zinc-100";
                          if (dateStr === '2026-05-02') {
                            innerClass += " border border-emerald-500 font-black";
                          }
                        }

                        return (
                          <div
                            key={day}
                            className={cellClass}
                            onClick={() => handleDayClick(dateStr)}
                            onMouseEnter={() => setHoveredDate(dateStr)}
                            onMouseLeave={() => setHoveredDate(null)}
                          >
                            <span className={innerClass}>{day}</span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Actions bar */}
                    <div className="flex items-center justify-between gap-4 mt-4 pt-3 border-t border-[var(--color-border)]">
                      <button
                        onClick={() => {
                          onStartDateChange('');
                          onEndDateChange('');
                        }}
                        className="text-[10px] font-bold text-zinc-500 hover:text-rose-600 transition-colors cursor-pointer"
                      >
                        Clear Range
                      </button>
                      <button
                        onClick={() => setIsOpen(false)}
                        className="px-3 py-1 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-[10px] font-extrabold shadow-2xs cursor-pointer"
                      >
                        Done
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Presets badges */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none snap-x whitespace-nowrap -mx-3.5 px-3.5 sm:mx-0 sm:px-0 shrink-0">
              {PRESETS.map((preset) => {
                const isActive = startDate === preset.start && endDate === preset.end;
                return (
                  <button
                    key={preset.label}
                    onClick={() => {
                      onStartDateChange(preset.start);
                      onEndDateChange(preset.end);
                    }}
                    className={`shrink-0 snap-start px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold border transition-all cursor-pointer ${isActive
                      ? 'bg-[var(--color-primary)] border-[var(--color-primary)] text-white shadow-xs'
                      : 'bg-white border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-zinc-400 hover:text-[var(--color-text-main)]'
                      }`}
                  >
                    {preset.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Summary Footer */}
      <div className="flex items-center justify-between gap-2 mt-4 pt-3.5 border-t border-[var(--color-border)] text-[10px] sm:text-xs font-bold text-[var(--color-text-muted)]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse shrink-0" />
          <span className="truncate">{summaryText}</span>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="flex items-center gap-1 hover:text-rose-600 transition-colors cursor-pointer text-rose-500 font-extrabold shrink-0"
          >
            <RotateCcw size={12} />
            <span>Reset Filters</span>
          </button>
        )}
      </div>
    </Card>
  );
};

export default AmolnamaFilters;
