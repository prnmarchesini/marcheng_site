"""Export the OpenAPI schema to JSON file consumed by the frontend."""

import json
from pathlib import Path

from marcheng_api.main import app


def main() -> None:
    """Write OpenAPI schema to apps/web/openapi.json."""
    output_path = Path(__file__).resolve().parents[4] / "web" / "openapi.json"
    output_path.parent.mkdir(parents=True, exist_ok=True)
    schema = app.openapi()
    output_path.write_text(json.dumps(schema, indent=2) + "\n", encoding="utf-8")
    print(f"OpenAPI schema exported to {output_path}")  # noqa: T201


if __name__ == "__main__":
    main()
