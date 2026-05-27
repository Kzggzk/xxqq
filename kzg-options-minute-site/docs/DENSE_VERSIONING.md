# Dense versioning / 稠密版本规划

KZG Option House uses dense product iteration. A version bump is not a marketing label; it is a logged, reviewable unit of work.

KZG Option House 使用稠密产品迭代。版本号不是营销口号，而是一个可记录、可审查、可继承的工作单元。

## Version rule / 版本规则

- Every meaningful product/UI/data/automation/documentation improvement increments by `0.01`.
- 每一个有意义的产品、界面、数据、自动化或文档改动，都递增 `0.01`。
- `1.01 -> 2.00` means 100 dense iterations.
- `1.01 -> 2.00` 代表 100 个稠密迭代。
- A future `11.85` means 1085 post-1.00 dense iterations, not a symbolic number.
- 未来如果到 `11.85`，它代表从 1.00 之后真的经历了 1085 个稠密迭代，不是随便喊出来的数字。
- The latest local checkpoint is Web `1.70`, adding the momentum queue capital/CP/active-row compass. The latest production checkpoint remains Web `1.68` at `https://6a16acc1dbce120ee54cac50--kzg-option-house.netlify.app/`. iOS companion remains `0.7`. The next dense step is `1.71`.
- 最近本地检查点是 Web `1.70`，加入动量队列的资金/CP/当前行读法罗盘。最近生产检查点仍是 Web `1.68`，位于 `https://6a16acc1dbce120ee54cac50--kzg-option-house.netlify.app/`。iOS 伴生保持 `0.7`。下一次稠密版本是 `1.71`。

## iOS companion cadence / iOS 伴生节奏

- The iOS app is native SwiftUI and lives at `/Users/fangbao/kzg-options-minute-site/ios/KZGOptionHouse`.
- iOS app 是原生 SwiftUI，位于 `/Users/fangbao/kzg-options-minute-site/ios/KZGOptionHouse`。
- iOS does not update on every Web `0.01` version. It updates every 5 Web dense versions unless Fangbao asks for an immediate iOS pass.
- iOS 不跟随每一个 Web `0.01` 版本更新。默认每 5 个 Web 稠密版本同步一次，除非 Fangbao 要求立即更新 iOS。
- Current iOS checkpoint: `iOS 0.7` at dense Web `1.67`. It syncs the bucket-to-rotation handoff into native SwiftUI. XcodeBuildMCP still has a local simulator destination/runtime blocker, but Swift source typecheck passes.
- 当前 iOS 检查点：`iOS 0.7` 对应稠密 Web `1.67`。它把 bucket 到轮动接力同步进原生 SwiftUI。XcodeBuildMCP 仍有本机 simulator destination/runtime 阻塞，但 Swift 源码 typecheck 通过。
- App Store signing, TestFlight upload, review submission, or developer-account actions require Fangbao confirmation at that moment.
- App Store 签名、TestFlight 上传、审核提交或开发者账号动作，都必须在当时让 Fangbao 确认。

## Real-time API dense block / 实时 API 稠密块

