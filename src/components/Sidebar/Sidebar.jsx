'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, FileText, Users, User, Settings, HelpCircle, Download, ChevronLeft, ChevronRight, LogOut } from 'lucide-react';

const Sidebar = ({ isOpen = true, toggleSidebar }) => {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { name: 'Home', href: '/', icon: Home },
    { 
      name: 'Reports', 
      href: '/reports', 
      icon: FileText,
      subItems: [
        { name: 'Amolnama', href: '/amolnama' },
        { name: 'Target Vs Achievement', href: '/targetVsAchievement' },
        { name: 'Half Summary', href: '/halfSummary' },
        { name: 'Uncovered Outlets', href: '/uncoveredOutlet' },
      ]
    },
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
            <div key={item.name} className="relative group">
              <Link
                href={item.href}
                className={`flex items-center rounded-lg text-sm font-medium transition-all duration-200 ${
                  isOpen ? 'gap-3 px-3 py-2.5' : 'justify-center p-2.5'
                } ${
                  isActive
                    ? 'bg-[var(--color-sidebar-active)] text-[var(--color-sidebar-text)]'
                    : 'text-[var(--color-sidebar-text-muted)] hover:bg-[var(--color-sidebar-hover)] hover:text-white'
                }`}
              >
                <Icon size={18} className={`shrink-0 ${isActive ? 'text-indigo-400' : ''}`} />
                {isOpen && <span className="whitespace-nowrap overflow-hidden">{item.name}</span>}
              </Link>
              
              
              {/* Flyout Menu / Tooltip for Closed Sidebar */}
              {!isOpen && (
                <div className="absolute left-full top-0 ml-2 w-max bg-[var(--color-sidebar-hover)] text-white text-sm font-semibold rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-white/10 flex flex-col pointer-events-auto">
                  {!item.subItems && (
                    <div className="px-3 py-2 border-b border-transparent">
                      {item.name}
                    </div>
                  )}
                  {item.subItems && (
                    <div className="py-1 min-w-[180px]">
                      <div className="px-4 py-2 font-black border-b border-white/10 text-indigo-400 tracking-wider text-xs uppercase">{item.name}</div>
                      {item.subItems.map(subItem => (
                        <Link 
                          key={subItem.name} 
                          href={subItem.href}
                          className="block px-4 py-2 hover:bg-indigo-900/50 hover:text-indigo-300 transition-colors"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Inline Submenu for Open Sidebar */}
              {isOpen && item.subItems && (
                <div className="pl-9 pr-2 py-1 mt-1 space-y-1 border-l border-white/10 ml-6">
                  {item.subItems.map(subItem => {
                    const isSubActive = pathname === subItem.href;
                    return (
                      <Link 
                        key={subItem.name} 
                        href={subItem.href}
                        className={`block px-3 py-2 text-xs font-semibold rounded-lg transition-colors ${
                          isSubActive ? 'bg-indigo-500/20 text-indigo-400' : 'text-[var(--color-sidebar-text-muted)] hover:bg-[var(--color-sidebar-hover)] hover:text-white'
                        }`}
                      >
                        {subItem.name}
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className={`border-t border-[var(--color-sidebar-hover)] space-y-3 ${isOpen ? 'p-3' : 'p-2'}`}>
        <div className="space-y-1">
          {bottomItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className={`flex items-center rounded-lg text-sm font-medium text-[var(--color-sidebar-text-muted)] hover:bg-[var(--color-sidebar-hover)] hover:text-white transition-all duration-200 ${
                    isOpen ? 'gap-3 px-3 py-2' : 'justify-center p-2.5'
                  }`}
                >
                  <Icon size={18} className="shrink-0" />
                  {isOpen && <span className="whitespace-nowrap overflow-hidden">{item.name}</span>}
                </Link>
                {!isOpen && (
                  <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-3 py-2 bg-[var(--color-sidebar-hover)] text-white text-sm font-semibold rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-white/10 whitespace-nowrap">
                    {item.name}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Download Reports Button */}
        {isOpen ? (
          <button className="w-full flex items-center justify-center gap-2 bg-[#86efac] hover:bg-[#6ee7b7] dark:bg-indigo-950/40 dark:hover:bg-indigo-900/40 text-[#696cff] dark:text-indigo-300 py-2 px-3 rounded-xl text-sm font-semibold transition-colors shadow-sm cursor-pointer">
            <Download size={16} />
            Download Reports
          </button>
        ) : (
          <button
            title="Download Reports"
            className="w-full flex items-center justify-center bg-[#86efac] hover:bg-[#6ee7b7] dark:bg-indigo-950/40 dark:hover:bg-indigo-900/40 text-[#696cff] dark:text-indigo-300 p-2.5 rounded-xl transition-colors shadow-sm cursor-pointer"
          >
            <Download size={16} />
          </button>
        )}

        {/* Logout Button */}
        {isOpen ? (
          <button 
            onClick={() => router.push('/login')}
            className="w-full flex items-center justify-center gap-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 py-2 px-3 rounded-xl text-sm font-semibold transition-colors cursor-pointer border border-rose-500/20"
          >
            <LogOut size={16} />
            Logout
          </button>
        ) : (
          <button
            onClick={() => router.push('/login')}
            title="Logout"
            className="w-full flex items-center justify-center bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 p-2.5 rounded-xl transition-colors cursor-pointer border border-rose-500/20"
          >
            <LogOut size={16} />
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
