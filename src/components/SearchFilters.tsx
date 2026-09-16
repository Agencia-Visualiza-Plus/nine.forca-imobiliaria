"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDownIcon, CloseIcon, SlidersIcon } from "./icons";
import { locationOptions, propertyTypeOptions } from "@/lib/site";
import type { PropertyFilters, PropertyType, TransactionType } from "@/lib/types";

type SearchFiltersProps = {
  filters: PropertyFilters;
  resultCount: number;
};

const bedroomOptions = [1, 2, 3, 4, 5];
const bathroomOptions = [1, 2, 3, 4];

export function SearchFilters({ filters, resultCount }: SearchFiltersProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const activeCount = countActiveFilters(filters);

  return (
    <>
      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="btn-outline w-full justify-between"
          aria-haspopup="dialog"
        >
          <span className="inline-flex items-center gap-2">
            <SlidersIcon className="h-4 w-4" />
            Filtros
            {activeCount > 0 && (
              <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1.5 text-[11px] font-bold text-white">
                {activeCount}
              </span>
            )}
          </span>
          <span className="text-[13px] font-medium text-ink-500">{resultCount} imóveis</span>
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Filtros de pesquisa">
          <button
            type="button"
            className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
            aria-label="Fechar filtros"
            onClick={() => setOpen(false)}
          />
          <div className="absolute inset-x-0 bottom-0 max-h-[90vh] overflow-y-auto rounded-t-2xl border-t border-paper-line bg-paper-soft p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-display text-lg font-bold text-ink">Filtros</h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Fechar filtros"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-paper-line bg-white text-ink"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>
            <FilterForm filters={filters} onSubmit={() => setOpen(false)} idPrefix="mf" />
          </div>
        </div>
      )}

      <aside className="hidden lg:block">
        <div className="sticky top-24 rounded-2xl border border-paper-line bg-white p-5 shadow-card">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-base font-bold text-ink">Filtros</h2>
            <Link href="/imoveis" className="text-[13px] font-medium text-ink-500 hover:text-ink">
              Limpar
            </Link>
          </div>
          <FilterForm filters={filters} idPrefix="df" />
        </div>
      </aside>
    </>
  );
}

function countActiveFilters(filters: PropertyFilters): number {
  let count = 0;
  if (filters.type && filters.type !== "todos") count += 1;
  if (filters.location && filters.location !== "todas") count += 1;
  if (filters.minPrice !== undefined) count += 1;
  if (filters.maxPrice !== undefined) count += 1;
  if (filters.bedrooms !== undefined) count += 1;
  if (filters.bathrooms !== undefined) count += 1;
  if (filters.minArea !== undefined) count += 1;
  return count;
}

type FilterFormProps = {
  filters: PropertyFilters;
  idPrefix: string;
  onSubmit?: () => void;
};

function FilterForm({ filters, idPrefix, onSubmit }: FilterFormProps) {
  return (
    <form method="get" action="/imoveis" onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="field-label" htmlFor={`${idPrefix}-transacao`}>
          Transação
        </label>
        <div className="relative">
          <select
            id={`${idPrefix}-transacao`}
            name="transacao"
            defaultValue={(filters.transactionType as TransactionType | "todos") ?? "todos"}
            className="field pr-9"
          >
            <option value="todos">Comprar e arrendar</option>
            <option value="comprar">Comprar</option>
            <option value="arrendar">Arrendar</option>
          </select>
          <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-500" />
        </div>
      </div>

      <div>
        <label className="field-label" htmlFor={`${idPrefix}-localizacao`}>
          Localização
        </label>
        <div className="relative">
          <select
            id={`${idPrefix}-localizacao`}
            name="localizacao"
            defaultValue={filters.location && filters.location !== "todas" ? filters.location : ""}
            className="field pr-9"
          >
            <option value="">Todas as zonas</option>
            {locationOptions.map((place) => (
              <option key={place} value={place}>
                {place}
              </option>
            ))}
          </select>
          <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-500" />
        </div>
      </div>

      <div>
        <label className="field-label" htmlFor={`${idPrefix}-tipo`}>
          Tipo de imóvel
        </label>
        <div className="relative">
          <select
            id={`${idPrefix}-tipo`}
            name="tipo"
            defaultValue={(filters.type as PropertyType | "todos") ?? "todos"}
            className="field pr-9"
          >
            <option value="todos">Todos os tipos</option>
            {propertyTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-500" />
        </div>
      </div>

      <fieldset>
        <legend className="field-label">Preço (MT)</legend>
        <div className="grid grid-cols-2 gap-2">
          <input
            name="precoMin"
            type="number"
            inputMode="numeric"
            min={0}
            step={1000}
            placeholder="Mínimo"
            aria-label="Preço mínimo"
            defaultValue={filters.minPrice ?? ""}
            className="field"
          />
          <input
            name="precoMax"
            type="number"
            inputMode="numeric"
            min={0}
            step={1000}
            placeholder="Máximo"
            aria-label="Preço máximo"
            defaultValue={filters.maxPrice ?? ""}
            className="field"
          />
        </div>
      </fieldset>

      <div>
        <label className="field-label" htmlFor={`${idPrefix}-quartos`}>
          Quartos
        </label>
        <div className="relative">
          <select
            id={`${idPrefix}-quartos`}
            name="quartos"
            defaultValue={filters.bedrooms ?? ""}
            className="field pr-9"
          >
            <option value="">Qualquer</option>
            {bedroomOptions.map((value) => (
              <option key={value} value={value}>
                {value}+ quartos
              </option>
            ))}
          </select>
          <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-500" />
        </div>
      </div>

      <div>
        <label className="field-label" htmlFor={`${idPrefix}-banhos`}>
          Casas de banho
        </label>
        <div className="relative">
          <select
            id={`${idPrefix}-banhos`}
            name="casasBanho"
            defaultValue={filters.bathrooms ?? ""}
            className="field pr-9"
          >
            <option value="">Qualquer</option>
            {bathroomOptions.map((value) => (
              <option key={value} value={value}>
                {value}+ casas de banho
              </option>
            ))}
          </select>
          <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-500" />
        </div>
      </div>

      <div>
        <label className="field-label" htmlFor={`${idPrefix}-area`}>
          Área mínima (m²)
        </label>
        <input
          id={`${idPrefix}-area`}
          name="areaMin"
          type="number"
          inputMode="numeric"
          min={0}
          step={10}
          placeholder="Ex.: 150"
          defaultValue={filters.minArea ?? ""}
          className="field"
        />
      </div>

      <div className="flex flex-col gap-2 pt-1">
        <button type="submit" className="btn-primary w-full">
          Aplicar filtros
        </button>
        <Link href="/imoveis" className="btn-outline w-full">
          Limpar filtros
        </Link>
      </div>
    </form>
  );
}
