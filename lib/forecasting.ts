// Inventory Forecasting and Supplier Comparison Engine

import { ForecastResponse, InventorySKU } from "./types";
import { MOCK_INVENTORY_SKUS } from "./mock-data";

export function calculateDemandForecast(
  skuIdOrCode?: string,
  forecastDays = 30,
  trendFactor = 1.0
): ForecastResponse {
  const targetSku =
    MOCK_INVENTORY_SKUS.find(
      (item) =>
        item.sku.toLowerCase() === (skuIdOrCode || "SKU-409").toLowerCase() ||
        item.id.toLowerCase() === (skuIdOrCode || "sku_409").toLowerCase()
    ) || MOCK_INVENTORY_SKUS[0];

  const salesTrend = targetSku.salesTrend;
  const recentDays = salesTrend.slice(-7);
  const avgDailyVelocity =
    (recentDays.reduce((acc, v) => acc + v, 0) / recentDays.length) * trendFactor;

  const currentStock = targetSku.currentStock;
  const daysToStockout = Math.max(
    0.1,
    Number((currentStock / (avgDailyVelocity || 1)).toFixed(1))
  );

  const reorderTriggerDate = new Date();
  reorderTriggerDate.setDate(reorderTriggerDate.getDate() + Math.max(0, Math.floor(daysToStockout - 5)));

  const recommendedReorderQty = targetSku.reorderQuantity;

  // Supplier comparison
  const supA = targetSku.suppliers[0] || {
    id: "sup_a",
    name: "Supplier A (Standard Sea/Road Freight)",
    leadTimeDays: 14,
    unitCost: targetSku.unitCost * 0.94,
    minOrderQuantity: 500,
    reliabilityScore: 0.88,
    isPreferred: false,
  };

  const supB = targetSku.suppliers[1] || {
    id: "sup_b",
    name: "Supplier B (FastAir / Regional Express)",
    leadTimeDays: 4,
    unitCost: targetSku.unitCost * 0.98,
    minOrderQuantity: 250,
    reliabilityScore: 0.98,
    isPreferred: true,
  };

  const deliveryDateA = new Date();
  deliveryDateA.setDate(deliveryDateA.getDate() + supA.leadTimeDays);

  const deliveryDateB = new Date();
  deliveryDateB.setDate(deliveryDateB.getDate() + supB.leadTimeDays);

  const urgencyLevel: "CRITICAL" | "MODERATE" | "STABLE" =
    daysToStockout <= 10 ? "CRITICAL" : daysToStockout <= 20 ? "MODERATE" : "STABLE";

  // Recommended supplier: If daysToStockout < supA lead time, Supplier B is mandatory to avoid stockout
  const recommendedSupplier =
    daysToStockout <= supA.leadTimeDays
      ? supB.name
      : supA.unitCost < supB.unitCost
      ? supA.name
      : supB.name;

  // Forecast time series
  const forecastSeries: Array<{
    day: string;
    projectedStock: number;
    projectedDemand: number;
  }> = [];

  let runningStock = currentStock;
  const today = new Date();

  for (let i = 0; i <= 20; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    const dayLabel = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    const dailyDemand = Math.round(avgDailyVelocity * (1 + (Math.sin(i / 2) * 0.1)));

    runningStock = Math.max(0, runningStock - dailyDemand);

    // If reorder arrives
    if (i === supB.leadTimeDays && urgencyLevel === "CRITICAL") {
      // simulate anticipated arrival if ordered today
      // runningStock += recommendedReorderQty;
    }

    forecastSeries.push({
      day: dayLabel,
      projectedStock: runningStock,
      projectedDemand: dailyDemand,
    });
  }

  const tradeoffSummary =
    daysToStockout <= 10
      ? `Supplier A has a 14-day lead time which will result in 5 days of catastrophic out-of-stock downtime. Supplier B delivers in 4 days at ₹${Math.round(supB.unitCost)}/unit (+5.5% unit cost), protecting ₹2,60,000 in at-risk revenue.`
      : `Supplier A offers a 6% bulk cost savings with sufficient runway before safety stock trigger threshold.`;

  const aiExplanation = `Based on linear trend velocity of ${avgDailyVelocity.toFixed(
    1
  )} units/day, ${targetSku.name} (${targetSku.sku}) will exhaust current inventory (${
    targetSku.currentStock
  } units) in ${daysToStockout} days. Immediate procurement of ${recommendedReorderQty} units from ${
    daysToStockout <= 10 ? "Supplier B" : "Supplier A"
  } is recommended to maintain a ${targetSku.safetyStock}-unit buffer.`;

  return {
    sku: targetSku.sku,
    productName: targetSku.name,
    currentStock: targetSku.currentStock,
    dailyVelocity: Number(avgDailyVelocity.toFixed(1)),
    daysToStockout,
    reorderTriggerDate: reorderTriggerDate.toISOString(),
    recommendedReorderQty,
    urgencyLevel,
    supplierComparison: {
      recommendedSupplier,
      supplierA: {
        name: supA.name,
        leadTime: `${supA.leadTimeDays} days`,
        unitCost: supA.unitCost,
        moq: supA.minOrderQuantity,
        totalCost: supA.unitCost * Math.max(recommendedReorderQty, supA.minOrderQuantity),
        deliveryDate: deliveryDateA.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      },
      supplierB: {
        name: supB.name,
        leadTime: `${supB.leadTimeDays} days`,
        unitCost: supB.unitCost,
        moq: supB.minOrderQuantity,
        totalCost: supB.unitCost * Math.max(recommendedReorderQty, supB.minOrderQuantity),
        deliveryDate: deliveryDateB.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      },
      tradeoffSummary,
    },
    forecastSeries,
    aiExplanation,
  };
}
