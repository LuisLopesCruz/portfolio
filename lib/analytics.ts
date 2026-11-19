/**
 * Medição de uso com Amplitude, ligada só depois que o visitante aceita os cookies.
 *
 * A Vercel Web Analytics continua contando visitas sem cookies para todo mundo.
 * O Amplitude acrescenta cliques, caminho dentro do site, retorno e cidade/estado,
 * mas guarda um identificador no navegador: por isso só carrega com o "Aceitar".
 */

/** Chave pública do projeto no Amplitude (fica no código do site por natureza; não é segredo). */
export const AMPLITUDE_API_KEY = "0ff86441d30d6ffbb7abb5aa482b348d";

const CONSENT_KEY = "analytics-consent";
export const OPEN_PREFERENCES_EVENT = "open-cookie-preferences";

export type Consent = "granted" | "denied";

export function readConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const { value } = JSON.parse(raw) as { value?: string };
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

export function saveConsent(value: Consent) {
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ value, at: new Date().toISOString() }));
  } catch {
    /* navegador sem armazenamento: o aviso volta na próxima visita */
  }
}

let started: Promise<typeof import("@amplitude/analytics-browser") | null> | null = null;

/** Carrega e inicia o Amplitude (uma vez). Sem chave configurada, não faz nada. */
export function startAmplitude() {
  if (!AMPLITUDE_API_KEY) return Promise.resolve(null);
  if (!started) {
    started = import("@amplitude/analytics-browser").then((amplitude) => {
      amplitude.init(AMPLITUDE_API_KEY, {
        autocapture: {
          attribution: true,
          pageViews: true,
          sessions: true,
          formInteractions: false,
          fileDownloads: true,
          elementInteractions: true,
        },
      });
      return amplitude;
    });
  }
  return started;
}

/**
 * Desliga a coleta e apaga o identificador do Amplitude neste navegador.
 * Se o Amplitude já estava rodando, recarrega a página: assim ele não volta a
 * gravar o identificador, e a nova página abre sem ele.
 */
export async function stopAmplitude() {
  const amplitude = await (started ?? Promise.resolve(null));
  if (amplitude) amplitude.setOptOut(true);
  clearAmplitudeStorage();
  if (amplitude) location.reload();
}

/** Apaga o que o Amplitude tiver deixado neste navegador. */
export function clearAmplitudeStorage() {
  try {
    for (const key of Object.keys(localStorage)) if (key.startsWith("AMP_")) localStorage.removeItem(key);
    for (const c of document.cookie.split(";")) {
      const name = c.split("=")[0].trim();
      if (name.startsWith("AMP_")) document.cookie = `${name}=; Max-Age=0; path=/`;
    }
  } catch {
    /* nada a limpar */
  }
}

/** Canal de contato de um link, para o evento "Contato clicado". */
export function contactChannel(href: string): string | null {
  if (href.startsWith("mailto:")) return "e-mail";
  if (href.includes("linkedin.com")) return "LinkedIn";
  if (href.includes("github.com")) return "GitHub";
  return null;
}
