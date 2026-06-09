'use client';
import React, { useState } from 'react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-zinc-900/95 backdrop-blur p-3 rounded-xl shadow-2xl border border-white/10 text-white min-w-[150px]">
        <p className="text-[11px] font-bold text-zinc-400 mb-2 uppercase tracking-wider">{label}</p>
        {payload.map((entry, i) => (
          <div key={i} className="flex items-center justify-between gap-3 mt-1">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="text-[12px] font-semibold text-zinc-300">{entry.name}</span>
            </div>
            <span className="text-[12px] font-black text-white">
              {entry.dataKey === 'revenue' ? `$${entry.value >= 1000 ? (entry.value/1000).toFixed(1)+'k' : entry.value}` : entry.value}
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
    <div className="bg-white rounded-[20px] border border-[var(--color-border)] shadow-sm p-6 flex flex-col h-full">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-[15px] font-bold text-zinc-800 tracking-tight">7-Day Activity Summary</h3>
          <p className="text-[12px] text-zinc-400 font-medium mt-0.5">Revenue vs Visits — Last 7 days</p>
        </div>
        <div className="flex gap-1 bg-zinc-100 p-1 rounded-lg">
          {['area', 'bar'].map(m => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`text-[11px] font-bold px-3 py-1.5 rounded-md transition-all capitalize ${
                mode === m ? 'bg-white text-[var(--color-primary)] shadow-sm' : 'text-zinc-400 hover:text-zinc-600'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 min-h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          {mode === 'area' ? (
            <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="gradRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#004b23" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#004b23" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradVis" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f4f4f5" />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#a1a1aa', fontSize: 11, fontWeight: 600 }} dy={8} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#a1a1aa', fontSize: 11 }} width={45}
                tickFormatter={v => v >= 1000 ? `$${(v/1000).toFixed(0)}k` : v} />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#e4e4e7', strokeWidth: 1 }} />
              <Legend wrapperStyle={{ fontSize: '12px', fontWeight: 600, paddingTop: '12px' }} />
              <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#004b23" strokeWidth={2.5}
                fill="url(#gradRev)" activeDot={{ r: 5, fill: '#004b23', stroke: '#fff', strokeWidth: 2 }} />
              <Area type="monotone" dataKey="visits" name="Visits" stroke="#2563eb" strokeWidth={2.5}
                fill="url(#gradVis)" activeDot={{ r: 5, fill: '#2563eb', stroke: '#fff', strokeWidth: 2 }} />
            </AreaChart>
          ) : (
            <BarChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f4f4f5" />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#a1a1aa', fontSize: 11, fontWeight: 600 }} dy={8} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#a1a1aa', fontSize: 11 }} width={45}
                tickFormatter={v => v >= 1000 ? `$${(v/1000).toFixed(0)}k` : v} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f4f4f5' }} />
              <Legend wrapperStyle={{ fontSize: '12px', fontWeight: 600, paddingTop: '12px' }} />
              <Bar dataKey="revenue" name="Revenue" fill="#004b23" radius={[6, 6, 0, 0]} maxBarSize={24} />
              <Bar dataKey="visits" name="Visits" fill="#2563eb" radius={[6, 6, 0, 0]} maxBarSize={24} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
