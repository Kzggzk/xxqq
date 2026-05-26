# KZG Option House changelog / KZG Option House 变更日志

This is the GitHub canonical changelog. Apple Notes has a pinned owner-facing copy, but GitHub is the durable handoff for another Codex.

这是 GitHub 标准 changelog。Apple Notes 里有给 Fangbao 看的置顶副本，但 GitHub 才是另一个 Codex 能稳定接手的交接源。

## Current state / 当前状态

- Workspace / 工作目录: `/Users/fangbao/kzg-options-minute-site`
- Git root / Git 根目录: `/Users/fangbao`
- Branch / 分支: `feat/kzg-option-house-daily-auto`
- Production / 生产站: <https://kzg-option-house.netlify.app/>
- Latest local verified version / 最近本地验证版本: `1.42`
- Latest production verified version / 最近生产验证版本: `1.42`
- iOS companion / iOS 伴生版本: `0.2` native SwiftUI scaffold at `/Users/fangbao/kzg-options-minute-site/ios/KZGOptionHouse`
- Latest production fix / 最近生产修复: `6c909a9 remove public commercial planning from option house`
- Latest unique deploy verified / 最近验证唯一部署: <https://6a158610e727dc1f741ecf8a--kzg-option-house.netlify.app/>
- Local option-minute data verified / 本地期权分钟数据核验: `505` files, `2024-05-17 -> 2026-05-22`
- Public raw-data rule / 公开 raw-data 规则: `/data/index.json` and direct packed raw paths should stay blocked unless Fangbao approves.
- Git dirty generated exceptions / Git 脏文件例外: generated `public/data/index.json` and `public/reports/2026-01-02.html` may remain dirty and should not be committed.

Important data note:

重要数据说明：

Fangbao mentioned a route/data target going back to `2023-05`. Current local iCloud proof shows `2024-05-17 -> 2026-05-22`. Treat `2023-05` as a target for API/plan-entitlement re-audit, not as already-landed local files.

Fangbao 提到有路线/目标可以追到 `2023-05`。当前本机 iCloud 能证明的是 `2024-05-17 -> 2026-05-22`。把 `2023-05` 当作需要用 API/套餐权限继续复核的目标，不要写成已经落地的本地文件。

## Hard rules / 硬规则

- Do not touch protected KZG OS paths.
- 不碰受保护 KZG OS 路径。
- Do not leak payment, domain, registration, Stripe, wallet, WeChat, API-key, or Massive-plan planning onto the public site.
- 不把支付、域名、注册、Stripe、钱包、微信、API key、Massive 套餐规划泄漏到公开站。
- Public page can show product value and blurred premium previews, but internal mechanics belong in docs, `.private/`, Apple Notes, or this thread.
- 公开页面可以展示产品价值和模糊高级预览，但内部机制属于 docs、`.private/`、Apple Notes 或本线程。
- Every meaningful improvement increments by `0.01` and must be logged.
- 每一个有意义改动递增 `0.01`，并且必须记录。
- Deploy every 3-5 solid versions, or immediately for a public-risk fix.
- 每 3-5 个扎实版本部署一次；公开风险修复必须立即部署。

## v1.42 - 2026-05-26 19:45 Asia/Shanghai - mobile terminal fit and production deploy

中文:

- 改动: 公开 Web UI 从 `1.41` 提到 `1.42`。本轮没有新增付费入口、域名入口或 API 商业说明，专门做手机版和桌面版的 spacing/calligraphy：手机顶栏改成品牌与日期同排、四个工具按钮第二行，Market summary 改成 `4x2` 密集仪表盘；桌面端压缩时间轴、摘要卡、高级预览、历史回看、实时轮廓、信号栈和轮动象限的间距。
- 原因: Fangbao 最新要求是“手机端体验要非常好”，而不是只让网页能自适应。上一轮手机虽然无横向溢出，但 8 个摘要指标吃掉太多首屏高度；本轮把手机 topbar 从 `125px/91px` 的问题段稳定到 `91px`，摘要区从 `458px` 先压到 `348px`，再压到 `201px`。
- 视觉影响: 手机 `390x844` 首屏现在能看到完整品牌、日期、四个工具按钮、交易日时间轴、`4x2` 核心数据仪表盘和今日读盘总线，并且日报画布从 `y=1064` 提前到 `y=766`。桌面 `1440x1100` topbar 仍为 `69px`，时间轴 `137px`，核心摘要 `91px`，没有横向溢出。
- PNG 边界: 没改 KZG 老日报导出结构，只改网页展示节奏。桌面导出拦截验证生成 `kzg-option-house-2026-05-22-zh.png`，data URL 长度 `1,976,206`，说明 html2canvas 导出链路仍正常。
- 公开边界: source、dist、生产唯一部署均未出现 Stripe、Checkout、Wallet、Crypto、微信、WeChat、Namecheap、Network Solutions、域名候选、真实价格、payment、billing、API key、Massive plan、authorization、内部产品方案、授权路径或后端方案等公开风险词。
- 验证: `node --check public/app.js` 通过；build 生成 `505` 天 payload，最新日 `2026-05-22`，analytics symbols `98`，pack asset `kzg-frame-554ac5ef64e9.js`；内置 Browser 验证 v1.42、无 console error、无横向溢出、`user-select: none`、无内部词泄露；Chrome/CDP 本地桌面 `1440x1100` 与手机 `390x844` 均 `overflowX=0`；生产唯一部署手机 `390x844` 同样 `overflowX=0`、v1.42、最新日 `2026-05-22`。
- 部署: 已部署生产。生产站 `https://kzg-option-house.netlify.app/`；唯一部署 `https://6a158610e727dc1f741ecf8a--kzg-option-house.netlify.app/`；生产 smoke: home `200`、`/r/latest.html` `200`、`/app.js` `200` 且 `UI_VERSION="1.42"`、`/data/index.json` `404`、`/assets/kzg-pack.js` `404`、公开风险词 `false`。
- 下一步: v1.43 继续做手机长页面下半段，把高级预览、轮动象限和核心标的动量在手机上变短、变紧、变统一；iOS 不在本轮同步，默认下一次 iOS companion checkpoint 仍为 Web v1.45。

English:

- Change: Moved public Web UI from `1.41` to `1.42`. No paid entry, domain entry, or API commercial explanation was added. This round is pure mobile/desktop spacing and calligraphy: mobile topbar now places brand and date on the same row with the four command buttons on row two; Market summary becomes a dense `4x2` mobile instrument grid; desktop spacing is tightened across the timeline, summary cards, advanced preview, history lookback, live silhouette, signal stack, and rotation quadrant.
- Reason: Fangbao's latest ask was that the phone experience should feel very good, not merely responsive. The previous mobile layout had no horizontal overflow, but the 8 summary metrics consumed too much first-screen height. This round stabilizes mobile topbar at `91px` and compresses the summary rail from `458px` to `348px`, then to `201px`.
- Visual impact: At `390x844`, the phone first screen now shows full brand, date, four command buttons, trading-day timeline, `4x2` core data dashboard, and the daily read bus; the report canvas moves from `y=1064` to `y=766`. At `1440x1100`, desktop topbar remains `69px`, timeline `137px`, core summary `91px`, with no horizontal overflow.
- PNG boundary: The old KZG daily-report export structure was not changed; only the web display rhythm changed. Desktop export interception produced `kzg-option-house-2026-05-22-zh.png` with data URL length `1,976,206`, confirming the html2canvas export chain still works.
- Public boundary: Source, dist, and the unique production deploy contain no Stripe, Checkout, Wallet, Crypto, WeChat, Namecheap, Network Solutions, candidate domains, real prices, payment, billing, API key, Massive plan, authorization, internal product planning, backend-plan, or equivalent public-risk wording.
- Verification: `node --check public/app.js` passed; build produced a `505`-day payload, latest date `2026-05-22`, analytics symbols `98`, pack asset `kzg-frame-554ac5ef64e9.js`; in-app Browser verified v1.42, no console errors, no horizontal overflow, `user-select: none`, and no internal strings; Chrome/CDP local desktop `1440x1100` and mobile `390x844` both measured `overflowX=0`; the unique production deploy mobile `390x844` also measured `overflowX=0`, v1.42, and latest date `2026-05-22`.
- Deploy: Deployed to production. Production site `https://kzg-option-house.netlify.app/`; unique deploy `https://6a158610e727dc1f741ecf8a--kzg-option-house.netlify.app/`; production smoke: home `200`, `/r/latest.html` `200`, `/app.js` `200` with `UI_VERSION="1.42"`, `/data/index.json` `404`, `/assets/kzg-pack.js` `404`, public-risk terms `false`.
- Next: v1.43 should keep tightening the phone long page below the fold, especially making advanced preview, rotation quadrant, and symbol momentum shorter, denser, and more unified. iOS is not synced this round; the default next iOS companion checkpoint remains Web v1.45.

