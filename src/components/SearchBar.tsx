import { ChevronDownIcon, SearchIcon } from "./icons";
import { locationOptions, propertyTypeOptions } from "@/lib/site";
import type { PropertyFilters } from "@/lib/types";

type SearchBarProps = {
  variant?: "hero" | "inline";
  filters?: PropertyFilters;
  /** Valores de área/casas de banho usados na página de pesquisa */
  advanced?: boolean;
  idPrefix?: string;
};

const bedroomOptions = [1, 2, 3, 4, 5];
const bathroomOptions = [1, 2, 3, 4];

export function SearchBar({
  variant = "hero",
  filters = {},
  advanced = false,
  idPrefix = "sb",
}: SearchBarProps) {
  const isHero = variant === "hero";
  const currentTransaction = filters.transactionType ?? "comprar";

  return (
    <form
      method="get"
      action="/imoveis"
      role="search"
      aria-label="Pesquisar imóveis"
      className={
        isHero
          ? "rounded-2xl border border-white/60 bg-white p-3 shadow-search sm:p-4"
          : "rounded-2xl border border-paper-line bg-white p-3 shadow-card sm:p-4"
      }
    >
      <div className="flex flex-col gap-3">
        <fieldset className="flex items-center">
          <legend className="sr-only">Tipo de transação</legend>
          <div className="inline-flex rounded-full bg-paper-muted p-1">
            <label className="cursor-pointer">
              <input
                type="radio"
                name="transacao"
                value="comprar"
                defaultChecked={currentTransaction === "comprar"}
                className="peer sr-only"
              />
              <span className="inline-flex rounded-full px-4 py-1.5 text-sm font-semibold text-ink-500 transition-colors peer-checked:bg-white peer-checked:text-ink peer-checked:shadow-sm">
                Comprar
              </span>
            </label>
            <label className="cursor-pointer">
              <input
                type="radio"
                name="transacao"
                value="arrendar"
                defaultChecked={currentTransaction === "arrendar"}
                className="peer sr-only"
              />
              <span className="inline-flex rounded-full px-4 py-1.5 text-sm font-semibold text-ink-500 transition-colors peer-checked:bg-white peer-checked:text-ink peer-checked:shadow-sm">
                Arrendar
              </span>
            </label>
          </div>
        </fieldset>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-1">
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

          <div className="lg:col-span-1">
            <label className="field-label" htmlFor={`${idPrefix}-tipo`}>
              Tipo de imóvel
            </label>
            <div className="relative">
              <select
                id={`${idPrefix}-tipo`}
                name="tipo"
                defaultValue={filters.type && filters.type !== "todos" ? filters.type : ""}
                className="field pr-9"
              >
                <option value="">Todos os tipos</option>
                {propertyTypeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-500" />
            </div>
          </div>

          <div className="lg:col-span-1">
            <label className="field-label" htmlFor={`${idPrefix}-preco-min`}>
              Preço mínimo
            </label>
            <input
              id={`${idPrefix}-preco-min`}
              name="precoMin"
              type="number"
              inputMode="numeric"
              min={0}
              step={1000}
              placeholder="0 MT"
              defaultValue={filters.minPrice ?? ""}
              className="field"
            />
          </div>

          <div className="lg:col-span-1">
            <label className="field-label" htmlFor={`${idPrefix}-preco-max`}>
              Preço máximo
            </label>
            <input
              id={`${idPrefix}-preco-max`}
              name="precoMax"
              type="number"
              inputMode="numeric"
              min={0}
              step={1000}
              placeholder="Sem limite"
              defaultValue={filters.maxPrice ?? ""}
              className="field"
            />
          </div>

          <div className="lg:col-span-1">
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

          <div className="lg:col-span-1">
            <span className="field-label hidden lg:block" aria-hidden="true">
              &nbsp;
            </span>
            <button type="submit" className="btn-primary w-full py-2.5">
              <SearchIcon className="h-4 w-4" />
              Pesquisar
            </button>
          </div>
        </div>

        {advanced && (
          <div className="grid gap-3 border-t border-paper-line pt-3 sm:grid-cols-2 lg:grid-cols-6">
            <div className="lg:col-span-2">
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
            <div className="lg:col-span-2">
              <label className="field-label" htmlFor={`${idPrefix}-area-min`}>
                Área mínima (m²)
              </label>
              <input
                id={`${idPrefix}-area-min`}
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
          </div>
        )}
      </div>
    </form>
  );
}
