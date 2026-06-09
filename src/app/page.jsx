'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PageSpinner from '@/components/ui/PageSpinner';
import WelcomeCard from '@/components/Dashboard/DataDriven/WelcomeCard';
import MetricsGrid from '@/components/Dashboard/DataDriven/MetricsGrid';
import ActivityAreaChart from '@/components/Dashboard/DataDriven/ActivityAreaChart';
import CoverageDonutChart from '@/components/Dashboard/DataDriven/CoverageDonutChart';
import UnvisitedOutletsTable from '@/components/Dashboard/DataDriven/UnvisitedOutletsTable';
import TeamRadarChart from '@/components/Dashboard/DataDriven/TeamRadarChart';

// ─── Client-side Analysis Engine ─────────────────────────────────────────────
function analyzeHalfSummary(rawData) {
  let totalRevenue = 0, totalVisits = 0, productiveVisits = 0;
  rawData.forEach(item => {
    totalRevenue += parseFloat(item.first_half?.order_amount || 0) + parseFloat(item.second_half?.order_amount || 0);
    totalVisits += parseInt(item.first_half?.visit_count || 0) + parseInt(item.second_half?.visit_count || 0);
    productiveVisits += parseInt(item.first_half?.productive_outlets || 0) + parseInt(item.second_half?.productive_outlets || 0);
  });
  const avgDailyRevenue = rawData.length > 0 ? totalRevenue / rawData.length : 0;
  const productiveRate = totalVisits > 0
    ? parseFloat(((productiveVisits / totalVisits) * 100).toFixed(1))
    : 0;
  return { totalRevenue, totalVisits, productiveVisits, avgDailyRevenue, productiveRate };
}

function buildChartData(rawData) {
  const grouped = {};
  rawData.forEach(item => {
    const key = item.sr_name?.split('-').pop() || item.sr_id || 'Unknown';
    if (!grouped[key]) grouped[key] = { date: key.substring(0, 10), revenue: 0, visits: 0, productive: 0 };
    grouped[key].revenue += parseFloat(item.first_half?.order_amount || 0) + parseFloat(item.second_half?.order_amount || 0);
    grouped[key].visits += parseInt(item.first_half?.visit_count || 0) + parseInt(item.second_half?.visit_count || 0);
    grouped[key].productive += parseInt(item.first_half?.productive_outlets || 0) + parseInt(item.second_half?.productive_outlets || 0);
  });
  return Object.values(grouped).map(d => ({ ...d, revenue: parseFloat(d.revenue.toFixed(2)) }));
}

function calcGrowthRate(rawData) {
  if (rawData.length < 2) return null;
  const mid = Math.floor(rawData.length / 2);
  const firstHalfData = rawData.slice(0, mid).reduce((s, i) => s + parseFloat(i.first_half?.order_amount || 0) + parseFloat(i.second_half?.order_amount || 0), 0);
  const secondHalfData = rawData.slice(mid).reduce((s, i) => s + parseFloat(i.first_half?.order_amount || 0) + parseFloat(i.second_half?.order_amount || 0), 0);
  if (firstHalfData === 0) return null;
  return parseFloat((((secondHalfData - firstHalfData) / firstHalfData) * 100).toFixed(1));
}
// ─────────────────────────────────────────────────────────────────────────────

