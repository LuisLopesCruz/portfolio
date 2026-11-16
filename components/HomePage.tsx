import { CONTACT, PERSON, PROJECTS, SECTION_IDS } from "@/content/shared";
import type { Content } from "@/content/types";
import ProjectCard from "./ProjectCard";
import ScrollRestore from "./ScrollRestore";
import SiteHeader from "./SiteHeader";

function SectionHeading({ number, id, children }: { number: string; id: string; children: string }) {
  return (
    <div className="mb-10 flex items-baseline gap-4 sm:mb-14">
      <span aria-hidden="true" className="font-mono text-sm text-accent">
        {number}
      </span>
      <h2 id={id} className="text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
        {children}
      </h2>
    </div>
  );
}

export default function HomePage({ content }: { content: Content }) {
  const { hero, projects, howIWork, background, contact, footer, nav } = content;
  const textById = new Map(projects.items.map((item) => [item.id, item]));
  const year = new Date().getFullYear();

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
      <SiteHeader content={content} />
      <ScrollRestore />

      <main id="main" tabIndex={-1} className="outline-none">
        {/* Hero */}
        <section data-anchor id={SECTION_IDS.hero} aria-labelledby="hero-title" className="border-b border-line">
          <div className="mx-auto max-w-6xl px-4 pt-16 pb-20 sm:px-6 sm:pt-24 sm:pb-28 lg:pt-32">
            <p className="font-mono text-sm font-medium tracking-wider text-accent uppercase">
              {hero.eyebrow}
            </p>
            <h1
              id="hero-title"
              className="mt-5 max-w-4xl text-4xl leading-[1.08] font-semibold tracking-tight text-balance text-fg sm:text-5xl lg:text-6xl"
            >
              {hero.title}
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-relaxed text-pretty text-muted sm:text-xl">
              {hero.subtitle}
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href={`#${SECTION_IDS.projects}`}
                className="inline-flex items-center rounded-lg bg-accent px-5 py-3 font-medium text-on-accent transition-colors hover:bg-accent-strong"
              >
                {hero.ctaProjects}
              </a>
              <a
                href={`#${SECTION_IDS.contact}`}
                className="inline-flex items-center rounded-lg border border-line px-5 py-3 font-medium text-fg transition-colors hover:border-accent hover:text-accent"
              >
                {hero.ctaContact}
              </a>
            </div>
          </div>
        </section>

        {/* Projetos */}
        <section
          data-anchor
          id={SECTION_IDS.projects}
          aria-labelledby="projects-title"
          className="border-b border-line bg-surface"
        >
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
            <SectionHeading number="01" id="projects-title">
              {projects.title}
            </SectionHeading>
            <div className="space-y-6 sm:space-y-8">
              {PROJECTS.map((facts, index) => {
                const text = textById.get(facts.id);
                if (!text) return null;
                return (
                  <ProjectCard
                    key={facts.id}
                    index={index}
                    facts={facts}
                    text={text}
                    labels={projects}
                  />
                );
              })}
            </div>
          </div>
        </section>

        {/* Como trabalho */}
        <section
          data-anchor
          id={SECTION_IDS.howIWork}
          aria-labelledby="how-title"
          className="border-b border-line"
        >
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
            <SectionHeading number="02" id="how-title">
              {howIWork.title}
            </SectionHeading>
            <ol className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {howIWork.steps.map((step, i) => (
                <li key={step.title} className="border-t-2 border-accent pt-5">
                  <span aria-hidden="true" className="font-mono text-sm text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-xl font-semibold tracking-tight text-fg">{step.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Trajetória */}
        <section
          data-anchor
          id={SECTION_IDS.background}
          aria-labelledby="background-title"
          className="border-b border-line bg-surface"
        >
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
            <SectionHeading number="03" id="background-title">
              {background.title}
            </SectionHeading>
            <dl className="mb-14 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {background.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col-reverse justify-end gap-1.5 rounded-2xl border border-line bg-bg p-4 sm:p-6"
                >
                  <dt className="text-sm leading-snug text-muted">{stat.label}</dt>
                  <dd className="text-xl font-semibold tracking-tight whitespace-nowrap text-accent sm:text-3xl">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
              <ol className="relative border-l border-line">
                {background.milestones.map((m, i) => (
                  <li key={m.period} className="relative pb-9 pl-7 last:pb-0">
                    <span
                      aria-hidden="true"
                      className={
                        i === background.milestones.length - 1
                          ? "absolute top-1.5 -left-[7px] size-3.5 rounded-full border-2 border-accent bg-accent"
                          : "absolute top-1.5 -left-[7px] size-3.5 rounded-full border-2 border-accent bg-surface"
                      }
                    />
                    <p className="font-mono text-sm text-accent">{m.period}</p>
                    <h3 className="mt-1 text-xl font-semibold tracking-tight text-fg">{m.title}</h3>
                    <p className="mt-2 leading-relaxed text-muted">{m.text}</p>
                  </li>
                ))}
              </ol>
              <div className="self-start rounded-2xl border border-line bg-bg p-6 sm:p-8">
                <h3 className="font-mono text-xs font-medium tracking-wider text-muted uppercase">
                  {background.educationTitle}
                </h3>
                <ul className="mt-5 space-y-4">
                  {background.education.map((item) => (
                    <li key={item} className="leading-relaxed text-fg">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Contato */}
        <section data-anchor id={SECTION_IDS.contact} aria-labelledby="contact-title">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
            <SectionHeading number="04" id="contact-title">
              {contact.title}
            </SectionHeading>
            <p className="max-w-2xl text-xl leading-relaxed text-pretty text-fg sm:text-2xl">
              {contact.text}
            </p>
            <ul className="mt-10 divide-y divide-line border-y border-line">
              {contactLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:gap-8"
                  >
                    <span className="w-24 shrink-0 font-mono text-xs font-medium tracking-wider text-muted uppercase">
                      {link.label}
                    </span>
                    <span className="min-w-0 text-lg break-words text-fg transition-colors group-hover:text-accent sm:text-xl">
                      {link.display}
                      {link.external && (
                        <span aria-hidden="true" className="ml-2 text-muted group-hover:text-accent">
                          ↗
                        </span>
                      )}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-muted sm:flex-row sm:justify-between sm:px-6">
          <p>
            © {year} {PERSON.name}
          </p>
          <p>{footer.builtWith}</p>
        </div>
      </footer>
    </>
  );
}
