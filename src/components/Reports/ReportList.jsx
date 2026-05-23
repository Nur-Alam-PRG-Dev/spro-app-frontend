'use client';

import React from 'react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { 
  FileText, 
  Target, 
  UserCheck, 
  Store, 
  ChevronRight, 
  SlidersHorizontal, 
  MoreVertical,
  AlertTriangle
} from 'lucide-react';

import { useSearchParams } from 'next/navigation';
import reportsData from '@/dummyData/webReport.json';

const iconMap = {
  FileText,
  Target,
  UserCheck,
  Store
};

const ReportListContent = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('q')?.toLowerCase() || '';

  const filteredData = reportsData.filter(report => 
    report.reportTitle.toLowerCase().includes(query) ||
    report.reportSubTitle.toLowerCase().includes(query)
  );

  const reports = filteredData.map(report => {
    let bgVar = '#e8f5e9';
    let iconColor = '#2e7d32';
    let meta = null;

    if (report.reportTitle === 'Half Summary') {
      bgVar = '#e8f5e9';
      iconColor = '#2e7d32';
      meta = (
        <div className="text-right">
          <span className="block text-[9px] font-bold text-[var(--color-text-muted)] tracking-wider uppercase">Last Updated</span>
          <span className="text-xs sm:text-sm font-extrabold text-[var(--color-text-main)]">{report.lastUpdated}</span>
        </div>
      );
    } else if (report.reportTitle === 'Target vs. Achievement') {
      bgVar = '#e3f2fd';
      iconColor = '#1565c0';
      meta = (
        <div className="text-right flex flex-col items-end gap-1">
          <span className="block text-[9px] font-bold text-[var(--color-text-muted)] tracking-wider uppercase">Status</span>
          <div className="flex gap-1">
            {report.status?.map((st, i) => (
              <Badge key={i} type={st.toLowerCase()}>{st}</Badge>
            ))}
          </div>
        </div>
      );
    } else if (report.reportTitle === 'Amolnama') {
      bgVar = '#efebe9';
      iconColor = '#4e342e';
      meta = (
        <div className="text-right">
          <span className="block text-[9px] font-bold text-[var(--color-text-muted)] tracking-wider uppercase">Records</span>
          <span className="text-xs sm:text-sm font-extrabold text-[var(--color-text-main)]">{report.records}</span>
        </div>
      );
    } else if (report.reportTitle === 'Uncovered Outlet Report') {
      bgVar = '#ffebee';
      iconColor = '#c62828';
      meta = (
        <div className="text-right flex flex-col items-end gap-1">
          <span className="block text-[9px] font-bold text-[var(--color-text-muted)] tracking-wider uppercase">Criticality</span>
          <Badge type="high">
            <AlertTriangle size={10} className="stroke-[3px]" />
            {report.criticality}
          </Badge>
        </div>
      );
    }

    return {
      title: report.reportTitle,
      description: report.reportSubTitle,
      icon: iconMap[report.icon] || FileText,
      bgVar,
      iconColor,
      meta
    };
  });

  return (
    <Card className="flex-1 p-0 overflow-hidden" hoverable={false}>
      {/* List Header */}
      <div className="px-6 py-5 border-b border-[var(--color-border)] flex items-center justify-between">
        <h3 className="font-extrabold text-sm sm:text-base text-[var(--color-text-main)]">All Operational Reports</h3>
        <div className="flex items-center gap-3 text-[var(--color-text-muted)]">
          <button className="p-1.5 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded transition-colors">
            <SlidersHorizontal size={18} />
          </button>
          <button className="p-1.5 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded transition-colors">
            <MoreVertical size={18} />
          </button>
        </div>
      </div>

      {/* List Items Container */}
      <div className="divide-y divide-[var(--color-border)]">
        {reports.map((report, idx) => {
          const Icon = report.icon;
          return (
            <div 
              key={idx} 
              className="px-6 py-5 flex items-center justify-between gap-4 hover:bg-zinc-50/50 dark:hover:bg-zinc-800/10 transition-colors cursor-pointer group"
            >
              {/* Left side details */}
              <div className="flex items-center gap-4 min-w-0 flex-1">
                {/* Icon square */}
                <div 
                  style={{ backgroundColor: report.bgVar, color: report.iconColor }} 
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center shrink-0 border border-black/5"
                >
                  <Icon size={20} />
                </div>
                
                {/* Text Content */}
                <div className="min-w-0 flex-1">
                  <h4 className="font-extrabold text-xs sm:text-sm text-[var(--color-text-main)] truncate group-hover:text-[var(--color-primary)] transition-colors">
                    {report.title}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-[var(--color-text-muted)] mt-0.5 leading-snug truncate sm:normal-case">
                    {report.description}
                  </p>
                </div>
              </div>

              {/* Right side metadata info */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="hidden sm:block">
                  {report.meta}
                </div>
                <ChevronRight size={18} className="text-[var(--color-text-muted)] group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

const ReportList = () => {
  return (
    <React.Suspense fallback={<div className="h-48 bg-zinc-50 border border-[var(--color-border)] rounded-2xl animate-pulse" />}>
      <ReportListContent />
    </React.Suspense>
  );
};

export default ReportList;
