# Massive real-time product plan / Massive 实时数据产品规划

This is internal product architecture. Do not surface this as homepage content until Fangbao approves a public version.

这是内部产品架构文档。未经 Fangbao 批准，不要把这些内容做成主页公开内容。

## v1.51 active warning / v1.51 当前警戒线

Fangbao's Massive dashboard screenshot exposed real API keys in the conversation/browser context. Treat those keys as compromised for production purposes. Do not paste them into source, docs, Apple Notes, issue trackers, screenshots, Netlify env, iOS code, or any browser-side runtime. Do not use them from this agent session. Before any real backend integration, Fangbao should rotate/regenerate the keys inside Massive and then provide the replacement only through an approved secret channel.

Fangbao 的 Massive dashboard 截图在对话/浏览器上下文里暴露了真实 API key。按生产安全标准，应把这些 key 当作已暴露处理。不要把它们粘进源码、文档、Apple Notes、issue、截图、Netlify 环境变量、iOS 代码或任何浏览器运行时。这个 agent session 不使用这些 key。任何真实后端接入前，Fangbao 应先在 Massive 内轮换/重新生成 key，再通过批准的 secret 通道提供替换 key。

The public site may show current generated-minute analytics fully open and readable, plus a product-safe live-feed silhouette. It must not show provider names, plan prices, checkout text, account mechanics, or API implementation details. Real-time commercial delivery remains blocked until Business/OPRA display and redistribution rights are confirmed.

公开站可以完整开放当前已生成分钟数据分析，也可以展示产品安全的实时流轮廓，但不得展示供应商名、套餐价格、checkout 文案、账号机制或 API 实现细节。实时商业交付在确认 Business/OPRA 展示与再分发权利前继续阻断。

## v1.55 public UX line / v1.55 公开体验边界

v1.55 implements the product-facing split that should guide future work:

v1.55 已把未来工作应遵守的公开产品边界做进页面：

1. Current generated-minute dashboard stays open.
2. 当前已生成分钟 dashboard 保持开放。
3. Future realtime option flow is the only reserved/blurred product area.
4. 未来实时 option flow 是唯一预留/模糊的产品区域。
5. Historical intraday trends, rotation quadrant, and derived analytics stay open.
6. 历史日内趋势、轮动象限和派生分析保持开放。
7. Public UI may show a simulated/derived realtime tape, filters, strategy recognition, and Bullish/Bearish lanes, but it must not show provider names, real credentials, plan prices, checkout routes, domain candidates, or internal entitlement plumbing.
8. 公开 UI 可以展示模拟/派生实时 tape、过滤器、策略识别、Bullish/Bearish 分栏，但不得展示供应商名、真实凭证、套餐价格、checkout 路线、域名候选或内部权限管线。

This means future paid-product work should focus on a backend-only live-flow service and a dedicated realtime page, while the existing daily/history product remains an open acquisition surface.

这意味着未来付费产品工作应聚焦后端持有的 live-flow 服务和专门实时页面；现有日报/历史产品继续作为开放获客面。

## v1.56 flow-book refinement / v1.56 flow book 细化

v1.56 adds a public-safe product pattern for the future realtime page: Bullish/Bearish flow lanes now show a derived count, strategy type, day-over-day signal, and premium notional. Filters now include a `Flow Book` control and strategy recognition groups. This is still derived from existing minute aggregates and must not be mistaken for a real feed.

v1.56 为未来实时页面加入公开安全的产品形态：Bullish/Bearish flow 分栏现在显示派生次数、策略类型、日变化信号和权利金成交额。过滤器加入 `Flow Book` 控制和策略识别分组。这仍然来自现有分钟聚合派生，不能误认为真实实时 feed。

The next backend-only design step should map these public-safe fields to a future event schema:

下一步后端内部设计应把这些公开安全字段映射到未来 event schema：

- `symbol`
- `bias`
- `hitCount`
- `strategyFamily`
- `premiumNotional`
- `expirationBucket`
- `cpPressure`
- `sourceConfidence`
- `visibleTier`

No provider names, live API routes, secrets, plan prices, checkout state, or legal assumptions should enter browser code.

浏览器代码不应出现供应商名、实时 API 路由、密钥、套餐价格、checkout 状态或法律假设。

## v1.59 public spine rule / v1.59 公开脊柱规则

v1.59 adds a simple public product spine immediately after the open access strip. It should remain the public-facing mental model:

