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
    <div className={`rounded-2xl bg-zinc-900/80 border border-zinc-800 p-5 ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-white tracking-tight">
              Live Cross-Department Risk Detector
            </h3>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
              {filteredRisks.length} Detected
            </span>
          </div>
          <p className="text-[11px] text-zinc-400">
            Autonomous threat detection across stock, returns, fraud, & expenses
          </p>
        </div>

        {/* Department Filter Tabs */}
        <div className="flex items-center gap-1 bg-zinc-950 p-1 rounded-lg border border-zinc-800 text-xs overflow-x-auto">
          {["ALL", "INVENTORY", "FINANCE", "CUSTOMER_OPS", "SUPPLY_CHAIN"].map((dept) => (
            <button
              key={dept}
              onClick={() => setFilterDept(dept)}
              className={`px-2.5 py-1 rounded-md text-[10px] font-medium transition-colors whitespace-nowrap ${
                filterDept === dept
                  ? "bg-blue-600 text-white shadow-sm font-semibold"
                  : "text-zinc-400 hover:text-white"
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
                  ? "bg-zinc-950/40 border-zinc-850 opacity-60"
                  : "bg-zinc-950 border-zinc-800 hover:border-zinc-700"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-blue-400 flex-shrink-0 mt-0.5">
                    <DeptIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`text-xs font-bold ${
                          isResolved ? "line-through text-zinc-500" : "text-white"
                        }`}
                      >
                        {risk.title}
                      </span>
                      <span className="text-[9px] font-mono px-2 py-0.2 rounded-full border bg-zinc-900 text-zinc-300 border-zinc-700">
                        {risk.severity}
                      </span>
                      <span className="text-[10px] text-zinc-500 font-mono">
                        {risk.timestamp}
                      </span>
                    </div>

                    <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">
                      {risk.description}
                    </p>

                    {/* Suggested Action */}
                    <div className="mt-2.5 p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 flex items-start gap-2">
                      <div className="text-[10px] font-bold text-blue-400 uppercase tracking-wider flex-shrink-0 mt-0.5">
                        Action:
                      </div>
                      <div className="text-[11px] text-zinc-300 font-sans">
                        {risk.suggestedAction}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Impact Score & Action */}
                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                  <div className="text-right">
                    <div className="text-[9px] text-zinc-500 uppercase">Impact Score</div>
                    <div className="text-xs font-extrabold text-white">{risk.impactScore}/100</div>
                  </div>
                  <button
                    onClick={() => handleResolve(risk.id)}
                    className={`text-[10px] font-semibold px-2.5 py-1 rounded-lg border transition-all flex items-center gap-1 ${
                      isResolved
                        ? "bg-zinc-800 text-zinc-300 border-zinc-700"
                        : "bg-blue-600/15 hover:bg-blue-600/25 text-blue-400 border-blue-500/30"
                    }`}
                  >
                    {isResolved ? (
                      <>
                        <CheckCircle className="w-3 h-3 text-blue-400" />
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
