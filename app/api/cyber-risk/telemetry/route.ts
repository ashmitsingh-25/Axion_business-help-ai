import { NextResponse } from "next/server";
import {
  MOCK_SECURITY_EVENTS,
  MOCK_THREAT_INTEL,
  MOCK_VULNERABILITIES,
  MOCK_SECURITY_CONTROLS,
} from "@/lib/mock-data";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const source = searchParams.get("source") || undefined;

    let events = MOCK_SECURITY_EVENTS;
    if (source && source !== "ALL") {
      events = events.filter((e) => e.source.toLowerCase() === source.toLowerCase());
    }

    return NextResponse.json({
      success: true,
      events,
      threatIntel: MOCK_THREAT_INTEL,
      activeVulnerabilities: MOCK_VULNERABILITIES,
      controls: MOCK_SECURITY_CONTROLS,
      simulatedStatus: "LIVE_STREAMING_DEMO",
      generatedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error("Error in cyber-risk/telemetry API:", err);
    return NextResponse.json({ error: "Failed to retrieve telemetry" }, { status: 500 });
  }
}
