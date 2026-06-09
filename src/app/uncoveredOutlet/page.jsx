'use client';

import Link from 'next/link';
import React, { useState, useEffect, Suspense, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Card from '@/components/ui/Card';
import UncoveredOutletFilters from '@/components/Reports/UncoveredOutletFilters';
import {
  ChevronRight, ChevronLeft, Store, MapPin, Phone, FileSpreadsheet, AlertTriangle, ArrowUpDown, User,
  ChevronDown, Calendar, Info, Search
} from 'lucide-react';

import AreaChartWidget from '@/components/ui/AreaChartWidget';
import UncoveredOutletCard from '@/components/Reports/UncoveredOutletCard';
import PageSpinner from '@/components/ui/PageSpinner';

function UncoveredOutletContent() {
  const searchParams = useSearchParams();

  // Local state to store dataset from API
  const [data, setData] = useState(null);
  const [summaryData, setSummaryData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Filters State

  const [date, setDate] = useState(() => {
    // Current date in YYYY-MM-DD
    const now = new Date();
    // Use local time for timezone to get current day correctly
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().split('T')[0];
  });
  const searchQuery = searchParams.get('q') || '';

  // Active UI filters
  const [selectedAreaId, setSelectedAreaId] = useState('All');
  const [selectedRole, setSelectedRole] = useState('All');
  const [sortOrder, setSortOrder] = useState('default'); // 'default', 'avg-asc', 'avg-desc', 'site-asc', 'site-desc', 'sr-asc', 'sr-desc'

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const abortControllerRef = useRef(null);

  const handleClearFilters = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }

    setDate('');
    setData(null);
    setSummaryData(null);
    setError(null);
    setLoading(false);
    setCurrentPage(1);
  };

  const handleSearch = async () => {
    if (!date) {
      setData(null);
      setError('Please select a Date to search.');
      return;
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();
    const { signal } = abortControllerRef.current;

    setLoading(true);
    setError(null);
    setData(null);
    setSummaryData(null);
    try {
      const userStr = localStorage.getItem('spro_user');
      if (!userStr) {
        throw new Error('User session not found. Please log in again.');
      }
      const user = JSON.parse(userStr);

      const response = await fetch('/api/unvisitedOutlet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          aemp_id: user.aemp_usnm,
          role_id: user.role_id,
          country_id: user.cont_id || 2,
          date: date
        }),
        signal
      });

      if (!response.ok) throw new Error('Failed to load unvisited outlets.');
      const resData = await response.json();

      if (resData.status === 'success') {
        setData(resData.data || []);
        if (resData.summary) {
          setSummaryData(resData.summary);
        }
      } else {
        setData([]);
        setSummaryData(null);
      }
    } catch (err) {
      if (err.name === 'AbortError') return;
      console.error('API Error:', err);
      setError(err.message);
      setData(null);
    } finally {
      setLoading(false);
      setCurrentPage(1); // Reset page on new search
    }
  };

  // Initially fetch data on mount
  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Compute unique filters
  const uniqueZones = React.useMemo(() => {
    if (!data) return [];
    const map = new Map();
    data.forEach(item => {
      if (item.zone_id && item.zone_name) {
        map.set(item.zone_id, item.zone_name);
      }
    });
    return Array.from(map.entries()).map(([id, name]) => ({ id, name }));
  }, [data]);

  const uniqueRoles = React.useMemo(() => {
    if (!data) return [];
    const set = new Set();
    data.forEach(item => {
      if (item.role) set.add(item.role);
    });
    return Array.from(set);
  }, [data]);

  // Apply filters and sort
  const filteredList = React.useMemo(() => {
    if (!data) return [];
    let list = data.filter(outlet => {
      const matchesArea = selectedAreaId === 'All' || outlet.zone_id?.toString() === selectedAreaId;
      const matchesRole = selectedRole === 'All' || outlet.role === selectedRole;
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = !searchQuery ||
        (outlet.site_name && outlet.site_name.toLowerCase().includes(searchLower)) ||
        (outlet.aemp_name && outlet.aemp_name.toLowerCase().includes(searchLower));

      return matchesArea && matchesRole && matchesSearch;
    });

    list.sort((a, b) => {
      if (sortOrder === 'recent-visit') {
        const dateA = a.last_visit_date === 'NOT FOUND' ? 0 : new Date(a.last_visit_date).getTime() || 0;
        const dateB = b.last_visit_date === 'NOT FOUND' ? 0 : new Date(b.last_visit_date).getTime() || 0;
        return dateB - dateA;
      }
      if (sortOrder === 'avg-asc') return (a.avg_3_month_order || 0) - (b.avg_3_month_order || 0);
      if (sortOrder === 'avg-desc') return (b.avg_3_month_order || 0) - (a.avg_3_month_order || 0);
      if (sortOrder === 'site-asc') return (a.site_name || '').localeCompare(b.site_name || '');
      if (sortOrder === 'site-desc') return (b.site_name || '').localeCompare(a.site_name || '');
      if (sortOrder === 'sr-asc') return (a.aemp_name || '').localeCompare(b.aemp_name || '');
      if (sortOrder === 'sr-desc') return (b.aemp_name || '').localeCompare(a.aemp_name || '');
      return 0; // default
    });

    return list;
  }, [data, selectedAreaId, selectedRole, sortOrder, searchQuery]);

  // Handle Pagination changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedAreaId, selectedRole, sortOrder, searchQuery]);

  const paginatedList = React.useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredList.slice(startIndex, startIndex + pageSize);
  }, [filteredList, currentPage, pageSize]);

  const maxOrder = React.useMemo(() => {
    return Math.max(...filteredList.map(o => parseFloat(o.avg_3_month_order) || 0), 1);
  }, [filteredList]);

  const paginationControls = (
    <div className="flex flex-row items-center justify-between gap-4 mt-2 mb-4 w-full">
      {/* Active List Count Area */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50/80 rounded-full border border-indigo-100/50 backdrop-blur-sm shadow-sm shrink-0">
        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
        <span className="text-[11px] md:text-xs font-extrabold text-indigo-800 tracking-wide">
          {filteredList.length} Outlets
        </span>
      </div>

      {/* Pagination Area */}
      <div className="flex items-center gap-2 sm:gap-4 shrink-0 bg-white/50 px-3 py-1.5 rounded-full border border-zinc-200/50 backdrop-blur-sm shadow-sm">
        <div className="hidden sm:flex items-center gap-1.5 text-[11px] md:text-xs font-semibold text-zinc-500">
          <span>Show</span>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="bg-transparent font-bold text-zinc-800 outline-none cursor-pointer hover:text-indigo-600 transition-colors"
          >
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>

        <div className="w-px h-4 bg-zinc-200 hidden sm:block"></div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="w-6 h-6 flex items-center justify-center rounded-full text-zinc-600 hover:bg-indigo-50 hover:text-indigo-600 disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="text-[11px] md:text-xs font-bold text-zinc-800 min-w-[3rem] text-center">
            {currentPage} <span className="text-zinc-400 font-medium">/</span> {Math.ceil(filteredList.length / pageSize) || 1}
          </span>
          <button
            onClick={() => setCurrentPage(p => Math.min(Math.ceil(filteredList.length / pageSize), p + 1))}
            disabled={currentPage === Math.ceil(filteredList.length / pageSize) || Math.ceil(filteredList.length / pageSize) === 0}
            className="w-6 h-6 flex items-center justify-center rounded-full text-zinc-600 hover:bg-indigo-50 hover:text-indigo-600 disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-all"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 pb-10">
      {/* ─── Page Title & Filters Row ─── */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-4 md:mb-6">
        <div className="hidden xl:block shrink-0">
          <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] font-semibold mb-1">
            <Link href="/" className="hover:text-[var(--color-text-main)] transition-colors">Dashboard</Link>
            <ChevronRight size={12} className="text-[var(--color-text-muted)]" />
            <Link href="/reports" className="hover:text-[var(--color-text-main)] transition-colors">Reports</Link>
          </div>
          <h1 className="text-2xl font-black text-[var(--color-text-main)] tracking-tight">Uncovered Outlets</h1>
        </div>

        <div className="flex-1 flex xl:justify-end w-full z-40">
          <UncoveredOutletFilters
            date={date}
            onDateChange={setDate}
            onClearFilters={handleClearFilters}
            onSearch={handleSearch}
            isLoading={loading}
            uniqueZones={uniqueZones}
            selectedAreaId={selectedAreaId}
            onAreaChange={setSelectedAreaId}
            sortOrder={sortOrder}
            onSortChange={setSortOrder}
          />
        </div>
      </div>

      {error && (
        <Card className="p-4 border border-rose-100 bg-rose-50 rounded-2xl flex items-center gap-3 text-xs lg:text-sm font-semibold text-rose-700 hover:border-rose-100">
          <Info size={16} className="shrink-0 text-rose-600" />
          <span>{error}</span>
        </Card>
      )}

      {loading && (
        <PageSpinner 
          message="Loading Outlets..." 
          subMessage="Gathering logistics intelligence" 
        />
      )}

      {!loading && !error && data && (
        <>
          {/* ─── Summary Metrics & Infographic ─── */}
          {summaryData && (
            <div className="flex flex-col md:flex-row gap-2 md:gap-3 mb-3 md:mb-4">
              {/* Left Side: Number Metrics & Progress (Horizontal on all screens) */}
              <div className="w-full md:w-[40%] xl:w-[35%] flex shrink-0">
                <Card className="flex-1 p-3 xl:p-4 flex flex-col justify-between bg-gradient-to-br from-white to-zinc-50/80 border border-zinc-200/60 shadow-sm hover:shadow-md transition-all rounded-2xl relative overflow-hidden">

                  {/* Decorative Gradient Blob */}
                  <div className="absolute -top-12 -right-12 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none"></div>

                  {/* Top Section: Title & Planned */}
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-sm font-extrabold text-[var(--color-text-main)] leading-tight">Coverage Overview</h3>
                      <p className="text-[10px] text-[var(--color-text-muted)] font-medium leading-tight mt-0.5">Total Route Targets</p>
                    </div>
                    <div className="text-right bg-white/60 px-2.5 py-1 rounded-lg border border-zinc-100 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.05)] backdrop-blur-sm">
                      <span className="block text-[8px] font-black text-zinc-500 tracking-widest uppercase mb-0.5">Planned</span>
                      <h2 className="text-sm sm:text-base font-black text-zinc-800 leading-none tracking-tight">
                        {summaryData.total_planned.toLocaleString()}
                      </h2>
                    </div>
                  </div>

                  {/* Middle Section: Metrics */}
                  <div className="flex justify-between items-end mb-3 sm:mb-4 px-1">
                    <div className="flex flex-col">
                      <span className="flex items-center gap-1.5 text-[9px] font-black text-indigo-700 tracking-wider uppercase mb-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_6px_rgba(16,185,129,0.6)]"></div>
                        Visited
                      </span>
                      <div className="flex items-baseline gap-1.5">
                        <h2 className="text-xl sm:text-2xl font-black text-indigo-600 leading-none tracking-tighter">
                          {summaryData.visited_count.toLocaleString()}
                        </h2>
                        <span className="text-[10px] font-bold text-indigo-600/70">
                          {((summaryData.visited_count / (summaryData.total_planned || 1)) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col text-right items-end">
                      <span className="flex items-center gap-1.5 text-[9px] font-black text-rose-700 tracking-wider uppercase mb-1.5">
                        Uncovered
                        <div className="w-1.5 h-1.5 rounded-full bg-rose-500 shadow-[0_0_6px_rgba(244,63,94,0.6)]"></div>
                      </span>
                      <div className="flex items-baseline gap-1.5 flex-row-reverse">
                        <h2 className="text-xl sm:text-2xl font-black text-rose-600 leading-none tracking-tighter">
                          {summaryData.unvisited_count.toLocaleString()}
                        </h2>
                        <span className="text-[10px] font-bold text-rose-600/70">
                          {((summaryData.unvisited_count / (summaryData.total_planned || 1)) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Section: Progress Bar */}
                  <div className="w-full bg-zinc-100 rounded-full h-2.5 overflow-hidden flex shadow-inner relative border border-zinc-200/50">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-400 to-indigo-500 transition-all duration-1000 relative"
                      style={{ width: `${(summaryData.visited_count / (summaryData.total_planned || 1)) * 100}%` }}
                    >
                      <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.15)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem]"></div>
                    </div>
                    <div
                      className="h-full bg-gradient-to-r from-rose-400 to-rose-500 transition-all duration-1000"
                      style={{ width: `${(summaryData.unvisited_count / (summaryData.total_planned || 1)) * 100}%` }}
                    />
                  </div>
                </Card>
              </div>

              {/* Right Side: Area Chart (Hidden on mobile, side-by-side with metrics on md+) */}
              <div className="hidden md:flex w-full md:w-[60%] xl:w-[65%] gap-2 md:gap-3">
                <Card className="flex-1 p-3 xl:p-4 hover:shadow-lg transition-shadow bg-gradient-to-bl from-white to-sky-50/30 border border-sky-100/50 rounded-2xl" hoverable={true}>
                  <AreaChartWidget
                    title="Order Volume"
                    subtitle={`Monthly Avg Orders (Showing ${paginatedList.length} outlets on this page)`}
                    dataKey="Order Value"
                    xAxisKey="name"
                    color="#0ea5e9"
                    data={paginatedList.map(o => ({
                      name: o.site_name,
                      'Order Value': parseFloat(o.avg_3_month_order) || 0
                    }))}
                  />
                </Card>
              </div>
            </div>
          )}

          {data.length > 0 ? (
            <div className="mb-2 md:mb-3">
              {paginationControls}
            </div>
          ) : null}

          {/* ─── Cards Grid (Desktop: 3 Column, Mobile: Stacked) ─── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {paginatedList.map((outlet, index) => (
              <UncoveredOutletCard
                key={`${outlet.site_id}-${outlet.aemp_id}-${index}`}
                outlet={outlet}
                maxOrder={maxOrder}
              />
            ))}
          </div>

          {data.length > 0 ? (
            <div className="flex justify-end mt-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-1.5 rounded-lg border border-[var(--color-border)] bg-white text-[var(--color-text-main)] shadow-2xs disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-50 transition-colors cursor-pointer"
                >
                  <ChevronLeft size={16} />
                </button>
                <span className="text-xs font-bold text-[var(--color-text-main)] px-2 select-none">
                  Page {currentPage} of {Math.ceil(filteredList.length / pageSize) || 1}
                </span>
                <button
                  onClick={() => setCurrentPage(p => Math.min(Math.ceil(filteredList.length / pageSize), p + 1))}
                  disabled={currentPage === Math.ceil(filteredList.length / pageSize) || Math.ceil(filteredList.length / pageSize) === 0}
                  className="p-1.5 rounded-lg border border-[var(--color-border)] bg-white text-[var(--color-text-main)] shadow-2xs disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-50 transition-colors cursor-pointer"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          ) : null}
        </>
      )}
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
