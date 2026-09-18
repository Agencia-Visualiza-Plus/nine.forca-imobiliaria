"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BuildingIcon,
  CalendarIcon,
  ExternalLinkIcon,
  GridIcon,
  LogOutIcon,
  PlusIcon,
  UsersIcon,
} from "@/components/icons";
import { Logo } from "@/components/Logo";

const items = [
  { href: "/admin", label: "Resumo", icon: GridIcon },
  { href: "/admin/imoveis", label: "Imóveis", icon: BuildingIcon },
  { href: "/admin/visitas", label: "Visitas", icon: CalendarIcon },
  { href: "/admin/leads", label: "CRM / Leads", icon: UsersIcon },
];

function isActive(pathname: string, href: string) {
  return pathname === href || (href !== "/admin" && pathname.startsWith(href));
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/entrar");
    router.refresh();
  }

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[260px_1fr]">
      <aside className="sticky top-0 z-20 border-b border-paper-line bg-white lg:flex lg:h-screen lg:flex-col lg:border-b-0 lg:border-r">
        <div className="flex items-center justify-between gap-3 px-5 py-4 lg:block lg:px-5 lg:pb-2 lg:pt-6">
          <Link href="/admin" className="inline-flex min-w-0">
            <Logo />
          </Link>
          <p className="mt-3 hidden text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-500 lg:block">
            Painel interno
          </p>
          <button
            type="button"
            onClick={logout}
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-ink-500 lg:hidden"
          >
            <LogOutIcon className="h-4 w-4" />
            Sair
          </button>
        </div>

        <nav className="flex gap-1 overflow-x-auto px-3 pb-3 no-scrollbar lg:mt-4 lg:flex-1 lg:flex-col lg:space-y-1 lg:overflow-visible lg:px-3 lg:pb-6">
          {items.map((item) => {
            const active = isActive(pathname, item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`inline-flex items-center gap-2.5 whitespace-nowrap rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                  active ? "bg-ink text-white shadow-sm" : "text-ink-600 hover:bg-paper-muted hover:text-ink"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden space-y-2 border-t border-paper-line px-4 py-5 lg:block">
          <Link href="/admin/imoveis/novo" className="btn-primary w-full">
            <PlusIcon className="h-4 w-4" />
            Novo imóvel
          </Link>
          <button type="button" onClick={logout} className="btn-outline w-full">
            <LogOutIcon className="h-4 w-4" />
            Sair
          </button>
          <Link
            href="/"
            className="inline-flex w-full items-center justify-center gap-1.5 pt-1 text-[12px] font-medium text-ink-500 hover:text-ink"
          >
            Ver o site
            <ExternalLinkIcon className="h-3.5 w-3.5" />
          </Link>
        </div>
      </aside>
      <div className="min-w-0 px-4 py-6 sm:px-6 lg:px-10 lg:py-8">{children}</div>
    </div>
  );
}
