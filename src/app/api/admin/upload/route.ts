import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  const form = await request.formData().catch(() => null);
  if (!form) return NextResponse.json({ error: "Pedido inválido." }, { status: 400 });
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Seleccione uma fotografia." }, { status: 400 });
  }
  if (file.size > 6 * 1024 * 1024) {
    return NextResponse.json({ error: "A fotografia não pode ultrapassar 6 MB." }, { status: 400 });
  }
  const type = file.type || "";
  if (!["image/jpeg", "image/png", "image/webp"].includes(type)) {
    return NextResponse.json({ error: "Use uma imagem JPG, PNG ou WebP." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const ext = type === "image/png" ? "png" : type === "image/webp" ? "webp" : "jpg";
  const name = `img-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}.${ext}`;
  const dir = path.join(process.cwd(), "public", "uploads");
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, name), buffer);
  return NextResponse.json({ url: `/uploads/${name}` });
}
