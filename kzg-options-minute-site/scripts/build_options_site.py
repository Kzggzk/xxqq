#!/usr/bin/env python3
from __future__ import annotations

import argparse
import csv
from collections import defaultdict
from dataclasses import dataclass
from datetime import date, datetime, timedelta, timezone
import gzip
import html
import json
import re
import shutil
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
DATA_DIR = PUBLIC / "data"
DAYS_DIR = DATA_DIR / "days"
REPORTS_DIR = PUBLIC / "reports"
KZG_OPTIONS_ROOT = Path(
    "/Users/fangbao/Library/Mobile Documents/com~apple~CloudDocs/KZG/23_DATA_Massive_期权分钟_Minute"
)

TICKER_RE = re.compile(r"^O:([A-Z0-9]+?)(\d{6})([CP])(\d{8})$")
DATE_RE = re.compile(r"options_minute_aggregates_(\d{4}-\d{2}-\d{2})\.csv\.gz$")
BUCKET_LABELS = [
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
]
BUCKET_MINUTES = [570, 600, 630, 660, 690, 720, 750, 780, 810, 840, 870, 900, 930]
BUCKET_INDEX = {minute: index for index, minute in enumerate(BUCKET_MINUTES)}

OPT_INDEX = {"SPY", "QQQ", "IWM", "SPXW", "SPX", "VIX", "NDX", "RUT", "DIA"}
OPT_ETF = {
    "XLF", "XLE", "XLK", "XLB", "XLI", "XLP", "XLU", "XLV", "XLY", "XLRE", "GLD", "SLV",
    "TLT", "HYG", "LQD", "JNK", "EMB", "EEM", "EWZ", "FXI", "KWEB", "EWJ", "EWT", "EWY",
    "EWG", "EWH", "TQQQ", "SQQQ", "SPXU", "SPXL", "TNA", "TZA", "LABU", "LABD", "ARKK",
    "ARKG", "ARKF", "ARKW", "SMH", "XBI", "IBB", "XOP", "OIH", "KRE", "XHB", "ITB",
    "GDX", "GDXJ", "SIL", "IYR", "VNQ", "VXX", "UVXY", "SVXY", "USO", "UNG", "WEAT",
    "CORN", "IWF", "IWD", "IJH", "IJR", "MDY", "QID", "PSQ", "SH", "DOG", "BITO",
    "GBTC", "SOXL", "SOXS", "IBIT", "FBTC", "FXE", "FXY", "UUP", "BOIL", "KOLD",
    "YINN", "YANG", "FAS", "FAZ", "DRIP", "GUSH", "NUGT", "DUST", "JDST", "JNUG",
}

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


@dataclass
class Agg:
    symbol: str
    category: str
    total_vol: int = 0
    txn: int = 0
    premium_notional: float = 0.0
    call_vol: int = 0
    put_vol: int = 0
    leap_call: int = 0
    leap_put: int = 0


def category(symbol: str) -> str:
    if symbol in OPT_INDEX:
        return "INDEX"
    if symbol in OPT_ETF:
        return "ETF"
    return "STOCK"


def fmt_wan(value: float) -> str:
    return f"{value / 10000:.1f}"


def fmt_ratio(value: float | None) -> str:
    return "-" if value is None else f"{value:.2f}"


def trade_date_from_path(path: Path) -> str:
    match = DATE_RE.search(path.name)
    if not match:
        raise ValueError(f"Cannot parse trade date from {path.name}")
    return match.group(1)


def file_list(since: str | None, until: str | None, limit: int | None) -> list[Path]:
    paths = sorted(KZG_OPTIONS_ROOT.glob("2026-*/options_minute_aggregates_2026-*.csv.gz"))
    if since:
        paths = [path for path in paths if trade_date_from_path(path) >= since]
    if until:
        paths = [path for path in paths if trade_date_from_path(path) <= until]
    if limit:
        paths = paths[-limit:]
    return paths


def et_offset_seconds(day: date) -> int:
    # US DST is enough for the 2026 YTD source set used here.
    dst_start = date(2026, 3, 8)
    dst_end = date(2026, 11, 1)
    return -4 * 3600 if dst_start <= day < dst_end else -5 * 3600


def coming_friday(day: date) -> date:
    return day + timedelta(days=(4 - day.weekday()) % 7)