## v1.41 - 2026-05-26 19:19 Asia/Shanghai - lower-dashboard density pass

中文:

- 改动: 公开 Web UI 从 `1.40` 提到 `1.41`。追加 v1.41 样式层，专门压缩高级情报层、解锁预览、历史回看、实时轮廓、信号栈和轮动象限的桌面间距；手机端收紧日报预览高度、顶部品牌字重与按钮区视觉节奏。
- 原因: Fangbao 一直强调 spacing/calligraphy 的提升不会结束，尤其下半屏不能因为高级模块多就变成松散白块。本轮不增加新功能，不引入付费/域名/API 公开文案，只把已有数据块继续压成更像金融终端的连续阅读节奏。
- 视觉影响: 1440 桌面下，高级预览整体高度约 `1848px`，实时轮廓约 `349px`，轮动象限约 `382px`，比 v1.40 更紧；390 手机下 topbar 高度约 `87px`，`KZG OPTION HOUSE` 标题完整可见，日报画布预览高度保持可读但不拖长首屏。
- 公开边界: source 与本地 dist app shell 未出现 Stripe、Checkout、Wallet、Crypto、微信、WeChat、Namecheap、Network Solutions、域名候选、真实价格、payment、billing、API key、Massive plan、authorization、内部产品方案、授权路径或后端方案等公开风险词。
- 验证: `node --check public/app.js` 通过；build 生成 `505` 天 payload，最新日 `2026-05-22`，analytics symbols `98`，pack asset `kzg-frame-3c82ea5cf188.js`；内置 Browser 验证默认视口和手机视口无横向溢出、无 console error、主题按钮可从 light 切到 dark；Chrome/CDP 复核桌面 `1440x1100` 与手机 `390x844` 均 `overflowX=0`，公开风险词为 0；PNG export `/tmp/kzg-option-house-v141-export-final.png` 成功，大小 `885,309` bytes。
- 部署: 本轮不部署生产。原因是 v1.41 是生产后第一轮本地视觉密度迭代，不是公开风险修复；生产仍为 v1.40，唯一部署仍是 `https://6a157e2c75d8fa059c5e904c--kzg-option-house.netlify.app/`。
- 下一步: v1.42 继续处理高级模块下方的手机长页面节奏，尤其减少历史模糊预览的纵向拖沓，并继续保持 PNG 老日报导出稳定。

English:

- Change: Moved public Web UI from `1.40` to `1.41`. Added a v1.41 CSS layer focused on tightening desktop spacing across the advanced intelligence layer, unlock preview, history lookback, live silhouette, signal stack, and rotation quadrant. On mobile, tightened the report preview height, brand typography, and top command rhythm.
- Reason: Fangbao keeps emphasizing that spacing/calligraphy improvement never ends, especially in lower-screen advanced modules where extra product surface can easily become loose blank blocks. This round adds no new commercial feature and no public payment/domain/API copy; it makes existing data blocks read more like a continuous financial terminal.
- Visual impact: At `1440px` desktop, the advanced preview is about `1848px`, live silhouette about `349px`, and rotation quadrant about `382px`, tighter than v1.40. At `390px` mobile, topbar height is about `87px`, `KZG OPTION HOUSE` is fully visible, and the report-canvas preview stays readable without dragging the first screens as much.
- Public boundary: Source and local dist app shell contain no Stripe, Checkout, Wallet, Crypto, WeChat, Namecheap, Network Solutions, candidate domains, real prices, payment, billing, API key, Massive plan, authorization, internal product planning, backend-plan, or equivalent public-risk wording.
- Verification: `node --check public/app.js` passed; build produced a `505`-day payload, latest date `2026-05-22`, analytics symbols `98`, pack asset `kzg-frame-3c82ea5cf188.js`; in-app Browser verified default and mobile viewports with no horizontal overflow, no console errors, and the theme button changing from light to dark; Chrome/CDP rechecked desktop `1440x1100` and mobile `390x844` with `overflowX=0` and zero public-risk terms; PNG export `/tmp/kzg-option-house-v141-export-final.png` succeeded at `885,309` bytes.
- Deploy: Not deployed to production. v1.41 is the first local density iteration after the v1.40 production checkpoint, not a public-risk fix. Production remains v1.40; unique deploy remains `https://6a157e2c75d8fa059c5e904c--kzg-option-house.netlify.app/`.
- Next: v1.42 should continue mobile long-page rhythm below the advanced modules, especially reducing vertical drag in historical blur previews while keeping the old KZG PNG export stable.

## v1.40 - 2026-05-26 19:08 Asia/Shanghai - production checkpoint and iOS 0.2 sync

中文:

- 改动: 公开 Web UI 从 `1.39` 提到 `1.40`。把用户可见的高级/会员文案继续收紧，只保留“可读信号、模糊预览、PNG 输出边界”和实时层产品轮廓，删除/替换所有会让公开页像内部商业计划书的措辞。同步 iOS companion 到 `0.2`，在 SwiftUI 首屏加入 Web/iOS/PNG 三个 checkpoint tile。
- 原因: Fangbao 明确要求支付、域名候选、注册机制、API 套餐、商业价格、授权路径只能留在 docs、Apple Notes、`.private` 或本线程，不能放公开站。同时 iOS 不是每个 Web 版本都更新，而是每 5 个 Web 稠密版本同步一次；`1.40` 是 `1.35 -> 1.40` 后的默认同步点。
- 视觉影响: 桌面继续压缩高级预览和实时轮廓区域的卡片间距，减少大块空白；移动端实测 `390x844` 没有横向溢出，topbar 高度 `89px`，时间轴和核心市场数据仍在首屏出现。PNG 导出保持 KZG 老日报表格风格，没有引入新的商业 UI。
- 公开边界: source 与生产 app shell 均未出现 Stripe、Checkout、Wallet、Crypto、微信、WeChat、Namecheap、Network Solutions、域名候选、真实价格、payment、billing、API key、Massive plan、authorization、内部产品方案、授权路径或后端方案等公开风险词。
- 验证: `node --check public/app.js` 通过；build 生成 `505` 天 payload，最新日 `2026-05-22`，analytics symbols `98`，pack asset `kzg-frame-ee919379669a.js`；CDP 浏览器实测桌面和手机均 `overflowX=0`；手机 `390x844` 显示 `1.40` 和 `2026-05-22`；PNG export 实际生成 `/tmp/kzg-option-house-v140-export.png`，大小 `885,309` bytes；生产唯一部署首页 `200`、`/r/latest.html` `200`、`/data/index.json` `404`、`/assets/kzg-pack.js` `404`，生产 `app.js` 显示 `UI_VERSION = "1.40"`。
- iOS 状态: SwiftUI 源码已同步到 companion `0.2`，`MARKETING_VERSION=0.2`，`swiftc -typecheck` 通过。本机 Xcode/模拟器 runtime 当前不能通过具体 destination 完整 build/run，报本机 simulator runtime 与 `iphonesimulator26.5` SDK destination 期待不匹配；未做 App Store、TestFlight、签名 team 或开发者账号动作。
- 部署: 生产站 `https://kzg-option-house.netlify.app/`；唯一部署 `https://6a157e2c75d8fa059c5e904c--kzg-option-house.netlify.app/`。
- 下一步: v1.41 继续做公开 dashboard 的字体/间距统一，重点是桌面下半屏高级模块的密度、手机日报画布入口的可读性、以及 CHANGLOG/插件总账的更强交接索引。

English:

