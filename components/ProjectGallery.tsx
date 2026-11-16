"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent, type MouseEvent } from "react";

export interface GalleryImage {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
}

export interface GalleryLabels {
  enlarge: string;
  close: string;
  previous: string;
  next: string;
  of: string;
}

/**
 * Imagem principal no cartão, miniaturas das demais e um modal (<dialog>)
 * para ver em tamanho grande e navegar com as setas.
 */
export default function ProjectGallery({
  images,
  labels,
}: {
  images: GalleryImage[];
  labels: GalleryLabels;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  const many = images.length > 1;
  const current = images[index];

  function open(i: number) {
    setIndex(i);
    dialogRef.current?.showModal();
  }

  function close() {
    dialogRef.current?.close();
  }

  function step(delta: number) {
    setIndex((i) => (i + delta + images.length) % images.length);
  }

  function onKeyDown(event: KeyboardEvent<HTMLDialogElement>) {
    if (!many) return;
    if (event.key === "ArrowRight") step(1);
    if (event.key === "ArrowLeft") step(-1);
  }

  // Clique fora da imagem (no fundo escurecido) fecha o modal.
  function onDialogClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === dialogRef.current) close();
  }

  const [first, ...rest] = images;
  // Prints de celular (verticais) aparecem lado a lado, sem imagem principal.
  const phone = first.height > first.width;
  const currentPhone = current.height > current.width;

  return (
    <div>
      {phone ? (
        <ul
          className="grid gap-2"
          style={{ gridTemplateColumns: `repeat(${Math.min(images.length, 4)}, minmax(0, 1fr))` }}
        >
          {images.map((img, i) => (
            <li key={img.src}>
              <button
                type="button"
                onClick={() => open(i)}
                className="group block w-full cursor-zoom-in overflow-hidden rounded-xl border border-line"
              >
                <Image
                  src={img.src}
                  width={img.width}
                  height={img.height}
                  alt={img.alt}
                  sizes="(min-width: 1024px) 140px, (min-width: 768px) 13vw, 33vw"
                  className="h-auto w-full transition-opacity group-hover:opacity-90"
                />
                <span className="sr-only">{labels.enlarge}</span>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <>
          <button
            type="button"
            onClick={() => open(0)}
            className="group block w-full cursor-zoom-in overflow-hidden rounded-xl border border-line"
          >
            <Image
              src={first.src}
              width={first.width}
              height={first.height}
              alt={first.alt}
              sizes="(min-width: 1024px) 420px, (min-width: 768px) 40vw, 100vw"
              className="h-auto w-full transition-opacity group-hover:opacity-90"
            />
            <span className="sr-only">{labels.enlarge}</span>
          </button>

          {rest.length > 0 && (
            <ul className="mt-2 grid grid-cols-2 gap-2">
              {rest.map((img, i) => (
                <li key={img.src}>
                  <button
                    type="button"
                    onClick={() => open(i + 1)}
                    className="group block w-full cursor-zoom-in overflow-hidden rounded-lg border border-line"
                  >
                    <Image
                      src={img.src}
                      width={img.width}
                      height={img.height}
                      alt={img.alt}
                      sizes="(min-width: 1024px) 210px, (min-width: 768px) 20vw, 50vw"
                      className="aspect-[16/10] h-auto w-full object-cover object-left-top transition-opacity group-hover:opacity-90"
                    />
                    <span className="sr-only">{labels.enlarge}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </>
      )}

      <dialog
        ref={dialogRef}
        onKeyDown={onKeyDown}
        onClick={onDialogClick}
        aria-label={current.caption}
        className={`m-auto ${currentPhone ? "w-[min(460px,94vw)]" : "w-[min(1200px,94vw)]"} max-w-none overflow-hidden rounded-2xl border border-line bg-bg p-0 text-fg backdrop:bg-black/75`}
      >
        <figure>
          <div className="bg-surface">
            <Image
              key={current.src}
              src={current.src}
              width={current.width}
              height={current.height}
              alt={current.alt}
              sizes="94vw"
              className="mx-auto h-auto max-h-[78vh] w-auto max-w-full object-contain"
            />
          </div>
          <figcaption className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-4 py-3 sm:px-5">
            <p className="min-w-0 flex-1 text-sm leading-snug text-fg">{current.caption}</p>
            <div className="flex items-center gap-2">
              {many && (
                <>
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    aria-label={labels.previous}
                    className="rounded-lg border border-line px-3 py-1.5 text-sm hover:border-accent hover:text-accent"
                  >
                    <span aria-hidden="true">←</span>
                  </button>
                  <span className="font-mono text-xs text-muted">
                    {index + 1} {labels.of} {images.length}
                  </span>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    aria-label={labels.next}
                    className="rounded-lg border border-line px-3 py-1.5 text-sm hover:border-accent hover:text-accent"
                  >
                    <span aria-hidden="true">→</span>
                  </button>
                </>
              )}
              <button
                type="button"
                onClick={close}
                className="rounded-lg bg-accent px-3 py-1.5 text-sm font-medium text-on-accent hover:bg-accent-strong"
              >
                {labels.close}
              </button>
            </div>
          </figcaption>
        </figure>
      </dialog>
    </div>
  );
}
