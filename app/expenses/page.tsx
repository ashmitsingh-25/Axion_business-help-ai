"use client";

import { useState } from "react";
import {
  Receipt,
  Sparkles,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  FileText,
  User,
  Building,
  RefreshCw,
  Zap,
  Info,
  Check,
} from "lucide-react";
import { WorkflowStepper, StepItem } from "@/components/WorkflowStepper";
import { ExpenseAuditResponse } from "@/lib/types";
import { MOCK_EXPENSES } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function ExpensesPage() {
  const [employeeName, setEmployeeName] = useState("Rohan Varma");
  const [employeeRole, setEmployeeRole] = useState("Senior Enterprise Account Executive");
  const [department, setDepartment] = useState("Sales & Client Success");
  const [vendor, setVendor] = useState("Grand Hyatt Mumbai");
  const [category, setCategory] = useState("ACCOMMODATION");
  const [amount, setAmount] = useState<number>(18400);
  const [date, setDate] = useState("2026-09-02");
  const [description, setDescription] = useState(
    "1-night stay for enterprise client contract closing dinner in Mumbai metro. Itemized bill includes room rate and executive lounge access."
  );
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [actionDone, setActionDone] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const [workflowSteps, setWorkflowSteps] = useState<StepItem[]>([
    { id: "1", title: "01. Ingestion", description: "Grand Hyatt Mumbai ₹18,400", status: "complete" },
    { id: "2", title: "02. RAG Match", description: "Corporate Travel Policy v3.2", status: "complete" },
    { id: "3", title: "03. Policy Audit", description: "Tier-1 Metro Cap: ₹12,000", status: "complete" },
    { id: "4", title: "04. Action / Flag", description: "Variance: +₹6,400 Overrun", status: "complete" },
  ]);

  const [auditResult, setAuditResult] = useState<ExpenseAuditResponse | null>({
    status: "flagged",
    confidence: 0.98,
    policyLimit: 12000,
    claimedAmount: 18400,
    varianceAmount: 6400,
    violations: [
      {
        rule: "Tier-1 Metro Accommodation Ceiling Exceeded",
        severity: "HIGH",
        description:
          "Claimed ₹18,400 exceeds the maximum allowed nightly lodging limit of ₹12,000 by ₹6,400 (53.3% variance) without VP Finance pre-authorization.",
      },
      {
        rule: "Non-Compliant Ancillary Inclusions",
        severity: "MEDIUM",
        description: "Receipt reflects ₹2,400 in personal lounge charges which are non-reimbursable per Section 4.1.",
      },
    ],
    reasoning:
      "Hotel expense ₹18,400 vs ₹12,000 policy limit → Flagged. Claim exceeds Tier-1 corporate accommodation rate. Recommended resolution is to reimburse the approved ₹12,000 ceiling and route the remaining ₹6,400 to the Department Head for discretionary exception review.",
    policyReference: "Travel & Expense Policy v3.2 (Section 4.1 - Domestic Lodging Caps)",
    auditBadge: "POLICY_LIMIT_OVERRUN",
    suggestedAction:
      "Approve ₹12,000 standard cap; forward ₹6,400 excess to VP Finance for exception review.",
  });

  const handleAudit = async () => {
    if (!vendor.trim() || !amount) {
      showToast("Please enter vendor and amount.");
      return;
    }

    setIsLoading(true);
    setActionDone(false);

    setWorkflowSteps([
      { id: "1", title: "01. Ingestion", description: `${vendor} ₹${amount}`, status: "active" },
      { id: "2", title: "02. RAG Match", description: "Searching policies...", status: "pending" },
      { id: "3", title: "03. Policy Audit", description: "Evaluating caps...", status: "pending" },
      { id: "4", title: "04. Action / Flag", description: "Generating verdict...", status: "pending" },
    ]);

    try {
      const res = await fetch("/api/expenses/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          employeeName,
          employeeRole,
          department,
          vendor,
          category,
          amount,
          date,
          description,
        }),
      });

      if (!res.ok) throw new Error("Failed to audit claim");

      const data: ExpenseAuditResponse = await res.json();
      setAuditResult(data);

      setWorkflowSteps([
        { id: "1", title: "01. Ingestion", description: "Parsed", status: "complete" },
        { id: "2", title: "02. RAG Match", description: data.policyReference, status: "complete" },
        { id: "3", title: "03. Policy Audit", description: `Confidence: ${Math.round(data.confidence * 100)}%`, status: "complete" },
        { id: "4", title: "04. Action / Flag", description: `Status: ${data.status.toUpperCase()}`, status: "complete" },
      ]);

      showToast(`Expense Audit: Claim is ${data.status.toUpperCase()}`);
    } catch (err) {
      console.error("Expense audit error:", err);
      showToast("Error auditing claim. Please retry.");
    } finally {
      setIsLoading(false);
    }
  };

  const loadHotelPreset = () => {
    setEmployeeName("Rohan Varma");
    setEmployeeRole("Senior Enterprise Account Executive");
    setDepartment("Sales & Client Success");
    setVendor("Grand Hyatt Mumbai");
    setCategory("ACCOMMODATION");
    setAmount(18400);
    setDate("2026-09-02");
    setDescription(
      "1-night stay for enterprise client contract closing dinner in Mumbai metro. Itemized bill includes room rate and executive lounge access."
    );
    showToast("Loaded Hotel Overrun Preset (₹18.4k vs ₹12k)");
  };

  const loadSaaSPreset = () => {
    setEmployeeName("Ananya Deshmukh");
    setEmployeeRole("Lead Cloud Infrastructure Engineer");
    setDepartment("Engineering");
    setVendor("Datadog Cloud Monitoring");
    setCategory("SOFTWARE");
    setAmount(82000);
    setDate("2026-09-01");
    setDescription(
      "Monthly pre-approved recurring infrastructure tooling invoice matching procurement purchase order PO-66321."
    );
    showToast("Loaded SaaS Invoice Preset (Approved)");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-ocean-900/90 border border-ocean-400/30 text-ocean-100 text-xs px-4 py-3 rounded-xl shadow-2xl backdrop-blur-2xl flex items-center gap-2 animate-fade-in">
          <Info className="w-4 h-4 text-ocean-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-ocean-300/15">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-ocean-100 tracking-tight font-sans">
              AI Expense Policy Auditor
            </h1>
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-ocean-500/15 text-ocean-300 border border-ocean-400/30 font-semibold backdrop-blur-md">
              RAG Policy Grounded
            </span>
          </div>
          <p className="text-xs text-ocean-200/70 mt-1">
            Automates 100% receipt compliance against corporate policies, spending limits, & anomalies
          </p>
        </div>

        {/* Quick Presets */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={loadHotelPreset}
            className="px-3.5 py-2 rounded-xl bg-ocean-400/20 hover:bg-ocean-400/30 text-ocean-100 border border-ocean-400/40 text-xs font-semibold flex items-center gap-1.5 transition-all backdrop-blur-md shadow-sm"
          >
            <Zap className="w-3.5 h-3.5 text-ocean-300" />
            <span>Preset: Hotel Overrun (₹18.4k vs ₹12k)</span>
          </button>
          <button
            type="button"
            onClick={loadSaaSPreset}
            className="px-3.5 py-2 rounded-xl bg-ocean-950/70 hover:bg-ocean-900/80 text-ocean-300 border border-ocean-400/20 text-xs font-semibold flex items-center gap-1.5 transition-all backdrop-blur-md"
          >
            <FileText className="w-3.5 h-3.5 text-ocean-400" />
            <span>Preset: SaaS Invoice</span>
          </button>
        </div>
      </div>

      {/* Workflow Stepper */}
      <div className="p-4 rounded-2xl bg-ocean-900/50 border border-ocean-400/20 backdrop-blur-2xl shadow-ocean-card">
        <div className="text-[10px] font-mono uppercase text-ocean-300 tracking-wider mb-2 font-bold">
          AI Audit Execution Pipeline
        </div>
        <WorkflowStepper steps={workflowSteps} />
      </div>

      {/* Main Grid: Input Form vs Audit Result */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Expense Intake (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-ocean-900/50 border border-ocean-400/20 backdrop-blur-2xl shadow-ocean-card space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-ocean-300/15">
              <div className="flex items-center gap-2">
                <Receipt className="w-4 h-4 text-ocean-300" />
                <h2 className="text-sm font-bold text-ocean-100">Expense Claim Submission</h2>
              </div>
              <span className="text-[10px] font-mono text-ocean-300/60">Live Intake</span>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAudit();
              }}
              className="space-y-4 text-xs"
            >
              {/* Employee & Department */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-ocean-200/80 font-medium mb-1">Employee Name</label>
                  <input
                    type="text"
                    value={employeeName}
                    onChange={(e) => setEmployeeName(e.target.value)}
                    className="w-full bg-ocean-950/80 border border-ocean-300/20 rounded-xl px-3 py-2 text-ocean-100 focus:outline-none focus:ring-1 focus:ring-ocean-400/50 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-ocean-200/80 font-medium mb-1">Department</label>
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full bg-ocean-950/80 border border-ocean-300/20 rounded-xl px-3 py-2 text-ocean-100 focus:outline-none focus:ring-1 focus:ring-ocean-400/50 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              {/* Vendor & Category */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-ocean-200/80 font-medium mb-1">Vendor / Merchant</label>
                  <input
                    type="text"
                    value={vendor}
                    onChange={(e) => setVendor(e.target.value)}
                    className="w-full bg-ocean-950/80 border border-ocean-300/20 rounded-xl px-3 py-2 text-ocean-100 focus:outline-none focus:ring-1 focus:ring-ocean-400/50 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-ocean-200/80 font-medium mb-1">Expense Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-ocean-950/80 border border-ocean-300/20 rounded-xl px-3 py-2 text-ocean-100 focus:outline-none focus:ring-1 focus:ring-ocean-400/50 focus:border-transparent"
                  >
                    <option value="ACCOMMODATION" className="bg-ocean-950 text-ocean-100">Accommodation / Hotel</option>
                    <option value="MEALS" className="bg-ocean-950 text-ocean-100">Meals & Per Diem</option>
                    <option value="FLIGHT" className="bg-ocean-950 text-ocean-100">Flight / Rail Transit</option>
                    <option value="SOFTWARE" className="bg-ocean-950 text-ocean-100">Software & Cloud Subscriptions</option>
                    <option value="LOGISTICS" className="bg-ocean-950 text-ocean-100">Logistics & Freight</option>
                  </select>
                </div>
              </div>

              {/* Amount & Date */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-ocean-200/80 font-medium mb-1">Claim Amount (INR)</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full bg-ocean-950/80 border border-ocean-300/20 rounded-xl px-3 py-2 text-ocean-100 font-mono font-bold focus:outline-none focus:ring-1 focus:ring-ocean-400/50 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-ocean-200/80 font-medium mb-1">Expense Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-ocean-950/80 border border-ocean-300/20 rounded-xl px-3 py-2 text-ocean-100 focus:outline-none focus:ring-1 focus:ring-ocean-400/50 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-ocean-200/80 font-medium mb-1">Business Purpose</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-ocean-950/80 border border-ocean-300/20 rounded-xl p-3 text-ocean-100 focus:outline-none focus:ring-1 focus:ring-ocean-400/50 focus:border-transparent font-sans"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-ocean-400 hover:bg-ocean-300 text-ocean-950 font-bold text-xs flex items-center justify-center gap-2 shadow-ocean-glow transition-all disabled:opacity-50 active:scale-95"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Auditing against RAG Policy...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-ocean-950" />
                    <span>Audit Claim with Claude</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Audit Findings & Policy Violations (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {auditResult ? (
            <div className="p-6 rounded-2xl bg-ocean-900/50 border border-ocean-400/20 backdrop-blur-2xl shadow-ocean-card space-y-6">
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-ocean-300/15">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-ocean-500/15 border border-ocean-400/30 text-ocean-300">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-ocean-300/70">Claim Analysis for</span>
                    <div className="text-sm font-bold text-ocean-100 mt-0.5">{vendor}</div>
                  </div>
                </div>

                <span className="text-[10px] font-mono px-3 py-1 rounded-full border uppercase font-bold bg-ocean-950/80 text-ocean-200 border-ocean-400/20">
                  Status: {auditResult.status}
                </span>
              </div>

              {/* Policy Limit vs Claimed Amount Box */}
              <div className="grid grid-cols-3 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-ocean-950/70 border border-ocean-300/15">
                  <div className="text-[10px] text-ocean-300/70 uppercase font-mono">Claimed Amount</div>
                  <div className="text-base font-extrabold text-ocean-100 mt-1">
                    {formatCurrency(auditResult.claimedAmount)}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-ocean-950/70 border border-ocean-300/15">
                  <div className="text-[10px] text-ocean-300/70 uppercase font-mono">Policy Cap Limit</div>
                  <div className="text-base font-extrabold text-ocean-300 mt-1">
                    {auditResult.policyLimit ? formatCurrency(auditResult.policyLimit) : "N/A"}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-ocean-950/70 border border-ocean-300/15">
                  <div className="text-[10px] text-ocean-300/70 uppercase font-mono">Variance Overrun</div>
                  <div className="text-base font-extrabold mt-1 text-ocean-100">
                    {auditResult.varianceAmount > 0
                      ? `+${formatCurrency(auditResult.varianceAmount)}`
                      : "Compliant"}
                  </div>
                </div>
              </div>

              {/* Violations Strip */}
              {auditResult.violations.length > 0 && (
                <div className="space-y-3">
                  <div className="text-xs font-mono text-ocean-300 uppercase tracking-wider font-bold">
                    Detected Policy Violations ({auditResult.violations.length})
                  </div>
                  <div className="space-y-2">
                    {auditResult.violations.map((violation, i) => (
                      <div
                        key={i}
                        className="p-3.5 rounded-xl bg-ocean-950/70 border border-ocean-300/15 space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-ocean-100">{violation.rule}</span>
                          <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-ocean-900 text-ocean-300 border border-ocean-400/20">
                            {violation.severity}
                          </span>
                        </div>
                        <p className="text-[11px] text-ocean-200/70 leading-relaxed font-sans">
                          {violation.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Agent Rationale */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-ocean-100 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-ocean-300" />
                  <span>Auditor Agent Rationale</span>
                </div>
                <p className="text-xs text-ocean-200/90 leading-relaxed p-4 rounded-xl bg-ocean-950/70 border border-ocean-300/15 font-sans">
                  {auditResult.reasoning}
                </p>
              </div>

              {/* Policy Grounding Reference */}
              <div className="p-3.5 rounded-xl bg-ocean-950/70 border border-ocean-300/15 text-xs flex items-center justify-between">
                <div className="flex items-center gap-2 text-ocean-300/80">
                  <FileText className="w-4 h-4 text-ocean-300" />
                  <span className="font-mono text-[11px]">{auditResult.policyReference}</span>
                </div>
                <span className="text-[10px] text-ocean-300/60 font-mono">Verified Match</span>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-ocean-300/15">
                <button
                  type="button"
                  onClick={() => {
                    setActionDone(true);
                    showToast(`Approved policy limit of ₹${auditResult.policyLimit?.toLocaleString("en-IN")}`);
                  }}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-ocean-400 hover:bg-ocean-300 text-ocean-950 text-xs font-bold shadow-ocean-glow active:scale-95 transition-all"
                >
                  Approve Standard Cap ({auditResult.policyLimit ? formatCurrency(auditResult.policyLimit) : "Standard"})
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActionDone(true);
                    showToast(`Forwarded ₹${auditResult.varianceAmount?.toLocaleString("en-IN")} excess to VP Finance`);
                  }}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-ocean-500/20 hover:bg-ocean-500/30 text-ocean-200 text-xs font-semibold border border-ocean-400/30 active:scale-95 transition-all"
                >
                  Route Overrun to VP Finance
                </button>
              </div>
            </div>
          ) : (
            <div className="p-12 rounded-2xl bg-ocean-900/30 border border-dashed border-ocean-400/20 text-center space-y-3">
              <Receipt className="w-8 h-8 text-ocean-400 mx-auto" />
              <div className="text-sm font-bold text-ocean-300">No Expense Claim Audited Yet</div>
              <p className="text-xs text-ocean-300/60 max-w-sm mx-auto">
                Submit an expense claim on the left or use a preset to audit compliance in real time.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Ledger of Seeded Expense Claims */}
      <div className="p-6 rounded-2xl bg-ocean-900/50 border border-ocean-400/20 backdrop-blur-2xl shadow-ocean-card">
        <div className="flex items-center justify-between pb-4 border-b border-ocean-300/15">
          <div>
            <h2 className="text-sm font-bold text-ocean-100 tracking-tight">
              Enterprise Expense Audit Ledger
            </h2>
            <p className="text-[11px] text-ocean-200/70">
              Audit log of processed employee reimbursement claims and detected policy variances
            </p>
          </div>
          <span className="text-[10px] font-mono text-ocean-300/70">
            {MOCK_EXPENSES.length} Processed Claims
          </span>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs min-w-[750px]">
            <thead>
              <tr className="border-b border-ocean-300/15 text-[10px] font-mono uppercase text-ocean-300/70">
                <th className="py-3 px-3">Claim ID</th>
                <th className="py-3 px-3">Employee</th>
                <th className="py-3 px-3">Department</th>
                <th className="py-3 px-3">Vendor</th>
                <th className="py-3 px-3 text-right">Amount</th>
                <th className="py-3 px-3 text-right">Policy Cap</th>
                <th className="py-3 px-3 text-center">Audit Status</th>
                <th className="py-3 px-3 text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ocean-300/10">
              {MOCK_EXPENSES.map((exp) => (
                <tr key={exp.id} className="hover:bg-ocean-400/[0.04] transition-colors">
                  <td className="py-3 px-3 font-mono font-bold text-ocean-200">
                    {exp.claimNumber}
                  </td>
                  <td className="py-3 px-3 font-bold text-ocean-100">{exp.employeeName}</td>
                  <td className="py-3 px-3 text-ocean-300/70">{exp.department}</td>
                  <td className="py-3 px-3 text-ocean-200 font-medium">{exp.vendor}</td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-ocean-100">
                    {formatCurrency(exp.amount)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-ocean-300/70">
                    {exp.policyLimit ? formatCurrency(exp.policyLimit) : "None"}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded-full border uppercase bg-ocean-950/80 text-ocean-300 border-ocean-400/20 font-bold">
                      {exp.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right text-ocean-300/60 font-mono">
                    {formatDate(exp.date)}
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
