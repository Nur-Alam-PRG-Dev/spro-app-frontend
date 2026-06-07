'use client';

import Link from 'next/link';
import React, { useState, useEffect, Suspense, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Card from '@/components/ui/Card';
import UncoveredOutletFilters from '@/components/Reports/UncoveredOutletFilters';
import {
  ChevronRight, ChevronLeft, Store, MapPin, Phone, FileSpreadsheet, AlertTriangle, ArrowUpDown, User,
  ChevronDown, Calendar, Info
} from 'lucide-react';

function UncoveredOutletContent() {
  const searchParams = useSearchParams();

  // Local state to store dataset from API
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Filters State

  const [date, setDate] = useState('2026-06-04');

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
      
      if (resData.status === 'success' && resData.data) {
        setData(resData.data);
      } else {
        setData([]);
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
      return matchesArea && matchesRole;
    });

    list.sort((a, b) => {
      if (sortOrder === 'avg-asc') return (a.avg_3_month_order || 0) - (b.avg_3_month_order || 0);
      if (sortOrder === 'avg-desc') return (b.avg_3_month_order || 0) - (a.avg_3_month_order || 0);
      if (sortOrder === 'site-asc') return (a.site_name || '').localeCompare(b.site_name || '');
      if (sortOrder === 'site-desc') return (b.site_name || '').localeCompare(a.site_name || '');
      if (sortOrder === 'sr-asc') return (a.aemp_name || '').localeCompare(b.aemp_name || '');
      if (sortOrder === 'sr-desc') return (b.aemp_name || '').localeCompare(a.aemp_name || '');
      return 0; // default
    });

    return list;
  }, [data, selectedAreaId, selectedRole, sortOrder]);

  // Handle Pagination changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedAreaId, selectedRole, sortOrder]);

  const paginatedList = React.useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredList.slice(startIndex, startIndex + pageSize);
  }, [filteredList, currentPage, pageSize]);

  const maxOrder = React.useMemo(() => {
    return Math.max(...filteredList.map(o => parseFloat(o.avg_3_month_order) || 0), 1);
  }, [filteredList]);

  const paginationControls = filteredList.length > 0 && (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4 mb-4">
      <div className="flex items-center gap-2 text-xs font-bold text-[var(--color-text-muted)]">
        <span>View</span>
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setCurrentPage(1);
          }}
          className="bg-zinc-50 border border-zinc-200 rounded-lg px-2 py-1 outline-none focus:border-emerald-500 cursor-pointer text-zinc-800"
        >
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
        <span>per page</span>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="p-1.5 rounded-lg border border-zinc-200 text-zinc-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-50 cursor-pointer"
        >
          <ChevronLeft size={16} />
        </button>
        <span className="text-xs font-bold text-[var(--color-text-main)] px-2">
          Page {currentPage} of {Math.ceil(filteredList.length / pageSize) || 1}
        </span>
        <button
          onClick={() => setCurrentPage(p => Math.min(Math.ceil(filteredList.length / pageSize), p + 1))}
          disabled={currentPage === Math.ceil(filteredList.length / pageSize) || Math.ceil(filteredList.length / pageSize) === 0}
          className="p-1.5 rounded-lg border border-zinc-200 text-zinc-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-50 cursor-pointer"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 pb-10">
      {/* ─── Breadcrumbs ─── */}
      <div className="hidden lg:block">
        <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] font-semibold mb-2">
          <Link href="/" className="hover:text-[var(--color-text-main)] transition-colors">Dashboard</Link>
          <ChevronRight size={12} className="text-[var(--color-text-muted)]" />
          <Link href="/reports" className="hover:text-[var(--color-text-main)] transition-colors">Reports</Link>
          <ChevronRight size={12} className="text-[var(--color-text-muted)]" />
          <span className="text-[var(--color-text-main)] font-bold">Uncovered Outlets</span>
        </div>
      </div>

      <UncoveredOutletFilters
        date={date}
        onDateChange={setDate}
        onClearFilters={handleClearFilters}
        onSearch={handleSearch}
        isLoading={loading}
      />

      {error && (
        <Card className="p-4 border border-rose-100 bg-rose-50 rounded-2xl flex items-center gap-3 text-xs sm:text-sm font-semibold text-rose-700 hover:border-rose-100">
          <Info size={16} className="shrink-0 text-rose-600" />
          <span>{error}</span>
        </Card>
      )}

      {loading && !data && (
        <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
          <div className="w-12 h-12 rounded-full border-4 border-emerald-100 border-t-emerald-800 animate-spin" />
          <span className="text-sm font-bold text-[var(--color-text-muted)]">Loading API data...</span>
        </div>
      )}

      {!loading && !error && data && (
        <>
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
                value={selectedAreaId}
                onChange={(e) => setSelectedAreaId(e.target.value)}
                className="appearance-none flex items-center gap-2 pl-4 pr-9 py-2 bg-white border border-[var(--color-border)] rounded-full text-xs font-bold text-[var(--color-text-main)] shadow-2xs outline-none cursor-pointer focus:border-[var(--color-primary)] transition-colors"
              >
                <option value="All">All Areas</option>
                {uniqueZones.map((zone) => (
                  <option key={zone.id} value={zone.id}>
                    {zone.name}
                  </option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] pointer-events-none" />
            </div>

            {/* Role Selector pill */}
            <div className="relative shrink-0">
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="appearance-none flex items-center gap-2 pl-4 pr-9 py-2 bg-white border border-[var(--color-border)] rounded-full text-xs font-bold text-[var(--color-text-main)] shadow-2xs outline-none cursor-pointer focus:border-[var(--color-primary)] transition-colors"
              >
                <option value="All">All Roles</option>
                {uniqueRoles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] pointer-events-none" />
            </div>

            {/* Sort pill */}
            <div className="relative shrink-0">
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="appearance-none flex items-center gap-2 pl-9 pr-9 py-2 bg-white border border-[var(--color-border)] rounded-full text-xs font-bold text-[var(--color-text-main)] shadow-2xs outline-none cursor-pointer focus:border-[var(--color-primary)] transition-colors"
              >
                <option value="default">Default Sort</option>
                <option value="avg-desc">High Value First</option>
                <option value="avg-asc">Low Value First</option>
                <option value="site-asc">Site Name (A-Z)</option>
                <option value="site-desc">Site Name (Z-A)</option>
                <option value="sr-asc">Employee Name (A-Z)</option>
                <option value="sr-desc">Employee Name (Z-A)</option>
              </select>
              <ArrowUpDown size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] pointer-events-none" />
              <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] pointer-events-none" />
            </div>
          </div>

          {/* ─── Active List Title/Updated Label ─── */}
          <div className="flex items-center justify-between text-[10px] sm:text-xs font-black tracking-wider uppercase text-[var(--color-text-muted)] mt-2">
            <span>Active List ({filteredList.length})</span>
            <span>Updated 5 Mins Ago</span>
          </div>

          {paginationControls}

          {/* ─── Cards Grid (Desktop: 3 Column, Mobile: Stacked) ─── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {paginatedList.map((outlet, index) => {
              const orderValue = parseFloat(outlet.avg_3_month_order) || 0;
              const barWidth = `${Math.min(100, (orderValue / maxOrder) * 100)}%`;

              return (
                <Card key={`${outlet.site_id}-${outlet.aemp_id}-${index}`} className="p-5 flex flex-col justify-between" hoverable={true}>
                  <div>
                    {/* Header section inside card */}
                    <div className="flex items-start justify-between border-b border-[var(--color-border)] pb-3.5 mb-4">
                      <div className="flex items-center gap-3.5 min-w-0">
                        {/* Rounded Green icon box */}
                        <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-100 flex items-center justify-center shrink-0">
                          <Store size={20} />
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-extrabold text-sm sm:text-base text-[var(--color-text-main)] truncate leading-tight mb-1" title={outlet.site_name}>
                            {outlet.site_name}
                          </h4>
                          <span className="inline-flex items-center gap-1 text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
                            <User size={10} />
                            {outlet.role}: {outlet.aemp_name}
                          </span>
                        </div>
                      </div>

                      {/* Top-Right Badge */}
                      <div className="w-7 h-7 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100 font-extrabold text-sm shrink-0">
                        !
                      </div>
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
                          <span>{outlet.last_visit_date === 'NOT FOUND' ? 'Never' : outlet.last_visit_date}</span>
                        </div>
                        {outlet.last_visit_date === 'NOT FOUND' && (
                          <span className="block text-[10px] text-rose-600 font-semibold">
                            Critical Alert
                          </span>
                        )}
                      </div>

                      {/* Monthly Average details */}
                      <div className="space-y-1">
                        <span className="block text-[9px] font-bold text-[var(--color-text-muted)] tracking-wider uppercase">
                          Monthly Order Avg.
                        </span>
                        <div className="flex items-center gap-1 text-xs font-black text-slate-800">
                          <span className="text-[var(--color-text-muted)]">৳</span>
                          <span>{outlet.avg_3_month_order}</span>
                        </div>
                        {/* Infographic progress bar */}
                        <div className="w-full bg-zinc-100 rounded-full h-1.5 mt-1 overflow-hidden" title="Relative Order Volume">
                          <div 
                            className="bg-emerald-500 h-full rounded-full transition-all duration-500 ease-out" 
                            style={{ width: barWidth }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Buttons */}
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    <a 
                      href={`https://maps.google.com/?q=${outlet.geo_lat},${outlet.geo_lon}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-1.5 py-2.5 px-3 border border-emerald-800 text-emerald-800 rounded-xl text-xs font-black hover:bg-emerald-50 transition-all select-none cursor-pointer"
                    >
                      <MapPin size={14} />
                      Locate
                    </a>
                    <a 
                      href={`tel:${outlet.aemp_mob1 || outlet.aemp_dtsm}`}
                      className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-emerald-800 text-white rounded-xl text-xs font-black hover:bg-emerald-700 transition-all select-none cursor-pointer"
                    >
                      <Phone size={14} />
                      Contact
                    </a>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* ─── Detailed List Section on MOBILE ─── */}
          <div className="block md:hidden space-y-3 mt-6">
            <span className="block text-[10px] font-black tracking-wider uppercase text-[var(--color-text-muted)] mb-1">
              Detailed List
            </span>
            <Card className="p-0 overflow-hidden" hoverable={false}>
              <div className="divide-y divide-[var(--color-border)]">
                {paginatedList.map((outlet, index) => (
                  <div key={`${outlet.site_id}-${outlet.aemp_id}-${index}`} className="p-4 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <h4 className="font-extrabold text-sm text-[var(--color-text-main)] truncate leading-tight">
                        {outlet.site_name}
                      </h4>
                      <span className="block text-[10px] text-[var(--color-text-muted)] font-semibold mt-1">
                        {outlet.role}: {outlet.aemp_name}
                      </span>
                    </div>
                    <ChevronRight size={16} className="text-[var(--color-text-muted)] shrink-0" />
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {paginationControls}
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
