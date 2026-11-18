"use client";

import { useEffect, useRef } from "react";

/**
 * Visual do hero: uma esfera no centro ("AI" / "SYSTEM BUILDER") envolta por
 * órbitas finas em 3D, com partículas correndo por elas.
 *
 * Dois canvas: o de trás desenha a parte das órbitas que passa atrás da esfera,
 * o da frente a parte que passa na frente. A esfera (HTML/CSS) fica entre os dois.
 * Decorativo (aria-hidden). Começa só depois do carregamento, para fora da tela
 * ou com a aba oculta, e desenha um quadro parado com "reduzir movimento".
 */

type Orbit = {
  radius: number; // fração do raio máximo
  rx: number; // inclinação em X
  ry: number; // inclinação em Y
  rz: number; // giro em Z
  alpha: number;
  cyan: boolean;
  particles: { t: number; speed: number; size: number }[];
};

function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export default function SystemVisual({ coreTitle, coreSubtitle }: { coreTitle: string; coreSubtitle: string }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLCanvasElement>(null);
  const frontRef = useRef<HTMLCanvasElement>(null);
  const gridRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const box = boxRef.current;
    const back = backRef.current;
    const front = frontRef.current;
    const grid = gridRef.current;
    if (!box || !back || !front || !grid) return;
    const bctx = back.getContext("2d");
    const fctx = front.getContext("2d");
    const gctx = grid.getContext("2d");
    if (!bctx || !fctx || !gctx) return;

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = matchMedia("(max-width: 639px)").matches;
    const rand = seeded(7);

    const ORBITS = small ? 14 : 22;
    const TRAIL = small ? 2 : 4;
    const SEGMENTS = small ? 60 : 84;
    const orbits: Orbit[] = Array.from({ length: ORBITS }, (_, i) => ({
      radius: 0.55 + rand() * 0.6,
      rx: (rand() - 0.5) * Math.PI,
      ry: (rand() - 0.5) * Math.PI,
      rz: rand() * Math.PI,
      alpha: 0.5 + rand() * 0.5,
      cyan: i % 4 === 0,
      particles: Array.from({ length: i % 3 === 0 ? 3 : 2 }, () => ({
        t: rand() * Math.PI * 2,
        speed: (0.004 + rand() * 0.006) * (rand() > 0.5 ? 1 : -1),
        size: 1.2 + rand() * 1.6,
      })),
    }));

    // Pontos soltos ao fundo (fixos).
    const stars = Array.from({ length: small ? 18 : 34 }, () => ({
      x: rand(),
      y: rand(),
      r: 0.5 + rand() * 1.2,
      a: 0.15 + rand() * 0.35,
    }));

    function sprite(color: string) {
      const c = document.createElement("canvas");
      c.width = c.height = 32;
      const g = c.getContext("2d")!;
      const grad = g.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, color);
      grad.addColorStop(0.22, color);
      grad.addColorStop(1, "rgba(0,0,0,0)");
      g.fillStyle = grad;
      g.fillRect(0, 0, 32, 32);
      return c;
    }
    const glowCyan = sprite("rgba(123,232,220,1)");
    const glowPetrol = sprite("rgba(160,220,232,1)");

    let width = 0;
    let height = 0;
    let rMax = 0;
    let sphereR = 0;
    let spin = 0;
    let globe = 0; // giro próprio da malha na superfície da esfera
    let pulseClock = 0; // ms, para as ondas que saem da esfera
    let gridSize = 0;
    const pointer = { x: 0, y: 0 };
    const tilt = { x: 0, y: 0 };
    let running = false;
    let frame = 0;
    let last = 0;

    function resize() {
      // Os canvas são maiores que o bloco (as órbitas passam das bordas e somem aos poucos).
      const boxRect = box!.getBoundingClientRect();
      const rect = back!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = rect.width;
      height = rect.height;
      for (const [c, ctx] of [
        [back!, bctx!],
        [front!, fctx!],
      ] as const) {
        c.width = Math.round(width * dpr);
        c.height = Math.round(height * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
      rMax = Math.min(boxRect.width, boxRect.height) * 0.5;
      const core = box!.querySelector<HTMLElement>(".system-core");
      sphereR = core ? core.offsetWidth / 2 : 0;
      gridSize = sphereR * 2;
      grid!.width = Math.round(gridSize * dpr);
      grid!.height = Math.round(gridSize * dpr);
      gctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    // Rotação 3D de um ponto (x, y, z) pelos ângulos da órbita e pelo giro global.
    function project(o: Orbit, t: number) {
      let x = Math.cos(t) * o.radius * rMax;
      let y = Math.sin(t) * o.radius * rMax;
      let z = 0;
      // Plano da órbita.
      let c = Math.cos(o.rx), s = Math.sin(o.rx);
      [y, z] = [y * c - z * s, y * s + z * c];
      c = Math.cos(o.ry); s = Math.sin(o.ry);
      [x, z] = [x * c + z * s, -x * s + z * c];
      c = Math.cos(o.rz); s = Math.sin(o.rz);
      [x, y] = [x * c - y * s, x * s + y * c];
      // Giro lento de todo o sistema + inclinação pelo cursor.
      c = Math.cos(spin); s = Math.sin(spin);
      [x, z] = [x * c + z * s, -x * s + z * c];
      c = Math.cos(tilt.y); s = Math.sin(tilt.y);
      [y, z] = [y * c - z * s, y * s + z * c];
      c = Math.cos(tilt.x); s = Math.sin(tilt.x);
      [x, z] = [x * c + z * s, -x * s + z * c];
      const f = rMax * 3.2;
      const k = f / (f - z);
      return { x: width / 2 + x * k, y: height / 2 + y * k, z };
    }

    // Malha de meridianos e paralelos na superfície da esfera, girando.
    // Só a metade da frente, mais fraca perto da borda (dá volume).
    const AXIS_X = 0.34; // inclinação do eixo para o observador
    const AXIS_Z = -0.38; // inclinação do eixo para o lado
    function globePoint(lat: number, lon: number) {
      let x = Math.cos(lat) * Math.sin(lon + globe);
      let y = Math.sin(lat);
      let z = Math.cos(lat) * Math.cos(lon + globe);
      let c = Math.cos(AXIS_X), s = Math.sin(AXIS_X);
      [y, z] = [y * c - z * s, y * s + z * c];
      c = Math.cos(AXIS_Z); s = Math.sin(AXIS_Z);
      [x, y] = [x * c - y * s, x * s + y * c];
      const r = gridSize / 2 - 1;
      return { x: gridSize / 2 + x * r, y: gridSize / 2 - y * r, z };
    }
    function drawGlobe() {
      gctx!.clearRect(0, 0, gridSize, gridSize);
      if (!gridSize) return;
      const lines: { lat: number; lon: number }[][] = [];
      for (let j = 0; j < 12; j++) {
        const lon = (j / 12) * Math.PI * 2;
        lines.push(Array.from({ length: 25 }, (_, i) => ({ lat: -Math.PI / 2 + (i / 24) * Math.PI, lon })));
      }
      for (const lat of [-1, -0.5, 0, 0.5, 1]) {
        lines.push(Array.from({ length: 41 }, (_, i) => ({ lat, lon: (i / 40) * Math.PI * 2 })));
      }
      // Três faixas de profundidade, cada uma num traço só.
      const bands = [
        { min: 0, max: 0.35, alpha: 0.1 },
        { min: 0.35, max: 0.7, alpha: 0.2 },
        { min: 0.7, max: 1.01, alpha: 0.32 },
      ];
      const pts = lines.map((line) => line.map((q) => globePoint(q.lat, q.lon)));
      gctx!.lineWidth = 0.8;
      for (const band of bands) {
        gctx!.beginPath();
        for (const line of pts) {
          for (let i = 0; i < line.length - 1; i++) {
            const z = (line[i].z + line[i + 1].z) / 2;
            if (z < band.min || z >= band.max) continue;
            gctx!.moveTo(line[i].x, line[i].y);
            gctx!.lineTo(line[i + 1].x, line[i + 1].y);
          }
        }
        gctx!.strokeStyle = `rgba(214,248,253,${band.alpha})`;
        gctx!.stroke();
      }
    }

    // Desenha uma órbita em três camadas: atrás, na frente fora da esfera e na
    // frente por cima dela (mais fraca, para não apagar o texto do núcleo).
    function strokeOrbit(o: Orbit, color: string, alphaScale: number) {
      const pts = [];
      for (let i = 0; i <= SEGMENTS; i++) pts.push(project(o, (i / SEGMENTS) * Math.PI * 2));
      const layers = [
        { ctx: bctx!, test: (z: number) => z < 0, width: 0.8, alpha: 0.26 },
        { ctx: fctx!, test: (z: number, over: boolean) => z >= 0 && !over, width: 1, alpha: 0.6 },
        { ctx: fctx!, test: (z: number, over: boolean) => z >= 0 && over, width: 0.8, alpha: 0.16 },
      ];
      const cx = width / 2;
      const cy = height / 2;
      for (const layer of layers) {
        const ctx = layer.ctx;
        ctx.beginPath();
        let drawing = false;
        for (let i = 0; i < SEGMENTS; i++) {
          const a = pts[i];
          const b = pts[i + 1];
          const mx = (a.x + b.x) / 2 - cx;
          const my = (a.y + b.y) / 2 - cy;
          const over = mx * mx + my * my < sphereR * sphereR;
          if (layer.test((a.z + b.z) / 2, over)) {
            if (!drawing) ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            drawing = true;
          } else {
            drawing = false;
          }
        }
        ctx.lineWidth = layer.width;
        ctx.strokeStyle = `rgba(${color},${layer.alpha * alphaScale})`;
        ctx.stroke();
      }
    }

    // Ondas: anéis que nascem na esfera e se abrem até sumir, como um sinal.
    const PULSE_MS = 3600;
    const pulses: Orbit[] = [
      { radius: 0, rx: 1.22, ry: 0.1, rz: 0.28, alpha: 1, cyan: true, particles: [] },
      { radius: 0, rx: -0.5, ry: 1.0, rz: -0.2, alpha: 1, cyan: true, particles: [] },
    ];

    function draw() {
      bctx!.clearRect(0, 0, width, height);
      fctx!.clearRect(0, 0, width, height);

      // Fundo: pontos soltos e eixo vertical pontilhado.
      for (const st of stars) {
        bctx!.globalAlpha = st.a;
        bctx!.fillStyle = "#9fdcea";
        bctx!.beginPath();
        bctx!.arc(st.x * width, st.y * height, st.r, 0, Math.PI * 2);
        bctx!.fill();
      }
      bctx!.globalAlpha = 0.28;
      bctx!.strokeStyle = "#84cfdf";
      bctx!.lineWidth = 1;
      bctx!.setLineDash([2, 7]);
      bctx!.beginPath();
      bctx!.moveTo(width / 2, height * 0.04);
      bctx!.lineTo(width / 2, height * 0.96);
      bctx!.stroke();
      bctx!.setLineDash([]);
      bctx!.globalAlpha = 1;

      // Ondas saindo da esfera.
      if (rMax) {
        pulses.forEach((pulse, i) => {
          const t = ((pulseClock + i * (PULSE_MS / 2)) % PULSE_MS) / PULSE_MS;
          pulse.radius = sphereR / rMax + t * 0.95;
          const fade = Math.pow(1 - t, 1.6) * Math.min(1, t * 8);
          strokeOrbit(pulse, "123,232,220", fade * 1.4);
        });
      }

      // Órbitas, separadas entre trás (z < 0) e frente.
      for (const o of orbits) {
        const color = o.cyan ? "123,232,220" : "132,207,223";
        strokeOrbit(o, color, o.alpha);
        // Partículas na órbita.
        // Cada partícula deixa um rastro curto atrás de si.
        for (const p of o.particles) {
          for (let k = TRAIL; k >= 0; k--) {
            const q = project(o, p.t - p.speed * k * 2.2);
            const ctx = q.z >= 0 ? fctx! : bctx!;
            const dx = q.x - width / 2;
            const dy = q.y - height / 2;
            const overSphere = q.z >= 0 && dx * dx + dy * dy < sphereR * sphereR;
            const fall = 1 - k / (TRAIL + 1);
            const size = p.size * (q.z >= 0 ? 6.5 : 4.5) * (0.45 + 0.55 * fall);
            ctx.globalAlpha = (q.z >= 0 ? (overSphere ? 0.35 : 0.95) : 0.4) * fall * fall;
            ctx.drawImage(o.cyan ? glowCyan : glowPetrol, q.x - size / 2, q.y - size / 2, size, size);
          }
          bctx!.globalAlpha = 1;
          fctx!.globalAlpha = 1;
        }
      }
    }

    function drawAll() {
      draw();
      drawGlobe();
    }

    function tick(now: number) {
      if (!running) return;
      frame = requestAnimationFrame(tick);
      // ~30 quadros por segundo: suave e leve.
      if (now - last < 32) return;
      const dt = Math.min((now - last) / 16.7, 4);
      last = now;
      spin += 0.0026 * dt;
      globe += 0.006 * dt;
      pulseClock += dt * 16.7;
      tilt.x += (pointer.x * 0.5 - tilt.x) * 0.06 * dt;
      tilt.y += (pointer.y * 0.4 - tilt.y) * 0.06 * dt;
      for (const o of orbits) for (const p of o.particles) p.t += p.speed * dt;
      drawAll();
    }

    function start() {
      if (running || reduced) return;
      running = true;
      box!.dataset.paused = "false";
      last = performance.now();
      frame = requestAnimationFrame(tick);
    }

    function stop() {
      running = false;
      box!.dataset.paused = "true";
      cancelAnimationFrame(frame);
    }

    resize();
    drawAll();

    // Só anima depois que a página carregou e o navegador ficou ocioso.
    let ready = false;
    let inView = false;
    const visibility = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView && ready && !document.hidden) start();
      else stop();
    });
    visibility.observe(box);
    const begin = () => {
      ready = true;
      if (inView && !document.hidden) start();
    };
    const idle = (cb: () => void) => {
      if (typeof window.requestIdleCallback === "function") window.requestIdleCallback(cb, { timeout: 2500 });
      else setTimeout(cb, 1200);
    };
    const onLoad = () => idle(begin);
    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad, { once: true });

    const onVisibility = () => (document.hidden || !ready || !inView ? stop() : start());
    const onResize = () => {
      resize();
      drawAll();
    };
    const onPointer = (event: PointerEvent) => {
      const rect = box.getBoundingClientRect();
      pointer.x = (event.clientX - rect.left) / rect.width - 0.5;
      pointer.y = (event.clientY - rect.top) / rect.height - 0.5;
      box.style.setProperty("--px", pointer.x.toFixed(3));
      box.style.setProperty("--py", pointer.y.toFixed(3));
    };
    const onLeave = () => {
      pointer.x = 0;
      pointer.y = 0;
      box.style.setProperty("--px", "0");
      box.style.setProperty("--py", "0");
    };

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("resize", onResize);
    if (!reduced) {
      box.addEventListener("pointermove", onPointer);
      box.addEventListener("pointerleave", onLeave);
    }

    return () => {
      stop();
      visibility.disconnect();
      window.removeEventListener("load", onLoad);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", onResize);
      box.removeEventListener("pointermove", onPointer);
      box.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={boxRef}
      aria-hidden="true"
      data-paused="true"
      className="system-visual relative h-[360px] sm:h-[460px] lg:h-[580px]"
    >
      <canvas ref={backRef} className="system-canvas" />
      <span className="core-glow" />
      <div className="system-stage">
        <span className="system-core">
          <canvas ref={gridRef} className="absolute inset-0 size-full rounded-full" />
          <span className="relative z-10 flex h-full flex-col items-center justify-center text-white">
            <span className="text-[3.25rem] leading-none font-extrabold tracking-[-0.08em] sm:text-[4.25rem]">
              {coreTitle}
            </span>
            <span className="mt-2 font-mono text-[8px] tracking-[0.28em] text-white/80 sm:text-[9.5px]">
              {coreSubtitle}
            </span>
          </span>
        </span>
      </div>
      <canvas ref={frontRef} className="system-canvas pointer-events-none z-20" />
    </div>
  );
}
