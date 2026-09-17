import { NextResponse } from "next/server";
import { deleteProperty, parsePropertyPayload, upsertProperty } from "@/lib/property-write";
import { getPropertyById } from "@/lib/properties";

export const dynamic = "force-dynamic";

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  const property = getPropertyById(params.id);
  if (!property) return NextResponse.json({ error: "Imóvel não encontrado." }, { status: 404 });
  return NextResponse.json({ property });
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const existing = getPropertyById(params.id);
  if (!existing) return NextResponse.json({ error: "Imóvel não encontrado." }, { status: 404 });
  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const input = parsePropertyPayload(body);
  if (input.title.length < 4) {
    return NextResponse.json({ error: "Indique um título com pelo menos 4 caracteres." }, { status: 400 });
  }
  const property = upsertProperty(input, params.id);
  return NextResponse.json({ property });
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  const ok = deleteProperty(params.id);
  if (!ok) return NextResponse.json({ error: "Imóvel não encontrado." }, { status: 404 });
  return NextResponse.json({ ok: true });
}
