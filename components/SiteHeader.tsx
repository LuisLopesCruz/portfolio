import { PERSON, SECTION_IDS } from "@/content/shared";
import type { Content } from "@/content/types";
import LanguageSwitcher from "./LanguageSwitcher";

export default function SiteHeader({ content }: { content: Content }) {
  const { nav } = content;
  const links = [
    { href: `#${SECTION_IDS.projects}`, label: nav.projects },
    { href: `#${SECTION_IDS.howIWork}`, label: nav.howIWork },
    { href: `#${SECTION_IDS.background}`, label: nav.background },
    { href: `#${SECTION_IDS.contact}`, label: nav.contact },
  ];

  return (
    <header
      data-site-header
      className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur supports-[backdrop-filter]:bg-bg/80"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 pt-3 pb-2 sm:px-6 lg:h-[4.5rem] lg:flex-row lg:items-center lg:gap-8 lg:py-0">
        <div className="flex items-center justify-between gap-4 lg:contents">
          <a
            href={`#${SECTION_IDS.hero}`}
            className="font-mono text-sm font-medium tracking-tight whitespace-nowrap text-fg"
          >
            <span className="sm:hidden">{PERSON.shortName}</span>
            <span className="hidden sm:inline">{PERSON.name}</span>
          </a>
          <div className="lg:order-last lg:ml-auto">
            <LanguageSwitcher
              current={content.locale}
              label={nav.languageLabel}
              names={nav.languageNames}
            />
          </div>
        </div>
        <nav aria-label={nav.sectionsLabel} className="-mx-2">
          <ul className="flex flex-wrap items-center gap-x-1 gap-y-0 text-sm">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="inline-block rounded-md px-2 py-2 text-muted transition-colors hover:text-fg"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
