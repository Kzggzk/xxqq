const state = {
  index: null,
  datesAsc: [],
  dayCache: new Map(),
  day: null,
  selectedIndex: 0,
  query: "",
  requestToken: 0,
  lang: localStorage.getItem("kzg-option-house-lang") || "zh",
  theme: localStorage.getItem("kzg-option-house-theme") || "light",
};

const $ = (id) => document.getElementById(id);
const fmt0 = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });
const fmt1 = new Intl.NumberFormat("en-US", { maximumFractionDigits: 1, minimumFractionDigits: 1 });
const fmt2 = new Intl.NumberFormat("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 2 });

const copy = {
  zh: {
    today: "回到今天",
    themeLight: "亮色",
    themeDark: "暗色",
    language: "EN",
    export: "导出 PNG",
    exporting: "生成中",
    timeline: "交易日时间轴",
    selected: "已选交易日",
    available: "有数据",
    missing: "无交易/未落地",
    reportCanvas: "日报画布",
    reportCanvasSub: "网页可以操作，PNG 输出使用 KZG 老日报表格格式。",
    digest: "盘口摘要",
    digestSub: "按当前交易日同步刷新。",
    filter: "筛选标的",
    stockTop: "个股 Top25",
    volumeRank: "成交量排序",
    heatmap: "分钟聚合成交热力图",
    heatmapSub: "Top15 标的，单位万张。",
    buckets: "日内成交分布",
    bucketsSub: "全市场 30 分钟桶。",
    trend: "成交额走势",
    trendSub: "最近 30 个交易日，热/冷由成交变化决定。",
    totalVolume: "总期权成交量",
    premium: "权利金成交额",
    marketCp: "Put/Call 成交量",
    index: "指数",
    etf: "ETF",
    stock: "个股",
    version: "数据版本",
    validRows: "有效行",
    currentDay: "当前交易日",
    kzgByline: "口罩哥独家数据整理",
    kzgPlanet: "口罩哥星球",
  },
  en: {
    today: "Today",
    themeLight: "Light",
    themeDark: "Dark",
    language: "中文",
    export: "Export PNG",
    exporting: "Rendering",
    timeline: "Trading Timeline",
    selected: "Selected",
    available: "Data landed",
    missing: "No local data",
    reportCanvas: "Daily Sheet",
    reportCanvasSub: "The page stays interactive; PNG uses the original KZG table sheet.",
    digest: "Market Digest",
    digestSub: "Refreshes with the selected trading day.",
    filter: "Symbol filter",
    stockTop: "Stock Top 25",
    volumeRank: "Sorted by volume",
    heatmap: "Minute Heatmap",
    heatmapSub: "Top 15 underlyings, unit: x10k contracts.",
    buckets: "Intraday Distribution",
    bucketsSub: "Market-wide 30-minute buckets.",
    trend: "Turnover Trend",
    trendSub: "Last 30 trading days; hot/cold follows volume change.",
    totalVolume: "Total Option Volume",
    premium: "Premium Notional",
    marketCp: "Call / Put Volume",
    index: "Index",
    etf: "ETF",
    stock: "Single Stock",
    version: "Data Version",
    validRows: "valid rows",
    currentDay: "Current Day",
    kzgByline: "Curated by 口罩哥",
    kzgPlanet: "KZG Inner Circle",
  },
};

function t(key) {
  return copy[state.lang]?.[key] || copy.zh[key] || key;
}

function wan(value, suffix = true) {
  const text = fmt1.format((Number(value) || 0) / 10000);
  if (!suffix) return text;
  return state.lang === "zh" ? `${text}万` : `${text} x10k`;
}

function ratio(value) {
  return value === null || value === undefined ? "--" : fmt2.format(Number(value));
}

function pct(part, total) {
  if (!total) return "--";
  return `${fmt1.format((Number(part) / Number(total)) * 100)}%`;
}

function moneyCompact(value) {
  const n = Number(value) || 0;
  if (n >= 1e9) return `$${fmt1.format(n / 1e9)}B`;
  if (n >= 1e6) return `$${fmt1.format(n / 1e6)}M`;
  if (n >= 1e3) return `$${fmt1.format(n / 1e3)}K`;
  return `$${fmt0.format(n)}`;
}

function toneClass(value, high = 0, low = 0) {
  const n = Number(value);
  if (!Number.isFinite(n)) return "";
  if (high && n >= high) return "tone-high";
  if (low && n <= low) return "tone-low";
  return "";
}

function dateCN(value) {
  const [year, month, day] = value.split("-").map(Number);
  return `${year}年${month}月${day}日`;
}

function weekdayCN(value) {
  return new Date(`${value}T12:00:00Z`).toLocaleDateString("zh-CN", {
    weekday: "long",
    timeZone: "UTC",
  });
}

function displayDate(value) {
  if (state.lang === "zh") return `${dateCN(value)} ${weekdayCN(value)}`;
  return new Date(`${value}T12:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    weekday: "short",
    timeZone: "UTC",
  });
}

function shortDate(value) {
  const [, month, day] = value.split("-");
  return `${month}/${day}`;
}

function installGuards() {
  const allowText = (target) => target?.closest?.("input, textarea, [contenteditable='true']");
  document.addEventListener("contextmenu", (event) => {
    if (!allowText(event.target)) event.preventDefault();
  }, { capture: true });
  document.addEventListener("dragstart", (event) => event.preventDefault(), { capture: true });
  document.addEventListener("selectstart", (event) => {
    if (!allowText(event.target)) event.preventDefault();
  }, { capture: true });
  document.addEventListener("copy", (event) => {
    if (!allowText(event.target)) event.preventDefault();
  }, { capture: true });
  document.addEventListener("keydown", (event) => {
    if (allowText(event.target)) return;
    const key = event.key.toLowerCase();
    const blocked =
      ((event.metaKey || event.ctrlKey) && ["u", "s", "c", "p", "x"].includes(key)) ||
      ((event.metaKey || event.ctrlKey) && event.shiftKey && ["i", "j", "c"].includes(key));
    if (blocked) event.preventDefault();
  }, { capture: true });
}

async function decodePack(encoded) {
  const bytes = Uint8Array.from(atob(encoded), (char) => char.charCodeAt(0));
  if (!("DecompressionStream" in window)) {
    throw new Error("Current browser cannot read the KZG packed payload.");
  }
  const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream("gzip"));
  return JSON.parse(await new Response(stream).text());
}

async function loadPackedData() {
  if (window.__KZG_PACK__) {
    return decodePack(window.__KZG_PACK__);
  }
  if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
    const indexResponse = await fetch(`/data/index.json?ts=${Date.now()}`);
    if (!indexResponse.ok) throw new Error(`index ${indexResponse.status}`);
    const index = await indexResponse.json();
    const days = {};
    for (const item of index.dates) {
      const response = await fetch(`/data/days/${item.date}.json?ts=${Date.now()}`);
      if (response.ok) days[item.date] = await response.json();
    }
    return { index, days };
  }
  throw new Error("KZG packed payload is missing.");
}

async function loadIndex() {
  installGuards();
  applyUiState();
  const payload = await loadPackedData();
  state.index = payload.index;
  state.dayCache = new Map(Object.entries(payload.days || {}));
  state.datesAsc = [...state.index.dates].reverse();
  if (!state.datesAsc.length) throw new Error("No trading days found.");

  $("timelineEnd").textContent = state.index.latestDate.replaceAll("-", "/");
  $("symbolSearch").addEventListener("input", (event) => {
    state.query = event.target.value.trim().toUpperCase();
    renderStockTable();
  });
  $("prevDay").addEventListener("click", () => loadDayByIndex(state.selectedIndex - 1));
  $("nextDay").addEventListener("click", () => loadDayByIndex(state.selectedIndex + 1));
  $("timelineRange").addEventListener("input", (event) => loadDayByIndex(Number(event.target.value)));
  $("goToday").addEventListener("click", () => loadDayByIndex(state.datesAsc.length - 1));
  $("themeToggle").addEventListener("click", toggleTheme);
  $("langToggle").addEventListener("click", toggleLang);

  renderTimelineShell();
  await loadDayByIndex(state.datesAsc.length - 1);
}

function applyUiState() {
  document.body.dataset.lang = state.lang;
  document.body.dataset.theme = state.theme;
  document.documentElement.lang = state.lang === "zh" ? "zh-CN" : "en";
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.dataset.i18n;
    if (key === "theme") node.textContent = state.theme === "dark" ? t("themeLight") : t("themeDark");
    else node.textContent = t(key);
  });
}

function toggleTheme() {
  state.theme = state.theme === "dark" ? "light" : "dark";
  localStorage.setItem("kzg-option-house-theme", state.theme);
  applyUiState();
}

function toggleLang() {
  state.lang = state.lang === "zh" ? "en" : "zh";
  localStorage.setItem("kzg-option-house-lang", state.lang);
  applyUiState();
  if (state.day) renderDay();
}

function renderTimelineShell() {
  const range = $("timelineRange");
  range.min = "0";
  range.max = String(Math.max(0, state.datesAsc.length - 1));

  const monthGroups = [];
  for (const item of state.datesAsc) {
    const month = item.date.slice(0, 7);
    const last = monthGroups[monthGroups.length - 1];
    if (last && last.month === month) last.count += 1;
    else monthGroups.push({ month, count: 1 });
  }
  const monthTicks = $("monthTicks");
  monthTicks.style.gridTemplateColumns = monthGroups.map((group) => `${group.count}fr`).join(" ");
  monthTicks.innerHTML = monthGroups.map((group) => {
    const [, month] = group.month.split("-");
    return `<span>${state.lang === "zh" ? `2026年${Number(month)}月` : `2026/${month}`}</span>`;
  }).join("");

  const maxVol = Math.max(...state.datesAsc.map((item) => Number(item.totalVol) || 0), 1);
  const dayBars = $("dayBars");
  dayBars.style.gridTemplateColumns = `repeat(${state.datesAsc.length}, minmax(1px, 1fr))`;
  dayBars.innerHTML = state.datesAsc.map((item, index) => {
    const height = 6 + ((Number(item.totalVol) || 0) / maxVol) * 30;
    return `<button type="button" data-index="${index}" style="--h:${height.toFixed(1)}px" title="${item.date} · ${wan(item.totalVol)}"></button>`;
  }).join("");
  dayBars.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-index]");
    if (button) loadDayByIndex(Number(button.dataset.index));
  });
}

async function loadDayByIndex(index) {
  const clamped = Math.max(0, Math.min(state.datesAsc.length - 1, index));
  const date = state.datesAsc[clamped].date;
  state.selectedIndex = clamped;
  updateTimelineSelection();

  const token = ++state.requestToken;
  const day = state.dayCache.get(date);
  if (!day) throw new Error(`Missing packed day ${date}`);
  if (token !== state.requestToken) return;
  state.day = day;
  renderDay();
}

function updateTimelineSelection() {
  const max = Math.max(1, state.datesAsc.length - 1);
  const progress = (state.selectedIndex / max) * 100;
  $("timelineRange").value = String(state.selectedIndex);
  $("timelineRange").style.setProperty("--progress", `${progress}%`);
  document.querySelector(".timeline-wrap").style.setProperty("--progress", `${progress}%`);
  $("selectedDateLabel").textContent = state.datesAsc[state.selectedIndex]?.date ?? "--";
  $("prevDay").disabled = state.selectedIndex <= 0;
  $("nextDay").disabled = state.selectedIndex >= state.datesAsc.length - 1;
  document.querySelectorAll("#dayBars button").forEach((button, index) => {
    button.classList.toggle("active", index === state.selectedIndex);
  });
}

function renderDay() {
  const day = state.day;
  const ov = day.overview;
  const item = state.datesAsc[state.selectedIndex];
  const prev = state.datesAsc[state.selectedIndex - 1];
  const delta = prev && Number(prev.totalVol) ? ((Number(item.totalVol) - Number(prev.totalVol)) / Number(prev.totalVol)) * 100 : null;

  applyUiState();
  $("headerDate").textContent = displayDate(day.tradeDate);
  $("generatedAt").textContent = `${state.lang === "zh" ? "生成" : "generated"} ${new Date(day.generatedAt).toLocaleString(state.lang === "zh" ? "zh-CN" : "en-US", { hour12: false })}`;
  $("tradeDate").textContent = day.tradeDate;
  $("totalVol").textContent = wan(ov.totalVol);
  $("totalPremium").textContent = moneyCompact(ov.totalPremium);
  $("marketCp").textContent = ratio(ov.marketCp);
  $("rowCount").textContent = fmt0.format(day.validRows);
  $("sourceStatus").textContent = `${fmt0.format(day.validRows)} ${t("validRows")}`;
  $("sourcePath").textContent = "KZG packed";
  $("totalPremiumLabel").textContent = t("premium");

  const deltaText = delta === null ? (state.lang === "zh" ? "首个本地交易日" : "first local day") : `${state.lang === "zh" ? "较前日" : "vs prev"} ${delta >= 0 ? "+" : ""}${fmt1.format(delta)}%`;
  $("volDelta").textContent = deltaText;
  $("volDelta").className = delta === null ? "" : delta >= 0 ? "tone-high" : "tone-low";

  $("indexShare").textContent = pct(ov.category.INDEX.volume, ov.totalVol);
  $("indexCp").textContent = `CP ${ratio(ov.category.INDEX.cpRatio)} · ${moneyCompact(ov.category.INDEX.premium)}`;
  $("etfShare").textContent = pct(ov.category.ETF.volume, ov.totalVol);
  $("etfCp").textContent = `CP ${ratio(ov.category.ETF.cpRatio)} · ${moneyCompact(ov.category.ETF.premium)}`;
  $("stockShare").textContent = pct(ov.category.STOCK.volume, ov.totalVol);
  $("stockCp").textContent = `CP ${ratio(ov.category.STOCK.cpRatio)} · ${moneyCompact(ov.category.STOCK.premium)}`;

  $("downloadReport").onclick = () => exportReportPng(day.tradeDate);
  renderDigest();
  renderReportCanvas();
  renderBuckets();
  renderHeatmap();
  renderTrend();
  renderStockTable();
  renderStaticCopy();
}

function renderStaticCopy() {
  document.querySelector(".timeboard-copy h2").textContent = t("timeline");
  document.querySelector(".section-head h2").textContent = t("reportCanvas");
  document.querySelector(".section-head p").textContent = t("reportCanvasSub");
  $("trendTitle").textContent = t("trend");
  $("trendSub").textContent = t("trendSub");
  document.querySelector(".side-rail .section-head h2").textContent = t("digest");
  document.querySelector(".side-rail .section-head p").textContent = t("digestSub");
  document.querySelector(".search-wrap span").textContent = t("filter");
  document.querySelector(".mini-head b").textContent = t("stockTop");
  document.querySelector(".mini-head span").textContent = t("volumeRank");
  const heads = document.querySelectorAll(".analysis-grid .panel .section-head h2");
  const subs = document.querySelectorAll(".analysis-grid .panel .section-head p");
  if (heads[1]) heads[1].textContent = t("heatmap");
  if (subs[1]) subs[1].textContent = t("heatmapSub");
  if (heads[2]) heads[2].textContent = t("buckets");
  if (subs[2]) subs[2].textContent = t("bucketsSub");
}

function renderDigest() {
  $("digest").innerHTML = state.day.digest.map((line) => `<div>${escapeHtml(line)}</div>`).join("");
}

function renderBuckets() {
  const rows = state.day.buckets.market;
  const max = Math.max(...rows.map((row) => row.total), 1);
  $("bucketBars").innerHTML = rows.map((row) => {
    const height = Math.max(2, (row.total / max) * 100);
    return `
      <div class="bar">
        <div class="bar-track"><div class="bar-fill" style="height:${height.toFixed(2)}%"></div></div>
        <strong>${wan(row.total)}</strong>
        <span>${row.time}</span>
      </div>
    `;
  }).join("");
}

function renderHeatmap() {
  const heat = state.day.buckets.heatmap;
  const labels = state.day.buckets.labels;
  const values = heat.flatMap((row) => row.values);
  const max = Math.max(...values, 1);
  let html = `<div class="heat-table"><div class="heat-cell head">${state.lang === "zh" ? "标的" : "Symbol"}</div>`;
  html += labels.map((label) => `<div class="heat-cell head">${label}</div>`).join("");
  for (const row of heat) {
    html += `<div class="heat-cell symbol">${row.symbol}</div>`;
    html += row.values.map((value) => {
      if (!value) return `<div class="heat-cell" style="background:#f4f1e9;color:#817b70">-</div>`;
      const level = value / max;
      const bg = blueHeat(level);
      const fg = level > 0.56 ? "#fff" : "#28323b";
      return `<div class="heat-cell" style="background:${bg};color:${fg}">${fmt1.format(value / 10000)}</div>`;
    }).join("");
  }
  html += "</div>";
  $("heatmap").innerHTML = html;
}

function renderTrend() {
  const end = state.selectedIndex;
  const rows = state.datesAsc.slice(Math.max(0, end - 29), end + 1);
  if (!rows.length) {
    $("trendChart").innerHTML = "";
    return;
  }
  const width = 760;
  const height = 214;
  const pad = 28;
  const maxVol = Math.max(...rows.map((row) => Number(row.totalVol) || 0), 1);
  const minVol = Math.min(...rows.map((row) => Number(row.totalVol) || 0), maxVol);
  const span = Math.max(1, maxVol - minVol);
  const points = rows.map((row, index) => {
    const x = pad + (index / Math.max(1, rows.length - 1)) * (width - pad * 2);
    const y = height - pad - (((Number(row.totalVol) || 0) - minVol) / span) * (height - pad * 2);
    return { x, y, row };
  });
  const line = points.map((point) => `${point.x.toFixed(1)},${point.y.toFixed(1)}`).join(" ");
  const area = `${pad},${height - pad} ${line} ${width - pad},${height - pad}`;
  const prev = rows[rows.length - 2];
  const latest = rows[rows.length - 1];
  const change = prev ? ((latest.totalVol - prev.totalVol) / prev.totalVol) * 100 : 0;
  const tone = change >= 0 ? "trend-hot" : "trend-cool";

  $("trendChart").innerHTML = `
    <div class="trend-summary ${tone}">
      <strong>${wan(latest.totalVol)}</strong>
      <span>${shortDate(rows[0].date)} - ${shortDate(latest.date)} · ${change >= 0 ? "+" : ""}${fmt1.format(change)}%</span>
    </div>
    <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${t("trend")}">
      <defs>
        <linearGradient id="trendFill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stop-color="${change >= 0 ? "#d96a4a" : "#2f6190"}" stop-opacity=".28"/>
          <stop offset="1" stop-color="${change >= 0 ? "#d96a4a" : "#2f6190"}" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <polygon points="${area}" fill="url(#trendFill)"></polygon>
      <polyline points="${line}" fill="none" stroke="${change >= 0 ? "#c45335" : "#2f6190"}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"></polyline>
      ${points.map((point, index) => index % 5 === 0 || index === points.length - 1 ? `<text x="${point.x.toFixed(1)}" y="${height - 6}" text-anchor="middle">${shortDate(point.row.date)}</text>` : "").join("")}
    </svg>
  `;
}

function renderStockTable() {
  if (!state.day) return;
  const rows = state.day.stockRows.filter((row) => {
    if (!state.query) return true;
    return row.symbol.includes(state.query) || row.hottest.includes(state.query);
  });
  renderTable($("stockTable"), rows.slice(0, 25));
}

function renderTable(target, rows) {
  const head = `
    <thead>
      <tr>
        <th>Rank</th>
        <th>Symbol</th>
        <th class="right">${state.lang === "zh" ? "成交量" : "Vol"}</th>
        <th class="right">CP</th>
        <th class="right">${state.lang === "zh" ? "权利金" : "Premium"}</th>
        <th class="right">${state.lang === "zh" ? "最热合约" : "Top"}</th>
      </tr>
    </thead>
  `;
  if (!rows.length) {
    target.innerHTML = `${head}<tbody><tr><td colspan="6" class="empty">No rows</td></tr></tbody>`;
    return;
  }
  const body = rows.map((row, index) => `
    <tr>
      <td>${index + 1}</td>
      <td class="symbol">${escapeHtml(row.symbol)}</td>
      <td class="right">${wan(row.totalVol)}</td>
      <td class="right ${toneClass(row.cpRatio, 2, 0.6)}">${ratio(row.cpRatio)}</td>
      <td class="right">${moneyCompact(row.premiumNotional)}</td>
      <td class="right">${escapeHtml(row.hottestShort)}</td>
    </tr>
  `).join("");
  target.innerHTML = `${head}<tbody>${body}</tbody>`;
}

function renderReportCanvas() {
  const day = state.day;
  const indexRows = orderRows(day.indexRows, ["SPY", "QQQ", "IWM"]);
  const stockRows = day.stockRows.slice(0, 25);
  const etfRows = day.etfRows.slice(0, 10);
  const heatRows = day.buckets.heatmap.slice(0, 15);
  const labels = day.buckets.labels;
  $("reportCanvas").innerHTML = `
    <article class="kzg-sheet">
      <header class="sheet-head">
        <div>
          <b>${state.lang === "zh" ? `${dateCN(day.tradeDate)} 美股期权分钟数据` : `${day.tradeDate} US Options Minute Sheet`}</b>
          <span>${t("kzgByline")} | KZG Option House</span>
        </div>
        <strong>KZG</strong>
      </header>
      ${sheetSection(state.lang === "zh" ? "三大指数期权数据" : "Index Options", sheetTable(indexRows, [
        ["Rank", (_, i) => i + 1],
        ["Symbol", (row) => row.symbol],
        [state.lang === "zh" ? "成交量(万张)" : "Vol (x10k)", (row) => wan(row.totalVol, false), "num"],
        ["CP比", (row) => ratio(row.cpRatio), "num heat"],
      ]))}
      ${sheetBars(day)}
      ${sheetHeatmap(heatRows, labels)}
      ${sheetSection(state.lang === "zh" ? "ETF 期权成交量 Top10" : "ETF Options Top 10", sheetTable(etfRows, detailColumns()))}
      ${sheetSection(state.lang === "zh" ? "个股期权成交量 Top25" : "Single-Stock Options Top 25", sheetTable(stockRows, detailColumns()))}
      <footer class="sheet-foot">
        <span>*LEAP比: 到期日超 12 周的远期期权 C/P 成交量比 · ★ 极端值可能源于小样本</span>
        <b>${t("kzgByline")} | ${t("kzgPlanet")} | KZG Option House</b>
      </footer>
    </article>
  `;
}

function orderRows(rows, symbols) {
  return symbols.map((symbol) => rows.find((row) => row.symbol === symbol)).filter(Boolean);
}

function detailColumns() {
  return [
    ["Rank", (_, i) => i + 1],
    ["Symbol", (row) => row.symbol],
    [state.lang === "zh" ? "成交量" : "Vol", (row) => wan(row.totalVol, false), "num"],
    ["CP比", (row) => ratio(row.cpRatio), "num heat"],
    ["LEAP*", (row) => ratio(row.leapRatio), "num heat"],
    [state.lang === "zh" ? "均笔" : "Avg", (row) => row.avgSize, "num"],
    [state.lang === "zh" ? "最热合约" : "Top Contract", (row) => row.hottestShort, "num muted"],
  ];
}

function sheetSection(title, body) {
  return `
    <section class="sheet-section">
      <div class="sheet-title"><b>${escapeHtml(title)}</b><span>${t("kzgByline")} | KZG Option House</span></div>
      ${body}
    </section>
  `;
}

function sheetTable(rows, columns) {
  const head = `<thead><tr>${columns.map(([label,, cls]) => `<th class="${cls?.includes("num") ? "num" : ""}">${escapeHtml(label)}</th>`).join("")}</tr></thead>`;
  const body = rows.map((row, index) => `
    <tr>
      ${columns.map(([, getter, cls]) => {
        const value = getter(row, index);
        const heat = cls?.includes("heat") ? ` style="--heat:${heatLevel(Number(value))}"` : "";
        return `<td class="${cls || ""}"${heat}>${escapeHtml(value)}</td>`;
      }).join("")}
    </tr>
  `).join("");
  return `<table class="sheet-table">${head}<tbody>${body}</tbody></table>`;
}

function sheetBars(day) {
  const rows = day.buckets.market;
  const max = Math.max(...rows.map((row) => row.total), 1);
  const bars = rows.map((row) => `
    <div class="sheet-bar">
      <span>${wan(row.total, false)}</span>
      <i style="height:${Math.max(4, (row.total / max) * 100).toFixed(1)}%"></i>
      <em>${row.time}</em>
    </div>
  `).join("");
  return `
    <section class="sheet-section">
      <div class="sheet-title"><b>${state.lang === "zh" ? "全市场日内成交分布" : "Intraday Volume Distribution"}</b><span>${t("kzgByline")} | KZG Option House</span></div>
      <div class="sheet-bars">${bars}</div>
      <div class="sheet-legend"><i></i>${state.lang === "zh" ? "成交量(万张)" : "Volume (x10k)"}</div>
    </section>
  `;
}

function sheetHeatmap(heat, labels) {
  const values = heat.flatMap((row) => row.values);
  const max = Math.max(...values, 1);
  let body = `<div class="sheet-heat"><span class="head">${state.lang === "zh" ? "标的" : "Symbol"}</span>`;
  body += labels.map((label) => `<span class="head">${label}</span>`).join("");
  for (const row of heat) {
    body += `<span class="sym">${row.symbol}</span>`;
    body += row.values.map((value) => {
      if (!value) return `<span class="empty-cell">-</span>`;
      const level = value / max;
      return `<span style="background:${blueHeat(level)};color:${level > 0.58 ? "#fff" : "#2b333a"}">${fmt1.format(value / 10000)}</span>`;
    }).join("");
  }
  body += "</div>";
  return sheetSection(state.lang === "zh" ? "日内成交分布 Top15 (万张)" : "Intraday Heatmap Top 15 (x10k)", body);
}

