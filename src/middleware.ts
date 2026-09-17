import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_COOKIE, isAdminToken } from "@/lib/admin-auth";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin/entrar" || pathname.startsWith("/api/admin/login")) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    const token = request.cookies.get(ADMIN_COOKIE)?.value;
    if (!isAdminToken(token)) {
      if (pathname.startsWith("/api/")) {
        return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
      }
      const url = request.nextUrl.clone();
      url.pathname = "/admin/entrar";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
