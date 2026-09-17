"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import {
  Layers,
  LayoutDashboard,
  ShieldCheck,
  Sparkles,
  Boxes,
  RefreshCcw,
  Receipt,
  Menu,
  X,
  ArrowRight,
  Sliders,
  ChevronRight,
  Shield,
  Activity,
} from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const drawerRef = useRef<HTMLDivElement | null>(null);

  // Track scroll position for header glass intensity
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Lock body scroll when drawer is open on mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Exact 6-item navigation order as strictly specified
  const navItems = [
    {
      name: "Overview",
      href: "/dashboard",
      icon: LayoutDashboard,
      desc: "Enterprise operations console & telemetry",
      badge: "Live",
    },
    {
      name: "Cyber Risk",
      href: "/cyber-risk",
      icon: ShieldCheck,
      desc: "Financial exposure, EAL & spend optimizer",
      badge: "₹2.1Cr EAL",
    },
    {
      name: "Decision Copilot",
      href: "/insights",
      icon: Sparkles,
      desc: "5-Stage Claude 3.5 multi-agent synthesis",
      badge: "AI Agent",
    },
    {
      name: "Inventory",
      href: "/inventory",
      icon: Boxes,
      desc: "Demand velocity & supplier tradeoff routing",
      badge: "Forecasting",
    },
    {
      name: "Smart Exchange",
      href: "/returns",
      icon: RefreshCcw,
      desc: "Multi-factor risk & 1-click size exchange",
      badge: "85% GMV",
    },
    {
      name: "Expense Auditor",
      href: "/expenses",
      icon: Receipt,
      desc: "Autonomous RAG policy compliance engine",
      badge: "Policy Engine",
    },
  ];

  return (
    <>
      {/* ── MINIMAL FLOATING HEADER ──────────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-ocean-950/80 backdrop-blur-2xl border-b border-ocean-300/15 shadow-[0_15px_40px_rgba(0,0,0,0.5)] py-3.5"
            : "bg-ocean-950/40 backdrop-blur-md border-b border-ocean-300/10 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left: Hamburger Button + Minimal Axion Branding */}
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                onClick={() => setIsOpen(true)}
                className="group p-2.5 rounded-xl bg-ocean-900/80 hover:bg-ocean-800/90 border border-ocean-300/20 text-ocean-100 hover:text-white transition-all shadow-[inset_0_1px_0_0_rgba(94,234,212,0.15),0_4px_12px_rgba(0,0,0,0.3)] active:scale-95 flex items-center justify-center"
                aria-label="Open Navigation Menu"
                id="hamburger-nav-button"
              >
                <Menu className="w-5 h-5 text-ocean-300 group-hover:text-ocean-200 transition-colors" />
              </button>

              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-ocean-500/20 to-ocean-700/40 border border-ocean-300/30 flex items-center justify-center shadow-[0_0_15px_rgba(32,201,166,0.2)] group-hover:border-ocean-300/50 transition-all">
                  <Layers className="w-4 h-4 text-ocean-300 group-hover:text-white transition-colors" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-black tracking-tight text-white font-sans">
                    AXION
                  </span>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-ocean-500/15 text-ocean-200 border border-ocean-300/20 uppercase tracking-wider font-bold hidden sm:inline-block">
                    Autonomous Command
                  </span>
                </div>
              </Link>
            </div>

            {/* Right: Minimal Actions (Console Launch & AI Copilot Status) */}
            <div className="flex items-center gap-3">
              <Link
                href="/insights"
                className="hidden sm:flex items-center gap-2 text-xs text-ocean-200 bg-ocean-900/60 hover:bg-ocean-800/80 px-3.5 py-2 rounded-xl border border-ocean-300/15 backdrop-blur-md transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-ocean-300 animate-pulse" />
                <span className="font-medium">Copilot Active</span>
              </Link>

              <Link
                href="/dashboard"
                className="flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-xl bg-gradient-to-r from-ocean-400 to-ocean-500 hover:from-ocean-300 hover:to-ocean-400 text-ocean-950 shadow-[0_0_20px_rgba(32,201,166,0.3)] transition-all active:scale-95"
              >
                <span>Console</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* ── BACKDROP OVERLAY ────────────────────────────────────────── */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-50 bg-black/65 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      />

      {/* ── LEFT SLIDE-OUT NAVIGATION DRAWER ────────────────────────── */}
      <aside
        ref={drawerRef}
        className={`fixed top-0 bottom-0 left-0 z-50 w-full sm:w-96 max-w-[90vw] bg-ocean-950/95 border-r border-ocean-300/20 backdrop-blur-2xl shadow-[0_0_60px_rgba(0,0,0,0.8),0_0_30px_rgba(32,201,166,0.15)] flex flex-col transition-transform duration-300 ease-out transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Main Navigation Drawer"
      >
        {/* Drawer Header: Axion Logo + Branding + Close Button */}
        <div className="p-5 border-b border-ocean-300/15 flex items-center justify-between bg-ocean-900/40">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-ocean-500/30 to-ocean-700/50 border border-ocean-300/40 flex items-center justify-center shadow-[0_0_20px_rgba(32,201,166,0.3)] group-hover:scale-105 transition-all">
              <Layers className="w-5 h-5 text-ocean-200 group-hover:text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight text-white font-sans">
                  AXION
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-ocean-500/20 text-ocean-200 border border-ocean-300/30 uppercase font-bold">
                  Enterprise
                </span>
              </div>
              <p className="text-[11px] text-ocean-200/70 font-mono tracking-wide mt-0.5">
                Data → Intelligence → Action
              </p>
            </div>
          </Link>

          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-xl bg-ocean-900/80 hover:bg-ocean-800 border border-ocean-300/20 text-ocean-300 hover:text-white transition-all active:scale-95"
            aria-label="Close Navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Subtitle / Category Label */}
        <div className="px-5 pt-4 pb-2 text-[10px] font-mono uppercase tracking-widest text-ocean-300/70 font-bold flex items-center justify-between">
          <span>OPERATIONAL DECISION SUITE</span>
          <span className="w-1.5 h-1.5 rounded-full bg-ocean-400 animate-pulse" />
        </div>

        {/* Navigation Items (Exact 1 to 6 Order) */}
        <nav className="flex-1 px-3 py-2 space-y-1.5 overflow-y-auto">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`group flex items-start gap-3.5 p-3.5 rounded-2xl transition-all duration-200 relative ${
                  isActive
                    ? "bg-ocean-500/20 border border-ocean-300/40 text-white shadow-[0_0_25px_rgba(32,201,166,0.15),inset_0_1px_0_0_rgba(94,234,212,0.25)]"
                    : "bg-ocean-900/30 hover:bg-ocean-900/70 border border-transparent hover:border-ocean-300/20 text-ocean-100 hover:text-white"
                }`}
              >
                {/* Active side indicator glow line */}
                {isActive && (
                  <span className="absolute left-1 top-3 bottom-3 w-1 rounded-full bg-ocean-300 shadow-[0_0_10px_rgba(94,234,212,0.8)]" />
                )}

                <div
                  className={`p-2.5 rounded-xl border flex-shrink-0 transition-colors ${
                    isActive
                      ? "bg-ocean-400 text-ocean-950 border-ocean-200 shadow-[0_0_15px_rgba(32,201,166,0.4)]"
                      : "bg-ocean-900/80 border-ocean-300/15 text-ocean-300 group-hover:text-white group-hover:border-ocean-300/30"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-ocean-300/60 font-bold">
                        0{index + 1}
                      </span>
                      <span className="text-sm font-bold tracking-tight font-sans">
                        {item.name}
                      </span>
                    </div>
                    {item.badge && (
                      <span
                        className={`text-[9px] font-mono px-2 py-0.5 rounded-full border font-bold flex-shrink-0 ${
                          isActive
                            ? "bg-ocean-400/20 text-ocean-200 border-ocean-300/40"
                            : "bg-ocean-900/60 text-ocean-300 border-ocean-300/15"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-ocean-200/60 mt-0.5 line-clamp-1 group-hover:text-ocean-200/80 transition-colors">
                    {item.desc}
                  </p>
                </div>

                <ChevronRight
                  className={`w-4 h-4 mt-1 transition-transform group-hover:translate-x-0.5 ${
                    isActive ? "text-ocean-300" : "text-ocean-400/40"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Drawer Footer / Platform Home & Quick Launch */}
        <div className="p-4 border-t border-ocean-300/15 bg-ocean-900/50 space-y-2.5">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className={`flex items-center justify-between p-3 rounded-xl border text-xs font-semibold transition-all ${
              pathname === "/"
                ? "bg-ocean-500/20 border-ocean-300/40 text-white"
                : "bg-ocean-900/60 hover:bg-ocean-800/80 border-ocean-300/15 text-ocean-200 hover:text-white"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Activity className="w-4 h-4 text-ocean-300" />
              <span>Platform Landing & Architecture</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-ocean-400" />
          </Link>

          <div className="pt-2 flex items-center justify-between text-[10px] text-ocean-300/60 font-mono">
            <span>Axion v1.0 • Claude 3.5 Sonnet</span>
            <span className="text-ocean-400 font-bold">Deep Ocean Edition</span>
          </div>
        </div>
      </aside>
    </>
  );
}

