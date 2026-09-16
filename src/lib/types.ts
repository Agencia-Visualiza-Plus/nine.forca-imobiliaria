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
  /** Bairro / zona (ex.: Polana, Coop, Zimpeto) */
  neighborhood: string;
  /** Cidade (ex.: Maputo, Matola, Marracuene) */
  city: string;
  coordinates: GeoPoint;
}

export interface Property {
  id: string;
  /** Referência interna do imóvel (ex.: NFI-0001) */
  reference: string;
  title: string;
  slug: string;
  type: PropertyType;
  transactionType: TransactionType;
  price: number;
  currency: "MZN";
  /** Preenchido apenas para arrendamento mensal */
  pricePeriod: "mes" | null;
  location: PropertyLocation;
  bedrooms: number;
  bathrooms: number;
  parking: number;
  /** Área em metros quadrados */
  area: number;
  description: string;
  features: string[];
  images: string[];
  status: PropertyStatus;
  featured: boolean;
  createdAt: string;
  /**
   * Marca registos de demonstração. Quando o inventário real for ligado
   * a uma base de dados / CMS, estes registos são substituídos.
   */
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
