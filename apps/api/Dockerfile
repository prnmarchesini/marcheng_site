# MarchEng API — Python 3.12 + uv
# Build context: raiz do monorepo (Railway Root Directory = "/")
# Build command: docker build -f apps/api/Dockerfile .

FROM python:3.12-slim AS base

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_NO_CACHE_DIR=1 \
    UV_LINK_MODE=copy \
    UV_PYTHON_DOWNLOADS=never

# Install uv (rust binary, ~5MB)
RUN apt-get update \
    && apt-get install -y --no-install-recommends curl ca-certificates \
    && curl -LsSf https://astral.sh/uv/install.sh | sh \
    && cp /root/.local/bin/uv /usr/local/bin/uv \
    && cp /root/.local/bin/uvx /usr/local/bin/uvx \
    && apt-get purge -y --auto-remove curl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Cache deps separately from source
COPY apps/api/pyproject.toml apps/api/uv.lock apps/api/.python-version /app/
RUN uv sync --frozen --no-dev --no-install-project

# Now copy source
COPY apps/api/src /app/src

# Install the project itself (editable would conflict with --no-dev)
RUN uv sync --frozen --no-dev

ENV PATH="/app/.venv/bin:${PATH}"

EXPOSE 8000

# Railway injects $PORT; fallback 8000 for local docker run
CMD ["sh", "-c", "uv run uvicorn marcheng_api.main:app --host 0.0.0.0 --port ${PORT:-8000}"]
