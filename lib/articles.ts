import type { Metadata } from "next";
import { CONTENT } from "@/content";
import { HREFLANG, LOCALES, PERSON, articlePath } from "@/content/shared";
import type { Article, Locale } from "@/content/types";
import { SITE_URL } from "./metadata";

export function getArticle(locale: Locale, slug: string): Article | undefined {
  return CONTENT[locale].articles.items.find((a) => a.slug === slug);
}

/** Endereço do mesmo artigo em cada idioma (para o seletor e o hreflang). */
export function articleTranslations(id: string): Record<Locale, string> {
  return Object.fromEntries(
    LOCALES.map((locale) => {
      const a = CONTENT[locale].articles.items.find((item) => item.id === id);
      return [locale, a ? articlePath(locale, a.slug) : articlePath(locale, "")];
    }),
  ) as Record<Locale, string>;
}

export function articleParams(locale: Locale) {
  return CONTENT[locale].articles.items.map((a) => ({ slug: a.slug }));
}

export function buildArticleMetadata(locale: Locale, article: Article): Metadata {
  const paths = articleTranslations(article.id);
  return {
    metadataBase: new URL(SITE_URL),
    title: `${article.title} — ${PERSON.name}`,
    description: article.summary,
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
    openGraph: {
      type: "article",
      url: paths[locale],
      siteName: PERSON.name,
      title: article.title,
      description: article.summary,
      publishedTime: article.date,
      authors: [PERSON.name],
    },
    twitter: { card: "summary", title: article.title, description: article.summary },
  };
}

export function formatDate(locale: Locale, iso: string) {
  return new Intl.DateTimeFormat(CONTENT[locale].htmlLang, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));
}
