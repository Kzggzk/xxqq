# CHANGLOG 期权终端

This is the long-form bilingual operating changelog for the KZG option-terminal SaaS. It is written for another authorized agent, not only for Fangbao. The purpose is continuity: a new Codex should understand what exists, what is public, what is private, what must not be leaked, and what the next dense versions should do.

这是 KZG 期权终端 SaaS 的长格式双语操作日志。它不是只写给 Fangbao 看的，而是写给下一个被授权接手的 agent。目标是连续性：新的 Codex 应该能看懂现在有什么、什么能公开、什么只能内部、什么绝不能泄漏、下一批稠密版本应该做什么。

## 0. Naming / 命名

- Owner-facing note title / Apple Notes 置顶标题: `CHANGLOG 期权终端`
- GitHub canonical document / GitHub 标准文档: `docs/CHANGLOG_OPTION_TERMINAL.md`
- Supporting changelog / 辅助日志: `docs/CHANGELOG.md`
- Handoff manual / 接手手册: `docs/HANDOFF_FOR_OTHER_CODEX.md`
- Dense cadence contract / 稠密版本契约: `docs/DENSE_VERSIONING.md`
- Real-time API product plan / 实时 API 产品规划: `docs/MASSIVE_REALTIME_PRODUCT_PLAN.md`

Spelling note: `CHANGLOG` preserves Fangbao's requested name exactly.

拼写说明：`CHANGLOG` 按 Fangbao 指定的名字保留。

## 1. Current verified state / 当前已核状态

中文:

- 工作目录: `/Users/fangbao/kzg-options-minute-site`
- Git 根目录: `/Users/fangbao`
- 分支: `feat/kzg-option-house-daily-auto`
- 远端: `https://github.com/Kzggzk/xxqq.git`
- 生产站: `https://kzg-option-house.netlify.app/`
- 最近生产风险修复 commit: `6c909a9 remove public commercial planning from option house`
- 最近验证唯一部署: `https://6a155f54945106b4d1611609--kzg-option-house.netlify.app/`
- 最近公开 UI 显示版本: `1.32`
- 当前本机可证实期权分钟数据: `505` 个 `options_minute_aggregates_*.csv.gz`
- 当前本机可证实数据范围: `2024-05-17 -> 2026-05-22`
- `2023-05` 状态: 作为 Fangbao 提到的目标/权限/API 路线继续追踪；当前本机目录没有找到 `2023-*.csv.gz`
- Apple Notes: 需要置顶同名 note，作为 owner-facing 操作日志
- GitHub: 需要持续提交 docs，让另一个 Codex 能从仓库继续

English:

- Workspace: `/Users/fangbao/kzg-options-minute-site`
- Git root: `/Users/fangbao`
- Branch: `feat/kzg-option-house-daily-auto`
- Remote: `https://github.com/Kzggzk/xxqq.git`
- Production site: `https://kzg-option-house.netlify.app/`
- Latest public-risk fix commit: `6c909a9 remove public commercial planning from option house`
- Latest verified unique deploy: `https://6a155f54945106b4d1611609--kzg-option-house.netlify.app/`
- Latest visible public UI version: `1.32`
- Current locally proven option-minute files: `505` `options_minute_aggregates_*.csv.gz`
- Current locally proven data window: `2024-05-17 -> 2026-05-22`
- `2023-05` status: keep as Fangbao's target/API-entitlement path; no local `2023-*.csv.gz` files were found in the verified folder
- Apple Notes: maintain a pinned note with this title for owner-facing continuity
- GitHub: keep docs committed so another Codex can continue from the repository

## 2. Why this exists / 为什么必须有这个日志

中文:

Fangbao 在北京时间 2026-05-26 下午阶段明确提出：这不是普通日志，而是“another agent whenever pick up the project”的接手材料。日志必须中英文都有，必须能解释系统由什么构成，必须记录在哪个版本附近提出了更大 SaaS 规划，必须比普通 commit message 详细一个数量级。

