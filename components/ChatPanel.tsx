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
  const [messages, setMessages] = useState<MessageItem[]>([
    {
      id: "initial_assistant",
      role: "assistant",
      timestamp: "Just now",
      structured: {
        detect:
          "Telemetry detected a 6.8% month-over-month revenue dip (₹1.42 Cr vs ₹1.52 Cr target), localized primarily across Consumer Audio and Footwear categories between August 18 and September 4.",
        investigate:
          "Cross-department triangulation reveals two compounding drivers: (1) SKU-409 (Apex ANC Headphones) velocity spiked to 20 units/day, exhausting stock in 9 days; (2) Velocity Pro Shoes suffered an 11.8% return rate spike on UK 9 due to narrower toe-box batch specifications.",
        assess:
          "SKU-409 stockout represents ₹2,60,000 in deferred daily gross revenue. Sizing friction eroded CSAT by 0.3 points, though the Smart Exchange Agent converted 85% of refunds to UK 9.5 exchanges, preserving ₹5,52,000 in retained GMV.",
        recommend:
          "1. Execute emergency reorder of 350 units for SKU-409 with Supplier B (Bangalore FastTech, 4-day lead time).\n2. Update product sizing copy: 'Order 0.5 size up for Velocity Pro'.\n3. Deploy instant store-credit bonus incentive.",
        alert:
          "Automated stockout trigger active at 12-day inventory threshold; footwear return velocity watch configured for >7% return spike.",
        dataHighlights: [
          { metric: "Monthly GMV", value: "₹1.42 Cr (-6.8%)", trend: "down", department: "Finance" },
          { metric: "SKU-409 Stock", value: "9 Days Runway", trend: "down", department: "Inventory" },
          { metric: "Shoe Return Rate", value: "11.8% (UK 9)", trend: "up", department: "Customer Ops" },
          { metric: "Exchange Retention", value: "85% Preserved", trend: "up", department: "Returns" },
        ],
      },
    },
  ]);

  const presetQueries = [
    "Why did sales fall this month?",
    "What is the stockout risk for SKU-409?",
    "Are there any expense policy violations this week?",
    "How can we optimize pricing for Apex ANC Headphones?",
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
    <div className="flex flex-col h-[740px] rounded-2xl bg-zinc-900/60 border border-white/10 backdrop-blur-2xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-zinc-950/80 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]">
            <Sparkles className="w-4 h-4 text-zinc-200" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white tracking-tight">
                Axion Business Decision Copilot
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-zinc-300 border border-white/10">
                Claude 3.5 Sonnet
              </span>
            </div>
            <p className="text-[11px] text-zinc-400">
              5-Stage Multi-Agent Synthesis: Detect → Investigate → Assess → Recommend → Alert
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs text-zinc-400 font-mono">Telemetry Active</span>
        </div>
      </div>

      {/* Preset Suggestions Bar */}
      <div className="px-4 py-2.5 bg-zinc-950/60 border-b border-white/5 flex items-center gap-2 overflow-x-auto text-xs">
        <span className="text-[11px] text-zinc-400 font-medium flex items-center gap-1 flex-shrink-0">
          <Zap className="w-3 h-3 text-zinc-300" />
          <span>Quick Prompts:</span>
        </span>
        {presetQueries.map((preset, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(preset)}
            disabled={isLoading}
            className="flex-shrink-0 px-3 py-1 rounded-full bg-zinc-900/80 hover:bg-white/10 hover:text-white border border-white/5 text-[11px] text-zinc-300 transition-all active:scale-95 disabled:opacity-50"
          >
            {preset}
          </button>
        ))}
      </div>

      {/* Message Feed */}
      <div className="flex-1 p-4 overflow-y-auto space-y-6">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.role === "assistant" && (
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 mt-1 text-zinc-200 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]">
                <Bot className="w-4 h-4 text-zinc-200" />
              </div>
            )}

            <div
              className={`max-w-3xl rounded-2xl p-4 text-xs ${
                msg.role === "user"
                  ? "bg-white/15 text-white border border-white/20 shadow-md ml-12 backdrop-blur-md"
                  : "bg-zinc-950/80 border border-white/10 text-zinc-200 shadow-xl backdrop-blur-md"
              }`}
            >
              {msg.content && <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>}

              {msg.structured && (
                <div className="space-y-4">
                  {/* Telemetry Highlights Strip */}
                  {msg.structured.dataHighlights && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pb-3 border-b border-white/5">
                      {msg.structured.dataHighlights.map((item, i) => (
                        <div key={i} className="p-2.5 rounded-lg bg-zinc-900/80 border border-white/5">
                          <div className="text-[10px] text-zinc-400">{item.metric}</div>
                          <div className="text-xs font-bold text-white mt-0.5 flex items-center justify-between">
                            <span>{item.value}</span>
                            {item.trend === "up" ? (
                              <TrendingUp className="w-3 h-3 text-zinc-200" />
                            ) : item.trend === "down" ? (
                              <TrendingDown className="w-3 h-3 text-zinc-400" />
                            ) : null}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* 5-Stage Agentic Reasoning Cards */}
                  <div className="space-y-3">
                    {/* 1. DETECT */}
                    <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-white/5">
                      <div className="flex items-center gap-2 text-zinc-200 font-bold uppercase tracking-wider text-[10px] mb-1">
                        <Search className="w-3.5 h-3.5 text-zinc-300" />
                        <span>1. Detect — Telemetry & Anomalies</span>
                      </div>
                      <p className="text-zinc-300 text-[11px] leading-relaxed">
                        {msg.structured.detect}
                      </p>
                    </div>

                    {/* 2. INVESTIGATE */}
                    <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-white/5">
                      <div className="flex items-center gap-2 text-zinc-200 font-bold uppercase tracking-wider text-[10px] mb-1">
                        <RefreshCw className="w-3.5 h-3.5 text-zinc-300" />
                        <span>2. Investigate — Cross-Department Root Cause</span>
                      </div>
                      <p className="text-zinc-300 text-[11px] leading-relaxed">
                        {msg.structured.investigate}
                      </p>
                    </div>

                    {/* 3. ASSESS */}
                    <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-white/5">
                      <div className="flex items-center gap-2 text-zinc-200 font-bold uppercase tracking-wider text-[10px] mb-1">
                        <ShieldAlert className="w-3.5 h-3.5 text-zinc-300" />
                        <span>3. Assess — Financial & Operational Impact</span>
                      </div>
                      <p className="text-zinc-300 text-[11px] leading-relaxed">
                        {msg.structured.assess}
                      </p>
                    </div>

                    {/* 4. RECOMMEND */}
                    <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/15 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
                      <div className="flex items-center gap-2 text-zinc-100 font-bold uppercase tracking-wider text-[10px] mb-1">
                        <Lightbulb className="w-3.5 h-3.5 text-zinc-200" />
                        <span>4. Recommend — Actionable Decisions</span>
                      </div>
                      <div className="text-zinc-100 text-[11px] leading-relaxed whitespace-pre-wrap font-medium">
                        {msg.structured.recommend}
                      </div>
                    </div>

                    {/* 5. ALERT */}
                    <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-white/5">
                      <div className="flex items-center gap-2 text-zinc-200 font-bold uppercase tracking-wider text-[10px] mb-1">
                        <BellRing className="w-3.5 h-3.5 text-zinc-300" />
                        <span>5. Alert — Continuous Guardrails</span>
                      </div>
                      <p className="text-zinc-300 text-[11px] leading-relaxed">
                        {msg.structured.alert}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {msg.role === "user" && (
              <div className="w-8 h-8 rounded-lg bg-white/15 border border-white/20 flex items-center justify-center flex-shrink-0 mt-1 shadow-sm text-white">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3 items-start">
            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-4 h-4 text-zinc-200 animate-pulse" />
            </div>
            <div className="p-4 rounded-2xl bg-zinc-900/80 border border-white/5 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-white animate-bounce" />
              <div className="w-2 h-2 rounded-full bg-zinc-300 animate-bounce [animation-delay:0.2s]" />
              <div className="w-2 h-2 rounded-full bg-zinc-500 animate-bounce [animation-delay:0.4s]" />
              <span className="text-xs text-zinc-400 font-mono">
                Synthesizing cross-department telemetry with Claude 3.5...
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Input Box */}
      <div className="p-4 bg-zinc-950/80 border-t border-white/10">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Ask Axion Copilot (e.g. 'Why did sales fall this month?' or 'Evaluate inventory risk on SKU-409')..."
            className="flex-1 bg-zinc-900/80 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-white/30 font-sans"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!inputQuery.trim() || isLoading}
            className="px-5 py-3 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 text-xs font-semibold flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.12)] transition-all disabled:opacity-50 active:scale-95"
          >
            <span>Ask Copilot</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
