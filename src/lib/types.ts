export type TransactionType = "comprar" | "arrendar";

export type PropertyType =
  | "moradia"
  | "apartamento"
  | "terreno"
  | "loja"
  | "escritorio"
  | "armazem";

export type PropertyStatus = "disponivel" | "reservado" | "vendido" | "arrendado";

export interface GeoPoint {
  lat: number;
  lng: number;
}

export interface PropertyLocation {
  neighborhood: string;
  city: string;
  coordinates: GeoPoint;
}

export interface Property {
  id: string;
  reference: string;
  title: string;
  slug: string;
  type: PropertyType;
  transactionType: TransactionType;
  price: number;
  currency: "MZN";
  pricePeriod: "mes" | null;
  location: PropertyLocation;
  bedrooms: number;
  bathrooms: number;
  parking: number;
  area: number;
  description: string;
  features: string[];
  images: string[];
  status: PropertyStatus;
  featured: boolean;
  createdAt: string;
  isDemo: boolean;
}

export interface PropertyFilters {
  transactionType?: TransactionType | "todos";
  type?: PropertyType | "todos";
  location?: string | "todas";
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  minArea?: number;
}

export type PropertySort =
  | "relevancia"
  | "preco-asc"
  | "preco-desc"
  | "area-desc"
  | "recentes";

export type LeadSource = "visita" | "contacto" | "whatsapp";

export type LeadStatus =
  | "novo"
  | "em-contacto"
  | "visita-agendada"
  | "visita-realizada"
  | "ganho"
  | "perdido";

export interface Lead {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  source: LeadSource;
  status: LeadStatus;
  propertyId: string;
  propertyTitle: string;
  visitDate: string;
  visitTime: string;
  notes: string;
}

export type PropertyInput = Omit<Property, "id" | "reference" | "slug" | "createdAt" | "currency"> & {
  id?: string;
  reference?: string;
  slug?: string;
  createdAt?: string;
};
