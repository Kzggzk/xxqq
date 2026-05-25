#!/usr/bin/env python3
from __future__ import annotations

import base64
import gzip
import json
import shutil
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
DATA_DIR = PUBLIC / "data"
DAYS_DIR = DATA_DIR / "days"
DIST = ROOT / "dist"

COPY_FILES = ("index.html", "app.js", "styles.css")
COPY_DIRS = ("vendor",)


def load_json(path: Path) -> Any:
    return json.loads(path.read_text(encoding="utf-8"))


def prune_day(day: dict[str, Any]) -> dict[str, Any]:
    clean = dict(day)
    source = clean.get("source") or {}
    clean["source"] = {
        "label": "KZG packed minute aggregates",
        "byteSize": source.get("byteSize"),
        "modifiedAt": source.get("modifiedAt"),
    }
    return clean


def prune_index(index: dict[str, Any]) -> dict[str, Any]:
    clean = {
        "generatedAt": index.get("generatedAt"),
        "latestDate": index.get("latestDate"),
        "totalDates": index.get("totalDates"),
        "missingLocalMarketDays": index.get("missingLocalMarketDays", []),
        "dates": [],
    }
    for item in index.get("dates", []):
        clean["dates"].append(
            {
                "date": item.get("date"),
                "validRows": item.get("validRows"),
                "totalVol": item.get("totalVol"),
                "totalPremium": item.get("totalPremium", 0),
                "marketCp": item.get("marketCp"),
                "topSymbols": item.get("topSymbols", []),
                "rebuilt": item.get("rebuilt", False),
            }
        )
    return clean


def copy_public_shell() -> None:
    if DIST.exists():
        shutil.rmtree(DIST)
    DIST.mkdir(parents=True)
    for name in COPY_FILES:
        shutil.copy2(PUBLIC / name, DIST / name)
    for name in COPY_DIRS:
        src = PUBLIC / name
        if src.exists():
            shutil.copytree(src, DIST / name)


def main() -> int:
    index_path = DATA_DIR / "index.json"
    if not index_path.exists():
        raise SystemExit(f"Missing {index_path}; run build_options_site.py first.")

    index = prune_index(load_json(index_path))
    days: dict[str, Any] = {}
    for item in index["dates"]:
        trade_date = item["date"]
        days[trade_date] = prune_day(load_json(DAYS_DIR / f"{trade_date}.json"))

    payload = {
        "packagedAt": datetime.now(timezone.utc).isoformat(),
        "index": index,
        "days": days,
    }
    packed = gzip.compress(json.dumps(payload, ensure_ascii=False, separators=(",", ":")).encode("utf-8"), mtime=0)
    encoded = base64.b64encode(packed).decode("ascii")

    copy_public_shell()
    assets = DIST / "assets"
    assets.mkdir(parents=True, exist_ok=True)
    (assets / "kzg-pack.js").write_text(
        "window.__KZG_PACK__="
        + json.dumps(encoded)
        + ";\nwindow.__KZG_PACK_META__="
        + json.dumps({"packagedAt": payload["packagedAt"], "latestDate": index["latestDate"]})
        + ";\n",
        encoding="utf-8",
    )
    print(
        json.dumps(
            {
                "dist": str(DIST),
                "latestDate": index["latestDate"],
                "days": len(days),
                "encodedBytes": len(encoded),
            },
            ensure_ascii=False,
        )
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
