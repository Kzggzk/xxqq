# Processing spec — KZG Option House

Snapshot of the data pipeline as of 2026-05-25.

## 1. Source: Massive options minute aggregates

- Origin: <https://massive.com/dashboard> → Flat Files → Options → Minute Aggregates
- Filename pattern: `options_minute_aggregates_YYYY-MM-DD.csv.gz`
- Canonical location on this Mac:
  `~/Library/Mobile Documents/com~apple~CloudDocs/KZG/23_DATA_Massive_期权分钟_Minute/{YYYY-MM}/options_minute_aggregates_{YYYY-MM-DD}.csv.gz`
- Format: gzip'd CSV, ~20–35 MB compressed per day, 2–4 M rows.

### csv.gz columns (Polygon flat-files-compatible schema)

| Column | Type | Notes |
|---|---|---|
| `ticker` | string | OPRA-style: `O:{symbol}{yymmdd}{C|P}{strike8}`, e.g. `O:SPY260520C00740000` |
| `volume` | int | Contracts traded in this 1-minute bucket |
| `open` | float | Open price |
| `close` | float | Close price |
| `high` | float | High |
| `low` | float | Low |
| `window_start` | int64 (ns) | Bucket start in UTC nanoseconds |
| `transactions` | int | Trade count in this bucket |

Only `ticker`, `window_start`, `volume`, `transactions` are consumed by the current pipeline. Pricing fields are passed through untouched (available for future use).

## 2. Parser — `scripts/build_options_site.py::process_file`

Streams `gzip.open(path, "rt")` row-by-row (no full load to memory). For each row:

1. Match `TICKER_RE = ^O:([A-Z0-9]+?)(\d{6})([CP])(\d{8})$` → captures `(symbol, yymmdd, C|P, strike8)`. Rows that don't match increment `invalidRows`.
2. Underlying aggregation in `aggs[symbol]`:
   - `totalVol += volume`
   - `txn += transactions`
   - `call_vol` / `put_vol` split by C/P
   - `leap_call` / `leap_put`: contribute only if expiry > `coming_friday(trade_date) + 84 days` (~12 weeks). LEAP heuristic carried over from KZG OS.
3. Intraday 30-min bucket assignment:
   - `seconds_et = window_start // 1e9 + et_offset_seconds(trade_date)` (handles DST: -4h Mar 8–Nov 1, -5h otherwise for 2026)
   - `minute = hour*60 + (minute//30)*30` → buckets `09:30, 10:00, ..., 15:30` (13 half-hour buckets).
4. Per-symbol "hottest contract": ticker with max volume.

## 3. Derived metrics

| Metric | Formula | Where |
|---|---|---|
| `cpRatio` per symbol | `call_vol / put_vol` (`null` if put_vol == 0) | `process_file` |
| `leapRatio` per symbol | `leap_call / leap_put` (`null` if 0) | `process_file` |
| `avgSize` | `round(total_vol / txn)` | `process_file` |
| Category | `INDEX` if symbol in `OPT_INDEX` set, else `ETF` if in `OPT_ETF`, else `STOCK` | `category(symbol)` |
| Category share | `category_vol / total_vol` | `process_file` |
| Category cp | `category_call / category_put` | `process_file` |
| Market cp | `total_call / total_put` | `process_file` |
| Bucket totals | `market_call[bucket] + market_put[bucket]` | `process_file` |

`OPT_INDEX` = SPY QQQ IWM SPXW SPX VIX NDX RUT DIA
`OPT_ETF` = XLF XLE XLK XLB XLI XLP XLU XLV XLY XLRE GLD SLV TLT HYG LQD JNK EMB EEM EWZ FXI KWEB EWJ EWT EWY EWG EWH TQQQ SQQQ SPXU SPXL TNA TZA LABU LABD ARKK ARKG ARKF ARKW SMH XBI IBB XOP OIH KRE XHB ITB GDX GDXJ SIL IYR VNQ VXX UVXY SVXY USO UNG WEAT CORN IWF IWD IJH IJR MDY QID PSQ SH DOG BITO GBTC SOXL SOXS IBIT FBTC FXE FXY UUP BOIL KOLD YINN YANG FAS FAZ DRIP GUSH NUGT DUST JDST JNUG

Anything not in either set is `STOCK` (includes index proxies like SPXW, VIX, RUTW, NDXP that exist but are tracked separately when applicable).

## 4. Per-day payload — `public/data/days/{date}.json`

