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
      badgeColor: "bg-amber-500/15 text-amber-300 border-amber-500/30",
      change: "+4 pts MoM",
      icon: Shield,
      description: "Aggregated CVSS, exploitability & exposure score",
    },
    {
      title: "Expected Annual Loss (EAL)",
      value: overview.expectedAnnualLossFormatted,
      badge: "Financial Impact",
      badgeColor: "bg-rose-500/15 text-rose-300 border-rose-500/30",
      change: "17% Incident Prob",
      icon: DollarSign,
      description: "Probability × Total quantified financial impact",
    },
    {
      title: "Total Financial Exposure",
      value: overview.totalFinancialExposureFormatted,
      badge: "Single-Event Max",
      badgeColor: "bg-ocean-500/20 text-ocean-200 border-ocean-300/30",
      change: "₹8.4 Cr Worst Case",
      icon: Activity,
      description: "Downtime, breach, regulatory & recovery liability",
    },
    {
      title: "Control Effectiveness",
      value: `${overview.controlEffectivenessPercent}%`,
      badge: "10 Controls",
      badgeColor: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
      change: "Patching & Seg lag",
      icon: Lock,
      description: "MFA (92%), EDR (87%), Patch (61%), Seg (42%)",
    },
    {
      title: "Critical Tier Assets",
      value: `${overview.criticalAssetCount} / ${overview.totalMonitoredAssets}`,
      badge: "18 High Impact",
      badgeColor: "bg-teal-500/20 text-teal-200 border-teal-300/30",
      change: "7 High Risk",
      icon: Target,
      description: "Payment Gateway, Auth Vault & Core APIs",
    },
    {
      title: "Risk Reduction Opportunity",
      value: overview.riskReductionOpportunityFormatted,
      badge: "Optimized ROI",
      badgeColor: "bg-ocean-400/20 text-ocean-200 border-ocean-300/40",
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
            className="p-4 rounded-2xl bg-ocean-900/40 border border-ocean-300/15 hover:border-ocean-300/30 hover:bg-ocean-800/50 backdrop-blur-2xl transition-all duration-300 shadow-[0_20px_60px_rgba(0,0,0,0.35),inset_0_1px_0_0_rgba(94,234,212,0.12)] hover:-translate-y-1 hover:shadow-[0_25px_65px_rgba(0,0,0,0.45),0_0_20px_rgba(32,201,166,0.15)] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 rounded-xl bg-ocean-500/10 border border-ocean-300/20 text-ocean-300 shadow-[inset_0_1px_0_0_rgba(94,234,212,0.15)]">
                  <Icon className="w-4 h-4 text-ocean-300" />
                </div>
                <span
                  className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border ${kpi.badgeColor}`}
                >
                  {kpi.badge}
                </span>
              </div>
              <div className="text-[11px] font-medium text-ocean-200/70 mt-1">{kpi.title}</div>
              <div className="text-xl font-extrabold text-white font-sans mt-0.5 tracking-tight">
                {kpi.value}
              </div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-ocean-300/10 flex items-center justify-between text-[10px] text-ocean-200/60">
              <span className="truncate pr-1">{kpi.description}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

