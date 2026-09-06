import Link from "next/link";
import {
  Layers,
  ArrowRight,
  RotateCcw,
  Boxes,
  Receipt,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Database,
  Cpu,
  Zap,
  Activity,
  BarChart3,
  Bot,
  Flame,
  Search,
} from "lucide-react";
import { ModuleCard } from "@/components/ModuleCard";
import { PricingCard } from "@/components/PricingCard";

export default function LandingPage() {
  const impactMetrics = [
    {
      domain: "Customer Experience",
      traditional: "Manual 48-hr email return reviews, high friction & customer churn",
      axion: "Instant 1-click size exchange & VIP auto-approval with 85% GMV retention",
      gain: "+34% Retained GMV",
    },
    {
      domain: "Inventory & Supply",
      traditional: "Siloed spreadsheets, stockout surprises & delayed sea-freight orders",
      axion: "Real-time velocity projection & automated Supplier A vs B tradeoff routing",
      gain: "0 Stockout Days on High-Velocity SKUs",
    },
    {
      domain: "Finance & Expenses",
      traditional: "Sample-based manual audits missing 60% of policy limit overruns",
      axion: "100% automated receipt audit against RAG corporate policy limits",
      gain: "₹4.8L+ Saved / Quarter",
    },
    {
      domain: "Cross-Dept Operations",
      traditional: "Disconnected ticket queues and delayed cross-team handoffs",
      axion: "Shared multi-agent reasoning layer across inventory, sales & logistics",
      gain: "10x Faster Operational Response",
    },
    {
      domain: "Executive Management",
      traditional: "Static backwards-looking monthly slide decks with no root causes",
      axion: "Natural language Copilot with 5-stage Detect → Investigate → Alert reasoning",
      gain: "Real-Time Telemetry Visibility",
    },
    {
      domain: "Risk & Compliance",
      traditional: "Reactive firefighting after catastrophic supply chain failures",
      axion: "Autonomous cross-department live risk detector and early warnings",
      gain: "14-Day Advance Threat Horizon",
    },
    {
      domain: "Dynamic Pricing",
      traditional: "Fixed static margins regardless of competitor movements or elasticity",
      axion: "Continuous elasticity calibration optimizing revenue & gross margin",
      gain: "+8.1% Net Margin Calibration",
    },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* ── HERO SECTION ────────────────────────────────────────────── */}
      <section className="relative pt-12 pb-24 lg:pt-20 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="font-semibold text-white">Autonomous Business Operations</span>
              <span className="text-zinc-600">•</span>
              <span className="text-zinc-400 font-mono">Claude 3.5 Agent Layer</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white font-sans leading-[1.1]">
              Axion — Intelligent Business Operations &{" "}
              <span className="text-blue-500">
                Decision Platform
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg lg:text-xl text-zinc-300 max-w-2xl mx-auto leading-relaxed font-normal">
              Businesses have data, but decisions are still manual. Axion replaces disconnected silos with a single autonomous decision layer.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/dashboard"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/25 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Try the Live Demo</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/insights"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-750 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span>Ask Business Copilot</span>
              </Link>
            </div>
          </div>

          {/* ── FLOW VISUAL: From Data → Intelligence → Action ─────────────── */}
          <div className="mt-16 sm:mt-24 max-w-5xl mx-auto">
            <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800 backdrop-blur-xl shadow-2xl relative">
              <div className="text-center mb-6">
                <div className="text-xs font-mono font-bold tracking-widest text-blue-400 uppercase">
                  THE AXION ARCHITECTURE
                </div>
                <div className="text-xl sm:text-2xl font-extrabold text-white mt-1 font-sans">
                  From Data → Intelligence → Action
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                {/* 1. DATA */}
                <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col justify-between hover:border-zinc-700 transition-colors">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300">
                        <Database className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800 font-bold">
                        STAGE 01
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white">01. Live Enterprise Data</h3>
                    <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                      Continuous telemetry ingestion from ERPs, order catalogs, sales channels, logistics APIs, and corporate travel claims.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-zinc-850 text-[11px] text-zinc-400 font-mono">
                    PostgreSQL • Prisma ORM • Real-Time Stream
                  </div>
                </div>

                {/* 2. INTELLIGENCE */}
                <div className="p-5 rounded-2xl bg-blue-950/20 border border-blue-500/30 flex flex-col justify-between relative shadow-lg">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2.5 rounded-xl bg-blue-600/15 border border-blue-500/25 text-blue-400">
                        <Cpu className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20 font-bold">
                        STAGE 02
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white">02. Multi-Agent Intelligence</h3>
                    <p className="text-xs text-zinc-300 mt-2 leading-relaxed">
                      Claude 3.5 reasoning, RAG corporate policy retrieval, and demand velocity algorithms analyze cross-department root causes.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-blue-900/40 text-[11px] text-blue-300 font-mono">
                    Claude SDK • RAG Engine • Forecast Trends
                  </div>
                </div>

                {/* 3. ACTION */}
                <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col justify-between hover:border-zinc-700 transition-colors">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300">
                        <Zap className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800 font-bold">
                        STAGE 03
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white">03. Deterministic Action</h3>
                    <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                      Instant 1-click shoe exchanges, automated Supplier B purchase orders, expense cap flags, and dynamic price adjustments.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-zinc-850 text-[11px] text-zinc-400 font-mono">
                    Serverless API Routes • Automated Workflows
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CORE FOCUS AREAS STRIP ──────────────────────────────────── */}
      <section className="border-y border-zinc-800/80 bg-zinc-950 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <div className="text-xs font-mono text-blue-400 uppercase tracking-wider font-bold">
                Multi-Agent Workflows
              </div>
              <div className="text-sm font-bold text-white">Autonomous Cross-Dept Routing</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider font-bold">
                Enterprise RAG Retrieval
              </div>
              <div className="text-sm font-bold text-white">Policy Documents & Sizing Rules</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs font-mono text-blue-400 uppercase tracking-wider font-bold">
                Predictive Forecasting
              </div>
              <div className="text-sm font-bold text-white">Days-to-Stockout & Supplier Matrix</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider font-bold">
                Workspace Automation
              </div>
              <div className="text-sm font-bold text-white">Contextual ERP & POS Actions</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROBLEM VS SOLUTION SECTION ─────────────────────────────── */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: The Problem */}
          <div className="p-8 rounded-3xl bg-zinc-900/60 border border-zinc-800 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700 text-xs font-semibold">
              <XCircle className="w-3.5 h-3.5 text-zinc-400" />
              <span>The Operational Reality</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-sans">
              Data Everywhere, Decisions Still Manual
            </h2>
            <p className="text-sm text-zinc-300 leading-relaxed">
              Enterprises collect vast telemetry, yet operational actions remain fragmented in manual departmental queues:
            </p>
            <ul className="space-y-3 text-xs text-zinc-300">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 mt-1.5 flex-shrink-0" />
                <span>
                  <strong>Returns:</strong> Customer support manually reviews sizing tickets, issuing refunds instead of retaining GMV with automated size exchanges.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 mt-1.5 flex-shrink-0" />
                <span>
                  <strong>Inventory:</strong> Procurement discovers stockouts too late, with slow 14-day suppliers creating weeks of lost sales.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 mt-1.5 flex-shrink-0" />
                <span>
                  <strong>Expenses:</strong> Finance samples 10% of claims, missing hotel overruns (₹18,400 vs ₹12,000 limit) and duplicate invoices.
                </span>
              </li>
            </ul>
          </div>

          {/* Right: The Solution */}
          <div className="p-8 rounded-3xl bg-zinc-900 border border-blue-500/30 space-y-6 shadow-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/15 text-blue-400 border border-blue-500/30 text-xs font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>The Axion Solution</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-sans">
              One Shared Autonomous Decision Layer
            </h2>
            <p className="text-sm text-zinc-300 leading-relaxed">
              Axion unifies returns, inventory, finance, and executive intelligence onto a single agentic platform that autonomously reasons and acts:
            </p>
            <ul className="space-y-3 text-xs text-zinc-300">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                <span>
                  <strong>Unified Policy Engine:</strong> RAG-grounded corporate policies enforce consistent logic across all workflows without manual review.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                <span>
                  <strong>Cross-Department Telemetry:</strong> An inventory delay automatically alerts returns agents and updates promises in real time.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                <span>
                  <strong>Instant Business Copilot:</strong> Ask "Why did sales fall this month?" and receive structured 5-stage root cause investigations.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── THREE CORE MODULE SHOWCASES ─────────────────────────────── */}
      <section className="py-20 bg-zinc-950 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="text-xs font-mono uppercase text-blue-400 tracking-wider font-bold">
              ENTERPRISE MODULES
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-sans">
              Purpose-Built Autonomous Engines
            </h2>
            <p className="text-sm text-zinc-400">
              Each module is powered by dedicated Claude reasoning agents and real serverless Next.js route handlers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 1. Returns Module */}
            <ModuleCard
              title="Smart Returns & Exchange"
              subtitle="Revenue-Retaining Return Agent"
              badge="Returns Copilot"
              icon={RotateCcw}
              href="/returns"
              workflow={[
                { label: "01. Intake", detail: "Order & Sizing Reason" },
                { label: "02. Policy Check", detail: "VIP & Condition RAG" },
                { label: "03. Decision", detail: "1-Click Size Exchange" },
              ]}
              exampleInteraction={{
                inputLabel: "Shoe Return Request (Order ORD-88219)",
                inputText: "Axion Velocity Pro UK 9: Too tight around the toe box. Requesting return.",
                outputLabel: "Claude Agent Recommendation",
                outputText: "Approved: Auto-dispatched replacement in UK 9.5. Courier pickup scheduled. Retained GMV: ₹6,499.",
                tagText: "EXCHANGE (98% Conf)",
              }}
            />

            {/* 2. Inventory Module */}
            <ModuleCard
              title="Demand & Inventory Copilot"
              subtitle="Stockout Prevention & Supplier Matrix"
              badge="Inventory Copilot"
              icon={Boxes}
              href="/inventory"
              workflow={[
                { label: "01. Velocity", detail: "20 units/day Rate" },
                { label: "02. Forecast", detail: "Stockout in 9 Days" },
                { label: "03. Supplier", detail: "Order from Supplier B" },
              ]}
              exampleInteraction={{
                inputLabel: "SKU-409 Velocity Warning",
                inputText: "Apex ANC Headphones has 180 units in stock with accelerating daily demand.",
                outputLabel: "Automated Reorder Decision",
                outputText: "Stockout in 9 days. Supplier A (14d lead time) will fail. Reorder 350 units from Supplier B (4d lead time).",
                tagText: "SUPPLIER B (4-Day)",
              }}
            />

            {/* 3. Expenses Module */}
            <ModuleCard
              title="AI Expense Auditor"
              subtitle="Automated Policy & Limit Compliance"
              badge="Expense Auditor"
              icon={Receipt}
              href="/expenses"
              workflow={[
                { label: "01. Receipt", detail: "Vendor & Amount" },
                { label: "02. RAG Match", detail: "Tier-1 Metro Policy" },
                { label: "03. Audit Flag", detail: "Variance Escalation" },
              ]}
              exampleInteraction={{
                inputLabel: "Hotel Receipt Claim (Mumbai Travel)",
                inputText: "Grand Hyatt Mumbai: ₹18,400 claimed for 1-night Senior Executive stay.",
                outputLabel: "Policy Audit Finding",
                outputText: "Hotel expense ₹18,400 vs ₹12,000 corporate ceiling → Flagged ₹6,400 overrun for exception review.",
                tagText: "FLAGGED (Policy Cap)",
              }}
            />
          </div>
        </div>
      </section>

      {/* ── BUSINESS INTELLIGENCE LAYER ─────────────────────────────── */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="text-xs font-mono uppercase text-blue-400 tracking-wider font-bold">
            EXECUTIVE INTELLIGENCE
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-sans">
            Business Intelligence & Synthesis Layer
          </h2>
          <p className="text-sm text-zinc-400">
            Three unified capabilities connecting all operational silos into strategic clarity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 1. Decision Copilot */}
          <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4 hover:border-zinc-700 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-blue-600/15 text-blue-400 border border-blue-500/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Decision Copilot</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Multi-agent natural language copilot following structured 5-stage synthesis: Detect → Investigate → Assess → Recommend → Alert.
            </p>
            <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 text-[11px] font-mono text-zinc-300">
              "Why did sales fall this month?" → Telemetry reveals SKU-409 stockout + footwear sizing friction.
            </div>
          </div>

          {/* 2. Risk Detector */}
          <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4 hover:border-zinc-700 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-zinc-800 text-zinc-200 border border-zinc-700 flex items-center justify-center">
              <Flame className="w-5 h-5 text-zinc-300" />
            </div>
            <h3 className="text-lg font-bold text-white">Live Risk Detector</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Continuous threat scanner scoring and ranking stockout risks, return velocity spikes, and expense overrun clusters.
            </p>
            <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 text-[11px] font-mono text-zinc-300">
              "Critical: SKU-409 stockout in 9 days. High: 3 Mumbai hotel claims exceed ₹12k limit."
            </div>
          </div>

          {/* 3. Pricing Optimizer */}
          <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4 hover:border-zinc-700 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-blue-600/15 text-blue-400 border border-blue-500/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Pricing Optimizer</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Dynamic price calibration analyzing price elasticity curves and competitor benchmarks to project net margin gains.
            </p>
            <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 text-[11px] font-mono text-zinc-300">
              "Current ₹12,999 → Recommended ₹13,999 (+₹1,82,000/mo margin with low elasticity)."
            </div>
          </div>
        </div>

        {/* Live Interactive Pricing Card Preview */}
        <div className="mt-12 max-w-2xl mx-auto">
          <PricingCard />
        </div>
      </section>

      {/* ── IMPACT COMPARISON TABLE ─────────────────────────────────── */}
      <section className="py-20 bg-zinc-950 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <div className="text-xs font-mono uppercase text-blue-400 tracking-wider font-bold">
              ENTERPRISE VALUE
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-sans">
              Measurable Cross-Department Impact
            </h2>
            <p className="text-sm text-zinc-400">
              How Axion transforms operational performance across key business functions.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-zinc-800 text-[11px] font-mono uppercase text-zinc-400">
                  <th className="py-4 px-4">Business Domain</th>
                  <th className="py-4 px-4">Traditional Siloed Approach</th>
                  <th className="py-4 px-4 text-white">Axion Intelligent Platform</th>
                  <th className="py-4 px-4 text-right text-blue-400">Net Impact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 text-xs">
                {impactMetrics.map((metric, idx) => (
                  <tr key={idx} className="hover:bg-zinc-900/40 transition-colors">
                    <td className="py-4 px-4 font-bold text-white">{metric.domain}</td>
                    <td className="py-4 px-4 text-zinc-400">{metric.traditional}</td>
                    <td className="py-4 px-4 text-zinc-200 font-medium">{metric.axion}</td>
                    <td className="py-4 px-4 text-right font-extrabold text-blue-400">
                      {metric.gain}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* CTA Box */}
          <div className="mt-16 p-8 sm:p-12 rounded-3xl bg-zinc-900 border border-zinc-800 text-center space-y-6 shadow-xl relative overflow-hidden">
            <div className="relative z-10 space-y-3 max-w-2xl mx-auto">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-sans">
                Ready to Experience Axion in Action?
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                Explore the live operations console with seeded multi-department retail and enterprise data.
              </p>
              <div className="pt-2">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/25 transition-all active:scale-95"
                >
                  <span>Launch Live Demo Console</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
