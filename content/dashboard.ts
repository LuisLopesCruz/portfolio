import type { Locale } from "./types";

/**
 * Textos do painel de continuidade da Enel RJ. Os números entram por parâmetro.
 * Vocabulário fixo, para o leitor não achar que são coisas diferentes:
 * PT "horas expurgadas" / "DEC sem expurgo"; EN "excluded hours" / "DEC without
 * exclusions"; ES "horas excluidas" / "DEC sin exclusiones".
 */

export interface DashboardNumbers {
  first: number; // ano de pico do DEC (2015)
  last: number; // último ano completo (2025)
  decPeak: string;
  decLast: string;
  decDrop: string; // "71%"
  fecPeak: string;
  fecLast: string;
  fecDrop: string;
  limDecLast: string;
  limFecLast: string;
  withinSince: number; // primeiro ano em que o DEC ficou no limite
  setsAboveLast: number;
  setsLast: number;
  setsAbovePeak: number;
  setsPeak: number;
  consAboveLast: string;
  consAbovePeak: string;
  excludedLast: string;
  excludedGrowth: string; // aumento das horas expurgadas desde o pico do DEC
  worstYear: number; // ano com maior fatia expurgada (2023)
  worstShare: string; // "71%"
  worstExcluded: string;
  worstDec: string;
  seasonShare: string; // "77%"
  ytdDecPrev: string;
  ytdDecCurr: string;
  ytdDecChange: string;
  ytdExcPrev: string;
  ytdExcCurr: string;
  ytdExcChange: string;
  ytdExceedsYear: boolean;
  grossLast: string; // DEC sem expurgo no último ano
  grossRatioLast: string; // quantas vezes o limite
  grossDrop: string; // queda do DEC sem expurgo desde o pico
  grossAlwaysAbove: boolean;
  grossMinYear: number; // melhor ano do DEC sem expurgo depois do pico (2021)
  grossMin: string;
  grossSinceMin: string; // variação do melhor ano até o último
}

export interface DashboardText {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: (n: DashboardNumbers) => string;
  lead: (n: DashboardNumbers) => string;
  back: string;
  kpis: {
    dec: { label: string; note: (n: DashboardNumbers) => string };
    fec: { label: string; note: (n: DashboardNumbers) => string };
    sets: { label: string; note: (n: DashboardNumbers) => string };
    gross: { label: string; note: (n: DashboardNumbers) => string };
  };
  units: { hours: string; interruptions: string; of: string };
  trend: { title: (n: DashboardNumbers) => string; text: (n: DashboardNumbers) => string };
  felt: { title: (n: DashboardNumbers) => string; text: (n: DashboardNumbers) => string };
  ytd: { label: string; title: (n: DashboardNumbers) => string; text: (n: DashboardNumbers) => string };
  season: { title: (n: DashboardNumbers) => string; text: string };
  share: { title: (n: DashboardNumbers) => string; text: (n: DashboardNumbers) => string };
  worst: {
    title: string;
    text: string;
    cols: { set: string; dec: string; limit: string; ratio: string; consumers: string; excluded: string };
  };
  legend: { dec: string; limit: string; excluded: string; share: string; total: string; gross: string };
  table: { show: string; year: string; month: string };
  method: { title: string; items: string[]; sourceLabel: string };
}

export const DASHBOARD_BASE: Record<Locale, string> = {
  pt: "/paineis",
  en: "/en/dashboards",
  es: "/es/paneles",
};

