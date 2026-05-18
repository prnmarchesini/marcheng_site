# MarchEng Engenharia — Home v4

> Mudanças vs. v3: grafia "MarchEng" padronizada em todos os textos · "atuando desde 2017" sem ressalvas · nova seção **Serviços** com 5 áreas oficiais · Sobre simplificado · ordem das seções reorganizada.

---

## PROMPT 1 — Claude Code

```
Você vai construir a home page de um site institucional multilíngue para a MarchEng Engenharia, empresa brasileira de engenharia solar, sediada em Santa Adélia/SP, atuando desde 2017. Este é o primeiro entregável de um site que será expandido com uma página por serviço — comece pela home pensando em reuso (Nav, Footer, Container, Button, padrões de seção compartilhados).

ATENÇÃO À GRAFIA: o nome correto é **MarchEng** em qualquer contexto — letra E maiúscula no meio. Nunca "Marcheng" no texto corrido. Aplicar em PT/EN/ES/IT.

## Contexto da empresa
A MarchEng Engenharia é especializada em usinas solares fotovoltaicas. Atua desde 2017 em todo o ciclo técnico de geração distribuída, com cinco frentes de serviço:

1. **Engenharia Solar** — projetos completos de usinas solares (Elétrica, Civil, Comunicação e Segurança)
2. **Engenharia Elétrica** — estudos técnicos (curto-circuito, seletividade, aterramento, qualidade de energia, medições em campo)
3. **Engenharia do Proprietário** — acompanhamento técnico durante todo o ciclo, com emissão de relatórios e laudos conforme normas
4. **Comissionamento e Manutenção** — verificação técnica completa e manutenção de usinas
5. **Due Diligence Técnica** — auditoria técnica para aquisição, refinanciamento ou análise de performance

Números atuais (Stats):
- 200 MW em parecer de acesso aprovados
- 50+ MW em projetos executivos entregues
- 100+ usinas homologadas
- 20+ usinas comissionadas

Tagline institucional oficial: "Engenharia e Energia"
Headline aspiracional oficial (vai no hero): "Mais que preço, oferecemos qualidade que transforma."

O nome "MarchEng" tem raízes na ascendência italiana do fundador (família Marchesini, de Felonica/Mantova) — o site multilíngue deve dar a essa origem um peso natural na versão em italiano, sem forçar.

## Stack e deploy
- Next.js 14+ com App Router
- TypeScript
- Tailwind CSS
- i18n com next-intl (pt default, en, es, it)
- Deploy alvo: Railway (porta via process.env.PORT, Node 20+)
- Fontes oficiais via Adobe Fonts/Typekit (Bronova + Gill Sans MT)
- Imagens via next/image
- Animações com Framer Motion (entradas de seção, contadores)
- Sem CMS — conteúdo nos arquivos de mensagens i18n
- Ícones via lucide-react

## Internacionalização
- Pacote: next-intl
- Default locale: pt (URL `/` limpo)
- Locales: pt, en, es, it
- URL: estratégia "as-needed" — PT em `/`, demais em `/en`, `/es`, `/it`
- Detecção do idioma do navegador na primeira visita, fallback PT
- Persistência da escolha em cookie

Arquivos de mensagens:
```
messages/
  pt.json
  en.json
  es.json
  it.json
```

Gere as 4 versões dos textos. Para EN/ES/IT, traduza com qualidade profissional, terminologia técnica de engenharia solar correta:
- comissionamento → commissioning / puesta en marcha / messa in servizio
- homologação → grid connection approval / homologación / omologazione di rete
- parecer de acesso → grid access approval / dictamen de acceso / parere di allacciamento
- projeto executivo → detailed engineering / proyecto ejecutivo / progetto esecutivo
- due diligence técnica → technical due diligence / due diligence técnica / due diligence tecnica
- engenharia do proprietário → owner's engineering / ingeniería del propietario / ingegneria del proprietario

Language switcher: dropdown sóbrio no Nav (texto: PT/EN/ES/IT, sem bandeiras). Em mobile, dentro do hamburger.

## Estrutura de arquivos
```
app/
  [locale]/
    layout.tsx
    page.tsx
  globals.css
