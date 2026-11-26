import type { Locale } from "./types";

/**
 * Página "Como este site foi feito": o próprio portfólio como case.
 * Todos os números vêm do repositório e de medições reais; ao atualizar,
 * mude a data junto (CASE_FACTS.asOf e LIGHTHOUSE.date).
 */

export const REPO_URL = "https://github.com/LuisLopesCruz/portfolio";
export const SPEC_URL = `${REPO_URL}/blob/main/PORTFOLIO_SPEC.md`;
export const SITE_LIVE_URL = "https://portfolio-luis-claudio-lopes-da-cruz-projects.vercel.app/";
export const PAGESPEED_URL = `https://pagespeed.web.dev/analysis?url=${encodeURIComponent(SITE_LIVE_URL)}`;

/** Fatos do repositório (git log e PORTFOLIO_SPEC.md). */
export const CASE_FACTS = {
  asOf: "2026-11-25",
  specLines: 366, // versão do primeiro commit, escrita para o Claude Code ler antes de criar qualquer arquivo
  days: 11, // 15 a 25/11/2026
  releases: 21, // commits na branch main, contando o desta página
  languages: 3,
};

/** Mediana de 5 rodadas do Lighthouse 12 no site oficial, em cada formato. */
export const LIGHTHOUSE = {
  date: "2026-11-25",
  runs: 5,
  // Celular: desempenho 88, 95, 95, 96, 92; as outras notas 100 em todas as rodadas.
  mobile: { performance: 95, accessibility: 100, bestPractices: 100, seo: 100 },
  // Desktop: 100 em todas as notas nas 5 rodadas.
  desktop: { performance: 100, accessibility: 100, bestPractices: 100, seo: 100 },
};

export const CASE_BASE: Record<Locale, string> = {
  pt: "/como-este-site-foi-feito",
  en: "/en/how-this-site-was-built",
  es: "/es/como-se-hizo-este-sitio",
};

export function casePath(locale: Locale) {
  return CASE_BASE[locale];
}

export interface CaseText {
  metaTitle: string;
  metaDescription: string;
  footerLink: string;
  back: string;
  eyebrow: string;
  title: string;
  lead: string;
  stats: { specLines: string; days: string; releases: string; languages: string };
  daysUnit: string;
  timeline: { title: string; items: { date: string; title: string; text: string }[] };
  story: { title: string; text: string; steps: { step: string; text: string }[] };
  roles: { title: string; me: { title: string; items: string[] }; ai: { title: string; items: string[] } };
  changes: { title: string; text: string; specLabel: string; nowLabel: string; items: { topic: string; spec: string; now: string }[] };
  quality: {
    title: string;
    method: string;
    check: string;
    mobile: string;
    desktop: string;
    labels: { performance: string; accessibility: string; bestPractices: string; seo: string };
    items: string[];
  };
  stack: { title: string; items: string[]; spec: string; code: string; article: string };
}

