export const site = {
  name: "NINE FORÇA IMOBILIÁRIA",
  shortName: "Nine Força",
  legalName: "Nine Força Imobiliária",
  tagline: "Imóveis em Maputo e Matola",
  description:
    "Imobiliária em Maputo e Matola. Compra, venda e arrendamento de casas, apartamentos, terrenos, lojas, escritórios e armazéns com acompanhamento personalizado.",
  /** Formato internacional sem símbolos, usado nos links do WhatsApp */
  phoneInternational: "258842745338",
  phoneDisplay: "+258 84 274 5338",
  phoneHref: "tel:+258842745338",
  instagramHandle: "@imobiliarianine",
  instagramUrl: "https://www.instagram.com/imobiliarianine",
  city: "Maputo",
  country: "Moçambique",
  serviceAreas: ["Maputo", "Matola", "Marracuene", "Costa do Sol", "Zimpeto"],
  /** URL pública usada em SEO, sitemap e dados estruturados */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://nineforcaimobiliaria.co.mz",
} as const;

export const navigation = [
  { label: "Comprar", href: "/imoveis?transacao=comprar" },
  { label: "Arrendar", href: "/imoveis?transacao=arrendar" },
  { label: "Imóveis", href: "/imoveis" },
  { label: "Sobre Nós", href: "/sobre" },
  { label: "Contactos", href: "/contactos" },
] as const;

export const locationOptions = [
  "Maputo",
  "Matola",
  "Costa do Sol",
  "Polana",
  "Sommerschield",
  "Coop",
  "Triunfo",
  "Magoanine",
  "Zimpeto",
  "Marracuene",
] as const;

export const propertyTypeOptions = [
  { value: "moradia", label: "Moradias" },
  { value: "apartamento", label: "Apartamentos" },
  { value: "terreno", label: "Terrenos" },
  { value: "loja", label: "Lojas" },
  { value: "escritorio", label: "Escritórios" },
  { value: "armazem", label: "Armazéns" },
] as const;