messages/
  pt.json
  en.json
  es.json
  it.json
components/
  Nav.tsx
  LanguageSwitcher.tsx
  Footer.tsx
  sections/
    Hero.tsx
    Stats.tsx
    Services.tsx
    About.tsx
    Clients.tsx
    Contact.tsx
  ui/
    Button.tsx
    Container.tsx
    Card.tsx
middleware.ts
i18n.ts
public/
  logo-symbol.svg
  logo-horizontal.svg
  clients/
  og-image.png
```

## Identidade visual (manual de marca oficial)

### Cores
- **Primária (azul institucional)**: `#2F6192`
- **Acento (dourado)**: `#E1B43F`
- **Background base**: gradiente sutil de `#0a0f1a` para `#0d1420`
- **Texto principal**: `#e5e7eb`
- **Texto secundário**: `#9ca3af`
- **Bordas**: `rgba(255,255,255,0.06)`

Definir cores em CSS variables (`:root`) em globals.css e expor no tailwind.config.ts como `colors.brand.primary` / `colors.brand.accent`.

### Dark mode
É o padrão fixo do site. Sobre fundo escuro azulado:
- Logo: versão clara (símbolo branco + dourado, wordmark branco + dourado)
- Acentos: glows sutis do dourado nos pontos focais
- Cards: leve glass-morphism (backdrop-blur + bg `rgba(255,255,255,0.03)`)

### Tipografia (Adobe Fonts)
Fontes oficiais: **Bronova** (principal) + **Gill Sans MT** (secundária, ou Gill Sans Nova como alternativa Adobe Fonts).

Setup via Adobe Fonts:
1. Cliente fornecerá o kit ID. Variável: `NEXT_PUBLIC_TYPEKIT_ID`
2. Em `app/[locale]/layout.tsx`, no `<head>`:
   ```tsx
   {process.env.NEXT_PUBLIC_TYPEKIT_ID && (
     <link rel="stylesheet" href={`https://use.typekit.net/${process.env.NEXT_PUBLIC_TYPEKIT_ID}.css`} />
   )}
   ```
3. tailwind.config.ts:
   ```ts
   fontFamily: {
     heading: ['bronova', 'system-ui', 'sans-serif'],
     body: ['"gill-sans-nova"', '"Gill Sans MT"', 'system-ui', 'sans-serif'],
   }
   ```
4. Fallback gracioso para system-ui se o kit não estiver setado.

Hierarquia:
- h1: Bronova 800, text-5xl–text-7xl
- h2: Bronova 700, text-4xl–text-5xl
- h3: Bronova 600, text-2xl
- Corpo: Gill Sans MT 400, leading-relaxed
- Eyebrow: Gill Sans MT 600, text-sm, uppercase, letter-spacing wide, dourado

### Estilo
Vibe: **premium institucional moderno**. Referências: Stripe, Resend, sites de consultoria de engenharia premium. Sóbrio, técnico, confiável. Sem emoji. Ícones discretos (lucide-react).

## Tom de voz
Institucional-confiável. Parceria de longo prazo, expertise técnica, rigor. Sem superlativos vazios. Substância e números.

## Seções da home (nesta ordem)

### 1. Nav (fixa)
- Logo horizontal à esquerda (versão clara, `/public/logo-horizontal.svg`)
- Links âncora: Serviços, Sobre, Clientes, Contato
- LanguageSwitcher (PT/EN/ES/IT)
- CTA: "Solicitar orçamento" (azul, traduzir)
- Mobile: hamburger
- Backdrop-blur, bg `rgba(13,20,32,0.7)`, borda inferior sutil

### 2. Hero
- Eyebrow uppercase dourado: "ENGENHARIA E ENERGIA" (traduzir)
- Headline (Bronova 800, text-6xl/7xl): "Mais que preço, oferecemos qualidade que transforma." (traduzir mantendo a força)
- Subheadline (cor `#9ca3af`): "Engenharia solar de ponta a ponta, desde 2017. 100+ usinas homologadas e 200 MW de parecer de acesso aprovados em todo o Brasil." (traduzir)
- 2 CTAs: "Solicitar orçamento" (primário azul) + "Conheça a empresa" (ghost, scroll para Sobre)
- Fundo: gradiente radial + glow dourado sutil no canto superior direito + grid SVG decorativo (linhas remetendo a array fotovoltaico)
- Animação: fade + slide-up no mount

