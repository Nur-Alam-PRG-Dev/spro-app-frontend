'use client';
import React from 'react';
import { DollarSign, MapPin, CheckCircle, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';

export default function MetricsGrid({ totalRevenue, totalVisits, productiveVisits, avgDailyRevenue, growthRate, todayPlanned, todayVisited, todayUnvisited }) {
  const prodRate = totalVisits > 0 ? ((productiveVisits / totalVisits) * 100).toFixed(1) : 0;
  const formattedRevenue = totalRevenue >= 1000 ? `৳${(totalRevenue / 1000).toFixed(1)}k` : `৳${(totalRevenue || 0).toFixed(0)}`;
  const formattedAvgRev = avgDailyRevenue >= 1000 ? `৳${(avgDailyRevenue / 1000).toFixed(1)}k` : `৳${(avgDailyRevenue || 0).toFixed(0)}`;
  const isPositiveGrowth = (growthRate || 0) >= 0;

  const metrics = [
    {
      label: "Last 7 Days' Revenue",
      value: formattedRevenue,
      sub: `Avg ৳${avgDailyRevenue?.toFixed(0)}`,
      icon: <DollarSign size={16} className="text-white" />,
      trend: growthRate != null ? (
        <span className="flex items-center gap-1 text-xs font-black px-2 py-1 rounded bg-white/20 text-white backdrop-blur-md shadow-sm border border-white/10">
          {isPositiveGrowth ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          {isPositiveGrowth ? '+' : ''}{growthRate?.toFixed(1)}%
        </span>
      ) : null,
      bgClass: 'bg-gradient-to-br from-[#047857] to-[#004b23]', // Deep Emerald
      shadowClass: 'hover:shadow-[0_8px_20px_rgba(4,120,87,0.4)]',
    },
    {
      label: "Last 7 Days' Visits",
      value: (totalVisits || 0).toLocaleString(),
      sub: `${productiveVisits || 0} productive`,
      icon: <MapPin size={16} className="text-white" />,
      trend: null,
      bgClass: 'bg-gradient-to-br from-[#2563eb] to-[#1e3a8a]', // Deep Blue
      shadowClass: 'hover:shadow-[0_8px_20px_rgba(37,99,235,0.4)]',
    },
    {
      label: "Last 7 Days' Productive Rate",
      value: `${prodRate}%`,
      sub: `${totalVisits - productiveVisits || 0} unproductive`,
      icon: <CheckCircle size={16} className="text-white" />,
      trend: null,
      bgClass: 'bg-gradient-to-br from-[#4f46e5] to-[#312e81]', // Deep Indigo
      shadowClass: 'hover:shadow-[0_8px_20px_rgba(79,70,229,0.4)]',
    },
  ];

  const standardMetrics = metrics;

  const planned = todayPlanned || 0;
  const visited = todayVisited || 0;
  const unvisited = todayUnvisited || 0;
  const visitedPct = planned > 0 ? ((visited / planned) * 100).toFixed(1) : 0;
  const unvisitedPct = planned > 0 ? (100 - visitedPct).toFixed(1) : 0;

  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-2 h-full">
      {/* ── First 3 Standard Blocks ── */}
      {standardMetrics.map((m, i) => (
        <div
          key={i}
          className={`relative rounded-[12px] p-3 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:-translate-y-1 group cursor-default ${m.bgClass} ${m.shadowClass}`}
        >
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '12px 12px' }} />

          {/* Watermark Icon */}
          <div className="absolute -bottom-4 -right-4 opacity-10 transform group-hover:scale-125 transition-transform duration-500">
            {React.cloneElement(m.icon, { size: 70 })}
          </div>

          <div className="relative z-10 flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-white/20 flex items-center justify-center backdrop-blur-md shadow-inner group-hover:scale-110 transition-transform duration-300">
                {m.icon}
              </div>
              <span className="text-[10px] font-bold text-white/90 uppercase tracking-widest">{m.label}</span>
            </div>
            {m.trend}
          </div>

          <div className="relative z-10 flex flex-col items-center justify-center flex-1 mt-1 text-center">
            <h4 className="text-[32px] font-black text-white leading-none tracking-tight mb-1 drop-shadow-md">{m.value}</h4>
            <span className="text-xs text-white/90 font-bold leading-none tracking-wide">{m.sub}</span>
          </div>
        </div>
      ))}

      {/* ── 4th Block: Custom Coverage Infographic ── */}
      <div className="relative rounded-[12px] p-3 flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 cursor-default bg-gradient-to-br from-[#6b21a8] to-[#3b0764] border border-purple-500/30 shadow-[0_8px_20px_rgba(88,28,135,0.3)] hover:shadow-[0_12px_30px_rgba(88,28,135,0.6)]">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '12px 12px' }} />

        {/* Top Row: Title & Planned */}
        <div className="relative z-10 flex items-start justify-between mb-3">
          <div>
            <h3 className="text-[13px] font-black text-white tracking-tight leading-none">Today's Coverage Overview</h3>
            <p className="text-[9px] text-purple-200/70 font-medium mt-1">Total Route Targets</p>
          </div>
          <div className="bg-white/10 px-2 py-1 rounded-md border border-white/10 text-right backdrop-blur-sm">
            <p className="text-[10px] font-bold text-purple-200 uppercase tracking-widest leading-none mb-0.5">Planned</p>
            <p className="text-[15px] font-black text-white leading-none">{planned.toLocaleString()}</p>
          </div>
        </div>

        {/* Middle Row: Visited vs Uncovered */}
        <div className="relative z-10 flex items-end justify-between mt-auto mb-2">
          {/* Visited (Left) */}
          <div>
            <div className="flex items-center gap-1 mb-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span>
              <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest">Visited</span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-emerald-300 leading-none">{visited.toLocaleString()}</span>
              <span className="text-[11px] font-bold text-emerald-400/80">{visitedPct}%</span>
            </div>
          </div>

          {/* Uncovered (Right) */}
          <div className="text-right">
            <div className="flex items-center justify-end gap-1 mb-0.5">
              <span className="text-[9px] font-bold text-rose-400 uppercase tracking-widest">Uncovered</span>
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shadow-[0_0_8px_rgba(251,113,133,0.8)]"></span>
            </div>
            <div className="flex items-baseline justify-end gap-1.5">
              <span className="text-[11px] font-bold text-rose-400/80">{unvisitedPct}%</span>
              <span className="text-2xl font-black text-rose-300 leading-none">{unvisited.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Bottom Row: Progress Bar */}
        <div className="relative z-10 w-full h-2 rounded-full overflow-hidden flex bg-black/30 border border-white/5">
          <div className="h-full bg-emerald-400" style={{ width: `${visitedPct}%` }}></div>
          <div className="h-full bg-rose-500" style={{ width: `${unvisitedPct}%` }}></div>
        </div>
      </div>

    </div>
  );
}
