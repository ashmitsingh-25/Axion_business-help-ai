"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Layers,
  RotateCcw,
  Boxes,
  Receipt,
  Sparkles,
  LayoutDashboard,
  Menu,
  X,
  ArrowRight,
  Activity,
} from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Smart Returns", href: "/returns", icon: RotateCcw, badge: "AI Agent" },
    { name: "Inventory Copilot", href: "/inventory", icon: Boxes },
    { name: "Expense Auditor", href: "/expenses", icon: Receipt },
    { name: "Business Copilot", href: "/insights", icon: Sparkles, highlight: true },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-zinc-950/90 backdrop-blur-xl border-b border-zinc-800/80 shadow-lg shadow-black/40 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-md shadow-blue-600/30 group-hover:bg-blue-500 transition-colors">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold tracking-tight text-white font-sans">
                  Axion
                </span>
                <span className="text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                  Enterprise
                </span>
              </div>
              <span className="text-[10px] text-zinc-400 tracking-wider hidden sm:inline">
                From Data → Intelligence → Action
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-zinc-900/90 p-1.5 rounded-full border border-zinc-800 backdrop-blur-md">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-150 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-zinc-300 hover:text-white hover:bg-zinc-800"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-zinc-400"}`} />
                  <span>{link.name}</span>
                  {link.badge && !isActive && (
                    <span className="text-[9px] font-semibold px-1.5 py-0.2 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs text-zinc-400 bg-zinc-900 px-3 py-1.5 rounded-xl border border-zinc-800">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-zinc-300 font-medium">Agents Online</span>
            </div>
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/25 transition-all active:scale-95"
            >
              <span>Launch Console</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              href="/dashboard"
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-blue-600 text-white"
            >
              Console
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 px-4 pt-2 pb-4 bg-zinc-950/98 border-b border-zinc-800 backdrop-blur-2xl">
          <div className="flex flex-col gap-1">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm ${
                pathname === "/" ? "bg-blue-600/15 text-blue-400 font-semibold" : "text-zinc-300"
              }`}
            >
              <Activity className="w-4 h-4 text-zinc-400" />
              <span>Platform Home</span>
            </Link>
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm ${
                    isActive
                      ? "bg-blue-600 text-white font-semibold"
                      : "text-zinc-300 hover:bg-zinc-900"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{link.name}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
