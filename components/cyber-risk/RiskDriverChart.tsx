"use client";

import { useState } from "react";
import { AlertTriangle, ArrowRight, ShieldCheck, X, DollarSign, Database } from "lucide-react";
import { RiskDriverItem } from "@/lib/types";
import { MOCK_RISK_DRIVERS } from "@/lib/mock-data";

export function RiskDriverChart() {
  const [selectedDriver, setSelectedDriver] = useState<RiskDriverItem | null>(null);
  const drivers = MOCK_RISK_DRIVERS;

  return (
    <div className="p-6 rounded-2xl bg-ocean-900/40 border border-ocean-300/15 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.35),inset_0_1px_0_0_rgba(94,234,212,0.12)] transition-all duration-300 hover:border-ocean-300/30">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-ocean-300/10">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-white tracking-tight">
              Top Financial Risk Contributors
            </h3>
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 font-bold">
              4 Primary Drivers
            </span>
          </div>
          <p className="text-[11px] text-ocean-200/60 mt-0.5">
            Ranked root factors contributing most heavily to annual financial cyber exposure
          </p>
        </div>
      </div>

      {/* Driver List with Progress Bars */}
      <div className="mt-4 space-y-3">
        {drivers.map((driver, idx) => (
          <div
            key={driver.id}
            onClick={() => setSelectedDriver(driver)}
            className="p-3.5 rounded-xl bg-ocean-950/70 border border-ocean-300/10 hover:border-ocean-300/30 hover:bg-ocean-900/60 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-[10px] font-bold text-ocean-300/70 w-4">
                  0{idx + 1}.
                </span>
                <div>
                  <div className="font-bold text-white group-hover:text-ocean-200 transition-colors">
                    {driver.title}
                  </div>
                  <div className="text-[11px] text-ocean-200/60 mt-0.5 flex items-center gap-2">
                    <span>Asset: {driver.assetName}</span>
                    <span className="text-ocean-500/60">•</span>
                    <span className="text-ocean-300/70 font-mono">{driver.controlDeficiency}</span>
                  </div>
                </div>
              </div>

              <div className="text-right flex-shrink-0">
                <div className="font-mono text-xs font-extrabold text-rose-300">
                  {driver.financialContributionFormatted}
                </div>
                <div className="text-[10px] text-ocean-300/60">{driver.percentageOfTotal}% of total</div>
              </div>
            </div>

            {/* Horizontal Percentage Bar */}
            <div className="mt-3 w-full bg-ocean-900 rounded-full h-1.5 overflow-hidden">
              <div
                style={{ width: `${driver.percentageOfTotal}%` }}
                className="h-full rounded-full bg-gradient-to-r from-ocean-500 to-amber-400 transition-all duration-500 shadow-[0_0_8px_rgba(32,201,166,0.3)]"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Drill-down Modal */}
      {selectedDriver && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-xl rounded-2xl bg-ocean-950 border border-ocean-300/30 p-6 shadow-2xl relative space-y-5 animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-ocean-300/15 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-ocean-500/15 text-ocean-200 border border-ocean-300/20 font-bold uppercase">
                    Risk Driver Breakdown
                  </span>
                  <h4 className="text-sm font-bold text-white mt-1">{selectedDriver.title}</h4>
                </div>
              </div>
              <button
                onClick={() => setSelectedDriver(null)}
                className="p-1.5 rounded-lg bg-ocean-900 border border-ocean-300/20 text-ocean-300 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Content Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-ocean-900/70 border border-ocean-300/10 space-y-1">
                <div className="text-[10px] text-ocean-200/60">Target Asset</div>
                <div className="font-bold text-white">{selectedDriver.assetName}</div>
              </div>

              <div className="p-3 rounded-xl bg-ocean-900/70 border border-ocean-300/10 space-y-1">
                <div className="text-[10px] text-ocean-200/60">Annual Financial Exposure</div>
                <div className="font-bold text-rose-300 font-mono text-sm">
                  {selectedDriver.financialContributionFormatted}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-ocean-900/70 border border-ocean-300/10 space-y-1">
                <div className="text-[10px] text-ocean-200/60">Identified Vulnerability / Threat</div>
                <div className="font-bold text-ocean-100">{selectedDriver.cveId || "IAM Privileged Credential Exposure"}</div>
              </div>

              <div className="p-3 rounded-xl bg-ocean-900/70 border border-ocean-300/10 space-y-1">
                <div className="text-[10px] text-ocean-200/60">Associated Control Deficiency</div>
                <div className="font-bold text-amber-300 font-mono text-[11px]">{selectedDriver.controlDeficiency}</div>
              </div>
            </div>

            {/* Recommended Remediation */}
            <div className="p-4 rounded-xl bg-ocean-500/10 border border-ocean-300/25 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-ocean-200">
                <ShieldCheck className="w-4 h-4 text-ocean-300" />
                <span>Deterministic Remediation Action</span>
              </div>
              <p className="text-xs text-ocean-100 leading-relaxed">
                {selectedDriver.remediation}
              </p>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setSelectedDriver(null)}
                className="px-4 py-2 rounded-xl bg-ocean-900/80 hover:bg-ocean-800 border border-ocean-300/20 text-xs font-semibold text-ocean-200"
              >
                Close
              </button>
              <a
                href="/cyber-risk/investments"
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-ocean-400 to-ocean-500 hover:from-ocean-300 hover:to-ocean-400 text-ocean-950 text-xs font-bold flex items-center gap-2 shadow-[0_0_20px_rgba(32,201,166,0.3)]"
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

