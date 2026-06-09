'use client';
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { PieChart as PieChartIcon } from 'lucide-react';

const COLORS = [
  '#f43f5e', // rose
  '#f97316', // orange
  '#eab308', // yellow
  '#22c55e', // green
  '#06b6d4', // cyan
  '#3b82f6', // blue
  '#8b5cf6', // violet
  '#d946ef', // fuchsia
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-zinc-900/95 backdrop-blur px-3 py-2 rounded-xl shadow-xl border border-white/10 text-white">
        <p className="text-[11px] font-bold text-zinc-400 mb-1">{payload[0].name}</p>
        <p className="text-[13px] font-black text-white">
          ৳{payload[0].value >= 1000 ? (payload[0].value / 1000).toFixed(1) + 'k' : payload[0].value.toFixed(0)}
        </p>
      </div>
    );
  }
  return null;
};

export default function TeamRevenueDonutChart({ rawData = [] }) {
  // Helper to format name to "First5... Last" to keep chart legends clean
  const formatName = (fullName) => {
    if (!fullName) return 'Unknown';
    const nameStr = fullName.trim();
    const parts = nameStr.split(' ');
    if (parts.length === 1) return nameStr.length > 8 ? `${nameStr.substring(0, 5)}...` : nameStr;
    const first5 = nameStr.substring(0, 5);
    const lastName = parts[parts.length - 1];
    if (nameStr.length <= 8) return nameStr;
    return `${first5}... ${lastName}`;
  };

  const data = rawData.map(sr => {
    const revenue = parseFloat(sr.first_half?.order_amount || 0) + parseFloat(sr.second_half?.order_amount || 0);
    return {
      name: formatName(sr.sr_name || sr.aemp_name),
      value: revenue,
    };
  }).filter(d => d.value > 0).sort((a, b) => b.value - a.value);

  // If no data
  if (data.length === 0) {
    data.push({ name: 'No Data', value: 1 });
  }

  return (
    <div className="bg-gradient-to-br from-[#2e1065] to-[#4c1d95] rounded-[12px] border border-violet-800/50 shadow-[0_8px_20px_rgba(46,16,101,0.3)] p-3 flex flex-col h-full relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '12px 12px' }} />
      
      <div className="mb-2 relative z-10 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-md bg-white/10 flex items-center justify-center border border-white/20">
              <PieChartIcon size={12} className="text-violet-300" />
            </div>
            <h3 className="text-[13px] font-black text-white tracking-tight leading-none">Revenue Distribution</h3>
          </div>
          <p className="text-[9px] text-violet-200/70 font-medium mt-1">Sales breakdown by team member</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative min-h-[180px] z-10">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={75}
              paddingAngle={4}
              dataKey="value"
              stroke="none"
              cornerRadius={4}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.name === 'No Data' ? '#4c1d95' : COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="bottom" 
              height={36} 
              iconType="circle"
              wrapperStyle={{ fontSize: '10px', fontWeight: 600, color: '#ddd' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
