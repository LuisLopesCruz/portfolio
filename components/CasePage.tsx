import { CookiePreferencesButton } from "./CookieConsent";
import { CASE, CASE_FACTS, LIGHTHOUSE, PAGESPEED_URL, REPO_URL, SPEC_URL, casePath } from "@/content/case";
import { LOCALE_PATHS, LOCALES, PERSON, articlePath } from "@/content/shared";
import type { Content } from "@/content/types";
import { CONTENT } from "@/content";
import PageEffects from "./PageEffects";
import ScrollRestore from "./ScrollRestore";
import SiteHeader from "./SiteHeader";
import type { Locale } from "@/content/types";

const DESIGN_ARTICLE_ID = "design-system-referencia";

function caseTranslations(): Record<Locale, string> {
  return Object.fromEntries(LOCALES.map((l) => [l, casePath(l)])) as Record<Locale, string>;
}

function formatDay(iso: string, locale: Locale) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat(locale === "pt" ? "pt-BR" : locale, { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(Date.UTC(y, m - 1, d)),
  );
}

/** Nota do Lighthouse num anel, como no relatório (cor pela faixa da nota). */
function Score({ value, label }: { value: number; label: string }) {
  const r = 26;
  const c = 2 * Math.PI * r;
  const color = value >= 90 ? "var(--cyan)" : value >= 50 ? "#c9802a" : "#e26d5a";
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <span className="relative inline-flex size-16 items-center justify-center">
        <svg viewBox="0 0 64 64" className="absolute inset-0 size-16 -rotate-90" aria-hidden="true">
          <circle cx="32" cy="32" r={r} fill="none" stroke="var(--border)" strokeWidth="4" />
          <circle
            cx="32"
            cy="32"
            r={r}
            fill="none"
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={`${(c * value) / 100} ${c}`}
          />
        </svg>
        <span className="font-mono text-lg font-medium text-fg">{value}</span>
      </span>
      <span className="text-xs leading-snug text-muted">{label}</span>
    </div>
  );
}

function SectionTitle({ children }: { children: string }) {
  return <h2 className="text-2xl font-extrabold tracking-[-0.03em] text-fg sm:text-3xl">{children}</h2>;
}

