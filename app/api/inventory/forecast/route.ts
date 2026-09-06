import { NextRequest, NextResponse } from "next/server";
import { calculateDemandForecast } from "@/lib/forecasting";
import { MOCK_INVENTORY_SKUS } from "@/lib/mock-data";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const sku = searchParams.get("sku") || "SKU-409";
    const forecast = calculateDemandForecast(sku);

    return NextResponse.json(
      {
        forecast,
        allSkus: MOCK_INVENTORY_SKUS,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error in /api/inventory/forecast:", error);
    return NextResponse.json(
      { error: "Failed to generate demand forecast", details: error?.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const sku = body.sku || "SKU-409";
    const forecastDays = body.forecastDays || 30;
    const trendFactor = body.trendFactor || 1.0;

    const forecast = calculateDemandForecast(sku, forecastDays, trendFactor);
    return NextResponse.json(forecast, { status: 200 });
  } catch (error: any) {
    console.error("Error in POST /api/inventory/forecast:", error);
    return NextResponse.json(
      { error: "Failed to recalculate forecast", details: error?.message },
      { status: 500 }
    );
  }
}
