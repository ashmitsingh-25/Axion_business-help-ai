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
