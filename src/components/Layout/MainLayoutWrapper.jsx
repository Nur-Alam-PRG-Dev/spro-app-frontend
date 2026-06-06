'use client';

import React, { useState } from 'react';
import Sidebar from "@/components/Sidebar/Sidebar";
import Header from "@/components/Header/Header";
import { MobileHeader, MobileTabBar } from "@/components/Mobile/MobileNav";

export default function MainLayoutWrapper({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

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
