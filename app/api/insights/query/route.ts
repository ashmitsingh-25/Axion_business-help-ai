import { NextRequest, NextResponse } from "next/server";
import { queryCopilotWithClaude, queryCyberCopilotWithClaude } from "@/lib/anthropic";
import { CopilotQueryRequest } from "@/lib/types";
import { MOCK_RISKS, MOCK_PRICING_INSIGHTS } from "@/lib/mock-data";

export const runtime = "nodejs";

export async function GET() {
  try {
    return NextResponse.json(
      {
        risks: MOCK_RISKS,
        pricingInsights: MOCK_PRICING_INSIGHTS,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error in GET /api/insights/query:", error);
    return NextResponse.json(
      { error: "Failed to fetch live insights telemetry", details: error?.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as CopilotQueryRequest;

    if (!body.query || body.query.trim().length === 0) {
      return NextResponse.json(
        { error: "A non-empty query is required." },
        { status: 400 }
      );
    }

    const qLower = body.query.toLowerCase();
    const isCyberQuery =
      qLower.includes("cyber") ||
      qLower.includes("eal") ||
      qLower.includes("rosi") ||
      qLower.includes("cve") ||
      qLower.includes("vulnerability") ||
      qLower.includes("mfa") ||
      qLower.includes("patch") ||
      qLower.includes("ransomware") ||
      qLower.includes("iso") ||
      qLower.includes("nist") ||
      qLower.includes("knapsack") ||
      qLower.includes("security") ||
      qLower.includes("exposure") ||
      qLower.includes("loss") ||
      qLower.includes("threat");

    const structuredResult = isCyberQuery
      ? await queryCyberCopilotWithClaude(body.query, body.conversationHistory || [])
      : await queryCopilotWithClaude(body.query, body.conversationHistory || []);

    return NextResponse.json(structuredResult, { status: 200 });
  } catch (error: any) {
    console.error("Error in POST /api/insights/query:", error);
    return NextResponse.json(
      { error: "Failed to process copilot query", details: error?.message },
      { status: 500 }
    );
  }
}
