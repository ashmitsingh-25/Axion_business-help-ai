"use client";

import { useState } from "react";
import {
  RotateCcw,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  RefreshCw,
  Package,
  User,
  Zap,
  Clock,
  Check,
  Info,
  ShieldAlert,
  Sliders,
  DollarSign,
  TrendingDown,
} from "lucide-react";
import { WorkflowStepper, StepItem } from "@/components/WorkflowStepper";
import { ReturnDecisionResponse } from "@/lib/types";
import { MOCK_ORDERS } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

export default function ReturnsPage() {
  const [orderId, setOrderId] = useState("ORD-88219");
  const [customerName, setCustomerName] = useState("Aarav Sharma");
  const [itemName, setItemName] = useState("Axion Velocity Pro Running Shoes (Cobalt Blue)");
  const [customerTier, setCustomerTier] = useState("VIP");
  const [itemCondition, setItemCondition] = useState("UNWORN_WITH_TAGS");
  const [returnFrequency, setReturnFrequency] = useState("FIRST_TIME");
  const [currentSize, setCurrentSize] = useState("UK 9");
  const [requestedResolution, setRequestedResolution] = useState("EXCHANGE");
  const [customerReason, setCustomerReason] = useState(
    "The shoe fits too tightly around the toe box (UK 9). I love the design and would prefer a half-size larger (UK 9.5) instead of a refund."
  );
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isDispatched, setIsDispatched] = useState(false);

  // Live client-side estimated risk preview
  const calculateLivePreviewRisk = () => {
    let score = 0.05;
    if (customerTier === "VIP") score -= 0.03;
    if (customerTier === "GOLD") score -= 0.01;
    if (customerTier === "HIGH_RISK") score += 0.55;
    if (itemCondition === "SLIGHTLY_USED") score += 0.20;
    if (itemCondition === "DEFECTIVE_DAMAGED") score += 0.35;
    if (returnFrequency === "OCCASIONAL") score += 0.12;
    if (returnFrequency === "FREQUENT_RETURNS") score += 0.30;
    return Number(Math.min(0.99, Math.max(0.02, score)).toFixed(2));
  };

  const liveRiskScore = calculateLivePreviewRisk();
  const liveRiskLevel =
    liveRiskScore < 0.2 ? "LOW" : liveRiskScore < 0.5 ? "MODERATE" : liveRiskScore < 0.75 ? "HIGH" : "CRITICAL";

  const [workflowSteps, setWorkflowSteps] = useState<StepItem[]>([
    { id: "1", title: "01. Intake", description: "Order & return reason", status: "complete" },
    { id: "2", title: "02. Risk Calculation", description: `Risk score: 0.05 (LOW)`, status: "complete" },
    { id: "3", title: "03. Policy Matching", description: "RAG exchange rules", status: "complete" },
    { id: "4", title: "04. Resolution", description: "1-Click size exchange", status: "complete" },
  ]);

  const [decisionResult, setDecisionResult] = useState<ReturnDecisionResponse | null>({
    decision: "approve",
    resolution: "exchange",
    confidence: 0.98,
    riskScore: 0.05,
    riskLevel: "LOW",
    riskBreakdown: [
      {
        factor: "Customer Lifetime Value & Tier",
        impact: "VIP Customer (-15% risk offset)",
        status: "SAFE",
        scoreDelta: -0.15,
      },
      {
        factor: "Product Condition & Tag Verification",
        impact: "Unworn with original tags verified",
        status: "SAFE",
        scoreDelta: 0.01,
      },
      {
        factor: "Historical Return Frequency",
        impact: "First-time return request (0.0x velocity)",
        status: "SAFE",
        scoreDelta: 0.01,
      },
    ],
    reasoning:
      "Customer Aarav Sharma (VIP Tier) reported fit friction with UK 9 running shoes. The item is verified unworn with original tags within the 30-day window. Multi-factor risk calculation is 0.05 (LOW RISK). Automated 1-click exchange for size UK 9.5 is approved with instant warehouse reservation to maximize retained GMV (₹6,499).",
    suggestedAlternative: "Axion Velocity Pro (UK 9.5) — 14 units available in Mumbai Hub",
    policyChecks: [
      "Customer Tier: VIP (Instant Zero-Friction Exchange Eligible)",
      "Condition: Unworn with tags attached (PASSED)",
      "Return Window: Day 9 of 30-day policy window (PASSED)",
      "Calculated Risk Score: 0.05 (LOW RISK)",
    ],
    customerTier: "VIP",
    orderNumber: "ORD-88219",
    itemTitle: "Axion Velocity Pro Running Shoes (Cobalt Blue)",
    retainedGmv: 6499,
    timelineEstimate: "Exchange order pre-dispatched. Zero-wait courier swap scheduled for tomorrow 10:00 AM.",
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleEvaluate = async (
    customOrderId?: string,
    customReason?: string,
    customItem?: string,
    customTier?: string,
    customCondition?: string,
    customFreq?: string,
    customSz?: string
  ) => {
    const targetOrderId = customOrderId || orderId;
    const targetReason = customReason || customerReason;
    const targetItem = customItem || itemName;
    const targetTier = customTier || customerTier;
    const targetCondition = customCondition || itemCondition;
    const targetFreq = customFreq || returnFrequency;
    const targetSize = customSz || currentSize;

    if (!targetOrderId.trim() || !targetReason.trim()) {
      showToast("Please enter both Order ID and Return Reason.");
      return;
    }

    setIsLoading(true);
    setIsDispatched(false);

    setWorkflowSteps([
      { id: "1", title: "01. Intake", description: `Parsing ${targetOrderId}`, status: "active" },
      { id: "2", title: "02. Risk Calculation", description: "Computing multi-factor risk...", status: "pending" },
      { id: "3", title: "03. Policy Matching", description: "Synthesizing resolution...", status: "pending" },
      { id: "4", title: "04. Resolution", description: "Awaiting decision...", status: "pending" },
    ]);

    try {
      const res = await fetch("/api/returns/decide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: targetOrderId,
          customerReason: targetReason,
          itemName: targetItem,
          customerTier: targetTier,
          itemCondition: targetCondition,
          returnFrequency: targetFreq,
          currentSize: targetSize,
          requestedResolution,
        }),
      });

      if (!res.ok) throw new Error("Failed to evaluate return request");

      const data: ReturnDecisionResponse = await res.json();
      setDecisionResult(data);

      setWorkflowSteps([
        { id: "1", title: "01. Intake", description: "Order parsed", status: "complete" },
        { id: "2", title: "02. Risk Calculation", description: `Risk: ${data.riskScore} (${data.riskLevel})`, status: "complete" },
        { id: "3", title: "03. Policy Matching", description: `Confidence: ${Math.round(data.confidence * 100)}%`, status: "complete" },
        { id: "4", title: "04. Resolution", description: `Verdict: ${data.resolution.toUpperCase()}`, status: "complete" },
      ]);

      showToast(`Evaluation Complete! Risk Score: ${data.riskScore} (${data.riskLevel})`);
    } catch (err: any) {
      console.error("Return evaluation error:", err);
      showToast("Evaluation error. Please check backend connection.");
    } finally {
      setIsLoading(false);
    }
  };

  const loadShoeExchangePreset = () => {
    setOrderId("ORD-88219");
    setCustomerName("Aarav Sharma");
    setItemName("Axion Velocity Pro Running Shoes (Cobalt Blue)");
    setCustomerTier("VIP");
    setItemCondition("UNWORN_WITH_TAGS");
    setReturnFrequency("FIRST_TIME");
    setCurrentSize("UK 9");
    setRequestedResolution("EXCHANGE");
    const reason =
      "The shoe fits too tightly around the toe box (UK 9). I love the design and would prefer a half-size larger (UK 9.5) instead of a refund.";
    setCustomerReason(reason);
    handleEvaluate(
      "ORD-88219",
      reason,
      "Axion Velocity Pro Running Shoes (Cobalt Blue)",
      "VIP",
      "UNWORN_WITH_TAGS",
      "FIRST_TIME",
      "UK 9"
    );
  };

  const loadHighRiskPreset = () => {
    setOrderId("ORD-99304");
    setCustomerName("Rajesh K.");
    setItemName("Apex ANC Pro Wireless Headphones");
    setCustomerTier("HIGH_RISK");
    setItemCondition("DEFECTIVE_DAMAGED");
    setReturnFrequency("FREQUENT_RETURNS");
    setCurrentSize("Standard");
    setRequestedResolution("REFUND");
    const reason =
      "Claiming item arrived broken without serial tags. Requesting immediate full cash refund.";
    setCustomerReason(reason);
    handleEvaluate(
      "ORD-99304",
      reason,
      "Apex ANC Pro Wireless Headphones",
      "HIGH_RISK",
      "DEFECTIVE_DAMAGED",
      "FREQUENT_RETURNS",
      "Standard"
    );
  };

  const loadDefectPreset = () => {
    setOrderId("ORD-91044");
    setCustomerName("Priya Sundaram");
    setItemName("Apex ANC Pro Wireless Headphones");
    setCustomerTier("GOLD");
    setItemCondition("SLIGHTLY_USED");
    setReturnFrequency("OCCASIONAL");
    setCurrentSize("Standard");
    setRequestedResolution("REPLACEMENT");
    const reason =
      "Right earbud audio cuts out intermittently when active noise cancellation is switched on. Requesting brand new replacement.";
    setCustomerReason(reason);
    handleEvaluate(
      "ORD-91044",
      reason,
      "Apex ANC Pro Wireless Headphones",
      "GOLD",
      "SLIGHTLY_USED",
      "OCCASIONAL",
      "Standard"
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Toast Notification */}
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
              Smart Returns & Exchange Copilot
            </h1>
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-bold">
              Multi-Factor Risk Engine
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Calculates customer tier risk, tag integrity, sizing anomalies, and automated 1-click exchanges
          </p>
        </div>

        {/* Quick Presets */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={loadShoeExchangePreset}
            className="px-3.5 py-2 rounded-xl bg-blue-600/15 hover:bg-blue-600/25 text-blue-400 border border-blue-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            <Zap className="w-3.5 h-3.5 text-blue-400" />
            <span>Preset: Low Risk Shoe Sizing (ORD-88219)</span>
          </button>
          <button
            type="button"
            onClick={loadHighRiskPreset}
            className="px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-850 text-zinc-300 border border-zinc-800 text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-zinc-400" />
            <span>Preset: High Risk Escalation</span>
          </button>
          <button
            type="button"
            onClick={loadDefectPreset}
            className="px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-850 text-zinc-300 border border-zinc-800 text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            <Package className="w-3.5 h-3.5 text-zinc-400" />
            <span>Preset: Hardware Defect</span>
          </button>
        </div>
      </div>

      {/* Interactive Workflow Stepper */}
      <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800">
        <div className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider mb-2 font-bold">
          Autonomous Multi-Agent Pipeline
        </div>
        <WorkflowStepper steps={workflowSteps} />
      </div>

      {/* Main Grid: Input Form with Live Risk Preview vs Detailed Evaluation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Return Request Intake Form (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-blue-400" />
                <h2 className="text-sm font-bold text-white">Return Request Intake Form</h2>
              </div>
              
              {/* Live Form Risk Indicator Badge */}
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-950 border border-zinc-800 text-[10px] font-mono">
                <span className="text-zinc-400">Est. Risk:</span>
                <span
                  className={`font-bold ${
                    liveRiskLevel === "LOW"
                      ? "text-blue-400"
                      : liveRiskLevel === "MODERATE"
                      ? "text-zinc-200"
                      : "text-zinc-100"
                  }`}
                >
                  {Math.round(liveRiskScore * 100)}% ({liveRiskLevel})
                </span>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleEvaluate();
              }}
              className="space-y-4 text-xs"
            >
              {/* Order ID & Customer Name */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 font-medium mb-1">
                    Order Number <span className="text-blue-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    placeholder="e.g. ORD-88219"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-white font-mono focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 font-medium mb-1">Customer Name</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Aarav Sharma"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Product Title & Current Size */}
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block text-zinc-400 font-medium mb-1">Product Name</label>
                  <input
                    type="text"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    placeholder="e.g. Axion Velocity Pro Shoes"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 font-medium mb-1">Current Size</label>
                  <select
                    value={currentSize}
                    onChange={(e) => setCurrentSize(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-2.5 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="UK 8">UK 8</option>
                    <option value="UK 8.5">UK 8.5</option>
                    <option value="UK 9">UK 9</option>
                    <option value="UK 9.5">UK 9.5</option>
                    <option value="UK 10">UK 10</option>
                    <option value="Standard">Standard / OS</option>
                  </select>
                </div>
              </div>

              {/* Customer Tier & Item Condition */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 font-medium mb-1">Customer Tier</label>
                  <select
                    value={customerTier}
                    onChange={(e) => setCustomerTier(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="VIP">VIP Tier (-15% Risk Offset)</option>
                    <option value="GOLD">Gold Tier (-5% Risk Offset)</option>
                    <option value="STANDARD">Standard Customer</option>
                    <option value="HIGH_RISK">High Risk (+58% Risk Flag)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-400 font-medium mb-1">Item Condition</label>
                  <select
                    value={itemCondition}
                    onChange={(e) => setItemCondition(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="UNWORN_WITH_TAGS">Unworn with tags (Verified)</option>
                    <option value="TRIED_ON_INDOORS">Tried on indoors</option>
                    <option value="SLIGHTLY_USED">Slightly used (+22% Risk)</option>
                    <option value="DEFECTIVE_DAMAGED">Damaged / Tag missing (+35% Risk)</option>
                  </select>
                </div>
              </div>

              {/* Historical Frequency & Desired Resolution */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 font-medium mb-1">Return Frequency</label>
                  <select
                    value={returnFrequency}
                    onChange={(e) => setReturnFrequency(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="FIRST_TIME">1st Return (0.0x Velocity)</option>
                    <option value="OCCASIONAL">Occasional Return (1 in 90d)</option>
                    <option value="FREQUENT_RETURNS">Frequent Returns (3+ in 60d)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-400 font-medium mb-1">Requested Resolution</label>
                  <select
                    value={requestedResolution}
                    onChange={(e) => setRequestedResolution(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="EXCHANGE">Size / Color Exchange</option>
                    <option value="REPLACEMENT">Replacement (Defect)</option>
                    <option value="STORE_CREDIT">Store Credit + 5% Bonus</option>
                    <option value="REFUND">Cash Refund</option>
                  </select>
                </div>
              </div>

              {/* Customer Reason / Feedback */}
              <div>
                <label className="block text-zinc-400 font-medium mb-1">
                  Customer Reason / Issue Description <span className="text-blue-400">*</span>
                </label>
                <textarea
                  rows={3}
                  value={customerReason}
                  onChange={(e) => setCustomerReason(e.target.value)}
                  placeholder="e.g. Too tight around the toe box, need a half size larger..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 leading-relaxed font-sans"
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25 transition-all disabled:opacity-50 active:scale-95"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Calculating Multi-Factor Risk & Policy...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5 text-blue-200" />
                      <span>Run Risk Engine & Claude Evaluation</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Seeded Database Orders Quick Selector */}
          <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 text-xs">
            <div className="text-[10px] font-mono uppercase text-zinc-400 tracking-wider mb-2 font-bold">
              Database Orders (Click to Load)
            </div>
            <div className="space-y-2">
              {MOCK_ORDERS.map((ord) => (
                <div
                  key={ord.id}
                  onClick={() => {
                    setOrderId(ord.orderNumber);
                    setCustomerName(ord.customerName);
                    setItemName(ord.items[0].title);
                    setCustomerTier(ord.customerTier);
                    showToast(`Loaded ${ord.orderNumber}`);
                  }}
                  className="p-3 rounded-xl bg-zinc-950/80 hover:bg-zinc-850 border border-zinc-800 cursor-pointer flex items-center justify-between transition-colors"
                >
                  <div>
                    <div className="font-mono font-bold text-white">{ord.orderNumber}</div>
                    <div className="text-[11px] text-zinc-400">{ord.items[0].title}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-zinc-200">{formatCurrency(ord.totalAmount)}</div>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      {ord.customerTier}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Multi-Factor Risk & Evaluation Engine Output (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {decisionResult ? (
            <div className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-700/80 shadow-2xl space-y-6">
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-zinc-800">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-blue-600/10 text-blue-400 border border-blue-500/20">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-zinc-400">Order:</span>
                      <span className="text-xs font-bold text-white font-mono">
                        {decisionResult.orderNumber}
                      </span>
                    </div>
                    <div className="text-sm font-bold text-white mt-0.5 font-sans">
                      {decisionResult.itemTitle}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-mono px-3 py-1 rounded-full border uppercase font-bold ${
                      decisionResult.decision === "approve"
                        ? "bg-blue-600/20 text-blue-300 border-blue-500/40"
                        : "bg-zinc-800 text-zinc-300 border-zinc-700"
                    }`}
                  >
                    Decision: {decisionResult.decision}
                  </span>
                  <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-zinc-950 text-white border border-zinc-700 uppercase font-bold">
                    Resolution: {decisionResult.resolution}
                  </span>
                </div>
              </div>

              {/* 📊 Multi-Factor Risk Calculation & Score Gauge */}
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-blue-400" />
                    <span className="text-xs font-bold text-white uppercase font-mono tracking-wider">
                      Calculated Risk & Fraud Assessment
                    </span>
                  </div>
                  <span className="text-xs font-mono font-extrabold text-blue-400">
                    Score: {decisionResult.riskScore} / 1.0 ({decisionResult.riskLevel} RISK)
                  </span>
                </div>

                {/* Progress Meter Bar */}
                <div className="w-full h-3 bg-zinc-900 rounded-full overflow-hidden p-0.5 border border-zinc-800">
                  <div
                    className="h-full rounded-full transition-all duration-500 bg-blue-600"
                    style={{ width: `${Math.min(100, Math.max(5, decisionResult.riskScore * 100))}%` }}
                  />
                </div>

                {/* Breakdown of Risk Drivers */}
                {decisionResult.riskBreakdown && decisionResult.riskBreakdown.length > 0 && (
                  <div className="pt-2 border-t border-zinc-850 space-y-1.5 text-xs">
                    {decisionResult.riskBreakdown.map((item, i) => (
                      <div key={i} className="flex items-center justify-between text-[11px]">
                        <span className="text-zinc-400">{item.factor}:</span>
                        <span className="font-mono text-zinc-200">{item.impact}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Key Metrics: Confidence, Retained GMV, Customer Tier */}
              <div className="grid grid-cols-3 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800">
                  <div className="text-[10px] text-zinc-400 uppercase font-mono">Agent Confidence</div>
                  <div className="text-base font-extrabold text-blue-400 mt-1">
                    {Math.round(decisionResult.confidence * 100)}%
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800">
                  <div className="text-[10px] text-zinc-400 uppercase font-mono">Retained GMV</div>
                  <div className="text-base font-extrabold text-white mt-1">
                    {formatCurrency(decisionResult.retainedGmv || 6499)}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800">
                  <div className="text-[10px] text-zinc-400 uppercase font-mono">Customer Tier</div>
                  <div className="text-base font-extrabold text-white mt-1">
                    {decisionResult.customerTier}
                  </div>
                </div>
              </div>

              {/* Recommended Action / Suggested Alternative */}
              {decisionResult.suggestedAlternative && (
                <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-500/30 space-y-1">
                  <div className="text-[10px] uppercase font-mono text-blue-300 font-bold flex items-center justify-between">
                    <span>Automated Sizing Alternative Reserved</span>
                    <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                  </div>
                  <div className="text-sm font-bold text-white">
                    {decisionResult.suggestedAlternative}
                  </div>
                  <div className="text-xs text-zinc-300 mt-1 font-sans">
                    {decisionResult.timelineEstimate}
                  </div>
                </div>
              )}

              {/* Agent Reasoning */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                  <span>Claude 3.5 Agent Reasoning</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed p-4 rounded-xl bg-zinc-950 border border-zinc-800 font-sans">
                  {decisionResult.reasoning}
                </p>
              </div>

              {/* Policy Checks Matrix */}
              <div className="space-y-2">
                <div className="text-[11px] font-mono text-zinc-400 uppercase font-bold">
                  Verified Policy Rules (RAG Grounded)
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {decisionResult.policyChecks.map((check, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center gap-2 text-[11px] text-zinc-300"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                      <span>{check}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Action Button */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-zinc-800">
                <span className="text-[11px] text-zinc-400 font-mono">
                  Autonomous ERP Swap Ready
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setIsDispatched(true);
                    showToast(`Exchange for ${decisionResult.orderNumber} dispatched to Logistics ERP!`);
                  }}
                  className={`px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                    isDispatched
                      ? "bg-zinc-800 text-zinc-200 border border-zinc-700"
                      : "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/25 active:scale-95"
                  }`}
                >
                  {isDispatched ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-blue-400" />
                      <span>Exchange Dispatched to Logistics ERP</span>
                    </>
                  ) : (
                    <>
                      <span>Confirm & Dispatch Exchange</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="p-12 rounded-2xl bg-zinc-900/40 border border-dashed border-zinc-800 text-center space-y-3">
              <RotateCcw className="w-8 h-8 text-zinc-600 mx-auto" />
              <div className="text-sm font-bold text-zinc-400">No Return Request Evaluated Yet</div>
              <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                Submit an order return on the left or click a preset to see the multi-factor risk engine and Claude reasoning agent in action.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
