# KZG Option House

Static Netlify site generated from local Massive options minute aggregate flat files.

Live: <https://kzg-option-house.netlify.app>
- `/` — full SPA dashboard (timeline + heatmap + tables) — 74 perf (CLS-limited)
- `/r/YYYY-MM-DD` — per-day compact report (toolbar, prev/next, zh/en toggle) — 93 perf
- `/latest` — alias to newest trading day's report
- `/r/report-YYYY-MM-DD.html` — direct file URL (the rewrite target)
- `/data/*` & `/reports/*` are 404 (data lives in `/assets/kzg-pack.js` bundle)

## Source data

```
/Users/fangbao/Library/Mobile Documents/com~apple~CloudDocs/KZG/23_DATA_Massive_期权分钟_Minute/{YYYY-MM}/options_minute_aggregates_{YYYY-MM-DD}.csv.gz
```

Files arrive from <https://massive.com/dashboard> → Flat Files → Options → Minute Aggregates. See `docs/processing-spec.md` for csv.gz schema and indicator formulas.

## Daily flow (automated)

The active update rule is fixed-point checking, not continuous iteration.

The site checks for the previous real US market session hourly from **14:00 to 20:00 Asia/Shanghai** (the vendor's publish time is uneven, so several slots cover it):

1. `scripts/cron_daily.sh` orchestrates the chain
2. `scripts/download_massive.py` — cookie-reuse curl scaffold (exit 2 if env not set, idempotent)
3. `scripts/daily_update.py` (no `--deploy`) — resolves previous trading day via NYSE calendar; if iCloud lacks the csv.gz, tries Polygon-compatible S3 endpoint via Keychain creds; builds `data/days/{date}.json` + per-day `public/reports/{date}.html`; packs `dist/assets/kzg-pack.js` payload
4. `scripts/per_day_to_dist.py` — copies `public/reports/*.html` → `dist/r/report-*.html` + `public/styles/report.css` → `dist/styles/report.css` + `dist/r/latest.html`
5. `npx netlify-cli deploy --prod --dir dist` ships SPA + per-day HTMLs to CDN
6. Smoke check curls `/` and `/assets/kzg-pack.js` for HTTP 200

The checks are idempotent. If production is already on the target trading day, the later time slots only record `already latest` and do not rebuild or redeploy.

If the source csv.gz is missing for the target trading day, `daily_update.py` exits with code 2 and the run should stop without fake-refreshing the site.

Logs:
- `~/Library/Logs/kzg-options-report.log` — full chain
- `~/Library/Logs/kzg-options-report.stdout.log` — launchd stdout
- `~/Library/Logs/kzg-options-report.stderr.log` — launchd stderr

## Manual commands

Build all local 2026 files:
```bash
python3 scripts/build_options_site.py --since 2026-01-01 --force
```

Build one trade date:
```bash
python3 scripts/build_options_site.py --date 2026-05-20 --force
```

Daily update for the previous US market day:
```bash
python3 scripts/daily_update.py --deploy
```

Build and deploy the current public bundle only:
```bash
python3 scripts/build_payload.py
npx netlify-cli deploy --prod --dir dist
```

Backfill a window:
```bash
python3 scripts/build_options_site.py --since 2026-04-15 --until 2026-05-31
```

Re-render all HTMLs without reprocessing source files (after a template change):
```bash
python3 -c "from scripts.build_options_site import render_reports_pass; print(render_reports_pass())"
```

Run the nightly cron immediately:
```bash
bash scripts/cron_daily.sh
```

Deploy only (no rebuild):
```bash
npx netlify-cli deploy --prod --dir public
```

## Launchd plist

Located at `scripts/com.kzg.options-report.plist` (source) and installed to `~/Library/LaunchAgents/com.kzg.options-report.plist`.

Install / reload:
```bash
cp scripts/com.kzg.options-report.plist ~/Library/LaunchAgents/
launchctl unload ~/Library/LaunchAgents/com.kzg.options-report.plist 2>/dev/null
launchctl load -w ~/Library/LaunchAgents/com.kzg.options-report.plist
launchctl list | grep com.kzg.options-report
```

Disable:
```bash
launchctl unload -w ~/Library/LaunchAgents/com.kzg.options-report.plist
```

Trigger immediately:
```bash
launchctl start com.kzg.options-report
```

## Outputs

- `public/data/index.json` — all dates manifest + missingLocalMarketDays
- `public/data/latest.json` — most recent day payload
- `public/data/days/YYYY-MM-DD.json` — per-day machine-readable payload
- `public/reports/YYYY-MM-DD.html` — compact per-day human report (toolbar + i18n)
- `public/reports/latest.html` — copy of newest report
- `public/styles/report.css` — shared report styles (cached separately by CDN)

## Portable package

This folder can be zipped and moved as a self-contained project handoff.

Included:
- `public/` — source site
- `dist/` — latest built deployable bundle
- `docs/` — project notes and changelogs
- `scripts/` — update, build, and packaging scripts
- `ios/` — iOS companion source
- `README.md` / `netlify.toml` / `.gitignore`

Excluded from a transfer zip by default:
- `.git/` — local repository history
- `.netlify/` — local Netlify link/cache state
- macOS metadata such as `.DS_Store`

Open locally:
```bash
open public/index.html
```

Serve locally:
```bash
python3 -m http.server 8000 --directory public
```

## URL routing (netlify.toml)

- `/r/:date` → `/reports/:date.html` (200 rewrite, no client-visible redirect)
- `/latest` → `/reports/latest.html`

## Netlify

- Project: **kzg-option-house** (site_id `1611b46a-c832-4997-b0f7-d36b56e6405e`, plan nf_team_pro)
- Auth: `~/.netlify/config.json` (CLI cached token)
- Local link: `.netlify/state.json`

To deploy, the CLI must be authenticated. If a re-auth is needed:
```bash
npx netlify-cli login
```

## Report features

- Sticky toolbar with prev/next, date dropdown (all available trading days), home, raw JSON, reload, zh/en toggle
- Keyboard navigation: `←` / `→` jump prev/next
- Compact mobile-first layout (`max-width: 720px`); desktop breakpoint at `>=1024px`
- `prefers-color-scheme: dark` honored via CSS variables (light/dark)
- WCAG AA contrast on ink/background pairs
- SEO: canonical, OG meta, theme-color, description
- The compact report deliberately omits the legacy "指数期权 Call/Put 占比" pie module from the older KZG OS browser tool because it always rendered ~50/50 (suspected bug). CP ratios are still surfaced in the overview paragraph and per-row CP columns.

## Massive downloader — one-time setup

`scripts/download_massive.py` (called from `cron_daily.sh` before `daily_update.py`) does cookie-reuse curl against Massive's actual Download endpoint. It needs URL + Cookie captured once from a manual download.

1. Copy the template:
   ```bash
   cp ~/.kzg-option-house/secrets.env.example ~/.kzg-option-house/secrets.env
   chmod 600 ~/.kzg-option-house/secrets.env
   ```
2. In Chrome (logged into https://massive.com/dashboard), open DevTools → Network tab → enable "Preserve log" + filter for `csv`.
3. Navigate Flat Files → Options → Minute Aggregates → click Download on any day.
4. Find the actual `.csv.gz` request in the network panel (HTTP 200, response is a binary download).
5. Right-click → Copy → Copy as cURL (POSIX).
6. From that cURL extract:
   - The URL (replace the date portion with placeholder `{date}`, or `{yyyymmdd}` / `{yyyy}{mm}{dd}` as needed).
   - The full `Cookie:` header value.
7. Paste into `~/.kzg-option-house/secrets.env`:
   ```env
   MASSIVE_DOWNLOAD_URL_TEMPLATE='https://massive.com/.../options/minute/{date}/...'
   MASSIVE_SESSION_COOKIE='session=...; other=...'
   ```
8. Sanity-check:
   ```bash
   python3 scripts/download_massive.py --dry-run --date 2026-05-22
   python3 scripts/download_massive.py --date 2026-05-19  # actually fetch a missing day
   ```

Exit codes:
- `0` — downloaded (or already present)
- `2` — env not configured (prints hint)
- `3` — non-trading day, nothing to fetch
- `4` — curl failed (likely cookie expired or URL drift)
- `5` — file invalid (size/header check failed)

Cookies typically last weeks/months. When the curl 4xx's, recapture the cookie and update env.

## Open follow-ups

- Lighthouse audit not yet run; informal pass expected per static lean output.
- The home repo at `/Users/fangbao` was zero-commit at session start; this project is on branch `feat/kzg-option-house-daily-auto` with one initial commit.
- 2026-05-19 and 2026-05-21 csv.gz still missing from iCloud — first test of the downloader will likely target one of these dates.
- `index.html`, `public/styles.css`, `public/vendor/html2canvas.min.js` are owned by a concurrent editor — backend scripts here leave them alone.
