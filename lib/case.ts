import type { Metadata } from "next";
import { CASE, casePath } from "@/content/case";
import { HREFLANG, LOCALES, PERSON } from "@/content/shared";
import type { Locale } from "@/content/types";
import { SITE_URL } from "./metadata";

/** Metadados da página "Como este site foi feito" em cada idioma. */
export function buildCaseMetadata(locale: Locale): Metadata {
  const t = CASE[locale];
  const paths = Object.fromEntries(LOCALES.map((l) => [l, casePath(l)])) as Record<Locale, string>;
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
    openGraph: { type: "article", url: paths[locale], siteName: PERSON.name, title: t.metaTitle, description: t.metaDescription },
    twitter: { card: "summary", title: t.metaTitle, description: t.metaDescription },
  };
}
