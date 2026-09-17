"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Layers,
  ArrowRight,
  RotateCcw,
  Boxes,
  Receipt,
  Sparkles,
  ShieldCheck,
  Database,
  Cpu,
  Zap,
  ChevronDown,
  Shield,
  DollarSign,
  UserCheck,
  Terminal,
  Sliders,
} from "lucide-react";

export default function LandingPage() {
  const [heroCyberDropdown, setHeroCyberDropdown] = useState(false);
  const heroDropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (heroDropdownRef.current && !heroDropdownRef.current.contains(e.target as Node)) {
        setHeroCyberDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const cyberSubLinks = [
    {
      name: "Executive Board View",
      desc: "Financial loss exposure & executive brief",
      href: "/cyber-risk?role=EXECUTIVE#executive-view",
      icon: UserCheck,
      badge: "Board Level",
    },
    {
      name: "CISO & Risk Lead Command",
      desc: "Controls, critical assets & threat drivers",
      href: "/cyber-risk?role=CISO#ciso-view",
      icon: Shield,
      badge: "Security Lead",
    },
    {
      name: "Security Analyst Telemetry",
      desc: "Real-time telemetry stream & CVEs",
      href: "/cyber-risk?role=ANALYST#telemetry-view",
      icon: Terminal,
      badge: "Live Telemetry",
    },
    {
      name: "Security Investment Optimizer",
      desc: "0/1 Knapsack budget allocation & ROSI",
      href: "/cyber-risk/investments",
      icon: DollarSign,
      badge: "ROSI Model",
    },
    {
      name: "Compliance & Governance Matrix",
      desc: "NIST, ISO 27001, CIS, RBI & SEBI",
      href: "/cyber-risk/compliance",
      icon: Layers,
      badge: "Frameworks",
    },
    {
      name: "What-If Scenario Simulator",
      desc: "Delayed remediation & incident simulation",
      href: "/cyber-risk#simulator",
      icon: Sliders,
      badge: "Simulation",
    },
  ];

  // Symmetrical primary 3 core capability cards
  const primaryModules = [
    {
      title: "Cyber Risk Intelligence",
      subtitle: "Financial Quantification & EAL",
      desc: "Translate technical vulnerabilities into Expected Annual Loss and optimal security spend.",
      icon: ShieldCheck,
      href: "/cyber-risk",
      badge: "₹2.1Cr EAL",
      metric: "ROSI 600%",
    },
    {
      title: "Decision Copilot",
      subtitle: "5-Stage Agentic Reasoning",
      desc: "Claude 3.5 multi-agent synthesis: Detect → Investigate → Assess → Recommend → Alert.",
      icon: Sparkles,
      href: "/insights",
      badge: "Claude 3.5",
      metric: "Real-time AI",
    },
    {
      title: "Demand & Inventory",
      subtitle: "Stockout Prevention",
      desc: "Velocity forecasting with automated Supplier A vs B tradeoff routing.",
      icon: Boxes,
      href: "/inventory",
      badge: "Predictive",
      metric: "0 Stockouts",
    },
  ];

  // Compact secondary 2 cards
  const secondaryCompactModules = [
    {
      title: "Smart Exchange",
      desc: "Convert refund requests to automated size exchanges with instant courier pickup.",
      icon: RotateCcw,
      href: "/returns",
      badge: "85% GMV Retained",
    },
    {
      title: "AI Expense Auditor",
      desc: "Autonomous receipt scanning and RAG corporate policy limit compliance verification.",
      icon: Receipt,
      href: "/expenses",
      badge: "100% Policy Match",
    },
  ];

  return (
    <div className="relative overflow-hidden space-y-16 pb-20">
      {/* ── HERO SECTION (Top badge option removed) ───────────────────── */}
      <section className="relative pt-12 lg:pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white font-sans leading-[1.1]">
              Axion — Intelligent Operations &{" "}
              <span className="bg-gradient-to-r from-ocean-200 via-ocean-300 to-ocean-400 bg-clip-text text-transparent">
                Cyber Risk Decisions
              </span>
            </h1>

            {/* Concise Subheading */}
            <p className="text-base sm:text-lg text-ocean-100/80 max-w-2xl mx-auto leading-relaxed font-normal">
              Unify enterprise operations, live telemetry, and financial cyber risk quantification into a single autonomous decision layer.
            </p>

            {/* Hero CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-3">
              <Link
                href="/dashboard"
                className="w-full sm:w-auto px-7 py-3 rounded-xl bg-gradient-to-r from-ocean-400 to-ocean-500 hover:from-ocean-300 hover:to-ocean-400 text-ocean-950 font-bold text-xs shadow-ocean-glow transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Launch Console</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {/* Interactive Cyber Risk Dropdown Button (Click to reveal only) */}
              <div className="relative w-full sm:w-auto" ref={heroDropdownRef}>
                <button
                  type="button"
                  onClick={() => setHeroCyberDropdown(!heroCyberDropdown)}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-ocean-900/80 hover:bg-ocean-800 border border-ocean-300/30 text-ocean-100 font-semibold text-xs backdrop-blur-md transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <ShieldCheck className="w-4 h-4 text-ocean-300" />
                  <span>Cyber Risk</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-ocean-300 transition-transform duration-200 ${
                      heroCyberDropdown ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Hero Dropdown Menu (revealed only after clicking) */}
                {heroCyberDropdown && (
                  <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-80 rounded-2xl bg-ocean-950/95 border border-ocean-300/30 p-2 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(32,201,166,0.2)] z-50 text-left animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-3 py-1.5 border-b border-ocean-300/10 flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-ocean-300">
                        Choose Cyber Risk View
                      </span>
                      <Link
                        href="/cyber-risk"
                        onClick={() => setHeroCyberDropdown(false)}
                        className="text-[10px] text-ocean-400 hover:text-white font-mono"
                      >
                        Overview →
                      </Link>
                    </div>

                    <div className="py-1 space-y-0.5">
                      {cyberSubLinks.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setHeroCyberDropdown(false)}
                            className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-ocean-900/90 border border-transparent hover:border-ocean-300/20 transition-all"
                          >
                            <div className="p-2 rounded-lg bg-ocean-900/80 border border-ocean-300/15 text-ocean-300 group-hover:text-white flex-shrink-0">
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
                                {item.desc}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* White Ask Copilot CTA Button */}
              <Link
                href="/insights"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white hover:bg-neutral-100 text-ocean-950 font-black text-xs transition-all shadow-[0_0_20px_rgba(255,255,255,0.35)] flex items-center justify-center gap-2 active:scale-95"
              >
                <Sparkles className="w-4 h-4 fill-ocean-950 text-ocean-950" />
                <span>Ask Copilot</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4 KEY LIVE METRICS STRIP ─────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-ocean-950/60 border border-ocean-300/15 backdrop-blur-xl shadow-ocean-card flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-ocean-500/10 border border-ocean-300/20 text-ocean-300">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-extrabold text-white font-mono">₹3.8 Cr</div>
              <div className="text-[11px] text-ocean-200/60">Risk Exposure Analyzed</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-ocean-950/60 border border-ocean-300/15 backdrop-blur-xl shadow-ocean-card flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-ocean-500/10 border border-ocean-300/20 text-ocean-300">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-extrabold text-white font-mono">85%</div>
              <div className="text-[11px] text-ocean-200/60">Retained Exchange GMV</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-ocean-950/60 border border-ocean-300/15 backdrop-blur-xl shadow-ocean-card flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-ocean-500/10 border border-ocean-300/20 text-ocean-300">
              <Boxes className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-extrabold text-white font-mono">0 Days</div>
              <div className="text-[11px] text-ocean-200/60">Stockout on Core SKUs</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-ocean-950/60 border border-ocean-300/15 backdrop-blur-xl shadow-ocean-card flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-ocean-500/10 border border-ocean-300/20 text-ocean-300">
              <Receipt className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-extrabold text-white font-mono">100%</div>
              <div className="text-[11px] text-ocean-200/60">Automated Expense Audits</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MINIMAL 3-STAGE DECISION PIPELINE ───────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-3xl bg-ocean-950/60 border border-ocean-300/15 backdrop-blur-2xl shadow-ocean-card">
          <div className="text-center mb-6">
            <div className="text-[10px] font-mono font-bold tracking-widest text-ocean-300 uppercase">
              DECISION ENGINE ARCHITECTURE
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold text-white mt-1">
              From Live Telemetry to Autonomous Action
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Step 1 */}
            <div className="p-4 rounded-2xl bg-ocean-900/40 border border-ocean-300/10 space-y-2">
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-lg bg-ocean-500/10 text-ocean-300 border border-ocean-300/20">
                  <Database className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono text-ocean-300 font-bold">01 INGEST</span>
              </div>
              <h3 className="text-xs font-bold text-white">Live Enterprise Telemetry</h3>
              <p className="text-[11px] text-ocean-200/70 leading-relaxed">
                Continuous ingestion across ERPs, inventory velocity, return queues, SIEM, and vulnerability streams.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-4 rounded-2xl bg-ocean-500/15 border border-ocean-300/30 space-y-2 shadow-ocean-glow">
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-lg bg-ocean-400/20 text-ocean-200 border border-ocean-300/30">
                  <Cpu className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono text-ocean-200 font-bold">02 QUANTIFY</span>
              </div>
              <h3 className="text-xs font-bold text-white">AI Reasoning & EAL Engine</h3>
              <p className="text-[11px] text-ocean-100/80 leading-relaxed">
                Claude 3.5 multi-agent synthesis, Expected Annual Loss (EAL) calculation, and Knapsack optimization.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-4 rounded-2xl bg-ocean-900/40 border border-ocean-300/10 space-y-2">
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-lg bg-ocean-500/10 text-ocean-300 border border-ocean-300/20">
                  <Zap className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono text-ocean-300 font-bold">03 AUTOMATE</span>
              </div>
              <h3 className="text-xs font-bold text-white">Deterministic Action</h3>
              <p className="text-[11px] text-ocean-200/70 leading-relaxed">
                Automated 1-click size exchanges, supplier reorders, hotfix deployments, and policy enforcement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SYMMETRICAL MODULES & COMPACT BOXES SECTION ──────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="text-center max-w-2xl mx-auto mb-6 space-y-1">
          <div className="text-[10px] font-mono uppercase text-ocean-300 tracking-wider font-bold">
            ENTERPRISE CAPABILITIES
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-sans">
            Autonomous Decision Modules
          </h2>
        </div>

        {/* 1. Symmetrical Top Row: 3 Core Primary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {primaryModules.map((mod) => {
            const Icon = mod.icon;
            return (
              <Link
                key={mod.title}
                href={mod.href}
                className="group p-5 rounded-2xl bg-ocean-950/60 border border-ocean-300/15 hover:border-ocean-300/40 backdrop-blur-xl transition-all duration-300 shadow-ocean-card hover:-translate-y-0.5 flex flex-col justify-between min-h-[210px]"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2.5 rounded-xl bg-ocean-500/10 border border-ocean-300/20 text-ocean-300 group-hover:scale-105 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-ocean-500/15 text-ocean-300 border border-ocean-300/20 font-bold">
                      {mod.badge}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white group-hover:text-ocean-300 transition-colors">
                    {mod.title}
                  </h3>
                  <div className="text-[10px] font-mono text-ocean-300/70 mt-0.5">
                    {mod.subtitle}
                  </div>
                  <p className="text-xs text-ocean-200/70 mt-2 leading-relaxed">
                    {mod.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-ocean-300/10 flex items-center justify-between text-xs">
                  <span className="text-[11px] font-mono text-ocean-300 font-semibold">
                    {mod.metric}
                  </span>
                  <div className="flex items-center gap-1 text-ocean-300 group-hover:translate-x-1 transition-transform font-bold text-[11px]">
                    <span>Open</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* 2. Compact Bottom Row: Smart Exchange & AI Expense Auditor (Small boxes) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {secondaryCompactModules.map((mod) => {
            const Icon = mod.icon;
            return (
              <Link
                key={mod.title}
                href={mod.href}
                className="group p-3.5 rounded-2xl bg-ocean-950/40 border border-ocean-300/15 hover:border-ocean-300/35 backdrop-blur-xl transition-all duration-200 shadow-ocean-card hover:-translate-y-0.5 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2 rounded-xl bg-ocean-500/10 border border-ocean-300/20 text-ocean-300 group-hover:scale-105 transition-transform flex-shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-white group-hover:text-ocean-300 transition-colors truncate">
                        {mod.title}
                      </h4>
                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-ocean-500/15 text-ocean-300 border border-ocean-300/20 flex-shrink-0">
                        {mod.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-ocean-200/60 truncate mt-0.5">
                      {mod.desc}
                    </p>
                  </div>
                </div>

                <div className="p-1.5 rounded-lg bg-ocean-900/60 border border-ocean-300/15 text-ocean-300 group-hover:translate-x-0.5 group-hover:text-white transition-all flex-shrink-0">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── MINIMAL CTA BANNER ──────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-ocean-950/90 via-ocean-900/80 to-ocean-950/90 border border-ocean-300/25 backdrop-blur-2xl text-center space-y-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <h3 className="text-xl sm:text-2xl font-extrabold text-white">
            Ready to explore Axion Autonomous Operations?
          </h3>
          <p className="text-xs text-ocean-200/70 max-w-xl mx-auto">
            Launch the live console to interact with seeded retail, inventory, expense, and cyber risk telemetry.
          </p>
          <div className="pt-2">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-ocean-400 to-ocean-500 hover:from-ocean-300 hover:to-ocean-400 text-ocean-950 font-bold text-xs shadow-ocean-glow transition-all active:scale-95"
            >
              <span>Launch Live Console</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
