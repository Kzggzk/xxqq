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
  proLookback: "20",
  focusSymbol: null,
  plan: "free",
  selectedPlan: "pro",
  selectedRail: "stripe",
  selectedLogin: "email",
  checkoutMessage: "",
  lang: localStorage.getItem("kzg-option-house-lang") || "zh",
  theme: localStorage.getItem("kzg-option-house-theme") || "light",
};

const UI_VERSION = "v63";

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
    rotation: "标的轮动扩散",
    rotationSub: "相对 20 日均量的升温与降温标的。",
    momentum: "核心标的动量",
    momentumSub: "悬停标的查看跨日成交小图。",
    symbolFocus: "标的聚焦",
    symbolFocusSub: "点击任意标的锁定 90 日成交、权利金与 CP 结构。",
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
    loginPro: "登录 / Pro",
    proActive: "Pro 已启用",
    latestFree: "今日免费",
    historyLocked: "历史回看已锁定",
    upgrade: "升级 Pro",
    preview: "功能预览",
    accountTitle: "KZG Option House Pro",
    accountSub: "当前为产品接入阶段：可看到登录、套餐、支付轨道和锁层体验；真实扣费与域名购买前会再次确认。",
    paywallTitle: "Pro 回看已上锁",
    paywallSub: "今天的读盘免费开放；历史日期、预测式回看、轮动象限深挖和无水印导出进入 Pro。",
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
    rotation: "Symbol Rotation",
    rotationSub: "Warming and cooling symbols versus their 20-session average.",
    momentum: "Core Symbol Momentum",
    momentumSub: "Hover a symbol for its cross-day mini chart.",
    symbolFocus: "Symbol Lens",
    symbolFocusSub: "Click any symbol to lock its 90-session volume, premium, and CP structure.",
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
    loginPro: "Log in / Pro",
    proActive: "Pro active",
    latestFree: "Today is free",
    historyLocked: "History locked",
    upgrade: "Upgrade Pro",
    preview: "Feature preview",
    accountTitle: "KZG Option House Pro",
    accountSub: "Product wiring phase: login, pricing, payment rails, and locked-preview UX are visible. Real charges and domain purchase require explicit confirmation.",
    paywallTitle: "Pro history is locked",
    paywallSub: "Today stays free; historical dates, predictive lookbacks, rotation quadrant deep dives, and watermark-free export move behind Pro.",
  },
};

const pricingPlans = [
  {
    id: "starter",
    zh: { name: "Starter", price: "$9.99", cycle: "/月", desc: "历史日报回看、基础轮动、PNG 导出。" },
    en: { name: "Starter", price: "$9.99", cycle: "/mo", desc: "Historical daily sheets, basic rotation, PNG export." },
  },
  {
    id: "pro",
    featured: true,
    zh: { name: "Pro", price: "$29.99", cycle: "/月", desc: "预测式动量、轮动象限深挖、无水印导出。" },
    en: { name: "Pro", price: "$29.99", cycle: "/mo", desc: "Predictive momentum, quadrant deep dive, watermark-free export." },
  },
  {
    id: "quarterly",
    zh: { name: "Quarterly", price: "$49.99", cycle: "/季度", desc: "季度访问权，适合短线密集使用。" },
    en: { name: "Quarterly", price: "$49.99", cycle: "/quarter", desc: "Quarterly access for active research cycles." },
  },
  {
    id: "lifetime",
    zh: { name: "Lifetime", price: "$199", cycle: "一次性", desc: "早鸟终身席位，后续高级功能另行分层。" },
    en: { name: "Lifetime", price: "$199", cycle: "once", desc: "Early lifetime seat; future advanced tiers can be separated." },
  },
];

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
    const payload = await decodePack(window.__KZG_PACK__);
    scrubPackedRuntime();
    return payload;
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

function scrubPackedRuntime() {
  try {
    window.__KZG_PACK__ = "";
    window.__KZG_PACK_META__ = { loaded: true };
    document.querySelectorAll('script[src*="kzg-frame"], script[src*="kzg-pack"]').forEach((script) => {
      script.removeAttribute("src");
      script.dataset.kzgLoaded = "true";
    });
  } catch {
    // Protection friction only; never block the dashboard if a browser refuses DOM mutation.
  }
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
  $("signalBoard").addEventListener("click", (event) => {
    const target = event.target.closest("[data-jump-date]");
    if (target) loadDayByDate(target.dataset.jumpDate);
  });
  $("regimeMap").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-date]");
    if (button) loadDayByDate(button.dataset.date);
  });
  $("sessionTape").addEventListener("click", (event) => {
    const target = event.target.closest("[data-jump-date]");
    if (target) loadDayByDate(target.dataset.jumpDate);
  });
  $("symbolFocus").addEventListener("click", (event) => {
    const target = event.target.closest("[data-jump-date]");
    if (target) loadDayByDate(target.dataset.jumpDate);
  });
  document.addEventListener("click", (event) => {
    const target = event.target.closest("[data-symbol]");
    if (!target || target.closest("input, textarea, [contenteditable='true']")) return;
    const symbol = target.dataset.symbol;
    if (!symbol || !state.day) return;
    state.focusSymbol = symbol;
    renderSymbolFocus();
    syncSymbolActive();
  });
  $("goToday").addEventListener("click", () => loadDayByIndex(state.datesAsc.length - 1));
  $("themeToggle").addEventListener("click", toggleTheme);
  $("langToggle").addEventListener("click", toggleLang);
  $("accountButton").addEventListener("click", openAccountModal);
  document.querySelectorAll("[data-close-account]").forEach((node) => {
    node.addEventListener("click", closeAccountModal);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeAccountModal();
  });
  document.addEventListener("click", (event) => {
    const openTarget = event.target.closest("[data-open-account]");
    if (openTarget) {
      event.preventDefault();
      state.checkoutMessage = openTarget.dataset.message || "";
      openAccountModal();
      return;
    }
    const checkoutTarget = event.target.closest("[data-checkout-plan]");
    if (checkoutTarget) {
      event.preventDefault();
      const plan = pricingPlans.find((item) => item.id === checkoutTarget.dataset.checkoutPlan);
      state.selectedPlan = plan?.id || state.selectedPlan;
      state.checkoutMessage = paymentNotice(plan);
      renderAccountModal();
      return;
    }
    const railTarget = event.target.closest("[data-checkout-rail]");
    if (railTarget) {
      event.preventDefault();
      state.selectedRail = railTarget.dataset.checkoutRail || state.selectedRail;
      state.checkoutMessage = railNotice(state.selectedRail);
      renderAccountModal();
      return;
    }
    const loginTarget = event.target.closest("[data-login-method]");
    if (loginTarget) {
      event.preventDefault();
      state.selectedLogin = loginTarget.dataset.loginMethod || state.selectedLogin;
      state.checkoutMessage = loginNotice(state.selectedLogin);
      renderAccountModal();
      return;
    }
    const lookbackTarget = event.target.closest("[data-pro-lookback]");
    if (lookbackTarget) {
      event.preventDefault();
      state.proLookback = lookbackTarget.dataset.proLookback || state.proLookback;
      renderPremiumPreview();
    }
  });
  window.addEventListener("resize", fitReportCanvas);
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

function isPro() {
  return state.plan === "pro";
}

function isLatestDay() {
  return state.selectedIndex >= state.datesAsc.length - 1;
}

function isHistoryLocked() {
  return !isPro() && !isLatestDay();
}