v1.59 在开放状态条后加入简单公开产品脊柱。后续公开页面应继续遵守这个心智模型：

1. Daily/yesterday data bus is open.
2. 昨日/当日数据总线开放。
3. Future realtime flow seat is reserved and mock-derived until backend approval.
4. 未来实时流席位预留，在后端确认前只能是 mock-derived。
5. Historical intraday layer is open.
6. 历史日内层开放。

The displayed public dataset label is now `23_DATA_期权分钟_Minute`. Do not reintroduce provider names, plan names, key screenshots, checkout language, or domain/pricing experiments into the homepage. If a future agent needs to mention provider/API facts, keep them in this document or another internal handoff document.

公开显示的数据标签现在是 `23_DATA_期权分钟_Minute`。不要把供应商名、套餐名、key 截图、checkout 语言或域名/价格实验重新放进主页。未来 agent 如果需要记录 provider/API 事实，只能写在本文档或其他内部交接文档里。

## Verified official facts / 已核官方事实

Checked on 2026-05-26 Asia/Shanghai against Massive official docs/pages.

以下内容于 2026-05-26 Asia/Shanghai 对 Massive 官方页面与文档核验。

- Options Advanced is listed at `$199/month` and includes real-time data, `5+ Years Historical Data`, WebSockets, snapshots, second aggregates, trades, quotes, Greeks/IV, daily open interest, flat files, reference data, corporate actions, technical indicators, and minute aggregates. Source: <https://massive.com/options>
- Options Advanced 页面列出 `$199/month`，包括实时数据、`5+ Years Historical Data`、WebSockets、Snapshot、Second Aggregates、Trades、Quotes、Greeks/IV、Daily Open Interest、Flat Files、Reference Data、Corporate Actions、Technical Indicators、Minute Aggregates。来源：<https://massive.com/options>
- Options REST snapshots can consolidate break-even, day-over-day change, implied volatility, open interest, Greeks, latest quote, latest trade, and underlying price for a contract or chain. Source: <https://massive.com/docs/rest/options/overview>
- Options REST Snapshot 可把 break-even、日变化、IV、open interest、Greeks、最新 quote、最新 trade、underlying price 汇总到合约或链层级。来源：<https://massive.com/docs/rest/options/overview>
- Options WebSocket feeds include minute aggregates, second aggregates, trades, and quotes. Trades are tick-level; quotes carry best bid/ask prices and sizes. Source: <https://massive.com/docs/websocket/options/overview>
- Options WebSocket 包括分钟聚合、秒聚合、trades 和 quotes。Trades 是 tick-level；quotes 携带 best bid/ask prices 和 sizes。来源：<https://massive.com/docs/websocket/options/overview>
- Options quote WebSocket subscriptions are capped at 1,000 option contracts per connection. Source: <https://massive.com/docs/websocket/options/quotes>
- Options Quotes WebSocket 每个连接最多订阅 1,000 个期权合约。来源：<https://massive.com/docs/websocket/options/quotes>
- Massive WebSocket quickstart says the default is one concurrent WebSocket connection per asset class, and multiple simultaneous connections require support. Source: <https://massive.com/docs/websocket>
- Massive WebSocket quickstart 写明默认每个资产类别一个并发 WebSocket 连接，需要更多同时连接要联系 support。来源：<https://massive.com/docs/websocket>
- Options Flat Files include minute aggregates, trades, and quotes sourced from OPRA, with daily S3/CSV datasets. Source: <https://massive.com/docs/flat-files/options/overview>
- Options Flat Files 包括来自 OPRA 的 minute aggregates、trades、quotes，并以 daily S3/CSV 数据集提供。来源：<https://massive.com/docs/flat-files/options/overview>
- Massive/Polygon market data terms say individual market data is personal/non-business/non-commercial and must not be used to build an end-user application or publicly distribute market data without written consent. Source: <https://massive.com/terms/market_data_terms.pdf>
- Massive/Polygon 市场数据条款写明个人市场数据用于个人、非商业用途，不能未经书面同意构建面向终端用户的应用或公开分发市场数据。来源：<https://massive.com/terms/market_data_terms.pdf>
- Business plans are the safer route for a paid public SaaS, but require direct confirmation on redistribution/display rights. Source: <https://massive.com/business-options>
- 面向付费公众 SaaS，更安全路线是 Business plan，但仍需直接确认再分发/展示权利。来源：<https://massive.com/business-options>

