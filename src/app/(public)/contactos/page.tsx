import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { VisitForm } from "@/components/VisitForm";
import { MapEmbed } from "@/components/MapEmbed";
import { JsonLd } from "@/components/JsonLd";
import { InstagramIcon, MapPinIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { site } from "@/lib/site";
import { generalWhatsappMessage, whatsappLink } from "@/lib/whatsapp";
import { breadcrumbSchema, organizationSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contactos — WhatsApp, Telefone e Instagram",
  description:
    "Contacte a Nine Força Imobiliária pelo WhatsApp +258 84 274 5338, telefone ou Instagram @imobiliarianine. Atendemos Maputo e Matola, em Moçambique.",
  alternates: { canonical: "/contactos" },
  openGraph: {
    title: "Contactos da Nine Força Imobiliária",
    description:
      "Fale connosco pelo WhatsApp, telefone ou Instagram. Compra, venda e arrendamento de imóveis em Maputo e Matola.",
    url: `${site.url}/contactos`,
  },
};

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contactos — Nine Força Imobiliária",
  url: `${site.url}/contactos`,
  about: { "@id": `${site.url}/#organizacao` },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={[
          organizationSchema(),
          contactPageSchema,
          breadcrumbSchema([
            { name: "Início", path: "/" },
            { name: "Contactos", path: "/contactos" },
          ]),
        ]}
      />

      <section className="border-b border-paper-line bg-white">
        <div className="shell py-10 sm:py-14">
          <nav aria-label="Caminho de navegação" className="text-[13px] text-ink-500">
            <ol className="flex items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-ink">
                  Início
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="font-medium text-ink">Contactos</li>
            </ol>
          </nav>
          <h1 className="mt-4 font-display text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
            Contactos
          </h1>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink-600">
            Fale connosco e diga-nos o que procura. O WhatsApp é a forma mais rápida de obter
            resposta e de agendar uma visita.
          </p>
        </div>
      </section>

      <div className="shell py-10 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]">
          <div>
            <h2 className="section-title text-xl">Formas de contacto</h2>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href={whatsappLink(generalWhatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-2xl border border-paper-line bg-white p-4 shadow-card transition-colors hover:border-[#1FB15A]/50"
                >
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#1FB15A]/10 text-[#12803E]">
                    <WhatsAppIcon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block font-display text-[15px] font-bold text-ink">
                      WhatsApp
                    </span>
                    <span className="block text-[13px] text-ink-500">{site.phoneDisplay}</span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={site.phoneHref}
                  className="flex items-center gap-4 rounded-2xl border border-paper-line bg-white p-4 shadow-card transition-colors hover:border-brand/40"
                >
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <PhoneIcon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block font-display text-[15px] font-bold text-ink">
                      Telefone
                    </span>
                    <span className="block text-[13px] text-ink-500">{site.phoneDisplay}</span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={site.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-2xl border border-paper-line bg-white p-4 shadow-card transition-colors hover:border-brand/40"
                >
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <InstagramIcon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block font-display text-[15px] font-bold text-ink">
                      Instagram
                    </span>
                    <span className="block text-[13px] text-ink-500">{site.instagramHandle}</span>
                  </span>
                </a>
              </li>
              <li className="flex items-center gap-4 rounded-2xl border border-paper-line bg-white p-4 shadow-card">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <MapPinIcon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-display text-[15px] font-bold text-ink">
                    Zona de atuação
                  </span>
                  <span className="block text-[13px] text-ink-500">
                    Maputo e Matola, {site.country}
                  </span>
                </span>
              </li>
            </ul>

            <div className="mt-6">
              <h3 className="font-display text-base font-bold text-ink">Onde estamos</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-ink-500">
                O nosso atendimento é feito em Maputo e Matola. Se precisar de uma localização exata,
                peça-nos no WhatsApp antes da visita.
              </p>
              <MapEmbed
                lat={-25.9653}
                lng={32.5892}
                label="Maputo, Moçambique"
                span={0.09}
                height={260}
                className="mt-4"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-paper-line bg-white p-6 shadow-card sm:p-8">
            <h2 className="section-title text-xl">Envie a sua mensagem</h2>
            <p className="mt-2 text-[14px] leading-relaxed text-ink-500">
              Preencha o formulário e a mensagem será preparada no WhatsApp, pronta a enviar.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>

        <div id="agendar" className="mt-8 rounded-2xl border border-paper-line bg-white p-6 shadow-card sm:p-8">
          <VisitForm />
        </div>
      </div>
    </>
  );
}
