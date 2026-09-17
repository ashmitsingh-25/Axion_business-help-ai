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
  Shield,
  DollarSign,
  Lock,
} from "lucide-react";
import { ModuleCard } from "@/components/ModuleCard";
import { PricingCard } from "@/components/PricingCard";

export default function LandingPage() {
  const impactMetrics = [
    {
      domain: "Cybersecurity & Financial Risk",
      traditional: "Vague Low/Medium/High labels, siloed CVE queues & unquantified liabilities",
      axion: "Real-time Expected Annual Loss (EAL), financial cyber exposure & 0/1 Knapsack spend optimization",
      gain: "₹1.4 Cr Risk Reduction Opportunity",
    },
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
      axion: "Shared multi-agent reasoning layer across inventory, sales, logistics & cyber",
      gain: "10x Faster Operational Response",
    },
    {
      domain: "Executive Management",
      traditional: "Static backwards-looking monthly slide decks with no root causes",
      axion: "Natural language Copilot with 5-stage Detect → Investigate → Alert reasoning",
      gain: "Real-Time Telemetry Visibility",
    },
    {
      domain: "Compliance & Governance",
      traditional: "Manual annual audit spreadsheets with missing evidence logs",
      axion: "Continuous automated control mapping to NIST, ISO 27001, CIS, RBI & SEBI",
      gain: "100% Audit-Ready Evidence",
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
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-ocean-900/80 border border-ocean-400/30 text-xs text-ocean-200 shadow-ocean-glow backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-ocean-400 animate-pulse" />
              <span className="font-semibold text-ocean-100">Autonomous Decision & Cyber Risk Platform</span>
              <span className="text-ocean-500">•</span>
              <span className="text-ocean-300/70 font-mono">Claude 3.5 Sonnet</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white font-sans leading-[1.1]">
              Axion — Intelligent Operations, Cyber Risk &{" "}
              <span className="bg-gradient-to-r from-ocean-200 via-ocean-300 to-ocean-400 bg-clip-text text-transparent">
                Investment Optimization
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg lg:text-xl text-ocean-100/90 max-w-3xl mx-auto leading-relaxed font-normal">
              From Data → Intelligence → Action → Optimized Investment. Axion unifies business operations, cybersecurity telemetry, and financial risk quantification into a single autonomous decision layer.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/dashboard"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-ocean-400 hover:bg-ocean-300 text-ocean-950 font-bold text-sm shadow-ocean-glow transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Launch Live Console</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/cyber-risk"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-ocean-900/60 hover:bg-ocean-800/80 border border-ocean-400/30 text-ocean-100 font-semibold text-sm backdrop-blur-md transition-all flex items-center justify-center gap-2"
              >
                <Shield className="w-4 h-4 text-ocean-400" />
                <span>Explore Cyber Risk</span>
              </Link>
            </div>
          </div>

          {/* ── FLOW VISUAL: From Data → Intelligence → Action → Optimized Investment ── */}
          <div className="mt-16 sm:mt-24 max-w-5xl mx-auto">
            <div className="p-6 sm:p-8 rounded-3xl bg-ocean-900/50 border border-ocean-400/20 backdrop-blur-2xl shadow-ocean-card relative">
              <div className="text-center mb-6">
                <div className="text-xs font-mono font-bold tracking-widest text-ocean-300 uppercase">
                  THE AXION ARCHITECTURE
                </div>
                <div className="text-xl sm:text-2xl font-extrabold text-ocean-100 mt-1 font-sans">
                  From Data → Intelligence → Action → Optimized Investment
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                {/* 1. DATA */}
                <div className="p-5 rounded-2xl bg-ocean-950/70 border border-ocean-300/15 flex flex-col justify-between hover:border-ocean-400/40 transition-colors">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2.5 rounded-xl bg-ocean-500/10 border border-ocean-400/20 text-ocean-300">
                        <Database className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-ocean-500/10 text-ocean-300 border border-ocean-400/20 font-bold">
                        STAGE 01
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-ocean-100">01. Live Business & Cyber Telemetry</h3>
                    <p className="text-xs text-ocean-200/70 mt-2 leading-relaxed">
                      Continuous telemetry ingestion from ERPs, order catalogs, sales channels, SIEM, EDR, IAM, CSPM, and Threat Intelligence.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-ocean-300/10 text-[11px] text-ocean-300/60 font-mono">
                    PostgreSQL • Prisma ORM • Real-Time Stream
                  </div>
                </div>

                {/* 2. INTELLIGENCE */}
                <div className="p-5 rounded-2xl bg-ocean-500/15 border border-ocean-400/40 flex flex-col justify-between relative shadow-ocean-glow">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2.5 rounded-xl bg-ocean-400/20 border border-ocean-400/40 text-ocean-200">
                        <Cpu className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-ocean-400/20 text-ocean-200 border border-ocean-400/40 font-bold">
                        STAGE 02
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-ocean-100">02. Financial Quantification & AI</h3>
                    <p className="text-xs text-ocean-100/90 mt-2 leading-relaxed">
                      Claude 3.5 reasoning, Expected Annual Loss (EAL) calculation, Knapsack dynamic programming, and RAG policy retrieval.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-ocean-400/20 text-[11px] text-ocean-200 font-mono">
                    Claude SDK • EAL Engine • Knapsack Solver
                  </div>
                </div>

                {/* 3. ACTION & OPTIMIZATION */}
                <div className="p-5 rounded-2xl bg-ocean-950/70 border border-ocean-300/15 flex flex-col justify-between hover:border-ocean-400/40 transition-colors">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2.5 rounded-xl bg-ocean-500/10 border border-ocean-400/20 text-ocean-300">
                        <Zap className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-ocean-500/10 text-ocean-300 border border-ocean-400/20 font-bold">
                        STAGE 03
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-ocean-100">03. Action & Optimized Spend</h3>
                    <p className="text-xs text-ocean-200/70 mt-2 leading-relaxed">
                      1-click size exchanges, automated purchase orders, hotfix patch deployments, and budget-optimized security portfolios.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-ocean-300/10 text-[11px] text-ocean-300/60 font-mono">
                    Serverless API Routes • Automated Workflows
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CYBER RISK → BUSINESS IMPACT HIGHLIGHT SECTION ─────────── */}
      <section className="py-16 bg-ocean-950/60 border-y border-ocean-300/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
            <div className="text-xs font-mono uppercase text-ocean-400 tracking-wider font-bold">
              QUANTIFIED RISK INTELLIGENCE
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-ocean-100 font-sans">
              Cyber Risk → Business Impact → Optimized Investment
            </h2>
            <p className="text-xs text-ocean-200/70">
              Transform raw technical vulnerabilities into financial exposure, actionable remediation, and optimal budget allocation.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-5 rounded-2xl bg-ocean-900/50 border border-ocean-400/20 backdrop-blur-xl space-y-1 shadow-ocean-card">
              <div className="text-xs font-mono text-ocean-300/80 font-bold">Financial Exposure Analyzed</div>
              <div className="text-2xl font-extrabold text-ocean-100 font-mono">₹3.8 Cr</div>
              <div className="text-[10px] text-ocean-300/50 font-mono">Simulated Demo Value</div>
            </div>

            <div className="p-5 rounded-2xl bg-ocean-900/50 border border-ocean-400/20 backdrop-blur-xl space-y-1 shadow-ocean-card">
              <div className="text-xs font-mono text-ocean-300/80 font-bold">Assets Monitored</div>
              <div className="text-2xl font-extrabold text-ocean-300 font-mono">1,250+</div>
              <div className="text-[10px] text-ocean-300/50 font-mono">18 Critical Tier</div>
            </div>

            <div className="p-5 rounded-2xl bg-ocean-900/50 border border-ocean-400/20 backdrop-blur-xl space-y-1 shadow-ocean-card">
              <div className="text-xs font-mono text-ocean-300/80 font-bold">Control Effectiveness</div>
              <div className="text-2xl font-extrabold text-emerald-400 font-mono">74%</div>
              <div className="text-[10px] text-ocean-300/50 font-mono">NIST & ISO Grounded</div>
            </div>

            <div className="p-5 rounded-2xl bg-ocean-900/50 border border-ocean-400/20 backdrop-blur-xl space-y-1 shadow-ocean-card">
              <div className="text-xs font-mono text-ocean-300/80 font-bold">Risk Reduction Opportunity</div>
              <div className="text-2xl font-extrabold text-purple-300 font-mono">₹1.4 Cr</div>
              <div className="text-[10px] text-ocean-300/50 font-mono">ROSI-Optimized Portfolio</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CORE FOCUS AREAS STRIP ──────────────────────────────────── */}
      <section className="border-y border-ocean-300/10 bg-ocean-950/70 backdrop-blur-md py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <div className="text-xs font-mono text-ocean-300 uppercase tracking-wider font-bold">
                Multi-Agent Workflows
              </div>
              <div className="text-sm font-bold text-ocean-100">Autonomous Cross-Dept Routing</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs font-mono text-ocean-300 uppercase tracking-wider font-bold">
                Enterprise RAG Retrieval
              </div>
              <div className="text-sm font-bold text-ocean-100">Policy Documents & Sizing Rules</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs font-mono text-ocean-300 uppercase tracking-wider font-bold">
                Predictive Forecasting
              </div>
              <div className="text-sm font-bold text-ocean-100">Days-to-Stockout & Supplier Matrix</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs font-mono text-ocean-300 uppercase tracking-wider font-bold">
                Workspace Automation
              </div>
              <div className="text-sm font-bold text-ocean-100">Contextual ERP & POS Actions</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROBLEM VS SOLUTION SECTION ─────────────────────────────── */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: The Problem */}
          <div className="p-8 rounded-3xl bg-ocean-900/50 border border-ocean-400/20 backdrop-blur-xl space-y-6 shadow-ocean-card">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ocean-500/10 text-ocean-300 border border-ocean-400/20 text-xs font-semibold">
              <XCircle className="w-3.5 h-3.5 text-ocean-400" />
              <span>The Operational Reality</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-ocean-100 font-sans">
              Data Everywhere, Decisions Still Manual
            </h2>
            <p className="text-sm text-ocean-200/80 leading-relaxed">
              Enterprises collect vast telemetry, yet operational actions remain fragmented in manual departmental queues:
            </p>
            <ul className="space-y-3 text-xs text-ocean-200/80">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-ocean-400 mt-1.5 flex-shrink-0" />
                <span>
                  <strong className="text-ocean-100">Returns:</strong> Customer support manually reviews sizing tickets, issuing refunds instead of retaining GMV with automated size exchanges.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-ocean-400 mt-1.5 flex-shrink-0" />
                <span>
                  <strong className="text-ocean-100">Inventory:</strong> Procurement discovers stockouts too late, with slow 14-day suppliers creating weeks of lost sales.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-ocean-400 mt-1.5 flex-shrink-0" />
                <span>
                  <strong className="text-ocean-100">Expenses:</strong> Finance samples 10% of claims, missing hotel overruns (₹18,400 vs ₹12,000 limit) and duplicate invoices.
                </span>
              </li>
            </ul>
          </div>

          {/* Right: The Solution */}
          <div className="p-8 rounded-3xl bg-ocean-900/60 border border-ocean-400/30 backdrop-blur-2xl space-y-6 shadow-ocean-glow">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ocean-400/20 text-ocean-200 border border-ocean-400/30 text-xs font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 text-ocean-300" />
              <span>The Axion Solution</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-ocean-100 font-sans">
              One Shared Autonomous Decision Layer
            </h2>
            <p className="text-sm text-ocean-200/90 leading-relaxed">
              Axion unifies returns, inventory, finance, and executive intelligence onto a single agentic platform that autonomously reasons and acts:
            </p>
            <ul className="space-y-3 text-xs text-ocean-200/90">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-ocean-400 mt-1.5 flex-shrink-0" />
                <span>
                  <strong className="text-ocean-100">Unified Policy Engine:</strong> RAG-grounded corporate policies enforce consistent logic across all workflows without manual review.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-ocean-400 mt-1.5 flex-shrink-0" />
                <span>
                  <strong className="text-ocean-100">Cross-Department Telemetry:</strong> An inventory delay automatically alerts returns agents and updates promises in real time.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-ocean-400 mt-1.5 flex-shrink-0" />
                <span>
                  <strong className="text-ocean-100">Instant Business Copilot:</strong> Ask "Why did sales fall this month?" and receive structured 5-stage root cause investigations.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── THREE CORE MODULE SHOWCASES ─────────────────────────────── */}
      <section className="py-20 bg-ocean-950/60 border-t border-ocean-300/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="text-xs font-mono uppercase text-ocean-300 tracking-wider font-bold">
              ENTERPRISE MODULES
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ocean-100 font-sans">
              Purpose-Built Autonomous Engines
            </h2>
            <p className="text-sm text-ocean-200/70">
              Each module is powered by dedicated Claude reasoning agents and real serverless Next.js route handlers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 1. Cyber Risk Module */}
            <ModuleCard
              title="Cyber Risk Intelligence"
              subtitle="Financial Loss & Spend Optimizer"
              badge="Cyber Copilot"
              icon={Shield}
              href="/cyber-risk"
              workflow={[
                { label: "01. Telemetry", detail: "SIEM & CVE Ingestion" },
                { label: "02. Quantify", detail: "Expected Loss (₹2.1Cr)" },
                { label: "03. Optimize", detail: "0/1 Knapsack Allocation" },
              ]}
              exampleInteraction={{
                inputLabel: "Payment DB Risk Warning (CVE-2024-3094)",
                inputText: "Payment Gateway DB Cluster has CVSS 10.0 exploit exposure on unsegmented subnet.",
                outputLabel: "Quantified Financial Decision",
                outputText: "Annual Loss Exposure: ₹42L. Mandated emergency patch + FIDO2 hardware MFA. Avoided loss: ₹42L (ROSI: 600%).",
                tagText: "EAL ₹42L (OPTIMIZED)",
              }}
            />

            {/* 2. Returns Module */}
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

            {/* 3. Inventory Module */}
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

            {/* 4. Expenses Module */}
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
          <div className="text-xs font-mono uppercase text-ocean-300 tracking-wider font-bold">
            EXECUTIVE INTELLIGENCE
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-ocean-100 font-sans">
            Business Intelligence & Synthesis Layer
          </h2>
          <p className="text-sm text-ocean-200/70">
            Three unified capabilities connecting all operational silos into strategic clarity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 1. Decision Copilot */}
          <div className="p-6 rounded-2xl bg-ocean-900/50 border border-ocean-400/20 backdrop-blur-2xl space-y-4 hover:border-ocean-400/40 transition-colors shadow-ocean-card">
            <div className="w-10 h-10 rounded-xl bg-ocean-500/10 text-ocean-300 border border-ocean-400/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-ocean-100">Decision Copilot</h3>
            <p className="text-xs text-ocean-200/70 leading-relaxed">
              Multi-agent natural language copilot following structured 5-stage synthesis: Detect → Investigate → Assess → Recommend → Alert.
            </p>
            <div className="p-3.5 rounded-xl bg-ocean-950/70 border border-ocean-300/15 text-[11px] font-mono text-ocean-200">
              "Why did sales fall this month?" → Telemetry reveals SKU-409 stockout + footwear sizing friction.
            </div>
          </div>

          {/* 2. Risk Detector */}
          <div className="p-6 rounded-2xl bg-ocean-900/50 border border-ocean-400/20 backdrop-blur-2xl space-y-4 hover:border-ocean-400/40 transition-colors shadow-ocean-card">
            <div className="w-10 h-10 rounded-xl bg-ocean-500/10 text-ocean-300 border border-ocean-400/20 flex items-center justify-center">
              <Flame className="w-5 h-5 text-ocean-300" />
            </div>
            <h3 className="text-lg font-bold text-ocean-100">Live Risk Detector</h3>
            <p className="text-xs text-ocean-200/70 leading-relaxed">
              Continuous threat scanner scoring and ranking stockout risks, return velocity spikes, and expense overrun clusters.
            </p>
            <div className="p-3.5 rounded-xl bg-ocean-950/70 border border-ocean-300/15 text-[11px] font-mono text-ocean-200">
              "Critical: SKU-409 stockout in 9 days. High: 3 Mumbai hotel claims exceed ₹12k limit."
            </div>
          </div>

          {/* 3. Pricing Optimizer */}
          <div className="p-6 rounded-2xl bg-ocean-900/50 border border-ocean-400/20 backdrop-blur-2xl space-y-4 hover:border-ocean-400/40 transition-colors shadow-ocean-card">
            <div className="w-10 h-10 rounded-xl bg-ocean-500/10 text-ocean-300 border border-ocean-400/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-ocean-100">Pricing Optimizer</h3>
            <p className="text-xs text-ocean-200/70 leading-relaxed">
              Dynamic price calibration analyzing price elasticity curves and competitor benchmarks to project net margin gains.
            </p>
            <div className="p-3.5 rounded-xl bg-ocean-950/70 border border-ocean-300/15 text-[11px] font-mono text-ocean-200">
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
      <section className="py-20 bg-ocean-950/60 border-t border-ocean-300/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <div className="text-xs font-mono uppercase text-ocean-300 tracking-wider font-bold">
              ENTERPRISE VALUE
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ocean-100 font-sans">
              Measurable Cross-Department Impact
            </h2>
            <p className="text-sm text-ocean-200/70">
              How Axion transforms operational performance across key business functions.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-ocean-300/15 text-[11px] font-mono uppercase text-ocean-300/70">
                  <th className="py-4 px-4">Business Domain</th>
                  <th className="py-4 px-4">Traditional Siloed Approach</th>
                  <th className="py-4 px-4 text-ocean-100">Axion Intelligent Platform</th>
                  <th className="py-4 px-4 text-right text-ocean-100">Net Impact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ocean-300/10 text-xs">
                {impactMetrics.map((metric, idx) => (
                  <tr key={idx} className="hover:bg-ocean-400/[0.04] transition-colors">
                    <td className="py-4 px-4 font-bold text-ocean-100">{metric.domain}</td>
                    <td className="py-4 px-4 text-ocean-200/70">{metric.traditional}</td>
                    <td className="py-4 px-4 text-ocean-100 font-medium">{metric.axion}</td>
                    <td className="py-4 px-4 text-right font-extrabold text-ocean-300">
                      {metric.gain}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* CTA Box */}
          <div className="mt-16 p-8 sm:p-12 rounded-3xl bg-ocean-900/50 border border-ocean-400/20 backdrop-blur-2xl text-center space-y-6 shadow-ocean-card relative overflow-hidden">
            <div className="relative z-10 space-y-3 max-w-2xl mx-auto">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-ocean-100 font-sans">
                Ready to Experience Axion in Action?
              </h3>
              <p className="text-xs sm:text-sm text-ocean-200/80 leading-relaxed">
                Explore the live operations console with seeded multi-department retail and enterprise data.
              </p>
              <div className="pt-2">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-ocean-400 hover:bg-ocean-300 text-ocean-950 font-bold text-sm shadow-ocean-glow transition-all active:scale-95"
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
