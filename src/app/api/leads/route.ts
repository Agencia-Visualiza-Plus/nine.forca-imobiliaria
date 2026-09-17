import { NextResponse } from "next/server";
import { createLead } from "@/lib/leads";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as {
    name?: string;
    phone?: string;
    email?: string;
    message?: string;
    interest?: string;
  };

  const name = (body.name ?? "").trim();
  const phone = (body.phone ?? "").trim();
  const message = (body.message ?? "").trim();

  if (name.length < 2) {
    return NextResponse.json({ error: "Indique o seu nome." }, { status: 400 });
  }
  if (phone.length < 9) {
    return NextResponse.json({ error: "Indique um telefone válido." }, { status: 400 });
  }
  if (message.length < 10) {
    return NextResponse.json({ error: "Escreva uma mensagem com pelo menos 10 caracteres." }, { status: 400 });
  }

  const lead = createLead({
    name,
    phone,
    email: body.email,
    message: body.interest ? `${body.interest}. ${message}` : message,
    source: "contacto",
  });

  return NextResponse.json({ ok: true, leadId: lead.id }, { status: 201 });
}
