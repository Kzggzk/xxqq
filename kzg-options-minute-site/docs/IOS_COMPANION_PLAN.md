# KZG Option House iOS companion / iOS 伴生应用计划

This document defines the iOS track for KZG Option House. The iOS app is a companion product, not a replacement for the Netlify site.

本文定义 KZG Option House 的 iOS 轨道。iOS app 是伴生产品，不替代 Netlify 网站。

## Current state / 当前状态

- iOS project / iOS 工程: `/Users/fangbao/kzg-options-minute-site/ios/KZGOptionHouse/KZGOptionHouse.xcodeproj`
- Scheme / Scheme: `KZG Option House`
- Bundle id / Bundle ID: `com.kzg.optionhouse`
- Current iOS version / 当前 iOS 版本: `0.4`
- Web baseline / 对应 Web 基线: public Web `1.50`
- First simulator proof / 首次模拟器证明: `/tmp/kzg-option-house-ios-v01.png`
- Build proof / 构建证明: v0.4 Swift source typecheck passed with `swiftc`; full Xcode destination build is currently blocked by local simulator runtime selection.

## Cadence / 节奏

- Web keeps dense `0.01` iteration.
- Web 继续按 `0.01` 稠密迭代。
- iOS updates every 5 Web dense versions unless Fangbao explicitly asks for an immediate iOS pass.
- iOS 每 5 个 Web 稠密版本同步一次，除非 Fangbao 明确要求立即同步。
- Current checkpoint: iOS `0.4` at Web `1.50`; next planned iOS checkpoint is Web `1.55`.
- 当前检查点：iOS `0.4` 对应 Web `1.50`；下一次计划 iOS 检查点是 Web `1.55`。

## Product direction / 产品方向

中文:

iOS 不是把网页缩小。它要服务手机屏幕：更强的纵向读盘、更紧的 spacing、更有金融终端感的 serif header、更少的大块留白、更少横向表格。首屏应优先回答今天发生了什么，随后给出时间轴、摘要、结构拆分、日内桶、轮动象限和核心标的聚焦。

English:

iOS is not a shrunken web page. It should fit the phone: stronger vertical reading, tighter spacing, a finance-terminal serif header, fewer blank blocks, and fewer horizontal tables. The first screen should answer what happened today, then expose timeline, summary, structure split, intraday buckets, rotation quadrant, and symbol focus.

## Public/private boundary / 公开与内部边界

- The iOS app may show latest-day free insights and KZG-branded product surfaces.
- iOS app 可以展示最新交易日免费洞察和 KZG 品牌产品界面。
- It must not embed API keys, raw data packs, payment credentials, Massive plan internals, Stripe secrets, wallet secrets, or WeChat merchant material.
- 不能内置 API key、原始数据包、支付凭证、Massive 套餐内部信息、Stripe secret、钱包 secret 或微信商户材料。
- App Store submission, signing team selection, paid developer-account actions, TestFlight upload, and review submission require Fangbao confirmation at that moment.
- App Store 提交、签名 team 选择、付费开发者账号动作、TestFlight 上传和审核提交，都必须在当时让 Fangbao 确认。

## Technical direction / 技术方向

- Use native SwiftUI for the product shell.
- 产品 shell 使用原生 SwiftUI。
- Short term: bundled compact snapshots only, not raw generated files.
- 短期：只打包紧凑快照，不打包 raw generated files。
- Mid term: fetch from a backend snapshot endpoint with entitlement gating.
- 中期：从后端快照接口拉取，并做权限控制。
- Long term: real-time feed becomes backend-derived signals, not direct client-to-Massive traffic.
- 长期：实时 feed 是后端派生信号，不让客户端直接连 Massive。

## Verification / 验证

Current verified steps:

当前已验证：

- Xcode scheme exists: `KZG Option House`.
- Xcode scheme 已存在：`KZG Option House`。
- v0.4 SwiftUI source typecheck passed with `swiftc -typecheck`.
- v0.4 SwiftUI 源码已通过 `swiftc -typecheck`。
- First v0.1 simulator proof remains `/tmp/kzg-option-house-ios-v01.png`.
- 首次 v0.1 模拟器证明仍为 `/tmp/kzg-option-house-ios-v01.png`。

Known caveat:

已知注意点：

- For v0.4, XcodeBuildMCP still finds the correct project, scheme, and `iPhone 17 Pro` simulator profile, but `build_sim` fails on this machine because the destination `{ platform:iOS Simulator, id:9DAFEA29-80F2-4D94-BE75-C0106CE8D97E }` cannot be matched against the installed runtime. Source typecheck passes, so this is still recorded as a local Xcode/destination blocker, not a Swift syntax blocker.
- 对 v0.4 来说，XcodeBuildMCP 仍能找到正确工程、scheme 和 `iPhone 17 Pro` 模拟器 profile，但 `build_sim` 在本机仍失败，因为 destination `{ platform:iOS Simulator, id:9DAFEA29-80F2-4D94-BE75-C0106CE8D97E }` 与已安装 runtime 对不上。源码类型检查通过，所以继续记录为本机 Xcode/destination 阻塞，不是 Swift 语法阻塞。

## v0.4 checkpoint / v0.4 检查点

中文:

Web `1.50` 同步 iOS `0.4`。这轮不是 App Store/TestFlight 动作，只是原生 SwiftUI 伴生端的排版同步：主栈 spacing 从更松的 10/12 尺度降到 8/10，Header 标题、checkpoint strip、时间轴柱、轮动象限和 symbol chip 都更适合手机扫读。Checkpoint tile 显示 Web `1.50`、iOS `0.4`、PNG `KZG`。验证上，XcodeBuildMCP profile 正确但 simulator destination 仍卡住，`swiftc -typecheck` 通过。

English:

Web `1.50` syncs iOS `0.4`. This is not an App Store or TestFlight action; it is a native SwiftUI companion layout sync. Main stack spacing moves from the looser 10/12 scale to 8/10, and the Header, checkpoint strip, timeline bars, rotation quadrant, and symbol chips are tighter for phone scanning. Checkpoint tiles show Web `1.50`, iOS `0.4`, PNG `KZG`. Verification: XcodeBuildMCP profile is correct but simulator destination remains blocked; `swiftc -typecheck` passes.