English:

On 2026-05-26 Asia/Shanghai afternoon, Fangbao explicitly clarified that this is not a normal owner log. It is handoff material for another agent picking up the project. It must be bilingual, explain what the system is made of, record roughly which version introduced the larger SaaS direction, and be far more detailed than commit messages.

Operational consequence:

操作后果：

- Every important decision must be written twice: concise English and precise Simplified Chinese.
- 重要决策要写两遍：简洁英文和准确简体中文。
- GitHub docs are mandatory, not optional.
- GitHub 文档是必须项，不是可选项。
- Apple Notes pinned log is the live owner notebook.
- Apple Notes 置顶日志是 owner 的现场笔记本。
- Public website must not become the planning notebook.
- 公开网站不能变成内部规划笔记本。

## 3. System mind map / 系统脑图

This outline is intentionally MindNode-style. If a visual MindNode artifact is needed, import `docs/CHANGLOG_OPTION_TERMINAL_MINDMAP.opml` into MindNode Next.

下面这个大纲故意按 MindNode 风格写。如果需要可视化 MindNode 文件，可以把 `docs/CHANGLOG_OPTION_TERMINAL_MINDMAP.opml` 导入 MindNode Next。

```text
CHANGLOG 期权终端
  SaaS Product / SaaS 产品
    Public dashboard / 公开仪表盘
      Latest day free insight / 最新日免费洞察
      Timeline and selected history / 时间轴与精选历史
      KZG-branded PNG export / KZG 品牌 PNG 导出
      Bilingual UI and theme switch / 中英文与深浅色
      Blur previews for advanced power / 高级功能模糊预览
    Paid product / 付费产品
      Historical lookback / 历史回看
      Rotation quadrant history / 轮动象限历史
      Symbol rooms / 标的房间
      Predictive momentum panels / 预测动量面板
      Clean export policy / 无水印导出策略
      Real-time derived feed after license approval / 授权后实时派生 feed
  Identity / 身份
    Registration / 注册
    Login / 登录
    User account / 用户账户
    Password or magic link / 密码或 magic link
    Wallet identity later / 钱包身份后置
    Entitlement state / 权限状态
  Backend / 后端
    Supabase candidate / Supabase 候选
      auth.users / 用户
      profiles / 用户资料
      subscriptions / 订阅
      entitlements / 权限
      usage_events / 使用记录
      export_jobs / 导出记录
    API layer / API 层
      Massive ingestion private only / Massive 私有采集
      Signal generation / 信号生成
      Cache snapshots / 快照缓存
      Fanout to frontend / 分发到前端
  Data / 数据
    Massive flat files / Massive Flat Files
      Options minute aggregates / 期权分钟聚合
      Current local proof 2024-05-17 to 2026-05-22 / 当前本地已证范围
      2023-05 target re-audit / 2023-05 目标复核
    Future realtime / 未来实时
      WebSocket ingest backend only / WebSocket 只进后端
      No API key in browser / 浏览器不放 API key
      Business license required for public resale / 公开销售需商业授权
  Payments / 支付
    USD / 美国钱
      Stripe Checkout / Stripe 结账
      Stripe Billing / Stripe 订阅
      Customer Portal / 客户自助管理
    China money / 中国钱
      WeChat merchant route / 微信商户路线
      QR/manual bridge early / 早期二维码或人工桥接
      Later merchant API / 后期商户 API
    USDT / 稳定币
      Wallet connect later / 钱包连接后置
      Address mapping / 地址映射
      Manual confirmation before automation / 自动化前先人工确认
  Domain and deploy / 域名与部署
    Domain candidate research / 域名候选研究
    Stop before purchase / 购买前必须停下确认
    Netlify production / Netlify 生产站
    DNS connection / DNS 连接
    GitHub backup / GitHub 备份
  Protection / 保护
    No raw data commit / 不提交 raw 数据
    No public commercial internals / 公开站不放商业内部
    Right-click/copy/drag friction / 右键复制拖拽阻力
    PNG-only user export / 用户只导出 PNG
    Secrets in backend/keychain only / 密钥只进后端或 Keychain
```

