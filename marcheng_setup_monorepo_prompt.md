# MarchEng — Setup do Monorepo (Frontend Next.js + Backend FastAPI/Python)

> Use este prompt no Claude Code para criar a **estrutura base** do projeto. Depois desse setup rodando, use o `marcheng_home_prompt.md` para preencher a home dentro de `apps/web`.
>
> Objetivo: monorepo profissional com frontend TypeScript e backend Python, tipos sincronizados via OpenAPI, pronto pra deploy no Railway como 2 services independentes.

---

## PROMPT — Claude Code

```
Crie a estrutura inicial de um monorepo poliglota (TypeScript + Python) para o site da MarchEng Engenharia, com separação clara entre frontend e backend, pronto pra deploy no Railway. Este é o setup base — depois eu vou implementar a home da MarchEng dentro de apps/web.

## Decisões de stack (já tomadas)

### Frontend (apps/web)
- Next.js 14+ App Router, TypeScript, Tailwind CSS, next-intl (i18n PT/EN/ES/IT)
- Gerenciador: pnpm v9 (workspaces)
- Build orchestrator: Turborepo

### Backend (apps/api)
- **Python 3.12+, FastAPI** (>=0.115), Pydantic v2, Pydantic Settings
- Gerenciador: **uv** (https://docs.astral.sh/uv) — substitui pip/poetry/pipenv
- Servidor: uvicorn (com reload em dev)
- Dev tooling: ruff (lint + format), mypy (type check), pytest (testes)

### Integração frontend ↔ backend
- Backend expõe OpenAPI em `/openapi.json`
- Script `pnpm gen:types` extrai o OpenAPI e gera `apps/web/lib/api-types.ts` via openapi-typescript
- Frontend importa esses tipos no cliente HTTP — fonte da verdade é o backend

### Deploy
- Railway: 1 service por app, builds independentes via nixpacks

## Estrutura de pastas a criar

```
marcheng-site/
├── .editorconfig
├── .gitignore
├── .npmrc
├── .nvmrc                          # node 20
├── .python-version                 # 3.12
├── .prettierrc
├── .prettierignore
├── .eslintrc.json
├── .env.example
├── README.md
├── package.json                    # root - turbo + scripts
├── pnpm-workspace.yaml
├── turbo.json
├── tsconfig.base.json
├── apps/
│   ├── web/                        # Frontend Next.js
│   │   ├── app/
│   │   │   ├── [locale]/
│   │   │   │   ├── layout.tsx
│   │   │   │   └── page.tsx
│   │   │   └── globals.css
│   │   ├── components/
│   │   │   ├── Nav.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── LanguageSwitcher.tsx
│   │   │   ├── sections/.gitkeep
│   │   │   └── ui/
│   │   │       ├── Button.tsx
│   │   │       └── Container.tsx
│   │   ├── lib/
│   │   │   ├── api.ts              # cliente HTTP tipado
│   │   │   └── api-types.ts        # GERADO via openapi-typescript
│   │   ├── messages/
│   │   │   ├── pt.json
│   │   │   ├── en.json
│   │   │   ├── es.json
│   │   │   └── it.json
│   │   ├── public/.gitkeep
│   │   ├── middleware.ts
│   │   ├── i18n.ts
│   │   ├── next.config.mjs
│   │   ├── postcss.config.mjs
│   │   ├── tailwind.config.ts
│   │   ├── tsconfig.json
│   │   ├── railway.json
│   │   ├── nixpacks.toml
│   │   └── package.json
│   └── api/                        # Backend FastAPI (Python)
│       ├── src/
│       │   └── marcheng_api/
│       │       ├── __init__.py
│       │       ├── main.py         # app FastAPI + middlewares
│       │       ├── config.py       # Settings via Pydantic
│       │       ├── routes/
│       │       │   ├── __init__.py
│       │       │   ├── health.py
│       │       │   └── contact.py
│       │       ├── schemas/
│       │       │   ├── __init__.py
│       │       │   └── contact.py
│       │       ├── services/
│       │       │   ├── __init__.py
│       │       │   └── email.py    # placeholder Resend
│       │       └── scripts/
│       │           ├── __init__.py
│       │           └── export_openapi.py
│       ├── tests/
│       │   ├── __init__.py
│       │   ├── conftest.py
│       │   └── test_health.py
│       ├── pyproject.toml
│       ├── uv.lock                 # gerado pelo uv sync
│       ├── railway.json
│       ├── nixpacks.toml
│       ├── .env.example
│       ├── .python-version
│       └── package.json            # script proxy pro Turborepo
└── packages/
    └── tsconfig/
        ├── base.json
        ├── nextjs.json
        └── package.json
