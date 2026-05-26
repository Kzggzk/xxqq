# Massive real-time product plan / Massive 实时数据产品规划

This is internal product architecture. Do not surface this as homepage content until Fangbao approves a public version.

这是内部产品架构文档。未经 Fangbao 批准，不要把这些内容做成主页公开内容。

## Verified official facts / 已核官方事实

Checked on 2026-05-26 Asia/Shanghai against Massive official docs/pages.

以下内容于 2026-05-26 Asia/Shanghai 对 Massive 官方页面与文档核验。

- Options Advanced is listed at `$199/month` and includes real-time data, `5+ Years Historical Data`, WebSockets, snapshots, second aggregates, trades, quotes, Greeks/IV, daily open interest, flat files, reference data, corporate actions, technical indicators, and minute aggregates. Source: <https://massive.com/options>
- Options Advanced 页面列出 `$199/month`，包括实时数据、`5+ Years Historical Data`、WebSockets、Snapshot、Second Aggregates、Trades、Quotes、Greeks/IV、Daily Open Interest、Flat Files、Reference Data、Corporate Actions、Technical Indicators、Minute Aggregates。来源：<https://massive.com/options>
- Options quote WebSocket subscriptions are capped at 1,000 option contracts per connection. Source: <https://massive.com/docs/websocket/options/quotes>
- Options Quotes WebSocket 每个连接最多订阅 1,000 个期权合约。来源：<https://massive.com/docs/websocket/options/quotes>
- Massive WebSocket quickstart says the default is one concurrent WebSocket connection per asset class, and multiple simultaneous connections require support. Source: <https://massive.com/docs/websocket>
- Massive WebSocket quickstart 写明默认每个资产类别一个并发 WebSocket 连接，需要更多同时连接要联系 support。来源：<https://massive.com/docs/websocket>
- Massive/Polygon market data terms say individual market data is personal/non-business/non-commercial and must not be used to build an end-user application or publicly distribute market data without written consent. Source: <https://massive.com/terms/market_data_terms.pdf>
- Massive/Polygon 市场数据条款写明个人市场数据用于个人、非商业用途，不能未经书面同意构建面向终端用户的应用或公开分发市场数据。来源：<https://massive.com/terms/market_data_terms.pdf>
- Business plans are the safer route for a paid public SaaS, but require direct confirmation on redistribution/display rights. Source: <https://massive.com/business-options>
- 面向付费公众 SaaS，更安全路线是 Business plan，但仍需直接确认再分发/展示权利。来源：<https://massive.com/business-options>

## Product conclusion / 产品结论

The `$199/month` individual plan can be excellent for owner-side research, private ingestion, prototype signal generation, and internal dashboards. It should not be assumed to authorize a paid public SaaS that redistributes real-time OPRA-derived data to users.

`$199/month` 个人套餐非常适合 owner 研究、私有采集、原型信号生成和内部 dashboard。但不能默认认为它允许把实时 OPRA 派生数据再分发给付费公众 SaaS 用户。

The product should sell proprietary analysis, summaries, rankings, alerts, PNG reports, delayed/history dashboards, and blurred previews first. Direct real-time feed resale should wait for a business/commercial entitlement.

产品应优先销售自有分析、摘要、排名、提醒、PNG 报告、延迟/历史 dashboard、模糊高级预览。直接销售实时 feed 应等 Business/商业权限确认后再做。

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
7. Frontend receives derived signals, blurred previews, rankings, charts, and exportable PNG.
8. 前端接收派生信号、模糊预览、排名、图表和可导出 PNG。
9. Entitlement service decides free vs paid access.
10. 权限服务决定免费/付费访问范围。

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

## Paid/free feature line / 免费与付费边界

Free:

免费：

- latest trading day dashboard;
- 最新交易日 dashboard；
- selected top tables;
- 部分 Top 表；
- one or two rotation snapshots;
- 一两个轮动快照；
- KZG-branded PNG export with watermark;
- 带 KZG 水印的 PNG 导出；
- blurred historical and real-time previews.
- 历史与实时功能的模糊预览。

Paid:

付费：

- historical date lookback beyond latest day;
- 最新交易日以外的历史回看；
- rotation quadrant history;
- 轮动象限历史；
- premium momentum and predictive panels;
- 高级动量与预测面板；
- symbol rooms and hover deep charts;
- 标的房间和 hover 深图；
- clean PNG export without watermark if Fangbao approves;
- Fangbao 批准后可提供无水印 PNG；
- real-time derived feed after business/legal entitlement is confirmed.
- 商业/法律权限确认后开放实时派生 feed。

## Real-time feature candidates / 实时功能候选

- Live premium burst ranking / 实时权利金爆发排名。
- Underlying rooms for SPY, QQQ, NVDA, TSLA, AAPL, IWM, TLT, SMH / 重点标的房间。
- Rotation quadrant: volume delta vs premium delta / 轮动象限：成交量变化 vs 权利金变化。
- IV and Greeks radar / IV 与 Greeks 雷达。
- Quote pressure summary: spread, bid/ask size, imbalance, not raw quote feed / 报价压力摘要：价差、bid/ask size、失衡，不提供原始 quote feed。
- Alert engine for unusual premium, CP skew, and expiry/strike concentration / 异常权利金、CP 偏斜、到期/行权价集中提醒。
- Historical replay from stored minute/second aggregates / 基于已存分钟/秒级聚合的历史回放。

## Implementation stages / 实施阶段

Stage 1: current safe product.

阶段 1：当前安全产品。

- Static generated dashboard.
- 静态生成 dashboard。
- Daily 20:00 Asia/Shanghai update.
- 每天 20:00 Asia/Shanghai 更新。
- PNG export.
- PNG 导出。
- Blurred paid previews only as product UX, no real payment.
- 只做模糊付费预览，不接真实支付。

Stage 2: entitlement prototype.

阶段 2：权限原型。

- Auth shell with no real money.
- 不涉及真钱的登录壳。
- Local/preview entitlement states.
- 本地/预览权限状态。
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
