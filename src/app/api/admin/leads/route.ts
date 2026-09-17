import { NextResponse } from "next/server";
import { crmStats, getAllLeads } from "@/lib/leads";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ leads: getAllLeads(), stats: crmStats() });
}
