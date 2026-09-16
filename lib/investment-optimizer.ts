// Axion Security Investment Optimization Engine
// Mathematical 0/1 Knapsack Dynamic Programming solver for optimal security budget allocation & ROSI maximization

import {
  SecurityInvestmentOption,
  KnapsackOptimizationResult,
  DiminishingReturnsPoint,
} from "./types";
import {
  MOCK_SECURITY_INVESTMENTS,
  MOCK_DIMINISHING_RETURNS_CURVE,
} from "./mock-data";
import { formatINR } from "./cyber-risk-engine";

/**
 * 0/1 Knapsack Dynamic Programming Optimization
 * 
 * Objective: MAXIMIZE Total Expected Risk Reduction
 * Subject to: Total Investment Cost <= Available Budget
 */
export function optimizeSecurityBudget(
  budgetINR: number,
  options: SecurityInvestmentOption[] = MOCK_SECURITY_INVESTMENTS
): KnapsackOptimizationResult {
  const budget = Math.max(0, budgetINR);
  const n = options.length;

  if (budget === 0 || n === 0) {
    return {
      budget,
      budgetFormatted: formatINR(budget),
      totalInvestment: 0,
      totalInvestmentFormatted: "₹0",
      totalRiskReduction: 0,
      totalRiskReductionFormatted: "₹0",
      netBenefit: 0,
      netBenefitFormatted: "₹0",
      overallRosiPercent: 0,
      budgetUtilizationPercent: 0,
      selectedInvestments: [],
      unselectedInvestments: options,
      algorithmUsed: "0/1 Knapsack Dynamic Programming with Integer Scaling",
      summaryNarrative: "Zero budget allocated. No security investments selected.",
    };
  }

  // Scale down currency by unit step size (₹50,000) for fast DP table computation
  const SCALE = 50000;
  const W = Math.floor(budget / SCALE);

  const weights = options.map((opt) => Math.max(1, Math.ceil(opt.cost / SCALE)));
  const values = options.map((opt) => Math.round(opt.riskReduction / 1000)); // in thousands

  // DP table: dp[i][w]
  const dp: number[][] = Array.from({ length: n + 1 }, () => Array(W + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    const wt = weights[i - 1];
    const val = values[i - 1];
    for (let w = 0; w <= W; w++) {
      if (wt <= w) {
        dp[i][w] = Math.max(dp[i - 1][w], dp[i - 1][w - wt] + val);
      } else {
        dp[i][w] = dp[i - 1][w];
      }
    }
  }

  // Backtrack to identify selected items
  const selected: SecurityInvestmentOption[] = [];
  const unselected: SecurityInvestmentOption[] = [];
  let currW = W;

  for (let i = n; i > 0; i--) {
    if (dp[i][currW] !== dp[i - 1][currW]) {
      selected.push(options[i - 1]);
      currW -= weights[i - 1];
    } else {
      unselected.push(options[i - 1]);
    }
  }

  selected.reverse();
  unselected.reverse();

  // Compute aggregated financial metrics
  const totalInvestment = selected.reduce((sum, item) => sum + item.cost, 0);
  const totalRiskReduction = selected.reduce((sum, item) => sum + item.riskReduction, 0);
  const netBenefit = Math.max(0, totalRiskReduction - totalInvestment);
  const overallRosiPercent =
    totalInvestment > 0 ? Math.round(((totalRiskReduction - totalInvestment) / totalInvestment) * 100) : 0;
  const budgetUtilizationPercent =
    budget > 0 ? Math.min(100, Math.round((totalInvestment / budget) * 100)) : 0;

  // Generate executive decision narrative
  const selectedTitles = selected.map((s) => s.title).join(", ");
  const narrative =
    selected.length > 0
      ? `Under a ${formatINR(budget)} budget envelope, the 0/1 Knapsack optimization algorithm selected ${
          selected.length
        } high-impact initiatives (${selectedTitles}), achieving ${formatINR(
          totalRiskReduction
        )} in expected financial risk reduction for an outlay of ${formatINR(
          totalInvestment
        )} (${budgetUtilizationPercent}% budget utilization). Estimated Return on Security Investment (ROSI) is ${overallRosiPercent}%.`
      : `The available budget of ${formatINR(budget)} is insufficient to fund the minimum high-priority control (${
          options[0]?.title
        } at ${formatINR(options[0]?.cost || 0)}).`;

  return {
    budget,
    budgetFormatted: formatINR(budget),
    totalInvestment,
    totalInvestmentFormatted: formatINR(totalInvestment),
    totalRiskReduction,
    totalRiskReductionFormatted: formatINR(totalRiskReduction),
    netBenefit,
    netBenefitFormatted: formatINR(netBenefit),
    overallRosiPercent,
    budgetUtilizationPercent,
    selectedInvestments: selected,
    unselectedInvestments: unselected,
    algorithmUsed: "0/1 Knapsack Dynamic Programming with Integer Scaling",
    summaryNarrative: narrative,
  };
}

/**
 * Get the Diminishing Returns Curve dataset for charting
 */
export function getDiminishingReturnsCurve(): DiminishingReturnsPoint[] {
  return MOCK_DIMINISHING_RETURNS_CURVE;
}

/**
 * Calculate ROSI for an ad-hoc custom investment
 */
export function calculateCustomROSI(cost: number, riskReduction: number): {
  cost: number;
  riskReduction: number;
  netBenefit: number;
  rosiPercent: number;
  costFormatted: string;
  riskReductionFormatted: string;
  netBenefitFormatted: string;
} {
  const netBenefit = Math.max(0, riskReduction - cost);
  const rosiPercent = cost > 0 ? Math.round(((riskReduction - cost) / cost) * 100) : 0;

  return {
    cost,
    riskReduction,
    netBenefit,
    rosiPercent,
    costFormatted: formatINR(cost),
    riskReductionFormatted: formatINR(riskReduction),
    netBenefitFormatted: formatINR(netBenefit),
  };
}
