# Real-time feed schema / 实时流事件结构

This is an internal handoff document. It defines the safe event shape for KZG Option House v1.52. It does not contain credentials and must not be treated as permission to connect real vendor feeds.

这是内部交接文档，定义 KZG Option House v1.52 的安全事件结构。本文不包含凭证，也不代表已经允许接入真实供应商 feed。

## Purpose / 目标

v1.52 creates a mock-derived feed from existing generated minute data. The goal is to let Web, iOS, and a future backend speak the same event language before any real key, plan upgrade, or commercial entitlement is used.

v1.52 用现有生成分钟数据构造 mock-derived feed。目标是在使用任何真实 key、套餐升级或商业授权前，让 Web、iOS 和未来后端先共享同一套事件语言。

## Public rule / 公开规则

Public UI may show derived event rhythm, symbol, score, time bucket, and short explanation.

公开 UI 可以展示派生事件节奏、标的、分数、时间桶和简短解释。

Public UI must not show provider names, API routes, API keys, plan names, plan prices, account mechanics, checkout state, raw contract payloads, or legal assumptions.

公开 UI 不能展示供应商名、API 路由、API key、套餐名、套餐价格、账号机制、checkout 状态、原始合约 payload 或法律假设。

## Event shape / 事件字段

```json
{
  "id": "2026-05-22:09:30:RGTI:premium",
  "tradeDate": "2026-05-22",
  "time": "09:30",
  "symbol": "RGTI",
  "kind": "premium",
  "tone": "hot",
  "score": 94.2,
  "detail": "premium led the move",
  "source": "derived-minute-aggregate",
  "visibleTier": "public-latest",
  "metrics": {
    "volumeDeltaPct": 417.9,
    "premiumDeltaPct": 671.6,
    "cpRatio": 2.79
  }
}
```

## Field contract / 字段契约

- `id`: deterministic event id built from date, time, symbol, and kind.
- `id`: 由日期、时间、标的和事件类型组成的确定性 id。
- `tradeDate`: selected trading day.
- `tradeDate`: 当前选择的交易日。
- `time`: bucket time or later real event time.
- `time`: 当前分钟桶时间，未来真实 feed 可换成真实事件时间。
- `symbol`: underlying symbol, not a raw option contract payload.
- `symbol`: 标的代码，不是原始期权合约 payload。
- `kind`: one of `burst`, `premium`, `cp_slope`, `defense`, `cooling`, `rhythm`.
- `kind`: 事件类型，当前为 `burst`、`premium`、`cp_slope`、`defense`、`cooling`、`rhythm`。
- `tone`: one of `hot`, `cool`, `flat`.
- `tone`: 视觉和方向语义，`hot`、`cool`、`flat`。
- `score`: bounded 0-99 pressure score.
- `score`: 0-99 的压力分数。
- `detail`: short user-facing explanation.
- `detail`: 面向用户的短解释。
- `source`: `derived-minute-aggregate` for v1.52. Future real backend should still emit derived events, not raw feed rows.
- `source`: v1.52 固定为 `derived-minute-aggregate`。未来真实后端仍应输出派生事件，不输出原始 feed 行。
- `visibleTier`: `public-latest`, `blurred-history`, or `paid-derived`.
- `visibleTier`: `public-latest`、`blurred-history` 或 `paid-derived`。
- `metrics`: compact derived metrics allowed for internal debugging and future backend tests.
- `metrics`: 紧凑派生指标，用于内部调试和未来后端测试。

## Adapter stages / Adapter 阶段

1. v1.52 Web adapter: compute events in `public/app.js` from symbol rotation rows and 30-minute buckets.
2. v1.52 Web adapter：在 `public/app.js` 中从标的轮动行和 30 分钟桶生成事件。
3. v1.53 contract: move event naming and visibility tiers into a stable boundary doc and tests.
4. v1.53 合约：把事件命名和可见层级稳定下来，并补测试。
5. v1.54 backend model: decide cache TTL, event compression, watchlist size, and fanout limits.
6. v1.54 后端模型：决定缓存 TTL、事件压缩、观察列表大小和分发限制。
7. v1.55 iOS sync: render the same event shape natively, still with mock-derived data unless Fangbao approves real backend access.
8. v1.55 iOS 同步：原生端渲染同一事件结构；除非 Fangbao 批准真实后端，否则仍使用 mock-derived 数据。

## Security boundary / 安全边界

Do not use any API key seen in screenshots or chat. Rotate keys before backend work. Do not place secrets in browser JavaScript, iOS binaries, GitHub docs, Apple Notes, screenshots, or public assets.

不要使用截图或对话里出现过的任何 API key。真实后端前先轮换 key。不要把 secret 放进浏览器 JavaScript、iOS binary、GitHub docs、Apple Notes、截图或公开资源。
