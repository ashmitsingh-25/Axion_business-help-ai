"use client";

import { useState } from "react";
import { TrendingUp, TrendingDown, Clock, ShieldAlert } from "lucide-react";
import { RiskTrendPoint } from "@/lib/types";
import { MOCK_RISK_TRENDS } from "@/lib/mock-data";

export function RiskTrendChart() {
  const [period, setPeriod] = useState<"7D" | "30D" | "90D" | "1Y">("30D");
  const data: RiskTrendPoint[] = MOCK_RISK_TRENDS[period];

  const maxExposure = Math.max(...data.map((d) => d.financialExposure), 4.0);
  const firstPoint = data[0];
  const lastPoint = data[data.length - 1];
  const isTrendingUp = lastPoint.financialExposure > firstPoint.financialExposure;

  return (
    <div className="p-6 rounded-2xl bg-zinc-900/60 border border-white/10 backdrop-blur-2xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_10px_30px_-10px_rgba(0,0,0,0.5)]">
      {/* Header with Period Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-white tracking-tight">
              Financial Cyber Risk & Exposure Trend
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/20 font-semibold flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>+35.7% Exposure Growth</span>
            </span>
          </div>
          <p className="text-[11px] text-zinc-400 mt-0.5">
            Historical progression of Financial Exposure (₹ Cr) & Expected Annual Loss (EAL)
          </p>
        </div>

        {/* Time Period Filter */}
        <div className="flex items-center gap-1 bg-zinc-950/80 p-1 rounded-xl border border-white/10">
          {(["7D", "30D", "90D", "1Y"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1 rounded-lg text-[11px] font-mono font-medium transition-all ${
                period === p
                  ? "bg-white text-zinc-950 font-bold shadow-sm"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Trajectory Highlights */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 rounded-xl bg-zinc-950/60 border border-white/5">
          <div className="text-[10px] text-zinc-400">Baseline Exposure</div>
          <div className="text-sm font-bold text-white mt-0.5">₹{firstPoint.financialExposure} Cr</div>
          <div className="text-[10px] text-zinc-500">{firstPoint.label}</div>
        </div>

        <div className="p-3 rounded-xl bg-zinc-950/60 border border-white/5">
          <div className="text-[10px] text-zinc-400">Current Exposure</div>
          <div className="text-sm font-bold text-rose-400 mt-0.5">₹{lastPoint.financialExposure} Cr</div>
          <div className="text-[10px] text-zinc-500">{lastPoint.label}</div>
        </div>

        <div className="p-3 rounded-xl bg-zinc-950/60 border border-white/5">
          <div className="text-[10px] text-zinc-400">Current EAL</div>
          <div className="text-sm font-bold text-amber-300 mt-0.5">₹{lastPoint.expectedAnnualLoss} Cr</div>
          <div className="text-[10px] text-zinc-500">17% Incident Likelihood</div>
        </div>

        <div className="p-3 rounded-xl bg-zinc-950/60 border border-white/5">
          <div className="text-[10px] text-zinc-400">Enterprise Risk Score</div>
          <div className="text-sm font-bold text-purple-300 mt-0.5">{lastPoint.riskScore} / 100</div>
          <div className="text-[10px] text-zinc-500">Control Eff: {lastPoint.controlEffectiveness}%</div>
        </div>
      </div>

      {/* Visual Bar / Curve Visualization */}
      <div className="mt-6 pt-4 border-t border-white/5">
        <div className="flex items-center justify-between text-[10px] text-zinc-400 mb-2 font-mono">
          <span>₹ EXPOSURE TRAJECTORY OVER {period}</span>
          <span className="text-zinc-500">Scale: ₹0 to ₹4.5 Cr</span>
        </div>

        <div className="grid grid-flow-col auto-cols-fr gap-3 items-end h-44 bg-zinc-950/40 p-4 rounded-xl border border-white/5">
          {data.map((pt, idx) => {
            const heightPercent = Math.min(100, Math.round((pt.financialExposure / maxExposure) * 100));
            const ealPercent = Math.min(100, Math.round((pt.expectedAnnualLoss / maxExposure) * 100));

            return (
              <div key={idx} className="flex flex-col items-center h-full justify-end group relative">
                {/* Hover Tooltip */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-12 z-20 px-2.5 py-1 rounded-lg bg-zinc-900 border border-white/20 text-[10px] text-white shadow-xl pointer-events-none whitespace-nowrap">
                  <div>Exposure: ₹{pt.financialExposure} Cr</div>
                  <div className="text-zinc-400">EAL: ₹{pt.expectedAnnualLoss} Cr | Risk: {pt.riskScore}</div>
                </div>

                {/* Stacked Bars */}
                <div className="w-full max-w-[36px] flex flex-col justify-end items-center h-full">
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className="w-full rounded-t-md bg-gradient-to-t from-blue-600/60 via-indigo-500/70 to-rose-500/80 border-t border-rose-400/50 relative transition-all duration-300 group-hover:brightness-125"
                  >
                    {/* EAL Indicator Bar Overlay */}
                    <div
                      style={{ height: `${(ealPercent / heightPercent) * 100}%` }}
                      className="w-full absolute bottom-0 rounded-b-md bg-amber-500/30 border-t border-amber-400/40"
                    />
                  </div>
                </div>

                {/* X-axis Label */}
                <span className="text-[10px] font-mono text-zinc-400 mt-2 truncate w-full text-center">
                  {pt.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-[11px] text-zinc-400 pt-2">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-rose-500/80" />
              <span>Total Financial Exposure (₹ Cr)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-amber-500/60" />
              <span>Expected Annual Loss (EAL)</span>
            </div>
          </div>
          <div className="text-[10px] font-mono text-zinc-500 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>Trajectory: ₹2.4 Cr → ₹2.8 Cr → ₹3.1 Cr → ₹3.8 Cr</span>
          </div>
        </div>
      </div>
    </div>
  );
}