## 4. Version moment when Fangbao expanded the product / Fangbao 扩展产品时的版本节点

中文:

这个“大 SaaS + 登录 + 支付 + 域名 + Supabase + API 后端 + 三种支付 + 另一个 Codex 可接手”的要求，是在公开站已经经历 v55 UI 迭代、并且 public 商业规划被紧急下线之后提出和强化的。Git 主干里对应最近节点是 `6c909a9` 之后的文档层，也就是本日志定义的 `v1.28/v1.29` 交接层。它不是一个公开 UI 新功能，而是产品操作系统层的升级。

English:

The larger requirement - SaaS, login, payments, domain, Supabase, backend API, three payment rails, and handoff for another Codex - was clarified after the public dashboard had already gone through the v55 UI phase and after public commercial planning was urgently removed. In the Git backbone, it belongs immediately after `6c909a9`, in the documentation/operating-memory layer defined here as `v1.28/v1.29`. It is not a public UI feature; it is an upgrade to the product operating system.

## 5. SaaS architecture / SaaS 架构

中文:

期权终端卖的不是原始 CSV 文件。它卖的是把 Massive 期权分钟聚合、未来实时行情、历史回看、轮动象限、标的房间、导出报告，全部压缩成用户能理解、能每天打开、能截图传播、能帮助决策的 SaaS 服务。

English:

The option terminal does not sell raw CSV files. It sells a SaaS service that turns Massive option minute aggregates, future real-time feeds, history lookback, rotation quadrants, symbol rooms, and PNG reports into something users can understand, revisit daily, share as branded screenshots, and use for decision support.

Core layers:

核心层：

1. Frontend dashboard / 前端仪表盘
   - Public latest-day view, timeline, charts, tables, hover panels, PNG export.
   - 公开最新日、时间轴、图表、表格、hover 面板、PNG 导出。
2. Entitlement layer / 权限层
   - Decides free vs paid, latest-day vs historical, watermarked vs clean export, blurred vs opened panels.
   - 决定免费/付费、当日/历史、水印/无水印、模糊/开放。
3. Auth layer / 登录层
   - Email/password or magic link first; wallet identity later; WeChat identity only after product need is clear.
   - 优先邮箱/密码或 magic link；钱包身份后置；微信身份等产品需要明确后再做。
4. Data backend / 数据后端
   - Private Massive ingestion, local flat-file builder, future WebSocket collector, signal generation, cache.
   - 私有 Massive 采集、本地 flat-file builder、未来 WebSocket collector、信号生成、缓存。
5. Payment backend / 支付后端
   - Stripe for USD, WeChat route for China money, USDT route for crypto.
   - Stripe 处理美元，微信路线处理人民币，USDT 路线处理加密支付。
6. Deployment layer / 部署层
   - Netlify frontend, GitHub source backup, future domain/DNS connection.
   - Netlify 前端，GitHub 源码备份，未来域名/DNS 连接。

## 6. Supabase candidate schema / Supabase 候选结构

This is not implemented yet. It is the handoff design for when Fangbao approves backend/auth work.

尚未实现。这是 Fangbao 批准后端/登录工作后的接手设计。

```text
auth.users
  Supabase managed identity.
  Supabase 管理的用户身份。

profiles
  id, display_name, locale, timezone, created_at.
  用户资料、语言、时区。

subscriptions
  user_id, provider, provider_customer_id, plan_code, status, current_period_end.
  用户订阅、支付渠道、套餐、状态、周期。

entitlements
  user_id, feature_key, granted_until, source, notes.
  功能权限、到期时间、来源。

usage_events
  user_id, event_type, trade_date, symbol, created_at.
  使用记录、导出、查看、点击。

export_jobs
  user_id, trade_date, language, theme, watermark_mode, output_url, created_at.
  PNG 导出任务。

signal_snapshots
  trade_date, version, payload_hash, storage_path, created_at.
  派生信号快照，不直接暴露原始数据。
```

