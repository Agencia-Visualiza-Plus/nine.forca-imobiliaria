import { coordinatesFor } from "./geo";
import { createId, nextReference, readProperties, uniqueSlug, writeProperties } from "./store";
import type { Property, PropertyInput, PropertyStatus, PropertyType, TransactionType } from "./types";

const validTypes: PropertyType[] = ["moradia", "apartamento", "terreno", "loja", "escritorio", "armazem"];
const validTransactions: TransactionType[] = ["comprar", "arrendar"];
const validStatus: PropertyStatus[] = ["disponivel", "reservado", "vendido", "arrendado"];

function asNumber(value: unknown, fallback = 0): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function asStringList(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }
  if (typeof value === "string") {
    return value
      .split(/[\n,]/)
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [];
}

export function parsePropertyPayload(body: Record<string, unknown>): PropertyInput {
  const type = asString(body.type) as PropertyType;
  const transactionType = asString(body.transactionType) as TransactionType;
  const status = (asString(body.status) || "disponivel") as PropertyStatus;
  const neighborhood = asString(body.neighborhood) || asString((body.location as { neighborhood?: string } | undefined)?.neighborhood);
  const city = asString(body.city) || asString((body.location as { city?: string } | undefined)?.city);
  const coords = coordinatesFor(neighborhood, city);

  return {
    title: asString(body.title),
    type: validTypes.includes(type) ? type : "moradia",
    transactionType: validTransactions.includes(transactionType) ? transactionType : "comprar",
    price: asNumber(body.price),
    pricePeriod: transactionType === "arrendar" ? "mes" : null,
    location: {
      neighborhood: neighborhood || "Maputo",
      city: city || "Maputo",
      coordinates: {
        lat: asNumber(body.lat, coords.lat),
        lng: asNumber(body.lng, coords.lng),
      },
    },
    bedrooms: asNumber(body.bedrooms),
    bathrooms: asNumber(body.bathrooms),
    parking: asNumber(body.parking),
    area: asNumber(body.area),
    description: asString(body.description),
    features: asStringList(body.features),
    images: asStringList(body.images),
    status: validStatus.includes(status) ? status : "disponivel",
    featured: Boolean(body.featured),
    isDemo: Boolean(body.isDemo),
  };
}

export function upsertProperty(input: PropertyInput, id?: string): Property {
  const list = readProperties();
  const existing = id ? list.find((item) => item.id === id) : undefined;
  const now = new Date().toISOString().slice(0, 10);
  const property: Property = {
    id: existing?.id ?? createId("nfi"),
    reference: existing?.reference ?? nextReference(list),
    slug: uniqueSlug(input.title, list, existing?.id),
    title: input.title,
    type: input.type,
    transactionType: input.transactionType,
    price: input.price,
    currency: "MZN",
    pricePeriod: input.transactionType === "arrendar" ? "mes" : null,
    location: input.location,
    bedrooms: input.bedrooms,
    bathrooms: input.bathrooms,
    parking: input.parking,
    area: input.area,
    description: input.description,
    features: input.features,
    images: input.images.length ? input.images : ["/locations/hero.jpg"],
    status: input.status,
    featured: input.featured,
    createdAt: existing?.createdAt ?? now,
    isDemo: existing ? existing.isDemo : false,
  };

  if (existing) {
    writeProperties(list.map((item) => (item.id === existing.id ? property : item)));
  } else {
    writeProperties([property, ...list]);
  }
  return property;
}

export function deleteProperty(id: string): boolean {
  const list = readProperties();
  const next = list.filter((item) => item.id !== id);
  if (next.length === list.length) return false;
  writeProperties(next);
  return true;
}
