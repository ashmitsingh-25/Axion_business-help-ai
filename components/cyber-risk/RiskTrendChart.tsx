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
    <div className="p-6 rounded-2xl bg-ocean-900/40 border border-ocean-300/15 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.35),inset_0_1px_0_0_rgba(94,234,212,0.12)] transition-all duration-300 hover:border-ocean-300/30">
      {/* Header with Period Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-ocean-300/10">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-white tracking-tight">
              Financial Cyber Risk & Exposure Trend
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-300 border border-rose-500/30 font-semibold flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>+35.7% Exposure Growth</span>
            </span>
          </div>
          <p className="text-[11px] text-ocean-200/60 mt-0.5">
            Historical progression of Financial Exposure (₹ Cr) & Expected Annual Loss (EAL)
          </p>
        </div>

        {/* Time Period Filter */}
        <div className="flex items-center gap-1 bg-ocean-950/80 p-1 rounded-xl border border-ocean-300/15">
          {(["7D", "30D", "90D", "1Y"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1 rounded-lg text-[11px] font-mono font-medium transition-all ${
                period === p
                  ? "bg-ocean-400 text-ocean-950 font-bold shadow-sm"
                  : "text-ocean-200/70 hover:text-white hover:bg-ocean-800/60"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Trajectory Highlights */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 rounded-xl bg-ocean-950/70 border border-ocean-300/10">
          <div className="text-[10px] text-ocean-200/60">Baseline Exposure</div>
          <div className="text-sm font-bold text-white mt-0.5">₹{firstPoint.financialExposure} Cr</div>
          <div className="text-[10px] text-ocean-300/60">{firstPoint.label}</div>
        </div>

        <div className="p-3 rounded-xl bg-ocean-950/70 border border-ocean-300/10">
          <div className="text-[10px] text-ocean-200/60">Current Exposure</div>
          <div className="text-sm font-bold text-rose-400 mt-0.5">₹{lastPoint.financialExposure} Cr</div>
          <div className="text-[10px] text-ocean-300/60">{lastPoint.label}</div>
        </div>

        <div className="p-3 rounded-xl bg-ocean-950/70 border border-ocean-300/10">
          <div className="text-[10px] text-ocean-200/60">Current EAL</div>
          <div className="text-sm font-bold text-amber-300 mt-0.5">₹{lastPoint.expectedAnnualLoss} Cr</div>
          <div className="text-[10px] text-ocean-300/60">17% Incident Likelihood</div>
        </div>

        <div className="p-3 rounded-xl bg-ocean-950/70 border border-ocean-300/10">
          <div className="text-[10px] text-ocean-200/60">Enterprise Risk Score</div>
          <div className="text-sm font-bold text-ocean-200 mt-0.5">{lastPoint.riskScore} / 100</div>
          <div className="text-[10px] text-ocean-300/60">Control Eff: {lastPoint.controlEffectiveness}%</div>
        </div>
      </div>

      {/* Visual Bar / Curve Visualization */}
      <div className="mt-6 pt-4 border-t border-ocean-300/10">
        <div className="flex items-center justify-between text-[10px] text-ocean-300 mb-2 font-mono">
          <span>₹ EXPOSURE TRAJECTORY OVER {period}</span>
          <span className="text-ocean-400/70">Scale: ₹0 to ₹4.5 Cr</span>
        </div>

        <div className="grid grid-flow-col auto-cols-fr gap-3 items-end h-44 bg-ocean-950/70 p-4 rounded-xl border border-ocean-300/10">
          {data.map((pt, idx) => {
            const heightPercent = Math.min(100, Math.round((pt.financialExposure / maxExposure) * 100));
            const ealPercent = Math.min(100, Math.round((pt.expectedAnnualLoss / maxExposure) * 100));

            return (
              <div key={idx} className="flex flex-col items-center h-full justify-end group relative">
                {/* Hover Tooltip */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-12 z-20 px-2.5 py-1 rounded-lg bg-ocean-900 border border-ocean-300/30 text-[10px] text-white shadow-xl pointer-events-none whitespace-nowrap">
                  <div>Exposure: ₹{pt.financialExposure} Cr</div>
                  <div className="text-ocean-300">EAL: ₹{pt.expectedAnnualLoss} Cr | Risk: {pt.riskScore}</div>
                </div>

                {/* Stacked Bars */}
                <div className="w-full max-w-[36px] flex flex-col justify-end items-center h-full">
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className="w-full rounded-t-md bg-gradient-to-t from-ocean-800 via-ocean-600 to-ocean-400 border-t border-ocean-300/60 relative transition-all duration-300 group-hover:brightness-125 shadow-[0_0_15px_rgba(32,201,166,0.2)]"
                  >
                    {/* EAL Indicator Bar Overlay */}
                    <div
                      style={{ height: `${(ealPercent / heightPercent) * 100}%` }}
                      className="w-full absolute bottom-0 rounded-b-md bg-amber-400/40 border-t border-amber-300/50"
                    />
                  </div>
                </div>

                {/* X-axis Label */}
                <span className="text-[10px] font-mono text-ocean-200/70 mt-2 truncate w-full text-center">
                  {pt.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-[11px] text-ocean-200/70 pt-2">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-ocean-400" />
              <span>Total Financial Exposure (₹ Cr)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-amber-400/80" />
              <span>Expected Annual Loss (EAL)</span>
            </div>
          </div>
          <div className="text-[10px] font-mono text-ocean-300/60 flex items-center gap-1">
            <Clock className="w-3 h-3 text-ocean-400" />
            <span>Trajectory: ₹2.4 Cr → ₹2.8 Cr → ₹3.1 Cr → ₹3.8 Cr</span>
          </div>
        </div>
      </div>
    </div>
  );
}

