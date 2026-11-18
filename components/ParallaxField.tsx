"use client";

import { useEffect, useRef } from "react";

/**
 * Campo de formas em wireframe ao fundo da página, abaixo do hero.
 *
 * Cada forma fica numa profundidade: as de trás são menores, mais apagadas e
 * andam mais devagar ao rolar a página; as da frente, o contrário. Isso cria a
 * sensação de camadas (parallax). Todas giram devagar.
 *
 * Um único canvas fixo atrás do conteúdo. Decorativo (aria-hidden). Só começa
 * depois do carregamento, some no hero (que já tem o próprio visual), para com
 * a aba oculta e não aparece com "reduzir movimento".
 */

type Mesh = { v: [number, number, number][]; e: [number, number][] };

type Shape = {
  mesh: Mesh;
  u: number; // fase inicial do ciclo (0–1)
  loop: number; // a cada quantas telas a forma volta a passar
  x: number; // posição horizontal (fração da largura)
  depth: number; // 0 = fundo, 1 = frente
  size: number; // raio em px antes da profundidade
  ax: number;
  ay: number;
  vx: number; // giro por quadro
  vy: number;
  cyan: boolean;
};

function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/* ---------- malhas (raio 1) ---------- */

function allPairsWithin(v: Mesh["v"], maxDist: number): Mesh["e"] {
  const e: Mesh["e"] = [];
  for (let i = 0; i < v.length; i++)
    for (let j = i + 1; j < v.length; j++) {
      const d = Math.hypot(v[i][0] - v[j][0], v[i][1] - v[j][1], v[i][2] - v[j][2]);
      if (d <= maxDist) e.push([i, j]);
    }
  return e;
}

function normalize(v: Mesh["v"]): Mesh["v"] {
  return v.map(([x, y, z]) => {
    const l = Math.hypot(x, y, z);
    return [x / l, y / l, z / l];
  });
}

const TETRA: Mesh = (() => {
  const v = normalize([
    [1, 1, 1],
    [1, -1, -1],
    [-1, 1, -1],
    [-1, -1, 1],
  ]);
  return { v, e: allPairsWithin(v, 9) };
})();

const OCTA: Mesh = (() => {
  const v: Mesh["v"] = [
    [1, 0, 0],
    [-1, 0, 0],
    [0, 1, 0],
    [0, -1, 0],
    [0, 0, 1],
    [0, 0, -1],
  ];
  return { v, e: allPairsWithin(v, 1.5) };
})();

const CUBE: Mesh = (() => {
  const v: Mesh["v"] = [];
  for (const x of [-1, 1]) for (const y of [-1, 1]) for (const z of [-1, 1]) v.push([x, y, z]);
  const n = normalize(v);
  return { v: n, e: allPairsWithin(n, 1.2) };
})();

const ICOSA: Mesh = (() => {
  const p = (1 + Math.sqrt(5)) / 2;
  const v = normalize([
    [-1, p, 0],
    [1, p, 0],
    [-1, -p, 0],
    [1, -p, 0],
    [0, -1, p],
    [0, 1, p],
    [0, -1, -p],
    [0, 1, -p],
    [p, 0, -1],
    [p, 0, 1],
    [-p, 0, -1],
    [-p, 0, 1],
  ]);
  return { v, e: allPairsWithin(v, 1.1) };
})();

function sphere(lat: number, lon: number): Mesh {
  const v: Mesh["v"] = [];
  const e: Mesh["e"] = [];
  const steps = 20;
  // paralelos
  for (let i = 1; i < lat; i++) {
    const phi = (Math.PI * i) / lat;
    const start = v.length;
    for (let k = 0; k < steps; k++) {
      const t = (2 * Math.PI * k) / steps;
      v.push([Math.sin(phi) * Math.cos(t), Math.cos(phi), Math.sin(phi) * Math.sin(t)]);
      e.push([start + k, start + ((k + 1) % steps)]);
    }
  }
  // meridianos
  for (let j = 0; j < lon; j++) {
    const t = (Math.PI * j) / lon;
    const start = v.length;
    for (let k = 0; k < steps; k++) {
      const phi = (2 * Math.PI * k) / steps;
      v.push([Math.sin(phi) * Math.cos(t), Math.cos(phi), Math.sin(phi) * Math.sin(t)]);
      e.push([start + k, start + ((k + 1) % steps)]);
    }
  }
  return { v, e };
}

function torus(major: number, minor: number, r = 0.36): Mesh {
  const v: Mesh["v"] = [];
  const e: Mesh["e"] = [];
  const R = 1 - r;
  for (let i = 0; i < major; i++) {
    const a = (2 * Math.PI * i) / major;
    for (let j = 0; j < minor; j++) {
      const b = (2 * Math.PI * j) / minor;
      v.push([(R + r * Math.cos(b)) * Math.cos(a), r * Math.sin(b), (R + r * Math.cos(b)) * Math.sin(a)]);
    }
  }
  const id = (i: number, j: number) => (i % major) * minor + (j % minor);
  for (let i = 0; i < major; i++)
    for (let j = 0; j < minor; j++) {
      e.push([id(i, j), id(i + 1, j)]);
      e.push([id(i, j), id(i, j + 1)]);
    }
  return { v, e };
}

const SPHERE = sphere(6, 6);
const TORUS = torus(18, 8);

/* ---------- componente ---------- */

