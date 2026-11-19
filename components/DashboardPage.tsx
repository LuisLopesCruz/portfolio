import { CookiePreferencesButton } from "./CookieConsent";
import { DASHBOARD, type DashboardNumbers } from "@/content/dashboard";
import { SEASON, WORST_2025, YEARS, YTD } from "@/content/dashboard-data";
import { LOCALE_PATHS, PERSON, SECTION_IDS } from "@/content/shared";
import type { Content } from "@/content/types";
import { dashboardTranslations } from "@/lib/dashboard";
import { COLORS } from "@/lib/dashboard-colors";
import { ShareChart, StackedChart, TrendChart } from "./DashboardCharts";
import PageEffects from "./PageEffects";
import ScrollRestore from "./ScrollRestore";
import SiteHeader from "./SiteHeader";

function numbers(locale: string): DashboardNumbers {
  const one = new Intl.NumberFormat(locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const pct0 = new Intl.NumberFormat(locale, { style: "percent", maximumFractionDigits: 0 });
  const pct1 = new Intl.NumberFormat(locale, { style: "percent", maximumFractionDigits: 1 });
  const pct = { format: (v: number) => (v >= 0.995 && v < 1 ? pct1.format(v) : pct0.format(v)) };
  const signedPct = new Intl.NumberFormat(locale, { style: "percent", maximumFractionDigits: 0, signDisplay: "always" });

  const peak = YEARS.reduce((a, b) => (b.dec > a.dec ? b : a));
  const last = YEARS[YEARS.length - 1];
  const within = YEARS.filter((y) => y.year > peak.year);
  let withinSince = last.year;
  for (let i = within.length - 1; i >= 0 && within[i].dec <= within[i].limDec; i--) withinSince = within[i].year;
  const worst = YEARS.reduce((a, b) => (b.excluded / (b.dec + b.excluded) > a.excluded / (a.dec + a.excluded) ? b : a));
  // Melhor ano do DEC sem expurgo depois do pico do DEC regulado.
  const grossBest = YEARS.filter((y) => y.year > peak.year).reduce((a, b) =>
    b.dec + b.excluded < a.dec + a.excluded ? b : a,
  );
  const seasonTotal = SEASON.reduce((s, m) => s + m.excluded, 0);
  const summer = SEASON.filter((m) => m.month >= 10 || m.month <= 3).reduce((s, m) => s + m.excluded, 0);

  return {
    first: peak.year,
    last: last.year,
    decPeak: one.format(peak.dec),
    decLast: one.format(last.dec),
    decDrop: pct.format(1 - last.dec / peak.dec),
    fecPeak: one.format(peak.fec),
    fecLast: one.format(last.fec),
    fecDrop: pct.format(1 - last.fec / peak.fec),
    limDecLast: one.format(last.limDec),
    limFecLast: one.format(last.limFec),
    withinSince,
    setsAboveLast: last.setsAbove,
    setsLast: last.sets,
    setsAbovePeak: peak.setsAbove,
    setsPeak: peak.sets,
    consAboveLast: pct.format(last.consAboveShare),
    consAbovePeak: pct.format(peak.consAboveShare),
    excludedLast: one.format(last.excluded),
    excludedGrowth: pct.format(last.excluded / peak.excluded - 1),
    worstYear: worst.year,
    worstShare: pct.format(worst.excluded / (worst.dec + worst.excluded)),
    worstExcluded: one.format(worst.excluded),
    worstDec: one.format(worst.dec),
    seasonShare: pct.format(summer / seasonTotal),
    ytdDecPrev: one.format(YTD.prev.dec),
    ytdDecCurr: one.format(YTD.curr.dec),
    ytdDecChange: signedPct.format(YTD.curr.dec / YTD.prev.dec - 1),
    ytdExcPrev: one.format(YTD.prev.excluded),
    ytdExcCurr: one.format(YTD.curr.excluded),
    ytdExcChange: signedPct.format(YTD.curr.excluded / YTD.prev.excluded - 1),
    ytdExceedsYear: YTD.curr.excluded > last.excluded,
    grossLast: one.format(last.dec + last.excluded),
    grossRatioLast: new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format((last.dec + last.excluded) / last.limDec),
    grossDrop: pct.format(1 - (last.dec + last.excluded) / (peak.dec + peak.excluded)),
    grossAlwaysAbove: YEARS.every((y) => y.dec + y.excluded > y.limDec),
    grossMinYear: grossBest.year,
    grossMin: one.format(grossBest.dec + grossBest.excluded),
    grossSinceMin: signedPct.format((last.dec + last.excluded) / (grossBest.dec + grossBest.excluded) - 1),
  };
}

function Card({
  title,
  text,
  children,
  className = "",
}: {
  title: string;
  text: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section data-reveal className={`min-w-0 rounded-2xl border border-line bg-surface p-5 sm:p-7 ${className}`}>
      <h2 className="text-lg leading-snug font-bold tracking-[-0.02em] text-balance text-fg sm:text-xl">{title}</h2>
      <p className="mt-2 mb-6 max-w-3xl text-sm leading-relaxed text-pretty text-muted">{text}</p>
      {children}
    </section>
  );
}

function DataTable({ summary, head, rows }: { summary: string; head: string[]; rows: (string | number)[][] }) {
  return (
    <details className="mt-5 border-t border-line pt-4 text-sm">
      <summary className="cursor-pointer font-mono text-[11px] tracking-[0.12em] text-muted uppercase hover:text-cyan">
        {summary}
      </summary>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[420px] text-left tabular-nums">
          <thead>
            <tr className="border-b border-line text-xs text-faint">
              {head.map((h) => (
                <th key={h} scope="col" className="py-2 pr-4 font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={String(r[0])} className="border-b border-line/60 text-muted">
                {r.map((c, i) => (
                  <td key={i} className={`py-1.5 pr-4 ${i === 0 ? "text-fg" : ""}`}>
                    {c}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </details>
  );
}

export default function DashboardPage({ content }: { content: Content }) {
  const locale = content.locale;
  const t = DASHBOARD[locale];
  const lang = content.htmlLang;
  const n = numbers(lang);
  const one = new Intl.NumberFormat(lang, { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const int = new Intl.NumberFormat(lang);
  const pct = new Intl.NumberFormat(lang, { style: "percent", maximumFractionDigits: 0 });
  const month = new Intl.DateTimeFormat(lang, { month: "short", timeZone: "UTC" });
  const monthName = (m: number) => month.format(new Date(Date.UTC(2025, m - 1, 1))).replace(".", "");
  const last = YEARS[YEARS.length - 1];
  const home = LOCALE_PATHS[locale];
  const backHref = `${home}#${SECTION_IDS.projects}`;
  const year = new Date().getFullYear();

  const maxExcess = Math.max(...WORST_2025.map((s) => s.dec / s.limit - 1));
  const kpis = [
    { label: `${t.kpis.dec.label} ${last.year}`, value: `${one.format(last.dec)} h`, note: t.kpis.dec.note(n) },
    { label: `${t.kpis.fec.label} ${last.year}`, value: one.format(last.fec), note: t.kpis.fec.note(n) },
    { label: `${t.kpis.sets.label} ${last.year}`, value: `${last.setsAbove} ${t.units.of} ${last.sets}`, note: t.kpis.sets.note(n) },
    { label: `${t.kpis.gross.label} ${last.year}`, value: `${one.format(last.dec + last.excluded)} h`, note: t.kpis.gross.note(n), warm: true },
  ];

  const stackLabels = { dec: t.legend.dec, excluded: t.legend.excluded, total: t.legend.total };

  return (
    <>
      <a
        href="#main"
        className="sr-only z-50 rounded-md bg-accent px-4 py-2 text-on-accent focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        {content.nav.skipToContent}
      </a>
      <PageEffects />
      <SiteHeader content={content} homeHref={home} localePaths={dashboardTranslations()} />
      <ScrollRestore />

      <main id="main" tabIndex={-1} className="relative z-10 outline-none">
        <header data-anchor id="dashboard" className="relative overflow-hidden border-b border-line">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-48 -right-40 size-[560px] rounded-full bg-accent-deep/25 blur-[110px]"
          />
          <div className="relative mx-auto max-w-6xl px-4 pt-12 pb-12 sm:px-6 sm:pt-16">
            <a
              href={backHref}
              className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] text-muted uppercase transition-colors hover:text-cyan"
            >
              <span aria-hidden="true">←</span> {t.back}
            </a>
            <p className="mt-10 font-mono text-[11px] tracking-[0.16em] text-cyan uppercase">{t.eyebrow}</p>
            <h1 className="hero-rise mt-5 max-w-4xl text-[clamp(1.9rem,4.4vw,3.1rem)] leading-[1.06] font-extrabold tracking-[-0.045em] text-balance text-fg">
              {t.title(n)}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-pretty text-muted">{t.lead(n)}</p>

            <dl className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {kpis.map((k) => (
                <div key={k.label} className="flex flex-col-reverse justify-end gap-2 rounded-2xl border border-line bg-surface p-5">
                  <dt className="order-2 text-xs leading-snug text-muted">{k.label}</dt>
                  <dd className="order-1 flex flex-col gap-2">
                    <span className="flex items-center gap-2.5 text-[1.7rem] leading-none font-extrabold tracking-[-0.04em] text-fg sm:text-4xl">
                      <span
                        aria-hidden="true"
                        className="size-2.5 shrink-0 rounded-full"
                        style={{ background: k.warm ? COLORS.excluded : COLORS.dec }}
                      />
                      {k.value}
                    </span>
                    <span className="text-xs leading-snug text-faint">{k.note}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </header>

        <div className="mx-auto max-w-6xl space-y-5 px-4 py-12 sm:space-y-6 sm:px-6 sm:py-16">
          <Card title={t.trend.title(n)} text={t.trend.text(n)}>
            <TrendChart
              locale={lang}
              data={YEARS.map((y) => ({ year: y.year, dec: y.dec, limit: y.limDec, gross: y.dec + y.excluded }))}
              labels={{ dec: t.legend.dec, limit: t.legend.limit, gross: t.legend.gross, aria: t.trend.title(n) }}
            />
            <DataTable
              summary={t.table.show}
              head={[t.table.year, `${t.legend.dec} (h)`, `${t.legend.gross} (h)`, `${t.legend.limit} (h)`, `FEC`, `${t.legend.limit} FEC`]}
              rows={YEARS.map((y) => [y.year, one.format(y.dec), one.format(y.dec + y.excluded), one.format(y.limDec), one.format(y.fec), one.format(y.limFec)])}
            />
          </Card>

          <Card title={t.felt.title(n)} text={t.felt.text(n)}>
            <StackedChart
              locale={lang}
              data={YEARS.map((y) => ({ key: String(y.year), short: `’${String(y.year).slice(2)}`, dec: y.dec, excluded: y.excluded }))}
              highlight={[String(n.grossMinYear), String(n.worstYear), String(last.year)]}
              labelAt={[String(n.first), String(n.grossMinYear), String(n.worstYear), String(last.year)]}
              labels={{ ...stackLabels, aria: t.felt.title(n) }}
            />
            <DataTable
              summary={t.table.show}
              head={[t.table.year, `${t.legend.dec} (h)`, `${t.legend.excluded} (h)`, `${t.legend.total} (h)`]}
              rows={YEARS.map((y) => [y.year, one.format(y.dec), one.format(y.excluded), one.format(y.dec + y.excluded)])}
            />
          </Card>

          {/* Destaque de 2026 (ano em curso). */}
          <section
            data-reveal
            className="grid gap-6 rounded-2xl border border-[#c9802a]/40 bg-[#c9802a]/[0.06] p-5 sm:p-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center"
          >
            <div>
              <p className="font-mono text-[11px] tracking-[0.14em] text-[#e3a95c] uppercase">{t.ytd.label}</p>
              <h2 className="mt-3 text-lg leading-snug font-bold tracking-[-0.02em] text-balance text-fg sm:text-xl">
                {t.ytd.title(n)}
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-pretty text-muted">{t.ytd.text(n)}</p>
            </div>
            <dl className="grid grid-cols-2 gap-6 lg:min-w-[22rem]">
              {[
                { label: t.legend.dec, value: n.ytdDecCurr, change: n.ytdDecChange, color: COLORS.dec },
                { label: t.legend.excluded, value: n.ytdExcCurr, change: n.ytdExcChange, color: COLORS.excluded },
              ].map((k) => (
                <div key={k.label}>
                  <dt className="flex items-center gap-2 text-xs text-muted">
                    <span aria-hidden="true" className="size-2.5 rounded-[3px]" style={{ background: k.color }} />
                    {k.label}
                  </dt>
                  <dd className="mt-2 text-3xl font-extrabold tracking-[-0.04em] text-fg">
                    {k.value} h <span className="ml-1 text-base font-semibold text-muted">{k.change}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <div className="grid gap-5 sm:gap-6 lg:grid-cols-2">
            <Card title={t.season.title(n)} text={t.season.text}>
              <StackedChart
                locale={lang}
                height={260}
                data={SEASON.map((m) => ({ key: monthName(m.month), short: monthName(m.month).slice(0, 3), dec: m.dec, excluded: m.excluded }))}
                labels={{ ...stackLabels, aria: t.season.title(n) }}
              />
              <DataTable
                summary={t.table.show}
                head={[t.table.month, `${t.legend.dec} (h)`, `${t.legend.excluded} (h)`]}
                rows={SEASON.map((m) => [monthName(m.month), one.format(m.dec), one.format(m.excluded)])}
              />
            </Card>
            <Card title={t.share.title(n)} text={t.share.text(n)}>
              <ShareChart
                locale={lang}
                data={YEARS.map((y) => ({ year: y.year, share: y.consAboveShare }))}
                labels={{ share: t.legend.share, aria: t.share.title(n) }}
              />
              <DataTable
                summary={t.table.show}
                head={[t.table.year, t.legend.share, t.kpis.sets.label]}
                rows={YEARS.map((y) => [y.year, pct.format(y.consAboveShare), `${y.setsAbove} ${t.units.of} ${y.sets}`])}
              />
            </Card>
          </div>

          <Card title={t.worst.title} text={t.worst.text}>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[620px] text-left text-sm whitespace-nowrap tabular-nums">
                <thead>
                  <tr className="border-b border-line text-xs text-faint">
                    {[t.worst.cols.set, t.worst.cols.dec, t.worst.cols.limit, t.worst.cols.ratio, t.worst.cols.consumers, t.worst.cols.excluded].map(
                      (h, i) => (
                        <th key={h} scope="col" className={`py-3 pr-4 font-medium ${i === 3 ? "w-[34%]" : ""}`}>
                          {h}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody>
                  {WORST_2025.map((s) => {
                    const ratio = s.dec / s.limit;
                    return (
                      <tr key={s.name} className="border-b border-line/60">
                        <th scope="row" className="py-3.5 pr-4 font-semibold text-fg">
                          {s.name}
                        </th>
                        <td className="py-3.5 pr-4 text-fg">{one.format(s.dec)} h</td>
                        <td className="py-3.5 pr-4 text-muted">{one.format(s.limit)} h</td>
                        <td className="py-3.5 pr-4">
                          <span className="flex items-center gap-3">
                            <span aria-hidden="true" className="relative h-2 flex-1 rounded-full bg-surface-2">
                              <span
                                className="absolute inset-y-0 left-0 rounded-full"
                                style={{ width: `${((ratio - 1) / maxExcess) * 100}%`, background: COLORS.dec }}
                              />
                            </span>
                            <span className="w-12 text-right text-fg">+{pct.format(ratio - 1)}</span>
                          </span>
                        </td>
                        <td className="py-3.5 pr-4 text-muted">{int.format(s.consumers)}</td>
                        <td className="py-3.5 pr-4 text-muted">{one.format(s.excluded)} h</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>

          <section data-reveal className="rounded-2xl border border-line p-5 sm:p-7">
            <h2 className="font-mono text-xs tracking-[0.14em] text-accent uppercase">{t.method.title}</h2>
            <ul className="mt-5 grid gap-5 text-sm leading-relaxed text-muted md:grid-cols-2">
              {t.method.items.map((item) => (
                <li key={item} className="border-t border-line pt-4">
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs text-faint">{t.method.sourceLabel}</p>
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
