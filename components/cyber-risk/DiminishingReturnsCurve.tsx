"use client";

import { useState } from "react";
import { TrendingUp, Target, DollarSign, Calculator, Info } from "lucide-react";
import { getDiminishingReturnsCurve, calculateCustomROSI } from "@/lib/investment-optimizer";
import { formatINR } from "@/lib/cyber-risk-engine";

export function DiminishingReturnsCurve() {
  const curveData = getDiminishingReturnsCurve();
  const [customCost, setCustomCost] = useState(1000000); // ₹10L
  const [customReduction, setCustomReduction] = useState(3500000); // ₹35L

  const customCalc = calculateCustomROSI(customCost, customReduction);

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/60 border border-white/10 backdrop-blur-2xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_20px_50px_rgba(0,0,0,0.6)] space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-white tracking-tight">
              Investment vs. Risk Reduction Curve (Diminishing Returns)
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-bold">
              Optimal Spend Zone: ₹18L - ₹25L
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-0.5">
            Models marginal efficiency: beyond the optimal spend zone, additional capital generates progressively lower risk reduction.
          </p>
        </div>
      </div>

      {/* Visual Step Curve Table / Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {curveData.map((pt, idx) => (
          <div
            key={idx}
            className={`p-3.5 rounded-2xl border transition-all flex flex-col justify-between ${
              pt.isOptimalSpendZone
                ? "bg-cyan-500/[0.08] border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.15)] ring-1 ring-cyan-500/30"
                : "bg-zinc-950/60 border-white/5 opacity-80"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono text-zinc-400 uppercase">Spend</span>
                {pt.isOptimalSpendZone && (
                  <span className="text-[8px] font-mono font-bold px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    SWEET SPOT
                  </span>
                )}
              </div>
              <div className="text-sm font-extrabold text-white font-mono">{pt.investmentFormatted}</div>
            </div>

            <div className="mt-3 pt-2 border-t border-white/5 space-y-1">
              <div className="text-[10px] text-zinc-400">Resulting EAL:</div>
              <div className="text-xs font-bold text-amber-300 font-mono">{pt.projectedEalFormatted}</div>
              <div className="text-[9px] text-emerald-400 font-mono">
                {pt.riskReduction > 0 ? `-${formatINR(pt.riskReduction)} Risk` : "0 Baseline"}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Diminishing Returns Explanation Banner */}
      <div className="p-4 rounded-2xl bg-zinc-950/80 border border-white/5 flex items-start gap-3 text-xs text-zinc-300">
        <Info className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Optimal Spend Principle:</strong> Initial investments (MFA, critical patching, CSPM) yield exceptional returns of ₹5.00 to ₹7.00 in risk compression per ₹1.00 spent. Beyond ₹25 Lakhs, marginal efficiency flattens significantly down to ₹0.30 per ₹1.00 spent.
        </p>
      </div>

      {/* Interactive Custom ROSI Calculator */}
      <div className="p-5 rounded-2xl bg-zinc-950/90 border border-white/10 space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-white/5">
          <Calculator className="w-4 h-4 text-purple-400" />
          <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
            Interactive Return on Security Investment (ROSI) Calculator
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="space-y-1.5">
            <label className="text-[11px] text-zinc-400 font-medium">Implementation Cost (₹):</label>
            <input
              type="number"
              step={100000}
              value={customCost}
              onChange={(e) => setCustomCost(Number(e.target.value))}
              className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:ring-1 focus:ring-purple-400"
            />
            <span className="text-[10px] font-mono text-zinc-500">{formatINR(customCost)}</span>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] text-zinc-400 font-medium">Expected Risk Reduction (₹):</label>
            <input
              type="number"
              step={100000}
              value={customReduction}
              onChange={(e) => setCustomReduction(Number(e.target.value))}
              className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:ring-1 focus:ring-purple-400"
            />
            <span className="text-[10px] font-mono text-zinc-500">{formatINR(customReduction)}</span>
          </div>

          <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 flex flex-col justify-between">
            <div>
              <div className="text-[10px] font-mono uppercase text-purple-300 font-bold">Calculated ROSI</div>
              <div className="text-2xl font-extrabold text-purple-300 font-mono mt-0.5">
                {customCalc.rosiPercent}%
              </div>
            </div>
            <div className="text-[10px] font-mono text-purple-200 mt-2">
              Net Benefit: {customCalc.netBenefitFormatted}
            </div>
          </div>
        </div>

        <div className="text-[10px] font-mono text-zinc-500">
          Formula: ROSI = (Risk Reduction - Investment Cost) ÷ Investment Cost × 100 • Estimated model output.
        </div>
      </div>
    </div>
  );
}
