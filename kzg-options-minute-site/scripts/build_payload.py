#!/usr/bin/env python3
from __future__ import annotations

import base64
import gzip
import hashlib
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
FOCUS_SYMBOLS = {
    "SPY",
    "QQQ",
    "IWM",
    "SPXW",
    "SPX",
    "VIX",
    "NVDA",
    "TSLA",
    "AAPL",
    "MSFT",
    "AMD",
    "META",
    "AMZN",
    "GOOGL",
    "GOOG",
    "AVGO",
    "SMCI",
    "PLTR",
    "MSTR",
    "SOFI",
    "TLT",
    "SMH",
    "IBIT",
    "GLD",
    "SLV",
    "TQQQ",
    "SQQQ",
    "SOXL",
    "SOXS",
}


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


def build_analytics(index: dict[str, Any], days: dict[str, Any]) -> dict[str, Any]:
    rows_asc = list(reversed(index.get("dates", [])))
    daily: list[dict[str, Any]] = []
    symbol_totals: dict[str, int] = {}
    latest_symbols: set[str] = set()

    latest_date = index.get("latestDate")
    if latest_date and latest_date in days:
        latest_symbols.update(row.get("symbol") for row in days[latest_date].get("topUnderlyings", [])[:45])

    for item in rows_asc:
        trade_date = item.get("date")
        day = days.get(trade_date)
        if not day:
            continue
        overview = day.get("overview", {})
        category = overview.get("category", {})
        buckets = day.get("buckets", {}).get("market", [])
        daily.append(
            {
                "date": trade_date,
                "totalVol": overview.get("totalVol", 0),
                "totalPremium": overview.get("totalPremium", 0),
                "marketCp": overview.get("marketCp"),
                "category": {
                    name: {
                        "volume": (category.get(name) or {}).get("volume", 0),
                        "premium": (category.get(name) or {}).get("premium", 0),
                        "cpRatio": (category.get(name) or {}).get("cpRatio"),
                    }
                    for name in ("INDEX", "ETF", "STOCK")
                },
                "buckets": [bucket.get("total", 0) for bucket in buckets],
            }
        )
        for row in day.get("topUnderlyings", []):
            symbol = row.get("symbol")
            if symbol:
                symbol_totals[symbol] = symbol_totals.get(symbol, 0) + int(row.get("totalVol") or 0)

    ranked_symbols = [
        symbol for symbol, _ in sorted(symbol_totals.items(), key=lambda item: item[1], reverse=True)[:90]
    ]
    focus = sorted((FOCUS_SYMBOLS | set(ranked_symbols) | latest_symbols) & set(symbol_totals))

    symbol_series: dict[str, list[dict[str, Any]]] = {symbol: [] for symbol in focus}
    symbol_meta: dict[str, dict[str, Any]] = {}
    for item in rows_asc:
        trade_date = item.get("date")
        day = days.get(trade_date)
        if not day:
            continue
        for row in day.get("topUnderlyings", []):
            symbol = row.get("symbol")
            if symbol not in symbol_series:
                continue
            symbol_meta.setdefault(
                symbol,
                {
                    "symbol": symbol,
                    "category": row.get("category"),
                    "aggregateVol": symbol_totals.get(symbol, 0),
                },
            )
            symbol_series[symbol].append(
                {
                    "date": trade_date,
                    "totalVol": row.get("totalVol", 0),
                    "premiumNotional": row.get("premiumNotional", 0),
                    "cpRatio": row.get("cpRatio"),
                    "hottestShort": row.get("hottestShort"),
                }
            )

    return {
        "daily": daily,
        "symbols": [
            symbol_meta.get(symbol, {"symbol": symbol, "category": None, "aggregateVol": symbol_totals.get(symbol, 0)})
            for symbol in focus
        ],
        "symbolSeries": symbol_series,
    }


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
    analytics = build_analytics(index, days)

    payload = {
        "packagedAt": datetime.now(timezone.utc).isoformat(),
        "index": index,
        "days": days,
        "analytics": analytics,
    }
    packed = gzip.compress(json.dumps(payload, ensure_ascii=False, separators=(",", ":")).encode("utf-8"), mtime=0)
    encoded = base64.b64encode(packed).decode("ascii")

    copy_public_shell()
    assets = DIST / "assets"
    assets.mkdir(parents=True, exist_ok=True)
    pack_hash = hashlib.sha256(encoded.encode("ascii")).hexdigest()[:12]
    pack_name = f"kzg-frame-{pack_hash}.js"
    (assets / pack_name).write_text(
        "window.__KZG_PACK__="
        + json.dumps(encoded)
        + ";\nwindow.__KZG_PACK_META__="
        + json.dumps({"packagedAt": payload["packagedAt"], "latestDate": index["latestDate"]})
        + ";\n",
        encoding="utf-8",
    )
    index_dist = DIST / "index.html"
    index_dist.write_text(
        index_dist.read_text(encoding="utf-8").replace("/assets/kzg-pack.js", f"/assets/{pack_name}"),
        encoding="utf-8",
    )
    print(
        json.dumps(
            {
                "dist": str(DIST),
                "latestDate": index["latestDate"],
                "days": len(days),
                "analyticsDays": len(analytics["daily"]),
                "analyticsSymbols": len(analytics["symbols"]),
                "encodedBytes": len(encoded),
                "packAsset": pack_name,
            },
            ensure_ascii=False,
        )
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