const pt: DashboardText = {
  slug: "continuidade-enel-rj",
  metaTitle: "Continuidade do fornecimento na Enel RJ — painel",
  metaDescription:
    "Painel com os dados abertos da ANEEL sobre DEC e FEC da Enel RJ de 2010 a 2026: o que melhorou, quanto fica expurgado do indicador regulado e onde estão os conjuntos acima do limite.",
  eyebrow: "Painel · dados abertos da ANEEL",
  title: (n) =>
    `A Enel RJ cortou ${n.decDrop} da duração das interrupções em dez anos, mas as horas expurgadas do indicador cresceram ${n.excludedGrowth}`,
  lead: (n) =>
    `O DEC, indicador que a ANEEL usa para cobrar a distribuidora, caiu de ${n.decPeak} h em ${n.first} para ${n.decLast} h em ${n.last} e está dentro do limite. Só que a regra expurga do cálculo as interrupções em dias críticos e situações de emergência. Com essas horas de volta, o DEC de ${n.last} seria ${n.grossLast} h, ${n.grossRatioLast} vezes o limite.`,
  back: "Voltar ao portfólio",
  kpis: {
    dec: {
      label: "DEC regulado",
      note: (n) => `−${n.decDrop} desde ${n.first} · limite ${n.limDecLast} h`,
    },
    fec: {
      label: "FEC regulado",
      note: (n) => `−${n.fecDrop} desde ${n.first} · limite ${n.limFecLast}`,
    },
    sets: {
      label: "Conjuntos acima do limite de DEC",
      note: (n) => `${n.consAboveLast} dos consumidores · eram ${n.setsAbovePeak} de ${n.setsPeak} em ${n.first}`,
    },
    gross: {
      label: "DEC sem expurgo",
      note: (n) => `${n.excludedLast} h expurgadas · ${n.grossRatioLast}× o limite`,
    },
  },
  units: { hours: "h", interruptions: "interrupções", of: "de" },
  trend: {
    title: (n) =>
      n.grossAlwaysAbove
        ? `O DEC regulado cumpre o limite desde ${n.withinSince}; sem o expurgo, ficaria acima dele em todos os anos`
        : `O DEC caiu de ${n.decPeak} h para ${n.decLast} h e está no limite ou abaixo dele desde ${n.withinSince}`,
    text: (n) =>
      `Horas sem energia por consumidor no ano, comparadas ao limite global da ANEEL para a Enel RJ. A linha âmbar soma ao DEC regulado as horas expurgadas: em ${n.last}, seriam ${n.grossLast} h. Com elas, a queda desde ${n.first} seria de ${n.grossDrop}, e não de ${n.decDrop}.`,
  },
  felt: {
    title: (n) =>
      `Para o cliente, o serviço piorou desde ${n.grossMinYear}: as horas sem energia foram de ${n.grossMin} h para ${n.grossLast} h (${n.grossSinceMin})`,
    text: (n) =>
      `Cada barra soma o DEC regulado e as horas expurgadas, que é o que o consumidor sente: para quem fica sem luz, não importa se a causa foi temporal ou falta de manutenção. O indicador regulado seguiu caindo, mas o total subiu. O pior ano foi ${n.worstYear}, com ${n.worstExcluded} h expurgadas contra ${n.worstDec} h no indicador (${n.worstShare} do total).`,
  },
  ytd: {
    label: "2026 até setembro",
    title: (n) =>
      n.ytdExceedsYear
        ? "Em nove meses, 2026 já tem mais horas expurgadas que o ano inteiro de 2025"
        : "2026 segue com mais horas expurgadas que 2025",
    text: (n) =>
      `De janeiro a setembro, o DEC regulado ficou em ${n.ytdDecCurr} h (${n.ytdDecChange} sobre o mesmo período de 2025), enquanto as horas expurgadas subiram de ${n.ytdExcPrev} h para ${n.ytdExcCurr} h (${n.ytdExcChange}).`,
  },
  season: {
    title: (n) => `${n.seasonShare} das horas expurgadas se concentram entre outubro e março`,
    text: "Média por mês de 2021 a 2025. O DEC regulado fica perto de 1 h por mês o ano todo; as horas expurgadas sobem a partir de outubro e têm o pico em novembro e dezembro, no período das chuvas de verão.",
  },
  share: {
    title: (n) =>
      `Consumidores em conjuntos acima do limite: de ${n.consAbovePeak} em ${n.first} para ${n.consAboveLast} em ${n.last}`,
    text: (n) =>
      `Fatia dos clientes atendidos por conjuntos cujo DEC regulado ficou acima do próprio limite. Em ${n.last}, ainda são ${n.setsAboveLast} de ${n.setsLast} conjuntos.`,
  },
  worst: {
    title: "Onde está o problema em 2025",
    text: "Os cinco conjuntos mais acima do próprio limite de DEC. Nos dois primeiros, as horas expurgadas passam de três vezes o DEC regulado.",
    cols: {
      set: "Conjunto",
      dec: "DEC",
      limit: "Limite",
      ratio: "Acima do limite",
      consumers: "Consumidores",
      excluded: "Horas expurgadas",
    },
  },
  legend: {
    dec: "DEC regulado",
    limit: "Limite ANEEL",
    excluded: "Horas expurgadas",
    share: "Consumidores acima do limite",
    total: "Total",
    gross: "DEC sem expurgo",
  },
  table: { show: "Ver os números", year: "Ano", month: "Mês" },
  method: {
    title: "Como ler este painel",
    items: [
      "DEC é a duração equivalente de interrupção por consumidor: quantas horas, em média, cada cliente ficou sem energia no ano. FEC é a frequência: quantas vezes isso aconteceu. Contam interrupções acima de 3 minutos.",
      "O DEC regulado é o que a ANEEL compara com o limite. Pela regra (PRODIST, Módulo 8), ficam fora dele, expurgadas, as interrupções em dias críticos, em situação de emergência, de origem externa ao sistema da distribuidora e as ligadas a racionamento ou ao ONS. O “DEC sem expurgo” é o regulado somado a essas horas.",
      "Os valores são os enviados pela Enel RJ à ANEEL, por conjunto de consumidores e por mês. Para a distribuidora, cada conjunto pesa pelo número de consumidores, e o ano é a soma dos meses. O limite global segue o mesmo peso.",
      "A base pública da ANEEL traz cada linha duplicada; as repetições foram removidas antes do cálculo. 2010 tem menos conjuntos porque a divisão era outra. 2026 vai até setembro.",
    ],
    sourceLabel: "Fonte: ANEEL, Indicadores Coletivos de Continuidade (DEC e FEC), dados abertos, gerados em 5 de novembro de 2026.",
  },
};

