import React from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';

export default function SessionBarWidget({ data, formatNum }) {
  const COLORS = ['#10b981', '#0ea5e9'];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-[var(--color-border)] rounded-xl shadow-lg">
          <p className="text-xs font-bold text-[var(--color-text-main)]">{payload[0].payload.name}</p>
          <p className="text-sm font-black text-indigo-800">
            {formatNum ? formatNum(payload[0].value) : payload[0].value} Orders
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col w-full h-[180px] sm:h-[220px]">
      <div className="w-full h-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#71717a', fontWeight: 600 }} dy={5} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f4f4f5' }} />
            <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={40}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
              <LabelList 
                dataKey="value" 
                position="top" 
                content={(props) => {
                  const { x, y, width, value } = props;
                  const total = data.reduce((acc, curr) => acc + curr.value, 0);
                  const percent = total > 0 ? ((value / total) * 100).toFixed(0) : 0;
                  return (
                    <g>
                      <text x={x + width / 2} y={y - 14} fill="#52525b" textAnchor="middle" dominantBaseline="middle" className="text-[10px] font-black">
                        {formatNum ? formatNum(value) : value}
                      </text>
                      <text x={x + width / 2} y={y - 4} fill="#a1a1aa" textAnchor="middle" dominantBaseline="middle" className="text-[8px] font-bold">
                        ({percent}%)
                      </text>
                    </g>
                  );
                }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
