"use client";

import { useState } from "react";
import {
  Send,
  Sparkles,
  Bot,
  User,
  ShieldAlert,
  Search,
  CheckCircle,
  Lightbulb,
  BellRing,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Zap,
  ArrowRight,
  Shield,
  Boxes,
  Receipt,
  RotateCcw,
} from "lucide-react";
import { CopilotStructuredResponse } from "@/lib/types";

interface MessageItem {
  id: string;
  role: "user" | "assistant";
  content?: string;
  structured?: CopilotStructuredResponse;
  timestamp: string;
}

export function ChatPanel() {
  const [inputQuery, setInputQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<MessageItem[]>([]);

  const [presetCategory, setPresetCategory] = useState<"business" | "cyber">("business");

  const businessPresets = [
    { label: "Why did sales fall this month?", dept: "Revenue", icon: TrendingDown },
    { label: "What is the stockout risk for SKU-409?", dept: "Inventory", icon: Boxes },
    { label: "Are there any expense policy violations?", dept: "Finance", icon: Receipt },
    { label: "How to reduce return rate on Velocity Pro shoes?", dept: "Returns", icon: RotateCcw },
  ];

  const cyberPresets = [
    { label: "What is our highest financial cyber risk today?", dept: "Cyber Risk", icon: ShieldAlert },
    { label: "How much risk can we reduce with ₹20L budget?", dept: "Investments", icon: Shield },
    { label: "What happens if remediation is delayed 30 days?", dept: "Simulation", icon: Zap },
    { label: "Show high-criticality assets lacking MFA", dept: "IAM / Controls", icon: CheckCircle },
  ];

  const handleSend = async (queryToSend?: string) => {
    const query = queryToSend || inputQuery;
    if (!query.trim() || isLoading) return;

    const userMessageId = `user_${Date.now()}`;
    const newMessages: MessageItem[] = [
      ...messages,
      {
        id: userMessageId,
        role: "user",
        content: query,
        timestamp: "Just now",
      },
    ];

    setMessages(newMessages);
    setInputQuery("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/insights/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query,
          conversationHistory: newMessages.map((m) => ({
            role: m.role,
            content: m.content || JSON.stringify(m.structured),
          })),
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to process query");
      }

      const data: CopilotStructuredResponse = await res.json();

      setMessages([
        ...newMessages,
        {
          id: `assistant_${Date.now()}`,
          role: "assistant",
          structured: data,
          timestamp: "Just now",
        },
      ]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages([
        ...newMessages,
        {
          id: `assistant_${Date.now()}`,
          role: "assistant",
          content: "Encountered an issue processing the query. Please retry.",
          timestamp: "Just now",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[740px] rounded-3xl bg-ocean-950/60 border border-ocean-300/20 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(94,234,212,0.15)] overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-ocean-950/90 border-b border-ocean-300/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-ocean-500/30 to-ocean-700/50 border border-ocean-300/30 flex items-center justify-center shadow-[0_0_15px_rgba(32,201,166,0.3)]">
            <Sparkles className="w-4 h-4 text-ocean-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white tracking-tight">
                Axion Decision Copilot
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-ocean-500/15 text-ocean-200 border border-ocean-300/25 font-semibold">
                Claude 3.5 Sonnet
              </span>
            </div>
            <p className="text-[11px] text-ocean-200/60">
              5-Stage Multi-Agent Synthesis: Detect → Investigate → Assess → Recommend → Alert
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {messages.length > 0 && (
            <button
              onClick={() => setMessages([])}
              className="text-[11px] font-mono text-ocean-300/70 hover:text-white px-2 py-1 rounded-lg hover:bg-ocean-900/60 transition-colors"
            >
              Clear Feed
            </button>
          )}
          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-ocean-900/80 border border-ocean-300/15">
            <span className="w-1.5 h-1.5 rounded-full bg-ocean-400 animate-pulse" />
            <span className="text-[10px] text-ocean-300 font-mono">Live Telemetry</span>
          </div>
        </div>
      </div>

      {/* Preset Category Switcher & Quick Pills */}
      <div className="px-4 py-2 bg-ocean-950/80 border-b border-ocean-300/10 flex items-center gap-2 overflow-x-auto text-xs">
        <div className="flex items-center gap-1 bg-ocean-900/90 p-0.5 rounded-xl border border-ocean-300/15 flex-shrink-0">
          <button
            onClick={() => setPresetCategory("business")}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-all ${
              presetCategory === "business"
                ? "bg-white text-ocean-950 shadow-sm font-bold"
                : "text-ocean-200/60 hover:text-white"
            }`}
          >
            Business Ops
          </button>
          <button
            onClick={() => setPresetCategory("cyber")}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-all ${
              presetCategory === "cyber"
                ? "bg-white text-ocean-950 shadow-sm font-bold"
                : "text-ocean-200/60 hover:text-white"
            }`}
          >
            Cyber Risk
          </button>
        </div>

        <span className="text-ocean-500/40">|</span>

        {(presetCategory === "business" ? businessPresets : cyberPresets).map((preset, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(preset.label)}
            disabled={isLoading}
            className="flex-shrink-0 px-3 py-1 rounded-full bg-ocean-900/70 hover:bg-ocean-800 hover:text-white border border-ocean-300/15 text-[11px] text-ocean-200/80 transition-all active:scale-95 disabled:opacity-50 flex items-center gap-1.5 group"
          >
            <span>{preset.label}</span>
          </button>
        ))}
      </div>

      {/* Message Feed / Clean Glowing Empty State */}
      <div className="flex-1 p-4 overflow-y-auto space-y-6">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-6 animate-in fade-in duration-500">
            {/* Glowing Center Badge */}
            <div className="relative">
              <div className="absolute inset-0 rounded-3xl bg-white/15 blur-2xl animate-pulse" />
              <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-white/20 to-ocean-800/60 border border-white/40 flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                <Sparkles className="w-8 h-8 text-white animate-pulse" />
              </div>
            </div>

            <div className="max-w-md space-y-2">
              <h4 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
                How can Decision Copilot assist you?
              </h4>
              <p className="text-xs text-ocean-200/70 leading-relaxed">
                Ask any business or cyber risk question. Axion will query live telemetry and generate a structured 5-stage synthesis.
              </p>
            </div>

            {/* Quick Action Prompt Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-xl text-left">
              {(presetCategory === "business" ? businessPresets : cyberPresets).map((p, i) => {
                const Icon = p.icon;
                return (
                  <button
                    key={i}
                    onClick={() => handleSend(p.label)}
                    className="p-3.5 rounded-2xl bg-ocean-900/50 hover:bg-ocean-800/70 border border-ocean-300/15 hover:border-white/30 text-left transition-all duration-200 group flex items-start gap-3 shadow-ocean-card hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                  >
                    <div className="p-2 rounded-xl bg-ocean-500/10 border border-ocean-300/20 text-ocean-300 group-hover:scale-105 transition-transform flex-shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] font-mono text-ocean-300/80 font-bold uppercase">
                        {p.dept}
                      </div>
                      <div className="text-xs font-semibold text-ocean-100 group-hover:text-white line-clamp-2 mt-0.5">
                        {p.label}
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-ocean-400/50 group-hover:text-white group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-1" />
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "assistant" && (
                <div className="w-8 h-8 rounded-xl bg-ocean-500/15 border border-ocean-300/20 flex items-center justify-center flex-shrink-0 mt-1 text-ocean-300 shadow-[inset_0_1px_0_0_rgba(94,234,212,0.15)]">
                  <Bot className="w-4 h-4 text-ocean-300" />
                </div>
              )}

              <div
                className={`max-w-3xl rounded-2xl p-4 text-xs ${
                  msg.role === "user"
                    ? "bg-ocean-500/25 text-white border border-ocean-300/30 shadow-md ml-12 backdrop-blur-md"
                    : "bg-ocean-950/85 border border-ocean-300/20 text-ocean-100 shadow-xl backdrop-blur-md"
                }`}
              >
                {msg.content && (
                  <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                )}

                {msg.structured && (
                  <div className="space-y-4">
                    {/* Telemetry Highlights Strip */}
                    {msg.structured.dataHighlights && (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pb-3 border-b border-ocean-300/10">
                        {msg.structured.dataHighlights.map((item, i) => (
                          <div
                            key={i}
                            className="p-2.5 rounded-lg bg-ocean-900/60 border border-ocean-300/10"
                          >
                            <div className="text-[10px] text-ocean-200/60">{item.metric}</div>
                            <div className="text-xs font-bold text-white mt-0.5 flex items-center justify-between">
                              <span>{item.value}</span>
                              {item.trend === "up" ? (
                                <TrendingUp className="w-3 h-3 text-ocean-300" />
                              ) : item.trend === "down" ? (
                                <TrendingDown className="w-3 h-3 text-rose-400" />
                              ) : null}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* 5-Stage Agentic Reasoning Cards */}
                    <div className="space-y-3">
                      {/* 1. DETECT */}
                      <div className="p-3.5 rounded-xl bg-ocean-900/60 border border-ocean-300/10">
                        <div className="flex items-center gap-2 text-ocean-300 font-bold uppercase tracking-wider text-[10px] mb-1 font-mono">
                          <Search className="w-3.5 h-3.5 text-ocean-300" />
                          <span>1. Detect — Telemetry & Anomalies</span>
                        </div>
                        <p className="text-ocean-100/90 text-[11px] leading-relaxed">
                          {msg.structured.detect}
                        </p>
                      </div>

                      {/* 2. INVESTIGATE */}
                      <div className="p-3.5 rounded-xl bg-ocean-900/60 border border-ocean-300/10">
                        <div className="flex items-center gap-2 text-ocean-300 font-bold uppercase tracking-wider text-[10px] mb-1 font-mono">
                          <RefreshCw className="w-3.5 h-3.5 text-ocean-300" />
                          <span>2. Investigate — Cross-Department Root Cause</span>
                        </div>
                        <p className="text-ocean-100/90 text-[11px] leading-relaxed">
                          {msg.structured.investigate}
                        </p>
                      </div>

                      {/* 3. ASSESS */}
                      <div className="p-3.5 rounded-xl bg-ocean-900/60 border border-ocean-300/10">
                        <div className="flex items-center gap-2 text-ocean-300 font-bold uppercase tracking-wider text-[10px] mb-1 font-mono">
                          <ShieldAlert className="w-3.5 h-3.5 text-ocean-300" />
                          <span>3. Assess — Financial & Operational Impact</span>
                        </div>
                        <p className="text-ocean-100/90 text-[11px] leading-relaxed">
                          {msg.structured.assess}
                        </p>
                      </div>

                      {/* 4. RECOMMEND */}
                      <div className="p-3.5 rounded-xl bg-ocean-500/15 border border-ocean-300/25 shadow-[inset_0_1px_0_0_rgba(94,234,212,0.15)]">
                        <div className="flex items-center gap-2 text-ocean-200 font-bold uppercase tracking-wider text-[10px] mb-1 font-mono">
                          <Lightbulb className="w-3.5 h-3.5 text-ocean-300" />
                          <span>4. Recommend — Actionable Decisions</span>
                        </div>
                        <div className="text-white text-[11px] leading-relaxed whitespace-pre-wrap font-medium">
                          {msg.structured.recommend}
                        </div>
                      </div>

                      {/* 5. ALERT */}
                      <div className="p-3.5 rounded-xl bg-ocean-900/60 border border-ocean-300/10">
                        <div className="flex items-center gap-2 text-ocean-300 font-bold uppercase tracking-wider text-[10px] mb-1 font-mono">
                          <BellRing className="w-3.5 h-3.5 text-ocean-300" />
                          <span>5. Alert — Continuous Guardrails</span>
                        </div>
                        <p className="text-ocean-100/90 text-[11px] leading-relaxed">
                          {msg.structured.alert}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {msg.role === "user" && (
                <div className="w-8 h-8 rounded-xl bg-ocean-500/30 border border-ocean-300/30 flex items-center justify-center flex-shrink-0 mt-1 shadow-sm text-white">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))
        )}

        {isLoading && (
          <div className="flex gap-3 items-start animate-in fade-in duration-200">
            <div className="w-8 h-8 rounded-xl bg-ocean-500/15 border border-ocean-300/20 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-4 h-4 text-white animate-pulse" />
            </div>
            <div className="p-4 rounded-2xl bg-ocean-900/80 border border-ocean-300/20 flex items-center gap-3 shadow-[0_0_20px_rgba(255,255,255,0.15)]">
              <div className="w-2 h-2 rounded-full bg-white animate-bounce" />
              <div className="w-2 h-2 rounded-full bg-ocean-200 animate-bounce [animation-delay:0.2s]" />
              <div className="w-2 h-2 rounded-full bg-ocean-400 animate-bounce [animation-delay:0.4s]" />
              <span className="text-xs text-white font-mono">
                Synthesizing cross-department telemetry with Claude 3.5 Sonnet...
              </span>
            </div>
          </div>
        )}
      </div>

      {/* ── HIGH-LIGHTED ASK COPILOT INPUT BAR (White Button Theme) ───────────────── */}
      <div className="p-4 bg-ocean-950/95 border-t border-ocean-300/20 relative">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="relative flex items-center gap-2 p-1.5 rounded-2xl bg-ocean-900/80 border-2 border-white/40 shadow-[0_0_30px_rgba(255,255,255,0.2),inset_0_1px_0_0_rgba(255,255,255,0.1)] focus-within:border-white focus-within:shadow-[0_0_40px_rgba(255,255,255,0.35)] transition-all duration-300"
        >
          <div className="pl-3 text-white">
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>

          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Ask Copilot (e.g. 'Why did sales fall this month?' or 'Quantify cyber risk on payment DB')..."
            className="flex-1 bg-transparent px-2 py-2.5 text-xs sm:text-sm text-white placeholder-ocean-200/50 focus:outline-none font-sans"
            disabled={isLoading}
            autoFocus
          />

          <button
            type="submit"
            disabled={!inputQuery.trim() || isLoading}
            className="px-5 py-2.5 rounded-xl bg-white hover:bg-neutral-100 text-ocean-950 text-xs font-black flex items-center gap-2 shadow-[0_0_25px_rgba(255,255,255,0.4)] transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 hover:scale-[1.02]"
          >
            <Sparkles className="w-3.5 h-3.5 fill-ocean-950 text-ocean-950" />
            <span className="font-extrabold text-ocean-950">Ask Copilot</span>
            <Send className="w-3.5 h-3.5 text-ocean-950" />
          </button>
        </form>

        <div className="flex items-center justify-between mt-2 px-2 text-[10px] text-ocean-300/60 font-mono">
          <span>Tip: Press Enter ↵ to send • Multi-agent Claude 3.5</span>
          <span className="text-white font-semibold">Autonomous Reasoning</span>
        </div>
      </div>
    </div>
  );
}