## 7. Payment rails / 三条支付路线

中文:

这三条路线都要先作为产品规划写清楚，不能直接上线真实收款。任何花钱、买域名、创建 Stripe 商品、连接钱包、使用微信商户凭证，都必须停下来让 Fangbao 介入。

English:

All three payment rails should be documented before they become real collection flows. Any spend, domain purchase, Stripe product creation, wallet connection, or WeChat merchant credential use must stop and wait for Fangbao.

USD:

美元：

- Stripe Checkout for first paid plan.
- Stripe Checkout 做第一条付费路线。
- Stripe Billing for recurring plans.
- Stripe Billing 做订阅。
- Customer Portal for upgrade/downgrade/cancel/invoice.
- Customer Portal 管理升级、降级、取消和发票。

China money:

人民币：

- Early bridge can be QR/manual confirmation.
- 早期可以二维码/人工确认。
- Later bridge should be merchant API only after compliance and operational need are clear.
- 后期只有在合规和运营需求明确后再接商户 API。

USDT:

USDT：

- Wallet login is not the same as payment.
- 钱包登录不等于支付。
- Start with address mapping and manual confirmation if needed.
- 如需要，先地址映射和人工确认。
- Automate only after fraud/accounting rules exist.
- 有反欺诈和账务规则后再自动化。

## 8. Free vs paid line / 免费与付费边界

Free should be useful enough to prove value. Paid should feel obviously deeper without leaking raw data.

免费版要有足够价值证明产品。付费版要明显更深，但不能泄漏原始数据。

Free:

免费：

- latest trading day / 最新交易日；
- top tables / 核心 Top 表；
- basic rotation snapshot / 基础轮动快照；
- watermarked PNG export / 带水印 PNG；
- blurred premium modules / 模糊高级模块。

Paid:

付费：

- historical lookback / 历史回看；
- predictive momentum panels / 预测动量面板；
- symbol rooms / 标的房间；
- rotation quadrant history / 轮动象限历史；
- deeper hover charts / 更深 hover 图；
- export policy upgrade if approved / 批准后导出策略升级；
- future real-time derived feed after legal/business entitlement / 商业授权后开放实时派生 feed。

## 9. Massive and API boundary / Massive 与 API 边界

中文:

Massive `$199/month` Options Advanced 看起来很适合作为 owner 研究和私有采集层：实时数据、5+ 年历史、WebSocket、Quotes、Trades、Greeks/IV、Flat Files 都很强。但它不能默认用于公开付费 SaaS 的实时数据再分发。Massive/Polygon 市场数据条款对个人非商业使用、公开展示、再分发、终端用户 app 有明确限制。正确路线是后端采集、生成自有派生指标、给前端发紧凑信号，同时在正式售卖实时 feed 前确认 Business/商业授权。

English:

Massive `$199/month` Options Advanced looks strong for owner-side research and private ingestion: real-time data, 5+ years of history, WebSockets, quotes, trades, Greeks/IV, and flat files. It should not be assumed to permit public paid SaaS redistribution of real-time data. Massive/Polygon market data terms restrict personal/non-commercial use, public display, redistribution, and end-user apps. The correct route is backend ingestion, proprietary derived metrics, compact frontend signals, and Business/commercial entitlement before selling live feed access.

## 10. Domain and deployment / 域名与部署

中文:

当前生产站在 Netlify，未来要买正式域名时，先做候选研究，然后停下来让 Fangbao 确认。不要把候选域名和价格放到公开网页。买完域名后，流程是域名 DNS 指向 Netlify、Netlify 配 custom domain、启用 HTTPS、更新 GitHub docs 和 Apple Notes。

