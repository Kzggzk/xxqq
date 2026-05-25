# KZG Option House

Static Netlify site generated from local Massive options minute aggregate flat files.

Live: <https://kzg-option-house.netlify.app>
- `/` — full SPA dashboard (timeline + heatmap + tables)
- `/r/YYYY-MM-DD` — per-day compact report (toolbar, prev/next, zh/en toggle)
- `/latest` — newest trading day
- `/data/index.json` — manifest (all dates + missing days)

## Source data

```
/Users/fangbao/Library/Mobile Documents/com~apple~CloudDocs/KZG/23_DATA_Massive_期权分钟_Minute/{YYYY-MM}/options_minute_aggregates_{YYYY-MM-DD}.csv.gz
```

Files arrive from <https://massive.com/dashboard> → Flat Files → Options → Minute Aggregates. See `docs/processing-spec.md` for csv.gz schema and indicator formulas.

## Daily flow (automated)

`launchd` job `com.kzg.options-report` fires every day at **20:00 Asia/Shanghai** (post US market close):

1. `scripts/cron_daily.sh` invokes `daily_update.py --deploy`
2. `daily_update.py` resolves previous trading day via NYSE holiday calendar
3. If iCloud has the `csv.gz` → `build_options_site.py --date {date} --force`
4. Render pass rebuilds all per-day HTMLs with prev/next nav
5. `npx netlify deploy --prod --dir public` ships to Netlify CDN
6. Smoke check curls `/latest` and `/data/index.json` for HTTP 200

If the source csv.gz is missing for the target trading day, daily_update exits with code 2 and the cron log records `WARN: source csv.gz missing`. Trigger the Massive downloader manually in that case.

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

## Open follow-ups

- Massive downloader (`scripts/cron_daily.sh` warns when csv.gz is missing but does not yet fetch). Decide between AppleScript+System Events vs Chrome DevTools Protocol vs Cookie-reuse curl. See `docs/lessons.md` for tradeoffs.
- Lighthouse audit (not yet run in this branch; informal pass expected per static lean output).
- The home repo at `/Users/fangbao` has zero commits yet; this project is staged on branch `feat/kzg-option-house-daily-auto`.
