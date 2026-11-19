"use client";

import { useEffect, useState } from "react";
import {
  AMPLITUDE_API_KEY,
  OPEN_PREFERENCES_EVENT,
  clearAmplitudeStorage,
  contactChannel,
  readConsent,
  saveConsent,
  startAmplitude,
  stopAmplitude,
  type Consent,
} from "@/lib/analytics";

export interface ConsentText {
  title: string;
  text: string;
  accept: string;
  decline: string;
  close: string;
}

/**
 * Aviso de cookies. Sem resposta, nada do Amplitude carrega. "Aceitar" liga a
 * medição de cliques e cidade; "Recusar" mantém só a contagem anônima da Vercel.
 * O link "Cookies" do rodapé reabre o aviso para mudar a escolha.
 */
export default function CookieConsent({ text }: { text: ConsentText }) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<Consent | null>(null);

  useEffect(() => {
    if (!AMPLITUDE_API_KEY) return;
    const saved = readConsent();
    setCurrent(saved);
    if (saved === "granted") void startAmplitude();
    else if (saved === null) setOpen(true);
    else clearAmplitudeStorage();

    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_PREFERENCES_EVENT, reopen);

    // Cliques nos contatos viram um evento com nome claro, além do clique automático.
    const onClick = (event: MouseEvent) => {
      if (readConsent() !== "granted") return;
      const link = (event.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      const channel = link ? contactChannel(link.href) : null;
      if (!channel) return;
      void startAmplitude().then((amplitude) =>
        amplitude?.track("Contato clicado", { canal: channel, pagina: location.pathname }),
      );
    };
    document.addEventListener("click", onClick, true);
    return () => {
      window.removeEventListener(OPEN_PREFERENCES_EVENT, reopen);
      document.removeEventListener("click", onClick, true);
    };
  }, []);

  if (!AMPLITUDE_API_KEY || !open) return null;

  const choose = (value: Consent) => {
    saveConsent(value);
    setCurrent(value);
    setOpen(false);
    if (value === "granted") void startAmplitude();
    else void stopAmplitude();
  };

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-title"
      className="fixed inset-x-0 bottom-0 z-[70] px-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-6"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-2xl border border-line-strong bg-surface-2/95 p-5 shadow-2xl backdrop-blur sm:flex-row sm:items-center sm:gap-6">
        <div className="min-w-0 flex-1">
          <p id="cookie-title" className="font-mono text-[11px] tracking-[0.14em] text-cyan uppercase">
            {text.title}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted">{text.text}</p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => choose("denied")}
            className="rounded-full border border-line-strong px-4 py-2 text-sm text-fg transition-colors hover:border-accent"
          >
            {text.decline}
          </button>
          <button
            type="button"
            onClick={() => choose("granted")}
            className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-on-accent transition-transform hover:-translate-y-0.5"
          >
            {text.accept}
          </button>
          {current !== null ? (
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={text.close}
              className="rounded-full px-2 text-lg text-muted hover:text-fg"
            >
              ×
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

/** Link do rodapé que reabre o aviso. */
export function CookiePreferencesButton({ label }: { label: string }) {
  if (!AMPLITUDE_API_KEY) return null;
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_PREFERENCES_EVENT))}
      className="font-mono text-[11px] tracking-[0.1em] text-faint uppercase transition-colors hover:text-cyan"
    >
      {label}
    </button>
  );
}