### 3. Stats
- Faixa horizontal com 4 blocos. Mobile: grid 2x2.
- Número grande (Bronova 800, text-5xl) em dourado + label em Gill Sans cinza claro
- Contador animado ao entrar no viewport (~1.5s, easeOut)

Conteúdo (PT, traduzir):
1. **200 MW** — Em parecer de acesso aprovados
2. **50+ MW** — Em projetos executivos entregues
3. **100+** — Usinas homologadas
4. **20+** — Usinas comissionadas

### 4. Serviços (NOVA)
- ID="servicos"
- Eyebrow: "O QUE FAZEMOS" (traduzir)
- Título: "Cinco frentes técnicas, do projeto à operação." (traduzir)
- Subtítulo curto (1 linha)
- Grid de 5 cards. Desktop: 3 em cima + 2 em baixo centralizados, ou 5 colunas em telas grandes. Tablet: 2 colunas. Mobile: 1 coluna empilhada.

Cada card:
- Ícone discreto (lucide) em dourado, tamanho ~32px
- Título em Bronova 600
- Descrição em 1-2 linhas (Gill Sans, cinza claro)
- Link "Saiba mais →" no rodapé do card (cor primária no hover)
- Hover: lift sutil (translate-y -2px, borda fica mais visível)
- Cada card linka para `/[locale]/servicos/[slug]` (páginas a serem criadas — deixar comentário TODO indicando as rotas)

Conteúdo dos 5 cards (PT, traduzir):

| Serviço | Ícone (lucide) | Descrição | Slug |
|---|---|---|---|
| Engenharia Solar | Sun | Projetos completos de usinas solares, abrangendo as áreas Elétrica, Civil, Comunicação e Segurança. | engenharia-solar |
| Engenharia Elétrica | Zap | Estudos técnicos de curto-circuito, seletividade, aterramento, qualidade de energia e medições em campo. | engenharia-eletrica |
| Engenharia do Proprietário | ClipboardCheck | Acompanhamento técnico durante todo o ciclo do projeto, com relatórios e laudos conforme normas. | engenharia-do-proprietario |
| Comissionamento e Manutenção | Wrench | Verificação técnica completa e manutenção de usinas solares, com cronograma criterioso de ensaios. | comissionamento |
| Due Diligence Técnica | ShieldCheck | Auditoria técnica de usinas solares para aquisição, refinanciamento ou análise de performance. | due-diligence |

### 5. Sobre
- ID="sobre"
- Layout desktop 60/40: texto à esquerda, placeholder de imagem à direita (aspect-ratio retangular, glow dourado sutil ao redor, borda fina, comentário TODO no JSX indicando que aqui entra foto da equipe ou de uma usina)
- Eyebrow dourado uppercase: "SOBRE A MARCHENG" (traduzir, lembrando: grafia "MarchEng" mesmo em uppercase visual)
- Título (Bronova 700): "Engenharia solar, com a experiência de quem está no setor desde 2017." (traduzir)
- 2 parágrafos (PT, traduzir nos demais):

  **§ 1:** "A MarchEng Engenharia atua desde 2017 nos setores de energia solar e elétrica. Da concepção do projeto executivo à entrada em operação da usina, oferecemos suporte técnico completo com uma equipe de especialistas comprometidos com os mais altos padrões de engenharia e segurança."

  **§ 2:** "O nome MarchEng carrega a herança italiana do fundador — família Marchesini, originária de Felonica, na província de Mantova, Lombardia. É um lembrete diário de que engenharia é ofício, não atalho: rigor técnico, prazos respeitados, e o compromisso de fazer cada usina entrar em operação."

- Em mobile: empilha (texto → imagem)

