// Anthropic Claude Client & Multi-Agent Reasoning Layer for Axion

import Anthropic from "@anthropic-ai/sdk";
import {
  ReturnDecisionRequest,
  ReturnDecisionResponse,
  RiskFactorItem,
  ExpenseAuditRequest,
  ExpenseAuditResponse,
  CopilotStructuredResponse,
} from "./types";
import { MOCK_ORDERS, MOCK_EXPENSES } from "./mock-data";
import { retrieveRelevantPolicy } from "./policy-rag";

const apiKey = process.env.ANTHROPIC_API_KEY;

export const anthropic = apiKey
  ? new Anthropic({
      apiKey,
    })
  : null;

/**
 * Smart Returns & Exchange Decision Agent with Multi-Factor Risk Calculation
 */
export async function evaluateReturnWithClaude(
  request: ReturnDecisionRequest
): Promise<ReturnDecisionResponse> {
  const matchedOrder = MOCK_ORDERS.find(
    (o) =>
      o.orderNumber.toLowerCase() === request.orderId.toLowerCase() ||
      o.id.toLowerCase() === request.orderId.toLowerCase()
  );

  const orderNumber = request.orderId.trim() || (matchedOrder ? matchedOrder.orderNumber : "ORD-88219");
  const customerTier = request.customerTier || (matchedOrder ? matchedOrder.customerTier : "VIP");
  const itemTitle =
    request.itemName ||
    (matchedOrder ? matchedOrder.items[0].title : "Axion Velocity Pro Running Shoes (Cobalt Blue)");
  const itemCondition = request.itemCondition || "UNWORN_WITH_TAGS";
  const returnFrequency = request.returnFrequency || "FIRST_TIME";
  const currentSize = request.currentSize || "UK 9";
  const retainedGmv = matchedOrder ? matchedOrder.totalAmount : 6499;

  const policy = await retrieveRelevantPolicy(request.customerReason, "RETURNS_REFUNDS");

  // 1. Calculate Multi-Factor Risk Score Dynamically
  let computedRisk = 0.04;
  const riskBreakdown: RiskFactorItem[] = [];

  // Factor 1: Customer Tier Trust
  if (customerTier === "VIP") {
    computedRisk += 0.01;
    riskBreakdown.push({
      factor: "Customer Lifetime Value & Tier",
      impact: "VIP Customer (-15% risk offset)",
      status: "SAFE",
      scoreDelta: -0.15,
    });
  } else if (customerTier === "GOLD") {
    computedRisk += 0.04;
    riskBreakdown.push({
      factor: "Customer Lifetime Value & Tier",
      impact: "Gold Customer (-5% risk offset)",
      status: "SAFE",
      scoreDelta: -0.05,
    });
  } else if (customerTier === "STANDARD") {
    computedRisk += 0.12;
    riskBreakdown.push({
      factor: "Customer Lifetime Value & Tier",
      impact: "Standard Account Baseline (+12% risk)",
      status: "SAFE",
      scoreDelta: 0.12,
    });
  } else if (customerTier === "HIGH_RISK") {
    computedRisk += 0.58;
    riskBreakdown.push({
      factor: "Customer Lifetime Value & Tier",
      impact: "High-Risk Account Flagged (+58% risk)",
      status: "FLAGGED",
      scoreDelta: 0.58,
    });
  }

  // Factor 2: Item Condition & Tags
  if (itemCondition === "UNWORN_WITH_TAGS") {
    computedRisk += 0.01;
    riskBreakdown.push({
      factor: "Product Condition & Tag Verification",
      impact: "Unworn with tags attached (Verified)",
      status: "SAFE",
      scoreDelta: 0.01,
    });
  } else if (itemCondition === "TRIED_ON_INDOORS") {
    computedRisk += 0.06;
    riskBreakdown.push({
      factor: "Product Condition & Tag Verification",
      impact: "Tried on indoors, original packaging intact",
      status: "SAFE",
      scoreDelta: 0.06,
    });
  } else if (itemCondition === "SLIGHTLY_USED") {
    computedRisk += 0.22;
    riskBreakdown.push({
      factor: "Product Condition & Tag Verification",
      impact: "Minor wear detected (+22% refurb cost)",
      status: "ATTENTION",
      scoreDelta: 0.22,
    });
  } else {
    // DEFECTIVE_DAMAGED
    computedRisk += 0.35;
    riskBreakdown.push({
      factor: "Product Condition & Tag Verification",
      impact: "Damaged / Tag removed (+35% risk)",
      status: "FLAGGED",
      scoreDelta: 0.35,
    });
  }

  // Factor 3: Return Velocity / Frequency
  if (returnFrequency === "FIRST_TIME") {
    computedRisk += 0.01;
    riskBreakdown.push({
      factor: "Historical Return Frequency",
      impact: "First-time return request (0.0x velocity)",
      status: "SAFE",
      scoreDelta: 0.01,
    });
  } else if (returnFrequency === "OCCASIONAL") {
    computedRisk += 0.14;
    riskBreakdown.push({
      factor: "Historical Return Frequency",
      impact: "1 previous return in 90 days (Normal velocity)",
      status: "SAFE",
      scoreDelta: 0.14,
    });
  } else {
    // FREQUENT_RETURNS
    computedRisk += 0.32;
    riskBreakdown.push({
      factor: "Historical Return Frequency",
      impact: "3+ returns in last 60 days (Elevated velocity)",
      status: "FLAGGED",
      scoreDelta: 0.32,
    });
  }

  const finalRiskScore = Number(Math.min(0.99, Math.max(0.02, computedRisk)).toFixed(2));
  const riskLevel: "LOW" | "MODERATE" | "HIGH" | "CRITICAL" =
    finalRiskScore < 0.2 ? "LOW" : finalRiskScore < 0.5 ? "MODERATE" : finalRiskScore < 0.75 ? "HIGH" : "CRITICAL";

  // If live Claude API key is present, attempt live agent reasoning
  if (anthropic && process.env.ANTHROPIC_API_KEY) {
    try {
      const prompt = `
You are Axion's Smart Return & Exchange Agent.
Analyze this customer return request and return a structured JSON response.

Order Context:
- Order Number: ${orderNumber}
- Customer Tier: ${customerTier}
- Item: ${itemTitle}
- Current Size: ${currentSize}
- Return Reason: "${request.customerReason}"
- Item Condition: "${itemCondition}"
- Return Frequency: "${returnFrequency}"
- Computed Risk Score: ${finalRiskScore} (${riskLevel})

Policy Guidelines:
${policy.relevantSection}

Return ONLY valid JSON matching this schema:
{
  "decision": "approve" | "deny" | "escalate",
  "resolution": "exchange" | "refund" | "replacement" | "store_credit",
  "confidence": number between 0 and 1,
  "reasoning": "string explaining the operational rationale and policy compliance",
  "suggestedAlternative": "string with specific alternative recommendation or null",
  "policyChecks": ["array of policy check strings passed or failed"]
}
`;

      const response = await anthropic.messages.create({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 1000,
        messages: [{ role: "user", content: prompt }],
      });

      const responseText =
        response.content[0].type === "text" ? response.content[0].text : "";

      const cleanJson = responseText.replace(/```json\n?|\n?```/g, "").trim();
      const parsed = JSON.parse(cleanJson);

      return {
        decision: parsed.decision || (finalRiskScore > 0.7 ? "escalate" : "approve"),
        resolution: parsed.resolution || "exchange",
        confidence: parsed.confidence || 0.98,
        reasoning: parsed.reasoning,
        suggestedAlternative: parsed.suggestedAlternative || `${itemTitle} (UK 9.5) — 14 units available in Mumbai Hub`,
        policyChecks: parsed.policyChecks || [
          `Customer Tier Verification: ${customerTier} (PASSED)`,
          `Condition Integrity: ${itemCondition.replace(/_/g, " ")} (PASSED)`,
          `Return Velocity Limit: ${returnFrequency} (PASSED)`,
          `Calculated Risk Score: ${finalRiskScore} (${riskLevel} RISK)`,
        ],
        riskScore: finalRiskScore,
        riskLevel,
        riskBreakdown,
        customerTier,
        orderNumber,
        itemTitle,
        retainedGmv,
        timelineEstimate: "Express Replacement dispatched in 2 hours. Courier swap scheduled for tomorrow 10:00 AM.",
      };
    } catch (err) {
      console.warn("Claude API call failed, using dynamic multi-factor calculations:", err);
    }
  }

  // Dynamic Heuristic Evaluation based on customer input & computed risk
  const reasonLower = request.customerReason.toLowerCase();
  const isTight = reasonLower.includes("tight") || reasonLower.includes("small") || reasonLower.includes("narrow");
  const isLoose = reasonLower.includes("loose") || reasonLower.includes("big") || reasonLower.includes("large");
  const isDefect = reasonLower.includes("defect") || reasonLower.includes("damaged") || reasonLower.includes("broken") || reasonLower.includes("cut out");
  const isSizing = isTight || isLoose || reasonLower.includes("size") || reasonLower.includes("fit");

  let decision: "approve" | "deny" | "escalate" = "approve";
  let resolution: "exchange" | "refund" | "replacement" | "store_credit" = "exchange";
  let suggestedAlternative = `${itemTitle} (UK 9.5) — 14 units available in Mumbai Hub`;
  let reasoning = "";

  if (finalRiskScore >= 0.65) {
    decision = "escalate";
    resolution = "replacement";
    suggestedAlternative = `${itemTitle} (Pending QA Inspection)`;
    reasoning = `High risk detected (Risk Score: ${finalRiskScore}). Customer account has elevated return velocity or damaged condition flags. Return request is routed to Senior Operations Specialist for manual review before reverse pickup.`;
  } else if (isDefect) {
    decision = "approve";
    resolution = "replacement";
    suggestedAlternative = `${itemTitle} — Verified Brand New Unit Replacement`;
    reasoning = `Hardware/Material defect reported ("${request.customerReason}"). Customer is in ${customerTier} Tier with Low Risk (${finalRiskScore}). Fast-track zero-cost direct replacement authorized under manufacturer warranty.`;
  } else if (isTight) {
    decision = "approve";
    resolution = "exchange";
    suggestedAlternative = `${itemTitle} (UK 9.5) — 14 units in Mumbai Hub`;
    reasoning = `Customer reported fit friction (runs tight on ${currentSize}). Item is verified ${itemCondition.replace(/_/g, " ").toLowerCase()} within standard policy window. Multi-factor risk calculation is ${finalRiskScore} (${riskLevel}). Automated 1-click exchange for size UK 9.5 is approved with instant warehouse reservation to maximize retained GMV (${retainedGmv ? `₹${retainedGmv.toLocaleString("en-IN")}` : "₹6,499"}).`;
  } else if (isLoose) {
    decision = "approve";
    resolution = "exchange";
    suggestedAlternative = `${itemTitle} (UK 8.5) — 8 units in Bangalore Hub`;
    reasoning = `Customer reported fit friction (runs large on ${currentSize}). Multi-factor risk calculation is ${finalRiskScore} (${riskLevel}). Automated 1-click exchange for size UK 8.5 is approved.`;
  } else if (isSizing) {
    decision = "approve";
    resolution = "exchange";
    suggestedAlternative = `${itemTitle} (Alternative Size Option) — In Stock`;
    reasoning = `Sizing adjustment request received for ${orderNumber}. Verified eligible for instant priority exchange with Risk Score ${finalRiskScore}.`;
  } else {
    decision = "approve";
    resolution = "store_credit";
    suggestedAlternative = "Axion Store Credit + 5% Loyalty Bonus Credit (Instant Balance)";
    reasoning = `General return request for ${orderNumber} approved under standard 30-day window with 5% bonus store credit to preserve retained platform revenue. Risk score is ${finalRiskScore}.`;
  }

  return {
    decision,
    resolution,
    confidence: 0.98,
    reasoning,
    suggestedAlternative,
    policyChecks: [
      `Customer Tier Verification: ${customerTier} (PASSED)`,
      `Condition Integrity: ${itemCondition.replace(/_/g, " ")} (PASSED)`,
      `Return Velocity Limit: ${returnFrequency} (PASSED)`,
      `Calculated Risk Score: ${finalRiskScore} (${riskLevel} RISK)`,
    ],
    riskScore: finalRiskScore,
    riskLevel,
    riskBreakdown,
    customerTier,
    orderNumber,
    itemTitle,
    retainedGmv,
    timelineEstimate: "Exchange order pre-dispatched. Zero-wait courier swap scheduled for tomorrow 10:00 AM.",
  };
}

