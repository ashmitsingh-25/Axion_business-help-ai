import { NextResponse } from "next/server";
import {
  getComplianceFrameworks,
  getMultiFrameworkMappings,
  getComplianceEvidence,
  generateExecutiveComplianceBrief,
} from "@/lib/compliance-engine";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const framework = searchParams.get("framework") || undefined;
    const view = searchParams.get("view") || "all";

    if (view === "brief") {
      const brief = generateExecutiveComplianceBrief(framework);
      return NextResponse.json({ success: true, brief });
    }

    const frameworks = getComplianceFrameworks();
    const mappings = getMultiFrameworkMappings();
    const evidence = getComplianceEvidence(framework);

    return NextResponse.json({
      success: true,
      frameworks,
      mappings,
      evidence,
      generatedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error("Error in cyber-risk/compliance API:", err);
    return NextResponse.json({ error: "Failed to load compliance data" }, { status: 500 });
  }
}
