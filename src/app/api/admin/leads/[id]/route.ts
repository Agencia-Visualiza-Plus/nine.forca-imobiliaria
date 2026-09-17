import { NextResponse } from "next/server";
import { getLeadById, updateLead } from "@/lib/leads";
import type { LeadStatus } from "@/lib/types";

const statuses: LeadStatus[] = [
  "novo",
  "em-contacto",
  "visita-agendada",
  "visita-realizada",
  "ganho",
  "perdido",
];

export const dynamic = "force-dynamic";

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  const lead = getLeadById(params.id);
  if (!lead) return NextResponse.json({ error: "Lead não encontrado." }, { status: 404 });
  return NextResponse.json({ lead });
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const body = (await request.json().catch(() => ({}))) as {
    status?: LeadStatus;
    notes?: string;
    visitDate?: string;
    visitTime?: string;
  };
  if (body.status && !statuses.includes(body.status)) {
    return NextResponse.json({ error: "Estado inválido." }, { status: 400 });
  }
  const lead = updateLead(params.id, {
    ...(body.status ? { status: body.status } : {}),
    ...(typeof body.notes === "string" ? { notes: body.notes } : {}),
    ...(typeof body.visitDate === "string" ? { visitDate: body.visitDate } : {}),
    ...(typeof body.visitTime === "string" ? { visitTime: body.visitTime } : {}),
  });
  if (!lead) return NextResponse.json({ error: "Lead não encontrado." }, { status: 404 });
  return NextResponse.json({ lead });
}