const en: DashboardText = {
  slug: "enel-rj-continuity",
  metaTitle: "Power supply continuity at Enel RJ — dashboard",
  metaDescription:
    "A dashboard built on ANEEL open data about Enel RJ's DEC and FEC from 2010 to 2026: what improved, how much is excluded from the regulated indicator and where the sets above the limit are.",
  eyebrow: "Dashboard · ANEEL open data",
  title: (n) =>
    `Enel RJ cut outage duration by ${n.decDrop} in ten years, but the hours excluded from the indicator grew ${n.excludedGrowth}`,
  lead: (n) =>
    `DEC, the indicator Brazil's regulator ANEEL uses to hold the utility accountable, fell from ${n.decPeak} h in ${n.first} to ${n.decLast} h in ${n.last} and is within the limit. But the rules exclude outages on critical days and in emergencies from it. With those hours added back, ${n.last} DEC would be ${n.grossLast} h, ${n.grossRatioLast} times the limit.`,
  back: "Back to portfolio",
  kpis: {
    dec: { label: "Regulated DEC", note: (n) => `−${n.decDrop} since ${n.first} · limit ${n.limDecLast} h` },
    fec: { label: "Regulated FEC", note: (n) => `−${n.fecDrop} since ${n.first} · limit ${n.limFecLast}` },
    sets: {
      label: "Sets above the DEC limit",
      note: (n) => `${n.consAboveLast} of customers · ${n.setsAbovePeak} of ${n.setsPeak} in ${n.first}`,
    },
    gross: {
      label: "DEC without exclusions",
      note: (n) => `${n.excludedLast} h excluded · ${n.grossRatioLast}× the limit`,
    },
  },
  units: { hours: "h", interruptions: "outages", of: "of" },
  trend: {
    title: (n) =>
      n.grossAlwaysAbove
        ? `Regulated DEC has met the limit since ${n.withinSince}; without exclusions, it would be above it every year`
        : `DEC fell from ${n.decPeak} h to ${n.decLast} h and has been at or below the limit since ${n.withinSince}`,
    text: (n) =>
      `Outage hours per customer per year against ANEEL's overall limit for Enel RJ. The amber line adds the excluded hours to the regulated DEC: in ${n.last}, it would be ${n.grossLast} h. With them, the drop since ${n.first} would be ${n.grossDrop}, not ${n.decDrop}.`,
  },
  felt: {
    title: (n) =>
      `For customers, service has worsened since ${n.grossMinYear}: outage hours went from ${n.grossMin} h to ${n.grossLast} h (${n.grossSinceMin})`,
    text: (n) =>
      `Each bar adds the regulated DEC and the excluded hours, which is what customers actually feel: for someone without power, it doesn't matter whether the cause was a storm or poor maintenance. The regulated indicator kept falling, but the total rose. The worst year was ${n.worstYear}, with ${n.worstExcluded} h excluded against ${n.worstDec} h in the indicator (${n.worstShare} of the total).`,
  },
  ytd: {
    label: "2026 through September",
    title: (n) =>
      n.ytdExceedsYear
        ? "In nine months, 2026 already has more excluded hours than all of 2025"
        : "2026 is running ahead of 2025 in excluded hours",
    text: (n) =>
      `From January to September, regulated DEC stood at ${n.ytdDecCurr} h (${n.ytdDecChange} on the same period of 2025), while excluded hours rose from ${n.ytdExcPrev} h to ${n.ytdExcCurr} h (${n.ytdExcChange}).`,
  },
  season: {
    title: (n) => `${n.seasonShare} of excluded hours are concentrated between October and March`,
    text: "Monthly average, 2021 to 2025. Regulated DEC stays close to 1 h a month all year; excluded hours rise from October and peak in November and December, in the summer rainy season.",
  },
  share: {
    title: (n) =>
      `Customers in sets above the limit: from ${n.consAbovePeak} in ${n.first} to ${n.consAboveLast} in ${n.last}`,
    text: (n) =>
      `Share of customers served by sets whose regulated DEC was above their own limit. In ${n.last}, ${n.setsAboveLast} of ${n.setsLast} sets are still above it.`,
  },
  worst: {
    title: "Where the problem is in 2025",
    text: "The five sets furthest above their own DEC limit. In the first two, excluded hours are more than three times the regulated DEC.",
    cols: {
      set: "Set",
      dec: "DEC",
      limit: "Limit",
      ratio: "Above limit",
      consumers: "Customers",
      excluded: "Excluded hours",
    },
  },
  legend: {
    dec: "Regulated DEC",
    limit: "ANEEL limit",
    excluded: "Excluded hours",
    share: "Customers above the limit",
    total: "Total",
    gross: "DEC without exclusions",
  },
  table: { show: "See the numbers", year: "Year", month: "Month" },
  method: {
    title: "How to read this dashboard",
    items: [
      "DEC is the equivalent outage duration per customer: how many hours, on average, each customer was without power in the year. FEC is the frequency: how many times it happened. Outages over 3 minutes count.",
      "Regulated DEC is the one ANEEL compares with the limit. Under the rules (PRODIST, Module 8), it excludes outages on critical days, in emergencies, from causes outside the utility's system and those tied to rationing or the grid operator (ONS). “DEC without exclusions” is the regulated DEC plus those hours.",
      "Values are those Enel RJ reported to ANEEL, by customer set and by month. For the utility, each set is weighted by its number of customers, and the year is the sum of the months. The overall limit uses the same weights.",
      "ANEEL's public dataset has every row duplicated; duplicates were removed before calculating. 2010 has fewer sets because the grouping was different. 2026 runs through September.",
    ],
    sourceLabel: "Source: ANEEL, Collective Continuity Indicators (DEC and FEC), open data, generated on November 5, 2026.",
  },
};