## Product conclusion / 产品结论

The `$199/month` individual plan can be excellent for owner-side research, private ingestion, prototype signal generation, and internal dashboards. It should not be assumed to authorize a paid public SaaS that redistributes real-time OPRA-derived data to users.

`$199/month` 个人套餐非常适合 owner 研究、私有采集、原型信号生成和内部 dashboard。但不能默认认为它允许把实时 OPRA 派生数据再分发给付费公众 SaaS 用户。

The current public product should keep generated-minute analysis, historical lookback, derived panels, rotation views, and PNG export open. The future commercial product should focus on proprietary real-time interpretation, alerts, service reliability, and account workflows after a real backend and rights are confirmed. Direct real-time feed resale should wait for a business/commercial entitlement.

当前公开产品应保持已生成分钟数据分析、历史回看、派生面板、轮动视图和 PNG 导出开放。未来商业产品应聚焦真实后端和权利确认后的自有实时解读、提醒、服务稳定性和账号工作流。直接销售实时 feed 应等 Business/商业权限确认后再做。

The best commercial framing is not "resell raw data." It is "KZG reads the option tape for the user": curated pressure, unusual burst, rotation quadrant, premium acceleration, IV/Greek context, and actionable daily/live narratives. This product should sell interpretation, not a raw OPRA pipe.

最好的商业表达不是“转售原始数据”，而是“KZG 替用户读懂期权 tape”：精选压力、异常爆发、轮动象限、权利金加速、IV/Greek 语境和可行动的日内/实时叙事。这个产品卖解释，不卖原始 OPRA 管道。

## Correct architecture / 正确架构

Do not put Massive API keys in the browser.

不要把 Massive API key 放进浏览器。

Do not let each user connect directly to Massive.

不要让每个用户直接连 Massive。

Correct flow:

正确链路：

1. Backend ingestion connects to Massive through REST, Flat Files, or WebSocket.
2. 后端采集层通过 REST、Flat Files 或 WebSocket 连接 Massive。
3. Backend curates a symbol/contract universe and computes proprietary metrics.
4. 后端筛选标的/合约池，并计算自有指标。
5. Backend stores compact snapshots, not raw redistributable feeds.
6. 后端存紧凑快照，不存面向再分发的原始 feed。
7. Frontend receives derived signals, rankings, charts, explanations, and exportable PNG.
8. 前端接收派生信号、排名、图表、解释和可导出 PNG。
9. Entitlement service, if later approved, applies only to the future real-time feed/service layer, not the current generated-minute features.
10. 如果未来批准权限服务，它只作用于未来真实实时 feed/服务层，不作用于当前已生成分钟数据功能。

Reference implementation shape:

参考实现形态：

```text
Massive REST / WebSocket / Flat Files
  -> private ingest worker
  -> contract universe selector
  -> signal engine
  -> compact snapshot store
  -> entitlement fanout API
  -> Web dashboard and iOS companion
```

No browser, static asset, or iOS binary should contain a Massive secret.

浏览器、静态资源或 iOS binary 都不能包含 Massive secret。

## 1,000-user pressure model / 1000 用户压力模型

Static daily dashboard:

静态日报 dashboard：

- 1,000 concurrent users mostly hit Netlify CDN.
- 1000 个并发用户主要打到 Netlify CDN。
- Massive load is zero if data was already generated.
- 如果数据已经生成，对 Massive 的负载为零。
- This is safe and cheap.
- 这条路线安全且便宜。

Wrong live architecture:

错误实时架构：

- 1,000 browsers each open Massive WebSocket or REST calls.
- 1000 个浏览器分别打开 Massive WebSocket 或 REST 请求。
- API key leaks.
- API key 会泄漏。
- Default one-connection-per-asset-class limit is broken.
- 默认每资产类别一个连接的限制会被打爆。
- Quote subscription cap and bandwidth explode.
- Quotes 订阅上限和带宽都会爆。
- Legal/commercial redistribution risk is high.
- 法律/商业再分发风险很高。

Correct live architecture:

正确实时架构：

- One controlled backend connection cluster ingests Massive.
- 一个受控后端连接集群采集 Massive。
- Watchlist is curated, for example 100-500 symbols and selected contracts, not every contract.
- Watchlist 需要筛选，例如 100-500 个标的和精选合约，而不是所有合约。
- Backend fans out compact derived events to users.
- 后端把紧凑派生事件分发给用户。
- User count increases our outbound traffic, not Massive connection count.
- 用户数增加的是我们自己的出站流量，不应增加 Massive 连接数。

