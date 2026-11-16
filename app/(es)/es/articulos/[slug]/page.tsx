import { notFound } from "next/navigation";
import ArticlePage from "@/components/ArticlePage";
import { CONTENT } from "@/content";
import { articleParams, buildArticleMetadata, getArticle } from "@/lib/articles";

const LOCALE = "es" as const;

export const dynamicParams = false;

export function generateStaticParams() {
  return articleParams(LOCALE);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(LOCALE, slug);
  return article ? buildArticleMetadata(LOCALE, article) : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(LOCALE, slug);
  if (!article) notFound();
  return <ArticlePage content={CONTENT[LOCALE]} article={article} />;
}