```

## Conteúdo dos arquivos-chave

### Root `package.json`
```json
{
  "name": "marcheng-site",
  "private": true,
  "version": "0.0.0",
  "packageManager": "pnpm@9.0.0",
  "engines": { "node": ">=20" },
  "scripts": {
    "dev": "turbo run dev",
    "dev:web": "turbo run dev --filter=web",
    "dev:api": "turbo run dev --filter=api",
    "build": "turbo run build",
    "lint": "turbo run lint",
    "typecheck": "turbo run typecheck",
    "test": "turbo run test",
    "format": "prettier --write \"**/*.{ts,tsx,js,jsx,json,md}\"",
    "gen:types": "pnpm --filter api export-openapi && pnpm --filter web gen:api-types",
    "clean": "turbo run clean && rm -rf node_modules"
  },
  "devDependencies": {
    "turbo": "^2.0.0",
    "prettier": "^3.2.0",
    "typescript": "^5.4.0",
    "openapi-typescript": "^7.4.0"
  }
}
```

### `pnpm-workspace.yaml`
```yaml
packages:
  - "apps/*"
  - "packages/*"
```

### `turbo.json`
```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**", "dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {},
    "typecheck": {},
    "test": {},
    "clean": { "cache": false },
    "export-openapi": { "outputs": ["../web/openapi.json"] },
    "gen:api-types": { "outputs": ["lib/api-types.ts"] }
  }
}
```

### `tsconfig.base.json`
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noUncheckedIndexedAccess": true
  }
}
```

---

### `apps/web/package.json`
```json
{
  "name": "web",
  "private": true,
  "scripts": {
    "dev": "next dev -p 3000",
    "build": "next build",
    "start": "next start -p ${PORT:-3000}",
    "lint": "next lint",
    "typecheck": "tsc --noEmit",
    "test": "echo \"no tests yet\"",
    "gen:api-types": "openapi-typescript ./openapi.json -o ./lib/api-types.ts",
    "clean": "rm -rf .next"
  },
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "next-intl": "^3.15.0",
    "framer-motion": "^11.0.0",
    "lucide-react": "^0.400.0"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "@marcheng/tsconfig": "workspace:*",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "tailwindcss": "^3.4.0",
    "eslint": "^8",
    "eslint-config-next": "^14",
    "typescript": "^5.4.0"
  }
}
```

### `apps/web/lib/api.ts`
Cliente HTTP tipado pelo OpenAPI:
```ts
import type { paths } from "./api-types.js";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

type ContactRequest = paths["/api/contact"]["post"]["requestBody"]["content"]["application/json"];
type ContactResponse = paths["/api/contact"]["post"]["responses"]["202"]["content"]["application/json"];

export async function submitContact(payload: ContactRequest): Promise<ContactResponse> {
  const res = await fetch(`${API_URL}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Contact failed: ${res.status}`);
  return res.json();
}
```

Nota: o arquivo `lib/api-types.ts` é gerado pelo comando `pnpm gen:types` na raiz — deixe um stub vazio antes da primeira geração, com um comentário explicando que será sobrescrito.