- v1.51 documents the Massive real-time architecture and only improves the public live-feed silhouette. It does not use any real key.
- v1.51 记录 Massive 实时架构，并只优化公开实时流轮廓。它不使用任何真实 key。
- v1.52 creates a mock-derived event queue and adds `docs/REALTIME_FEED_SCHEMA.md` from existing generated minute data.
- v1.52 基于现有生成分钟数据建立 mock-derived 事件队列，并新增 `docs/REALTIME_FEED_SCHEMA.md`。
- v1.53 defined an older feed visibility boundary, then v1.54 corrected it: current public features are open, and the safe visible tiers are now `public-latest`, `history-open`, and `future-live-feed`.
- v1.53 曾定义旧版 feed 可见边界，随后 v1.54 纠偏：当前公开功能开放，安全可见层级现在是 `public-latest`、`history-open` 和 `future-live-feed`。
- Future load, cache, event compression, and 1000-user fanout belong to the real-time feed backend phase, not current public gating.
- 未来负载、缓存、事件压缩和 1000 用户分发属于真实实时流后端阶段，不属于当前公开遮挡。
- v1.55 reshapes the public page into three sectors: open daily dashboard, future realtime-flow reserve, and open historical intraday layer. Only the future realtime tape may be blurred; current generated-minute features stay open.
- v1.55 把公开页重塑成三段：开放日报 dashboard、未来 realtime-flow 预留席位、开放历史日内层。只有未来实时 tape 可以模糊；当前已生成分钟数据功能保持开放。
- v1.56 upgrades the realtime reserve into a flow-book style preview: Bullish/Bearish lanes show derived counts, strategy tags, delta, and premium; filters include a future Flow Book control and a richer strategy tree.
- v1.56 把 realtime reserve 升级成 flow-book 风格预览：Bullish/Bearish 分栏显示派生次数、策略标签、变化和权利金；过滤器加入未来 Flow Book 控制和更完整的策略树。
- v1.57 syncs that product boundary into iOS companion `0.5`; it does not deploy Web or connect real keys.
- v1.57 把这个产品边界同步到 iOS 伴生 `0.5`；它不部署 Web，也不接真实 key。
- v1.58 returns to Web and adds a three-sector transition rail plus a filter-weight rail for the future realtime reserve. Production remains v1.56.
- v1.58 回到 Web，为未来实时 reserve 增加三段过渡 rail 和 filter 权重 rail。生产仍为 v1.56。
- v1.59 adds a compact three-sector product spine after the access strip, makes the three sectors clickable, removes the public provider name from the displayed dataset label, and verifies desktop/mobile child overflow is 0. Production remains v1.56.
- v1.59 在 access strip 后加入紧凑三段式产品脊柱，让三段区块可点击跳转，移除公开数据标签里的供应商名，并验证桌面/手机 child overflow 为 0。生产仍为 v1.56。
- v1.60 deploys the Flow Router to production and keeps current generated-minute features open.
- v1.60 将 Flow Router 部署到生产，同时保持当前生成分钟能力开放。
- v1.61 compresses the future realtime reserve on phones and records the 2023 flat-file entitlement audit rule.
- v1.61 压缩手机端未来 realtime reserve，并记录 2023 flat-file 权限审计规则。
- v1.62 adds the realtime-to-open-history handoff bridge, confirms 505-day open history copy, and syncs iOS companion `0.6`. Production remains v1.60.
- v1.62 增加 realtime 到开放历史层的 handoff 桥，确认 505 日开放历史文案，并同步 iOS 伴生 `0.6`。生产仍为 v1.60。
- v1.63 adds the open-history path router after the future realtime reserve, with four scroll targets into cross-day trend, intraday buckets, rotation quadrant, and symbol lens. It deploys to production and keeps current generated-minute features open.
- v1.63 在未来 realtime reserve 后加入开放历史层路径导航，四个入口分别跳到跨日趋势、日内桶、轮动象限和标的聚焦。它已部署生产，并继续保持当前生成分钟能力开放。
- v1.64 adds an open-history four-beat story strip after the path router. It summarizes drift, pressure minute, breadth, and premium-notional anchor before users enter the dense historical panels. It is local only; production remains v1.63.
- v1.64 在路径导航后加入开放历史层四拍读盘故事条。它在用户进入密集历史面板前先总结量变、压力分钟、扩散和权利金金额锚点。本轮仅本地完成；生产仍为 v1.63。
- v1.65 adds story-to-panel focus handoff. Clicking a story/path card now scrolls into the open historical panel and gives the target panel a temporary focus pulse, preserving user orientation on desktop and phone. It is local only; production remains v1.63.
- v1.65 加入故事条到目标面板的聚焦接力。点击故事卡或路径卡后，会滚动到开放历史面板并给目标面板一个短暂聚焦反馈，让桌面和手机用户知道自己落到哪里。本轮仅本地完成；生产仍为 v1.63。
- v1.66 adds the bucket-to-rotation handoff bridge inside the open historical layer. It connects intraday pressure bucket, CP extremes, and rotation breadth into one readable route, then clicks into the open symbol-rotation panel with the v1.65 focus pulse. It is local only; production remains v1.63.
- v1.66 在开放历史层内加入 bucket 到轮动的接力桥。它把日内压力桶、CP 极值和轮动扩散接成一条可读路径，并复用 v1.65 聚焦反馈点击进入开放的标的轮动面板。本轮仅本地完成；生产仍为 v1.63。
- v1.67 syncs v1.66 into iOS companion `0.7`. The native app now shows Web `1.66`, iOS `0.7`, and a `分钟压力接力` card between intraday buckets and the rotation quadrant. It is local only; production Web remains v1.63.
- v1.67 把 v1.66 同步到 iOS 伴生 `0.7`。原生 app 现在显示 Web `1.66`、iOS `0.7`，并在日内桶和轮动象限之间加入 `分钟压力接力` 卡。本轮仅本地完成；生产 Web 仍为 v1.63。
- v1.68 returns to Web and adds the rotation-to-symbol focus handoff. The rotation quadrant now routes `RGTI` into the open 90-session symbol lens with the v1.65 focus pulse. It is deployed to production at `https://6a16acc1dbce120ee54cac50--kzg-option-house.netlify.app/`; iOS remains `0.7`.
- v1.68 回到 Web，加入轮动到单标的聚焦接力。轮动象限现在把 `RGTI` 接入开放的 90 日单标的镜头，并复用 v1.65 聚焦反馈。它已部署生产到 `https://6a16acc1dbce120ee54cac50--kzg-option-house.netlify.app/`；iOS 保持 `0.7`。
- v1.69 returns the open single-symbol lens into the momentum queue. The RGTI focus row is preserved in the queue after the rotation handoff, and the queue jump focuses the momentum panel without adding any lock, provider route, or payment language. It is local only; production remains v1.68.
- v1.69 把开放单标的镜头接回动量队列。轮动接力后，RGTI 聚焦行会保留在队列里，队列跳转会聚焦 momentum 面板，但不增加任何锁、供应商路线或支付语言。本轮仅本地完成；生产仍为 v1.68。
- v1.70 adds a compact momentum queue compass. The open momentum queue now reads as capital anchor, CP edge, and active row, with a jump back to the rotation quadrant. It is local only; production remains v1.68.
- v1.70 加入紧凑动量队列读法罗盘。开放动量队列现在按资金锚点、CP 极值、当前行来读，并可跳回轮动象限。本轮仅本地完成；生产仍为 v1.68。