### 6. Clientes
- ID="clientes"
- Título (Bronova 700): "Empresas que confiam na MarchEng" (traduzir)
- Subtítulo curto (1 linha)
- Grid de 8 logos placeholder em `/public/clients/` (criar `client-01.svg` a `client-08.svg` como retângulos discretos com texto "Logo X" — serão substituídos)
- Layout: 4 colunas desktop, 3 tablet, 2 mobile
- Logos em opacity 60% normal → 100% no hover, transição 200ms
- Container com borda sutil e bg `rgba(255,255,255,0.02)`

### 7. Contato
- ID="contato"
- Título (Bronova 700): "Vamos conversar sobre seu projeto" (traduzir)
- Subtítulo curto
- 2 cards lado a lado (mobile empilha):
  - **WhatsApp**: ícone MessageCircle + "WhatsApp" + "+55 17 99737-7626" → link `https://wa.me/5517997377626`
  - **E-mail**: ícone Mail + "E-mail" + "renan@marcheng.com.br" → `mailto:renan@marcheng.com.br`
- Hover lift sutil nos cards

### 8. Footer
- 3 colunas desktop, empilhado mobile
- Col 1: logo horizontal claro + "Engenharia e Energia" + "Santa Adélia - SP, Brasil"
- Col 2: título "Contato" + WhatsApp + e-mail
- Col 3: título "Serviços" + lista dos 5 serviços (links para páginas)
- Linha final: "© 2026 MarchEng Engenharia Ltda. Todos os direitos reservados." + LanguageSwitcher pequeno

## Requisitos técnicos
- Responsivo mobile-first (sm/md/lg)
- SEO: metadata por locale, hreflang alternates entre os 4 idiomas
- favicon, apple-touch-icon, robots.txt, sitemap.xml com URLs traduzidas
- Acessibilidade: alt em imagens, contraste AA, foco visível, navegação por teclado, `lang` correto por locale
- Lighthouse alvo: ≥95 em Performance, SEO, Best Practices, Accessibility

## Variáveis de ambiente (`.env.example`)
```
NEXT_PUBLIC_WHATSAPP=5517997377626
NEXT_PUBLIC_EMAIL=renan@marcheng.com.br
NEXT_PUBLIC_TYPEKIT_ID=
```

## Configuração Railway
- Start usa `$PORT`
- Node 20+
- README com 6 seções:
  1. Rodar local
  2. Variáveis de ambiente
  3. Adobe Fonts kit setup
  4. Deploy Railway
  5. Como editar traduções
  6. Como adicionar uma página de serviço (esqueleto reusando Nav/Footer/Container — vai ter `/servicos/comissionamento` em paralelo)

## Entrega
1. Projeto Next.js completo rodando local com `npm run dev`
2. Os 4 arquivos de mensagens traduzidos profissionalmente
3. Placeholders SVG dos logos
4. README direto
5. Componentes pensados para reuso nas páginas de serviço futuras

Comece pelo middleware + i18n.ts + globals.css + tailwind.config (sistema de design). Depois Nav + LanguageSwitcher + Footer (base reusável). Depois cada seção em ordem. Confirme decisões de design importantes antes de implementar.
```

---

## PROMPT 2 — Stitch (visual)

```
Crie a home page de um site institucional multilíngue para a MarchEng Engenharia, empresa brasileira de engenharia solar, sediada em Santa Adélia/SP, atuando desde 2017. Versão visível em português, com seletor de idioma (PT/EN/ES/IT) no header.

Grafia oficial: MarchEng (E maiúsculo no meio). Sempre.

Estilo: premium institucional moderno, dark mode com viés azulado. Referências: Stripe, Resend, consultorias de engenharia premium. Sóbrio, técnico, confiável.

Paleta:
- Background: gradiente sutil #0a0f1a → #0d1420
- Primária (azul): #2F6192
- Acento (dourado): #E1B43F
- Texto principal: #e5e7eb
- Texto secundário: #9ca3af
- Bordas: rgba(255,255,255,0.06)

Tipografia: Bronova para títulos (peso 800), Gill Sans MT para corpo. Eyebrows uppercase com letter-spacing wide, dourados.

Estrutura (top → bottom):

1. NAV fixa com backdrop-blur. Logo horizontal "MarchEng" à esquerda. Links: Serviços, Sobre, Clientes, Contato. Seletor de idioma e botão "Solicitar orçamento" em azul à direita.