const pt: CaseText = {
  metaTitle: "Como este site foi feito",
  metaDescription:
    "O próprio portfólio como case: especificação antes do código, agentes de IA na implementação e qualidade medida.",
  footerLink: "Como este site foi feito",
  back: "Voltar ao início",
  eyebrow: "Case · este portfólio",
  title: "Como este site foi feito",
  lead: "Este portfólio é um dos meus sistemas, feito com o mesmo método dos projetos: a especificação veio antes do código, o Claude Code fez a implementação e cada mudança foi testada e aprovada antes de ir ao ar.",
  stats: {
    specLines: "linhas na especificação inicial, escrita antes do código",
    days: "da primeira versão no ar até esta",
    releases: "entregas publicadas",
    languages: "idiomas, cada um com endereço próprio",
  },
  daysUnit: "dias",
  timeline: {
    title: "Do documento ao ar",
    items: [
      {
        date: "15/11",
        title: "Especificação",
        text: "Objetivo, público, estrutura, regras de conteúdo e critérios de aceite. O que eu ainda não tinha decidido ficou marcado para confirmar, em vez de inventado.",
      },
      {
        date: "15/11",
        title: "Primeira versão no ar",
        text: "Página única em português, inglês e espanhol, com os textos em um arquivo por idioma e publicação automática a cada envio ao GitHub.",
      },
      {
        date: "16/11",
        title: "Redesenho",
        text: "Tema escuro, azul-petróleo com ciano e tipografia Manrope + DM Mono, a partir de uma referência de designer.",
      },
      {
        date: "18/11",
        title: "Provas além dos projetos",
        text: "Painel de continuidade da Enel RJ com dados abertos da ANEEL e um artigo sobre o design system.",
      },
      {
        date: "19/11",
        title: "Projetos e medição",
        text: "Cada projeto com o problema estruturado e as funções principais. Contagem de visitas sem cookies e medição detalhada só com o aceite do visitante.",
      },
      {
        date: "25/11",
        title: "Hero com o método",
        text: "Esfera de partículas que se reorganiza na rede das cinco etapas de como trabalho, e a quinta etapa: Evoluo.",
      },
    ],
  },
  story: {
    title: "O método em um dia: o hero deste site",
    text: "A esfera de partículas do início da página foi feita em 25/11, e o processo seguiu as cinco etapas de como trabalho.",
    steps: [
      { step: "Entendo", text: "Avaliei templates premium de referência. Em vez de comprar um efeito pronto, preferi um protótipo próprio, pensado para o meu conteúdo." },
      { step: "Especifico", text: "Encomendei o protótipo, defini os requisitos e aprovei o pedido antes de passar ao Claude Code: manter o que já funcionava no hero, movimento reduzido, celular, nenhuma biblioteca nova e o desempenho sem queda." },
      { step: "Conduzo a IA", text: "Troquei os projetos da rede pelas etapas do método. A IA sugeriu a quinta etapa, Evoluo, e eu aprovei. O Claude Code implementou." },
      { step: "Valido", text: "Conferi a prévia no ar antes de publicar, com testes nos três idiomas, no celular e no desktop, e o Lighthouse medido." },
      { step: "Evoluo", text: "Depois de ver no ar, pedi o nome fixo no centro da esfera. A montagem das partículas foi dividida para não pesar no celular." },
    ],
  },
  roles: {
    title: "Quem fez o quê",
    me: {
      title: "Eu",
      items: [
        "Defini o objetivo, o público e as regras do conteúdo.",
        "Decidi o que entra e o que sai, e revisei cada texto.",
        "Aprovei cada mudança antes de publicar, as maiores numa prévia.",
      ],
    },
    ai: {
      title: "Claude Code",
      items: [
        "Implementou as páginas, os três idiomas, o painel e as animações.",
        "Testou no navegador, no celular e no desktop, e mediu acessibilidade e desempenho.",
        "Perguntou o que não podia supor, em vez de inventar.",
      ],
    },
  },
  changes: {
    title: "O que mudou no caminho",
    text: "A especificação é o ponto de partida, não uma promessa congelada. Estas decisões mudaram com o uso, e o documento foi atualizado junto.",
    specLabel: "Na especificação",
    nowLabel: "Hoje",
    items: [
      { topic: "Tema", spec: "Claro, com escuro opcional e uma cor de destaque.", now: "Escuro único, azul-petróleo com ciano." },
      { topic: "Método", spec: "Quatro etapas.", now: "Cinco etapas: acompanhar o uso real virou parte do trabalho." },
      { topic: "Conteúdo", spec: "Cinco projetos.", now: "Cinco projetos, outros trabalhos, dois artigos e um painel de dados públicos." },
      { topic: "Medição", spec: "Sem analytics pago.", now: "Contagem sem cookies e, só com aceite, medição gratuita de cliques e cidades." },
    ],
  },
  quality: {
    title: "Qualidade medida",
    method: "Mediana de {runs} rodadas do Lighthouse no site oficial, em {date}. A nota varia de uma rodada para outra.",
    check: "Teste agora no PageSpeed Insights",
    mobile: "Celular",
    desktop: "Desktop",
    labels: { performance: "Desempenho", accessibility: "Acessibilidade", bestPractices: "Boas práticas", seo: "SEO" },
    items: [
      "Contraste AA e navegação completa pelo teclado.",
      "Animações pausam fora da tela e respeitam “reduzir movimento”.",
      "Sem rolagem lateral de 320 a 1.440 pixels de largura.",
      "Nenhum dado real de clientes nas imagens.",
    ],
  },
  stack: {
    title: "Feito com",
    items: ["Next.js", "TypeScript", "Tailwind CSS", "Canvas 2D", "Vercel", "GitHub", "Claude Code"],
    spec: "Ler a especificação",
    code: "Ver o código no GitHub",
    article: "Artigo: da referência ao design system",
  },
};

