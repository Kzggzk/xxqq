const state = {
  index: null,
  analytics: null,
  datesAsc: [],
  dayCache: new Map(),
  day: null,
  selectedIndex: 0,
  query: "",
  requestToken: 0,
  trendWindow: "90",
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
    heatmap: "分钟级标的热力",
    heatmapSub: "Top15 标的横向看日内节奏，单位万张。",
    buckets: "日内节奏 vs 20日均值",
    bucketsSub: "当前交易日与最近 20 个交易日的 30 分钟桶对比。",
    trend: "跨日成交趋势",
    trendSub: "成交量、权利金和 CP 结构随时间同步变化。",
    signal: "市场结构情报",
    signalSub: "成交、权利金、CP、开收盘节奏压成一张读盘卡。",
    regime: "交易日温度带",
    regimeSub: "最近 120 个交易日的热冷切换。",
    momentum: "核心标的动量",
    momentumSub: "悬停标的查看跨日成交小图。",
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
    heatmap: "Symbol Minute Heatmap",
    heatmapSub: "Top 15 intraday rhythm, unit: x10k contracts.",
    buckets: "Intraday vs 20D Avg",
    bucketsSub: "Selected day against the trailing 20-session bucket average.",
    trend: "Cross-Day Flow",
    trendSub: "Volume, premium notional, and CP structure over time.",
    signal: "Market Structure",
    signalSub: "Volume, premium, CP, open and close rhythm in one read.",
    regime: "Session Temperature",
    regimeSub: "Hot/cool regime switches across the latest 120 sessions.",
    momentum: "Core Symbol Momentum",
    momentumSub: "Hover a symbol for its cross-day mini chart.",
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
  document.documentElement.setAttribute("oncontextmenu", "return false");
  document.body?.setAttribute("oncontextmenu", "return false");
  document.addEventListener("contextmenu", (event) => {
    if (!allowText(event.target)) event.preventDefault();
  }, { capture: true });
  document.addEventListener("mousedown", (event) => {
    if (event.button === 2 && !allowText(event.target)) event.preventDefault();
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
      event.key === "F12" ||
      event.key === "ContextMenu" ||
      ((event.metaKey || event.ctrlKey) && ["u", "s", "c", "p", "x", "a"].includes(key)) ||
      ((event.metaKey || event.ctrlKey) && event.shiftKey && ["i", "j", "c", "k", "u"].includes(key));
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
  state.analytics = payload.analytics || null;
  state.dayCache = new Map(Object.entries(payload.days || {}));
  state.datesAsc = [...state.index.dates].reverse();
  if (!state.datesAsc.length) throw new Error("No trading days found.");

  $("timelineStart").textContent = state.datesAsc[0].date.replaceAll("-", "/");
  $("timelineEnd").textContent = state.index.latestDate.replaceAll("-", "/");
  $("symbolSearch").addEventListener("input", (event) => {
    state.query = event.target.value.trim().toUpperCase();
    renderStockTable();
  });
  $("prevDay").addEventListener("click", () => loadDayByIndex(state.selectedIndex - 1));
  $("nextDay").addEventListener("click", () => loadDayByIndex(state.selectedIndex + 1));
  $("timelineRange").addEventListener("input", (event) => loadDayByIndex(Number(event.target.value)));
  $("dayBars").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-index]");
    if (button) loadDayByIndex(Number(button.dataset.index));
  });
  $("trendChart").addEventListener("click", (event) => {
    const target = event.target.closest("[data-jump-date]");
    if (target) loadDayByDate(target.dataset.jumpDate);
  });
  $("regimeMap").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-date]");
    if (button) loadDayByDate(button.dataset.date);
  });
  $("goToday").addEventListener("click", () => loadDayByIndex(state.datesAsc.length - 1));
  $("themeToggle").addEventListener("click", toggleTheme);
  $("langToggle").addEventListener("click", toggleLang);
  document.querySelectorAll("[data-window]").forEach((button) => {
    button.addEventListener("click", () => {
      state.trendWindow = button.dataset.window;
      document.querySelectorAll("[data-window]").forEach((node) => {
        node.classList.toggle("active", node === button);
      });
      renderTrend();
    });
  });
  installTooltip();

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
  renderTimelineShell();
  updateTimelineSelection();
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
    const [year, month] = group.month.split("-");
    const label = state.lang === "zh" ? `${year.slice(2)}年${Number(month)}月` : `${year}/${month}`;
    return `<span>${label}</span>`;
  }).join("");

  const maxVol = Math.max(...state.datesAsc.map((item) => Number(item.totalVol) || 0), 1);
  const dayBars = $("dayBars");
  dayBars.style.gridTemplateColumns = `repeat(${state.datesAsc.length}, minmax(0, 1fr))`;
  dayBars.innerHTML = state.datesAsc.map((item, index) => {
    const height = 6 + ((Number(item.totalVol) || 0) / maxVol) * 30;
    return `<button type="button" data-index="${index}" style="--h:${height.toFixed(1)}px" title="${item.date} · ${wan(item.totalVol)}"></button>`;
  }).join("");
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

