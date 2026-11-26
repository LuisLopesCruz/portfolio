"use client";

import { useEffect, useRef } from "react";

/**
 * Hero de partículas: esfera → explosão → rede do método → explosão → esfera, em loop.
 *
 * A rede mostra o método: nó central "AI SYSTEMS BUILDER" ligado às etapas de
 * "Como trabalho", que formam um anel fechado (a última volta para a primeira),
 * com pulsos de luz no sentido das etapas. Os pontos fogem do mouse e a cena
 * inclina conforme o cursor.
 *
 * O componente ocupa o lugar do visual na grade do hero (a "âncora"), mas o
 * canvas cobre o hero inteiro, atrás do texto: assim a explosão não é cortada.
 * Decorativo (aria-hidden) e sem cliques (pointer-events: none), para não
 * atrapalhar os botões. Só começa depois do carregamento e com o navegador
 * ocioso, para com o hero fora da tela ou a aba oculta e, com "reduzir
 * movimento", mostra a rede parada.
 */

const CENTER_LABEL = ["AI SYSTEMS", "BUILDER"];
const TIMELINE = [
  { shape: "sphere", dur: 4200 },
  { shape: "dust", dur: 1000 },
  { shape: "network", dur: 6500 },
  { shape: "dust", dur: 900 },
] as const;
type ShapeName = (typeof TIMELINE)[number]["shape"];
const PARTICLES_DESKTOP = 2600;
const PARTICLES_MOBILE = 1300;
const MOBILE_MAX = 860;
const MOUSE_RADIUS = 90;
const LEVELS = 8;

type Vec = [number, number, number];
type Particle = { x: number; y: number; z: number; i: number; k: number; ox: number; oy: number; sz: number; hi: boolean };
// Velocidades de aproximação em poucos níveis: a conta pesada sai uma vez por nível, não por ponto.
const SPEEDS = Array.from({ length: 8 }, (_, l) => 0.035 + (0.05 * (l + 0.5)) / 8);
type Node = { label: string[]; p: Vec; s: number; main: boolean };

/** Lê uma cor do tema (variável CSS em hex) como "r,g,b". */
function cssRgb(style: CSSStyleDeclaration, name: string, fallback: string) {
  const hex = style.getPropertyValue(name).trim().replace("#", "");
  const full = hex.length === 3 ? hex.replace(/./g, (c) => c + c) : hex;
  if (!/^[0-9a-f]{6}$/i.test(full)) return fallback;
  const n = parseInt(full, 16);
  return `${(n >> 16) & 255},${(n >> 8) & 255},${n & 255}`;
}