- Change: Moved public Web UI from `1.39` to `1.40`. Tightened user-facing advanced/account copy so the public page only shows readable signals, blurred previews, PNG export boundaries, and live-layer product silhouettes. Removed/replaced wording that made the public page read like internal commercial planning. Synced the iOS companion to `0.2` with three SwiftUI checkpoint tiles for Web/iOS/PNG.
- Reason: Fangbao explicitly required payment routes, candidate domains, registration mechanics, API plan internals, commercial pricing, and authorization paths to stay in docs, Apple Notes, `.private`, or this thread, not on the public site. iOS also follows a 5-Web-version cadence; `1.40` is the checkpoint after `1.35 -> 1.40`.
- Visual impact: Desktop advanced preview and live-silhouette spacing was compressed to reduce blank blocks. Mobile `390x844` measured no horizontal overflow, topbar height `89px`, and the timeline plus core market metrics still appear in the first screen. PNG export keeps the old KZG daily-report table style.
- Public boundary: Source and production app shell contain no Stripe, Checkout, Wallet, Crypto, WeChat, Namecheap, Network Solutions, candidate domains, real prices, payment, billing, API key, Massive plan, authorization, internal product planning, backend-plan, or equivalent public-risk wording.
- Verification: `node --check public/app.js` passed; build produced a `505`-day payload, latest date `2026-05-22`, analytics symbols `98`, pack asset `kzg-frame-ee919379669a.js`; CDP browser checks measured desktop and mobile `overflowX=0`; mobile `390x844` shows `1.40` and `2026-05-22`; PNG export generated `/tmp/kzg-option-house-v140-export.png` at `885,309` bytes; unique production deploy smoke returned home `200`, `/r/latest.html` `200`, `/data/index.json` `404`, `/assets/kzg-pack.js` `404`, and production `app.js` shows `UI_VERSION = "1.40"`.
- iOS status: SwiftUI source is synced to companion `0.2`, `MARKETING_VERSION=0.2`, and `swiftc -typecheck` passes. Full Xcode build/run by destination is blocked on this machine by a simulator runtime versus `iphonesimulator26.5` SDK destination mismatch. No App Store, TestFlight, signing team, or developer-account action was performed.
- Deploy: production `https://kzg-option-house.netlify.app/`; unique deploy `https://6a157e2c75d8fa059c5e904c--kzg-option-house.netlify.app/`.
- Next: v1.41 should continue public dashboard typography/spacing unity, especially lower-desktop premium density, mobile report-canvas entry readability, and stronger CHANGLOG/plugin-ledger handoff indexing.

## v1.39 - 2026-05-26 18:50 Asia/Shanghai - compressed mobile command bar

中文:

- 改动: 公开 Web UI 从 `1.38` 提到 `1.39`。追加最终移动端样式层，专门压缩手机顶部品牌区、日期区和四个工具按钮区；`<=520px` 下 topbar 改成两行结构，第一行品牌和日期，第二行四个等宽按钮，导出 PNG 不再独占整行。
- 设计原因: Fangbao 截图指出移动端和桌面都还要继续提升 spacing/calligraphy，尤其不能把宝贵首屏浪费在顶部工具和大块空白上。本轮先把手机第一屏的“可读盘密度”拉回来，让时间轴、核心数据和今日总线更早出现。
- 视觉结果: Playwright 实测手机 `390x844` topbar 高度从上一轮记录的约 `258px` 压到 `89px`；四个按钮网格为 `87.75px 87.75px 87.75px 87.75px`，首屏可见 topbar、交易日时间轴、核心 Market summary 和今日读盘总线开头。桌面 topbar 仍保持 `69px`，没有引入横向溢出。
- 公开边界: 公开页面仍没有加入 payment、domain、registration、API key、Massive plan、price、Stripe、wallet、WeChat 或真实授权流程；dist app shell 风险词扫描为 0，packed data asset 继续排除扫描。
- 验证: `node --check public/app.js` 通过；build 生成 `505` 天 payload，最新日 `2026-05-22`，pack asset `kzg-frame-c49af8aef19c.js`；桌面 `1440x1100` 显示 v1.39、无横向溢出、console error 为 `0`；历史日期 index `420` 仍触发 `historyLocked=true`、5 个历史浮层、无横向溢出；手机 `390x844` 显示 v1.39、无横向溢出、console error 为 `0`；PNG 导出 `/tmp/kzg-option-house-v139-export.png` 成功，大小 `1,482,138` bytes。
- 部署: 本轮不部署生产。原因是 v1.39 是本地验证的移动端节奏修正，不是公开风险修复；生产仍为 v1.36。下一轮 v1.40 是默认部署 checkpoint，也是 iOS 伴生工程下一次同步 checkpoint。
- 下一步: v1.40 做部署前综合收束：复查桌面右栏/下方 advanced panels 的节奏，保持 PNG 老日报导出样式，重新跑生产前 smoke，并同步 iOS companion 的 5-version checkpoint。

English:

- Change: Moved public Web UI from `1.38` to `1.39`. Added a final mobile CSS layer focused on compressing the phone brand/date/tools area. At `<=520px`, the topbar becomes a two-row structure: brand/date first, four equal-width action buttons second, and PNG export no longer consumes a full row.
- Reason: Fangbao's screenshots showed that mobile and desktop spacing/calligraphy still need continuous refinement, especially avoiding wasted first-screen height in top tools and blank space. This round restores first-screen reading density so the timeline, key metrics, and daily read bus appear sooner.
- Visual result: Playwright measured mobile `390x844` topbar height down from the previously recorded about `258px` to `89px`; the four-button toolbar grid is `87.75px 87.75px 87.75px 87.75px`, and the first viewport now shows the topbar, trading-day timeline, Market summary, and the start of the daily read bus. Desktop topbar remains `69px` with no horizontal overflow.
- Public boundary: The public page still does not include payment, domain, registration, API key, Massive plan, price, Stripe, wallet, WeChat, or real entitlement flow. Dist app-shell risk-token scan is 0, with the packed data asset still excluded.
- Verification: `node --check public/app.js` passed; build produced a `505`-day payload, latest date `2026-05-22`, pack asset `kzg-frame-c49af8aef19c.js`; desktop `1440x1100` shows v1.39, no horizontal overflow, and `0` console errors; historical index `420` still triggers `historyLocked=true`, 5 historical overlays, and no overflow; mobile `390x844` shows v1.39, no horizontal overflow, and `0` console errors; PNG export `/tmp/kzg-option-house-v139-export.png` succeeded at `1,482,138` bytes.
- Deploy: Not deployed to production. v1.39 is a locally verified mobile rhythm correction, not a public-risk fix. Production remains v1.36. The next v1.40 is the default deploy checkpoint and the next iOS companion checkpoint.
- Next: v1.40 should do pre-deploy consolidation: recheck desktop right column and lower advanced-panel rhythm, preserve the old KZG PNG export sheet style, run production smoke preparation, and sync the iOS companion 5-version checkpoint.

## v1.38 - 2026-05-26 18:28 Asia/Shanghai - compact historical blur preview

中文:

- 改动: 公开 Web UI 从 `1.37` 提到 `1.38`。把历史日期的锁定层从普通遮罩改成更像产品预览的小型浮层，新增 `lockedPreviewOverlay()`，统一用于高级预览底部、轮动象限 veil、以及 5 个历史回看面板。
- 设计原因: Fangbao 反馈公开页面不能再出现内部商业规划，同时要求模糊预览要让用户感受到背后有强功能，而不是一块无意义白板。本轮把文案改成“历史深度预览”，前层展示“方向轮廓 / 历史对比 / 导出边界”，后层仍保留模糊数据纹理。
- 视觉纠偏: 第一版覆盖层铺满整块趋势面板，重新形成大白块；已改成 `382px` 宽的中心浮层，背景图表和历史纹理继续可见，减少空白压迫。
- 公开边界: 没有加入 Stripe、支付、域名候选、注册、API key、Massive plan、价格或真实授权流程；公开风险词扫描在 source 与 dist shell 中均为 0。注意 dist packed data asset 被排除扫描，因为它是压缩数据包，不是页面文案。
- 验证: `node --check public/app.js` 通过；build 生成 `505` 天 payload，最新日 `2026-05-22`，pack asset `kzg-frame-257c256d3f5e.js`；内置 Browser 插件这轮返回底层浏览器对象，缺少 tab 控制能力，因此使用 Playwright fallback；桌面 `1440x1100` 最新日无锁定、无横向溢出、console error 为 `0`；历史日期 index `420` 触发 `historyLocked=true`、5 个 panel overlay、1 个 premium lock、1 个 quadrant veil、无横向溢出；手机 `390x844` 无横向溢出，console error 为 `0`；PNG 导出 `/tmp/kzg-option-house-v138-export-final.png`，大小 `1,482,138` bytes。
- 部署: 本轮不部署生产。原因是 v1.38 是视觉/体验迭代，不是公开风险修复；生产仍为 v1.36，等累计到 3-5 个扎实版本再 deploy。
- 下一步: v1.39 继续做高级区下方的面板节奏和手机 topbar 压缩，尤其是移动端按钮区高度仍偏大。

English:

