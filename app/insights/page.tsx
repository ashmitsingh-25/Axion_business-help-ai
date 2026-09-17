import { Sparkles, Bot, Zap } from "lucide-react";
import { ChatPanel } from "@/components/ChatPanel";
import { RiskFeed } from "@/components/RiskFeed";
import { PricingCard } from "@/components/PricingCard";

export default function InsightsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-ocean-800/40">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-sans">
              Business Intelligence & Decision Copilot
            </h1>
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-ocean-500/10 text-ocean-300 border border-ocean-500/25 font-semibold backdrop-blur-md">
              Cross-Department Synthesis
            </span>
          </div>
          <p className="text-xs text-ocean-200/60 mt-1">
            Triangulates telemetry across inventory, returns, expenses, and market pricing into executive action
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs bg-ocean-950/70 px-3.5 py-1.5 rounded-xl border border-ocean-700/40 backdrop-blur-xl shadow-ocean-card">
            <span className="w-2 h-2 rounded-full bg-ocean-400 animate-pulse shadow-[0_0_8px_rgba(32,201,166,0.6)]" />
            <span className="text-ocean-200 font-mono">Claude 3.5 Sonnet Connected</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Copilot Chat (Left 7 cols) vs Live Risk Feed & Pricing Optimizer (Right 5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Business Decision Copilot Chat Panel (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <ChatPanel />
        </div>

        {/* Right Column: Live Risk Detector Feed + Pricing Optimizer (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <RiskFeed />
          <PricingCard />
        </div>
      </div>
    </div>
  );
}
