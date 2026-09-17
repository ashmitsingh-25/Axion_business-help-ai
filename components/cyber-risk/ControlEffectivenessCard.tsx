"use client";

import { Lock, Shield, CheckCircle, AlertTriangle, ArrowUpRight } from "lucide-react";
import { MOCK_SECURITY_CONTROLS } from "@/lib/mock-data";
import { formatINR } from "@/lib/cyber-risk-engine";

export function ControlEffectivenessCard() {
  const controls = MOCK_SECURITY_CONTROLS;

  return (
    <div className="p-6 rounded-2xl bg-ocean-900/40 border border-ocean-300/15 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.35),inset_0_1px_0_0_rgba(94,234,212,0.12)] transition-all duration-300 hover:border-ocean-300/30">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-ocean-300/10">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-white tracking-tight">
              Security Control Effectiveness Matrix
            </h3>
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-ocean-500/20 text-ocean-200 border border-ocean-300/30 font-bold">
              74% Aggregate
            </span>
          </div>
          <p className="text-[11px] text-ocean-200/60 mt-0.5">
            Coverage, operational efficacy & attributed financial risk reduction per control layer
          </p>
        </div>
      </div>

      {/* Control Grid */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {controls.map((ctrl) => {
          const isDeficient = ctrl.effectivenessPercent < 50;
          const isPartial = ctrl.effectivenessPercent >= 50 && ctrl.effectivenessPercent < 80;

          return (
            <div
              key={ctrl.id}
              className="p-3.5 rounded-xl bg-ocean-950/70 border border-ocean-300/10 hover:border-ocean-300/25 transition-all text-xs space-y-2 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-ocean-500/15 text-ocean-300 border border-ocean-300/20">
                      {ctrl.code}
                    </span>
                    <h4 className="text-xs font-bold text-white mt-1">{ctrl.name}</h4>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span
                      className={`font-mono text-xs font-extrabold px-2 py-0.5 rounded ${
                        isDeficient
                          ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                          : isPartial
                          ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                          : "bg-ocean-500/20 text-ocean-200 border border-ocean-300/30"
                      }`}
                    >
                      {ctrl.effectivenessPercent}%
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-2.5 w-full bg-ocean-900 rounded-full h-1.5 overflow-hidden">
                  <div
                    style={{ width: `${ctrl.effectivenessPercent}%` }}
                    className={`h-full rounded-full transition-all duration-500 ${
                      isDeficient
                        ? "bg-rose-500"
                        : isPartial
                        ? "bg-amber-400"
                        : "bg-ocean-400 shadow-[0_0_8px_rgba(32,201,166,0.3)]"
                    }`}
                  />
                </div>

                <p className="text-[11px] text-ocean-200/70 mt-2 leading-relaxed">
                  {ctrl.recommendation}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-ocean-300/10 flex items-center justify-between text-[10px] font-mono text-ocean-300/60">
                <span>Cost: {formatINR(ctrl.annualCost)}/yr</span>
                <span className="text-ocean-300 font-semibold">
                  Reduces {formatINR(ctrl.potentialRiskReduction)} EAL
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

