'use client';
import React from 'react';
import { Mail, Hash, Users, Briefcase, Phone, Globe } from 'lucide-react';

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
      icon: <Phone size={13} className="text-[var(--color-primary)]" />,
      label: 'Mobile',
      value: user.aemp_mob1 || user.aemp_dtsm || '—',
    },
    {
      icon: <Mail size={13} className="text-[var(--color-primary)]" />,
      label: 'Email',
      value: user.aemp_emal || user.email || '—',
    },
    {
      icon: <Users size={13} className="text-[var(--color-primary)]" />,
      label: 'Team Size',
      value: teamSize != null ? `${teamSize} members` : '—',
    },
    {
      icon: <Globe size={13} className="text-[var(--color-primary)]" />,
      label: 'Country',
      value: user.country_name || 'Bangladesh',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-2 h-full">
      {/* ── BLOCK 1: Full Profile Image & Designation ────────────────────────── */}
      <div className="bg-gradient-to-br from-[#047857] to-[#004b23] rounded-[12px] border border-emerald-800/50 shadow-[0_8px_20px_rgba(4,120,87,0.3)] overflow-hidden flex flex-col justify-center text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(4,120,87,0.6)]">
        {/* Full-width Profile Image */}
        <div className="w-full flex-1 relative bg-zinc-900 min-h-[100px]">
          <img
            src={avatarUrl}
            alt={user.aemp_name || 'User'}
            className="w-full h-full object-cover"
            onError={(e) => { e.target.src = fallbackAvatar; }}
          />
          {/* Online status indicator */}
          <div className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-emerald-900 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></div>
        </div>

        {/* Name & Designation Details */}
        <div className="p-2 flex flex-col items-center justify-center bg-transparent z-10 w-full">
          <h2 className="text-[14px] font-black text-white tracking-tight leading-tight w-full text-center break-words shadow-sm">
            {user.aemp_name || 'Unknown User'}
          </h2>
          <div className={`mt-1 inline-flex items-center justify-center text-center gap-1 font-bold px-1.5 py-0.5 rounded-sm text-[10px] leading-tight bg-white/10 text-emerald-100 border border-white/20 backdrop-blur-md`}>
            <Briefcase size={10} className="flex-shrink-0" />
            <span className="break-words">{designation}</span>
          </div>
        </div>
      </div>

      {/* ── BLOCK 2: Profile Info ─────────────────────────────────── */}
      <div className="bg-gradient-to-br from-[#065f46] to-[#022c22] rounded-[12px] border border-emerald-800/50 shadow-[0_8px_20px_rgba(6,95,70,0.3)] flex-1 p-2 flex flex-col justify-center relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(6,95,70,0.6)]">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '12px 12px' }} />
        <div className="space-y-1 relative z-10">
          {infoRows.map((row, i) => (
            <div
              key={i}
              className="flex flex-col gap-0.5 group hover:bg-white/10 rounded-lg p-1.5 transition-colors cursor-default"
            >
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-md bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors shadow-inner text-emerald-300">
                  {row.icon}
                </div>
                <p className="text-[8px] font-bold text-emerald-200/70 uppercase tracking-wider">
                  {row.label}
                </p>
              </div>
              <p className="text-[10px] font-bold text-white truncate ml-6">
                {row.value}
              </p>
            </div>
          ))}
        </div>

        {/* Small separator and revenue stat */}
        <div className="mt-auto pt-2 border-t border-emerald-800/50 flex flex-col items-center justify-center text-center bg-white/5 rounded-lg p-1.5 backdrop-blur-md relative z-10">
          <p className="text-[8px] font-bold text-emerald-300 uppercase tracking-wider">MTD Revenue</p>
          <p className="text-[12px] font-black text-white leading-none mt-0.5">{formattedRevenue}</p>
        </div>
      </div>
    </div>
  );
}
