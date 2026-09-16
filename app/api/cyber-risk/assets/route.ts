import { NextResponse } from "next/server";
import { getFilteredCyberAssets, calculateAssetEAL } from "@/lib/cyber-risk-engine";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const businessUnit = searchParams.get("businessUnit") || undefined;
    const assetType = searchParams.get("assetType") || undefined;
    const minCriticality = searchParams.get("minCriticality")
      ? parseInt(searchParams.get("minCriticality")!, 10)
      : undefined;
    const search = searchParams.get("search") || undefined;

    const assets = getFilteredCyberAssets({
      businessUnit,
      assetType,
      minCriticality,
      search,
    });

    const enrichedAssets = assets.map((asset) => {
      const ealData = calculateAssetEAL(asset);
      return {
        ...asset,
        calculatedEal: ealData.eal,
        totalFinancialImpact: ealData.totalImpact,
        impactBreakdown: ealData.breakdown,
      };
    });

    return NextResponse.json({
      success: true,
      count: enrichedAssets.length,
      assets: enrichedAssets,
    });
  } catch (err) {
    console.error("Error in cyber-risk/assets API:", err);
    return NextResponse.json({ error: "Failed to retrieve cyber assets" }, { status: 500 });
  }
}
