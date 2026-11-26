# Especificação — Site pessoal / portfólio de Luis Claudio Lopes da Cruz

Documento para o Claude Code. Leia inteiro antes de criar qualquer arquivo.
Itens marcados com **[CONFIRMAR]** devem ser perguntados ao Luis antes de publicar; não invente o conteúdo.

---

## 1. Objetivo

Site de página única que prova, com sistemas reais, o posicionamento de Luis:
**AI Systems Builder** — 20 anos de operações em utilities + sistemas construídos com IA.

Público: recrutadores e empresas (Brasil e exterior) avaliando Luis para cargos como
AI Solutions Architect, AI Product Manager, Technical Product Manager, Solutions Engineer e Operations/Implementation.

O visitante precisa entender em 10 segundos: quem é, o que construiu, como trabalha, como falar com ele.

## 2. Decisões técnicas (já tomadas)

- **Framework:** Next.js (App Router) + TypeScript + Tailwind CSS.
- **Site estático:** sem banco de dados, sem Supabase, sem autenticação, sem variáveis de ambiente secretas.
- **Hospedagem:** Vercel, plano gratuito, deploy automático a partir do GitHub.
- **Repositório:** público, na conta GitHub `LuisLopesCruz`, nome `portfolio`.
- **Pasta local:** `C:\Portfolio`.
- **Sem dependências desnecessárias:** nada de CMS, biblioteca de animação pesada ou analytics pago.

## 3. Idiomas

- Três idiomas: **Português (BR)**, **English**, **Español**.
- Rotas: `/` (pt-BR), `/en`, `/es`. Cada rota é uma página estática completa (bom para SEO e para compartilhar link direto no idioma).
- **Seletor de idioma** fixo no topo, sempre visível: `PT | EN | ES`, com o idioma atual destacado.
- **Primeira visita em `/`:** se o navegador estiver em inglês ou espanhol e o visitante ainda não tiver escolhido idioma, redirecionar para `/en` ou `/es`. Qualquer outro idioma fica em português. A escolha manual pelo botão é salva em `localStorage` e sempre prevalece.
  - Se o Luis preferir abrir sempre em português, basta remover esse redirecionamento.
- Tags `hreflang` e atributo `lang` corretos em cada rota.
- Todos os textos ficam em um arquivo por idioma (`content/pt.ts`, `content/en.ts`, `content/es.ts`) com a mesma estrutura. Nenhum texto fixo dentro dos componentes.

## 4. Estrutura da página

1. **Topo:** nome, seletor de idioma, links âncora (Projetos, Como trabalho, Trajetória, Contato).
2. **Hero:** título, subtítulo, dois botões (Ver projetos / Contato).
3. **Projetos:** 5 cartões, na ordem da seção 6.
4. **Como trabalho:** 4 passos.
5. **Trajetória:** resumo profissional + formação.
6. **Contato:** LinkedIn, GitHub, e-mail.
7. **Rodapé:** nome, ano, "Construído com Claude Code".

Cada cartão de projeto tem: nome, status (selo), uma frase de problema, o que o sistema faz (3 a 4 itens), stack (tags), imagem e, quando existir, link.

## 5. Design

- Sóbrio e técnico, com cara de engenharia, não de agência. Muito espaço em branco, tipografia grande e legível.
- Tema claro por padrão, com suporte a tema escuro seguindo o sistema do visitante.
- Uma única cor de destaque. **[CONFIRMAR]** cor preferida do Luis; se não tiver, usar um azul-petróleo.
- Totalmente responsivo: precisa ficar perfeito no celular.
- Acessibilidade: contraste AA, navegação por teclado, `alt` em todas as imagens.
- Performance: imagens otimizadas com `next/image`, nota 90+ no Lighthouse.

## 6. Projetos — fatos (base para os três idiomas)

| # | Projeto | Status | Link |
|---|---|---|---|
| 1 | Legno Design ERP | Em uso | sem link público (uso interno) |
| 2 | TEMPO-RJ | No ar | https://tempo-rj-luis-claudio-lopes-da-cruzs-projects.vercel.app/ |
| 3 | FSM 360 | Em especificação | sem link |
| 4 | Eco Vox | Em desenvolvimento | sem link |
| 5 | Lumen | **[CONFIRMAR]** status | sem link |

