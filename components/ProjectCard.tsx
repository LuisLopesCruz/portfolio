import ProjectGallery from "./ProjectGallery";
import FsmDiagram from "./FsmDiagram";
import type { ProjectFacts } from "@/content/shared";
import type { Content, ProjectText, Status } from "@/content/types";

const ACTIVE_STATUS: Status[] = ["inUse", "live", "closedBeta"];

/** Quantas funcionalidades ficam à vista antes do "Ler mais". */
const VISIBLE_FEATURES = 5;

function Feature({ text }: { text: string }) {
  return (
    <li className="flex gap-3 leading-relaxed text-muted">
      <span aria-hidden="true" className="mt-[0.6em] size-1.5 shrink-0 bg-accent" />
      <span>{text}</span>
    </li>
  );
}

export function StatusBadge({ status, label }: { status: Status; label: string }) {
  const active = ACTIVE_STATUS.includes(status);
  return (
    <span
      className={
        active
          ? "inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1 font-mono text-xs font-medium text-accent"
          : "inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 font-mono text-xs font-medium text-muted"
      }
    >
      <span
        aria-hidden="true"
        className={
          active
            ? "size-1.5 rounded-full bg-accent"
            : "size-1.5 rounded-full border border-current"
        }
      />
      {label}
    </span>
  );
}

function Label({ children }: { children: string }) {
  return (
    <h4 className="font-mono text-xs font-medium tracking-wider text-muted uppercase">{children}</h4>
  );
}

export default function ProjectCard({
  index,
  facts,
  text,
  labels,
}: {
  index: number;
  facts: ProjectFacts;
  text: ProjectText;
  labels: Content["projects"];
}) {
  const headingId = `project-${facts.id}`;
  const number = String(index + 1).padStart(2, "0");

  return (
    <article
      id={`card-${facts.id}`}
      data-anchor
      aria-labelledby={headingId}
      className="grid gap-6 rounded-2xl border border-line bg-surface/70 p-5 transition-[border-color,box-shadow] duration-500 hover:border-accent/40 hover:shadow-[0_0_70px_-24px_#4fb0c666] sm:p-8 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-10"
    >
      <div className="tilt order-last md:order-first md:sticky md:top-28 md:self-start">
        {facts.images?.length ? (
          <ProjectGallery
            images={facts.images.map((img, i) => ({
              ...img,
              alt: text.images?.[i]?.alt ?? facts.name,
              caption: text.images?.[i]?.caption ?? facts.name,
            }))}
            cover={facts.cover}
            labels={{
              enlarge: labels.enlargeImage,
              viewAll: labels.galleryViewAll,
              close: labels.galleryClose,
              previous: labels.galleryPrevious,
              next: labels.galleryNext,
              of: labels.galleryOf,
            }}
          />
        ) : text.diagram ? (
          <div className="placeholder-grid rounded-xl border border-line p-3 sm:p-4">
            <FsmDiagram diagram={text.diagram} id={`diagram-${facts.id}`} />
          </div>
        ) : (
          <div
            aria-hidden="true"
            className="placeholder-grid flex aspect-[16/10] w-full flex-col items-center justify-center gap-2 rounded-xl border border-line"
          >
            <span className="rounded-md bg-bg px-3 py-1 font-mono text-base font-medium text-fg">
              {facts.name}
            </span>
            <span className="rounded bg-bg px-2 font-mono text-xs text-muted">
              {labels.imagePlaceholder}
            </span>
          </div>
        )}
      </div>

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span aria-hidden="true" className="font-mono text-xs tracking-[0.14em] text-cyan">
            {number}
          </span>
          <h3 id={headingId} className="text-3xl font-extrabold tracking-[-0.04em] text-fg">
            {facts.name}
          </h3>
          <StatusBadge status={facts.status} label={labels.statusLabels[facts.status]} />
        </div>

        <div className="mt-6">
          <h4 className="sr-only">{labels.metricsLabel}</h4>
          <dl className="grid gap-2 sm:grid-cols-3 sm:gap-3">
            {text.metrics.map((metric) => (
              <div
                key={metric.label}
                className="flex flex-row-reverse items-baseline justify-end gap-3 rounded-xl border border-line bg-surface-2 px-4 py-2.5 sm:flex-col-reverse sm:items-start sm:gap-1 sm:py-3"
              >
                <dt className="text-xs leading-snug text-muted">{metric.label}</dt>
                <dd
                  className={`shrink-0 font-semibold tracking-tight text-fg ${
                    metric.value.length > 8
                      ? "text-lg leading-tight whitespace-nowrap sm:whitespace-normal lg:text-xl"
                      : "text-xl whitespace-nowrap sm:text-2xl"
                  }`}
                >
                  {metric.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-7 space-y-2">
          <Label>{labels.problemLabel}</Label>
          <p className="text-lg leading-relaxed text-fg">{text.problem}</p>
        </div>

        <div className="mt-7 space-y-3">
          <Label>{text.featuresLabel ?? labels.featuresLabel}</Label>
          <ul className="space-y-2.5">
            {text.features.slice(0, VISIBLE_FEATURES).map((feature) => (
              <Feature key={feature} text={feature} />
            ))}
          </ul>
          {text.features.length > VISIBLE_FEATURES ? (
            // As principais ficam à vista; o resto abre no "Ler mais" (funciona sem JavaScript).
            <details className="group">
              <summary className="inline-flex cursor-pointer list-none items-center gap-2 rounded-full border border-line-strong px-4 py-1.5 font-mono text-[11px] tracking-[0.12em] text-fg uppercase transition-colors hover:border-accent hover:text-cyan [&::-webkit-details-marker]:hidden">
                <span className="group-open:hidden">
                  {labels.readMore} <span className="text-faint">+{text.features.length - VISIBLE_FEATURES}</span>
                </span>
                <span className="hidden group-open:inline">{labels.readLess}</span>
                <span aria-hidden="true" className="transition-transform duration-300 group-open:rotate-180">
                  ↓
                </span>
              </summary>
              <ul className="mt-4 space-y-2.5">
                {text.features.slice(VISIBLE_FEATURES).map((feature) => (
                  <Feature key={feature} text={feature} />
                ))}
              </ul>
            </details>
          ) : null}
        </div>

        <div className="mt-7 rounded-r-xl border-l-2 border-accent bg-accent-soft/60 py-4 pr-4 pl-5">
          <Label>{labels.highlightLabel}</Label>
          <p className="mt-2 leading-relaxed text-fg">{text.highlight}</p>
        </div>

        <div className="mt-7 space-y-3">
          <Label>{labels.stackLabel}</Label>
          <ul className="flex flex-wrap gap-2">
            {facts.stack.map((tech) => (
              <li
                key={tech}
                className="rounded-md border border-line bg-surface-2 px-2.5 py-1 font-mono text-xs text-fg"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>

        {facts.link && text.linkLabel && (
          <a
            href={facts.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-on-accent transition-colors hover:bg-accent-strong"
          >
            {text.linkLabel}
            <span aria-hidden="true">↗</span>
            <span className="sr-only">({labels.externalLinkHint})</span>
          </a>
        )}
      </div>
    </article>
  );
}