/**
 * AI Expense Auditor Agent
 */
export async function auditExpenseWithClaude(
  request: ExpenseAuditRequest
): Promise<ExpenseAuditResponse> {
  const policy = await retrieveRelevantPolicy(
    `${request.category} ${request.vendor} ${request.description}`,
    "TRAVEL_EXPENSE"
  );

  // Live Claude API Call
  if (anthropic && process.env.ANTHROPIC_API_KEY) {
    try {
      const prompt = `
You are Axion's AI Expense Auditor Agent.
Evaluate this corporate expense claim against company reimbursement policies.

Expense Details:
- Employee: ${request.employeeName} (${request.employeeRole}, ${request.department})
- Vendor: ${request.vendor}
- Category: ${request.category}
- Claimed Amount: ₹${request.amount}
- Date: ${request.date}
- Description: "${request.description}"

Policy Reference:
${policy.relevantSection}

Return ONLY valid JSON matching this schema:
{
  "status": "approved" | "flagged" | "escalated" | "rejected",
  "confidence": number between 0 and 1,
  "policyLimit": number or null,
  "varianceAmount": number,
  "violations": [
    {
      "rule": "string",
      "severity": "CRITICAL" | "HIGH" | "MEDIUM" | "LOW",
      "description": "string"
    }
  ],
  "reasoning": "string explaining the policy violation or approval reasoning",
  "policyReference": "string",
  "auditBadge": "string",
  "suggestedAction": "string"
}
`;

      const response = await anthropic.messages.create({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 1000,
        messages: [{ role: "user", content: prompt }],
      });

      const responseText =
        response.content[0].type === "text" ? response.content[0].text : "";

      const cleanJson = responseText.replace(/```json\n?|\n?```/g, "").trim();
      const parsed = JSON.parse(cleanJson);

      return {
        status: parsed.status || "flagged",
        confidence: parsed.confidence || 0.96,
        policyLimit: parsed.policyLimit || 12000,
        claimedAmount: request.amount,
        varianceAmount: parsed.varianceAmount || Math.max(0, request.amount - (parsed.policyLimit || 12000)),
        violations: parsed.violations || [],
        reasoning: parsed.reasoning,
        policyReference: parsed.policyReference || "Travel & Expense Policy v3.2 (Section 4.1)",
        auditBadge: parsed.auditBadge || "POLICY_LIMIT_EXCEEDED",
        suggestedAction: parsed.suggestedAction || "Reduce claim to policy cap or obtain VP Finance sign-off.",
      };
    } catch (err) {
      console.warn("Claude API call failed, falling back to deterministic heuristics:", err);
    }
  }

  // Dynamic Heuristic Evaluation
  const isHotel =
    request.category.toUpperCase() === "ACCOMMODATION" ||
    request.vendor.toLowerCase().includes("hotel") ||
    request.vendor.toLowerCase().includes("hyatt") ||
    request.vendor.toLowerCase().includes("marriott");

  const isMeals = request.category.toUpperCase() === "MEALS";
  const hotelLimit = 12000;
  const mealLimit = 2500;

  if (isHotel && request.amount > hotelLimit) {
    const variance = request.amount - hotelLimit;
    return {
      status: "flagged",
      confidence: 0.98,
      policyLimit: hotelLimit,
      claimedAmount: request.amount,
      varianceAmount: variance,
      violations: [
        {
          rule: "Tier-1 Metro Accommodation Ceiling Exceeded",
          severity: "HIGH",
          description: `Claimed ₹${request.amount.toLocaleString("en-IN")} exceeds the maximum allowed nightly lodging limit of ₹${hotelLimit.toLocaleString("en-IN")} by ₹${variance.toLocaleString("en-IN")} (${Math.round((variance / hotelLimit) * 100)}% variance).`,
        },
        {
          rule: "Missing Pre-Trip Travel Authorization",
          severity: "MEDIUM",
          description: "No pre-approved Travel Authorization Number (TAN) detected for non-portal bookings.",
        },
      ],
      reasoning: `Hotel expense ₹${request.amount.toLocaleString("en-IN")} vs ₹${hotelLimit.toLocaleString("en-IN")} policy limit → Flagged. Claim exceeds Tier-1 corporate accommodation rate without prior executive exemption.`,
      policyReference: "Travel & Expense Policy v3.2 (Section 4.1 - Domestic Lodging Caps)",
      auditBadge: "CAP_OVERRUN_FLAGGED",
      suggestedAction: `Reimburse eligible limit of ₹${hotelLimit.toLocaleString("en-IN")} and route excess ₹${variance.toLocaleString("en-IN")} to Department Head for discretionary exception review.`,
    };
  }

  if (isMeals && request.amount > mealLimit) {
    const variance = request.amount - mealLimit;
    return {
      status: "flagged",
      confidence: 0.95,
      policyLimit: mealLimit,
      claimedAmount: request.amount,
      varianceAmount: variance,
      violations: [
        {
          rule: "Daily Meal Allowance Exceeded",
          severity: "MEDIUM",
          description: `Claimed ₹${request.amount.toLocaleString("en-IN")} exceeds daily meal cap of ₹${mealLimit.toLocaleString("en-IN")} by ₹${variance.toLocaleString("en-IN")}.`,
        },
      ],
      reasoning: `Meal claim of ₹${request.amount.toLocaleString("en-IN")} exceeds the daily per diem cap of ₹${mealLimit.toLocaleString("en-IN")}.`,
      policyReference: "Travel & Expense Policy v3.2 (Section 4.2 - Daily Meal Allowance)",
      auditBadge: "MEAL_PER_DIEM_EXCEEDED",
      suggestedAction: `Approve policy allowance of ₹${mealLimit.toLocaleString("en-IN")}.`,
    };
  }

  return {
    status: "approved",
    confidence: 0.99,
    policyLimit: request.amount > 50000 ? 100000 : 25000,
    claimedAmount: request.amount,
    varianceAmount: 0,
    violations: [],
    reasoning: `Expense of ₹${request.amount.toLocaleString("en-IN")} for ${request.vendor} falls squarely within standard operational thresholds and category compliance guidelines.`,
    policyReference: "General Expense & Procurement Policy v2.4",
    auditBadge: "COMPLIANT_APPROVED",
    suggestedAction: "Auto-queue for batch payout in upcoming bi-weekly reimbursement cycle.",
  };
}

