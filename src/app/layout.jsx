import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MainLayoutWrapper from "@/components/Layout/MainLayoutWrapper";

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
      suppressHydrationWarning
    >
      <body className="h-full bg-[var(--color-bg-main)] text-[var(--color-text-main)] overflow-hidden">
        <MainLayoutWrapper>{children}</MainLayoutWrapper>
      </body>
    </html>
  );
}