export default function ParallaxField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const small = matchMedia("(max-width: 767px)").matches;
    const rand = seeded(11);
    const meshes = [TETRA, OCTA, CUBE, ICOSA, SPHERE, TORUS, OCTA, TETRA, ICOSA, CUBE];
    const COUNT = small ? 7 : 12;

    const shapes: Shape[] = Array.from({ length: COUNT }, (_, i) => {
      const depth = rand();
      return {
        mesh: meshes[i % meshes.length],
        u: (i + rand() * 0.8) / COUNT,
        loop: 2 + rand() * 1.5,
        // Alterna os lados; algumas chegam perto do meio.
        x: i % 2 === 0 ? 0.04 + rand() * 0.42 : 0.96 - rand() * 0.42,
        depth,
        size: (small ? 55 : 85) + rand() * (small ? 50 : 95),
        ax: rand() * Math.PI * 2,
        ay: rand() * Math.PI * 2,
        vx: (0.0012 + rand() * 0.0025) * (rand() > 0.5 ? 1 : -1),
        vy: (0.0018 + rand() * 0.003) * (rand() > 0.5 ? 1 : -1),
        cyan: i % 3 === 0,
      };
    });

    let width = 0;
    let height = 0;
    let heroEnd = 0;
    let running = false;
    let started = false;
    let frame = 0;
    let last = 0;

    function measure() {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      const hero = document.getElementById("top");
      heroEnd = hero ? hero.offsetTop + hero.offsetHeight : height;
    }

    /** 0 no hero, sobe até 1 conforme o hero sai da tela. */
    function fadeIn(scroll: number) {
      const startAt = heroEnd - height * 0.9;
      const t = (scroll - startAt) / (height * 0.6);
      return Math.max(0, Math.min(1, t));
    }

    function draw() {
      const scroll = window.scrollY;
      const fade = fadeIn(scroll);
      ctx!.clearRect(0, 0, width, height);
      if (fade <= 0) return false;

      // Só a parte da página abaixo do hero conta para o parallax.
      const local = Math.max(0, scroll - (heroEnd - height));

      for (const s of shapes) {
        s.ax += s.vx;
        s.ay += s.vy;
        const speed = 0.25 + s.depth * 0.75; // as de trás andam mais devagar
        const r = s.size * (0.55 + s.depth * 0.75);
        // Cada forma passa pela tela em ciclo, então a densidade não depende
        // do tamanho da página.
        const period = (height + 2 * r) * s.loop;
        const phase = (((s.u * period - local * speed) % period) + period) % period;
        const cy = phase - r;
        if (cy > height + r * 1.6) continue;
        const cx = s.x * width;
        // Fundo: bem fracas, e ainda mais perto do meio, onde fica o texto.
        const nearText = 0.55 + 0.45 * Math.min(1, Math.abs(s.x - 0.5) / 0.35);
        const alpha = fade * (0.12 + s.depth * 0.22) * nearText * (small ? 0.8 : 1);

        const cxr = Math.cos(s.ax);
        const sxr = Math.sin(s.ax);
        const cyr = Math.cos(s.ay);
        const syr = Math.sin(s.ay);
        const pts = s.mesh.v.map(([x, y, z]) => {
          // giro em Y, depois em X
          const x1 = x * cyr + z * syr;
          const z1 = -x * syr + z * cyr;
          const y2 = y * cxr - z1 * sxr;
          const z2 = y * sxr + z1 * cxr;
          const k = 3 / (3 + z2);
          return [cx + x1 * r * k, cy + y2 * r * k, z2] as const;
        });

        const color = s.cyan ? "123,232,220" : "79,176,198";
        ctx!.lineWidth = s.depth > 0.6 ? 1.2 : 0.9;
        // Arestas de trás mais fracas que as da frente.
        for (const back of [true, false]) {
          ctx!.beginPath();
          for (const [a, b] of s.mesh.e) {
            const pa = pts[a];
            const pb = pts[b];
            if (pa[2] + pb[2] > 0 !== back) continue;
            ctx!.moveTo(pa[0], pa[1]);
            ctx!.lineTo(pb[0], pb[1]);
          }
          ctx!.strokeStyle = `rgba(${color},${back ? alpha * 0.4 : alpha})`;
          ctx!.stroke();
        }
      }
      return true;
    }

    function tick(now: number) {
      if (!running) return;
      frame = requestAnimationFrame(tick);
      if (now - last < 33) return; // ~30 quadros por segundo
      last = now;
      if (!draw()) stop();
    }

    function start() {
      if (running || !started || document.hidden) return;
      running = true;
      last = 0;
      frame = requestAnimationFrame(tick);
    }

    function stop() {
      running = false;
      cancelAnimationFrame(frame);
    }

    const onScroll = () => start();
    const onResize = () => {
      measure();
      start();
    };
    const onVisibility = () => (document.hidden ? stop() : start());
    const sizeObserver = new ResizeObserver(() => {
      const hero = document.getElementById("top");
      if (hero) heroEnd = hero.offsetTop + hero.offsetHeight;
    });

    function begin() {
      started = true;
      measure();
      sizeObserver.observe(document.body);
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onResize);
      document.addEventListener("visibilitychange", onVisibility);
      start();
    }

    const onLoad = () => {
      if (typeof window.requestIdleCallback === "function") window.requestIdleCallback(begin, { timeout: 2500 });
      else setTimeout(begin, 1200);
    };
    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad, { once: true });

    return () => {
      stop();
      sizeObserver.disconnect();
      window.removeEventListener("load", onLoad);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 h-full w-full" />;
}
