import type { Content } from "./types";

const pt: Content = {
  locale: "pt",
  htmlLang: "pt-BR",
  meta: {
    title: "Luis Claudio Lopes da Cruz — AI Systems Builder",
    description:
      "20 anos de operações de campo no setor elétrico e sistemas reais construídos com Inteligência Artificial: ERP, previsão meteorológica de impacto, gestão de serviços de campo e aplicativos.",
  },
  nav: {
    skipToContent: "Pular para o conteúdo",
    sectionsLabel: "Seções",
    projects: "Projetos",
    howIWork: "Como trabalho",
    background: "Trajetória",
    articles: "Artigos",
    contact: "Contato",
    languageLabel: "Idioma",
    languageNames: { pt: "Português", en: "English", es: "Español" },
  },
  hero: {
    eyebrow: "AI Systems Builder",
    title: "Construo sistemas com Inteligência Artificial para operações reais.",
    titleHighlight: "Inteligência Artificial",
    coreTitle: "AI",
    coreSubtitle: "SYSTEM BUILDER",
    subtitle:
      "20 anos gerenciando operações de campo no setor elétrico. Hoje transformo esse conhecimento em software: especifico o problema, as regras e a lógica, e conduzo agentes de IA na construção.",
    ctaProjects: "Ver projetos",
    ctaContact: "Contato",
  },
  projects: {
    title: "Projetos",
    problemLabel: "Problema",
    featuresLabel: "O que faz",
    stackLabel: "Stack",
    metricsLabel: "Em números",
    highlightLabel: "Destaque",
    statusLabels: {
      inUse: "Em uso",
      live: "No ar",
      closedBeta: "Beta fechado",
      inDevelopment: "Em desenvolvimento",
      inSpecification: "Em especificação",
    },
    externalLinkHint: "abre em nova aba",
    imagePlaceholder: "Imagem em breve",
    enlargeImage: "Ampliar imagem",
    galleryViewAll: "Ver as {n} telas",
    galleryClose: "Fechar",
    galleryPrevious: "Imagem anterior",
    galleryNext: "Próxima imagem",
    galleryOf: "de",
    items: [
      {
        id: "legno",
        problem:
          "Uma marcenaria de móveis planejados recebe cotações de fornecedores em PDF, foto e print de WhatsApp, cada uma num formato.",
        metrics: [
          { value: "26", label: "telas" },
          { value: "70", label: "tabelas no banco" },
          { value: "2.626", label: "produtos no catálogo" },
        ],
        features: [
          "Cobre o ciclo inteiro da marcenaria: lead, orçamento, contrato, pedido, produção e entrega.",
          "Lê cotações de fornecedores em PDF, foto ou print de WhatsApp e extrai itens e preços com IA.",
          "Cruza cada item com o catálogo por correspondência semântica e recomenda a compra de menor custo.",
          "Calcula o preço do orçamento com frete, comissões, impostos, taxa de cartão, ponto de equilíbrio e markup, e gera proposta e contrato em PDF.",
          "Financeiro com fluxo de caixa (DFC), DRE, recibos e relatórios em Excel e PDF.",
          "Em construção: um estúdio que desenha o ambiente em planta, monta os móveis pelo padrão construtivo e devolve a lista de peças e ferragens.",
        ],
        highlight:
          "A IA não depende de um fornecedor só: quando um provedor fica sem saldo, o sistema passa sozinho para o próximo (Anthropic, OpenAI ou Huawei) e registra o motivo e o custo de cada chamada.",
        images: [
          {
            alt: "Tela de cotação do Legno Design ERP com o comparativo de preços entre comprar tudo de um fornecedor ou mesclar fornecedores, com a opção recomendada destacada. Nomes e valores borrados.",
            caption: "Comparativo de preços montado a partir das cotações dos fornecedores. Nomes e valores borrados.",
          },
          {
            alt: "Dashboard executivo do Legno Design ERP com indicadores comerciais, de produção e financeiros, funil, produção por etapa e fluxo de caixa. Valores borrados.",
            caption: "Dashboard executivo: comercial, produção e financeiro numa tela. Valores borrados.",
          },
          {
            alt: "Demonstrativo de fluxo de caixa mensal do Legno Design ERP, com o plano de contas detalhado. Valores borrados.",
            caption: "Fluxo de caixa (DFC) mês a mês, com o plano de contas completo. Valores borrados.",
          },
        ],
      },
      {
        id: "tempo",
        problem:
          "Saber com antecedência se o clima vai aumentar as ocorrências de falta de energia.",
        metrics: [
          { value: "8", label: "famílias de modelos meteorológicos" },
          { value: "92", label: "municípios do RJ" },
          { value: "4 anos", label: "de interrupções da ANEEL no modelo" },
        ],
        features: [
          "Consolida a previsão de oito famílias de modelos meteorológicos (ICON, GFS, ECMWF e outras) para os 92 municípios do estado, hora a hora, até 5 dias.",
          "Dá a cada modelo um peso proporcional ao erro medido em mais de 200 mil comparações com a chuva observada.",
          "Estima o impacto do clima nas ocorrências de falta de energia com um modelo treinado em 4 anos de dados da ANEEL, separando vento, chuva e convecção.",
          "Mostra a própria calibração: compara a probabilidade anunciada com o que de fato aconteceu e confere o impacto previsto contra os registros da ANEEL.",
          "Painel com busca de município, ranking dos 5 municípios de maior risco e resumo por distribuidora.",
          "Custo zero: coleta agendada e banco de dados no plano gratuito, sem servidor próprio.",
        ],
        highlight:
          "Medir em vez de supor: o ECMWF, modelo de maior prestígio do mundo, ficou em 4º lugar para chuva horária no RJ, atrás do ICON alemão. O ranking se manteve com 15 vezes mais dados.",
        linkLabel: "Ver o sistema",
        images: [
          {
            alt: "Painel de risco de impacto elétrico do TEMPO-RJ: para cada um dos próximos 5 dias, uma barra que separa a rotina normal do município do acréscimo causado por vento, descarga atmosférica e convecção, com a chance de ser um dia ruim e a faixa de risco.",
            caption: "Risco de impacto elétrico dia a dia, separado por causa: vento, descarga atmosférica e convecção.",
          },
          {
            alt: "Painel do TEMPO-RJ para o Rio de Janeiro: indicadores das próximas horas (chance de chuva, acumulado, rajada, temperatura) e a previsão hora a hora dos próximos dias em ícones.",
            caption: "Indicadores das próximas horas e previsão hora a hora para o Rio de Janeiro.",
          },
        ],
      },
      {
        id: "fsm360",
        diagram: {
          hub: "Equipe do turno",
          hubCaption: "prefixo · motor de regras único",
          nodes: ["Pessoas", "Viatura", "Ferramental", "Materiais", "Segurança", "Ordens de serviço"],
          description:
            "Diagrama do FSM 360: a equipe do turno no centro, ligada a pessoas, viatura, ferramental, materiais, segurança e ordens de serviço, todos sob o mesmo motor de regras.",
        },
        problem:
          "Empreiteiras de energia e saneamento perdem dinheiro com falhas de controle, e o fechamento da ordem de serviço em campo é o maior gargalo.",
        metrics: [
          { value: "7", label: "etapas da operação num só sistema" },
          { value: "16", label: "regras de bloqueio entre módulos" },
          { value: "6", label: "domínios ligados a cada equipe" },
        ],
        featuresLabel: "O que vai fazer",
        features: [
          "Cobrir as sete etapas da operação de campo: planejamento, preparação, liberação, despacho, execução, conciliação do turno e indicadores.",
          "Usar a equipe do turno como unidade de controle: pessoas, viatura, ferramental, materiais, segurança e ordens de serviço ficam ligados a ela, e o histórico sobrevive à troca de viatura.",
          "Impedir, por um motor de regras único, a saída da equipe com item irregular: habilitação vencida, EPI sem checklist, ferramenta fora de calibração ou APR/PT não emitida.",
          "Funcionar sem internet no aplicativo de campo, com regras claras do que pode ser feito offline e do que exige validação no servidor.",
          "Nunca apagar um registro: toda correção vira um novo evento, com justificativa, responsável e horário.",
          "Controlar materiais com o modelo da minha monografia de Engenharia de Produção: custódia por equipe, diário de bordo e ressuprimento just-in-time.",
        ],
        highlight:
          "A especificação vem antes do código: produto, regras, fluxos, operação offline e modelo de domínio já estão escritos e revisados, prontos para os agentes de IA implementarem.",
      },
      {
        id: "ecovox",
        problem:
          "Aprender inglês do zero à fluência com um caminho estruturado e correção individual.",
        metrics: [
          { value: "320", label: "lições previstas, do A1 ao C2" },
          { value: "45", label: "unidades temáticas em 9 faixas" },
          { value: "1.000–1.200 h", label: "de estudo guiado do zero ao C2" },
        ],
        features: [
          "Lições do A1 ao C2 num mesmo ciclo de 11 etapas: meta, gramática em português, diálogo, leitura, prática, pronúncia, conversa, correção e revisão.",
          "Avalia a pronúncia por fonema, fluência e entonação, com treino dos sons que mais confundem brasileiros.",
          "Revisão espaçada (FSRS): o vocabulário e os erros do próprio aluno viram cartões que voltam até fixar.",
          "Estima o nível por evidências e mostra a previsão de tempo até a próxima faixa como intervalo, não como promessa.",
          "Conta familiar com regras para menores (LGPD) e teto de custo de IA por aluno.",
          "Em construção: tutor de conversa e corretor de redações com IA, e trilhas para TOEFL, IELTS, TOEIC e Cambridge a partir do B1.",
        ],
        highlight:
          "A nota de pronúncia é evidência, não veredito: sotaque não reprova. Só reprova quem não é entendido, e a nota baixa manda o som para o treino.",
        images: [
          {
            alt: "Tela inicial do Eco Vox: revisão do dia, faixa em estudo com o progresso, saldo de tokens de IA e plano de estudo com a previsão em intervalo para terminar o A1.",
            caption: "Início: revisão do dia, progresso na faixa, tokens de IA e previsão em intervalo.",
          },
          {
            alt: "Trilha CEFR do Eco Vox na faixa A1: unidade 1 com apostila, gramática da unidade, lições concluídas, a próxima atividade e as lições seguintes.",
            caption: "Trilha do A1: unidade, gramática e lições em sequência.",
          },
          {
            alt: "Tela Falar do Eco Vox: treino dos sons que mais atrapalham o brasileiro, com nota média por som. O diálogo com IA aparece como indisponível por falta de crédito na API.",
            caption: "Treino de sons com nota por som. A conversa com IA aguarda crédito na API.",
          },
          {
            alt: "Trilha CEFR do Eco Vox com as nove faixas, do A1 ao C2. As faixas acima do A1 ficam trancadas até o teste de faixa.",
            caption: "As nove faixas, do A1 ao C2, abertas uma a uma pelo teste de faixa.",
          },
        ],
      },
      {
        id: "lumen",
        problem:
          "Quem prega ou estuda a Bíblia precisa de texto, comentários, anotações e esboços de sermão espalhados em vários lugares.",
        metrics: [
          { value: "425 mil", label: "palavras no interlinear hebraico e grego" },
          { value: "17.884", label: "referências cruzadas" },
          { value: "523", label: "grupos de passagens paralelas" },
        ],
        features: [
          "Bíblia com interlinear hebraico e grego, números de Strong e morfologia explicada em português.",
          "Notas contextuais para as 310 palavras originais mais importantes, que somam quase 97 mil ocorrências.",
          "Referências cruzadas e passagens paralelas, como os relatos dos Evangelhos sobre o mesmo evento.",
          "Gera o esboço de sermão ou estudo a partir do texto, das referências e do interlinear; a IA refina depois.",
          "Anotações, plano de leitura (inclusive em ordem cronológica) e busca de versículos com IA.",
          "Comentários bíblicos integrados ao texto (tradução em andamento).",
        ],
        highlight:
          "A chave da IA nunca fica no celular: o app envia só parâmetros, e o pedido à IA é montado no servidor. Assim ninguém consegue usar a conta como um assistente grátis.",
        images: [
          {
            alt: "Tela inicial do Lumen: versículo do dia com comentário de John Wesley, contadores de sermões e anotações, leitura em andamento e atalhos para Bíblia, sermões, estudos, anotações, busca e plano de leitura.",
            caption: "Início: versículo do dia com comentário, leitura em andamento e atalhos.",
          },
          {
            alt: "Seletor de livros do Lumen, com busca e os livros agrupados por seção, em ordem canônica ou cronológica.",
            caption: "Escolha do livro, em ordem canônica ou cronológica.",
          },
          {
            alt: "Editor de plano de leitura do Lumen: ordem canônica ou cronológica, seleção de livros, período, data de início e resumo com capítulos por dia.",
            caption: "Plano de leitura: livros, período e capítulos por dia calculados.",
          },
        ],
      },
    ],
  },
  otherWorks: {
    title: "Outros trabalhos",
    openLabel: "Abrir",
    items: [
      {
        id: "painel-enel-rj",
        name: "Painel de continuidade: Enel RJ",
        description: "Dashboard com os dados abertos da ANEEL sobre DEC e FEC de 2010 a 2026. Cada gráfico abre com a conclusão que ele mostra: o DEC regulado caiu 71%, mas, somando as horas expurgadas, o tempo sem energia do cliente subiu 41% desde 2021.",
        imageAlt: "Topo do painel de continuidade da Enel RJ, com o título e os quatro indicadores de 2025.",
      },
      {
        id: "site-legno",
        name: "Site Legno Design",
        description: "Site institucional da marcenaria, com serviços, horários, agendamento online e newsletter. Montado por mim na plataforma Wix.",
        imageAlt: "Página inicial do site da Legno Design, com o menu e a foto de uma cozinha planejada.",
      },
      {
        id: "landing-legno",
        name: "Landing page Legno Design",
        description: "Página de captação de orçamentos, com pré-cadastro e WhatsApp. Cada lead entra sozinho no kanban do Legno Design ERP e chega por e-mail; quem clica no WhatsApp aparece destacado como o lead mais quente.",
        imageAlt: "Topo da landing page da Legno Design: \"Móveis planejados para a casa que você já imagina\", com os botões de orçamento.",
      },
      {
        id: "revisao-9ano",
        name: "Revisão 9º Ano",
        description: "Sistema de estudo adaptado para o 9º ano, com explicações pensadas para estudantes com TDAH: 8 matérias, resumos em blocos curtos, 240 questões em simulados sem repetição, explicação de cada resposta e leitura em voz alta.",
        imageAlt: "Tela do sistema Revisão 9º Ano, com as matérias, as abas de resumo e simulados e um bloco de resumo.",
      },
    ],
  },
  howIWork: {
    title: "Como trabalho",
    steps: [
      {
        title: "Entendo a operação.",
        text: "Parto do problema real, das regras do negócio e de quem vai usar.",
      },
      {
        title: "Especifico.",
        text: "Escrevo requisitos, fluxos e lógica antes de qualquer código.",
      },
      {
        title: "Conduzo a IA.",
        text: "Agentes de IA implementam; eu decido, oriento e aprovo.",
      },
      {
        title: "Valido.",
        text: "Testo como dono e como usuário, até funcionar na prática.",
      },
    ],
  },
  background: {
    title: "Trajetória",
    stats: [
      { value: "20 anos", label: "em energia e infraestrutura" },
      { value: "700+", label: "colaboradores liderados" },
      { value: "R$ 7 mi/mês", label: "maior orçamento gerenciado" },
      { value: "−10%", label: "de custos em turnaround" },
    ],
    milestones: [
      {
        period: "2004–2016",
        title: "Grupo Enel",
        text: "Cinco promoções em 12 anos, de assistente a especialista: inteligência operacional, cobrança, perdas e medição eletrônica. Em 2014, a regional atingiu o menor índice de perdas da companhia.",
      },
      {
        period: "2016",
        title: "Comfica",
        text: "A convite do CEO, turnaround de um contrato de R$ 7 milhões/mês com mais de 700 colaboradores; economia de R$ 700 mil/mês sem perder nível de serviço.",
      },
      {
        period: "2017–2019",
        title: "Implantações do zero",
        text: "Um negócio próprio e a unidade de engenharia de uma distribuidora de vidros, que chegou a R$ 1,5 milhão/mês de faturamento.",
      },
      {
        period: "2020–2026",
        title: "Contratos de campo",
        text: "Coordenação de operações e contratos em empreiteiras de energia: até 4.000 ordens de serviço por mês, SLA acima de 98%, gestão de crise 24/7 em eventos climáticos.",
      },
      {
        period: "Hoje",
        title: "Sistemas com IA",
        text: "Transformo essa experiência em software, especificando e conduzindo agentes de IA.",
      },
    ],
    educationTitle: "Formação",
    education: [
      "Graduado em Engenharia de Produção (aguardando colação de grau, previsão fev/2027).",
      "Pós-graduado em Ciência de Dados e Inteligência Artificial (diploma emitido após a colação de grau da graduação).",
      "Pós-graduado em Engenharia Elétrica com ênfase em Sistemas de Automação (diploma emitido após a colação de grau da graduação).",
      "Técnico em Eletrotécnica.",
    ],
  },
  articles: {
    title: "Artigos",
    intro: "Artigos curtos sobre inteligência artificial, desenvolvimento AI-native e as decisões invisíveis que fazem um sistema funcionar.",
    readLabel: "Ler artigo",
    minutesLabel: "min de leitura",
    backLabel: "Voltar ao portfólio",
    items: [
      {
        id: "access-claude-code",
        slug: "do-access-ao-claude-code",
        title: "Do Access ao Claude Code: como construo sistemas sem escrever código",
        summary: "Lógica de programação, modelagem de dados e 20 anos de operação, aplicados à condução de agentes de IA. O que eu faço, o que a IA faz e por que a especificação vem antes de tudo.",
        date: "2026-11-16",
        readingMinutes: 4,
        tags: ["AI-native", "Método"],
        body: [
          { type: "h2", text: "Onde tudo começou" },
          { type: "p", text: "Meu primeiro contato com sistemas foi o Microsoft Access. Em 2004 e 2005, na Enel, eu montava formulários, relatórios e bases de dados operacionais com VBA (Visual Basic for Applications). Não era um sistema grande, mas exigia o essencial: pensar com lógica, quebrar um processo em passos (um algoritmo), modelar tabelas e relações e prever o que acontece quando o dado chega errado." },
          { type: "p", text: "Essa base me acompanhou nos anos seguintes. Como gestor de operações e contratos, muitas vezes fui a ponte entre a operação e o time de desenvolvimento: explicava a regra de negócio, desenhava o fluxo e validava se o sistema fazia o que o campo precisava." },
          { type: "h2", text: "O que mudou com a IA" },
          { type: "p", text: "Hoje, o código dos meus sistemas é escrito por agentes de IA, 100% com o Claude Code e o Codex. Eu não escrevo as linhas de código. O meu trabalho é outro, e é o mesmo de sempre: entender o problema, especificar o sistema, tomar as decisões e validar o resultado." },
          { type: "p", text: "A diferença é a escala. O que antes dependia de um time para cada etapa agora cabe numa conversa bem conduzida com agentes que implementam, testam e corrigem. Mas os agentes só são tão bons quanto o roteiro que recebem." },
          { type: "h2", text: "A especificação vem antes do código" },
          { type: "p", text: "O FSM 360 mostra isso melhor do que qualquer explicação. Ele ainda não tem uma linha de código, e é de propósito. Antes de construir, escrevi a especificação completa: a equipe do turno como unidade de controle, 16 regras de bloqueio entre os módulos, o que pode ser feito sem internet e o que exige validação, o modelo de domínio e os indicadores. Quando os agentes começarem a implementar, cada decisão já estará tomada e escrita." },
          { type: "p", text: "Os outros projetos seguem a mesma regra. No TEMPO-RJ e no Eco Vox, o documento do projeto diz, logo no início, que ele precede o código: quando o código contraria o documento, o documento é atualizado antes." },
          { type: "h2", text: "Validar como dono e como usuário" },
          { type: "p", text: "Especificar não basta; é preciso conferir. No Legno Design ERP, o usuário sou eu: o comercial e o financeiro rodam todo dia na minha marcenaria. No TEMPO-RJ, o sistema mede o próprio erro e mostra quando a previsão foi otimista. No Eco Vox, cada regra importante tem teste automatizado: são 244." },
          { type: "h2", text: "O que isso não é" },
          { type: "p", text: "Não é dizer que a IA substitui a engenharia. É o contrário: quanto mais a IA faz, mais importa quem decide o que ela deve fazer. Meu papel é dar contexto, critério e responsabilidade, com a experiência de quem passou 20 anos vendo o que acontece quando um sistema não conversa com a operação." },
        ],
      },
      {
        id: "design-system-referencia",
        slug: "da-referencia-ao-design-system",
        title: "Da referência ao design system: como uso a IA para criar o visual de um produto",
        summary: "Eu não desenho telas do zero. Parto de uma referência, peço à IA que extraia dela um design system e decido o que fica de fora. O próprio portfólio foi feito assim.",
        date: "2026-11-18",
        readingMinutes: 4,
        tags: ["Design system", "Método"],
        body: [
          { type: "h2", text: "O problema de pedir “um site bonito”" },
          { type: "p", text: "Quando você pede à IA uma tela sem referência, ela devolve a média do que já viu: bonita, genérica e diferente a cada pedido. A segunda página não combina com a primeira, e cada ajuste puxa o visual para um lado. O que falta não é capacidade da IA, é um padrão para ela seguir." },
          { type: "h2", text: "Partir de uma referência" },
          { type: "p", text: "Por isso eu começo por uma referência: uma página que admiro, a sugestão de um designer ou até um vídeo com animações. Antes de qualquer coisa, deixo claro para que ela serve. No meu portfólio, recebi a sugestão de um designer com a arquitetura do site e imagens de clima visual. O conteúdo já estava aprovado; a referência valia só para o visual. Essa frase mudou o trabalho: a IA não reescreveu nenhum texto, só traduziu o estilo." },
          { type: "h2", text: "Extrair o design system antes das telas" },
          { type: "p", text: "O passo seguinte é pedir que a IA leia a referência e escreva o design system antes de montar qualquer página: a paleta, as fontes, os espaçamentos, os componentes (cartões, etiquetas, linha do tempo) e as regras de movimento. No portfólio, isso virou a paleta escura em azul-petróleo e ciano, a dupla de fontes Manrope e DM Mono e um conjunto de variáveis de cor usadas por todos os componentes. A partir daí, cada tela nova nasce do mesmo padrão, e não de um pedido solto." },
          { type: "h2", text: "Decidir o que fica de fora" },
          { type: "p", text: "Referência não é molde. Se você não disser nada, a IA copia tudo, inclusive o que não serve. Parte do meu trabalho é dizer não: tirei a moldura que a sugestão colocava em volta do núcleo animado, mantive só o tema escuro e escrevi “AI” e “SYSTEM BUILDER” na esfera central. Em outro momento, vi um vídeo com uma vitrine de páginas animadas e aproveitei uma única ideia: formas em wireframe flutuando em camadas, com parallax. Ela entrou nas cores do site, como um fundo discreto atrás do texto." },
          { type: "p", text: "O critério é sempre o mesmo: o efeito ajuda a informação ou disputa com ela? Animação que atrapalha a leitura, pesa no celular ou ignora quem pede menos movimento no sistema fica de fora, por mais bonita que seja." },
          { type: "h2", text: "Testar antes de publicar" },
          { type: "p", text: "Toda mudança visual vai primeiro para um endereço de teste, separado do site oficial. Ali eu confiro no computador e no celular, peço ajustes e só aprovo depois de medir: o desempenho do portfólio fica acima de 90 no Lighthouse, com acessibilidade, boas práticas e SEO em 100. Se um efeito derruba esses números, ele volta para a mesa." },
          { type: "h2", text: "Por que isso importa" },
          { type: "p", text: "É o mesmo princípio que uso para o código: a especificação vem antes. No visual, a especificação é o design system. Com ele, a IA deixa de improvisar e passa a construir dentro de um padrão, e eu fico com o que é meu: escolher a referência, dizer o que serve e o que não serve e aprovar o resultado." },
        ],
      },
    ],
  },
  contact: {
    title: "Contato",
    text: "Aberto a oportunidades em produto, soluções e implantação de IA. Remoto ou híbrido.",
    linkedinLabel: "LinkedIn",
    githubLabel: "GitHub",
    emailLabel: "E-mail",
  },
  footer: {
    builtWith: "Construído com Claude Code.",
  },
};

export default pt;
