import { site } from "./site";
import type { Property } from "./types";
import { formatPrice } from "./format";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": `${site.url}/#organizacao`,
    name: site.name,
    description: site.description,
    url: site.url,
    telephone: site.phoneDisplay,
    image: `${site.url}/logo.png`,
    areaServed: site.serviceAreas.map((area) => ({ "@type": "City", name: area })),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Maputo",
      addressCountry: "MZ",
    },
    sameAs: [site.instagramUrl],
    knowsLanguage: ["pt"],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    name: site.name,
    url: site.url,
    inLanguage: "pt-MZ",
    publisher: { "@id": `${site.url}/#organizacao` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${site.url}/imoveis?localizacao={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function propertySchema(property: Property) {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.title,
    url: `${site.url}/imovel/${property.slug}`,
    description: property.description,
    image: property.images.map((image) => `${site.url}${image}`),
    datePosted: property.createdAt,
    inLanguage: "pt-MZ",
    isFamilyFriendly: true,
    about: {
      "@type": "Place",
      name: `${property.location.neighborhood}, ${property.location.city}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: property.location.city,
        addressRegion: property.location.neighborhood,
        addressCountry: "MZ",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: property.location.coordinates.lat,
        longitude: property.location.coordinates.lng,
      },
    },
    offers: {
      "@type": "Offer",
      price: property.price,
      priceCurrency: property.currency,
      availability:
        property.status === "disponivel"
          ? "https://schema.org/InStock"
          : "https://schema.org/SoldOut",
      url: `${site.url}/imovel/${property.slug}`,
      seller: { "@id": `${site.url}/#organizacao` },
      priceSpecification: {
        "@type": "PriceSpecification",
        price: property.price,
        priceCurrency: property.currency,
        ...(property.transactionType === "arrendar"
          ? { unitCode: "MON", billingIncrement: 1 }
          : {}),
      },
      description: formatPrice(property),
    },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}

export function itemListSchema(properties: Property[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    numberOfItems: properties.length,
    itemListElement: properties.map((property, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${site.url}/imovel/${property.slug}`,
      name: property.title,
    })),
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