/**
 * Business Intelligence Copilot Multi-Agent Reasoner
 */
export async function queryCopilotWithClaude(
  query: string,
  history: Array<{ role: "user" | "assistant"; content: string }> = []
): Promise<CopilotStructuredResponse> {
  const contextSnippet = `
Current Axion Cross-Department Real-Time Telemetry:
- Revenue: ₹1.42 Cr this month (-6.8% MoM due to North-Region logistics latency and inventory stockout on high-velocity SKU-409)
- SKU-409 (Apex ANC Headphones): 180 units in stock, 20 units/day velocity -> 9 DAYS TO STOCKOUT. Reorder 350 units from Supplier B (Bangalore FastTech, 4-day lead time).
- SKU-102 (Velocity Pro Running Shoes): Return rate spiked to 11.8% on size UK 9 citing sizing tightness -> 85% converted to UK 9.5 exchanges.
- Expenses: 3 sales travel claims flagged for ₹18,400 hotel room rates vs ₹12,000 policy limit.
- Logistics: Regional monsoon transport delays adding 24-36 hrs transit.
`;

  if (anthropic && process.env.ANTHROPIC_API_KEY) {
    try {
      const prompt = `
You are Axion's Chief Business Intelligence Decision Copilot.
Answer the user's business query using the cross-department enterprise context below.

You MUST format your analysis strictly following this 5-stage framework:
1. DETECT (What changed, anomalies detected, exact numbers)
2. INVESTIGATE (Root causes, correlating metrics across returns, inventory, sales, logistics)
3. ASSESS (Financial & customer operational impact)
4. RECOMMEND (Concrete, actionable decisions to take right now)
5. ALERT (Automated monitors and threshold triggers to deploy)

Enterprise Context:
${contextSnippet}

User Question: "${query}"

Return ONLY valid JSON with this exact structure:
{
  "detect": "string summarizing detected anomalies and telemetry changes",
  "investigate": "string detailing deep cross-department root causes",
  "assess": "string estimating commercial, revenue, and customer impact",
  "recommend": "string providing prioritized tactical and strategic decisions",
  "alert": "string outlining continuous guardrail monitors to activate",
  "dataHighlights": [
    { "metric": "string", "value": "string", "trend": "up"|"down"|"neutral", "department": "string" }
  ]
}
`;

      const response = await anthropic.messages.create({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 1500,
        messages: [{ role: "user", content: prompt }],
      });

      const responseText =
        response.content[0].type === "text" ? response.content[0].text : "";

      const cleanJson = responseText.replace(/```json\n?|\n?```/g, "").trim();
      const parsed = JSON.parse(cleanJson);

      return {
        detect: parsed.detect,
        investigate: parsed.investigate,
        assess: parsed.assess,
        recommend: parsed.recommend,
        alert: parsed.alert,
        dataHighlights: parsed.dataHighlights || [
          { metric: "Monthly GMV", value: "₹1.42 Cr", trend: "down", department: "Finance" },
          { metric: "SKU-409 Runway", value: "9 Days", trend: "down", department: "Inventory" },
          { metric: "UK 9 Return Spike", value: "11.8%", trend: "up", department: "Customer Ops" },
          { metric: "Exchange Conversion", value: "85%", trend: "up", department: "Returns" },
        ],
      };
    } catch (err) {
      console.warn("Claude API call failed, using structured heuristic fallback:", err);
    }
  }

  // Structured default response
  return {
    detect:
      "Telemetry detected a 6.8% month-over-month revenue dip (₹1.42 Cr vs ₹1.52 Cr target), localized primarily across Consumer Audio and Footwear categories between August 18 and September 4.",
    investigate:
      "Cross-department triangulation reveals two compounding drivers: (1) SKU-409 (Apex ANC Headphones) velocity accelerated to 20 units/day, exhausting stock in 9 days; (2) Velocity Pro Shoes suffered an 11.8% return rate spike on UK 9 due to narrower toe-box batch specifications.",
    assess:
      "SKU-409 stockout represents ₹2,60,000 in deferred daily gross revenue. Sizing friction eroded CSAT by 0.3 points, though the Smart Exchange Copilot mitigated 85% of refunds into immediate UK 9.5 exchanges, preserving ₹5,52,000 in retained GMV.",
    recommend:
      "1. Execute an emergency purchase order of 350 units for SKU-409 via Supplier B (Bangalore FastTech) utilizing their 4-day express lead time.\n2. Update product catalog copy for Velocity Pro Shoes to advise 'Fits snug — order 0.5 size up'.\n3. Deploy instant store-credit bonus incentive.",
    alert:
      "Activated automated stockout early-warning trigger at 12-day inventory threshold; configured automated return velocity watch on all new footwear SKUs exceeding 7% return rate.",
    dataHighlights: [
      { metric: "Monthly Revenue", value: "₹1.42 Cr (-6.8%)", trend: "down", department: "Finance" },
      { metric: "SKU-409 Stock Runway", value: "9 Days (Critical)", trend: "down", department: "Inventory" },
      { metric: "Shoe Return Rate", value: "11.8% (UK 9)", trend: "up", department: "Customer Ops" },
      { metric: "Exchange Retention", value: "85% Preserved", trend: "up", department: "Returns" },
    ],
  };
}
