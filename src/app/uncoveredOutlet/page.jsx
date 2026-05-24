'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import apiData from '@/dummyData/uncoveredOutlets.json';
import {
  ArrowLeft,
  ChevronRight,
  Search,
  SlidersHorizontal,
  Building2,
  Store,
  ShoppingBag,
  MapPin,
  Phone,
  FileSpreadsheet,
  AlertTriangle,
  History,
  Plus,
  ArrowUpDown,
  User,
  ChevronDown,
  Calendar
} from 'lucide-react';

function UncoveredOutletContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q')?.toLowerCase() || '';

  // Local state to store dataset from "data" API
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedArea, setSelectedArea] = useState('All Areas');
  const [selectedSR, setSelectedSR] = useState('All');
  const [sortOrder, setSortOrder] = useState('default'); // 'default', 'avg-asc', 'avg-desc', 'overdue'

  useEffect(() => {
    fetch('/api/data')
      .then((res) => {
        if (!res.ok) throw new Error('API Error');
        return res.json();
      })
      .then((payload) => {
        setData(payload);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load from API data:', err);
        // Fallback to static dummy data on failure or static generation
        setData(apiData);
        setLoading(false);
      });
  }, []);

  // Map icons helper
  const getIcon = (type) => {
    switch (type) {
      case 'building':
        return Building2;
      case 'store':
        return Store;
      case 'bag':
        return ShoppingBag;
      default:
        return Store;
    }
  };

  if (loading || !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="w-12 h-12 rounded-full border-4 border-emerald-100 border-t-emerald-800 animate-spin" />
        <span className="text-sm font-bold text-[var(--color-text-muted)]">Loading API data...</span>
      </div>
    );
  }

  // Filter and sort logic
  const filteredList = data.activeList.filter((outlet) => {
    // 1. Search filter
    const matchesSearch =
      outlet.name.toLowerCase().includes(searchQuery) ||
      outlet.srName.toLowerCase().includes(searchQuery) ||
      outlet.region.toLowerCase().includes(searchQuery);

    // 2. Area/Region filter
    const matchesArea = selectedArea === 'All Areas' || outlet.region === selectedArea;

    // 3. SR filter
    const matchesSR = selectedSR === 'All' || outlet.srName === selectedSR;

    return matchesSearch && matchesArea && matchesSR;
  }).sort((a, b) => {
    if (sortOrder === 'avg-asc') {
      return parseFloat(a.monthlyOrderAvg.replace(/,/g, '')) - parseFloat(b.monthlyOrderAvg.replace(/,/g, ''));
    }
    if (sortOrder === 'avg-desc') {
      return parseFloat(b.monthlyOrderAvg.replace(/,/g, '')) - parseFloat(a.monthlyOrderAvg.replace(/,/g, ''));
    }
    return 0; // Default order
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">

      {/* ─── Breadcrumbs ─── */}
      <div className="hidden lg:block">
        <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] font-semibold mb-2">
          <a href="/" className="hover:text-[var(--color-text-main)] transition-colors">Dashboard</a>
          <ChevronRight size={12} className="text-[var(--color-text-muted)]" />
          <a href="/reports" className="hover:text-[var(--color-text-main)] transition-colors">Reports</a>
          <ChevronRight size={12} className="text-[var(--color-text-muted)]" />
          <span className="text-[var(--color-text-main)] font-bold">Uncovered Outlets</span>
        </div>
      </div>

      {/* ─── Target Summary Section ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Title / Summary */}
        <Card className="flex items-center justify-between p-4 sm:p-5 w-full sm:max-w-md" hoverable={false}>
          <div className="space-y-1">
            <span className="block text-[10px] font-black text-[var(--color-text-muted)] tracking-wider uppercase">
              Target Summary
            </span>
            <div className="flex items-center gap-3">
              <h2 className="text-3xl sm:text-4xl font-black text-[var(--color-text-main)] tracking-tight leading-none">
                {filteredList.length}
              </h2>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 bg-rose-50 border border-rose-100 px-2 py-0.5 rounded-md uppercase tracking-wide">
                <AlertTriangle size={12} className="stroke-[2.5px]" />
                Outlets Uncovered
              </span>
            </div>
          </div>

          {/* Green spreadsheet export button */}
          <button className="w-10 h-10 rounded-xl bg-emerald-800 text-white flex items-center justify-center shadow-md hover:bg-emerald-700 transition-colors shrink-0 cursor-pointer">
            <FileSpreadsheet size={20} />
          </button>
        </Card>
      </div>

      {/* ─── Filter Pills Section ─── */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none select-none">

        {/* Region/Area selector pill */}
        <div className="relative shrink-0">
          <select
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.target.value)}
            className="appearance-none flex items-center gap-2 pl-4 pr-9 py-2 bg-white border border-[var(--color-border)] rounded-full text-xs font-bold text-[var(--color-text-main)] shadow-2xs outline-none cursor-pointer focus:border-[var(--color-primary)] transition-colors"
          >
            {data.areas.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>
          <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] pointer-events-none" />
        </div>

        {/* High Value indicator pill (Active visual toggle) */}
        <button
          onClick={() => setSortOrder(sortOrder === 'avg-desc' ? 'default' : 'avg-desc')}
          className={`flex items-center gap-1.5 px-4 py-2 border rounded-full text-xs font-bold transition-all cursor-pointer ${sortOrder === 'avg-desc'
            ? 'bg-[#004b23] text-white border-[#004b23] shadow-xs'
            : 'bg-white border-[var(--color-border)] text-[var(--color-text-main)] hover:bg-zinc-50'
            }`}
        >
          <span>High Value</span>
          <ChevronDown size={14} />
        </button>

        {/* SR Selector pill */}
        <div className="relative shrink-0">
          <select
            value={selectedSR}
            onChange={(e) => setSelectedSR(e.target.value)}
            className="appearance-none flex items-center gap-2 pl-4 pr-9 py-2 bg-white border border-[var(--color-border)] rounded-full text-xs font-bold text-[var(--color-text-main)] shadow-2xs outline-none cursor-pointer focus:border-[var(--color-primary)] transition-colors"
          >
            <option value="All">By SR</option>
            <option value="Rahman Ali">Rahman Ali</option>
            <option value="Anisur Khan">Anisur Khan</option>
          </select>
          <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] pointer-events-none" />
        </div>

        {/* Sort pill */}
        <button
          onClick={() => setSortOrder(sortOrder === 'avg-asc' ? 'default' : 'avg-asc')}
          className={`flex items-center gap-1.5 px-4 py-2 border rounded-full text-xs font-bold transition-all cursor-pointer shrink-0 ${sortOrder === 'avg-asc'
            ? 'bg-[#004b23] text-white border-[#004b23] shadow-xs'
            : 'bg-white border-[var(--color-border)] text-[var(--color-text-main)] hover:bg-zinc-50'
            }`}
        >
          <ArrowUpDown size={14} />
          <span>Sort</span>
        </button>
      </div>

      {/* ─── Active List Title/Updated Label ─── */}
      <div className="flex items-center justify-between text-[10px] sm:text-xs font-black tracking-wider uppercase text-[var(--color-text-muted)]">
        <span>Active List ({filteredList.length})</span>
        <span>Updated 5 Mins Ago</span>
      </div>

      {/* ─── Cards Grid (Desktop: 3 Column, Mobile: Stacked) ─── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredList.map((outlet) => {
          const Icon = getIcon(outlet.iconType);
          return (
            <Card key={outlet.id} className="p-5 flex flex-col justify-between" hoverable={true}>
              <div>
                {/* Header section inside card */}
                <div className="flex items-start justify-between border-b border-[var(--color-border)] pb-3.5 mb-4">
                  <div className="flex items-center gap-3.5 min-w-0">
                    {/* Rounded Green icon box */}
                    <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-100 flex items-center justify-center shrink-0">
                      <Icon size={20} />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-extrabold text-sm sm:text-base text-[var(--color-text-main)] truncate leading-tight mb-1">
                        {outlet.name}
                      </h4>
                      <span className="inline-flex items-center gap-1 text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
                        <User size={10} />
                        SR: {outlet.srName}
                      </span>
                    </div>
                  </div>

                  {/* Top-Right Badge */}
                  {outlet.badge === 'clock' ? (
                    <div className="w-7 h-7 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100">
                      <History size={14} className="stroke-[2.5px]" />
                    </div>
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100 font-extrabold text-sm">
                      !
                    </div>
                  )}
                </div>

                {/* Card Inner Grid Details */}
                <div className="grid grid-cols-2 gap-4 mb-5">
                  {/* Last Visit details */}
                  <div className="space-y-1">
                    <span className="block text-[9px] font-bold text-[var(--color-text-muted)] tracking-wider uppercase">
                      Last Visit
                    </span>
                    <div className="flex items-center gap-1.5 text-xs font-black text-rose-900">
                      <Calendar size={12} className="text-rose-700" />
                      <span>{outlet.lastVisit}</span>
                    </div>
                    <span className="block text-[10px] text-rose-600 font-semibold">
                      {outlet.lastVisitSubtext}
                    </span>
                  </div>

                  {/* Monthly Average details */}
                  <div className="space-y-1">
                    <span className="block text-[9px] font-bold text-[var(--color-text-muted)] tracking-wider uppercase">
                      Monthly Order Avg.
                    </span>
                    <div className="flex items-center gap-1 text-xs font-black text-slate-800">
                      <span className="text-[var(--color-text-muted)]">₹</span>
                      <span>{outlet.monthlyOrderAvg}</span>
                    </div>
                    <span className={`block text-[10px] font-semibold ${outlet.tagType === 'high' ? 'text-sky-600' :
                      outlet.tagType === 'success' ? 'text-emerald-600' :
                        'text-amber-600'
                      }`}>
                      {outlet.tag}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Buttons */}
              <div className="grid grid-cols-2 gap-3 mt-2">
                <button className="flex items-center justify-center gap-1.5 py-2.5 px-3 border border-emerald-800 text-emerald-800 rounded-xl text-xs font-black hover:bg-emerald-50 transition-all select-none cursor-pointer">
                  <MapPin size={14} />
                  Locate
                </button>
                <button className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-emerald-800 text-white rounded-xl text-xs font-black hover:bg-emerald-700 transition-all select-none cursor-pointer">
                  <Phone size={14} />
                  Contact SR
                </button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* ─── Detailed List Section on MOBILE ─── */}
      <div className="block md:hidden space-y-3">
        <span className="block text-[10px] font-black tracking-wider uppercase text-[var(--color-text-muted)] mb-1">
          Detailed List
        </span>
        <Card className="p-0 overflow-hidden" hoverable={false}>
          <div className="divide-y divide-[var(--color-border)]">
            {filteredList.map((outlet) => (
              <div key={outlet.id} className="p-4 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <h4 className="font-extrabold text-sm text-[var(--color-text-main)] truncate leading-tight">
                    {outlet.name}
                  </h4>
                  <span className="block text-[10px] text-rose-600 font-semibold mt-1">
                    {outlet.lastVisitSubtext}
                  </span>
                </div>
                <ChevronRight size={16} className="text-[var(--color-text-muted)] shrink-0" />
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* ─── Detailed Logs Section on DESKTOP ─── */}
      <Card className="hidden md:block p-0 overflow-hidden" hoverable={false}>
        {/* Header */}
        <div className="px-6 py-5 border-b border-[var(--color-border)] flex items-center justify-between">
          <h3 className="font-extrabold text-base text-[var(--color-text-main)]">
            Detailed Logs
          </h3>
          <button className="flex items-center gap-1.5 bg-emerald-800 text-white py-1.5 px-3 rounded-lg text-xs font-bold hover:bg-emerald-700 transition-colors shadow-2xs cursor-pointer">
            <Plus size={14} />
            <span>Add Log Entry</span>
          </button>
        </div>

        {/* Table of logs */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-zinc-50 border-b border-[var(--color-border)] text-[var(--color-text-muted)] font-black uppercase text-[10px] tracking-wider">
                <th className="px-6 py-4">Outlet Name</th>
                <th className="px-6 py-4">Region</th>
                <th className="px-6 py-4">SR Name</th>
                <th className="px-6 py-4">Last Visit</th>
                <th className="px-6 py-4">Monthly Avg</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {filteredList.length > 0 ? (
                filteredList.map((outlet) => (
                  <tr key={outlet.id} className="hover:bg-zinc-50/50 transition-colors font-semibold text-[var(--color-text-main)]">
                    <td className="px-6 py-4.5 font-extrabold">{outlet.name}</td>
                    <td className="px-6 py-4.5 text-[var(--color-text-muted)]">{outlet.region}</td>
                    <td className="px-6 py-4.5 text-[var(--color-text-muted)]">{outlet.srName}</td>
                    <td className="px-6 py-4.5 text-rose-600 font-bold">{outlet.lastVisit}</td>
                    <td className="px-6 py-4.5 font-extrabold">₹{outlet.monthlyOrderAvg}</td>
                    <td className="px-6 py-4.5 text-right">
                      <button className="text-xs font-bold text-emerald-800 hover:underline cursor-pointer">
                        more...
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-xs font-semibold text-[var(--color-text-muted)]">
                    No matching logs found.
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

export default function UncoveredOutletPage() {
  return (
    <Suspense fallback={<div className="h-64 bg-zinc-50 border border-[var(--color-border)] rounded-2xl animate-pulse" />}>
      <UncoveredOutletContent />
    </Suspense>
  );
}