- Change: Moved public Web UI from `1.37` to `1.38`. Reworked historical locked states from plain masks into compact product-preview overlays. Added `lockedPreviewOverlay()` and reused it for the advanced preview footer, rotation quadrant veil, and the five locked history panels.
- Reason: Fangbao said the public page must not expose internal commercial planning, while blurred previews should still let users feel there is real power behind them. This version renames the copy to "Historical depth preview" and foregrounds `Signal shape / History compare / Export boundary` while keeping the data texture blurred behind it.
- Visual correction: The first overlay pass covered the full trend panel and created another large white block. It was corrected into a centered `382px` floating panel so the blurred chart and historical texture remain visible.
- Public boundary: No Stripe, payment, candidate domain, registration, API key, Massive plan, price, or real entitlement flow was added. Public risk-token scan returned 0 in source and dist shell. The packed dist data asset is excluded because it is compressed data, not visible page copy.
- Verification: `node --check public/app.js` passed; build produced a `505`-day payload, latest date `2026-05-22`, pack asset `kzg-frame-257c256d3f5e.js`; the in-app Browser plugin returned a low-level browser object without tab controls in this round, so Playwright fallback was used; desktop `1440x1100` latest day is unlocked, has no horizontal overflow, and has `0` console errors; historical index `420` triggers `historyLocked=true`, 5 panel overlays, 1 premium lock, 1 quadrant veil, and no horizontal overflow; mobile `390x844` has no horizontal overflow and `0` console errors; PNG export `/tmp/kzg-option-house-v138-export-final.png` is `1,482,138` bytes.
- Deploy: Not deployed to production because v1.38 is a visual/experience iteration, not a public-risk fix. Production remains v1.36 until the next 3-5 solid-version deploy checkpoint.
- Next: v1.39 should keep refining lower advanced-panel rhythm and mobile topbar compression, especially because the mobile button block still consumes too much height.

## v1.37 - 2026-05-26 18:10 Asia/Shanghai - advanced preview capability rail

中文:

- 改动: 公开 Web UI 从 `1.36` 提到 `1.37`。在高级情报层新增 `premium-capability-rail`，把高级预览从一组硬卡片改成一条连续能力带：左侧显示当前轮动引线，中间显示能量、资金、轮动、节奏，右侧用 30 日小柱带表达历史脉冲。
- 设计原因: Fangbao 明确要求继续提升 spacing/calligraphy，并且不要再把商业规划、支付、域名、API key、套餐价格等内部内容放在公开页面。本轮目标是让高级能力更可感知，但只通过数据形态和模糊/轮廓呈现，不泄漏真实商业机制。
- 纠偏: 第一版能力带右侧 30 条横线把整条 rail 拉到 `618px` 高，左侧出现大白块；立即改成紧凑时间胶片式小柱带，桌面 rail 高度压到 `122px`，减少空白和 block-stack 压力。
- 公开边界: 删除公开页里的 `billing mechanics` 词；公开页风险词扫描确认没有 Stripe、Checkout、Wallet、Crypto、微信、域名候选、价格、pricing、payment、billing、注册、订阅、升级、降级等商业/授权词。
- 验证: `node --check public/app.js` 通过；build 生成 `505` 天 payload，最新日 `2026-05-22`，pack asset `kzg-frame-4d22fd74cc0b.js`；内置 Browser DOM QA 通过，确认 v1.37、无横向溢出、无控制台错误、无内部商业词；本机 Playwright 桌面 `1440x1100` 高级区 rail `122px`，无横向溢出，控制台错误 `0`；手机 `390x844` 无横向溢出，控制台错误 `0`；PNG 导出 `/tmp/kzg-option-house-v137-export.png` 约 `1.48MB`。
- 部署: 本轮不部署生产。原因是它不是公开风险修复，按 3-5 个扎实版本部署一次的规则，先作为本地验证和 GitHub/Notes 留痕版本累计。生产仍为 v1.36。
- 下一步: v1.38 继续处理高级区后半段和下方 analysis panels 的统一感，尤其让 blurred historical preview 更像产品价值展示，而不是普通锁。

English:

- Change: Moved public Web UI from `1.36` to `1.37`. Added `premium-capability-rail` to the advanced intelligence layer, turning the advanced preview from rigid cards into one continuous capability rail: lead symbol on the left, energy/capital/rotation/rhythm in the center, and a compact 30-session pulse strip on the right.
- Reason: Fangbao asked for ongoing spacing/calligraphy improvement and repeated that commercial planning, payment, domains, API keys, and plan pricing must stay off the public page. This version makes advanced capability more perceptible through data shape and silhouette only, without leaking real commercial mechanics.
- Correction: The first rail draft made the right-side 30 bars vertical as full horizontal rows and stretched the rail to `618px`, creating a large blank block on the left. It was immediately redesigned as a compact film-strip mini bar sequence; desktop rail height is now `122px`.
- Public boundary: Removed the public `billing mechanics` wording. Public risk-token scan confirms no Stripe, Checkout, Wallet, Crypto, WeChat, domain candidate, price, pricing, payment, billing, registration, subscription, upgrade, or downgrade strings in the public app shell.
- Verification: `node --check public/app.js` passed; build produced a `505`-day payload, latest date `2026-05-22`, pack asset `kzg-frame-4d22fd74cc0b.js`; in-app Browser DOM QA confirmed v1.37, no horizontal overflow, no console errors, and no internal commercial strings; local Playwright desktop `1440x1100` saw the advanced rail at `122px`, no overflow, and `0` console errors; mobile `390x844` had no overflow and `0` console errors; PNG export `/tmp/kzg-option-house-v137-export.png` was about `1.48MB`.
- Deploy: Not deployed to production in this round because this is not a public-risk fix. It is accumulated as a locally verified GitHub/Notes breadcrumb under the 3-5 solid-version deploy cadence. Production remains v1.36.
- Next: v1.38 should continue the lower advanced area and downstream analysis-panel unity, especially making blurred historical preview feel like product value rather than a plain lock.

## v1.36 - 2026-05-26 17:40 Asia/Shanghai - iOS companion 0.1 and rotation quadrant flow

中文:

- 改动: 新增原生 SwiftUI iOS 伴生工程 `/Users/fangbao/kzg-options-minute-site/ios/KZGOptionHouse/KZGOptionHouse.xcodeproj`，scheme 为 `KZG Option House`，bundle id 为 `com.kzg.optionhouse`；同时把公开 Web UI 提到 `1.36`，强化高级轮动象限的 flow rows、hover title 和 symbol tooltip 轮动定位。
- 产品方向: iOS 不是网页缩小版，而是手机读盘端；首版包含 KZG serif header、交易日时间轴、核心摘要、今日读盘总线、结构拆分、日内 30 分钟桶、轮动象限和核心标的聚焦。
- 节奏: Fangbao 要求 iOS 不必每次 Web 更新都同步；当前规则写入 `docs/IOS_COMPANION_PLAN.md` 和 `docs/DENSE_VERSIONING.md`：iOS 每 5 个 Web 稠密版本同步一次。当前 iOS `0.1` 对应 Web `1.35`，下一次 iOS checkpoint 目标为 Web `1.40`。
- 验证: Xcode scheme 可识别；generic iOS Simulator 构建成功；iPhone 17 Pro 模拟器已安装并启动 `com.kzg.optionhouse`；截图生成 `/tmp/kzg-option-house-ios-v01.png`。Web 侧 `node --check public/app.js` 通过；build 生成 `505` 天 payload，最新日 `2026-05-22`，pack asset `kzg-frame-5b14aa592fd6.js`；本地 desktop `1440x1100` 与 mobile `390x844` 无横向溢出，控制台错误为 0；PNG 导出生成 `/tmp/kzg-option-house-v136-export.png`，约 `1.4MB`；公开风险词为 0。
- 工具注意: XcodeBuildMCP 按具体 simulator destination 构建遇到本机 runtime 与 `iphonesimulator26.5` SDK destination 不匹配的问题；直接 Xcode generic simulator build 可通过。已写入 iOS 交接文档。
- 边界: 没有做 App Store 提交、TestFlight 上传、签名 team 选择、开发者账号动作或任何花钱动作；这些步骤必须在当时让 Fangbao 明确确认。
- 部署: Netlify production deploy 成功，生产 URL `https://kzg-option-house.netlify.app/`，唯一部署 `https://6a156cbee55c2318be31e1b4--kzg-option-house.netlify.app/`。唯一部署 smoke 通过：home `200`、latest `200`、`/data/index.json` `404`、`/assets/kzg-pack.js` `404`、`app.js` 显示 `UI_VERSION = "1.36"`。本机当前对主生产域名解析到本地代理地址导致 SSL smoke 不稳定，但 Netlify CLI 已确认 production live，唯一部署可正常验证。
- 公开站边界: 没有把 iOS、支付、域名、注册、API key 或套餐内容放到公开网页。
- 下一步: Web v1.37 继续高级轮动象限、历史 blur 和下方 analysis panels 统一感；iOS 下一次正式同步在 Web v1.40，除非 Fangbao 提前要求。

