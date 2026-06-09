'use client';
import React from 'react';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, Tooltip
} from 'recharts';
import { Users } from 'lucide-react';

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
    <div className="bg-gradient-to-br from-[#9f1239] to-[#4c0519] rounded-[12px] border border-rose-800/50 shadow-[0_8px_20px_rgba(159,18,57,0.3)] p-3 flex flex-col h-full relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '12px 12px' }} />
      <div className="mb-1 relative z-10">
        <h3 className="text-[13px] font-black text-white tracking-tight leading-none flex items-center gap-1.5">
          <div className="w-4 h-4 rounded bg-white/10 flex items-center justify-center border border-white/20">
            <Users size={10} className="text-rose-300" />
          </div>
          Team Overview
        </h3>
        <p className="text-[9px] text-rose-200/70 font-medium mt-1">Average performance by designation</p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative min-h-[160px] -mt-2 z-10">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
            <PolarGrid stroke="rgba(255,255,255,0.1)" />
            <PolarAngleAxis dataKey="designation" tick={{ fontSize: 9, fill: '#fda4af' }} />
            <Tooltip content={<CustomTooltip />} />
            <Radar name="Visits" dataKey="visits" stroke="#fda4af" fill="#fda4af" fillOpacity={0.2} strokeWidth={2}
              dot={{ r: 3, fill: '#fda4af', stroke: '#fff', strokeWidth: 1.5 }} />
            <Radar name="Productive" dataKey="productive" stroke="#4ade80" fill="#4ade80" fillOpacity={0.15} strokeWidth={2}
              dot={{ r: 3, fill: '#4ade80', stroke: '#fff', strokeWidth: 1.5 }} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center gap-4 mt-2 relative z-10">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-[#fda4af] opacity-40 border border-[#fda4af]" />
          <span className="text-[9px] font-bold text-rose-200">Total Visits</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-[#4ade80] opacity-40 border border-[#4ade80]" />
          <span className="text-[9px] font-bold text-emerald-200">Productive</span>
        </div>
      </div>
    </div>
  );
}
