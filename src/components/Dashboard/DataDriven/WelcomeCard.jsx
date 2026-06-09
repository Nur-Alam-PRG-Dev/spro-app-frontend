'use client';
import React from 'react';
import { Mail, Hash, Users, Briefcase, ShieldCheck } from 'lucide-react';

const BASE_IMAGE_URL = 'https://prgspro.sgp1.cdn.digitaloceanspaces.com/';

function getDesignation(roleId) {
  switch (parseInt(roleId)) {
    case 1: return 'Sales Representative';
    case 2: return 'Area Supervisor';
    case 3: return 'Regional Manager';
    case 4: return 'National Sales Manager';
    default: return 'Logistics Executive';
  }
}

function getRoleBadgeColor(roleId) {
  switch (parseInt(roleId)) {
    case 1: return 'bg-blue-100 text-blue-700';
    case 2: return 'bg-indigo-100 text-indigo-700';
    case 3: return 'bg-purple-100 text-purple-700';
    case 4: return 'bg-amber-100 text-amber-700';
    default: return 'bg-zinc-100 text-zinc-600';
  }
}

export default function WelcomeCard({ user, totalRevenue, productiveRate, teamSize }) {
  if (!user) return null;

  const designation = getDesignation(user.role_id);
  const badgeClass = getRoleBadgeColor(user.role_id);
  const formattedRevenue = totalRevenue >= 1000
    ? `৳${(totalRevenue / 1000).toFixed(1)}k`
    : `৳${(totalRevenue || 0).toFixed(0)}`;

  const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.aemp_name || 'User')}&background=004b23&color=fff&size=256&bold=true`;
  const storedBase = typeof window !== 'undefined' ? (localStorage.getItem('baseImageUrl') || '') : '';
  const resolvedBase = storedBase || BASE_IMAGE_URL;
  const avatarUrl = user.aemp_pimg ? `${resolvedBase}${user.aemp_pimg}` : fallbackAvatar;

  const infoRows = [
    {
      icon: <Hash size={13} className="text-[var(--color-primary)]" />,
      label: 'Employee ID',
      value: user.aemp_id || user.aemp_usnm || '—',
    },
    {
      icon: <Mail size={13} className="text-[var(--color-primary)]" />,
      label: 'Email / Username',
      value: user.aemp_usnm || user.email || '—',
    },
    {
      icon: <Briefcase size={13} className="text-[var(--color-primary)]" />,
      label: 'Designation',
      value: designation,
    },
    {
      icon: <Users size={13} className="text-[var(--color-primary)]" />,
      label: 'Team Members',
      value: teamSize != null ? `${teamSize} members` : '—',
    },
  ];

  return (
    <div className="bg-white rounded-[20px] border border-[var(--color-border)] shadow-sm overflow-hidden h-full flex flex-col">
      {/* ── Gradient Header Banner ─────────────────────────────────── */}
      <div className="bg-gradient-to-br from-[var(--color-primary)] to-[#006838] px-6 pt-6 pb-10 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-[-20px] right-[-20px] w-32 h-32 rounded-full bg-white/5" />
        <div className="absolute bottom-[-30px] left-[-10px] w-28 h-28 rounded-full bg-white/5" />

        <div className="flex items-start justify-between relative z-10">
          <div>
            <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest mb-1">Logged In As</p>
            <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${badgeClass} opacity-90`}>
              <ShieldCheck size={10} />
              {designation}
            </span>
          </div>
          <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center">
            <ShieldCheck size={14} className="text-white/70" />
          </div>
        </div>
      </div>

      {/* ── Avatar (overlapping banner) ────────────────────────────── */}
      <div className="-mt-10 px-6 flex items-end gap-4">
        <div className="relative flex-shrink-0">
          <div className="w-20 h-20 rounded-2xl overflow-hidden border-4 border-white shadow-lg bg-zinc-100">
            <img
              src={avatarUrl}
              alt={user.aemp_name || 'User'}
              className="w-full h-full object-cover"
              onError={(e) => { e.target.src = fallbackAvatar; }}
            />
          </div>
          {/* Online dot */}
          <span className="absolute bottom-0.5 right-0.5 w-4 h-4 rounded-full bg-emerald-400 border-2 border-white" />
        </div>

        {/* Revenue quick-stat next to avatar */}
        <div className="mb-1 pb-0.5">
          <p className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wide">This Month</p>
          <p className="text-lg font-black text-zinc-800 leading-tight">{formattedRevenue}</p>
          {productiveRate > 0 && (
            <p className="text-[11px] font-semibold text-emerald-600">{productiveRate}% Productive</p>
          )}
        </div>
      </div>

      {/* ── Full Name ─────────────────────────────────────────────── */}
      <div className="px-6 pt-3 pb-0">
        <h2 className="text-[16px] font-black text-zinc-800 tracking-tight leading-snug">
          {user.aemp_name || 'Unknown User'}
        </h2>
      </div>

      {/* ── Info Grid ─────────────────────────────────────────────── */}
      <div className="px-6 pt-4 pb-6 flex-1 space-y-3">
        {infoRows.map((row, i) => (
          <div
            key={i}
            className="flex items-start gap-3 group hover:bg-zinc-50 rounded-xl px-3 py-2.5 -mx-3 transition-colors cursor-default"
          >
            <div className="w-7 h-7 rounded-lg bg-[var(--color-primary)]/8 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[var(--color-primary)]/12 transition-colors">
              {row.icon}
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider leading-none mb-1">
                {row.label}
              </p>
              <p className="text-[13px] font-bold text-zinc-700 truncate leading-tight">
                {row.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
