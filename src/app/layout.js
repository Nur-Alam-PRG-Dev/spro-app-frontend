import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar/Sidebar";
import Header from "@/components/Header/Header";
import { MobileHeader, MobileTabBar } from "@/components/Mobile/MobileNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SPRO App - Logistics Intelligence",
  description: "Manage and track your operational KPIs across multiple sectors",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="h-full bg-[var(--color-bg-main)] text-[var(--color-text-main)] overflow-hidden">
        <div className="flex h-screen w-screen overflow-hidden">
          {/* Desktop Left Sidebar */}
          <Sidebar />

          {/* Right Area Shell */}
          <div className="flex-1 flex flex-col h-full overflow-hidden">
            {/* Desktop Top Header & Mobile Header */}
            <Header />
            <MobileHeader />

            {/* Main scrollable page content */}
            <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:p-8 bg-[var(--color-bg-main)] pb-24 lg:pb-8">
              {children}
            </main>
          </div>
        </div>

        {/* Mobile Floating Bottom Bar */}
        <MobileTabBar />
      </body>
    </html>
  );
}

