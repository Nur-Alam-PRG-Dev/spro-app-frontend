'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, FileText, Users, User, Settings, HelpCircle, Download } from 'lucide-react';

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Reports', href: '/reports', icon: FileText },
    { name: 'Team', href: '#', icon: Users },
    { name: 'Profile', href: '#', icon: User },
  ];

  const bottomItems = [
    { name: 'Settings', href: '#', icon: Settings },
    { name: 'Support', href: '#', icon: HelpCircle },
  ];

  return (
    <aside className="w-64 bg-[var(--color-sidebar-bg)] text-[var(--color-sidebar-text)] flex flex-col justify-between border-r border-[var(--color-sidebar-hover)] h-screen sticky top-0 hidden lg:flex">
      {/* Brand Header */}
      <div className="p-6 border-b border-[var(--color-sidebar-hover)] flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center font-bold text-[var(--color-sidebar-bg)] text-xl shadow-sm">
          S
        </div>
        <div>
          <h1 className="font-bold tracking-tight text-lg leading-tight">SPRO APP</h1>
          <p className="text-[10px] text-[var(--color-sidebar-text-muted)] font-medium leading-none">Logistics Intelligence</p>
        </div>
      </div>

      {/* Navigation Options */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-[var(--color-sidebar-active)] text-[var(--color-sidebar-text)] border-l-4 border-emerald-400 -ml-1'
                  : 'text-[var(--color-sidebar-text-muted)] hover:bg-[var(--color-sidebar-hover)] hover:text-white'
              }`}
            >
              <Icon size={18} className={isActive ? 'text-emerald-400' : ''} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-[var(--color-sidebar-hover)] space-y-4">
        <div className="space-y-1">
          {bottomItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-[var(--color-sidebar-text-muted)] hover:bg-[var(--color-sidebar-hover)] hover:text-white transition-colors"
              >
                <Icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Download Reports Button */}
        <button className="w-full flex items-center justify-center gap-2 bg-[#86efac] hover:bg-[#6ee7b7] dark:bg-emerald-950/40 dark:hover:bg-emerald-900/40 text-[#004b23] dark:text-emerald-300 py-2.5 px-4 rounded-xl text-sm font-semibold transition-colors shadow-sm cursor-pointer">
          <Download size={16} />
          Download Reports
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