English:

- Change: Added a native SwiftUI iOS companion project at `/Users/fangbao/kzg-options-minute-site/ios/KZGOptionHouse/KZGOptionHouse.xcodeproj`, scheme `KZG Option House`, bundle id `com.kzg.optionhouse`; also moved the public Web UI to `1.36` with stronger advanced rotation quadrant flow rows, hover titles, and symbol-tooltip rotation positioning.
- Product direction: iOS is not a shrunken web page. It is a phone reading surface. Version 0.1 includes KZG serif header, trading-day timeline, key summary, daily read bus, structure split, intraday 30-minute buckets, rotation quadrant, and symbol focus.
- Cadence: Fangbao asked that iOS should not update on every Web version. The rule is now in `docs/IOS_COMPANION_PLAN.md` and `docs/DENSE_VERSIONING.md`: update iOS every 5 Web dense versions. Current iOS `0.1` maps to Web `1.35`; next iOS checkpoint is Web `1.40`.
- Verification: Xcode scheme is visible; generic iOS Simulator build succeeded; iPhone 17 Pro simulator installed and launched `com.kzg.optionhouse`; screenshot saved to `/tmp/kzg-option-house-ios-v01.png`. Web `node --check public/app.js` passed; build produced a `505`-day payload, latest date `2026-05-22`, pack asset `kzg-frame-5b14aa592fd6.js`; local desktop `1440x1100` and mobile `390x844` had no horizontal overflow and 0 console errors; PNG export saved `/tmp/kzg-option-house-v136-export.png` at about `1.4MB`; public risk-token scan returned 0.
- Tool note: XcodeBuildMCP destination build hit a local runtime versus `iphonesimulator26.5` SDK destination mismatch; direct Xcode generic simulator build succeeds. This is documented for handoff.
- Boundary: No App Store submission, TestFlight upload, signing team selection, developer-account action, or spending action was performed. Those require Fangbao confirmation at the moment of action.
- Deploy: Netlify production deploy succeeded. Production URL is `https://kzg-option-house.netlify.app/`; unique deploy is `https://6a156cbee55c2318be31e1b4--kzg-option-house.netlify.app/`. Unique deploy smoke passed: home `200`, latest `200`, `/data/index.json` `404`, `/assets/kzg-pack.js` `404`, and `app.js` has `UI_VERSION = "1.36"`. The local machine currently resolves the primary production hostname through a local proxy address, causing unstable SSL smoke, but Netlify CLI reports production live and the unique deploy verifies correctly.
- Public boundary: No iOS, payment, domain, registration, API key, or plan mechanics were put on the public page.
- Next: Web v1.37 continues advanced rotation quadrant, historical blur, and downstream analysis-panel unity; iOS syncs next at Web v1.40 unless Fangbao asks earlier.

## v1.28 - 2026-05-26 16:xx Asia/Shanghai - GitHub/Notes handoff layer

中文:

- 改动: 新增 GitHub 文档层：`docs/README.md`、`docs/CHANGELOG.md`、`docs/HANDOFF_FOR_OTHER_CODEX.md`、`docs/DENSE_VERSIONING.md`、`docs/MASSIVE_REALTIME_PRODUCT_PLAN.md`。
- 原因: Fangbao 明确要求“all the things got to be on the github”，这样另一个 Codex 接入 connectors 后可以继续，而不是只能靠当前线程或 Apple Notes。
- 数据边界: 本机 iCloud 重新核验 `23_DATA_Massive_期权分钟_Minute`，当前为 `505` 个 `options_minute_aggregates_*.csv.gz` 文件，范围 `2024-05-17 -> 2026-05-22`；没有发现 `2023-*.csv.gz`。`2023-05` 作为权限/API 路线目标继续保留。
- 商业边界: 把域名候选、支付、注册、Massive `$199` 实时路线等内容转入文档，不放公开主页。
- Massive 实时结论: `$199/month` Options Advanced 可用于 owner 侧采集和原型，但不能默认授权公开付费 SaaS 再分发实时 OPRA 派生数据；公开商业化实时 feed 需要 Business/法律确认。
- 验证: 只新增文档，未改公开 UI，未触碰 raw generated data。
- 下一步: v1.29 继续字体、留白、热力模块统一感；如涉及付费/登录，只做模糊产品体验，不放真实流程。

English:

- Change: Added GitHub documentation layer: `docs/README.md`, `docs/CHANGELOG.md`, `docs/HANDOFF_FOR_OTHER_CODEX.md`, `docs/DENSE_VERSIONING.md`, and `docs/MASSIVE_REALTIME_PRODUCT_PLAN.md`.
- Reason: Fangbao explicitly required that everything also live on GitHub so another Codex with connectors can continue the product.
- Data boundary: Re-audited local iCloud `23_DATA_Massive_期权分钟_Minute`; current proof is `505` `options_minute_aggregates_*.csv.gz` files covering `2024-05-17 -> 2026-05-22`; no local `2023-*.csv.gz` files were found. `2023-05` remains a target for API/plan-entitlement re-audit.
- Commercial boundary: Domain candidates, payment, registration, and Massive `$199` realtime planning are moved into docs, not public homepage content.
- Massive realtime conclusion: `$199/month` Options Advanced is useful for owner-side ingestion and prototypes, but should not be assumed to authorize public paid SaaS redistribution of real-time OPRA-derived data. A Business/legal confirmation is needed before selling live feed access.
- Verification: Docs only; no public UI changes; raw generated data untouched.
- Next: v1.29 should continue typography, spacing, heat-module visual unity, and blurred premium UX without exposing real payment mechanics.

## v1.29 - 2026-05-26 16:xx Asia/Shanghai - CHANGLOG option-terminal operating memory

中文:

- 改动: 新增 `docs/CHANGLOG_OPTION_TERMINAL.md` 和 `docs/CHANGLOG_OPTION_TERMINAL_MINDMAP.opml`，把 Fangbao 要求的 `CHANGLOG 期权终端` 写成中英双语、可交接、可导入 MindNode 的产品操作地图。
- 原因: Fangbao 明确指出这不是“给我看的 log”，而是另一个 agent 接手时要读的系统说明；它必须写清 SaaS 服务由什么构成，包含注册、用户认证、用户名密码、Supabase 候选后端、API 私有采集、三条支付路线、域名购买与 Netlify/GitHub 连接。
- 版本节点: 这个要求是在 `6c909a9` 紧急下线公开商业规划之后提出并强化的，因此归入文档/操作系统层 `v1.29`。它不是公开 UI 功能，不能直接把内部支付/域名/API 计划放回主页。
- 交接价值: 新 agent 可以直接读 `CHANGLOG_OPTION_TERMINAL.md` 理解产品结构，再读 `HANDOFF_FOR_OTHER_CODEX.md` 执行，再读 `MASSIVE_REALTIME_PRODUCT_PLAN.md` 处理 API/商业边界。
- 验证: 仅新增文档和 OPML；不触碰公开站 UI，不触碰 protected KZG OS 路径，不提交 raw data。
- 下一步: 同步 Apple Notes 置顶 note 标题为 `CHANGLOG 期权终端`，并把本文件内容写入置顶 note。

English:

- Change: Added `docs/CHANGLOG_OPTION_TERMINAL.md` and `docs/CHANGLOG_OPTION_TERMINAL_MINDMAP.opml`, turning Fangbao's requested `CHANGLOG 期权终端` into a bilingual, handoff-grade, MindNode-importable product operating map.
- Reason: Fangbao clarified this is not a simple owner log; it is the system document another agent should read when picking up the project. It must explain the SaaS service structure, registration, user authentication, username/password, Supabase backend candidate, private API ingestion, three payment rails, domain purchase, and Netlify/GitHub connection.
- Version moment: This requirement was clarified after `6c909a9` removed public commercial planning, so it belongs to documentation/operating-system layer `v1.29`. It is not a public UI feature and must not leak internal payment/domain/API plans back onto the homepage.
- Handoff value: A new agent can read `CHANGLOG_OPTION_TERMINAL.md` to understand product structure, `HANDOFF_FOR_OTHER_CODEX.md` to execute, and `MASSIVE_REALTIME_PRODUCT_PLAN.md` for API/commercial boundaries.
- Verification: Docs and OPML only; no public UI changes; protected KZG OS paths untouched; raw data untouched.
- Next: Sync the pinned Apple Notes title to `CHANGLOG 期权终端` and write this content into the pinned note.

## v1.30 - 2026-05-26 16:xx Asia/Shanghai - cross-terminal traceability prompt

