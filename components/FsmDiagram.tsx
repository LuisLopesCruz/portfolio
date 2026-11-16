import type { ReactNode } from "react";
import type { ProjectDiagram } from "@/content/types";

/**
 * Diagrama do FSM 360: a equipe do turno (prefixo) no centro, ligada aos seis
 * domínios que o motor de regras controla. Cores vêm dos tokens do tema, então
 * o desenho acompanha o modo claro e o escuro.
 */
const W = 480;
const NODE_W = 140;
const NODE_H = 44;
const COLS = [12, 170, 328];
const TOP_Y = 22;
const BOTTOM_Y = 234;
const HUB = { x: 110, y: 124, w: 260, h: 52 };

export default function FsmDiagram({ diagram, id }: { diagram: ProjectDiagram; id: string }) {
  const top = diagram.nodes.slice(0, 3);
  const bottom = diagram.nodes.slice(3, 6);
  const titleId = `${id}-title`;
  const hubAnchors = [HUB.x + 50, HUB.x + HUB.w / 2, HUB.x + HUB.w - 50];

  const node = (label: string, i: number, y: number) => {
    const x = COLS[i];
    return (
      <g key={label}>
        <rect
          x={x}
          y={y}
          width={NODE_W}
          height={NODE_H}
          rx={10}
          className="fill-bg stroke-line"
          strokeWidth={1.5}
        />
        <text
          x={x + NODE_W / 2}
          y={y + NODE_H / 2}
          textAnchor="middle"
          dominantBaseline="central"
          className="fill-fg"
          style={{ fontSize: 13.5, fontWeight: 500 }}
        >
          {label}
        </text>
      </g>
    );
  };

  const link = (i: number, fromY: number, toY: number) => {
    const x1 = COLS[i] + NODE_W / 2;
    const x2 = hubAnchors[i];
    const midY = (fromY + toY) / 2;
    return (
      <g key={`${i}-${fromY}`}>
        <path
          d={`M ${x1} ${fromY} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${toY}`}
          fill="none"
          className="stroke-accent"
          strokeWidth={1.5}
          strokeOpacity={0.7}
        />
        <circle cx={x1} cy={fromY} r={3} className="fill-accent" />
        <circle cx={x2} cy={toY} r={3} className="fill-accent" />
      </g>
    );
  };

  return (
    <>
      {/* Celular: versão empilhada, para o texto não encolher demais. */}
      <div role="img" aria-label={diagram.description} className="sm:hidden">
        <div className="rounded-xl bg-accent px-4 py-3 text-center text-on-accent">
          <p className="font-semibold">{diagram.hub}</p>
          <p className="text-xs opacity-85">{diagram.hubCaption}</p>
        </div>
        <div aria-hidden="true" className="mx-auto h-4 w-px bg-accent" />
        <div className="grid grid-cols-2 gap-2">
          {diagram.nodes.map((label) => (
            <div
              key={label}
              className="rounded-lg border border-line bg-bg px-2 py-2 text-center text-sm font-medium text-fg"
            >
              {label}
            </div>
          ))}
        </div>
      </div>
      <FullDiagram diagram={diagram} titleId={titleId} node={node} link={link} top={top} bottom={bottom} />
    </>
  );
}

function FullDiagram({
  diagram,
  titleId,
  node,
  link,
  top,
  bottom,
}: {
  diagram: ProjectDiagram;
  titleId: string;
  node: (label: string, i: number, y: number) => ReactNode;
  link: (i: number, fromY: number, toY: number) => ReactNode;
  top: string[];
  bottom: string[];
}) {
  return (
    <svg
      viewBox={`0 0 ${W} 300`}
      role="img"
      aria-labelledby={titleId}
      className="hidden h-auto w-full font-sans sm:block"
    >
      <title id={titleId}>{diagram.description}</title>
      {top.map((_, i) => link(i, TOP_Y + NODE_H, HUB.y))}
      {bottom.map((_, i) => link(i, BOTTOM_Y, HUB.y + HUB.h))}
      {top.map((label, i) => node(label, i, TOP_Y))}
      {bottom.map((label, i) => node(label, i, BOTTOM_Y))}
      <rect x={HUB.x} y={HUB.y} width={HUB.w} height={HUB.h} rx={12} className="fill-accent" />
      <text
        x={W / 2}
        y={HUB.y + 20}
        textAnchor="middle"
        dominantBaseline="central"
        className="fill-on-accent"
        style={{ fontSize: 16, fontWeight: 600 }}
      >
        {diagram.hub}
      </text>
      <text
        x={W / 2}
        y={HUB.y + 38}
        textAnchor="middle"
        dominantBaseline="central"
        className="fill-on-accent"
        style={{ fontSize: 11.5, opacity: 0.85 }}
      >
        {diagram.hubCaption}
      </text>
    </svg>
  );
}
