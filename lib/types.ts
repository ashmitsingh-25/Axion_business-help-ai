// Axion Platform Type Definitions

export type DecisionStatus = "approve" | "deny" | "escalate";
export type ResolutionType = "exchange" | "refund" | "replacement" | "store_credit";

export interface RiskFactorItem {
  factor: string;
  impact: string;
  status: "SAFE" | "ATTENTION" | "FLAGGED";
  scoreDelta: number;
}

export interface ReturnDecisionRequest {
  orderId: string;
  customerReason: string;
  itemCondition?: string;
  customerTier?: string;
  itemSku?: string;
  itemName?: string;
  photoUrl?: string;
  requestedResolution?: string;
  returnFrequency?: string; // "FIRST_TIME", "OCCASIONAL", "FREQUENT_RETURNS"
  currentSize?: string;
}

export interface ReturnDecisionResponse {
  decision: DecisionStatus;
  resolution: ResolutionType;
  confidence: number;
  reasoning: string;
  suggestedAlternative?: string;
  policyChecks: string[];
  riskScore: number;
  riskLevel: "LOW" | "MODERATE" | "HIGH" | "CRITICAL";
  riskBreakdown: RiskFactorItem[];
  customerTier: string;
  orderNumber: string;
  itemTitle: string;
  retainedGmv: number;
  timelineEstimate: string;
}

export interface InventorySKU {
  id: string;
  sku: string;
  name: string;
  category: string;
  currentStock: number;
  unitCost: number;
  sellingPrice: number;
  dailySalesRate: number;
  daysToStockout: number;
  reorderPoint: number;
  reorderQuantity: number;
  safetyStock: number;
  status: "HEALTHY" | "LOW_STOCK" | "CRITICAL" | "OUT_OF_STOCK";
  suppliers: SupplierData[];
  salesTrend: number[]; // 14-day daily sales history
}

export interface SupplierData {
  id: string;
  name: string;
  leadTimeDays: number;
  unitCost: number;
  minOrderQuantity: number;
  reliabilityScore: number;
  isPreferred: boolean;
}

export interface ForecastRequest {
  sku?: string;
  forecastDays?: number;
  trendFactor?: number;
}

export interface ForecastResponse {
  sku: string;
  productName: string;
  currentStock: number;
  dailyVelocity: number;
  daysToStockout: number;
  reorderTriggerDate: string;
  recommendedReorderQty: number;
  urgencyLevel: "CRITICAL" | "MODERATE" | "STABLE";
  supplierComparison: {
    recommendedSupplier: string;
    supplierA: {
      name: string;
      leadTime: string;
      unitCost: number;
      moq: number;
      totalCost: number;
      deliveryDate: string;
    };
    supplierB: {
      name: string;
      leadTime: string;
      unitCost: number;
      moq: number;
      totalCost: number;
      deliveryDate: string;
    };
    tradeoffSummary: string;
  };
  forecastSeries: Array<{
    day: string;
    projectedStock: number;
    projectedDemand: number;
  }>;
  aiExplanation: string;
}

export interface ExpenseAuditRequest {
  employeeName: string;
  employeeRole: string;
  department: string;
  vendor: string;
  category: string;
  amount: number;
  currency?: string;
  date: string;
  description: string;
  receiptUrl?: string;
}

export interface ExpenseAuditResponse {
  status: "approved" | "flagged" | "escalated" | "rejected";
  confidence: number;
  policyLimit: number | null;
  claimedAmount: number;
  varianceAmount: number;
  violations: Array<{
    rule: string;
    severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
    description: string;
  }>;
  reasoning: string;
  policyReference: string;
  auditBadge: string;
  suggestedAction: string;
}

export interface CopilotQueryRequest {
  query: string;
  conversationHistory?: Array<{
    role: "user" | "assistant";
    content: string;
  }>;
  departmentContext?: string;
}

export interface CopilotStructuredResponse {
  detect: string;
  investigate: string;
  assess: string;
  recommend: string;
  alert: string;
  rawText?: string;
  dataHighlights: Array<{
    metric: string;
    value: string;
    trend: "up" | "down" | "neutral";
    department: string;
  }>;
}

export interface RiskItem {
  id: string;
  title: string;
  department: "INVENTORY" | "FINANCE" | "CUSTOMER_OPS" | "SUPPLY_CHAIN";
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  description: string;
  suggestedAction: string;
  impactScore: number;
  timestamp: string;
}

export interface PricingInsightItem {
  id: string;
  sku: string;
  productName: string;
  currentPrice: number;
  recommendedPrice: number;
  competitorAvg: number;
  elasticityScore: number;
  projectedDemand: string;
  projectedRevenue: string;
  confidenceScore: number;
  reasoning: string;
}

// ─────────────────────────────────────────────────────────────
// CYBER RISK INTELLIGENCE & FINANCIAL QUANTIFICATION TYPES
// ─────────────────────────────────────────────────────────────

