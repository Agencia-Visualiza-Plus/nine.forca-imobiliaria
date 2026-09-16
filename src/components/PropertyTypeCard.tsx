import Link from "next/link";
import {
  ApartmentIcon,
  ArrowRightIcon,
  HouseIcon,
  LandIcon,
  OfficeIcon,
  StoreIcon,
  WarehouseIcon,
} from "./icons";
import type { PropertyType } from "@/lib/types";

const iconByType: Record<PropertyType, (props: { className?: string }) => JSX.Element> = {
  moradia: HouseIcon,
  apartamento: ApartmentIcon,
  terreno: LandIcon,
  loja: StoreIcon,
  escritorio: OfficeIcon,
  armazem: WarehouseIcon,
};

export const typeDescriptions: Record<PropertyType, string> = {
  moradia: "Casas e moradias para famílias, com ou sem quintal.",
  apartamento: "Apartamentos T1 a T4, mobilados ou por mobilizar.",
  terreno: "Terrenos para habitação ou investimento.",
  loja: "Espaços comerciais com boa visibilidade.",
  escritorio: "Escritórios em zonas centrais e empresariais.",
  armazem: "Armazéns e espaços logísticos com bom acesso.",
};

type PropertyTypeCardProps = {
  type: PropertyType;
  label: string;
  className?: string;
};

export function PropertyTypeCard({ type, label, className = "" }: PropertyTypeCardProps) {
  const Icon = iconByType[type];

  return (
    <Link
      href={`/imoveis?tipo=${type}`}
      className={`group flex flex-col justify-between rounded-2xl border border-paper-line bg-white p-5 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-lift ${className}`}
    >
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
        <Icon className="h-6 w-6" />
      </span>
      <div className="mt-4">
        <h3 className="font-display text-base font-bold text-ink">{label}</h3>
        <p className="mt-1 text-[13px] leading-snug text-ink-500">{typeDescriptions[type]}</p>
      </div>
      <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-ink-600 transition-colors group-hover:text-brand-600">
        Ver imóveis
        <ArrowRightIcon className="h-4 w-4" />
      </span>
    </Link>
  );
}
