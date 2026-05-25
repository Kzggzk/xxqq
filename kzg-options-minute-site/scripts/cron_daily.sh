#!/bin/bash
# KZG Option House — nightly glue at 20:00 Asia/Shanghai.
# Sequence: locate previous US trading day → check iCloud csv.gz → build + deploy.
# Idempotent: if today's previous-trading-day report already built, only redeploys when --force.

set -uo pipefail

ROOT="/Users/fangbao/kzg-options-minute-site"
LOG_DIR="/Users/fangbao/Library/Logs"
LOG="$LOG_DIR/kzg-options-report.log"
mkdir -p "$LOG_DIR"

ts() { /bin/date "+%Y-%m-%dT%H:%M:%S%z"; }

log() {
  printf "[%s] %s\n" "$(ts)" "$*" >> "$LOG"
}

log "--- run start (pid $$) ---"
log "ROOT=$ROOT"
log "PWD=$(pwd)"

export PATH="/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin:/usr/sbin:/sbin:$PATH"

cd "$ROOT" || { log "ERR cd failed"; exit 2; }

# Step 1: Massive downloader for previous trading day (idempotent — skips if iCloud already has file).
# Exit codes (non-fatal): 2=env not configured, 3=non-trading day, 4=download failed, 5=invalid file.
log "step: download_massive.py"
/usr/bin/env python3 scripts/download_massive.py 2>&1 | tee -a "$LOG"
dl_status=${PIPESTATUS[0]}
log "download_massive.py exit=$dl_status"

# Step 2: daily build + deploy.
log "step: daily_update.py --deploy"
/usr/bin/env python3 scripts/daily_update.py --deploy 2>&1 | tee -a "$LOG"
status=${PIPESTATUS[0]}
log "daily_update.py exit=$status"

if [ "$status" -eq 2 ]; then
  log "WARN: source csv.gz missing for previous trading day — manual Massive download required"
fi

# Smoke-check the live site for /latest and /data/index.json.
log "step: smoke check live"
http_latest=$(/usr/bin/curl -s -o /dev/null -w "%{http_code}" "https://kzg-option-house.netlify.app/latest")
http_index=$(/usr/bin/curl -s -o /dev/null -w "%{http_code}" "https://kzg-option-house.netlify.app/data/index.json")
log "live /latest=$http_latest /data/index.json=$http_index"

if [ "$http_latest" != "200" ] || [ "$http_index" != "200" ]; then
  log "ERR live smoke failed"
  exit 3
fi

log "--- run done ok ---"
exit 0
