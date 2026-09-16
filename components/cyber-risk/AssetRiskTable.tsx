"use client";

import { useState } from "react";
import { Search, Filter, Database, Server, Shield, Globe, Cpu, Lock, AlertCircle } from "lucide-react";
import { CyberAssetItem } from "@/lib/types";
import { MOCK_CYBER_ASSETS } from "@/lib/mock-data";
import { formatINR } from "@/lib/cyber-risk-engine";

export function AssetRiskTable() {
  const [search, setSearch] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("ALL");
  const [selectedType, setSelectedType] = useState("ALL");
  const [minCriticality, setMinCriticality] = useState(0);

  const businessUnits = ["ALL", "Payments", "E-commerce", "Finance", "HR", "Cloud Infrastructure", "Corporate IT", "Customer Operations"];
  const assetTypes = ["ALL", "DATABASE", "AUTH_SERVER", "API_GATEWAY", "CLOUD_STORAGE", "MICROSERVICE", "ENDPOINT", "ERP"];

  const filteredAssets = MOCK_CYBER_ASSETS.filter((asset) => {
    if (selectedUnit !== "ALL" && asset.businessUnit !== selectedUnit) return false;
    if (selectedType !== "ALL" && asset.assetType !== selectedType) return false;
    if (asset.criticalityScore < minCriticality) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const match =
        asset.name.toLowerCase().includes(q) ||
        asset.businessUnit.toLowerCase().includes(q) ||
        asset.ipOrHost.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  const getAssetIcon = (type: string) => {
    switch (type) {
      case "DATABASE":
        return <Database className="w-4 h-4 text-blue-400" />;
      case "AUTH_SERVER":
        return <Lock className="w-4 h-4 text-purple-400" />;
      case "API_GATEWAY":
        return <Globe className="w-4 h-4 text-cyan-400" />;
      case "CLOUD_STORAGE":
        return <Server className="w-4 h-4 text-amber-400" />;
      case "MICROSERVICE":
        return <Cpu className="w-4 h-4 text-emerald-400" />;
      default:
        return <Shield className="w-4 h-4 text-zinc-400" />;
    }
  };

  return (
    <div className="p-6 rounded-2xl bg-zinc-900/60 border border-white/10 backdrop-blur-2xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_10px_30px_-10px_rgba(0,0,0,0.5)] space-y-5">
      {/* Table Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-white tracking-tight">
              Asset-Level Cyber Risk & Criticality Matrix
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-zinc-300 border border-white/10 font-semibold">
              {filteredAssets.length} of {MOCK_CYBER_ASSETS.length} Assets
            </span>
          </div>
          <p className="text-[11px] text-zinc-400 mt-0.5">
            Continuously calculates Technical Risk, Incident Likelihood (%), Potential Financial Impact & EAL
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter by asset, host or unit..."
            className="w-full bg-zinc-950/80 border border-white/10 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-white/30"
          />
        </div>
      </div>

      {/* Filter Chips Bar */}
      <div className="flex flex-wrap items-center gap-3 text-xs">
        <div className="flex items-center gap-1.5 text-zinc-400 text-[11px]">
          <Filter className="w-3 h-3 text-zinc-500" />
          <span>Department:</span>
        </div>
        <select
          value={selectedUnit}
          onChange={(e) => setSelectedUnit(e.target.value)}
          className="bg-zinc-950 border border-white/10 rounded-lg px-2.5 py-1 text-xs text-zinc-300 focus:outline-none"
        >
          {businessUnits.map((u) => (
            <option key={u} value={u}>
              {u}
            </option>
          ))}
        </select>

        <div className="flex items-center gap-1.5 text-zinc-400 text-[11px] ml-2">
          <span>Type:</span>
        </div>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="bg-zinc-950 border border-white/10 rounded-lg px-2.5 py-1 text-xs text-zinc-300 focus:outline-none"
        >
          {assetTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        <div className="flex items-center gap-1.5 text-zinc-400 text-[11px] ml-2">
          <span>Min Criticality:</span>
        </div>
        <select
          value={minCriticality}
          onChange={(e) => setMinCriticality(Number(e.target.value))}
          className="bg-zinc-950 border border-white/10 rounded-lg px-2.5 py-1 text-xs text-zinc-300 focus:outline-none"
        >
          <option value={0}>All (1-10)</option>
          <option value={8}>High / Critical (8+)</option>
          <option value={9}>Tier-1 Critical (9+)</option>
        </select>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[920px]">
          <thead>
            <tr className="border-b border-white/10 text-[10px] font-mono uppercase text-zinc-400 bg-zinc-950/40">
              <th className="py-3 px-3">Asset & Host</th>
              <th className="py-3 px-3">Unit</th>
              <th className="py-3 px-2 text-center">Criticality</th>
              <th className="py-3 px-2 text-center">Tech Risk</th>
              <th className="py-3 px-3 text-center">Likelihood</th>
              <th className="py-3 px-3 text-right">Potential Impact</th>
              <th className="py-3 px-3 text-right text-white">Expected Annual Loss (EAL)</th>
              <th className="py-3 px-2 text-center">Control Eff.</th>
              <th className="py-3 px-3 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-xs">
            {filteredAssets.map((asset) => (
              <tr key={asset.id} className="hover:bg-white/[0.02] transition-colors">
                {/* Asset Name + Host */}
                <td className="py-3.5 px-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-zinc-950 border border-white/10 shadow-sm flex-shrink-0">
                      {getAssetIcon(asset.assetType)}
                    </div>
                    <div>
                      <div className="font-bold text-white flex items-center gap-1.5">
                        <span>{asset.name}</span>
                        {asset.internetExposed && (
                          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20 font-semibold">
                            Public
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] font-mono text-zinc-400 mt-0.5">{asset.ipOrHost}</div>
                    </div>
                  </div>
                </td>

                {/* Business Unit */}
                <td className="py-3.5 px-3">
                  <span className="text-zinc-300 font-medium">{asset.businessUnit}</span>
                </td>

                {/* Criticality Score */}
                <td className="py-3.5 px-2 text-center">
                  <span
                    className={`font-mono font-bold text-xs px-2 py-0.5 rounded ${
                      asset.criticalityScore >= 9
                        ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                        : "bg-white/5 text-zinc-300 border border-white/10"
                    }`}
                  >
                    {asset.criticalityScore}/10
                  </span>
                </td>

                {/* Technical Risk */}
                <td className="py-3.5 px-2 text-center">
                  <span
                    className={`font-mono font-bold text-xs ${
                      asset.technicalRiskScore >= 75
                        ? "text-rose-400"
                        : asset.technicalRiskScore >= 60
                        ? "text-amber-300"
                        : "text-emerald-400"
                    }`}
                  >
                    {asset.technicalRiskScore}
                  </span>
                </td>

                {/* Incident Likelihood */}
                <td className="py-3.5 px-3 text-center font-mono text-zinc-300">
                  {Math.round(asset.incidentProbability * 100)}%
                </td>

                {/* Potential Impact */}
                <td className="py-3.5 px-3 text-right font-mono text-zinc-300">
                  {formatINR(asset.potentialImpact)}
                </td>

                {/* EAL */}
                <td className="py-3.5 px-3 text-right">
                  <div className="font-mono text-xs font-extrabold text-white">
                    {formatINR(asset.expectedAnnualLoss)}
                  </div>
                  <div className="text-[10px] text-zinc-400">
                    {Math.round(asset.incidentProbability * 100)}% × {formatINR(asset.potentialImpact)}
                  </div>
                </td>

                {/* Control Effectiveness */}
                <td className="py-3.5 px-2 text-center font-mono">
                  <span
                    className={`text-xs font-bold ${
                      asset.controlEffectiveness >= 0.75
                        ? "text-emerald-400"
                        : asset.controlEffectiveness >= 0.6
                        ? "text-amber-300"
                        : "text-rose-400"
                    }`}
                  >
                    {Math.round(asset.controlEffectiveness * 100)}%
                  </span>
                </td>

                {/* Status */}
                <td className="py-3.5 px-3 text-center">
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-bold">
                    {asset.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
