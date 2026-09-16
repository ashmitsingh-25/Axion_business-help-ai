"use client";

import { useState } from "react";
import { DollarSign, Zap, CheckCircle2, TrendingUp, Sparkles, Check, ArrowRight, ShieldCheck } from "lucide-react";
import { optimizeSecurityBudget } from "@/lib/investment-optimizer";
import { formatINR } from "@/lib/cyber-risk-engine";
import { MOCK_SECURITY_INVESTMENTS } from "@/lib/mock-data";

export function InvestmentOptimizerCard() {
  const [budget, setBudget] = useState(2000000); // ₹20 Lakhs default
  const result = optimizeSecurityBudget(budget);

  const presetBudgets = [
    { label: "₹10 Lakh", value: 1000000 },
    { label: "₹15 Lakh", value: 1500000 },
    { label: "₹20 Lakh", value: 2000000 },
    { label: "₹30 Lakh", value: 3000000 },
    { label: "₹50 Lakh", value: 5000000 },
  ];

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/60 border border-white/10 backdrop-blur-2xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_20px_50px_rgba(0,0,0,0.6)] space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight font-sans">
              Security Investment Optimizer
            </h2>
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-bold">
              0/1 Knapsack DP
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Find the mathematically optimal combination of security investments that maximizes risk reduction within your budget.
          </p>
        </div>
      </div>

      {/* Interactive Budget Slider & Presets */}
      <div className="p-5 rounded-2xl bg-zinc-950/80 border border-white/10 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider font-mono">
              Available Security Budget Envelope:
            </label>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono mt-0.5">
              {formatINR(budget)}
            </div>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap items-center gap-1.5">
            {presetBudgets.map((pb) => (
              <button
                key={pb.value}
                onClick={() => setBudget(pb.value)}
                className={`px-3 py-1 rounded-xl text-xs font-mono transition-all ${
                  budget === pb.value
                    ? "bg-white text-zinc-950 font-bold shadow-md"
                    : "bg-zinc-900 border border-white/10 text-zinc-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {pb.label}
              </button>
            ))}
          </div>
        </div>

        {/* Range Slider */}
        <input
          type="range"
          min={500000}
          max={6000000}
          step={100000}
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
          className="w-full h-2 bg-zinc-900 rounded-lg appearance-none cursor-pointer accent-white"
        />

        <div className="flex justify-between text-[10px] font-mono text-zinc-500">
          <span>Min: ₹5 Lakh</span>
          <span>Target Optimal Zone: ₹18L - ₹25L</span>
          <span>Max: ₹60 Lakh</span>
        </div>
      </div>

      {/* Optimization Scoreboard */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-zinc-950/80 border border-white/5 space-y-1">
          <div className="text-[10px] font-mono text-zinc-400">Total Funded Spend</div>
          <div className="text-lg sm:text-xl font-extrabold text-white font-mono">
            {result.totalInvestmentFormatted}
          </div>
          <div className="text-[10px] text-zinc-500">{result.budgetUtilizationPercent}% Budget Utilized</div>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-950/80 border border-emerald-500/20 space-y-1">
          <div className="text-[10px] font-mono text-emerald-400 font-bold">Total Risk Reduction</div>
          <div className="text-lg sm:text-xl font-extrabold text-emerald-300 font-mono">
            {result.totalRiskReductionFormatted}
          </div>
          <div className="text-[10px] text-emerald-400">EAL Compressed</div>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-950/80 border border-white/5 space-y-1">
          <div className="text-[10px] font-mono text-zinc-400">Net Financial Benefit</div>
          <div className="text-lg sm:text-xl font-extrabold text-cyan-300 font-mono">
            {result.netBenefitFormatted}
          </div>
          <div className="text-[10px] text-zinc-500">Risk Reduction - Cost</div>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-950/80 border border-purple-500/20 space-y-1">
          <div className="text-[10px] font-mono text-purple-400 font-bold">Portfolio ROSI</div>
          <div className="text-lg sm:text-xl font-extrabold text-purple-300 font-mono">
            {result.overallRosiPercent}%
          </div>
          <div className="text-[10px] text-zinc-500">Return on Security Spend</div>
        </div>
      </div>

      {/* Selected Optimal Initiatives Table */}
      <div className="space-y-3">
        <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold flex items-center justify-between">
          <span>Funded Initiatives ({result.selectedInvestments.length} Selected by Optimizer)</span>
          <span className="text-zinc-500 font-normal">Ranked by Marginal EAL Compression</span>
        </div>

        <div className="divide-y divide-white/5 rounded-2xl bg-zinc-950/80 border border-white/10 overflow-hidden">
          {result.selectedInvestments.map((inv, idx) => (
            <div
              key={inv.id}
              className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs hover:bg-white/[0.02] transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono font-bold flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{inv.title}</span>
                    <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-white/5 text-zinc-400 border border-white/10 font-bold">
                      {inv.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">
                    {inv.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6 flex-shrink-0 sm:text-right">
                <div>
                  <div className="font-mono text-zinc-400 text-[11px]">Cost: {inv.costFormatted}</div>
                  <div className="font-mono text-emerald-400 font-bold text-xs mt-0.5">
                    Reduces {inv.riskReductionFormatted}
                  </div>
                </div>

                <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-center min-w-[70px]">
                  <div className="text-[9px] text-purple-300 font-mono uppercase">ROSI</div>
                  <div className="font-mono font-extrabold text-purple-300 text-xs">
                    {inv.rosiPercent}%
                  </div>
                </div>
              </div>
            </div>
          ))}

          {result.selectedInvestments.length === 0 && (
            <div className="p-8 text-center text-zinc-500 text-xs font-mono">
              Budget is too low to fund any single initiative. Increase budget slider above.
            </div>
          )}
        </div>
      </div>

      {/* Knapsack Decision Synthesis Narrative */}
      <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-start gap-3">
        <Sparkles className="w-4 h-4 text-zinc-300 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-zinc-300 leading-relaxed font-sans">
          {result.summaryNarrative}
        </p>
      </div>
    </div>
  );
}
