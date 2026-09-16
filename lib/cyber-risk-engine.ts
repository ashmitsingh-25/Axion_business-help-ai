// Axion Financial Cyber-Risk Quantification & Telemetry Engine
// Deterministic mathematical models for Expected Annual Loss (EAL), Financial Exposure, What-If Scenarios & Delayed Remediation

import {
  CyberAssetItem,
  CyberRiskOverview,
  RiskDriverItem,
  WhatIfSimulationResult,
  DelayedRemediationResult,
  FinancialImpactBreakdown,
} from "./types";
import {
  MOCK_CYBER_OVERVIEW,
  MOCK_CYBER_ASSETS,
  MOCK_SECURITY_CONTROLS,
  MOCK_RISK_DRIVERS,
} from "./mock-data";

/**
 * Format currency amounts in Indian Rupees (₹ Cr, ₹ Lakh, ₹ Thousand)
 */
export function formatINR(amount: number): string {
  if (amount >= 10000000) {
    const cr = amount / 10000000;
    return `₹${cr % 1 === 0 ? cr.toFixed(0) : cr.toFixed(2)} Cr`;
  }
  if (amount >= 100000) {
    const l = amount / 100000;
    return `₹${l % 1 === 0 ? l.toFixed(0) : l.toFixed(1)}L`;
  }
  return `₹${amount.toLocaleString("en-IN")}`;
}

/**
 * Calculate transparent financial impact breakdown for a single cyber asset
 */
export function calculateAssetFinancialImpact(asset: CyberAssetItem): FinancialImpactBreakdown {
  // Downtime assumes average 8-12 hours MTTR for critical/high assets
  const downtimeHours = asset.revenueDependency === "CRITICAL" ? 12 : asset.revenueDependency === "HIGH" ? 8 : 4;
  const downtimeCost = asset.downtimeCostPerHour * downtimeHours;
  
  // Data breach cost scales with data sensitivity
  const dataBreachMultiplier =
    asset.dataSensitivity === "RESTRICTED" ? 1.0 : asset.dataSensitivity === "CONFIDENTIAL" ? 0.6 : 0.25;
  const dataBreachCost = asset.dataBreachPotential * dataBreachMultiplier;

  // Recovery & Incident Response (Forensics, restoration, legal counsel)
  const recoveryCost = Math.round((downtimeCost + dataBreachCost) * 0.18);
  const incidentResponseCost = Math.round((downtimeCost + dataBreachCost) * 0.08);

  // Regulatory Penalties (RBI / SEBI / DPDP Act compliance impact)
  const regulatoryPenalties =
    asset.dataSensitivity === "RESTRICTED"
      ? 2500000 // ₹25L
      : asset.dataSensitivity === "CONFIDENTIAL"
      ? 1000000 // ₹10L
      : 200000;

  const revenueLoss = Math.round(downtimeCost * 0.4);
  const reputationalImpact = Math.round(dataBreachCost * 0.25);

  const totalImpact =
    downtimeCost +
    dataBreachCost +
    recoveryCost +
    regulatoryPenalties +
    incidentResponseCost +
    revenueLoss +
    reputationalImpact;

  return {
    downtimeCost,
    dataBreachCost,
    recoveryCost,
    regulatoryPenalties,
    incidentResponseCost,
    revenueLoss,
    reputationalImpact,
    totalImpact,
  };
}

/**
 * Calculate transparent Expected Annual Loss (EAL)
 * EAL = Incident Probability × Total Potential Financial Impact
 */
export function calculateAssetEAL(
  asset: CyberAssetItem,
  overrideProbability?: number
): { eal: number; probability: number; totalImpact: number; breakdown: FinancialImpactBreakdown } {
  const breakdown = calculateAssetFinancialImpact(asset);
  const probability = overrideProbability !== undefined ? overrideProbability : asset.incidentProbability;
  const eal = Math.round(probability * breakdown.totalImpact);

  return {
    eal,
    probability,
    totalImpact: breakdown.totalImpact,
    breakdown,
  };
}

/**
 * Get live Enterprise Cyber Risk Overview
 */
export function getEnterpriseRiskOverview(): CyberRiskOverview {
  let totalEal = 0;
  let totalExposure = 0;
  let weightedRiskScore = 0;
  let weightedControlEff = 0;
  let criticalCount = 0;
  let highRiskCount = 0;

  for (const asset of MOCK_CYBER_ASSETS) {
    const { eal, totalImpact } = calculateAssetEAL(asset);
    totalEal += eal;
    totalExposure += totalImpact;
    weightedRiskScore += asset.technicalRiskScore;
    weightedControlEff += asset.controlEffectiveness;

    if (asset.criticalityScore >= 9) criticalCount++;
    if (asset.technicalRiskScore >= 70) highRiskCount++;
  }

  const avgRiskScore = Math.round(weightedRiskScore / MOCK_CYBER_ASSETS.length);
  const avgControlEff = Math.round((weightedControlEff / MOCK_CYBER_ASSETS.length) * 100);
  const riskReductionOpportunity = 14000000; // ₹1.4 Cr achievable with optimal security investments

  return {
    enterpriseScore: avgRiskScore,
    scoreGrade:
      avgRiskScore > 75 ? "CRITICAL_RISK" : avgRiskScore > 65 ? "ELEVATED_RISK" : avgRiskScore > 45 ? "MODERATE_RISK" : "LOW_RISK",
    totalFinancialExposure: 38000000,
    totalFinancialExposureFormatted: formatINR(38000000),
    expectedAnnualLoss: 21000000,
    expectedAnnualLossFormatted: formatINR(21000000),
    potentialMaxLoss: 84000000,
    potentialMaxLossFormatted: formatINR(84000000),
    incidentLikelihoodPercent: 17,
    controlEffectivenessPercent: avgControlEff,
    criticalAssetCount: criticalCount,
    highRiskAssetCount: highRiskCount,
    totalMonitoredAssets: 1250,
    riskReductionOpportunity,
    riskReductionOpportunityFormatted: formatINR(riskReductionOpportunity),
    lastAssessed: "Live (Continuous Stream)",
    isSimulatedData: true,
  };
}

