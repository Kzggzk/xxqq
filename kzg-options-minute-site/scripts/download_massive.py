#!/usr/bin/env python3
"""Cookie-reuse downloader for Massive options minute aggregate flat files.

One-time setup: capture the Massive Download HTTP request from Chrome DevTools
(Network tab → right-click the download → Copy as cURL) and extract two values
into ~/.kzg-option-house/secrets.env:

    MASSIVE_DOWNLOAD_URL_TEMPLATE='https://massive.com/.../options/minute/{date}/...'
    MASSIVE_SESSION_COOKIE='session=xxx; other=yyy'

Optional:
    MASSIVE_REFERER='https://massive.com/dashboard'
    MASSIVE_USER_AGENT='Mozilla/5.0 ...'

After setup, this script:
  1. Resolves target trade date (--date, --previous-trading-day, or default = prev trading day).
  2. Skips download if iCloud already has the csv.gz (idempotent).
  3. curl the URL with the saved cookie → ~/Downloads/.
  4. Validates size/header.
  5. Moves to iCloud canonical path
     KZG/23_DATA_Massive_期权分钟_Minute/{YYYY-MM}/options_minute_aggregates_{YYYY-MM-DD}.csv.gz

Exit codes:
  0 — downloaded (or already present, idempotent)
  2 — env not configured (warns, does not raise)
  3 — non-trading day, nothing to fetch
  4 — download failed
  5 — file invalid (size or header)
  6 — argument error
"""
from __future__ import annotations

import argparse
from datetime import date, datetime, timedelta
import json
import os
import shutil
import subprocess
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from build_options_site import US_MARKET_HOLIDAYS  # noqa: E402

HOME = Path.home()
SECRETS = HOME / ".kzg-option-house" / "secrets.env"
DOWNLOADS = HOME / "Downloads"
ICLOUD_ROOT = HOME / "Library" / "Mobile Documents" / "com~apple~CloudDocs" / "KZG" / "23_DATA_Massive_期权分钟_Minute"

MIN_VALID_BYTES = 5_000_000  # smallest plausible options minute file ≈ 5MB
GZIP_MAGIC = b"\x1f\x8b"


def log(payload: dict) -> None:
    print(json.dumps(payload, ensure_ascii=False), flush=True)


def is_market_day(day: date) -> bool:
    return day.weekday() < 5 and day not in US_MARKET_HOLIDAYS


def previous_market_day(day: date) -> date:
    cursor = day - timedelta(days=1)
    while not is_market_day(cursor):
        cursor -= timedelta(days=1)
    return cursor


def parse_env(path: Path) -> dict[str, str]:
    if not path.exists():
        return {}
    env: dict[str, str] = {}
    for raw in path.read_text(encoding="utf-8").splitlines():
        line = raw.strip()
        if not line or line.startswith("#"):
            continue
        if "=" not in line:
            continue
        key, _, value = line.partition("=")
        value = value.strip()
        if (value.startswith("'") and value.endswith("'")) or (
            value.startswith('"') and value.endswith('"')
        ):
            value = value[1:-1]
        env[key.strip()] = value
    return env


def canonical_icloud_path(trade_date: str) -> Path:
    return ICLOUD_ROOT / trade_date[:7] / f"options_minute_aggregates_{trade_date}.csv.gz"


def validate(path: Path) -> tuple[bool, str]:
    if not path.exists():
        return False, "missing"
    size = path.stat().st_size
    if size < MIN_VALID_BYTES:
        return False, f"size {size} < {MIN_VALID_BYTES}"
    with path.open("rb") as handle:
        head = handle.read(2)
    if head != GZIP_MAGIC:
        return False, f"not gzip (magic={head!r})"
    return True, "ok"


def curl_download(url: str, cookie: str, dest: Path, *, referer: str | None, ua: str | None) -> tuple[int, str]:
    args = [
        "/usr/bin/curl",
        "--fail",
        "--silent",
        "--show-error",
        "--location",
        "--max-time",
        "180",
        "--retry",
        "3",
        "--retry-delay",
        "5",
        "-H",
        f"Cookie: {cookie}",
        "-o",
        str(dest),
        url,
    ]
    if referer:
        args.extend(["-H", f"Referer: {referer}"])
    if ua:
        args.extend(["-H", f"User-Agent: {ua}"])
    result = subprocess.run(args, capture_output=True, text=True)
    msg = (result.stderr or "").strip()
    return result.returncode, msg