Rough outbound example:

粗略出站示例：

- 1 KB/s/user at 1,000 users is about 8 Mbps.
- 每用户 1 KB/s，1000 用户约 8 Mbps。
- 10 KB/s/user at 1,000 users is about 80 Mbps.
- 每用户 10 KB/s，1000 用户约 80 Mbps。
- 50 KB/s/user at 1,000 users is about 400 Mbps and needs a serious streaming layer.
- 每用户 50 KB/s，1000 用户约 400 Mbps，需要认真设计流式层。

## Current-open and future-commercial line / 当前开放与未来商业边界

Current public open:

当前公开开放：

- latest trading day dashboard;
- 最新交易日 dashboard；
- historical date lookback from landed generated data;
- 已落地生成数据的历史日期回看；
- top tables and derived analysis panels;
- Top 表与派生分析面板；
- rotation quadrant and rhythm views;
- 轮动象限和节奏视图；
- KZG-branded PNG export with watermark;
- 带 KZG 水印的 PNG 导出；
- product-safe real-time silhouette without real credentials.
- 不使用真实凭证的产品安全实时流轮廓。

Future commercial candidate after approval:

未来批准后的商业候选：

- real-time derived feed after business/legal entitlement is confirmed;
- 商业/法律权限确认后的实时派生 feed；
- real-time alert engine and account delivery workflow;
- 实时提醒引擎和账户交付流程；
- service reliability, watchlists, saved rooms, and notification routing;
- 服务稳定性、观察列表、保存房间和通知路由；
- future clean export or higher-frequency replay only if Fangbao approves.
- Fangbao 批准后才考虑未来无水印导出或更高频 replay。

## Real-time feature candidates / 实时功能候选

- Live premium burst ranking / 实时权利金爆发排名。
- Underlying rooms for SPY, QQQ, NVDA, TSLA, AAPL, IWM, TLT, SMH / 重点标的房间。
- Rotation quadrant: volume delta vs premium delta / 轮动象限：成交量变化 vs 权利金变化。
- IV and Greeks radar / IV 与 Greeks 雷达。
- Quote pressure summary: spread, bid/ask size, imbalance, not raw quote feed / 报价压力摘要：价差、bid/ask size、失衡，不提供原始 quote feed。
- Alert engine for unusual premium, CP skew, and expiry/strike concentration / 异常权利金、CP 偏斜、到期/行权价集中提醒。
- Historical replay from stored minute/second aggregates / 基于已存分钟/秒级聚合的历史回放。
- Feed tape modes: hot burst, cooling, premium-led, volume-led, hedge-defense, gamma watch / Feed tape 模式：爆发、降温、权利金先行、量能先行、防守、gamma 观察。
- Consumer explanations: "why this moved", "what changed in the last 5 minutes", "what is unusual versus 20D" / 消费者解释层：为什么动、过去 5 分钟变了什么、相对 20D 哪里异常。

## Dense roadmap v1.51-v1.58 / 稠密路线 v1.51-v1.58

- v1.51: public live-feed silhouette and internal Massive architecture research. No real key. No public provider/price. / 公开实时流轮廓与内部 Massive 架构研究。不接真实 key，不公开供应商/价格。
- v1.52: internal mock feed schema and adapter using generated/mock events from existing minute data. / 用现有分钟数据生成 mock event，建立内部 feed schema 和 adapter。
- v1.53: older entitlement-safe feed boundary prototype, superseded by v1.54 for the current public site. / 较早权限安全 feed 边界原型；当前公开站以 v1.54 纠偏为准。
- v1.54: public-open correction: no current feature blur, lock, or paywall; future load/fanout modeling moves to the real-time backend phase. / 公开开放纠偏：当前功能不模糊、不锁定、不 paywall；未来负载和分发模型移动到真实实时后端阶段。
- v1.55: public three-sector restructure: open daily dashboard, future realtime reserve, open historical intraday layer. / 公开三段式重构：开放日报、未来实时预留、开放历史日内层。
- v1.56: flow-book and strategy-filter refinement for the future realtime reserve, still generated/mock and not a real feed. / 未来 realtime reserve 的 flow book 与策略过滤树细化，仍为生成/mock，不是真实 feed。
- v1.57: iOS companion `0.5` syncs the same boundary: top open dashboard, middle future realtime reserve, bottom open historical layer. No real key and no client-side provider connection. / iOS 伴生 `0.5` 同步同一边界：顶部开放 dashboard、中段未来实时 reserve、底部开放历史层。不接真实 key，不让客户端直连供应商。
- v1.58: Web reserve transition pass: three-sector transition rail plus filter-weight rail, still generated/mock and not a real feed. / Web reserve 过渡优化：三段 transition rail 加 filter 权重 rail，仍为生成/mock，不是真实 feed。