const es: DashboardText = {
  slug: "continuidad-enel-rj",
  metaTitle: "Continuidad del suministro en Enel RJ — panel",
  metaDescription:
    "Panel con los datos abiertos de ANEEL sobre el DEC y el FEC de Enel RJ de 2010 a 2026: qué mejoró, cuánto se excluye del indicador regulado y dónde están los conjuntos por encima del límite.",
  eyebrow: "Panel · datos abiertos de ANEEL",
  title: (n) =>
    `Enel RJ redujo un ${n.decDrop} la duración de los cortes en diez años, pero las horas excluidas del indicador crecieron un ${n.excludedGrowth}`,
  lead: (n) =>
    `El DEC, indicador con el que ANEEL, el regulador brasileño, controla a la distribuidora, bajó de ${n.decPeak} h en ${n.first} a ${n.decLast} h en ${n.last} y está dentro del límite. Pero la norma excluye del cálculo los cortes en días críticos y situaciones de emergencia. Con esas horas de vuelta, el DEC de ${n.last} sería de ${n.grossLast} h, ${n.grossRatioLast} veces el límite.`,
  back: "Volver al portafolio",
  kpis: {
    dec: { label: "DEC regulado", note: (n) => `−${n.decDrop} desde ${n.first} · límite ${n.limDecLast} h` },
    fec: { label: "FEC regulado", note: (n) => `−${n.fecDrop} desde ${n.first} · límite ${n.limFecLast}` },
    sets: {
      label: "Conjuntos sobre el límite de DEC",
      note: (n) => `${n.consAboveLast} de los clientes · eran ${n.setsAbovePeak} de ${n.setsPeak} en ${n.first}`,
    },
    gross: {
      label: "DEC sin exclusiones",
      note: (n) => `${n.excludedLast} h excluidas · ${n.grossRatioLast}× el límite`,
    },
  },
  units: { hours: "h", interruptions: "cortes", of: "de" },
  trend: {
    title: (n) =>
      n.grossAlwaysAbove
        ? `El DEC regulado cumple el límite desde ${n.withinSince}; sin las exclusiones, estaría por encima todos los años`
        : `El DEC bajó de ${n.decPeak} h a ${n.decLast} h y está en el límite o por debajo desde ${n.withinSince}`,
    text: (n) =>
      `Horas sin energía por cliente al año frente al límite global de ANEEL para Enel RJ. La línea ámbar suma al DEC regulado las horas excluidas: en ${n.last}, serían ${n.grossLast} h. Con ellas, la caída desde ${n.first} sería del ${n.grossDrop}, y no del ${n.decDrop}.`,
  },
  felt: {
    title: (n) =>
      `Para el cliente, el servicio empeoró desde ${n.grossMinYear}: las horas sin energía pasaron de ${n.grossMin} h a ${n.grossLast} h (${n.grossSinceMin})`,
    text: (n) =>
      `Cada barra suma el DEC regulado y las horas excluidas, que es lo que siente el cliente: a quien se queda sin luz no le importa si la causa fue una tormenta o falta de mantenimiento. El indicador regulado siguió bajando, pero el total subió. El peor año fue ${n.worstYear}, con ${n.worstExcluded} h excluidas frente a ${n.worstDec} h en el indicador (el ${n.worstShare} del total).`,
  },
  ytd: {
    label: "2026 hasta septiembre",
    title: (n) =>
      n.ytdExceedsYear
        ? "En nueve meses, 2026 ya tiene más horas excluidas que todo 2025"
        : "2026 va por encima de 2025 en horas excluidas",
    text: (n) =>
      `De enero a septiembre, el DEC regulado quedó en ${n.ytdDecCurr} h (${n.ytdDecChange} frente al mismo período de 2025), mientras que las horas excluidas subieron de ${n.ytdExcPrev} h a ${n.ytdExcCurr} h (${n.ytdExcChange}).`,
  },
  season: {
    title: (n) => `El ${n.seasonShare} de las horas excluidas se concentra entre octubre y marzo`,
    text: "Promedio mensual de 2021 a 2025. El DEC regulado se mantiene cerca de 1 h al mes todo el año; las horas excluidas suben desde octubre y llegan al máximo en noviembre y diciembre, en la temporada de lluvias de verano.",
  },
  share: {
    title: (n) =>
      `Clientes en conjuntos sobre el límite: del ${n.consAbovePeak} en ${n.first} al ${n.consAboveLast} en ${n.last}`,
    text: (n) =>
      `Proporción de clientes atendidos por conjuntos cuyo DEC regulado quedó por encima de su propio límite. En ${n.last} siguen siendo ${n.setsAboveLast} de ${n.setsLast} conjuntos.`,
  },
  worst: {
    title: "Dónde está el problema en 2025",
    text: "Los cinco conjuntos más por encima de su propio límite de DEC. En los dos primeros, las horas excluidas superan tres veces el DEC regulado.",
    cols: {
      set: "Conjunto",
      dec: "DEC",
      limit: "Límite",
      ratio: "Sobre el límite",
      consumers: "Clientes",
      excluded: "Horas excluidas",
    },
  },
  legend: {
    dec: "DEC regulado",
    limit: "Límite ANEEL",
    excluded: "Horas excluidas",
    share: "Clientes sobre el límite",
    total: "Total",
    gross: "DEC sin exclusiones",
  },
  table: { show: "Ver los números", year: "Año", month: "Mes" },
  method: {
    title: "Cómo leer este panel",
    items: [
      "El DEC es la duración equivalente de interrupción por cliente: cuántas horas, en promedio, cada cliente estuvo sin energía en el año. El FEC es la frecuencia: cuántas veces ocurrió. Cuentan los cortes de más de 3 minutos.",
      "El DEC regulado es el que ANEEL compara con el límite. Según la norma (PRODIST, Módulo 8), excluye los cortes en días críticos, en situación de emergencia, de origen externo al sistema de la distribuidora y los ligados a racionamiento o al operador del sistema (ONS). El “DEC sin exclusiones” es el regulado más esas horas.",
      "Los valores son los que Enel RJ envió a ANEEL, por conjunto de clientes y por mes. Para la distribuidora, cada conjunto pesa según su número de clientes, y el año es la suma de los meses. El límite global usa el mismo peso.",
      "La base pública de ANEEL trae cada fila duplicada; las repeticiones se eliminaron antes del cálculo. 2010 tiene menos conjuntos porque la división era otra. 2026 llega hasta septiembre.",
    ],
    sourceLabel: "Fuente: ANEEL, Indicadores Colectivos de Continuidad (DEC y FEC), datos abiertos, generados el 5 de noviembre de 2026.",
  },
};

export const DASHBOARD: Record<Locale, DashboardText> = { pt, en, es };

export function dashboardPath(locale: Locale) {
  return `${DASHBOARD_BASE[locale]}/${DASHBOARD[locale].slug}`;
}
