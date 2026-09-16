import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // As páginas de resultados filtrados não devem ser indexadas
        // para evitar conteúdo duplicado na pesquisa.
        disallow: ["/imoveis?"],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
