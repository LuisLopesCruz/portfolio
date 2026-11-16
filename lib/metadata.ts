import type { Metadata, Viewport } from "next";
import { CONTENT } from "@/content";
import { HREFLANG, LOCALE_PATHS, PERSON } from "@/content/shared";
import type { Locale } from "@/content/types";

/**
 * Endereço oficial, no mesmo padrão do TEMPO-RJ (<projeto>-<conta>.vercel.app).
 * Em produção os links canônicos e de idioma apontam para ele; nas prévias
 * usamos o endereço da própria prévia e, localmente, localhost.
 */
export const PRODUCTION_URL = "https://portfolio-luis-claudio-lopes-da-cruzs-projects.vercel.app";

const SITE_URL =
  process.env.VERCEL_ENV === "production"
    ? PRODUCTION_URL
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";

const OG_LOCALE: Record<Locale, string> = {
  pt: "pt_BR",
  en: "en_US",
  es: "es_ES",
};

export function buildMetadata(locale: Locale): Metadata {
  const c = CONTENT[locale];
  return {
    metadataBase: new URL(SITE_URL),
    title: c.meta.title,
    description: c.meta.description,
    authors: [{ name: PERSON.name }],
    alternates: {
      canonical: LOCALE_PATHS[locale],
      languages: {
        [HREFLANG.pt]: LOCALE_PATHS.pt,
        [HREFLANG.en]: LOCALE_PATHS.en,
        [HREFLANG.es]: LOCALE_PATHS.es,
        "x-default": LOCALE_PATHS.pt,
      },
    },
    openGraph: {
      type: "website",
      url: LOCALE_PATHS[locale],
      siteName: PERSON.name,
      title: c.meta.title,
      description: c.meta.description,
      locale: OG_LOCALE[locale],
    },
    twitter: {
      card: "summary",
      title: c.meta.title,
      description: c.meta.description,
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0c1112" },
  ],
};
