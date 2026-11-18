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
  lane: number; // coluna da tela em que a forma vive
  slot: number; // posição dentro da coluna (0 .. PER_LANE-1)
  jitter: number; // deslocamento lateral dentro da coluna (−1 a 1)
  scale: number; // tamanho relativo ao máximo da coluna (0–1)
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
    // A tela vira colunas; cada coluna tem uma profundidade (e uma velocidade)
    // própria e um número fixo de formas igualmente espaçadas. Como as formas
    // de uma coluna andam juntas e não saem dela, nunca ficam umas sobre as outras.
    const MAX_LANES = 6;
    const PER_LANE = 3;
    const LANE_DEPTH = [0.2, 0.85, 0.45, 1, 0.3, 0.65];
    const laneOffset = Array.from({ length: MAX_LANES }, () => rand());
    const shapes: Shape[] = Array.from({ length: MAX_LANES * PER_LANE }, (_, i) => {
      const lane = i % MAX_LANES;
      const slot = Math.floor(i / MAX_LANES);
      return {
        mesh: meshes[(lane * 3 + slot * 5) % meshes.length],
        lane,
        slot,
        jitter: rand() * 2 - 1,
        scale: 0.62 + rand() * 0.38,
        ax: rand() * Math.PI * 2,
        ay: rand() * Math.PI * 2,
        vx: (0.0012 + rand() * 0.0025) * (rand() > 0.5 ? 1 : -1),
        vy: (0.0018 + rand() * 0.003) * (rand() > 0.5 ? 1 : -1),
        cyan: i % 3 === 0,
      };
    });

    let width = 0;
    let height = 0;
    let lanes = 2;
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
      // Uma coluna a cada ~260 px: 2 no celular, 5 ou 6 no computador.
      lanes = Math.max(2, Math.min(MAX_LANES, Math.round(width / 260)));
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

      const laneW = width / lanes;
      const rMax = laneW * 0.42; // diâmetro máximo = 84% da coluna: sobra vão entre colunas
      for (const s of shapes) {
        s.ax += s.vx;
        s.ay += s.vy;
        if (s.lane >= lanes) continue;
        const depth = LANE_DEPTH[s.lane];
        const speed = 0.25 + depth * 0.75; // as de trás andam mais devagar
        const r = rMax * s.scale * (0.78 + depth * 0.22);
        // As formas da coluna passam em ciclo, com vão fixo entre elas.
        const period = Math.max(height + 2 * rMax, PER_LANE * (2.6 * rMax));
        const base = (laneOffset[s.lane] + s.slot / PER_LANE) * period;
        const phase = (((base - local * speed) % period) + period) % period;
        const cy = phase - rMax;
        if (cy > height + rMax || cy < -rMax) continue;
        const cx = laneW * (s.lane + 0.5) + s.jitter * (laneW / 2 - r) * 0.6;
        const xf = cx / width;
        // Fundo: bem fracas, e ainda mais perto do meio, onde fica o texto.
        const nearText = 0.55 + 0.45 * Math.min(1, Math.abs(xf - 0.5) / 0.35);
        const alpha = fade * (0.11 + depth * 0.2) * nearText * (small ? 0.8 : 1);

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
          const k = 2 / (3 + z2); // perspectiva leve, sem passar do raio
          return [cx + x1 * r * k, cy + y2 * r * k, z2] as const;
        });

        const color = s.cyan ? "123,232,220" : "79,176,198";
        ctx!.lineWidth = depth > 0.6 ? 1.2 : 0.9;
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
