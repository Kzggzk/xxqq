const state = {
  index: null,
  datesAsc: [],
  dayCache: new Map(),
  day: null,
  selectedIndex: 0,
  query: "",
  requestToken: 0,
};

const $ = (id) => document.getElementById(id);
const fmt = new Intl.NumberFormat("en-US");
const fmt0 = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });
const fmt1 = new Intl.NumberFormat("en-US", { maximumFractionDigits: 1, minimumFractionDigits: 1 });
const fmt2 = new Intl.NumberFormat("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 2 });

function wan(value) {
  return `${fmt1.format((Number(value) || 0) / 10000)}万`;
}

function million(value) {
  return `${fmt1.format((Number(value) || 0) / 1000000)}M`;
}

function ratio(value) {
  return value === null || value === undefined ? "--" : fmt2.format(Number(value));
}

function pct(part, total) {
  if (!total) return "--";
  return `${fmt1.format((Number(part) / Number(total)) * 100)}%`;
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

function compactDate(value) {
  const [, month, day] = value.split("-");
  return `${month}/${day}`;
}

async function loadIndex() {
  const response = await fetch(`/data/index.json?ts=${Date.now()}`);
  if (!response.ok) throw new Error(`index ${response.status}`);
  state.index = await response.json();
  state.datesAsc = [...state.index.dates].reverse();
  if (!state.datesAsc.length) throw new Error("No trading days found.");

  $("timelineEnd").textContent = state.index.latestDate.replaceAll("-", "/");
  $("symbolSearch").addEventListener("input", (event) => {
    state.query = event.target.value.trim().toUpperCase();
    renderStockTable();
  });
  $("prevDay").addEventListener("click", () => loadDayByIndex(state.selectedIndex - 1));
  $("nextDay").addEventListener("click", () => loadDayByIndex(state.selectedIndex + 1));
  $("timelineRange").addEventListener("input", (event) => {
    loadDayByIndex(Number(event.target.value));
  });

  renderTimelineShell();
  await loadDayByIndex(state.datesAsc.length - 1);
}

function renderTimelineShell() {
  const range = $("timelineRange");
  range.min = "0";
  range.max = String(Math.max(0, state.datesAsc.length - 1));

  const monthGroups = [];
  for (const item of state.datesAsc) {
    const month = item.date.slice(0, 7);
    const last = monthGroups[monthGroups.length - 1];
    if (last && last.month === month) {
      last.count += 1;
    } else {
      monthGroups.push({ month, count: 1 });
    }
  }
  const monthTicks = $("monthTicks");
  monthTicks.style.gridTemplateColumns = monthGroups.map((group) => `${group.count}fr`).join(" ");
  monthTicks.innerHTML = monthGroups.map((group) => {
    const [, month] = group.month.split("-");
    return `<span>2026年${Number(month)}月</span>`;
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
    if (!button) return;
    loadDayByIndex(Number(button.dataset.index));
  });
}

async function loadDayByIndex(index) {
  const clamped = Math.max(0, Math.min(state.datesAsc.length - 1, index));
  const date = state.datesAsc[clamped].date;
  state.selectedIndex = clamped;
  updateTimelineSelection();

  const token = ++state.requestToken;
  let day = state.dayCache.get(date);
  if (!day) {
    const response = await fetch(`/data/days/${date}.json?ts=${Date.now()}`);
    if (!response.ok) throw new Error(`day ${date} ${response.status}`);
    day = await response.json();
    state.dayCache.set(date, day);
  }
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
  const delta = prev ? ((Number(item.totalVol) - Number(prev.totalVol)) / Number(prev.totalVol)) * 100 : null;

  $("headerDate").textContent = `${dateCN(day.tradeDate)} ${weekdayCN(day.tradeDate)}`;
  $("generatedAt").textContent = `generated ${new Date(day.generatedAt).toLocaleString("zh-CN", { hour12: false })}`;
  $("tradeDate").textContent = day.tradeDate;
  $("totalVol").textContent = wan(ov.totalVol);
  $("totalTxn").textContent = wan(ov.totalTxn);
  $("marketCp").textContent = ratio(ov.marketCp);
  $("rowCount").textContent = fmt0.format(day.validRows);
  $("sourceStatus").textContent = `${fmt0.format(day.validRows)} valid rows`;
  $("sourcePath").textContent = day.source.fileName;
  $("openReport").href = `/reports/${day.tradeDate}.html`;

  const deltaText = delta === null ? "first local day" : `较前日 ${delta >= 0 ? "+" : ""}${fmt1.format(delta)}%`;
  $("volDelta").textContent = deltaText;
  $("volDelta").className = delta === null ? "" : delta >= 0 ? "tone-high" : "tone-low";

  $("indexShare").textContent = pct(ov.category.INDEX.volume, ov.totalVol);
  $("indexCp").textContent = `CP ${ratio(ov.category.INDEX.cpRatio)}`;
  $("etfShare").textContent = pct(ov.category.ETF.volume, ov.totalVol);
  $("etfCp").textContent = `CP ${ratio(ov.category.ETF.cpRatio)}`;
  $("stockShare").textContent = pct(ov.category.STOCK.volume, ov.totalVol);
  $("stockCp").textContent = `CP ${ratio(ov.category.STOCK.cpRatio)}`;

  $("downloadReport").onclick = () => exportReportPng(day.tradeDate);
  renderDigest();
  renderReportCanvas();
  renderBuckets();
  renderHeatmap();
  renderStockTable();
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
  let html = `<div class="heat-table"><div class="heat-cell head">标的</div>`;
  html += labels.map((label) => `<div class="heat-cell head">${label}</div>`).join("");
  for (const row of heat) {
    html += `<div class="heat-cell symbol">${row.symbol}</div>`;
    html += row.values.map((value) => {
      if (!value) return `<div class="heat-cell" style="background:#f4f1e9;color:#817b70">-</div>`;
      const level = value / max;
      const bg = blend([247, 244, 236], [166, 106, 18], level);
      const fg = level > 0.54 ? "#fff" : "#191713";
      return `<div class="heat-cell" style="background:${bg};color:${fg}">${fmt1.format(value / 10000)}</div>`;
    }).join("");
  }
  html += "</div>";
  $("heatmap").innerHTML = html;
}

function renderStockTable() {
  if (!state.day) return;
  const rows = state.day.stockRows.filter((row) => {
    if (!state.query) return true;
    return row.symbol.includes(state.query) || row.hottest.includes(state.query);
  });
  renderTable($("stockTable"), rows.slice(0, 25), true);
}

function renderTable(target, rows) {
  const head = `
    <thead>
      <tr>
        <th>Rank</th>
        <th>Symbol</th>
        <th class="right">成交量</th>
        <th class="right">CP</th>
        <th class="right">最热合约</th>
      </tr>
    </thead>
  `;
  if (!rows.length) {
    target.innerHTML = `${head}<tbody><tr><td colspan="5" class="empty">No rows</td></tr></tbody>`;
    return;
  }
  const body = rows.map((row, index) => `
    <tr>
      <td>${index + 1}</td>
      <td class="symbol">${escapeHtml(row.symbol)}</td>
      <td class="right">${wan(row.totalVol)}</td>
      <td class="right ${toneClass(row.cpRatio, 2, 0.6)}">${ratio(row.cpRatio)}</td>
      <td class="right">${escapeHtml(row.hottestShort)}</td>
    </tr>
  `).join("");
  target.innerHTML = `${head}<tbody>${body}</tbody>`;
}

function renderReportCanvas() {
  const day = state.day;
  const ov = day.overview;
  const stockRows = day.stockRows.slice(0, 10);
  const etfRows = day.etfRows.slice(0, 8);
  const leapRows = [...day.topUnderlyings]
    .filter((row) => Number.isFinite(Number(row.leapRatio)) && row.totalVol > 50000)
    .sort((a, b) => (Number(b.leapRatio) || 0) - (Number(a.leapRatio) || 0))
    .slice(0, 8);

  $("reportCanvas").innerHTML = `
    <header class="report-top">
      <div class="report-mark">KZG</div>
      <div class="report-title">
        <h3>KZG Option House</h3>
        <p>Minute Aggregate Option Report</p>
      </div>
      <div class="report-meta">
        <b>${dateCN(day.tradeDate)}</b>
        <p>${weekdayCN(day.tradeDate)}</p>
      </div>
    </header>
    <div class="report-body">
      <section class="report-block wide">
        <div class="report-summary">
          <div><span>总期权成交量</span><strong>${fmt0.format(ov.totalVol)}</strong></div>
          <div><span>总成交笔数</span><strong>${fmt0.format(ov.totalTxn)}</strong></div>
          <div><span>Put/Call 成交量</span><strong>${ratio(ov.marketCp)}</strong></div>
          <div><span>标的数量</span><strong>${fmt0.format(day.topUnderlyings.length)}</strong></div>
        </div>
        <p class="report-copy">
          全市场期权成交 <b>${wan(ov.totalVol)}</b> 张，共 <b>${wan(ov.totalTxn)}</b> 笔。指数占 <b>${pct(ov.category.INDEX.volume, ov.totalVol)}</b>，ETF 占 <b>${pct(ov.category.ETF.volume, ov.totalVol)}</b>，个股占 <b>${pct(ov.category.STOCK.volume, ov.totalVol)}</b>。本报告由 Massive options minute aggregates 生成。
        </p>
      </section>
      <div class="report-grid">
        <section class="report-block">
          <div class="report-block-title"><b>Top 标的成交量排行</b><span>按成交量</span></div>
          ${reportTable(stockRows, [
            ["排名", (_, i) => i + 1],
            ["标的", (row) => row.symbol],
            ["成交量", (row) => wan(row.totalVol), "right"],
            ["CP", (row) => ratio(row.cpRatio), "right"],
          ])}
        </section>
        <section class="report-block">
          <div class="report-block-title"><b>分钟聚合成交热力图</b><span>Top15</span></div>
          ${reportHeatmap(day)}
        </section>
        <section class="report-block">
          <div class="report-block-title"><b>LEAPS 异动信号</b><span>远期偏离</span></div>
          ${reportTable(leapRows, [
            ["标的", (row) => row.symbol],
            ["LEAP", (row) => ratio(row.leapRatio), "right"],
            ["成交量", (row) => wan(row.totalVol), "right"],
            ["热合约", (row) => row.hottestShort, "right"],
          ])}
        </section>
        <section class="report-block wide">
          <div class="report-block-title"><b>总成交量走势</b><span>30 min bucket</span></div>
          ${reportBars(day)}
        </section>
        <section class="report-block">
          <div class="report-block-title"><b>三大指数</b><span>SPY / QQQ / IWM</span></div>
          ${reportTable(day.indexRows, [
            ["标的", (row) => row.symbol],
            ["成交量", (row) => wan(row.totalVol), "right"],
            ["CP", (row) => ratio(row.cpRatio), "right"],
          ])}
        </section>
        <section class="report-block wide">
          <div class="report-block-title"><b>ETF 期权成交量</b><span>Top8</span></div>
          ${reportTable(etfRows, [
            ["排名", (_, i) => i + 1],
            ["标的", (row) => row.symbol],
            ["成交量", (row) => wan(row.totalVol), "right"],
            ["CP", (row) => ratio(row.cpRatio), "right"],
            ["LEAP", (row) => ratio(row.leapRatio), "right"],
            ["最热合约", (row) => row.hottestShort, "right"],
          ])}
        </section>
      </div>
    </div>
    <footer class="report-foot">
      <div>
        <b>KZG Option House</b>
        <span>source: ${escapeHtml(day.source.fileName)} · rows: ${fmt0.format(day.validRows)} · generated: ${new Date(day.generatedAt).toLocaleString("zh-CN", { hour12: false })}</span>
      </div>
      <strong>KZG</strong>
    </footer>
  `;
}

function reportTable(rows, columns) {
  const head = `<thead><tr>${columns.map(([label,, align]) => `<th class="${align || ""}">${escapeHtml(label)}</th>`).join("")}</tr></thead>`;
  if (!rows.length) {
    return `<table class="report-table">${head}<tbody><tr><td colspan="${columns.length}" class="empty">无数据</td></tr></tbody></table>`;
  }
  const body = rows.map((row, index) => `
    <tr>
      ${columns.map(([, getter, align]) => `<td class="${align || ""}">${escapeHtml(getter(row, index))}</td>`).join("")}
    </tr>
  `).join("");
  return `<table class="report-table">${head}<tbody>${body}</tbody></table>`;
}

function reportBars(day) {
  const rows = day.buckets.market;
  const max = Math.max(...rows.map((row) => row.total), 1);
  return `<div class="report-bars">${rows.map((row) => `
    <div title="${row.time} ${wan(row.total)}">
      <i style="height:${Math.max(2, (row.total / max) * 100).toFixed(2)}%"></i>
      <span>${row.time}</span>
    </div>
  `).join("")}</div>`;
}

function reportHeatmap(day) {
  const heat = day.buckets.heatmap.slice(0, 10);
  const labels = day.buckets.labels;
  const values = heat.flatMap((row) => row.values);
  const max = Math.max(...values, 1);
  let html = `<div class="report-heat"><span class="head">标的</span>`;
  html += labels.map((label) => `<span class="head">${label.slice(0, 2)}</span>`).join("");
  for (const row of heat) {
    html += `<span class="sym">${escapeHtml(row.symbol)}</span>`;
    html += row.values.map((value) => {
      if (!value) return `<span style="background:#f4f1e9;color:#817b70">-</span>`;
      const level = value / max;
      const bg = blend([247, 244, 236], [166, 106, 18], level);
      const fg = level > 0.54 ? "#fff" : "#191713";
      return `<span style="background:${bg};color:${fg}">${fmt1.format(value / 10000)}</span>`;
    }).join("");
  }
  html += "</div>";
  return html;
}

async function exportReportPng(date) {
  const button = $("downloadReport");
  const report = $("reportCanvas");
  if (!window.html2canvas) {
    alert("PNG renderer not loaded.");
    return;
  }
  try {
    button.disabled = true;
    button.innerHTML = `<span aria-hidden="true">↓</span>生成中`;
    if (document.fonts?.ready) await document.fonts.ready;
    const canvas = await window.html2canvas(report, {
      backgroundColor: "#ffffff",
      scale: Math.min(3, Math.max(2, window.devicePixelRatio || 2)),
      useCORS: true,
      logging: false,
    });
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `kzg-option-house-${date}.png`;
    document.body.appendChild(link);
    link.click();
    link.remove();
  } finally {
    button.disabled = false;
    button.innerHTML = `<span aria-hidden="true">↓</span>导出 PNG`;
  }
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
