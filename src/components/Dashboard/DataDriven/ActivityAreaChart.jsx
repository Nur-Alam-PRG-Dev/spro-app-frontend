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
      <div className="bg-white/95 backdrop-blur p-3 rounded-xl shadow-lg border border-zinc-200 min-w-[150px]">
        <p className="text-[11px] font-bold text-zinc-500 mb-2 uppercase tracking-wider">{label}</p>
        {payload.map((entry, i) => (
          <div key={i} className="flex items-center justify-between gap-3 mt-1">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="text-[12px] font-semibold text-zinc-600">{entry.name}</span>
            </div>
            <span className="text-[12px] font-black text-zinc-800">
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
    <div className="bg-white rounded-[12px] border border-[var(--color-border)] shadow-sm p-3 flex flex-col h-full overflow-hidden">
      <div className="flex items-center justify-between mb-2">
        <div>
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-md bg-indigo-50 flex items-center justify-center">
              <Activity size={12} className="text-indigo-600" />
            </div>
            <h3 className="text-[14px] font-black text-zinc-800 tracking-tight leading-none">Activity Overview</h3>
          </div>
          <p className="text-[10px] text-zinc-400 font-medium mt-1">7-Day performance trends</p>
        </div>
        
        <div className="flex bg-zinc-100/80 p-0.5 rounded-md border border-zinc-200/50 shadow-inner">
          <button
            onClick={() => setMode('area')}
            className={`px-2 py-1 rounded-[4px] text-[9px] font-bold transition-all ${
              mode === 'area' ? 'bg-white text-emerald-700 shadow-sm' : 'text-zinc-500 hover:text-zinc-800'
            }`}
          >
            Area
          </button>
          <button
            onClick={() => setMode('bar')}
            className={`px-2 py-1 rounded-[4px] text-[9px] font-bold transition-all ${
              mode === 'bar' ? 'bg-white text-blue-700 shadow-sm' : 'text-zinc-500 hover:text-zinc-800'
            }`}
          >
            Bar
          </button>
        </div>
      </div>

      <div className="flex-1 min-h-[160px] w-full mt-1">
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
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#a1a1aa', fontSize: 10, fontWeight: 600 }} dy={8} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#a1a1aa', fontSize: 10 }} width={45}
                tickFormatter={v => v >= 1000 ? `৳${(v/1000).toFixed(0)}k` : v} />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#e4e4e7', strokeWidth: 1 }} />
              <Legend wrapperStyle={{ fontSize: '11px', fontWeight: 600, paddingTop: '12px' }} />
              <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#004b23" strokeWidth={2.5}
                fill="url(#gradRev)" activeDot={{ r: 5, fill: '#004b23', stroke: '#fff', strokeWidth: 2 }} />
              <Area type="monotone" dataKey="visits" name="Visits" stroke="#2563eb" strokeWidth={2.5}
                fill="url(#gradVis)" activeDot={{ r: 5, fill: '#2563eb', stroke: '#fff', strokeWidth: 2 }} />
            </AreaChart>
          ) : (
            <BarChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f4f4f5" />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#a1a1aa', fontSize: 10, fontWeight: 600 }} dy={8} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#a1a1aa', fontSize: 10 }} width={45}
                tickFormatter={v => v >= 1000 ? `৳${(v/1000).toFixed(0)}k` : v} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f4f4f5' }} />
              <Legend wrapperStyle={{ fontSize: '11px', fontWeight: 600, paddingTop: '12px' }} />
              <Bar dataKey="revenue" name="Revenue" fill="#004b23" radius={[4, 4, 0, 0]} maxBarSize={20} />
              <Bar dataKey="visits" name="Visits" fill="#2563eb" radius={[4, 4, 0, 0]} maxBarSize={20} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
