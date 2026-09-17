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
    <div className="p-6 rounded-2xl bg-ocean-900/40 border border-ocean-300/15 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.35),inset_0_1px_0_0_rgba(94,234,212,0.12)] space-y-6 transition-all duration-300 hover:border-ocean-300/30">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-ocean-300/10">
        <div>
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-ocean-300" />
            <h3 className="text-sm font-bold text-white tracking-tight">
              Cyber Risk Scenario Simulator (What-If Analysis)
            </h3>
          </div>
          <p className="text-[11px] text-ocean-200/60 mt-0.5">
            Toggle targeted security remediation controls to model real-time projected EAL and ROSI
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={selectAll}
            className="px-2.5 py-1 rounded-lg bg-ocean-950 border border-ocean-300/15 text-[10px] font-mono text-ocean-200 hover:text-white transition-colors"
          >
            Select All
          </button>
          <button
            onClick={resetAll}
            className="px-2.5 py-1 rounded-lg bg-ocean-950 border border-ocean-300/15 text-[10px] font-mono text-ocean-300/60 hover:text-white transition-colors"
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
                  ? "bg-ocean-500/20 border-ocean-300/40 shadow-[0_0_15px_rgba(32,201,166,0.15)]"
                  : "bg-ocean-950/70 border-ocean-300/10 hover:border-ocean-300/25 opacity-70"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-md mt-0.5 flex items-center justify-center flex-shrink-0 border transition-colors ${
                  isChecked
                    ? "bg-ocean-400 text-ocean-950 border-ocean-300 font-bold"
                    : "border-ocean-300/20 bg-ocean-900"
                }`}
              >
                {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
              </div>

              <div className="text-xs space-y-1 flex-1">
                <div className="font-bold text-white flex items-center justify-between">
                  <span>{ctrl.name}</span>
                  <span className="font-mono text-[10px] text-ocean-200/60">{formatINR(ctrl.annualCost)}</span>
                </div>
                <div className="text-[10px] text-ocean-300 font-mono">
                  Reduces {formatINR(ctrl.potentialRiskReduction)} EAL
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Projection Comparison Banner */}
      <div className="p-5 rounded-2xl bg-ocean-950/80 border border-ocean-300/15 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
        <div>
          <div className="text-[10px] text-ocean-300/60 uppercase tracking-wider font-mono">Current State</div>
          <div className="text-lg font-extrabold text-white font-mono mt-1">
            {simulation.currentEalFormatted}
          </div>
          <div className="text-[10px] text-ocean-200/60 mt-0.5">Baseline Annual Loss</div>
        </div>

        <div>
          <div className="text-[10px] text-ocean-300 uppercase tracking-wider font-mono">Projected State</div>
          <div className="text-lg font-extrabold text-ocean-200 font-mono mt-1">
            {simulation.projectedEalFormatted}
          </div>
          <div className="text-[10px] text-ocean-300 mt-0.5">
            -{formatINR(simulation.totalRiskReduction)} ({Math.round((simulation.totalRiskReduction / simulation.currentEal) * 100)}% drop)
          </div>
        </div>

        <div>
          <div className="text-[10px] text-ocean-300/60 uppercase tracking-wider font-mono">Implementation Cost</div>
          <div className="text-lg font-extrabold text-ocean-100 font-mono mt-1">
            {simulation.totalImplementationCostFormatted}
          </div>
          <div className="text-[10px] text-ocean-200/60 mt-0.5">{simulation.selectedCount} Active Controls</div>
        </div>

        <div>
          <div className="text-[10px] text-teal-300 uppercase tracking-wider font-mono">Estimated ROSI</div>
          <div className="text-lg font-extrabold text-teal-200 font-mono mt-1">
            {simulation.estimatedRosi}%
          </div>
          <div className="text-[10px] text-ocean-200/60 mt-0.5">Confidence: {simulation.confidenceScore}%</div>
        </div>
      </div>

      {/* AI Explanation Callout */}
      <div className="p-4 rounded-xl bg-ocean-500/10 border border-ocean-300/20 flex items-start gap-3">
        <Sparkles className="w-4 h-4 text-ocean-300 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-ocean-100 leading-relaxed">
          {simulation.explanation}
        </p>
      </div>
    </div>
  );
}

