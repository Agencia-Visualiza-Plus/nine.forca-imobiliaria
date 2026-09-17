import { NextResponse } from "next/server";
import { createLead } from "@/lib/leads";
import { getPropertyById } from "@/lib/properties";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as {
    name?: string;
    phone?: string;
    email?: string;
    message?: string;
    propertyId?: string;
    visitDate?: string;
    visitTime?: string;
  };

  const name = (body.name ?? "").trim();
  const phone = (body.phone ?? "").trim();
  const visitDate = (body.visitDate ?? "").trim();
  const visitTime = (body.visitTime ?? "").trim();

  if (name.length < 2) {
    return NextResponse.json({ error: "Indique o seu nome." }, { status: 400 });
  }
  if (phone.length < 9) {
    return NextResponse.json({ error: "Indique um telefone válido." }, { status: 400 });
  }
  if (!visitDate || !visitTime) {
    return NextResponse.json({ error: "Escolha a data e a hora da visita." }, { status: 400 });
  }

  const property = body.propertyId ? getPropertyById(body.propertyId) : undefined;
  const lead = createLead({
    name,
    phone,
    email: body.email,
    message: body.message,
    source: "visita",
    propertyId: property?.id,
    propertyTitle: property?.title,
    visitDate,
    visitTime,
  });

  return NextResponse.json({ ok: true, leadId: lead.id }, { status: 201 });
}