**Stacks:**
- Legno Design ERP: Python, Django, Claude API.
- TEMPO-RJ: Vercel, Open-Meteo. **[CONFIRMAR]** linguagem/framework usados.
- FSM 360: TypeScript, Next.js, Expo (React Native), Supabase, SQLite, PowerSync.
- Eco Vox: Android, Claude API. **[CONFIRMAR]** framework usado no app.
- Lumen: Supabase. **[CONFIRMAR]** framework usado no app.

**Imagens:** o Luis vai fornecer os prints. Salvar em `public/projects/<projeto>/`. Enquanto não chegarem, usar um bloco neutro com o nome do projeto, sem imagem genérica de banco.

**Regra obrigatória:** nenhum print pode mostrar dados reais de clientes, fornecedores, preços ou pessoas. Prints do ERP devem usar dados fictícios.

## 7. Regras de conteúdo

- Luis **não** se apresenta como programador. Nunca usar "Software Engineer", "desenvolvedor" ou "developer" para descrevê-lo.
- Projetos em desenvolvimento são sempre rotulados como tal. Não descrever como pronto o que não está.
- Não incluir números de salário, CPF, telefone ou endereço.
- E-mail de contato: **[CONFIRMAR]** qual e-mail o Luis quer exibir publicamente.

---

## 8. Textos — Português (BR)

**Hero**
- Título: Construo sistemas com Inteligência Artificial para operações reais.
- Subtítulo: 20 anos gerenciando operações de campo no setor elétrico. Hoje transformo esse conhecimento em software: especifico o problema, as regras e a lógica, e conduzo agentes de IA na construção.
- Botões: Ver projetos · Contato

**Projetos** (título da seção: Projetos)

1. **Legno Design ERP** — Em uso
   - Problema: uma marcenaria de móveis planejados recebe cotações de fornecedores em PDF, foto e print de WhatsApp, cada uma num formato.
   - O que faz:
     - Lê cotações em formatos diferentes e extrai itens e preços com IA.
     - Cruza cada item com o catálogo interno por correspondência semântica.
     - Recomenda a melhor decisão de compra.
     - Reúne despesas, clientes, fornecedores, materiais e orçamentos em um só sistema.

2. **TEMPO-RJ** — No ar
   - Problema: saber com antecedência se o clima vai aumentar as ocorrências de falta de energia.
   - O que faz:
     - Consolida a previsão de oito famílias de modelos meteorológicos para 92 municípios do Rio de Janeiro.
     - Mostra a probabilidade de chuva hora a hora, conforme a concordância entre os modelos.
     - Estima o impacto do clima nas ocorrências, separando vento, raios e convecção.
     - Acompanha o erro de cada modelo e a calibração das probabilidades.
   - Link: Ver o sistema

3. **FSM 360** — Em especificação
   - Problema: empreiteiras de energia e saneamento perdem dinheiro com falhas de controle, e o fechamento da ordem de serviço em campo é o maior gargalo.
   - O que faz:
     - Gestão de serviços de campo de ponta a ponta, do planejamento ao fechamento da ordem de serviço.
     - Módulos para painel operacional, segurança, supervisão, equipes, viaturas, ferramental e materiais.
     - Aplicativo de campo que funciona sem internet e sincroniza depois.
     - Liberação da equipe pelo supervisor e acompanhamento de produtividade.

4. **Eco Vox** — Em desenvolvimento
   - Problema: aprender inglês do zero à fluência com um caminho estruturado e correção individual.
   - O que faz:
     - Trilha de estudo baseada nos níveis do CEFR.
     - Preparação para exames como TOEFL, IELTS, TOEIC e Cambridge.
     - Tutor e corretor de redações com IA.
     - Prática de fala com avaliação de pronúncia.

