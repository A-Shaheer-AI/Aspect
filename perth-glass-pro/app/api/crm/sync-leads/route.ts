import { NextResponse } from "next/server";
import { getAllLeads } from "@/lib/leads/store";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const leads = getAllLeads();
    return NextResponse.json({
      success: true,
      total: leads.length,
      leads
    });
  } catch (error: any) {
    console.error("[CRM Lead Sync Error]:", error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Failed to fetch website leads"
      },
      { status: 500 }
    );
  }
}
