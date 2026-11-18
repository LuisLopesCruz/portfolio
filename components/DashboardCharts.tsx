"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { COLORS } from "@/lib/dashboard-colors";

/**
 * Gráficos do painel (SVG desenhado à mão, sem biblioteca).
 * Medem a largura real do bloco para o texto não encolher no celular.
 * Cada marca tem dica ao passar o mouse ou focar pelo teclado; os números
 * também ficam numa tabela logo abaixo, então a dica nunca é o único caminho.
 */

type Labels = Record<string, string>;

function useWidth<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setWidth(Math.round(entry.contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, width] as const;
}

/** Marcas do eixo com passo "redondo" (1, 2, 5, 10...) e topo logo acima do máximo. */
function ticks(max: number, count = 4) {
  const raw = max / count;
  const mag = Math.pow(10, Math.floor(Math.log10(raw)));
  const step = [1, 2, 5, 10].map((m) => m * mag).find((s) => s >= raw) ?? 10 * mag;
  const top = Math.ceil(max / step) * step;
  return Array.from({ length: Math.round(top / step) + 1 }, (_, i) => +(i * step).toFixed(6));
}

function useFmt(locale: string) {
  const one = new Intl.NumberFormat(locale, { maximumFractionDigits: 1, minimumFractionDigits: 1 });
  const int = new Intl.NumberFormat(locale, { maximumFractionDigits: 0 });
  const pct = new Intl.NumberFormat(locale, { style: "percent", maximumFractionDigits: 0 });
  const pct1 = new Intl.NumberFormat(locale, { style: "percent", maximumFractionDigits: 1 });
  // 99,5% não vira "100%": só mostra 100% quando é tudo mesmo.
  const share = (v: number) => (v >= 0.995 && v < 1 ? pct1.format(v) : pct.format(v));
  return { one: (v: number) => one.format(v), int: (v: number) => int.format(v), pct: share };
}

/* ---------- moldura comum: legenda, dica e área do gráfico ---------- */

type Tip = { x: number; y: number; title: string; rows: { color: string; label: string; value: string }[] } | null;

function Legend({ items }: { items: { color: string; label: string; kind: "line" | "box" }[] }) {
  return (
    <ul className="mb-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted">
      {items.map((it) => (
        <li key={it.label} className="flex items-center gap-2">
          {it.kind === "line" ? (
            <span aria-hidden="true" className="h-0.5 w-4 rounded-full" style={{ background: it.color }} />
          ) : (
            <span aria-hidden="true" className="size-2.5 rounded-[3px]" style={{ background: it.color }} />
          )}
          {it.label}
        </li>
      ))}
    </ul>
  );
}

function TipBox({ tip, width }: { tip: Tip; width: number }) {
  if (!tip) return null;
  const left = Math.min(Math.max(tip.x, 90), width - 90);
  return (
    <div
      role="status"
      className="pointer-events-none absolute z-10 min-w-40 -translate-x-1/2 -translate-y-full rounded-lg border border-line-strong bg-surface-2/95 px-3 py-2 text-xs shadow-xl backdrop-blur"
      style={{ left, top: tip.y - 10 }}
    >
      <p className="mb-1.5 font-mono text-[10px] tracking-[0.12em] text-faint uppercase">{tip.title}</p>
      {tip.rows.map((r) => (
        <p key={r.label} className="flex items-center justify-between gap-4 leading-6">
          <span className="flex items-center gap-2 text-muted">
            <span aria-hidden="true" className="h-0.5 w-3 rounded-full" style={{ background: r.color }} />
            {r.label}
          </span>
          <strong className="font-semibold text-fg tabular-nums">{r.value}</strong>
        </p>
      ))}
    </div>
  );
}

function Frame({
  height,
  legend,
  children,
}: {
  height: number;
  legend?: ReactNode;
  children: (w: number, setTip: (t: Tip) => void) => ReactNode;
}) {
  const [ref, width] = useWidth<HTMLDivElement>();
  const [tip, setTip] = useState<Tip>(null);
  return (
    <div>
      {legend}
      <div ref={ref} className="relative w-full min-w-0" style={{ height }} onPointerLeave={() => setTip(null)}>
        {width > 0 ? children(width, setTip) : null}
        <TipBox tip={tip} width={width} />
      </div>
    </div>
  );
}

const PAD = { top: 14, right: 56, bottom: 26, left: 34 };