2. HERO tela cheia. Eyebrow dourado "ENGENHARIA E ENERGIA". Headline grande "Mais que preço, oferecemos qualidade que transforma." Subheadline: "Engenharia solar de ponta a ponta, desde 2017. 100+ usinas homologadas e 200 MW de parecer de acesso aprovados em todo o Brasil." Dois botões: "Solicitar orçamento" (azul) e "Conheça a empresa" (ghost). Fundo com gradiente radial + glow dourado sutil + grid decorativo.

3. STATS — 4 blocos horizontais com números dourados grandes:
   - "200 MW — Em parecer de acesso aprovados"
   - "50+ MW — Em projetos executivos entregues"
   - "100+ — Usinas homologadas"
   - "20+ — Usinas comissionadas"

4. SERVIÇOS — eyebrow "O QUE FAZEMOS", título "Cinco frentes técnicas, do projeto à operação." Grid de 5 cards com ícone dourado discreto, título e descrição curta:
   - Engenharia Solar (ícone Sol)
   - Engenharia Elétrica (ícone Raio)
   - Engenharia do Proprietário (ícone Prancheta)
   - Comissionamento e Manutenção (ícone Chave inglesa)
   - Due Diligence Técnica (ícone Escudo)
   Cada card com link "Saiba mais →".

5. SOBRE — duas colunas (60/40). Esquerda: eyebrow "SOBRE A MARCHENG", título "Engenharia solar, com a experiência de quem está no setor desde 2017." + 2 parágrafos. Direita: imagem placeholder retangular com glow dourado.

6. CLIENTES — título "Empresas que confiam na MarchEng" + grid de 8 logos placeholder cinza claro em 4 colunas.

7. CONTATO — título "Vamos conversar sobre seu projeto" + 2 cards: WhatsApp (+55 17 99737-7626) e E-mail (renan@marcheng.com.br).

8. FOOTER — 3 colunas: (1) logo + "Engenharia e Energia" + "Santa Adélia - SP", (2) contato, (3) serviços. Linha final: "© 2026 MarchEng Engenharia Ltda."

Responsividade: mobile empilha, nav vira hamburger, stats viram 2x2, serviços viram 1 coluna, clientes viram 2 colunas.

Micro-interações sutis. Animações de entrada por seção. Sem exagero.
```

---

## Resumo do que está fechado

- **Grafia oficial**: MarchEng (E maiúsculo) em texto e logo
- **Atuação**: desde 2017 (sem mencionar fundação 2020 — material oficial usa "desde 2017")
- **Sede**: Santa Adélia/SP
- **5 serviços**: Engenharia Solar · Engenharia Elétrica · Engenharia do Proprietário · Comissionamento e Manutenção · Due Diligence Técnica
- **Cores**: `#2F6192` (azul) + `#E1B43F` (dourado)
- **Tipografia**: Bronova + Gill Sans MT via Adobe Fonts
- **Headline**: "Mais que preço, oferecemos qualidade que transforma."
- **Stats**: 200 MW parecer · 50+ MW projetos · 100+ homologadas · 20+ comissionadas
- **Idiomas**: PT (default), EN, ES, IT
- **Contato**: WhatsApp +55 17 99737-7626 · renan@marcheng.com.br
- **Stack**: Next.js 14 + TypeScript + Tailwind + next-intl + Adobe Fonts, deploy Railway

## Fluxo recomendado

1. Cria o repo `marcheng-site`
2. Salva este markdown como `briefing-home.md` na raiz
3. Salva também o `briefing-comissionamento.md` (entregue em paralelo)
4. Anexa as imagens de referência do logo
5. No Claude Code: *"Leia briefing-home.md e implemente a home da MarchEng. Comece pelo setup i18n + sistema de design (cores em CSS variables, Tailwind config, Adobe Fonts). Faça perguntas se algo estiver ambíguo."*
6. Depois da home consolidada: *"Agora leia briefing-comissionamento.md e implemente a página /servicos/comissionamento reusando Nav, Footer e o sistema de design já criado."*
