import { NextResponse } from "next/server";
import { parsePropertyPayload, upsertProperty } from "@/lib/property-write";
import { getAllProperties } from "@/lib/properties";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ properties: getAllProperties() });
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const input = parsePropertyPayload(body);
  if (input.title.length < 4) {
    return NextResponse.json({ error: "Indique um título com pelo menos 4 caracteres." }, { status: 400 });
  }
  if (input.price <= 0) {
    return NextResponse.json({ error: "Indique um preço válido." }, { status: 400 });
  }
  const property = upsertProperty(input);
  return NextResponse.json({ property }, { status: 201 });
}
