# MarchEng — Site institucional

Site institucional da MarchEng Engenharia. Monorepo poliglota com frontend Next.js (TypeScript) e backend FastAPI (Python), tipos sincronizados via OpenAPI, deploy independente no Railway.

## Stack

| Camada | Tecnologia |
|---|---|
| Frontend | Next.js 14 (App Router) + TypeScript + Tailwind + next-intl (PT/EN/ES/IT) |
| Backend | FastAPI (Python 3.12) + Pydantic v2 + uvicorn |
| Tipos compartilhados | OpenAPI → openapi-typescript |
| Build / tooling | Turborepo + pnpm 10 + uv |
| Lint / format | ESLint, Prettier (TS) · ruff (Py) |
| Type check | tsc · mypy (strict) |
| Testes | pytest (backend) |
| Deploy | Railway (2 services, builds independentes via nixpacks) |

## Estrutura do monorepo

```
marcheng-site/
├── apps/
│   ├── web/             # Next.js (frontend)
│   └── api/             # FastAPI (backend)
├── packages/
│   └── tsconfig/        # tsconfig compartilhado
├── package.json         # raiz + scripts via Turborepo
├── pnpm-workspace.yaml
└── turbo.json
```

## Pré-requisitos

- **Node 20+** (recomendado via `nvm`)
- **pnpm 10** — `npm install -g pnpm@10` ou via `corepack`
- **Python 3.12+** — uv consegue baixar via `.python-version` se não tiver
- **uv** — `curl -LsSf https://astral.sh/uv/install.sh | sh` (ou `pip install uv`)
- Conta **Railway** (deploy)
- (Opcional) Conta **Resend** (quando ativar e-mail no `/api/contact`)

## Setup local

```bash
# 1. Instalar deps do frontend (Node)
pnpm install

# 2. Instalar deps do backend (Python)
cd apps/api && uv sync && cd ../..

# 3. Copiar envs
cp .env.example .env
cp apps/api/.env.example apps/api/.env
# editar variáveis se necessário

# 4. Rodar tudo em paralelo
pnpm dev
# web   → http://localhost:3000  (redireciona para /pt)
# api   → http://localhost:8000
# docs  → http://localhost:8000/docs   (Swagger UI)
```

## Scripts úteis (rodar na raiz)

| Script | O que faz |
|---|---|
| `pnpm dev` | Sobe web + api em paralelo |
| `pnpm dev:web` / `dev:api` | Só um dos dois |
| `pnpm build` | Build dos 2 apps |
| `pnpm lint` | ESLint (web) + ruff (api) |
| `pnpm typecheck` | tsc (web) + mypy (api) |
| `pnpm test` | pytest (api) |
| `pnpm gen:types` | Exporta OpenAPI do backend e regenera `apps/web/lib/api-types.ts`. **Rode sempre que alterar schemas do backend.** |
| `pnpm format` | Prettier |
| `pnpm clean` | Limpa caches e node_modules |

## Fluxo de mudança em endpoint

1. Adicionar/alterar rota em `apps/api/src/marcheng_api/routes/`
2. Adicionar/alterar schema em `apps/api/src/marcheng_api/schemas/`
3. Rodar `pnpm gen:types` na raiz
4. Usar os novos tipos em `apps/web/lib/api.ts` e nos componentes

> Os arquivos gerados (`apps/web/openapi.json` e `apps/web/lib/api-types.ts`) são **commitados** para que o build do frontend não dependa do backend estar de pé. Se preferir o contrário, ajuste o `.gitignore` e o pipeline.

## Como adicionar uma nova página de serviço

1. Criar a rota em `apps/web/app/[locale]/servicos/<slug>/page.tsx`
2. Adicionar entrada em cada `apps/web/messages/<lang>.json`
3. (Se for consumir dados do backend) adicionar endpoint em `apps/api/src/marcheng_api/routes/`, schema correspondente e rodar `pnpm gen:types`

## Deploy no Railway

Cada app é um service independente. Resumo:

1. Push do repo pro GitHub
2. Railway → **New Project → Deploy from GitHub repo** → selecionar `marcheng-site`
3. Renomeie o primeiro service para **marcheng-web**:
   - Settings → **Root Directory**: `apps/web`
   - Settings → **Watch Paths**: `apps/web/**`, `packages/**`, `pnpm-lock.yaml`
   - Variables: `NEXT_PUBLIC_API_URL` (preenchido depois do passo 5), `NEXT_PUBLIC_WHATSAPP`, `NEXT_PUBLIC_EMAIL`, `NEXT_PUBLIC_TYPEKIT_ID`
4. **+ New → Empty Service → marcheng-api**, conectar mesmo repo:
   - Settings → **Root Directory**: `apps/api`
   - Settings → **Watch Paths**: `apps/api/**`
   - Variables: `ENVIRONMENT=production`, `CORS_ORIGINS=["https://marcheng.com.br"]` (ajustar com o domínio real depois), `RESEND_API_KEY`, `CONTACT_EMAIL_TO`. Railway preenche `PORT` sozinho.
5. Em cada service: Settings → Networking → **Generate Domain**
6. Atualizar `NEXT_PUBLIC_API_URL` no service web com o domínio da API
7. Atualizar `CORS_ORIGINS` no service api com o domínio do web
8. Quando tiver domínio próprio: `marcheng.com.br` → web; `api.marcheng.com.br` → api

## Roadmap

- [x] Setup do monorepo (este commit)
- [ ] Home da MarchEng (briefing dedicado: `marcheng_home_prompt.md`)
- [ ] 5 páginas de serviço
- [ ] Integração Resend para `/api/contact`
- [ ] (Futuro) Postgres + SQLModel/SQLAlchemy se virar blog ou área de cliente
- [ ] (Futuro) Endpoint `/api/usinas` consumindo dados do meuWatt
- [ ] (Futuro) Endpoint `/api/simulacao-rapida` rodando pvlib

## Notas de versão

- `packageManager` fixado em `pnpm@10.33.0` no `package.json`. Se precisar trocar, use `corepack`.
- O backend declara `requires-python = ">=3.12"` e `.python-version = 3.12`. O uv baixa automaticamente a versão certa no primeiro `uv sync` se não estiver instalada.
