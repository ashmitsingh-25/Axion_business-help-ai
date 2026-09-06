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
      title: "Business Decision Copilot",
      desc: "5-stage strategic inquiry: Detect → Investigate → Alert",
      href: "/insights",
      icon: Sparkles,
      badge: "Live Telemetry",
    },
  ];

  const recentDecisions = [
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-sans">
              Enterprise Operations Console
            </h1>
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center gap-1 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              <span>Real-Time Ingestion</span>
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Axion Autonomous Decision Layer • Positioning: From Data → Intelligence → Action
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/insights"
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-2 shadow-md shadow-blue-600/20 active:scale-95 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
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
        <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3 font-bold">
          Active Decision Modules
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, i) => {
            const Icon = action.icon;
            return (
              <Link
                key={i}
                href={action.href}
                className="group p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900 transition-all duration-200 flex flex-col justify-between shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 rounded-xl bg-zinc-950 border border-zinc-800 text-blue-400 group-hover:text-blue-300 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-zinc-950 text-zinc-300 border border-zinc-700 font-bold">
                      {action.badge}
                    </span>
                  </div>
                  <h2 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                    {action.title}
                  </h2>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                    {action.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-zinc-850 flex items-center justify-between text-xs text-zinc-400 font-medium">
                  <span>Enter Module</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 text-blue-400 transition-transform" />
                </div>
              </Link>
            );
          })}
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
      <div className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800">
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <div>
            <h3 className="text-sm font-bold text-white tracking-tight">
              Recent Autonomous Decision Logs
            </h3>
            <p className="text-[11px] text-zinc-400">
              Audit trail of deterministic multi-agent resolutions and policy actions
            </p>
          </div>
          <span className="text-[10px] font-mono text-zinc-400 flex items-center gap-1">
            <Clock className="w-3 h-3 text-zinc-500" />
            <span>Updated live</span>
          </span>
        </div>

        <div className="mt-4 divide-y divide-zinc-800/60">
          {recentDecisions.map((dec) => (
            <div
              key={dec.id}
              className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs hover:bg-zinc-950/40 px-2 rounded-xl transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-blue-400 font-bold">{dec.id}</span>
                  <span className="text-zinc-600">•</span>
                  <span className="font-bold text-white">{dec.subject}</span>
                </div>
                <div className="text-zinc-400 text-[11px]">
                  <span>Resolution: </span>
                  <span className="text-zinc-200 font-medium">{dec.outcome}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 sm:text-right flex-shrink-0">
                <div>
                  <div className="font-mono text-[10px] text-blue-400 font-semibold">
                    {dec.retained}
                  </div>
                  <div className="text-[10px] text-zinc-500">{dec.agent}</div>
                </div>
                <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border bg-zinc-950 text-zinc-300 border-zinc-700">
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
