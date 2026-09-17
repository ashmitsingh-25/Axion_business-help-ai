"use client";

import { useState } from "react";
import { ShieldCheck, Layers, CheckCircle2, AlertCircle, FileText, ArrowRight } from "lucide-react";
import { getComplianceFrameworks, getMultiFrameworkMappings } from "@/lib/compliance-engine";

export function FrameworkMappingMatrix() {
  const frameworks = getComplianceFrameworks();
  const mappings = getMultiFrameworkMappings();
  const [selectedFramework, setSelectedFramework] = useState<string>("ALL");

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-ocean-900/50 border border-ocean-400/20 backdrop-blur-2xl shadow-ocean-card space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-ocean-300/15">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-ocean-100 tracking-tight font-sans">
              Cybersecurity Framework & Compliance Center
            </h2>
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-ocean-500/15 text-ocean-300 border border-ocean-400/30 font-bold">
              Multi-Standard Matrix
            </span>
          </div>
          <p className="text-xs text-ocean-200/70 mt-1">
            Harmonized control mapping across NIST CSF 2.0, ISO/IEC 27001, CIS Controls v8, RBI CSF, and SEBI CSCRF.
          </p>
        </div>
      </div>

      {/* Framework Summary Scorecards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {frameworks.map((fw) => (
          <div
            key={fw.id}
            onClick={() => setSelectedFramework(fw.code === selectedFramework ? "ALL" : fw.code)}
            className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
              selectedFramework === fw.code
                ? "bg-ocean-500/20 border-ocean-400/50 ring-1 ring-ocean-400/30 shadow-ocean-card"
                : "bg-ocean-950/70 border-ocean-300/15 hover:border-ocean-400/30"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-ocean-500/10 text-ocean-300 border border-ocean-400/20">
                  {fw.version}
                </span>
                <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  {fw.status.replace(/_/g, " ")}
                </span>
              </div>
              <h3 className="text-xs font-bold text-ocean-100 font-sans">{fw.name}</h3>
              <div className="text-[10px] text-ocean-300/60 mt-0.5">{fw.authority}</div>
            </div>

            <div className="mt-4 pt-3 border-t border-ocean-300/10 flex items-center justify-between">
              <div>
                <div className="text-lg font-extrabold text-ocean-100 font-mono">
                  {fw.complianceScorePercent}%
                </div>
                <div className="text-[9px] font-mono text-ocean-300/60">
                  {fw.compliantControls}/{fw.totalControls} Controls
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Multi-Framework Harmonized Control Mapping Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-xs font-mono uppercase tracking-wider text-ocean-300 font-bold">
            Harmonized Control Mapping Architecture
          </div>
          <span className="text-[11px] text-ocean-300/60 font-mono">
            Axion Control → Global & Regional Standards
          </span>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-ocean-400/20 bg-ocean-950/70">
          <table className="w-full text-left border-collapse min-w-[840px]">
            <thead>
              <tr className="border-b border-ocean-300/15 text-[10px] font-mono uppercase text-ocean-300/70 bg-ocean-950/60">
                <th className="py-3.5 px-4 text-ocean-100">Axion Core Control</th>
                <th className="py-3.5 px-3">NIST CSF 2.0</th>
                <th className="py-3.5 px-3">CIS Controls v8</th>
                <th className="py-3.5 px-3">ISO/IEC 27001</th>
                <th className="py-3.5 px-3">RBI CSF</th>
                <th className="py-3.5 px-3">SEBI CSCRF</th>
                <th className="py-3.5 px-3 text-center">Effectiveness</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ocean-300/10 text-xs">
              {mappings.map((row, idx) => (
                <tr key={idx} className="hover:bg-ocean-400/[0.04] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-ocean-100">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-ocean-400" />
                      <span>{row.axionControl}</span>
                    </div>
                    <span className="text-[10px] font-mono text-ocean-300/50 ml-4">{row.axionCode}</span>
                  </td>
                  <td className="py-3.5 px-3 font-mono text-ocean-200">{row.nistCsf}</td>
                  <td className="py-3.5 px-3 font-mono text-ocean-200">{row.cisControls}</td>
                  <td className="py-3.5 px-3 font-mono text-ocean-200">{row.iso27001}</td>
                  <td className="py-3.5 px-3 font-mono text-emerald-300 font-semibold">{row.rbiCsf}</td>
                  <td className="py-3.5 px-3 font-mono text-purple-300 font-semibold">{row.sebiCscrf}</td>
                  <td className="py-3.5 px-3 text-center font-mono">
                    <span
                      className={`text-xs font-bold ${
                        row.effectiveness >= 80
                          ? "text-emerald-400"
                          : row.effectiveness >= 60
                          ? "text-amber-300"
                          : "text-rose-400"
                      }`}
                    >
                      {row.effectiveness}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