## Heartbeat protocol / 心跳协议

Every 15-minute heartbeat should do a useful check or useful work. If the previous 15-minute segment is still running, the next heartbeat should report carryover instead of pretending a new clean cycle started.

每 15 分钟心跳要么做有效检查，要么做有效工作。如果上一个 15 分钟工作还没完成，下一个心跳要记录“承接中”，不能假装已经进入一个全新的干净周期。

Required heartbeat record:

每次心跳必须记录：

- version target / 目标版本；
- exact changed files / 精确改动文件；
- reason for the change / 为什么改；
- visual/data effect / 对视觉或数据有什么效果；
- verification result / 验证结果；
- deploy URL if deployed / 如果部署了，写唯一部署 URL；
- blockers and next `0.01` direction / 阻塞和下一步 `0.01` 方向。

## Deploy cadence / 部署密度

- Build and verify locally after each solid version.
- 每个扎实版本后都要本地构建和验证。
- Deploy production every 3-5 solid versions, or immediately after a public-risk fix.
- 每 3-5 个扎实版本部署一次生产站；如果修的是公开风险，立即部署。
- Push GitHub backup after each production deploy and after any docs handoff update.
- 每次生产部署后、每次交接文档更新后，都要推 GitHub 备份。
- Do not commit raw generated data.
- 不提交 raw generated data。

## Definition of done / 完成定义

A dense version is not done until these are true:

一个稠密版本只有满足下面条件才算完成：

- public page still loads / 公开页面仍能加载；
- PNG export still works / PNG 导出仍可用；
- mobile width has no obvious horizontal overflow / 移动端无明显横向溢出；
- no internal commercial strings leaked onto the public site / 内部商业内容没有泄漏到公开站；
- `public/data/*` and packed raw data paths stay blocked unless explicitly approved / 未经批准，`public/data/*` 和打包原始数据路径继续受阻；
- changelog was updated in GitHub and Apple Notes for durable handoff / GitHub 与 Apple Notes 的 changelog 已更新，方便交接。

## Changelog entry template / 变更日志模板

```md
## v1.xx - YYYY-MM-DD HH:mm Asia/Shanghai

中文:
- 改动:
- 原因:
- 影响:
- 验证:
- 部署:
- 下一步:

English:
- Change:
- Reason:
- Impact:
- Verification:
- Deploy:
- Next:
```

## Non-negotiable public boundary / 公开边界

Payment, authorization, domain purchase, real Massive API keys, API plan details, and internal monetization planning should be documented for the owner and future agents, not placed on the public homepage.

支付、权限、域名购买、真实 Massive API key、API 套餐细节、内部商业规划，应当写给 owner 和未来 agent，而不是放到公开主页。
