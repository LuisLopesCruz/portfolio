import type { Metadata } from "next";
import { DASHBOARD, dashboardPath } from "@/content/dashboard";
import { HREFLANG, LOCALES, PERSON } from "@/content/shared";
import type { Locale } from "@/content/types";
import { SITE_URL } from "./metadata";

/** Endereço do painel em cada idioma (seletor de idioma e hreflang). */
export function dashboardTranslations(): Record<Locale, string> {
  return Object.fromEntries(LOCALES.map((l) => [l, dashboardPath(l)])) as Record<Locale, string>;
}

export function buildDashboardMetadata(locale: Locale): Metadata {
  const t = DASHBOARD[locale];
  const paths = dashboardTranslations();
  return {
    metadataBase: new URL(SITE_URL),
    title: `${t.metaTitle} — ${PERSON.name}`,
    description: t.metaDescription,
    authors: [{ name: PERSON.name }],
    alternates: {
      canonical: paths[locale],
      languages: {
        [HREFLANG.pt]: paths.pt,
        [HREFLANG.en]: paths.en,
        [HREFLANG.es]: paths.es,
        "x-default": paths.pt,
      },
    },
    openGraph: { type: "website", url: paths[locale], siteName: PERSON.name, title: t.metaTitle, description: t.metaDescription },
    twitter: { card: "summary", title: t.metaTitle, description: t.metaDescription },
  };
}
