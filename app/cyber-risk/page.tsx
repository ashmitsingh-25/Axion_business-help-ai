"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Shield,
  DollarSign,
  ArrowRight,
  FileText,
  Sparkles,
  Layers,
  Sliders,
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

function CyberRiskContent() {
  const searchParams = useSearchParams();
  const [role, setRole] = useState<UserRole>("CISO");
  const [briefOpen, setBriefOpen] = useState(false);
  const overview = getEnterpriseRiskOverview();

  // Sync role and modal state from URL parameters
  useEffect(() => {
    const roleParam = searchParams.get("role");
    if (roleParam === "EXECUTIVE" || roleParam === "CISO" || roleParam === "ANALYST") {
      setRole(roleParam);
    }
    if (searchParams.get("brief") === "true") {
      setBriefOpen(true);
    }
  }, [searchParams]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* ── TOP COMMAND BAR ─────────────────────────────────────────── */}
      <div
        id="executive-view"
        className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-ocean-800/40"
      >
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-sans">
              Cyber Risk Intelligence
            </h1>
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-ocean-500/10 text-ocean-300 border border-ocean-500/25 flex items-center gap-1 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-ocean-400 animate-pulse shadow-[0_0_6px_rgba(32,201,166,0.6)]" />
              <span>Financial Loss Engine</span>
            </span>
          </div>
          <p className="text-xs text-ocean-200/60 mt-1">
            Quantify technical cyber vulnerabilities into Expected Annual Loss (EAL) and optimized investments.
          </p>
        </div>

        {/* Action Controls & Role Switcher */}
        <div className="flex flex-wrap items-center gap-2.5">
          <RoleViewSelector currentRole={role} onRoleChange={setRole} />

          <button
            onClick={() => setBriefOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-ocean-900/60 hover:bg-ocean-800/70 border border-ocean-700/40 text-xs font-semibold text-ocean-100 flex items-center gap-1.5 shadow-ocean-card backdrop-blur-md transition-all hover:border-ocean-500/40 active:scale-95"
          >
            <FileText className="w-3.5 h-3.5 text-ocean-300" />
            <span>Executive Brief</span>
          </button>

          <Link
            href="/cyber-risk/investments"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-ocean-500 to-ocean-400 hover:from-ocean-400 hover:to-ocean-300 text-ocean-950 text-xs font-bold flex items-center gap-1.5 shadow-ocean-glow active:scale-95 transition-all"
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>Optimize Spend</span>
          </Link>
        </div>
      </div>

      {/* ── QUICK MODULE SUB-NAV STRIP ───────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Link
          href="/cyber-risk/investments"
          className="p-3.5 rounded-2xl bg-ocean-950/40 border border-ocean-800/40 hover:border-ocean-500/40 hover:bg-ocean-900/30 backdrop-blur-xl transition-all duration-300 shadow-ocean-card flex items-center justify-between group hover:-translate-y-0.5"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-ocean-500/10 border border-ocean-500/25 text-ocean-300 group-hover:scale-105 transition-transform">
              <DollarSign className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white group-hover:text-ocean-300 transition-colors">
                Investment Optimizer
              </div>
              <div className="text-[11px] text-ocean-200/50">0/1 Knapsack Budget & ROSI</div>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-ocean-400/50 group-hover:translate-x-1 group-hover:text-ocean-300 transition-all" />
        </Link>

        <Link
          href="/cyber-risk/compliance"
          className="p-3.5 rounded-2xl bg-ocean-950/40 border border-ocean-800/40 hover:border-ocean-500/40 hover:bg-ocean-900/30 backdrop-blur-xl transition-all duration-300 shadow-ocean-card flex items-center justify-between group hover:-translate-y-0.5"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-ocean-500/10 border border-ocean-500/25 text-ocean-300 group-hover:scale-105 transition-transform">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white group-hover:text-ocean-300 transition-colors">
                Compliance Matrix
              </div>
              <div className="text-[11px] text-ocean-200/50">NIST, ISO 27001, CIS, RBI & SEBI</div>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-ocean-400/50 group-hover:translate-x-1 group-hover:text-ocean-300 transition-all" />
        </Link>

        <Link
          href="/insights"
          className="p-3.5 rounded-2xl bg-ocean-950/40 border border-ocean-800/40 hover:border-ocean-500/40 hover:bg-ocean-900/30 backdrop-blur-xl transition-all duration-300 shadow-ocean-card flex items-center justify-between group hover:-translate-y-0.5"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-ocean-500/10 border border-ocean-500/25 text-ocean-300 group-hover:scale-105 transition-transform">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white group-hover:text-ocean-300 transition-colors">
                AI Decision Copilot
              </div>
              <div className="text-[11px] text-ocean-200/50">Cross-department AI reasoning</div>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-ocean-400/50 group-hover:translate-x-1 group-hover:text-ocean-300 transition-all" />
        </Link>
      </div>

      {/* ── TOP KPI METRIC CARDS ────────────────────────────────────── */}
      <CyberRiskKpiGrid overview={overview} />

      {/* ── RISK TREND & RISK DRIVERS (Role-adapted) ───────────────── */}
      <div id="ciso-view" className="grid grid-cols-1 lg:grid-cols-12 gap-8 scroll-mt-24">
        <div className="lg:col-span-7">
          <RiskTrendChart />
        </div>
        <div className="lg:col-span-5">
          <RiskDriverChart />
        </div>
      </div>

      {/* ── ASSET CRITICALITY & RISK TABLE ──────────────────────────── */}
      {(role === "CISO" || role === "ANALYST") && (
        <div id="assets-table" className="scroll-mt-24">
          <AssetRiskTable />
        </div>
      )}

      {/* ── TELEMETRY STREAM & CONTROL MATRIX ──────────────────────── */}
      <div id="telemetry-view" className="grid grid-cols-1 lg:grid-cols-12 gap-8 scroll-mt-24">
        <div className="lg:col-span-6">
          <TelemetryStream />
        </div>
        <div className="lg:col-span-6">
          <ControlEffectivenessCard />
        </div>
      </div>

      {/* ── WHAT-IF SCENARIO & DELAYED REMEDIATION SIMULATORS ────────── */}
      <div id="simulator" className="grid grid-cols-1 lg:grid-cols-12 gap-8 scroll-mt-24">
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

export default function CyberRiskPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-16 text-center text-ocean-300 font-mono text-xs">
          Loading Cyber Risk Intelligence...
        </div>
      }
    >
      <CyberRiskContent />
    </Suspense>
  );
}
