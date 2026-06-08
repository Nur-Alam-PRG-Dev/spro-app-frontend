import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine
} from 'recharts';

export default function BidirectionalBarChartWidget({
  title,
  subtitle,
  data,
  xAxisKey = 'name',
  dataKey1 = 'AM',
  dataKey2 = 'PM',
  name1 = '1st Half',
  name2 = '2nd Half',
  color1 = '#6366f1', // Indigo for upper bar
  color2 = '#06b6d4', // Cyan for lower bar
  dateRange,
  svName,
  teamSize
}) {

  // Custom formatter to show positive currency values in the tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-[var(--color-border)] p-3 rounded-xl shadow-lg">
          <p className="text-sm font-extrabold text-[var(--color-text-main)] mb-2 border-b border-[var(--color-border)] pb-1">
            SR: {label}
          </p>
          {payload.map((entry, index) => {
            // Take absolute value for display since 2nd half is mapped negatively
            const val = Math.abs(entry.value);
            return (
              <div key={index} className="flex items-center gap-3 justify-between mt-1">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
                  <span className="text-xs font-semibold text-[var(--color-text-muted)]">{entry.name}:</span>
                </div>
                <span className="text-sm font-black text-[var(--color-text-main)]">
                  ৳{val.toLocaleString()}
                </span>
              </div>
            );
          })}
        </div>
      );
    }
    return null;
  };

  // Custom Y Axis Formatter to show absolute currency values
  const formatYAxis = (tickItem) => {
    return '৳' + Math.abs(tickItem).toLocaleString();
  };

  return (
    <div className="flex flex-col w-full h-[360px]">
      <div className="flex flex-col sm:flex-row justify-between sm:items-start mb-4 gap-2">
        <div>
          {title && <h3 className="text-base font-extrabold text-[var(--color-text-main)]">{title}</h3>}
          {subtitle && <p className="text-xs text-[var(--color-text-muted)] font-medium mt-0.5">{subtitle}</p>}
        </div>
        
        {/* Header Right Side */}
        <div className="text-left sm:text-right">
          {dateRange && <p className="text-xs font-bold text-zinc-500">{dateRange}</p>}
          {svName && <p className="text-sm font-black text-[var(--color-text-main)]">{svName}</p>}
          {teamSize && <p className="text-[10px] font-extrabold text-indigo-600 bg-indigo-50 inline-block px-2 py-0.5 rounded mt-1">Team Size: {teamSize}</p>}
        </div>
      </div>
      
      <div className="w-full h-[270px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 10, left: 20, bottom: 20 }}
            stackOffset="sign"
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4e4e7" opacity={0.5} />
            <XAxis 
              dataKey={xAxisKey} 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: '#71717a', fontWeight: 600 }}
              dy={10}
            />
            <YAxis 
              tickFormatter={formatYAxis}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: '#a1a1aa', fontWeight: 600 }}
              width={60}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f4f4f5' }} />
            <Legend 
              verticalAlign="top" 
              height={36} 
              iconType="circle"
              wrapperStyle={{ fontSize: '12px', fontWeight: 600, color: '#52525b' }}
            />
            <ReferenceLine y={0} stroke="#a1a1aa" strokeWidth={1} />
            
            <Bar 
              dataKey={dataKey1} 
              name={name1} 
              fill={color1} 
              radius={[4, 4, 0, 0]} 
              stackId="stack"
              maxBarSize={24}
            />
            <Bar 
              dataKey={dataKey2} 
              name={name2} 
              fill={color2} 
              radius={[0, 0, 4, 4]} 
              stackId="stack"
              maxBarSize={24}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
