export type Locale = "pt" | "en" | "es";

export type ProjectId = "legno" | "tempo" | "fsm360" | "ecovox" | "lumen";

export type OtherWorkId = "site-legno" | "landing-legno" | "revisao-9ano";

export type Status = "inUse" | "live" | "closedBeta" | "inDevelopment" | "inSpecification";

export interface ProjectMetric {
  value: string;
  label: string;
}

export interface ProjectDiagram {
  hub: string;
  hubCaption: string;
  /** Seis domínios: três em cima e três embaixo do centro. */
  nodes: string[];
  /** Descrição do diagrama para leitores de tela. */
  description: string;
}

export interface ProjectText {
  id: ProjectId;
  problem: string;
  /** Três números que dão a escala do projeto. */
  metrics: ProjectMetric[];
  /** Substitui o rótulo "O que faz" (ex.: "O que vai fazer" para projetos em especificação). */
  featuresLabel?: string;
  features: string[];
  /** Uma decisão ou achado que mostra como o projeto foi pensado. */
  highlight: string;
  /** Texto do link, quando o projeto tem link público. */
  linkLabel?: string;
  /** Texto alternativo e legenda de cada print, na mesma ordem de `images` em shared.ts. */
  images?: { alt: string; caption: string }[];
  /** Diagrama mostrado no lugar do print, quando o projeto ainda não tem tela. */
  diagram?: ProjectDiagram;
}

export interface ArticleBlock {
  type: "h2" | "p";
  text: string;
}

export interface Article {
  /** Mesmo id nos três idiomas, para ligar as traduções. */
  id: string;
  /** Endereço do artigo neste idioma. */
  slug: string;
  title: string;
  summary: string;
  /** Data de publicação, AAAA-MM-DD. */
  date: string;
  readingMinutes: number;
  tags: string[];
  body: ArticleBlock[];
}

export interface Content {
  locale: Locale;
  htmlLang: string;
  meta: {
    title: string;
    description: string;
  };
  nav: {
    skipToContent: string;
    sectionsLabel: string;
    projects: string;
    howIWork: string;
    background: string;
    articles: string;
    contact: string;
    languageLabel: string;
    languageNames: Record<Locale, string>;
  };
  hero: {
    eyebrow: string;
    title: string;
    /** Trecho do título destacado com gradiente (precisa existir no título). */
    titleHighlight: string;
    /** Texto dentro da esfera do hero. */
    coreTitle: string;
    coreSubtitle: string;
    subtitle: string;
    ctaProjects: string;
    ctaContact: string;
  };
  projects: {
    title: string;
    problemLabel: string;
    featuresLabel: string;
    stackLabel: string;
    metricsLabel: string;
    highlightLabel: string;
    statusLabels: Record<Status, string>;
    externalLinkHint: string;
    imagePlaceholder: string;
    enlargeImage: string;
    galleryViewAll: string;
    galleryClose: string;
    galleryPrevious: string;
    galleryNext: string;
    galleryOf: string;
    items: ProjectText[];
  };
  /** Trabalhos menores, em cartões compactos abaixo dos projetos. */
  otherWorks: {
    title: string;
    openLabel: string;
    items: { id: OtherWorkId; name: string; description: string; imageAlt: string }[];
  };
  howIWork: {
    title: string;
    steps: { title: string; text: string }[];
  };
  background: {
    title: string;
    /** Quatro números lidos em segundos. */
    stats: { value: string; label: string }[];
    /** Marcos da carreira, do mais antigo ao atual. */
    milestones: { period: string; title: string; text: string }[];
    educationTitle: string;
    education: string[];
  };
  articles: {
    title: string;
    intro: string;
    readLabel: string;
    minutesLabel: string;
    backLabel: string;
    items: Article[];
  };
  contact: {
    title: string;
    text: string;
    linkedinLabel: string;
    githubLabel: string;
    emailLabel: string;
  };
  footer: {
    builtWith: string;
  };
}
