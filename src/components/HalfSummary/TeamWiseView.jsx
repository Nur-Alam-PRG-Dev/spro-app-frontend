import React from 'react';
import { BarChart3, TrendingUp, ChevronUp, ChevronDown, Calendar } from 'lucide-react';
import BidirectionalBarChartWidget from '../ui/BidirectionalBarChartWidget';
import RadialProgressWidget from '../ui/RadialProgressWidget';

export default function TeamWiseView({
  teamWise,
  expandedRep,
  toggleRepExpand,
  formatCurrency,
  formatNum,
  dateRange,
  svName,
  teamSize
}) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h3 className="font-extrabold text-sm sm:text-base text-[var(--color-text-muted)] tracking-wide">
          Team Performance Breakdown • {teamWise.reps.length} Members
        </h3>
      </div>

      {/* Team Revenue Distribution Chart */}
      <div className="bg-white border border-[var(--color-border)] rounded-2xl p-4 sm:p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 mb-6">
        <BidirectionalBarChartWidget 
          title="Total Revenue"
          subtitle="AM vs PM Contribution"
          xAxisKey="serial"
          data={teamWise.reps.map(rep => ({ 
            serial: rep.serial, 
            AM: rep.performanceH1.orderAmount, 
            PM: -rep.performanceH2.orderAmount 
          }))}
          dateRange={dateRange}
          svName={svName}
          teamSize={teamSize}
        />
      </div>

      {/* Collapsible Sales Representatives Section */}
      <div className="space-y-4">
        {teamWise.reps.map((rep) => {
          const isExpanded = expandedRep === rep.id;

          const getAvatarBg = (color) => {
            switch (color) {
              case 'primary':
              case 'success':
                return 'bg-indigo-800 text-white';
              case 'info':
                return 'bg-sky-700 text-white';
              default:
                return 'bg-zinc-600 text-white';
            }
          };

          return (
            <div
              key={rep.id}
              className="bg-white border border-[var(--color-border)] rounded-2xl overflow-hidden transition-all shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Collapsible Header */}
              <button
                onClick={() => toggleRepExpand(rep.id)}
                className="w-full flex items-center justify-between p-3 sm:p-4 hover:bg-zinc-50/50 transition-colors cursor-pointer text-left focus:outline-none"
              >
                <div className="flex items-center gap-2 min-w-0 mr-2 w-full max-w-[280px]">
                  {/* Initials Avatar */}
                  <div className={`w-9 h-9 rounded-xl ${getAvatarBg(rep.avatarColor)} flex items-center justify-center font-extrabold text-xs shrink-0`}>
                    {rep.initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-extrabold text-sm text-[var(--color-text-main)] truncate leading-tight">
                      {rep.serial}. {rep.name}
                    </h4>
                    <span className="text-[9px] text-[var(--color-text-muted)] font-semibold block">
                      {rep.role}
                    </span>
                  </div>
                </div>

                {/* Left/Middle Section: Radial Progress */}
                <div className="hidden sm:flex items-center justify-center mr-4">
                  <RadialProgressWidget 
                    percentage={(rep.revenue / (teamWise.stats.totalTeamRevenue || 1)) * 100} 
                    size={42} 
                    strokeWidth={4} 
                    color={rep.revenue > 0 ? '#10b981' : '#a1a1aa'} 
                  />
                </div>

                {/* Middle Section: Collapsed Summaries (Hidden on mobile) */}
                <div className="hidden xl:flex items-center justify-center gap-6 border border-[var(--color-border)] rounded-full px-8 py-1.5 bg-white shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 mx-4">
                  {(() => {
                    const heroTrend1 = rep.performanceH1.orderAmountChange || 0;
                    return (
                      <div className="flex flex-col items-center justify-center gap-0.5 min-w-[160px]">
                        <div className="flex items-center gap-1 text-[8px] font-black text-[var(--color-text-muted)] uppercase tracking-widest">
                          <Calendar size={9} />
                          1st Half Performance (AM)
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-[13px] font-black text-indigo-800 tracking-tight">
                            {formatCurrency(rep.performanceH1.orderAmount)}
                          </span>
                          <div className="flex items-center gap-1">
                            <div className="flex flex-col items-end leading-[1]">
                              <span className={`text-[8px] font-black ${heroTrend1 > 0 ? 'text-indigo-600' : heroTrend1 < 0 ? 'text-rose-600' : 'text-zinc-500'}`}>
                                {heroTrend1 > 0 ? '+' : heroTrend1 < 0 ? '-' : ''}{Math.abs(heroTrend1)}%
                              </span>
                              <span className="text-[6px] font-extrabold text-zinc-400 uppercase tracking-widest mt-0.5">Change</span>
                            </div>
                            <div className="relative flex items-center justify-center w-5 h-5">
                              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                                <circle cx="18" cy="18" r="14" fill="none" className="stroke-zinc-200" strokeWidth="4" />
                                <circle cx="18" cy="18" r="14" fill="none" className={heroTrend1 > 0 ? "stroke-indigo-500" : heroTrend1 < 0 ? "stroke-rose-500" : "stroke-zinc-400"} strokeWidth="4" strokeDasharray={2 * Math.PI * 14} strokeDashoffset={(2 * Math.PI * 14) - ((Math.min(100, Math.abs(heroTrend1))) / 100) * (2 * Math.PI * 14)} strokeLinecap="round" />
                              </svg>
                              <div className={`absolute inset-0 flex items-center justify-center ${heroTrend1 > 0 ? 'text-indigo-600' : heroTrend1 < 0 ? 'text-rose-600' : 'text-zinc-500'}`}>
                                 <TrendingUp size={7} className={`stroke-[3px] ${heroTrend1 < 0 ? 'rotate-180' : ''}`} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })()}

                  <div className="w-px h-8 bg-indigo-800/30"></div>

                  {(() => {
                    const heroTrend2 = rep.performanceH2.orderAmountChange || 0;
                    return (
                      <div className="flex flex-col items-center justify-center gap-0.5 min-w-[160px]">
                        <div className="flex items-center gap-1 text-[8px] font-black text-[var(--color-text-muted)] uppercase tracking-widest">
                          <Calendar size={9} />
                          2nd Half Performance (PM)
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-[13px] font-black text-indigo-800 tracking-tight">
                            {formatCurrency(rep.performanceH2.orderAmount)}
                          </span>
                          <div className="flex items-center gap-1">
                            <div className="flex flex-col items-end leading-[1]">
                              <span className={`text-[8px] font-black ${heroTrend2 > 0 ? 'text-indigo-600' : heroTrend2 < 0 ? 'text-rose-600' : 'text-zinc-500'}`}>
                                {heroTrend2 > 0 ? '+' : heroTrend2 < 0 ? '-' : ''}{Math.abs(heroTrend2)}%
                              </span>
                              <span className="text-[6px] font-extrabold text-zinc-400 uppercase tracking-widest mt-0.5">Change</span>
                            </div>
                            <div className="relative flex items-center justify-center w-5 h-5">
                              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                                <circle cx="18" cy="18" r="14" fill="none" className="stroke-zinc-200" strokeWidth="4" />
                                <circle cx="18" cy="18" r="14" fill="none" className={heroTrend2 > 0 ? "stroke-indigo-500" : heroTrend2 < 0 ? "stroke-rose-500" : "stroke-zinc-400"} strokeWidth="4" strokeDasharray={2 * Math.PI * 14} strokeDashoffset={(2 * Math.PI * 14) - ((Math.min(100, Math.abs(heroTrend2))) / 100) * (2 * Math.PI * 14)} strokeLinecap="round" />
                              </svg>
                              <div className={`absolute inset-0 flex items-center justify-center ${heroTrend2 > 0 ? 'text-indigo-600' : heroTrend2 < 0 ? 'text-rose-600' : 'text-zinc-500'}`}>
                                 <TrendingUp size={7} className={`stroke-[3px] ${heroTrend2 < 0 ? 'rotate-180' : ''}`} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })()}
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
                <div className="border-t border-[var(--color-border)] bg-[#fdfdfd] p-3 sm:p-4 space-y-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* 1st Half Performance block */}
                    {(() => {
                      const data = rep.performanceH1;
                      const heroTrend = data.orderAmountChange || 0;
                      return (
                        <div className="border border-[var(--color-border)] rounded-2xl p-4 bg-white space-y-4 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                          <div className="flex items-center gap-2 border-b border-[var(--color-border)] pb-2">
                            <Calendar size={14} className="text-[var(--color-text-muted)]" />
                            <span className="text-xs font-extrabold text-[var(--color-text-main)] uppercase tracking-wider">
                              1st Half Performance (AM)
                            </span>
                          </div>

                          <div className="bg-zinc-50/50 rounded-xl p-3 border border-zinc-100 flex items-center justify-between">
                            <div className="space-y-1">
                              <span className="block text-[9px] font-extrabold text-[var(--color-text-muted)] uppercase tracking-wider">Order Amount</span>
                              <span className="block text-xl font-black text-indigo-800">
                                {formatCurrency(data.orderAmount)}
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              <div className="flex flex-col items-end">
                                <span className={`text-[10px] font-black ${heroTrend > 0 ? 'text-indigo-600' : heroTrend < 0 ? 'text-rose-600' : 'text-zinc-500'}`}>
                                  {heroTrend > 0 ? '+' : heroTrend < 0 ? '-' : ''}{Math.abs(heroTrend)}%
                                </span>
                                <span className="text-[7px] font-extrabold text-zinc-400 uppercase tracking-widest">Change</span>
                              </div>
                              <div className="relative flex items-center justify-center w-8 h-8">
                                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                                  <circle cx="18" cy="18" r="14" fill="none" className="stroke-zinc-200" strokeWidth="4" />
                                  <circle cx="18" cy="18" r="14" fill="none" className={heroTrend > 0 ? "stroke-indigo-500" : heroTrend < 0 ? "stroke-rose-500" : "stroke-zinc-400"} strokeWidth="4" strokeDasharray={2 * Math.PI * 14} strokeDashoffset={(2 * Math.PI * 14) - ((Math.min(100, Math.abs(heroTrend))) / 100) * (2 * Math.PI * 14)} strokeLinecap="round" style={{ transition: 'stroke-dashoffset 1s ease-out' }} />
                                </svg>
                                <div className={`absolute inset-0 flex items-center justify-center ${heroTrend > 0 ? 'text-indigo-600' : heroTrend < 0 ? 'text-rose-600' : 'text-zinc-500'}`}>
                                   <TrendingUp size={10} className={`stroke-[3px] ${heroTrend < 0 ? 'rotate-180' : ''}`} />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
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
                                <div className="w-full h-1 bg-zinc-100 rounded-full overflow-hidden"><div className="bg-indigo-500 h-full rounded-full" style={{ width: `${(data.productiveOutlets / (data.visits || 1)) * 100}%` }} /></div>
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
                                <div className="w-full h-1 bg-indigo-100 rounded-full overflow-hidden"><div className="h-full bg-indigo-600 rounded-full" style={{ width: `${Math.min(100, Math.max(0, data.strike))}%` }} /></div>
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
                        <div className="border border-[var(--color-border)] rounded-2xl p-4 bg-white space-y-4 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                          <div className="flex items-center gap-2 border-b border-[var(--color-border)] pb-2">
                            <Calendar size={14} className="text-[var(--color-text-muted)]" />
                            <span className="text-xs font-extrabold text-[var(--color-text-main)] uppercase tracking-wider">
                              2nd Half Performance (PM)
                            </span>
                          </div>

                          <div className="bg-zinc-50/50 rounded-xl p-3 border border-zinc-100 flex items-center justify-between">
                            <div className="space-y-1">
                              <span className="block text-[9px] font-extrabold text-[var(--color-text-muted)] uppercase tracking-wider">Order Amount</span>
                              <span className="block text-xl font-black text-indigo-800">
                                {formatCurrency(data.orderAmount)}
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              <div className="flex flex-col items-end">
                                <span className={`text-[10px] font-black ${heroTrend > 0 ? 'text-indigo-600' : heroTrend < 0 ? 'text-rose-600' : 'text-zinc-500'}`}>
                                  {heroTrend > 0 ? '+' : heroTrend < 0 ? '-' : ''}{Math.abs(heroTrend)}%
                                </span>
                                <span className="text-[7px] font-extrabold text-zinc-400 uppercase tracking-widest">Change</span>
                              </div>
                              <div className="relative flex items-center justify-center w-8 h-8">
                                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                                  <circle cx="18" cy="18" r="14" fill="none" className="stroke-zinc-200" strokeWidth="4" />
                                  <circle cx="18" cy="18" r="14" fill="none" className={heroTrend > 0 ? "stroke-indigo-500" : heroTrend < 0 ? "stroke-rose-500" : "stroke-zinc-400"} strokeWidth="4" strokeDasharray={2 * Math.PI * 14} strokeDashoffset={(2 * Math.PI * 14) - ((Math.min(100, Math.abs(heroTrend))) / 100) * (2 * Math.PI * 14)} strokeLinecap="round" style={{ transition: 'stroke-dashoffset 1s ease-out' }} />
                                </svg>
                                <div className={`absolute inset-0 flex items-center justify-center ${heroTrend > 0 ? 'text-indigo-600' : heroTrend < 0 ? 'text-rose-600' : 'text-zinc-500'}`}>
                                   <TrendingUp size={10} className={`stroke-[3px] ${heroTrend < 0 ? 'rotate-180' : ''}`} />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
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
                                <div className="w-full h-1 bg-zinc-100 rounded-full overflow-hidden"><div className="bg-indigo-500 h-full rounded-full" style={{ width: `${(data.productiveOutlets / (data.visits || 1)) * 100}%` }} /></div>
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
                                <div className="w-full h-1 bg-indigo-100 rounded-full overflow-hidden"><div className="h-full bg-indigo-600 rounded-full" style={{ width: `${Math.min(100, Math.max(0, data.strike))}%` }} /></div>
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