export default function HeroParticles({ steps }: { steps: string[] }) {
  const anchorRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stepsKey = steps.join("|");

  useEffect(() => {
    const anchor = anchorRef.current;
    const cv = canvasRef.current;
    if (!anchor || !cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const labels = stepsKey.split("|");
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = getComputedStyle(document.documentElement);
    const COLOR = cssRgb(root, "--accent", "79,176,198");
    const NUMBER = cssRgb(root, "--cyan", "123,232,220");
    const HIGHLIGHT = cssRgb(root, "--accent-strong", "132,207,223");
    const TEXT = cssRgb(root, "--text", "238,242,243");
    const BG = cssRgb(root, "--bg", "7,9,12");
    const mono = root.getPropertyValue("--font-dm-mono").trim() || "ui-monospace, monospace";

    // ---------- tamanho e posição ----------
    let W = 0, H = 0, cx = 0, cy = 0, R = 1, mobile = false;
    function resize() {
      // No celular, no máximo 1,5x de resolução: menos pixels para pintar a cada quadro.
      const dpr = Math.min(window.devicePixelRatio || 1, window.innerWidth < MOBILE_MAX ? 1.5 : 2);
      W = cv!.clientWidth;
      H = cv!.clientHeight;
      cv!.width = Math.round(W * dpr);
      cv!.height = Math.round(H * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      mobile = window.innerWidth < MOBILE_MAX;
      const c = cv!.getBoundingClientRect();
      const a = anchor!.getBoundingClientRect();
      cx = a.left - c.left + a.width / 2;
      cy = a.top - c.top + a.height / 2;
      R = Math.max(40, Math.min(a.width * (mobile ? 0.31 : 0.33), a.height * (mobile ? 0.32 : 0.29)));
    }

    // Monta as formas e as partículas só quando o navegador fica ocioso, depois do carregamento,
    // para não pesar no carregamento da página.
    async function build() {
      resize();
      const N = mobile ? PARTICLES_MOBILE : PARTICLES_DESKTOP;
      const rnd = Math.random;
      const gauss = () => (rnd() + rnd() + rnd() - 1.5) / 1.5;
      const shuffle = <T,>(a: T[]) => {
        for (let i = a.length - 1; i > 0; i--) {
          const j = (rnd() * (i + 1)) | 0;
          [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
      };

      // ---------- formas ----------
      const sphere: Vec[] = [];
      const golden = Math.PI * (3 - Math.sqrt(5));
      for (let i = 0; i < N; i++) {
        const y = 1 - (2 * (i + 0.5)) / N, r = Math.sqrt(1 - y * y), t = golden * i;
        sphere.push([Math.cos(t) * r, y, Math.sin(t) * r]);
      }
      const dust: Vec[] = sphere.map(([x, y, z]) => {
        const k = 1.5 + rnd();
        return [x * k + gauss() * 0.3, y * k + gauss() * 0.3, z * k + gauss() * 0.3];
      });

      // Rede: nó central + etapas em anel.
      // Cede a vez ao navegador entre as etapas, para nenhuma virar uma tarefa longa.
      await nextIdle();
      if (!alive) return null;

      const nodes: Node[] = [{ label: CENTER_LABEL, p: [0, 0, 0], s: 0.24, main: true }];
      labels.forEach((label, k, arr) => {
        const a = -Math.PI / 2 + (k * 2 * Math.PI) / arr.length;
        nodes.push({ label: [label], p: [Math.cos(a) * 1.3, Math.sin(a) * 1.0, Math.sin(a * 2) * 0.35], s: 0.11, main: false });
      });
      const edges: [number, number][] = [];
      for (let k = 1; k < nodes.length; k++) {
        edges.push([0, k]);
        edges.push([k, k === nodes.length - 1 ? 1 : k + 1]);
      }
      const inCluster = (n: Node): Vec => {
        const d = [gauss(), gauss(), gauss()], l = Math.hypot(d[0], d[1], d[2]) || 1, r = n.s * Math.cbrt(rnd());
        return [n.p[0] + (d[0] / l) * r, n.p[1] + (d[1] / l) * r, n.p[2] + (d[2] / l) * r];
      };
      const network: Vec[] = [];
      const nCenter = Math.round(N * 0.1), nNode = Math.round(N * 0.04);
      for (let i = 0; i < nCenter; i++) network.push(inCluster(nodes[0]));
      for (let k = 1; k < nodes.length; k++) for (let i = 0; i < nNode; i++) network.push(inCluster(nodes[k]));
      let e = 0;
      while (network.length < N) {
        const [a, b] = edges[e++ % edges.length], t = rnd(), A = nodes[a].p, B = nodes[b].p, j = 0.025;
        network.push([A[0] + (B[0] - A[0]) * t + gauss() * j, A[1] + (B[1] - A[1]) * t + gauss() * j, A[2] + (B[2] - A[2]) * t + gauss() * j]);
      }
      shuffle(network);
      const SHAPES: Record<ShapeName, Vec[]> = { sphere, dust, network };

      await nextIdle();
      if (!alive) return null;

      // ---------- partículas ----------
      const P: Particle[] = sphere.map(([x, y, z], i) => ({
        x: x * 2.4, y: y * 2.4, z: z * 2.4, // começa disperso e se junta na esfera
        i, k: (rnd() * SPEEDS.length) | 0, ox: 0, oy: 0, sz: rnd() * 0.9, hi: rnd() < 0.06,
      }));

      // ---------- estado ----------
      let step = 0, stepStart = performance.now();
      let shape: ShapeName = "sphere";
      let netA = 0, coreA = 0, yaw = 0, pitch = -0.18;

      const project = (x: number, y: number, z: number, cY: number, sY: number, cX: number, sX: number) => {
        const x1 = x * cY - z * sY, z1 = x * sY + z * cY;
        const y1 = y * cX - z1 * sX, z2 = y * sX + z1 * cX;
        const ps = 3.2 / (3.2 + z2);
        return [cx + x1 * R * ps, cy + y1 * R * ps, z2, ps] as const;
      };

      // Baldes de cor/alfa para desenhar em lote.
      const buckets: number[][] = Array.from({ length: LEVELS * 2 }, () => []);
      const styles: string[] = [];
      for (let h = 0; h < 2; h++)
        for (let l = 0; l < LEVELS; l++) styles.push(`rgba(${h ? HIGHLIGHT : COLOR},${(0.12 + 0.88 * (l / (LEVELS - 1))).toFixed(3)})`);

      // Texto com contorno escuro, sem sair da tela.
      const label = (t: string, x: number, y: number) => {
        const half = ctx!.measureText(t).width / 2 + 6;
        const xx = Math.min(Math.max(x, half), W - half);
        ctx!.strokeText(t, xx, y);
        ctx!.fillText(t, xx, y);
      };

      let last = performance.now();
      function frame(now: number) {
        const dt = Math.min(now - last, 50);
        last = now;

        if (!reduce && now - stepStart > TIMELINE[step].dur) {
          step = (step + 1) % TIMELINE.length;
          stepStart = now;
          shape = TIMELINE[step].shape;
        }
        const target = SHAPES[shape];
        const inNet = shape === "network" && (reduce || now - stepStart > 900);
        netA += ((inNet ? 1 : 0) - netA) * (1 - Math.pow(0.9, dt / 16.7));

        // Na rede, gira até ficar de frente e só oscila de leve, para ler os rótulos.
        if (shape === "network") {
          const front = Math.round(yaw / (2 * Math.PI)) * 2 * Math.PI;
          yaw += (front - yaw) * (1 - Math.pow(0.96, dt / 16.7));
        } else {
          yaw += 0.00022 * dt;
        }
        const yawT = yaw + Math.sin(now * 0.0004) * 0.3 * netA + mouse.nx * 0.35;
        pitch += (-0.18 + mouse.ny * 0.2 - pitch) * 0.05;
        const cY = Math.cos(yawT), sY = Math.sin(yawT), cX = Math.cos(pitch), sX = Math.sin(pitch);

        ctx!.clearRect(0, 0, W, H);
        ctx!.globalCompositeOperation = "lighter";

        // Linhas, pulsos e rótulos da rede.
        if (netA > 0.01) {
          const pn = nodes.map((n) => project(n.p[0], n.p[1], n.p[2], cY, sY, cX, sX));
          ctx!.lineWidth = 1;
          edges.forEach(([a, b], idx) => {
            const A = pn[a], B = pn[b];
            ctx!.strokeStyle = `rgba(${COLOR},${(0.16 * netA).toFixed(3)})`;
            ctx!.beginPath();
            ctx!.moveTo(A[0], A[1]);
            ctx!.lineTo(B[0], B[1]);
            ctx!.stroke();
            const t = (now * 0.00035 + idx * 0.137) % 1;
            const px = A[0] + (B[0] - A[0]) * t, py = A[1] + (B[1] - A[1]) * t;
            ctx!.fillStyle = `rgba(${HIGHLIGHT},${(0.18 * netA).toFixed(3)})`;
            ctx!.beginPath();
            ctx!.arc(px, py, 5, 0, 6.283);
            ctx!.fill();
            ctx!.fillStyle = `rgba(${HIGHLIGHT},${(0.9 * netA).toFixed(3)})`;
            ctx!.beginPath();
            ctx!.arc(px, py, 1.6, 0, 6.283);
            ctx!.fill();
          });
          ctx!.globalCompositeOperation = "source-over";
          ctx!.textAlign = "center";
          ctx!.lineJoin = "round";
          ctx!.strokeStyle = `rgba(${BG},${(0.9 * netA).toFixed(3)})`;
          ctx!.lineWidth = 5;
          nodes.forEach((n, k) => {
            const [x, y, , ps] = pn[k];
            if (n.main) return; // o nome do centro é desenhado sempre, por cima de tudo
            const [num, ...rest] = n.label[0].split(" ");
            const yy = y + n.s * R * ps + 18;
            ctx!.font = `500 10px ${mono}`;
            ctx!.fillStyle = `rgba(${NUMBER},${(0.95 * netA).toFixed(3)})`;
            label(num, x, yy);
            ctx!.font = `500 ${mobile ? 10 : 11}px ${mono}`;
            ctx!.fillStyle = `rgba(${TEXT},${(0.85 * netA).toFixed(3)})`;
            label(rest.join(" ").toUpperCase(), x, yy + 14);
          });
          ctx!.globalCompositeOperation = "lighter";
        }

        // Partículas.
        for (const b of buckets) b.length = 0;
        const approach = SPEEDS.map((k) => 1 - Math.pow(1 - k, dt / 16.7));
        const mouseOn = mouse.x > -1000;
        const MR2 = MOUSE_RADIUS * MOUSE_RADIUS;
        for (const p of P) {
          const t = target[p.i];
          const f = approach[p.k];
          p.x += (t[0] - p.x) * f;
          p.y += (t[1] - p.y) * f;
          p.z += (t[2] - p.z) * f;

          const x1 = p.x * cY - p.z * sY, z1 = p.x * sY + p.z * cY;
          const y1 = p.y * cX - z1 * sX, z2 = p.y * sX + z1 * cX;
          if (z2 < -2.4) continue; // perto demais da câmera
          const ps = Math.min(3.2 / (3.2 + z2), 1.8);
          let sx = cx + x1 * R * ps, sy = cy + y1 * R * ps;

          // Foge do mouse.
          if (mouseOn) {
            const dx = sx + p.ox - mouse.x, dy = sy + p.oy - mouse.y, d2 = dx * dx + dy * dy;
            if (d2 < MR2 && d2 > 0.01) {
              const d = Math.sqrt(d2);
              const push = (MOUSE_RADIUS - d) * 0.05;
              p.ox += (dx / d) * push;
              p.oy += (dy / d) * push;
            }
          }
          p.ox *= 0.92;
          p.oy *= 0.92;
          sx += p.ox;
          sy += p.oy;

          const depth = Math.max(0, Math.min(1, (1.4 - z2) / 2.8));
          const lvl = Math.min(LEVELS - 1, (depth * LEVELS) | 0);
          const s = Math.min((0.8 + p.sz) * ps * (mobile ? 1 : 1.15), 3);
          buckets[(p.hi ? LEVELS : 0) + lvl].push(sx, sy, s);
        }
        for (let b = 0; b < buckets.length; b++) {
          const arr = buckets[b];
          if (!arr.length) continue;
          ctx!.fillStyle = styles[b];
          for (let i = 0; i < arr.length; i += 3) ctx!.fillRect(arr[i] - arr[i + 2] / 2, arr[i + 1] - arr[i + 2] / 2, arr[i + 2], arr[i + 2]);
        }
        ctx!.globalCompositeOperation = "source-over";

        // Nome fixo no centro, em todas as fases: dentro da esfera, parado na explosão
        // e como nó central da rede. Os pontos se reorganizam em volta dele.
        coreA += (1 - coreA) * (1 - Math.pow(0.97, dt / 16.7));
        ctx!.textAlign = "center";
        ctx!.lineJoin = "round";
        ctx!.lineWidth = 5;
        ctx!.strokeStyle = `rgba(${BG},${(0.85 * coreA).toFixed(3)})`;
        // Um pouco maior na esfera; volta ao tamanho do nó central quando a rede se forma.
        const grow = 1 + 0.25 * (1 - netA);
        ctx!.font = `500 ${((mobile ? 11 : 13) * grow).toFixed(1)}px ${mono}`;
        ctx!.fillStyle = `rgba(${TEXT},${(0.95 * coreA).toFixed(3)})`;
        const lh = (mobile ? 14 : 16) * grow;
        const core = nodes[0].label;
        core.forEach((t, li) => label(t, cx, cy + 4 + (li - (core.length - 1) / 2) * lh));
      }

      const still = () => {
        // Movimento reduzido: rede parada, sem animação.
        shape = "network";
        P.forEach((p) => {
          const t = network[p.i];
          p.x = t[0];
          p.y = t[1];
          p.z = t[2];
        });
        netA = 1;
        coreA = 1;
        last = performance.now();
        frame(last);
      };

      return { frame, still };
    }
    let scene: Awaited<ReturnType<typeof build>> = null;
    let alive = true, building = false;
    const nextIdle = () => new Promise<void>((r) => idle(r));
    const mouse = { x: -9999, y: -9999, nx: 0, ny: 0 };

    // ---------- loop: só depois do carregamento, para fora da tela ou com a aba oculta ----------
    let ready = false, inView = false, running = false, raf = 0;
    const loop = (now: number) => {
      scene!.frame(now);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || !ready || !inView || document.hidden) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onMove = (ev: PointerEvent) => {
      const r = cv.getBoundingClientRect();
      mouse.x = ev.clientX - r.left;
      mouse.y = ev.clientY - r.top;
      mouse.nx = W ? (mouse.x / W) * 2 - 1 : 0;
      mouse.ny = H ? (mouse.y / H) * 2 - 1 : 0;
    };
    const onOut = (ev: PointerEvent) => {
      if (ev.relatedTarget) return;
      mouse.x = mouse.y = -9999;
      mouse.nx = mouse.ny = 0;
    };
    const visibility = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) start();
      else stop();
    });
    const sizes = new ResizeObserver(() => {
      if (!scene) return;
      resize();
      if (reduce && scene) scene.still();
    });
    const onVisibility = () => (document.hidden ? stop() : start());

    const begin = async () => {
      if (!scene) {
        if (building) return;
        building = true;
        scene = await build();
        building = false;
        if (!alive || !scene) return;
      }
      ready = true;
      if (reduce) {
        scene.still();
        return;
      }
      start();
    };
    const idle = (cb: () => void) => {
      if (typeof window.requestIdleCallback === "function") window.requestIdleCallback(cb, { timeout: 2500 });
      else setTimeout(cb, 1200);
    };
    const onLoad = () => idle(() => void begin());
    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad, { once: true });

    sizes.observe(cv);
    sizes.observe(anchor);
    if (!reduce) {
      visibility.observe(cv);
      document.addEventListener("visibilitychange", onVisibility);
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerout", onOut);
    }

    return () => {
      alive = false;
      stop();
      ready = false;
      visibility.disconnect();
      sizes.disconnect();
      window.removeEventListener("load", onLoad);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerout", onOut);
    };
  }, [stepsKey]);

  return (
    <>
      {/* Âncora: guarda o espaço do visual na grade do hero (acima do texto no celular). */}
      <div ref={anchorRef} aria-hidden="true" className="order-first h-[320px] sm:h-[400px] lg:order-none lg:h-[580px]" />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 block size-full"
      />
    </>
  );
}
