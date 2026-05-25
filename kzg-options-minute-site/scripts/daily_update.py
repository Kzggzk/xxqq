#!/usr/bin/env python3
from __future__ import annotations

import argparse
from datetime import date, datetime, timedelta
import json
import os
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
KZG_OPTIONS_ROOT = Path(
    "/Users/fangbao/Library/Mobile Documents/com~apple~CloudDocs/KZG/23_DATA_Massive_期权分钟_Minute"
)
GOOGLE_OPTIONS_ROOT = Path(
    "/Users/fangbao/Library/CloudStorage/GoogleDrive-baofang1990@gmail.com/我的云端硬盘/KZG/23_DATA_Massive_期权分钟_Minute"
)
BUILD_SCRIPT = ROOT / "scripts" / "build_options_site.py"
NPX = Path("/usr/local/bin/npx")
CURL = Path("/usr/bin/curl")
KEYCHAIN_ACCOUNT = "KZGOptionHouse"
KEYCHAIN_ACCESS = "kzg-option-house.massive-s3-access-key-id"
KEYCHAIN_SECRET = "kzg-option-house.massive-s3-secret-access-key"

US_MARKET_HOLIDAYS_2026 = {
    date(2026, 1, 1),
    date(2026, 1, 19),
    date(2026, 2, 16),
    date(2026, 4, 3),
    date(2026, 5, 25),
    date(2026, 6, 19),
    date(2026, 7, 3),
    date(2026, 9, 7),
    date(2026, 11, 26),
    date(2026, 12, 25),
}


def is_market_day(day: date) -> bool:
    return day.weekday() < 5 and day not in US_MARKET_HOLIDAYS_2026


def previous_market_day(day: date) -> date:
    cursor = day - timedelta(days=1)
    while not is_market_day(cursor):
        cursor -= timedelta(days=1)
    return cursor


def source_path(trade_date: str) -> Path:
    return KZG_OPTIONS_ROOT / trade_date[:7] / f"options_minute_aggregates_{trade_date}.csv.gz"


def latest_local() -> str | None:
    paths = sorted(KZG_OPTIONS_ROOT.glob("2026-*/options_minute_aggregates_2026-*.csv.gz"))
    if not paths:
        return None
    name = paths[-1].name
    return name.removeprefix("options_minute_aggregates_").removesuffix(".csv.gz")


def run(command: list[str], *, cwd: Path = ROOT) -> int:
    print(json.dumps({"run": command, "cwd": str(cwd)}, ensure_ascii=False), flush=True)
    return subprocess.call(command, cwd=str(cwd))


def credential(env_name: str, service_name: str) -> str | None:
    value = os.environ.get(env_name)
    if value:
        return value
    try:
        completed = subprocess.run(
            [
                "/usr/bin/security",
                "find-generic-password",
                "-w",
                "-a",
                KEYCHAIN_ACCOUNT,
                "-s",
                service_name,
            ],
            check=True,
            capture_output=True,
            text=True,
        )
    except subprocess.CalledProcessError:
        return None
    return completed.stdout.strip() or None


def mirror_to_google(path: Path) -> None:
    if not GOOGLE_OPTIONS_ROOT.parent.exists():
        return
    trade_month = path.parent.name
    dst = GOOGLE_OPTIONS_ROOT / trade_month / path.name
    dst.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(path, dst)


