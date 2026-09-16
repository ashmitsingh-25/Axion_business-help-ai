"use client";

import { useState } from "react";
import { ShieldCheck, Layers, CheckCircle2, AlertCircle, FileText, ArrowRight } from "lucide-react";
import { getComplianceFrameworks, getMultiFrameworkMappings } from "@/lib/compliance-engine";

export function FrameworkMappingMatrix() {
  const frameworks = getComplianceFrameworks();
  const mappings = getMultiFrameworkMappings();
  const [selectedFramework, setSelectedFramework] = useState<string>("ALL");

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/60 border border-white/10 backdrop-blur-2xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_20px_50px_rgba(0,0,0,0.6)] space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight font-sans">
              Cybersecurity Framework & Compliance Center
            </h2>
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-bold">
              Multi-Standard Matrix
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
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
                ? "bg-white/[0.08] border-white/40 ring-1 ring-white/20 shadow-lg"
                : "bg-zinc-950/80 border-white/5 hover:border-white/15"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-white/5 text-zinc-300 border border-white/10">
                  {fw.version}
                </span>
                <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                  {fw.status.replace(/_/g, " ")}
                </span>
              </div>
              <h3 className="text-xs font-bold text-white font-sans">{fw.name}</h3>
              <div className="text-[10px] text-zinc-400 mt-0.5">{fw.authority}</div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
              <div>
                <div className="text-lg font-extrabold text-white font-mono">
                  {fw.complianceScorePercent}%
                </div>
                <div className="text-[9px] font-mono text-zinc-500">
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
          <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold">
            Harmonized Control Mapping Architecture
          </div>
          <span className="text-[11px] text-zinc-500 font-mono">
            Axion Control → Global & Regional Standards
          </span>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-zinc-950/80">
          <table className="w-full text-left border-collapse min-w-[840px]">
            <thead>
              <tr className="border-b border-white/10 text-[10px] font-mono uppercase text-zinc-400 bg-zinc-900/60">
                <th className="py-3.5 px-4 text-white">Axion Core Control</th>
                <th className="py-3.5 px-3">NIST CSF 2.0</th>
                <th className="py-3.5 px-3">CIS Controls v8</th>
                <th className="py-3.5 px-3">ISO/IEC 27001</th>
                <th className="py-3.5 px-3">RBI CSF</th>
                <th className="py-3.5 px-3">SEBI CSCRF</th>
                <th className="py-3.5 px-3 text-center">Effectiveness</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs">
              {mappings.map((row, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-white">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-cyan-400" />
                      <span>{row.axionControl}</span>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500 ml-4">{row.axionCode}</span>
                  </td>
                  <td className="py-3.5 px-3 font-mono text-zinc-300">{row.nistCsf}</td>
                  <td className="py-3.5 px-3 font-mono text-zinc-300">{row.cisControls}</td>
                  <td className="py-3.5 px-3 font-mono text-zinc-300">{row.iso27001}</td>
                  <td className="py-3.5 px-3 font-mono text-emerald-400 font-semibold">{row.rbiCsf}</td>
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
