import Link from "next/link";
import { WhatsAppButton } from "./WhatsAppButton";
import { AreaIcon, BathIcon, BedIcon, CarIcon, MapPinIcon, PhoneIcon } from "./icons";
import { formatArea, formatPrice, propertyTypeLabels, statusLabels, transactionLabels } from "@/lib/format";
import { propertyWhatsappMessage } from "@/lib/whatsapp";
import { site } from "@/lib/site";
import type { Property } from "@/lib/types";

type PropertyDetailsProps = {
  property: Property;
};

export function PropertyDetails({ property }: PropertyDetailsProps) {
  const specs = [
    ...(property.bedrooms > 0
      ? [{ key: "quartos", icon: <BedIcon className="h-5 w-5" />, label: `${property.bedrooms} quartos` }]
      : []),
    ...(property.bathrooms > 0
      ? [{ key: "banhos", icon: <BathIcon className="h-5 w-5" />, label: `${property.bathrooms} banhos` }]
      : []),
    { key: "area", icon: <AreaIcon className="h-5 w-5" />, label: formatArea(property.area) },
    ...(property.parking > 0
      ? [{ key: "parking", icon: <CarIcon className="h-5 w-5" />, label: `${property.parking} estacionamento` }]
      : []),
  ];

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-ink px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
          {transactionLabels[property.transactionType]}
        </span>
        <span className="rounded-full border border-paper-line bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-ink-600">
          {propertyTypeLabels[property.type]}
        </span>
        <span className="rounded-full border border-paper-line bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-ink-600">
          {statusLabels[property.status]}
        </span>
      </div>

      <h1 className="mt-3 font-display text-2xl font-extrabold leading-tight text-ink sm:text-[32px]">
        {property.title}
      </h1>

      <p className="mt-2 inline-flex items-center gap-2 text-sm text-ink-500">
        <MapPinIcon className="h-4 w-4 text-brand" />
        {property.location.neighborhood}, {property.location.city}, {site.country}
      </p>

      <div className="mt-4 flex flex-wrap items-end justify-between gap-3 border-y border-paper-line py-4">
        <p className="font-display text-2xl font-extrabold text-ink sm:text-3xl">
          {formatPrice(property)}
        </p>
        <p className="text-xs font-medium uppercase tracking-wide text-ink-500">
          Referência {property.reference}
        </p>
      </div>

      <dl className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2.5 text-sm text-ink-600">
        <span className="sr-only">Resumo do imóvel</span>
        {specs.map((spec) => (
          <div key={spec.key} className="inline-flex items-center gap-2">
            <span className="text-ink-500">{spec.icon}</span>
            <dt className="sr-only">{spec.key}</dt>
            <dd>{spec.label}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
        <WhatsAppButton
          message={propertyWhatsappMessage(property.title)}
          label="Marcar visita no WhatsApp"
          size="lg"
          className="sm:flex-1"
        />
        <a href={site.phoneHref} className="btn-outline sm:flex-1">
          <PhoneIcon className="h-4 w-4" />
          Ligar agora
        </a>
      </div>

      <div className="mt-8">
        <h2 className="section-title text-xl">Descrição</h2>
        <p className="mt-3 whitespace-pre-line text-[15px] leading-relaxed text-ink-600">
          {property.description}
        </p>
      </div>

      <div className="mt-6 rounded-2xl border border-paper-line bg-white p-4">
        <p className="text-[13px] leading-relaxed text-ink-500">
          Quer ver este imóvel com mais detalhe?{" "}
          <Link href="/contactos" className="font-semibold text-brand-600 underline-offset-2 hover:underline">
            Fale com a Nine
          </Link>{" "}
          e agende uma visita acompanhada.
        </p>
      </div>
    </div>
  );
}
