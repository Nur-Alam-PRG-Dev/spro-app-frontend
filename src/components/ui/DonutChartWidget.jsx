import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function DonutChartWidget({ data, colors, title, subtitle }) {
  // data should be an array of objects like [{ name: 'Visited', value: 400 }, { name: 'Unvisited', value: 300 }]
  
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="text-center mb-1">
        {title && <h3 className="text-sm font-extrabold text-[var(--color-text-main)] leading-tight">{title}</h3>}
        {subtitle && <p className="text-[10px] text-[var(--color-text-muted)] font-medium leading-tight">{subtitle}</p>}
      </div>
      
      <div className="w-full h-28 sm:h-32">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={35}
              outerRadius={50}
              paddingAngle={4}
              dataKey="value"
              stroke="none"
              animationBegin={0}
              animationDuration={800}
              animationEasing="ease-out"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '12px',
                border: '1px solid #f4f4f5',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }}
              itemStyle={{ fontWeight: 800, fontSize: '13px' }}
            />
            <Legend 
              verticalAlign="bottom" 
              height={24} 
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: '10px', fontWeight: 600, color: '#52525b' }} 
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
