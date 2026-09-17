"use client";

import Link from "next/link";
import {
  RotateCcw,
  Boxes,
  Receipt,
  Sparkles,
  TrendingUp,
  ArrowRight,
  Clock,
  Shield,
  DollarSign,
  Activity,
} from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { RiskFeed } from "@/components/RiskFeed";
import { PricingCard } from "@/components/PricingCard";

export default function DashboardPage() {
  const quickActions = [
    {
      title: "Smart Returns & Exchange",
      desc: "Evaluate return requests, size exchanges, and risk scoring",
      href: "/returns",
      icon: RotateCcw,
      badge: "85% GMV Retained",
    },
    {
      title: "Demand & Inventory Copilot",
      desc: "SKU velocity forecasting & automated Supplier A vs B routing",
      href: "/inventory",
      icon: Boxes,
      badge: "Stockout in 9d Alert",
    },
    {
      title: "AI Expense Auditor",
      desc: "Audit claims against RAG corporate policy caps & detect overruns",
      href: "/expenses",
      icon: Receipt,
      badge: "₹18.4k vs ₹12k Flagged",
    },
    {
      title: "Cyber Risk Intelligence",
      desc: "Financial exposure quantification, EAL & security investment optimizer",
      href: "/cyber-risk",
      icon: Shield,
      badge: "₹2.1 Cr EAL Alert",
    },
  ];

  const recentDecisions = [
    {
      id: "DEC-9913",
      type: "Cyber Risk",
      subject: "Payment Gateway DB (CVE-2024-3094)",
      outcome: "Emergency Hotfix & FIDO2 Hardware MFA Mandated",
      status: "MITIGATED",
      time: "3 mins ago",
      agent: "Cyber Risk Engine",
      retained: "₹42L Loss Avoided",
    },
    {
      id: "DEC-9912",
      type: "Returns",
      subject: "Order ORD-88219 (Axion Velocity Pro Shoes)",
      outcome: "1-Click Exchange (UK 9.5)",
      status: "APPROVED",
      time: "8 mins ago",
      agent: "Returns Copilot (Claude 3.5)",
      retained: "₹6,499 GMV Saved",
    },
    {
      id: "DEC-9911",
      type: "Expenses",
      subject: "Claim EXP-891 (Grand Hyatt Mumbai)",
      outcome: "Hotel Cap Overrun (₹18,400 vs ₹12,000)",
      status: "FLAGGED",
      time: "24 mins ago",
      agent: "Expense Auditor",
      retained: "₹6,400 Protected",
    },
    {
      id: "DEC-9910",
      type: "Inventory",
      subject: "SKU-409 (Apex ANC Headphones)",
      outcome: "Recommended Reorder 350u from Supplier B",
      status: "TRIGGERED",
      time: "1 hour ago",
      agent: "Forecast Engine",
      retained: "Stockout Prevented",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Dashboard Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-ocean-300/15">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-ocean-100 tracking-tight font-sans">
              Enterprise Operations Console
            </h1>
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-ocean-500/15 text-ocean-300 border border-ocean-400/30 flex items-center gap-1 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-ocean-400 animate-pulse" />
              <span>Real-Time Ingestion</span>
            </span>
          </div>
          <p className="text-xs text-ocean-200/70 mt-1">
            Axion Autonomous Decision Layer • Positioning: Data → Intelligence → Action → Optimized Investment
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/insights"
            className="px-4 py-2 rounded-xl bg-ocean-400 hover:bg-ocean-300 text-ocean-950 text-xs font-bold flex items-center gap-2 shadow-ocean-glow active:scale-95 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-ocean-950" />
            <span>Launch Copilot</span>
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Retained GMV (Returns)"
          value="85.4%"
          change="+14.2% MoM"
          trend="up"
          icon={RotateCcw}
          description="Size exchanges prioritized over refunds"
          badge="Returns Agent"
        />
        <StatCard
          title="High-Velocity Stock Runway"
          value="9 Days"
          change="SKU-409 Critical"
          trend="down"
          icon={Boxes}
          description="Supplier B reorder recommended"
          badge="Inventory Copilot"
        />
        <StatCard
          title="Expense Audit Compliance"
          value="94.2%"
          change="3 Overruns Flagged"
          trend="neutral"
          icon={Receipt}
          description="₹18.4k vs ₹12k Hotel limit detected"
          badge="Expense Auditor"
        />
        <StatCard
          title="Pricing Elasticity Upside"
          value="+₹1.82L"
          change="+8.1% Net Margin"
          trend="up"
          icon={TrendingUp}
          description="Apex ANC Headphones recalibration"
          badge="Pricing Optimizer"
        />
      </div>

      {/* Quick Navigation Cards */}
      <div>
        <div className="text-xs font-mono uppercase tracking-wider text-ocean-300 mb-3 font-bold">
          Active Decision Modules
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, i) => {
            const Icon = action.icon;
            return (
              <Link
                key={i}
                href={action.href}
                className="group p-5 rounded-2xl bg-ocean-900/50 border border-ocean-400/20 hover:border-ocean-400/40 hover:bg-ocean-900/70 backdrop-blur-2xl transition-all duration-200 flex flex-col justify-between shadow-ocean-card hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 rounded-xl bg-ocean-500/10 border border-ocean-400/20 text-ocean-300 group-hover:text-ocean-100 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-ocean-500/10 text-ocean-300 border border-ocean-400/20 font-bold">
                      {action.badge}
                    </span>
                  </div>
                  <h2 className="text-sm font-bold text-ocean-100 group-hover:text-white transition-colors">
                    {action.title}
                  </h2>
                  <p className="text-xs text-ocean-200/70 mt-1 leading-relaxed">
                    {action.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-ocean-300/10 flex items-center justify-between text-xs text-ocean-300/80 font-medium">
                  <span>Enter Module</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 text-ocean-300 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Cyber Risk Executive Intelligence Section */}
      <div className="p-6 rounded-2xl bg-ocean-900/50 border border-ocean-400/20 backdrop-blur-2xl shadow-ocean-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-ocean-300/15">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-ocean-500/15 border border-ocean-400/30 text-ocean-300">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-ocean-100 tracking-tight">
                  Cyber Risk & Financial Exposure Intelligence
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-ocean-500/15 text-ocean-300 border border-ocean-400/30 font-bold">
                  Live Model
                </span>
              </div>
              <p className="text-[11px] text-ocean-200/60 mt-0.5">
                Continuously quantified Expected Annual Loss (EAL), incident likelihood, and optimal security budget allocation
              </p>
            </div>
          </div>

          <Link
            href="/cyber-risk"
            className="px-4 py-2 rounded-xl bg-ocean-400 hover:bg-ocean-300 text-ocean-950 text-xs font-bold flex items-center gap-1.5 shadow-ocean-glow transition-all self-start sm:self-auto"
          >
            <span>Launch Cyber Console</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="p-3 rounded-xl bg-ocean-950/70 border border-ocean-300/15 space-y-1">
            <div className="text-[10px] font-mono text-ocean-300/70">Enterprise Cyber Risk</div>
            <div className="text-base font-extrabold text-ocean-100 font-mono">72 / 100</div>
            <div className="text-[9px] text-amber-300">Elevated Posture</div>
          </div>

          <div className="p-3 rounded-xl bg-ocean-950/70 border border-ocean-300/15 space-y-1">
            <div className="text-[10px] font-mono text-ocean-300/70">Financial Exposure</div>
            <div className="text-base font-extrabold text-ocean-100 font-mono">₹3.8 Cr</div>
            <div className="text-[9px] text-ocean-300/50">1,250 Assets</div>
          </div>

          <div className="p-3 rounded-xl bg-ocean-950/70 border border-rose-500/30 space-y-1">
            <div className="text-[10px] font-mono text-rose-400 font-bold">Expected Annual Loss</div>
            <div className="text-base font-extrabold text-rose-300 font-mono">₹2.1 Cr</div>
            <div className="text-[9px] text-rose-400">17% Likelihood</div>
          </div>

          <div className="p-3 rounded-xl bg-ocean-950/70 border border-purple-500/30 space-y-1">
            <div className="text-[10px] font-mono text-purple-300 font-bold">Critical Tier Assets</div>
            <div className="text-base font-extrabold text-purple-300 font-mono">18 Assets</div>
            <div className="text-[9px] text-ocean-300/50">7 High Risk</div>
          </div>

          <div className="p-3 rounded-xl bg-ocean-950/70 border border-emerald-500/30 space-y-1">
            <div className="text-[10px] font-mono text-emerald-400 font-bold">Control Effectiveness</div>
            <div className="text-base font-extrabold text-emerald-400 font-mono">74%</div>
            <div className="text-[9px] text-ocean-300/50">MFA 92% • EDR 87%</div>
          </div>

          <div className="p-3 rounded-xl bg-ocean-950/70 border border-ocean-400/30 space-y-1">
            <div className="text-[10px] font-mono text-ocean-300 font-bold">Risk Reduction Target</div>
            <div className="text-base font-extrabold text-ocean-200 font-mono">₹1.4 Cr</div>
            <div className="text-[9px] text-ocean-300/70">At ₹18L Spend</div>
          </div>
        </div>
      </div>

      {/* Main Content Grid: Risk Detector + Pricing Optimizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7">
          <RiskFeed />
        </div>
        <div className="lg:col-span-5">
          <PricingCard />
        </div>
      </div>

      {/* Recent Autonomous Decisions Audit Trail */}
      <div className="p-6 rounded-2xl bg-ocean-900/50 border border-ocean-400/20 backdrop-blur-2xl shadow-ocean-card">
        <div className="flex items-center justify-between pb-4 border-b border-ocean-300/15">
          <div>
            <h3 className="text-sm font-bold text-ocean-100 tracking-tight">
              Recent Autonomous Decision Logs
            </h3>
            <p className="text-[11px] text-ocean-200/60">
              Audit trail of deterministic multi-agent resolutions and policy actions
            </p>
          </div>
          <span className="text-[10px] font-mono text-ocean-300/60 flex items-center gap-1">
            <Clock className="w-3 h-3 text-ocean-400" />
            <span>Updated live</span>
          </span>
        </div>

        <div className="mt-4 divide-y divide-ocean-300/10">
          {recentDecisions.map((dec) => (
            <div
              key={dec.id}
              className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs hover:bg-ocean-400/[0.04] px-2 rounded-xl transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-ocean-300 font-bold">{dec.id}</span>
                  <span className="text-ocean-500">•</span>
                  <span className="font-bold text-ocean-100">{dec.subject}</span>
                </div>
                <div className="text-ocean-300/70 text-[11px]">
                  <span>Resolution: </span>
                  <span className="text-ocean-200 font-medium">{dec.outcome}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 sm:text-right flex-shrink-0">
                <div>
                  <div className="font-mono text-[10px] text-ocean-200 font-semibold">
                    {dec.retained}
                  </div>
                  <div className="text-[10px] text-ocean-300/50">{dec.agent}</div>
                </div>
                <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border bg-ocean-500/10 text-ocean-300 border-ocean-400/20">
                  {dec.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
