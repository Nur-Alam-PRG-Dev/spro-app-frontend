'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, FileText, Users, User, Settings, HelpCircle, Download, ChevronLeft, ChevronRight } from 'lucide-react';

const Sidebar = ({ isOpen = true, toggleSidebar }) => {
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
    <aside className={`bg-[var(--color-sidebar-bg)] text-[var(--color-sidebar-text)] flex flex-col justify-between border-r border-[var(--color-sidebar-hover)] h-screen sticky top-0 hidden lg:flex transition-all duration-300 ease-in-out z-30 ${
      isOpen ? 'w-60' : 'w-[68px]'
    }`}>
      {/* Brand Header */}
      <div className={`border-b border-[var(--color-sidebar-hover)] flex items-center ${isOpen ? 'p-5 justify-between' : 'p-3 justify-center'}`}>
        {isOpen ? (
          <>
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center font-bold text-[var(--color-sidebar-bg)] text-lg shadow-sm shrink-0">
                S
              </div>
              <div className="overflow-hidden">
                <h1 className="font-bold tracking-tight text-base leading-tight whitespace-nowrap">SPRO APP</h1>
                <p className="text-[9px] text-[var(--color-sidebar-text-muted)] font-medium leading-none whitespace-nowrap">Logistics Intelligence</p>
              </div>
            </div>
            <button
              onClick={toggleSidebar}
              className="p-1.5 hover:bg-[var(--color-sidebar-hover)] rounded-lg text-[var(--color-sidebar-text-muted)] hover:text-white transition-colors cursor-pointer shrink-0"
              title="Collapse Sidebar"
            >
              <ChevronLeft size={16} />
            </button>
          </>
        ) : (
          <button
            onClick={toggleSidebar}
            className="w-10 h-10 rounded-xl bg-white flex items-center justify-center font-bold text-[var(--color-sidebar-bg)] text-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            title="Expand Sidebar"
          >
            S
          </button>
        )}
      </div>

      {/* Navigation Options */}
      <nav className={`flex-1 py-4 space-y-1 ${isOpen ? 'px-3' : 'px-2'}`}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.href === '/'
            ? pathname === '/'
            : pathname.startsWith(item.href) || (item.href === '/reports' && ['/halfSummary', '/targetVsAchievement', '/uncoveredOutlet', '/amolnama'].includes(pathname));
          return (
            <Link
              key={item.name}
              href={item.href}
              title={!isOpen ? item.name : undefined}
              className={`flex items-center rounded-lg text-sm font-medium transition-all duration-200 ${
                isOpen ? 'gap-3 px-3 py-2.5' : 'justify-center p-2.5'
              } ${
                isActive
                  ? 'bg-[var(--color-sidebar-active)] text-[var(--color-sidebar-text)]'
                  : 'text-[var(--color-sidebar-text-muted)] hover:bg-[var(--color-sidebar-hover)] hover:text-white'
              }`}
            >
              <Icon size={18} className={`shrink-0 ${isActive ? 'text-emerald-400' : ''}`} />
              {isOpen && <span className="whitespace-nowrap overflow-hidden">{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className={`border-t border-[var(--color-sidebar-hover)] space-y-3 ${isOpen ? 'p-3' : 'p-2'}`}>
        <div className="space-y-1">
          {bottomItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                title={!isOpen ? item.name : undefined}
                className={`flex items-center rounded-lg text-sm font-medium text-[var(--color-sidebar-text-muted)] hover:bg-[var(--color-sidebar-hover)] hover:text-white transition-all duration-200 ${
                  isOpen ? 'gap-3 px-3 py-2' : 'justify-center p-2.5'
                }`}
              >
                <Icon size={18} className="shrink-0" />
                {isOpen && <span className="whitespace-nowrap overflow-hidden">{item.name}</span>}
              </Link>
            );
          })}
        </div>

        {/* Download Reports Button */}
        {isOpen ? (
          <button className="w-full flex items-center justify-center gap-2 bg-[#86efac] hover:bg-[#6ee7b7] dark:bg-emerald-950/40 dark:hover:bg-emerald-900/40 text-[#004b23] dark:text-emerald-300 py-2 px-3 rounded-xl text-sm font-semibold transition-colors shadow-sm cursor-pointer">
            <Download size={16} />
            Download Reports
          </button>
        ) : (
          <button
            title="Download Reports"
            className="w-full flex items-center justify-center bg-[#86efac] hover:bg-[#6ee7b7] dark:bg-emerald-950/40 dark:hover:bg-emerald-900/40 text-[#004b23] dark:text-emerald-300 p-2.5 rounded-xl transition-colors shadow-sm cursor-pointer"
          >
            <Download size={16} />
          </button>
        )}

        {/* Expand/Collapse Toggle at bottom */}
        {!isOpen && (
          <button
            onClick={toggleSidebar}
            className="w-full flex items-center justify-center p-2 hover:bg-[var(--color-sidebar-hover)] rounded-lg text-[var(--color-sidebar-text-muted)] hover:text-white transition-colors cursor-pointer"
            title="Expand Sidebar"
          >
            <ChevronRight size={16} />
          </button>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