function loadDayByDate(date) {
  const index = state.datesAsc.findIndex((item) => item.date === date);
  if (index >= 0) loadDayByIndex(index);
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
  renderSignalBoard();
  renderRegimeMap();
  renderStockTable();
  renderSymbolMomentum();
  renderStaticCopy();
}

function renderStaticCopy() {
  document.querySelector(".timeboard-copy h2").textContent = t("timeline");
  document.querySelector(".section-head h2").textContent = t("reportCanvas");
  document.querySelector(".section-head p").textContent = t("reportCanvasSub");
  $("trendTitle").textContent = t("trend");
  $("trendSub").textContent = t("trendSub");
  $("signalTitle").textContent = t("signal");
  $("signalSub").textContent = t("signalSub");
  $("regimeTitle").textContent = t("regime");
  $("regimeSub").textContent = t("regimeSub");
  $("heatmapTitle").textContent = t("heatmap");
  $("heatmapSub").textContent = t("heatmapSub");
  $("bucketTitle").textContent = t("buckets");
  $("bucketSub").textContent = t("bucketsSub");
  document.querySelector(".side-rail .section-head h2").textContent = t("digest");
  document.querySelector(".side-rail .section-head p").textContent = t("digestSub");
  document.querySelector(".search-wrap span").textContent = t("filter");
  document.querySelector(".mini-head b").textContent = t("stockTop");
  document.querySelector(".mini-head span").textContent = t("volumeRank");
  $("momentumTitle").textContent = t("momentum");
  $("momentumSub").textContent = t("momentumSub");
}

function renderDigest() {
  $("digest").innerHTML = state.day.digest.map((line) => `<div>${escapeHtml(line)}</div>`).join("");
}

function trailingBucketAverage(endIndex, lookback) {
  const daily = state.analytics?.daily;
  if (!daily?.length) return new Array(state.day.buckets.market.length).fill(0);
  const rows = daily.slice(Math.max(0, endIndex - lookback), endIndex);
  if (!rows.length) return new Array(state.day.buckets.market.length).fill(0);
  const sums = new Array(state.day.buckets.market.length).fill(0);
  for (const row of rows) {
    (row.buckets || []).forEach((value, index) => {
      sums[index] += Number(value) || 0;
    });
  }
  return sums.map((value) => value / rows.length);
}

