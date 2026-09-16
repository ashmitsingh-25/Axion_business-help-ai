"use client";

import { useState, useEffect } from "react";
import { Radio, ShieldAlert, CheckCircle2, AlertTriangle, Flame, Clock } from "lucide-react";
import { SecurityEventItem } from "@/lib/types";
import { MOCK_SECURITY_EVENTS } from "@/lib/mock-data";

export function TelemetryStream() {
  const [events, setEvents] = useState<SecurityEventItem[]>(MOCK_SECURITY_EVENTS);
  const [activeFilter, setActiveFilter] = useState("ALL");

  const sources = ["ALL", "SIEM", "EDR", "IAM", "CSPM", "VULN_SCANNER", "THREAT_INTEL"];

  // Periodic simulated live event ticker
  useEffect(() => {
    const interval = setInterval(() => {
      const liveSamples: SecurityEventItem[] = [
        {
          id: `evt_live_${Date.now()}`,
          source: "IAM",
          eventType: "MFA_HARDWARE_KEY_ENFORCED",
          severity: "LOW",
          assetAffected: "Cloud Infrastructure IAM",
          details: "2 cloud root admin accounts transitioned to mandatory hardware FIDO2 key.",
          riskDelta: -4,
          timeAgo: "Just now",
          timestamp: new Date().toISOString(),
        },
        {
          id: `evt_live_${Date.now() + 1}`,
          source: "SIEM",
          eventType: "ANOMALOUS_INGRESS_THROTTLED",
          severity: "MEDIUM",
          assetAffected: "Payment Gateway DB Cluster",
          details: "Blocked 140 unauthorized TCP probe attempts on internal database port.",
          riskDelta: 0,
          timeAgo: "Just now",
          timestamp: new Date().toISOString(),
        },
        {
          id: `evt_live_${Date.now() + 2}`,
          source: "VULN_SCANNER",
          eventType: "PATCH_VERIFIED",
          severity: "LOW",
          assetAffected: "Core E-Commerce API Gateway",
          details: "Hotfix patch verified across 4 worker node pods in production cluster.",
          riskDelta: -6,
          timeAgo: "Just now",
          timestamp: new Date().toISOString(),
        },
      ];

      const randomEvent = liveSamples[Math.floor(Math.random() * liveSamples.length)];
      setEvents((prev) => [randomEvent, ...prev.slice(0, 9)]);
    }, 14000);

    return () => clearInterval(interval);
  }, []);

  const filteredEvents = activeFilter === "ALL" ? events : events.filter((e) => e.source === activeFilter);

  const getSeverityBadge = (sev: string) => {
    switch (sev) {
      case "CRITICAL":
        return "bg-rose-500/10 text-rose-300 border-rose-500/30";
      case "HIGH":
        return "bg-amber-500/10 text-amber-300 border-amber-500/30";
      case "MEDIUM":
        return "bg-blue-500/10 text-blue-300 border-blue-500/30";
      default:
        return "bg-emerald-500/10 text-emerald-300 border-emerald-500/30";
    }
  };

  return (
    <div className="p-6 rounded-2xl bg-zinc-900/60 border border-white/10 backdrop-blur-2xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_10px_30px_-10px_rgba(0,0,0,0.5)] flex flex-col h-[560px]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-white tracking-tight">
              Live Cybersecurity Telemetry Center
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Simulated Real-Time Ingestion</span>
            </span>
          </div>
          <p className="text-[11px] text-zinc-400 mt-0.5">
            Continuous cross-source correlation: SIEM, EDR, IAM, CSPM, Threat Intelligence & Vulnerability Scanners
          </p>
        </div>

        {/* Source Filter Chips */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
          {sources.map((src) => (
            <button
              key={src}
              onClick={() => setActiveFilter(src)}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-mono transition-colors flex-shrink-0 ${
                activeFilter === src
                  ? "bg-white text-zinc-950 font-bold"
                  : "bg-zinc-950/80 text-zinc-400 hover:text-white border border-white/5"
              }`}
            >
              {src}
            </button>
          ))}
        </div>
      </div>

      {/* Streaming Events List */}
      <div className="mt-4 flex-1 overflow-y-auto space-y-2.5 pr-1">
        {filteredEvents.map((evt) => (
          <div
            key={evt.id}
            className="p-3.5 rounded-xl bg-zinc-950/60 border border-white/5 hover:border-white/15 transition-all text-xs space-y-1.5"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border ${getSeverityBadge(evt.severity)}`}>
                  {evt.source}
                </span>
                <span className="font-bold text-white truncate">{evt.assetAffected}</span>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0 font-mono text-[10px]">
                {evt.riskDelta !== 0 && (
                  <span
                    className={`font-bold px-1.5 py-0.5 rounded ${
                      evt.riskDelta > 0
                        ? "bg-rose-500/20 text-rose-300"
                        : "bg-emerald-500/20 text-emerald-300"
                    }`}
                  >
                    Risk {evt.riskDelta > 0 ? `+${evt.riskDelta}` : evt.riskDelta}
                  </span>
                )}
                <span className="text-zinc-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{evt.timeAgo}</span>
                </span>
              </div>
            </div>

            <p className="text-[11px] text-zinc-300 leading-relaxed pl-1">
              {evt.details}
            </p>
          </div>
        ))}
      </div>

      {/* Footer Info */}
      <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[10px] text-zinc-500 font-mono">
        <span>Connected Agents: SIEM • CrowdStrike EDR • Okta IAM • AWS CloudTrail</span>
        <span>Streaming Buffer: Active</span>
      </div>
    </div>
  );
}
