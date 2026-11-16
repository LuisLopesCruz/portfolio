import type { Content } from "./types";

const es: Content = {
  locale: "es",
  htmlLang: "es",
  meta: {
    title: "Luis Claudio Lopes da Cruz — AI Systems Builder",
    description:
      "20 años de operaciones de campo en el sector eléctrico y sistemas reales construidos con Inteligencia Artificial: ERP, pronóstico meteorológico de impacto, gestión de servicios de campo y aplicaciones.",
  },
  nav: {
    skipToContent: "Saltar al contenido",
    sectionsLabel: "Secciones",
    projects: "Proyectos",
    howIWork: "Cómo trabajo",
    background: "Trayectoria",
    articles: "Artículos",
    contact: "Contacto",
    languageLabel: "Idioma",
    languageNames: { pt: "Português", en: "English", es: "Español" },
  },
  hero: {
    eyebrow: "AI Systems Builder",
    title: "Construyo sistemas con Inteligencia Artificial para operaciones reales.",
    titleHighlight: "Inteligencia Artificial",
    coreTitle: "AI",
    coreSubtitle: "SYSTEM BUILDER",
    subtitle:
      "20 años gestionando operaciones de campo en el sector eléctrico. Hoy convierto esa experiencia en software: defino el problema, las reglas y la lógica, y dirijo agentes de IA en la construcción.",
    ctaProjects: "Ver proyectos",
    ctaContact: "Contacto",
  },
  projects: {
    title: "Proyectos",
    problemLabel: "Problema",
    featuresLabel: "Qué hace",
    stackLabel: "Stack",
    metricsLabel: "En números",
    highlightLabel: "Destacado",
    statusLabels: {
      inUse: "En uso",
      live: "En línea",
      closedBeta: "Beta cerrada",
      inDevelopment: "En desarrollo",
      inSpecification: "En especificación",
    },
    externalLinkHint: "se abre en una pestaña nueva",
    imagePlaceholder: "Imagen próximamente",
    enlargeImage: "Ampliar imagen",
    galleryViewAll: "Ver las {n} pantallas",
    galleryClose: "Cerrar",
    galleryPrevious: "Imagen anterior",
    galleryNext: "Imagen siguiente",
    galleryOf: "de",
    items: [
      {
        id: "legno",
        problem:
          "Una carpintería de muebles a medida recibe cotizaciones de proveedores en PDF, fotos y capturas de WhatsApp, cada una en un formato distinto.",
        metrics: [
          { value: "26", label: "pantallas" },
          { value: "70", label: "tablas en la base de datos" },
          { value: "2.626", label: "productos en el catálogo" },
        ],
        features: [
          "Cubre el ciclo completo de la carpintería: lead, presupuesto, contrato, pedido, producción y entrega.",
          "Lee cotizaciones de proveedores en PDF, foto o captura de WhatsApp y extrae artículos y precios con IA.",
          "Cruza cada artículo con el catálogo mediante correspondencia semántica y recomienda la compra de menor costo.",
          "Calcula el precio del presupuesto con flete, comisiones, impuestos, comisión de tarjeta, punto de equilibrio y margen, y genera la propuesta y el contrato en PDF.",
          "Módulo financiero con flujo de caja, estado de resultados, recibos e informes en Excel y PDF.",
          "En construcción: un estudio que dibuja el ambiente en planta, arma los muebles según el estándar constructivo y entrega la lista de piezas y herrajes.",
        ],
        highlight:
          "La IA no depende de un solo proveedor: cuando uno se queda sin saldo, el sistema pasa solo al siguiente (Anthropic, OpenAI o Huawei) y registra el motivo y el costo de cada llamada.",
        images: [
          {
            alt: "Pantalla de cotización del Legno Design ERP con el comparativo de precios entre comprar todo a un proveedor o combinar proveedores, con la opción recomendada destacada. Nombres y valores difuminados.",
            caption: "Comparativo de precios armado a partir de las cotizaciones de los proveedores. Nombres y valores difuminados.",
          },
          {
            alt: "Panel ejecutivo del Legno Design ERP con indicadores comerciales, de producción y financieros, embudo, producción por etapa y flujo de caja. Valores difuminados.",
            caption: "Panel ejecutivo: comercial, producción y finanzas en una pantalla. Valores difuminados.",
          },
          {
            alt: "Estado de flujo de caja mensual del Legno Design ERP, con el plan de cuentas detallado. Valores difuminados.",
            caption: "Flujo de caja mes a mes, con el plan de cuentas completo. Valores difuminados.",
          },
        ],
      },
      {
        id: "tempo",
        problem:
          "Saber con anticipación si el clima va a aumentar los reportes de cortes de energía.",
        metrics: [
          { value: "8", label: "familias de modelos meteorológicos" },
          { value: "92", label: "municipios del estado de Río" },
          { value: "4 años", label: "de cortes de la ANEEL en el modelo" },
        ],
        features: [
          "Consolida el pronóstico de ocho familias de modelos meteorológicos (ICON, GFS, ECMWF y otras) para los 92 municipios del estado, hora a hora, hasta 5 días.",
          "Da a cada modelo un peso proporcional al error medido en más de 200 mil comparaciones con la lluvia observada.",
          "Estima el impacto del clima en los reportes de cortes de energía con un modelo entrenado con 4 años de datos de la ANEEL (el regulador eléctrico de Brasil), separando viento, lluvia y convección.",
          "Muestra su propia calibración: compara la probabilidad anunciada con lo que realmente pasó y contrasta el impacto previsto con los registros de la ANEEL.",
          "Panel con búsqueda de municipio, ranking de los 5 municipios de mayor riesgo y resumen por distribuidora.",
          "Costo cero: recolección programada y base de datos en plan gratuito, sin servidor propio.",
        ],
        highlight:
          "Medir en lugar de suponer: el ECMWF, el modelo de mayor prestigio del mundo, quedó 4.º en lluvia horaria en Río de Janeiro, detrás del ICON alemán. El ranking se mantuvo con 15 veces más datos.",
        linkLabel: "Ver el sistema",
        images: [
          {
            alt: "Panel de riesgo de impacto eléctrico de TEMPO-RJ: para cada uno de los próximos 5 días, una barra que separa la rutina normal del municipio del aumento causado por viento, descargas eléctricas y convección, con la probabilidad de un día malo y la franja de riesgo.",
            caption: "Riesgo de impacto eléctrico día a día, separado por causa: viento, descargas eléctricas y convección.",
          },
          {
            alt: "Panel de TEMPO-RJ para Río de Janeiro: indicadores de las próximas horas (probabilidad de lluvia, acumulado, ráfaga, temperatura) y el pronóstico hora a hora de los próximos días en íconos.",
            caption: "Indicadores de las próximas horas y pronóstico hora a hora para Río de Janeiro.",
          },
        ],
      },
      {
        id: "fsm360",
        diagram: {
          hub: "Cuadrilla del turno",
          hubCaption: "prefijo · motor de reglas único",
          nodes: ["Personas", "Vehículo", "Herramientas", "Materiales", "Seguridad", "Órdenes de trabajo"],
          description:
            "Diagrama de FSM 360: la cuadrilla del turno en el centro, vinculada a personas, vehículo, herramientas, materiales, seguridad y órdenes de trabajo, todo bajo el mismo motor de reglas.",
        },
        problem:
          "Las contratistas de energía y saneamiento pierden dinero por fallas de control, y el cierre de la orden de trabajo en campo es el mayor cuello de botella.",
        metrics: [
          { value: "7", label: "etapas de la operación en un solo sistema" },
          { value: "16", label: "reglas de bloqueo entre módulos" },
          { value: "6", label: "dominios vinculados a cada cuadrilla" },
        ],
        featuresLabel: "Qué hará",
        features: [
          "Cubrir las siete etapas de la operación de campo: planificación, preparación, liberación, despacho, ejecución, conciliación del turno e indicadores.",
          "Usar la cuadrilla del turno como unidad de control: personas, vehículo, herramientas, materiales, seguridad y órdenes de trabajo quedan vinculados a ella, y el historial sobrevive al cambio de vehículo.",
          "Impedir, con un único motor de reglas, que la cuadrilla salga con algo irregular: habilitación vencida, EPP sin checklist, herramienta sin calibrar o análisis de riesgo no emitido.",
          "Funcionar sin conexión en la aplicación de campo, con reglas claras de lo que se puede hacer offline y lo que requiere validación en el servidor.",
          "Nunca borrar un registro: toda corrección se convierte en un nuevo evento, con justificación, responsable y hora.",
          "Controlar materiales con el modelo de mi tesis de Ingeniería de Producción: custodia por cuadrilla, bitácora y reabastecimiento just-in-time.",
        ],
        highlight:
          "La especificación va antes que el código: producto, reglas, flujos, operación sin conexión y modelo de dominio ya están escritos y revisados, listos para que los agentes de IA los implementen.",
      },
      {
        id: "ecovox",
        problem:
          "Aprender inglés desde cero hasta la fluidez con un camino estructurado y corrección individual.",
        metrics: [
          { value: "320", label: "lecciones previstas, del A1 al C2" },
          { value: "45", label: "unidades temáticas en 9 franjas" },
          { value: "1.000–1.200 h", label: "de estudio guiado desde cero hasta C2" },
        ],
        features: [
          "Lecciones del A1 al C2 en el mismo ciclo de 11 pasos: meta, gramática en portugués, diálogo, lectura, práctica, pronunciación, conversación, corrección y repaso.",
          "Evalúa la pronunciación por fonema, fluidez y entonación, con práctica de los sonidos que más confunden a los brasileños.",
          "Repaso espaciado (FSRS): el vocabulario y los errores del propio alumno se convierten en tarjetas que vuelven hasta fijarse.",
          "Estima el nivel con evidencias y muestra el tiempo hasta la siguiente banda como un rango, no como una promesa.",
          "Cuenta familiar con reglas para menores (ley de privacidad LGPD de Brasil) y tope de costo de IA por alumno.",
          "En construcción: tutor de conversación y corrector de redacciones con IA, y rutas para TOEFL, IELTS, TOEIC y Cambridge a partir del B1.",
        ],
        highlight:
          "La nota de pronunciación es evidencia, no veredicto: el acento no reprueba. Solo reprueba no ser entendido, y una nota baja envía el sonido a práctica.",
        images: [
          {
            alt: "Pantalla de inicio de Eco Vox: repaso del día, franja en estudio con el progreso, saldo de tokens de IA y plan de estudio con la previsión en rango para terminar el A1.",
            caption: "Inicio: repaso del día, progreso en la franja, tokens de IA y previsión en rango.",
          },
          {
            alt: "Ruta CEFR de Eco Vox en la franja A1: unidad 1 con el manual, gramática de la unidad, lecciones completadas, la próxima actividad y las lecciones siguientes.",
            caption: "Ruta del A1: unidad, gramática y lecciones en secuencia.",
          },
          {
            alt: "Pantalla Hablar de Eco Vox: práctica de los sonidos que más confunden a los brasileños, con nota media por sonido. El diálogo con IA aparece como no disponible por falta de crédito en la API.",
            caption: "Práctica de sonidos con nota por sonido. La conversación con IA espera crédito en la API.",
          },
          {
            alt: "Ruta CEFR de Eco Vox con las nueve franjas, del A1 al C2. Las franjas por encima del A1 quedan bloqueadas hasta la prueba de franja.",
            caption: "Las nueve franjas, del A1 al C2, que se abren una a una con la prueba de franja.",
          },
        ],
      },
      {
        id: "lumen",
        problem:
          "Quien predica o estudia la Biblia necesita el texto, comentarios, notas y bosquejos de sermón, que terminan dispersos en varios lugares.",
        metrics: [
          { value: "425 mil", label: "palabras en el interlineal hebreo y griego" },
          { value: "17.884", label: "referencias cruzadas" },
          { value: "523", label: "grupos de pasajes paralelos" },
        ],
        features: [
          "Biblia con interlineal hebreo y griego, números de Strong y morfología explicada en portugués.",
          "Notas contextuales para las 310 palabras originales más importantes, que suman casi 97 mil apariciones.",
          "Referencias cruzadas y pasajes paralelos, como los relatos de los Evangelios sobre un mismo evento.",
          "Genera el bosquejo de sermón o estudio a partir del texto, las referencias y el interlineal; la IA lo refina después.",
          "Notas, plan de lectura (incluso en orden cronológico) y búsqueda de versículos con IA.",
          "Comentarios bíblicos integrados al texto (traducción en curso).",
        ],
        highlight:
          "La clave de la IA nunca está en el celular: la app envía solo parámetros y la solicitud a la IA se arma en el servidor, así nadie puede usar la cuenta como un asistente gratis.",
        images: [
          {
            alt: "Pantalla de inicio de Lumen: versículo del día con comentario de John Wesley, contadores de sermones y notas, lectura en curso y accesos a la Biblia, sermones, estudios, notas, búsqueda y plan de lectura.",
            caption: "Inicio: versículo del día con comentario, lectura en curso y accesos rápidos.",
          },
          {
            alt: "Selector de libros de Lumen, con búsqueda y los libros agrupados por sección, en orden canónico o cronológico.",
            caption: "Elección del libro, en orden canónico o cronológico.",
          },
          {
            alt: "Editor de plan de lectura de Lumen: orden canónico o cronológico, selección de libros, período, fecha de inicio y resumen con capítulos por día.",
            caption: "Plan de lectura: libros, período y capítulos por día calculados.",
          },
        ],
      },
    ],
  },
  howIWork: {
    title: "Cómo trabajo",
    steps: [
      {
        title: "Entiendo la operación.",
        text: "Parto del problema real, de las reglas del negocio y de quién lo va a usar.",
      },
      {
        title: "Especifico.",
        text: "Escribo requisitos, flujos y lógica antes de cualquier código.",
      },
      {
        title: "Dirijo la IA.",
        text: "Los agentes de IA implementan; yo decido, oriento y apruebo.",
      },
      {
        title: "Valido.",
        text: "Pruebo como dueño y como usuario, hasta que funcione en la práctica.",
      },
    ],
  },
  background: {
    title: "Trayectoria",
    stats: [
      { value: "20 años", label: "en energía e infraestructura" },
      { value: "700+", label: "colaboradores liderados" },
      { value: "R$ 7 mi/mes", label: "mayor presupuesto gestionado" },
      { value: "−10%", label: "de costos en turnaround" },
    ],
    milestones: [
      {
        period: "2004–2016",
        title: "Grupo Enel",
        text: "Cinco ascensos en 12 años, de asistente a especialista: inteligencia operativa, cobranza, pérdidas y medición electrónica. En 2014, la regional alcanzó el menor índice de pérdidas de la compañía.",
      },
      {
        period: "2016",
        title: "Comfica",
        text: "Por invitación del CEO, turnaround de un contrato de R$ 7 millones/mes con más de 700 colaboradores; ahorro de R$ 700 mil/mes sin perder nivel de servicio.",
      },
      {
        period: "2017–2019",
        title: "Implantaciones desde cero",
        text: "Un negocio propio y la unidad de ingeniería de una distribuidora de vidrios, que llegó a R$ 1,5 millones/mes de facturación.",
      },
      {
        period: "2020–2026",
        title: "Contratos de campo",
        text: "Coordinación de operaciones y contratos en contratistas de energía: hasta 4.000 órdenes de trabajo por mes, SLA superior al 98%, gestión de crisis 24/7 en eventos climáticos.",
      },
      {
        period: "Hoy",
        title: "Sistemas con IA",
        text: "Convierto esa experiencia en software, especificando y dirigiendo agentes de IA.",
      },
    ],
    educationTitle: "Formación",
    education: [
      "Graduado en Ingeniería de Producción (pendiente de colación de grado, prevista para feb/2027).",
      "Posgrado en Ciencia de Datos e Inteligencia Artificial (diploma emitido tras la colación de grado).",
      "Posgrado en Ingeniería Eléctrica con énfasis en Sistemas de Automatización (diploma emitido tras la colación de grado).",
      "Técnico en Electrotecnia.",
    ],
  },
  articles: {
    title: "Artículos",
    intro: "Artículos breves sobre inteligencia artificial, desarrollo AI-native y las decisiones invisibles que hacen funcionar un sistema.",
    readLabel: "Leer artículo",
    minutesLabel: "min de lectura",
    backLabel: "Volver al portafolio",
    items: [
      {
        id: "access-claude-code",
        slug: "del-access-al-claude-code",
        title: "Del Access al Claude Code: cómo construyo sistemas sin escribir código",
        summary: "Lógica de programación, modelado de datos y 20 años de operaciones, aplicados a dirigir agentes de IA. Lo que hago yo, lo que hace la IA y por qué la especificación va primero.",
        date: "2026-11-16",
        readingMinutes: 4,
        tags: ["AI-native", "Método"],
        body: [
          { type: "h2", text: "Dónde empezó todo" },
          { type: "p", text: "Mi primer contacto con sistemas fue Microsoft Access. En 2004 y 2005, en Enel, armaba formularios, informes y bases de datos operativas con VBA (Visual Basic for Applications). No era un sistema grande, pero exigía lo esencial: pensar con lógica, dividir un proceso en pasos (un algoritmo), modelar tablas y relaciones y prever qué pasa cuando el dato llega mal." },
          { type: "p", text: "Esa base me acompañó en los años siguientes. Como gerente de operaciones y contratos, muchas veces fui el puente entre la operación y el equipo de desarrollo: explicaba la regla de negocio, dibujaba el flujo y validaba si el sistema hacía lo que el campo necesitaba." },
          { type: "h2", text: "Qué cambió con la IA" },
          { type: "p", text: "Hoy, el código de mis sistemas lo escriben agentes de IA, 100% con Claude Code y Codex. Yo no escribo las líneas de código. Mi trabajo es otro, y es el mismo de siempre: entender el problema, especificar el sistema, tomar las decisiones y validar el resultado." },
          { type: "p", text: "La diferencia es la escala. Lo que antes dependía de un equipo para cada etapa ahora cabe en una conversación bien dirigida con agentes que implementan, prueban y corrigen. Pero los agentes solo son tan buenos como el guion que reciben." },
          { type: "h2", text: "La especificación va antes que el código" },
          { type: "p", text: "FSM 360 lo muestra mejor que cualquier explicación. Todavía no tiene una sola línea de código, y es a propósito. Antes de construir, escribí la especificación completa: la cuadrilla del turno como unidad de control, 16 reglas de bloqueo entre módulos, qué se puede hacer sin conexión y qué requiere validación, el modelo de dominio y los indicadores. Cuando los agentes empiecen a implementar, cada decisión ya estará tomada y escrita." },
          { type: "p", text: "Los demás proyectos siguen la misma regla. En TEMPO-RJ y en Eco Vox, el documento del proyecto dice, desde el inicio, que precede al código: cuando el código contradice el documento, primero se actualiza el documento." },
          { type: "h2", text: "Validar como dueño y como usuario" },
          { type: "p", text: "Especificar no basta; hay que verificar. En Legno Design ERP, el usuario soy yo: el área comercial y la financiera funcionan todos los días en mi carpintería. En TEMPO-RJ, el sistema mide su propio error y muestra cuándo el pronóstico fue optimista. En Eco Vox, cada regla importante tiene una prueba automatizada: son 244." },
          { type: "h2", text: "Lo que esto no es" },
          { type: "p", text: "No es decir que la IA reemplaza a la ingeniería. Es lo contrario: cuanto más hace la IA, más importa quién decide qué debe hacer. Mi papel es aportar contexto, criterio y responsabilidad, con la experiencia de quien pasó 20 años viendo qué ocurre cuando un sistema no encaja con la operación." },
        ],
      },
    ],
  },
  contact: {
    title: "Contacto",
    text: "Abierto a oportunidades en producto, soluciones e implementación de IA. Remoto o híbrido.",
    linkedinLabel: "LinkedIn",
    githubLabel: "GitHub",
    emailLabel: "Correo",
  },
  footer: {
    builtWith: "Construido con Claude Code.",
  },
};

export default es;
