'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import AmolnamaFilters from '@/components/Reports/AmolnamaFilters';
import {
  ChevronRight,
  Calendar,
  SlidersHorizontal,
  Plus,
  Maximize2,
  TrendingUp,
  ShoppingCart,
  Clock,
  Home,
  ShoppingBag,
  MoreVertical,
  Building2,
  MapPin,
  ChevronDown,
  CalendarCheck,
  Clock9,
  Info
} from 'lucide-react';

function AmolnamaContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q')?.toLowerCase() || '';

  // State management
  const [activeSubTab, setActiveSubTab] = useState('Thana Wise');
  const [activeActivityTab, setActiveActivityTab] = useState('All Activities');
  const [isMapExpanded, setIsMapExpanded] = useState(false);
  const [employeeSearch, setEmployeeSearch] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleClearFilters = () => {
    setEmployeeSearch('');
    setStartDate('');
    setEndDate('');
  };

  // Mock data matching the screenshots
  const supervisor = {
    id: 'INK00634',
    name: 'Abhijit Mukharjee'
  };

  const reportingDate = 'May 02, 2026';

  const dailySummary = [
    {
      title: 'Activity Day',
      value: '26',
      subText: 'Total Working Days',
      icon: Calendar,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-700'
    },
    {
      title: 'First Activity',
      value: '08:45 AM',
      subText: 'LAST: 06:12 PM',
      icon: Clock,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-700'
    },
    {
      title: 'Total Retail ACT',
      value: '124',
      subText: 'Orders processed today',
      icon: ShoppingCart,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-700'
    },
    {
      title: 'AVG Retail ACT',
      value: '124',
      subText: 'Orders processed today',
      icon: ShoppingCart,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-700'
    },
    {
      title: 'Other Activities',
      value: '124',
      subText: 'Orders processed today',
      icon: CalendarCheck,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-700'
    },
    {
      title: 'AVG TTS',
      value: '124',
      subText: 'Orders processed today',
      icon: Clock9,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-700'
    },
    {
      title: 'Daily TTS',
      value: '124',
      subText: 'Orders processed today',
      icon: Clock9,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-700'
    },
  ];

  const currentStart = startDate || '2026-06-03';
  const currentEnd = endDate || '2026-06-06';

  const getPreviousPeriod = (startStr, endStr) => {
    if (!startStr || !endStr) {
      return { start: '2026-05-03', end: '2026-05-06' };
    }
    const s = new Date(startStr);
    const e = new Date(endStr);

    const prevStart = new Date(s.getFullYear(), s.getMonth() - 1, s.getDate());
    const prevEnd = new Date(e.getFullYear(), e.getMonth() - 1, e.getDate());

    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    return {
      start: formatDate(prevStart),
      end: formatDate(prevEnd)
    };
  };

  const prevPeriod = getPreviousPeriod(currentStart, currentEnd);

  const getTooltipAlignment = (index, totalCols = 4) => {
    const colIndex = index % totalCols;
    if (colIndex === 0) {
      return 'left-0 origin-bottom-left';
    }
    if (colIndex === totalCols - 1) {
      return 'right-0 origin-bottom-right';
    }
    return 'left-1/2 -translate-x-1/2';
  };

  const getTooltipArrowAlignment = (index, totalCols = 4) => {
    const colIndex = index % totalCols;
    if (colIndex === 0) {
      return 'left-3';
    }
    if (colIndex === totalCols - 1) {
      return 'right-3';
    }
    return 'left-1/2 -translate-x-1/2';
  };

  const visitedSummaryMetrics = [
    {
      label: 'TOTAL OUTLETS',
      description: 'Total outlets for the supervisor and their team',
      value: '0'
    },
    {
      label: 'TOTAL VISITS',
      description: 'Total outlet visits by selected staff including repeats',
      value: '0'
    },
    {
      label: 'UNIQUE VISITS',
      description: 'Unique outlets visited by the selected staff',
      value: '0'
    },
    {
      label: 'VISIT COVERAGE',
      description: 'Unique visit ÷ Total olt',
      value: '0.00%'
    },
    {
      label: 'NO. OF ORDERS',
      description: 'Total orders from visited outlets',
      value: '0'
    },
    {
      label: 'ORDER VALUE',
      description: 'Total order amount',
      value: '0'
    },
    {
      label: 'DEL. AMOUNT',
      description: 'Total delivered amount',
      value: '0'
    },
    {
      label: 'LPC',
      description: 'Lines per call',
      value: '0'
    }
  ];

  const coverageDetails = {
    'Thana Wise': { visited: 12, pending: 48, total: 60, pct: 25 },
    'Zone Wise': { visited: 8, pending: 22, total: 30, pct: 27 },
    'District Wise': { visited: 3, pending: 7, total: 10, pct: 30 }
  };

  const keyLocations = [
    {
      name: 'Hira store',
      icon: Home,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-700',
      time: 'Last visited at 12:26 • 20m ago'
    },
    {
      name: 'Mayer Doa Pharmacy',
      icon: ShoppingBag,
      iconBg: 'bg-sky-50',
      iconColor: 'text-sky-700',
      time: 'Last visited at 11:45 • 1h ago'
    }
  ];

  const recentActivities = [
    {
      id: 'EMP00241',
      name: 'Kamal Hossain',
      avatar: 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp',
      location: 'Green Road Pharmacy, Zone B',
      time: '01:15 PM',
      date: '2026-05-02',
      status: 'COMPLETED'
    },
    {
      id: 'EMP00318',
      name: 'Rahim Ali',
      avatar: 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp',
      location: 'Central Plaza Mart, Zone A',
      time: '12:50 PM',
      date: '2026-05-02',
      status: 'COMPLETED'
    },
    {
      id: 'EMP00429',
      name: 'Selim Reza',
      avatar: 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp',
      location: 'North Point Store, Zone C',
      time: '12:30 PM',
      date: '2026-05-03',
      status: 'IN PROGRESS'
    },
    {
      id: 'EMP00102',
      name: 'Abul Kalam',
      avatar: 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp',
      location: 'Dhanmondi Pharmacy, Zone A',
      time: '10:00 AM',
      date: '2026-05-04',
      status: 'COMPLETED'
    },
    {
      id: 'EMP00550',
      name: 'Nural Amin',
      avatar: 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp',
      location: 'Banani Drug House, Zone D',
      time: '04:15 PM',
      date: '2026-05-05',
      status: 'COMPLETED'
    }
  ];

  // Filtering based on search query, employee search, and date range
  const filteredActivities = recentActivities.filter(activity => {
    const headerMatch = !query ||
      activity.name.toLowerCase().includes(query) ||
      activity.location.toLowerCase().includes(query) ||
      activity.status.toLowerCase().includes(query);

    const employeeMatch = !employeeSearch ||
      activity.name.toLowerCase().includes(employeeSearch.toLowerCase()) ||
      activity.id.toLowerCase().includes(employeeSearch.toLowerCase());

    let dateMatch = true;
    if (startDate) {
      dateMatch = dateMatch && activity.date >= startDate;
    }
    if (endDate) {
      dateMatch = dateMatch && activity.date <= endDate;
    }

    return headerMatch && employeeMatch && dateMatch;
  });

  const activeCoverage = coverageDetails[activeSubTab];

  return (
    <div className="space-y-6 pb-10">
      {/* ─── Breadcrumbs ─── */}
      <div className="hidden lg:block">
        <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] font-semibold mb-2">
          <Link href="/" className="hover:text-[var(--color-text-main)] transition-colors">Dashboard</Link>
          <ChevronRight size={12} className="text-[var(--color-text-muted)]" />
          <Link href="/reports" className="hover:text-[var(--color-text-main)] transition-colors">Reports</Link>
          <ChevronRight size={12} className="text-[var(--color-text-muted)]" />
          <span className="text-[var(--color-text-main)] font-bold">Amolnama</span>
        </div>
      </div>

      {/* ─── Header Section ─── */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Title */}
        <div className="hidden lg:block">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[var(--color-text-main)] tracking-tight">
            Amolnama
          </h1>
          <p className="text-xs sm:text-sm text-[var(--color-text-muted)] font-medium mt-1">
            Daily operational intelligence report
          </p>
        </div>

        {/* Supervisor details card on MOBILE */}

        {/*<div className="block lg:hidden">
          <Card className="p-4" hoverable={false}>
            <span className="block text-[10px] font-black text-[var(--color-text-muted)] tracking-wider uppercase mb-3">
              Supervisor Details
            </span>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-1 border-b border-[var(--color-border)] pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[var(--color-primary)] flex items-center justify-center border border-emerald-100 shadow-2xs">
                    <Building2 size={18} />
                  </div>
                  <span className="text-sm font-bold text-emerald-800">
                    {supervisor.id} - {supervisor.name}
                  </span>
                </div>
                <ChevronDown size={18} className="text-emerald-800" />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[var(--color-primary)] flex items-center justify-center border border-emerald-100 shadow-2xs">
                    <Calendar size={18} />
                  </div>
                  <span className="text-sm font-bold text-emerald-800">{reportingDate}</span>
                </div>
                <button className="p-2 bg-emerald-50/50 hover:bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-800 cursor-pointer">
                  <SlidersHorizontal size={16} />
                </button>
              </div>
            </div>
          </Card>
        </div>*/}


        {/* Supervisor details selector on DESKTOP */}

        {/* <div className="hidden lg:flex items-center gap-4 select-none">
          <div className="flex items-center gap-3 bg-white border border-[var(--color-border)] rounded-2xl px-5 py-2.5 shadow-sm min-w-[320px]">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[var(--color-primary)] flex items-center justify-center border border-emerald-100">
              <Building2 size={18} />
            </div>
            <div className="flex-1">
              <span className="block text-[9px] font-bold text-[var(--color-text-muted)] tracking-wider uppercase leading-none mb-1">
                Supervisor
              </span>
              <span className="text-sm font-extrabold text-[var(--color-text-main)]">
                {supervisor.id} - {supervisor.name}
              </span>
            </div>
            <ChevronDown size={18} className="text-emerald-800 cursor-pointer" />
          </div>
          <div className="flex items-center gap-3 bg-white border border-[var(--color-border)] rounded-2xl px-5 py-2.5 shadow-sm min-w-[260px]">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[var(--color-primary)] flex items-center justify-center border border-emerald-100">
              <Calendar size={18} />
            </div>
            <div className="flex-1">
              <span className="block text-[9px] font-bold text-[var(--color-text-muted)] tracking-wider uppercase leading-none mb-1">
                Reporting Date
              </span>
              <span className="text-sm font-extrabold text-[var(--color-text-main)]">{reportingDate}</span>
            </div>
            <SlidersHorizontal size={18} className="text-emerald-800 cursor-pointer hover:text-emerald-600 transition-colors ml-2" />
          </div>
        </div> */}
      </div>

      {/* ─── Search and Date Range Filters ─── */}
      <AmolnamaFilters
        employeeSearch={employeeSearch}
        onEmployeeSearchChange={setEmployeeSearch}
        startDate={startDate}
        onStartDateChange={setStartDate}
        endDate={endDate}
        onEndDateChange={setEndDate}
        onClearFilters={handleClearFilters}
      />

      {/* ─── Daily Summary ─── */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-extrabold text-sm text-[var(--color-text-main)]">Daily Summary</h3>
          <button className="text-xs font-bold text-[var(--color-primary)] hover:underline">View Detailed</button>
        </div>

        {/* Responsive Row (Horizontal scroll on mobile, grid on desktop) */}
        <div className="flex lg:grid lg:grid-cols-4 xl:grid-cols-7 gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 scrollbar-none snap-x">
          {dailySummary.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Card
                key={idx}
                className="p-5 flex items-center gap-4 min-w-[240px] lg:min-w-0 flex-1 snap-start"
                hoverable={true}
              >
                <div className={`w-11 h-11 rounded-2xl ${item.iconBg} ${item.iconColor} flex items-center justify-center shrink-0 border border-black/5`}>
                  <Icon size={20} />
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-[var(--color-text-muted)] tracking-wider uppercase leading-none mb-1">
                    {item.title}
                  </span>
                  <h2 className="text-2xl font-black text-[var(--color-text-main)] tracking-tight leading-none mb-1.5">
                    {item.value}
                  </h2>
                  <span className="block text-[10px] text-[var(--color-text-muted)] font-semibold leading-none">
                    {item.subText}
                  </span>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* ─── Columns Section (Visited Summary & Live Area) ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left 2-Columns on Desktop: Visited Summary & Tab contents */}
        <div className="lg:col-span-2 space-y-6">

          {/* Visited Summary Header & Sub-header (Mobile only) */}
          <div className="block lg:hidden space-y-2">
            <h3 className="font-extrabold text-base text-[var(--color-text-main)]">Visited Summary</h3>
            <div className="text-xs font-black tracking-wider text-[var(--color-text-muted)] uppercase">
              Outlet Performance
            </div>
          </div>

          {/* Mobile metrics list: compact 2-column grid */}
          <div className="lg:hidden grid grid-cols-3 gap-2">
            {visitedSummaryMetrics.map((m, idx) => (
              <div
                key={idx}
                tabIndex={0}
                className="relative group flex flex-col justify-between p-2.5 bg-white border border-[var(--color-border)] rounded-xl shadow-2xs hover:shadow-xs focus:outline-none active:bg-zinc-50 transition-all duration-200 cursor-pointer select-none"
              >
                <div className="flex items-center justify-between gap-1 mb-0.5">
                  <span className="text-[9px] font-bold text-zinc-500 tracking-wider uppercase truncate">
                    {m.label}
                  </span>
                  <Info size={10} className="text-zinc-400 group-hover:text-zinc-600 group-focus-within:text-zinc-600 shrink-0" />
                </div>
                <span className="text-lg font-black tracking-tight text-[var(--color-text-main)]">
                  {m.value}
                </span>

                {/* Tooltip bubble */}
                <div className={`absolute bottom-full mb-1.5 w-40 p-2 bg-zinc-900 text-[10px] text-white font-medium rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible pointer-events-none text-center leading-tight transition-all duration-200 z-50 ${getTooltipAlignment(idx, 2)}`}>
                  {m.description}
                  <div className={`absolute top-full border-4 border-transparent border-t-zinc-900 ${getTooltipArrowAlignment(idx, 2)}`} />
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Numeric Distribution (ND) Section */}
          <div className="block lg:hidden mt-4">
            <span className="text-xs font-black tracking-wider text-[var(--color-text-muted)] uppercase">
              Numeric Distribution (ND)
            </span>
          </div>

          {/* Mobile Numeric Distribution: High density 3-column layout */}
          <div className="lg:hidden grid grid-cols-3 gap-2">
            {/* Current Period */}
            <div className="p-2 bg-white border border-[var(--color-border)] rounded-xl flex flex-col justify-between">
              <span className="block text-[8px] font-black text-zinc-500 uppercase tracking-wider leading-none mb-0.5">
                Current Period
              </span>
              <span className="block text-[9px] font-semibold text-zinc-400 mb-1 leading-none">
                {currentStart} &rarr; {currentEnd}
              </span>
              <h4 className="text-xs font-black text-[var(--color-text-main)] leading-none mt-1">
                0 <span className="text-[9px] font-bold text-[var(--color-text-muted)]">Sites</span>
              </h4>
            </div>

            {/* Previous Period */}
            <div className="p-2 bg-white border border-[var(--color-border)] rounded-xl flex flex-col justify-between">
              <span className="block text-[8px] font-black text-zinc-500 uppercase tracking-wider leading-none mb-0.5">
                Prev Period
              </span>
              <span className="block text-[9px] font-semibold text-zinc-400 mb-1 leading-none">
                {prevPeriod.start} &rarr; {prevPeriod.end}
              </span>
              <h4 className="text-xs font-black text-[var(--color-text-main)] leading-none mt-1">
                0 <span className="text-[9px] font-bold text-[var(--color-text-muted)]">Sites</span>
              </h4>
            </div>

            {/* ND */}
            <div className="p-2 bg-white border border-[var(--color-border)] rounded-xl flex flex-col justify-between items-center text-center">
              <span className="text-[8px] font-black text-zinc-500 uppercase tracking-wider leading-none mb-2">
                ND
              </span>
              <span className="text-sm font-black text-[var(--color-text-main)] leading-none">
                0
              </span>
            </div>
          </div>

          {/* Desktop Single Card View */}
          <Card className="hidden lg:block p-0 overflow-hidden" hoverable={false}>
            {/* Card Header */}
            <div className="px-6 py-4.5 border-b border-[var(--color-border)] flex items-center justify-between">
              <h3 className="font-extrabold text-base text-[var(--color-text-main)]">Visited Summary</h3>
              <a href="#" className="text-xs font-bold text-[var(--color-primary)] hover:underline">
                View Detailed Log
              </a>
            </div>

            {/* Outlet Performance Sub-Header */}
            <div className="px-6 py-3 bg-zinc-50/50 border-b border-[var(--color-border)]">
              <span className="text-xs font-black tracking-wider text-[var(--color-text-muted)] uppercase">
                Outlet Performance
              </span>
            </div>

            {/* 2x4 Metric Grid */}
            <div className="grid grid-cols-4 border-b border-[var(--color-border)]">
              {visitedSummaryMetrics.map((m, idx) => (
                <div
                  key={idx}
                  tabIndex={0}
                  className={`p-5 border-r border-b border-[var(--color-border)] relative group focus:outline-none transition-colors hover:bg-zinc-50/50 ${(idx + 1) % 4 === 0 ? 'border-r-0' : ''
                    } ${idx >= 4 ? 'border-b-0' : ''}`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="block text-xs font-bold text-zinc-500 tracking-wider uppercase">
                      {m.label}
                    </span>
                    <Info size={12} className="text-zinc-400 group-hover:text-zinc-600 group-focus-within:text-zinc-600 shrink-0" />
                  </div>
                  <h3 className="text-2xl font-black tracking-tight text-[var(--color-text-main)]">
                    {m.value}
                  </h3>

                  {/* Tooltip bubble */}
                  <div className={`absolute bottom-full mb-2 w-52 p-2.5 bg-zinc-900 text-[11px] text-white font-medium rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible pointer-events-none text-center normal-case leading-snug transition-all duration-200 z-50 ${getTooltipAlignment(idx, 4)}`}>
                    {m.description}
                    <div className={`absolute top-full border-4 border-transparent border-t-zinc-900 ${getTooltipArrowAlignment(idx, 4)}`} />
                  </div>
                </div>
              ))}
            </div>

            {/* Numeric Distribution (ND) Sub-Header */}
            <div className="px-6 py-3 bg-zinc-50/50 border-b border-[var(--color-border)]">
              <span className="text-xs font-black tracking-wider text-[var(--color-text-muted)] uppercase">
                Numeric Distribution (ND)
              </span>
            </div>

            {/* ND Column Grid */}
            <div className="grid grid-cols-3 divide-x divide-[var(--color-border)]">
              {/* Current Period */}
              <div className="p-6">
                <span className="block text-[10px] font-bold text-zinc-500 tracking-wider uppercase mb-1">
                  Current Period
                </span>
                <span className="block text-xs font-semibold text-[var(--color-text-muted)] mb-2">
                  {currentStart} &rarr; {currentEnd}
                </span>
                <h3 className="text-xl font-black text-[var(--color-text-main)]">
                  0 <span className="text-xs font-bold text-[var(--color-text-muted)]">Unique Sites</span>
                </h3>
              </div>

              {/* Previous Period */}
              <div className="p-6">
                <span className="block text-[10px] font-bold text-zinc-500 tracking-wider uppercase mb-1">
                  Previous Period
                </span>
                <span className="block text-xs font-semibold text-[var(--color-text-muted)] mb-2">
                  {prevPeriod.start} &rarr; {prevPeriod.end}
                </span>
                <h3 className="text-xl font-black text-[var(--color-text-main)]">
                  0 <span className="text-xs font-bold text-[var(--color-text-muted)]">Unique Sites</span>
                </h3>
              </div>

              {/* ND */}
              <div className="p-6 flex flex-col justify-center">
                <span className="block text-[10px] font-bold text-zinc-500 tracking-wider uppercase mb-1">
                  ND
                </span>
                <h3 className="text-3xl font-black text-[var(--color-text-main)]">
                  0
                </h3>
              </div>
            </div>
          </Card>

          {/* ─── Thana / Zone / District Tabs Section ─── */}
          <Card className="p-5 sm:p-6" hoverable={false}>
            {/* Tab Selectors */}
            <div className="flex border-b border-[var(--color-border)] mb-5">
              {['Thana Wise', 'Zone Wise', 'District Wise'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveSubTab(tab)}
                  className={`pb-3.5 px-4 font-bold text-xs sm:text-sm border-b-2 transition-all ${activeSubTab === tab
                    ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
                    : 'border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]'
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Counts list */}
            <div className="space-y-4 mb-6">
              {/* Visited */}
              <div className="flex items-center justify-between text-xs sm:text-sm font-bold">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                  <span className="text-[var(--color-text-main)]">Visited {activeSubTab.split(' ')[0]}</span>
                </div>
                <span className="text-base font-black text-[var(--color-text-main)]">
                  {activeCoverage.visited}
                </span>
              </div>

              {/* Pending */}
              <div className="flex items-center justify-between text-xs sm:text-sm font-bold">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
                  <span className="text-[var(--color-text-main)]">Pending {activeSubTab.split(' ')[0]}</span>
                </div>
                <span className="text-base font-black text-[var(--color-text-main)]">
                  {activeCoverage.pending}
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="w-full h-2.5 bg-zinc-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                  style={{ width: `${activeCoverage.pct}%` }}
                />
              </div>
              <div className="flex justify-between items-center text-[10px] sm:text-xs font-bold text-[var(--color-text-muted)]">
                <span>{activeCoverage.pct}% Coverage Achieved</span>
                <span>Target: {activeCoverage.total} Locations</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Right 1-Column: Live Area Coverage */}
        <div className="space-y-6">
          <Card className="p-0 overflow-hidden flex flex-col justify-between" hoverable={false}>
            {/* Header */}
            <div className="px-5 py-4 border-b border-[var(--color-border)] flex items-center justify-between bg-white">
              <h3 className="font-extrabold text-sm sm:text-base text-[var(--color-text-main)]">
                Live Area Coverage
              </h3>
              <div className="flex items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[9px] font-black bg-rose-50 text-rose-600 border border-rose-100 uppercase tracking-wider animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
                  Live
                </span>
                <button
                  onClick={() => setIsMapExpanded(!isMapExpanded)}
                  className="p-1 hover:bg-emerald-50 rounded-lg text-emerald-800 cursor-pointer"
                >
                  <Maximize2 size={16} />
                </button>
              </div>
            </div>

            {/* Map image display (Responsive desktop/mobile image toggle) */}
            <div className="relative aspect-[4/3] bg-zinc-950 overflow-hidden flex items-center justify-center">
              {/* Desktop Map (glowing green lines) */}
              <img
                src="/map_desktop.png"
                alt="Desktop Area Coverage map"
                className="hidden md:block w-full h-full object-cover"
              />
              {/* Mobile Map (isometric blue blocks) */}
              <img
                src="/map_mobile.png"
                alt="Mobile Area Coverage map"
                className="block md:hidden w-full h-full object-cover"
              />

              {/* Floating Pulse pin on mobile layout */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none md:hidden">
                <div className="relative flex items-center justify-center">
                  <div className="absolute w-8 h-8 rounded-full bg-sky-400/30 animate-ping" />
                  <MapPin size={28} className="text-sky-400 drop-shadow-md relative z-10 stroke-[2.5px]" />
                </div>
              </div>
            </div>

            {/* Locations Listing */}
            <div className="p-5 space-y-4">
              <div className="flex items-center justify-between text-[10px] sm:text-xs font-black tracking-wider uppercase text-[var(--color-text-muted)] border-b border-[var(--color-border)] pb-2.5">
                <span>Key Locations</span>
                <span className="text-[var(--color-primary)] font-black cursor-pointer hover:underline">
                  Last Three Visited Sites
                </span>
              </div>

              {/* List */}
              <div className="space-y-3">
                {keyLocations.map((loc, idx) => {
                  const Icon = loc.icon;
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-3.5 p-3 rounded-2xl bg-zinc-50 border border-[var(--color-border)]"
                    >
                      <div className={`w-10 h-10 rounded-xl ${loc.iconBg} ${loc.iconColor} flex items-center justify-center shrink-0 border border-black/5`}>
                        <Icon size={18} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-extrabold text-xs sm:text-sm text-[var(--color-text-main)] truncate">
                          {loc.name}
                        </h4>
                        <p className="text-[10px] text-[var(--color-text-muted)] font-semibold mt-0.5">
                          {loc.time}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Add tagged location button */}
              <button className="w-full py-3.5 text-xs font-black border border-dashed border-emerald-200 bg-white text-emerald-800 hover:bg-emerald-50/20 hover:border-emerald-300 transition-colors select-none cursor-pointer">
                + Add Tagged Location
              </button>
            </div>
          </Card>
        </div>
      </div>

    </div>
  );
}

export default function AmolnamaPage() {
  return (
    <Suspense fallback={<div className="h-64 bg-zinc-50 border border-[var(--color-border)] rounded-2xl animate-pulse" />}>
      <AmolnamaContent />
    </Suspense>
  );
}