def parse_number(value: str) -> int:
    if not value:
        return 0
    try:
        return int(float(value))
    except ValueError:
        return 0


def parse_float(value: str) -> float:
    if not value:
        return 0.0
    try:
        return float(value)
    except ValueError:
        return 0.0


def short_contract(ticker: str) -> str:
    match = TICKER_RE.match(ticker)
    if not match:
        return ticker
    expiry = match.group(2)
    cp = match.group(3)
    strike = int(match.group(4)) / 1000
    return f"{expiry[2:4]}{expiry[4:6]}.{cp}.{strike:g}"


def process_file(path: Path) -> dict[str, Any]:
    trade_date = trade_date_from_path(path)
    day = date.fromisoformat(trade_date)
    offset = et_offset_seconds(day)
    leap_threshold = coming_friday(day) + timedelta(days=84)

    aggs: dict[str, Agg] = {}
    bucket_by_symbol: dict[str, list[int]] = defaultdict(lambda: [0] * len(BUCKET_LABELS))
    market_call = [0] * len(BUCKET_LABELS)
    market_put = [0] * len(BUCKET_LABELS)
    hot_contracts: dict[str, dict[str, int]] = defaultdict(dict)

    row_count = 0
    valid_rows = 0
    invalid_rows = 0

    with gzip.open(path, "rt", newline="", encoding="utf-8") as handle:
        reader = csv.DictReader(handle)
        for row in reader:
            row_count += 1
            ticker = row.get("ticker", "")
            match = TICKER_RE.match(ticker)
            if not match:
                invalid_rows += 1
                continue

            symbol = match.group(1)
            expiry = match.group(2)
            cp = match.group(3)
            volume = parse_number(row.get("volume", "0"))
            tx = parse_number(row.get("transactions", "0"))
            close_price = parse_float(row.get("close", "0"))
            valid_rows += 1

            agg = aggs.get(symbol)
            if agg is None:
                agg = Agg(symbol=symbol, category=category(symbol))
                aggs[symbol] = agg
            agg.total_vol += volume
            agg.txn += tx
            agg.premium_notional += volume * close_price * 100
            if cp == "C":
                agg.call_vol += volume
            else:
                agg.put_vol += volume

            exp_date = date(2000 + int(expiry[:2]), int(expiry[2:4]), int(expiry[4:6]))
            if exp_date > leap_threshold:
                if cp == "C":
                    agg.leap_call += volume
                else:
                    agg.leap_put += volume

            hot = hot_contracts[symbol]
            hot[ticker] = hot.get(ticker, 0) + volume

            ns_raw = row.get("window_start", "")
            if ns_raw:
                try:
                    seconds_et = int(ns_raw) // 1_000_000_000 + offset
                    dt = datetime.fromtimestamp(seconds_et, tz=timezone.utc)
                    minute = dt.hour * 60 + (dt.minute // 30) * 30
                    bucket_index = BUCKET_INDEX.get(minute)
                except ValueError:
                    bucket_index = None
                if bucket_index is not None:
                    bucket_by_symbol[symbol][bucket_index] += volume
                    if cp == "C":
                        market_call[bucket_index] += volume
                    else:
                        market_put[bucket_index] += volume

    underlyings = []
    for agg in aggs.values():
        hot = hot_contracts.get(agg.symbol, {})
        hottest = max(hot.items(), key=lambda item: item[1])[0] if hot else ""
        underlyings.append(
            {
                "symbol": agg.symbol,
                "category": agg.category,
                "totalVol": agg.total_vol,
                "txn": agg.txn,
                "premiumNotional": round(agg.premium_notional, 2),
                "callVol": agg.call_vol,
                "putVol": agg.put_vol,
                "leapCall": agg.leap_call,
                "leapPut": agg.leap_put,
                "cpRatio": agg.call_vol / agg.put_vol if agg.put_vol else None,
                "leapRatio": agg.leap_call / agg.leap_put if agg.leap_put else None,
                "avgSize": round(agg.total_vol / agg.txn) if agg.txn else 0,
                "hottest": hottest,
                "hottestShort": short_contract(hottest),
            }
        )

    underlyings.sort(key=lambda item: item["totalVol"], reverse=True)
    top15 = underlyings[:15]

    total_vol = sum(item["totalVol"] for item in underlyings)
    total_txn = sum(item["txn"] for item in underlyings)
    total_premium = round(sum(item["premiumNotional"] for item in underlyings), 2)
    total_call = sum(item["callVol"] for item in underlyings)
    total_put = sum(item["putVol"] for item in underlyings)
    cat = {
        name: {"volume": 0, "premium": 0.0, "call": 0, "put": 0, "cpRatio": None}
        for name in ("INDEX", "ETF", "STOCK")
    }
    for item in underlyings:
        bucket = cat[item["category"]]
        bucket["volume"] += item["totalVol"]
        bucket["premium"] += item["premiumNotional"]
        bucket["call"] += item["callVol"]
        bucket["put"] += item["putVol"]
    for bucket in cat.values():
        bucket["premium"] = round(float(bucket["premium"]), 2)
    for bucket in cat.values():
        bucket["cpRatio"] = bucket["call"] / bucket["put"] if bucket["put"] else None

    market = []
    for index, label in enumerate(BUCKET_LABELS):
        market.append(
            {
                "time": label,
                "call": market_call[index],
                "put": market_put[index],
                "total": market_call[index] + market_put[index],
            }
        )

    heatmap = [
        {"symbol": item["symbol"], "values": bucket_by_symbol[item["symbol"]]}
        for item in top15
    ]

    index_rows = [item for item in underlyings if item["symbol"] in {"SPY", "QQQ", "IWM"}]
    etf_rows = [item for item in underlyings if item["category"] == "ETF"][:10]
    stock_rows = [item for item in underlyings if item["category"] == "STOCK"][:25]
    digest = build_digest(trade_date, total_vol, total_txn, total_call, total_put, cat, index_rows, etf_rows, stock_rows)

    day_payload = {
        "tradeDate": trade_date,
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "source": {
            "fileName": path.name,
            "path": str(path),
            "byteSize": path.stat().st_size,
            "modifiedAt": datetime.fromtimestamp(path.stat().st_mtime, tz=timezone.utc).isoformat(),
        },
        "rowCount": row_count,
        "validRows": valid_rows,
        "invalidRows": invalid_rows,
        "overview": {
            "totalVol": total_vol,
            "totalTxn": total_txn,
            "totalPremium": total_premium,
            "totalCall": total_call,
            "totalPut": total_put,
            "marketCp": total_call / total_put if total_put else None,
            "category": cat,
        },
        "buckets": {
            "labels": BUCKET_LABELS,
            "market": market,
            "heatmap": heatmap,
        },
        "indexRows": index_rows,
        "etfRows": etf_rows,
        "stockRows": stock_rows,
        "topUnderlyings": underlyings[:100],
        "digest": digest,
    }
    return day_payload


def build_digest(
    trade_date: str,
    total_vol: int,
    total_txn: int,
    total_call: int,
    total_put: int,
    cat: dict[str, dict[str, float | int | None]],
    index_rows: list[dict[str, Any]],
    etf_rows: list[dict[str, Any]],
    stock_rows: list[dict[str, Any]],
) -> list[str]:
    lines = [
        f"交易日 {trade_date}",
        f"全市场 {fmt_wan(total_vol)} 万张 · {fmt_wan(total_txn)} 万笔 · CP {fmt_ratio(total_call / total_put if total_put else None)}",
        (
            f"指数占 {cat['INDEX']['volume'] / total_vol * 100:.1f}% CP {fmt_ratio(cat['INDEX']['cpRatio'])} | "
            f"ETF {cat['ETF']['volume'] / total_vol * 100:.1f}% CP {fmt_ratio(cat['ETF']['cpRatio'])} | "
            f"个股 {cat['STOCK']['volume'] / total_vol * 100:.1f}% CP {fmt_ratio(cat['STOCK']['cpRatio'])}"
        )
        if total_vol
        else "暂无成交数据",
    ]
    if index_rows:
        lines.append("三大指数: " + " · ".join(f"{row['symbol']} {fmt_wan(row['totalVol'])}万 CP{fmt_ratio(row['cpRatio'])}" for row in index_rows))
    if etf_rows:
        lines.append("ETF 头部: " + " · ".join(f"{row['symbol']} {fmt_wan(row['totalVol'])}万" for row in etf_rows[:3]))
    if stock_rows:
        lines.append("个股头部: " + " · ".join(f"{row['symbol']} {fmt_wan(row['totalVol'])}万 CP{fmt_ratio(row['cpRatio'])}" for row in stock_rows[:5]))
    extreme = next((row for row in sorted(stock_rows, key=lambda item: item["cpRatio"] or 0, reverse=True) if row["totalVol"] > 100000), None)
    if extreme:
        lines.append(f"极端看多: {extreme['symbol']} CP {fmt_ratio(extreme['cpRatio'])} ({fmt_wan(extreme['totalVol'])}万张)")
    return lines


I18N_HEAD_OVERVIEW = ("美股期权市场概览", "US Options Market Overview")
I18N_HEAD_INDEX = ("三大指数期权数据", "Index Options (Top 3)")
I18N_HEAD_INTRADAY = ("全市场日内成交分布", "Intraday Volume Distribution")
I18N_HEAD_HEATMAP = ("日内成交分布 Top15", "Intraday Heatmap · Top 15")
I18N_HEAD_ETF = ("ETF 期权成交量 Top10", "ETF Options · Top 10")
I18N_HEAD_STOCK = ("个股期权成交量 Top25", "Single-Stock Options · Top 25")
I18N_BYLINE = ("口罩哥独家数据整理", "Curated by 口罩哥")
I18N_BRAND = ("KZG Option House", "KZG Option House")
I18N_UNIT_WAN = ("万张", "× 10k")


def i18n(zh: str, en: str) -> str:
    return (
        f'<span data-lang="zh">{html.escape(zh)}</span>'
        f'<span data-lang="en">{html.escape(en)}</span>'
    )


def overview_section(day: dict[str, Any]) -> str:
    ov = day["overview"]
    y, m, d = day["tradeDate"].split("-")
    date_zh = f"{int(y)}年{int(m)}月{int(d)}日"
    date_en = f"{day['tradeDate']}"
    idx_pct = percent(ov["category"]["INDEX"]["volume"], ov["totalVol"])
    etf_pct = percent(ov["category"]["ETF"]["volume"], ov["totalVol"])
    stock_pct = percent(ov["category"]["STOCK"]["volume"], ov["totalVol"])
    idx_cp = fmt_ratio(ov["category"]["INDEX"]["cpRatio"])
    etf_cp = fmt_ratio(ov["category"]["ETF"]["cpRatio"])
    stock_cp = fmt_ratio(ov["category"]["STOCK"]["cpRatio"])
    total_vol_w = fmt_wan(ov["totalVol"])
    total_txn_w = fmt_wan(ov["totalTxn"])
    market_cp = fmt_ratio(ov["marketCp"])

    head_zh = f"{date_zh}{I18N_HEAD_OVERVIEW[0]}"
    head_en = f"{date_en} · {I18N_HEAD_OVERVIEW[1]}"
    headline = (
        f'<div class="headline"><b>{i18n(head_zh, head_en)}</b>'
        f'<span class="meta">{i18n(I18N_BYLINE[0], I18N_BYLINE[1])}</span></div>'
    )

    para_zh = (
        f"全市场期权成交 <strong>{total_vol_w}</strong> 万张，共 <strong>{total_txn_w}</strong> 万笔，"
        f"整体 CP 比 <strong>{market_cp}</strong>。"
        f"指数期权占比 <strong>{idx_pct}</strong>，CP 比 <strong>{idx_cp}</strong>；"
        f"ETF 占比 <strong>{etf_pct}</strong>，CP 比 <strong>{etf_cp}</strong>；"
        f"个股占比 <strong>{stock_pct}</strong>，CP 比 <strong>{stock_cp}</strong>。"
    )
    para_en = (
        f"Total option volume <strong>{total_vol_w}</strong> × 10k contracts in "
        f"<strong>{total_txn_w}</strong> × 10k transactions, market CP "
        f"<strong>{market_cp}</strong>. "
        f"Index share <strong>{idx_pct}</strong> CP <strong>{idx_cp}</strong>; "
        f"ETF share <strong>{etf_pct}</strong> CP <strong>{etf_cp}</strong>; "
        f"Single-stock share <strong>{stock_pct}</strong> CP <strong>{stock_cp}</strong>."
    )
    para = f'<p data-lang="zh">{para_zh}</p><p data-lang="en">{para_en}</p>'
    src = html.escape(day["source"]["fileName"])
    footer_line = (
        f'<small>{I18N_BRAND[0]} · source {src}</small>'
    )
    return f'<section class="block">{headline}{para}{footer_line}</section>'


def report_meta_description(day: dict[str, Any]) -> str:
    ov = day["overview"]
    total_vol_w = fmt_wan(ov["totalVol"])
    market_cp = fmt_ratio(ov["marketCp"])
    return (
        f"{day['tradeDate']} US options market: total volume {total_vol_w}× 10k contracts, "
        f"market CP {market_cp}. Index/ETF/Stock breakdown, intraday distribution, "
        f"top tickers, LEAP ratios. KZG Option House."
    )


def report_toolbar(day: dict[str, Any], nav: dict[str, Any]) -> str:
    trade_date = day["tradeDate"]
    prev_date = nav.get("prev")
    next_date = nav.get("next")
    all_dates = nav.get("all_dates", [])

    prev_btn = (
        f'<a class="tbtn" href="/r/{prev_date}" rel="prev" aria-label="Previous: {prev_date}">'
        f'<span aria-hidden="true">◀</span>&nbsp;{prev_date}</a>'
        if prev_date
        else '<span class="tbtn" aria-disabled="true"><span aria-hidden="true">◀</span></span>'
    )
    next_btn = (
        f'<a class="tbtn" href="/r/{next_date}" rel="next" aria-label="Next: {next_date}">'
        f'{next_date}&nbsp;<span aria-hidden="true">▶</span></a>'
        if next_date
        else '<span class="tbtn" aria-disabled="true"><span aria-hidden="true">▶</span></span>'
    )

    date_jump = f'<span class="date-chip">{trade_date}</span>'

    home_btn = (
        '<a class="tbtn" href="/" aria-label="Home">'
        f'{i18n("回首页", "Home")}</a>'
    )
    raw_btn = (
        f'<a class="tbtn" href="/data/days/{trade_date}.json" aria-label="Raw JSON" target="_blank" rel="noopener">'
        f'{i18n("原始数据", "Raw JSON")}</a>'
    )
    regen_btn = (
        f'<button type="button" class="tbtn" id="regen-btn" aria-label="Reload">'
        f'{i18n("重载", "Reload")}</button>'
    )
    lang_btn = (
        f'<button type="button" class="tbtn primary" id="lang-toggle" '
        f'aria-label="Toggle language" aria-pressed="false">'
        f'<span data-lang="zh">EN</span><span data-lang="en">中文</span></button>'
    )

    title = i18n(f"{trade_date} 期权日报", f"{trade_date} Option Daily")

    return f"""<nav class="toolbar" aria-label="Report navigation">
  <div class="nav">{prev_btn}{date_jump}{next_btn}</div>
  <div class="title">{title}</div>
  <div class="actions">{home_btn}{raw_btn}{regen_btn}{lang_btn}</div>
</nav>"""


REPORT_INLINE_JS = """\
(function(){
  var KEY='kzg-option-house-lang';
  var stored=null;
  try{stored=localStorage.getItem(KEY);}catch(e){}
  if(stored==='en'||stored==='zh'){
    document.body.dataset.lang=stored;
    document.documentElement.lang=stored==='zh'?'zh-CN':'en';
  }
  var btn=document.getElementById('lang-toggle');
  if(btn){btn.addEventListener('click',function(){
    var cur=document.body.dataset.lang||'zh';
    var next=cur==='zh'?'en':'zh';
    document.body.dataset.lang=next;
    document.documentElement.lang=next==='zh'?'zh-CN':'en';
    btn.setAttribute('aria-pressed',next==='en'?'true':'false');
    try{localStorage.setItem(KEY,next);}catch(e){}
  });}
  var sel=document.getElementById('date-jump');
  if(sel){sel.addEventListener('change',function(e){
    var v=e.target.value;if(v)location.href='/r/'+v;
  });}
  var reg=document.getElementById('regen-btn');
  if(reg){reg.addEventListener('click',function(){
    location.href=location.pathname+'?ts='+Date.now();
  });}
  document.addEventListener('keydown',function(e){
    if(e.target&&(e.target.tagName==='INPUT'||e.target.tagName==='SELECT'||e.target.tagName==='TEXTAREA'))return;
    if(e.metaKey||e.ctrlKey||e.altKey)return;
    if(e.key==='ArrowLeft'){var p=document.querySelector('a[rel=prev]');if(p)location.href=p.href;}
    else if(e.key==='ArrowRight'){var n=document.querySelector('a[rel=next]');if(n)location.href=n.href;}
  });
})();
"""


def report_html(day: dict[str, Any], nav: dict[str, Any] | None = None) -> str:
    nav = nav or {"prev": None, "next": None, "all_dates": [day["tradeDate"]]}
    parts = [
        overview_section(day),
        table_section(I18N_HEAD_INDEX, day["indexRows"], compact_headers(), compact_rows),
        bars_section(day),
        heatmap_section(day),
        table_section(I18N_HEAD_ETF, day["etfRows"], detail_headers(), detail_rows),
        table_section(I18N_HEAD_STOCK, day["stockRows"], detail_headers(), detail_rows),
    ]
    body = "\n".join(parts)
    meta_desc = html.escape(report_meta_description(day))
    canonical = f"/r/{day['tradeDate']}"
    title_zh = f"{I18N_BRAND[0]} · {day['tradeDate']}"
    title_en = title_zh
    toolbar = report_toolbar(day, nav)
    foot = (
        f'<div class="foot">'
        f'{i18n(I18N_BYLINE[0], I18N_BYLINE[1])} · {I18N_BRAND[0]} · {day["tradeDate"]}'
        f'</div>'
    )
    return f"""<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#1f4f80" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#0e1216" media="(prefers-color-scheme: dark)">
<meta name="description" content="{meta_desc}">
<meta property="og:type" content="article">
<meta property="og:title" content="{title_zh}">
<meta property="og:description" content="{meta_desc}">
<meta property="og:url" content="{canonical}">
<meta name="twitter:card" content="summary">
<link rel="canonical" href="{canonical}">
<link rel="stylesheet" href="/styles/report.css">
<title>{title_zh}</title>
</head>
<body data-lang="zh">{toolbar}<main class="report-body">{body}{foot}</main>
<script>{REPORT_INLINE_JS}</script>
</body></html>
"""


def percent(part: float, total: float) -> str:
    if not total:
        return "-"
    return f"{part / total * 100:.1f}%"


def _render_header_cell(name: str | tuple[str, str], index: int) -> str:
    cls = ' class="num"' if index >= 2 else ""
    if isinstance(name, tuple):
        return f"<th{cls}>{i18n(name[0], name[1])}</th>"
    return f"<th{cls}>{html.escape(name)}</th>"


def table_section(
    title: str | tuple[str, str],
    rows: list[dict[str, Any]],
    headers: list,
    row_fn,
) -> str:
    head = "".join(_render_header_cell(name, idx) for idx, name in enumerate(headers))
    body = "".join(row_fn(row, idx) for idx, row in enumerate(rows))
    empty = i18n("无数据", "No data")
    if not body:
        body = f'<tr><td colspan="{len(headers)}" class="muted">{empty}</td></tr>'
    if isinstance(title, tuple):
        title_html = f"<b>{i18n(title[0], title[1])}</b>"
    else:
        title_html = f"<b>{html.escape(title)}</b>"
    meta_html = f'<span class="meta">{I18N_BRAND[0]}</span>'
    return (
        f'<section class="block">'
        f'<div class="headline">{title_html}{meta_html}</div>'
        f'<table><thead><tr>{head}</tr></thead>'
        f'<tbody>{body}</tbody></table></section>'
    )


def compact_headers() -> list:
    return [
        "#",
        ("代码", "Symbol"),
        ("成交量(万张)", "Vol (× 10k)"),
        ("CP 比", "CP Ratio"),
    ]


def detail_headers() -> list:
    return [
        "#",
        ("代码", "Symbol"),
        ("成交量", "Vol"),
        ("CP 比", "CP"),
        ("LEAP*", "LEAP*"),
        ("均笔", "Avg/Txn"),
        ("最热合约", "Top Contract"),
    ]


def compact_rows(row: dict[str, Any], index: int) -> str:
    cp = fmt_ratio(row["cpRatio"])
    return f"<tr><td>{index + 1}</td><td>{html.escape(row['symbol'])}</td><td class=\"num\">{fmt_wan(row['totalVol'])}</td><td class=\"num {heat_class(row['cpRatio'])}\">{cp}</td></tr>"


def detail_rows(row: dict[str, Any], index: int) -> str:
    return (
        f"<tr><td>{index + 1}</td><td>{html.escape(row['symbol'])}</td>"
        f"<td class=\"num\">{fmt_wan(row['totalVol'])}</td>"
        f"<td class=\"num {heat_class(row['cpRatio'])}\">{fmt_ratio(row['cpRatio'])}</td>"
        f"<td class=\"num {heat_class(row['leapRatio'])}\">{fmt_ratio(row['leapRatio'])}</td>"
        f"<td class=\"num\">{row['avgSize']}</td>"
        f"<td class=\"num muted\">{html.escape(row['hottestShort'])}</td></tr>"
    )


def heat_class(value: float | None) -> str:
    if value is None:
        return ""
    if value >= 5:
        return "veryhot"
    if value >= 1.2:
        return "hot"
    return ""


def bars_section(day: dict[str, Any]) -> str:
    rows = day["buckets"]["market"]
    max_total = max((row["total"] for row in rows), default=1) or 1
    bars = "".join(
        f'<div class="bar"><span>{fmt_wan(row["total"])}</span>'
        f'<i style="height:{max(2, row["total"] / max_total * 100):.1f}%"></i></div>'
        for row in rows
    )
    axis = "".join(f"<span>{row['time']}</span>" for row in rows)
    title = f"<b>{i18n(I18N_HEAD_INTRADAY[0], I18N_HEAD_INTRADAY[1])}</b>"
    meta = f'<span class="meta">{i18n(I18N_UNIT_WAN[0], I18N_UNIT_WAN[1])}</span>'
    return (
        f'<section class="block"><div class="headline">{title}{meta}</div>'
        f'<div class="barrow">{bars}</div>'
        f'<div class="axis">{axis}</div></section>'
    )


def heatmap_section(day: dict[str, Any]) -> str:
    heat = day["buckets"]["heatmap"]
    labels = day["buckets"]["labels"]
    all_values = [value for row in heat for value in row["values"]]
    max_value = max(all_values, default=1) or 1
    sym_header = i18n("标的", "Symbol")
    head = f'<th class="sym">{sym_header}</th>' + "".join(f"<th>{label}</th>" for label in labels)
    body = []
    for row in heat:
        cells = [f'<td class="sym">{html.escape(row["symbol"])}</td>']
        for value in row["values"]:
            if value <= 0:
                cells.append('<td class="muted">-</td>')
            else:
                level = value / max_value
                bg = blend((240, 243, 246), (20, 56, 102), level)
                color = "#ffffff" if level > 0.55 else "#15171a"
                cells.append(
                    f'<td style="background:{bg};color:{color}">{fmt_wan(value)}</td>'
                )
        body.append("<tr>" + "".join(cells) + "</tr>")
    title = f"<b>{i18n(I18N_HEAD_HEATMAP[0], I18N_HEAD_HEATMAP[1])}</b>"
    meta = f'<span class="meta">{i18n(I18N_UNIT_WAN[0], I18N_UNIT_WAN[1])}</span>'
    return (
        f'<section class="block"><div class="headline">{title}{meta}</div>'
        f'<table class="heat"><thead><tr>{head}</tr></thead>'
        f"<tbody>{''.join(body)}</tbody></table></section>"
    )


def blend(a: tuple[int, int, int], b: tuple[int, int, int], t: float) -> str:
    c = max(0.0, min(1.0, t))
    rgb = [round(a[i] + (b[i] - a[i]) * c) for i in range(3)]
    return f"rgb({rgb[0]},{rgb[1]},{rgb[2]})"


def write_day(day: dict[str, Any]) -> None:
    DAYS_DIR.mkdir(parents=True, exist_ok=True)
    trade_date = day["tradeDate"]
    (DAYS_DIR / f"{trade_date}.json").write_text(
        json.dumps(day, ensure_ascii=False, separators=(",", ":")),
        encoding="utf-8",
    )


def render_reports_pass() -> list[str]:
    REPORTS_DIR.mkdir(parents=True, exist_ok=True)
    paths = sorted(DAYS_DIR.glob("2026-*.json"))
    dates_asc = [path.stem for path in paths]
    dates_desc = list(reversed(dates_asc))
    rendered: list[str] = []
    for index, trade_date in enumerate(dates_asc):
        prev_date = dates_asc[index - 1] if index > 0 else None
        next_date = dates_asc[index + 1] if index + 1 < len(dates_asc) else None
        nav = {"prev": prev_date, "next": next_date, "all_dates": dates_desc}
        day_payload = json.loads(
            (DAYS_DIR / f"{trade_date}.json").read_text(encoding="utf-8")
        )
        html_text = report_html(day_payload, nav)
        (REPORTS_DIR / f"{trade_date}.html").write_text(html_text, encoding="utf-8")
        rendered.append(trade_date)
    if rendered:
        latest = rendered[-1]
        shutil.copy2(REPORTS_DIR / f"{latest}.html", REPORTS_DIR / "latest.html")
    return rendered


def is_market_day(day: date) -> bool:
    return day.weekday() < 5 and day not in US_MARKET_HOLIDAYS_2026


def missing_market_days(paths: list[Path]) -> list[str]:
    if not paths:
        return []
    present = {date.fromisoformat(trade_date_from_path(path)) for path in paths}
    start = min(present)
    end = max(present)
    missing = []
    day = start
    while day <= end:
        if is_market_day(day) and day not in present:
            missing.append(day.isoformat())
        day += timedelta(days=1)
    return missing


def write_index(paths: list[Path], processed_dates: set[str]) -> None:
    existing_dates = []
    for path in sorted(DAYS_DIR.glob("2026-*.json")):
        existing_dates.append(path.stem)
    existing_dates = sorted(set(existing_dates), reverse=True)
    entries = []
    for trade_date in existing_dates:
        day = json.loads((DAYS_DIR / f"{trade_date}.json").read_text(encoding="utf-8"))
        entries.append(
            {
                "date": trade_date,
                "url": f"/data/days/{trade_date}.json",
                "reportUrl": f"/reports/{trade_date}.html",
                "sourceFile": day["source"]["fileName"],
                "sourceSize": day["source"]["byteSize"],
                "validRows": day["validRows"],
                "totalVol": day["overview"]["totalVol"],
                "totalPremium": day["overview"].get("totalPremium", 0),
                "marketCp": day["overview"]["marketCp"],
                "topSymbols": [row["symbol"] for row in day["topUnderlyings"][:5]],
                "rebuilt": trade_date in processed_dates,
            }
        )

    latest = existing_dates[0] if existing_dates else None
    payload = {
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "latestDate": latest,
        "totalDates": len(existing_dates),
        "dates": entries,
        "sourceRoot": str(KZG_OPTIONS_ROOT),
        "missingLocalMarketDays": missing_market_days(paths),
    }
    (DATA_DIR / "index.json").write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    if latest:
        shutil.copy2(DAYS_DIR / f"{latest}.json", DATA_DIR / "latest.json")


def main() -> int:
    parser = argparse.ArgumentParser(description="Build KZG Option House static data from Massive options minute files.")
    parser.add_argument("--since", default="2026-01-01")
    parser.add_argument("--until")
    parser.add_argument("--limit", type=int)
    parser.add_argument("--force", action="store_true")
    parser.add_argument("--date", help="Build one trade date only.")
    args = parser.parse_args()

    if args.date:
        target = KZG_OPTIONS_ROOT / args.date[:7] / f"options_minute_aggregates_{args.date}.csv.gz"
        paths = [target] if target.exists() else []
    else:
        paths = file_list(args.since, args.until, args.limit)

    if not paths:
        raise SystemExit("No source files found.")

    processed: set[str] = set()
    for index, path in enumerate(paths, start=1):
        trade_date = trade_date_from_path(path)
        output = DAYS_DIR / f"{trade_date}.json"
        if output.exists() and not args.force:
            print(json.dumps({"skip": trade_date, "reason": "exists", "index": index, "total": len(paths)}), flush=True)
            continue
        print(json.dumps({"process": trade_date, "file": str(path), "index": index, "total": len(paths)}), flush=True)
        day = process_file(path)
        write_day(day)
        processed.add(trade_date)
        print(json.dumps({"done": trade_date, "validRows": day["validRows"], "totalVol": day["overview"]["totalVol"]}), flush=True)

    rendered = render_reports_pass()
    write_index(file_list(args.since, args.until, args.limit), processed)
    latest = json.loads((DATA_DIR / "index.json").read_text(encoding="utf-8"))["latestDate"]
    print(
        json.dumps(
            {
                "site_index": str(DATA_DIR / "index.json"),
                "latestDate": latest,
                "rebuilt": sorted(processed),
                "htmlRendered": len(rendered),
            }
        ),
        flush=True,
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