English:

Current production is on Netlify. When a real domain is needed, research candidates first and stop for Fangbao confirmation. Do not put candidate domains or prices on the public page. After purchase, connect DNS to Netlify, configure custom domain, enable HTTPS, and update GitHub docs plus Apple Notes.

## 11. Protection model / 保护模型

中文:

用户可以买服务、看图、导出 PNG，但不能从页面轻松拿 raw data 或 internal planning。右键、拖拽、复制、公开数据 URL、打包 asset 路径都要保持摩擦。注意：这不是绝对安全，只是提高攫取成本；真正的 raw data 不能放公开端。

English:

Users can buy service, read charts, and export PNG, but should not easily extract raw data or internal planning from the page. Right-click, drag, copy, public data URLs, and packed asset paths should remain frictional. This is not absolute security; it only raises scraping cost. Truly sensitive raw data must not live on the public client.

## 12. Next dense version instructions / 下一批稠密版本指令

中文:

- v1.30: Apple Notes 置顶日志与 GitHub changlog 同步成双语、长格式、可交接。
- v1.31: 继续优化公开 dashboard 的 spacing/calligraphy，去掉任何方块堆叠不统一感。
- v1.32: 把模糊高级预览做得更有“看得见威力但拿不到细节”的感觉。
- v1.33: 梳理 Supabase/Auth/Stripe/WeChat/USDT 的内部路线图，但只进文档，不进公开站。
- v1.34: 重新核查 2023-05 数据路线：本地、iCloud、Google Drive、Massive S3/API/plan entitlement 分开写证据。
- v1.35: 生产部署一次视觉扎实版本，并推 GitHub。

English:

- v1.30: Synchronize the pinned Apple Notes log and GitHub changlog as bilingual, long-form, handoff-grade material.
- v1.31: Continue public dashboard spacing/calligraphy work and remove any visually inconsistent block-grid feeling.
- v1.32: Make blurred premium previews feel powerful without revealing the underlying detail.
- v1.33: Write the internal Supabase/Auth/Stripe/WeChat/USDT route map into docs only, not public site.
- v1.34: Re-audit the 2023-05 data route with separate evidence for local, iCloud, Google Drive, Massive S3/API, and plan entitlement.
- v1.35: Deploy one solid visual version to production and push GitHub.

## 14. Heartbeat v1.31 visual trace / 心跳 v1.31 视觉留痕

中文:

北京时间 2026-05-26 16:25 心跳执行 v1.31。目标是继续 spacing calligraphy，而不是扩大公开商业功能。改动文件为 `/Users/fangbao/kzg-options-minute-site/public/app.js`、`/Users/fangbao/kzg-options-minute-site/public/styles.css`、`/Users/fangbao/kzg-options-minute-site/docs/CHANGELOG.md`、`/Users/fangbao/kzg-options-minute-site/docs/CHANGLOG_OPTION_TERMINAL.md`。视觉重点是把分钟热力图继续从硬方块改成柔和 lane，把背景网格存在感降低，把高级预览 blur 的卡片透明度和半径统一，并补上移动端 topbar/grid 防横向溢出约束。构建生成 `505` 天 payload，生产部署为 `https://6a155a982b0a5da4f255af13--kzg-option-house.netlify.app/`，smoke check 结果为 `home=200`、`/latest=200`、`/data/index.json=404`、`/assets/kzg-pack.js=404`、`/app.js` 显示 `UI_VERSION = "1.31"`。公开边界保持不变：不放支付、注册、域名、API key、Massive 套餐或 Stripe/Supabase 内部路线。

English:

The 2026-05-26 16:25 Asia/Shanghai heartbeat ran v1.31. The goal was spacing and calligraphy, not expanded public commercial function. Changed files: `/Users/fangbao/kzg-options-minute-site/public/app.js`, `/Users/fangbao/kzg-options-minute-site/public/styles.css`, `/Users/fangbao/kzg-options-minute-site/docs/CHANGELOG.md`, and `/Users/fangbao/kzg-options-minute-site/docs/CHANGLOG_OPTION_TERMINAL.md`. The visual focus was moving the minute heatmap further away from hard block language into softer lanes, reducing background grid presence, unifying radius/opacity in blurred advanced preview surfaces, and adding mobile topbar/grid overflow protection. Build produced a `505`-day payload. Production unique deploy is `https://6a155a982b0a5da4f255af13--kzg-option-house.netlify.app/`; smoke check passed with `home=200`, `/latest=200`, `/data/index.json=404`, `/assets/kzg-pack.js=404`, and `/app.js` showing `UI_VERSION = "1.31"`. Public boundary stays unchanged: no payment, registration, domain, API key, Massive plan, Stripe, or Supabase internals on the public page.

## 13. Cross-terminal traceability doctrine / 跨终端留痕原则

中文:

Fangbao 在 2026-05-26 进一步定义了这套工作的 master level 原则：任何一个终端里提出的需求或做出的差异，都必须能被另一个终端接住。这里的终端不是只指 Terminal app，而是所有工具与材料所在地，包括 GitHub、iCloud、Google Drive、Netlify、Stripe、Supabase、Network Solutions、Apple Notes、本地私有目录、自动化任务和当前对话。每个位置都要写清职责、当前状态、下一步、风险和证据。这样另一个 AI 只要拿到 changlog 或复制到新 Codex，就能搜索关键词找到上下文，继续推进，而不是重新猜项目。

English:

On 2026-05-26 Fangbao further defined the master-level principle: any requirement raised or difference made in one terminal must be recoverable from another place. Terminal here means every tool and material location, not only the Terminal app: GitHub, iCloud, Google Drive, Netlify, Stripe, Supabase, Network Solutions, Apple Notes, local private folders, automations, and the current conversation. Each place needs ownership, current state, next action, risk, and evidence. Then another AI can receive the changlog, search keywords, and continue without rediscovering the project.

Required trace fields:

必要留痕字段：

- source terminal or tool / 来源终端或工具；
- target artifact / 目标产物；
- absolute path or service name / 绝对路径或服务名；
- owner-facing reason / 给 owner 看的原因；
- agent-facing implementation state / 给 agent 看的实现状态；
- public/private boundary / 公开与私有边界；
- latest data range / 最新数据范围；
- Git commit or deployment URL / Git 提交或部署链接；
- blocked action requiring Fangbao / 需要 Fangbao 介入的阻塞动作；
- next dense version / 下一稠密版本。

The reusable Text Replacement prompt for this doctrine lives at:

这套理念的可复用 Text Replacement 提示词在：

`/Users/fangbao/kzg-options-minute-site/docs/TEXT_REPLACEMENT_TRACEABLE_SAAS_PROMPT.md`

Character count:

字符数：

`1951`

## 15. Heartbeat v1.32 lower-cockpit trace / 心跳 v1.32 下半屏节奏留痕

中文:

