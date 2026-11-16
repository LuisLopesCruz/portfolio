"use client";

import { useEffect } from "react";

/**
 * Efeitos da página, sem conteúdo próprio:
 * - revela blocos [data-reveal] quando entram na tela;
 * - marca no menu a seção visível (aria-current="location");
 * - escurece o cabeçalho depois do topo;
 * - brilho suave que segue o mouse (só em telas com ponteiro fino).
 */
export default function PageEffects() {
  useEffect(() => {
    const root = document.documentElement;
    const cleanups: (() => void)[] = [];

    // Revelação ao rolar.
    const revealables = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (root.classList.contains("js-motion")) {
      const reveal = new IntersectionObserver(
        (entries) =>
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              reveal.unobserve(entry.target);
            }
          }),
        { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
      );
      revealables.forEach((el) => {
        // O que já está acima do fim da tela (ex.: voltou com rolagem salva) aparece direto.
        if (el.getBoundingClientRect().top < innerHeight) el.classList.add("is-visible");
        else reveal.observe(el);
      });
      const showAll = () => revealables.forEach((el) => el.classList.add("is-visible"));
      window.addEventListener("beforeprint", showAll);
      cleanups.push(() => {
        reveal.disconnect();
        window.removeEventListener("beforeprint", showAll);
      });
    } else {
      revealables.forEach((el) => el.classList.add("is-visible"));
    }

    // Seção ativa no menu.
    const links = Array.from(document.querySelectorAll<HTMLAnchorElement>("[data-nav-link]"));
    const sections = links
      .map((a) => document.getElementById(a.hash.slice(1)))
      .filter((s): s is HTMLElement => Boolean(s));
    const active = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          links.forEach((a) => {
            if (a.hash === `#${entry.target.id}`) a.setAttribute("aria-current", "location");
            else a.removeAttribute("aria-current");
          });
        }),
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((s) => active.observe(s));
    cleanups.push(() => active.disconnect());

    // Cabeçalho depois do topo.
    const header = document.querySelector<HTMLElement>("[data-site-header]");
    const onScroll = () => header?.toggleAttribute("data-scrolled", scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    cleanups.push(() => window.removeEventListener("scroll", onScroll));

    // Brilho que segue o mouse.
    const glow = document.querySelector<HTMLElement>("[data-pointer-glow]");
    if (glow && matchMedia("(pointer: fine)").matches && root.classList.contains("js-motion")) {
      let raf = 0;
      const onMove = (event: PointerEvent) => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          glow.style.setProperty("--gx", `${event.clientX}px`);
          glow.style.setProperty("--gy", `${event.clientY}px`);
        });
      };
      window.addEventListener("pointermove", onMove, { passive: true });
      cleanups.push(() => {
        cancelAnimationFrame(raf);
        window.removeEventListener("pointermove", onMove);
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return <div data-pointer-glow aria-hidden="true" className="pointer-glow" />;
}
