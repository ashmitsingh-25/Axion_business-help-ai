"use client";

import { useState } from "react";
import { FileText, Copy, Check, X, Shield, ArrowDownToLine } from "lucide-react";
import { CyberRiskOverview } from "@/lib/types";

interface ExecutiveBriefModalProps {
  overview: CyberRiskOverview;
  isOpen: boolean;
  onClose: () => void;
}

export function ExecutiveBriefModal({ overview, isOpen, onClose }: ExecutiveBriefModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const briefText = `
================================================================================
AXION ENTERPRISE CYBER RISK & FINANCIAL QUANTIFICATION EXECUTIVE BRIEF
Generated: ${new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} | Axion Autonomous Decision Layer
================================================================================

1. EXECUTIVE RISK POSTURE:
   • Enterprise Cyber Risk Score: ${overview.enterpriseScore} / 100 (${overview.scoreGrade})
   • Total Quantified Financial Exposure: ${overview.totalFinancialExposureFormatted}
   • Expected Annual Loss (EAL): ${overview.expectedAnnualLossFormatted}
   • Potential Maximum Single-Event Loss: ${overview.potentialMaxLossFormatted}
   • Annual Incident Probability: ${overview.incidentLikelihoodPercent}%
   • Overall Control Effectiveness: ${overview.controlEffectivenessPercent}%

2. TOP FINANCIAL RISK DRIVERS:
   • #1: Critical Internet-Facing Vulnerability (CVE-2024-3094 on Payment Gateway DB) -> ₹42L Annual Risk
   • #2: 18 Infrastructure Admins Lacking Hardware FIDO2 MFA -> ₹28L Annual Risk
   • #3: Payment DB Direct Subnet Ingress Exposure -> ₹24L Annual Risk

3. OPTIMAL SECURITY INVESTMENT RECOMMENDATION:
   • Recommended Capital Expenditure: ₹18,00,000 (₹18L)
   • Expected Financial Risk Reduction: ₹71,00,000 (₹71L)
   • Estimated Return on Security Investment (ROSI): 294%
   • Portfolio Components:
     - Hardware FIDO2 MFA Keys (₹5L -> ₹35L reduction)
     - Automated Continuous Patch Pipeline (₹8L -> ₹42L reduction)
     - Cloud Security Posture Auto-Remediation (₹5L -> ₹19L reduction)

4. REGULATORY COMPLIANCE STANDARDS:
   • NIST CSF 2.0: 82.4% | ISO/IEC 27001: 83.8% | CIS Controls: 79.7%
   • RBI Cyber Security Framework: 88.1% | SEBI CSCRF: 84.5%

================================================================================
Approved by Axion Autonomous Risk Intelligence Layer • Confidential Enterprise Document
================================================================================
  `.trim();

  const handleCopy = () => {
    navigator.clipboard.writeText(briefText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-2xl rounded-2xl bg-zinc-950 border border-white/20 p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/10 border border-white/20 text-white">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                Executive Cyber Risk & Financial Brief
              </h3>
              <p className="text-[11px] text-zinc-400">
                Board & C-Suite summary of quantified financial loss, top drivers, and optimal spend
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Formatted Code Block */}
        <div className="p-4 rounded-xl bg-zinc-900/90 border border-white/10 max-h-[420px] overflow-y-auto font-mono text-[11px] text-zinc-300 leading-relaxed whitespace-pre-wrap">
          {briefText}
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-[10px] font-mono text-zinc-500">
            Format: Plaintext Executive Brief (Ready for CISO / Board Memo)
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-semibold text-white flex items-center gap-2 transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied Brief!" : "Copy to Clipboard"}</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 text-xs font-bold shadow-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
