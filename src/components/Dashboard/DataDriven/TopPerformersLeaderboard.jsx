'use client';
import React from 'react';
import { Medal, Trophy, TrendingUp, Target } from 'lucide-react';

export default function TopPerformersLeaderboard({ rawData = [] }) {
  // Helper to format name as "First 5 char + ... + Last name"
  const formatName = (fullName) => {
    if (!fullName) return 'Unknown';
    const nameStr = fullName.trim();
    const parts = nameStr.split(' ');
    if (parts.length === 1) {
      return nameStr.length > 8 ? `${nameStr.substring(0, 5)}...` : nameStr;
    }
    const first5 = nameStr.substring(0, 5);
    const lastName = parts[parts.length - 1];
    // If the name is already very short, just return it
    if (nameStr.length <= 8) return nameStr;
    return `${first5}... ${lastName}`;
  };

  // Map and sum up first_half and second_half for each SR
  const processedData = rawData.map(sr => {
    const revenue = parseFloat(sr.first_half?.order_amount || 0) + parseFloat(sr.second_half?.order_amount || 0);
    const visits = parseInt(sr.first_half?.visit_count || 0) + parseInt(sr.second_half?.visit_count || 0);
    const productive = parseInt(sr.first_half?.productive_outlets || 0) + parseInt(sr.second_half?.productive_outlets || 0);
    return {
      name: formatName(sr.sr_name || sr.aemp_name),
      role: sr.role || 'SR',
      revenue,
      visits,
      productive
    };
  });

  // Sort SRs by total revenue
  const topPerformers = processedData
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);

  return (
    <div className="bg-gradient-to-br from-[#78350f] to-[#451a03] rounded-[12px] border border-amber-800/50 shadow-[0_8px_20px_rgba(120,53,15,0.3)] p-3 flex flex-col h-full overflow-hidden relative">
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '12px 12px' }} />
      
      {/* Header */}
      <div className="flex items-center justify-between mb-3 border-b border-amber-900/50 pb-2 relative z-10">
        <div>
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-md bg-white/10 flex items-center justify-center border border-white/20">
              <Trophy size={12} className="text-amber-300" />
            </div>
            <h3 className="text-[14px] font-black text-white tracking-tight leading-none">Top Performers</h3>
          </div>
          <p className="text-[10px] text-amber-200/70 font-medium mt-1">Highest revenue generators today</p>
        </div>
      </div>

      {/* Leaderboard List */}
      <div className="flex-1 flex flex-col gap-2 overflow-y-auto pr-1 relative z-10">
        {topPerformers.map((sr, i) => {
          const revenue = sr.revenue;
          const visits = sr.visits;
          const productive = sr.productive;
          const prodPct = visits > 0 ? (productive / visits) * 100 : 0;
          
          let rankColor = "bg-white/5 text-amber-200/50 border-white/10";
          if (i === 0) rankColor = "bg-amber-500 text-white shadow-sm border-amber-400";
          else if (i === 1) rankColor = "bg-slate-300 text-slate-800 shadow-sm border-slate-200";
          else if (i === 2) rankColor = "bg-orange-400 text-white shadow-sm border-orange-300";

          return (
            <div key={i} className="flex flex-col p-2 rounded-lg bg-black/20 border border-white/5 hover:bg-black/30 transition-colors group">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black border ${rankColor}`}>
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="text-[11px] font-bold text-white leading-none truncate max-w-[120px]">
                      {sr.name}
                    </h4>
                    <p className="text-[8px] text-amber-200/50 font-semibold uppercase mt-0.5">{sr.role}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <span className="text-[12px] font-black text-emerald-300 tracking-tight">
                    ৳{(revenue / 1000).toFixed(1)}k
                  </span>
                </div>
              </div>

              {/* Productivity Bar */}
              <div className="flex items-center gap-2 pl-7">
                <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden flex">
                  <div 
                    className="h-full bg-emerald-400 rounded-full transition-all duration-500" 
                    style={{ width: `${prodPct}%` }}
                  />
                  <div 
                    className="h-full bg-transparent transition-all duration-500" 
                    style={{ width: `${100 - prodPct}%` }}
                  />
                </div>
                <div className="text-[9px] font-bold text-amber-100/70 whitespace-nowrap w-12 text-right flex items-center gap-1 justify-end">
                  <Target size={9} className={prodPct > 50 ? 'text-emerald-400' : 'text-amber-200/30'} />
                  {productive}/{visits}
                </div>
              </div>
            </div>
          );
        })}
        {topPerformers.length === 0 && (
          <div className="flex-1 flex items-center justify-center text-[11px] text-amber-200/50 font-medium">
            No performance data available
          </div>
        )}
      </div>
    </div>
  );
}
