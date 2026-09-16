import Image from "next/image";
import Link from "next/link";
import {
  ApartmentIcon,
  AreaIcon,
  ArrowRightIcon,
  BathIcon,
  BedIcon,
  CarIcon,
  HouseIcon,
  LandIcon,
  MapPinIcon,
  OfficeIcon,
  StoreIcon,
  WarehouseIcon,
} from "./icons";
import { FavoriteButton } from "./FavoriteButton";
import {
  formatArea,
  formatPrice,
  propertyTypeLabels,
  statusLabels,
  transactionLabels,
} from "@/lib/format";
import type { Property, PropertyType } from "@/lib/types";

const typeIconByType: Record<PropertyType, (props: { className?: string }) => JSX.Element> = {
  moradia: HouseIcon,
  apartamento: ApartmentIcon,
  terreno: LandIcon,
  loja: StoreIcon,
  escritorio: OfficeIcon,
  armazem: WarehouseIcon,
};

type PropertyCardProps = {
  property: Property;
  priority?: boolean;
  className?: string;
};

export function PropertyCard({ property, priority = false, className = "" }: PropertyCardProps) {
  const href = `/imovel/${property.slug}`;
  const showBedrooms = property.bedrooms > 0;
  const showBathrooms = property.bathrooms > 0;
  const showParking = property.parking > 0;
  const TypeIcon = typeIconByType[property.type];

  return (
    <article
      className={`group flex flex-col overflow-hidden rounded-2xl border border-paper-line bg-white shadow-card transition-shadow duration-200 hover:shadow-lift ${className}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-paper-muted">
        <Link href={href} tabIndex={-1} aria-hidden="true" className="block h-full w-full">
          <Image
            src={property.images[0]}
            alt={`${property.title} — ${property.location.neighborhood}, ${property.location.city}`}
            fill
            priority={priority}
            loading={priority ? undefined : "lazy"}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </Link>

        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-3">
          <div className="flex flex-wrap gap-1.5">
            <span className="rounded-full bg-ink/85 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white backdrop-blur">
              {transactionLabels[property.transactionType]}
            </span>
            {property.status !== "disponivel" && (
              <span className="rounded-full bg-brand px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
                {statusLabels[property.status]}
              </span>
            )}
            {property.isDemo && (
              <span className="rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-ink-600 backdrop-blur">
                Demonstração
              </span>
            )}
          </div>
          <div className="pointer-events-auto">
            <FavoriteButton propertyId={property.id} propertyTitle={property.title} />
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="font-display text-lg font-extrabold text-ink">{formatPrice(property)}</p>
        <h3 className="mt-1 text-[15px] font-semibold leading-snug text-ink">
          <Link href={href} className="transition-colors hover:text-brand-600">
            {property.title}
          </Link>
        </h3>
        <p className="mt-1.5 inline-flex items-center gap-1.5 text-[13px] text-ink-500">
          <MapPinIcon className="h-4 w-4 shrink-0 text-brand" />
          <span>
            {property.location.neighborhood}, {property.location.city}
          </span>
        </p>

        <dl className="mt-3.5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-paper-line pt-3.5 text-[13px] text-ink-600">
          {showBedrooms ? (
            <div className="inline-flex items-center gap-1.5">
              <BedIcon className="h-4 w-4 text-ink-500" />
              <dt className="sr-only">Quartos</dt>
              <dd>{property.bedrooms} quartos</dd>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5">
              <TypeIcon className="h-4 w-4 text-ink-500" />
              <dt className="sr-only">Tipo de imóvel</dt>
              <dd>{propertyTypeLabels[property.type]}</dd>
            </div>
          )}
          {showBathrooms && (
            <div className="inline-flex items-center gap-1.5">
              <BathIcon className="h-4 w-4 text-ink-500" />
              <dt className="sr-only">Casas de banho</dt>
              <dd>{property.bathrooms} banhos</dd>
            </div>
          )}
          <div className="inline-flex items-center gap-1.5">
            <AreaIcon className="h-4 w-4 text-ink-500" />
            <dt className="sr-only">Área</dt>
            <dd>{formatArea(property.area)}</dd>
          </div>
          {showParking && (
            <div className="inline-flex items-center gap-1.5">
              <CarIcon className="h-4 w-4 text-ink-500" />
              <dt className="sr-only">Estacionamento</dt>
              <dd>{property.parking}</dd>
            </div>
          )}
        </dl>

        <div className="mt-4 flex items-center justify-between gap-3">
          <Link
            href={href}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink transition-colors hover:text-brand-600"
          >
            Ver imóvel
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
          <span className="text-[11px] font-medium uppercase tracking-wide text-ink-500">
            Ref. {property.reference}
          </span>
        </div>
      </div>
    </article>
  );
}
