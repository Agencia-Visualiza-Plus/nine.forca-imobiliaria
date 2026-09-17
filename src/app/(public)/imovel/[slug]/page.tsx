import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PropertyGallery } from "@/components/PropertyGallery";
import { PropertyDetails } from "@/components/PropertyDetails";
import { PropertyFeatures } from "@/components/PropertyFeatures";
import { PropertyContactCard } from "@/components/PropertyContactCard";
import { PropertyGrid } from "@/components/PropertyGrid";
import { MapEmbed } from "@/components/MapEmbed";
import { JsonLd } from "@/components/JsonLd";
import {
  demoDisclaimer,
  getPropertyBySlug,
  getPropertySlugs,
  getRelatedProperties,
} from "@/lib/properties";
import { propertyTypeLabels, transactionLabels } from "@/lib/format";
import { site } from "@/lib/site";
import { breadcrumbSchema, propertySchema } from "@/lib/seo";

export const dynamic = "force-dynamic";

type PageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return getPropertySlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const property = getPropertyBySlug(params.slug);
  if (!property) {
    return {
      title: "Imóvel não encontrado",
      robots: { index: false, follow: false },
    };
  }

  const title = `${property.title} | ${propertyTypeLabels[property.type]} em ${property.location.city}`;
  const description = `${propertyTypeLabels[property.type]} ${transactionLabels[
    property.transactionType
  ].toLowerCase()} em ${property.location.neighborhood}, ${property.location.city}. ${property.bedrooms > 0 ? `${property.bedrooms} quartos, ` : ""}${property.area} m². Fale com a Nine Força Imobiliária no WhatsApp e marque uma visita.`;

  return {
    title,
    description,
    alternates: { canonical: `/imovel/${property.slug}` },
    openGraph: {
      title,
      description,
      url: `${site.url}/imovel/${property.slug}`,
      images: [{ url: `${site.url}${property.images[0]}`, width: 1600, height: 1067, alt: property.title }],
    },
  };
}

export default function PropertyPage({ params }: PageProps) {
  const property = getPropertyBySlug(params.slug);
  if (!property) notFound();

  const related = getRelatedProperties(property, 3);

  return (
    <>
      <JsonLd
        data={[
          propertySchema(property),
          breadcrumbSchema([
            { name: "Início", path: "/" },
            { name: "Imóveis", path: "/imoveis" },
            { name: property.title, path: `/imovel/${property.slug}` },
          ]),
        ]}
      />

      <div className="shell py-6 sm:py-8">
        <nav aria-label="Caminho de navegação" className="text-[13px] text-ink-500">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-ink">
                Início
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/imoveis" className="hover:text-ink">
                Imóveis
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="line-clamp-1 font-medium text-ink">{property.title}</li>
          </ol>
        </nav>

        <div className="mt-5 grid gap-8 lg:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)]">
          <div className="min-w-0">
            <PropertyGallery images={property.images} title={property.title} />

            <div className="mt-8">
              <PropertyDetails property={property} />
            </div>

            <div className="mt-8">
              <PropertyFeatures property={property} />
            </div>

            <section className="mt-8" aria-labelledby="localizacao-titulo">
              <h2 id="localizacao-titulo" className="section-title text-xl">
                Localização
              </h2>
              <p className="section-lead text-[14px]">
                {property.location.neighborhood}, {property.location.city}. A localização apresentada
                é aproximada — contacte-nos para indicações exatas e para agendar a visita.
              </p>
              <MapEmbed
                lat={property.location.coordinates.lat}
                lng={property.location.coordinates.lng}
                label={`${property.location.neighborhood}, ${property.location.city}`}
                height={340}
                className="mt-4"
              />
            </section>
          </div>

          <div className="min-w-0 lg:sticky lg:top-24 lg:self-start">
            <PropertyContactCard
              propertyId={property.id}
              propertyTitle={property.title}
              reference={property.reference}
            />
            <p className="mt-4 rounded-xl border border-paper-line bg-white px-4 py-3 text-[12px] leading-relaxed text-ink-500">
              {demoDisclaimer}
            </p>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-16" aria-labelledby="relacionados-titulo">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <h2 id="relacionados-titulo" className="section-title text-xl">
                Também pode gostar
              </h2>
              <Link href="/imoveis" className="text-sm font-semibold text-ink-600 hover:text-brand-600">
                Ver todos os imóveis
              </Link>
            </div>
            <PropertyGrid properties={related} className="mt-6" />
          </section>
        )}
      </div>
    </>
  );
}