const en: CaseText = {
  metaTitle: "How this site was built",
  metaDescription:
    "This portfolio as a case study: the spec came before the code, AI agents did the implementation, and quality was measured.",
  footerLink: "How this site was built",
  back: "Back to home",
  eyebrow: "Case study · this portfolio",
  title: "How this site was built",
  lead: "This portfolio is one of my systems, built with the same method as my projects: the spec came before the code, Claude Code did the implementation, and every change was tested and approved before going live.",
  stats: {
    specLines: "lines in the first spec, written before the code",
    days: "from the first live version to this one",
    releases: "releases published",
    languages: "languages, each with its own address",
  },
  daysUnit: "days",
  timeline: {
    title: "From document to live site",
    items: [
      {
        date: "Nov 15",
        title: "Spec",
        text: "Goal, audience, structure, content rules and acceptance criteria. Anything I hadn’t decided yet was flagged to confirm instead of made up.",
      },
      {
        date: "Nov 15",
        title: "First version live",
        text: "A single page in Portuguese, English and Spanish, with the text in one file per language and automatic publishing on every push to GitHub.",
      },
      {
        date: "Nov 16",
        title: "Redesign",
        text: "Dark theme, petrol blue with cyan, and Manrope + DM Mono type, based on a designer’s reference.",
      },
      {
        date: "Nov 18",
        title: "Proof beyond the projects",
        text: "An Enel RJ service continuity dashboard built on ANEEL open data, and an article about the design system.",
      },
      {
        date: "Nov 19",
        title: "Projects and analytics",
        text: "Each project with a structured problem and its main features. Cookieless visit counts, and detailed analytics only after the visitor accepts.",
      },
      {
        date: "Nov 25",
        title: "A hero that shows the method",
        text: "A particle sphere that rearranges into the network of the five steps of how I work, plus the fifth step: I evolve it.",
      },
    ],
  },
  story: {
    title: "The method in one day: this site’s hero",
    text: "The particle sphere at the top of the page was built on Nov 25, and the process followed the five steps of how I work.",
    steps: [
      { step: "Understand", text: "I looked at premium templates for reference. Instead of buying a ready-made effect, I went for my own prototype, designed around my content." },
      { step: "Specify", text: "I commissioned the prototype, set the requirements and approved the brief before handing it to Claude Code: keep what already worked in the hero, reduced motion, mobile, no new libraries, and no drop in performance." },
      { step: "Direct the AI", text: "I swapped the projects in the network for the steps of my method. The AI suggested the fifth step, I evolve it, and I approved it. Claude Code implemented it." },
      { step: "Validate", text: "I checked the live preview before publishing, with tests in all three languages, on phone and desktop, and Lighthouse measured." },
      { step: "Evolve", text: "After seeing it live, I asked for the name to stay fixed at the center of the sphere. The particle setup was split up so it stays light on phones." },
    ],
  },
  roles: {
    title: "Who did what",
    me: {
      title: "Me",
      items: [
        "Set the goal, the audience and the content rules.",
        "Decided what goes in and what stays out, and reviewed every text.",
        "Approved every change before publishing, the bigger ones on a preview.",
      ],
    },
    ai: {
      title: "Claude Code",
      items: [
        "Implemented the pages, the three languages, the dashboard and the animations.",
        "Tested in the browser, on phone and desktop, and measured accessibility and performance.",
        "Asked about anything it couldn’t assume, instead of making it up.",
      ],
    },
  },
  changes: {
    title: "What changed along the way",
    text: "The spec is the starting point, not a frozen promise. These decisions changed with use, and the document was updated with them.",
    specLabel: "In the spec",
    nowLabel: "Today",
    items: [
      { topic: "Theme", spec: "Light, with an optional dark mode and one accent color.", now: "Dark only, petrol blue with cyan." },
      { topic: "Method", spec: "Four steps.", now: "Five steps: following real usage became part of the work." },
      { topic: "Content", spec: "Five projects.", now: "Five projects, other work, two articles and a public-data dashboard." },
      { topic: "Analytics", spec: "No paid analytics.", now: "Cookieless counts and, only with consent, free click and city analytics." },
    ],
  },
  quality: {
    title: "Measured quality",
    method: "Median of {runs} Lighthouse runs on the live site, on {date}. Scores vary from run to run.",
    check: "Test it now on PageSpeed Insights",
    mobile: "Mobile",
    desktop: "Desktop",
    labels: { performance: "Performance", accessibility: "Accessibility", bestPractices: "Best practices", seo: "SEO" },
    items: [
      "AA contrast and full keyboard navigation.",
      "Animations pause off-screen and respect “reduce motion”.",
      "No horizontal scrolling from 320 to 1,440 pixels wide.",
      "No real client data in any image.",
    ],
  },
  stack: {
    title: "Built with",
    items: ["Next.js", "TypeScript", "Tailwind CSS", "Canvas 2D", "Vercel", "GitHub", "Claude Code"],
    spec: "Read the spec",
    code: "See the code on GitHub",
    article: "Article: from reference to design system",
  },
};

