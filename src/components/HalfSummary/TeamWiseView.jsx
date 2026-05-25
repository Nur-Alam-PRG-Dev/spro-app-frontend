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
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Team Revenue */}
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

        {/* Total Orders */}
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

        {/* Active Reps */}
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

        {/* Avg. Strike Rate */}
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

      </div>

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
                <div className="flex items-center gap-3 min-w-0">
                  {/* Initials Avatar */}
                  <div className={`w-11 h-11 rounded-xl ${getAvatarBg(rep.avatarColor)} flex items-center justify-center font-extrabold text-sm shrink-0`}>
                    {rep.initials}
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-extrabold text-sm sm:text-base text-[var(--color-text-main)] truncate leading-tight">
                      {rep.name}
                    </h4>
                    <span className="text-xs text-[var(--color-text-muted)] font-semibold mt-1 block">
                      {rep.role}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-5 shrink-0">
                  <div className="text-right">
                    <span className="block text-[8px] font-black text-[var(--color-text-muted)] uppercase tracking-wider">
                      Total Revenue
                    </span>
                    <span className="text-sm sm:text-base font-extrabold text-[var(--color-text-main)]">
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
                    <div className="border border-[var(--color-border)] rounded-2xl p-4 bg-white space-y-4">
                      <div className="flex items-center gap-2 border-b border-[var(--color-border)] pb-2">
                        <Calendar size={14} className="text-[var(--color-text-muted)]" />
                        <span className="text-xs font-extrabold text-[var(--color-text-main)] uppercase tracking-wider">
                          1st Half Performance (Jan - Jun)
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        {/* Order Amount */}
                        <div className="bg-zinc-50/50 rounded-xl p-3 border border-zinc-100">
                          <span className="block text-[9px] font-bold text-[var(--color-text-muted)] uppercase">Order Amount</span>
                          <span className="block text-base font-black text-emerald-800 mt-1">
                            {formatCurrency(rep.performanceH1.orderAmount)}
                          </span>
                        </div>
                        {/* Order Count */}
                        <div className="bg-zinc-50/50 rounded-xl p-3 border border-zinc-100">
                          <span className="block text-[9px] font-bold text-[var(--color-text-muted)] uppercase">Order Count</span>
                          <span className="block text-base font-black text-[var(--color-text-main)] mt-1">
                            {formatNum(rep.performanceH1.orderCount)}
                          </span>
                        </div>
                      </div>

                      {/* Detail Grid */}
                      <div className="grid grid-cols-4 gap-2 pt-2 text-center">
                        <div className="space-y-1">
                          <span className="block text-[8px] font-extrabold text-[var(--color-text-muted)] uppercase">Visits</span>
                          <span className="block text-xs font-black text-[var(--color-text-main)]">{formatNum(rep.performanceH1.visits)}</span>
                        </div>
                        <div className="space-y-1">
                          <span className="block text-[8px] font-extrabold text-[var(--color-text-muted)] uppercase">Prod. %</span>
                          <span className="block text-xs font-black text-[var(--color-text-main)]">{rep.performanceH1.productivity}%</span>
                        </div>
                        <div className="space-y-1">
                          <span className="block text-[8px] font-extrabold text-[var(--color-text-muted)] uppercase">LPC</span>
                          <span className="block text-xs font-black text-[var(--color-text-main)]">{rep.performanceH1.lpc}</span>
                        </div>
                        <div className="space-y-1">
                          <span className="block text-[8px] font-extrabold text-[var(--color-text-muted)] uppercase">Strike %</span>
                          <span className="block text-xs font-black text-[var(--color-text-main)]">{rep.performanceH1.strike}%</span>
                        </div>
                      </div>
                    </div>

                    {/* 2nd Half Performance block */}
                    <div className="border border-[var(--color-border)] rounded-2xl p-4 bg-white space-y-4">
                      <div className="flex items-center gap-2 border-b border-[var(--color-border)] pb-2">
                        <Calendar size={14} className="text-[var(--color-text-muted)]" />
                        <span className="text-xs font-extrabold text-[var(--color-text-main)] uppercase tracking-wider">
                          2nd Half Performance (Jul - Dec)
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        {/* Order Amount */}
                        <div className="bg-zinc-50/50 rounded-xl p-3 border border-zinc-100">
                          <span className="block text-[9px] font-bold text-[var(--color-text-muted)] uppercase">Order Amount</span>
                          <div className="flex items-center gap-1.5 mt-1">
                            <span className="text-base font-black text-emerald-800">
                              {formatCurrency(rep.performanceH2.orderAmount)}
                            </span>
                            <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-1 rounded flex items-center">
                              ▲
                            </span>
                          </div>
                        </div>
                        {/* Order Count */}
                        <div className="bg-zinc-50/50 rounded-xl p-3 border border-zinc-100">
                          <span className="block text-[9px] font-bold text-[var(--color-text-muted)] uppercase">Order Count</span>
                          <div className="flex items-center gap-1.5 mt-1">
                            <span className="text-base font-black text-[var(--color-text-main)]">
                              {formatNum(rep.performanceH2.orderCount)}
                            </span>
                            <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-1 rounded flex items-center">
                              ▲
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Detail Grid */}
                      <div className="grid grid-cols-4 gap-2 pt-2 text-center">
                        <div className="space-y-1">
                          <span className="block text-[8px] font-extrabold text-[var(--color-text-muted)] uppercase">Visits</span>
                          <span className="block text-xs font-black text-[var(--color-text-main)]">{formatNum(rep.performanceH2.visits)}</span>
                        </div>
                        <div className="space-y-1">
                          <span className="block text-[8px] font-extrabold text-[var(--color-text-muted)] uppercase">Prod. %</span>
                          <span className="block text-xs font-black text-[var(--color-text-main)]">{rep.performanceH2.productivity}%</span>
                        </div>
                        <div className="space-y-1">
                          <span className="block text-[8px] font-extrabold text-[var(--color-text-muted)] uppercase">LPC</span>
                          <span className="block text-xs font-black text-[var(--color-text-main)]">{rep.performanceH2.lpc}</span>
                        </div>
                        <div className="space-y-1">
                          <span className="block text-[8px] font-extrabold text-[var(--color-text-muted)] uppercase">Strike %</span>
                          <span className="block text-xs font-black text-[var(--color-text-main)]">{rep.performanceH2.strike}%</span>
                        </div>
                      </div>
                    </div>

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
