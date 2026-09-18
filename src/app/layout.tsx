import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Imóveis em Maputo e Matola`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "imóveis em Maputo",
    "casas à venda em Maputo",
    "apartamentos em Maputo",
    "imóveis na Matola",
    "casas para arrendar em Maputo",
    "imobiliária em Maputo",
    "terrenos em Maputo",
    "Nine Força Imobiliária",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_MZ",
    url: site.url,
    siteName: site.name,
    title: `${site.name} | Imóveis em Maputo e Matola`,
    description: site.description,
    images: [{ url: `${site.url}/locations/hero.jpg`, width: 1600, height: 1067, alt: `${site.name} — imóveis em Maputo e Matola` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Imóveis em Maputo e Matola`,
    description: site.description,
    images: [`${site.url}/locations/hero.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", type: "image/png" }],
  },
  category: "real estate",
};

export const viewport: Viewport = {
  themeColor: "#14161A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-MZ" className={`${inter.variable} ${manrope.variable}`}>
      <body>
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Saltar para o conteúdo
        </a>
        {children}
      </body>
    </html>
  );
}
