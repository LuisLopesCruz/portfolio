import type { Content } from "./types";

const en: Content = {
  locale: "en",
  htmlLang: "en",
  meta: {
    title: "Luis Claudio Lopes da Cruz — AI Systems Builder",
    description:
      "20 years running field operations in the electric utility sector, and real systems built with AI: an ERP, weather impact forecasting, field service management and mobile apps.",
  },
  nav: {
    skipToContent: "Skip to content",
    sectionsLabel: "Sections",
    projects: "Projects",
    howIWork: "How I work",
    background: "Background",
    articles: "Articles",
    contact: "Contact",
    languageLabel: "Language",
    languageNames: { pt: "Português", en: "English", es: "Español" },
  },
  hero: {
    eyebrow: "AI Systems Builder",
    title: "I build AI-powered systems for real-world operations.",
    titleHighlight: "AI-powered",
    coreTitle: "AI",
    coreSubtitle: "SYSTEM BUILDER",
    subtitle:
      "20 years running field operations in the electric utility sector. Today I turn that experience into software: I define the problem, the rules and the logic, and I direct AI agents to build it.",
    ctaProjects: "See projects",
    ctaContact: "Contact",
  },
  projects: {
    title: "Projects",
    problemLabel: "Problem",
    featuresLabel: "What it does",
    stackLabel: "Stack",
    metricsLabel: "By the numbers",
    highlightLabel: "Highlight",
    statusLabels: {
      inUse: "In use",
      live: "Live",
      closedBeta: "Closed beta",
      inDevelopment: "In development",
      inSpecification: "In specification",
    },
    externalLinkHint: "opens in a new tab",
    imagePlaceholder: "Screenshot coming soon",
    enlargeImage: "Enlarge image",
    galleryViewAll: "View all {n} screens",
    galleryClose: "Close",
    galleryPrevious: "Previous image",
    galleryNext: "Next image",
    galleryOf: "of",
    items: [
      {
        id: "legno",
        problem:
          "A custom furniture shop receives supplier quotes as PDFs, photos and WhatsApp screenshots, each in a different format.",
        metrics: [
          { value: "26", label: "screens" },
          { value: "70", label: "database tables" },
          { value: "2,626", label: "catalog products" },
        ],
        features: [
          "Covers the shop's full cycle: lead, quote, contract, order, production and delivery.",
          "Reads supplier quotes from PDFs, photos or WhatsApp screenshots and extracts items and prices with AI.",
          "Matches each item to the catalog using semantic matching and recommends the lowest-cost purchase.",
          "Prices each quote with freight, commissions, taxes, card fees, break-even and markup, and generates the proposal and contract as PDFs.",
          "Finance module with cash flow, income statement, receipts and Excel/PDF reports.",
          "In progress: a design studio that draws the room floor plan, builds the furniture from construction standards and returns the parts and hardware list.",
        ],
        highlight:
          "The AI is not tied to one vendor: when a provider runs out of credit, the system automatically falls back to the next one (Anthropic, OpenAI or Huawei) and logs the reason and the cost of every call.",
        images: [
          {
            alt: "Legno Design ERP quote screen with the price comparison between buying everything from one supplier or mixing suppliers, with the recommended option highlighted. Names and amounts blurred.",
            caption: "Price comparison built from supplier quotes. Names and amounts blurred.",
          },
          {
            alt: "Legno Design ERP executive dashboard with sales, production and finance indicators, funnel, production by stage and cash flow. Amounts blurred.",
            caption: "Executive dashboard: sales, production and finance on one screen. Amounts blurred.",
          },
          {
            alt: "Legno Design ERP monthly cash flow statement with the detailed chart of accounts. Amounts blurred.",
            caption: "Month-by-month cash flow with the full chart of accounts. Amounts blurred.",
          },
        ],
      },
      {
        id: "tempo",
        problem: "Knowing in advance whether the weather will drive up power outage calls.",
        metrics: [
          { value: "8", label: "weather model families" },
          { value: "92", label: "municipalities in Rio de Janeiro state" },
          { value: "4 years", label: "of ANEEL outage data in the model" },
        ],
        features: [
          "Combines forecasts from eight weather model families (ICON, GFS, ECMWF and others) for all 92 municipalities in the state, hour by hour, up to 5 days ahead.",
          "Weights each model by its measured error across more than 200,000 comparisons with observed rainfall.",
          "Estimates weather impact on power outage calls with a model trained on 4 years of ANEEL (Brazil's electricity regulator) data, split into wind, rain and convection.",
          "Shows its own calibration: compares the announced probability with what actually happened, and checks predicted impact against ANEEL records.",
          "Dashboard with municipality search, a top-5 risk ranking and a summary by utility company.",
          "Zero cost: scheduled data collection and database on a free tier, with no server of its own.",
        ],
        highlight:
          "Measure, don't assume: ECMWF, the world's most prestigious model, ranked 4th for hourly rainfall in Rio de Janeiro, behind Germany's ICON. The ranking held with 15 times more data.",
        linkLabel: "View the system",
        images: [
          {
            alt: "TEMPO-RJ power impact risk panel: for each of the next 5 days, a bar separating the municipality's normal routine from the extra load caused by wind, lightning and convection, with the chance of a bad day and the risk band.",
            caption: "Day-by-day power impact risk, split by cause: wind, lightning and convection.",
          },
          {
            alt: "TEMPO-RJ dashboard for Rio de Janeiro: indicators for the next hours (rain chance, accumulation, wind gust, temperature) and an hour-by-hour icon forecast for the coming days.",
            caption: "Indicators for the next hours and hour-by-hour forecast for Rio de Janeiro.",
          },
        ],
      },
      {
        id: "fsm360",
        diagram: {
          hub: "Shift crew",
          hubCaption: "prefix · single rules engine",
          nodes: ["People", "Vehicle", "Tools", "Materials", "Safety", "Work orders"],
          description:
            "FSM 360 diagram: the shift crew at the center, linked to people, vehicle, tools, materials, safety and work orders, all under the same rules engine.",
        },
        problem:
          "At shift change in energy and sanitation contractors, the outgoing crew says everything was left in order and the incoming crew says it was already like that when they took over. With no record of either version, the damaged vehicle, the missing tool and the material that ran short end up with no one accountable. Closing work orders in the field is the other big bottleneck.",
        metrics: [
          { value: "7", label: "operation stages in one system" },
          { value: "16", label: "cross-module blocking rules" },
          { value: "2", label: "signatures at every shift change: who hands over and who takes over" },
        ],
        featuresLabel: "What it will do",
        features: [
          "Run the shift handover as a single flow. The outgoing crew declares how it left the vehicle, collective safety equipment, tools and materials. The incoming crew checks item by item and records how it is receiving them. Both versions sit side by side, with photos, timestamps and two signatures, and any difference becomes an issue with an owner on the spot.",
          "When there is no next crew and the vehicle goes back to the yard, the outgoing crew declares and signs what it leaves. Whoever takes the vehicle next checks it number by number, and anything missing is assigned to the previous crew leader.",
          "Cover all seven stages of field operations: planning, preparation, release, dispatch, execution, shift reconciliation and metrics.",
          "Use the shift crew as the unit of control: people, vehicle, tools, materials, safety and work orders are linked to it, and the history survives vehicle swaps.",
          "Block a crew from leaving with anything out of compliance, through a single rules engine: expired certification, missing PPE checklist, uncalibrated tools or no job safety analysis.",
          "Work offline in the field app, with clear rules for what can be done offline and what needs server validation.",
          "Never delete a record: every correction becomes a new event with justification, owner and timestamp.",
          "Control materials with the model from my Production Engineering thesis: crew custody, logbook and just-in-time replenishment.",
        ],
        highlight:
          "The specification comes before the code: product, rules, flows, offline behavior and domain model are already written and reviewed, ready for AI agents to implement.",
      },
      {
        id: "ecovox",
        problem:
          "Learning English from zero to fluency with a structured path and individual correction.",
        metrics: [
          { value: "320", label: "planned lessons, A1 to C2" },
          { value: "45", label: "thematic units across 9 bands" },
          { value: "1,000–1,200 h", label: "of guided study from zero to C2" },
        ],
        features: [
          "Lessons from A1 to C2 in the same 11-step cycle: goal, grammar in Portuguese, dialogue, reading, practice, pronunciation, conversation, correction and review.",
          "Assesses pronunciation by phoneme, fluency and intonation, with drills on the sounds that trip up Brazilian learners most.",
          "Spaced repetition (FSRS): vocabulary and the learner's own mistakes become cards that come back until they stick.",
          "Estimates level from evidence and shows the time to the next band as a range, not a promise.",
          "Family accounts with rules for minors (Brazil's LGPD privacy law) and a per-student AI cost cap.",
          "In progress: AI conversation tutor and essay corrector, and TOEFL, IELTS, TOEIC and Cambridge tracks from B1 up.",
        ],
        highlight:
          "The pronunciation score is evidence, not a verdict: an accent does not fail you. Only being misunderstood does, and a low score sends the sound to practice.",
        images: [
          {
            alt: "Eco Vox home screen: today's review, the current band with progress, the AI token balance and the study plan with a range estimate for finishing A1.",
            caption: "Home: today's review, band progress, AI tokens and a range estimate.",
          },
          {
            alt: "Eco Vox CEFR path in the A1 band: unit 1 with the handbook, unit grammar, completed lessons, the next activity and the lessons ahead.",
            caption: "A1 path: unit, grammar and lessons in sequence.",
          },
          {
            alt: "Eco Vox Speak screen: drills on the sounds that trip up Brazilian learners most, with an average score per sound. The AI dialogue shows as unavailable for lack of API credit.",
            caption: "Sound drills with a score per sound. AI conversation is waiting for API credit.",
          },
          {
            alt: "Eco Vox CEFR path with the nine bands, A1 to C2. Bands above A1 stay locked until the band test.",
            caption: "The nine bands, A1 to C2, unlocked one at a time by the band test.",
          },
        ],
      },
      {
        id: "lumen",
        problem:
          "People who preach or study the Bible need the text, commentaries, notes and sermon outlines, which end up scattered across many places.",
        metrics: [
          { value: "425k", label: "words in the Hebrew and Greek interlinear" },
          { value: "17,884", label: "cross-references" },
          { value: "523", label: "groups of parallel passages" },
        ],
        features: [
          "Bible with Hebrew and Greek interlinear, Strong's numbers and morphology explained in Portuguese.",
          "Contextual notes for the 310 most important original-language words, which add up to almost 97,000 occurrences.",
          "Cross-references and parallel passages, such as the Gospel accounts of the same event.",
          "Builds a sermon or study outline from the text, the references and the interlinear; AI refines it afterwards.",
          "Notes, reading plans (including chronological order) and AI-powered verse search.",
          "Bible commentaries integrated with the text (translation in progress).",
        ],
        highlight:
          "The AI key never lives on the phone: the app sends only parameters, and the AI request is built on the server, so nobody can use the account as a free assistant.",
        images: [
          {
            alt: "Lumen home screen: verse of the day with a John Wesley commentary, sermon and note counters, reading in progress and shortcuts to the Bible, sermons, studies, notes, search and reading plan.",
            caption: "Home: verse of the day with commentary, reading in progress and shortcuts.",
          },
          {
            alt: "Lumen book picker, with search and books grouped by section, in canonical or chronological order.",
            caption: "Book picker, in canonical or chronological order.",
          },
          {
            alt: "Lumen reading plan editor: canonical or chronological order, book selection, period, start date and a summary with chapters per day.",
            caption: "Reading plan: books, period and chapters per day calculated.",
          },
        ],
      },
    ],
  },
  otherWorks: {
    title: "Other work",
    openLabel: "Open",
    items: [
      {
        id: "painel-enel-rj",
        name: "Continuity dashboard: Enel RJ",
        description: "Dashboard built on ANEEL open data about DEC and FEC from 2010 to 2026. Each chart opens with the conclusion it shows: regulated DEC fell 71%, but with excluded hours added back, customers' time without power rose 41% since 2021.",
        imageAlt: "Top of the Enel RJ continuity dashboard, with the headline and the four 2025 indicators.",
      },
      {
        id: "site-legno",
        name: "Legno Design website",
        description: "The furniture shop's company website, with services, opening hours, online booking and a newsletter. Built by me on Wix.",
        imageAlt: "Home page of the Legno Design website, with the menu and a photo of a custom kitchen.",
      },
      {
        id: "landing-legno",
        name: "Legno Design landing page",
        description: "Quote request page with a pre-registration form and WhatsApp. Every lead goes straight into the Legno Design ERP kanban and arrives by email; people who click WhatsApp are highlighted as the hottest leads.",
        imageAlt: "Top of the Legno Design landing page, with the headline and the quote buttons.",
      },
      {
        id: "revisao-9ano",
        name: "9th Grade Review",
        description: "Study system adapted for 9th grade, with explanations designed for students with ADHD: 8 subjects, summaries in short blocks, 240 questions in non-repeating mock tests, an explanation for every answer and read-aloud.",
        imageAlt: "Screen of the 9th Grade Review system, with the subjects, the summary and mock test tabs, and a summary block.",
      },
    ],
  },
  howIWork: {
    title: "How I work",
    steps: [
      {
        title: "I understand the operation.",
        text: "I start from the real problem, the business rules and the people who will use it.",
      },
      {
        title: "I specify.",
        text: "I write requirements, flows and logic before any code.",
      },
      {
        title: "I direct the AI.",
        text: "AI agents implement; I decide, guide and approve.",
      },
      {
        title: "I validate.",
        text: "I test as owner and as user until it works in practice.",
      },
    ],
  },
  background: {
    title: "Background",
    stats: [
      { value: "20 years", label: "in energy and infrastructure" },
      { value: "700+", label: "people led" },
      { value: "R$ 7M/month", label: "largest budget managed" },
      { value: "−10%", label: "costs cut in a turnaround" },
    ],
    milestones: [
      {
        period: "2004–2016",
        title: "Enel Group",
        text: "Five promotions in 12 years, from assistant to specialist: operational intelligence, collections, loss reduction and electronic metering. In 2014, the region reached the lowest loss rate in the company.",
      },
      {
        period: "2016",
        title: "Comfica",
        text: "Invited by the CEO to turn around a R$ 7 million/month contract with 700+ employees; saved R$ 700 thousand/month without losing service levels.",
      },
      {
        period: "2017–2019",
        title: "Built from scratch",
        text: "A business of my own and the engineering unit of a glass distributor, which reached R$ 1.5 million/month in revenue.",
      },
      {
        period: "2020–2026",
        title: "Field contracts",
        text: "Coordinated operations and contracts at energy service contractors: up to 4,000 work orders per month, SLA above 98%, 24/7 crisis management during severe weather.",
      },
      {
        period: "Today",
        title: "AI systems",
        text: "I turn that experience into software, specifying and directing AI agents.",
      },
    ],
    educationTitle: "Education",
    education: [
      "B.Sc. in Production Engineering, coursework completed (degree conferral expected Feb 2027).",
      "Postgraduate degree in Data Science and Artificial Intelligence (diploma issued after the bachelor's degree conferral).",
      "Postgraduate degree in Electrical Engineering with a focus on Automation Systems (diploma issued after the bachelor's degree conferral).",
      "Electrotechnical Technician.",
    ],
  },
  articles: {
    title: "Articles",
    intro: "Short articles on artificial intelligence, AI-native development and the invisible decisions that make a system work.",
    readLabel: "Read article",
    minutesLabel: "min read",
    backLabel: "Back to portfolio",
    items: [
      {
        id: "access-claude-code",
        slug: "from-access-to-claude-code",
        title: "From Access to Claude Code: how I build systems without writing code",
        summary: "Programming logic, data modeling and 20 years of operations, applied to directing AI agents. What I do, what the AI does, and why the specification comes first.",
        date: "2026-11-16",
        readingMinutes: 4,
        tags: ["AI-native", "Method"],
        body: [
          { type: "h2", text: "Where it started" },
          { type: "p", text: "My first contact with systems was Microsoft Access. In 2004 and 2005, at Enel, I built forms, reports and operational databases with VBA (Visual Basic for Applications). It was not a large system, but it demanded the essentials: thinking in logic, breaking a process into steps (an algorithm), modeling tables and relationships, and anticipating what happens when the data comes in wrong." },
          { type: "p", text: "That foundation stayed with me. As an operations and contracts manager, I was often the bridge between the field and the development team: explaining the business rule, drawing the flow and checking whether the system did what the field needed." },
          { type: "h2", text: "What changed with AI" },
          { type: "p", text: "Today, the code of my systems is written by AI agents, 100% with Claude Code and Codex. I do not write the lines of code. My job is different, and it is the same as always: understand the problem, specify the system, make the decisions and validate the result." },
          { type: "p", text: "The difference is scale. What used to require a team for each stage now fits into a well-directed conversation with agents that implement, test and fix. But agents are only as good as the plan they receive." },
          { type: "h2", text: "The specification comes before the code" },
          { type: "p", text: "FSM 360 shows this better than any explanation. It does not have a single line of code yet, on purpose. Before building, I wrote the complete specification: the shift crew as the unit of control, 16 blocking rules across modules, what can be done offline and what needs validation, the domain model and the metrics. When the agents start implementing, every decision will already be made and written down." },
          { type: "p", text: "The other projects follow the same rule. In TEMPO-RJ and Eco Vox, the project document states up front that it precedes the code: when the code contradicts the document, the document is updated first." },
          { type: "h2", text: "Validating as owner and as user" },
          { type: "p", text: "Specifying is not enough; you have to check. In Legno Design ERP, I am the user: sales and finance run every day at my furniture shop. In TEMPO-RJ, the system measures its own error and shows when the forecast was too optimistic. In Eco Vox, every important rule has an automated test: 244 of them." },
          { type: "h2", text: "What this is not" },
          { type: "p", text: "It is not saying that AI replaces engineering. It is the opposite: the more AI does, the more it matters who decides what it should do. My role is to bring context, judgment and accountability, with the experience of someone who spent 20 years seeing what happens when a system does not fit the operation." },
        ],
      },
      {
        id: "design-system-referencia",
        slug: "from-reference-to-design-system",
        title: "From reference to design system: how I use AI to create a product's look",
        summary: "I don't design screens from scratch. I start from a reference, ask the AI to extract a design system from it and decide what stays out. This portfolio was built that way.",
        date: "2026-11-18",
        readingMinutes: 4,
        tags: ["Design system", "Method"],
        body: [
          { type: "h2", text: "The problem with asking for “a nice website”" },
          { type: "p", text: "When you ask an AI for a screen without a reference, it gives you the average of everything it has seen: pretty, generic and different every time. The second page doesn't match the first, and every tweak pulls the look in a new direction. What's missing isn't the AI's ability; it's a standard for it to follow." },
          { type: "h2", text: "Starting from a reference" },
          { type: "p", text: "So I start from a reference: a page I admire, a designer's suggestion or even a video with animations. Before anything else, I make clear what it is for. For my portfolio, I received a designer's suggestion with the site architecture and mood images. The content was already approved; the reference was only for the look. That sentence changed the work: the AI didn't rewrite a single text, it only translated the style." },
          { type: "h2", text: "Extracting the design system before the screens" },
          { type: "p", text: "The next step is to have the AI read the reference and write the design system before building any page: the palette, the fonts, the spacing, the components (cards, tags, timeline) and the motion rules. In the portfolio, that became the dark palette in petrol blue and cyan, the Manrope and DM Mono font pair and a set of color variables used by every component. From then on, each new screen comes from the same standard, not from a one-off request." },
          { type: "h2", text: "Deciding what stays out" },
          { type: "p", text: "A reference is not a mold. If you say nothing, the AI copies everything, including what doesn't fit. Part of my job is saying no: I removed the frame the suggestion placed around the animated core, kept only the dark theme and put “AI” and “SYSTEM BUILDER” on the central sphere. Another time, I watched a video showcasing animated pages and took a single idea from it: wireframe shapes floating in layers, with parallax. It came in using the site's colors, as a subtle background behind the text." },
          { type: "p", text: "The criterion is always the same: does the effect help the information or compete with it? Animation that gets in the way of reading, slows down phones or ignores people who ask their system for less motion stays out, however beautiful it is." },
          { type: "h2", text: "Testing before publishing" },
          { type: "p", text: "Every visual change goes to a test address first, separate from the live site. There I check it on desktop and mobile, ask for adjustments and only approve after measuring: the portfolio's performance stays above 90 on Lighthouse, with accessibility, best practices and SEO at 100. If an effect drags those numbers down, it goes back to the table." },
          { type: "h2", text: "Why it matters" },
          { type: "p", text: "It's the same principle I use for code: the specification comes first. For the look, the specification is the design system. With it, the AI stops improvising and starts building within a standard, and I keep what is mine: choosing the reference, saying what fits and what doesn't, and approving the result." },
        ],
      },
    ],
  },
  contact: {
    title: "Contact",
    text: "Open to opportunities in AI product, solutions and implementation. Remote or hybrid.",
    linkedinLabel: "LinkedIn",
    githubLabel: "GitHub",
    emailLabel: "Email",
  },
  footer: {
    builtWith: "Built with Claude Code.",
  },
};

export default en;