function renderBuckets() {
  const rows = state.day.buckets.market;
  const avg = trailingBucketAverage(state.selectedIndex, 20);
  const max = Math.max(...rows.map((row) => row.total), 1);
  const avgMax = Math.max(...avg, 1);
  const scale = Math.max(max, avgMax);
  $("bucketBars").innerHTML = rows.map((row, index) => {
    const currentHeight = Math.max(2, (row.total / scale) * 100);
    const avgHeight = Math.max(2, ((avg[index] || 0) / scale) * 100);
    const spread = avg[index] ? ((row.total - avg[index]) / avg[index]) * 100 : 0;
    const tone = spread >= 18 ? "hot" : spread <= -18 ? "cool" : "flat";
    return `
      <div class="bar ${tone}">
        <div class="bar-track">
          <div class="bar-avg" style="height:${avgHeight.toFixed(2)}%"></div>
          <div class="bar-fill" style="height:${currentHeight.toFixed(2)}%"></div>
        </div>
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
    html += `<div class="heat-cell symbol" data-symbol="${escapeHtml(row.symbol)}">${row.symbol}</div>`;
    html += row.values.map((value) => {
      if (!value) return `<div class="heat-cell" style="background:#f4f1e9;color:#817b70">-</div>`;
      const level = value / max;
      const bg = blueHeat(level);
      const fg = level > 0.56 ? "#fff" : "#28323b";
      return `<div class="heat-cell" data-symbol="${escapeHtml(row.symbol)}" style="background:${bg};color:${fg}">${fmt1.format(value / 10000)}</div>`;
    }).join("");
  }
  html += "</div>";
  $("heatmap").innerHTML = html;
}

function renderTrend() {
  const rows = selectedTrendRows();
  if (!rows.length) {
    $("trendChart").innerHTML = "";
    return;
  }
  const width = 880;
  const height = 244;
  const padX = 34;
  const padY = 28;
  const volValues = rows.map((row) => Number(row.totalVol) || 0);
  const premiumValues = rows.map((row) => Number(row.totalPremium) || 0);
  const maxVol = Math.max(...volValues, 1);
  const minVol = Math.min(...volValues, maxVol);
  const maxPremium = Math.max(...premiumValues, 1);
  const minPremium = Math.min(...premiumValues, maxPremium);
  const scaleY = (value, min, max) => {
    const span = Math.max(1, max - min);
    return height - padY - ((value - min) / span) * (height - padY * 2);
  };
  const xAt = (index) => padX + (index / Math.max(1, rows.length - 1)) * (width - padX * 2);
  const pointsVol = rows.map((row, index) => ({ x: xAt(index), y: scaleY(Number(row.totalVol) || 0, minVol, maxVol), row }));
  const pointsPremium = rows.map((row, index) => ({ x: xAt(index), y: scaleY(Number(row.totalPremium) || 0, minPremium, maxPremium), row }));
  const lineVol = pointsVol.map((point) => `${point.x.toFixed(1)},${point.y.toFixed(1)}`).join(" ");
  const linePremium = pointsPremium.map((point) => `${point.x.toFixed(1)},${point.y.toFixed(1)}`).join(" ");
  const area = `${padX},${height - padY} ${lineVol} ${width - padX},${height - padY}`;
  const prev = rows[rows.length - 2];
  const latest = rows[rows.length - 1];
  const change = prev ? ((latest.totalVol - prev.totalVol) / prev.totalVol) * 100 : 0;
  const tone = change >= 0 ? "trend-hot" : "trend-cool";
  const avgCp = rows.reduce((sum, row) => sum + (Number(row.marketCp) || 0), 0) / rows.length;
  const cpValues = rows.map((row) => Number(row.marketCp) || 0);
  const maxCp = Math.max(...cpValues, 1);
  const minCp = Math.min(...cpValues, maxCp);
  const pointsCp = rows.map((row, index) => ({
    x: xAt(index),
    y: scaleY(Number(row.marketCp) || 0, minCp, maxCp),
    row,
  }));
  const lineCp = pointsCp.map((point) => `${point.x.toFixed(1)},${point.y.toFixed(1)}`).join(" ");
  const selectedRank = percentileRank(latest.totalVol, rows.map((row) => row.totalVol));
  const rangeHigh = rows.reduce((best, row) => Number(row.totalVol) > Number(best.totalVol) ? row : best, rows[0]);
  const rangeLow = rows.reduce((best, row) => Number(row.totalVol) < Number(best.totalVol) ? row : best, rows[0]);
  const highPoint = pointsVol.find((point) => point.row.date === rangeHigh.date) || pointsVol[0];
  const lowPoint = pointsVol.find((point) => point.row.date === rangeLow.date) || pointsVol[0];
  const latestPoint = pointsVol[pointsVol.length - 1];

  $("trendChart").innerHTML = `
    <div class="trend-summary ${tone}">
      <div>
        <strong>${wan(latest.totalVol)}</strong>
        <span>${shortDate(rows[0].date)} - ${shortDate(latest.date)} · ${change >= 0 ? "+" : ""}${fmt1.format(change)}%</span>
      </div>
      <div class="trend-kpis">
        <span>${state.lang === "zh" ? "权利金" : "Premium"} ${moneyCompact(latest.totalPremium)}</span>
        <span>CP ${ratio(latest.marketCp)} · ${state.lang === "zh" ? "均值" : "avg"} ${ratio(avgCp)}</span>
        <span>${state.lang === "zh" ? "区间分位" : "Percentile"} ${fmt0.format(selectedRank)}%</span>
      </div>
    </div>
    <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${t("trend")}">
      <defs>
        <linearGradient id="trendFill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stop-color="${change >= 0 ? "#d96a4a" : "#2f6190"}" stop-opacity=".28"/>
          <stop offset="1" stop-color="${change >= 0 ? "#d96a4a" : "#2f6190"}" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <polygon points="${area}" fill="url(#trendFill)"></polygon>
      ${pointsVol.map((point, index) => `<line x1="${point.x.toFixed(1)}" x2="${point.x.toFixed(1)}" y1="${height - padY}" y2="${point.y.toFixed(1)}" stroke="${change >= 0 ? "#d7a28f" : "#9cb7d0"}" stroke-width="${Math.max(2, 12 / Math.sqrt(rows.length)).toFixed(1)}" opacity=".34"></line>`).join("")}
      <polyline points="${lineVol}" fill="none" stroke="${change >= 0 ? "#c45335" : "#2f6190"}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"></polyline>
      <polyline points="${linePremium}" fill="none" stroke="#a47419" stroke-width="3" stroke-linejoin="round" stroke-linecap="round" opacity=".85"></polyline>
      <polyline points="${lineCp}" fill="none" stroke="#148355" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round" opacity=".72"></polyline>
      ${trendMarker(highPoint, "high", state.lang === "zh" ? "高" : "H")}
      ${trendMarker(lowPoint, "low", state.lang === "zh" ? "低" : "L")}
      ${trendMarker(latestPoint, "latest", state.lang === "zh" ? "今" : "N")}
      ${pointsVol.map((point, index) => index % Math.max(1, Math.ceil(rows.length / 7)) === 0 || index === pointsVol.length - 1 ? `<text x="${point.x.toFixed(1)}" y="${height - 6}" text-anchor="middle">${shortDate(point.row.date)}</text>` : "").join("")}
      <text x="${padX}" y="16" text-anchor="start">${state.lang === "zh" ? "成交量" : "Volume"}</text>
      <text x="${width - padX}" y="16" text-anchor="end">${state.lang === "zh" ? "权利金 / CP" : "Premium / CP"}</text>
    </svg>
    <div class="trend-extremes">
      <button type="button" data-jump-date="${rangeHigh.date}">${state.lang === "zh" ? "区间高点" : "Range high"} <b>${shortDate(rangeHigh.date)} · ${wan(rangeHigh.totalVol)}</b></button>
      <button type="button" data-jump-date="${rangeLow.date}">${state.lang === "zh" ? "区间低点" : "Range low"} <b>${shortDate(rangeLow.date)} · ${wan(rangeLow.totalVol)}</b></button>
      <button type="button" data-jump-date="${latest.date}">${state.lang === "zh" ? "当前权利金" : "Current premium"} <b>${moneyCompact(latest.totalPremium)}</b></button>
    </div>
    ${categoryStack(latest)}
  `;
}

function renderSignalBoard() {
  const target = $("signalBoard");
  const daily = state.analytics?.daily || [];
  const rows90 = daily.slice(Math.max(0, state.selectedIndex - 89), state.selectedIndex + 1);
  const rows20 = daily.slice(Math.max(0, state.selectedIndex - 20), state.selectedIndex);
  const avg20Vol = average(rows20.map((row) => row.totalVol));
  const avg20Premium = average(rows20.map((row) => row.totalPremium));
  const ov = state.day.overview;
  const buckets = state.day.buckets.market || [];
  const bucketTotal = buckets.reduce((sum, row) => sum + (Number(row.total) || 0), 0) || 1;
  const openShare = buckets.slice(0, 2).reduce((sum, row) => sum + (Number(row.total) || 0), 0) / bucketTotal * 100;
  const closeShare = buckets.slice(-2).reduce((sum, row) => sum + (Number(row.total) || 0), 0) / bucketTotal * 100;
  const noonShare = buckets.slice(5, 8).reduce((sum, row) => sum + (Number(row.total) || 0), 0) / bucketTotal * 100;
  const premiumDensity = ov.totalVol ? ov.totalPremium / ov.totalVol : 0;
  const volumeDelta20 = avg20Vol ? ((ov.totalVol - avg20Vol) / avg20Vol) * 100 : 0;
  const premiumDelta20 = avg20Premium ? ((ov.totalPremium - avg20Premium) / avg20Premium) * 100 : 0;
  const volPct = percentileRank(ov.totalVol, rows90.map((row) => row.totalVol));
  const cpPct = percentileRank(ov.marketCp, rows90.map((row) => row.marketCp));
  const dominant = dominantCategory(ov.category, ov.totalVol);
  const bucketDivergence = strongestBucketDivergence();
  const pulse = Math.max(4, Math.min(100, (volPct * 0.45) + (Math.max(0, volumeDelta20) * 0.35) + (Math.max(0, premiumDelta20) * 0.2)));
  const pulseTone = pulse >= 72 ? "hot" : pulse <= 36 ? "cool" : "warm";
  const cards = [
    {
      label: state.lang === "zh" ? "量能分位" : "Volume rank",
      value: `${fmt0.format(volPct)}%`,
      sub: `${volumeDelta20 >= 0 ? "+" : ""}${fmt1.format(volumeDelta20)}% ${state.lang === "zh" ? "vs 20日均值" : "vs 20D avg"}`,
      meter: volPct,
      tone: volPct >= 70 ? "hot" : volPct <= 35 ? "cool" : "warm",
    },
    {
      label: state.lang === "zh" ? "权利金密度" : "Premium density",
      value: moneyCompact(premiumDensity),
      sub: `${premiumDelta20 >= 0 ? "+" : ""}${fmt1.format(premiumDelta20)}% ${state.lang === "zh" ? "权利金变化" : "premium move"}`,
      meter: Math.max(8, Math.min(100, 50 + premiumDelta20)),
      tone: premiumDelta20 >= 18 ? "hot" : premiumDelta20 <= -18 ? "cool" : "warm",
    },
    {
      label: state.lang === "zh" ? "开盘集中度" : "Opening focus",
      value: `${fmt1.format(openShare)}%`,
      sub: `${state.lang === "zh" ? "前 60 分钟" : "first 60 min"} · ${fmt1.format(noonShare)}% ${state.lang === "zh" ? "午盘" : "midday"}`,
      meter: openShare,
      tone: openShare >= 28 ? "hot" : openShare <= 16 ? "cool" : "warm",
    },
    {
      label: state.lang === "zh" ? "尾盘集中度" : "Closing focus",
      value: `${fmt1.format(closeShare)}%`,
      sub: bucketDivergence,
      meter: closeShare,
      tone: closeShare >= 24 ? "hot" : closeShare <= 13 ? "cool" : "warm",
    },
    {
      label: state.lang === "zh" ? "主导类别" : "Dominant lane",
      value: dominant.label,
      sub: `${dominant.share} · CP ${ratio(dominant.cpRatio)}`,
      meter: Number.parseFloat(dominant.share) || 0,
      tone: dominant.key === "STOCK" ? "hot" : dominant.key === "INDEX" ? "cool" : "warm",
    },
    {
      label: state.lang === "zh" ? "CP 结构" : "CP regime",
      value: ratio(ov.marketCp),
      sub: `${fmt0.format(cpPct)}% ${state.lang === "zh" ? "历史分位" : "rank"} · Call / Put`,
      meter: cpPct,
      tone: ov.marketCp >= 1.5 ? "hot" : ov.marketCp <= 0.95 ? "cool" : "warm",
    },
  ];

  target.innerHTML = `
    <div class="pulse-gauge ${pulseTone}" style="--pulse:${pulse.toFixed(1)}%">
      <div>
        <span>${state.lang === "zh" ? "盘面温度" : "Market pulse"}</span>
        <strong>${fmt0.format(pulse)}</strong>
      </div>
      <p>${signalNarrative(volumeDelta20, premiumDelta20, openShare, closeShare, dominant.label)}</p>
    </div>
    <div class="signal-strips">
      ${cards.map((card) => `
        <div class="signal-strip ${card.tone}" style="--meter:${Math.max(4, Math.min(100, card.meter)).toFixed(1)}%">
          <span>${card.label}</span>
          <strong>${card.value}</strong>
          <small>${card.sub}</small>
          <i></i>
        </div>
      `).join("")}
    </div>
  `;
}

function renderRegimeMap() {
  const rows = (state.analytics?.daily || []).slice(Math.max(0, state.selectedIndex - 119), state.selectedIndex + 1);
  if (!rows.length) {
    $("regimeMap").innerHTML = "";
    return;
  }
  const maxVol = Math.max(...rows.map((row) => Number(row.totalVol) || 0), 1);
  const minVol = Math.min(...rows.map((row) => Number(row.totalVol) || 0), maxVol);
  const selected = rows[rows.length - 1];
  const annotated = rows.map((row, index) => {
    const prev = rows[index - 1];
    const move = prev && prev.totalVol ? ((row.totalVol - prev.totalVol) / prev.totalVol) * 100 : 0;
    const heat = (Number(row.totalVol) - minVol) / Math.max(1, maxVol - minVol);
    const tone = move >= 8 ? "hot" : move <= -8 ? "cool" : "flat";
    return { ...row, move, heat, tone };
  });
  const cells = annotated.map((row) => {
    const selectedClass = row.date === state.day.tradeDate ? " selected" : "";
    return `<button type="button" class="${row.tone}${selectedClass}" data-date="${row.date}" aria-label="${row.date} ${wan(row.totalVol)}" title="${row.date} · ${wan(row.totalVol)} · ${row.move >= 0 ? "+" : ""}${fmt1.format(row.move)}%" style="--heat:${row.heat.toFixed(2)}"></button>`;
  }).join("");
  const avgVol = average(rows.map((row) => row.totalVol));
  const selectedMove = avgVol ? ((selected.totalVol - avgVol) / avgVol) * 100 : 0;
  const hotCount = annotated.filter((row) => row.tone === "hot").length;
  const coolCount = annotated.filter((row) => row.tone === "cool").length;
  const biggest = annotated.reduce((best, row) => Math.abs(row.move) > Math.abs(best.move) ? row : best, annotated[0]);
  const latestTone = annotated[annotated.length - 1]?.tone || "flat";
  let streak = 0;
  for (let i = annotated.length - 1; i >= 0; i -= 1) {
    if (annotated[i].tone !== latestTone) break;
    streak += 1;
  }
  $("regimeMap").innerHTML = `
    <div class="regime-tape">${cells}</div>
    <div class="regime-stats">
      <span>${state.lang === "zh" ? "热日" : "Hot"} <b>${hotCount}</b></span>
      <span>${state.lang === "zh" ? "冷日" : "Cool"} <b>${coolCount}</b></span>
      <button type="button" data-date="${biggest.date}">${state.lang === "zh" ? "最大波动" : "Largest move"} <b>${shortDate(biggest.date)} · ${biggest.move >= 0 ? "+" : ""}${fmt1.format(biggest.move)}%</b></button>
      <span>${state.lang === "zh" ? "当前连贯" : "Current run"} <b>${streak}D · ${regimeToneLabel(latestTone)}</b></span>
    </div>
    <div class="regime-foot">
      <span>${shortDate(rows[0].date)} - ${shortDate(selected.date)}</span>
      <b>${selectedMove >= 0 ? "+" : ""}${fmt1.format(selectedMove)}% ${state.lang === "zh" ? "相对区间均量" : "vs window avg"}</b>
    </div>
  `;
}

function trendMarker(point, cls, label) {
  if (!point) return "";
  const x = point.x.toFixed(1);
  const y = point.y.toFixed(1);
  const labelY = Math.max(26, point.y - 12).toFixed(1);
  return `
    <g class="trend-marker ${cls}" data-jump-date="${point.row.date}">
      <circle cx="${x}" cy="${y}" r="7"></circle>
      <text x="${x}" y="${labelY}" text-anchor="middle">${label}</text>
    </g>
  `;
}

function regimeToneLabel(tone) {
  if (state.lang === "zh") {
    if (tone === "hot") return "热";
    if (tone === "cool") return "冷";
    return "平";
  }
  if (tone === "hot") return "hot";
  if (tone === "cool") return "cool";
  return "flat";
}

function selectedTrendRows() {
  const daily = state.analytics?.daily;
  const source = daily?.length ? daily : state.datesAsc;
  const end = state.selectedIndex;
  const windowSize = state.trendWindow === "all" ? source.length : Number(state.trendWindow) || 90;
  return source.slice(Math.max(0, end - windowSize + 1), end + 1);
}

function categoryStack(row) {
  const category = row.category || state.day.overview.category;
  const total = Number(row.totalVol) || 1;
  const parts = [
    ["INDEX", t("index"), "#2f6190"],
    ["ETF", t("etf"), "#9a6a12"],
    ["STOCK", t("stock"), "#c45335"],
  ];
  return `
    <div class="flow-stack">
      ${parts.map(([key, label, color]) => {
        const item = category[key] || {};
        const width = Math.max(6, (Number(item.volume) || 0) / total * 100);
        return `
          <div class="flow-part" style="--w:${width.toFixed(2)}%;--c:${color}">
            <i style="width:${width.toFixed(2)}%"></i>
            <span>${label}</span>
            <b>${pct(item.volume, total)} · CP ${ratio(item.cpRatio)}</b>
          </div>
        `;
      }).join("")}
    </div>
  `;
}

function average(values) {
  const nums = values.map(Number).filter(Number.isFinite);
  if (!nums.length) return 0;
  return nums.reduce((sum, value) => sum + value, 0) / nums.length;
}

function percentileRank(value, values) {
  const nums = values.map(Number).filter(Number.isFinite).sort((a, b) => a - b);
  const n = Number(value);
  if (!nums.length || !Number.isFinite(n)) return 0;
  const lowerOrEqual = nums.filter((item) => item <= n).length;
  return Math.max(0, Math.min(100, (lowerOrEqual / nums.length) * 100));
}

function dominantCategory(category, totalVol) {
  const parts = [
    ["INDEX", t("index")],
    ["ETF", t("etf")],
    ["STOCK", t("stock")],
  ];
  const best = parts
    .map(([key, label]) => {
      const item = category?.[key] || {};
      return {
        key,
        label,
        volume: Number(item.volume) || 0,
        cpRatio: item.cpRatio,
      };
    })
    .sort((a, b) => b.volume - a.volume)[0];
  return {
    ...best,
    share: pct(best.volume, totalVol),
  };
}

function strongestBucketDivergence() {
  const rows = state.day.buckets.market || [];
  const avg = trailingBucketAverage(state.selectedIndex, 20);
  let best = null;
  rows.forEach((row, index) => {
    const base = avg[index] || 0;
    const spread = base ? ((Number(row.total) - base) / base) * 100 : 0;
    if (!best || Math.abs(spread) > Math.abs(best.spread)) {
      best = { time: row.time, spread };
    }
  });
  if (!best) return state.lang === "zh" ? "暂无 20 日均值" : "no 20D average";
  return `${best.time} ${best.spread >= 0 ? "+" : ""}${fmt1.format(best.spread)}% ${state.lang === "zh" ? "vs 20日桶均值" : "vs 20D bucket avg"}`;
}

function signalNarrative(volumeDelta20, premiumDelta20, openShare, closeShare, lane) {
  if (state.lang !== "zh") {
    const energy = volumeDelta20 >= 18 ? "active tape" : volumeDelta20 <= -18 ? "cool tape" : "balanced tape";
    const premium = premiumDelta20 >= 18 ? "premium is expanding" : premiumDelta20 <= -18 ? "premium is lighter" : "premium is steady";
    const rhythm = closeShare > openShare ? "closing demand leads" : "opening demand leads";
    return `${energy}; ${premium}; ${rhythm}. Dominant lane: ${lane}.`;
  }
  const energy = volumeDelta20 >= 18 ? "量能明显放大" : volumeDelta20 <= -18 ? "量能偏冷" : "量能处于均衡带";
  const premium = premiumDelta20 >= 18 ? "权利金同步扩张" : premiumDelta20 <= -18 ? "权利金收缩" : "权利金保持稳定";
  const rhythm = closeShare > openShare ? "尾盘需求强于开盘" : "开盘需求更集中";
  return `${energy}，${premium}，${rhythm}。主导通道：${lane}。`;
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
    <tr data-symbol="${escapeHtml(row.symbol)}">
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

function renderSymbolMomentum() {
  const target = $("symbolMomentum");
  const seen = new Set();
  const rows = [...state.day.indexRows, ...state.day.etfRows, ...state.day.stockRows]
    .filter((row) => {
      if (seen.has(row.symbol)) return false;
      seen.add(row.symbol);
      return true;
    })
    .slice(0, 18)
    .map((row) => {
      const series = symbolSeriesUntil(row.symbol, 45);
      const prev = series.slice(0, -1).slice(-20);
      const avg = prev.length ? prev.reduce((sum, item) => sum + (Number(item.totalVol) || 0), 0) / prev.length : 0;
      const delta = avg ? ((Number(row.totalVol) - avg) / avg) * 100 : 0;
      return { ...row, delta, series };
    });

  target.innerHTML = rows.map((row) => {
    const hot = row.delta >= 20;
    const cool = row.delta <= -20;
    const cls = hot ? "hot" : cool ? "cool" : "flat";
    return `
      <button type="button" class="momentum-row ${cls}" data-symbol="${escapeHtml(row.symbol)}">
        <span class="mom-symbol">${escapeHtml(row.symbol)}</span>
        <span class="mom-spark">${sparkline(row.series, "totalVol", 118, 34, hot ? "#c45335" : cool ? "#2f6190" : "#9a6a12")}</span>
        <span class="mom-value">${wan(row.totalVol)}</span>
        <span class="mom-delta">${row.delta >= 0 ? "+" : ""}${fmt1.format(row.delta)}%</span>
      </button>
    `;
  }).join("");
}

function symbolSeriesUntil(symbol, limit = 60) {
  const full = state.analytics?.symbolSeries?.[symbol] || [];
  const selectedDate = state.day?.tradeDate;
  const end = full.findIndex((item) => item.date === selectedDate);
  const sliceEnd = end >= 0 ? end + 1 : full.length;
  return full.slice(Math.max(0, sliceEnd - limit), sliceEnd);
}

function sparkline(series, key = "totalVol", width = 150, height = 42, color = "#2f6190") {
  if (!series.length) return "";
  const values = series.map((item) => Number(item[key]) || 0);
  const max = Math.max(...values, 1);
  const min = Math.min(...values, max);
  const span = Math.max(1, max - min);
  const pad = 3;
  const points = values.map((value, index) => {
    const x = pad + (index / Math.max(1, values.length - 1)) * (width - pad * 2);
    const y = height - pad - ((value - min) / span) * (height - pad * 2);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
  const area = `${pad},${height - pad} ${points} ${width - pad},${height - pad}`;
  return `
    <svg viewBox="0 0 ${width} ${height}" aria-hidden="true">
      <polygon points="${area}" fill="${color}" opacity=".12"></polygon>
      <polyline points="${points}" fill="none" stroke="${color}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"></polyline>
    </svg>
  `;
}

function installTooltip() {
  const tooltip = $("marketTooltip");
  document.addEventListener("pointermove", (event) => {
    const target = event.target.closest("[data-symbol]");
    if (!target || !state.day) {
      tooltip.hidden = true;
      tooltip.removeAttribute("data-symbol");
      return;
    }
    const symbol = target.dataset.symbol;
    if (!symbol) return;
    if (tooltip.dataset.symbol !== symbol || tooltip.dataset.date !== state.day.tradeDate) {
      tooltip.innerHTML = renderSymbolTooltip(symbol);
      tooltip.dataset.symbol = symbol;
      tooltip.dataset.date = state.day.tradeDate;
    }
    tooltip.hidden = false;
    const rect = tooltip.getBoundingClientRect();
    const left = Math.min(window.innerWidth - rect.width - 12, event.clientX + 18);
    const top = Math.min(window.innerHeight - rect.height - 12, event.clientY + 18);
    tooltip.style.left = `${Math.max(12, left)}px`;
    tooltip.style.top = `${Math.max(12, top)}px`;
  });
  document.addEventListener("pointerleave", () => {
    tooltip.hidden = true;
  });
}

function renderSymbolTooltip(symbol) {
  const series = symbolSeriesUntil(symbol, 60);
  const current = [...state.day.topUnderlyings].find((row) => row.symbol === symbol);
  if (!current) {
    return `<strong>${escapeHtml(symbol)}</strong><span>No packed history</span>`;
  }
  const first = series[0];
  const last = series[series.length - 1];
  const delta = first && last && first.totalVol ? ((last.totalVol - first.totalVol) / first.totalVol) * 100 : 0;
  return `
    <div class="tip-head">
      <strong>${escapeHtml(symbol)}</strong>
      <span>${current.category || ""}</span>
    </div>
    <div class="tip-chart">${sparkline(series, "totalVol", 210, 58, delta >= 0 ? "#c45335" : "#2f6190")}</div>
    <div class="tip-grid">
      <span>${state.lang === "zh" ? "当日成交" : "Volume"} <b>${wan(current.totalVol)}</b></span>
      <span>${state.lang === "zh" ? "权利金" : "Premium"} <b>${moneyCompact(current.premiumNotional)}</b></span>
      <span>CP <b>${ratio(current.cpRatio)}</b></span>
      <span>${series.length}${state.lang === "zh" ? "日变化" : "D move"} <b>${delta >= 0 ? "+" : ""}${fmt1.format(delta)}%</b></span>
    </div>
  `;
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
        let style = "";
        if (cls?.includes("heat")) {
          const level = heatLevel(Number(value));
          style = ` style="background:${blueHeat(level)};color:${level > 0.7 ? "#fff" : "#26323a"}"`;
        }
        return `<td class="${cls || ""}"${style}>${escapeHtml(value)}</td>`;
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
  const report = $("reportCanvas").querySelector(".kzg-sheet");
  if (!window.html2canvas) {
    alert("PNG renderer not loaded.");
    return;
  }
  const original = button.innerHTML;
  try {
    button.disabled = true;
    button.innerHTML = `<span aria-hidden="true">↓</span>${t("exporting")}`;
    if (document.fonts?.ready) await document.fonts.ready;
    const canvas = await window.html2canvas(report, {
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
