import { NextResponse } from "next/server";
import { calculateAssetEAL, calculateAssetFinancialImpact, formatINR } from "@/lib/cyber-risk-engine";
import { MOCK_CYBER_ASSETS } from "@/lib/mock-data";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { assetId, customProbability, customDowntimeCostPerHour, customDataBreachPotential } = body;

    const asset = MOCK_CYBER_ASSETS.find((a) => a.id === assetId) || MOCK_CYBER_ASSETS[0];

    // Apply custom overrides if provided
    const targetAsset = {
      ...asset,
      incidentProbability: customProbability !== undefined ? customProbability : asset.incidentProbability,
      downtimeCostPerHour:
        customDowntimeCostPerHour !== undefined ? customDowntimeCostPerHour : asset.downtimeCostPerHour,
      dataBreachPotential:
        customDataBreachPotential !== undefined ? customDataBreachPotential : asset.dataBreachPotential,
    };

    const calculation = calculateAssetEAL(targetAsset);

    return NextResponse.json({
      success: true,
      assetName: targetAsset.name,
      assetType: targetAsset.assetType,
      businessUnit: targetAsset.businessUnit,
      incidentProbability: calculation.probability,
      expectedAnnualLoss: calculation.eal,
      expectedAnnualLossFormatted: formatINR(calculation.eal),
      totalImpact: calculation.totalImpact,
      totalImpactFormatted: formatINR(calculation.totalImpact),
      breakdown: calculation.breakdown,
    });
  } catch (err) {
    console.error("Error in cyber-risk/quantify API:", err);
    return NextResponse.json({ error: "Failed to quantify financial risk" }, { status: 500 });
  }
}
