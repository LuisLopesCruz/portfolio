"use client";

import type { MouseEvent } from "react";
import { HREFLANG, LOCALE_PATHS, LOCALES } from "@/content/shared";
import type { Locale } from "@/content/types";
import { PREFERRED_LOCALE_KEY, SWITCH_POSITION_KEY } from "@/lib/locale-storage";

/**
 * Posição atual: o bloco marcado com data-anchor (seção ou cartão de projeto)
 * que está no topo da tela e quanto dele já foi rolado (0 a 1).
 */
function currentPosition(): { id: string; ratio: number } | null {
  if (window.scrollY < 8) return null;
  const header = document.querySelector<HTMLElement>("[data-site-header]");
  const y = window.scrollY + (header?.offsetHeight ?? 0) + 1;
  let found: { id: string; ratio: number } | null = null;
  for (const el of document.querySelectorAll<HTMLElement>("[data-anchor][id]")) {
    const id = el.id;
    const top = el.getBoundingClientRect().top + window.scrollY;
    if (top <= y) {
      const ratio = Math.min(1, Math.max(0, (y - top) / Math.max(1, el.offsetHeight)));
      found = { id, ratio };
    }
  }
  return found;
}

export default function LanguageSwitcher({
  current,
  label,
  names,
  paths = LOCALE_PATHS,
}: {
  current: Locale;
  label: string;
  names: Record<Locale, string>;
  /** Endereço de cada idioma; nos artigos, aponta para a tradução do artigo. */
  paths?: Record<Locale, string>;
}) {
  function onSelect(event: MouseEvent<HTMLAnchorElement>, target: Locale) {
    // Ctrl/Cmd+clique abre em nova aba normalmente.
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
      return;
    }
    event.preventDefault();
    try {
      localStorage.setItem(PREFERRED_LOCALE_KEY, target);
    } catch {
      /* armazenamento indisponível: segue sem lembrar a escolha */
    }
    if (target === current) return;
    try {
      const position = currentPosition();
      if (position) sessionStorage.setItem(SWITCH_POSITION_KEY, JSON.stringify(position));
    } catch {
      /* idem */
    }
    window.location.assign(paths[target]);
  }

  return (
    <nav aria-label={label}>
      <ul className="flex items-center gap-0.5 rounded-full border border-line-strong p-1 font-mono text-[11px] tracking-[0.08em]">
        {LOCALES.map((locale) => {
          const active = locale === current;
          return (
            <li key={locale} className="flex items-center">
              <a
                href={paths[locale]}
                hrefLang={HREFLANG[locale]}
                lang={HREFLANG[locale]}
                aria-label={`${locale.toUpperCase()} — ${names[locale]}`}
                aria-current={active ? "true" : undefined}
                onClick={(e) => onSelect(e, locale)}
                className={
                  active
                    ? "inline-block rounded-full bg-accent px-2.5 py-1.5 font-medium text-on-accent"
                    : "inline-block rounded-full px-2.5 py-1.5 text-muted transition-colors hover:text-fg"
                }
              >
                {locale.toUpperCase()}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
