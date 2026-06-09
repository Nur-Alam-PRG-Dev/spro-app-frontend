import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export default function SessionDonutWidget({ data, formatCurrency }) {
  const COLORS = ['#10b981', '#0ea5e9']; // Emerald (AM), Sky Blue (PM)

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-[var(--color-border)] rounded-xl shadow-lg">
          <p className="text-xs font-bold text-[var(--color-text-main)]">{payload[0].name}</p>
          <p className="text-sm font-black text-emerald-800">
            {formatCurrency(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col w-full h-[180px] sm:h-[220px]">
      <div className="w-full h-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius="50%"
              outerRadius="75%"
              paddingAngle={5}
              dataKey="value"
              stroke="none"
              labelLine={false}
              label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
                const RADIAN = Math.PI / 180;
                const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                const y = cy + radius * Math.sin(-midAngle * RADIAN);
                
                if (percent === 0) return null;

                return (
                  <text 
                    x={x} 
                    y={y} 
                    fill="white" 
                    textAnchor={x > cx ? 'start' : 'end'} 
                    dominantBaseline="central"
                    className="text-[10px] font-black"
                  >
                    {`${(percent * 100).toFixed(0)}%`}
                  </text>
                );
              }}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-[10px] font-extrabold text-[var(--color-text-muted)] uppercase tracking-wider">
            Revenue
          </span>
        </div>
      </div>
      <div className="flex items-center justify-center gap-4 mt-2">
        {data.map((entry, idx) => (
          <div key={idx} className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[idx] }} />
            <span className="text-xs font-bold text-[var(--color-text-main)]">{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
