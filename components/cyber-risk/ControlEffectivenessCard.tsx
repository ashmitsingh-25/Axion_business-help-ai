"use client";

import { Lock, Shield, CheckCircle, AlertTriangle, ArrowUpRight } from "lucide-react";
import { MOCK_SECURITY_CONTROLS } from "@/lib/mock-data";
import { formatINR } from "@/lib/cyber-risk-engine";

export function ControlEffectivenessCard() {
  const controls = MOCK_SECURITY_CONTROLS;

  return (
    <div className="p-6 rounded-2xl bg-zinc-900/60 border border-white/10 backdrop-blur-2xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_10px_30px_-10px_rgba(0,0,0,0.5)]">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-white tracking-tight">
              Security Control Effectiveness Matrix
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-semibold">
              74% Aggregate
            </span>
          </div>
          <p className="text-[11px] text-zinc-400 mt-0.5">
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
              className="p-3.5 rounded-xl bg-zinc-950/60 border border-white/5 hover:border-white/15 transition-all text-xs space-y-2 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-white/5 text-zinc-400 border border-white/10">
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
                          : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      }`}
                    >
                      {ctrl.effectivenessPercent}%
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-2.5 w-full bg-zinc-900 rounded-full h-1.5 overflow-hidden">
                  <div
                    style={{ width: `${ctrl.effectivenessPercent}%` }}
                    className={`h-full rounded-full ${
                      isDeficient
                        ? "bg-rose-500"
                        : isPartial
                        ? "bg-amber-500"
                        : "bg-emerald-400"
                    }`}
                  />
                </div>

                <p className="text-[11px] text-zinc-400 mt-2 leading-relaxed">
                  {ctrl.recommendation}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-zinc-500">
                <span>Cost: {formatINR(ctrl.annualCost)}/yr</span>
                <span className="text-emerald-400 font-semibold">
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