5. **Lumen** — **[CONFIRMAR]** status
   - Problema: **[CONFIRMAR]** uma frase com o Luis.
   - O que faz:
     - Aplicativo bíblico. **[CONFIRMAR]** 3 funções principais com o Luis.
     - Infraestrutura em nuvem.

**Como trabalho** (título: Como trabalho)
1. **Entendo a operação.** Parto do problema real, das regras do negócio e de quem vai usar.
2. **Especifico.** Escrevo requisitos, fluxos e lógica antes de qualquer código.
3. **Conduzo a IA.** Agentes de IA implementam; eu decido, oriento e aprovo.
4. **Valido.** Testo como dono e como usuário, até funcionar na prática.

**Trajetória** (título: Trajetória)
- Cerca de 20 anos em operações no setor elétrico, dos dois lados da cadeia: 12 anos na concessionária (Grupo Enel, 5 promoções), em inteligência operacional, perdas, cobrança e medição eletrônica, e a liderança de contratos em empreiteiras de energia.
- Coordenação e gerência de contratos de campo com até 700 colaboradores e até 4.000 ordens de serviço por mês, com SLA acima de 98%.
- Turnaround de um contrato de R$ 7 milhões/mês com mais de 700 colaboradores: economia de 10% dos custos (R$ 700 mil/mês), mantendo os SLAs do cliente.
- Formação:
  - Graduado em Engenharia de Produção (aguardando colação de grau, previsão fev/2027).
  - Pós-graduado em Ciência de Dados e Inteligência Artificial (diploma emitido após a colação de grau da graduação).
  - Pós-graduado em Engenharia Elétrica com ênfase em Sistemas de Automação (diploma emitido após a colação de grau da graduação).
  - Técnico em Eletrotécnica.

**Contato** (título: Contato)
- Texto: Aberto a oportunidades em produto, soluções e implantação de IA. Remoto ou híbrido.
- LinkedIn: https://www.linkedin.com/in/luis-claudio-lopes-da-cruz/
- GitHub: https://github.com/LuisLopesCruz
- E-mail: **[CONFIRMAR]**

**Selos de status:** Em uso · No ar · Em desenvolvimento · Em especificação
**Rodapé:** Construído com Claude Code.

---

## 9. Textos — English

**Hero**
- Title: I build AI-powered systems for real-world operations.
- Subtitle: 20 years running field operations in the electric utility sector. Today I turn that experience into software: I define the problem, the rules and the logic, and I direct AI agents to build it.
- Buttons: See projects · Contact

**Projects** (section title: Projects)

1. **Legno Design ERP** — In use
   - Problem: a custom furniture shop receives supplier quotes as PDFs, photos and WhatsApp screenshots, each in a different format.
   - What it does:
     - Reads quotes in different formats and extracts items and prices with AI.
     - Matches each item to the internal catalog using semantic matching.
     - Recommends the best purchase decision.
     - Brings expenses, clients, suppliers, materials and quotations into one system.

2. **TEMPO-RJ** — Live
   - Problem: knowing in advance whether the weather will drive up power outage calls.
   - What it does:
     - Combines forecasts from eight weather model families for 92 municipalities in Rio de Janeiro state.
     - Shows hour-by-hour rain probability based on how many models agree.
     - Estimates weather impact on outage calls, split into wind, lightning and convection.
     - Tracks each model's error and the calibration of the probabilities.
   - Link: View the system

3. **FSM 360** — In specification
   - Problem: energy and sanitation contractors lose money to control failures, and closing work orders in the field is the biggest bottleneck.
   - What it does:
     - End-to-end field service management, from planning to work order closing.
     - Modules for operations dashboard, safety, supervision, crews, vehicles, tools and materials.
     - Field app that works offline and syncs later.
     - Supervisor crew release and productivity tracking.

4. **Eco Vox** — In development
   - Problem: learning English from zero to fluency with a structured path and individual correction.
   - What it does:
     - Study path based on CEFR levels.
     - Preparation for exams such as TOEFL, IELTS, TOEIC and Cambridge.
     - AI tutor and essay corrector.
     - Speaking practice with pronunciation assessment.

