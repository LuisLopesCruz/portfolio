import Image from "next/image";
import { OTHER_WORKS } from "@/content/shared";
import type { Content } from "@/content/types";
import { StatusBadge } from "./ProjectCard";

/** Cartões compactos para trabalhos menores, abaixo dos projetos principais. */
export default function OtherWorks({ content }: { content: Content }) {
  const { otherWorks, projects } = content;
  const textById = new Map(otherWorks.items.map((item) => [item.id, item]));

  return (
    <div data-reveal className="mt-20 sm:mt-24">
      <h3 className="font-mono text-xs tracking-[0.16em] text-cyan uppercase">{otherWorks.title}</h3>
      <ul className="mt-6 grid gap-5 md:grid-cols-2">
        {OTHER_WORKS.map((work) => {
          const text = textById.get(work.id);
          if (!text) return null;
          const internal = typeof work.link !== "string";
          const href = typeof work.link === "string" ? work.link : work.link[content.locale];
          return (
            <li key={work.id}>
              <a
                href={href}
                {...(internal ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface/70 transition-[border-color,transform,box-shadow] duration-500 hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_0_60px_-24px_#4fb0c666]"
              >
                <span className="block overflow-hidden border-b border-line">
                  <Image
                    src={work.image.src}
                    width={work.image.width}
                    height={work.image.height}
                    alt={text.imageAlt}
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="aspect-[16/10] w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </span>
                <span className="flex flex-1 flex-col p-5 sm:p-6">
                  <span className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <span className="text-lg font-extrabold tracking-[-0.03em] text-fg">{text.name}</span>
                    <StatusBadge status={work.status} label={projects.statusLabels[work.status]} />
                  </span>
                  <span className="mt-3 block text-sm leading-relaxed text-muted">{text.description}</span>
                  <span className="mt-5 flex flex-wrap gap-2">
                    {work.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-line bg-surface-2 px-2 py-0.5 font-mono text-[11px] text-fg"
                      >
                        {tech}
                      </span>
                    ))}
                  </span>
                  <span className="mt-auto inline-flex items-center gap-2 pt-6 font-mono text-xs tracking-[0.12em] text-fg uppercase transition-colors group-hover:text-cyan">
                    {otherWorks.openLabel}
                    <span aria-hidden="true">{internal ? "→" : "↗"}</span>
                    {internal ? null : <span className="sr-only">({projects.externalLinkHint})</span>}
                  </span>
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
