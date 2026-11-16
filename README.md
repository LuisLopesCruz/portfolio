# Portfólio — Luis Claudio Lopes da Cruz

Site de página única em três idiomas (`/` português, `/en` inglês, `/es` espanhol).
Next.js (App Router) + TypeScript + Tailwind CSS, 100% estático.

No ar: https://portfolio-luis-claudio-lopes-da-cruzs-projects.vercel.app

## Publicar

A conta da Vercel ainda não está ligada ao GitHub, então um push não publica sozinho. E, sem essa ligação, a Vercel bloqueia publicações da linha de comando feitas de dentro do repositório (ela não consegue confirmar o autor do commit). Por isso a publicação sai de uma cópia limpa do commit atual:

```bash
D=$(mktemp -d) && git archive HEAD | tar -x -C "$D" && mkdir -p "$D/.vercel" && cp .vercel/project.json "$D/.vercel/" && (cd "$D" && npx vercel deploy --prod --yes)
```

Quando o GitHub for conectado na Vercel (Account Settings → Authentication), rode `npx vercel git connect` e cada push em `main` passa a publicar sozinho.

## Rodar localmente

```bash
npm install
npm run dev
```

Abra http://localhost:3000.

## Onde mudar cada coisa

| O quê | Arquivo |
|---|---|
| Textos em português / inglês / espanhol | `content/pt.ts`, `content/en.ts`, `content/es.ts` |
| Nome, links de contato, stacks, status e ordem dos projetos | `content/shared.ts` |
| Cores (tema claro e escuro) | `app/globals.css` (bloco `:root`) |
| Redirecionamento da primeira visita | `lib/locale-storage.ts` |

## Prints dos projetos

1. Salve o print em `public/projects/<projeto>/` (ex.: `public/projects/legno/cotacao.png`).
2. Em `content/shared.ts`, acrescente o print à lista `images` do projeto, com `src`, `width` e `height`. O primeiro da lista é o principal; os demais viram miniaturas, e todos abrem numa galeria.
3. Em cada arquivo de idioma, acrescente em `images` do projeto um `alt` (descrição para leitor de tela) e uma `caption` (legenda da galeria), na mesma ordem.

Nenhum print pode mostrar dados reais de clientes, fornecedores, preços ou pessoas: borre nomes e valores antes de salvar.

## Abrir sempre em português

Remova o `<script>` de redirecionamento em `components/RootDocument.tsx`.
