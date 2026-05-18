# MarchEng Web — Next.js 14 + pnpm workspace
# Build context: raiz do monorepo (Railway Root Directory = "/")
# Build command: docker build -f apps/web/Dockerfile .

# ---- deps ----
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@10.33.0 --activate

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json .npmrc ./
COPY packages ./packages
COPY apps/web/package.json ./apps/web/package.json
COPY apps/api/package.json ./apps/api/package.json

RUN pnpm install --frozen-lockfile

# ---- builder ----
FROM node:20-alpine AS builder
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@10.33.0 --activate

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/web/node_modules ./apps/web/node_modules
COPY --from=deps /app/packages ./packages

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json turbo.json tsconfig.base.json .npmrc ./
COPY apps/web ./apps/web

ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm --filter web build

# ---- runner ----
FROM node:20-alpine AS runner
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@10.33.0 --activate

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1

# Copy the whole built monorepo so pnpm scripts resolve correctly
COPY --from=builder /app /app

WORKDIR /app/apps/web

EXPOSE 3000

# Railway injects $PORT; "pnpm start" runs `next start -H 0.0.0.0 -p ${PORT:-3000}`
CMD ["sh", "-c", "pnpm start"]
