'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from "@/components/Sidebar/Sidebar";
import Header from "@/components/Header/Header";
import { MobileHeader, MobileTabBar } from "@/components/Mobile/MobileNav";

import { usePathname, useRouter } from 'next/navigation';

export default function MainLayoutWrapper({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  const isLoginPage = pathname === '/login';

  // Auto-collapse sidebar on report pages
  useEffect(() => {
    const reportPages = ['/reports', '/amolnama', '/halfSummary', '/targetVsAchievement', '/uncoveredOutlet'];
    if (reportPages.some(page => pathname.startsWith(page))) {
      setIsSidebarOpen(false);
    }
  }, [pathname]);

  useEffect(() => {
    // If we're already on the login page, no need for timeout
    if (isLoginPage) return;

    const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;
    
    const checkSession = () => {
      const userStr = localStorage.getItem('spro_user');
      const loginTime = localStorage.getItem('spro_login_time');

      if (!userStr || !loginTime || Date.now() - parseInt(loginTime) > TWENTY_FOUR_HOURS) {
        // Clear session data if it's expired or missing parts
        localStorage.removeItem('spro_user');
        localStorage.removeItem('spro_login_time');
        localStorage.removeItem('baseImageUrl');
        router.push('/login');
        return false;
      }
      return true;
    };

    // Immediate check on mount/route change
    if (!checkSession()) return;

    // Check periodically if the 24 hours have passed while the app is open
    const intervalId = setInterval(() => {
      checkSession();
    }, 60000); // Check every minute

    return () => clearInterval(intervalId);
  }, [isLoginPage, router]);

  if (isLoginPage) {
    return (
      <div className="flex h-screen w-screen overflow-hidden bg-[var(--color-bg-main)]">
        <main className="flex-1 overflow-y-auto bg-[var(--color-bg-main)]">
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[var(--color-bg-main)]">
      {/* Desktop Left Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Right Area Shell */}
      <div className="flex-1 flex flex-col h-full overflow-hidden transition-all duration-300">
        {/* Desktop Top Header & Mobile Header */}
        <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <MobileHeader />

        {/* Main scrollable page content */}
        <main className="flex-1 overflow-y-auto px-4 py-5 md:p-6 bg-[var(--color-bg-main)] pb-24 lg:pb-6">
          {children}
        </main>
      </div>

      {/* Mobile Floating Bottom Bar */}
      <MobileTabBar />
    </div>
  );
}