function YAxis({ t, y, w, fmt }: { t: number[]; y: (v: number) => number; w: number; fmt: (v: number) => string }) {
  return (
    <g>
      {t.map((v) => (
        <g key={v}>
          <line x1={PAD.left} x2={w - PAD.right} y1={y(v)} y2={y(v)} stroke={COLORS.grid} strokeWidth={1} />
          <text x={PAD.left - 8} y={y(v)} dy="0.32em" textAnchor="end" fontSize={11} fill={COLORS.axis} className="tabular-nums">
            {fmt(v)}
          </text>
        </g>
      ))}
    </g>
  );
}

/* ---------- 1. DEC x limite (linhas) ---------- */

export function TrendChart({
  data,
  labels,
  locale,
}: {
  data: { year: number; dec: number; limit: number; gross: number }[];
  labels: Labels;
  locale: string;
}) {
  const f = useFmt(locale);
  const height = 300;
  return (
    <Frame
      height={height}
      legend={
        <Legend
          items={[
            { color: COLORS.dec, label: labels.dec, kind: "line" },
            { color: COLORS.excluded, label: labels.gross, kind: "line" },
            { color: COLORS.limit, label: labels.limit, kind: "line" },
          ]}
        />
      }
    >
      {(w, setTip) => {
        const t = ticks(Math.max(...data.map((d) => Math.max(d.gross, d.limit))));
        const max = t[t.length - 1];
        const x = (i: number) => PAD.left + (i / (data.length - 1)) * (w - PAD.left - PAD.right);
        const y = (v: number) => PAD.top + (1 - v / max) * (height - PAD.top - PAD.bottom);
        const path = (k: "dec" | "limit" | "gross") => data.map((d, i) => `${i ? "L" : "M"}${x(i)},${y(d[k])}`).join("");
        const last = data[data.length - 1];
        const peak = data.reduce((a, b) => (b.dec > a.dec ? b : a));
        const peakI = data.indexOf(peak);
        const step = w < 520 ? 3 : 1;
        const show = (i: number) => {
          const d = data[i];
          setTip({
            x: x(i),
            y: y(Math.max(d.gross, d.limit)),
            title: String(d.year),
            rows: [
              { color: COLORS.dec, label: labels.dec, value: `${f.one(d.dec)} h` },
              { color: COLORS.excluded, label: labels.gross, value: `${f.one(d.gross)} h` },
              { color: COLORS.limit, label: labels.limit, value: `${f.one(d.limit)} h` },
            ],
          });
        };
        return (
          <svg width={w} height={height} role="group" aria-label={labels.aria}>
            <YAxis t={t} y={y} w={w} fmt={f.int} />
            {data.map((d, i) =>
              (data.length - 1 - i) % step === 0 ? (
                <text key={d.year} x={x(i)} y={height - 6} textAnchor="middle" fontSize={11} fill={COLORS.axis}>
                  {w < 520 ? `’${String(d.year).slice(2)}` : d.year}
                </text>
              ) : null,
            )}
            <path d={path("limit")} fill="none" stroke={COLORS.limit} strokeWidth={1.5} strokeLinejoin="round" />
            {/* DEC sem expurgo: o regulado somado às horas excluídas. */}
            <path d={path("gross")} fill="none" stroke={COLORS.excluded} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
            <circle cx={x(data.length - 1)} cy={y(last.gross)} r={4.5} fill={COLORS.excluded} stroke={COLORS.surface} strokeWidth={2} />
            <text x={x(data.length - 1) + 9} y={y(last.gross)} dy="0.32em" fontSize={12} fontWeight={700} fill="#eef2f3">
              {f.one(last.gross)} h
            </text>
            <path d={`${path("dec")}L${x(data.length - 1)},${y(0)}L${x(0)},${y(0)}Z`} fill={COLORS.dec} opacity={0.1} />
            <path d={path("dec")} fill="none" stroke={COLORS.dec} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
            {/* Pico e fim, com rótulo. */}
            {[peakI, data.length - 1].map((i) => (
              <g key={i}>
                <circle cx={x(i)} cy={y(data[i].dec)} r={4.5} fill={COLORS.dec} stroke={COLORS.surface} strokeWidth={2} />
                <text
                  x={i === peakI ? x(i) : x(i) + 9}
                  y={i === peakI ? y(data[i].dec) - 12 : y(data[i].dec)}
                  dy={i === peakI ? 0 : "0.32em"}
                  textAnchor={i === peakI ? "middle" : "start"}
                  fontSize={12}
                  fontWeight={700}
                  fill="#eef2f3"
                >
                  {f.one(data[i].dec)} h
                </text>
              </g>
            ))}
            <text x={x(data.length - 1) + 9} y={y(last.limit) - 12} fontSize={11} fill={COLORS.axis}>
              {f.one(last.limit)}
            </text>
            {/* Faixas invisíveis para a dica (maiores que a linha). */}
            {data.map((d, i) => {
              const half = (w - PAD.left - PAD.right) / (data.length - 1) / 2;
              return (
                <rect
                  key={d.year}
                  x={x(i) - half}
                  y={PAD.top}
                  width={half * 2}
                  height={height - PAD.top - PAD.bottom}
                  fill="transparent"
                  tabIndex={0}
                  role="img"
                  aria-label={`${d.year}: ${labels.dec} ${f.one(d.dec)} h, ${labels.gross} ${f.one(d.gross)} h, ${labels.limit} ${f.one(d.limit)} h`}
                  onPointerMove={() => show(i)}
                  onFocus={() => show(i)}
                  onBlur={() => setTip(null)}
                  className="outline-none focus-visible:fill-white/5"
                />
              );
            })}
          </svg>
        );
      }}
    </Frame>
  );
}