async function exportReportPng(date) {
  const button = $("downloadReport");
  const report = $("reportCanvas");
  if (!window.html2canvas) {
    alert("PNG renderer not loaded.");
    return;
  }
  const original = button.innerHTML;
  const clone = report.cloneNode(true);
  clone.classList.add("export-clone");
  document.body.appendChild(clone);
  try {
    button.disabled = true;
    button.innerHTML = `<span aria-hidden="true">↓</span>${t("exporting")}`;
    if (document.fonts?.ready) await document.fonts.ready;
    const canvas = await window.html2canvas(clone, {
      backgroundColor: "#ffffff",
      scale: 2.5,
      useCORS: true,
      logging: false,
    });
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `kzg-option-house-${date}-${state.lang}.png`;
    document.body.appendChild(link);
    link.click();
    link.remove();
  } finally {
    clone.remove();
    button.disabled = false;
    button.innerHTML = original;
  }
}

function heatLevel(value) {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0.08, Math.min(1, value / 6));
}

function blueHeat(level) {
  return blend([236, 242, 247], [45, 88, 134], Math.max(0.05, Math.min(1, level)));
}

function blend(a, b, t) {
  const clamped = Math.max(0, Math.min(1, t));
  const rgb = a.map((v, index) => Math.round(v + (b[index] - v) * clamped));
  return `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

loadIndex().catch((error) => {
  document.body.innerHTML = `<main class="panel" style="margin:24px"><h1>数据加载失败</h1><p>${escapeHtml(error.message)}</p></main>`;
});
