import type { Property, PropertyType, TransactionType } from "./types";

export const propertyTypeLabels: Record<PropertyType, string> = {
  moradia: "Moradia",
  apartamento: "Apartamento",
  terreno: "Terreno",
  loja: "Loja",
  escritorio: "Escritório",
  armazem: "Armazém",
};

export const propertyTypePluralLabels: Record<PropertyType, string> = {
  moradia: "Moradias",
  apartamento: "Apartamentos",
  terreno: "Terrenos",
  loja: "Lojas",
  escritorio: "Escritórios",
  armazem: "Armazéns",
};

export const transactionLabels: Record<TransactionType, string> = {
  comprar: "Venda",
  arrendar: "Arrendamento",
};

export const statusLabels: Record<Property["status"], string> = {
  disponivel: "Disponível",
  reservado: "Reservado",
  vendido: "Vendido",
  arrendado: "Arrendado",
};

const numberFormatter = new Intl.NumberFormat("pt-PT", {
  maximumFractionDigits: 0,
});

const decimalFormatter = new Intl.NumberFormat("pt-PT", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 1,
});

export function formatPrice(property: Property): string {
  const value = `${numberFormatter.format(property.price)} MT`;
  if (property.transactionType === "arrendar" && property.pricePeriod === "mes") {
    return `${value}/mês`;
  }
  return value;
}

export function formatArea(area: number): string {
  return `${decimalFormatter.format(area)} m²`;
}

export function formatNumber(value: number): string {
  return numberFormatter.format(value);
}

export function formatCompactPrice(value: number): string {
  if (value >= 1_000_000) {
    return `${decimalFormatter.format(value / 1_000_000)}M MT`;
  }
  if (value >= 1_000) {
    return `${decimalFormatter.format(value / 1_000)} mil MT`;
  }
  return `${formatNumber(value)} MT`;
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("pt-PT", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}
