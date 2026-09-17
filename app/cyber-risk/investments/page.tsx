"use client";

import Link from "next/link";
import { ArrowLeft, DollarSign, Shield, Sparkles, TrendingUp } from "lucide-react";
import { InvestmentOptimizerCard } from "@/components/cyber-risk/InvestmentOptimizerCard";
import { DiminishingReturnsCurve } from "@/components/cyber-risk/DiminishingReturnsCurve";

export default function SecurityInvestmentsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Breadcrumb & Navigation */}
      <div className="flex items-center justify-between pb-4 border-b border-ocean-800/40">
        <div className="flex items-center gap-3">
          <Link
            href="/cyber-risk"
            className="p-2 rounded-xl bg-ocean-950/60 border border-ocean-700/40 text-ocean-300 hover:text-white hover:border-ocean-500/40 backdrop-blur-md transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-ocean-200/60">Cyber Risk</span>
              <span className="text-ocean-700">/</span>
              <span className="text-xs font-semibold text-ocean-300">Investment Optimization</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mt-0.5">
              Security Investment Optimizer
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/insights"
            className="px-4 py-2 rounded-xl bg-ocean-900/60 hover:bg-ocean-800/70 border border-ocean-700/40 text-ocean-100 text-xs font-semibold flex items-center gap-2 backdrop-blur-md transition-all shadow-ocean-card hover:border-ocean-500/40"
          >
            <Sparkles className="w-3.5 h-3.5 text-ocean-300" />
            <span>Consult Copilot</span>
          </Link>
        </div>
      </div>

      {/* Main Optimizer Card */}
      <InvestmentOptimizerCard />

      {/* Diminishing Returns Curve & Custom ROSI Calculator */}
      <DiminishingReturnsCurve />
    </div>
  );
}
