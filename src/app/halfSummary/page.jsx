'use client';

import React, { useState, useEffect, Suspense, useRef } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import OverallSummaryView from '@/components/HalfSummary/OverallSummaryView';
import TeamWiseView from '@/components/HalfSummary/TeamWiseView';
import AmolnamaFilters from '@/components/Reports/AmolnamaFilters';
import { Info, User, Loader2 } from 'lucide-react';
import Card from '@/components/ui/Card';

function HalfSummaryContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const abortControllerRef = useRef(null);

  // Selected tab: 'overall' or 'team'
  const initialTab = searchParams.get('tab') || 'overall';
  const [activeTab, setActiveTab] = useState(initialTab);

  const [startDate, setStartDate] = useState(() => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().split('T')[0];
  });
  const [endDate, setEndDate] = useState(() => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().split('T')[0];
  });

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expandedRep, setExpandedRep] = useState(null);

  const handleClearFilters = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setStartDate('');
    setEndDate('');
    setData(null);
    setError(null);
    setLoading(false);
  };

  // Synchronize state when tab search parameter changes
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && (tab === 'overall' || tab === 'team')) {
      if (activeTab !== tab) {
        setActiveTab(tab);
      }
    }
  }, [searchParams, activeTab]);

  // Fetch half summary metrics
  const handleSearch = async () => {
    if (!startDate || !endDate) {
      setData(null);
      setError('Please select Date Range to search.');
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

      const basePayload = {
        country_id: user.cont_id || 2,
        aemp_id: user.aemp_usnm,
        role_id: user.role_id,
        start_date: startDate,
        end_date: endDate
      };

      const [overallRes, teamWiseRes] = await Promise.all([
        fetch('/api/halfSummary', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...basePayload, report_type: 'overall' }),
          signal
        }),
        fetch('/api/halfSummary', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...basePayload, report_type: 'team_wise' }),
          signal
        })
      ]);

      if (!overallRes.ok || !teamWiseRes.ok) throw new Error('Failed to load half summary report.');

      const overallData = await overallRes.json();
      const teamWiseResponseData = await teamWiseRes.json();

      // Data Transformation
      const teamWiseData = teamWiseResponseData?.receive_data?.team_wise || [];
      const meta = teamWiseResponseData?.receive_data?.meta || {};
      const summaryData = overallData?.receive_data?.summary || {};

      if (teamWiseData.length === 0 && !summaryData.first_half) {
        setData(null);
        setLoading(false);
        return;
      }

      // 1. Transform Team Wise Array
      const mappedReps = teamWiseData.map((rep, index) => ({
        id: rep.sr_id,
        name: rep.sr_name,
        role: "SALES REPRESENTATIVE (SR)",
        initials: (index + 1).toString(),
        serial: index + 1,
        avatarColor: "primary",
        status: "Active",
        statusVariant: "success",
        revenue: (rep.first_half?.order_amount || 0) + (rep.second_half?.order_amount || 0),
        performanceH1: {
          orderAmount: rep.first_half?.order_amount || 0,
          orderAmountChange: rep.first_half?.order_amount_change || 0,
          orderCount: rep.first_half?.order_count || 0,
          visits: rep.first_half?.visit_count || 0,
          productiveOutlets: rep.first_half?.productive_outlets || 0,
          nonProductiveOutlets: rep.first_half?.non_productive_outlets || 0,
          productivity: rep.first_half?.productivity || 0,
          lpc: rep.first_half?.lpc || 0,
          strike: rep.first_half?.strike_rate || 0
        },
        performanceH2: {
          orderAmount: rep.second_half?.order_amount || 0,
          orderAmountChange: rep.second_half?.order_amount_change || 0,
          orderCount: rep.second_half?.order_count || 0,
          visits: rep.second_half?.visit_count || 0,
          productiveOutlets: rep.second_half?.productive_outlets || 0,
          nonProductiveOutlets: rep.second_half?.non_productive_outlets || 0,
          productivity: rep.second_half?.productivity || 0,
          lpc: rep.second_half?.lpc || 0,
          strike: rep.second_half?.strike_rate || 0
        }
      }));

      // 2. Destructure Overall Summary Data directly
      const { first_half: h1 = {}, second_half: h2 = {} } = summaryData;

      const repCount = teamWiseData.length;

      const overallSummary = {
        firstHalf: {
          period: h1.session_name || "AM Session Analysis",
          orderAmount: h1.order_amount || 0,
          orderAmountTrend: h1.order_amount_change || 0,
          targetAchievement: h1.target_achievement || 0,
          orderCount: h1.order_count || 0,
          orderCountTrend: h1.order_count_change || 0,
          visitCount: h1.visit_count || 0,
          visitCountTrend: h1.visit_count_change || 0,
          productiveOutlets: h1.productive_outlets || 0,
          nonProductiveOutlets: h1.non_productive_outlets || 0,
          productivity: h1.productivity || 0,
          productivityLabel: h1.productivity_status || "Avg",
          strikeRate: h1.strike_rate || 0,
          strikeRateLabel: h1.strike_rate_status || "Avg",
          lpc: h1.lpc || 0,
          lpcLabel: "Avg"
        },
        secondHalf: {
          period: h2.session_name || "PM Session Analysis",
          totalVolume: h2.order_amount || 0,
          volumeTrend: h2.order_amount_change || 0,
          targetAchievement: h2.target_achievement || 0,
          orderCount: h2.order_count || 0,
          orderCountTrend: h2.order_count_change || 0,
          visitCount: h2.visit_count || 0,
          visitCountTrend: h2.visit_count_change || 0,
          productiveOutlets: h2.productive_outlets || 0,
          nonProductiveOutlets: h2.non_productive_outlets || 0,
          productivity: h2.productivity || 0,
          productivityLabel: h2.productivity_status || "Avg",
          strikeRate: h2.strike_rate || 0,
          strikeRateLabel: h2.strike_rate_status || "Avg",
          lpc: h2.lpc || 0,
          lpcLabel: "Avg"
        }
      };

      const totalTeamRevenue = (h1.order_amount || 0) + (h2.order_amount || 0);
      const totalOrders = (h1.order_count || 0) + (h2.order_count || 0);
      const avgStrikeRate = (((h1.strike_rate || 0) + (h2.strike_rate || 0)) / 2).toFixed(2);

      // If switching from team tab to overall when team size is < 2
      if (mappedReps.length < 2 && activeTab === 'team') {
        setActiveTab('overall');
      }

      setData({
        lastUpdated: meta.updated_at || "Now",
        fiscalYear: "2026",
        verifiedData: true,
        overallSummary,
        dateRange: `${startDate} to ${endDate}`,
        svName: user.aemp_name || user.aemp_usnm,
        teamSize: repCount,
        teamWise: {
          stats: {
            totalTeamRevenue,
            revenueGrowth: 0,
            totalOrders,
            ordersGrowth: 0,
            activeReps: `${repCount} / ${repCount}`,
            avgStrikeRate
          },
          reps: mappedReps
        }
      });

      if (mappedReps.length > 0) {
        setExpandedRep(mappedReps[0].id);
      }

    } catch (err) {
      if (err.name === 'AbortError') {
        console.log('Search aborted by user');
        return;
      }
      console.error('Failed to load halfSummary API:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Initially fetch data on mount
  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    const params = new URLSearchParams(searchParams);
    params.set('tab', tab);
    router.replace(`${pathname}?${params.toString()}`);
  };

  const toggleRepExpand = (repId) => {
    setExpandedRep(expandedRep === repId ? null : repId);
  };

  // Helper to format currency (rupee / taka)
  const formatCurrency = (val) => {
    if (val === undefined || val === null) return '';
    const str = Math.abs(val).toFixed(2);
    const parts = str.split('.');
    let intPart = parts[0];
    if (intPart.length > 3) {
      const lastThree = intPart.substring(intPart.length - 3);
      const otherParts = intPart.substring(0, intPart.length - 3);
      intPart = otherParts.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThree;
    }
    const formatted = `${intPart}.${parts[1]}`;
    return val < 0 ? `-৳${formatted}` : `৳${formatted}`;
  };

  // Helper to format numbers with commas
  const formatNum = (val) => {
    if (val === undefined || val === null) return '';
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="space-y-6 pb-10">
      {/* ─── Page Title and Tab Switcher Header ─── */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-[var(--color-border)] pb-5">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[var(--color-text-main)] tracking-tight">
            Half Summary Report
          </h1>
          <p className="text-xs sm:text-sm text-[var(--color-text-muted)] font-medium mt-1">
            Performance metrics analysis by session
          </p>
        </div>

        {/* Tab switch pills */}
        <div className="flex bg-zinc-100/80 p-1 rounded-xl self-start md:self-auto shadow-2xs border border-zinc-200/50">
          <button
            onClick={() => handleTabChange('overall')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${activeTab === 'overall'
              ? 'bg-emerald-800 text-white shadow-sm'
              : 'text-zinc-600 hover:text-zinc-900'
              }`}
          >
            Overall Summary
          </button>
          {data && data.teamWise.reps.length >= 2 && (
            <button
              onClick={() => handleTabChange('team')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${activeTab === 'team'
                ? 'bg-emerald-800 text-white shadow-sm'
                : 'text-zinc-600 hover:text-zinc-900'
                }`}
            >
              Team Wise
            </button>
          )}
        </div>
      </div>

      {/* ─── Search and Date Range Filters ─── */}
      <AmolnamaFilters
        startDate={startDate}
        onStartDateChange={setStartDate}
        endDate={endDate}
        onEndDateChange={setEndDate}
        onClearFilters={handleClearFilters}
        onSearch={handleSearch}
        isLoading={loading}
      />

      {/* ─── Error Message ─── */}
      {error && (
        <Card className="p-4 border border-rose-100 bg-rose-50 rounded-2xl flex items-center gap-3 text-xs sm:text-sm font-semibold text-rose-700 hover:border-rose-100">
          <Info size={16} className="shrink-0 text-rose-600" />
          <span>{error}</span>
        </Card>
      )}

      {/* ─── Fancy Spinner Loading ─── */}
      {loading && (
        <Card className="p-12 flex flex-col items-center justify-center space-y-4 border-dashed border-2 border-[var(--color-border)] rounded-2xl bg-zinc-50/20" hoverable={false}>
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-100 rounded-full animate-ping opacity-75" />
            <Loader2 className="w-12 h-12 text-emerald-800 animate-spin relative z-10" />
          </div>
          <span className="text-sm font-extrabold text-[var(--color-text-muted)] animate-pulse tracking-wide">Fetching report metrics...</span>
        </Card>
      )}

      {/* ─── Empty State Placeholder ─── */}
      {!data && !loading && !error && (
        <Card className="p-8 sm:p-12 text-center flex flex-col items-center justify-center border-dashed border-2 border-[var(--color-border)] rounded-2xl bg-zinc-50/20" hoverable={false}>
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center mb-4 border border-emerald-100">
            <User size={32} className="stroke-[1.5px]" />
          </div>
          <h3 className="text-base sm:text-lg font-extrabold text-[var(--color-text-main)] mb-1">
            No Report Data Found
          </h3>
          <p className="text-xs sm:text-sm text-[var(--color-text-muted)] font-medium max-w-sm">
            Search for an employee ID and select a date range to load the Half Summary metrics.
          </p>
        </Card>
      )}

      {/* ─── Render Selected View ─── */}
      {data && !loading && (
        <>
          {activeTab === 'overall' ? (
            <OverallSummaryView
              overallSummary={data.overallSummary}
              fiscalYear={data.fiscalYear}
              verifiedData={data.verifiedData}
              formatCurrency={formatCurrency}
              formatNum={formatNum}
            />
          ) : (
            <TeamWiseView
              teamWise={data.teamWise}
              expandedRep={expandedRep}
              toggleRepExpand={toggleRepExpand}
              formatCurrency={formatCurrency}
              formatNum={formatNum}
              dateRange={data.dateRange}
              svName={data.svName}
              teamSize={data.teamSize}
            />
          )}
        </>
      )}
    </div>
  );
}

export default function HalfSummaryPage() {
  return (
    <Suspense fallback={<div className="h-64 bg-zinc-50 border border-[var(--color-border)] rounded-2xl animate-pulse" />}>
      <HalfSummaryContent />
    </Suspense>
  );
}
