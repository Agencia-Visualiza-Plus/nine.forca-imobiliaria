import Link from "next/link";
import { PropertyCard } from "./PropertyCard";
import type { Property } from "@/lib/types";

type PropertyGridProps = {
  properties: Property[];
  priorityCount?: number;
  className?: string;
  emptyMessage?: string;
};

export function PropertyGrid({
  properties,
  priorityCount = 0,
  className = "",
  emptyMessage = "Não encontrámos imóveis com estes critérios.",
}: PropertyGridProps) {
  if (properties.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-paper-line bg-white px-6 py-14 text-center">
        <p className="font-display text-lg font-bold text-ink">{emptyMessage}</p>
        <p className="mx-auto mt-2 max-w-md text-sm text-ink-500">
          Experimente ajustar os filtros ou fale connosco no WhatsApp para receber sugestões
          adequadas ao que procura.
        </p>
        <div className="mt-5 flex flex-col justify-center gap-2 sm:flex-row">
          <Link href="/imoveis" className="btn-outline">
            Ver todos os imóveis
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 ${className}`}
      role="list"
      aria-label="Lista de imóveis"
    >
      {properties.map((property, index) => (
        <div role="listitem" key={property.id}>
          <PropertyCard property={property} priority={index < priorityCount} className="h-full" />
        </div>
      ))}
    </div>
  );
}
