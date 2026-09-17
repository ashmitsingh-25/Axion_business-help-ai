"use client";

import { useState } from "react";
import { Clock, AlertTriangle, TrendingUp, ShieldAlert } from "lucide-react";
import { simulateDelayedRemediation } from "@/lib/cyber-risk-engine";

export function DelayedRemediationSimulator() {
  const [delayDays, setDelayDays] = useState<7 | 15 | 30 | 60>(30);
  const result = simulateDelayedRemediation(delayDays);

  return (
    <div className="p-6 rounded-2xl bg-ocean-900/40 border border-ocean-300/15 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.35),inset_0_1px_0_0_rgba(94,234,212,0.12)] space-y-5 transition-all duration-300 hover:border-ocean-300/30">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-ocean-300/10">
        <div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold text-white tracking-tight">
              Delayed Remediation Cost Simulator
            </h3>
          </div>
          <p className="text-[11px] text-ocean-200/60 mt-0.5">
            "What happens to our financial exposure if remediation is delayed?"
          </p>
        </div>

        {/* Delay Day Switcher */}
        <div className="flex items-center gap-1.5 bg-ocean-950/80 p-1 rounded-xl border border-ocean-300/15">
          {([7, 15, 30, 60] as const).map((d) => (
            <button
              key={d}
              onClick={() => setDelayDays(d)}
              className={`px-3 py-1 rounded-lg text-[11px] font-mono font-medium transition-all ${
                delayDays === d
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold shadow-sm"
                  : "text-ocean-200/60 hover:text-white hover:bg-ocean-800/60"
              }`}
            >
              {d} Days
            </button>
          ))}
        </div>
      </div>

      {/* Projection Metric Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="p-4 rounded-xl bg-ocean-950/70 border border-ocean-300/10 space-y-1">
          <div className="text-[10px] text-ocean-200/60">Current Expected Annual Loss</div>
          <div className="text-lg font-bold text-white font-mono">{result.currentEalFormatted}</div>
          <div className="text-[10px] text-ocean-300/60">Immediate Action Baseline</div>
        </div>

        <div className="p-4 rounded-xl bg-ocean-950/70 border border-rose-500/30 space-y-1">
          <div className="text-[10px] text-rose-300 font-bold font-mono">{delayDays}-Day Delayed Exposure</div>
          <div className="text-lg font-extrabold text-rose-300 font-mono">
            {result.projectedExposureFormatted}
          </div>
          <div className="text-[10px] text-rose-400 font-mono">{result.additionalRiskFormatted} Penalty Risk</div>
        </div>

        <div className="p-4 rounded-xl bg-ocean-950/70 border border-ocean-300/10 space-y-1">
          <div className="text-[10px] text-ocean-200/60">Threat Acceleration Multiplier</div>
          <div className="text-lg font-bold text-amber-300 font-mono">
            +{result.penaltyBreakdown.threatAcceleration}x Risk
          </div>
          <div className="text-[10px] text-ocean-300/60">+{result.penaltyBreakdown.exploitAvailabilityIncrease}% Exploit Probability</div>
        </div>
      </div>

      {/* Narrative Advice */}
      <div className="p-4 rounded-xl bg-rose-500/[0.08] border border-rose-500/30 flex items-start gap-3">
        <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="text-xs font-bold text-rose-200 font-mono">Financial Risk Advisory</div>
          <p className="text-xs text-ocean-100/90 leading-relaxed">
            {result.advisoryNote}
          </p>
        </div>
      </div>
    </div>
  );
}

