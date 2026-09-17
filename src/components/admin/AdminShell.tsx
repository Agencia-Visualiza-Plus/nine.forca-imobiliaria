"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { CalendarIcon, HouseIcon, UsersIcon } from "@/components/icons";
import { Logo } from "@/components/Logo";

const items = [
  { href: "/admin", label: "Resumo", icon: HouseIcon },
  { href: "/admin/imoveis", label: "Imóveis", icon: HouseIcon },
  { href: "/admin/visitas", label: "Visitas", icon: CalendarIcon },
  { href: "/admin/leads", label: "CRM / Leads", icon: UsersIcon },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/entrar");
    router.refresh();
  }

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[240px_1fr]">
      <aside className="border-b border-paper-line bg-white lg:border-b-0 lg:border-r">
        <div className="flex items-center justify-between px-5 py-4 lg:block">
          <Link href="/admin" className="inline-flex">
            <Logo />
          </Link>
          <button type="button" onClick={logout} className="text-[13px] font-semibold text-ink-500 lg:hidden">
            Sair
          </button>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-3 pb-3 lg:block lg:space-y-1 lg:px-3 lg:pb-6">
          {items.map((item) => {
            const active = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`inline-flex items-center gap-2 whitespace-nowrap rounded-xl px-3 py-2.5 text-sm font-medium ${
                  active ? "bg-ink text-white" : "text-ink-600 hover:bg-paper-muted"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="hidden px-5 pb-6 lg:block">
          <button type="button" onClick={logout} className="btn-outline w-full">
            Sair
          </button>
          <Link href="/" className="mt-3 block text-center text-[12px] text-ink-500 hover:text-ink">
            Ver o site
          </Link>
        </div>
      </aside>
      <div className="min-w-0 px-4 py-6 sm:px-6 lg:px-8">{children}</div>
    </div>
  );
}