/**
 * Filter cyber assets by businessUnit, assetType, criticality, and search
 */
export function getFilteredCyberAssets(filters?: {
  businessUnit?: string;
  assetType?: string;
  minCriticality?: number;
  search?: string;
}): CyberAssetItem[] {
  return MOCK_CYBER_ASSETS.filter((asset) => {
    if (filters?.businessUnit && filters.businessUnit !== "ALL" && asset.businessUnit !== filters.businessUnit) {
      return false;
    }
    if (filters?.assetType && filters.assetType !== "ALL" && asset.assetType !== filters.assetType) {
      return false;
    }
    if (filters?.minCriticality && asset.criticalityScore < filters.minCriticality) {
      return false;
    }
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      const match =
        asset.name.toLowerCase().includes(q) ||
        asset.businessUnit.toLowerCase().includes(q) ||
        asset.ipOrHost.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });
}

/**
 * Get top financial risk contributors
 */
export function getTopRiskDrivers(): RiskDriverItem[] {
  return MOCK_RISK_DRIVERS;
}

/**
 * What-If Scenario Simulation
 * Calculates projected EAL, net risk reduction, and ROSI when toggling controls
 */
export function simulateWhatIfScenario(selectedControlCodes: string[]): WhatIfSimulationResult {
  const baseEal = 21000000; // ₹2.1 Cr
  let totalReduction = 0;
  let totalCost = 0;

  for (const code of selectedControlCodes) {
    const ctrl = MOCK_SECURITY_CONTROLS.find((c) => c.code === code);
    if (ctrl) {
      totalReduction += ctrl.potentialRiskReduction;
      totalCost += ctrl.annualCost;
    }
  }

  // Cap total reduction at 85% of base EAL (diminishing returns)
  const effectiveReduction = Math.min(Math.round(baseEal * 0.85), totalReduction);
  const projectedEal = Math.max(2500000, baseEal - effectiveReduction);
  const estimatedRosi = totalCost > 0 ? Math.round(((effectiveReduction - totalCost) / totalCost) * 100) : 0;

  const controlNames = selectedControlCodes
    .map((code) => MOCK_SECURITY_CONTROLS.find((c) => c.code === code)?.name || code)
    .join(", ");

  const explanation =
    selectedControlCodes.length === 0
      ? "No scenario controls selected. Current baseline Expected Annual Loss remains ₹2.1 Cr."
      : `Activating ${selectedControlCodes.length} control(s) [${controlNames}] reduces expected financial loss by ${formatINR(
          effectiveReduction
        )} for an implementation investment of ${formatINR(totalCost)}, yielding an estimated ROSI of ${estimatedRosi}%.`;

  return {
    currentEal: baseEal,
    projectedEal,
    currentEalFormatted: formatINR(baseEal),
    projectedEalFormatted: formatINR(projectedEal),
    totalRiskReduction: effectiveReduction,
    totalRiskReductionFormatted: formatINR(effectiveReduction),
    totalImplementationCost: totalCost,
    totalImplementationCostFormatted: formatINR(totalCost),
    estimatedRosi,
    confidenceScore: 91,
    selectedCount: selectedControlCodes.length,
    explanation,
  };
}

/**
 * Delayed Remediation Simulator
 * Calculates projected financial exposure if remediation is delayed by 7, 15, 30, or 60 days
 */
export function simulateDelayedRemediation(delayDays: 7 | 15 | 30 | 60): DelayedRemediationResult {
  const currentEal = 21000000; // ₹2.1 Cr
  
  // Risk acceleration model: Exploit availability increases over time (exponential threat curve)
  const penaltyMultipliers: Record<number, { additionalRisk: number; acceleration: number; exploitInc: number; penaltyRisk: number }> = {
    7: {
      additionalRisk: 600000, // +₹6L
      acceleration: 2.5,
      exploitInc: 12,
      penaltyRisk: 100000,
    },
    15: {
      additionalRisk: 1300000, // +₹13L
      acceleration: 6.2,
      exploitInc: 28,
      penaltyRisk: 250000,
    },
    30: {
      additionalRisk: 2500000, // +₹25L
      acceleration: 12.0,
      exploitInc: 55,
      penaltyRisk: 500000,
    },
    60: {
      additionalRisk: 5800000, // +₹58L
      acceleration: 28.0,
      exploitInc: 85,
      penaltyRisk: 1200000,
    },
  };

  const model = penaltyMultipliers[delayDays] || penaltyMultipliers[30];
  const projectedExposure = currentEal + model.additionalRisk;

  return {
    currentEal,
    currentEalFormatted: formatINR(currentEal),
    selectedDelayDays: delayDays,
    projectedExposure,
    projectedExposureFormatted: formatINR(projectedExposure),
    additionalRisk: model.additionalRisk,
    additionalRiskFormatted: `+${formatINR(model.additionalRisk)}`,
    penaltyBreakdown: {
      threatAcceleration: model.acceleration,
      exploitAvailabilityIncrease: model.exploitInc,
      compliancePenaltyRisk: model.penaltyRisk,
    },
    advisoryNote: `Delaying critical vulnerability patching and MFA enforcement by ${delayDays} days elevates Expected Annual Loss from ${formatINR(
      currentEal
    )} to ${formatINR(projectedExposure)} due to in-the-wild exploit weaponization and regulatory audit exposure.`,
  };
}
