import { CookiePreferencesButton } from "./CookieConsent";
import { CONTACT, PERSON, PROJECTS, SECTION_IDS, articlePath } from "@/content/shared";
import type { Content } from "@/content/types";
import { formatDate } from "@/lib/articles";
import OtherWorks from "./OtherWorks";
import PageEffects from "./PageEffects";
import ProjectCard from "./ProjectCard";
import ScrollRestore from "./ScrollRestore";
import SiteHeader from "./SiteHeader";
import HeroParticles from "./HeroParticles";

function SectionHeading({ number, id, children }: { number: string; id: string; children: string }) {
  return (
    <div data-reveal className="mb-12 sm:mb-16">
      <span aria-hidden="true" className="font-mono text-xs tracking-[0.16em] text-cyan">
        {number} /
      </span>
      <h2
        id={id}
        className="mt-3 text-[clamp(2.5rem,7vw,4.75rem)] leading-[0.92] font-extrabold tracking-[-0.06em] text-fg uppercase"
      >
        {children}
      </h2>
    </div>
  );
}

/** Divide o título para aplicar o gradiente só no trecho destacado. */
function HeroTitle({ title, highlight }: { title: string; highlight: string }) {
  const i = title.indexOf(highlight);
  if (!highlight || i < 0) return <>{title}</>;
  return (
    <>
      {title.slice(0, i)}
      <span className="gradient-text">{highlight}</span>
      {title.slice(i + highlight.length)}
    </>
  );
}

