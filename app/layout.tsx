import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { OceanBackground } from "@/components/OceanBackground";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Axion — Intelligent Business Operations & Decision Platform",
  description:
    "From Data → Intelligence → Action. Unified autonomous decision layer across returns, inventory forecasting, expense compliance, and business intelligence.",
  keywords: [
    "Axion",
    "Business Intelligence",
    "Autonomous Operations",
    "AI Decision Platform",
    "Inventory Forecasting",
    "Smart Returns",
    "Expense Auditor",
    "Claude AI Agent",
  ],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-ocean-950 text-ocean-50 font-sans min-h-screen flex flex-col antialiased relative selection:bg-ocean-600 selection:text-white">
        <OceanBackground />
        <Navbar />
        <main className="flex-1 pt-20 relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

