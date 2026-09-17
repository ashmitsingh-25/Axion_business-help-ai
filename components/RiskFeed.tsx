"use client";

import { useState } from "react";
import {
  AlertTriangle,
  Flame,
  AlertCircle,
  Info,
  ShieldCheck,
  Boxes,
  Receipt,
  RotateCcw,
  Truck,
  CheckCircle,
} from "lucide-react";
import { MOCK_RISKS } from "@/lib/mock-data";
import { RiskItem } from "@/lib/types";

interface RiskFeedProps {
  initialRisks?: RiskItem[];
  className?: string;
}

export function RiskFeed({ initialRisks = MOCK_RISKS as any, className = "" }: RiskFeedProps) {
  const [risks, setRisks] = useState<RiskItem[]>(initialRisks);
  const [filterDept, setFilterDept] = useState<string>("ALL");
  const [resolvedIds, setResolvedIds] = useState<string[]>([]);

  const departmentIcons = {
    INVENTORY: Boxes,
    FINANCE: Receipt,
    CUSTOMER_OPS: RotateCcw,
    SUPPLY_CHAIN: Truck,
  };

  const filteredRisks = risks.filter((r) => {
    if (filterDept !== "ALL" && r.department !== filterDept) return false;
    return true;
  });

  const handleResolve = (id: string) => {
    if (resolvedIds.includes(id)) {
      setResolvedIds(resolvedIds.filter((item) => item !== id));
    } else {
      setResolvedIds([...resolvedIds, id]);
    }
  };

  return (
    <div className={`rounded-2xl bg-ocean-900/40 border border-ocean-300/15 p-5 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.35),inset_0_1px_0_0_rgba(94,234,212,0.12)] transition-all duration-300 hover:border-ocean-300/30 ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-ocean-300/10">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-white tracking-tight">
              Live Cross-Department Risk Detector
            </h3>
            <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-ocean-500/15 text-ocean-200 border border-ocean-300/25 font-mono">
              {filteredRisks.length} Detected
            </span>
          </div>
          <p className="text-[11px] text-ocean-200/60 mt-0.5">
            Autonomous threat detection across stock, returns, fraud, & expenses
          </p>
        </div>

        {/* Department Filter Tabs */}
        <div className="flex items-center gap-1 bg-ocean-950/80 p-1 rounded-xl border border-ocean-300/15 text-xs overflow-x-auto">
          {["ALL", "INVENTORY", "FINANCE", "CUSTOMER_OPS", "SUPPLY_CHAIN"].map((dept) => (
            <button
              key={dept}
              onClick={() => setFilterDept(dept)}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-medium transition-all whitespace-nowrap ${
                filterDept === dept
                  ? "bg-ocean-400 text-ocean-950 shadow-sm font-bold"
                  : "text-ocean-200/70 hover:text-white hover:bg-ocean-800/60"
              }`}
            >
              {dept === "ALL" ? "All Domains" : dept.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Risk Items */}
      <div className="mt-4 space-y-3">
        {filteredRisks.map((risk) => {
          const DeptIcon = departmentIcons[risk.department] || Boxes;
          const isResolved = resolvedIds.includes(risk.id);

          return (
            <div
              key={risk.id}
              className={`p-4 rounded-xl border transition-all duration-200 ${
                isResolved
                  ? "bg-ocean-950/30 border-ocean-300/5 opacity-60"
                  : "bg-ocean-950/70 border-ocean-300/10 hover:border-ocean-300/25"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-ocean-900/80 border border-ocean-300/20 text-ocean-300 flex-shrink-0 mt-0.5">
                    <DeptIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`text-xs font-bold ${
                          isResolved ? "line-through text-ocean-200/40" : "text-white"
                        }`}
                      >
                        {risk.title}
                      </span>
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded-full border bg-ocean-900/90 text-ocean-200 border-ocean-300/25 font-bold">
                        {risk.severity}
                      </span>
                      <span className="text-[10px] text-ocean-300/60 font-mono">
                        {risk.timestamp}
                      </span>
                    </div>

                    <p className="text-[11px] text-ocean-200/70 mt-1 leading-relaxed">
                      {risk.description}
                    </p>

                    {/* Suggested Action */}
                    <div className="mt-2.5 p-2.5 rounded-lg bg-ocean-900/60 border border-ocean-300/10 flex items-start gap-2">
                      <div className="text-[10px] font-bold text-ocean-300 uppercase tracking-wider flex-shrink-0 mt-0.5 font-mono">
                        Action:
                      </div>
                      <div className="text-[11px] text-ocean-100 font-sans">
                        {risk.suggestedAction}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Impact Score & Action */}
                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                  <div className="text-right">
                    <div className="text-[9px] text-ocean-300/60 uppercase font-mono">Impact Score</div>
                    <div className="text-xs font-extrabold text-white font-mono">{risk.impactScore}/100</div>
                  </div>
                  <button
                    onClick={() => handleResolve(risk.id)}
                    className={`text-[10px] font-semibold px-2.5 py-1 rounded-lg border transition-all flex items-center gap-1 ${
                      isResolved
                        ? "bg-ocean-900/50 text-ocean-300/60 border-ocean-300/10"
                        : "bg-ocean-500/15 hover:bg-ocean-500/25 text-ocean-200 border-ocean-300/25 shadow-sm"
                    }`}
                  >
                    {isResolved ? (
                      <>
                        <CheckCircle className="w-3 h-3 text-ocean-300" />
                        <span>Mitigated</span>
                      </>
                    ) : (
                      <span>Mitigate Risk</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

