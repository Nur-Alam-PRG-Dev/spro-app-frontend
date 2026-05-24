'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
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
  ChevronDown
} from 'lucide-react';

function AmolnamaContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q')?.toLowerCase() || '';

  // State management
  const [activeSubTab, setActiveSubTab] = useState('Thana Wise');
  const [activeActivityTab, setActiveActivityTab] = useState('All Activities');
  const [isMapExpanded, setIsMapExpanded] = useState(false);

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
      title: 'Total Orders',
      value: '142',
      subText: 'Orders processed today',
      icon: ShoppingCart,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-700'
    }
  ];

  const visitedSummaryMetrics = [
    { label: 'Total Outlets', value: '1,940' },
    { label: 'Total Visits', value: '9' },
    { label: 'Unique Visits', value: '8' },
    { label: 'Visit Coverage', value: '0.41%' },
    { label: 'No. of Orders', value: '0' },
    { label: 'Order Value', value: '0' },
    { label: 'ND', value: '-23', isNegative: true },
    { label: 'Del. Amount', value: '0' }
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
      name: 'Kamal Hossain',
      avatar: 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp',
      location: 'Green Road Pharmacy, Zone B',
      time: '01:15 PM',
      status: 'COMPLETED'
    },
    {
      name: 'Rahim Ali',
      avatar: 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp',
      location: 'Central Plaza Mart, Zone A',
      time: '12:50 PM',
      status: 'COMPLETED'
    },
    {
      name: 'Selim Reza',
      avatar: 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp',
      location: 'North Point Store, Zone C',
      time: '12:30 PM',
      status: 'IN PROGRESS'
    }
  ];

  // Filtering based on search query
  const filteredActivities = recentActivities.filter(activity =>
    activity.name.toLowerCase().includes(query) ||
    activity.location.toLowerCase().includes(query) ||
    activity.status.toLowerCase().includes(query)
  );

  const activeCoverage = coverageDetails[activeSubTab];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* ─── Breadcrumbs ─── */}
      <div className="hidden lg:block">
        <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] font-semibold mb-2">
          <a href="/" className="hover:text-[var(--color-text-main)] transition-colors">Dashboard</a>
          <ChevronRight size={12} className="text-[var(--color-text-muted)]" />
          <a href="/reports" className="hover:text-[var(--color-text-main)] transition-colors">Reports</a>
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
        <div className="block lg:hidden">
          <Card className="p-4" hoverable={false}>
            <span className="block text-[10px] font-black text-[var(--color-text-muted)] tracking-wider uppercase mb-3">
              Supervisor Details
            </span>
            <div className="space-y-4">
              {/* Supervisor Info */}
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

              {/* Reporting Date / Filter */}
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
        </div>

        {/* Supervisor details selector on DESKTOP */}
        <div className="hidden lg:flex items-center gap-4 select-none">
          {/* Supervisor Card */}
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

          {/* Date Selector Card */}
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
        </div>
      </div>

      {/* ─── Daily Summary ─── */}
      <div>
        <div className="flex items-center justify-between mb-3 lg:hidden">
          <h3 className="font-extrabold text-sm text-[var(--color-text-main)]">Daily Summary</h3>
          <button className="text-xs font-bold text-[var(--color-primary)] hover:underline">View Detailed</button>
        </div>

        {/* Responsive Row (Horizontal scroll on mobile, grid on desktop) */}
        <div className="flex lg:grid lg:grid-cols-4 gap-4 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 scrollbar-none snap-x">
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

          {/* Growth Status (visible as column 4 on desktop, hidden or placed on mobile) */}
          <div className="min-w-[240px] lg:min-w-0 flex-1 snap-start">
            <Card
              className="p-5 bg-[#003d1c] border-none text-white flex items-start gap-4 h-full"
              hoverable={true}
            >
              <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                <TrendingUp size={20} className="text-emerald-400" />
              </div>
              <div className="space-y-1">
                <span className="block text-[10px] font-bold text-emerald-300 tracking-wider uppercase leading-none">
                  Growth Status
                </span>
                <h2 className="text-2xl font-black tracking-tight leading-none text-white">
                  +12.4%
                </h2>
                <p className="text-[10px] text-emerald-100 font-medium leading-normal mt-1.5">
                  Performance exceeded monthly targets by 26% in this region.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* ─── Columns Section (Visited Summary & Live Area) ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2-Columns on Desktop: Visited Summary & Tab contents */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Visited Summary Header (Mobile only, desktop uses card header) */}
          <div className="block lg:hidden">
            <h3 className="font-extrabold text-sm text-[var(--color-text-main)] mb-3">Visited Summary</h3>
          </div>

          {/* Mobile metrics list: separate cards. Desktop metrics list: single card 2x4 grid */}
          <div className="lg:hidden grid grid-cols-2 gap-3">
            {visitedSummaryMetrics.map((m, idx) => (
              <Card key={idx} className="p-4 flex flex-col justify-between" hoverable={false}>
                <span className="text-[10px] font-bold text-[var(--color-text-muted)] tracking-wider uppercase mb-1.5 block">
                  {m.label}
                </span>
                <span className={`text-xl font-black tracking-tight ${m.isNegative ? 'text-red-500' : 'text-slate-800'}`}>
                  {m.value}
                </span>
              </Card>
            ))}
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

            {/* 2x4 Metric Grid */}
            <div className="grid grid-cols-4 border-b border-[var(--color-border)]">
              {visitedSummaryMetrics.map((m, idx) => (
                <div
                  key={idx}
                  className={`p-6 border-r border-b border-[var(--color-border)] last:border-r-0 ${
                    idx >= 4 ? 'border-b-0' : ''
                  } ${
                    (idx + 1) % 4 === 0 ? 'border-r-0' : ''
                  }`}
                >
                  <span className="block text-[10px] font-extrabold text-[var(--color-text-muted)] tracking-wider uppercase mb-1">
                    {m.label}
                  </span>
                  <h3 className={`text-xl sm:text-2xl font-black tracking-tight ${
                    m.isNegative ? 'text-rose-600' : 'text-[var(--color-text-main)]'
                  }`}>
                    {m.value}
                  </h3>
                </div>
              ))}
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
                  className={`pb-3.5 px-4 font-bold text-xs sm:text-sm border-b-2 transition-all ${
                    activeSubTab === tab
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

      {/* ─── Recent Field Activities ─── */}
      <Card className="p-0 overflow-hidden" hoverable={false}>
        {/* Header */}
        <div className="px-6 py-5 border-b border-[var(--color-border)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h3 className="font-extrabold text-base text-[var(--color-text-main)]">
            Recent Field Activities
          </h3>
          <div className="flex bg-zinc-100 dark:bg-zinc-300 p-0.5 rounded-xl self-start select-none">
            {['All Activities', 'Alerts Only'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveActivityTab(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-colors ${
                  activeActivityTab === tab
                    ? 'bg-white text-[var(--color-text-main)] shadow-sm'
                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Table representation */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-zinc-50 border-b border-[var(--color-border)] text-[var(--color-text-muted)] font-black uppercase text-[10px] tracking-wider">
                <th className="px-6 py-4">Staff Name</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Time</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {filteredActivities.length > 0 ? (
                filteredActivities.map((act, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/10 transition-colors font-semibold text-[var(--color-text-main)]"
                  >
                    {/* Name / Avatar */}
                    <td className="px-6 py-4.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full overflow-hidden border border-[var(--color-border)] shrink-0 bg-zinc-200">
                          <img
                            src={act.avatar}
                            alt={act.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="font-extrabold text-[var(--color-text-main)] truncate">
                          {act.name}
                        </span>
                      </div>
                    </td>
                    {/* Location */}
                    <td className="px-6 py-4.5 text-[var(--color-text-muted)] truncate max-w-[200px] sm:max-w-xs">
                      {act.location}
                    </td>
                    {/* Time */}
                    <td className="px-6 py-4.5 text-[var(--color-text-muted)]">{act.time}</td>
                    {/* Status Badge */}
                    <td className="px-6 py-4.5">
                      {act.status === 'COMPLETED' ? (
                        <Badge type="target">Completed</Badge>
                      ) : (
                        <span className="inline-flex items-center justify-center bg-emerald-50 text-emerald-700 font-semibold text-[10px] sm:text-xs px-2.5 py-0.5 rounded-full uppercase tracking-wide">
                          In Progress
                        </span>
                      )}
                    </td>
                    {/* Action button */}
                    <td className="px-6 py-4.5 text-right">
                      <button className="p-1.5 hover:bg-emerald-50 rounded-lg text-emerald-800 transition-colors cursor-pointer">
                        <MoreVertical size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-xs font-semibold text-[var(--color-text-muted)]">
                    No matching activity logs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
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
