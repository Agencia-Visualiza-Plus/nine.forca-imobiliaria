import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { JsonLd } from "@/components/JsonLd";
import { CheckIcon } from "@/components/icons";
import { site } from "@/lib/site";
import { generalWhatsappMessage } from "@/lib/whatsapp";
import { breadcrumbSchema, organizationSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Sobre Nós — Imobiliária em Maputo e Matola",
  description:
    "Conheça a Nine Força Imobiliária: uma imobiliária que ajuda clientes a comprar, vender e arrendar imóveis em Maputo e Matola, com atendimento personalizado e acompanhamento.",
  alternates: { canonical: "/sobre" },
  openGraph: {
    title: "Sobre a Nine Força Imobiliária",
    description:
      "Imobiliária em Maputo e Matola. Compra, venda e arrendamento de imóveis com acompanhamento personalizado.",
    url: `${site.url}/sobre`,
  },
};

const focus = [
  {
    title: "Comprar",
    text: "Ajudamos a encontrar imóveis que correspondem ao que procura, filtrando opções por zona, tipo, orçamento e características.",
  },
  {
    title: "Vender",
    text: "Apoiamos proprietários na apresentação e divulgação do seu imóvel e no acompanhamento das visitas e da negociação.",
  },
  {
    title: "Arrendar",
    text: "Apresentamos alternativas de arrendamento para habitação e comércio, com apoio na visita e na definição das condições.",
  },
];

const principles = [
  "Atendimento próximo e personalizado",
  "Comunicação clara em todas as etapas",
  "Foco em opções ajustadas ao seu orçamento",
  "Acompanhamento de visitas e negociação",
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          organizationSchema(),
          breadcrumbSchema([
            { name: "Início", path: "/" },
            { name: "Sobre Nós", path: "/sobre" },
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
              <li className="font-medium text-ink">Sobre Nós</li>
            </ol>
          </nav>
          <p className="eyebrow mt-4">{site.tagline}</p>
          <h1 className="mt-3 max-w-3xl font-display text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
            Sobre a NINE FORÇA IMOBILIÁRIA
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-600">
            Somos uma imobiliária que atua em Maputo e Matola, dedicada a ligar pessoas a imóveis.
            Trabalhamos todos os dias para tornar a procura, a venda e o arrendamento de imóveis um
            processo mais simples e transparente.
          </p>
        </div>
      </section>

      <section className="shell py-12">
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <div>
            <h2 className="section-title">Quem somos</h2>
            <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-ink-600">
              <p>
                A Nine Força Imobiliária é uma empresa moçambicana que se dedica à intermediação
                imobiliária. O nosso trabalho centra-se em compreender o que cada cliente procura e
                apresentar opções concretas, com informação clara sobre cada imóvel.
              </p>
              <p>
                Atuamos em Maputo e Matola, em imóveis para habitação e para comércio — moradias,
                apartamentos, terrenos, lojas, escritórios e armazéns.
              </p>
              <p>
                Acompanhamos o cliente desde o primeiro contacto até à visita e às etapas seguintes
                da negociação, com o objetivo de dar segurança a quem compra, vende ou arrenda.
              </p>
            </div>

            <ul className="mt-6 space-y-2.5">
              {principles.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[14px] text-ink-700">
                  <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="overflow-hidden rounded-2xl border border-paper-line bg-white shadow-card">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src="/locations/polana-v2.jpg"
                alt="Vista de uma zona residencial de Maputo"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h2 className="font-display text-lg font-bold text-ink">O que fazemos</h2>
              <dl className="mt-4 space-y-4">
                {focus.map((item) => (
                  <div key={item.title}>
                    <dt className="font-display text-[15px] font-bold text-ink">{item.title}</dt>
                    <dd className="mt-1 text-[13px] leading-relaxed text-ink-500">{item.text}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      <section className="shell pb-4" aria-labelledby="zonas-titulo">
        <div className="rounded-2xl border border-paper-line bg-white p-6 sm:p-8">
          <h2 id="zonas-titulo" className="section-title text-xl">
            Onde atuamos
          </h2>
          <p className="section-lead text-[14px]">
            Trabalhamos em Maputo e Matola e em zonas próximas. Estas são as principais áreas onde
            procuramos imóveis para os nossos clientes.
          </p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {["Maputo", "Matola", "Costa do Sol", "Polana", "Sommerschield", "Coop", "Triunfo", "Magoanine", "Zimpeto", "Marracuene"].map(
              (area) => (
                <li key={area}>
                  <Link
                    href={`/imoveis?localizacao=${encodeURIComponent(area)}`}
                    className="chip transition-colors hover:border-brand/40 hover:text-ink"
                  >
                    {area}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </div>
      </section>

      <section className="shell py-12">
        <div className="rounded-2xl bg-ink p-8 text-center sm:p-12">
          <h2 className="font-display text-2xl font-extrabold text-white sm:text-3xl">
            Fale com a Nine Força Imobiliária
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-white/75">
            Diga-nos o que procura ou o que pretende vender. Respondemos pelo WhatsApp.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <WhatsAppButton message={generalWhatsappMessage} label="Falar no WhatsApp" size="lg" />
            <Link href="/contactos" className="btn bg-white text-ink hover:bg-paper-muted">
              Ver contactos
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