/* ---------- 2 e 3. Barras empilhadas: DEC + horas fora do indicador ---------- */

export function StackedChart({
  data,
  labels,
  locale,
  highlight,
  labelAt,
  height = 300,
}: {
  data: { key: string; short: string; dec: number; excluded: number }[];
  labels: Labels;
  locale: string;
  /** Barras em destaque (as demais ficam um pouco mais apagadas). */
  highlight?: string[];
  /** Barras com o total escrito em cima. */
  labelAt?: string[];
  height?: number;
}) {
  const f = useFmt(locale);
  return (
    <Frame
      height={height}
      legend={
        <Legend
          items={[
            { color: COLORS.dec, label: labels.dec, kind: "box" },
            { color: COLORS.excluded, label: labels.excluded, kind: "box" },
          ]}
        />
      }
    >
      {(w, setTip) => {
        const t = ticks(Math.max(...data.map((d) => d.dec + d.excluded)));
        const max = t[t.length - 1];
        const right = 12;
        const band = (w - PAD.left - right) / data.length;
        const bw = Math.min(24, band * 0.62);
        const y = (v: number) => PAD.top + (1 - v / max) * (height - PAD.top - PAD.bottom);
        const base = y(0);
        const step = band < 26 ? 2 : 1;
        const show = (i: number) => {
          const d = data[i];
          setTip({
            x: PAD.left + band * i + band / 2,
            y: y(d.dec + d.excluded),
            title: d.key,
            rows: [
              { color: COLORS.excluded, label: labels.excluded, value: `${f.one(d.excluded)} h` },
              { color: COLORS.dec, label: labels.dec, value: `${f.one(d.dec)} h` },
              { color: "transparent", label: labels.total, value: `${f.one(d.dec + d.excluded)} h` },
            ],
          });
        };
        return (
          <svg width={w} height={height} role="group" aria-label={labels.aria}>
            {t.map((v) => (
              <g key={v}>
                <line x1={PAD.left} x2={w - right} y1={y(v)} y2={y(v)} stroke={COLORS.grid} strokeWidth={1} />
                <text x={PAD.left - 8} y={y(v)} dy="0.32em" textAnchor="end" fontSize={11} fill={COLORS.axis}>
                  {f.int(v)}
                </text>
              </g>
            ))}
            {data.map((d, i) => {
              const cx = PAD.left + band * i + band / 2;
              const x0 = cx - bw / 2;
              const hDec = base - y(d.dec);
              const hExc = base - y(d.excluded);
              const dim = highlight && !highlight.includes(d.key) ? 0.55 : 1;
              const top = y(d.dec + d.excluded);
              const r = Math.min(4, hExc / 2, bw / 2);
              return (
                <g
                  key={d.key}
                  tabIndex={0}
                  role="img"
                  aria-label={`${d.key}: ${labels.dec} ${f.one(d.dec)} h, ${labels.excluded} ${f.one(d.excluded)} h`}
                  onPointerMove={() => show(i)}
                  onFocus={() => show(i)}
                  onBlur={() => setTip(null)}
                  className="group outline-none"
                >
                  <rect x={cx - band / 2} y={PAD.top} width={band} height={base - PAD.top} fill="transparent" />
                  <rect
                    x={x0 - 3}
                    y={top - 3}
                    width={bw + 6}
                    height={base - top + 3}
                    rx={6}
                    fill="#ffffff"
                    opacity={0}
                    className="transition-opacity group-hover:opacity-5 group-focus-visible:opacity-10"
                  />
                  {/* DEC embaixo (base reta) e horas excluídas em cima, com 2px de vão. */}
                  <rect x={x0} y={base - hDec} width={bw} height={Math.max(0, hDec)} fill={COLORS.dec} opacity={dim} />
                  {hExc > 2 ? (
                    <path
                      d={`M${x0},${base - hDec - 2}V${top + r}Q${x0},${top} ${x0 + r},${top}H${x0 + bw - r}Q${x0 + bw},${top} ${x0 + bw},${top + r}V${base - hDec - 2}Z`}
                      fill={COLORS.excluded}
                      opacity={dim}
                    />
                  ) : null}
                  {labelAt?.includes(d.key) ? (
                    <text x={cx} y={top - 7} textAnchor="middle" fontSize={11} fontWeight={700} fill="#eef2f3">
                      {f.one(d.dec + d.excluded)}
                    </text>
                  ) : null}
                  {(data.length - 1 - i) % step === 0 ? (
                    <text x={cx} y={height - 6} textAnchor="middle" fontSize={11} fill={COLORS.axis}>
                      {d.short}
                    </text>
                  ) : null}
                </g>
              );
            })}
          </svg>
        );
      }}
    </Frame>
  );
}

