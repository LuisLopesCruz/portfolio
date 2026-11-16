"use client";

import { useEffect } from "react";
import { SWITCH_POSITION_KEY } from "@/lib/locale-storage";

/** Depois de trocar de idioma, volta para o mesmo ponto da página. */
export default function ScrollRestore() {
  useEffect(() => {
    let saved: { id: string; ratio: number } | null = null;
    try {
      const raw = sessionStorage.getItem(SWITCH_POSITION_KEY);
      sessionStorage.removeItem(SWITCH_POSITION_KEY);
      saved = raw ? JSON.parse(raw) : null;
    } catch {
      return;
    }
    if (!saved || window.location.hash) return;
    const position = saved;

    const restore = () => {
      const el = document.getElementById(position.id);
      if (!el) return;
      const header = document.querySelector<HTMLElement>("[data-site-header]");
      const top =
        el.getBoundingClientRect().top +
        window.scrollY +
        position.ratio * el.offsetHeight -
        (header?.offsetHeight ?? 0) -
        1;
      window.scrollTo({ top: Math.max(0, top), behavior: "instant" });
    };

    restore();
    // As fontes podem mudar a altura do texto; corrige quando terminarem de carregar.
    document.fonts?.ready.then(restore).catch(() => {});
  }, []);

  return null;
}
