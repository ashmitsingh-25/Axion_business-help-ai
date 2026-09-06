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
        <div className="fixed bottom-6 right-6 z-50 bg-zinc-900 border border-zinc-700 text-white text-xs px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-fade-in">
          <Info className="w-4 h-4 text-blue-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-sans">
              AI Expense Policy Auditor
            </h1>
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-bold">
              RAG Policy Grounded
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Automates 100% receipt compliance against corporate policies, spending limits, & anomalies
          </p>
        </div>

        {/* Quick Presets */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={loadHotelPreset}
            className="px-3.5 py-2 rounded-xl bg-blue-600/15 hover:bg-blue-600/25 text-blue-400 border border-blue-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            <Zap className="w-3.5 h-3.5 text-blue-400" />
            <span>Preset: Hotel Overrun (₹18.4k vs ₹12k)</span>
          </button>
          <button
            type="button"
            onClick={loadSaaSPreset}
            className="px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-850 text-zinc-300 border border-zinc-800 text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            <FileText className="w-3.5 h-3.5 text-zinc-400" />
            <span>Preset: SaaS Invoice</span>
          </button>
        </div>
      </div>

      {/* Workflow Stepper */}
      <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800">
        <div className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider mb-2 font-bold">
          AI Audit Execution Pipeline
        </div>
        <WorkflowStepper steps={workflowSteps} />
      </div>

      {/* Main Grid: Input Form vs Audit Result */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Expense Intake (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <Receipt className="w-4 h-4 text-blue-400" />
                <h2 className="text-sm font-bold text-white">Expense Claim Submission</h2>
              </div>
              <span className="text-[10px] font-mono text-zinc-500">Live Intake</span>
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
                  <label className="block text-zinc-400 font-medium mb-1">Employee Name</label>
                  <input
                    type="text"
                    value={employeeName}
                    onChange={(e) => setEmployeeName(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 font-medium mb-1">Department</label>
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>
              </div>

              {/* Vendor & Category */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 font-medium mb-1">Vendor / Merchant</label>
                  <input
                    type="text"
                    value={vendor}
                    onChange={(e) => setVendor(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 font-medium mb-1">Expense Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="ACCOMMODATION">Accommodation / Hotel</option>
                    <option value="MEALS">Meals & Per Diem</option>
                    <option value="FLIGHT">Flight / Rail Transit</option>
                    <option value="SOFTWARE">Software & Cloud Subscriptions</option>
                    <option value="LOGISTICS">Logistics & Freight</option>
                  </select>
                </div>
              </div>

              {/* Amount & Date */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 font-medium mb-1">Claim Amount (INR)</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white font-mono font-bold focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 font-medium mb-1">Expense Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-zinc-400 font-medium mb-1">Business Purpose</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 font-sans"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-md shadow-blue-600/25 transition-all disabled:opacity-50 active:scale-95"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Auditing against RAG Policy...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-blue-200" />
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
            <div className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 shadow-2xl space-y-6">
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-zinc-800">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-blue-400">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-zinc-400">Claim Analysis for</span>
                    <div className="text-sm font-bold text-white mt-0.5">{vendor}</div>
                  </div>
                </div>

                <span className="text-[10px] font-mono px-3 py-1 rounded-full border uppercase font-bold bg-zinc-950 text-zinc-200 border-zinc-700">
                  Status: {auditResult.status}
                </span>
              </div>

              {/* Policy Limit vs Claimed Amount Box */}
              <div className="grid grid-cols-3 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800">
                  <div className="text-[10px] text-zinc-400 uppercase font-mono">Claimed Amount</div>
                  <div className="text-base font-extrabold text-white mt-1">
                    {formatCurrency(auditResult.claimedAmount)}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800">
                  <div className="text-[10px] text-zinc-400 uppercase font-mono">Policy Cap Limit</div>
                  <div className="text-base font-extrabold text-zinc-300 mt-1">
                    {auditResult.policyLimit ? formatCurrency(auditResult.policyLimit) : "N/A"}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800">
                  <div className="text-[10px] text-zinc-400 uppercase font-mono">Variance Overrun</div>
                  <div className="text-base font-extrabold mt-1 text-white">
                    {auditResult.varianceAmount > 0
                      ? `+${formatCurrency(auditResult.varianceAmount)}`
                      : "Compliant"}
                  </div>
                </div>
              </div>

              {/* Violations Strip */}
              {auditResult.violations.length > 0 && (
                <div className="space-y-3">
                  <div className="text-xs font-mono text-zinc-300 uppercase tracking-wider font-bold">
                    Detected Policy Violations ({auditResult.violations.length})
                  </div>
                  <div className="space-y-2">
                    {auditResult.violations.map((violation, i) => (
                      <div
                        key={i}
                        className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white">{violation.rule}</span>
                          <span className="text-[9px] font-mono px-2 py-0.2 rounded bg-zinc-900 text-zinc-300 border border-zinc-700">
                            {violation.severity}
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">
                          {violation.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Agent Rationale */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                  <span>Auditor Agent Rationale</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed p-4 rounded-xl bg-zinc-950 border border-zinc-800 font-sans">
                  {auditResult.reasoning}
                </p>
              </div>

              {/* Policy Grounding Reference */}
              <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs flex items-center justify-between">
                <div className="flex items-center gap-2 text-zinc-400">
                  <FileText className="w-4 h-4 text-blue-400" />
                  <span className="font-mono text-[11px]">{auditResult.policyReference}</span>
                </div>
                <span className="text-[10px] text-blue-400 font-mono">Verified Match</span>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => {
                    setActionDone(true);
                    showToast(`Approved policy limit of ₹${auditResult.policyLimit?.toLocaleString("en-IN")}`);
                  }}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-sm active:scale-95 transition-all"
                >
                  Approve Standard Cap ({auditResult.policyLimit ? formatCurrency(auditResult.policyLimit) : "Standard"})
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActionDone(true);
                    showToast(`Forwarded ₹${auditResult.varianceAmount?.toLocaleString("en-IN")} excess to VP Finance`);
                  }}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-750 text-zinc-200 text-xs font-semibold border border-zinc-700 active:scale-95 transition-all"
                >
                  Route Overrun to VP Finance
                </button>
              </div>
            </div>
          ) : (
            <div className="p-12 rounded-2xl bg-zinc-900/40 border border-dashed border-zinc-800 text-center space-y-3">
              <Receipt className="w-8 h-8 text-zinc-600 mx-auto" />
              <div className="text-sm font-bold text-zinc-400">No Expense Claim Audited Yet</div>
              <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                Submit an expense claim on the left or use a preset to audit compliance in real time.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Ledger of Seeded Expense Claims */}
      <div className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800">
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <div>
            <h2 className="text-sm font-bold text-white tracking-tight">
              Enterprise Expense Audit Ledger
            </h2>
            <p className="text-[11px] text-zinc-400">
              Audit log of processed employee reimbursement claims and detected policy variances
            </p>
          </div>
          <span className="text-[10px] font-mono text-zinc-400">
            {MOCK_EXPENSES.length} Processed Claims
          </span>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs min-w-[750px]">
            <thead>
              <tr className="border-b border-zinc-800 text-[10px] font-mono uppercase text-zinc-400">
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
            <tbody className="divide-y divide-zinc-800/60">
              {MOCK_EXPENSES.map((exp) => (
                <tr key={exp.id} className="hover:bg-zinc-950/40 transition-colors">
                  <td className="py-3 px-3 font-mono font-bold text-blue-400">
                    {exp.claimNumber}
                  </td>
                  <td className="py-3 px-3 font-bold text-white">{exp.employeeName}</td>
                  <td className="py-3 px-3 text-zinc-400">{exp.department}</td>
                  <td className="py-3 px-3 text-zinc-300 font-medium">{exp.vendor}</td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-white">
                    {formatCurrency(exp.amount)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-zinc-400">
                    {exp.policyLimit ? formatCurrency(exp.policyLimit) : "None"}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded-full border uppercase bg-zinc-950 text-zinc-300 border-zinc-700 font-bold">
                      {exp.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right text-zinc-500 font-mono">
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
