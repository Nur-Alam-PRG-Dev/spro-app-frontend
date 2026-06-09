'use client';

import React from 'react';
import Card from '@/components/ui/Card';
import { FileText, TableProperties, Download } from 'lucide-react';

const QuickExport = () => {
  const files = [
    {
      name: 'Q3_logistics_final.pdf',
      size: '4.2 MB',
      date: 'Today',
      icon: FileText,
      bg: 'bg-red-50 text-red-600 dark:bg-red-950/20 dark:text-red-400',
    },
    {
      name: 'regional_outlets_sep.xlsx',
      size: '1.1 MB',
      date: 'Yesterday',
      icon: TableProperties,
      bg: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400',
    },
  ];

  return (
    <Card className="p-5 sm:p-6" hoverable={false}>
      {/* Card Header Title */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm sm:text-base font-bold text-[var(--color-text-main)]">Quick Export</h3>
        <button className="text-xs font-bold text-[var(--color-primary)] hover:underline">
          View All
        </button>
      </div>

      {/* Files List Layout */}
      <div className="space-y-3">
        {files.map((file, idx) => {
          const FileIcon = file.icon;
          return (
            <div 
              key={idx} 
              className="flex items-center justify-between p-3 border border-[var(--color-border)] rounded-xl hover:bg-zinc-50/50 dark:hover:bg-zinc-800/10 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                {/* File Icon visual indicator */}
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${file.bg}`}>
                  <FileIcon size={20} />
                </div>
                
                {/* File Info */}
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[var(--color-text-main)] leading-tight truncate max-w-[180px] sm:max-w-none group-hover:text-[var(--color-primary)] transition-colors">
                    {file.name}
                  </h4>
                  <p className="text-[10px] sm:text-xs text-[var(--color-text-muted)] font-medium mt-0.5 leading-none">
                    {file.size} • {file.date}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <button className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] transition-colors shrink-0">
                <Download size={16} />
              </button>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default QuickExport;
