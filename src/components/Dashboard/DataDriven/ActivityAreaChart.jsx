'use client';
import React, { useState } from 'react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { Activity } from 'lucide-react';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-zinc-900/95 backdrop-blur p-3 rounded-xl shadow-2xl border border-cyan-800/50 text-white min-w-[150px]">
        <p className="text-[11px] font-bold text-cyan-200 mb-2 uppercase tracking-wider">{label}</p>
        {payload.map((entry, i) => (
          <div key={i} className="flex items-center justify-between gap-3 mt-1">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="text-[12px] font-semibold text-cyan-100">{entry.name}</span>
            </div>
            <span className="text-[12px] font-black text-white">
              {entry.dataKey === 'revenue' ? `৳${entry.value >= 1000 ? (entry.value/1000).toFixed(1)+'k' : entry.value}` : entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function ActivityAreaChart({ chartData = [] }) {
  const [mode, setMode] = useState('area'); // 'area' | 'bar'

  return (
    <div className="bg-gradient-to-br from-[#083344] to-[#164e63] rounded-[12px] border border-cyan-800/50 shadow-[0_8px_20px_rgba(8,51,68,0.3)] p-3 flex flex-col h-full overflow-hidden relative">
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '12px 12px' }} />
      <div className="flex items-center justify-between mb-2 relative z-10">
        <div>
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-md bg-white/10 flex items-center justify-center border border-white/20">
              <Activity size={12} className="text-cyan-300" />
            </div>
            <h3 className="text-[14px] font-black text-white tracking-tight leading-none">Activity Overview</h3>
          </div>
          <p className="text-[10px] text-cyan-200/70 font-medium mt-1">7-Day performance trends</p>
        </div>
        
        <div className="flex bg-white/5 p-0.5 rounded-md border border-white/10 shadow-inner">
          <button
            onClick={() => setMode('area')}
            className={`px-2 py-1 rounded-[4px] text-[9px] font-bold transition-all ${
              mode === 'area' ? 'bg-cyan-500 text-white shadow-sm' : 'text-cyan-200/50 hover:text-cyan-100'
            }`}
          >
            Area
          </button>
          <button
            onClick={() => setMode('bar')}
            className={`px-2 py-1 rounded-[4px] text-[9px] font-bold transition-all ${
              mode === 'bar' ? 'bg-cyan-500 text-white shadow-sm' : 'text-cyan-200/50 hover:text-cyan-100'
            }`}
          >
            Bar
          </button>
        </div>
      </div>

      <div className="flex-1 min-h-[160px] w-full mt-1 relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          {mode === 'area' ? (
            <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="gradRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradVis" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#34d399" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#67e8f9', fontSize: 10, fontWeight: 600 }} dy={8} />
              
              {/* Left Y-Axis for Revenue */}
              <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: '#67e8f9', fontSize: 10 }} width={45}
                tickFormatter={v => v >= 1000 ? `৳${(v/1000).toFixed(0)}k` : v} />
              
              {/* Right Y-Axis for Visits */}
              <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: '#67e8f9', fontSize: 10 }} width={35} />
              
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1 }} />
              <Legend wrapperStyle={{ fontSize: '11px', fontWeight: 600, paddingTop: '12px', color: '#fff' }} />
              <Area yAxisId="left" type="monotone" dataKey="revenue" name="Revenue" stroke="#22d3ee" strokeWidth={2.5}
                fill="url(#gradRev)" activeDot={{ r: 5, fill: '#22d3ee', stroke: '#fff', strokeWidth: 2 }} />
              <Area yAxisId="right" type="monotone" dataKey="visits" name="Visits" stroke="#34d399" strokeWidth={2.5}
                fill="url(#gradVis)" activeDot={{ r: 5, fill: '#34d399', stroke: '#fff', strokeWidth: 2 }} />
            </AreaChart>
          ) : (
            <BarChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#67e8f9', fontSize: 10, fontWeight: 600 }} dy={8} />
              
              {/* Left Y-Axis for Revenue */}
              <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: '#67e8f9', fontSize: 10 }} width={45}
                tickFormatter={v => v >= 1000 ? `৳${(v/1000).toFixed(0)}k` : v} />
              
              {/* Right Y-Axis for Visits */}
              <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: '#67e8f9', fontSize: 10 }} width={35} />

              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
              <Legend wrapperStyle={{ fontSize: '11px', fontWeight: 600, paddingTop: '12px', color: '#fff' }} />
              <Bar yAxisId="left" dataKey="revenue" name="Revenue" fill="#22d3ee" radius={[4, 4, 0, 0]} maxBarSize={20} />
              <Bar yAxisId="right" dataKey="visits" name="Visits" fill="#34d399" radius={[4, 4, 0, 0]} maxBarSize={20} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
