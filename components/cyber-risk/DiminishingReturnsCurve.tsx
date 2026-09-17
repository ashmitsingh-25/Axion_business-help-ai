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
    <div className="p-6 sm:p-8 rounded-3xl bg-ocean-900/50 border border-ocean-400/20 backdrop-blur-2xl shadow-ocean-card space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-ocean-300/15">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-ocean-100 tracking-tight">
              Investment vs. Risk Reduction Curve (Diminishing Returns)
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-ocean-500/15 text-ocean-300 border border-ocean-400/30 font-bold">
              Optimal Spend Zone: ₹18L - ₹25L
            </span>
          </div>
          <p className="text-xs text-ocean-200/70 mt-0.5">
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
                ? "bg-ocean-500/15 border-ocean-400/40 shadow-[0_0_20px_rgba(32,201,166,0.15)] ring-1 ring-ocean-400/30"
                : "bg-ocean-950/60 border-ocean-300/10 opacity-80"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono text-ocean-300/70 uppercase">Spend</span>
                {pt.isOptimalSpendZone && (
                  <span className="text-[8px] font-mono font-bold px-1.5 py-0.2 rounded bg-ocean-400/20 text-ocean-200 border border-ocean-400/30">
                    SWEET SPOT
                  </span>
                )}
              </div>
              <div className="text-sm font-extrabold text-ocean-100 font-mono">{pt.investmentFormatted}</div>
            </div>

            <div className="mt-3 pt-2 border-t border-ocean-300/10 space-y-1">
              <div className="text-[10px] text-ocean-300/60">Resulting EAL:</div>
              <div className="text-xs font-bold text-amber-300 font-mono">{pt.projectedEalFormatted}</div>
              <div className="text-[9px] text-emerald-400 font-mono">
                {pt.riskReduction > 0 ? `-${formatINR(pt.riskReduction)} Risk` : "0 Baseline"}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Diminishing Returns Explanation Banner */}
      <div className="p-4 rounded-2xl bg-ocean-950/70 border border-ocean-300/15 flex items-start gap-3 text-xs text-ocean-200">
        <Info className="w-4 h-4 text-ocean-300 flex-shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-ocean-100">Optimal Spend Principle:</strong> Initial investments (MFA, critical patching, CSPM) yield exceptional returns of ₹5.00 to ₹7.00 in risk compression per ₹1.00 spent. Beyond ₹25 Lakhs, marginal efficiency flattens significantly down to ₹0.30 per ₹1.00 spent.
        </p>
      </div>

      {/* Interactive Custom ROSI Calculator */}
      <div className="p-5 rounded-2xl bg-ocean-950/80 border border-ocean-400/20 space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-ocean-300/10">
          <Calculator className="w-4 h-4 text-purple-400" />
          <h4 className="text-xs font-bold text-ocean-100 uppercase tracking-wider font-mono">
            Interactive Return on Security Investment (ROSI) Calculator
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="space-y-1.5">
            <label className="text-[11px] text-ocean-200/70 font-medium">Implementation Cost (₹):</label>
            <input
              type="number"
              step={100000}
              value={customCost}
              onChange={(e) => setCustomCost(Number(e.target.value))}
              className="w-full bg-ocean-900 border border-ocean-300/20 rounded-xl px-3 py-2 text-xs font-mono text-ocean-100 focus:outline-none focus:ring-1 focus:ring-ocean-400/50"
            />
            <span className="text-[10px] font-mono text-ocean-300/50">{formatINR(customCost)}</span>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] text-ocean-200/70 font-medium">Expected Risk Reduction (₹):</label>
            <input
              type="number"
              step={100000}
              value={customReduction}
              onChange={(e) => setCustomReduction(Number(e.target.value))}
              className="w-full bg-ocean-900 border border-ocean-300/20 rounded-xl px-3 py-2 text-xs font-mono text-ocean-100 focus:outline-none focus:ring-1 focus:ring-ocean-400/50"
            />
            <span className="text-[10px] font-mono text-ocean-300/50">{formatINR(customReduction)}</span>
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

        <div className="text-[10px] font-mono text-ocean-300/50">
          Formula: ROSI = (Risk Reduction - Investment Cost) ÷ Investment Cost × 100 • Estimated model output.
        </div>
      </div>
    </div>
  );
}
