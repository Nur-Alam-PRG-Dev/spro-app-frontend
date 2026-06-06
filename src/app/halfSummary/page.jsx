'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import OverallSummaryView from '@/components/HalfSummary/OverallSummaryView';
import TeamWiseView from '@/components/HalfSummary/TeamWiseView';
import AmolnamaFilters from '@/components/Reports/AmolnamaFilters';
import { Info, User } from 'lucide-react';
import Card from '@/components/ui/Card';

function HalfSummaryContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Selected tab: 'overall' or 'team'
  const initialTab = searchParams.get('tab') || 'overall';
  const [activeTab, setActiveTab] = useState(initialTab);
  
  // Filter States
  const [employeeSearch, setEmployeeSearch] = useState('547943'); // Default demo ID
  const [startDate, setStartDate] = useState('2026-06-04');
  const [endDate, setEndDate] = useState('2026-06-06');
  
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expandedRep, setExpandedRep] = useState(null);

  const handleClearFilters = () => {
    setEmployeeSearch('');
    setStartDate('');
    setEndDate('');
    setData(null);
    setError(null);
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
  useEffect(() => {
    if (!employeeSearch || !startDate || !endDate) {
      setData(null);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const payload = {
          country_id: 26,
          aemp_id: employeeSearch,
          start_date: startDate,
          end_date: endDate,
          report_type: 'team_wise'
        };

        const res = await fetch('/api/halfSummary', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (!res.ok) throw new Error('Failed to load half summary report.');
        
        const responseData = await res.json();
        
        // Data Transformation
        const teamWiseData = responseData?.receive_data?.team_wise || [];
        const meta = responseData?.receive_data?.meta || {};

        if (teamWiseData.length === 0) {
          setData(null);
          setLoading(false);
          return;
        }

        // 1. Transform Team Wise Array
        const mappedReps = teamWiseData.map((rep) => ({
          id: rep.sr_id,
          name: rep.sr_name,
          role: "SALES REPRESENTATIVE (SR)",
          initials: rep.sr_name.charAt(0).toUpperCase(),
          avatarColor: "primary",
          status: "Active",
          statusVariant: "success",
          revenue: (rep.first_half.order_amount || 0) + (rep.second_half.order_amount || 0),
          performanceH1: {
            orderAmount: rep.first_half.order_amount || 0,
            orderCount: rep.first_half.order_count || 0,
            visits: rep.first_half.visit_count || 0,
            productivity: rep.first_half.productivity || 0,
            lpc: rep.first_half.lpc || 0,
            strike: rep.first_half.strike_rate || 0
          },
          performanceH2: {
            orderAmount: rep.second_half.order_amount || 0,
            orderCount: rep.second_half.order_count || 0,
            visits: rep.second_half.visit_count || 0,
            productivity: rep.second_half.productivity || 0,
            lpc: rep.second_half.lpc || 0,
            strike: rep.second_half.strike_rate || 0
          }
        }));

        // 2. Aggregate Overall Summary Data
        let h1OrderAmount = 0, h1OrderCount = 0, h1VisitCount = 0;
        let h2OrderAmount = 0, h2OrderCount = 0, h2VisitCount = 0;
        let totalH1Prod = 0, totalH1Strike = 0, totalH1Lpc = 0;
        let totalH2Prod = 0, totalH2Strike = 0, totalH2Lpc = 0;

        teamWiseData.forEach(rep => {
          h1OrderAmount += rep.first_half.order_amount || 0;
          h1OrderCount += rep.first_half.order_count || 0;
          h1VisitCount += rep.first_half.visit_count || 0;
          totalH1Prod += rep.first_half.productivity || 0;
          totalH1Strike += rep.first_half.strike_rate || 0;
          totalH1Lpc += rep.first_half.lpc || 0;

          h2OrderAmount += rep.second_half.order_amount || 0;
          h2OrderCount += rep.second_half.order_count || 0;
          h2VisitCount += rep.second_half.visit_count || 0;
          totalH2Prod += rep.second_half.productivity || 0;
          totalH2Strike += rep.second_half.strike_rate || 0;
          totalH2Lpc += rep.second_half.lpc || 0;
        });

        const repCount = teamWiseData.length || 1;

        const overallSummary = {
          firstHalf: {
            period: "AM Session",
            orderAmount: h1OrderAmount,
            orderAmountTrend: 0,
            targetAchievement: 0,
            orderCount: h1OrderCount,
            orderCountTrend: 0,
            visitCount: h1VisitCount,
            visitCountTrend: 0,
            productivity: Math.round(totalH1Prod / repCount),
            productivityLabel: "Avg",
            strikeRate: Math.round(totalH1Strike / repCount),
            strikeRateLabel: "Avg",
            lpc: (totalH1Lpc / repCount).toFixed(1),
            lpcLabel: "Avg"
          },
          secondHalf: {
            period: "PM Session",
            totalVolume: h2OrderAmount,
            volumeTrend: 0,
            targetAchievement: 0,
            orderCount: h2OrderCount,
            orderCountTrend: 0,
            visitCount: h2VisitCount,
            visitCountTrend: 0,
            productivity: Math.round(totalH2Prod / repCount),
            productivityLabel: "Avg",
            strikeRate: Math.round(totalH2Strike / repCount),
            strikeRateLabel: "Avg",
            lpc: (totalH2Lpc / repCount).toFixed(1),
            lpcLabel: "Avg"
          }
        };

        const totalTeamRevenue = h1OrderAmount + h2OrderAmount;
        const totalOrders = h1OrderCount + h2OrderCount;
        const avgStrikeRate = Math.round((overallSummary.firstHalf.strikeRate + overallSummary.secondHalf.strikeRate) / 2);

        setData({
          lastUpdated: meta.updated_at || "Now",
          fiscalYear: "2026",
          verifiedData: true,
          overallSummary,
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
        console.error('Failed to load halfSummary API:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [employeeSearch, startDate, endDate]);

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
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'overall'
                ? 'bg-emerald-800 text-white shadow-sm'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            Overall Summary
          </button>
          <button
            onClick={() => handleTabChange('team')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'team'
                ? 'bg-emerald-800 text-white shadow-sm'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            Team Wise
          </button>
        </div>
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

      {/* ─── Error Message ─── */}
      {error && (
        <Card className="p-4 border border-rose-100 bg-rose-50 rounded-2xl flex items-center gap-3 text-xs sm:text-sm font-semibold text-rose-700 hover:border-rose-100">
          <Info size={16} className="shrink-0 text-rose-600" />
          <span>{error}</span>
        </Card>
      )}

      {/* ─── Skeleton Loading ─── */}
      {loading && (
        <div className="space-y-6 animate-pulse">
          <div className="h-64 bg-zinc-50 border border-[var(--color-border)] rounded-2xl" />
        </div>
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
