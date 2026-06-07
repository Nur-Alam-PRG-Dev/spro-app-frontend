import React from 'react';
import { BarChart3, TrendingUp, ChevronUp, ChevronDown, Calendar } from 'lucide-react';

export default function TeamWiseView({
  teamWise,
  expandedRep,
  toggleRepExpand,
  formatCurrency,
  formatNum
}) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h3 className="font-extrabold text-sm sm:text-base text-[var(--color-text-muted)] tracking-wide">
          Team Performance Breakdown • 2024
        </h3>
      </div>

      {/* Stats Grid */}
      {/* <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

        <div className="relative overflow-hidden bg-gradient-to-br from-emerald-900 to-emerald-950 text-white rounded-2xl p-5 shadow-xs border border-emerald-800">
          <span className="block text-[9px] font-black text-emerald-200/80 uppercase tracking-widest">
            Total Team Revenue
          </span>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black mt-2 tracking-tight">
            {formatCurrency(teamWise.stats.totalTeamRevenue)}
          </h2>
          <div className="mt-3">
            <span className="inline-flex items-center gap-0.5 text-[10px] font-extrabold bg-white/10 text-emerald-300 px-2 py-0.5 rounded-full border border-white/5">
              <TrendingUp size={10} />
              {teamWise.stats.revenueGrowth}% vs Last Half
            </span>
          </div>
          <div className="absolute right-3 bottom-1 opacity-10">
            <BarChart3 size={70} />
          </div>
        </div>

        <div className="bg-white border border-[var(--color-border)] rounded-2xl p-5 flex flex-col justify-between min-h-[110px] shadow-2xs">
          <div>
            <span className="block text-[9px] font-black text-[var(--color-text-muted)] uppercase tracking-widest">
              Total Orders
            </span>
            <h2 className="text-xl sm:text-2xl font-black mt-1 text-[var(--color-text-main)] tracking-tight">
              {formatNum(teamWise.stats.totalOrders)}
            </h2>
          </div>
          <div className="mt-2 text-right">
            <span className="inline-flex items-center gap-0.5 text-[10px] font-extrabold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full">
              +{teamWise.stats.ordersGrowth}%
            </span>
          </div>
        </div>

        <div className="bg-white border border-[var(--color-border)] rounded-2xl p-5 flex flex-col justify-between min-h-[110px] shadow-2xs">
          <div>
            <span className="block text-[9px] font-black text-[var(--color-text-muted)] uppercase tracking-widest">
              Active Reps
            </span>
            <h2 className="text-xl sm:text-2xl font-black mt-1 text-[var(--color-text-main)] tracking-tight">
              {teamWise.stats.activeReps}
            </h2>
          </div>
          <div className="mt-2 text-right text-[10px] font-extrabold text-[var(--color-text-muted)] uppercase">
            Deployments
          </div>
        </div>

        <div className="bg-white border border-[var(--color-border)] rounded-2xl p-5 flex flex-col justify-between min-h-[110px] shadow-2xs">
          <div>
            <span className="block text-[9px] font-black text-[var(--color-text-muted)] uppercase tracking-widest">
              Avg. Strike Rate
            </span>
            <h2 className="text-xl sm:text-2xl font-black mt-1 text-[var(--color-text-main)] tracking-tight">
              {teamWise.stats.avgStrikeRate}%
            </h2>
          </div>
          <div className="mt-2">
            <div className="w-full h-1.5 bg-zinc-100 rounded-full overflow-hidden">
              <div
                style={{ width: `${teamWise.stats.avgStrikeRate}%` }}
                className="h-full bg-emerald-800"
              />
            </div>
          </div>
        </div>

      </div> */}

      {/* Collapsible Sales Representatives Section */}
      <div className="space-y-4">
        {teamWise.reps.map((rep) => {
          const isExpanded = expandedRep === rep.id;

          const getAvatarBg = (color) => {
            switch (color) {
              case 'primary':
              case 'success':
                return 'bg-emerald-800 text-white';
              case 'info':
                return 'bg-sky-700 text-white';
              default:
                return 'bg-zinc-600 text-white';
            }
          };

          return (
            <div
              key={rep.id}
              className="bg-white border border-[var(--color-border)] rounded-2xl overflow-hidden transition-all shadow-2xs"
            >
              {/* Collapsible Header */}
              <button
                onClick={() => toggleRepExpand(rep.id)}
                className="w-full flex items-center justify-between p-4 sm:p-5 hover:bg-zinc-50/50 transition-colors cursor-pointer text-left focus:outline-none"
              >
                <div className="flex items-center gap-3 min-w-0 mr-2">
                  {/* Initials Avatar */}
                  <div className={`w-11 h-11 rounded-xl ${getAvatarBg(rep.avatarColor)} flex items-center justify-center font-extrabold text-sm shrink-0`}>
                    {rep.initials}
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-extrabold text-sm sm:text-base text-[var(--color-text-main)] truncate leading-tight">
                      {rep.name}
                    </h4>
                    <span className="text-[8px] text-[var(--color-text-muted)] font-semibold mt-1 block">
                      {rep.role}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-5 shrink-0">
                  <div className="text-right">
                    <span className="block text-[8px] font-black text-[var(--color-text-muted)] uppercase tracking-wider">
                      Total Revenue
                    </span>
                    <span className="text-[12px] sm:text-base font-extrabold text-[var(--color-text-main)]">
                      {formatCurrency(rep.revenue)}
                    </span>
                  </div>

                  <div className="w-8 h-8 rounded-full hover:bg-zinc-100 flex items-center justify-center text-[var(--color-text-muted)] transition-colors">
                    {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </div>
              </button>

              {/* Collapsible Body Content */}
              {isExpanded && (
                <div className="border-t border-[var(--color-border)] bg-[#fdfdfd] p-5 sm:p-6 space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* 1st Half Performance block */}
                    {(() => {
                      const data = rep.performanceH1;
                      const heroTrend = data.orderAmountChange || 0;
                      return (
                        <div className="border border-[var(--color-border)] rounded-2xl p-4 bg-white space-y-4 shadow-2xs">
                          <div className="flex items-center gap-2 border-b border-[var(--color-border)] pb-2">
                            <Calendar size={14} className="text-[var(--color-text-muted)]" />
                            <span className="text-xs font-extrabold text-[var(--color-text-main)] uppercase tracking-wider">
                              1st Half Performance (AM)
                            </span>
                          </div>

                          <div className="bg-zinc-50/50 rounded-xl p-3 border border-zinc-100 flex items-center justify-between">
                            <div className="space-y-1">
                              <span className="block text-[9px] font-extrabold text-[var(--color-text-muted)] uppercase tracking-wider">Order Amount</span>
                              <span className="block text-xl font-black text-emerald-800">
                                {formatCurrency(data.orderAmount)}
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              <div className="flex flex-col items-end">
                                <span className={`text-[10px] font-black ${heroTrend > 0 ? 'text-emerald-600' : heroTrend < 0 ? 'text-rose-600' : 'text-zinc-500'}`}>
                                  {heroTrend > 0 ? '+' : heroTrend < 0 ? '-' : ''}{Math.abs(heroTrend)}%
                                </span>
                                <span className="text-[7px] font-extrabold text-zinc-400 uppercase tracking-widest">Change</span>
                              </div>
                              <div className="relative flex items-center justify-center w-8 h-8">
                                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                                  <circle cx="18" cy="18" r="14" fill="none" className="stroke-zinc-200" strokeWidth="4" />
                                  <circle cx="18" cy="18" r="14" fill="none" className={heroTrend > 0 ? "stroke-emerald-500" : heroTrend < 0 ? "stroke-rose-500" : "stroke-zinc-400"} strokeWidth="4" strokeDasharray={2 * Math.PI * 14} strokeDashoffset={(2 * Math.PI * 14) - ((Math.min(100, Math.abs(heroTrend))) / 100) * (2 * Math.PI * 14)} strokeLinecap="round" style={{ transition: 'stroke-dashoffset 1s ease-out' }} />
                                </svg>
                                <div className={`absolute inset-0 flex items-center justify-center ${heroTrend > 0 ? 'text-emerald-600' : heroTrend < 0 ? 'text-rose-600' : 'text-zinc-500'}`}>
                                   <TrendingUp size={10} className={`stroke-[3px] ${heroTrend < 0 ? 'rotate-180' : ''}`} />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            <div className="bg-white border border-[var(--color-border)] rounded-xl p-2.5 flex flex-col justify-between min-h-[64px]">
                              <span className="block text-[8px] sm:text-[9px] font-extrabold text-[var(--color-text-muted)] uppercase tracking-wider">Order Count</span>
                              <span className="text-sm sm:text-base font-black text-[var(--color-text-main)] mt-1">{formatNum(data.orderCount)}</span>
                            </div>
                            <div className="bg-white border border-[var(--color-border)] rounded-xl p-2.5 flex flex-col justify-between min-h-[64px]">
                              <span className="block text-[8px] sm:text-[9px] font-extrabold text-[var(--color-text-muted)] uppercase tracking-wider">Visit Count</span>
                              <span className="text-sm sm:text-base font-black text-[#136336] mt-1">{formatNum(data.visits)}</span>
                            </div>
                            <div className="bg-white border border-[var(--color-border)] rounded-xl p-2.5 flex flex-col justify-between min-h-[64px]">
                              <span className="block text-[8px] sm:text-[9px] font-extrabold text-[var(--color-text-muted)] uppercase tracking-wider">Prod. Outlets</span>
                              <div className="mt-1 space-y-1">
                                <div className="flex items-baseline gap-1">
                                  <span className="text-sm sm:text-base font-black text-[var(--color-text-main)] leading-none">{formatNum(data.productiveOutlets)}</span>
                                  <span className="text-[8px] font-bold text-zinc-400">/ {formatNum(data.visits)}</span>
                                </div>
                                <div className="w-full h-1 bg-zinc-100 rounded-full overflow-hidden"><div className="bg-emerald-500 h-full rounded-full" style={{ width: `${(data.productiveOutlets / (data.visits || 1)) * 100}%` }} /></div>
                              </div>
                            </div>
                            <div className="bg-white border border-[var(--color-border)] rounded-xl p-2.5 flex flex-col justify-between min-h-[64px]">
                              <span className="block text-[8px] sm:text-[9px] font-extrabold text-[var(--color-text-muted)] uppercase tracking-wider">Non-Prod.</span>
                              <div className="mt-1 space-y-1">
                                <div className="flex items-baseline gap-1">
                                  <span className="text-sm sm:text-base font-black text-[#a61c1c] leading-none">{formatNum(data.nonProductiveOutlets)}</span>
                                  <span className="text-[8px] font-bold text-zinc-400">/ {formatNum(data.visits)}</span>
                                </div>
                                <div className="w-full h-1 bg-zinc-100 rounded-full overflow-hidden"><div className="bg-rose-500 h-full rounded-full" style={{ width: `${(data.nonProductiveOutlets / (data.visits || 1)) * 100}%` }} /></div>
                              </div>
                            </div>
                            <div className="bg-white border border-[var(--color-border)] rounded-xl p-2.5 flex flex-col justify-between min-h-[64px]">
                              <span className="block text-[8px] sm:text-[9px] font-extrabold text-[var(--color-text-muted)] uppercase tracking-wider">LPC</span>
                              <span className="text-sm sm:text-base font-black text-[var(--color-text-main)] mt-1">{data.lpc}</span>
                            </div>
                            <div className="bg-white border border-[var(--color-border)] rounded-xl p-2.5 flex flex-col justify-between min-h-[64px]">
                              <span className="block text-[8px] sm:text-[9px] font-extrabold text-[var(--color-text-muted)] uppercase tracking-wider">Strike Rate</span>
                              <div className="mt-1 space-y-1">
                                <span className="text-sm sm:text-base font-black text-[#136336] leading-none block">{data.strike}%</span>
                                <div className="w-full h-1 bg-emerald-100 rounded-full overflow-hidden"><div className="h-full bg-emerald-600 rounded-full" style={{ width: `${Math.min(100, Math.max(0, data.strike))}%` }} /></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })()}

                    {/* 2nd Half Performance block */}
                    {(() => {
                      const data = rep.performanceH2;
                      const heroTrend = data.orderAmountChange || 0;
                      return (
                        <div className="border border-[var(--color-border)] rounded-2xl p-4 bg-white space-y-4 shadow-2xs">
                          <div className="flex items-center gap-2 border-b border-[var(--color-border)] pb-2">
                            <Calendar size={14} className="text-[var(--color-text-muted)]" />
                            <span className="text-xs font-extrabold text-[var(--color-text-main)] uppercase tracking-wider">
                              2nd Half Performance (PM)
                            </span>
                          </div>

                          <div className="bg-zinc-50/50 rounded-xl p-3 border border-zinc-100 flex items-center justify-between">
                            <div className="space-y-1">
                              <span className="block text-[9px] font-extrabold text-[var(--color-text-muted)] uppercase tracking-wider">Order Amount</span>
                              <span className="block text-xl font-black text-emerald-800">
                                {formatCurrency(data.orderAmount)}
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              <div className="flex flex-col items-end">
                                <span className={`text-[10px] font-black ${heroTrend > 0 ? 'text-emerald-600' : heroTrend < 0 ? 'text-rose-600' : 'text-zinc-500'}`}>
                                  {heroTrend > 0 ? '+' : heroTrend < 0 ? '-' : ''}{Math.abs(heroTrend)}%
                                </span>
                                <span className="text-[7px] font-extrabold text-zinc-400 uppercase tracking-widest">Change</span>
                              </div>
                              <div className="relative flex items-center justify-center w-8 h-8">
                                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                                  <circle cx="18" cy="18" r="14" fill="none" className="stroke-zinc-200" strokeWidth="4" />
                                  <circle cx="18" cy="18" r="14" fill="none" className={heroTrend > 0 ? "stroke-emerald-500" : heroTrend < 0 ? "stroke-rose-500" : "stroke-zinc-400"} strokeWidth="4" strokeDasharray={2 * Math.PI * 14} strokeDashoffset={(2 * Math.PI * 14) - ((Math.min(100, Math.abs(heroTrend))) / 100) * (2 * Math.PI * 14)} strokeLinecap="round" style={{ transition: 'stroke-dashoffset 1s ease-out' }} />
                                </svg>
                                <div className={`absolute inset-0 flex items-center justify-center ${heroTrend > 0 ? 'text-emerald-600' : heroTrend < 0 ? 'text-rose-600' : 'text-zinc-500'}`}>
                                   <TrendingUp size={10} className={`stroke-[3px] ${heroTrend < 0 ? 'rotate-180' : ''}`} />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            <div className="bg-white border border-[var(--color-border)] rounded-xl p-2.5 flex flex-col justify-between min-h-[64px]">
                              <span className="block text-[8px] sm:text-[9px] font-extrabold text-[var(--color-text-muted)] uppercase tracking-wider">Order Count</span>
                              <span className="text-sm sm:text-base font-black text-[var(--color-text-main)] mt-1">{formatNum(data.orderCount)}</span>
                            </div>
                            <div className="bg-white border border-[var(--color-border)] rounded-xl p-2.5 flex flex-col justify-between min-h-[64px]">
                              <span className="block text-[8px] sm:text-[9px] font-extrabold text-[var(--color-text-muted)] uppercase tracking-wider">Visit Count</span>
                              <span className="text-sm sm:text-base font-black text-[#136336] mt-1">{formatNum(data.visits)}</span>
                            </div>
                            <div className="bg-white border border-[var(--color-border)] rounded-xl p-2.5 flex flex-col justify-between min-h-[64px]">
                              <span className="block text-[8px] sm:text-[9px] font-extrabold text-[var(--color-text-muted)] uppercase tracking-wider">Prod. Outlets</span>
                              <div className="mt-1 space-y-1">
                                <div className="flex items-baseline gap-1">
                                  <span className="text-sm sm:text-base font-black text-[var(--color-text-main)] leading-none">{formatNum(data.productiveOutlets)}</span>
                                  <span className="text-[8px] font-bold text-zinc-400">/ {formatNum(data.visits)}</span>
                                </div>
                                <div className="w-full h-1 bg-zinc-100 rounded-full overflow-hidden"><div className="bg-emerald-500 h-full rounded-full" style={{ width: `${(data.productiveOutlets / (data.visits || 1)) * 100}%` }} /></div>
                              </div>
                            </div>
                            <div className="bg-white border border-[var(--color-border)] rounded-xl p-2.5 flex flex-col justify-between min-h-[64px]">
                              <span className="block text-[8px] sm:text-[9px] font-extrabold text-[var(--color-text-muted)] uppercase tracking-wider">Non-Prod.</span>
                              <div className="mt-1 space-y-1">
                                <div className="flex items-baseline gap-1">
                                  <span className="text-sm sm:text-base font-black text-[#a61c1c] leading-none">{formatNum(data.nonProductiveOutlets)}</span>
                                  <span className="text-[8px] font-bold text-zinc-400">/ {formatNum(data.visits)}</span>
                                </div>
                                <div className="w-full h-1 bg-zinc-100 rounded-full overflow-hidden"><div className="bg-rose-500 h-full rounded-full" style={{ width: `${(data.nonProductiveOutlets / (data.visits || 1)) * 100}%` }} /></div>
                              </div>
                            </div>
                            <div className="bg-white border border-[var(--color-border)] rounded-xl p-2.5 flex flex-col justify-between min-h-[64px]">
                              <span className="block text-[8px] sm:text-[9px] font-extrabold text-[var(--color-text-muted)] uppercase tracking-wider">LPC</span>
                              <span className="text-sm sm:text-base font-black text-[var(--color-text-main)] mt-1">{data.lpc}</span>
                            </div>
                            <div className="bg-white border border-[var(--color-border)] rounded-xl p-2.5 flex flex-col justify-between min-h-[64px]">
                              <span className="block text-[8px] sm:text-[9px] font-extrabold text-[var(--color-text-muted)] uppercase tracking-wider">Strike Rate</span>
                              <div className="mt-1 space-y-1">
                                <span className="text-sm sm:text-base font-black text-[#136336] leading-none block">{data.strike}%</span>
                                <div className="w-full h-1 bg-emerald-100 rounded-full overflow-hidden"><div className="h-full bg-emerald-600 rounded-full" style={{ width: `${Math.min(100, Math.max(0, data.strike))}%` }} /></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
