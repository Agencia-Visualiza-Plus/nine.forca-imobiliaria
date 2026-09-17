import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SearchBar } from "@/components/SearchBar";
import { PropertyGrid } from "@/components/PropertyGrid";
import { LocationCard } from "@/components/LocationCard";
import { PropertyTypeCard } from "@/components/PropertyTypeCard";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { JsonLd } from "@/components/JsonLd";
import {
  ArrowRightIcon,
  CheckIcon,
  HouseIcon,
  MapPinIcon,
  SparkIcon,
  WhatsAppIcon,
} from "@/components/icons";
import { locationCategories } from "@/lib/locations";
import { propertyTypeOptions, site } from "@/lib/site";
import { demoDisclaimer, getFeaturedProperties } from "@/lib/properties";
import { generalWhatsappMessage, sellWhatsappLink } from "@/lib/whatsapp";
import { faqSchema, organizationSchema, websiteSchema, itemListSchema } from "@/lib/seo";

const homeFaq = [
  {
    question: "Em que zonas trabalha a Nine Força Imobiliária?",
    answer:
      "A Nine Força Imobiliária atua em Maputo e Matola, incluindo zonas e arredores como Costa do Sol, Polana, Sommerschield, Coop, Triunfo, Magoanine, Zimpeto e Marracuene.",
  },
  {
    question: "Que tipo de imóveis posso encontrar?",
    answer:
      "Moradias, apartamentos, terrenos, lojas, escritórios e armazéns, tanto para compra como para arrendamento.",
  },
  {
    question: "Como marco uma visita a um imóvel?",
    answer:
      "Escolha o imóvel e peça uma visita no formulário da página, ou fale connosco pelo WhatsApp. Confirmamos o dia e a hora e acompanhamos a visita.",
  },
  {
    question: "Tenho um imóvel para vender. Como faço?",
    answer:
      "Fale com a Nine pelo WhatsApp e indique a zona, o tipo de imóvel e as principais características. A equipa orienta os passos seguintes do processo.",
  },
];

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Imóveis em Maputo e Matola | Casas e Apartamentos",
  description:
    "Encontre casas à venda, apartamentos para arrendar, terrenos e espaços comerciais em Maputo, Matola e arredores. Fale com a Nine Força Imobiliária no WhatsApp e agende uma visita.",
  alternates: { canonical: "/" },
};

const whyNine = [
  {
    icon: SparkIcon,
    title: "Atendimento personalizado",
    text: "Cada pedido é tratado de forma individual, de acordo com o que procura e o seu orçamento.",
  },
  {
    icon: CheckIcon,
    title: "Apoio durante o processo",
    text: "Acompanhamos as etapas da negociação para que saiba sempre qual é o passo seguinte.",
  },
  {
    icon: HouseIcon,
    title: "Imóveis selecionados",
    text: "Apresentamos opções coerentes com os critérios definidos, sem perdas de tempo.",
  },
  {
    icon: MapPinIcon,
    title: "Visitas e acompanhamento",
    text: "Organizamos as visitas e acompanhamos a conversa com proprietários e compradores.",
  },
];

