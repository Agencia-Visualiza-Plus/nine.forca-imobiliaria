import { readProperties } from "./store";
import type {
  Property,
  PropertyFilters,
  PropertySort,
  PropertyType,
  TransactionType,
} from "./types";

export const demoDisclaimer =
  "Anúncios de demonstração. Os imóveis, preços, áreas e fotografias apresentados são exemplos ilustrativos e serão substituídos pelo inventário real da Nine Força Imobiliária.";

export function getAllProperties(): Property[] {
  return readProperties();
}

export const properties: Property[] = [];

export function getFeaturedProperties(limit = 6): Property[] {
  return getAllProperties()
    .filter((p) => p.featured && p.status === "disponivel")
    .slice(0, limit);
}

export function getPropertyBySlug(slug: string): Property | undefined {
  return getAllProperties().find((p) => p.slug === slug);
}

export function getPropertyById(id: string): Property | undefined {
  return getAllProperties().find((p) => p.id === id);
}

export function getPropertySlugs(): string[] {
  return getAllProperties().map((p) => p.slug);
}

export function getAvailableLocations(): string[] {
  const set = new Set<string>();
  getAllProperties().forEach((p) => {
    set.add(p.location.city);
    set.add(p.location.neighborhood);
  });
  return Array.from(set).sort((a, b) => a.localeCompare(b, "pt"));
}

export function getRelatedProperties(property: Property, limit = 3): Property[] {
  return getAllProperties()
    .filter(
      (p) =>
        p.id !== property.id &&
        p.status === "disponivel" &&
        (p.type === property.type || p.location.city === property.location.city),
    )
    .slice(0, limit);
}

export function filterProperties(list: Property[], filters: PropertyFilters): Property[] {
  return list.filter((p) => {
    if (filters.transactionType && filters.transactionType !== "todos" && p.transactionType !== filters.transactionType) {
      return false;
    }
    if (filters.type && filters.type !== "todos" && p.type !== filters.type) {
      return false;
    }
    if (filters.location && filters.location !== "todas") {
      const match =
        p.location.city === filters.location || p.location.neighborhood === filters.location;
      if (!match) return false;
    }
    if (filters.minPrice !== undefined && p.price < filters.minPrice) return false;
    if (filters.maxPrice !== undefined && p.price > filters.maxPrice) return false;
    if (filters.bedrooms !== undefined && filters.bedrooms > 0 && p.bedrooms < filters.bedrooms) {
      return false;
    }
    if (filters.bathrooms !== undefined && filters.bathrooms > 0 && p.bathrooms < filters.bathrooms) {
      return false;
    }
    if (filters.minArea !== undefined && p.area < filters.minArea) return false;
    return true;
  });
}

export function sortProperties(list: Property[], sort: PropertySort): Property[] {
  const copy = [...list];
  switch (sort) {
    case "preco-asc":
      return copy.sort((a, b) => a.price - b.price);
    case "preco-desc":
      return copy.sort((a, b) => b.price - a.price);
    case "area-desc":
      return copy.sort((a, b) => b.area - a.area);
    case "recentes":
      return copy.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    case "relevancia":
    default:
      return copy.sort((a, b) => Number(b.featured) - Number(a.featured));
  }
}

export function parseFiltersFromSearchParams(
  params: Record<string, string | string[] | undefined>,
): PropertyFilters {
  const single = (key: string): string | undefined => {
    const value = params[key];
    if (Array.isArray(value)) return value[0];
    return value ?? undefined;
  };
  const num = (key: string): number | undefined => {
    const raw = single(key);
    if (!raw) return undefined;
    const parsed = Number(raw);
    return Number.isFinite(parsed) ? parsed : undefined;
  };

  const transaction = single("transacao");
  const type = single("tipo");
  const validTypes: PropertyType[] = ["moradia", "apartamento", "terreno", "loja", "escritorio", "armazem"];
  const validTransactions: TransactionType[] = ["comprar", "arrendar"];

  return {
    transactionType:
      transaction && validTransactions.includes(transaction as TransactionType)
        ? (transaction as TransactionType)
        : "todos",
    type: type && validTypes.includes(type as PropertyType) ? (type as PropertyType) : "todos",
    location: single("localizacao") ?? "todas",
    minPrice: num("precoMin"),
    maxPrice: num("precoMax"),
    bedrooms: num("quartos"),
    bathrooms: num("casasBanho"),
    minArea: num("areaMin"),
  };
}
