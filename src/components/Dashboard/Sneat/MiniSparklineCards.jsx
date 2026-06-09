import React from 'react';
import { BarChart, Bar, ResponsiveContainer, Cell, AreaChart, Area, XAxis } from 'recharts';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';

const visitorsData = [
  { name: 'M', value: 20 },
  { name: 'T', value: 40 },
  { name: 'W', value: 30 },
  { name: 'T', value: 20 },
  { name: 'F', value: 35 },
  { name: 'S', value: 60 },
  { name: 'S', value: 40 },
];

const activityData = [
  { name: 'Mo', value: 10 },
  { name: 'Tu', value: 30 },
  { name: 'We', value: 20 },
  { name: 'Th', value: 80 },
  { name: 'Fr', value: 40 },
  { name: 'Sa', value: 60 },
  { name: 'Su', value: 50 },
];

export function NewVisitorsCard() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[var(--color-border)] p-5 flex flex-col h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-[15px] font-bold text-zinc-800">New Visitors</h3>
        <span className="text-[11px] font-medium text-zinc-400">Last Week</span>
      </div>

      <div className="flex items-end justify-between flex-1">
        <div className="pb-2">
          <h4 className="text-3xl font-bold text-zinc-800">23%</h4>
          <p className="text-[12px] font-bold text-rose-500 mt-1 flex items-center gap-0.5">
            <ArrowDownRight size={14} />
            8.75%
          </p>
        </div>

        <div className="h-[80px] w-2/3">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={visitorsData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#a1acb8' }} dy={10} />
              <Bar dataKey="value" radius={[4, 4, 4, 4]} barSize={10}>
                {visitorsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 5 ? '#696cff' : '#e2e4ff'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export function ActivityCard() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[var(--color-border)] p-5 flex flex-col h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-[15px] font-bold text-zinc-800">Activity</h3>
        <span className="text-[11px] font-medium text-zinc-400">Last Week</span>
      </div>

      <div className="flex items-end justify-between flex-1">
        <div className="pb-2">
          <h4 className="text-3xl font-bold text-zinc-800">82%</h4>
          <p className="text-[12px] font-bold text-emerald-500 mt-1 flex items-center gap-0.5">
            <ArrowUpRight size={14} />
            19.6%
          </p>
        </div>

        <div className="h-[80px] w-2/3">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={activityData} margin={{ top: 10, right: 0, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="colorActivity" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#71dd37" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#71dd37" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#a1acb8' }} dy={10} />
              <Area type="monotone" dataKey="value" stroke="#71dd37" strokeWidth={3} fillOpacity={1} fill="url(#colorActivity)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
