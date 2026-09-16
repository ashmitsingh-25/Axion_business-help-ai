import { NextResponse } from "next/server";
import { optimizeSecurityBudget, getDiminishingReturnsCurve, calculateCustomROSI } from "@/lib/investment-optimizer";
import { MOCK_SECURITY_INVESTMENTS } from "@/lib/mock-data";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const budgetParam = searchParams.get("budget");
    const budget = budgetParam ? parseFloat(budgetParam) : 2000000; // Default ₹20 Lakhs

    const optimization = optimizeSecurityBudget(budget);
    const curve = getDiminishingReturnsCurve();

    return NextResponse.json({
      success: true,
      optimization,
      curve,
      allAvailableInvestments: MOCK_SECURITY_INVESTMENTS,
    });
  } catch (err) {
    console.error("Error in cyber-risk/investments GET API:", err);
    return NextResponse.json({ error: "Failed to load investment data" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { budget, customCost, customReduction } = body;

    if (customCost !== undefined && customReduction !== undefined) {
      const customRosi = calculateCustomROSI(Number(customCost), Number(customReduction));
      return NextResponse.json({
        success: true,
        type: "custom_rosi",
        result: customRosi,
      });
    }

    const budgetAmount = budget !== undefined ? Number(budget) : 2000000;
    const optimization = optimizeSecurityBudget(budgetAmount);
    const curve = getDiminishingReturnsCurve();

    return NextResponse.json({
      success: true,
      optimization,
      curve,
    });
  } catch (err) {
    console.error("Error in cyber-risk/investments POST API:", err);
    return NextResponse.json({ error: "Failed to optimize investments" }, { status: 500 });
  }
}
