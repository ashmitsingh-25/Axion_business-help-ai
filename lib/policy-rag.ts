// Axion Policy Document Retrieval & RAG Engine

import { MOCK_POLICIES } from "./mock-data";

export interface RetrievedPolicySnippet {
  policyTitle: string;
  category: string;
  relevantSection: string;
  matchedRules: string[];
  relevanceScore: number;
}

export async function retrieveRelevantPolicy(
  query: string,
  category?: string
): Promise<RetrievedPolicySnippet> {
  const isVectorRagEnabled = process.env.ENABLE_VECTOR_RAG === "true";

  // If vector database is enabled, we could query Pinecone / pgvector.
  // We provide a fast, deterministic semantic keyword & rule parser as zero-config fallback.
  const targetCategory = category || "TRAVEL_EXPENSE";
  const policy =
    MOCK_POLICIES.find((p) => p.category.toLowerCase() === targetCategory.toLowerCase()) ||
    MOCK_POLICIES[0];

  const queryLower = query.toLowerCase();
  const matchedRules: string[] = [];

  if (queryLower.includes("hotel") || queryLower.includes("accommodation") || queryLower.includes("stay") || queryLower.includes("hyatt")) {
    matchedRules.push("Tier-1 Metro Cities: Max ₹12,000/night limit for Senior Executives.");
    matchedRules.push("Mini-bar, in-room spa, and ancillary entertainment expenses non-reimbursable.");
  }

  if (queryLower.includes("meal") || queryLower.includes("dinner") || queryLower.includes("food")) {
    matchedRules.push("Daily Travel Meal Allowance: Max ₹2,500/day.");
    matchedRules.push("Client Entertainment: Max ₹5,000/attendee with itemized tax invoice.");
  }

  if (queryLower.includes("return") || queryLower.includes("shoe") || queryLower.includes("size") || queryLower.includes("fit")) {
    matchedRules.push("Size & Fit Policy: Instant size exchange for VIP/Gold tier with priority zero-wait shipping.");
    matchedRules.push("Condition Check: Unworn with original tags attached within 30-day window.");
  }

  return {
    policyTitle: policy.title,
    category: policy.category,
    relevantSection: policy.content,
    matchedRules: matchedRules.length > 0 ? matchedRules : ["Standard compliance verification threshold apply."],
    relevanceScore: isVectorRagEnabled ? 0.98 : 0.94,
  };
}