function openAccountModal() {
  const modal = $("accountModal");
  if (!modal) return;
  renderAccountModal();
  modal.hidden = false;
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeAccountModal() {
  const modal = $("accountModal");
  if (!modal || modal.hidden) return;
  modal.hidden = true;
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  state.checkoutMessage = "";
}

function renderAccountModal() {
  const target = $("accountContent");
  if (!target) return;
  const locale = state.lang === "zh" ? "zh" : "en";
  const paymentRails = state.lang === "zh"
    ? [
      ["stripe", "Stripe Checkout", "订阅与信用卡，建议用 Billing + Checkout + Customer Portal。", "首选"],
      ["wallet", "Wallet / Crypto", "钱包登录与链上收款作为第二支付轨道，先做账户映射。", "后接"],
      ["wechat", "微信支付码", "先用人工确认或二维码收款，后续再接商户 API。", "人工确认"],
    ]
    : [
      ["stripe", "Stripe Checkout", "Subscriptions and cards via Billing + Checkout + Customer Portal.", "primary"],
      ["wallet", "Wallet / Crypto", "Wallet login and crypto payments as a second rail with account mapping.", "later"],
      ["wechat", "WeChat QR", "Start with manual QR confirmation, then wire merchant APIs later.", "manual"],
    ];
  const loginMethods = state.lang === "zh"
    ? [
      ["email", "邮箱登录", "最稳的订阅账户映射，适合 Stripe Customer Portal。"],
      ["wallet", "钱包登录", "适合 Crypto rail，后续接签名验证与链上地址。"],
      ["kzg", "KZG 口令", "早期内测席位和人工白名单，可以先快跑。"],
    ]
    : [
      ["email", "Email login", "Best account mapping for Stripe Customer Portal."],
      ["wallet", "Wallet login", "For crypto rail with signature verification later."],
      ["kzg", "KZG code", "Fast early-access allowlist for manual seats."],
    ];
  const domainRows = [
    ["optionflowhouse.com", "$11.99", state.lang === "zh" ? "可注册" : "available"],
    ["optionpulse.ai", "$159.98", state.lang === "zh" ? "可注册" : "available"],
    ["flowgamma.com", "--", state.lang === "zh" ? "已被注册" : "taken"],
  ];
  target.innerHTML = `
    <div class="account-hero">
      <span>${isPro() ? t("proActive") : t("loginPro")}</span>
      <h2 id="accountTitle">${t("accountTitle")}</h2>
      <p>${t("accountSub")}</p>
    </div>
    <div class="account-status-grid">
      ${accountStatusCards()}
    </div>
    <div class="account-grid">
      <section class="pricing-panel">
        <div class="account-section-head">
          <b>${state.lang === "zh" ? "登录方式" : "Login method"}</b>
          <span>${state.lang === "zh" ? "先做入口态，不写真实凭证" : "interface only, no credentials"}</span>
        </div>
        <div class="login-method-grid">
          ${loginMethods.map((row) => `
            <button type="button" class="${row[0] === state.selectedLogin ? "active" : ""}" data-login-method="${escapeHtml(row[0])}">
              <b>${escapeHtml(row[1])}</b>
              <span>${escapeHtml(row[2])}</span>
            </button>
          `).join("")}
        </div>
        <div class="account-section-head">
          <b>${state.lang === "zh" ? "套餐" : "Plans"}</b>
          <span>${state.lang === "zh" ? "先搭结构，真实扣费待确认" : "Structure first, real billing later"}</span>
        </div>
        <div class="pricing-grid">
          ${pricingPlans.map((plan) => {
            const text = plan[locale];
            return `
              <button type="button" class="price-card ${plan.featured ? "featured" : ""} ${plan.id === state.selectedPlan ? "active" : ""}" data-checkout-plan="${plan.id}">
                <span>${escapeHtml(text.name)}</span>
                <strong>${escapeHtml(text.price)} <small>${escapeHtml(text.cycle)}</small></strong>
                <p>${escapeHtml(text.desc)}</p>
              </button>
            `;
          }).join("")}
        </div>
        <div class="checkout-note ${state.checkoutMessage ? "visible" : ""}">
          ${escapeHtml(state.checkoutMessage || (state.lang === "zh" ? "点击套餐会显示对应支付接入轨道；不会发起真实扣费。" : "Click a plan to preview payment wiring; no real charge will be started."))}
        </div>
      </section>
      <section class="billing-panel">
        <div class="account-section-head">
          <b>${state.lang === "zh" ? "支付轨道" : "Payment rails"}</b>
          <span>${state.lang === "zh" ? "可接入路线" : "wiring path"}</span>
        </div>
        ${paymentRails.map((row) => `
          <button type="button" class="billing-row ${row[0] === state.selectedRail ? "active" : ""}" data-checkout-rail="${escapeHtml(row[0])}">
            <b>${escapeHtml(row[1])}</b>
            <span>${escapeHtml(row[2])}</span>
            <i>${escapeHtml(row[3])}</i>
          </button>
        `).join("")}
        <div class="account-section-head domain-head">
          <b>${state.lang === "zh" ? "域名候选" : "Domain candidates"}</b>
          <span>${state.lang === "zh" ? "已查可用性，购买前需你确认" : "availability checked; purchase needs confirmation"}</span>
        </div>
        ${domainRows.map((row) => `
          <div class="domain-row">
            <b>${escapeHtml(row[0])}</b>
            <span>${escapeHtml(row[1])}</span>
            <i>${escapeHtml(row[2])}</i>
          </div>
        `).join("")}
      </section>
    </div>
    <div class="entitlement-matrix">
      <div class="account-section-head">
        <b>${state.lang === "zh" ? "免费版 vs Pro 权限" : "Free vs Pro entitlement"}</b>
        <span>${state.lang === "zh" ? "真实鉴权上线前仍需服务端确认" : "server-side entitlement needed before real launch"}</span>
      </div>
      ${entitlementRows()}
    </div>
  `;
}

function accountStatusCards() {
  const plan = pricingPlans.find((item) => item.id === state.selectedPlan) || pricingPlans[1];
  const locale = state.lang === "zh" ? "zh" : "en";
  const railLabel = {
    stripe: "Stripe",
    wallet: "Wallet",
    wechat: state.lang === "zh" ? "微信" : "WeChat",
  }[state.selectedRail] || "Stripe";
  const loginLabel = {
    email: state.lang === "zh" ? "邮箱" : "Email",
    wallet: "Wallet",
    kzg: state.lang === "zh" ? "KZG 口令" : "KZG code",
  }[state.selectedLogin] || "Email";
  const locked = isHistoryLocked();
  const rows = state.lang === "zh"
    ? [
      ["当前访问", locked ? "历史锁定" : "今日开放", state.day?.tradeDate || "--"],
      ["选择套餐", plan[locale].name, `${plan[locale].price}${plan[locale].cycle}`],
      ["登录身份", loginLabel, "真实凭证不在前端存放"],
      ["结算轨道", railLabel, "扣费前停下确认"],
      ["导出权限", isPro() ? "无水印" : "品牌水印", "PNG 样式保持 KZG 旧日报"],
    ]
    : [
      ["Access", locked ? "History locked" : "Today open", state.day?.tradeDate || "--"],
      ["Selected plan", plan[locale].name, `${plan[locale].price}${plan[locale].cycle}`],
      ["Identity", loginLabel, "no real credentials in frontend"],
      ["Rail", railLabel, "confirmation before billing"],
      ["Export", isPro() ? "Clean" : "Branded", "PNG keeps the KZG sheet style"],
    ];
  return rows.map((row) => `
    <span>
      <i>${escapeHtml(row[0])}</i>
      <b>${escapeHtml(row[1])}</b>
      <small>${escapeHtml(row[2])}</small>
    </span>
  `).join("");
}

function entitlementRows() {
  const rows = state.lang === "zh"
    ? [
      ["当日核心数据", "开放", "开放", "最新交易日完整读盘，作为免费入口。"],
      ["历史日期回看", "模糊预览", "完整交互", "跨日趋势、轮动象限、动量回看进入 Pro。"],
      ["预测式结构信号", "摘要", "完整", "趋势窗口、极值、标的节奏带和 hover 细节。"],
      ["PNG 导出", "KZG 品牌版", "可接无额外水印", "当前仍保留旧 KZG 日报格式。"],
      ["订阅与提醒", "不可用", "待接", "后续接邮箱、微信或钱包身份提醒。"],
    ]
    : [
      ["Latest session", "Open", "Open", "The latest full read stays as the free entry."],
      ["Historical lookback", "Blur preview", "Full interaction", "Trend, rotation quadrant, and momentum history move to Pro."],
      ["Predictive structure", "Summary", "Full", "Trend windows, extremes, symbol rhythm, and hover detail."],
      ["PNG export", "KZG branded", "Clean path", "Current sheet style remains the original KZG format."],
      ["Alerts", "Unavailable", "Queued", "Later via email, WeChat, or wallet identity."],
    ];
  return `
    <div class="entitlement-head-row">
      <span>${state.lang === "zh" ? "功能" : "Feature"}</span>
      <span>Free</span>
      <span>Pro</span>
      <span>${state.lang === "zh" ? "说明" : "Notes"}</span>
    </div>
    ${rows.map((row, index) => `
      <div class="entitlement-row ${index === 0 ? "open" : index >= 1 && index <= 3 ? "locked" : "queued"}">
        <b>${escapeHtml(row[0])}</b>
        <span>${escapeHtml(row[1])}</span>
        <strong>${escapeHtml(row[2])}</strong>
        <small>${escapeHtml(row[3])}</small>
      </div>
    `).join("")}
  `;
}

function paymentNotice(plan) {
  const name = plan?.[state.lang === "zh" ? "zh" : "en"]?.name || "Pro";
  if (state.lang !== "zh") {
    return `${name}: selected. Next step is ${state.selectedRail === "stripe" ? "Stripe Billing Checkout Session + Customer Portal" : "account-mapped manual payment intake"}. Wallet and WeChat rails need account/payment credentials, so I will ask before touching real money.`;
  }
  return `${name}：已选中。下一步是${state.selectedRail === "stripe" ? "接 Stripe Billing Checkout Session + Customer Portal" : "做账号映射后的人工收款入口"}。钱包与微信支付需要账号/收款配置，涉及真钱前我会停下让你确认。`;
}

function railNotice(rail) {
  if (state.lang !== "zh") {
    if (rail === "wallet") return "Wallet rail selected: this needs wallet identity mapping and a payment-confirmation backend before launch.";
    if (rail === "wechat") return "WeChat QR selected: this can start as manual confirmation, then move to merchant APIs after credentials are ready.";
    return "Stripe rail selected: recommended path is Billing Checkout Session, webhook entitlement sync, and Customer Portal.";
  }
  if (rail === "wallet") return "已选择 Wallet / Crypto：上线前需要钱包身份映射和付款确认后端。";
  if (rail === "wechat") return "已选择微信支付码：可以先人工确认收款，后续再接商户 API。";
  return "已选择 Stripe：推荐路线是 Billing Checkout Session、webhook 权限同步和 Customer Portal。";
}

function loginNotice(method) {
  if (state.lang !== "zh") {
    if (method === "wallet") return "Wallet login selected: this is only UI until signature verification and account mapping are added.";
    if (method === "kzg") return "KZG code selected: suitable for early-access allowlists before automated billing is live.";
    return "Email login selected: best default for Stripe subscriptions and Customer Portal mapping.";
  }
  if (method === "wallet") return "已选择钱包登录：目前只是入口态，后续需要签名验证和账户映射。";
  if (method === "kzg") return "已选择 KZG 口令：适合内测白名单，自动订阅上线前可以先快跑。";
  return "已选择邮箱登录：最适合 Stripe 订阅和 Customer Portal 账户映射。";
}

function renderAccessStrip() {
  const target = $("accessStrip");
  if (!target || !state.day) return;
  const locked = isHistoryLocked();
  const latest = isLatestDay();
  const label = isPro() ? t("proActive") : latest ? t("latestFree") : t("historyLocked");
  const sub = isPro()
    ? (state.lang === "zh" ? "历史回看、预测式动量、无水印导出已开放。" : "History, predictive momentum, and clean exports are open.")
    : latest
      ? (state.lang === "zh" ? "当前交易日完整开放；历史日期会显示 Pro 模糊预览。" : "Latest trading day is open; history shows Pro blurred previews.")
      : t("paywallSub");
  target.innerHTML = `
    <div class="access-copy ${locked ? "locked" : "open"}">
      <span>${escapeHtml(label)}</span>
      <b>${escapeHtml(state.day.tradeDate)}</b>
      <small>${escapeHtml(sub)}</small>
    </div>
    <div class="access-actions">
      <button type="button" data-open-account>${t("upgrade")}</button>
      <button type="button" data-open-account data-message="${escapeHtml(state.lang === "zh" ? "Pro 导出路线：登录后导出无额外水印版本；免费版保留 KZG 品牌植入。" : "Pro export path: clean export after login; free export keeps KZG branding.")}">${state.lang === "zh" ? "无水印导出" : "Clean export"}</button>
    </div>
  `;
}

function renderPremiumPreview() {
  const target = $("premiumPreview");
  if (!target || !state.day) return;
  const locked = !isPro() && !isLatestDay();
  const rows = symbolRotationRows();
  const attack = rows.filter((row) => row.delta >= 0 && row.premiumDelta >= 0);
  const fade = rows.filter((row) => row.delta < 0 && row.premiumDelta < 0);
  const lead = attack.slice().sort((a, b) => (b.delta + b.premiumDelta) - (a.delta + a.premiumDelta))[0] || rows[0] || {};
  const buckets = state.day.buckets.market || [];
  const maxBucket = buckets.reduce((best, row) => Number(row.total) > Number(best.total || 0) ? row : best, buckets[0] || {});
  const allRows = uniqueSymbolRows();
  const premiumLead = allRows.reduce((best, row) => Number(row.premiumNotional) > Number(best.premiumNotional) ? row : best, allRows[0] || {});
  target.innerHTML = `
    <div class="premium-head">
      <div>
        <h2>${state.lang === "zh" ? "Pro 情报层" : "Pro intelligence layer"}</h2>
        <p>${state.lang === "zh" ? "今日交易日免费展示核心能力；历史回看进入 Pro 模糊预览。" : "Latest session shows the core layer for free; historical lookback moves into Pro blur."}</p>
      </div>
      <button type="button" data-open-account>${locked ? t("upgrade") : (state.lang === "zh" ? "查看 Pro" : "View Pro")}</button>
    </div>
    <div class="premium-grid ${locked ? "is-blurred" : ""}">
      ${premiumCard(state.lang === "zh" ? "轮动象限回看" : "Rotation lookback", lead.symbol || "--", `${attack.length}/${fade.length}`, state.lang === "zh" ? "量价同升 vs 同步降温" : "warming vs cooling")}
      ${premiumCard(state.lang === "zh" ? "异常分钟雷达" : "Anomaly minute radar", maxBucket.time || "--", wan(maxBucket.total || 0), state.lang === "zh" ? "峰值桶 + 历史偏离" : "peak bucket + history drift")}
      ${premiumCard(state.lang === "zh" ? "权利金追踪" : "Premium tracking", premiumLead.symbol || "--", moneyCompact(premiumLead.premiumNotional), state.lang === "zh" ? "资金锚点与变化率" : "premium anchor and velocity")}
      ${premiumCard(state.lang === "zh" ? "订阅组合监控" : "Watchlist alerts", "SPY / NVDA", state.lang === "zh" ? "待接" : "queued", state.lang === "zh" ? "邮件/微信/钱包身份后续接入" : "email/WeChat/wallet identity later")}
    </div>
    ${premiumLookbackPanel(locked)}
    ${premiumQuadrantPreview(rows, locked)}
    ${locked ? `<button type="button" class="premium-lock" data-open-account><b>${t("paywallTitle")}</b><span>${t("paywallSub")}</span></button>` : ""}
  `;
}

function premiumLookbackPanel(locked) {
  const daily = state.analytics?.daily || state.datesAsc || [];
  const end = state.selectedIndex;
  const windows = ["5", "20", "60", "all"];
  const requested = state.proLookback === "all" ? daily.length : Number(state.proLookback) || 20;
  const rows = daily.slice(Math.max(0, end - requested + 1), end + 1);
  const fallback = rows.length ? rows : [state.datesAsc[end]].filter(Boolean);
  const first = fallback[0] || {};
  const last = fallback[fallback.length - 1] || {};
  const volumeMove = first.totalVol ? ((Number(last.totalVol) - Number(first.totalVol)) / Number(first.totalVol)) * 100 : 0;
  const premiumMove = first.totalPremium ? ((Number(last.totalPremium) - Number(first.totalPremium)) / Number(first.totalPremium)) * 100 : 0;
  const cpMove = (Number(last.marketCp) || 0) - (Number(first.marketCp) || 0);
  const avgVol = average(fallback.map((row) => row.totalVol));
  const lastVol = Number(last.totalVol) || 0;
  const heat = avgVol ? ((lastVol - avgVol) / avgVol) * 100 : 0;
  const topDate = fallback.reduce((best, row) => Number(row.totalVol) > Number(best.totalVol || 0) ? row : best, fallback[0] || {});
  const cpHigh = fallback.reduce((best, row) => Number(row.marketCp) > Number(best.marketCp || 0) ? row : best, fallback[0] || {});
  const cpLow = fallback.reduce((best, row) => Number(row.marketCp) < Number(best.marketCp || Infinity) ? row : best, fallback[0] || {});
  const bars = fallback.slice(-24);
  const maxVol = Math.max(...bars.map((row) => Number(row.totalVol) || 0), 1);
  const tone = heat >= 10 || volumeMove >= 10 ? "hot" : heat <= -10 || volumeMove <= -10 ? "cool" : "flat";
  const title = state.lang === "zh" ? "预测回看窗口" : "Predictive lookback";
  const summary = state.lang === "zh"
    ? `${windowLabel(state.proLookback)} 里成交 ${volumeMove >= 0 ? "+" : ""}${fmt1.format(volumeMove)}%，权利金 ${premiumMove >= 0 ? "+" : ""}${fmt1.format(premiumMove)}%，CP 漂移 ${cpMove >= 0 ? "+" : ""}${fmt2.format(cpMove)}。`
    : `${windowLabel(state.proLookback)} volume ${volumeMove >= 0 ? "+" : ""}${fmt1.format(volumeMove)}%, premium ${premiumMove >= 0 ? "+" : ""}${fmt1.format(premiumMove)}%, CP drift ${cpMove >= 0 ? "+" : ""}${fmt2.format(cpMove)}.`;
  return `
    <div class="premium-lookback ${locked ? "is-blurred" : ""}">
      <div class="lookback-head ${tone}">
        <div>
          <span>${state.lang === "zh" ? "Pro 回看" : "Pro lookback"}</span>
          <strong>${title}</strong>
          <p>${summary}</p>
        </div>
        <div class="lookback-tabs" aria-label="${escapeHtml(title)}">
          ${windows.map((item) => `
            <button type="button" class="${state.proLookback === item ? "active" : ""}" data-pro-lookback="${item}">
              ${windowLabel(item)}
            </button>
          `).join("")}
        </div>
      </div>
      <div class="lookback-body">
        <div class="lookback-chart" aria-hidden="true">
          ${bars.map((row, index) => {
            const prev = bars[index - 1];
            const move = prev?.totalVol ? ((Number(row.totalVol) - Number(prev.totalVol)) / Number(prev.totalVol)) * 100 : 0;
            const cls = move >= 8 ? "hot" : move <= -8 ? "cool" : "flat";
            const height = Math.max(12, ((Number(row.totalVol) || 0) / maxVol) * 100);
            return `<span class="${cls}" style="--h:${height.toFixed(1)}%"><i></i><b>${index % 5 === 0 || index === bars.length - 1 ? shortDate(row.date) : ""}</b></span>`;
          }).join("")}
        </div>
        <div class="lookback-metrics">
          ${lookbackMetric(state.lang === "zh" ? "窗口均量" : "Avg volume", wan(avgVol), `${heat >= 0 ? "+" : ""}${fmt1.format(heat)}%`, tone)}
          ${lookbackMetric(state.lang === "zh" ? "成交峰值" : "Volume peak", shortDate(topDate.date || last.date || ""), wan(topDate.totalVol || 0), "hot")}
          ${lookbackMetric("CP High", shortDate(cpHigh.date || last.date || ""), ratio(cpHigh.marketCp), "flat")}
          ${lookbackMetric("CP Low", shortDate(cpLow.date || last.date || ""), ratio(cpLow.marketCp), "cool")}
        </div>
      </div>
    </div>
  `;
}

function windowLabel(value) {
  if (value === "all") return state.lang === "zh" ? "ALL" : "ALL";
  return `${value}D`;
}

function lookbackMetric(label, value, sub, tone) {
  return `
    <span class="${tone}">
      <i>${escapeHtml(label)}</i>
      <b>${escapeHtml(String(value || "--"))}</b>
      <small>${escapeHtml(String(sub || "--"))}</small>
    </span>
  `;
}

function premiumQuadrantPreview(rows, locked) {
  const sample = rows.slice(0, 42);
  if (!sample.length) return "";
  const attack = rows.filter((row) => row.delta >= 0 && row.premiumDelta >= 0);
  const volumeOnly = rows.filter((row) => row.delta >= 0 && row.premiumDelta < 0);
  const premiumOnly = rows.filter((row) => row.delta < 0 && row.premiumDelta >= 0);
  const fade = rows.filter((row) => row.delta < 0 && row.premiumDelta < 0);
  const lead = attack.slice().sort((a, b) => (b.delta + b.premiumDelta * 0.5) - (a.delta + a.premiumDelta * 0.5))[0] || sample[0] || {};
  const breadth = rows.length ? (attack.length / rows.length) * 100 : 0;
  const xValues = sample.map((row) => Number(row.delta) || 0);
  const yValues = sample.map((row) => Number(row.premiumDelta) || 0);
  const xMin = Math.min(-40, ...xValues);
  const xMax = Math.max(40, ...xValues);
  const yMin = Math.min(-60, ...yValues);
  const yMax = Math.max(60, ...yValues);
  const xSpan = Math.max(1, xMax - xMin);
  const ySpan = Math.max(1, yMax - yMin);
  const xZero = Math.max(0, Math.min(100, ((0 - xMin) / xSpan) * 100));
  const yZero = Math.max(0, Math.min(100, 100 - ((0 - yMin) / ySpan) * 100));
  const maxVol = Math.max(...sample.map((row) => Number(row.totalVol) || 0), 1);
  const statRows = [
    [state.lang === "zh" ? "量价同升" : "Both warming", attack.length, attack[0]?.symbol, "hot"],
    [state.lang === "zh" ? "权利金先行" : "Premium first", premiumOnly.length, premiumOnly[0]?.symbol, "flat"],
    [state.lang === "zh" ? "量能先行" : "Volume first", volumeOnly.length, volumeOnly[0]?.symbol, "flat"],
    [state.lang === "zh" ? "同步降温" : "Cooling", fade.length, fade[0]?.symbol, "cool"],
  ];
  return `
    <div class="premium-quadrant ${locked ? "is-blurred" : ""}">
      <div class="premium-quadrant-copy">
        <span>${locked ? t("historyLocked") : t("latestFree")}</span>
        <strong>${state.lang === "zh" ? "轮动象限图" : "Rotation quadrant"}</strong>
        <p>${state.lang === "zh" ? `当日核心信号开放：${lead.symbol || "--"} 处在主导象限。历史日期点击升级后回看。` : `Latest core signal is open: ${lead.symbol || "--"} leads the dominant quadrant. Historical dates unlock after upgrade.`}</p>
        <div class="premium-quadrant-meta">
          <span><i>${state.lang === "zh" ? "主导" : "Leader"}</i><b>${escapeHtml(lead.symbol || "--")}</b></span>
          <span><i>${state.lang === "zh" ? "扩散" : "Breadth"}</i><b>${fmt1.format(breadth)}%</b></span>
          <span><i>${state.lang === "zh" ? "成交" : "Volume"}</i><b>${wan(lead.totalVol || 0)}</b></span>
          <span><i>${state.lang === "zh" ? "权利金" : "Premium"}</i><b>${lead.premiumDelta >= 0 ? "+" : ""}${fmt1.format(lead.premiumDelta || 0)}%</b></span>
        </div>
      </div>
      <div class="premium-quadrant-map" style="--x0:${xZero.toFixed(1)}%;--y0:${yZero.toFixed(1)}%">
        <i class="axis-x"></i>
        <i class="axis-y"></i>
        <span class="q q1">${state.lang === "zh" ? "量价同升" : "warming"}</span>
        <span class="q q2">${state.lang === "zh" ? "权利金先行" : "premium"}</span>
        <span class="q q3">${state.lang === "zh" ? "同步降温" : "cooling"}</span>
        <span class="q q4">${state.lang === "zh" ? "量能先行" : "volume"}</span>
        ${sample.map((row) => {
          const x = Math.max(8, Math.min(92, ((Number(row.delta) - xMin) / xSpan) * 100));
          const y = Math.max(10, Math.min(90, 100 - ((Number(row.premiumDelta) - yMin) / ySpan) * 100));
          const size = Math.max(24, Math.min(52, 20 + ((Number(row.totalVol) || 0) / maxVol) * 34));
          const tone = row.delta >= 0 && row.premiumDelta >= 0 ? "hot" : row.delta < 0 && row.premiumDelta < 0 ? "cool" : "flat";
          return `<button type="button" class="${tone}" data-symbol="${escapeHtml(row.symbol)}" style="--x:${x.toFixed(1)}%;--y:${y.toFixed(1)}%;--s:${size.toFixed(0)}px">${escapeHtml(row.symbol)}</button>`;
        }).join("")}
      </div>
      <div class="premium-quadrant-stats">
        ${statRows.map((row) => `
          <span class="${row[3]}">
            <i>${escapeHtml(row[0])}</i>
            <b>${fmt0.format(row[1])}</b>
            <small>${escapeHtml(row[2] || "--")}</small>
          </span>
        `).join("")}
      </div>
    </div>
  `;
}

function premiumCard(label, value, sub, foot) {
  return `
    <article class="premium-card">
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(String(value || "--"))}</strong>
      <b>${escapeHtml(String(sub || "--"))}</b>
      <small>${escapeHtml(String(foot || ""))}</small>
    </article>
  `;
}

function applyAccessState() {
  document.body.dataset.plan = isPro() ? "pro" : "free";
  document.body.dataset.historyLocked = isHistoryLocked() ? "true" : "false";
  const accountText = $("accountButtonText");
  if (accountText) accountText.textContent = isPro() ? t("proActive") : t("loginPro");
  const locked = isHistoryLocked();
  const gated = [
    [".trend-panel", state.lang === "zh" ? "跨日趋势回看" : "Cross-day trend"],
    [".signal-panel", state.lang === "zh" ? "预测式结构读盘" : "Predictive structure"],
    [".regime-panel", state.lang === "zh" ? "温度带历史" : "Regime history"],
    [".rotation-panel", state.lang === "zh" ? "轮动象限深挖" : "Rotation deep dive"],
    [".momentum-panel", state.lang === "zh" ? "标的动量回看" : "Symbol momentum history"],
  ];
  for (const [selector, label] of gated) {
    const panel = document.querySelector(selector);
    if (!panel) continue;
    panel.classList.toggle("is-pro-locked", locked);
    let overlay = panel.querySelector(".pro-lock-overlay");
    if (locked && !overlay) {
      overlay = document.createElement("button");
      overlay.type = "button";
      overlay.className = "pro-lock-overlay";
      overlay.setAttribute("data-open-account", "");
      panel.appendChild(overlay);
    }
    if (overlay) {
      overlay.hidden = !locked;
      overlay.innerHTML = `<b>${escapeHtml(label)}</b><span>${t("paywallSub")}</span>`;
    }
  }
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
  const monthStep = monthGroups.length > 22 ? 4 : monthGroups.length > 15 ? 3 : monthGroups.length > 10 ? 2 : 1;
  monthTicks.innerHTML = monthGroups.map((group, index) => {
    const [year, month] = group.month.split("-");
    const isYearStart = month === "01";
    const isEdge = index === 0 || index === monthGroups.length - 1;
    const show = isEdge || isYearStart || index % monthStep === 0;
    const label = timelineMonthLabel(year, month, isEdge || isYearStart);
    return `<span class="${isYearStart ? "year" : ""}">${show ? label : ""}</span>`;
  }).join("");

  const maxVol = Math.max(...state.datesAsc.map((item) => Number(item.totalVol) || 0), 1);
  const dayBars = $("dayBars");
  dayBars.style.gridTemplateColumns = `repeat(${state.datesAsc.length}, minmax(0, 1fr))`;
  dayBars.innerHTML = state.datesAsc.map((item, index) => {
    const height = 6 + ((Number(item.totalVol) || 0) / maxVol) * 30;
    return `<button type="button" data-index="${index}" style="--h:${height.toFixed(1)}px" title="${item.date} · ${wan(item.totalVol)}"></button>`;
  }).join("");
}

function timelineMonthLabel(year, month, showYear) {
  const m = Number(month);
  if (state.lang === "zh") return showYear ? `${year.slice(2)}年${m}月` : `${m}月`;
  return showYear ? `${year.slice(2)}/${month}` : month;
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
  $("sourcePath").textContent = `KZG packed · UI ${UI_VERSION}`;
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
  ensureFocusSymbol();

  $("downloadReport").onclick = () => exportReportPng(day.tradeDate);
  renderSessionTape(delta);
  renderAccessStrip();
  renderDigest();
  renderReportCanvas();
  renderBuckets();
  renderHeatmap();
  renderTrend();
  renderSignalBoard();
  renderRegimeMap();
  renderStockTable();
  renderSideIntel();
  renderSymbolFocus();
  renderSymbolRotation();
  renderSymbolMomentum();
  renderPremiumPreview();
  renderStaticCopy();
  applyAccessState();
  syncSymbolActive();
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
  $("rotationTitle").textContent = t("rotation");
  $("rotationSub").textContent = t("rotationSub");
  document.querySelector(".side-rail .section-head h2").textContent = t("digest");
  document.querySelector(".side-rail .section-head p").textContent = t("digestSub");
  document.querySelector(".search-wrap span").textContent = t("filter");
  document.querySelector(".mini-head b").textContent = t("stockTop");
  document.querySelector(".mini-head span").textContent = t("volumeRank");
  $("momentumTitle").textContent = t("momentum");
  $("momentumSub").textContent = t("momentumSub");
}

function renderSessionTape(delta) {
  const target = $("sessionTape");
  if (!target || !state.day) return;
  const ov = state.day.overview;
  const rows20 = (state.analytics?.daily || []).slice(Math.max(0, state.selectedIndex - 20), state.selectedIndex);
  const avg20 = average(rows20.map((row) => row.totalVol));
  const volumeDelta20 = avg20 ? ((Number(ov.totalVol) - avg20) / avg20) * 100 : 0;
  const buckets = state.day.buckets.market || [];
  const bucketTotal = buckets.reduce((sum, row) => sum + (Number(row.total) || 0), 0) || 1;
  const openShare = bucketShare(buckets, [0, 1], bucketTotal);
  const closeShare = bucketShare(buckets, [buckets.length - 2, buckets.length - 1], bucketTotal);
  const dominant = dominantCategory(ov.category, ov.totalVol);
  const allRows = uniqueSymbolRows();
  const topSymbol = allRows[0] || {};
  const premiumLead = allRows.reduce((best, row) => Number(row.premiumNotional) > Number(best.premiumNotional) ? row : best, allRows[0] || {});
  const cpLead = allRows.reduce((best, row) => Number(row.cpRatio) > Number(best.cpRatio) ? row : best, allRows[0] || {});
  const range = (state.analytics?.daily || []).slice(Math.max(0, state.selectedIndex - 27), state.selectedIndex + 1);
  const high = range.reduce((best, row) => Number(row.totalVol) > Number(best.totalVol) ? row : best, range[0] || {});
  const tapeTone = volumeDelta20 >= 12 || Number(ov.marketCp) >= 1.55 ? "hot" : volumeDelta20 <= -12 || Number(ov.marketCp) <= 0.95 ? "cool" : "flat";
  const rhythm = closeShare > openShare ? (state.lang === "zh" ? "尾盘强于开盘" : "close leads open") : (state.lang === "zh" ? "开盘成交主导" : "open leads close");
  const deltaText = delta === null ? "--" : `${delta >= 0 ? "+" : ""}${fmt1.format(delta)}%`;
  target.innerHTML = `
    <div class="session-copy ${tapeTone}">
      <span>${state.lang === "zh" ? "今日读盘总线" : "Session tape"}</span>
      <strong>${sessionTapeNarrative(volumeDelta20, dominant.label, rhythm)}</strong>
      <small>${state.lang === "zh" ? "较前日" : "vs prev"} ${deltaText} · CP ${ratio(ov.marketCp)} · ${state.lang === "zh" ? "头部" : "leaders"} ${escapeHtml([topSymbol.symbol, premiumLead.symbol, cpLead.symbol].filter(Boolean).join(" / "))}</small>
    </div>
    <div class="session-chip-grid">
      ${sessionChip(state.lang === "zh" ? "量能温度" : "Volume heat", `${volumeDelta20 >= 0 ? "+" : ""}${fmt1.format(volumeDelta20)}%`, state.lang === "zh" ? "vs 20D" : "vs 20D", tapeTone)}
      ${sessionChip(state.lang === "zh" ? "主导通道" : "Dominant lane", dominant.label, `${dominant.share} · CP ${ratio(dominant.cpRatio)}`, dominant.key === "STOCK" ? "hot" : dominant.key === "INDEX" ? "cool" : "flat")}
      ${sessionChip(state.lang === "zh" ? "日内节奏" : "Intraday rhythm", rhythm, `${fmt1.format(openShare)}% / ${fmt1.format(closeShare)}%`, closeShare > openShare ? "hot" : "flat")}
      ${sessionChip(state.lang === "zh" ? "28D 高点" : "28D high", shortDate(high.date || state.day.tradeDate), wan(high.totalVol || ov.totalVol), "flat", `data-jump-date="${escapeHtml(high.date || state.day.tradeDate)}"`)}
      ${sessionChip(state.lang === "zh" ? "权利金锚" : "Premium anchor", premiumLead.symbol || "--", moneyCompact(premiumLead.premiumNotional), "flat", `data-symbol="${escapeHtml(premiumLead.symbol || "")}"`)}
      ${sessionChip(state.lang === "zh" ? "CP 极端" : "CP extreme", cpLead.symbol || "--", `CP ${ratio(cpLead.cpRatio)}`, "hot", `data-symbol="${escapeHtml(cpLead.symbol || "")}"`)}
    </div>
  `;
}

function sessionTapeNarrative(volumeDelta20, lane, rhythm) {
  if (state.lang !== "zh") {
    const energy = volumeDelta20 >= 12 ? "volume expansion" : volumeDelta20 <= -12 ? "cooler volume" : "balanced volume";
    return `${energy}; ${lane} leads; ${rhythm}.`;
  }
  const energy = volumeDelta20 >= 12 ? "量能扩张" : volumeDelta20 <= -12 ? "量能降温" : "量能均衡";
  return `${energy}，${lane}主导，${rhythm}。`;
}

function sessionChip(label, value, sub, tone, attrs = "") {
  const tag = attrs ? "button" : "span";
  return `
    <${tag} class="${tone}" ${attrs}>
      <i>${escapeHtml(label)}</i>
      <b>${escapeHtml(String(value || "--"))}</b>
      <small>${escapeHtml(String(sub || "--"))}</small>
    </${tag}>
  `;
}

function renderDigest() {
  $("digest").innerHTML = state.day.digest.map((line) => `<div>${escapeHtml(line)}</div>`).join("");
}

function renderSideIntel() {
  const target = $("sideIntel");
  if (!target || !state.day) return;
  const buckets = state.day.buckets.market || [];
  const avg = trailingBucketAverage(state.selectedIndex, 20);
  const total = buckets.reduce((sum, row) => sum + (Number(row.total) || 0), 0) || 1;
  const peak = buckets.reduce((best, row) => Number(row.total) > Number(best.total) ? row : best, buckets[0] || {});
  const anomaly = buckets.reduce((best, row, index) => {
    const base = avg[index] || 0;
    const spread = base ? ((Number(row.total) - base) / base) * 100 : 0;
    const item = { ...row, spread };
    return !best || Math.abs(item.spread) > Math.abs(best.spread) ? item : best;
  }, null);
  const open = bucketShare(buckets, [0, 1], total);
  const mid = bucketShare(buckets, [5, 6, 7], total);
  const close = bucketShare(buckets, [buckets.length - 2, buckets.length - 1], total);
  const cpTilt = buckets.reduce((best, row) => bucketCp(row) > bucketCp(best) ? row : best, buckets[0] || {});
  const leaders = [
    { lane: t("index"), row: state.day.indexRows[0], tone: "cool" },
    { lane: t("etf"), row: state.day.etfRows[0], tone: "flat" },
    { lane: t("stock"), row: state.day.stockRows[0], tone: "hot" },
  ].filter((item) => item.row);
  const allRows = uniqueSymbolRows();
  const premiumLead = allRows.reduce((best, row) => Number(row.premiumNotional) > Number(best.premiumNotional) ? row : best, allRows[0] || {});
  const callLead = allRows.reduce((best, row) => Number(row.cpRatio) > Number(best.cpRatio) ? row : best, allRows[0] || {});
  const putLead = allRows.reduce((best, row) => Number(row.cpRatio) < Number(best.cpRatio) ? row : best, allRows[0] || {});
  const ov = state.day.overview;
  const lanes = [
    { label: t("index"), key: "INDEX", tone: "cool" },
    { label: t("etf"), key: "ETF", tone: "flat" },
    { label: t("stock"), key: "STOCK", tone: "hot" },
  ].map((lane) => ({ ...lane, item: ov.category[lane.key] || {} }));

  target.innerHTML = `
    <div class="side-module">
      <div class="side-module-head">
        <b>${state.lang === "zh" ? "日内节奏快读" : "Intraday Quick Read"}</b>
        <span>${state.lang === "zh" ? "30分钟桶" : "30m buckets"}</span>
      </div>
      <div class="side-flow-grid">
        ${sideMetric(state.lang === "zh" ? "峰值时段" : "Peak slot", peak.time || "--", wan(peak.total || 0), "hot")}
        ${sideMetric(state.lang === "zh" ? "异常桶" : "Outlier", anomaly?.time || "--", `${(anomaly?.spread || 0) >= 0 ? "+" : ""}${fmt1.format(anomaly?.spread || 0)}%`, (anomaly?.spread || 0) >= 0 ? "hot" : "cool")}
        ${sideMetric(state.lang === "zh" ? "尾盘/开盘" : "Close/Open", `${fmt1.format(close)}% / ${fmt1.format(open)}%`, state.lang === "zh" ? "成交占比" : "volume share", close >= open ? "hot" : "cool")}
        ${sideMetric(state.lang === "zh" ? "Call 最强" : "Call tilt", cpTilt.time || "--", `CP ${ratio(bucketCp(cpTilt))}`, bucketCp(cpTilt) >= 1.4 ? "hot" : "flat")}
      </div>
      <div class="side-bucket-strip">
        ${buckets.map((row, index) => {
          const share = (Number(row.total) || 0) / total * 100;
          const spread = avg[index] ? ((Number(row.total) - avg[index]) / avg[index]) * 100 : 0;
          const tone = spread >= 18 ? "hot" : spread <= -18 ? "cool" : "flat";
          return `<span class="${tone}" title="${escapeHtml(`${row.time} · ${wan(row.total)} · ${spread >= 0 ? "+" : ""}${fmt1.format(spread)}%`)}" style="--h:${Math.max(12, share * 4.2).toFixed(1)}%"><i>${row.time.slice(0, 2)}</i></span>`;
        }).join("")}
      </div>
      <p>${sideRhythmNarrative(open, mid, close, peak, anomaly)}</p>
    </div>
    <div class="side-module">
      <div class="side-module-head">
        <b>${state.lang === "zh" ? "头部标的路径" : "Leader Path"}</b>
        <span>${state.lang === "zh" ? "点击联动" : "click to focus"}</span>
      </div>
      <div class="side-leader-list">
        ${leaders.map((item) => sideLeaderRow(item)).join("")}
      </div>
    </div>
    <div class="side-module">
      <div class="side-module-head">
        <b>${state.lang === "zh" ? "结构拆分" : "Structure Split"}</b>
        <span>${state.lang === "zh" ? "占比 / 极值" : "share / extremes"}</span>
      </div>
      <div class="side-lane-stack">
        ${lanes.map((lane) => sideLaneRow(lane, ov.totalVol)).join("")}
      </div>
      <div class="side-extreme-list">
        ${sideExtremeButton(state.lang === "zh" ? "权利金" : "Premium", premiumLead, moneyCompact(premiumLead.premiumNotional), "flat")}
        ${sideExtremeButton(state.lang === "zh" ? "Call 极端" : "Call extreme", callLead, `CP ${ratio(callLead.cpRatio)}`, "hot")}
        ${sideExtremeButton(state.lang === "zh" ? "Put 防守" : "Put defense", putLead, `CP ${ratio(putLead.cpRatio)}`, "cool")}
      </div>
    </div>
  `;
}

function uniqueSymbolRows() {
  const seen = new Set();
  return [...state.day.indexRows, ...state.day.etfRows, ...state.day.stockRows].filter((row) => {
    if (!row?.symbol || seen.has(row.symbol)) return false;
    seen.add(row.symbol);
    return true;
  });
}

function bucketShare(rows, indexes, total) {
  return indexes.map((index) => rows[index]).filter(Boolean).reduce((sum, row) => sum + (Number(row.total) || 0), 0) / total * 100;
}

function bucketCp(row) {
  if (!row) return 0;
  const call = Number(row.call) || 0;
  const put = Number(row.put) || 0;
  return put ? call / put : call ? call : 0;
}

function sideMetric(label, value, sub, tone) {
  return `
    <span class="${tone}">
      <i>${escapeHtml(label)}</i>
      <b>${escapeHtml(String(value))}</b>
      <small>${escapeHtml(String(sub))}</small>
    </span>
  `;
}

function sideLeaderRow(item) {
  const row = item.row;
  return `
    <button type="button" class="${item.tone}" data-symbol="${escapeHtml(row.symbol)}">
      <span>${escapeHtml(item.lane)}</span>
      <b>${escapeHtml(row.symbol)}</b>
      <i>${wan(row.totalVol)} · CP ${ratio(row.cpRatio)}</i>
      <small>${moneyCompact(row.premiumNotional)} · ${escapeHtml(row.hottestShort || "--")}</small>
    </button>
  `;
}

function sideLaneRow(lane, totalVol) {
  const volume = Number(lane.item.volume) || 0;
  const share = totalVol ? (volume / totalVol) * 100 : 0;
  return `
    <span class="${lane.tone}" style="--w:${Math.max(5, share).toFixed(1)}%">
      <i>${escapeHtml(lane.label)}</i>
      <b>${fmt1.format(share)}%</b>
      <small>${wan(volume)} · CP ${ratio(lane.item.cpRatio)}</small>
      <em></em>
    </span>
  `;
}

function sideExtremeButton(label, row, value, tone) {
  return `
    <button type="button" class="${tone}" data-symbol="${escapeHtml(row.symbol || "")}">
      <span>${escapeHtml(label)}</span>
      <b>${escapeHtml(row.symbol || "--")}</b>
      <i>${escapeHtml(value || "--")}</i>
    </button>
  `;
}

function sideRhythmNarrative(open, mid, close, peak, anomaly) {
  if (state.lang !== "zh") {
    const rhythm = close > open ? "closing flow is heavier than the open" : "opening flow still dominates the session";
    return `${rhythm}; the peak bucket is ${peak?.time || "--"}, with ${anomaly?.time || "--"} showing the largest 20D deviation.`;
  }
  const rhythm = close > open ? "尾盘成交强于开盘" : "开盘成交仍是主导";
  return `${rhythm}；峰值在 ${peak?.time || "--"}，相对 20 日均值偏离最大的是 ${anomaly?.time || "--"}。`;
}

function syncSymbolActive() {
  const symbol = state.focusSymbol;
  document.querySelectorAll("[data-symbol]").forEach((node) => {
    node.classList.toggle("symbol-active", !!symbol && node.dataset.symbol === symbol);
  });
  document.querySelectorAll(".momentum-row, .rotation-row").forEach((row) => {
    row.classList.toggle("active", !!symbol && row.dataset.symbol === symbol);
  });
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
  const total = rows.reduce((sum, row) => sum + (Number(row.total) || 0), 0) || 1;
  const avgTotal = avg.reduce((sum, value) => sum + (Number(value) || 0), 0) || 1;
  const openShare = rows.slice(0, 2).reduce((sum, row) => sum + (Number(row.total) || 0), 0) / total * 100;
  const midShare = rows.slice(5, 8).reduce((sum, row) => sum + (Number(row.total) || 0), 0) / total * 100;
  const closeShare = rows.slice(-2).reduce((sum, row) => sum + (Number(row.total) || 0), 0) / total * 100;
  const anomaly = rows.reduce((best, row, index) => {
    const base = avg[index] || 0;
    const spread = base ? ((Number(row.total) - base) / base) * 100 : 0;
    return !best || Math.abs(spread) > Math.abs(best.spread) ? { time: row.time, spread } : best;
  }, null);
  $("bucketProfile").innerHTML = [
    bucketProfileCard(state.lang === "zh" ? "开盘首小时" : "Opening hour", `${fmt1.format(openShare)}%`, openShare >= 28 ? "hot" : openShare <= 16 ? "cool" : "flat"),
    bucketProfileCard(state.lang === "zh" ? "午盘吸收" : "Midday absorb", `${fmt1.format(midShare)}%`, midShare >= 24 ? "hot" : midShare <= 13 ? "cool" : "flat"),
    bucketProfileCard(state.lang === "zh" ? "尾盘首小时" : "Closing hour", `${fmt1.format(closeShare)}%`, closeShare >= 24 ? "hot" : closeShare <= 13 ? "cool" : "flat"),
    bucketProfileCard(state.lang === "zh" ? "异常桶" : "Outlier bucket", `${anomaly?.time || "--"} ${anomaly?.spread >= 0 ? "+" : ""}${fmt1.format(anomaly?.spread || 0)}%`, anomaly?.spread >= 18 ? "hot" : anomaly?.spread <= -18 ? "cool" : "flat"),
  ].join("");
  $("bucketFlow").innerHTML = rows.map((row, index) => {
    const base = avg[index] || 0;
    const spread = base ? ((row.total - base) / base) * 100 : 0;
    const cp = row.put ? row.call / row.put : row.call ? row.call : 0;
    const bias = Math.max(7, Math.min(100, (cp / 2.6) * 100));
    const tone = spread >= 18 ? "hot" : spread <= -18 ? "cool" : "flat";
    const title = `${row.time} · ${wan(row.total)} · CP ${ratio(cp)} · ${spread >= 0 ? "+" : ""}${fmt1.format(spread)}% vs 20D`;
    return `
      <span class="flow-bucket ${tone}" title="${escapeHtml(title)}">
        <i>${row.time}</i>
        <b>${spread >= 0 ? "+" : ""}${fmt0.format(spread)}%</b>
        <small>CP ${ratio(cp)}</small>
        <em style="--bias:${bias.toFixed(1)}%"></em>
      </span>
    `;
  }).join("");
  document.querySelector(".bucket-pressure-ribbon")?.remove();
  $("bucketFlow").insertAdjacentHTML("afterend", bucketPressureRibbon(rows, avg, total, avgTotal));
  $("bucketSignature").innerHTML = bucketSignature(rows, avg, total, avgTotal);
  $("bucketRisk").innerHTML = bucketRiskRadar(rows, avg, total, avgTotal);
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

function bucketPressureRibbon(rows, avg, total, avgTotal) {
  const points = rows.map((row, index) => {
    const volume = Number(row.total) || 0;
    const base = Number(avg[index]) || 0;
    const share = total ? (volume / total) * 100 : 0;
    const baseShare = avgTotal ? (base / avgTotal) * 100 : 0;
    const spread = base ? ((volume - base) / base) * 100 : 0;
    const cp = row.put ? row.call / row.put : row.call ? row.call : 0;
    const tone = spread >= 18 || cp >= 1.55 ? "hot" : spread <= -18 || cp <= 0.95 ? "cool" : "flat";
    const strength = Math.max(8, Math.min(100, Math.abs(spread) * 1.35 + Math.abs(share - baseShare) * 5));
    return { ...row, volume, base, share, baseShare, spread, cp, tone, strength };
  });
  if (!points.length) return "";
  const hot = points.filter((point) => point.tone === "hot").length;
  const cool = points.filter((point) => point.tone === "cool").length;
  const lead = points.reduce((best, point) => point.strength > best.strength ? point : best, points[0]);
  const tone = hot > cool ? "hot" : cool > hot ? "cool" : "flat";
  const read = state.lang === "zh"
    ? `${lead.time} 是最强压力点，${hot} 个热桶、${cool} 个冷桶。`
    : `${lead.time} is the strongest pressure point; ${hot} hot buckets, ${cool} cool buckets.`;
  return `
    <div class="bucket-pressure-ribbon ${tone}">
      <div>
        <span>${state.lang === "zh" ? "桶间压力带" : "Bucket pressure tape"}</span>
        <strong>${escapeHtml(lead.time || "--")}</strong>
        <small>${read}</small>
      </div>
      <div class="bucket-pressure-track">
        ${points.map((point) => `
          <span class="${point.tone}" title="${escapeHtml(`${point.time} · ${point.spread >= 0 ? "+" : ""}${fmt1.format(point.spread)}% vs 20D · CP ${ratio(point.cp)}`)}">
            <i style="--w:${point.strength.toFixed(1)}%"></i>
            <b>${escapeHtml(point.time.slice(0, 2))}</b>
          </span>
        `).join("")}
      </div>
    </div>
  `;
}

function bucketSignature(rows, avg, total, avgTotal) {
  const segments = [
    { key: "open", label: state.lang === "zh" ? "开盘" : "Open", indexes: [0, 1] },
    { key: "mid", label: state.lang === "zh" ? "午盘" : "Midday", indexes: [5, 6, 7] },
    { key: "close", label: state.lang === "zh" ? "尾盘" : "Close", indexes: [rows.length - 2, rows.length - 1] },
  ].map((segment) => {
    const segmentRows = segment.indexes.map((index) => rows[index]).filter(Boolean);
    const current = segmentRows.reduce((sum, row) => sum + (Number(row.total) || 0), 0);
    const call = segmentRows.reduce((sum, row) => sum + (Number(row.call) || 0), 0);
    const put = segmentRows.reduce((sum, row) => sum + (Number(row.put) || 0), 0);
    const avgSegment = segment.indexes.reduce((sum, index) => sum + (Number(avg[index]) || 0), 0);
    const share = total ? (current / total) * 100 : 0;
    const avgShare = avgTotal ? (avgSegment / avgTotal) * 100 : 0;
    const drift = share - avgShare;
    const cp = put ? call / put : call ? call : 0;
    const tone = drift >= 4 || cp >= 1.55 ? "hot" : drift <= -4 || cp <= 0.95 ? "cool" : "flat";
    return { ...segment, current, share, avgShare, drift, cp, tone };
  });
  const lead = segments.reduce((best, segment) => Math.abs(segment.drift) > Math.abs(best.drift) ? segment : best, segments[0]);
  const callTilt = segments.reduce((best, segment) => segment.cp > best.cp ? segment : best, segments[0]);
  const coolTilt = segments.reduce((best, segment) => segment.cp < best.cp ? segment : best, segments[0]);
  const leadTone = lead.tone === "flat" ? (callTilt.cp >= 1.55 ? "hot" : coolTilt.cp <= 0.95 ? "cool" : "flat") : lead.tone;
  return `
    <div class="signature-lead ${leadTone}">
      <span>${state.lang === "zh" ? "日内指纹" : "Session fingerprint"}</span>
      <strong>${lead.label} ${lead.drift >= 0 ? "+" : ""}${fmt1.format(lead.drift)}pt</strong>
      <small>${state.lang === "zh" ? "Call 偏向" : "Call tilt"} ${callTilt.label} CP ${ratio(callTilt.cp)} · ${state.lang === "zh" ? "防守偏向" : "Defensive tilt"} ${coolTilt.label} CP ${ratio(coolTilt.cp)}</small>
    </div>
    <div class="signature-lanes">
      ${segments.map((segment) => `
        <span class="${segment.tone}">
          <i>${segment.label}</i>
          <b>${fmt1.format(segment.share)}%</b>
          <small>${segment.drift >= 0 ? "+" : ""}${fmt1.format(segment.drift)}pt · CP ${ratio(segment.cp)}</small>
          <em style="--w:${Math.max(7, Math.min(100, segment.share * 3)).toFixed(1)}%"></em>
        </span>
      `).join("")}
    </div>
  `;
}

function bucketRiskRadar(rows, avg, total, avgTotal) {
  const points = rows.map((row, index) => {
    const volume = Number(row.total) || 0;
    const base = Number(avg[index]) || 0;
    const spread = base ? ((volume - base) / base) * 100 : 0;
    const cp = row.put ? row.call / row.put : row.call ? row.call : 0;
    const share = total ? (volume / total) * 100 : 0;
    const avgShare = avgTotal ? (base / avgTotal) * 100 : 0;
    const drift = share - avgShare;
    return { ...row, volume, base, spread, cp, share, avgShare, drift };
  });
  if (!points.length) return "";

  const impact = points.reduce((best, point) => point.spread > best.spread ? point : best, points[0]);
  const defense = points.reduce((best, point) => point.cp < best.cp ? point : best, points[0]);
  const chase = points.reduce((best, point) => point.cp > best.cp ? point : best, points[0]);
  const top3 = [...points].sort((a, b) => b.volume - a.volume).slice(0, 3);
  const concentration = top3.reduce((sum, point) => sum + point.share, 0);
  const hotBuckets = points.filter((point) => point.spread >= 18).length;
  const coolBuckets = points.filter((point) => point.spread <= -18).length;
  const shock = Math.max(0, impact.spread);
  const defensePressure = Math.max(0, 1.05 - defense.cp) * 72;
  const callPressure = Math.max(0, chase.cp - 1.35) * 24;
  const concentrationPressure = Math.max(0, concentration - 34) * 1.4;
  const score = Math.max(1, Math.min(99, 28 + shock * 0.45 + defensePressure + callPressure + concentrationPressure));
  const tone = score >= 68 ? "hot" : score <= 42 ? "cool" : "flat";
  const narrative = bucketRiskNarrative({ impact, defense, chase, concentration, hotBuckets, coolBuckets });
  const cards = [
    {
      label: state.lang === "zh" ? "成交冲击" : "Volume shock",
      value: `${impact.time} ${impact.spread >= 0 ? "+" : ""}${fmt0.format(impact.spread)}%`,
      sub: `${wan(impact.volume)} · ${state.lang === "zh" ? "占全日" : "share"} ${fmt1.format(impact.share)}%`,
      tone: impact.spread >= 18 ? "hot" : impact.spread <= -18 ? "cool" : "flat",
    },
    {
      label: state.lang === "zh" ? "防守压力" : "Defense pressure",
      value: `${defense.time} CP ${ratio(defense.cp)}`,
      sub: `${defense.drift >= 0 ? "+" : ""}${fmt1.format(defense.drift)}pt ${state.lang === "zh" ? "份额漂移" : "share drift"}`,
      tone: defense.cp <= 0.95 ? "cool" : "flat",
    },
    {
      label: state.lang === "zh" ? "Call 追击" : "Call chase",
      value: `${chase.time} CP ${ratio(chase.cp)}`,
      sub: `${chase.drift >= 0 ? "+" : ""}${fmt1.format(chase.drift)}pt ${state.lang === "zh" ? "份额漂移" : "share drift"}`,
      tone: chase.cp >= 1.55 ? "hot" : "flat",
    },
    {
      label: state.lang === "zh" ? "三桶集中" : "Top-3 slots",
      value: `${fmt1.format(concentration)}%`,
      sub: top3.map((point) => point.time).join(" / "),
      tone: concentration >= 42 ? "hot" : concentration <= 28 ? "cool" : "flat",
    },
  ];
  const maxSpread = Math.max(...points.map((point) => Math.abs(point.spread)), 1);
  return `
    <div class="risk-lead ${tone}">
      <span>${state.lang === "zh" ? "日内风险雷达" : "Intraday risk radar"}</span>
      <strong>${fmt0.format(score)}</strong>
      <small>${narrative}</small>
    </div>
    <div class="risk-cards">
      ${cards.map((card) => `
        <span class="${card.tone}" title="${escapeHtml(`${card.label} · ${card.value} · ${card.sub}`)}">
          <i>${card.label}</i>
          <b>${card.value}</b>
          <small>${card.sub}</small>
        </span>
      `).join("")}
    </div>
    <div class="risk-pulse">
      <div>
        <span>${state.lang === "zh" ? "偏离带" : "Deviation tape"}</span>
        <b>${hotBuckets}/${coolBuckets}</b>
      </div>
      <div class="risk-cells">
        ${points.map((point) => {
          const toneClassName = point.spread >= 18 ? "hot" : point.spread <= -18 ? "cool" : "flat";
          const height = Math.max(8, Math.min(100, Math.abs(point.spread) / maxSpread * 100));
          const title = `${point.time} · ${point.spread >= 0 ? "+" : ""}${fmt1.format(point.spread)}% vs 20D · CP ${ratio(point.cp)}`;
          return `<span class="${toneClassName}" title="${escapeHtml(title)}" style="--h:${height.toFixed(1)}%"><i>${point.time.slice(0, 2)}</i></span>`;
        }).join("")}
      </div>
    </div>
  `;
}

function bucketRiskNarrative({ impact, defense, chase, concentration, hotBuckets, coolBuckets }) {
  if (state.lang === "zh") {
    const bias = hotBuckets > coolBuckets ? "上冲桶更多" : coolBuckets > hotBuckets ? "降温桶更多" : "冷热桶均衡";
    return `${impact.time} 是最大成交冲击，${defense.time} 防守 CP 最低，${chase.time} Call 追击最强；前三桶集中 ${fmt1.format(concentration)}%，${bias}。`;
  }
  const bias = hotBuckets > coolBuckets ? "more hot buckets" : coolBuckets > hotBuckets ? "more cooling buckets" : "balanced hot/cool buckets";
  return `${impact.time} is the largest shock, ${defense.time} has the lowest defensive CP, ${chase.time} has the strongest call chase; top three slots hold ${fmt1.format(concentration)}%, ${bias}.`;
}

function bucketProfileCard(label, value, tone) {
  return `
    <span class="${tone}">
      <i>${label}</i>
      <b>${value}</b>
    </span>
  `;
}

function renderHeatmap() {
  const heat = state.day.buckets.heatmap;
  const labels = state.day.buckets.labels;
  const values = heat.flatMap((row) => row.values);
  const max = Math.max(...values, 1);
  const rowTotals = heat.map((row) => ({
    symbol: row.symbol,
    total: row.values.reduce((sum, value) => sum + (Number(value) || 0), 0),
  })).sort((a, b) => b.total - a.total);
  const labelTotals = labels.map((label, index) => ({
    label,
    total: heat.reduce((sum, row) => sum + (Number(row.values[index]) || 0), 0),
  })).sort((a, b) => b.total - a.total);
  const top3Total = rowTotals.slice(0, 3).reduce((sum, row) => sum + row.total, 0);
  const allTotal = rowTotals.reduce((sum, row) => sum + row.total, 0) || 1;
  const topSymbol = rowTotals[0] || { symbol: "--", total: 0 };
  const hotSlot = labelTotals[0] || { label: "--", total: 0 };
  $("heatmapSummary").innerHTML = [
    heatmapSummaryCard(state.lang === "zh" ? "最热标的" : "Hottest symbol", topSymbol.symbol, wan(topSymbol.total), "hot"),
    heatmapSummaryCard(state.lang === "zh" ? "峰值时段" : "Peak slot", hotSlot.label, wan(hotSlot.total), "flat"),
    heatmapSummaryCard(state.lang === "zh" ? "Top3 集中度" : "Top3 focus", `${fmt1.format((top3Total / allTotal) * 100)}%`, rowTotals.slice(0, 3).map((row) => row.symbol).join(" / "), (top3Total / allTotal) >= 0.55 ? "hot" : "flat"),
  ].join("");
  const rhythm = heatmapRhythmRows(heat);
  if (rhythm.length) {
    const opening = rhythm.reduce((best, row) => row.openShare > best.openShare ? row : best, rhythm[0]);
    const midday = rhythm.reduce((best, row) => row.midShare > best.midShare ? row : best, rhythm[0]);
    const closing = rhythm.reduce((best, row) => row.closeShift > best.closeShift ? row : best, rhythm[0]);
    $("heatmapRhythm").innerHTML = [
      heatmapRhythmCard(state.lang === "zh" ? "开盘最强" : "Opening lead", opening, `${fmt1.format(opening.openShare)}%`, wan(opening.openVol), "hot"),
      heatmapRhythmCard(state.lang === "zh" ? "午盘承接" : "Midday hold", midday, `${fmt1.format(midday.midShare)}%`, wan(midday.midVol), "flat"),
      heatmapRhythmCard(state.lang === "zh" ? "尾盘升温" : "Closing lift", closing, `${closing.closeShift >= 0 ? "+" : ""}${fmt1.format(closing.closeShift)}pt`, `${wan(closing.closeVol)} / ${wan(closing.openVol)}`, closing.closeShift >= 8 ? "hot" : closing.closeShift <= -8 ? "cool" : "flat"),
    ].join("");
  } else {
    $("heatmapRhythm").innerHTML = "";
  }
  $("heatmapBaton").innerHTML = heatmapBaton(heatmapBatonRows(heat));
  $("heatmap").innerHTML = heatmapLaneBoard(heat, labels, max);
}

function heatmapSummaryCard(label, value, sub, tone) {
  return `
    <span class="${tone}">
      <i>${label}</i>
      <b>${escapeHtml(value)}</b>
      <small>${escapeHtml(sub)}</small>
    </span>
  `;
}

function heatmapLaneBoard(heat, labels, max) {
  const axisIndexes = new Set([0, 3, 6, 9, labels.length - 1]);
  const rows = heat.map((row) => {
    const values = row.values.map((value) => Number(value) || 0);
    const total = values.reduce((sum, value) => sum + value, 0) || 1;
    const peakIndex = values.reduce((best, value, index) => value > values[best] ? index : best, 0);
    const openVol = values.slice(0, 2).reduce((sum, value) => sum + value, 0);
    const closeVol = values.slice(-2).reduce((sum, value) => sum + value, 0);
    const closeShift = ((closeVol - openVol) / total) * 100;
    const tone = closeShift >= 9 ? "hot" : closeShift <= -9 ? "cool" : "flat";
    const segments = values.map((value, index) => {
      const level = value ? value / max : 0;
      const height = value ? Math.max(8, Math.min(100, level * 100)) : 2;
      const label = labels[index] || "--";
      const bg = value ? blueHeat(level) : "rgba(201, 194, 178, 0.26)";
      return `<i title="${escapeHtml(`${label} · ${wan(value)}`)}" style="--h:${height.toFixed(1)}%;--c:${bg}"></i>`;
    }).join("");
    const shift = `${closeShift >= 0 ? "+" : ""}${fmt1.format(closeShift)}pt`;
    const title = `${row.symbol} · ${wan(total)} · ${labels[peakIndex] || "--"} ${wan(values[peakIndex] || 0)} · ${shift}`;
    return `
      <button type="button" class="heat-lane-row ${tone}" data-symbol="${escapeHtml(row.symbol)}" title="${escapeHtml(title)}">
        <strong>${escapeHtml(row.symbol)}</strong>
        <span class="heat-lane-track" aria-hidden="true">${segments}</span>
        <span class="heat-lane-meta">
          <b>${wan(total)}</b>
          <small>${escapeHtml(labels[peakIndex] || "--")} · ${shift}</small>
        </span>
      </button>
    `;
  }).join("");
  const axis = labels.map((label, index) => `<span>${axisIndexes.has(index) ? escapeHtml(label) : ""}</span>`).join("");
  return `
    <div class="heat-lane-board">
      <div class="heat-lane-axis" aria-hidden="true"><span></span><span>${axis}</span><span></span></div>
      ${rows}
    </div>
  `;
}

function heatmapRhythmRows(heat) {
  return heat.map((row) => {
    const values = row.values.map((value) => Number(value) || 0);
    const total = values.reduce((sum, value) => sum + value, 0) || 1;
    const openVol = values.slice(0, 2).reduce((sum, value) => sum + value, 0);
    const midVol = values.slice(5, 8).reduce((sum, value) => sum + value, 0);
    const closeVol = values.slice(-2).reduce((sum, value) => sum + value, 0);
    return {
      symbol: row.symbol,
      openVol,
      midVol,
      closeVol,
      openShare: (openVol / total) * 100,
      midShare: (midVol / total) * 100,
      closeShare: (closeVol / total) * 100,
      closeShift: ((closeVol - openVol) / total) * 100,
    };
  });
}

function heatmapRhythmCard(label, row, value, sub, tone) {
  if (!row) return "";
  return `
    <button type="button" class="heat-rhythm-card ${tone}" data-symbol="${escapeHtml(row.symbol)}">
      <span>${label}</span>
      <strong>${escapeHtml(row.symbol)}</strong>
      <b>${escapeHtml(value)}</b>
      <small>${escapeHtml(sub)}</small>
    </button>
  `;
}

function heatmapBatonRows(heat) {
  return heat.map((row) => {
    const values = row.values.map((value) => Number(value) || 0);
    const total = values.reduce((sum, value) => sum + value, 0) || 1;
    const openVol = values.slice(0, 2).reduce((sum, value) => sum + value, 0);
    const midVol = values.slice(5, 8).reduce((sum, value) => sum + value, 0);
    const closeVol = values.slice(-2).reduce((sum, value) => sum + value, 0);
    const restVol = Math.max(0, total - openVol - midVol - closeVol);
    const peakIndex = values.reduce((best, value, index) => value > values[best] ? index : best, 0);
    const openShare = (openVol / total) * 100;
    const midShare = (midVol / total) * 100;
    const closeShare = (closeVol / total) * 100;
    const closeShift = closeShare - openShare;
    const tone = closeShift >= 9 ? "hot" : closeShift <= -9 ? "cool" : "flat";
    return {
      symbol: row.symbol,
      total,
      openVol,
      midVol,
      closeVol,
      restVol,
      openShare,
      midShare,
      closeShare,
      restShare: (restVol / total) * 100,
      closeShift,
      peakSlot: state.day.buckets.labels[peakIndex] || "--",
      tone,
    };
  }).sort((a, b) => b.total - a.total).slice(0, 6);
}

function heatmapBaton(rows) {
  if (!rows.length) return "";
  const top = rows[0];
  const closeLift = rows.reduce((best, row) => row.closeShift > best.closeShift ? row : best, rows[0]);
  const openLead = rows.reduce((best, row) => row.openShare > best.openShare ? row : best, rows[0]);
  const tone = closeLift.closeShift >= 9 ? "hot" : openLead.openShare >= 30 ? "cool" : "flat";
  const title = state.lang === "zh" ? "日内接力路径" : "Intraday relay path";
  const read = state.lang === "zh"
    ? `总量锚点 ${top.symbol}，尾盘升温 ${closeLift.symbol} ${closeLift.closeShift >= 0 ? "+" : ""}${fmt1.format(closeLift.closeShift)}pt。`
    : `Volume anchor ${top.symbol}; closing lift ${closeLift.symbol} ${closeLift.closeShift >= 0 ? "+" : ""}${fmt1.format(closeLift.closeShift)}pt.`;
  return `
    <div class="heat-baton-head ${tone}">
      <span>${title}</span>
      <strong>${escapeHtml(top.symbol)} → ${escapeHtml(closeLift.symbol)}</strong>
      <small>${read}</small>
    </div>
    <div class="heat-baton-list">
      ${rows.map((row) => heatmapBatonRow(row)).join("")}
    </div>
  `;
}

function heatmapBatonRow(row) {
  const label = state.lang === "zh"
    ? `开 ${fmt1.format(row.openShare)}% · 中 ${fmt1.format(row.midShare)}% · 尾 ${fmt1.format(row.closeShare)}%`
    : `O ${fmt1.format(row.openShare)}% · M ${fmt1.format(row.midShare)}% · C ${fmt1.format(row.closeShare)}%`;
  const shift = `${row.closeShift >= 0 ? "+" : ""}${fmt1.format(row.closeShift)}pt`;
  return `
    <button type="button" class="heat-baton-row ${row.tone}" data-symbol="${escapeHtml(row.symbol)}">
      <strong>${escapeHtml(row.symbol)}</strong>
      <span class="heat-baton-track" aria-hidden="true">
        <i class="open" style="width:${Math.max(5, row.openShare).toFixed(1)}%"></i>
        <i class="mid" style="width:${Math.max(5, row.midShare).toFixed(1)}%"></i>
        <i class="close" style="width:${Math.max(5, row.closeShare).toFixed(1)}%"></i>
        <i class="rest" style="width:${Math.max(5, row.restShare).toFixed(1)}%"></i>
      </span>
      <b>${wan(row.total)}</b>
      <small>${label} · ${state.lang === "zh" ? "峰值" : "peak"} ${escapeHtml(row.peakSlot)} · ${shift}</small>
    </button>
  `;
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
  const first = rows[0];
  const premiumChange = first.totalPremium ? ((latest.totalPremium - first.totalPremium) / first.totalPremium) * 100 : 0;
  const cpDrift = (Number(latest.marketCp) || 0) - (Number(first.marketCp) || 0);
  const stockShareFirst = categoryShareForRow(first, "STOCK");
  const stockShareLatest = categoryShareForRow(latest, "STOCK");
  const stockShareDrift = stockShareLatest - stockShareFirst;
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
  const trendRadar = trendRadarRows(rows);

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
    <div class="trend-cockpit">
      <div class="trend-cockpit-left">
        <div class="trend-lens">
          ${trendLensCard(state.lang === "zh" ? "成交变化" : "Volume move", `${change >= 0 ? "+" : ""}${fmt1.format(change)}%`, `${shortDate(prev?.date || first.date)} → ${shortDate(latest.date)}`, change >= 8 ? "hot" : change <= -8 ? "cool" : "flat")}
          ${trendLensCard(state.lang === "zh" ? "权利金变化" : "Premium move", `${premiumChange >= 0 ? "+" : ""}${fmt1.format(premiumChange)}%`, `${moneyCompact(first.totalPremium)} → ${moneyCompact(latest.totalPremium)}`, premiumChange >= 12 ? "hot" : premiumChange <= -12 ? "cool" : "flat")}
          ${trendLensCard(state.lang === "zh" ? "CP 漂移" : "CP drift", `${cpDrift >= 0 ? "+" : ""}${fmt2.format(cpDrift)}`, `${ratio(first.marketCp)} → ${ratio(latest.marketCp)}`, cpDrift >= 0.18 ? "hot" : cpDrift <= -0.18 ? "cool" : "flat")}
          ${trendLensCard(state.lang === "zh" ? "个股权重" : "Stock share", `${stockShareDrift >= 0 ? "+" : ""}${fmt1.format(stockShareDrift)}pt`, `${fmt1.format(stockShareFirst)}% → ${fmt1.format(stockShareLatest)}%`, stockShareDrift >= 5 ? "hot" : stockShareDrift <= -5 ? "cool" : "flat")}
        </div>
        <div class="trend-radar">
          ${trendRadar.map((item) => trendRadarCard(item)).join("")}
        </div>
      </div>
      <div class="trend-cockpit-right">
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
          ${pointsVol.map((point) => {
            const row = point.row;
            const title = `${row.date} · ${wan(row.totalVol)} · ${moneyCompact(row.totalPremium)} · CP ${ratio(row.marketCp)}`;
            return `<circle class="trend-hit" data-jump-date="${row.date}" cx="${point.x.toFixed(1)}" cy="${point.y.toFixed(1)}" r="${Math.max(7, 34 / Math.sqrt(rows.length)).toFixed(1)}"><title>${escapeHtml(title)}</title></circle>`;
          }).join("")}
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
        ${trendPulseStrip(rows)}
      </div>
    </div>
    ${trendWindowStack(rows)}
    ${trendDriftLedger(rows)}
  `;
}

function trendDriftLedger(rows) {
  if (rows.length < 2) return "";
  const latest = rows[rows.length - 1];
  const sample = rows.slice(Math.max(0, rows.length - Math.min(60, rows.length)));
  const first = sample[0] || rows[0];
  const volumeMove = first.totalVol ? ((latest.totalVol - first.totalVol) / first.totalVol) * 100 : 0;
  const premiumMove = first.totalPremium ? ((latest.totalPremium - first.totalPremium) / first.totalPremium) * 100 : 0;
  const cpMove = (Number(latest.marketCp) || 0) - (Number(first.marketCp) || 0);
  const stockMove = categoryShareForRow(latest, "STOCK") - categoryShareForRow(first, "STOCK");
  const etfMove = categoryShareForRow(latest, "ETF") - categoryShareForRow(first, "ETF");
  const indexMove = categoryShareForRow(latest, "INDEX") - categoryShareForRow(first, "INDEX");
  const rowsOut = [
    {
      label: state.lang === "zh" ? "量能漂移" : "Volume drift",
      value: `${volumeMove >= 0 ? "+" : ""}${fmt1.format(volumeMove)}%`,
      sub: `${shortDate(first.date)} → ${shortDate(latest.date)}`,
      width: 50 + volumeMove * 0.72,
      tone: volumeMove >= 8 ? "hot" : volumeMove <= -8 ? "cool" : "flat",
    },
    {
      label: state.lang === "zh" ? "权利金漂移" : "Premium drift",
      value: `${premiumMove >= 0 ? "+" : ""}${fmt1.format(premiumMove)}%`,
      sub: `${moneyCompact(first.totalPremium)} → ${moneyCompact(latest.totalPremium)}`,
      width: 50 + premiumMove * 0.54,
      tone: premiumMove >= 12 ? "hot" : premiumMove <= -12 ? "cool" : "flat",
    },
    {
      label: state.lang === "zh" ? "CP 结构" : "CP structure",
      value: `${cpMove >= 0 ? "+" : ""}${fmt2.format(cpMove)}`,
      sub: `${ratio(first.marketCp)} → ${ratio(latest.marketCp)}`,
      width: 50 + cpMove * 90,
      tone: cpMove >= 0.18 ? "hot" : cpMove <= -0.18 ? "cool" : "flat",
    },
    {
      label: state.lang === "zh" ? "个股扩散" : "Single-stock spread",
      value: `${stockMove >= 0 ? "+" : ""}${fmt1.format(stockMove)}pt`,
      sub: `${state.lang === "zh" ? "ETF" : "ETF"} ${etfMove >= 0 ? "+" : ""}${fmt1.format(etfMove)}pt · ${state.lang === "zh" ? "指数" : "Index"} ${indexMove >= 0 ? "+" : ""}${fmt1.format(indexMove)}pt`,
      width: 50 + stockMove * 3.2,
      tone: stockMove >= 5 ? "hot" : stockMove <= -5 ? "cool" : "flat",
    },
  ];
  const pressure = rowsOut.reduce((sum, row) => {
    const sign = row.tone === "hot" ? 1 : row.tone === "cool" ? -1 : 0;
    return sum + sign;
  }, 0);
  const tone = pressure >= 2 ? "hot" : pressure <= -2 ? "cool" : "flat";
  const read = state.lang === "zh"
    ? `${sample.length} 日窗口内，量能、权利金、CP 和类别份额一起读，避免只看单日。`
    : `${sample.length}-session window: volume, premium, CP, and lane share are read together.`;
  return `
    <div class="trend-drift-ledger">
      <div class="trend-drift-lead ${tone}">
        <span>${state.lang === "zh" ? "跨日结构账本" : "Cross-day structure ledger"}</span>
        <strong>${sample.length}D</strong>
        <small>${read}</small>
      </div>
      <div class="trend-drift-rows">
        ${rowsOut.map((row) => `
          <span class="${row.tone}">
            <i>${escapeHtml(row.label)}</i>
            <b>${escapeHtml(row.value)}</b>
            <small>${escapeHtml(row.sub)}</small>
            <em style="--w:${Math.max(8, Math.min(100, row.width)).toFixed(1)}%"></em>
          </span>
        `).join("")}
      </div>
    </div>
  `;
}

function trendWindowStack(rows) {
  const windows = [5, 20, 60]
    .map((period) => trendWindowStats(rows, period))
    .filter(Boolean);
  if (!windows.length) return "";
  const pulse = windows.map((item) => Math.max(-42, Math.min(42, item.volumeMove))).reduce((sum, value) => sum + value, 0) / windows.length;
  const tone = pulse >= 6 ? "hot" : pulse <= -6 ? "cool" : "flat";
  const title = state.lang === "zh" ? "短中长节奏" : "Short / mid / long rhythm";
  const read = state.lang === "zh"
    ? `${windows[0].label} ${windows[0].volumeMove >= 0 ? "+" : ""}${fmt1.format(windows[0].volumeMove)}%，${windows[windows.length - 1].label} ${windows[windows.length - 1].volumeMove >= 0 ? "+" : ""}${fmt1.format(windows[windows.length - 1].volumeMove)}%。`
    : `${windows[0].label} ${windows[0].volumeMove >= 0 ? "+" : ""}${fmt1.format(windows[0].volumeMove)}%, ${windows[windows.length - 1].label} ${windows[windows.length - 1].volumeMove >= 0 ? "+" : ""}${fmt1.format(windows[windows.length - 1].volumeMove)}%.`;
  return `
    <div class="trend-window-stack">
      <div class="trend-window-lead ${tone}">
        <span>${title}</span>
        <strong>${pulse >= 0 ? "+" : ""}${fmt1.format(pulse)}%</strong>
        <small>${read}</small>
      </div>
      <div class="trend-window-cards">
        ${windows.map((item) => trendWindowCard(item)).join("")}
      </div>
    </div>
  `;
}

function trendWindowStats(rows, period) {
  if (rows.length < 2) return null;
  const size = Math.min(period, rows.length);
  const current = rows.slice(-size);
  const previous = rows.slice(Math.max(0, rows.length - size * 2), rows.length - size);
  const base = previous.length ? previous : rows.slice(0, Math.max(1, Math.min(size, rows.length - current.length)));
  if (!current.length || !base.length) return null;
  const currentVol = average(current.map((row) => row.totalVol));
  const baseVol = average(base.map((row) => row.totalVol));
  const currentPremium = average(current.map((row) => row.totalPremium));
  const basePremium = average(base.map((row) => row.totalPremium));
  const currentCp = average(current.map((row) => row.marketCp));
  const baseCp = average(base.map((row) => row.marketCp));
  const currentStock = average(current.map((row) => categoryShareForRow(row, "STOCK")));
  const baseStock = average(base.map((row) => categoryShareForRow(row, "STOCK")));
  const volumeMove = baseVol ? ((currentVol - baseVol) / baseVol) * 100 : 0;
  const premiumMove = basePremium ? ((currentPremium - basePremium) / basePremium) * 100 : 0;
  const cpMove = currentCp - baseCp;
  const stockMove = currentStock - baseStock;
  const tone = volumeMove >= 8 || premiumMove >= 12 ? "hot" : volumeMove <= -8 || premiumMove <= -12 ? "cool" : "flat";
  return {
    label: `${size}D`,
    tone,
    volumeMove,
    premiumMove,
    cpMove,
    stockMove,
    currentVol,
    currentPremium,
    currentCp,
    currentStock,
  };
}

function trendWindowCard(item) {
  const volumeWidth = Math.max(8, Math.min(100, 50 + item.volumeMove));
  const premiumWidth = Math.max(8, Math.min(100, 50 + item.premiumMove * 0.72));
  const stockWidth = Math.max(8, Math.min(100, item.currentStock));
  return `
    <span class="${item.tone}">
      <i>${item.label}</i>
      <b>${item.volumeMove >= 0 ? "+" : ""}${fmt1.format(item.volumeMove)}%</b>
      <small>${state.lang === "zh" ? "权利金" : "premium"} ${item.premiumMove >= 0 ? "+" : ""}${fmt1.format(item.premiumMove)}% · CP ${item.cpMove >= 0 ? "+" : ""}${fmt2.format(item.cpMove)}</small>
      <em class="vol" style="--w:${volumeWidth.toFixed(1)}%"></em>
      <em class="prem" style="--w:${premiumWidth.toFixed(1)}%"></em>
      <em class="stock" style="--w:${stockWidth.toFixed(1)}%"></em>
    </span>
  `;
}

function trendPulseStrip(rows) {
  const sample = rows.slice(Math.max(0, rows.length - 28));
  if (sample.length < 2) return "";
  const maxVol = Math.max(...sample.map((row) => Number(row.totalVol) || 0), 1);
  const cells = sample.map((row, index) => {
    const prev = sample[index - 1];
    const move = prev?.totalVol ? ((Number(row.totalVol) - Number(prev.totalVol)) / Number(prev.totalVol)) * 100 : 0;
    const height = Math.max(12, ((Number(row.totalVol) || 0) / maxVol) * 100);
    const cp = Number(row.marketCp) || 0;
    const tone = move >= 8 || cp >= 1.55 ? "hot" : move <= -8 || cp <= 0.95 ? "cool" : "flat";
    const active = row.date === state.day.tradeDate ? " active" : "";
    const title = `${row.date} · ${wan(row.totalVol)} · CP ${ratio(row.marketCp)} · ${move >= 0 ? "+" : ""}${fmt1.format(move)}%`;
    return `
      <button type="button" class="${tone}${active}" data-jump-date="${row.date}" title="${escapeHtml(title)}" style="--h:${height.toFixed(1)}%">
        <i></i>
        <span>${index % 4 === 0 || index === sample.length - 1 || active ? shortDate(row.date) : ""}</span>
      </button>
    `;
  }).join("");
  return `
    <div class="trend-pulse-strip" aria-label="${state.lang === "zh" ? "最近交易日脉冲" : "Recent session pulses"}">
      <div>
        <span>${state.lang === "zh" ? "最近脉冲" : "Recent pulses"}</span>
        <b>${sample.length}D</b>
      </div>
      <div class="trend-pulse-cells">${cells}</div>
    </div>
  `;
}

function trendRadarRows(rows) {
  const fallback = rows[rows.length - 1];
  const moves = rows.slice(1).map((row, index) => {
    const prev = rows[index];
    const volMove = prev.totalVol ? ((row.totalVol - prev.totalVol) / prev.totalVol) * 100 : 0;
    const premiumMove = prev.totalPremium ? ((row.totalPremium - prev.totalPremium) / prev.totalPremium) * 100 : 0;
    const stockMove = categoryShareForRow(row, "STOCK") - categoryShareForRow(prev, "STOCK");
    return { row, volMove, premiumMove, stockMove };
  });
  const byAbs = (key) => moves.reduce((best, item) => Math.abs(item[key]) > Math.abs(best[key]) ? item : best, moves[0] || { row: fallback, [key]: 0 });
  const volume = byAbs("volMove");
  const premium = byAbs("premiumMove");
  const stock = byAbs("stockMove");
  const cpHigh = rows.reduce((best, row) => Number(row.marketCp) > Number(best.marketCp) ? row : best, rows[0]);
  return [
    {
      label: state.lang === "zh" ? "量能脉冲" : "Volume pulse",
      date: volume.row.date,
      value: `${volume.volMove >= 0 ? "+" : ""}${fmt1.format(volume.volMove)}%`,
      sub: wan(volume.row.totalVol),
      tone: volume.volMove >= 8 ? "hot" : volume.volMove <= -8 ? "cool" : "flat",
    },
    {
      label: state.lang === "zh" ? "权利金脉冲" : "Premium pulse",
      date: premium.row.date,
      value: `${premium.premiumMove >= 0 ? "+" : ""}${fmt1.format(premium.premiumMove)}%`,
      sub: moneyCompact(premium.row.totalPremium),
      tone: premium.premiumMove >= 12 ? "hot" : premium.premiumMove <= -12 ? "cool" : "flat",
    },
    {
      label: state.lang === "zh" ? "CP 极值" : "CP extreme",
      date: cpHigh.date,
      value: ratio(cpHigh.marketCp),
      sub: shortDate(cpHigh.date),
      tone: Number(cpHigh.marketCp) >= 1.5 ? "hot" : Number(cpHigh.marketCp) <= 0.95 ? "cool" : "flat",
    },
    {
      label: state.lang === "zh" ? "个股切换" : "Stock shift",
      date: stock.row.date,
      value: `${stock.stockMove >= 0 ? "+" : ""}${fmt1.format(stock.stockMove)}pt`,
      sub: shortDate(stock.row.date),
      tone: stock.stockMove >= 5 ? "hot" : stock.stockMove <= -5 ? "cool" : "flat",
    },
    {
      label: state.lang === "zh" ? "当前日" : "Current day",
      date: fallback.date,
      value: shortDate(fallback.date),
      sub: `${wan(fallback.totalVol)} · CP ${ratio(fallback.marketCp)}`,
      tone: "flat",
    },
  ];
}

function trendRadarCard(item) {
  const active = item.date === state.day.tradeDate ? " active" : "";
  return `
    <button type="button" class="${item.tone}${active}" data-jump-date="${item.date}">
      <span>${item.label}</span>
      <b>${item.value}</b>
      <small>${item.sub}</small>
    </button>
  `;
}

function trendLensCard(label, value, sub, tone) {
  return `
    <span class="${tone}">
      <i>${label}</i>
      <b>${value}</b>
      <small>${sub}</small>
    </span>
  `;
}

function categoryShareForRow(row, key) {
  const category = row.category || {};
  const total = Number(row.totalVol) || 0;
  const volume = Number(category[key]?.volume) || 0;
  return total ? (volume / total) * 100 : 0;
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
    <div class="signal-right">
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
      ${signalPulseTape(rows90)}
    </div>
  `;
}

function signalPulseTape(rows) {
  const sample = rows.slice(Math.max(0, rows.length - 18));
  if (sample.length < 2) return "";
  const maxVol = Math.max(...sample.map((row) => Number(row.totalVol) || 0), 1);
  const cells = sample.map((row, index) => {
    const prev = sample[index - 1];
    const move = prev?.totalVol ? ((Number(row.totalVol) - Number(prev.totalVol)) / Number(prev.totalVol)) * 100 : 0;
    const cp = Number(row.marketCp) || 0;
    const height = Math.max(9, ((Number(row.totalVol) || 0) / maxVol) * 100);
    const tone = move >= 8 || cp >= 1.55 ? "hot" : move <= -8 || cp <= 0.95 ? "cool" : "flat";
    const active = row.date === state.day.tradeDate ? " active" : "";
    const title = `${row.date} · ${wan(row.totalVol)} · CP ${ratio(row.marketCp)} · ${move >= 0 ? "+" : ""}${fmt1.format(move)}%`;
    return `
      <button type="button" class="${tone}${active}" data-jump-date="${row.date}" title="${escapeHtml(title)}" style="--h:${height.toFixed(1)}%">
        <i></i>
        <span>${index % 3 === 0 || index === sample.length - 1 || active ? row.date.slice(8) : ""}</span>
      </button>
    `;
  }).join("");
  const latest = sample[sample.length - 1];
  const first = sample[0];
  const change = first?.totalVol ? ((Number(latest.totalVol) - Number(first.totalVol)) / Number(first.totalVol)) * 100 : 0;
  return `
    <div class="signal-pulse-tape">
      <div>
        <span>${state.lang === "zh" ? "18日节奏" : "18D rhythm"}</span>
        <b>${change >= 0 ? "+" : ""}${fmt1.format(change)}%</b>
      </div>
      <div class="signal-pulse-cells">${cells}</div>
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
  const hotRows = rows.filter((row) => row.delta >= 20);
  const coolRows = rows.filter((row) => row.delta <= -20);
  const warmLead = rows.reduce((best, row) => row.delta > best.delta ? row : best, rows[0] || {});
  const coolLead = rows.reduce((best, row) => row.delta < best.delta ? row : best, rows[0] || {});
  const premiumLead = rows.reduce((best, row) => Number(row.premiumNotional) > Number(best.premiumNotional) ? row : best, rows[0] || {});
  const cpLead = rows.reduce((best, row) => Number(row.cpRatio) > Number(best.cpRatio) ? row : best, rows[0] || {});

  target.innerHTML = `
    <div class="momentum-summary">
      ${momentumSummaryCard(state.lang === "zh" ? "升温队列" : "Warming", `${hotRows.length}/${rows.length}`, `${warmLead.symbol || "--"} ${warmLead.delta >= 0 ? "+" : ""}${fmt1.format(warmLead.delta || 0)}%`, "hot")}
      ${momentumSummaryCard(state.lang === "zh" ? "降温队列" : "Cooling", `${coolRows.length}/${rows.length}`, `${coolLead.symbol || "--"} ${coolLead.delta >= 0 ? "+" : ""}${fmt1.format(coolLead.delta || 0)}%`, "cool")}
      ${momentumSummaryCard(state.lang === "zh" ? "权利金锚点" : "Premium anchor", premiumLead.symbol || "--", moneyCompact(premiumLead.premiumNotional), "flat")}
      ${momentumSummaryCard(state.lang === "zh" ? "CP 领头" : "CP lead", cpLead.symbol || "--", `CP ${ratio(cpLead.cpRatio)}`, "flat")}
    </div>
    <div class="momentum-list">
      ${rows.map((row) => {
    const hot = row.delta >= 20;
    const cool = row.delta <= -20;
    const cls = hot ? "hot" : cool ? "cool" : "flat";
    const active = row.symbol === state.focusSymbol ? " active" : "";
    return `
      <button type="button" class="momentum-row ${cls}${active}" data-symbol="${escapeHtml(row.symbol)}">
        <span class="mom-symbol">${escapeHtml(row.symbol)}</span>
        <span class="mom-spark">${sparkline(row.series, "totalVol", 118, 34, hot ? "#c45335" : cool ? "#2f6190" : "#9a6a12")}</span>
        <span class="mom-value">${wan(row.totalVol)}</span>
        <span class="mom-delta">${row.delta >= 0 ? "+" : ""}${fmt1.format(row.delta)}%</span>
      </button>
    `;
      }).join("")}
    </div>
  `;
}

function momentumSummaryCard(label, value, sub, tone) {
  return `
    <span class="${tone}">
      <i>${escapeHtml(label)}</i>
      <b>${escapeHtml(String(value))}</b>
      <small>${escapeHtml(String(sub || "--"))}</small>
    </span>
  `;
}

function renderSymbolRotation() {
  const target = $("symbolRotation");
  if (!target) return;
  const rows = symbolRotationRows();
  const hotAll = rows.filter((row) => row.delta >= 0);
  const coolAll = rows.filter((row) => row.delta < 0);
  const hot = hotAll.slice(0, 7);
  const cool = [...coolAll].sort((a, b) => a.delta - b.delta).slice(0, 7);
  const breadth = rows.length ? hotAll.length / rows.length * 100 : 0;
  const leadership = hot.slice(0, 3).map((row) => row.symbol).join(" / ") || "--";
  const premiumLeader = rows.reduce((best, row) => row.premiumDelta > best.premiumDelta ? row : best, rows[0] || {});
  const callLeader = rows.reduce((best, row) => Number(row.cpRatio) > Number(best.cpRatio) ? row : best, rows[0] || {});
  const putLeader = rows.reduce((best, row) => Number(row.cpRatio) < Number(best.cpRatio) ? row : best, rows[0] || {});
  target.innerHTML = `
    <div class="rotation-head">
      <span>
        <i>${state.lang === "zh" ? "扩散率" : "Breadth"}</i>
        <b>${fmt1.format(breadth)}%</b>
      </span>
      <span>
        <i>${state.lang === "zh" ? "冷热数量" : "Warm / Cool"}</i>
        <b>${hotAll.length} / ${coolAll.length}</b>
      </span>
      <span>
        <i>${state.lang === "zh" ? "升温前三" : "Top leaders"}</i>
        <b>${escapeHtml(leadership)}</b>
      </span>
      <span>
        <i>${state.lang === "zh" ? "权利金领头" : "Premium lead"}</i>
        <b>${escapeHtml(premiumLeader.symbol || "--")} ${premiumLeader.premiumDelta >= 0 ? "+" : ""}${fmt1.format(premiumLeader.premiumDelta || 0)}%</b>
      </span>
    </div>
    <div class="rotation-brief">
      <p>${rotationNarrative(breadth, hotAll, coolAll, premiumLeader, callLeader, putLeader)}</p>
      <div>
        ${rotationChip(state.lang === "zh" ? "Call 领头" : "Call lead", `${callLeader.symbol || "--"} CP ${ratio(callLeader.cpRatio)}`, "hot")}
        ${rotationChip(state.lang === "zh" ? "Put 防守" : "Put defense", `${putLeader.symbol || "--"} CP ${ratio(putLeader.cpRatio)}`, "cool")}
        ${rotationChip(state.lang === "zh" ? "权利金" : "Premium", `${premiumLeader.symbol || "--"} ${moneyCompact(premiumLeader.premiumNotional)}`, "flat")}
      </div>
    </div>
    ${rotationMap(rows)}
    <div class="rotation-lanes">
      ${rotationLane(state.lang === "zh" ? "升温标的" : "Warming", hot, "hot")}
      ${rotationLane(state.lang === "zh" ? "降温标的" : "Cooling", cool, "cool")}
    </div>
  `;
}

function rotationNarrative(breadth, hotAll, coolAll, premiumLeader, callLeader, putLeader) {
  if (state.lang !== "zh") {
    const tape = breadth >= 58 ? "warming breadth" : breadth <= 42 ? "cooling breadth" : "balanced breadth";
    return `${tape}: ${hotAll.length} warming vs ${coolAll.length} cooling. Premium leadership sits in ${premiumLeader.symbol || "--"}; CP extremes are ${callLeader.symbol || "--"} and ${putLeader.symbol || "--"}.`;
  }
  const tape = breadth >= 58 ? "升温扩散占优" : breadth <= 42 ? "降温扩散占优" : "冷热扩散均衡";
  return `${tape}：${hotAll.length} 个升温、${coolAll.length} 个降温。权利金领头在 ${premiumLeader.symbol || "--"}，CP 两端是 ${callLeader.symbol || "--"} 与 ${putLeader.symbol || "--"}。`;
}

function rotationChip(label, value, tone) {
  return `
    <span class="${tone}">
      <i>${escapeHtml(label)}</i>
      <b>${escapeHtml(value)}</b>
    </span>
  `;
}

function rotationMap(rows) {
  if (!rows.length) return "";
  const selected = [];
  const seen = new Set();
  for (const row of [...rows.slice(0, 14), ...rows.slice(-14), ...[...rows].sort((a, b) => b.premiumDelta - a.premiumDelta).slice(0, 6)]) {
    if (!row?.symbol || seen.has(row.symbol)) continue;
    seen.add(row.symbol);
    selected.push(row);
  }
  const deltaValues = selected.map((row) => Number(row.delta) || 0);
  const premiumValues = selected.map((row) => Number(row.premiumDelta) || 0);
  const xMin = Math.min(-30, ...deltaValues);
  const xMax = Math.max(30, ...deltaValues);
  const yMin = Math.min(-40, ...premiumValues);
  const yMax = Math.max(40, ...premiumValues);
  const xSpan = Math.max(1, xMax - xMin);
  const ySpan = Math.max(1, yMax - yMin);
  const xZero = Math.max(0, Math.min(100, ((0 - xMin) / xSpan) * 100));
  const yZero = Math.max(0, Math.min(100, 100 - ((0 - yMin) / ySpan) * 100));
  const maxVol = Math.max(...selected.map((row) => Number(row.totalVol) || 0), 1);
  const attack = rows.filter((row) => row.delta >= 0 && row.premiumDelta >= 0);
  const volumeOnly = rows.filter((row) => row.delta >= 0 && row.premiumDelta < 0);
  const premiumOnly = rows.filter((row) => row.delta < 0 && row.premiumDelta >= 0);
  const fade = rows.filter((row) => row.delta < 0 && row.premiumDelta < 0);
  const lead = attack.slice().sort((a, b) => (b.delta + b.premiumDelta * 0.45) - (a.delta + a.premiumDelta * 0.45))[0] || rows[0];
  const tone = attack.length >= fade.length ? "hot" : "cool";
  return `
    <div class="rotation-map">
      <div class="rotation-map-lead ${tone}">
        <span>${state.lang === "zh" ? "轮动象限图" : "Rotation quadrant"}</span>
        <strong>${escapeHtml(lead?.symbol || "--")}</strong>
        <small>${state.lang === "zh" ? "右上为量价同升，左下为同步降温。" : "Upper-right means volume and premium warming; lower-left means cooling."}</small>
      </div>
      <div class="rotation-map-grid" style="--x0:${xZero.toFixed(1)}%;--y0:${yZero.toFixed(1)}%">
        <i class="axis-x"></i>
        <i class="axis-y"></i>
        <span class="quad q1">${state.lang === "zh" ? "量价同升" : "Volume + premium"}</span>
        <span class="quad q2">${state.lang === "zh" ? "权利金先行" : "Premium leads"}</span>
        <span class="quad q3">${state.lang === "zh" ? "同步降温" : "Cooling"}</span>
        <span class="quad q4">${state.lang === "zh" ? "量能先行" : "Volume leads"}</span>
        ${selected.map((row) => {
          const x = Math.max(8, Math.min(92, ((Number(row.delta) - xMin) / xSpan) * 100));
          const y = Math.max(9, Math.min(91, 100 - ((Number(row.premiumDelta) - yMin) / ySpan) * 100));
          const size = Math.max(28, Math.min(58, 24 + ((Number(row.totalVol) || 0) / maxVol) * 34));
          const toneClassName = row.delta >= 0 && row.premiumDelta >= 0 ? "hot" : row.delta < 0 && row.premiumDelta < 0 ? "cool" : "flat";
          const title = `${row.symbol} · Vol ${row.delta >= 0 ? "+" : ""}${fmt1.format(row.delta)}% · Premium ${row.premiumDelta >= 0 ? "+" : ""}${fmt1.format(row.premiumDelta)}% · CP ${ratio(row.cpRatio)}`;
          return `<button type="button" class="${toneClassName}" data-symbol="${escapeHtml(row.symbol)}" title="${escapeHtml(title)}" style="--x:${x.toFixed(1)}%;--y:${y.toFixed(1)}%;--s:${size.toFixed(0)}px">${escapeHtml(row.symbol)}</button>`;
        }).join("")}
      </div>
      <div class="rotation-map-stats">
        ${rotationMapStat(state.lang === "zh" ? "量价同升" : "Both warming", attack.length, attack[0]?.symbol, "hot")}
        ${rotationMapStat(state.lang === "zh" ? "权利金先行" : "Premium first", premiumOnly.length, premiumOnly[0]?.symbol, "flat")}
        ${rotationMapStat(state.lang === "zh" ? "量能先行" : "Volume first", volumeOnly.length, volumeOnly[0]?.symbol, "flat")}
        ${rotationMapStat(state.lang === "zh" ? "同步降温" : "Both cooling", fade.length, fade[0]?.symbol, "cool")}
      </div>
    </div>
  `;
}

function rotationMapStat(label, value, symbol, tone) {
  return `
    <span class="${tone}">
      <i>${escapeHtml(label)}</i>
      <b>${fmt0.format(value)}</b>
      <small>${escapeHtml(symbol || "--")}</small>
    </span>
  `;
}

function symbolRotationRows() {
  const seen = new Set();
  return [...state.day.indexRows, ...state.day.etfRows, ...state.day.stockRows]
    .filter((row) => {
      if (seen.has(row.symbol)) return false;
      seen.add(row.symbol);
      return true;
    })
    .map((row) => {
      const series = symbolSeriesUntil(row.symbol, 50);
      const prev = series.slice(0, -1).slice(-20);
      const avg = average(prev.map((item) => item.totalVol));
      const delta = avg ? ((Number(row.totalVol) - avg) / avg) * 100 : 0;
      const premiumAvg = average(prev.map((item) => item.premiumNotional));
      const premiumDelta = premiumAvg ? ((Number(row.premiumNotional) - premiumAvg) / premiumAvg) * 100 : 0;
      return { ...row, delta, premiumDelta, series };
    })
    .filter((row) => row.series.length >= 5)
    .sort((a, b) => b.delta - a.delta);
}

function rotationLane(title, rows, tone) {
  return `
    <div class="rotation-lane ${tone}">
      <div class="rotation-lane-title">
        <b>${title}</b>
        <span>${rows.length}${state.lang === "zh" ? " 个" : ""}</span>
      </div>
      ${rows.map((row) => {
        const active = row.symbol === state.focusSymbol ? " active" : "";
        return `
        <button type="button" class="rotation-row${active}" data-symbol="${escapeHtml(row.symbol)}">
          <strong>${escapeHtml(row.symbol)}</strong>
          <span>${sparkline(row.series, "totalVol", 112, 28, tone === "hot" ? "#c45335" : "#2f6190")}</span>
          <em>${row.delta >= 0 ? "+" : ""}${fmt1.format(row.delta)}%</em>
          <small>${moneyCompact(row.premiumNotional)} · ${row.premiumDelta >= 0 ? "+" : ""}${fmt1.format(row.premiumDelta)}%</small>
        </button>
      `;
      }).join("")}
    </div>
  `;
}

function ensureFocusSymbol() {
  const exists = state.day.topUnderlyings.some((row) => row.symbol === state.focusSymbol);
  if (!state.focusSymbol || !exists) {
    state.focusSymbol = state.day.topUnderlyings[0]?.symbol || state.day.stockRows[0]?.symbol || "SPY";
  }
}

function renderSymbolFocus() {
  const target = $("symbolFocus");
  if (!target || !state.day) return;
  ensureFocusSymbol();
  const symbol = state.focusSymbol;
  const current = state.day.topUnderlyings.find((row) => row.symbol === symbol);
  const series = symbolSeriesUntil(symbol, 90);
  if (!current || !series.length) {
    target.innerHTML = "";
    return;
  }
  const first = series[0];
  const last = series[series.length - 1];
  const prev20 = series.slice(0, -1).slice(-20);
  const avg20 = average(prev20.map((row) => row.totalVol));
  const volumeMove = avg20 ? ((Number(current.totalVol) - avg20) / avg20) * 100 : 0;
  const premiumMove = first?.premiumNotional ? ((Number(last.premiumNotional) - Number(first.premiumNotional)) / Number(first.premiumNotional)) * 100 : 0;
  const cpAvg = average(series.map((row) => row.cpRatio));
  const volumeRank = percentileRank(current.totalVol, series.map((row) => row.totalVol));
  const highVol = series.reduce((best, row) => Number(row.totalVol) > Number(best.totalVol) ? row : best, series[0]);
  const highPremium = series.reduce((best, row) => Number(row.premiumNotional) > Number(best.premiumNotional) ? row : best, series[0]);
  const highCp = series.reduce((best, row) => Number(row.cpRatio) > Number(best.cpRatio) ? row : best, series[0]);
  const lowCp = series.reduce((best, row) => Number(row.cpRatio) < Number(best.cpRatio) ? row : best, series[0]);
  const tone = volumeMove >= 20 ? "hot" : volumeMove <= -20 ? "cool" : "flat";
  target.innerHTML = `
    <div class="focus-head ${tone}">
      <div>
        <span>${t("symbolFocus")}</span>
        <strong>${escapeHtml(symbol)}</strong>
        <small>${current.category || ""} · ${series.length}${state.lang === "zh" ? "日历史" : " sessions"}</small>
      </div>
      <div class="focus-contract">
        <span>${state.lang === "zh" ? "最热合约" : "Top contract"}</span>
        <b>${escapeHtml(current.hottestShort || "--")}</b>
      </div>
    </div>
    <div class="focus-metrics">
      <span>${state.lang === "zh" ? "当日成交" : "Volume"} <b>${wan(current.totalVol)}</b><i>${volumeMove >= 0 ? "+" : ""}${fmt1.format(volumeMove)}% vs 20D</i></span>
      <span>${state.lang === "zh" ? "权利金" : "Premium"} <b>${moneyCompact(current.premiumNotional)}</b><i>${premiumMove >= 0 ? "+" : ""}${fmt1.format(premiumMove)}% / ${series.length}D</i></span>
      <span>CP <b>${ratio(current.cpRatio)}</b><i>${state.lang === "zh" ? "均值" : "avg"} ${ratio(cpAvg)}</i></span>
      <span>${state.lang === "zh" ? "历史分位" : "History rank"} <b>${fmt0.format(volumeRank)}%</b><i>${series.length}${state.lang === "zh" ? "日成交区间" : " sessions"}</i></span>
    </div>
    <div class="focus-extremes">
      ${focusExtremeButton(state.lang === "zh" ? "成交峰值" : "Volume high", highVol, wan(highVol.totalVol), "hot")}
      ${focusExtremeButton(state.lang === "zh" ? "权利金峰值" : "Premium high", highPremium, moneyCompact(highPremium.premiumNotional), "flat")}
      ${focusExtremeButton(state.lang === "zh" ? "CP 极值" : "CP high", highCp, ratio(highCp.cpRatio), "hot")}
      ${focusExtremeButton(state.lang === "zh" ? "防守极值" : "CP low", lowCp, ratio(lowCp.cpRatio), "cool")}
    </div>
    ${focusWindowStack(series)}
    ${focusSessionTape(series)}
    <div class="focus-charts">
      <div><span>${state.lang === "zh" ? "成交量" : "Volume"}</span>${sparkline(series, "totalVol", 280, 62, tone === "hot" ? "#c45335" : tone === "cool" ? "#2f6190" : "#9a6a12")}</div>
      <div><span>${state.lang === "zh" ? "权利金" : "Premium"}</span>${sparkline(series, "premiumNotional", 280, 62, "#9a6a12")}</div>
      <div><span>CP</span>${sparkline(series, "cpRatio", 280, 62, "#148355")}</div>
    </div>
  `;
}

function focusWindowStack(series) {
  const windows = [5, 20, 60]
    .map((period) => focusWindowStats(series, period))
    .filter(Boolean);
  if (!windows.length) return "";
  const lead = windows.reduce((best, item) => Math.abs(item.volumeMove) > Math.abs(best.volumeMove) ? item : best, windows[0]);
  const tone = lead.volumeMove >= 12 || lead.premiumMove >= 18 ? "hot" : lead.volumeMove <= -12 || lead.premiumMove <= -18 ? "cool" : "flat";
  const label = state.lang === "zh" ? "标的短中长节奏" : "Symbol window rhythm";
  const summary = state.lang === "zh"
    ? `${lead.label} 成交 ${lead.volumeMove >= 0 ? "+" : ""}${fmt1.format(lead.volumeMove)}%，权利金 ${lead.premiumMove >= 0 ? "+" : ""}${fmt1.format(lead.premiumMove)}%。`
    : `${lead.label} volume ${lead.volumeMove >= 0 ? "+" : ""}${fmt1.format(lead.volumeMove)}%, premium ${lead.premiumMove >= 0 ? "+" : ""}${fmt1.format(lead.premiumMove)}%.`;
  return `
    <div class="focus-window-stack">
      <div class="focus-window-lead ${tone}">
        <span>${label}</span>
        <strong>${lead.label}</strong>
        <small>${summary}</small>
      </div>
      <div class="focus-window-cards">
        ${windows.map((item) => focusWindowCard(item)).join("")}
      </div>
    </div>
  `;
}

function focusWindowStats(series, period) {
  if (series.length < 2) return null;
  const size = Math.min(period, series.length);
  const current = series.slice(-size);
  const previous = series.slice(Math.max(0, series.length - size * 2), series.length - size);
  const base = previous.length ? previous : series.slice(0, Math.max(1, Math.min(size, series.length - current.length)));
  if (!current.length || !base.length) return null;
  const currentVol = average(current.map((row) => row.totalVol));
  const baseVol = average(base.map((row) => row.totalVol));
  const currentPremium = average(current.map((row) => row.premiumNotional));
  const basePremium = average(base.map((row) => row.premiumNotional));
  const currentCp = average(current.map((row) => row.cpRatio));
  const baseCp = average(base.map((row) => row.cpRatio));
  const volumeMove = baseVol ? ((currentVol - baseVol) / baseVol) * 100 : 0;
  const premiumMove = basePremium ? ((currentPremium - basePremium) / basePremium) * 100 : 0;
  const cpMove = currentCp - baseCp;
  const tone = volumeMove >= 12 || premiumMove >= 18 ? "hot" : volumeMove <= -12 || premiumMove <= -18 ? "cool" : "flat";
  return { label: `${size}D`, tone, volumeMove, premiumMove, cpMove, currentVol, currentPremium, currentCp };
}

function focusWindowCard(item) {
  const volumeWidth = Math.max(8, Math.min(100, 50 + item.volumeMove));
  const premiumWidth = Math.max(8, Math.min(100, 50 + item.premiumMove * 0.55));
  const cpWidth = Math.max(8, Math.min(100, 50 + item.cpMove * 42));
  return `
    <span class="${item.tone}">
      <i>${item.label}</i>
      <b>${item.volumeMove >= 0 ? "+" : ""}${fmt1.format(item.volumeMove)}%</b>
      <small>${state.lang === "zh" ? "权利金" : "premium"} ${item.premiumMove >= 0 ? "+" : ""}${fmt1.format(item.premiumMove)}% · CP ${item.cpMove >= 0 ? "+" : ""}${fmt2.format(item.cpMove)}</small>
      <em class="vol" style="--w:${volumeWidth.toFixed(1)}%"></em>
      <em class="prem" style="--w:${premiumWidth.toFixed(1)}%"></em>
      <em class="cp" style="--w:${cpWidth.toFixed(1)}%"></em>
    </span>
  `;
}

function focusExtremeButton(label, row, value, tone) {
  return `
    <button type="button" class="${tone}" data-jump-date="${row.date}">
      <span>${escapeHtml(label)}</span>
      <b>${escapeHtml(String(value || "--"))}</b>
      <small>${shortDate(row.date)}</small>
    </button>
  `;
}

function focusSessionTape(series) {
  const sample = series.slice(-28);
  if (sample.length < 2) return "";
  const maxVol = Math.max(...sample.map((row) => Number(row.totalVol) || 0), 1);
  const buttons = sample.map((row, index) => {
    const prev = sample[index - 1];
    const move = prev?.totalVol ? ((Number(row.totalVol) - Number(prev.totalVol)) / Number(prev.totalVol)) * 100 : 0;
    const cp = Number(row.cpRatio) || 0;
    const tone = move >= 12 || cp >= 2 ? "hot" : move <= -12 || cp <= 0.8 ? "cool" : "flat";
    const active = row.date === state.day.tradeDate ? " active" : "";
    const height = Math.max(10, ((Number(row.totalVol) || 0) / maxVol) * 100);
    const title = `${row.date} · ${wan(row.totalVol)} · CP ${ratio(row.cpRatio)} · ${move >= 0 ? "+" : ""}${fmt1.format(move)}%`;
    return `
      <button type="button" class="${tone}${active}" data-jump-date="${row.date}" title="${escapeHtml(title)}" style="--h:${height.toFixed(1)}%">
        <i></i>
        <span>${index % 5 === 0 || active || index === sample.length - 1 ? shortDate(row.date) : ""}</span>
      </button>
    `;
  }).join("");
  return `
    <div class="focus-session-tape">
      <div>
        <span>${state.lang === "zh" ? "标的节奏带" : "Symbol rhythm"}</span>
        <b>${sample.length}D</b>
      </div>
      <div class="focus-session-cells">${buttons}</div>
    </div>
  `;
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
  const prev20 = series.slice(0, -1).slice(-20);
  const avg20 = average(prev20.map((row) => row.totalVol));
  const volumeDelta20 = avg20 ? ((Number(current.totalVol) - avg20) / avg20) * 100 : 0;
  const premiumAvg = average(prev20.map((row) => row.premiumNotional));
  const premiumDelta20 = premiumAvg ? ((Number(current.premiumNotional) - premiumAvg) / premiumAvg) * 100 : 0;
  const cpAvg = average(series.map((row) => row.cpRatio));
  const volumeRank = percentileRank(current.totalVol, series.map((row) => row.totalVol));
  const cpDrift = (Number(current.cpRatio) || 0) - cpAvg;
  const tooltipTone = volumeDelta20 >= 18 || premiumDelta20 >= 24 || cpDrift >= 0.28
    ? "hot"
    : volumeDelta20 <= -18 || premiumDelta20 <= -24 || cpDrift <= -0.28
      ? "cool"
      : "flat";
  const read = state.lang === "zh"
    ? `20D 成交 ${volumeDelta20 >= 0 ? "+" : ""}${fmt1.format(volumeDelta20)}%，权利金 ${premiumDelta20 >= 0 ? "+" : ""}${fmt1.format(premiumDelta20)}%，历史分位 ${fmt0.format(volumeRank)}%。`
    : `20D volume ${volumeDelta20 >= 0 ? "+" : ""}${fmt1.format(volumeDelta20)}%, premium ${premiumDelta20 >= 0 ? "+" : ""}${fmt1.format(premiumDelta20)}%, ${fmt0.format(volumeRank)} percentile.`;
  return `
    <div class="tip-head">
      <strong>${escapeHtml(symbol)}</strong>
      <span>${current.category || ""}</span>
    </div>
    <div class="tip-read ${tooltipTone}">
      <b>${tooltipTone === "hot" ? (state.lang === "zh" ? "升温" : "warming") : tooltipTone === "cool" ? (state.lang === "zh" ? "降温" : "cooling") : (state.lang === "zh" ? "均衡" : "balanced")}</b>
      <span>${escapeHtml(read)}</span>
    </div>
    <div class="tip-chart">
      <span>${state.lang === "zh" ? "60 日成交轨迹" : "60-session volume"}</span>
      ${sparkline(series, "totalVol", 232, 54, delta >= 0 ? "#c45335" : "#2f6190")}
    </div>
    <div class="tip-bands">
      ${tooltipBand("20D Vol", `${volumeDelta20 >= 0 ? "+" : ""}${fmt1.format(volumeDelta20)}%`, `${state.lang === "zh" ? "分位" : "rank"} ${fmt0.format(volumeRank)}%`, 50 + volumeDelta20 * 0.58, volumeDelta20 >= 18 ? "hot" : volumeDelta20 <= -18 ? "cool" : "flat")}
      ${tooltipBand(state.lang === "zh" ? "权利金" : "Premium", `${premiumDelta20 >= 0 ? "+" : ""}${fmt1.format(premiumDelta20)}%`, moneyCompact(current.premiumNotional), 50 + premiumDelta20 * 0.45, premiumDelta20 >= 24 ? "hot" : premiumDelta20 <= -24 ? "cool" : "flat")}
      ${tooltipBand("CP", ratio(current.cpRatio), `${cpDrift >= 0 ? "+" : ""}${fmt2.format(cpDrift)} vs avg`, 50 + cpDrift * 42, cpDrift >= 0.28 ? "hot" : cpDrift <= -0.28 ? "cool" : "flat")}
    </div>
    <div class="tip-mini">
      <span>${state.lang === "zh" ? "权利金" : "Premium"} ${sparkline(series, "premiumNotional", 112, 30, "#9a6a12")}</span>
      <span>CP ${sparkline(series, "cpRatio", 112, 30, "#148355")}</span>
    </div>
    <div class="tip-grid">
      <span>${state.lang === "zh" ? "当日成交" : "Volume"} <b>${wan(current.totalVol)}</b></span>
      <span>${state.lang === "zh" ? "权利金" : "Premium"} <b>${moneyCompact(current.premiumNotional)}</b></span>
      <span>CP <b>${ratio(current.cpRatio)}</b></span>
      <span>${series.length}${state.lang === "zh" ? "日变化" : "D move"} <b>${delta >= 0 ? "+" : ""}${fmt1.format(delta)}%</b></span>
      <span>20D Vol <b>${volumeDelta20 >= 0 ? "+" : ""}${fmt1.format(volumeDelta20)}%</b></span>
      <span>20D Prem <b>${premiumDelta20 >= 0 ? "+" : ""}${fmt1.format(premiumDelta20)}%</b></span>
      <span>${state.lang === "zh" ? "均值 CP" : "Avg CP"} <b>${ratio(cpAvg)}</b></span>
    </div>
    <div class="tip-contract">
      <span>${state.lang === "zh" ? "热门合约" : "Top contract"}</span>
      <b>${escapeHtml(current.hottestShort || "--")}</b>
    </div>
  `;
}

function tooltipBand(label, value, sub, width, tone) {
  return `
    <span class="${tone}">
      <i>${escapeHtml(label)}</i>
      <b>${escapeHtml(value)}</b>
      <small>${escapeHtml(sub)}</small>
      <em style="--w:${Math.max(8, Math.min(100, width)).toFixed(1)}%"></em>
    </span>
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
  fitReportCanvas();
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
    const wrapper = document.createElement("div");
    wrapper.className = "export-clone";
    const clone = report.cloneNode(true);
    wrapper.appendChild(clone);
    document.body.appendChild(wrapper);
    let canvas;
    try {
      canvas = await window.html2canvas(clone, {
        backgroundColor: "#ffffff",
        scale: 2.5,
        useCORS: true,
        logging: false,
      });
    } finally {
      wrapper.remove();
    }
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

function fitReportCanvas() {
  const canvas = $("reportCanvas");
  const sheet = canvas?.querySelector(".kzg-sheet");
  if (!canvas || !sheet) return;
  const available = Math.max(1, canvas.clientWidth);
  const scale = Math.min(1, available / 760);
  canvas.style.setProperty("--sheet-scale", scale.toFixed(4));
  canvas.classList.toggle("is-scaled", scale < 0.999);
  canvas.style.height = scale < 0.999 ? `${Math.ceil(sheet.scrollHeight * scale)}px` : "";
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