def download_from_massive(trade_date: str) -> bool:
    access_key = credential("MASSIVE_S3_ACCESS_KEY_ID", KEYCHAIN_ACCESS)
    secret_key = credential("MASSIVE_S3_SECRET_ACCESS_KEY", KEYCHAIN_SECRET)
    target = source_path(trade_date)
    if not access_key or not secret_key:
        print(
            json.dumps(
                {
                    "download": "blocked",
                    "reason": "missing_massive_s3_credentials",
                    "keychain": [KEYCHAIN_ACCESS, KEYCHAIN_SECRET],
                },
                ensure_ascii=False,
            ),
            flush=True,
        )
        return False
    if not CURL.exists():
        print(json.dumps({"download": "blocked", "reason": f"missing {CURL}"}, ensure_ascii=False), flush=True)
        return False

    year, month, _ = trade_date.split("-")
    url = f"https://files.massive.com/flatfiles/us_options_opra/minute_aggs_v1/{year}/{month}/{trade_date}.csv.gz"
    target.parent.mkdir(parents=True, exist_ok=True)
    tmp = target.with_name(target.name + ".part")
    tmp.unlink(missing_ok=True)
    print(json.dumps({"download": "start", "tradeDate": trade_date, "url": url}, ensure_ascii=False), flush=True)
    code = subprocess.call(
        [
            str(CURL),
            "--fail",
            "--silent",
            "--show-error",
            "--aws-sigv4",
            "aws:amz:us-east-1:s3",
            "--user",
            f"{access_key}:{secret_key}",
            "-o",
            str(tmp),
            url,
        ]
    )
    if code != 0:
        tmp.unlink(missing_ok=True)
        print(json.dumps({"download": "failed", "tradeDate": trade_date, "code": code}, ensure_ascii=False), flush=True)
        return False
    tmp.replace(target)
    mirror_to_google(target)
    print(
        json.dumps(
            {"download": "done", "tradeDate": trade_date, "bytes": target.stat().st_size, "path": str(target)},
            ensure_ascii=False,
        ),
        flush=True,
    )
    return True


def deploy() -> int:
    if not NPX.exists():
        print(json.dumps({"deploy": "blocked", "reason": f"missing {NPX}"}, ensure_ascii=False), flush=True)
        return 2
    return run([str(NPX), "netlify", "deploy", "--prod", "--dir", "public"])


def main() -> int:
    parser = argparse.ArgumentParser(description="Daily local KZG Option House update.")
    parser.add_argument("--date", help="Override target trade date YYYY-MM-DD.")
    parser.add_argument("--today", help="Override local date YYYY-MM-DD for testing.")
    parser.add_argument("--deploy", action="store_true")
    parser.add_argument("--allow-latest-local", action="store_true")
    args = parser.parse_args()

    local_today = date.fromisoformat(args.today) if args.today else datetime.now().date()
    target = args.date or previous_market_day(local_today).isoformat()
    target_path = source_path(target)

    if not target_path.exists():
        if download_from_massive(target):
            target_path = source_path(target)
        else:
            latest = latest_local()
            print(
                json.dumps(
                    {
                        "status": "missing_target_file",
                        "targetTradeDate": target,
                        "expectedPath": str(target_path),
                        "latestLocalTradeDate": latest,
                        "massiveS3Env": {
                            "MASSIVE_S3_ACCESS_KEY_ID": bool(os.environ.get("MASSIVE_S3_ACCESS_KEY_ID")),
                            "MASSIVE_S3_SECRET_ACCESS_KEY": bool(os.environ.get("MASSIVE_S3_SECRET_ACCESS_KEY")),
                        },
                        "next": "Download the missing Massive options minute flat file into the expected path, then rerun this script.",
                    },
                    ensure_ascii=False,
                ),
                flush=True,
            )
            if not args.allow_latest_local:
                return 2
            if latest is None:
                return 2
            target = latest
            target_path = source_path(target)

    if not target_path.exists():
        latest = latest_local()
        print(
            json.dumps(
                {
                    "status": "missing_target_file",
                    "targetTradeDate": target,
                    "expectedPath": str(target_path),
                    "latestLocalTradeDate": latest,
                    "massiveS3Env": {
                        "MASSIVE_S3_ACCESS_KEY_ID": bool(os.environ.get("MASSIVE_S3_ACCESS_KEY_ID")),
                        "MASSIVE_S3_SECRET_ACCESS_KEY": bool(os.environ.get("MASSIVE_S3_SECRET_ACCESS_KEY")),
                    },
                    "next": "Download the missing Massive options minute flat file into the expected path, then rerun this script.",
                },
                ensure_ascii=False,
            ),
            flush=True,
        )
        if not args.allow_latest_local:
            return 2
        if latest is None:
            return 2
        target = latest

    code = run([sys.executable, str(BUILD_SCRIPT), "--date", target, "--force"])
    if code != 0:
        return code
    if args.deploy:
        return deploy()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
