"use client";

import { useState, useEffect } from "react";
import {
  Boxes,
  TrendingDown,
  Clock,
  Truck,
  ShieldAlert,
  CheckCircle2,
  ArrowRight,
  RefreshCw,
  Zap,
  Info,
  Check,
} from "lucide-react";
import { MOCK_INVENTORY_SKUS } from "@/lib/mock-data";
import { ForecastResponse } from "@/lib/types";
import { calculateDemandForecast } from "@/lib/forecasting";
import { formatCurrency } from "@/lib/utils";

export default function InventoryPage() {
  const [selectedSkuCode, setSelectedSkuCode] = useState("SKU-409");
  const [forecast, setForecast] = useState<ForecastResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  useEffect(() => {
    loadForecast(selectedSkuCode);
  }, [selectedSkuCode]);

  const loadForecast = async (sku: string) => {
    setIsLoading(true);
    setOrderPlaced(false);
    try {
      const res = await fetch(`/api/inventory/forecast?sku=${sku}`);
      if (res.ok) {
        const data = await res.json();
        setForecast(data.forecast);
      } else {
        const clientFc = calculateDemandForecast(sku);
        setForecast(clientFc);
      }
    } catch (err) {
      console.error("Forecast fetch error:", err);
      const clientFc = calculateDemandForecast(sku);
      setForecast(clientFc);
    } finally {
      setIsLoading(false);
    }
  };

  const selectedItem =
    MOCK_INVENTORY_SKUS.find((s) => s.sku === selectedSkuCode) || MOCK_INVENTORY_SKUS[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-zinc-900 border border-zinc-700 text-white text-xs px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-fade-in">
          <Info className="w-4 h-4 text-blue-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-sans">
              Inventory & Demand Copilot
            </h1>
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-bold">
              Predictive Reorder Engine
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Projects SKU stockout horizons and optimizes multi-supplier tradeoffs in real time
          </p>
        </div>

        {/* Quick SKU selector */}
        <div className="flex items-center gap-2 bg-zinc-900 p-1.5 rounded-xl border border-zinc-800">
          <span className="text-xs text-zinc-400 font-mono px-2">Select SKU:</span>
          {MOCK_INVENTORY_SKUS.map((item) => (
            <button
              key={item.sku}
              onClick={() => {
                setSelectedSkuCode(item.sku);
                showToast(`Loaded ${item.sku}`);
              }}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                selectedSkuCode === item.sku
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {item.sku}
            </button>
          ))}
        </div>
      </div>

      {/* Stockout Alert Banner for SKU-409 */}
      {selectedSkuCode === "SKU-409" && (
        <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900 border border-zinc-700 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3">
            <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-blue-400 flex-shrink-0">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white uppercase font-mono tracking-wider">
                  Critical Stockout Warning
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-400 font-bold font-mono">
                  9 DAYS REMAINING
                </span>
              </div>
              <p className="text-xs text-zinc-300 mt-0.5">
                <strong>Apex ANC Headphones</strong> runs out in 9 days. Supplier A (14-day lead time) will fail. Order <strong>350 units from Supplier B</strong> (4-day lead time) immediately.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setOrderPlaced(true);
              showToast("Purchase Order of 350 units triggered to Supplier B!");
            }}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex-shrink-0 ${
              orderPlaced
                ? "bg-zinc-800 text-zinc-200 border border-zinc-700"
                : "bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/25 active:scale-95"
            }`}
          >
            {orderPlaced ? "PO Dispatched to Supplier B" : "Auto-Order 350 Units (Supplier B)"}
          </button>
        </div>
      )}

      {/* Forecasting & Supplier Comparison Section */}
      {forecast && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Forecast Metrics & Supplier Tradeoff (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Key Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800">
                <div className="text-[10px] text-zinc-400 uppercase font-mono">Current Stock</div>
                <div className="text-lg font-extrabold text-white mt-1">
                  {forecast.currentStock} units
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800">
                <div className="text-[10px] text-zinc-400 uppercase font-mono">Daily Velocity</div>
                <div className="text-lg font-extrabold text-blue-400 mt-1">
                  {forecast.dailyVelocity} / day
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800">
                <div className="text-[10px] text-zinc-400 uppercase font-mono">Days to Stockout</div>
                <div className="text-lg font-extrabold text-white mt-1">
                  {forecast.daysToStockout} Days
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800">
                <div className="text-[10px] text-zinc-400 uppercase font-mono">Recommended Reorder</div>
                <div className="text-lg font-extrabold text-blue-400 mt-1">
                  {forecast.recommendedReorderQty} units
                </div>
              </div>
            </div>

            {/* Supplier Comparison Matrix: Supplier A vs Supplier B */}
            <div className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 shadow-xl space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-blue-400" />
                  <h2 className="text-sm font-bold text-white">
                    Multi-Supplier Optimization Matrix
                  </h2>
                </div>
                <span className="text-[10px] font-mono text-zinc-400">
                  Target: {forecast.recommendedReorderQty} Units
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Supplier A Card */}
                <div className="p-4 rounded-xl border bg-zinc-950 border-zinc-800 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-white">
                        {forecast.supplierComparison.supplierA.name}
                      </span>
                    </div>

                    <div className="space-y-1.5 text-xs text-zinc-300 mt-3">
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Lead Time:</span>
                        <span className="font-mono text-zinc-200 font-bold">
                          {forecast.supplierComparison.supplierA.leadTime}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Unit Cost:</span>
                        <span className="font-mono">
                          {formatCurrency(forecast.supplierComparison.supplierA.unitCost)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Min Order Qty:</span>
                        <span className="font-mono">
                          {forecast.supplierComparison.supplierA.moq} units
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Est. Delivery:</span>
                        <span className="font-mono">
                          {forecast.supplierComparison.supplierA.deliveryDate}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-zinc-800 text-[11px] text-zinc-400 font-mono">
                    {forecast.daysToStockout <= 14 ? "⚠️ Exceeds 9-day stockout runway" : "Sufficient runway"}
                  </div>
                </div>

                {/* Supplier B Card (Recommended for fast lead time) */}
                <div className="p-4 rounded-xl border bg-blue-950/20 border-blue-500/30 flex flex-col justify-between shadow-md">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-white">
                        {forecast.supplierComparison.supplierB.name}
                      </span>
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 font-bold">
                        RECOMMENDED
                      </span>
                    </div>

                    <div className="space-y-1.5 text-xs text-zinc-300 mt-3">
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Lead Time:</span>
                        <span className="font-mono text-blue-400 font-bold">
                          {forecast.supplierComparison.supplierB.leadTime}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Unit Cost:</span>
                        <span className="font-mono">
                          {formatCurrency(forecast.supplierComparison.supplierB.unitCost)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Min Order Qty:</span>
                        <span className="font-mono">
                          {forecast.supplierComparison.supplierB.moq} units
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Est. Delivery:</span>
                        <span className="font-mono text-blue-300">
                          {forecast.supplierComparison.supplierB.deliveryDate}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-zinc-800 text-[11px] text-blue-300 font-mono">
                    ✓ Arrives 5 days prior to stockout
                  </div>
                </div>
              </div>

              {/* Tradeoff Explanation */}
              <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-300 leading-relaxed font-sans">
                <span className="font-bold text-blue-400 uppercase font-mono text-[10px] block mb-1">
                  Automated Decision Tradeoff:
                </span>
                {forecast.supplierComparison.tradeoffSummary}
              </div>
            </div>
          </div>

          {/* Right Column: 20-Day Projected Stockout Trajectory (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <TrendingDown className="w-4 h-4 text-blue-400" />
                  <h3 className="text-sm font-bold text-white">Stock Depletion Trajectory</h3>
                </div>
                <span className="text-[10px] font-mono text-zinc-400">Next 14 Days</span>
              </div>

              {/* Mini Bar Chart Projection */}
              <div className="space-y-2 pt-2">
                {forecast.forecastSeries.slice(0, 10).map((pt, i) => {
                  const pct = Math.max(4, Math.round((pt.projectedStock / (selectedItem.currentStock || 1)) * 100));
                  return (
                    <div key={i} className="flex items-center gap-2 text-xs">
                      <span className="w-16 text-[10px] text-zinc-400 font-mono">{pt.day}</span>
                      <div className="flex-1 h-4 bg-zinc-950 rounded-md overflow-hidden p-0.5 border border-zinc-800">
                        <div
                          className="h-full rounded transition-all duration-300 bg-blue-600"
                          style={{ width: `${Math.min(100, pct)}%` }}
                        />
                      </div>
                      <span className="w-12 text-right font-mono text-[11px] font-bold text-zinc-200">
                        {pt.projectedStock}u
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Action Trigger */}
              <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-zinc-500 uppercase font-mono">Estimated Reorder Cost</div>
                  <div className="text-xs font-extrabold text-white">
                    {formatCurrency(
                      forecast.recommendedReorderQty * forecast.supplierComparison.supplierB.unitCost
                    )}
                  </div>
                </div>

                <button
                  onClick={() => {
                    setOrderPlaced(true);
                    showToast(`Reorder of ${forecast.recommendedReorderQty} units placed!`);
                  }}
                  disabled={orderPlaced}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                    orderPlaced
                      ? "bg-zinc-800 text-zinc-200 border border-zinc-700"
                      : "bg-blue-600 hover:bg-blue-500 text-white shadow-md active:scale-95"
                  }`}
                >
                  {orderPlaced ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                      <span>PO Triggered</span>
                    </>
                  ) : (
                    <>
                      <span>Trigger Reorder</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Master SKU Inventory Table */}
      <div className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800">
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <div>
            <h2 className="text-sm font-bold text-white tracking-tight">
              Enterprise SKU Master Catalog & Velocity Telemetry
            </h2>
            <p className="text-[11px] text-zinc-400">
              Live stock counts, daily sales rate, and automated days-to-stockout calculations
            </p>
          </div>
          <span className="text-[10px] font-mono text-zinc-400">
            {MOCK_INVENTORY_SKUS.length} Monitored SKUs
          </span>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs min-w-[750px]">
            <thead>
              <tr className="border-b border-zinc-800 text-[10px] font-mono uppercase text-zinc-400">
                <th className="py-3 px-3">SKU Code</th>
                <th className="py-3 px-3">Product Name</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3 text-right">Current Stock</th>
                <th className="py-3 px-3 text-right">Velocity</th>
                <th className="py-3 px-3 text-right">Runway</th>
                <th className="py-3 px-3 text-right">Reorder Qty</th>
                <th className="py-3 px-3 text-center">Health</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 font-sans">
              {MOCK_INVENTORY_SKUS.map((sku) => {
                const isSelected = sku.sku === selectedSkuCode;
                return (
                  <tr
                    key={sku.id}
                    onClick={() => {
                      setSelectedSkuCode(sku.sku);
                      showToast(`Selected ${sku.sku}`);
                    }}
                    className={`cursor-pointer transition-colors ${
                      isSelected ? "bg-zinc-950 font-medium" : "hover:bg-zinc-950/40"
                    }`}
                  >
                    <td className="py-3 px-3 font-mono font-bold text-blue-400">{sku.sku}</td>
                    <td className="py-3 px-3 font-bold text-white">{sku.name}</td>
                    <td className="py-3 px-3 text-zinc-400">{sku.category}</td>
                    <td className="py-3 px-3 text-right font-mono font-semibold text-zinc-200">
                      {sku.currentStock}
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-blue-400">
                      {sku.dailySalesRate} / day
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-white">
                      {sku.daysToStockout}d
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-zinc-300">
                      {sku.reorderQuantity}u
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded-full border bg-zinc-950 text-zinc-300 border-zinc-700">
                        {sku.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedSkuCode(sku.sku);
                          showToast(`Selected ${sku.sku}`);
                        }}
                        className="text-[10px] text-blue-400 hover:text-blue-300 font-semibold underline"
                      >
                        Forecast
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