/* ---------- 4. Fatia dos consumidores acima do limite (uma série) ---------- */

export function ShareChart({
  data,
  labels,
  locale,
}: {
  data: { year: number; share: number }[];
  labels: Labels;
  locale: string;
}) {
  const f = useFmt(locale);
  const height = 260;
  return (
    <Frame height={height}>
      {(w, setTip) => {
        const t = [0, 0.25, 0.5, 0.75, 1];
        const x = (i: number) => PAD.left + (i / (data.length - 1)) * (w - PAD.left - PAD.right);
        const y = (v: number) => PAD.top + (1 - v) * (height - PAD.top - PAD.bottom);
        const line = data.map((d, i) => `${i ? "L" : "M"}${x(i)},${y(d.share)}`).join("");
        const peakI = data.reduce((bi, d, i) => (d.share > data[bi].share ? i : bi), 0);
        const lastI = data.length - 1;
        const step = w < 520 ? 3 : 2;
        const show = (i: number) =>
          setTip({
            x: x(i),
            y: y(data[i].share),
            title: String(data[i].year),
            rows: [{ color: COLORS.dec, label: labels.share, value: f.pct(data[i].share) }],
          });
        return (
          <svg width={w} height={height} role="group" aria-label={labels.aria}>
            {t.map((v) => (
              <g key={v}>
                <line x1={PAD.left} x2={w - PAD.right} y1={y(v)} y2={y(v)} stroke={COLORS.grid} strokeWidth={1} />
                <text x={PAD.left - 8} y={y(v)} dy="0.32em" textAnchor="end" fontSize={11} fill={COLORS.axis}>
                  {f.pct(v)}
                </text>
              </g>
            ))}
            {data.map((d, i) =>
              (lastI - i) % step === 0 ? (
                <text key={d.year} x={x(i)} y={height - 6} textAnchor="middle" fontSize={11} fill={COLORS.axis}>
                  {w < 520 ? `’${String(d.year).slice(2)}` : d.year}
                </text>
              ) : null,
            )}
            <path d={`${line}L${x(lastI)},${y(0)}L${x(0)},${y(0)}Z`} fill={COLORS.dec} opacity={0.1} />
            <path d={line} fill="none" stroke={COLORS.dec} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
            {[peakI, lastI].map((i) => (
              <g key={i}>
                <circle cx={x(i)} cy={y(data[i].share)} r={4.5} fill={COLORS.dec} stroke={COLORS.surface} strokeWidth={2} />
                <text
                  x={i === lastI ? x(i) + 9 : x(i) - 9}
                  y={y(data[i].share)}
                  dy="0.32em"
                  textAnchor={i === lastI ? "start" : "end"}
                  fontSize={12}
                  fontWeight={700}
                  fill="#eef2f3"
                >
                  {f.pct(data[i].share)}
                </text>
              </g>
            ))}
            {data.map((d, i) => {
              const half = (w - PAD.left - PAD.right) / (data.length - 1) / 2;
              return (
                <rect
                  key={d.year}
                  x={x(i) - half}
                  y={PAD.top}
                  width={half * 2}
                  height={height - PAD.top - PAD.bottom}
                  fill="transparent"
                  tabIndex={0}
                  role="img"
                  aria-label={`${d.year}: ${f.pct(d.share)}`}
                  onPointerMove={() => show(i)}
                  onFocus={() => show(i)}
                  onBlur={() => setTip(null)}
                  className="outline-none focus-visible:fill-white/5"
                />
              );
            })}
          </svg>
        );
      }}
    </Frame>
  );
}
