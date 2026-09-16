"use client";

import Link from "next/link";
import { ArrowLeft, DollarSign, Shield, Sparkles, TrendingUp } from "lucide-react";
import { InvestmentOptimizerCard } from "@/components/cyber-risk/InvestmentOptimizerCard";
import { DiminishingReturnsCurve } from "@/components/cyber-risk/DiminishingReturnsCurve";

export default function SecurityInvestmentsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Breadcrumb & Navigation */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <Link
            href="/cyber-risk"
            className="p-2 rounded-xl bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-400">Cyber Risk</span>
              <span className="text-zinc-600">/</span>
              <span className="text-xs font-semibold text-white">Investment Optimization</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mt-0.5">
              Security Investment Optimizer
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/insights"
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white text-xs font-semibold flex items-center gap-2 backdrop-blur-md transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-zinc-200" />
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
