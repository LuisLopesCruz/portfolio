import { LOCALE_PATHS, PERSON, SECTION_IDS } from "@/content/shared";
import type { Article, Content } from "@/content/types";
import { articleTranslations, formatDate } from "@/lib/articles";
import PageEffects from "./PageEffects";
import ScrollRestore from "./ScrollRestore";
import SiteHeader from "./SiteHeader";

export default function ArticlePage({ content, article }: { content: Content; article: Article }) {
  const { articles, footer, nav } = content;
  const home = LOCALE_PATHS[content.locale];
  const backHref = `${home}#${SECTION_IDS.articles}`;
  const year = new Date().getFullYear();

  return (
    <>
      <a
        href="#main"
        className="sr-only z-50 rounded-md bg-accent px-4 py-2 text-on-accent focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        {nav.skipToContent}
      </a>
      <PageEffects />
      <SiteHeader content={content} homeHref={home} localePaths={articleTranslations(article.id)} />
      <ScrollRestore />

      <main id="main" tabIndex={-1} className="relative z-10 outline-none">
        <article data-anchor id="article" aria-labelledby="article-title">
          <header className="relative overflow-hidden border-b border-line">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-48 -right-40 size-[560px] rounded-full bg-accent-deep/25 blur-[110px]"
            />
            <div className="relative mx-auto max-w-3xl px-4 pt-14 pb-14 sm:px-6 sm:pt-20 sm:pb-16">
              <a
                href={backHref}
                className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] text-muted uppercase transition-colors hover:text-cyan"
              >
                <span aria-hidden="true">←</span> {articles.backLabel}
              </a>
              <p className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] tracking-[0.14em] uppercase">
                {article.tags.map((tag) => (
                  <span key={tag} className="text-cyan">
                    {tag}
                  </span>
                ))}
                <span className="text-faint">
                  {article.readingMinutes} {articles.minutesLabel}
                </span>
                <time dateTime={article.date} className="text-faint">
                  {formatDate(content.locale, article.date)}
                </time>
              </p>
              <h1
                id="article-title"
                className="hero-rise mt-6 text-[clamp(2.1rem,5vw,3.4rem)] leading-[1.05] font-extrabold tracking-[-0.045em] text-balance text-fg"
              >
                {article.title}
              </h1>
              <p className="mt-7 text-lg leading-relaxed text-pretty text-muted sm:text-xl">{article.summary}</p>
              <p className="mt-8 font-mono text-[11px] tracking-[0.14em] text-faint uppercase">{PERSON.name}</p>
            </div>
          </header>

          <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
            {article.body.map((block, i) =>
              block.type === "h2" ? (
                <h2
                  key={i}
                  className="mt-14 mb-5 text-2xl font-extrabold tracking-[-0.03em] text-fg first:mt-0 sm:text-[1.75rem]"
                >
                  {block.text}
                </h2>
              ) : (
                <p key={i} className="mb-6 text-[1.075rem] leading-[1.85] text-pretty text-fg/85">
                  {block.text}
                </p>
              ),
            )}

            <div className="mt-16 border-t border-line pt-8">
              <a
                href={backHref}
                className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.12em] text-fg uppercase transition-colors hover:text-cyan"
              >
                <span aria-hidden="true">←</span> {articles.backLabel}
              </a>
            </div>
          </div>
        </article>
      </main>

      <footer className="relative z-10 border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-7 font-mono text-[11px] tracking-[0.1em] text-faint uppercase sm:flex-row sm:justify-between sm:px-6">
          <p>
            © {year} {PERSON.name}
          </p>
          <p>{footer.builtWith}</p>
        </div>
      </footer>
    </>
  );
}
