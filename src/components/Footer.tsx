import Link from "next/link";
import { Logo } from "./Logo";
import { InstagramIcon, MapPinIcon, PhoneIcon, WhatsAppIcon } from "./icons";
import { navigation, locationOptions, site } from "@/lib/site";
import { generalWhatsappMessage, whatsappLink } from "@/lib/whatsapp";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-ink-800 bg-ink text-white/80">
      <div className="shell grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo variant="light" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
            {site.description}
          </p>
          <div className="mt-5 flex items-center gap-3">
            <a
              href={whatsappLink(generalWhatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Falar com a Nine Força Imobiliária no WhatsApp"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-[#1FB15A]"
            >
              <WhatsAppIcon className="h-5 w-5" />
            </a>
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Instagram ${site.instagramHandle}`}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-brand"
            >
              <InstagramIcon className="h-5 w-5" />
            </a>
          </div>
        </div>

        <nav aria-label="Navegação do rodapé">
          <h2 className="font-display text-sm font-bold uppercase tracking-wide text-white">Navegação</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-white/70 transition-colors hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-display text-sm font-bold uppercase tracking-wide text-white">Zonas</h2>
          <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2.5 text-sm">
            {locationOptions.slice(0, 8).map((place) => (
              <li key={place}>
                <Link
                  href={`/imoveis?localizacao=${encodeURIComponent(place)}`}
                  className="text-white/70 transition-colors hover:text-white"
                >
                  {place}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-sm font-bold uppercase tracking-wide text-white">Contactos</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a href={site.phoneHref} className="inline-flex items-center gap-2.5 text-white/70 transition-colors hover:text-white">
                <PhoneIcon className="h-4 w-4 text-brand" />
                {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={whatsappLink(generalWhatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-white/70 transition-colors hover:text-white"
              >
                <WhatsAppIcon className="h-4 w-4 text-brand" />
                WhatsApp
              </a>
            </li>
            <li>
              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-white/70 transition-colors hover:text-white"
              >
                <InstagramIcon className="h-4 w-4 text-brand" />
                {site.instagramHandle}
              </a>
            </li>
            <li className="inline-flex items-start gap-2.5 text-white/70">
              <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
              <span>
                Maputo e Matola, {site.country}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="shell flex flex-col gap-2 py-6 pb-24 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between lg:pb-6">
          <p>
            &copy; {year} {site.name}. Todos os direitos reservados.
          </p>
          <p className="text-white/40">
            Anúncios e conteúdos de demonstração — substituíveis pelo inventário real.
          </p>
        </div>
      </div>
    </footer>
  );
}