```jsonc
{
  "tradeDate": "2026-05-22",
  "generatedAt": "<ISO UTC>",
  "source": {
    "fileName": "options_minute_aggregates_2026-05-22.csv.gz",
    "path": "...iCloud full path...",
    "byteSize": 24147839,
    "modifiedAt": "<ISO UTC>"
  },
  "rowCount": 2922043,
  "validRows": 2922043,
  "invalidRows": 0,
  "overview": {
    "totalVol": <int>,
    "totalTxn": <int>,
    "totalCall": <int>,
    "totalPut": <int>,
    "marketCp": <float|null>,
    "category": {
      "INDEX": {"volume": <int>, "call": <int>, "put": <int>, "cpRatio": <float|null>},
      "ETF":   {"volume": <int>, "call": <int>, "put": <int>, "cpRatio": <float|null>},
      "STOCK": {"volume": <int>, "call": <int>, "put": <int>, "cpRatio": <float|null>}
    }
  },
  "buckets": {
    "labels": ["09:30", ..., "15:30"],
    "market": [{"time": "09:30", "call": <int>, "put": <int>, "total": <int>}, ...],
    "heatmap": [{"symbol": "SPY", "values": [<int>, ... 13 entries]}, ...]
  },
  "indexRows": [...SPY/QQQ/IWM with full per-symbol fields...],
  "etfRows":   [...top 10 ETFs...],
  "stockRows": [...top 25 single stocks...],
  "topUnderlyings": [...top 100 sorted by totalVol...],
  "digest": ["交易日 ...", "全市场 ...", "指数占 ...", ...]
}
```

Per-symbol entry fields: `symbol`, `category`, `totalVol`, `txn`, `callVol`, `putVol`, `leapCall`, `leapPut`, `cpRatio`, `leapRatio`, `avgSize`, `hottest`, `hottestShort`.

## 5. Manifest — `public/data/index.json`

```jsonc
{
  "generatedAt": "<ISO UTC>",
  "latestDate": "2026-05-22",
  "totalDates": 96,
  "dates": [
    {
      "date": "2026-05-22",
      "url": "/data/days/2026-05-22.json",
      "reportUrl": "/reports/2026-05-22.html",
      "sourceFile": "...",
      "sourceSize": <int>,
      "validRows": <int>,
      "totalVol": <int>,
      "marketCp": <float|null>,
      "topSymbols": ["SPY","QQQ","NVDA","TSLA","SPXW"],
      "rebuilt": <bool — true if rebuilt this run>
    },
    ...
  ],
  "sourceRoot": "<iCloud path>",
  "missingLocalMarketDays": ["2026-05-19", "2026-05-21"]
}
```

`missingLocalMarketDays` is the set of US trading days between `min(present)` and `max(present)` that are NOT yet downloaded locally (uses `US_MARKET_HOLIDAYS_2026` to skip holidays).

## 6. HTML rendering — `report_html(day, nav)`

Per-day report:
- Sticky `.toolbar` with `prev | date-dropdown | next` + `home / raw json / reload / lang-toggle`
- `<main class="report-body">` with sections: overview paragraph, three-index table, intraday bars, heatmap, ETF top10, stock top25
- All Chinese strings paired with `<span data-lang="en">…</span>` siblings; CSS toggles via `body[data-lang]`
- Lang preference persists in `localStorage["kzg-option-house-lang"]`
- `←` / `→` keyboard arrows navigate prev / next
- External CSS at `/styles/report.css` (Cache-Control max-age 7d, immutable)
- SEO: canonical `/r/{date}`, `og:type=article`, `theme-color` per color scheme

`render_reports_pass()` runs after all JSONs are processed; it walks all dates in `data/days/*.json` ascending, computes prev/next, and rewrites the HTML so any template change (or any newly-added day) ripples to neighbors without a separate rebuild step.

## 7. NYSE calendar & previous-trading-day resolution

`US_MARKET_HOLIDAYS_2026` (in both `build_options_site.py` and `daily_update.py`):

| Date | Holiday |
|---|---|
| 2026-01-01 | New Year's Day |
| 2026-01-19 | MLK Day |
| 2026-02-16 | Presidents' Day |
| 2026-04-03 | Good Friday |
| 2026-05-25 | Memorial Day |
| 2026-06-19 | Juneteenth |
| 2026-07-03 | Independence Day (observed) |
| 2026-09-07 | Labor Day |
| 2026-11-26 | Thanksgiving |
| 2026-12-25 | Christmas |

`is_market_day(day)` returns `day.weekday() < 5 AND day not in holidays`. Early-close days (Day-after-Thanksgiving, Christmas Eve) are NOT special-cased — Massive still ships a (partial) file and we process it like any other day.

`previous_market_day(today)` rewinds day-by-day until `is_market_day` is true.

## 8. Versioning

Schema major version: **1** (no explicit `schemaVersion` field yet; if breaking changes are introduced, add `"schemaVersion": 2` at the root of day payload and bump `data/index.json` consumers).

CSS palette currently amber/gold variant (`--accent: #9a6a12`). Change in `public/styles/report.css` is decoupled from the build script — recss only requires a redeploy.

## 9. Performance budget

- Source csv.gz: 20–35 MB each, ~2–4 M rows
- Process time per day: ~3–6 s (single Python process, streaming)
- HTML rerender pass (96 dates): ~1 s
- Deploy CDN diff: usually <5 s when only a handful of files changed
- Per-report HTML size: ~24–33 KB (was 65 KB before external CSS extraction)
