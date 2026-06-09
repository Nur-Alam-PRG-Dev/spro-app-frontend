'use client';
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { MapPin } from 'lucide-react';

const COLORS = ['#004b23', '#22c55e', '#f59e0b', '#ef4444'];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-zinc-900/95 backdrop-blur px-4 py-3 rounded-xl shadow-2xl border border-white/10 text-white">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: payload[0].payload.color }} />
          <p className="font-bold text-[13px]">{payload[0].name}</p>
        </div>
        <p className="text-[15px] font-black mt-1 ml-4">
          {payload[0].value} <span className="text-[11px] font-medium text-zinc-400">outlets</span>
        </p>
      </div>
    );
  }
  return null;
};

export default function CoverageDonutChart({ productiveVisits = 0, totalVisits = 0, unvisitedCount = 0 }) {
  const unproductive = Math.max(0, totalVisits - productiveVisits);
  const data = [
    { name: 'Productive Visits', value: productiveVisits, color: '#004b23' },
    { name: 'Unproductive Visits', value: unproductive, color: '#22c55e' },
    { name: 'Unvisited Outlets', value: unvisitedCount, color: '#f59e0b' },
  ].filter(d => d.value > 0);

  if (!data.length) data.push({ name: 'No Data', value: 1, color: '#e4e4e7' });

  const total = data.reduce((s, d) => s + d.value, 0);
  const prodPct = total > 0 ? ((productiveVisits / total) * 100).toFixed(0) : 0;

  return (
    <div className="bg-gradient-to-br from-[#4c1d95] to-[#2e1065] rounded-[12px] border border-purple-800/50 shadow-[0_8px_20px_rgba(76,29,149,0.3)] p-3 flex flex-col h-full relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '12px 12px' }} />
      <div className="mb-1 relative z-10">
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded bg-white/10 flex items-center justify-center border border-white/20">
            <MapPin size={10} className="text-purple-300" />
          </div>
          <h3 className="text-[13px] font-black text-white tracking-tight leading-none">Coverage Overview</h3>
        </div>
        <p className="text-[9px] text-purple-200/70 font-medium mt-1">Today's outlet coverage</p>
      </div>
      <div className="flex-1 flex items-center justify-center min-h-[160px] relative -mt-4 z-10">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={70} outerRadius={100}
              paddingAngle={4} dataKey="value" stroke="none" cornerRadius={5}>
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-2xl font-black text-white drop-shadow-md">{prodPct}%</span>
          <span className="text-[10px] font-bold text-purple-200 uppercase tracking-wide">Productive</span>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 space-y-2 relative z-10">
        {data.filter(d => d.name !== 'No Data').map((item, i) => (
          <div key={i} className="flex items-center justify-between group hover:bg-white/10 rounded-lg px-2 py-1 transition-colors cursor-default border border-transparent hover:border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full flex-shrink-0 shadow-inner" style={{ backgroundColor: item.color }} />
              <span className="text-[12px] font-semibold text-purple-100">{item.name}</span>
            </div>
            <span className="text-[12px] font-black text-white">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
