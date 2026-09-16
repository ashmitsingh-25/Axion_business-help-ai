"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Shield,
  DollarSign,
  TrendingDown,
  Activity,
  Lock,
  ArrowRight,
  Sliders,
  FileText,
  Sparkles,
  Zap,
  Clock,
  Layers,
} from "lucide-react";
import { CyberRiskKpiGrid } from "@/components/cyber-risk/CyberRiskKpiGrid";
import { RiskTrendChart } from "@/components/cyber-risk/RiskTrendChart";
import { RiskDriverChart } from "@/components/cyber-risk/RiskDriverChart";
import { AssetRiskTable } from "@/components/cyber-risk/AssetRiskTable";
import { TelemetryStream } from "@/components/cyber-risk/TelemetryStream";
import { ControlEffectivenessCard } from "@/components/cyber-risk/ControlEffectivenessCard";
import { ScenarioSimulator } from "@/components/cyber-risk/ScenarioSimulator";
import { DelayedRemediationSimulator } from "@/components/cyber-risk/DelayedRemediationSimulator";
import { RoleViewSelector, UserRole } from "@/components/cyber-risk/RoleViewSelector";
import { ExecutiveBriefModal } from "@/components/cyber-risk/ExecutiveBriefModal";
import { getEnterpriseRiskOverview } from "@/lib/cyber-risk-engine";

export default function CyberRiskPage() {
  const [role, setRole] = useState<UserRole>("CISO");
  const [briefOpen, setBriefOpen] = useState(false);
  const overview = getEnterpriseRiskOverview();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* ── TOP COMMAND BAR ─────────────────────────────────────────── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-sans">
              Cyber Risk Intelligence
            </h1>
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 flex items-center gap-1 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>Financial Quantification Engine</span>
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Continuously quantify technical cyber exposure in business and financial terms.
          </p>
        </div>

        {/* Action Controls & Role Switcher */}
        <div className="flex flex-wrap items-center gap-3">
          <RoleViewSelector currentRole={role} onRoleChange={setRole} />

          <button
            onClick={() => setBriefOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-xs font-semibold text-zinc-300 flex items-center gap-1.5 shadow-sm transition-all"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Executive Brief</span>
          </button>

          <Link
            href="/cyber-risk/investments"
            className="px-4 py-2 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 text-xs font-bold flex items-center gap-1.5 shadow-[0_0_20px_rgba(255,255,255,0.12)] active:scale-95 transition-all"
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>Optimize Investments</span>
          </Link>
        </div>
      </div>

      {/* ── QUICK MODULE SUB-NAV STRIP ───────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Link
          href="/cyber-risk/investments"
          className="p-4 rounded-2xl bg-zinc-900/40 border border-white/5 hover:border-white/20 hover:bg-white/[0.02] transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <DollarSign className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                Security Investment Optimizer
              </div>
              <div className="text-[11px] text-zinc-400">0/1 Knapsack Budget & ROSI Model</div>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:translate-x-1 group-hover:text-white transition-all" />
        </Link>

        <Link
          href="/cyber-risk/compliance"
          className="p-4 rounded-2xl bg-zinc-900/40 border border-white/5 hover:border-white/20 hover:bg-white/[0.02] transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                Compliance & Framework Center
              </div>
              <div className="text-[11px] text-zinc-400">NIST, ISO 27001, CIS, RBI & SEBI</div>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:translate-x-1 group-hover:text-white transition-all" />
        </Link>

        <Link
          href="/insights"
          className="p-4 rounded-2xl bg-zinc-900/40 border border-white/5 hover:border-white/20 hover:bg-white/[0.02] transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors">
                AI Cyber Risk Copilot
              </div>
              <div className="text-[11px] text-zinc-400">5-Stage Natural Language Inquiries</div>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:translate-x-1 group-hover:text-white transition-all" />
        </Link>
      </div>

      {/* ── TOP KPI METRIC CARDS ────────────────────────────────────── */}
      <CyberRiskKpiGrid overview={overview} />

      {/* ── RISK TREND & RISK DRIVERS (Role-adapted) ───────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7">
          <RiskTrendChart />
        </div>
        <div className="lg:col-span-5">
          <RiskDriverChart />
        </div>
      </div>

      {/* ── ASSET CRITICALITY & RISK TABLE ──────────────────────────── */}
      {(role === "CISO" || role === "ANALYST") && <AssetRiskTable />}

      {/* ── TELEMETRY STREAM & CONTROL MATRIX ──────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-6">
          <TelemetryStream />
        </div>
        <div className="lg:col-span-6">
          <ControlEffectivenessCard />
        </div>
      </div>

      {/* ── WHAT-IF SCENARIO & DELAYED REMEDIATION SIMULATORS ────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7">
          <ScenarioSimulator />
        </div>
        <div className="lg:col-span-5">
          <DelayedRemediationSimulator />
        </div>
      </div>

      {/* ── EXECUTIVE BRIEF MODAL ───────────────────────────────────── */}
      <ExecutiveBriefModal
        overview={overview}
        isOpen={briefOpen}
        onClose={() => setBriefOpen(false)}
      />
    </div>
  );
}