const es: CaseText = {
  metaTitle: "Cómo se hizo este sitio",
  metaDescription:
    "Este portafolio como caso: la especificación antes del código, agentes de IA en la implementación y calidad medida.",
  footerLink: "Cómo se hizo este sitio",
  back: "Volver al inicio",
  eyebrow: "Caso · este portafolio",
  title: "Cómo se hizo este sitio",
  lead: "Este portafolio es uno de mis sistemas, hecho con el mismo método que mis proyectos: la especificación llegó antes que el código, Claude Code hizo la implementación y cada cambio se probó y aprobó antes de publicarse.",
  stats: {
    specLines: "líneas en la especificación inicial, escrita antes del código",
    days: "de la primera versión publicada a esta",
    releases: "entregas publicadas",
    languages: "idiomas, cada uno con su propia dirección",
  },
  daysUnit: "días",
  timeline: {
    title: "Del documento a la web",
    items: [
      {
        date: "15/11",
        title: "Especificación",
        text: "Objetivo, público, estructura, reglas de contenido y criterios de aceptación. Lo que aún no había decidido quedó marcado para confirmar, en lugar de inventarse.",
      },
      {
        date: "15/11",
        title: "Primera versión publicada",
        text: "Una sola página en portugués, inglés y español, con los textos en un archivo por idioma y publicación automática en cada envío a GitHub.",
      },
      {
        date: "16/11",
        title: "Rediseño",
        text: "Tema oscuro, azul petróleo con cian y tipografía Manrope + DM Mono, a partir de una referencia de diseñador.",
      },
      {
        date: "18/11",
        title: "Pruebas más allá de los proyectos",
        text: "Panel de continuidad de Enel RJ con datos abiertos de ANEEL y un artículo sobre el design system.",
      },
      {
        date: "19/11",
        title: "Proyectos y medición",
        text: "Cada proyecto con el problema estructurado y sus funciones principales. Conteo de visitas sin cookies y medición detallada solo si el visitante acepta.",
      },
      {
        date: "25/11",
        title: "Un hero que muestra el método",
        text: "Una esfera de partículas que se reorganiza en la red de las cinco etapas de cómo trabajo, y la quinta etapa: Evoluciono.",
      },
    ],
  },
  story: {
    title: "El método en un día: el hero de este sitio",
    text: "La esfera de partículas al inicio de la página se hizo el 25/11, y el proceso siguió las cinco etapas de cómo trabajo.",
    steps: [
      { step: "Entiendo", text: "Evalué plantillas premium como referencia. En lugar de comprar un efecto listo, preferí un prototipo propio, pensado para mi contenido." },
      { step: "Especifico", text: "Encargué el prototipo, definí los requisitos y aprobé el pedido antes de pasarlo a Claude Code: mantener lo que ya funcionaba en el hero, movimiento reducido, móvil, ninguna biblioteca nueva y sin bajar el rendimiento." },
      { step: "Dirijo la IA", text: "Cambié los proyectos de la red por las etapas del método. La IA sugirió la quinta etapa, Evoluciono, y yo la aprobé. Claude Code lo implementó." },
      { step: "Valido", text: "Revisé la vista previa publicada antes de pasarla al sitio oficial, con pruebas en los tres idiomas, en móvil y escritorio, y Lighthouse medido." },
      { step: "Evoluciono", text: "Después de verlo publicado, pedí el nombre fijo en el centro de la esfera. El montaje de las partículas se dividió para no pesar en el móvil." },
    ],
  },
  roles: {
    title: "Quién hizo qué",
    me: {
      title: "Yo",
      items: [
        "Definí el objetivo, el público y las reglas del contenido.",
        "Decidí qué entra y qué sale, y revisé cada texto.",
        "Aprobé cada cambio antes de publicar, los más grandes en una vista previa.",
      ],
    },
    ai: {
      title: "Claude Code",
      items: [
        "Implementó las páginas, los tres idiomas, el panel y las animaciones.",
        "Probó en el navegador, en móvil y en escritorio, y midió accesibilidad y rendimiento.",
        "Preguntó lo que no podía suponer, en lugar de inventarlo.",
      ],
    },
  },
  changes: {
    title: "Qué cambió en el camino",
    text: "La especificación es el punto de partida, no una promesa congelada. Estas decisiones cambiaron con el uso, y el documento se actualizó con ellas.",
    specLabel: "En la especificación",
    nowLabel: "Hoy",
    items: [
      { topic: "Tema", spec: "Claro, con oscuro opcional y un color de acento.", now: "Solo oscuro, azul petróleo con cian." },
      { topic: "Método", spec: "Cuatro etapas.", now: "Cinco etapas: acompañar el uso real pasó a ser parte del trabajo." },
      { topic: "Contenido", spec: "Cinco proyectos.", now: "Cinco proyectos, otros trabajos, dos artículos y un panel de datos públicos." },
      { topic: "Medición", spec: "Sin analytics de pago.", now: "Conteo sin cookies y, solo con aceptación, medición gratuita de clics y ciudades." },
    ],
  },
  quality: {
    title: "Calidad medida",
    method: "Mediana de {runs} ejecuciones de Lighthouse en el sitio oficial, el {date}. La nota varía de una ejecución a otra.",
    check: "Pruébalo ahora en PageSpeed Insights",
    mobile: "Móvil",
    desktop: "Escritorio",
    labels: { performance: "Rendimiento", accessibility: "Accesibilidad", bestPractices: "Buenas prácticas", seo: "SEO" },
    items: [
      "Contraste AA y navegación completa con el teclado.",
      "Las animaciones se pausan fuera de la pantalla y respetan “reducir movimiento”.",
      "Sin desplazamiento lateral de 320 a 1.440 píxeles de ancho.",
      "Ningún dato real de clientes en las imágenes.",
    ],
  },
  stack: {
    title: "Hecho con",
    items: ["Next.js", "TypeScript", "Tailwind CSS", "Canvas 2D", "Vercel", "GitHub", "Claude Code"],
    spec: "Leer la especificación",
    code: "Ver el código en GitHub",
    article: "Artículo: de la referencia al design system",
  },
};

export const CASE: Record<Locale, CaseText> = { pt, en, es };