export default function HomePage({ content }: { content: Content }) {
  const { hero, projects, howIWork, background, articles, contact, footer, nav } = content;
  const textById = new Map(projects.items.map((item) => [item.id, item]));
  const year = new Date().getFullYear();
  const tickerItems = [...PROJECTS, ...PROJECTS];
  // Rótulos das etapas na rede do hero: "01 Entendo a operação" (sem o ponto final).
  const methodLabels = howIWork.steps.map(
    (step, i) => `${String(i + 1).padStart(2, "0")} ${step.title.replace(/\.$/, "")}`,
  );

  const contactLinks = [
    { label: contact.linkedinLabel, href: CONTACT.linkedin, display: CONTACT.linkedinDisplay, external: true },
    { label: contact.githubLabel, href: CONTACT.github, display: CONTACT.githubDisplay, external: true },
    { label: contact.emailLabel, href: `mailto:${CONTACT.email}`, display: CONTACT.email, external: false },
  ];

  return (
    <>
      <a
        href="#main"
        className="sr-only z-50 rounded-md bg-accent px-4 py-2 text-on-accent focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        {nav.skipToContent}
      </a>
      <PageEffects />
      <SiteHeader content={content} />
      <ScrollRestore />

      <main id="main" tabIndex={-1} className="relative z-10 outline-none">
        {/* Hero */}
        <section data-anchor id={SECTION_IDS.hero} aria-labelledby="hero-title" className="relative overflow-x-clip">
          <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 pt-6 pb-16 sm:px-6 sm:pt-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:pt-14 lg:pb-20">
            <div className="relative z-10">
              <p className="flex items-center gap-3 font-mono text-[11px] tracking-[0.16em] text-muted uppercase">
                <span aria-hidden="true" className="pulse-dot size-2 rounded-full bg-cyan" />
                {hero.eyebrow}
              </p>
              <h1
                id="hero-title"
                className="hero-rise mt-7 text-[clamp(2.4rem,5.6vw,4.6rem)] leading-[1] font-extrabold tracking-[-0.045em] text-balance text-fg"
              >
                <HeroTitle title={hero.title} highlight={hero.titleHighlight} />
              </h1>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-pretty text-muted">
                {hero.subtitle}
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href={`#${SECTION_IDS.projects}`}
                  className="group inline-flex min-w-48 items-center justify-between gap-6 bg-accent px-5 py-4 text-xs font-extrabold tracking-[0.08em] text-on-accent uppercase transition-transform duration-300 hover:-translate-y-1"
                >
                  {hero.ctaProjects}
                  <span aria-hidden="true" className="text-lg font-normal">
                    ↗
                  </span>
                </a>
                <a
                  href={`#${SECTION_IDS.contact}`}
                  className="group inline-flex min-w-48 items-center justify-between gap-6 border border-line-strong bg-white/[0.02] px-5 py-4 text-xs font-extrabold tracking-[0.08em] text-fg uppercase transition-all duration-300 hover:-translate-y-1 hover:border-accent"
                >
                  {hero.ctaContact}
                  <span aria-hidden="true" className="text-lg font-normal">
                    ↓
                  </span>
                </a>
              </div>
            </div>
            <HeroParticles steps={methodLabels} />
          </div>

          {/* Faixa corrida com os projetos (decorativa). */}
          <div aria-hidden="true" className="relative z-10 overflow-hidden border-y border-line bg-bg/70 py-5">
            <div className="ticker-track flex w-max gap-10 whitespace-nowrap">
              {tickerItems.map((p, i) => (
                <span key={`${p.id}-${i}`} className="font-mono text-[11px] tracking-[0.2em] text-faint uppercase">
                  {p.name} <span className="ml-8 text-accent">✳</span>
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Projetos */}
        <section data-anchor id={SECTION_IDS.projects} aria-labelledby="projects-title">
          <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
            <SectionHeading number="01" id="projects-title">
              {projects.title}
            </SectionHeading>
            <div className="space-y-6 sm:space-y-8">
              {PROJECTS.map((facts, index) => {
                const text = textById.get(facts.id);
                if (!text) return null;
                return (
                  <div key={facts.id} data-reveal>
                    <ProjectCard index={index} facts={facts} text={text} labels={projects} />
                  </div>
                );
              })}
            </div>
            <OtherWorks content={content} />
          </div>
        </section>

        {/* Como trabalho */}
        <section
          data-anchor
          id={SECTION_IDS.howIWork}
          aria-labelledby="how-title"
          className="border-y border-line bg-surface/60"
        >
          <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
            <SectionHeading number="02" id="how-title">
              {howIWork.title}
            </SectionHeading>
            <div data-reveal className="relative">
              <span
                aria-hidden="true"
                className="draw-x absolute inset-x-0 top-0 h-px bg-gradient-to-r from-accent via-cyan to-transparent"
              />
              <ol className="grid gap-px border-b border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
                {howIWork.steps.map((step, i) => (
                  <li
                    key={step.title}
                    className="bg-surface px-5 pt-7 pb-9 transition-colors duration-300 hover:bg-surface-2 sm:last:col-span-2 lg:last:col-span-1"
                  >
                    <span aria-hidden="true" className="font-mono text-xs tracking-[0.14em] text-cyan">
                      {String(i + 1).padStart(2, "0")} / {String(howIWork.steps.length).padStart(2, "0")}
                    </span>
                    <h3 className="mt-10 text-xl font-bold tracking-[-0.02em] text-fg">{step.title}</h3>
                    <p className="mt-3 leading-relaxed text-muted">{step.text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* Trajetória */}
        <section data-anchor id={SECTION_IDS.background} aria-labelledby="background-title">
          <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
            <SectionHeading number="03" id="background-title">
              {background.title}
            </SectionHeading>
            <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-16">
              <div data-reveal className="relative">
                <span
                  aria-hidden="true"
                  className="draw-y absolute top-2 bottom-2 left-0 w-px bg-gradient-to-b from-accent via-cyan/70 to-line"
                />
                <ol>
                  {background.milestones.map((m, i) => (
                    <li key={m.period} className="relative pb-10 pl-8 last:pb-0">
                      <span
                        aria-hidden="true"
                        className={`absolute top-1.5 -left-[6px] size-3 rounded-full border-2 border-accent ${
                          i === background.milestones.length - 1
                            ? "bg-cyan shadow-[0_0_16px_#7be8dc]"
                            : "bg-bg"
                        }`}
                      />
                      <p className="font-mono text-xs tracking-[0.12em] text-cyan">{m.period}</p>
                      <h3 className="mt-2 text-xl font-bold tracking-[-0.02em] text-fg">{m.title}</h3>
                      <p className="mt-2 leading-relaxed text-muted">{m.text}</p>
                    </li>
                  ))}
                </ol>
              </div>
              {/* Números grandes numa coluna ao lado dos marcos (no celular, em grade acima). */}
              <dl
                data-reveal
                className="order-first grid grid-cols-2 gap-3 self-start sm:gap-4 lg:sticky lg:top-28 lg:order-none lg:grid-cols-1 lg:gap-0 lg:border-l lg:border-line"
              >
                {background.stats.map((stat, i) => (
                  <div
                    key={stat.label}
                    className="relative flex flex-col-reverse justify-end gap-2 border border-line bg-surface/70 p-5 transition-colors duration-300 hover:border-accent/50 sm:p-6 lg:border-0 lg:border-b lg:bg-transparent lg:px-8 lg:py-7 lg:last:border-b-0 lg:hover:bg-surface/50"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute top-3 right-4 font-mono text-[10px] tracking-[0.14em] text-faint lg:top-7 lg:right-0"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <dt className="font-mono text-[11px] leading-snug tracking-[0.1em] text-muted uppercase">
                      {stat.label}
                    </dt>
                    <dd className="gradient-text text-[1.375rem] font-extrabold tracking-[-0.05em] whitespace-nowrap sm:text-4xl lg:text-[2.6rem] lg:leading-none">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <div data-reveal className="mt-16 border border-line bg-surface p-6 sm:p-8">
              <h3 className="font-mono text-xs font-medium tracking-[0.14em] text-accent uppercase">
                {background.educationTitle}
              </h3>
              <ul className="mt-6 grid gap-px bg-line md:grid-cols-2 lg:grid-cols-4">
                {background.education.map((item) => (
                  <li key={item} className="bg-surface py-5 leading-relaxed text-fg md:px-5">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Artigos */}
        <section
          data-anchor
          id={SECTION_IDS.articles}
          aria-labelledby="articles-title"
          className="border-t border-line bg-surface/60"
        >
          <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
            <SectionHeading number="04" id="articles-title">
              {articles.title}
            </SectionHeading>
            <p data-reveal className="-mt-4 mb-12 max-w-2xl text-lg leading-relaxed text-pretty text-muted sm:mb-16">
              {articles.intro}
            </p>
            <ul className="grid gap-5 md:grid-cols-2">
              {articles.items.map((article) => (
                <li key={article.id} data-reveal>
                  <a
                    href={articlePath(content.locale, article.slug)}
                    className="group relative flex h-full flex-col overflow-hidden border border-line bg-bg/60 p-6 transition-[border-color,transform,box-shadow] duration-500 hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_0_70px_-24px_#4fb0c666] sm:p-9"
                  >
                    <span className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] tracking-[0.14em] uppercase">
                      {article.tags.map((tag) => (
                        <span key={tag} className="text-cyan">
                          {tag}
                        </span>
                      ))}
                      <span className="text-faint">
                        {article.readingMinutes} {articles.minutesLabel}
                      </span>
                      <span className="text-faint">{formatDate(content.locale, article.date)}</span>
                    </span>
                    <span
                      className="mt-8 block text-2xl font-extrabold tracking-[-0.04em] text-balance text-fg"
                    >
                      {article.title}
                    </span>
                    <span className="mt-5 block max-w-2xl leading-relaxed text-muted">{article.summary}</span>
                    <span className="mt-8 inline-flex items-center gap-3 font-mono text-xs tracking-[0.12em] text-fg uppercase transition-colors group-hover:text-cyan">
                      {articles.readLabel}
                      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Contato */}
        <section
          data-anchor
          id={SECTION_IDS.contact}
          aria-labelledby="contact-title"
          className="relative overflow-hidden border-t border-line"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-40 -right-56 size-[640px] rounded-full bg-accent-deep/25 blur-[110px]"
          />
          <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-24 sm:px-6 sm:py-32 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div data-reveal>
              <span aria-hidden="true" className="font-mono text-xs tracking-[0.16em] text-cyan">
                05 /
              </span>
              <h2
                id="contact-title"
                className="gradient-text mt-3 text-[clamp(3rem,10vw,6.5rem)] leading-[0.9] font-extrabold tracking-[-0.07em] uppercase"
              >
                {contact.title}
              </h2>
              <p className="mt-8 max-w-xl text-xl leading-relaxed text-pretty text-fg sm:text-2xl">
                {contact.text}
              </p>
            </div>
            <ul data-reveal className="border-t border-line">
              {contactLinks.map((link) => (
                <li key={link.label} className="border-b border-line">
                  <a
                    href={link.href}
                    {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex items-center justify-between gap-4 py-5 transition-colors hover:text-cyan"
                  >
                    <span className="min-w-0">
                      <span className="block font-mono text-[11px] tracking-[0.14em] text-faint uppercase">
                        {link.label}
                      </span>
                      <span className="mt-1 block text-base break-words text-fg transition-colors group-hover:text-cyan sm:text-lg">
                        {link.display}
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="text-lg text-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-cyan"
                    >
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-7 font-mono text-[11px] tracking-[0.1em] text-faint uppercase sm:flex-row sm:justify-between sm:px-6">
          <p>
            © {year} {PERSON.name}
          </p>
          <p className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>{footer.builtWith}</span>
            <CookiePreferencesButton label={footer.cookies} />
          </p>
        </div>
      </footer>
    </>
  );
}
