"use client";

import { useState } from "react";
import { TrendingUp, Sparkles, Check, ArrowRight, ShieldCheck } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { MOCK_PRICING_INSIGHTS } from "@/lib/mock-data";

export function PricingCard() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const insight = MOCK_PRICING_INSIGHTS[selectedIdx] || MOCK_PRICING_INSIGHTS[0];
  const [isApplied, setIsApplied] = useState(false);

  const delta = insight.recommendedPrice - insight.currentPrice;
  const isUpward = delta >= 0;

  return (
    <div className="rounded-2xl bg-ocean-900/40 border border-ocean-300/15 p-6 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.35),inset_0_1px_0_0_rgba(94,234,212,0.12)] relative overflow-hidden transition-all duration-300 hover:border-ocean-300/30">
      <div className="flex items-center justify-between gap-4 pb-4 border-b border-ocean-300/10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-ocean-500/10 text-ocean-300 border border-ocean-300/20 shadow-[inset_0_1px_0_0_rgba(94,234,212,0.15)]">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white tracking-tight">
              AI Dynamic Pricing Optimizer
            </h3>
            <p className="text-[11px] text-ocean-200/60">
              Real-time price elasticity calibration & margin maximization
            </p>
          </div>
        </div>

        {/* SKU Selector Tabs */}
        <div className="flex items-center gap-1 bg-ocean-950/80 p-1 rounded-xl border border-ocean-300/15 text-xs">
          {MOCK_PRICING_INSIGHTS.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => {
                setSelectedIdx(idx);
                setIsApplied(false);
              }}
              className={`px-3 py-1 rounded-lg text-[11px] font-mono transition-all ${
                selectedIdx === idx
                  ? "bg-ocean-400 text-ocean-950 font-bold shadow-sm"
                  : "text-ocean-200/70 hover:text-white hover:bg-ocean-800/60"
              }`}
            >
              {item.sku}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 space-y-5">
        {/* Product Title */}
        <div>
          <div className="text-[10px] uppercase font-mono tracking-wider text-ocean-300 font-bold">
            Target Product
          </div>
          <div className="text-base font-bold text-white mt-0.5">{insight.productName}</div>
        </div>

        {/* Price Delta Comparison Matrix */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3.5 rounded-xl bg-ocean-950/70 border border-ocean-300/10">
            <div className="text-[10px] text-ocean-200/60 uppercase font-mono">Current Price</div>
            <div className="text-sm sm:text-base font-extrabold text-ocean-100 mt-1">
              {formatCurrency(insight.currentPrice)}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-ocean-500/10 border border-ocean-300/25 relative shadow-[inset_0_1px_0_0_rgba(94,234,212,0.15)]">
            <div className="text-[10px] text-ocean-200 uppercase font-mono flex items-center justify-between font-bold">
              <span>Optimized</span>
              <Sparkles className="w-3 h-3 text-ocean-300" />
            </div>
            <div className="text-sm sm:text-base font-extrabold text-white mt-1 flex items-center gap-1">
              <span>{formatCurrency(insight.recommendedPrice)}</span>
              <span className="text-[10px] text-ocean-300 font-normal">
                ({isUpward ? `+${formatCurrency(delta)}` : formatCurrency(delta)})
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-ocean-950/70 border border-ocean-300/10">
            <div className="text-[10px] text-ocean-200/60 uppercase font-mono">Competitor Benchmark</div>
            <div className="text-sm sm:text-base font-extrabold text-ocean-200/60 mt-1">
              {formatCurrency(insight.competitorAvg)}
            </div>
          </div>
        </div>

        {/* Elasticity & Projected Impact */}
        <div className="p-4 rounded-xl bg-ocean-950/70 border border-ocean-300/10 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <div className="text-[10px] text-ocean-300 uppercase font-mono font-bold">Elasticity Coefficient</div>
              <div className="text-xs font-bold text-white mt-0.5 flex items-center gap-2">
                <span>{insight.elasticityScore}</span>
                <span className="text-[10px] font-normal text-ocean-200/60">
                  ({insight.elasticityScore < 1.0 ? "Inelastic Demand" : "Elastic Demand"})
                </span>
              </div>
            </div>
            <div>
              <div className="text-[10px] text-ocean-300 uppercase font-mono font-bold">Projected Margin Impact</div>
              <div className="text-xs font-bold text-ocean-200 mt-0.5 font-mono">
                {insight.projectedRevenue}
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-ocean-300/10">
            <div className="text-[10px] text-ocean-300 uppercase font-mono mb-1 font-bold">
              Strategic Rationale
            </div>
            <p className="text-[11px] text-ocean-100/90 leading-relaxed font-sans">
              {insight.reasoning}
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2 text-xs text-ocean-200/70">
            <ShieldCheck className="w-4 h-4 text-ocean-300" />
            <span>Confidence: {insight.confidenceScore}%</span>
          </div>

          <button
            onClick={() => setIsApplied(true)}
            disabled={isApplied}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              isApplied
                ? "bg-ocean-500/20 text-ocean-200 border border-ocean-300/30"
                : "bg-gradient-to-r from-ocean-400 to-ocean-500 hover:from-ocean-300 hover:to-ocean-400 text-ocean-950 font-bold shadow-[0_0_20px_rgba(32,201,166,0.25)] active:scale-95"
            }`}
          >
            {isApplied ? (
              <>
                <Check className="w-3.5 h-3.5 text-ocean-200" />
                <span>Price Updated in ERP</span>
              </>
            ) : (
              <>
                <span>Apply Optimized Price</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

