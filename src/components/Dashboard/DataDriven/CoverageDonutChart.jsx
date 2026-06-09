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
    <div className="bg-white rounded-[20px] border border-[var(--color-border)] shadow-sm p-6 flex flex-col h-full">
      <div className="mb-4">
        <h3 className="text-[15px] font-bold text-zinc-800 tracking-tight">Coverage Overview</h3>
        <p className="text-[12px] text-zinc-400 font-medium mt-0.5">Today's outlet coverage breakdown</p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative min-h-[200px]">
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={55} outerRadius={80}
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
          <span className="text-2xl font-black text-zinc-800">{prodPct}%</span>
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">Productive</span>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 space-y-2">
        {data.filter(d => d.name !== 'No Data').map((item, i) => (
          <div key={i} className="flex items-center justify-between group hover:bg-zinc-50 rounded-lg px-2 py-1 transition-colors cursor-default">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
              <span className="text-[12px] font-semibold text-zinc-600">{item.name}</span>
            </div>
            <span className="text-[12px] font-black text-zinc-800">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
