"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { CloseIcon, MenuIcon, PhoneIcon } from "./icons";
import { WhatsAppButton } from "./WhatsAppButton";
import { generalWhatsappMessage } from "@/lib/whatsapp";
import { navigation, site } from "@/lib/site";

function isActive(pathname: string, href: string): boolean {
  // Itens com query (Comprar/Arrendar) são filtros rápidos; a navegação
  // principal ativa é determinada pelo item de rota limpa "Imóveis".
  if (href.includes("?")) return false;
  const base = href.split("?")[0];
  if (base === "/") return pathname === "/";
  return pathname === base || pathname.startsWith(`${base}/`);
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-paper-line bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="shell flex h-16 items-center justify-between gap-4 lg:h-[72px]">
        <Link href="/" aria-label={`${site.name} — página inicial`} className="flex shrink-0 items-center">
          <Logo />
        </Link>

        <nav aria-label="Navegação principal" className="hidden lg:flex lg:items-center lg:gap-1">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(pathname, item.href) ? "page" : undefined}
              className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                isActive(pathname, item.href)
                  ? "bg-paper-muted text-ink"
                  : "text-ink-600 hover:bg-paper-soft hover:text-ink"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={site.phoneHref}
            className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-ink-600 hover:text-ink sm:inline-flex xl:hidden"
            aria-label={`Ligar para ${site.phoneDisplay}`}
          >
            <PhoneIcon className="h-4 w-4" />
          </a>
          <WhatsAppButton
            message={generalWhatsappMessage}
            label="WhatsApp"
            size="sm"
            className="hidden sm:inline-flex"
          />
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-paper-line text-ink lg:hidden"
          >
            {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="menu-mobile"
          className="border-t border-paper-line bg-white lg:hidden"
        >
          <nav aria-label="Navegação mobile" className="shell flex flex-col py-3">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(pathname, item.href) ? "page" : undefined}
                className={`rounded-lg px-3 py-3 text-[15px] font-medium ${
                  isActive(pathname, item.href) ? "bg-paper-muted text-ink" : "text-ink-700"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2 border-t border-paper-line pt-3">
              <WhatsAppButton message={generalWhatsappMessage} label="Falar no WhatsApp" block />
              <a href={site.phoneHref} className="btn-outline w-full">
                <PhoneIcon className="h-4 w-4" />
                {site.phoneDisplay}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
