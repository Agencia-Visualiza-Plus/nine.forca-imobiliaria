import type { MetadataRoute } from "next";
import { getPropertySlugs } from "@/lib/properties";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${site.url}/`, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${site.url}/imoveis`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${site.url}/sobre`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${site.url}/contactos`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];

  const propertyRoutes: MetadataRoute.Sitemap = getPropertySlugs().map((slug) => ({
    url: `${site.url}/imovel/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...propertyRoutes];
}
