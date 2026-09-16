import { NextResponse } from "next/server";
import { getEnterpriseRiskOverview, getTopRiskDrivers } from "@/lib/cyber-risk-engine";
import { MOCK_RISK_TRENDS, MOCK_SECURITY_CONTROLS } from "@/lib/mock-data";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const trendPeriod = (searchParams.get("period") || "30D") as "7D" | "30D" | "90D" | "1Y";

    const overview = getEnterpriseRiskOverview();
    const topDrivers = getTopRiskDrivers();
    const trends = MOCK_RISK_TRENDS[trendPeriod] || MOCK_RISK_TRENDS["30D"];
    const controls = MOCK_SECURITY_CONTROLS;

    return NextResponse.json({
      success: true,
      overview,
      topDrivers,
      trends,
      controls,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error("Error in cyber-risk/overview API:", err);
    return NextResponse.json({ error: "Failed to retrieve cyber risk overview" }, { status: 500 });
  }
}
