'use client';
import React from 'react';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, Tooltip
} from 'recharts';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-zinc-900/95 backdrop-blur px-3 py-2 rounded-xl shadow-xl border border-white/10 text-white">
        <p className="text-[12px] font-bold">{payload[0].payload.subject}</p>
        <p className="text-[14px] font-black text-emerald-400">{payload[0].value}</p>
      </div>
    );
  }
  return null;
};

export default function TeamRadarChart({ rawData = [] }) {
  // Build radar data from top-5 SRs by visit_count
  const sorted = [...rawData].sort((a, b) => (b.visit_count || 0) - (a.visit_count || 0)).slice(0, 6);

  const data = sorted.map(item => ({
    subject: item.aemp_name?.split(' ')[0] || 'SR',
    visits: parseInt(item.visit_count || 0),
    productive: parseInt(item.productive_count || 0),
    revenue: parseFloat(item.order_amount || 0),
  }));

  if (!data.length) {
    return (
      <div className="bg-white rounded-[20px] border border-[var(--color-border)] shadow-sm p-6 flex flex-col h-full items-center justify-center">
        <p className="text-zinc-400 text-sm font-semibold">No team data available</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[20px] border border-[var(--color-border)] shadow-sm p-6 flex flex-col h-full">
      <div className="mb-4">
        <h3 className="text-[15px] font-bold text-zinc-800 tracking-tight">Team Performance Radar</h3>
        <p className="text-[12px] text-zinc-400 font-medium mt-0.5">Visit activity — Last 7 days</p>
      </div>
      <div className="flex-1 min-h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
            <PolarGrid stroke="#f4f4f5" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#71717a', fontSize: 11, fontWeight: 600 }} />
            <PolarRadiusAxis angle={30} domain={[0, 'auto']} tick={{ fontSize: 9, fill: '#a1a1aa' }} />
            <Tooltip content={<CustomTooltip />} />
            <Radar name="Visits" dataKey="visits" stroke="#004b23" fill="#004b23" fillOpacity={0.2} strokeWidth={2}
              dot={{ r: 3, fill: '#004b23', stroke: '#fff', strokeWidth: 1.5 }} />
            <Radar name="Productive" dataKey="productive" stroke="#22c55e" fill="#22c55e" fillOpacity={0.15} strokeWidth={2}
              dot={{ r: 3, fill: '#22c55e', stroke: '#fff', strokeWidth: 1.5 }} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center gap-4 mt-2 justify-center">
        <span className="flex items-center gap-1.5 text-[11px] font-bold text-zinc-500">
          <span className="w-3 h-0.5 bg-[#004b23] rounded-full inline-block"></span> Visits
        </span>
        <span className="flex items-center gap-1.5 text-[11px] font-bold text-zinc-500">
          <span className="w-3 h-0.5 bg-[#22c55e] rounded-full inline-block"></span> Productive
        </span>
      </div>
    </div>
  );
}
