import React, { useState, useEffect } from "react";
import {
  Search,
  ArrowRight,
  RotateCcw,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Card from "@/components/ui/Card";

const getDynamicPresets = () => {
  const today = new Date();

  const formatDate = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  const todayStr = formatDate(today);

  // Yesterday
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  return [
    { label: "Today", date: todayStr },
    { label: "Yesterday", date: formatDate(yesterday) },
  ];
};

const PRESETS = getDynamicPresets();

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const UncoveredOutletFilters = ({
  date,
  onDateChange,
  onClearFilters,
  onSearch,
  isLoading,
  uniqueZones = [],
  selectedAreaId,
  onAreaChange,
  sortOrder,
  onSortChange,
}) => {
  const hasActiveFilters = !!date;

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
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();

  const paddingDays = Array(firstDayOfWeek).fill(null);
  const monthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const getDayString = (year, month, day) => {
    const mm = String(month + 1).padStart(2, "0");
    const dd = String(day).padStart(2, "0");
    return `${year}-${mm}-${dd}`;
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  const handleDayClick = (dateStr) => {
    onDateChange(dateStr);
    setIsOpen(false);
  };

  return (
    <Card className="p-2 sm:p-2 border border-[var(--color-border)] shadow-sm bg-white overflow-visible mb-6 w-fit">
      <div className="flex flex-col gap-4">
        {/* Filters Grid */}
        <div className="flex justify-start items-center gap-2 w-fit">
          <div className="space-y-1.5 relative">
            <div
              onClick={() => setIsOpen(!isOpen)}
              className={`flex items-center gap-1.5 sm:gap-2 bg-zinc-50 border rounded-xl px-4 py-2.5 shadow-2xs hover:border-zinc-400 transition-all cursor-pointer ${
                isOpen
                  ? "border-[var(--color-primary)] bg-white ring-1 ring-[var(--color-primary)]"
                  : "border-zinc-200"
              }`}
            >
              <Calendar size={16} className="text-indigo-800/70 shrink-0" />
              <span
                className={`text-xs sm:text-sm font-semibold select-none flex-1 truncate ${date ? "text-zinc-900" : "text-zinc-400"}`}
              >
                {date ? formatDateLabel(date) : "Select Date"}
              </span>
            </div>
            {/* Dropdown Calendar Panel */}
            {isOpen && (
              <>
                <div
                  className="fixed inset-0 z-30"
                  onClick={() => setIsOpen(false)}
                />
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
                    {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                      <div key={d} className="py-1">
                        {d}
                      </div>
                    ))}
                  </div>

                  {/* Days grid */}
                  <div className="grid grid-cols-7 text-center text-xs font-semibold">
                    {paddingDays.map((_, i) => (
                      <div key={`pad-${i}`} className="py-2" />
                    ))}
                    {monthDays.map((day) => {
                      const dateStr = getDayString(
                        currentYear,
                        currentMonth,
                        day,
                      );
                      const isSelected = date === dateStr;

                      let cellClass =
                        "py-2 cursor-pointer transition-colors relative flex items-center justify-center h-8 sm:h-9 rounded-full ";
                      let innerClass =
                        "w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full ";

                      if (isSelected) {
                        cellClass += "bg-indigo-50 text-indigo-800";
                        innerClass +=
                          "bg-indigo-800 text-white font-extrabold shadow-sm";
                      } else {
                        innerClass +=
                          "text-[var(--color-text-main)] hover:bg-zinc-100";
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
                      onClick={() => onDateChange("")}
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

          <div className="h-6 w-px bg-[var(--color-border)] hidden sm:block"></div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none select-none">
            {/* Region/Area selector */}
            <div className="relative shrink-0">
              <select
                value={selectedAreaId}
                onChange={(e) => onAreaChange && onAreaChange(e.target.value)}
                className="appearance-none pl-4 pr-9 py-2 bg-zinc-50 border border-[var(--color-border)] rounded-xl text-xs sm:text-sm font-semibold text-[var(--color-text-main)] shadow-2xs outline-none focus:border-[var(--color-primary)] transition-all cursor-pointer hover:border-zinc-400"
              >
                <option value="All">All Areas</option>
                {uniqueZones?.map((area) => (
                  <option key={area.id} value={area.id}>
                    {area.name}
                  </option>
                ))}
              </select>
              <ArrowRight
                size={14}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] pointer-events-none rotate-90"
              />
            </div>

            {/* Sort Order */}
            <div className="relative shrink-0">
              <select
                value={sortOrder}
                onChange={(e) => onSortChange && onSortChange(e.target.value)}
                className="appearance-none pl-9 pr-9 py-2 bg-zinc-50 border border-[var(--color-border)] rounded-xl text-xs sm:text-sm font-semibold text-[var(--color-text-main)] shadow-2xs outline-none focus:border-[var(--color-primary)] transition-all cursor-pointer hover:border-zinc-400"
              >
                <option value="default">Default Sort</option>
                <option value="recent-visit">Most Recent Visit</option>
                <option value="avg-desc">Value (High-Low)</option>
                <option value="avg-asc">Value (Low-High)</option>
                <option value="site-asc">Site (A-Z)</option>
                <option value="site-desc">Site (Z-A)</option>
                <option value="sr-asc">Employee (A-Z)</option>
                <option value="sr-desc">Employee (Z-A)</option>
              </select>
              <RotateCcw size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] pointer-events-none" />
              <ArrowRight size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] pointer-events-none rotate-90" />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 ml-auto pl-2">
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
                  ? "bg-indigo-900/50 text-indigo-100 cursor-not-allowed border border-indigo-900/20"
                  : "bg-indigo-800 hover:bg-indigo-900 text-white hover:shadow-lg cursor-pointer border border-indigo-900/50"
              }`}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {/* Searching... */}
                </span>
              ) : (
                <span className="flex items-center gap-1.5">
                  {/* <span>Search</span> */}
                  <Search size={14} className="stroke-[3px]" />
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default UncoveredOutletFilters;
