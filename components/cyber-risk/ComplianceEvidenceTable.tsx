"use client";

import { useState } from "react";
import { CheckCircle, AlertCircle, FileCheck, ExternalLink, Download } from "lucide-react";
import { getComplianceEvidence, generateExecutiveComplianceBrief } from "@/lib/compliance-engine";

export function ComplianceEvidenceTable() {
  const evidence = getComplianceEvidence();
  const [downloading, setDownloading] = useState(false);

  const handleDownloadReport = () => {
    setDownloading(true);
    const brief = generateExecutiveComplianceBrief();
    const jsonStr = JSON.stringify(brief, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Axion_Cyber_Compliance_Report_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    setTimeout(() => setDownloading(false), 1000);
  };

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-ocean-900/50 border border-ocean-400/20 backdrop-blur-2xl shadow-ocean-card space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-ocean-300/15">
        <div>
          <div className="flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-emerald-400" />
            <h3 className="text-base font-bold text-ocean-100 tracking-tight">
              Autonomous Compliance Evidence Center
            </h3>
          </div>
          <p className="text-xs text-ocean-200/70 mt-0.5">
            Cryptographically timestamped telemetry evidence mapped to auditor checklist standards
          </p>
        </div>

        <button
          onClick={handleDownloadReport}
          className="px-4 py-2 rounded-xl bg-ocean-400 hover:bg-ocean-300 text-ocean-950 text-xs font-bold flex items-center gap-2 shadow-ocean-glow transition-all"
        >
          <Download className="w-3.5 h-3.5" />
          <span>{downloading ? "Exporting Audit Pack..." : "Export Audit Pack (JSON)"}</span>
        </button>
      </div>

      {/* Evidence Table */}
      <div className="overflow-x-auto rounded-2xl border border-ocean-400/20 bg-ocean-950/70">
        <table className="w-full text-left border-collapse min-w-[780px]">
          <thead>
            <tr className="border-b border-ocean-300/15 text-[10px] font-mono uppercase text-ocean-300/70 bg-ocean-950/60">
              <th className="py-3 px-4 text-ocean-100">Control & Standard</th>
              <th className="py-3 px-3">Telemetry Evidence Source</th>
              <th className="py-3 px-3">Last Verified</th>
              <th className="py-3 px-3">Verified By</th>
              <th className="py-3 px-3 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ocean-300/10 text-xs">
            {evidence.map((ev) => (
              <tr key={ev.id} className="hover:bg-ocean-400/[0.04] transition-colors">
                <td className="py-3.5 px-4">
                  <div className="font-bold text-ocean-100">{ev.controlName}</div>
                  <div className="text-[10px] font-mono text-ocean-300 mt-0.5">
                    {ev.frameworkName}
                  </div>
                  <p className="text-[11px] text-ocean-200/70 mt-1 max-w-md leading-relaxed">
                    {ev.description}
                  </p>
                </td>

                <td className="py-3.5 px-3 font-mono text-[11px] text-ocean-200">
                  <span className="px-2 py-0.5 rounded bg-ocean-500/10 border border-ocean-400/20">
                    {ev.telemetryRef}
                  </span>
                </td>

                <td className="py-3.5 px-3 font-mono text-[11px] text-ocean-300/60">
                  {ev.lastVerified}
                </td>

                <td className="py-3.5 px-3 text-[11px] text-ocean-200 font-medium">
                  {ev.verifiedBy}
                </td>

                <td className="py-3.5 px-3 text-center">
                  <span
                    className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                      ev.status === "VERIFIED"
                        ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
                        : "bg-rose-500/15 text-rose-300 border-rose-500/30"
                    }`}
                  >
                    {ev.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
