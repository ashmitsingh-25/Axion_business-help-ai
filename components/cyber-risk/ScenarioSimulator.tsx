"use client";

import { useState } from "react";
import { Sliders, Zap, CheckCircle2, TrendingDown, DollarSign, Sparkles } from "lucide-react";
import { MOCK_SECURITY_CONTROLS } from "@/lib/mock-data";
import { simulateWhatIfScenario, formatINR } from "@/lib/cyber-risk-engine";

export function ScenarioSimulator() {
  const [selectedCodes, setSelectedCodes] = useState<string[]>(["CTRL-MFA"]);
  const simulation = simulateWhatIfScenario(selectedCodes);

  const toggleControl = (code: string) => {
    setSelectedCodes((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );
  };

  const selectAll = () => {
    setSelectedCodes(MOCK_SECURITY_CONTROLS.map((c) => c.code));
  };

  const resetAll = () => {
    setSelectedCodes([]);
  };

  return (
    <div className="p-6 rounded-2xl bg-zinc-900/60 border border-white/10 backdrop-blur-2xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_10px_30px_-10px_rgba(0,0,0,0.5)] space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white tracking-tight">
              Cyber Risk Scenario Simulator (What-If Analysis)
            </h3>
          </div>
          <p className="text-[11px] text-zinc-400 mt-0.5">
            Toggle targeted security remediation controls to model real-time projected EAL and ROSI
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={selectAll}
            className="px-2.5 py-1 rounded-lg bg-zinc-950 border border-white/10 text-[10px] font-mono text-zinc-300 hover:text-white"
          >
            Select All
          </button>
          <button
            onClick={resetAll}
            className="px-2.5 py-1 rounded-lg bg-zinc-950 border border-white/10 text-[10px] font-mono text-zinc-400 hover:text-white"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Control Toggles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {MOCK_SECURITY_CONTROLS.map((ctrl) => {
          const isChecked = selectedCodes.includes(ctrl.code);
          return (
            <div
              key={ctrl.code}
              onClick={() => toggleControl(ctrl.code)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                isChecked
                  ? "bg-white/[0.06] border-white/30 shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                  : "bg-zinc-950/60 border-white/5 hover:border-white/15 opacity-70"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-md mt-0.5 flex items-center justify-center flex-shrink-0 border transition-colors ${
                  isChecked
                    ? "bg-white text-zinc-950 border-white font-bold"
                    : "border-white/20 bg-zinc-900"
                }`}
              >
                {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
              </div>

              <div className="text-xs space-y-1 flex-1">
                <div className="font-bold text-white flex items-center justify-between">
                  <span>{ctrl.name}</span>
                  <span className="font-mono text-[10px] text-zinc-400">{formatINR(ctrl.annualCost)}</span>
                </div>
                <div className="text-[10px] text-emerald-400 font-mono">
                  Reduces {formatINR(ctrl.potentialRiskReduction)} EAL
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Projection Comparison Banner */}
      <div className="p-5 rounded-2xl bg-zinc-950/80 border border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
        <div>
          <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-mono">Current State</div>
          <div className="text-lg font-extrabold text-white font-mono mt-1">
            {simulation.currentEalFormatted}
          </div>
          <div className="text-[10px] text-zinc-400 mt-0.5">Baseline Annual Loss</div>
        </div>

        <div>
          <div className="text-[10px] text-cyan-400 uppercase tracking-wider font-mono">Projected State</div>
          <div className="text-lg font-extrabold text-cyan-300 font-mono mt-1">
            {simulation.projectedEalFormatted}
          </div>
          <div className="text-[10px] text-emerald-400 mt-0.5">
            -{formatINR(simulation.totalRiskReduction)} ({Math.round((simulation.totalRiskReduction / simulation.currentEal) * 100)}% drop)
          </div>
        </div>

        <div>
          <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-mono">Implementation Cost</div>
          <div className="text-lg font-extrabold text-zinc-200 font-mono mt-1">
            {simulation.totalImplementationCostFormatted}
          </div>
          <div className="text-[10px] text-zinc-400 mt-0.5">{simulation.selectedCount} Active Controls</div>
        </div>

        <div>
          <div className="text-[10px] text-purple-400 uppercase tracking-wider font-mono">Estimated ROSI</div>
          <div className="text-lg font-extrabold text-purple-300 font-mono mt-1">
            {simulation.estimatedRosi}%
          </div>
          <div className="text-[10px] text-zinc-400 mt-0.5">Confidence: {simulation.confidenceScore}%</div>
        </div>
      </div>

      {/* AI Explanation Callout */}
      <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 flex items-start gap-3">
        <Sparkles className="w-4 h-4 text-zinc-300 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-zinc-300 leading-relaxed">
          {simulation.explanation}
        </p>
      </div>
    </div>
  );
}