export interface CyberAssetItem {
  id: string;
  name: string;
  assetType: "DATABASE" | "API_GATEWAY" | "AUTH_SERVER" | "CLOUD_STORAGE" | "ENDPOINT" | "ERP" | "MICROSERVICE";
  businessUnit: "Payments" | "E-commerce" | "Finance" | "HR" | "Cloud Infrastructure" | "Corporate IT" | "Customer Operations";
  criticalityScore: number; // 1 - 10
  technicalRiskScore: number; // 0 - 100
  internetExposed: boolean;
  environment: "PRODUCTION" | "STAGING" | "INTERNAL";
  ipOrHost: string;
  dataSensitivity: "RESTRICTED" | "CONFIDENTIAL" | "INTERNAL" | "PUBLIC";
  revenueDependency: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  downtimeCostPerHour: number; // in INR
  dataBreachPotential: number; // in INR
  incidentProbability: number; // 0.0 to 1.0 (e.g. 0.17 for 17%)
  controlEffectiveness: number; // 0.0 to 1.0 (e.g. 0.58 for 58%)
  potentialImpact: number; // in INR (Total sum of downtime + breach + recovery + regulatory)
  expectedAnnualLoss: number; // in INR (Probability * Potential Impact)
  owner: string;
  status: "ACTIVE" | "UNDER_REMEDIATION" | "DECOMMISSIONED";
  vulnerabilitiesCount: number;
  criticalVulnerabilitiesCount: number;
}

export interface VulnerabilityItem {
  id: string;
  cveId: string;
  title: string;
  cvssScore: number;
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  exploitAvailable: boolean;
  patchAvailable: boolean;
  ageDays: number;
  assetId: string;
  assetName: string;
  remediationCost: number; // in INR
  riskContribution: number; // in INR
  status: "OPEN" | "IN_PROGRESS" | "PATCHED" | "MITIGATED";
}

export interface SecurityControlItem {
  id: string;
  code: string; // e.g. CTRL-MFA, CTRL-EDR
  name: string;
  category: "IAM" | "ENDPOINT" | "NETWORK" | "DATA_PROTECTION" | "VULN_MGMT" | "BACKUP" | "SIEM";
  coveragePercent: number; // 0 - 100
  effectivenessPercent: number; // 0 - 100
  associatedRiskEal: number; // in INR
  potentialRiskReduction: number; // in INR
  annualCost: number; // in INR
  status: "ACTIVE" | "PARTIAL" | "PLANNED" | "DEFICIENT";
  owner: string;
  recommendation: string;
}

export interface SecurityEventItem {
  id: string;
  source: "SIEM" | "EDR" | "IAM" | "CSPM" | "VULN_SCANNER" | "THREAT_INTEL";
  eventType: string;
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  assetAffected: string;
  details: string;
  riskDelta: number; // e.g. +8, -5, +11, -14
  timeAgo: string;
  timestamp: string;
}

export interface ThreatIntelligenceItem {
  id: string;
  threatActor: string;
  campaignName: string;
  targetSector: string;
  cveReference: string;
  severity: "CRITICAL" | "HIGH" | "MEDIUM";
  description: string;
  active: boolean;
  detectedAt: string;
}

export interface FinancialImpactBreakdown {
  downtimeCost: number;
  dataBreachCost: number;
  recoveryCost: number;
  regulatoryPenalties: number;
  incidentResponseCost: number;
  revenueLoss: number;
  reputationalImpact: number;
  totalImpact: number;
}

export interface RiskDriverItem {
  id: string;
  title: string;
  category: "VULNERABILITY" | "IAM" | "NETWORK" | "CLOUD" | "DATA";
  financialContribution: number; // in INR
  financialContributionFormatted: string; // e.g. "₹42L"
  assetName: string;
  cveId?: string;
  controlDeficiency?: string;
  remediation: string;
  priority: number;
  percentageOfTotal: number;
}

export interface CyberRiskOverview {
  enterpriseScore: number; // e.g. 72 / 100
  scoreGrade: "LOW_RISK" | "MODERATE_RISK" | "ELEVATED_RISK" | "HIGH_RISK" | "CRITICAL_RISK";
  totalFinancialExposure: number; // e.g. 38000000 (₹3.8 Cr)
  totalFinancialExposureFormatted: string;
  expectedAnnualLoss: number; // e.g. 21000000 (₹2.1 Cr)
  expectedAnnualLossFormatted: string;
  potentialMaxLoss: number;
  potentialMaxLossFormatted: string;
  incidentLikelihoodPercent: number; // e.g. 17%
  controlEffectivenessPercent: number; // e.g. 74%
  criticalAssetCount: number; // e.g. 18
  highRiskAssetCount: number; // e.g. 7
  totalMonitoredAssets: number; // e.g. 1250
  riskReductionOpportunity: number; // e.g. 14000000 (₹1.4 Cr)
  riskReductionOpportunityFormatted: string;
  lastAssessed: string;
  isSimulatedData: boolean;
}