## v1.52 adapter result / v1.52 adapter 结果

v1.52 implements the first public-safe event queue in `public/app.js`. It is intentionally computed from generated minute data and symbol-rotation metrics. It does not call a vendor endpoint and does not use any credential.

v1.52 在 `public/app.js` 实现了第一版公开安全事件队列。它刻意只从已生成分钟数据和标的轮动指标计算，不调用供应商 endpoint，也不使用任何凭证。

Event kinds now used by the UI:

当前 UI 使用的事件类型：

- `burst` / 爆发: volume delta leads.
- `burst` / 爆发：成交量变化领先。
- `premium` / 权利金: premium delta leads.
- `premium` / 权利金：权利金变化领先。
- `cp_slope` / CP斜率: call-side pressure expands.
- `cp_slope` / CP斜率：Call 侧压力扩张。
- `defense` / 防守: put-side defense warms.
- `defense` / 防守：Put 侧保护升温。
- `cooling` / 降温: volume and premium contract.
- `cooling` / 降温：量价收缩。
- `rhythm` / 节奏: bucket rhythm changes without a stronger classification.
- `rhythm` / 节奏：桶节奏变化但没有更强分类。

The canonical internal event contract is now in `docs/REALTIME_FEED_SCHEMA.md`.

标准内部事件合约现在写在 `docs/REALTIME_FEED_SCHEMA.md`。

## v1.54 boundary correction / v1.54 边界纠偏

v1.53 added an older public-safe feed visibility boundary. v1.54 supersedes it for the current site: latest and historical generated-minute features are open, and the only future boundary is the real-time feed service layer. Future backend work can map that future state to a real entitlement table only after Fangbao confirms credentials, commercial rights, and service terms.

v1.53 曾新增较早的公开安全 feed 可见边界。v1.54 对当前站点进行纠偏：今日和历史的已生成分钟数据功能全部开放，唯一未来边界是真实实时 feed 服务层。未来后端只有在 Fangbao 确认凭证、商业权利和服务条款后，才能把这个未来状态映射到真实权限表。

## Implementation stages / 实施阶段

Stage 1: current safe product.

阶段 1：当前安全产品。

- Static generated dashboard.
- 静态生成 dashboard。
- Daily 20:00 Asia/Shanghai update.
- 每天 20:00 Asia/Shanghai 更新。
- PNG export.
- PNG 导出。
- Current generated-minute features open and readable, no blur, no real payment.
- 当前已生成分钟数据功能开放可读，不做模糊，不接真实支付。

Stage 2: entitlement prototype.

阶段 2：权限原型。

- Auth shell with no real money.
- 不涉及真钱的登录壳。
- Local entitlement planning only for the future real-time service layer.
- 本地权限规划只面向未来真实实时服务层。
- Stripe plan written as internal docs, not public checkout.
- Stripe 套餐先写内部文档，不开放公开 checkout。

Stage 3: legal/payment readiness.

阶段 3：法律与支付准备。

- Ask Massive for business redistribution/display rights.
- 向 Massive 确认 Business 再分发/展示权。
- Create Stripe products only after Fangbao approval.
- Fangbao 批准后再创建 Stripe 商品。
- Decide domain only after Fangbao approves spend.
- Fangbao 批准花费后再定域名。

Stage 4: live backend.

阶段 4：实时后端。

- Backend ingest service.
- 后端采集服务。
- Cache and compact signal store.
- 缓存与紧凑信号库。
- Entitled fanout layer.
- 带权限的分发层。
- Rate limits and audit logs.
- 限流与审计日志。

## Immediate warning / 立即警戒线

The public page must not show candidate domains, real pricing tables, checkout wording, Stripe internals, wallet rails, WeChat payment details, or API plan notes until Fangbao explicitly approves.

公开页面不得展示域名候选、真实价格表、checkout 文案、Stripe 内部流程、钱包支付路线、微信支付细节或 API 套餐笔记，除非 Fangbao 明确批准。
