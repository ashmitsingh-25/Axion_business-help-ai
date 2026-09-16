"use client";

import { Shield, TrendingDown, DollarSign, Activity, Lock, Target } from "lucide-react";
import { CyberRiskOverview } from "@/lib/types";

interface CyberRiskKpiGridProps {
  overview: CyberRiskOverview;
}

export function CyberRiskKpiGrid({ overview }: CyberRiskKpiGridProps) {
  const kpiCards = [
    {
      title: "Enterprise Cyber Risk",
      value: `${overview.enterpriseScore} / 100`,
      badge: "Elevated Risk",
      badgeColor: "bg-amber-500/10 text-amber-300 border-amber-500/20",
      change: "+4 pts MoM",
      icon: Shield,
      description: "Aggregated CVSS, exploitability & exposure score",
    },
    {
      title: "Expected Annual Loss (EAL)",
      value: overview.expectedAnnualLossFormatted,
      badge: "Financial Impact",
      badgeColor: "bg-rose-500/10 text-rose-300 border-rose-500/20",
      change: "17% Incident Prob",
      icon: DollarSign,
      description: "Probability × Total quantified financial impact",
    },
    {
      title: "Total Financial Exposure",
      value: overview.totalFinancialExposureFormatted,
      badge: "Single-Event Max",
      badgeColor: "bg-blue-500/10 text-blue-300 border-blue-500/20",
      change: "₹8.4 Cr Worst Case",
      icon: Activity,
      description: "Downtime, breach, regulatory & recovery liability",
    },
    {
      title: "Control Effectiveness",
      value: `${overview.controlEffectivenessPercent}%`,
      badge: "10 Controls",
      badgeColor: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
      change: "Patching & Seg lag",
      icon: Lock,
      description: "MFA (92%), EDR (87%), Patch (61%), Seg (42%)",
    },
    {
      title: "Critical Tier Assets",
      value: `${overview.criticalAssetCount} / ${overview.totalMonitoredAssets}`,
      badge: "18 High Impact",
      badgeColor: "bg-purple-500/10 text-purple-300 border-purple-500/20",
      change: "7 High Risk",
      icon: Target,
      description: "Payment Gateway, Auth Vault & Core APIs",
    },
    {
      title: "Risk Reduction Opportunity",
      value: overview.riskReductionOpportunityFormatted,
      badge: "Optimized ROI",
      badgeColor: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
      change: "Achievable at ₹18L",
      icon: TrendingDown,
      description: "Expected annual loss reduction under optimal spend",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {kpiCards.map((kpi, idx) => {
        const Icon = kpi.icon;
        return (
          <div
            key={idx}
            className="p-4 rounded-2xl bg-zinc-900/60 border border-white/10 hover:border-white/20 backdrop-blur-2xl transition-all duration-200 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_10px_30px_-10px_rgba(0,0,0,0.5)] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-zinc-200 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]">
                  <Icon className="w-4 h-4 text-zinc-300" />
                </div>
                <span
                  className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border ${kpi.badgeColor}`}
                >
                  {kpi.badge}
                </span>
              </div>
              <div className="text-[11px] font-medium text-zinc-400 mt-1">{kpi.title}</div>
              <div className="text-xl font-extrabold text-white font-sans mt-0.5 tracking-tight">
                {kpi.value}
              </div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-[10px] text-zinc-400">
              <span className="truncate pr-1">{kpi.description}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
