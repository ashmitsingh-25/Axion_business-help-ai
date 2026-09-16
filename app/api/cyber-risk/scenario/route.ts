import { NextResponse } from "next/server";
import { simulateWhatIfScenario, simulateDelayedRemediation } from "@/lib/cyber-risk-engine";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, selectedControls, delayDays } = body;

    if (type === "delay") {
      const days = (delayDays || 30) as 7 | 15 | 30 | 60;
      const result = simulateDelayedRemediation(days);
      return NextResponse.json({
        success: true,
        type: "delayed_remediation",
        result,
      });
    }

    // Default: What-If control toggles
    const controls = Array.isArray(selectedControls) ? selectedControls : [];
    const result = simulateWhatIfScenario(controls);

    return NextResponse.json({
      success: true,
      type: "what_if_scenario",
      result,
    });
  } catch (err) {
    console.error("Error in cyber-risk/scenario API:", err);
    return NextResponse.json({ error: "Failed to simulate scenario" }, { status: 500 });
  }
}