5. **Lumen** — **[CONFIRMAR]** status
   - Problem: **[CONFIRMAR]**
   - What it does:
     - Bible app. **[CONFIRMAR]** 3 main features.
     - Cloud infrastructure.

**How I work** (title: How I work)
1. **I understand the operation.** I start from the real problem, the business rules and the people who will use it.
2. **I specify.** I write requirements, flows and logic before any code.
3. **I direct the AI.** AI agents implement; I decide, guide and approve.
4. **I validate.** I test as owner and as user until it works in practice.

**Background** (title: Background)
- About 20 years in electric utility operations, on both sides of the value chain: 12 years at the utility (Enel Group, 5 promotions) in operational intelligence, loss reduction, collections and electronic metering, and leading field contracts at energy service contractors.
- Coordinated and managed field service contracts with up to 700 employees and up to 4,000 work orders per month, with SLA above 98%.
- Turnaround of a R$ 7 million/month contract with 700+ employees: 10% cost reduction (R$ 700 thousand/month) while keeping the client's SLAs.
- Education:
  - B.Sc. in Production Engineering, coursework completed (degree conferral expected Feb 2027).
  - Postgraduate degree in Data Science and Artificial Intelligence (diploma issued after the bachelor's degree conferral).
  - Postgraduate degree in Electrical Engineering with a focus on Automation Systems (diploma issued after the bachelor's degree conferral).
  - Electrotechnical Technician.

**Contact** (title: Contact)
- Text: Open to opportunities in AI product, solutions and implementation. Remote or hybrid.
- LinkedIn · GitHub · Email (same links as above)

**Status badges:** In use · Live · In development · In specification
**Footer:** Built with Claude Code.

---

## 10. Textos — Español

**Hero**
- Título: Construyo sistemas con Inteligencia Artificial para operaciones reales.
- Subtítulo: 20 años gestionando operaciones de campo en el sector eléctrico. Hoy convierto esa experiencia en software: defino el problema, las reglas y la lógica, y dirijo agentes de IA en la construcción.
- Botones: Ver proyectos · Contacto

**Proyectos** (título de la sección: Proyectos)

1. **Legno Design ERP** — En uso
   - Problema: una carpintería de muebles a medida recibe cotizaciones de proveedores en PDF, fotos y capturas de WhatsApp, cada una en un formato distinto.
   - Qué hace:
     - Lee cotizaciones en distintos formatos y extrae artículos y precios con IA.
     - Cruza cada artículo con el catálogo interno mediante correspondencia semántica.
     - Recomienda la mejor decisión de compra.
     - Reúne gastos, clientes, proveedores, materiales y presupuestos en un solo sistema.

2. **TEMPO-RJ** — En línea
   - Problema: saber con anticipación si el clima va a aumentar los reportes de cortes de energía.
   - Qué hace:
     - Consolida el pronóstico de ocho familias de modelos meteorológicos para 92 municipios del estado de Río de Janeiro.
     - Muestra la probabilidad de lluvia hora a hora, según la coincidencia entre los modelos.
     - Estima el impacto del clima en los reportes, separando viento, rayos y convección.
     - Sigue el error de cada modelo y la calibración de las probabilidades.
   - Enlace: Ver el sistema

3. **FSM 360** — En especificación
   - Problema: las contratistas de energía y saneamiento pierden dinero por fallas de control, y el cierre de la orden de trabajo en campo es el mayor cuello de botella.
   - Qué hace:
     - Gestión de servicios de campo de punta a punta, desde la planificación hasta el cierre de la orden de trabajo.
     - Módulos de panel operativo, seguridad, supervisión, cuadrillas, vehículos, herramientas y materiales.
     - Aplicación de campo que funciona sin conexión y sincroniza después.
     - Liberación de la cuadrilla por el supervisor y seguimiento de productividad.

4. **Eco Vox** — En desarrollo
   - Problema: aprender inglés desde cero hasta la fluidez con un camino estructurado y corrección individual.
   - Qué hace:
     - Ruta de estudio basada en los niveles del MCER.
     - Preparación para exámenes como TOEFL, IELTS, TOEIC y Cambridge.
     - Tutor y corrector de redacciones con IA.
     - Práctica oral con evaluación de pronunciación.

5. **Lumen** — **[CONFIRMAR]** status
   - Problema: **[CONFIRMAR]**
   - Qué hace:
     - Aplicación bíblica. **[CONFIRMAR]** 3 funciones principales.
     - Infraestructura en la nube.

**Cómo trabajo** (título: Cómo trabajo)
1. **Entiendo la operación.** Parto del problema real, de las reglas del negocio y de quién lo va a usar.
2. **Especifico.** Escribo requisitos, flujos y lógica antes de cualquier código.
3. **Dirijo la IA.** Los agentes de IA implementan; yo decido, oriento y apruebo.
4. **Valido.** Pruebo como dueño y como usuario, hasta que funcione en la práctica.

**Trayectoria** (título: Trayectoria)
- Cerca de 20 años en operaciones del sector eléctrico, de los dos lados de la cadena: 12 años en la distribuidora (Grupo Enel, 5 ascensos), en inteligencia operativa, pérdidas, cobranza y medición electrónica, y el liderazgo de contratos en contratistas de energía.
- Coordinación y gerencia de contratos de campo con hasta 700 empleados y hasta 4.000 órdenes de trabajo por mes, con SLA superior al 98%.
- Turnaround de un contrato de R$ 7 millones/mes con más de 700 empleados: reducción del 10% de los costos (R$ 700 mil/mes), manteniendo los SLA del cliente.
- Formación:
  - Graduado en Ingeniería de Producción (pendiente de colación de grado, prevista para feb/2027).
  - Posgrado en Ciencia de Datos e Inteligencia Artificial (diploma emitido tras la colación de grado).
  - Posgrado en Ingeniería Eléctrica con énfasis en Sistemas de Automatización (diploma emitido tras la colación de grado).
  - Técnico en Electrotecnia.

**Contacto** (título: Contacto)
- Texto: Abierto a oportunidades en producto, soluciones e implementación de IA. Remoto o híbrido.
- LinkedIn · GitHub · Correo (mismos enlaces)

**Sellos de estado:** En uso · En línea · En desarrollo · En especificación
**Pie de página:** Construido con Claude Code.

---

## 11. Ordem de execução para o Claude Code

1. Perguntar ao Luis todos os itens **[CONFIRMAR]** de uma vez.
2. Criar o projeto em `C:\Portfolio` e os três arquivos de conteúdo.
3. Montar a página em português; validar no navegador, em desktop e celular.
4. Ativar `/en` e `/es` e o seletor de idioma; testar a troca e o redirecionamento da primeira visita.
5. Inserir os prints quando o Luis enviar; conferir que não há dados reais.
6. Criar o repositório público `portfolio` no GitHub e enviar o código.
7. Conectar o repositório à Vercel e publicar.
8. Entregar ao Luis o endereço final para ele colocar no perfil da NaGringa e no LinkedIn.

## 12. Critérios de aceite

- As três rotas abrem sem erro e com o mesmo conteúdo em cada idioma.
- O seletor troca de idioma mantendo a posição na página.
- Nenhum **[CONFIRMAR]** restante no site publicado.
- Nenhum dado real de terceiros em imagens.
- Lighthouse 90+ em desempenho e acessibilidade no celular.

---

## 13. Decisões confirmadas com o Luis (2026-11-15)

Estas respostas substituem os **[CONFIRMAR]** acima. As stacks foram conferidas nas pastas de cada projeto.

- **Cor de destaque:** azul-petróleo (ex.: `#0F6E7A`), com ajuste de contraste AA no tema escuro.
- **E-mail público:** luis.cl.lopes.79@gmail.com
- **Pastas dos projetos:** `C:\GESTAOLEGNO` (Legno), `C:\TEMPO` (TEMPO-RJ), `C:\FSM360`, `C:\EcoVox`, `C:\APP_Pregador` (Lumen).

**Stacks (tags do cartão):**
- Legno Design ERP: Python, Flask, React, Claude API. *(Corrige a seção 6: o backend é Flask, não Django.)*
- TEMPO-RJ: TypeScript, Supabase, PostgreSQL, Open-Meteo, Vercel.
- FSM 360: como na seção 6.
- Eco Vox: TypeScript, Expo (React Native), Supabase, Claude API.
- Lumen: TypeScript, Expo (React Native), Supabase, Claude API.

**Lumen:**
- Status: **Em uso** (uso pessoal). Um dos itens do cartão avisa que a tradução dos comentários ainda está em andamento.
- Problema (pt): Quem prega ou estuda a Bíblia precisa de texto, comentários, anotações e esboços de sermão espalhados em vários lugares.
- O que faz (pt):
  - Leitura da Bíblia com busca, texto interlinear e números de Strong.
  - Editor de esboços de sermão, com geração assistida por IA.
  - Anotações e plano de leitura vinculados aos versículos.
  - Comentários bíblicos integrados ao texto (tradução em andamento).
- O item "Infraestrutura em nuvem" sai, porque o Supabase já aparece na stack.
- As versões em inglês e espanhol são traduções diretas destes textos.

**Atualizações a partir dos currículos (2026-11-15):**
- Formação reescrita nos três idiomas (graduação aguardando colação, previsão fev/2027; diplomas das pós emitidos após a colação).
- FSM 360: selo **Em especificação** (a pasta tem só documentos, ainda sem código). Novo selo nos três idiomas.
- Trajetória: entram os dois lados da cadeia (Enel + empreiteiras, 5 promoções), até 4.000 OS/mês com SLA acima de 98% e o turnaround de R$ 7 milhões/mês com economia de 10%.
- Eco Vox: novo item, prática de fala com avaliação de pronúncia.
- Legno Design ERP: cartão mantido como na seção 8.

**Atualização dos cartões e da Trajetória (2026-11-15):**
- Os cartões de projeto ganharam 3 números, até 6 funções e um destaque técnico, com base na documentação de cada pasta. O FSM 360 usa o rótulo "O que vai fazer". No Eco Vox, o tutor e o corretor de redações com IA aparecem como "em construção". O Eco Vox ganhou Azure Speech na stack.
- A Trajetória passou a ter 4 números no topo e 5 marcos (Enel, Comfica, implantações do zero, contratos de campo, sistemas com IA). Saíram Smart City Búzios e "Proprietário da Legno Design".
- A partir daqui, os textos oficiais são os de `content/pt.ts`, `content/en.ts` e `content/es.ts`. As seções 8 a 10 desta spec ficam como histórico.

**Redesenho visual (2026-11-16):** a partir de uma sugestão de designer (referência local, fora do repositório), o site passa a ter **tema escuro único** e **azul-petróleo + ciano** como cores de destaque, ambos decididos pelo Luis. Isso substitui os itens da seção 5 sobre tema claro por padrão e cor única. Tipografia Manrope + DM Mono. Animações em canvas 2D e CSS 3D (sem Three.js, pelo desempenho), que respeitam "reduzir movimento". O conteúdo aprovado não muda.

**Outros trabalhos, artigos e painel (2026-11-18):** entra a faixa "Outros trabalhos" (site e landing page da Legno, Revisão 9º Ano e o painel de continuidade da Enel RJ, feito com dados abertos da ANEEL) e um segundo artigo, sobre o design system.

**Projetos e medição (2026-11-19):** cada projeto passa a ter o problema estruturado e 10 ou mais funções, com as 5 principais à vista e o resto em "Ler mais". Medição de visitas com Vercel Web Analytics (sem cookies) e, só depois do "Aceitar" no aviso de cookies, Amplitude no plano gratuito (cliques, retorno e cidade). Substitui a ideia de não ter nenhuma medição; o site continua estático.

**Hero e método (2026-11-25):** o núcleo 3D dá lugar a uma esfera de partículas em canvas 2D, sem bibliotecas, que se reorganiza na rede das etapas de "Como trabalho", com "AI SYSTEMS BUILDER" fixo no centro. "Como trabalho" ganha a 5ª etapa, Evoluo. Saem as formas em wireframe do fundo. Nova página "Como este site foi feito", com o próprio portfólio como case.