中文:

- 改动: 新增 `docs/TEXT_REPLACEMENT_TRACEABLE_SAAS_PROMPT.md`，内容是一条 1951 字符的无标点单段 Text Replacement 提示词，用于任何新 SaaS 项目一开始就执行跨终端留痕。
- 原因: Fangbao 明确提出 master level 原则：从一个 terminal 做出的需求和差异，必须能被另一个 terminal 或另一个 Codex 接住。这里 terminal 指所有工具和材料所在地，包括 GitHub、iCloud、Google Drive、Netlify、Stripe、Supabase、Network Solutions、Apple Notes、本地私有目录、自动化和当前对话。
- 交接价值: 新项目可以直接把这条提示词扔给 AI，要求它从第一步起记录路径、服务、数据范围、提交哈希、部署链接、风险、下一步和责任边界。
- 验证: 字符计数为 `1951`，正文无标点，文件内只保留单段提示词原文。
- 下一步: Apple Notes `CHANGLOG 期权终端` 继续同步这套 doctrine，并在后续每次工具接入时补充责任边界。

English:

- Change: Added `docs/TEXT_REPLACEMENT_TRACEABLE_SAAS_PROMPT.md`, a 1951-character no-punctuation single-paragraph Text Replacement prompt for starting any future SaaS project with cross-terminal traceability.
- Reason: Fangbao defined the master-level principle that a requirement or difference made in one terminal must be recoverable by another terminal or another Codex. Terminal means every tool and material location: GitHub, iCloud, Google Drive, Netlify, Stripe, Supabase, Network Solutions, Apple Notes, local private folders, automations, and the current conversation.
- Handoff value: A new project can paste this prompt into an AI and force path, service, data range, commit hash, deploy URL, risk, next step, and ownership boundaries from day one.
- Verification: Character count is `1951`; prompt body has no punctuation; the file contains only the raw single-paragraph prompt.
- Next: Keep syncing this doctrine into Apple Notes `CHANGLOG 期权终端`, and expand responsibility boundaries whenever a new service is connected.

## v1.31 - 2026-05-26 16:25 Asia/Shanghai - heat-lane calligraphy pass

中文:

- 改动: 将公开 UI 版本号从 `1.27` 提到 `1.31`，并在 `public/styles.css` 增加 v1.31 视觉层。
- 重点: 继续回应 Fangbao 关于 spacing 和 calligraphy 的要求，降低背景网格存在感，把分钟热力从硬方块感继续推向连续 lane 语言。
- 视觉动作: `body` 背景网格从 72px 强线改成 96px 弱线；`.heat-lane-board` 改成柔和底色、8px 半径、行间留白；`.heat-lane-row` 从纯分隔线改成轻边界的横向数据 lane；`.heat-lane-track` 降低柱状高度，改成更像连续脉冲的细线；关键卡片统一 6px 半径。
- 公开边界: 没有加入支付、域名、注册、API key、Massive 套餐、Stripe、Supabase 或内部商业路线。
- 验证: 本轮 build 已生成 `505` 天 payload；Chrome headless 生成桌面与移动截图；补充移动端 topbar/grid 防横向溢出约束；生产 smoke check `home=200`、`/latest=200`、`/data/index.json=404`、`/assets/kzg-pack.js=404`，`/app.js` 显示 `UI_VERSION = "1.31"`。
- 部署: 生产站 `https://kzg-option-house.netlify.app/`；唯一部署 `https://6a155a982b0a5da4f255af13--kzg-option-house.netlify.app/`。
- 下一步: 继续压缩下半屏视觉空白，尤其是 premium preview 和 analysis grid 的桌面节奏。

English:

- Change: Bumped public UI version from `1.27` to `1.31` and added a v1.31 visual layer in `public/styles.css`.
- Focus: Continued Fangbao's spacing/calligraphy direction by reducing background grid presence and pushing minute heatmap language away from hard square blocks toward continuous lanes.
- Visual actions: `body` background grid changed from stronger 72px lines to softer 96px lines; `.heat-lane-board` now has a softer surface, 8px radius, and row breathing room; `.heat-lane-row` now reads as a lightweight horizontal data lane; `.heat-lane-track` uses shorter pulse strokes; key cards share a 6px radius.
- Public boundary: No payment, domain, registration, API key, Massive plan, Stripe, Supabase, or internal commercial route added to the public site.
- Verification: Build produced a `505`-day payload; Chrome headless produced desktop and mobile screenshots; added mobile topbar/grid overflow protection; production smoke check passed with `home=200`, `/latest=200`, `/data/index.json=404`, `/assets/kzg-pack.js=404`, and `/app.js` showing `UI_VERSION = "1.31"`.
- Deploy: production `https://kzg-option-house.netlify.app/`; unique deploy `https://6a155a982b0a5da4f255af13--kzg-option-house.netlify.app/`.
- Next: Continue compressing lower-screen visual blankness, especially premium preview and analysis-grid desktop rhythm.

## v1.32 - 2026-05-26 16:44 Asia/Shanghai - lower-cockpit rhythm pass

中文:

- 改动: 将公开 UI 版本号从 `1.31` 提到 `1.32`，并增加 v1.32 下半屏节奏层。
- 重点: 不再增加公开商业流程，只改高级预览、数据审计封印、回看窗口、预测动量栈、轮动象限和 analysis grid 的桌面密度。
- 视觉动作: 缩小高级预览外边距和内边距；把三列审计/解锁/信号区域压成更平衡的比例；降低卡片大字、减少 tab 高度、压低柱状 tape 高度；在 `1180px` 以下统一退回单列，避免桌面窄宽产生空白块。
- 公开边界: 本轮再次检索公开目录，没有新增 Stripe、域名候选、支付方式、API key、Massive 套餐价格、Supabase 或真实注册路线。
- 验证: build 生成 `505` 天 payload，最新日 `2026-05-22`，pack asset `kzg-frame-592efcfd3a2e.js`；本地桌面 `1440x1100` 与手机 `390x844` 截图通过，无横向溢出；公开风险词检索为 0；PNG 导出生成 `kzg-option-house-2026-05-22-zh.png`，大小约 `1.47MB`；生产 smoke 为 `home=200`、`/latest=200`、`/data/index.json=404`、`/favicon.svg=200`、`/app.js` 显示 `UI_VERSION = "1.32"`。
- 部署: 生产站 `https://kzg-option-house.netlify.app/`；唯一部署 `https://6a155f54945106b4d1611609--kzg-option-house.netlify.app/`。
- 下一步: v1.33 继续检查移动端高级预览、底部 analysis panel 的首屏切入位置和 PNG 导出保真。

English:

- Change: Bumped public UI version from `1.31` to `1.32` and added a lower-cockpit rhythm layer.
- Focus: No new public commercial flow. This version only adjusts the density of the advanced preview, data audit seal, lookback window, predictive momentum stack, rotation quadrant, and analysis grid.
- Visual actions: Reduced advanced-preview outer and inner spacing; balanced the three-column audit/unlock/signal ratios; lowered oversized card type, tab height, and tape height; added a `1180px` single-column fallback to avoid awkward blank blocks on narrower desktop widths.
- Public boundary: Re-scanned the public directory; no Stripe, domain candidates, payment rails, API keys, Massive plan prices, Supabase internals, or real registration route were added.
- Verification: Build produced a `505`-day payload, latest date `2026-05-22`, pack asset `kzg-frame-592efcfd3a2e.js`; local desktop `1440x1100` and mobile `390x844` screenshots passed with no horizontal overflow; public risk-token scan returned 0; PNG export produced `kzg-option-house-2026-05-22-zh.png` at about `1.47MB`; production smoke passed with `home=200`, `/latest=200`, `/data/index.json=404`, `/favicon.svg=200`, and `/app.js` showing `UI_VERSION = "1.32"`.
- Deploy: production `https://kzg-option-house.netlify.app/`; unique deploy `https://6a155f54945106b4d1611609--kzg-option-house.netlify.app/`.
- Next: v1.33 should keep polishing mobile advanced preview, the lower analysis panel entry point, and PNG export fidelity.

## v1.33 - 2026-05-26 16:55 Asia/Shanghai - mobile advanced-preview compression

中文:

- 改动: 将本地 UI 版本号从 `1.32` 提到 `1.33`，新增移动端高级预览压缩层。
- 重点: 继续只做公开 UI，不加入支付、注册、域名、API key、Stripe、Supabase、Massive 套餐或内部商业路线。
- 视觉动作: 在 `760px` 以下压缩高级预览内边距；审计卡、功能地图、预测动量栈、轮动象限统一 8px gap；功能 tab 和高级卡改为双列扫读；lookback 指标、signal rows、quadrant stats 在手机宽度优先双列；在 `420px` 以下再退回单列，避免窄屏文字挤压。
- 验证: build 生成 `505` 天 payload，最新日 `2026-05-22`，pack asset `kzg-frame-968c88f20da3.js`；本地 `390x844`、`420x920`、`1440x1100` 三个视口通过，无横向溢出；控制台错误为 0；公开风险词检索为 0；PNG 导出仍生成 `kzg-option-house-2026-05-22-zh.png`，大小约 `1.47MB`。该版本先作为 GitHub 备份，不立即生产部署，生产仍为 v1.32。
- 下一步: v1.34 继续做首屏到日报画布、再到高级预览的滚动节奏。

English:

- Change: Bumped local UI version from `1.32` to `1.33` and added a mobile advanced-preview compression layer.
- Focus: Public UI only. No payment, registration, domain, API key, Stripe, Supabase, Massive plan, or internal commercial route was added.
- Visual actions: Below `760px`, advanced preview padding is tighter; audit cards, feature map, predictive stack, and quadrant share an 8px gap; feature tabs and advanced cards switch to a two-column scan layout; lookback metrics, signal rows, and quadrant stats prefer two columns on phone width; below `420px`, dense stat areas fall back to one column to avoid cramped text.
- Verification: Build produced a `505`-day payload, latest date `2026-05-22`, pack asset `kzg-frame-968c88f20da3.js`; local `390x844`, `420x920`, and `1440x1100` viewports passed with no horizontal overflow; console errors were 0; public risk-token scan returned 0; PNG export still produced `kzg-option-house-2026-05-22-zh.png` at about `1.47MB`. This version is a GitHub backup first, not an immediate production deploy; production remains v1.32.
- Next: v1.34 should polish the scroll rhythm from first viewport to daily sheet and then into advanced preview.

## v1.34 - 2026-05-26 17:0x Asia/Shanghai - plugin ledger and note expansion

中文:

- 改动: 新增 `docs/PLUGIN_SERVICE_STATUS.md`，并修正 `docs/HANDOFF_FOR_OTHER_CODEX.md` 里的 Apple Notes 旧标题，把置顶 note 明确为 `CHANGLOG 期权终端`。
- 原因: Fangbao 指出 note 不够，并追问其他插件进展。需要把 GitHub、Netlify、Apple Notes、Massive、iCloud、Google Drive、Browser/Playwright、Stripe、Supabase、Network Solutions、微信、USDT、自动化心跳以及未使用插件的状态写成可交接总账。
- 公开边界: 这是内部文档更新，不改公开站，不部署，不放商业路线到页面。
- 插件状态: GitHub/Netlify/Apple Notes/iCloud/Browsers 已实际使用；Massive 实时路线已研究但未升级；Stripe/Supabase/域名/微信/USDT 只做规划，没有真实接入；Google Drive 镜像来自 Fangbao 回执，待未来 connector 复核。
- 下一步: Apple Notes 同步这份更完整的插件总账，并推 GitHub 备份。

English:

- Change: Added `docs/PLUGIN_SERVICE_STATUS.md` and fixed the old Apple Notes title in `docs/HANDOFF_FOR_OTHER_CODEX.md`; the pinned note is now explicitly `CHANGLOG 期权终端`.
- Reason: Fangbao said the note is not enough and asked how the other plugins are doing. The status of GitHub, Netlify, Apple Notes, Massive, iCloud, Google Drive, Browser/Playwright, Stripe, Supabase, Network Solutions, WeChat, USDT, heartbeat automation, and unused plugins needs to be a handoff-grade ledger.
- Public boundary: Internal docs only. No public-site change, no deploy, no commercial mechanics on the page.
- Plugin status: GitHub/Netlify/Apple Notes/iCloud/Browsers are actually used; Massive real-time route is researched but not upgraded; Stripe/Supabase/domain/WeChat/USDT are planning-only; Google Drive mirror is Fangbao-reported and awaits future connector verification.
- Next: Sync this richer plugin ledger into Apple Notes and push a GitHub backup.

## v1.35 - 2026-05-26 17:17 Asia/Shanghai - live-silhouette premium rail pass

中文:

- 改动文件: `public/app.js`、`public/styles.css`、`docs/CHANGELOG.md`、`docs/CHANGLOG_OPTION_TERMINAL.md`。
- 改动: 将公开 UI 版本号提到 `1.35`，在高级情报层加入 `实时流轮廓` 模块，并把高级区若干孤立方块改成更连续的 rail 语言。
- 设计目的: 回应 Fangbao 对 spacing/calligraphy 和“不要一堆方块”的要求。高级能力要能让用户感到强，但公开页只能展示产品轮廓、摘要和模糊预览，不能展示支付、域名、真实授权、API key 或套餐内部方案。
- 公开边界: 页面文案明确为“这里只展示实时层的产品轮廓。真实接入、授权、账户和计费不写入公开页面。”没有加入 Stripe、Network Solutions、域名候选、USDT、微信支付、checkout、API key 或 Massive 价格。
- 验证: `node --check public/app.js` 通过；build 生成 `505` 天 payload，最新日 `2026-05-22`，pack asset `kzg-frame-097929558aa7.js`；Playwright 本地桌面 `1440x1100` 与手机 `390x844` 无横向溢出，控制台错误为 `0`；PNG 导出 `qa-v135-export.png` 大约 `1.48MB`；公开风险词扫描为 `0`。
- 部署: 生产站 `https://kzg-option-house.netlify.app/`；唯一部署 `https://6a15650fe0f26408c3f1c230--kzg-option-house.netlify.app/`；生产 smoke 为 `home=200`、`/latest=200`、`/data/index.json=404`、`/assets/kzg-pack.js=404`、`/app.js` 显示 `UI_VERSION = "1.35"`。
- 下一步: v1.36 应继续从 premium preview 往下推进，重点是轮动象限图和历史模糊态，让“强功能可感知但不可复制”的体验更统一。

English:

- Changed files: `public/app.js`, `public/styles.css`, `docs/CHANGELOG.md`, and `docs/CHANGLOG_OPTION_TERMINAL.md`.
- Change: Bumped public UI version to `1.35`, added a `Live feed silhouette` module to the advanced intelligence layer, and turned several isolated premium blocks into calmer continuous rails.
- Design intent: Respond to Fangbao's spacing/calligraphy direction and the complaint about too many square blocks. The advanced layer should feel powerful, but the public page may only show product silhouette, summaries, and blurred previews, not payment, domain, real authorization, API key, or plan internals.
- Public boundary: The public text says that this only shows the live-layer product silhouette and real access, authorization, account, and billing mechanics are not published. No Stripe, Network Solutions, domain candidate, USDT, WeChat Pay, checkout, API key, or Massive price was added.
- Verification: `node --check public/app.js` passed; build produced a `505`-day payload, latest date `2026-05-22`, pack asset `kzg-frame-097929558aa7.js`; Playwright local desktop `1440x1100` and mobile `390x844` had no horizontal overflow and `0` console errors; PNG export `qa-v135-export.png` was about `1.48MB`; public risk-token scan returned `0`.
- Deploy: production `https://kzg-option-house.netlify.app/`; unique deploy `https://6a15650fe0f26408c3f1c230--kzg-option-house.netlify.app/`; production smoke returned `home=200`, `/latest=200`, `/data/index.json=404`, `/assets/kzg-pack.js=404`, and `/app.js` showing `UI_VERSION = "1.35"`.
- Next: v1.36 should continue below premium preview, especially rotation quadrant and historical blurred states, so powerful features are perceptible but not copyable.

## Git-evidenced build ledger / Git 可证实构建流水

The table below maps the repository history into a dense handoff narrative. It is not the complete visual subversion count; it is the Git-evidenced backbone.

下表把仓库历史转成稠密交接叙事。它不是所有视觉小版本数量，而是 Git 可证实的主干。

