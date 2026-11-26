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
    readMore: "Leer más",
    readLess: "Leer menos",
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
          "En una carpintería de muebles a medida, cada etapa vivía en un lugar distinto: el lead en WhatsApp, las cotizaciones de los proveedores en PDF, foto y captura, cada una en su formato, el presupuesto en una planilla y las finanzas en otra. Comparar precios era trabajo manual, y un costo olvidado en el presupuesto (flete, comisión, tarifa de tarjeta) salía directo del margen.",
        metrics: [
          { value: "26", label: "pantallas" },
          { value: "70", label: "tablas en la base de datos" },
          { value: "2.626", label: "productos en el catálogo" },
        ],
        features: [
          "Cubre todo el ciclo en un solo sistema: lead, presupuesto, pedido, contrato, producción, entrega y finanzas, vinculados entre sí.",
          "Lee cotizaciones de proveedores en PDF, Excel, foto o captura de WhatsApp y extrae ítems y precios con IA.",
          "Cruza cada ítem con el catálogo de 2.626 productos por correspondencia semántica y arma el comparativo de menor costo.",
          "Presupuesto por ambiente, con calculadora de precio: flete, comisiones, impuestos, tarifa de tarjeta, punto de equilibrio y markup.",
          "Finanzas con ingresos y gastos, costos e ingresos fijos generados cada mes, flujo de caja con proyección y estado de resultados.",
          "Kanban de leads, del primer contacto a cerrado o perdido. Los leads de la landing page entran solos, y quien hizo clic en WhatsApp aparece como el más caliente.",
          "Grupos de presupuesto: los ambientes del mismo cliente en una propuesta única en PDF y una lista de materiales sumada. En el grupo de un cliente, 139 ítems se convirtieron en 56 líneas de compra.",
          "Contrato generado a partir del pedido, en PDF. Firmarlo pasa el pedido a producción y registra los ingresos en finanzas.",
          "Genera órdenes de compra por proveedor a partir del comparativo aprobado, con el PDF del pedido. El pago al proveedor se registra como gasto en finanzas.",
          "Kanban de producción, de “esperando inicio” hasta la entrega; los ítems del pedido acompañan cada etapa.",
          "Panel con ingresos, gastos y pedidos en producción, e informes en Excel y PDF.",
          "Login con cuatro perfiles y permisos por módulo, además de copia de seguridad y restauración de la base.",
          "En construcción: el Estudio, que dibuja el ambiente en planta, arma los muebles según el estándar constructivo y devuelve piezas, canto y herrajes.",
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
          "Quien opera la red eléctrica necesita saber con anticipación si el clima va a generar cortes. Pero cada modelo meteorológico dice algo distinto, los sitios muestran el pronóstico sin decir cuánto suele fallar, y nadie vincula la lluvia prevista con los cortes que provoca. Así, cuadrillas y guardias se organizan a ciegas.",
        metrics: [
          { value: "8", label: "familias de modelos meteorológicos" },
          { value: "92", label: "municipios del estado de Río" },
          { value: "4 años", label: "de cortes de la ANEEL en el modelo" },
        ],
        features: [
          "Consolida 8 familias de modelos (ICON, GFS, ECMWF, ARPEGE, UKMO, JMA, CMA y GEM) para los 92 municipios de Río de Janeiro, hora a hora, hasta 5 días.",
          "Da a cada modelo un peso según el error medido, por región y por anticipación: el que más acierta a 6 horas no es el que más acierta a 3 días.",
          "Estima el impacto del clima en los cortes de energía con un modelo entrenado con 4 años de datos de ANEEL, separando viento, lluvia y convección.",
          "Revisa su propio pronóstico: compara la probabilidad anunciada con lo que pasó y verifica el impacto previsto contra los registros de ANEEL. El resultado aparece en el panel, incluso cuando todavía no es bueno.",
          "Cruza el pronóstico con la lluvia observada: 33 pluviómetros de Alerta Rio y unas 200 estaciones del CEMADEN, en 64 municipios.",
          "Muestra los avisos del INMET por municipio, incluso los que mencionan riesgo de corte de energía.",
          "Muestra el desacuerdo entre los modelos (“3 de 8 prevén lluvia, 5 no”), en lugar de esconderlo en un solo número.",
          "Tarjeta hora a hora con el cielo esperado (sol, nubes, lluvia o tormenta), a partir de la mediana de los 8 modelos.",
          "Búsqueda de municipio que ignora acentos, ranking de los 5 municipios de mayor riesgo y resumen por distribuidora.",
          "Monitor de aprendizaje: el ranking de los modelos aparece antes de aplicarse, marcado como provisional.",
          "Costo cero: recolección programada, base de datos y funciones en el plan gratuito, sin servidor propio y sin nada corriendo en la computadora.",
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
          "En el cambio de turno de las contratistas de energía y saneamiento, quien sale dice que dejó todo en orden y quien entra dice que ya lo recibió así. Sin registro de las dos versiones, el vehículo con avería, la herramienta que desapareció y el material que faltó se quedan sin responsable. El cierre de la orden de trabajo en campo es el otro gran cuello de botella.",
        metrics: [
          { value: "7", label: "etapas de la operación en un solo sistema" },
          { value: "16", label: "reglas de bloqueo entre módulos" },
          { value: "2", label: "firmas en cada cambio de turno: quien entrega y quien recibe" },
        ],
        featuresLabel: "Qué hará",
        features: [
          "Hacer el cambio de turno en un solo flujo. Quien sale declara cómo dejó el vehículo, el equipo de protección colectiva, las herramientas y los materiales. Quien entra revisa ítem por ítem y registra cómo lo está recibiendo. Las dos versiones quedan lado a lado, con fotos, hora y doble firma, y cualquier diferencia se convierte en una pendiente con responsable en el momento.",
          "Cuando no hay cuadrilla siguiente y el vehículo va al patio, quien sale declara y firma lo que deja. Quien tome el vehículo después lo revisa número por número, y lo que falte queda a nombre del líder anterior.",
          "Impedir, con un único motor de reglas, que la cuadrilla salga con algo irregular: habilitación vencida, EPP sin checklist, herramienta sin calibrar o análisis de riesgo no emitido.",
          "Usar la cuadrilla del turno como unidad de control: personas, vehículo, herramientas, materiales, seguridad y órdenes de trabajo quedan vinculados a ella, y el historial sobrevive al cambio de vehículo.",
          "Funcionar sin conexión en la aplicación de campo, con reglas claras de lo que se puede hacer offline y lo que requiere validación en el servidor.",
          "Cubrir las siete etapas de la operación de campo: planificación, preparación, liberación, despacho, ejecución, conciliación del turno e indicadores.",
          "Nunca borrar un registro: toda corrección se convierte en un nuevo evento, con justificación, responsable y hora.",
          "Controlar materiales con el modelo de mi tesis de Ingeniería de Producción: custodia por cuadrilla, bitácora y reabastecimiento just-in-time.",
          "Exigir fotos de antes y después, con GPS y hora automáticos, y aceptar observaciones por voz, transcritas automáticamente.",
          "Conciliar las órdenes de trabajo y los materiales al cerrar el turno. Una orden con foto o dato faltante bloquea el cierre. El medidor retirado vuelve al almacén; si no vuelve, queda como pendiente del líder, que no sale a campo hasta resolverlo.",
        ],
        highlight:
          "La especificación va antes que el código: producto, reglas, flujos, operación sin conexión y modelo de dominio ya están escritos y revisados, listos para que los agentes de IA los implementen.",
      },
      {
        id: "ecovox",
        problem:
          "Mucha gente estudia inglés durante años, entiende la regla y conoce las palabras, pero se traba al hablar. Las apps de ejercicios premian aciertos y rachas de días, no lo que se habla. Nadie corrige la pronunciación de cerca, y lo que se aprende el lunes se olvida el viernes.",
        metrics: [
          { value: "320", label: "lecciones previstas, del A1 al C2" },
          { value: "45", label: "unidades temáticas en 9 franjas" },
          { value: "1.000–1.200 h", label: "de estudio guiado desde cero hasta C2" },
        ],
        features: [
          "Lecciones del A1 al C2 en un mismo ciclo de 11 etapas: meta, gramática, escuchar, leer, notar, practicar, pronunciar, usar, corregir, reproducir y guardar.",
          "Evalúa la pronunciación por fonema, fluidez y entonación, con shadowing de las frases de la lección.",
          "Repaso espaciado (FSRS): el vocabulario y los errores del propio alumno se vuelven tarjetas. El repaso funciona sin conexión y se envía cuando vuelve la conexión.",
          "Estima el nivel con evidencias y muestra la previsión hasta la próxima franja como un intervalo, no como una promesa.",
          "Entrenamiento de los sonidos que más confunden a los brasileños, con un mazo de trampas en 8 grupos.",
          "Gramática breve y en portugués, comparada con el portugués, antes del diálogo. Cada franja tiene su propio cuadernillo (34 clases en el A1).",
          "Diálogos en escena con subtítulos sincronizados línea por línea.",
          "Vocabulario en bloques de frase, con audio, en lugar de palabras sueltas.",
          "Dictado y transcripción a partir del audio, para practicar la escritura como en los exámenes.",
          "Checkpoints por unidad y prueba de franja para pasar al nivel siguiente.",
          "Plan familiar con titular y asociados, reglas para menores (ley brasileña de protección de datos) y tope de costo de IA por alumno.",
          "En construcción: conversación con IA con corrección en 3 puntos, corrector de redacciones y rutas para TOEFL, IELTS, TOEIC y Cambridge a partir del B1.",
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
          "Para preparar un sermón o un estudio, el predicador abre la Biblia, un diccionario de hebreo y griego, comentarios, referencias y un cuaderno de notas, cada uno en un lugar. El tiempo se va en buscar y reunir, y queda poco para estudiar el texto.",
        metrics: [
          { value: "425 mil", label: "palabras en el interlineal hebreo y griego" },
          { value: "17.884", label: "referencias cruzadas" },
          { value: "523", label: "grupos de pasajes paralelos" },
        ],
        features: [
          "Interlineal hebreo y griego con números de Strong y la morfología explicada en portugués, en 425 mil palabras.",
          "Bosquejo de sermón temático, textual o expositivo, generado a partir del texto, las referencias y el interlineal. La IA lo refina después, y todo pasa por la revisión de quien predica.",
          "17.884 referencias cruzadas y 523 grupos de pasajes paralelos, como los relatos de los Evangelios sobre el mismo hecho.",
          "Notas contextuales para las 310 palabras originales más importantes, que suman casi 97 mil apariciones. El versículo citado se abre en un panel flotante.",
          "Comentarios bíblicos de varios autores, integrados al texto y con elección del autor (traducción en curso).",
          "Biblia en la ACF (Almeida Corrigida Fiel), con introducción a cada libro y ajuste de fuente y tema.",
          "Estudios bíblicos temáticos, expositivos, de libro o de personaje, con introducción, contexto, puntos, aplicación y preguntas.",
          "Notas con etiquetas, vinculadas a versículos y sermones.",
          "Planes de lectura por libros y período, incluso en orden cronológico, con seguimiento del progreso.",
          "Búsqueda en versículos, sermones y notas, además de búsqueda de versículos con IA.",
          "Destacar, anotar, copiar y compartir versículos.",
          "Versículo del día: 366, uno para cada día del año, revisados en la ACF.",
          "Login y sincronización en la nube para sermones y estudios.",
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
  otherWorks: {
    title: "Otros trabajos",
    openLabel: "Abrir",
    items: [
      {
        id: "painel-enel-rj",
        name: "Panel de continuidad: Enel RJ",
        description: "Dashboard con los datos abiertos de ANEEL sobre DEC y FEC de 2010 a 2026. Cada gráfico abre con la conclusión que muestra: el DEC regulado bajó un 71%, pero, sumando las horas excluidas, el tiempo sin energía del cliente subió un 41% desde 2021.",
        imageAlt: "Parte superior del panel de continuidad de Enel RJ, con el titular y los cuatro indicadores de 2025.",
      },
      {
        id: "site-legno",
        name: "Sitio Legno Design",
        description: "Sitio institucional de la carpintería, con servicios, horarios, reserva en línea y boletín. Lo armé yo en la plataforma Wix.",
        imageAlt: "Página de inicio del sitio de Legno Design, con el menú y la foto de una cocina a medida.",
      },
      {
        id: "landing-legno",
        name: "Landing page Legno Design",
        description: "Página de captación de presupuestos, con prerregistro y WhatsApp. Cada lead entra solo al kanban del Legno Design ERP y llega por correo; quien hace clic en WhatsApp aparece destacado como el lead más caliente.",
        imageAlt: "Parte superior de la landing page de Legno Design, con el titular y los botones de presupuesto.",
      },
      {
        id: "revisao-9ano",
        name: "Repaso 9.º año",
        description: "Sistema de estudio adaptado para 9.º año, con explicaciones pensadas para estudiantes con TDAH: 8 materias, resúmenes en bloques cortos, 240 preguntas en simulacros sin repetición, explicación de cada respuesta y lectura en voz alta.",
        imageAlt: "Pantalla del sistema Repaso 9.º año, con las materias, las pestañas de resumen y simulacros y un bloque de resumen.",
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
        text: "Pruebo como quien lo va a usar, hasta que funcione en la práctica.",
      },
      {
        title: "Evoluciono.",
        text: "Acompaño el uso real, mido los resultados y mejoro continuamente.",
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
          { type: "h2", text: "Validar en la práctica" },
          { type: "p", text: "Especificar no basta; hay que verificar. Legno Design ERP está en uso en una carpintería: el área comercial y la financiera funcionan con él todos los días. En TEMPO-RJ, el sistema mide su propio error y muestra cuándo el pronóstico fue optimista. En Eco Vox, cada regla importante tiene una prueba automatizada: son 244." },
          { type: "h2", text: "Lo que esto no es" },
          { type: "p", text: "No es decir que la IA reemplaza a la ingeniería. Es lo contrario: cuanto más hace la IA, más importa quién decide qué debe hacer. Mi papel es aportar contexto, criterio y responsabilidad, con la experiencia de quien pasó 20 años viendo qué ocurre cuando un sistema no encaja con la operación." },
        ],
      },
      {
        id: "design-system-referencia",
        slug: "de-la-referencia-al-design-system",
        title: "De la referencia al design system: cómo uso la IA para crear el aspecto visual de un producto",
        summary: "No diseño pantallas desde cero. Parto de una referencia, le pido a la IA que extraiga de ella un design system y decido qué queda fuera. Este portafolio se hizo así.",
        date: "2026-11-18",
        readingMinutes: 4,
        tags: ["Design system", "Método"],
        body: [
          { type: "h2", text: "El problema de pedir “un sitio bonito”" },
          { type: "p", text: "Cuando le pides a la IA una pantalla sin referencia, te devuelve el promedio de lo que ya vio: bonita, genérica y distinta en cada pedido. La segunda página no combina con la primera, y cada ajuste lleva el diseño hacia otro lado. Lo que falta no es capacidad de la IA, sino un patrón que seguir." },
          { type: "h2", text: "Partir de una referencia" },
          { type: "p", text: "Por eso empiezo por una referencia: una página que admiro, la sugerencia de un diseñador o incluso un video con animaciones. Antes de nada, dejo claro para qué sirve. En mi portafolio recibí la sugerencia de un diseñador con la arquitectura del sitio e imágenes de ambiente visual. El contenido ya estaba aprobado; la referencia valía solo para lo visual. Esa frase cambió el trabajo: la IA no reescribió ningún texto, solo tradujo el estilo." },
          { type: "h2", text: "Extraer el design system antes de las pantallas" },
          { type: "p", text: "El paso siguiente es pedirle a la IA que lea la referencia y escriba el design system antes de armar cualquier página: la paleta, las fuentes, los espaciados, los componentes (tarjetas, etiquetas, línea de tiempo) y las reglas de movimiento. En el portafolio, eso se convirtió en la paleta oscura en azul petróleo y cian, la pareja de fuentes Manrope y DM Mono y un conjunto de variables de color que usan todos los componentes. Desde ahí, cada pantalla nueva nace del mismo patrón, y no de un pedido suelto." },
          { type: "h2", text: "Decidir qué queda fuera" },
          { type: "p", text: "Una referencia no es un molde. Si no dices nada, la IA lo copia todo, incluso lo que no sirve. Parte de mi trabajo es decir que no: quité el marco que la sugerencia ponía alrededor del núcleo animado, mantuve solo el tema oscuro y escribí “AI” y “SYSTEM BUILDER” en la esfera central. En otro momento vi un video con una vitrina de páginas animadas y aproveché una sola idea: formas en wireframe flotando en capas, con parallax. Entró con los colores del sitio, como un fondo discreto detrás del texto." },
          { type: "p", text: "El criterio es siempre el mismo: ¿el efecto ayuda a la información o compite con ella? La animación que estorba la lectura, pesa en el celular o ignora a quien pide menos movimiento en su sistema queda fuera, por más bonita que sea." },
          { type: "h2", text: "Probar antes de publicar" },
          { type: "p", text: "Todo cambio visual va primero a una dirección de prueba, separada del sitio oficial. Ahí lo reviso en la computadora y en el celular, pido ajustes y solo apruebo después de medir: el rendimiento del portafolio se mantiene por encima de 90 en Lighthouse, con accesibilidad, buenas prácticas y SEO en 100. Si un efecto baja esos números, vuelve a la mesa." },
          { type: "h2", text: "Por qué importa" },
          { type: "p", text: "Es el mismo principio que uso para el código: la especificación va primero. En lo visual, la especificación es el design system. Con él, la IA deja de improvisar y pasa a construir dentro de un patrón, y yo me quedo con lo que es mío: elegir la referencia, decir qué sirve y qué no, y aprobar el resultado." },
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
    cookies: "Cookies",
  },
  consent: {
    title: "Cookies",
    text: "Uso cookies de medición (Amplitude) para entender qué se lee más y desde dónde llegan las visitas, por ciudad. Nada se vende ni se usa para anuncios. Puedes cambiar tu elección cuando quieras en “Cookies”, en el pie de página.",
    accept: "Aceptar",
    decline: "Rechazar",
    close: "Cerrar",
  },
};

export default es;