export default function CasePage({ content }: { content: Content }) {
  const lang = content.locale;
  const t = CASE[lang];
  const home = LOCALE_PATHS[lang];
  const year = new Date().getFullYear();
  const nf = new Intl.NumberFormat(lang === "pt" ? "pt-BR" : lang);
  const article = CONTENT[lang].articles.items.find((a) => a.id === DESIGN_ARTICLE_ID);

  const stats = [
    { value: nf.format(CASE_FACTS.specLines), label: t.stats.specLines, href: SPEC_URL },
    { value: `${CASE_FACTS.days} ${t.daysUnit}`, label: t.stats.days },
    { value: nf.format(CASE_FACTS.releases), label: t.stats.releases, href: `${REPO_URL}/commits/main` },
    { value: nf.format(CASE_FACTS.languages), label: t.stats.languages },
  ];
  const method = t.quality.method.replace("{runs}", String(LIGHTHOUSE.runs)).replace("{date}", formatDay(LIGHTHOUSE.date, lang));
  const scoreKeys = ["performance", "accessibility", "bestPractices", "seo"] as const;

  const linkClass =
    "inline-flex items-center gap-2 border border-line-strong px-4 py-3 text-xs font-extrabold tracking-[0.08em] text-fg uppercase transition-colors hover:border-accent";

  return (
    <>
      <a
        href="#main"
        className="sr-only z-50 rounded-md bg-accent px-4 py-2 text-on-accent focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        {content.nav.skipToContent}
      </a>
      <PageEffects />
      <SiteHeader content={content} homeHref={home} localePaths={caseTranslations()} />
      <ScrollRestore />

      <main id="main" tabIndex={-1} className="relative z-10 outline-none">
        <header data-anchor id="case" className="relative overflow-hidden border-b border-line">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-48 -right-40 size-[560px] rounded-full bg-accent-deep/25 blur-[110px]"
          />
          <div className="relative mx-auto max-w-6xl px-4 pt-12 pb-12 sm:px-6 sm:pt-16">
            <a
              href={home}
              className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] text-muted uppercase transition-colors hover:text-cyan"
            >
              <span aria-hidden="true">←</span> {t.back}
            </a>
            <p className="mt-10 font-mono text-[11px] tracking-[0.16em] text-cyan uppercase">{t.eyebrow}</p>
            <h1 className="hero-rise mt-5 max-w-4xl text-[clamp(2.1rem,5vw,3.6rem)] leading-[1.04] font-extrabold tracking-[-0.045em] text-balance text-fg">
              {t.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-pretty text-muted">{t.lead}</p>

            <dl className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col-reverse justify-end gap-2 rounded-2xl border border-line bg-surface p-5">
                  <dt className="text-xs leading-snug text-muted">{s.label}</dt>
                  <dd className="text-[1.7rem] leading-none font-extrabold tracking-[-0.04em] text-fg sm:text-4xl">
                    {s.href ? (
                      <a href={s.href} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-cyan">
                        {s.value}
                      </a>
                    ) : (
                      s.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </header>

        <div className="mx-auto max-w-6xl space-y-16 px-4 py-14 sm:space-y-20 sm:px-6 sm:py-20">
          {/* Linha do tempo */}
          <section aria-labelledby="case-timeline">
            <div id="case-timeline">
              <SectionTitle>{t.timeline.title}</SectionTitle>
            </div>
            <ol className="relative mt-8 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
              {t.timeline.items.map((item, i) => (
                <li key={item.title} className="bg-surface p-6">
                  <p className="font-mono text-xs tracking-[0.14em] text-cyan">
                    {String(i + 1).padStart(2, "0")} · {item.date}
                  </p>
                  <h3 className="mt-4 text-lg font-bold tracking-[-0.02em] text-fg">{item.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{item.text}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* O método em um dia */}
          <section aria-labelledby="case-story">
            <div id="case-story">
              <SectionTitle>{t.story.title}</SectionTitle>
            </div>
            <p className="mt-3 max-w-3xl leading-relaxed text-pretty text-muted">{t.story.text}</p>
            <ol className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
              {t.story.steps.map((s, i) => (
                <li key={s.step} className="bg-surface p-5 sm:last:col-span-2 lg:last:col-span-1">
                  <p className="font-mono text-xs tracking-[0.14em] text-cyan">
                    {String(i + 1).padStart(2, "0")} / {String(t.story.steps.length).padStart(2, "0")}
                  </p>
                  <h3 className="mt-4 text-lg font-bold tracking-[-0.02em] text-fg">{s.step}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* Quem fez o quê */}
          <section aria-labelledby="case-roles">
            <div id="case-roles">
              <SectionTitle>{t.roles.title}</SectionTitle>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {[t.roles.me, t.roles.ai].map((group) => (
                <div key={group.title} className="rounded-2xl border border-line bg-surface p-6">
                  <h3 className="font-mono text-xs tracking-[0.16em] text-cyan uppercase">{group.title}</h3>
                  <ul className="mt-4 space-y-3">
                    {group.items.map((item) => (
                      <li key={item} className="flex gap-3 leading-relaxed text-fg">
                        <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* O que mudou */}
          <section aria-labelledby="case-changes">
            <div id="case-changes">
              <SectionTitle>{t.changes.title}</SectionTitle>
            </div>
            <p className="mt-3 max-w-3xl leading-relaxed text-pretty text-muted">{t.changes.text}</p>
            <div className="mt-8 overflow-hidden rounded-2xl border border-line">
              <div className="hidden grid-cols-[10rem_1fr_1fr] gap-6 border-b border-line bg-surface-2 px-6 py-3 font-mono text-[11px] tracking-[0.14em] text-faint uppercase md:grid">
                <span />
                <span>{t.changes.specLabel}</span>
                <span>{t.changes.nowLabel}</span>
              </div>
              <dl>
                {t.changes.items.map((c) => (
                  <div
                    key={c.topic}
                    className="grid gap-2 border-b border-line bg-surface px-6 py-5 last:border-b-0 md:grid-cols-[10rem_1fr_1fr] md:gap-6"
                  >
                    <dt className="font-bold text-fg">{c.topic}</dt>
                    <dd className="text-muted">
                      <span className="mr-2 font-mono text-[10px] tracking-[0.14em] text-faint uppercase md:hidden">{t.changes.specLabel}</span>
                      <s className="decoration-faint/60">{c.spec}</s>
                    </dd>
                    <dd className="text-fg">
                      <span className="mr-2 font-mono text-[10px] tracking-[0.14em] text-cyan uppercase md:hidden">{t.changes.nowLabel}</span>
                      {c.now}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>

          {/* Qualidade medida */}
          <section aria-labelledby="case-quality">
            <div id="case-quality">
              <SectionTitle>{t.quality.title}</SectionTitle>
            </div>
            <div className="mt-8 grid gap-4 lg:grid-cols-2">
              {(["mobile", "desktop"] as const).map((form) => (
                <div key={form} className="rounded-2xl border border-line bg-surface p-6">
                  <h3 className="font-mono text-xs tracking-[0.16em] text-cyan uppercase">{t.quality[form]}</h3>
                  <div className="mt-5 grid grid-cols-4 gap-2">
                    {scoreKeys.map((k) => (
                      <Score key={k} value={LIGHTHOUSE[form][k]} label={t.quality.labels[k]} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-pretty text-muted">
              {method}{" "}
              <a
                href={PAGESPEED_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan underline decoration-cyan/40 underline-offset-4 hover:decoration-cyan"
              >
                {t.quality.check} ↗
              </a>
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {t.quality.items.map((item) => (
                <li key={item} className="flex gap-3 rounded-xl border border-line bg-surface px-4 py-3 text-sm leading-relaxed text-fg">
                  <span aria-hidden="true" className="text-cyan">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Stack e links */}
          <section aria-labelledby="case-stack">
            <div id="case-stack">
              <SectionTitle>{t.stack.title}</SectionTitle>
            </div>
            <ul className="mt-6 flex flex-wrap gap-2">
              {t.stack.items.map((item) => (
                <li key={item} className="rounded-full border border-line-strong px-3 py-1.5 font-mono text-xs text-muted">
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={SPEC_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
                {t.stack.spec} <span aria-hidden="true">↗</span>
              </a>
              <a href={REPO_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
                {t.stack.code} <span aria-hidden="true">↗</span>
              </a>
              {article ? (
                <a href={articlePath(lang, article.slug)} className={linkClass}>
                  {t.stack.article} <span aria-hidden="true">→</span>
                </a>
              ) : null}
            </div>
          </section>
        </div>
      </main>

      <footer className="relative z-10 border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-7 font-mono text-[11px] tracking-[0.1em] text-faint uppercase sm:flex-row sm:justify-between sm:px-6">
          <p>
            © {year} {PERSON.name}
          </p>
          <p className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>{content.footer.builtWith}</span>
            <CookiePreferencesButton label={content.footer.cookies} />
          </p>
        </div>
      </footer>
    </>
  );
}