| Dense | Time CST | Commit | Subject | CN / EN meaning |
|---|---:|---|---|---|
| 1.01 | 2026-05-25 21:53 | `de9dfad` | daily auto pipeline + Netlify deploy + nav/i18n polish | 建立每日自动更新、Netlify 部署、中英文和导航骨架。 / Built daily automation, Netlify deploy, bilingual navigation. |
| 1.02 | 2026-05-25 22:01 | `4cdca05` | downloader scaffold | 预留 Massive 下载器。 / Scaffolded Massive downloader route. |
| 1.03 | 2026-05-25 22:05 | `ee89be5` | cron abort fix | 防止自动化静默失败。 / Made cron fail loudly. |
| 1.04 | 2026-05-25 22:14 | `4d8cac9` | per-day URLs | 恢复单日报 URL 与 Lighthouse 路线。 / Restored per-day report URLs and audit path. |
| 1.05 | 2026-05-25 22:17 | `e45ce81` | May data backfill | 补齐 2026-05 缺口。 / Backfilled missing May trading days. |
| 1.06 | 2026-05-25 22:59 | `844cce7` | export hardening | 加固 PNG 导出和数据保护。 / Hardened export and raw-data friction. |
| 1.07 | 2026-05-26 00:27 | `2f36e39` | history dashboard | 从日报变成历史 dashboard。 / Shifted from report list to historical dashboard. |
| 1.08 | 2026-05-26 00:49 | `d30c7ae` | fill momentum panel | 加入动量面板。 / Added momentum panel. |
| 1.09 | 2026-05-26 01:20 | `78217eb` | market intelligence | 加入市场结构情报层。 / Added market intelligence layer. |
| 1.10 | 2026-05-26 01:32 | `4b73aa0` | regime navigation | 加入 regime 导航。 / Added regime navigation. |
| 1.11 | 2026-05-26 01:42 | `0435855` | trend markers | 加入趋势标记。 / Added trend markers and regime stats. |
| 1.12 | 2026-05-26 02:13 | `832f447` | symbol focus lens | 加入标的聚焦 lens。 / Added symbol focus lens. |
| 1.13 | 2026-05-26 02:36 | `dd9bfc1` | intraday panels | 拆出日内分析面板。 / Added intraday analytics panels. |
| 1.14 | 2026-05-26 02:57 | `5e19ea3` | symbol rotation | 加入标的轮动。 / Added symbol rotation panel. |
| 1.15 | 2026-05-26 03:12 | `beae8a5` | structure polish | 优化日内结构。 / Polished intraday structure. |
| 1.16 | 2026-05-26 03:21 | `1d8c77b` | mobile/radar polish | 压缩移动端和雷达视觉。 / Improved mobile and radar balance. |
| 1.17 | 2026-05-26 03:44 | `1b81cc6` | tooltip/focus polish | 强化 hover 和 focus。 / Improved tooltip and focus exploration. |
| 1.18 | 2026-05-26 03:53 | `053e05d` | pulse strip | 加入脉冲条。 / Added pulse strip analytics. |
| 1.19 | 2026-05-26 04:07 | `aa1ca08` | intraday fingerprint | 加入日内指纹。 / Added intraday fingerprint. |
| 1.20 | 2026-05-26 04:20 | `4c7e776` | rotation intelligence | 强化轮动智能。 / Added rotation intelligence. |
| 1.21 | 2026-05-26 04:40 | `d8e3544` | sidebar intelligence | 强化侧栏密度。 / Added sidebar intelligence. |
| 1.22 | 2026-05-26 04:51 | `c5dc3b2` | rhythm analytics | 加入节奏分析。 / Added symbol rhythm analytics. |
| 1.23 | 2026-05-26 05:06 | `5fc8b8f` | session tape | 加入 session tape。 / Added session tape. |
| 1.24 | 2026-05-26 05:28 | `b41c4ca` | risk radar | 加入日内风险雷达。 / Added intraday risk radar. |
| 1.25 | 2026-05-26 05:35 | `732d1aa` | trend rhythm stack | 加入趋势节奏堆栈。 / Added trend rhythm stack. |
| 1.26 | 2026-05-26 05:52 | `f40b1c1` | rotation quadrant | 加入轮动象限。 / Added rotation quadrant map. |
| 1.27 | 2026-05-26 06:07 | `42e8878` | focus windows | 加入标的窗口。 / Added symbol focus windows. |
| 1.28 | 2026-05-26 06:22 | `3180dc0` | heatmap relay | 降低热力块突兀感。 / Softened heatmap block feel. |
| 1.29 | 2026-05-26 06:38 | `20c99b1` | trend cockpit | 重排趋势 cockpit。 / Reworked trend cockpit layout. |
| 1.30 | 2026-05-26 06:50 | `191d973` | momentum cockpit | 重排动量 cockpit。 / Reworked momentum cockpit layout. |
| 1.31 | 2026-05-26 07:11 | `93cbe79` | compact mobile cockpit | 移动端 compact。 / Compact mobile cockpit. |
| 1.32 | 2026-05-26 07:25 | `0c4fd49` | mobile analysis panels | 移动端分析密度优化。 / Compact mobile analysis panels. |
| 1.33 | 2026-05-26 07:36 | `b8c3749` | preview compression | 压缩预览 cockpit。 / Compressed preview cockpit. |
| 1.34 | 2026-05-26 07:57 | `1dc4890` | mobile density | 收紧移动分析密度。 / Tightened mobile analysis density. |
| 1.35 | 2026-05-26 08:13 | `9c1edb3` | heatmap language | 软化热力图语言。 / Softened heatmap language. |
| 1.36 | 2026-05-26 08:26 | `1e932c9` | heat lane density | 收紧 heat lane。 / Tightened heat lane density. |
| 1.37 | 2026-05-26 08:44 | `ef13881` | dashboard v27 | 标记 dashboard v27。 / Evolved dashboard to v27. |
| 1.38 | 2026-05-26 08:48 | `913b8ec` | packed asset entry | 旋转打包入口。 / Rotated packed asset entry. |
| 1.39 | 2026-05-26 08:55 | `69c402d` | runtime scrub | 加载后清理 runtime 暴露。 / Scrubbed runtime after load. |
| 1.40 | 2026-05-26 08:57 | `d1f31c9` | narrow header | 优化窄屏 header。 / Polished narrow header. |
| 1.41 | 2026-05-26 09:36 | `27d3c59` | lower ledgers | 收紧底部分析账本。 / Tightened lower analysis ledgers. |
| 1.42 | 2026-05-26 10:32 | `3b94c87` | dashboard v40 | cockpit v40。 / Refined dashboard cockpit v40. |
| 1.43 | 2026-05-26 10:52 | `c505d4c` | trend cockpit v45 | trend cockpit v45。 / Added trend cockpit v45. |
| 1.44 | 2026-05-26 11:39 | `02a120b` | dashboard v55 | dashboard v55。 / Refined dashboard v55. |
| 1.45 | 2026-05-26 13:19 | `5eb10dd` | pro preview gating | 加入 Pro 模糊预览。 / Added Pro preview gating. |
| 1.46 | 2026-05-26 13:43 | `f421b04` | gating surfaces | 加强 gated surfaces。 / Enhanced gated surfaces. |
| 1.47 | 2026-05-26 14:08 | `6ee9020` | entitlement matrix | 加入权限矩阵。 / Added entitlement matrix. |
| 1.48 | 2026-05-26 14:35 | `4f54a8e` | lookback ladder | 加入回看阶梯。 / Added Pro lookback ladder. |
| 1.49 | 2026-05-26 15:01 | `28b23fd` | account console | 加入账户控制台雏形。 / Added account console. |
| 1.50 | 2026-05-26 15:12 | `d4c8e0d` | unlock deck | 加入解锁 deck。 / Added Pro unlock deck. |
| 1.51 | 2026-05-26 15:32 | `7467527` | data audit line | 加入数据审计 release line。 / Added data audit release line. |
| 1.52 | 2026-05-26 15:44 | `c516f4e` | entitlement readiness | 加入权限准备内容。 / Added entitlement readiness. |
| 1.53 | 2026-05-26 16:05 | `6c909a9` | remove commercial planning | 紧急下线公开商业规划。 / Removed public commercial planning from site. |

## Next dense targets / 下一批稠密目标

- Typography rhythm: reduce oversized text in compact panels and make Chinese/English line height consistent.
- 字体节奏：压低紧凑面板里的大字，统一中英文行高。
- Spacing unity: remove blocky square-grid feeling, align panel gaps, make bottom sections fill desktop width gracefully.
- 留白统一：去掉突兀方块矩阵感，对齐面板间距，让底部模块优雅填满桌面宽度。
- Premium preview: show power through blur, not through internal mechanics.
- 付费预览：用模糊后的能力感表达价值，不展示内部机制。
- Data expansion: re-audit `2023-05` entitlement route with Massive plan/API/S3, but do not claim the files are local until they are found.
- 数据扩展：重新复核 `2023-05` 的 Massive 套餐/API/S3 权限路线，找到文件前不宣称已落地。
- GitHub continuity: every deploy should leave a commit-level breadcrumb for another Codex.
- GitHub 连续性：每次部署都要留下另一个 Codex 能接的 commit 级线索。