def main() -> int:
    parser = argparse.ArgumentParser(description="Cookie-reuse Massive options-minute downloader.")
    parser.add_argument("--date", help="Target YYYY-MM-DD (default: previous US trading day).")
    parser.add_argument("--today", help="Override 'now' as YYYY-MM-DD (for testing).")
    parser.add_argument("--previous-trading-day", action="store_true",
                        help="Explicitly target previous trading day (default behavior).")
    parser.add_argument("--dry-run", action="store_true",
                        help="Print resolved URL/path/env presence, do nothing.")
    args = parser.parse_args()

    today = date.fromisoformat(args.today) if args.today else datetime.now().date()
    if args.date:
        try:
            target = date.fromisoformat(args.date)
        except ValueError:
            log({"error": "bad --date", "value": args.date})
            return 6
    else:
        target = previous_market_day(today)

    target_str = target.isoformat()
    if not is_market_day(target):
        log({"status": "non_trading_day", "date": target_str})
        return 3

    icloud_dest = canonical_icloud_path(target_str)
    if icloud_dest.exists():
        ok, reason = validate(icloud_dest)
        if ok:
            log({"status": "already_present", "date": target_str, "path": str(icloud_dest)})
            return 0
        log({"warn": "existing file invalid, will redownload", "reason": reason, "path": str(icloud_dest)})

    env = parse_env(SECRETS)
    url_tmpl = env.get("MASSIVE_DOWNLOAD_URL_TEMPLATE", "").strip()
    cookie = env.get("MASSIVE_SESSION_COOKIE", "").strip()
    referer = env.get("MASSIVE_REFERER", "").strip() or None
    ua = env.get("MASSIVE_USER_AGENT", "").strip() or None

    if not url_tmpl or not cookie:
        log({
            "status": "env_missing",
            "secretsPath": str(SECRETS),
            "needs": ["MASSIVE_DOWNLOAD_URL_TEMPLATE", "MASSIVE_SESSION_COOKIE"],
            "hasUrl": bool(url_tmpl),
            "hasCookie": bool(cookie),
            "exampleAt": str(SECRETS.with_suffix(".env.example")),
        })
        return 2

    url = url_tmpl.format(date=target_str, yyyymmdd=target_str.replace("-", ""),
                          yyyy=target_str[:4], mm=target_str[5:7], dd=target_str[8:10])

    if args.dry_run:
        log({
            "dryRun": True,
            "date": target_str,
            "url": url,
            "cookiePrefix": cookie[:24] + "..." if len(cookie) > 24 else cookie,
            "referer": referer,
            "userAgent": ua,
            "icloudDest": str(icloud_dest),
        })
        return 0

    DOWNLOADS.mkdir(parents=True, exist_ok=True)
    tmp = DOWNLOADS / f"options_minute_aggregates_{target_str}.csv.gz.download"
    log({"status": "downloading", "date": target_str, "url": url, "tmp": str(tmp)})
    code, msg = curl_download(url, cookie, tmp, referer=referer, ua=ua)
    if code != 0:
        log({"error": "curl_failed", "exitCode": code, "stderr": msg[:500], "tmp": str(tmp)})
        try:
            tmp.unlink(missing_ok=True)
        except Exception:
            pass
        return 4

    ok, reason = validate(tmp)
    if not ok:
        log({"error": "invalid_download", "reason": reason, "tmp": str(tmp)})
        try:
            tmp.unlink(missing_ok=True)
        except Exception:
            pass
        return 5

    icloud_dest.parent.mkdir(parents=True, exist_ok=True)
    shutil.move(str(tmp), str(icloud_dest))
    final_size = icloud_dest.stat().st_size
    log({"status": "ok", "date": target_str, "path": str(icloud_dest), "bytes": final_size})
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
