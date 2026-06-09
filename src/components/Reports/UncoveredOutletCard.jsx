import React from 'react';
import { Store, User, Calendar, MapPin, Phone } from 'lucide-react';
import Card from '@/components/ui/Card';

const UncoveredOutletCard = ({ outlet, maxOrder }) => {
  const orderValue = parseFloat(outlet.avg_3_month_order) || 0;
  const barWidth = `${Math.min(100, (orderValue / (maxOrder || 1)) * 100)}%`;

  return (
    <Card className="p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow border-[var(--color-border)]" hoverable={true}>
      <div>
        {/* Header section inside card */}
        <div className="flex items-start justify-between border-b border-[var(--color-border)] pb-3 mb-3">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 pr-2">
            {/* Rounded Green icon box */}
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-indigo-50 text-indigo-800 border border-indigo-100 flex items-center justify-center shrink-0">
              <Store size={16} className="sm:size-18" />
            </div>
            <div className="min-w-0">
              <h4 className="font-extrabold text-[12px] md:text-[13px] text-[var(--color-text-main)] truncate leading-tight mb-1" title={outlet.site_name}>
                {outlet.site_name}
              </h4>
              <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] text-indigo-800 bg-indigo-50 px-2 py-0.5 rounded-full font-bold">
                <User size={10} />
                {outlet.role}: {outlet.aemp_name}
              </span>
            </div>
          </div>

          {/* Top-Right Badge Actions */}
          <div className="flex items-center gap-1.5 shrink-0 mt-0.5">
            <a
              href={`https://maps.google.com/?q=${outlet.geo_lat},${outlet.geo_lon}`}
              target="_blank"
              rel="noreferrer"
              className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-blue-300 hover:bg-sky-500 hover:scale-110 border border-sky-100 hover:border-sky-500 transition-all shadow-[0_2px_8px_-4px_rgba(14,165,233,0.4)] hover:shadow-md"
              title="Locate on Map"
            >
              <MapPin size={14} />
            </a>
            <a
              href={`tel:${outlet.aemp_mob1 || outlet.aemp_dtsm}`}
              className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-indigo-300 hover:bg-indigo-500 hover:scale-110 border border-indigo-100 hover:border-indigo-500 transition-all shadow-[0_2px_8px_-4px_rgba(16,185,129,0.4)] hover:shadow-md"
              title="Call Contact"
            >
              <Phone size={14} />
            </a>
          </div>
        </div>

        {/* Card Inner Grid Details */}
        <div className="grid grid-cols-2 gap-3 mb-1">
          {/* Last Visit details */}
          <div className="space-y-1">
            <span className="block text-[9px] font-bold text-[var(--color-text-muted)] tracking-wider uppercase">
              Last Visit
            </span>
            <div className="flex items-center gap-1.5 text-xs font-black text-rose-900">
              <Calendar size={12} className="text-rose-700" />
              <span>
                {outlet.last_visit_date === 'NOT FOUND' 
                  ? 'Never' 
                  : (function() {
                      const d = new Date(outlet.last_visit_date);
                      return isNaN(d.getTime()) 
                        ? outlet.last_visit_date 
                        : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                    })()
                }
              </span>
            </div>
            {outlet.last_visit_date === 'NOT FOUND' && (
              <span className="block text-[10px] text-rose-600 font-semibold">
                Critical Alert
              </span>
            )}
          </div>

          {/* Monthly Average details */}
          <div className="space-y-1">
            <span className="block text-[9px] font-bold text-[var(--color-text-muted)] tracking-wider uppercase">
              Monthly Order Avg.
            </span>
            <div className="flex items-center gap-1 text-xs font-black text-slate-800">
              <span className="text-[var(--color-text-muted)]">৳</span>
              <span>{outlet.avg_3_month_order}</span>
            </div>
            {/* Infographic progress bar */}
            <div className="w-full bg-zinc-100 rounded-full h-1.5 mt-1 overflow-hidden" title="Relative Order Volume">
              <div
                className="bg-indigo-500 h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: barWidth }}
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default UncoveredOutletCard;
