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

# Step 2: build (no --deploy yet, we orchestrate deploy after per-day-html step).
log "step: daily_update.py (build only)"
/usr/bin/env python3 scripts/daily_update.py 2>&1 | tee -a "$LOG"
status=${PIPESTATUS[0]}
log "daily_update.py exit=$status"
if [ "$status" -ne 0 ] && [ "$status" -ne 2 ]; then
  log "ERR daily_update.py failed unexpectedly — aborting"
  exit 5
fi

# Step 3: merge per-day HTML reports into dist/ so /r/:date and /latest resolve.
log "step: per_day_to_dist.py"
/usr/bin/env python3 scripts/per_day_to_dist.py 2>&1 | tee -a "$LOG"
perday_status=${PIPESTATUS[0]}
log "per_day_to_dist.py exit=$perday_status"
if [ "$perday_status" -ne 0 ]; then
  log "ERR per_day_to_dist.py failed"
  exit 6
fi

# Step 4: netlify deploy --prod --dir dist
log "step: netlify deploy --prod --dir dist"
/usr/local/bin/npx --yes netlify-cli deploy --prod --dir dist 2>&1 | tee -a "$LOG"
deploy_status=${PIPESTATUS[0]}
log "netlify deploy exit=$deploy_status"
if [ "$deploy_status" -ne 0 ]; then
  log "ERR netlify deploy failed"
  exit 7
fi

if [ "$status" -eq 2 ]; then
  log "WARN: source csv.gz missing for previous trading day — manual Massive download required"
fi

# Smoke-check the live site. Concurrent editor pivoted to a SPA payload bundle:
# routes /reports /r /latest are now intentional 404s, the canonical entrypoints
# are / (homepage shell) and /assets/kzg-pack.js (bundled payload).
log "step: smoke check live"
http_home=$(/usr/bin/curl -s -o /dev/null -w "%{http_code}" "https://kzg-option-house.netlify.app/")
http_pack=$(/usr/bin/curl -s -o /dev/null -w "%{http_code}" "https://kzg-option-house.netlify.app/assets/kzg-pack.js")
log "live /=$http_home /assets/kzg-pack.js=$http_pack"

if [ "$http_home" != "200" ] || [ "$http_pack" != "200" ]; then
  log "ERR live smoke failed"
  exit 3
fi

log "--- run done ok ---"
exit 0