### `apps/web/railway.json`
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": { "builder": "NIXPACKS" },
  "deploy": {
    "startCommand": "pnpm start",
    "healthcheckPath": "/",
    "healthcheckTimeout": 100,
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### `apps/web/nixpacks.toml`
```toml
[phases.setup]
nixPkgs = ["nodejs_20", "pnpm-9_x"]

[phases.install]
cmds = ["cd ../.. && pnpm install --frozen-lockfile"]

[phases.build]
cmds = ["cd ../.. && pnpm --filter web build"]

[start]
cmd = "pnpm start"
```

---

### `apps/api/pyproject.toml`
```toml
[project]
name = "marcheng-api"
version = "0.0.0"
description = "MarchEng Engenharia — backend API"
requires-python = ">=3.12"
dependencies = [
    "fastapi[standard]>=0.115.0",
    "uvicorn[standard]>=0.32.0",
    "pydantic[email]>=2.9.0",
    "pydantic-settings>=2.6.0",
    "httpx>=0.27.0",
]

[dependency-groups]
dev = [
    "pytest>=8.3.0",
    "pytest-asyncio>=0.24.0",
    "ruff>=0.7.0",
    "mypy>=1.13.0",
]

[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"

[tool.hatch.build.targets.wheel]
packages = ["src/marcheng_api"]

[tool.ruff]
line-length = 100
target-version = "py312"
src = ["src", "tests"]

[tool.ruff.lint]
select = ["E", "F", "I", "N", "UP", "B", "S", "T20", "RUF", "ASYNC"]
ignore = ["S101"]  # allow `assert` in tests

[tool.ruff.lint.per-file-ignores]
"tests/**" = ["S101"]

[tool.mypy]
strict = true
python_version = "3.12"
files = ["src/marcheng_api"]

[tool.pytest.ini_options]
asyncio_mode = "auto"
testpaths = ["tests"]
```

### `apps/api/package.json` (proxy pro Turborepo)
```json
{
  "name": "api",
  "private": true,
  "scripts": {
    "dev": "uv run uvicorn marcheng_api.main:app --reload --host 0.0.0.0 --port 8000",
    "build": "uv sync --frozen",
    "start": "uv run uvicorn marcheng_api.main:app --host 0.0.0.0 --port ${PORT:-8000}",
    "lint": "uv run ruff check src tests && uv run ruff format --check src tests",
    "typecheck": "uv run mypy src",
    "test": "uv run pytest",
    "export-openapi": "uv run python -m marcheng_api.scripts.export_openapi",
    "clean": "rm -rf .venv .ruff_cache .pytest_cache .mypy_cache **/__pycache__"
  }
}
```

### `apps/api/src/marcheng_api/main.py`
```python
"""MarchEng API entrypoint."""

from contextlib import asynccontextmanager
from collections.abc import AsyncIterator

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from marcheng_api.config import settings
from marcheng_api.routes import contact, health


@asynccontextmanager
async def lifespan(_app: FastAPI) -> AsyncIterator[None]:
    """Lifespan hook for startup/shutdown logic."""
    # startup (placeholder)
    yield
    # shutdown (placeholder)


app = FastAPI(
    title="MarchEng API",
    version="0.0.0",
    description="Backend API for MarchEng Engenharia institutional site.",
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router, prefix="/api", tags=["health"])
app.include_router(contact.router, prefix="/api", tags=["contact"])
```

### `apps/api/src/marcheng_api/config.py`
```python
"""Application settings loaded from environment variables."""

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Runtime configuration."""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    environment: str = "development"
    port: int = 8000
    cors_origins: list[str] = ["http://localhost:3000"]
    resend_api_key: str | None = None
    contact_email_to: str | None = None


settings = Settings()
```

### `apps/api/src/marcheng_api/schemas/contact.py`
```python
"""Pydantic schemas for contact form."""

from typing import Literal

from pydantic import BaseModel, EmailStr, Field


class ContactPayload(BaseModel):
    """Payload submitted by the contact form."""

    name: str = Field(..., min_length=2, max_length=120)
    email: EmailStr
    phone: str | None = None
    company: str | None = None
    message: str = Field(..., min_length=10, max_length=5000)
    locale: Literal["pt", "en", "es", "it"] = "pt"


class ContactResponse(BaseModel):
    """Response after a contact submission."""

    status: str
```

### `apps/api/src/marcheng_api/routes/health.py`
```python
"""Health check endpoint."""

from datetime import UTC, datetime

from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class HealthResponse(BaseModel):
    status: str
    timestamp: str


@router.get("/health", response_model=HealthResponse)
async def health() -> HealthResponse:
    """Return service health."""
    return HealthResponse(
        status="ok",
        timestamp=datetime.now(UTC).isoformat(),
    )
```

### `apps/api/src/marcheng_api/routes/contact.py`
```python
"""Contact form endpoint."""

import logging

from fastapi import APIRouter, status

from marcheng_api.schemas.contact import ContactPayload, ContactResponse

router = APIRouter()
logger = logging.getLogger(__name__)


@router.post(
    "/contact",
    response_model=ContactResponse,
    status_code=status.HTTP_202_ACCEPTED,
)
async def submit_contact(payload: ContactPayload) -> ContactResponse:
    """Accept a contact submission. Email integration to be added."""
    # TODO: integrar com Resend (services/email.py) quando ativarmos
    logger.info("Contact form submission from %s <%s>", payload.name, payload.email)
    return ContactResponse(status="received")
```

### `apps/api/src/marcheng_api/routes/__init__.py`
```python
"""Route modules."""
```

### `apps/api/src/marcheng_api/services/email.py`
```python
"""Email service — placeholder for future Resend integration."""

import logging

logger = logging.getLogger(__name__)


async def send_contact_notification(
    name: str,
    email: str,
    message: str,
) -> None:
    """Send a contact notification email. Placeholder."""
    # TODO: implementar via Resend quando RESEND_API_KEY estiver setado
    logger.info("Email would be sent: %s <%s>: %s", name, email, message[:80])
```

### `apps/api/src/marcheng_api/scripts/export_openapi.py`
```python
"""Export the OpenAPI schema to JSON file consumed by the frontend."""

import json
from pathlib import Path

from marcheng_api.main import app


def main() -> None:
    """Write OpenAPI schema to apps/web/openapi.json."""
    output_path = Path(__file__).resolve().parents[4] / "web" / "openapi.json"
    schema = app.openapi()
    output_path.write_text(json.dumps(schema, indent=2) + "\n", encoding="utf-8")
    print(f"OpenAPI schema exported to {output_path}")  # noqa: T201


if __name__ == "__main__":
    main()
```

### `apps/api/tests/conftest.py`
```python
"""Shared pytest fixtures."""

import pytest
from fastapi.testclient import TestClient

from marcheng_api.main import app


@pytest.fixture
def client() -> TestClient:
    """FastAPI test client."""
    return TestClient(app)
```

### `apps/api/tests/test_health.py`
```python
"""Health endpoint tests."""

from fastapi.testclient import TestClient


def test_health_returns_ok(client: TestClient) -> None:
    response = client.get("/api/health")
    assert response.status_code == 200
    body = response.json()
    assert body["status"] == "ok"
    assert "timestamp" in body
```

### `apps/api/railway.json`
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": { "builder": "NIXPACKS" },
  "deploy": {
    "startCommand": "uv run uvicorn marcheng_api.main:app --host 0.0.0.0 --port $PORT",
    "healthcheckPath": "/api/health",
    "healthcheckTimeout": 100,
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### `apps/api/nixpacks.toml`
```toml
[phases.setup]
nixPkgs = ["python312", "uv"]

[phases.install]
cmds = ["uv sync --frozen --no-dev"]

[start]
cmd = "uv run uvicorn marcheng_api.main:app --host 0.0.0.0 --port $PORT"
```

### `apps/api/.python-version`
```
3.12
```

### `apps/api/.env.example`
```
ENVIRONMENT=development
PORT=8000
CORS_ORIGINS=["http://localhost:3000"]
RESEND_API_KEY=
CONTACT_EMAIL_TO=renan@marcheng.com.br
```

---

### `packages/tsconfig/package.json`
```json
{
  "name": "@marcheng/tsconfig",
  "version": "0.0.0",
  "private": true,
  "files": ["base.json", "nextjs.json"]
}
```

### `packages/tsconfig/nextjs.json`
```json
{
  "extends": "./base.json",
  "compilerOptions": {
    "lib": ["DOM", "DOM.Iterable", "ES2022"],
    "jsx": "preserve",
    "noEmit": true,
    "incremental": true,
    "plugins": [{ "name": "next" }]
  }
}
```

`packages/tsconfig/base.json` é cópia do `tsconfig.base.json` da raiz.

### `apps/web/tsconfig.json`
```json
{
  "extends": "@marcheng/tsconfig/nextjs.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

---

### Configs da raiz

#### `.env.example`
```
# === Frontend (apps/web) ===
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_WHATSAPP=5517997377626
NEXT_PUBLIC_EMAIL=renan@marcheng.com.br
NEXT_PUBLIC_TYPEKIT_ID=

# === Backend (apps/api) — ver apps/api/.env.example pros detalhes ===
```

#### `.gitignore`
```
# Node
node_modules
.pnpm-store
.next
.turbo

# Python
__pycache__
*.pyc
.venv
.ruff_cache
.pytest_cache
.mypy_cache
*.egg-info
dist
build

# Env
.env
.env.local
.env.*.local

# OS
.DS_Store

# Logs
*.log

# OpenAPI generated
apps/web/openapi.json
apps/web/lib/api-types.ts
```

> Nota: o `openapi.json` e o `api-types.ts` gerados podem ser commitados ou não. Recomendo **commitar** para que o build do frontend não dependa do backend estar rodando. Se preferir não commitar, ajuste o `.gitignore` e adicione step de geração no build pipeline.

#### `.nvmrc`
```
20
```

#### `.python-version`
```
3.12
```

#### `.npmrc`
```
shamefully-hoist=false
strict-peer-dependencies=false
auto-install-peers=true
```

#### `.editorconfig`
```
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.py]
indent_size = 4
```

#### `.prettierrc`
```json
{
  "semi": true,
  "singleQuote": false,
  "tabWidth": 2,
  "trailingComma": "all",
  "printWidth": 100,
  "arrowParens": "always"
}
```

---

### Home placeholder em `apps/web/app/[locale]/page.tsx`
```tsx
export default function HomePage() {
  return (
    <main style={{ padding: 48, fontFamily: "system-ui" }}>
      <h1>MarchEng — site em construção</h1>
      <p>Setup do monorepo OK. Próximo passo: implementar a home conforme briefing.</p>
    </main>
  );
}
```

### Setup i18n mínimo
- `i18n.ts` na raiz de `apps/web` declarando os locales (pt, en, es, it)
- `middleware.ts` configurando next-intl
- Os 4 `messages/*.json` por enquanto vazios (`{}`)

A home completa e i18n com conteúdo serão implementados em outra sessão.

---

## README a criar

Estrutura do README:

1. **MarchEng — Site institucional**
   - 1 parágrafo do que é
2. **Stack**
   | Camada | Tecnologia |
   |---|---|
   | Frontend | Next.js 14 + TypeScript + Tailwind + next-intl |
   | Backend | FastAPI (Python 3.12) + Pydantic v2 + uvicorn |
   | Tipos compartilhados | OpenAPI → openapi-typescript |
   | Build/Tooling | Turborepo + pnpm 9 + uv |
   | Deploy | Railway (2 services) |
3. **Estrutura do monorepo** (árvore resumida)
4. **Pré-requisitos**
   - Node 20+
   - pnpm 9 (`npm install -g pnpm@9`)
   - Python 3.12+ (recomendo via pyenv ou diretamente)
   - uv (`curl -LsSf https://astral.sh/uv/install.sh | sh`)
   - Conta Railway
   - (Opcional) Conta Resend pra ativar e-mail
5. **Setup local**
   ```bash
   # 1. Instalar deps do frontend (Node)
   pnpm install

   # 2. Instalar deps do backend (Python)
   cd apps/api && uv sync && cd ../..

   # 3. Copiar env
   cp .env.example .env
   cp apps/api/.env.example apps/api/.env
   # editar variáveis

   # 4. Rodar tudo em paralelo
   pnpm dev
   # web em http://localhost:3000
   # api em http://localhost:8000
   # docs api em http://localhost:8000/docs (Swagger UI)
   ```
6. **Scripts úteis**
   - `pnpm dev` / `dev:web` / `dev:api`
   - `pnpm build`
   - `pnpm lint` (ESLint + ruff)
   - `pnpm typecheck` (tsc + mypy)
   - `pnpm test` (pytest)
   - `pnpm gen:types` — exporta OpenAPI do backend e regenera `apps/web/lib/api-types.ts`. **Rode sempre que alterar schemas do backend.**
   - `pnpm format`
7. **Fluxo de mudança em endpoint**
   1. Adicionar/alterar rota em `apps/api/src/marcheng_api/routes/`
   2. Adicionar/alterar schema em `apps/api/src/marcheng_api/schemas/`
   3. Rodar `pnpm gen:types` na raiz
   4. Usar os novos tipos em `apps/web/lib/api.ts` e nos componentes
8. **Deploy no Railway** (ver seção dedicada abaixo no prompt)
9. **Como adicionar uma nova página de serviço**
10. **Roadmap**
    - Home (briefing dedicado)
    - 5 páginas de serviço
    - Integração Resend pro endpoint `/api/contact`
    - (Futuro) Postgres + SQLModel/SQLAlchemy se virar blog ou área de cliente
    - (Futuro) Endpoint `/api/usinas` consumindo dados do meuWatt

---

## Entregáveis esperados

1. Toda a estrutura de pastas e arquivos descrita acima criada
2. Na raiz: `pnpm install` instala todas as deps Node
3. Em `apps/api`: `uv sync` instala todas as deps Python e cria `.venv` + `uv.lock`
4. `pnpm dev` sobe frontend (3000) e backend (8000) em paralelo
5. `curl http://localhost:8000/api/health` retorna `{"status":"ok","timestamp":"..."}`
6. `curl http://localhost:8000/docs` mostra Swagger UI
7. `curl -X POST http://localhost:8000/api/contact -H "Content-Type: application/json" -d '{"name":"teste","email":"t@t.com","message":"hello world test"}'` retorna 202 com `{"status":"received"}`
8. `http://localhost:3000` renderiza a página placeholder
9. `pnpm gen:types` gera `apps/web/lib/api-types.ts` válido (pode ser executado após `pnpm dev:api` estar de pé, ou usando o export script)
10. `pnpm build` builda os 2 apps sem erros
11. `pnpm typecheck` passa em todos
12. `pnpm test` passa (pelo menos o test_health.py)
13. README completo e acionável
14. `railway.json` e `nixpacks.toml` em cada app

---

## Restrições / decisões importantes

- **NÃO instalar** Postgres, SQLAlchemy, Redis ou qualquer banco — fica pra fase futura
- **NÃO implementar** envio real de e-mail no `/api/contact` agora — só validar payload e logar
- **NÃO criar** GitHub Actions ainda — Railway auto-deploy é suficiente
- **NÃO implementar** o conteúdo real da home — só o placeholder mencionado
- **SIM, deixar** a infra de i18n pronta pra o briefing da home preencher
- **SIM, configurar** `pyproject.toml` com ruff + mypy + pytest prontos pra uso
- **SIM, gerar** o `apps/web/lib/api-types.ts` na primeira execução pra validar o fluxo OpenAPI → TS

Após confirmar setup OK, eu vou rodar o briefing da home dentro de `apps/web` em outra sessão.

Confirme decisões críticas comigo antes de implementar. Comece pela raiz (package.json, pnpm-workspace, turbo.json, tsconfig.base), depois packages/tsconfig, depois apps/api (Python — mais novo no monorepo), depois apps/web. Por fim valide o fluxo end-to-end de gen:types.
```

---

## Pré-requisitos antes de rodar este prompt

1. **Node 20+** localmente (use `nvm install 20` se gerencia versões)
2. **pnpm 9**: `npm install -g pnpm@9`
3. **Python 3.12+** localmente
4. **uv** (gerenciador Python moderno):
   ```bash
   curl -LsSf https://astral.sh/uv/install.sh | sh
   ```
5. **Conta Railway** ([railway.app](https://railway.app))
6. **Repo Git criado** (GitHub etc.)
7. (Opcional) **Conta Resend** ([resend.com](https://resend.com)) — pra quando ativar envio de e-mail

---

## Passo a passo no Railway depois do setup local rodando

1. Push do repo pro GitHub
2. No Railway, **New Project → Deploy from GitHub repo** → selecionar `marcheng-site`
3. Railway detecta 1 service. Renomeia pra **marcheng-web** e configura:
   - Settings → **Root Directory**: `apps/web`
   - Settings → **Watch Paths**: `apps/web/**`, `packages/**`, `pnpm-lock.yaml`
   - Variables: `NEXT_PUBLIC_API_URL` (preencher depois do passo 5), `NEXT_PUBLIC_WHATSAPP`, `NEXT_PUBLIC_EMAIL`, `NEXT_PUBLIC_TYPEKIT_ID`
4. **+ New → Empty Service → marcheng-api**, conectar mesmo repo do GitHub:
   - Settings → **Root Directory**: `apps/api`
   - Settings → **Watch Paths**: `apps/api/**`
   - Variables: `ENVIRONMENT=production`, `PORT` (Railway preenche), `CORS_ORIGINS=["https://marcheng.com.br"]` (ajustar depois com o domínio real), `RESEND_API_KEY`, `CONTACT_EMAIL_TO`
5. Em cada service: Settings → Networking → **Generate Domain** (vai gerar `marcheng-web-production.up.railway.app` e `marcheng-api-production.up.railway.app`)
6. Atualizar `NEXT_PUBLIC_API_URL` no service web com o domínio público da API
7. Atualizar `CORS_ORIGINS` no service api com o domínio do web
8. Quando tiver domínio próprio: `marcheng.com.br` → web service, `api.marcheng.com.br` → api service

---

## Sobre escalabilidade futura

Quando você quiser implementar o blog ou outras features:

**Blog**:
- Opção 1 (mais simples): arquivos MDX dentro de `apps/web/content/posts/`. Sem backend, sem painel.
- Opção 2 (CMS própria via FastAPI): adicionar `apps/api/src/marcheng_api/routes/posts.py` + Postgres no Railway + SQLModel ou SQLAlchemy. Painel admin via SQLAdmin ou FastAPI-Admin (montados em `/admin`). Você controla tudo.
- Opção 3 (CMS externa): Strapi/Directus como terceiro service no Railway.

**Integração com seu meuWatt** (e isso é o argumento mais forte de ter Python no backend):
- Adicionar `apps/api/src/marcheng_api/routes/usinas.py` que consulta seu monitoramento e expõe dados públicos (ex: "geração acumulada do nosso portfólio") ou dados privados pra clientes logados.
- Reusar bibliotecas (pvlib, pandas) direto no backend pra endpoints como `/api/simulacao-rapida` que rodam um pvlib leve a partir de inputs do site.

**Tipos sempre sincronizados**: cada vez que você criar/alterar uma rota ou schema no FastAPI, roda `pnpm gen:types` e o frontend ganha autocomplete + type safety automaticamente.

---

## Fluxo recomendado

1. Roda este prompt no Claude Code → estrutura monorepo de pé, frontend placeholder + backend FastAPI respondendo com Swagger UI
2. Valida local: `pnpm dev`, abrir `/docs` no browser, testar `/api/contact`
3. Push pro GitHub
4. Configura os 2 services no Railway
5. **Nova sessão** do Claude Code:
   > *"Leia `marcheng_home_prompt.md` e implemente a home da MarchEng dentro de `apps/web`. O monorepo já está montado, o backend FastAPI roda em apps/api. Use o handoff bundle do Claude Design que vou anexar e as PNGs de referência."*

---

## Resumo do que está sendo pedido

- Monorepo poliglota TypeScript + Python, limpo e escalável
- Frontend (Next.js) e backend (FastAPI) bem separados, deploy independente
- Tipos sempre sincronizados via OpenAPI → openapi-typescript
- Backend Python preparado pra crescer (integração com seu stack atual: meuWatt, pvlib, pandas)
- 2 services no Railway, comunicando via API
- Setup pronto pra a home (sem implementá-la) — briefing dedicado entra em outra sessão
- Caminho claro pra blog e outras features futuras
