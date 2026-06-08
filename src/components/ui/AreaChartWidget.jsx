import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function AreaChartWidget({ data, dataKey, xAxisKey, color, title, subtitle }) {
  // data should be an array of objects
  
  return (
    <div className="flex flex-col w-full h-[320px]">
      <div className="mb-4">
        {title && <h3 className="text-sm font-extrabold text-[var(--color-text-main)]">{title}</h3>}
        {subtitle && <p className="text-xs text-[var(--color-text-muted)] font-medium">{subtitle}</p>}
      </div>
      
      <div className="w-full h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id={`color${dataKey}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={color} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4e4e7" />
            <XAxis 
              dataKey={xAxisKey} 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#71717a', fontSize: 10, fontWeight: 600 }}
              dy={10}
              tickFormatter={(value) => value.length > 10 ? value.substring(0, 10) + '...' : value}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#a1a1aa', fontSize: 10, fontWeight: 600 }}
              tickFormatter={(value) => value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.98)',
                borderRadius: '16px',
                border: '1px solid #e4e4e7',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)'
              }}
              itemStyle={{ fontWeight: 800, fontSize: '13px', color: color }}
              labelStyle={{ fontWeight: 800, fontSize: '12px', color: '#52525b', marginBottom: '8px' }}
            />
            <Area 
              type="monotone" 
              dataKey={dataKey} 
              stroke={color} 
              strokeWidth={3}
              fillOpacity={1} 
              fill={`url(#color${dataKey})`} 
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