北京时间 2026-05-26 16:40 心跳进入 v1.32。触发条件是 Fangbao 要求继续按 paid-product/UI goal 稠密迭代，同时明确内部商业路线不能放公开页面。本轮目标不是添加付费流程，而是把公开 dashboard 的下半屏做得更紧、更统一、更像成熟产品能力预览。改动文件为 `/Users/fangbao/kzg-options-minute-site/public/app.js`、`/Users/fangbao/kzg-options-minute-site/public/styles.css`、`/Users/fangbao/kzg-options-minute-site/public/index.html`、`/Users/fangbao/kzg-options-minute-site/public/favicon.svg`、`/Users/fangbao/kzg-options-minute-site/scripts/build_payload.py`、`/Users/fangbao/kzg-options-minute-site/docs/CHANGELOG.md`、`/Users/fangbao/kzg-options-minute-site/docs/CHANGLOG_OPTION_TERMINAL.md`。公开 UI 版本号从 `1.31` 提到 `1.32`。视觉改动集中在高级预览区域：压缩 `.premium-preview` 外边距和内边距，重排 `.data-audit-seal`、`.premium-unlock-deck`、`.premium-signal-stack`、`.premium-quadrant` 的桌面列宽，降低卡片大字、tab 高度、lookback chart 和 signal tape 高度，并在 `1180px` 以下统一退回单列，减少桌面窄宽下的空白块。额外修复：增加 `favicon.svg` 并纳入 build copy，清掉浏览器 favicon 404 噪音。公开安全检查继续执行：本轮没有加入 Stripe、支付、域名候选、API key、Massive 套餐价格、Supabase 或真实注册路线。验证结果：build 生成 `505` 天 payload，最新日 `2026-05-22`，pack asset `kzg-frame-592efcfd3a2e.js`；本地桌面 `1440x1100` 与手机 `390x844` 截图无横向溢出；公开风险词检索为 0；PNG 导出生成 `kzg-option-house-2026-05-22-zh.png`，大小约 `1.47MB`；生产 smoke 为 `home=200`、`/latest=200`、`/data/index.json=404`、`/favicon.svg=200`、`/app.js` 显示 `UI_VERSION = "1.32"`。部署链接：`https://6a155f54945106b4d1611609--kzg-option-house.netlify.app/`。下一步 v1.33 继续处理移动端高级预览、底部 analysis panel 的进入节奏和 PNG 导出保真。

English:

The 2026-05-26 16:40 Asia/Shanghai heartbeat entered v1.32. The trigger was Fangbao's instruction to continue the dense paid-product/UI goal while keeping internal commercial routes off the public page. This version does not add a payment flow. It tightens the lower public dashboard so the advanced preview feels more unified, more compact, and more like a mature product capability layer. Changed files are `/Users/fangbao/kzg-options-minute-site/public/app.js`, `/Users/fangbao/kzg-options-minute-site/public/styles.css`, `/Users/fangbao/kzg-options-minute-site/public/index.html`, `/Users/fangbao/kzg-options-minute-site/public/favicon.svg`, `/Users/fangbao/kzg-options-minute-site/scripts/build_payload.py`, `/Users/fangbao/kzg-options-minute-site/docs/CHANGELOG.md`, and `/Users/fangbao/kzg-options-minute-site/docs/CHANGLOG_OPTION_TERMINAL.md`. Public UI version moved from `1.31` to `1.32`. Visual changes focus on the advanced preview: reduced `.premium-preview` outer/inner spacing, rebalanced desktop column widths for `.data-audit-seal`, `.premium-unlock-deck`, `.premium-signal-stack`, and `.premium-quadrant`, lowered oversized card type, tab height, lookback chart height, and signal tape height, and added a `1180px` one-column fallback to reduce awkward blank blocks on narrower desktop widths. Extra fix: added `favicon.svg` to the public shell and build copy to remove favicon 404 noise. Public safety check remains in force: no Stripe, payment, domain candidates, API keys, Massive plan prices, Supabase internals, or real registration routes were added. Verification: build produced a `505`-day payload, latest date `2026-05-22`, pack asset `kzg-frame-592efcfd3a2e.js`; local desktop `1440x1100` and mobile `390x844` screenshots showed no horizontal overflow; public risk-token scan returned 0; PNG export produced `kzg-option-house-2026-05-22-zh.png` at about `1.47MB`; production smoke passed with `home=200`, `/latest=200`, `/data/index.json=404`, `/favicon.svg=200`, and `/app.js` showing `UI_VERSION = "1.32"`. Unique deploy: `https://6a155f54945106b4d1611609--kzg-option-house.netlify.app/`. Next v1.33 should continue mobile advanced-preview rhythm, lower analysis panel entry rhythm, and PNG export fidelity.
