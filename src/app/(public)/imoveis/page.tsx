import type { Metadata } from "next";
import Link from "next/link";
import { SearchBar } from "@/components/SearchBar";
import { SearchFilters } from "@/components/SearchFilters";
import { SortSelect } from "@/components/SortSelect";
import { PropertyGrid } from "@/components/PropertyGrid";
import { MapEmbed } from "@/components/MapEmbed";
import { JsonLd } from "@/components/JsonLd";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { propertyTypePluralLabels } from "@/lib/format";
import {
  filterProperties,
  getAllProperties,
  parseFiltersFromSearchParams,
  sortProperties,
} from "@/lib/properties";
import { site } from "@/lib/site";
import { generalWhatsappMessage } from "@/lib/whatsapp";
import { breadcrumbSchema, itemListSchema, organizationSchema } from "@/lib/seo";
import type { PropertySort } from "@/lib/types";

export const dynamic = "force-dynamic";

type SearchParams = Record<string, string | string[] | undefined>;

const sortValues: PropertySort[] = ["relevancia", "preco-asc", "preco-desc", "area-desc", "recentes"];

function normalize(params: SearchParams) {
  return parseFiltersFromSearchParams(params);
}

function firstValue(params: SearchParams, key: string): string | undefined {
  const value = params[key];
  return Array.isArray(value) ? value[0] : value;
}

function hasActiveFilters(params: SearchParams): boolean {
  return ["transacao", "tipo", "localizacao", "precoMin", "precoMax", "quartos", "casasBanho", "areaMin"].some(
    (key) => Boolean(firstValue(params, key)),
  );
}

function describeQuery(params: SearchParams): string {
  const filters = normalize(params);
  const parts: string[] = [];

  if (filters.transactionType === "arrendar") parts.push("para arrendar");
  else if (filters.transactionType === "comprar") parts.push("para comprar");

  if (filters.type && filters.type !== "todos") {
    parts.push(`— ${propertyTypePluralLabels[filters.type]}`);
  }

  if (filters.location && filters.location !== "todas") {
    parts.push(`em ${filters.location}`);
  } else {
    parts.push("em Maputo e Matola");
  }

  if (filters.bedrooms) parts.push(`com ${filters.bedrooms}+ quartos`);

  return parts.join(" ");
}

export function generateMetadata({ searchParams }: { searchParams: SearchParams }): Metadata {
  const filtered = hasActiveFilters(searchParams);
  const query = describeQuery(searchParams);
  const title = filtered
    ? `Imóveis ${query}`.replace(/\s+/g, " ").trim()
    : "Imóveis em Maputo e Matola — Casas, Apartamentos e Terrenos";

  const description = filtered
    ? `Veja imóveis ${query}. Fale com a Nine Força Imobiliária no WhatsApp para saber mais e agendar uma visita.`
    : "Pesquise casas à venda, apartamentos para arrendar, terrenos, lojas, escritórios e armazéns em Maputo, Matola e arredores. Filtre por zona, tipo, preço, quartos e área.";

  return {
    title,
    description,
    alternates: { canonical: "/imoveis" },
    robots: filtered ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: { title, description, url: `${site.url}/imoveis` },
  };
}

export default function PropertiesPage({ searchParams }: { searchParams: SearchParams }) {
  const filters = normalize(searchParams);
  const sortParam = firstValue(searchParams, "ordenar");
  const sort: PropertySort = sortValues.includes(sortParam as PropertySort)
    ? (sortParam as PropertySort)
    : "relevancia";

  const results = sortProperties(filterProperties(getAllProperties(), filters), sort);

  const center =
    results.length > 0
      ? results.reduce(
          (acc, property) => ({
            lat: acc.lat + property.location.coordinates.lat / results.length,
            lng: acc.lng + property.location.coordinates.lng / results.length,
          }),
          { lat: 0, lng: 0 },
        )
      : { lat: -25.9653, lng: 32.5892 };

  const span =
    results.length > 1
      ? Math.min(
          0.35,
          Math.max(
            0.01,
            Math.abs(
              Math.max(...results.map((p) => p.location.coordinates.lat)) -
                Math.min(...results.map((p) => p.location.coordinates.lat)),
            ) /
              2 +
              Math.abs(
                Math.max(...results.map((p) => p.location.coordinates.lng)) -
                  Math.min(...results.map((p) => p.location.coordinates.lng)),
              ) /
                2,
          ),
        )
      : 0.014;

  return (
    <>
      <JsonLd
        data={[
          organizationSchema(),
          breadcrumbSchema([
            { name: "Início", path: "/" },
            { name: "Imóveis", path: "/imoveis" },
          ]),
          itemListSchema(results),
        ]}
      />

      <div className="border-b border-paper-line bg-white">
        <div className="shell py-6 sm:py-8">
          <nav aria-label="Caminho de navegação" className="text-[13px] text-ink-500">
            <ol className="flex items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-ink">
                  Início
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="font-medium text-ink">Imóveis</li>
            </ol>
          </nav>
          <h1 className="mt-3 font-display text-2xl font-extrabold text-ink sm:text-3xl">
            Imóveis em Maputo e Matola
          </h1>
          <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-ink-500">
            Use a pesquisa e os filtros para encontrar casas, apartamentos, terrenos e espaços
            comerciais. Fale connosco no WhatsApp para agendar uma visita.
          </p>
          <div className="mt-5">
            <SearchBar variant="inline" filters={filters} idPrefix="page" />
          </div>
        </div>
      </div>

      <div className="shell py-8">
        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <SearchFilters filters={filters} resultCount={results.length} />

          <div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-ink-600" role="status" aria-live="polite">
                <span className="font-display text-base font-bold text-ink">{results.length}</span>{" "}
                {results.length === 1 ? "imóvel encontrado" : "imóveis encontrados"}
              </p>
              <SortSelect value={sort} />
            </div>

            <PropertyGrid properties={results} priorityCount={3} className="mt-5" />

            <p className="mt-4 rounded-xl border border-paper-line bg-white px-4 py-3 text-[12px] leading-relaxed text-ink-500">
              Os resultados apresentados são exemplos de demonstração e serão substituídos pelo
              inventário real da Nine Força Imobiliária.
            </p>
          </div>
        </div>

        <section className="mt-12" aria-labelledby="mapa-titulo">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="eyebrow">Mapa</p>
              <h2 id="mapa-titulo" className="section-title mt-2 text-xl">
                Zona dos resultados
              </h2>
            </div>
            <p className="text-[13px] text-ink-500">
              {results.length > 0
                ? `Mapa centrado nos ${results.length} resultados filtrados.`
                : "Sem resultados para os filtros aplicados."}
            </p>
          </div>
          <MapEmbed
            lat={center.lat}
            lng={center.lng}
            span={span}
            height={360}
            label={filters.location && filters.location !== "todas" ? String(filters.location) : "Maputo e Matola"}
            className="mt-4"
          />
        </section>

        <section className="mt-12 rounded-2xl border border-paper-line bg-white p-6 sm:p-8">
          <h2 className="font-display text-xl font-bold text-ink">Não encontrou o que procura?</h2>
          <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-ink-500">
            Diga-nos o tipo de imóvel, a zona e o orçamento. A Nine procura opções adequadas ao seu
            pedido e acompanha-o durante o processo.
          </p>
          <div className="mt-5">
            <WhatsAppButton message={generalWhatsappMessage} label="Falar no WhatsApp" />
          </div>
        </section>
      </div>
    </>
  );
}
