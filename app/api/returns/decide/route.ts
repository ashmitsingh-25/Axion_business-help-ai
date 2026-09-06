import { NextRequest, NextResponse } from "next/server";
import { evaluateReturnWithClaude } from "@/lib/anthropic";
import { ReturnDecisionRequest } from "@/lib/types";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ReturnDecisionRequest;

    if (!body.orderId || !body.customerReason) {
      return NextResponse.json(
        { error: "Missing required fields: orderId and customerReason are mandatory." },
        { status: 400 }
      );
    }

    const decision = await evaluateReturnWithClaude(body);
    return NextResponse.json(decision, { status: 200 });
  } catch (error: any) {
    console.error("Error in /api/returns/decide:", error);
    return NextResponse.json(
      { error: "Failed to evaluate return request", details: error?.message },
      { status: 500 }
    );
  }
}