export interface RiskTrendPoint {
  date: string;
  label: string;
  financialExposure: number; // in Cr or Lakhs
  expectedAnnualLoss: number;
  riskScore: number;
  controlEffectiveness: number;
}

export interface WhatIfControlToggle {
  id: string;
  code: string;
  name: string;
  cost: number;
  riskReduction: number;
  selected: boolean;
  category: string;
}

export interface WhatIfSimulationResult {
  currentEal: number;
  projectedEal: number;
  currentEalFormatted: string;
  projectedEalFormatted: string;
  totalRiskReduction: number;
  totalRiskReductionFormatted: string;
  totalImplementationCost: number;
  totalImplementationCostFormatted: string;
  estimatedRosi: number; // percentage
  confidenceScore: number; // percentage
  selectedCount: number;
  explanation: string;
}

export interface DelayedRemediationResult {
  currentEal: number;
  currentEalFormatted: string;
  selectedDelayDays: number;
  projectedExposure: number;
  projectedExposureFormatted: string;
  additionalRisk: number;
  additionalRiskFormatted: string;
  penaltyBreakdown: {
    threatAcceleration: number;
    exploitAvailabilityIncrease: number;
    compliancePenaltyRisk: number;
  };
  advisoryNote: string;
}

export interface SecurityInvestmentOption {
  id: string;
  controlCode: string;
  title: string;
  category: "IAM" | "PATCHING" | "NETWORK" | "EDR" | "SIEM" | "CLOUD" | "BACKUP" | "ENCRYPTION";
  cost: number; // in INR
  costFormatted: string; // e.g. "₹5L"
  riskReduction: number; // in INR
  riskReductionFormatted: string; // e.g. "₹35L"
  netBenefit: number; // riskReduction - cost
  netBenefitFormatted: string;
  rosiPercent: number; // ((riskReduction - cost) / cost) * 100
  paybackMonths: number;
  implementationTimeWeeks: number;
  complexity: "LOW" | "MEDIUM" | "HIGH";
  description: string;
  mitigatesDrivers: string[];
}

export interface KnapsackOptimizationResult {
  budget: number;
  budgetFormatted: string;
  totalInvestment: number;
  totalInvestmentFormatted: string;
  totalRiskReduction: number;
  totalRiskReductionFormatted: string;
  netBenefit: number;
  netBenefitFormatted: string;
  overallRosiPercent: number;
  budgetUtilizationPercent: number;
  selectedInvestments: SecurityInvestmentOption[];
  unselectedInvestments: SecurityInvestmentOption[];
  algorithmUsed: "0/1 Knapsack Dynamic Programming with Integer Scaling";
  summaryNarrative: string;
}

export interface DiminishingReturnsPoint {
  investment: number;
  investmentFormatted: string;
  projectedEal: number;
  projectedEalFormatted: string;
  riskReduction: number;
  marginalBenefitPerLakh: number;
  isOptimalSpendZone: boolean;
}

export interface FrameworkControlItem {
  id: string;
  controlCode: string;
  title: string;
  requirement: string;
  axionControlCode: string;
  status: "COMPLIANT" | "PARTIALLY_COMPLIANT" | "NON_COMPLIANT";
  evidenceNote: string;
}

export interface ComplianceFrameworkItem {
  id: string;
  code: "ISO27001" | "NIST_CSF" | "CIS_CONTROLS" | "RBI_CSF" | "SEBI_CSCRF";
  name: string;
  fullName: string;
  version: string;
  authority: string;
  totalControls: number;
  compliantControls: number;
  complianceScorePercent: number;
  status: "AUDIT_READY" | "ATTENTION_REQUIRED" | "NON_COMPLIANT";
  controls: FrameworkControlItem[];
}

export interface ComplianceEvidenceItem {
  id: string;
  controlCode: string;
  controlName: string;
  frameworkCode: string;
  frameworkName: string;
  evidenceType: "IAM_TELEMETRY" | "VULN_SCAN_LOG" | "EDR_AGENT_STATUS" | "ENCRYPTION_KEY_AUDIT" | "BACKUP_VERIFICATION";
  description: string;
  telemetryRef: string;
  lastVerified: string;
  verifiedBy: string;
  status: "VERIFIED" | "PENDING_REVIEW" | "DEFICIENT";
}

export interface MultiFrameworkMappingRow {
  axionControl: string;
  axionCode: string;
  nistCsf: string;
  cisControls: string;
  iso27001: string;
  rbiCsf: string;
  sebiCscrf: string;
  coverageStatus: "FULL_COVERAGE" | "PARTIAL_COVERAGE" | "DEFICIENT";
  effectiveness: number;
}

