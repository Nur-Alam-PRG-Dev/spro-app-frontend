'use client';

import React from 'react';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import { 
  ClipboardList, 
  MapPin, 
  CheckSquare, 
  TrendingUp, 
  FileCode, 
  AlertTriangle, 
  Users, 
  FileSpreadsheet, 
  Sliders, 
  Plus 
} from 'lucide-react';

const CardGrid = () => {
  const cards = [
    {
      title: 'Orders',
      value: '12 Pending Requests',
      icon: ClipboardList,
      bgVar: 'var(--color-orders-bg)',
      iconColorVar: 'var(--color-orders-icon)',
      route: '#',
    },
    {
      title: 'Tracking',
      value: 'Live Fleet Location',
      icon: MapPin,
      bgVar: 'var(--color-tracking-bg)',
      iconColorVar: 'var(--color-tracking-icon)',
      route: '#',
    },
    {
      title: 'Stock',
      value: '94% Fulfillment Rate',
      icon: CheckSquare,
      bgVar: 'var(--color-stock-bg)',
      iconColorVar: 'var(--color-stock-icon)',
      route: '#',
    },
    {
      title: 'Analytics',
      value: '+12.4% MoM Growth',
      icon: TrendingUp,
      bgVar: 'var(--color-analytics-bg)',
      iconColorVar: 'var(--color-analytics-icon)',
      route: '#',
    },
    {
      title: 'Web Report',
      value: 'View System Logs',
      icon: FileCode,
      bgVar: 'var(--color-webreport-bg)',
      iconColorVar: 'var(--color-webreport-icon)',
      route: '/reports',
    },
    {
      title: 'Alerts',
      value: '3 Critical Issues',
      icon: AlertTriangle,
      bgVar: 'var(--color-alerts-bg)',
      iconColorVar: 'var(--color-alerts-icon)',
      route: '#',
    },
    {
      title: 'Attendance',
      value: '42 Staff Present Today',
      icon: Users,
      bgVar: 'var(--color-attendance-bg)',
      iconColorVar: 'var(--color-attendance-icon)',
      route: '#',
    },
    {
      title: 'Forms',
      value: 'Inventory Audits',
      icon: FileSpreadsheet,
      bgVar: 'var(--color-forms-bg)',
      iconColorVar: 'var(--color-forms-icon)',
      route: '#',
    },
    {
      title: 'Settings',
      value: 'Portal Configuration',
      icon: Sliders,
      bgVar: 'var(--color-settings-bg)',
      iconColorVar: 'var(--color-settings-icon)',
      route: '#',
    },
  ];

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mt-6 sm:mt-8">
      {cards.map((card, idx) => {
        const IconComponent = card.icon;
        const CardContent = (
          <>
            {/* Round Icon Container */}
            <div 
              style={{ backgroundColor: card.bgVar, color: card.iconColorVar }} 
              className="w-8 h-8 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-transform duration-300 hover:rotate-6 hover:scale-105"
            >
              <IconComponent className="w-4 h-4 sm:w-6 sm:h-6" />
            </div>

            {/* Title */}
            <h4 className="text-xs sm:text-sm font-bold mt-2 sm:mt-3 text-[var(--color-text-main)] truncate max-w-full">
              {card.title}
            </h4>

            {/* Subtitle/Value */}
            <p className="text-[9px] sm:text-xs text-[var(--color-text-muted)] font-medium mt-0.5 sm:mt-1 truncate max-w-full">
              {card.value}
            </p>
          </>
        );

        if (card.route && card.route !== '#') {
          return (
            <Link key={idx} href={card.route} className="block">
              <Card
                className="flex flex-col items-center justify-center text-center p-3 sm:p-5 h-28 sm:h-36 cursor-pointer"
                hoverable={true}
                padded={false}
              >
                {CardContent}
              </Card>
            </Link>
          );
        }

        return (
          <Card
            key={idx}
            className="flex flex-col items-center justify-center text-center p-3 sm:p-5 h-28 sm:h-36"
            hoverable={true}
            padded={false}
          >
            {CardContent}
          </Card>
        );
      })}

      {/* Customize Card */}
      <Card
        className="flex flex-col items-center justify-center text-center p-3 sm:p-5 h-28 sm:h-36 cursor-pointer"
        borderDashed={true}
        hoverable={true}
        padded={false}
      >
        <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-xl border border-dashed border-zinc-400 dark:border-zinc-700 flex items-center justify-center text-zinc-500">
          <Plus className="w-4 h-4 sm:w-6 sm:h-6" />
        </div>
        <h4 className="text-xs sm:text-sm font-bold mt-2 sm:mt-3 text-[var(--color-text-muted)]">
          Customize
        </h4>
      </Card>
    </div>
  );
};

export default CardGrid;
