import { PERSON, SECTION_IDS } from "@/content/shared";
import type { Content, Locale } from "@/content/types";
import LanguageSwitcher from "./LanguageSwitcher";

export default function SiteHeader({
  content,
  homeHref = "",
  localePaths,
}: {
  content: Content;
  /** Nas páginas de artigo, os links das seções voltam para a página inicial. */
  homeHref?: string;
  localePaths?: Record<Locale, string>;
}) {
  const { nav, hero } = content;
  const links = [
    { href: `${homeHref}#${SECTION_IDS.projects}`, label: nav.projects },
    { href: `${homeHref}#${SECTION_IDS.howIWork}`, label: nav.howIWork },
    { href: `${homeHref}#${SECTION_IDS.background}`, label: nav.background },
    { href: `${homeHref}#${SECTION_IDS.articles}`, label: nav.articles },
    { href: `${homeHref}#${SECTION_IDS.contact}`, label: nav.contact },
  ];

  return (
    <header
      data-site-header
      className="sticky top-0 z-40 border-b border-transparent bg-bg/55 backdrop-blur-lg transition-colors duration-300 data-[scrolled]:border-line data-[scrolled]:bg-bg/85"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-1.5 px-4 pt-3 pb-2 sm:px-6 lg:h-[4.75rem] lg:flex-row lg:items-center lg:gap-10 lg:py-0">
        <div className="flex items-center justify-between gap-4 lg:contents">
          <a href={`${homeHref}#${SECTION_IDS.hero}`} className="group flex items-center gap-3">
            <span
              aria-hidden="true"
              className="grid size-9 place-items-center rounded-full border border-accent/60 font-mono text-[11px] text-accent shadow-[0_0_24px_#4fb0c633] transition-colors group-hover:border-cyan group-hover:text-cyan"
            >
              LC
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-[13px] font-bold tracking-[0.04em] text-fg uppercase">
                <span className="sm:hidden">{PERSON.shortName}</span>
                <span className="hidden sm:inline">{PERSON.name}</span>
              </span>
              <span className="mt-1 font-mono text-[9px] tracking-[0.14em] text-faint uppercase">
                {hero.eyebrow}
              </span>
            </span>
          </a>
          <div className="lg:order-last lg:ml-auto">
            <LanguageSwitcher
              current={content.locale}
              label={nav.languageLabel}
              names={nav.languageNames}
              paths={localePaths}
            />
          </div>
        </div>
        <nav
          aria-label={nav.sectionsLabel}
          className="-mx-2 overflow-x-auto [mask-image:linear-gradient(90deg,#000_88%,transparent)] [scrollbar-width:none] lg:overflow-visible lg:[mask-image:none] [&::-webkit-scrollbar]:hidden"
        >
          <ul className="flex w-max items-center gap-x-1 pr-6 text-[13px] whitespace-nowrap lg:pr-0">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  data-nav-link
                  className="group relative inline-block rounded-md px-1.5 py-2 text-muted transition-colors hover:text-fg aria-[current]:text-fg sm:px-2"
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-cyan opacity-0 transition-opacity group-aria-[current]:opacity-100"
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
