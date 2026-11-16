import type { Locale, ProjectId, Status } from "./types";

/** Dados que não mudam de idioma: nomes próprios, links, stacks e status. */

export const PERSON = {
  name: "Luis Claudio Lopes da Cruz",
  shortName: "Luis Cruz",
};

export const CONTACT = {
  linkedin: "https://www.linkedin.com/in/luis-claudio-lopes-da-cruz/",
  linkedinDisplay: "linkedin.com/in/luis-claudio-lopes-da-cruz",
  github: "https://github.com/LuisLopesCruz",
  githubDisplay: "github.com/LuisLopesCruz",
  email: "luis.cl.lopes.79@gmail.com",
};

export interface ProjectFacts {
  id: ProjectId;
  name: string;
  status: Status;
  stack: string[];
  link?: string;
  /** Prints em /public/projects/<projeto>/; o primeiro é o principal. Vazio enquanto não chegam. */
  images?: { src: string; width: number; height: number }[];
  /** Recorte legível do primeiro print, mostrado no cartão (prints de tela larga). */
  cover?: { src: string; width: number; height: number };
}

/** Ordem de exibição dos cartões (seção 6 da spec). */
export const PROJECTS: ProjectFacts[] = [
  {
    id: "legno",
    name: "Legno Design ERP",
    status: "inUse",
    cover: { src: "/projects/legno/capa.png", width: 818, height: 511 },
    images: [
      { src: "/projects/legno/cotacao.png", width: 1608, height: 987 },
      { src: "/projects/legno/dashboard.png", width: 1726, height: 996 },
      { src: "/projects/legno/dfc.png", width: 1654, height: 999 },
    ],
    stack: ["Python", "Flask", "React", "Claude API"],
  },
  {
    id: "tempo",
    name: "TEMPO-RJ",
    status: "live",
    stack: ["TypeScript", "Supabase", "PostgreSQL", "Open-Meteo", "Vercel"],
    link: "https://tempo-rj-luis-claudio-lopes-da-cruzs-projects.vercel.app/",
    cover: { src: "/projects/tempo/capa.png", width: 1041, height: 651 },
    images: [
      { src: "/projects/tempo/impacto.png", width: 1041, height: 902 },
      { src: "/projects/tempo/painel.png", width: 1080, height: 560 },
    ],
  },
  {
    id: "fsm360",
    name: "FSM 360",
    status: "inSpecification",
    stack: ["TypeScript", "Next.js", "Expo (React Native)", "Supabase", "SQLite", "PowerSync"],
  },
  {
    id: "ecovox",
    name: "Eco Vox",
    status: "closedBeta",
    images: [
      { src: "/projects/ecovox/inicio.jpg", width: 575, height: 1203 },
      { src: "/projects/ecovox/trilha.jpg", width: 575, height: 1203 },
      { src: "/projects/ecovox/falar.jpg", width: 575, height: 1203 },
      { src: "/projects/ecovox/faixas.jpg", width: 575, height: 1203 },
    ],
    stack: ["TypeScript", "Expo (React Native)", "Supabase", "Azure Speech", "Claude API"],
  },
  {
    id: "lumen",
    name: "Lumen",
    status: "closedBeta",
    images: [
      { src: "/projects/lumen/inicio.jpg", width: 575, height: 1200 },
      { src: "/projects/lumen/livros.jpg", width: 575, height: 1200 },
      { src: "/projects/lumen/plano.jpg", width: 575, height: 1200 },
    ],
    stack: ["TypeScript", "Expo (React Native)", "Supabase", "Claude API"],
  },
];

export const LOCALES: Locale[] = ["pt", "en", "es"];

export const LOCALE_PATHS: Record<Locale, string> = {
  pt: "/",
  en: "/en",
  es: "/es",
};

export const HREFLANG: Record<Locale, string> = {
  pt: "pt-BR",
  en: "en",
  es: "es",
};

/** Ids das seções, iguais nos três idiomas para a troca manter a posição. */
export const SECTION_IDS = {
  hero: "top",
  projects: "projects",
  howIWork: "how-i-work",
  background: "background",
  articles: "articles",
  contact: "contact",
} as const;

/** Pasta dos artigos em cada idioma. */
export const ARTICLE_BASE: Record<Locale, string> = {
  pt: "/artigos",
  en: "/en/articles",
  es: "/es/articulos",
};

export function articlePath(locale: Locale, slug: string) {
  return `${ARTICLE_BASE[locale]}/${slug}`;
}
