#!/usr/bin/env python3
"""Copy per-day HTML reports + report.css from public/ into dist/ so they ship
alongside the SPA payload bundle.

Produces:
  dist/r/report-YYYY-MM-DD.html  (renamed from public/reports/YYYY-MM-DD.html)
  dist/r/latest.html             (copy of the newest report)
  dist/styles/report.css         (mirror of public/styles/report.css)

netlify.toml routes:
  /r/:date   → /r/report-:date.html  (200 rewrite)
  /latest    → /r/latest.html        (200 rewrite)
"""
from __future__ import annotations

import json
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
REPORTS_SRC = PUBLIC / "reports"
STYLES_SRC = PUBLIC / "styles"
DIST = ROOT / "dist"
DIST_R = DIST / "r"
DIST_STYLES = DIST / "styles"


def main() -> int:
    if not DIST.exists():
        raise SystemExit(f"Missing {DIST}; run build_payload.py first.")
    if not REPORTS_SRC.exists():
        raise SystemExit(f"Missing {REPORTS_SRC}; run build_options_site.py first.")

    DIST_R.mkdir(parents=True, exist_ok=True)
    DIST_STYLES.mkdir(parents=True, exist_ok=True)

    copied = 0
    dates: list[str] = []
    for src in sorted(REPORTS_SRC.glob("2026-*.html")):
        date = src.stem
        dst = DIST_R / f"report-{date}.html"
        shutil.copy2(src, dst)
        dates.append(date)
        copied += 1

    latest_path = None
    if dates:
        latest = dates[-1]
        latest_src = DIST_R / f"report-{latest}.html"
        latest_dst = DIST_R / "latest.html"
        shutil.copy2(latest_src, latest_dst)
        latest_path = str(latest_dst)

    css_src = STYLES_SRC / "report.css"
    css_dst = DIST_STYLES / "report.css"
    if css_src.exists():
        shutil.copy2(css_src, css_dst)

    print(
        json.dumps(
            {
                "copied": copied,
                "latest": dates[-1] if dates else None,
                "latestHtml": latest_path,
                "cssCopied": css_dst.exists(),
            },
            ensure_ascii=False,
        )
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
