import { NextRequest, NextResponse } from "next/server";
import { auditExpenseWithClaude } from "@/lib/anthropic";
import { ExpenseAuditRequest } from "@/lib/types";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ExpenseAuditRequest;

    if (!body.vendor || !body.amount || !body.category) {
      return NextResponse.json(
        { error: "Missing required fields: vendor, amount, and category are mandatory." },
        { status: 400 }
      );
    }

    const auditResult = await auditExpenseWithClaude(body);
    return NextResponse.json(auditResult, { status: 200 });
  } catch (error: any) {
    console.error("Error in /api/expenses/analyze:", error);
    return NextResponse.json(
      { error: "Failed to audit expense claim", details: error?.message },
      { status: 500 }
    );
  }
}
