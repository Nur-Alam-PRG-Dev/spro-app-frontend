'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const CompactDateFilter = ({
  startDate,
  onStartDateChange,
  endDate,
  onEndDateChange
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [hoveredDate, setHoveredDate] = useState(null);

  useEffect(() => {
    if (startDate) {
      const date = new Date(startDate);
      setCurrentYear(date.getFullYear());
      setCurrentMonth(date.getMonth());
    }
  }, [startDate]);

  const formatDateLabel = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
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
    if (!startDate || (startDate && endDate)) {
      onStartDateChange(dateStr);
      onEndDateChange('');
    } else {
      if (dateStr < startDate) {
        onStartDateChange(dateStr);
      } else {
        onEndDateChange(dateStr);
        setIsOpen(false);
      }
    }
  };

  return (
    <div className="relative min-w-[200px] shrink-0">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 bg-zinc-50 border rounded-lg px-2.5 py-1.5 shadow-2xs hover:border-zinc-400 transition-all cursor-pointer ${
          isOpen ? 'border-indigo-600 bg-white ring-1 ring-indigo-600' : 'border-[var(--color-border)]'
        }`}
      >
        <Calendar size={14} className="text-indigo-800/70 shrink-0" />
        <span className={`text-[11px] sm:text-xs font-semibold select-none ${startDate ? 'text-zinc-800' : 'text-zinc-400'}`}>
          {startDate ? formatDateLabel(startDate) : 'Start'}
        </span>
        <ArrowRight size={12} className="text-zinc-400 shrink-0 mx-0.5" />
        <span className={`text-[11px] sm:text-xs font-semibold select-none ${endDate ? 'text-zinc-800' : 'text-zinc-400'}`}>
          {endDate ? formatDateLabel(endDate) : 'End'}
        </span>
      </div>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-30 bg-black/5 sm:bg-transparent" onClick={() => setIsOpen(false)} />
          <div className="absolute left-0 sm:right-auto sm:left-0 mt-2 bg-white border border-[var(--color-border)] rounded-2xl p-3 sm:p-4 shadow-2xl z-40 w-[260px] sm:w-72 select-none origin-top-left">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--color-border)] mb-3">
              <button onClick={handlePrevMonth} className="p-1 hover:bg-zinc-100 rounded-lg text-zinc-500">
                <ChevronLeft size={16} />
              </button>
              <span className="text-xs sm:text-sm font-extrabold text-[var(--color-text-main)]">
                {MONTH_NAMES[currentMonth]} {currentYear}
              </span>
              <button onClick={handleNextMonth} className="p-1 hover:bg-zinc-100 rounded-lg text-zinc-500">
                <ChevronRight size={16} />
              </button>
            </div>

            <div className="grid grid-cols-7 text-center text-[10px] font-black text-[var(--color-text-muted)] uppercase mb-2">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
                <div key={d} className="py-1">{d}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 text-center text-xs font-semibold">
              {paddingDays.map((_, i) => <div key={`pad-${i}`} className="py-2" />)}
              {monthDays.map((day) => {
                const dateStr = getDayString(currentYear, currentMonth, day);
                const isStart = startDate === dateStr;
                const isEnd = endDate === dateStr;
                const isInRange = startDate && endDate && dateStr > startDate && dateStr < endDate;
                const isHoverPreview = startDate && !endDate && hoveredDate && dateStr > startDate && dateStr <= hoveredDate;

                let cellClass = "py-1.5 cursor-pointer transition-colors relative flex items-center justify-center h-8";
                let innerClass = "w-7 h-7 flex items-center justify-center rounded-full ";

                if (isStart && isEnd) innerClass += "bg-indigo-800 text-white font-extrabold shadow-sm";
                else if (isStart) { cellClass += "bg-indigo-50 text-indigo-800 rounded-l-full"; innerClass += "bg-indigo-800 text-white font-extrabold shadow-sm"; }
                else if (isEnd) { cellClass += "bg-indigo-50 text-indigo-800 rounded-r-full"; innerClass += "bg-indigo-800 text-white font-extrabold shadow-sm"; }
                else if (isInRange) { cellClass += "bg-indigo-50 text-indigo-800 font-bold border-y border-indigo-100"; innerClass += "rounded-none"; }
                else if (isHoverPreview) { cellClass += "bg-indigo-50/50 text-indigo-700/80 border-y border-dashed border-indigo-200"; innerClass += "rounded-none"; }
                else { innerClass += "text-[var(--color-text-main)] hover:bg-zinc-100"; }

                return (
                  <div key={day} className={cellClass} onClick={() => handleDayClick(dateStr)} onMouseEnter={() => setHoveredDate(dateStr)} onMouseLeave={() => setHoveredDate(null)}>
                    <span className={innerClass}>{day}</span>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between gap-4 mt-4 pt-3 border-t border-[var(--color-border)]">
              <button onClick={() => { onStartDateChange(''); onEndDateChange(''); }} className="text-[10px] font-bold text-zinc-500 hover:text-rose-600">
                Clear Range
              </button>
              <button onClick={() => setIsOpen(false)} className="px-3 py-1 bg-indigo-800 hover:bg-indigo-900 text-white rounded-lg text-[10px] font-extrabold shadow-2xs">
                Done
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CompactDateFilter;