export default function Home() {
  const router = useRouter();
  const [status, setStatus] = useState('loading'); // 'loading' | 'ready' | 'error'
  const [user, setUser] = useState(null);
  const [analysis, setAnalysis] = useState({
    totalRevenue: 0,
    totalVisits: 0,
    productiveVisits: 0,
    avgDailyRevenue: 0,
    productiveRate: 0,
    growthRate: null,
  });
  const [chartData, setChartData] = useState([]);
  const [halfSummaryRaw, setHalfSummaryRaw] = useState([]);
  const [unvisitedOutlets, setUnvisitedOutlets] = useState([]);
  const [unvisitedCount, setUnvisitedCount] = useState(0);
  const [teamSize, setTeamSize] = useState(null);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        // Retry localStorage read up to 5 times with 200ms gap
        // (needed because MainLayoutWrapper auth check runs concurrently)
        let u = null;
        for (let attempt = 0; attempt < 5; attempt++) {
          const userStr = localStorage.getItem('spro_user');
          if (userStr) {
            u = JSON.parse(userStr);
            break;
          }
          await new Promise(r => setTimeout(r, 200));
        }

        if (!u) {
          // No session — layout will redirect to /login, just keep spinner
          return;
        }

        setUser(u);

        // Date range: last 7 days
        const today = new Date();
        const sevenDaysAgo = new Date(today);
        sevenDaysAgo.setDate(today.getDate() - 6);
        const start_date = sevenDaysAgo.toISOString().split('T')[0];
        const end_date = today.toISOString().split('T')[0];

        const CACHE_KEY = 'dashboard_cache_v2'; // Must match login page
        const CACHE_EXPIRY_MS = 20 * 60 * 1000; // 20 minutes

        const updateStateWithData = (halfRaw, unvOutlets) => {
          setHalfSummaryRaw(halfRaw);
          setUnvisitedOutlets(unvOutlets);
          setUnvisitedCount(unvOutlets.length);

          const stats = analyzeHalfSummary(halfRaw);
          const growth = calcGrowthRate(halfRaw);
          setAnalysis({ ...stats, growthRate: growth });
          setChartData(buildChartData(halfRaw));
          
          const uniqueMembers = new Set(halfRaw.map(i => i.emp_id || i.sr_id)).size;
          setTeamSize(uniqueMembers > 0 ? uniqueMembers : halfRaw.length);
          setStatus('ready');
        };
        
        let needsFetch = true;

        try {
          const cachedStr = sessionStorage.getItem(CACHE_KEY);
          if (cachedStr) {
            const cached = JSON.parse(cachedStr);
            const now = Date.now();
            
            // If cache is less than 20 minutes old, use it and DO NOT refetch
            if (cached.timestamp && (now - cached.timestamp < CACHE_EXPIRY_MS)) {
              updateStateWithData(cached.halfSummaryRaw || [], cached.unvisitedOutlets || []);
              needsFetch = false;
            }
          }
        } catch (e) {
          console.warn('Failed to parse dashboard cache:', e);
        }

        // If we have a valid 20-min cache, we stop here.
        if (!needsFetch) return;

        // ── Fetch fresh data (20 mins expired or not present) ─────────────
        const basePayload = {
          country_id: u.cont_id || 2,
          aemp_id: u.aemp_usnm,
          role_id: u.role_id,
        };

        const [halfRes, unvRes] = await Promise.allSettled([
          fetch('/api/halfSummary', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...basePayload, start_date, end_date, report_type: 'team_wise' }),
          }),
          fetch('/api/unvisitedOutlet', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...basePayload, date: end_date }),
          }),
        ]);

        let freshHalfRaw = [];
        let freshUnvOutlets = [];

        if (halfRes.status === 'fulfilled' && halfRes.value.ok) {
          const halfJson = await halfRes.value.json();
          const teamWiseArr = halfJson?.receive_data?.team_wise;
          freshHalfRaw = Array.isArray(teamWiseArr) ? teamWiseArr : [];
        }

        if (unvRes.status === 'fulfilled' && unvRes.value.ok) {
          const unvJson = await unvRes.value.json();
          const outletsArr = unvJson?.data || unvJson?.receive_data?.data;
          freshUnvOutlets = Array.isArray(outletsArr) ? outletsArr : [];
        }

        // Save fresh data to cache for the next 20 mins
        try {
          sessionStorage.setItem(CACHE_KEY, JSON.stringify({
            timestamp: Date.now(),
            halfSummaryRaw: freshHalfRaw,
            unvisitedOutlets: freshUnvOutlets,
          }));
        } catch (e) {
          // Ignore QuotaExceeded errors
        }

        updateStateWithData(freshHalfRaw, freshUnvOutlets);
      } catch (e) {
        console.error('Dashboard fetch error:', e);
        setStatus('error');
      }
    };

    fetchAll();
  }, []);

  // ── Loading state ────────────────────────────────────────────────────────
  if (status === 'loading') {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <PageSpinner
          message="Loading Dashboard"
          subMessage="Fetching your real-time logistics data..."
        />
      </div>
    );
  }

  // ── Error state ──────────────────────────────────────────────────────────
  if (status === 'error') {
    return (
      <div className="flex h-[80vh] items-center justify-center flex-col gap-3">
        <p className="text-sm font-bold text-rose-600">Failed to load dashboard data.</p>
        <button
          onClick={() => { setStatus('loading'); window.location.reload(); }}
          className="text-[13px] font-bold text-[var(--color-primary)] underline"
        >
          Retry
        </button>
      </div>
    );
  }

  // ── Dashboard ─────────────────────────────────────────────────────────────
  return (
    <div className="space-y-2 pb-4">

      {/* ── ROW 1: Welcome Card + KPI Metrics ──────────────────────────── */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-2">
        <div className="xl:col-span-3">
          <WelcomeCard
            user={user}
            totalRevenue={analysis.totalRevenue}
            productiveRate={analysis.productiveRate}
            teamSize={teamSize}
          />
        </div>
        <div className="xl:col-span-9">
          <MetricsGrid
            totalRevenue={analysis.totalRevenue}
            totalVisits={analysis.totalVisits}
            productiveVisits={analysis.productiveVisits}
            unvisitedCount={unvisitedCount}
            avgDailyRevenue={analysis.avgDailyRevenue}
            growthRate={analysis.growthRate}
          />
        </div>
      </div>

      {/* ── ROW 2: 7-Day Area/Bar Chart + Coverage Donut ───────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-2">
        <div className="lg:col-span-8">
          <ActivityAreaChart chartData={chartData} />
        </div>
        <div className="lg:col-span-4">
          <CoverageDonutChart
            productiveVisits={analysis.productiveVisits}
            totalVisits={analysis.totalVisits}
            unvisitedCount={unvisitedCount}
          />
        </div>
      </div>

      {/* ── ROW 3: Unvisited Outlets Table + Team Radar ─────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-2">
        <div className="lg:col-span-7">
          <UnvisitedOutletsTable outlets={unvisitedOutlets} />
        </div>
        <div className="lg:col-span-5">
          <TeamRadarChart rawData={halfSummaryRaw} />
        </div>
      </div>

    </div>
  );
}
