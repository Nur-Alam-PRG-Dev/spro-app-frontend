import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function ComparisonBarChartWidget({ data, dataKey1, dataKey2, name1, name2, colors, title, subtitle }) {
  // data should be an array of objects like [{ name: 'Jan', value1: 400, value2: 300 }]
  
  return (
    <div className="flex flex-col w-full h-[320px]">
      <div className="mb-4">
        {title && <h3 className="text-sm font-extrabold text-[var(--color-text-main)]">{title}</h3>}
        {subtitle && <p className="text-xs text-[var(--color-text-muted)] font-medium">{subtitle}</p>}
      </div>
      
      <div className="w-full h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 5 }}
            barSize={12}
            barGap={8}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4e4e7" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#71717a', fontSize: 11, fontWeight: 600 }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#a1a1aa', fontSize: 10, fontWeight: 600 }}
              tickFormatter={(value) => value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value}
            />
            <Tooltip
              cursor={{ fill: '#f4f4f5' }}
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.98)',
                borderRadius: '16px',
                border: '1px solid #e4e4e7',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)'
              }}
              itemStyle={{ fontWeight: 800, fontSize: '13px' }}
              labelStyle={{ fontWeight: 800, fontSize: '12px', color: '#52525b', marginBottom: '8px' }}
            />
            <Legend 
              iconType="circle" 
              wrapperStyle={{ fontSize: '12px', fontWeight: 600, color: '#52525b', paddingTop: '10px' }}
            />
            <Bar 
              dataKey={dataKey1} 
              name={name1} 
              fill={colors[0]} 
              radius={[4, 4, 4, 4]} 
              animationDuration={1200}
            />
            <Bar 
              dataKey={dataKey2} 
              name={name2} 
              fill={colors[1]} 
              radius={[4, 4, 4, 4]} 
              animationDuration={1200}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
