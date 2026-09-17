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
  ChevronDown,
  Shield,
  DollarSign,
  Terminal,
  Activity,
  UserCheck,
  Sliders,
} from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const isLanding = pathname === "/";
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cyberDropdownOpen, setCyberDropdownOpen] = useState(false);
  const [drawerCyberOpen, setDrawerCyberOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const drawerRef = useRef<HTMLDivElement | null>(null);

  // Track scroll position for header glass intensity
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCyberDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        setCyberDropdownOpen(false);
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

  const cyberSubLinks = [
    {
      name: "Executive Board View",
      subtitle: "Financial loss exposure & executive brief",
      href: "/cyber-risk?role=EXECUTIVE#executive-view",
      icon: UserCheck,
      badge: "Board Level",
    },
    {
      name: "CISO & Risk Lead Command",
      subtitle: "Asset risks, control efficacy & drivers",
      href: "/cyber-risk?role=CISO#ciso-view",
      icon: Shield,
      badge: "Security Lead",
    },
    {
      name: "Security Analyst Telemetry",
      subtitle: "Live SIEM, EDR & vulnerability streams",
      href: "/cyber-risk?role=ANALYST#telemetry-view",
      icon: Terminal,
      badge: "Live Stream",
    },
    {
      name: "Security Investment Optimizer",
      subtitle: "0/1 Knapsack budget allocation & ROSI",
      href: "/cyber-risk/investments",
      icon: DollarSign,
      badge: "ROSI Model",
    },
    {
      name: "Compliance & Governance Matrix",
      subtitle: "NIST, ISO 27001, CIS, RBI & SEBI",
      href: "/cyber-risk/compliance",
      icon: Layers,
      badge: "Frameworks",
    },
    {
      name: "What-If Scenario Simulator",
      subtitle: "Delayed remediation & incident stress testing",
      href: "/cyber-risk#simulator",
      icon: Sliders,
      badge: "Simulation",
    },
  ];

  const isCyberActive = pathname.startsWith("/cyber-risk");

  return (
    <>
      {/* ── HEADER ─────────────────────────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-ocean-950/85 backdrop-blur-2xl border-b border-ocean-300/15 shadow-[0_15px_40px_rgba(0,0,0,0.5)] py-3"
            : "bg-ocean-950/50 backdrop-blur-md border-b border-ocean-300/10 py-3.5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left: Mobile Drawer Trigger + AXION Brand (No 'Autonomous' text) */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsOpen(true)}
                className="group p-2 rounded-xl bg-ocean-900/80 hover:bg-ocean-800 border border-ocean-300/20 text-ocean-100 hover:text-white transition-all shadow-[inset_0_1px_0_0_rgba(94,234,212,0.15)] active:scale-95 flex items-center justify-center"
                aria-label="Open Navigation Menu"
                id="hamburger-nav-button"
              >
                <Menu className="w-4 h-4 text-ocean-300 group-hover:text-ocean-200 transition-colors" />
              </button>

              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-ocean-500/25 to-ocean-700/40 border border-ocean-300/30 flex items-center justify-center shadow-[0_0_15px_rgba(32,201,166,0.2)] group-hover:border-ocean-300/50 transition-all">
                  <Layers className="w-4 h-4 text-ocean-300 group-hover:text-white transition-colors" />
                </div>
                <span className="text-base font-black tracking-tight text-white font-sans">
                  AXION
                </span>
              </Link>
            </div>

            {/* Desktop Navigation Links (Hidden on landing page, visible on internal pages) */}
            {!isLanding && (
              <nav className="hidden lg:flex items-center gap-1">
                <Link
                  href="/dashboard"
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    pathname === "/dashboard"
                      ? "bg-ocean-500/20 text-white border border-ocean-300/30 shadow-[0_0_15px_rgba(32,201,166,0.15)]"
                      : "text-ocean-200/80 hover:text-white hover:bg-ocean-900/60"
                  }`}
                >
                  Overview
                </Link>

                {/* Cyber Risk Interactive Dropdown Menu */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setCyberDropdownOpen(!cyberDropdownOpen)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      isCyberActive
                        ? "bg-ocean-500/20 text-white border border-ocean-300/30 shadow-[0_0_15px_rgba(32,201,166,0.15)]"
                        : "text-ocean-200/80 hover:text-white hover:bg-ocean-900/60"
                    }`}
                    aria-expanded={cyberDropdownOpen}
                    aria-haspopup="true"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-ocean-300" />
                    <span>Cyber Risk</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 text-ocean-300/80 ${
                        cyberDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Dropdown Menu Content */}
                  {cyberDropdownOpen && (
                    <div
                      className="absolute left-0 mt-2 w-80 rounded-2xl bg-ocean-950/95 border border-ocean-300/25 p-2 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(32,201,166,0.15)] animate-in fade-in slide-in-from-top-2 duration-200 z-50"
                    >
                      <div className="px-3 py-2 border-b border-ocean-300/10 flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-ocean-400 animate-pulse" />
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-ocean-300">
                            Cyber Risk Intelligence
                          </span>
                        </div>
                        <Link
                          href="/cyber-risk"
                          onClick={() => setCyberDropdownOpen(false)}
                          className="text-[10px] text-ocean-400 hover:text-ocean-200 underline font-mono"
                        >
                          All Views →
                        </Link>
                      </div>

                      <div className="py-1 space-y-0.5">
                        {cyberSubLinks.map((item) => {
                          const Icon = item.icon;
                          return (
                            <Link
                              key={item.name}
                              href={item.href}
                              onClick={() => setCyberDropdownOpen(false)}
                              className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-ocean-900/90 border border-transparent hover:border-ocean-300/20 transition-all"
                            >
                              <div className="p-2 rounded-lg bg-ocean-900/80 border border-ocean-300/15 text-ocean-300 group-hover:text-white group-hover:border-ocean-300/30 flex-shrink-0 transition-colors">
                                <Icon className="w-3.5 h-3.5" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-1">
                                  <span className="text-xs font-bold text-ocean-100 group-hover:text-white">
                                    {item.name}
                                  </span>
                                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-ocean-500/15 text-ocean-300 border border-ocean-300/20">
                                    {item.badge}
                                  </span>
                                </div>
                                <p className="text-[10px] text-ocean-200/60 group-hover:text-ocean-200/80 line-clamp-1 mt-0.5">
                                  {item.subtitle}
                                </p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                <Link
                  href="/insights"
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    pathname === "/insights"
                      ? "bg-ocean-500/20 text-white border border-ocean-300/30 shadow-[0_0_15px_rgba(32,201,166,0.15)]"
                      : "text-ocean-200/80 hover:text-white hover:bg-ocean-900/60"
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-ocean-300" />
                  <span>Decision Copilot</span>
                </Link>

                <Link
                  href="/inventory"
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    pathname === "/inventory"
                      ? "bg-ocean-500/20 text-white border border-ocean-300/30 shadow-[0_0_15px_rgba(32,201,166,0.15)]"
                      : "text-ocean-200/80 hover:text-white hover:bg-ocean-900/60"
                  }`}
                >
                  Inventory
                </Link>

                <Link
                  href="/returns"
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    pathname === "/returns"
                      ? "bg-ocean-500/20 text-white border border-ocean-300/30 shadow-[0_0_15px_rgba(32,201,166,0.15)]"
                      : "text-ocean-200/80 hover:text-white hover:bg-ocean-900/60"
                  }`}
                >
                  Smart Exchange
                </Link>

                <Link
                  href="/expenses"
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    pathname === "/expenses"
                      ? "bg-ocean-500/20 text-white border border-ocean-300/30 shadow-[0_0_15px_rgba(32,201,166,0.15)]"
                      : "text-ocean-200/80 hover:text-white hover:bg-ocean-900/60"
                  }`}
                >
                  Expense Auditor
                </Link>
              </nav>
            )}

            {/* Right: Actions */}
            <div className="flex items-center gap-2.5">
              {!isLanding && (
                <Link
                  href="/insights"
                  className="hidden sm:flex items-center gap-2 text-xs text-white bg-ocean-900/80 hover:bg-ocean-800 px-3 py-1.5 rounded-xl border border-white/20 backdrop-blur-md transition-all shadow-sm hover:border-white/40"
                >
                  <Sparkles className="w-3.5 h-3.5 text-white animate-pulse" />
                  <span className="font-bold text-[11px] text-white">Ask Copilot</span>
                </Link>
              )}

              <Link
                href="/dashboard"
                className="flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-ocean-400 to-ocean-500 hover:from-ocean-300 hover:to-ocean-400 text-ocean-950 shadow-[0_0_20px_rgba(32,201,166,0.3)] transition-all active:scale-95"
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
        {/* Drawer Header */}
        <div className="p-4 border-b border-ocean-300/15 flex items-center justify-between bg-ocean-900/40">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-ocean-500/30 to-ocean-700/50 border border-ocean-300/40 flex items-center justify-center shadow-[0_0_15px_rgba(32,201,166,0.3)]">
              <Layers className="w-4 h-4 text-ocean-200" />
            </div>
            <div>
              <span className="text-base font-black tracking-tight text-white font-sans">
                AXION
              </span>
              <p className="text-[10px] text-ocean-300/70 font-mono">
                Enterprise Decision Platform
              </p>
            </div>
          </Link>

          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded-xl bg-ocean-900/80 hover:bg-ocean-800 border border-ocean-300/20 text-ocean-300 hover:text-white transition-all active:scale-95"
            aria-label="Close Navigation"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-3 space-y-1.5 overflow-y-auto">
          {/* 1. Overview */}
          <Link
            href="/dashboard"
            onClick={() => setIsOpen(false)}
            className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
              pathname === "/dashboard"
                ? "bg-ocean-500/20 border border-ocean-300/40 text-white"
                : "hover:bg-ocean-900/70 text-ocean-100 hover:text-white"
            }`}
          >
            <div className="p-2 rounded-lg bg-ocean-900/80 border border-ocean-300/15 text-ocean-300">
              <LayoutDashboard className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="text-xs font-bold">Overview Console</div>
              <div className="text-[10px] text-ocean-200/60">Operations telemetry & metrics</div>
            </div>
          </Link>

          {/* 2. Cyber Risk with Expandable Submenu */}
          <div className="rounded-xl border border-ocean-300/15 bg-ocean-900/20 overflow-hidden">
            <button
              type="button"
              onClick={() => setDrawerCyberOpen(!drawerCyberOpen)}
              className="w-full flex items-center justify-between p-3 bg-ocean-900/40 hover:bg-ocean-900/60 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-ocean-500/20 border border-ocean-300/25 text-ocean-300">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Cyber Risk</div>
                  <div className="text-[10px] text-ocean-200/60">Financial loss & mitigation</div>
                </div>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-ocean-300 transition-transform duration-200 ${
                  drawerCyberOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Sub-links (Revealed only after clicking) */}
            {drawerCyberOpen && (
              <div className="p-1.5 bg-ocean-950/60 border-t border-ocean-300/10 space-y-1">
                {cyberSubLinks.map((sub) => {
                  const Icon = sub.icon;
                  return (
                    <Link
                      key={sub.name}
                      href={sub.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-ocean-900/80 text-ocean-200/80 hover:text-white transition-all text-xs"
                    >
                      <Icon className="w-3.5 h-3.5 text-ocean-300 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-[11px] font-semibold text-ocean-100">{sub.name}</div>
                        <div className="text-[9px] text-ocean-200/50 line-clamp-1">
                          {sub.subtitle}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* 3. Decision Copilot */}
          <Link
            href="/insights"
            onClick={() => setIsOpen(false)}
            className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
              pathname === "/insights"
                ? "bg-ocean-500/20 border border-ocean-300/40 text-white"
                : "hover:bg-ocean-900/70 text-ocean-100 hover:text-white"
            }`}
          >
            <div className="p-2 rounded-lg bg-ocean-900/80 border border-ocean-300/15 text-ocean-300">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="text-xs font-bold">Decision Copilot</div>
              <div className="text-[10px] text-ocean-200/60">Claude 3.5 multi-agent AI inquiry</div>
            </div>
          </Link>

          {/* 4. Inventory */}
          <Link
            href="/inventory"
            onClick={() => setIsOpen(false)}
            className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
              pathname === "/inventory"
                ? "bg-ocean-500/20 border border-ocean-300/40 text-white"
                : "hover:bg-ocean-900/70 text-ocean-100 hover:text-white"
            }`}
          >
            <div className="p-2 rounded-lg bg-ocean-900/80 border border-ocean-300/15 text-ocean-300">
              <Boxes className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="text-xs font-bold">Demand & Inventory</div>
              <div className="text-[10px] text-ocean-200/60">Stockout forecasting & routing</div>
            </div>
          </Link>

          {/* 5. Smart Exchange */}
          <Link
            href="/returns"
            onClick={() => setIsOpen(false)}
            className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
              pathname === "/returns"
                ? "bg-ocean-500/20 border border-ocean-300/40 text-white"
                : "hover:bg-ocean-900/70 text-ocean-100 hover:text-white"
            }`}
          >
            <div className="p-2 rounded-lg bg-ocean-900/80 border border-ocean-300/15 text-ocean-300">
              <RefreshCcw className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="text-xs font-bold">Smart Exchange</div>
              <div className="text-[10px] text-ocean-200/60">Instant size exchange & GMV retention</div>
            </div>
          </Link>

          {/* 6. Expense Auditor */}
          <Link
            href="/expenses"
            onClick={() => setIsOpen(false)}
            className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
              pathname === "/expenses"
                ? "bg-ocean-500/20 border border-ocean-300/40 text-white"
                : "hover:bg-ocean-900/70 text-ocean-100 hover:text-white"
            }`}
          >
            <div className="p-2 rounded-lg bg-ocean-900/80 border border-ocean-300/15 text-ocean-300">
              <Receipt className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="text-xs font-bold">AI Expense Auditor</div>
              <div className="text-[10px] text-ocean-200/60">RAG policy compliance & audit</div>
            </div>
          </Link>
        </nav>

        {/* Drawer Footer */}
        <div className="p-3 border-t border-ocean-300/15 bg-ocean-900/50">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-between p-2.5 rounded-xl border border-ocean-300/15 text-xs text-ocean-200 hover:text-white bg-ocean-900/60"
          >
            <div className="flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-ocean-300" />
              <span>Landing Page</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-ocean-400" />
          </Link>
        </div>
      </aside>
    </>
  );
}