export default function HomePage() {
  const featured = getFeaturedProperties(6);

  return (
    <>
      <JsonLd
        data={[
          organizationSchema(),
          websiteSchema(),
          itemListSchema(featured),
          faqSchema(homeFaq),
        ]}
      />

      <section className="relative isolate overflow-hidden bg-ink" aria-label="Pesquisa de imóveis">
        <Image
          src="/locations/hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-75"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/55 to-ink/90" />
        <div className="shell relative z-10 pb-28 pt-14 sm:pb-36 sm:pt-20 lg:pb-40 lg:pt-24">
          <p className="eyebrow text-brand-300">{site.tagline}</p>
          <h1 className="mt-4 max-w-3xl font-display text-[30px] font-extrabold leading-[1.08] tracking-tight text-white text-shadow-hero sm:text-5xl lg:text-[56px]">
            Encontre o imóvel certo para si.
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/85 sm:text-lg">
            Explore imóveis em Maputo, Matola e arredores com o apoio da Nine Força Imobiliária.
          </p>
        </div>
      </section>

      <div className="shell relative z-20 -mt-20 sm:-mt-24">
        <SearchBar variant="hero" filters={{ transactionType: "comprar" }} idPrefix="home" />
      </div>

      <section className="shell mt-10" aria-label="Nota sobre os anúncios">
        <p className="rounded-xl border border-paper-line bg-white px-4 py-3 text-[13px] leading-relaxed text-ink-500">
          <span className="font-semibold text-ink-600">Nota: </span>
          {demoDisclaimer}
        </p>
      </section>

      <section className="shell mt-14" aria-labelledby="destaque-titulo">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Seleção</p>
            <h2 id="destaque-titulo" className="section-title mt-2">
              Imóveis em destaque
            </h2>
            <p className="section-lead">
              Uma amostra do tipo de imóveis que pode encontrar com a Nine. Fale connosco para ver
              mais opções adequadas ao seu perfil.
            </p>
          </div>
          <Link href="/imoveis" className="btn-outline">
            Ver todos os imóveis
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>

        <PropertyGrid properties={featured} priorityCount={3} className="mt-7" />
      </section>

      <section className="shell mt-16" aria-labelledby="localizacoes-titulo">
        <div>
          <p className="eyebrow">Zonas</p>
          <h2 id="localizacoes-titulo" className="section-title mt-2">
            Explorar por localização
          </h2>
          <p className="section-lead">
            Escolha uma zona para filtrar imóveis. Estas áreas funcionam como categorias de
            navegação e não representam disponibilidade atual de inventário em todas elas.
          </p>
        </div>

        <div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {locationCategories.map((location) => (
            <LocationCard key={location.slug} location={location} />
          ))}
        </div>
      </section>

      <section className="shell mt-16" aria-labelledby="tipos-titulo">
        <div>
          <p className="eyebrow">Categorias</p>
          <h2 id="tipos-titulo" className="section-title mt-2">
            Encontre por tipo
          </h2>
          <p className="section-lead">
            Do terreno ao armazém, explore o tipo de imóvel que procura.
          </p>
        </div>

        <div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {propertyTypeOptions.map((option) => (
            <PropertyTypeCard key={option.value} type={option.value} label={option.label} />
          ))}
        </div>
      </section>

      <section className="shell mt-16" aria-labelledby="porque-titulo">
        <div className="rounded-2xl border border-paper-line bg-white p-6 sm:p-8 lg:p-10">
          <p className="eyebrow">A nossa forma de trabalhar</p>
          <h2 id="porque-titulo" className="section-title mt-2">
            Porquê a Nine
          </h2>
          <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyNine.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title}>
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-ink text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-base font-bold text-ink">{item.title}</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-ink-500">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="shell mt-16" aria-labelledby="vender-titulo">
        <div className="overflow-hidden rounded-2xl bg-ink">
          <div className="grid items-center gap-8 p-8 sm:p-10 lg:grid-cols-2 lg:p-12">
            <div>
              <p className="eyebrow text-brand-300">Proprietários</p>
              <h2 id="vender-titulo" className="mt-2 font-display text-2xl font-extrabold text-white sm:text-3xl">
                Quer vender o seu imóvel?
              </h2>
              <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-white/75">
                Fale com a Nine e apresente o seu imóvel. Ajudamos a divulgar, a filtrar interessados
                e a conduzir o processo de venda até ao fecho.
              </p>
              <div className="mt-6">
                <a
                  href={sellWhatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn bg-brand text-white hover:bg-brand-600"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  Falar com a Nine
                </a>
              </div>
            </div>
            <dl className="grid grid-cols-2 gap-4 text-white/80">
              <div className="rounded-xl bg-white/5 p-4">
                <dt className="text-[12px] uppercase tracking-wide text-white/50">Zona</dt>
                <dd className="mt-1 font-display text-sm font-bold text-white">Maputo e Matola</dd>
              </div>
              <div className="rounded-xl bg-white/5 p-4">
                <dt className="text-[12px] uppercase tracking-wide text-white/50">Imóveis</dt>
                <dd className="mt-1 font-display text-sm font-bold text-white">
                  Habitação e comércio
                </dd>
              </div>
              <div className="rounded-xl bg-white/5 p-4">
                <dt className="text-[12px] uppercase tracking-wide text-white/50">Contacto</dt>
                <dd className="mt-1 font-display text-sm font-bold text-white">WhatsApp direto</dd>
              </div>
              <div className="rounded-xl bg-white/5 p-4">
                <dt className="text-[12px] uppercase tracking-wide text-white/50">Apoio</dt>
                <dd className="mt-1 font-display text-sm font-bold text-white">
                  Visitas e acompanhamento
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="shell mt-16" aria-labelledby="cta-titulo">
        <div className="relative overflow-hidden rounded-2xl border border-brand/25 bg-brand-50 p-8 text-center sm:p-12">
          <h2 id="cta-titulo" className="font-display text-2xl font-extrabold text-ink sm:text-3xl">
            Está à procura de um imóvel?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-ink-600">
            Fale connosco e diga-nos o que procura.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <WhatsAppButton
              message={generalWhatsappMessage}
              label="Falar no WhatsApp"
              size="lg"
              className="w-full sm:w-auto"
            />
            <Link href="/imoveis" className="btn-outline w-full sm:w-auto">
              Explorar imóveis
            </Link>
          </div>
        </div>
      </section>

      <section className="shell mt-16" aria-labelledby="faq-titulo">
        <p className="eyebrow">Perguntas frequentes</p>
        <h2 id="faq-titulo" className="section-title mt-2">
          Antes de falar connosco
        </h2>
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {homeFaq.map((item) => (
            <details
              key={item.question}
              className="group rounded-2xl border border-paper-line bg-white p-5 open:shadow-card"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-[15px] font-bold text-ink">
                {item.question}
                <span className="text-brand transition-transform group-open:rotate-45" aria-hidden="true">
                  +
                </span>
              </summary>
              <p className="mt-3 text-[14px] leading-relaxed text-ink-500">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
