import { NextResponse } from "next/server";
import { queryCyberCopilotWithClaude } from "@/lib/anthropic";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { query, conversationHistory } = body;

    if (!query || typeof query !== "string") {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    const response = await queryCyberCopilotWithClaude(query, conversationHistory || []);
    return NextResponse.json(response);
  } catch (err) {
    console.error("Error in cyber-risk/query API:", err);
    return NextResponse.json({ error: "Failed to process cyber copilot query" }, { status: 500 });
  }
}
