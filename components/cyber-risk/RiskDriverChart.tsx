"use client";

import { useState } from "react";
import { AlertTriangle, ArrowRight, ShieldCheck, X, DollarSign, Database } from "lucide-react";
import { RiskDriverItem } from "@/lib/types";
import { MOCK_RISK_DRIVERS } from "@/lib/mock-data";

export function RiskDriverChart() {
  const [selectedDriver, setSelectedDriver] = useState<RiskDriverItem | null>(null);
  const drivers = MOCK_RISK_DRIVERS;

  return (
    <div className="p-6 rounded-2xl bg-zinc-900/60 border border-white/10 backdrop-blur-2xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_10px_30px_-10px_rgba(0,0,0,0.5)]">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-white tracking-tight">
              Top Financial Risk Contributors
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 font-semibold">
              4 Primary Drivers
            </span>
          </div>
          <p className="text-[11px] text-zinc-400 mt-0.5">
            Ranked root factors contributing most heavily to annual financial cyber exposure
          </p>
        </div>
      </div>

      {/* Driver List with Progress Bars */}
      <div className="mt-4 space-y-4">
        {drivers.map((driver, idx) => (
          <div
            key={driver.id}
            onClick={() => setSelectedDriver(driver)}
            className="p-3.5 rounded-xl bg-zinc-950/60 border border-white/5 hover:border-white/20 hover:bg-white/[0.02] transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-[10px] font-bold text-zinc-400 w-4">
                  0{idx + 1}.
                </span>
                <div>
                  <div className="font-bold text-white group-hover:text-zinc-200 transition-colors">
                    {driver.title}
                  </div>
                  <div className="text-[11px] text-zinc-400 mt-0.5 flex items-center gap-2">
                    <span>Asset: {driver.assetName}</span>
                    <span className="text-zinc-600">•</span>
                    <span className="text-zinc-500 font-mono">{driver.controlDeficiency}</span>
                  </div>
                </div>
              </div>

              <div className="text-right flex-shrink-0">
                <div className="font-mono text-xs font-extrabold text-rose-400">
                  {driver.financialContributionFormatted}
                </div>
                <div className="text-[10px] text-zinc-500">{driver.percentageOfTotal}% of total</div>
              </div>
            </div>

            {/* Horizontal Percentage Bar */}
            <div className="mt-3 w-full bg-zinc-900 rounded-full h-1.5 overflow-hidden">
              <div
                style={{ width: `${driver.percentageOfTotal}%` }}
                className="h-full rounded-full bg-gradient-to-r from-rose-500 to-amber-500 transition-all duration-500"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Drill-down Modal */}
      {selectedDriver && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-xl rounded-2xl bg-zinc-950 border border-white/20 p-6 shadow-2xl relative space-y-5 animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-400 border border-white/10 font-bold uppercase">
                    Risk Driver Breakdown
                  </span>
                  <h4 className="text-sm font-bold text-white mt-1">{selectedDriver.title}</h4>
                </div>
              </div>
              <button
                onClick={() => setSelectedDriver(null)}
                className="p-1.5 rounded-lg bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Content Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-zinc-900/80 border border-white/5 space-y-1">
                <div className="text-[10px] text-zinc-400">Target Asset</div>
                <div className="font-bold text-white">{selectedDriver.assetName}</div>
              </div>

              <div className="p-3 rounded-xl bg-zinc-900/80 border border-white/5 space-y-1">
                <div className="text-[10px] text-zinc-400">Annual Financial Exposure</div>
                <div className="font-bold text-rose-400 font-mono text-sm">
                  {selectedDriver.financialContributionFormatted}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-zinc-900/80 border border-white/5 space-y-1">
                <div className="text-[10px] text-zinc-400">Identified Vulnerability / Threat</div>
                <div className="font-bold text-zinc-200">{selectedDriver.cveId || "IAM Privileged Credential Exposure"}</div>
              </div>

              <div className="p-3 rounded-xl bg-zinc-900/80 border border-white/5 space-y-1">
                <div className="text-[10px] text-zinc-400">Associated Control Deficiency</div>
                <div className="font-bold text-amber-300 font-mono text-[11px]">{selectedDriver.controlDeficiency}</div>
              </div>
            </div>

            {/* Recommended Remediation */}
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-zinc-200">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Deterministic Remediation Action</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                {selectedDriver.remediation}
              </p>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setSelectedDriver(null)}
                className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-xs font-semibold text-zinc-300"
              >
                Close
              </button>
              <a
                href="/cyber-risk/investments"
                className="px-4 py-2 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 text-xs font-bold flex items-center gap-2 shadow-sm"
              >
                <span>Optimize Investment</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
