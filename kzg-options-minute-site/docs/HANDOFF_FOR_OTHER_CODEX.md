# Handoff for another Codex / 交接给另一个 Codex

This document is the receiving prompt plus operating checklist for any future Codex that gets GitHub, Netlify, Apple Notes, Massive, Stripe, Supabase, or domain connectors.

这份文档是给未来任何一个接入 GitHub、Netlify、Apple Notes、Massive、Stripe、Supabase 或域名服务 connector 的 Codex 的接手提示和操作清单。

## Receiving prompt / 接手提示词

You are continuing KZG Option House. Work only in `/Users/fangbao/kzg-options-minute-site` unless Fangbao explicitly expands scope. Read `/Users/fangbao/AGENTS.md` first and do not touch protected KZG OS paths. Keep public product work separate from private commercial planning. Do not commit raw generated data. Use `docs/CHANGELOG.md`, `docs/DENSE_VERSIONING.md`, `docs/IOS_COMPANION_PLAN.md`, `docs/MASSIVE_REALTIME_PRODUCT_PLAN.md`, `docs/processing-spec.md`, and `docs/lessons.md` before making changes. Current production site is `https://kzg-option-house.netlify.app/`. Current branch is `feat/kzg-option-house-daily-auto`. Continue Web dense versions by `0.01`, update iOS every 5 Web versions, verify locally, deploy every 3-5 solid Web versions, push GitHub backup, and update both GitHub changelog and pinned Apple Notes.

你正在继续 KZG Option House。除非 Fangbao 明确扩大范围，否则只在 `/Users/fangbao/kzg-options-minute-site` 工作。先读 `/Users/fangbao/AGENTS.md`，不要碰受保护的 KZG OS 路径。公开产品工作和内部商业规划必须分开。不要提交 raw generated data。动手前先读 `docs/CHANGELOG.md`、`docs/DENSE_VERSIONING.md`、`docs/IOS_COMPANION_PLAN.md`、`docs/MASSIVE_REALTIME_PRODUCT_PLAN.md`、`docs/processing-spec.md`、`docs/lessons.md`。当前生产站是 `https://kzg-option-house.netlify.app/`。当前分支是 `feat/kzg-option-house-daily-auto`。Web 继续按 `0.01` 稠密版本迭代，iOS 每 5 个 Web 版本同步一次，本地验证，每 3-5 个扎实 Web 版本部署一次，推 GitHub 备份，并同时更新 GitHub changlog 与 Apple Notes 置顶日志。

## Current repo state / 当前仓库状态

- Workspace / 工作目录: `/Users/fangbao/kzg-options-minute-site`
- Git root / Git 根目录: `/Users/fangbao`
- Branch / 分支: `feat/kzg-option-house-daily-auto`
- Remote / 远端: `https://github.com/Kzggzk/xxqq.git`
- Production / 生产站: `https://kzg-option-house.netlify.app/`
- Netlify site name / Netlify 站点: `kzg-option-house`
- Production version last verified / 最近生产验证版本: `1.63`
- Local version last verified / 最近本地验证版本: `1.63` Web open-history path router
- Latest unique deploy / 最近唯一部署: `https://6a168b3efbed57514f5fc1ea--kzg-option-house.netlify.app/`
- iOS companion / iOS 伴生工程: `/Users/fangbao/kzg-options-minute-site/ios/KZGOptionHouse/KZGOptionHouse.xcodeproj`, scheme `KZG Option House`, bundle `com.kzg.optionhouse`, current iOS `0.6`
- Latest verified data date / 最近验证数据日: `2026-05-22`
- Local verified option-minute window / 本地已验证期权分钟范围: `2024-05-17 -> 2026-05-22`, `505` files.

Important: Fangbao asked about data back to `2023-05`. Treat `2023-05` as a target to re-audit with API/plan entitlement. The local iCloud folder currently proves `2024-05-17 -> 2026-05-22`, not 2023 files.

重要：Fangbao 提到数据能到 `2023-05`。把 `2023-05` 当作需要用 API/套餐权限继续复核的目标；当前本机 iCloud 文件夹能证明的是 `2024-05-17 -> 2026-05-22`，不是 2023 文件。

## Protected paths / 受保护路径

Do not delete, move, rename, archive, replace, clean, or edit these unless the current user message explicitly says to modify KZG OS:

除非当前用户消息明确要求修改 KZG OS，否则不要删除、移动、重命名、归档、替换、清理或编辑这些路径：

- `/Users/fangbao/Desktop/KZG OS.app`
- `/Applications/KZG OS.app`
- `/Users/fangbao/KZG 2 developing`
- `/Users/fangbao/Desktop/DO_NOT_DELETE__KZG_OS_PROTECTED_DESKTOP_RULE.md`

## Git rules / Git 规则

- Commit source, scripts, docs, and public UI code.
- 提交源码、脚本、文档、公开 UI 代码。
- Do not commit `.private/`, `dist/`, `public/data/`, `public/reports/`, or raw `.csv.gz` data.
- 不提交 `.private/`、`dist/`、`public/data/`、`public/reports/` 或原始 `.csv.gz` 数据。
- Generated files may be dirty because local data rebuilds touch them. Do not reset them without Fangbao approval.
- 生成文件可能因为本地数据重建而是脏的。未经 Fangbao 批准不要 reset。

Useful commands:

常用命令：

```bash
git -C /Users/fangbao status --short -- kzg-options-minute-site
python3 /Users/fangbao/kzg-options-minute-site/scripts/build_payload.py
python3 /Users/fangbao/kzg-options-minute-site/scripts/per_day_to_dist.py
npx netlify-cli deploy --prod --dir /Users/fangbao/kzg-options-minute-site/dist
```

Latest production v1.63 note:

最新生产 v1.63 说明：

Web `1.63` is the latest local and production checkpoint. Production is `https://kzg-option-house.netlify.app/`, unique deploy `https://6a168b3efbed57514f5fc1ea--kzg-option-house.netlify.app/`, deploy id `6a168b3efbed57514f5fc1ea`. Main code changes are `public/app.js` and `public/styles.css`: UI version `1.63`, new `historyLayerPath()` under the open historical intro, four public-open path buttons into `trendChart`, `bucketProfile`, `symbolRotation`, and `symbolFocus`, and phone path cards changed to one column below 520px so dates and money values stay readable. Current generated-minute features stay open; only the future realtime tape keeps reserve blur. Local Browser and Playwright QA passed on desktop and phone: 4 path buttons, all 4 targets exist, old locks 0, old `.is-blurred` 0, public-risk false, horizontal overflow 0, and PNG export `1,482,138` bytes. Production verification passed: `app.js` contains `UI_VERSION = "1.63"`, `/data/index.json` and `/assets/kzg-pack.js` are `404`, Browser/Playwright production desktop and phone checks have console issue 0, old lock/blur 0, horizontal overflow 0, and PNG export `1,482,138` bytes. iOS remains `0.6` from Web v1.62; next default iOS sync is around Web v1.67. Do not connect or sell realtime data until backend credentials, rights, and Fangbao approval are confirmed.

Web `1.63` 是最新本地和生产检查点。生产站 `https://kzg-option-house.netlify.app/`，唯一部署 `https://6a168b3efbed57514f5fc1ea--kzg-option-house.netlify.app/`，deploy id `6a168b3efbed57514f5fc1ea`。主要源码改动是 `public/app.js` 和 `public/styles.css`：UI 版本 `1.63`，在开放历史 intro 下新增 `historyLayerPath()`，四个公开开放路径按钮分别进入 `trendChart`、`bucketProfile`、`symbolRotation` 和 `symbolFocus`，并把手机路径卡在 520px 以下改成单列，让日期和金额保持可读。当前生成分钟能力保持开放；只有未来实时 tape 保留预留式 blur。本地 Browser 与 Playwright 桌面/手机 QA 通过：4 个路径按钮、4 个目标全部存在、旧锁层 0、旧 `.is-blurred` 0、公开风险 false、横向溢出 0、PNG 导出 `1,482,138` bytes。生产验证通过：`app.js` 含 `UI_VERSION = "1.63"`，`/data/index.json` 和 `/assets/kzg-pack.js` 都是 `404`，生产 Browser/Playwright 桌面和手机 console issue 0、旧锁/旧 blur 0、横向溢出 0、PNG 导出 `1,482,138` bytes。iOS 仍是 Web v1.62 同步的 `0.6`；下次默认 iOS 同步在 Web v1.67 左右。不要在后端凭证、权利和 Fangbao 批准确认前接入或销售实时数据。

Latest v1.42 note:

最新 v1.42 说明：

Web `1.42` is a mobile/desktop spacing checkpoint, not a payment or domain feature. It compresses the phone header and summary rail, keeps PNG export stable, and keeps internal payment/domain/API planning out of the public site. Production unique deploy is `https://6a158610e727dc1f741ecf8a--kzg-option-house.netlify.app/`.

Web `1.42` 是移动端/桌面端 spacing 检查点，不是支付或域名功能。它压缩手机顶栏和摘要指标区，保持 PNG 导出稳定，并继续把支付/域名/API 内部规划排除在公开站之外。生产唯一部署是 `https://6a158610e727dc1f741ecf8a--kzg-option-house.netlify.app/`。

Latest local v1.56 note:

最新本地 v1.56 说明：

Web `1.56` is the latest local and production checkpoint. It builds on v1.55's three-sector structure and upgrades the middle realtime reserve into a tighter flow-book preview. Main code changes are `public/app.js` and `public/styles.css`: UI version `1.56`, derived `hits` counts for flow rows, Bullish/Bearish ledgers formatted as symbol/count/strategy+delta/premium, a `Flow Book` filter control, and a five-group strategy recognition tree. It still uses no real API key, no provider route, no payment/domain/price copy, and no backend connection. Only the future realtime tape remains blurred; current daily/history/rotation/trend/export features stay open. Local and production QA passed on desktop `1440x1100` and phone `390x844`: no overflow, no old lock/blur nodes, no console issues, risk strings 0, 18 realtime tape rows, and PNG export works. Production unique deploy is `https://6a15c1b6531adb3fd145e39d--kzg-option-house.netlify.app/`.

Web `1.56` 是最新本地和生产检查点。它承接 v1.55 三段式结构，把中段 realtime reserve 升级为更紧凑的 flow-book 预览。主要代码改动是 `public/app.js` 和 `public/styles.css`：UI 版本 `1.56`、flow rows 增加派生 `hits` 次数、Bullish/Bearish 账本改成标的/次数/策略+变化/权利金格式、过滤器增加 `Flow Book` 控制、策略识别库扩成五组。它仍不使用真实 API key、不展示 provider route、不展示支付/域名/价格文案、不接后端。只有未来实时 tape 保留模糊；当前日报/历史/轮动/趋势/导出功能保持开放。本地和生产桌面 `1440x1100` 与手机 `390x844` QA 通过：无横向溢出、无旧锁层/旧模糊节点、无 console issue、风险词 0、实时 tape 18 行、PNG 导出可用。生产唯一部署是 `https://6a15c1b6531adb3fd145e39d--kzg-option-house.netlify.app/`。

Latest local v1.57 note:

最新本地 v1.57 说明：

Dense `1.57` does not deploy Web. It syncs the Web `1.55/1.56` product boundary into native iOS companion `0.5`. Main source changes are `ios/KZGOptionHouse/KZGOptionHouse/DashboardView.swift`, `Models.swift`, and `SnapshotProvider.swift`: three-sector phone reading order, Realtime Reserve card, filter chips, Bullish/Bearish derived flow lanes, open historical layer, and adaptive rotation quadrant coordinates. iOS contains no real API key, provider route, payment, domain, price, registration, or account route. XcodeBuildMCP profile is correct but `build_run_sim` still fails on local simulator destination mismatch; fallback `xcrun --sdk iphonesimulator swiftc -typecheck ios/KZGOptionHouse/KZGOptionHouse/*.swift -target arm64-apple-ios17.0-simulator` passes. Production remains v1.56.

稠密 `1.57` 不部署 Web。它把 Web `1.55/1.56` 的产品边界同步到原生 iOS 伴生 `0.5`。主要源码改动是 `ios/KZGOptionHouse/KZGOptionHouse/DashboardView.swift`、`Models.swift`、`SnapshotProvider.swift`：三段式手机读盘顺序、Realtime Reserve 卡、过滤 chips、Bullish/Bearish 派生 flow lanes、开放历史层，以及自适应轮动象限坐标。iOS 不包含真实 API key、provider route、支付、域名、价格、注册或账号路线。XcodeBuildMCP profile 正确，但 `build_run_sim` 仍因本机 simulator destination 不匹配失败；fallback `xcrun --sdk iphonesimulator swiftc -typecheck ios/KZGOptionHouse/KZGOptionHouse/*.swift -target arm64-apple-ios17.0-simulator` 通过。生产仍为 v1.56。

Latest local v1.58 note:

最新本地 v1.58 说明：

Web `1.58` is a local experience checkpoint, not a production deploy. Main source changes are `public/app.js` and `public/styles.css`: UI version `1.58`, new `realtimeTransitionRail()` under the realtime top line, new `realtimeFilterWeightRail()` inside the filter console, tighter realtime-sector spacing, mobile command chips kept in a scan-ready row, and terminal height reduced slightly. Verification passed: `node --check public/app.js`, `python3 scripts/build_payload.py`, `python3 scripts/per_day_to_dist.py`, Playwright desktop `1440x1100`, phone `390x844`, no console issues, doc/body overflow 0, old locks 0, old `.is-blurred` 0, realtime tape 18 rows, transition rail 3 cells, filter rail 4 cells, PNG export `/tmp/kzg-option-house-v158-export.png`. Production remains v1.56. Do not commit generated `public/data/*` or `public/reports/*` dirties.

Web `1.58` 是本地体验检查点，不部署生产。主要源码改动是 `public/app.js` 和 `public/styles.css`：UI 版本 `1.58`，realtime top line 下方新增 `realtimeTransitionRail()`，filter console 内新增 `realtimeFilterWeightRail()`，中段 spacing 更紧，手机 command chips 保持可扫读横排，terminal 高度略收。验证通过：`node --check public/app.js`、`python3 scripts/build_payload.py`、`python3 scripts/per_day_to_dist.py`、Playwright 桌面 `1440x1100`、手机 `390x844`、无 console issue、doc/body overflow 0、旧锁层 0、旧 `.is-blurred` 0、实时 tape 18 行、transition rail 3 格、filter rail 4 格、PNG 导出 `/tmp/kzg-option-house-v158-export.png`。生产仍为 v1.56。不要提交生成的 `public/data/*` 或 `public/reports/*` 脏文件。

Latest local v1.59 note:

最新本地 v1.59 说明：

Web `1.59` is a local Web checkpoint, not a production deploy. Main source changes are `public/index.html`, `public/app.js`, and `public/styles.css`: UI version `1.59`, new `section#sectorSpine`, new `renderSectorSpine()`, clickable `[data-scroll-sector]` navigation, and a v1.59 CSS spine that makes the page read as three simple sectors after the first screen. It also changes the public displayed dataset label to `23_DATA_期权分钟_Minute` so the website no longer exposes the provider name in the metric rail. Local Browser plus Playwright QA passed on desktop `1440x1100` and phone `390x844`: source path shows `1.59 · 505/505 complete`, sector buttons 3 with child overflow 0, transition rail 3, filter rail 4, realtime tape 18 rows, realtime-only blur remains `blur(2.7px) saturate(1.25)`, old lock/blur nodes 0, public risk text false, doc/body overflow 0, console issue 0, and PNG export `/tmp/kzg-option-house-v159-export.png` works at `1,482,138` bytes. Production remains v1.56. Do not commit generated `public/data/*` or `public/reports/*` dirties.

Web `1.59` 是本地 Web 检查点，不部署生产。主要源码改动是 `public/index.html`、`public/app.js`、`public/styles.css`：UI 版本 `1.59`、新增 `section#sectorSpine`、新增 `renderSectorSpine()`、新增可点击 `[data-scroll-sector]` 导航，以及 v1.59 CSS 产品脊柱，让页面在首屏后读成三个简单 sector。它同时把公开显示的数据标签改为 `23_DATA_期权分钟_Minute`，公开网站不再在指标栏暴露供应商名。本地 Browser 加 Playwright QA 通过，桌面 `1440x1100` 与手机 `390x844` 均显示 `1.59 · 505/505 complete`，sector 按钮 3 个且 child overflow 0，transition rail 3 格，filter rail 4 格，realtime tape 18 行，只有未来实时 tape 保留 `blur(2.7px) saturate(1.25)`，旧锁/旧 blur 节点 0，公开风险词 false，doc/body overflow 0，console issue 0，PNG 导出 `/tmp/kzg-option-house-v159-export.png` 成功且大小 `1,482,138` bytes。生产仍为 v1.56。不要提交生成的 `public/data/*` 或 `public/reports/*` 脏文件。

Previous local v1.55 note:

较早本地 v1.55 说明：

Web `1.55` is the latest local checkpoint and reshapes the public page into three product sectors: an open daily/yesterday dashboard with timeline, a future realtime options-flow reserve, and an open historical intraday layer. Main code changes are `public/index.html`, `public/app.js`, and `public/styles.css`: UI version `1.55`, new realtime reserve sector, filter console, strategy-recognition cloud, blurred terminal tape only for the future realtime layer, Bullish/Bearish flow lanes, and a history-sector intro. Current generated-minute features remain open. Public risk scan and rendered-text scan are clean for payment/domain/API/provider/pricing leakage. Local Browser and Playwright verified desktop and phone no overflow, no old lock/blur nodes, no console issues, realtime tape blur limited to `.terminal-table-body`, and PNG export works.

Web `1.55` 是最新本地检查点，把公开页面重塑为三段产品结构：开放的当日/昨日 dashboard 与时间轴、未来实时期权流预留席位、开放的历史日内层。主要代码改动是 `public/index.html`、`public/app.js`、`public/styles.css`：UI 版本 `1.55`、新增 realtime reserve sector、filter console、策略识别库、仅用于未来实时层的模糊 terminal tape、Bullish/Bearish flow lanes、history-sector intro。当前已生成分钟数据功能保持开放。公开风险扫描和渲染文本扫描均未发现 payment/domain/API/provider/pricing 泄漏。本地 Browser 与 Playwright 已验证桌面和手机无溢出、无旧 lock/blur 节点、无 console issue、实时 tape blur 只限 `.terminal-table-body`，PNG 导出可用。

Latest local v1.45 note:

最新本地 v1.45 说明：

Web `1.45` is the latest production checkpoint and focuses on phone ledger density plus iOS companion sync. It preserves the v1.44 desktop/tablet stability, hides long mobile rotation narrative, reduces mobile rotation and momentum visible rows to `12` each, and updates the native SwiftUI companion to iOS `0.3`. Unique deploy: `https://6a15912a59bdd5425440cdb1--kzg-option-house.netlify.app/`. XcodeBuildMCP still hits a local simulator destination blocker, but `swiftc -typecheck` passes.

Web `1.45` 是最新生产检查点，重点是手机端账本密度和 iOS 伴生端同步。它保留 v1.44 的桌面/iPad 稳定成果，隐藏手机端轮动长说明，把手机轮动与动量可见行都压到 `12` 条，并把原生 SwiftUI 伴生端更新到 iOS `0.3`。唯一部署：`https://6a15912a59bdd5425440cdb1--kzg-option-house.netlify.app/`。XcodeBuildMCP 仍遇到本机 simulator destination 阻塞，但 `swiftc -typecheck` 通过。

Previous local v1.46 note:

较早本地 v1.46 说明：

Web `1.46` is a previous local-only checkpoint. It is not deployed. It keeps production at v1.45 and improves the phone lower-page unity between advanced preview, symbol rotation, and symbol momentum. Main code changes are `public/app.js` and `public/styles.css`: UI version `1.46`, mobile/narrow visual connector lines, unified section heading borders/radius, tighter premium/rotation/momentum gaps, and quieter mobile rotation dots capped at `30px`. Browser and Playwright verified v1.46, no console warnings/errors, no horizontal overflow, no public-risk string leak, and PNG export `/tmp/kzg-option-house-v146-export.png` at `1,482,138` bytes.

Web `1.46` 是较早本地检查点，未部署生产。生产当时仍为 v1.45。本轮改的是手机下半页统一感，把高级预览、标的轮动、核心动量三段接成更连续的读盘脊柱。主要代码改动是 `public/app.js` 和 `public/styles.css`：UI 版本 `1.46`、移动/窄屏连接线、统一 section heading 边界与圆角、更紧的 premium/rotation/momentum 间距、手机轮动气泡上限降到 `30px`。Browser 与 Playwright 已验证 v1.46、无 console warning/error、无横向溢出、无公开风险词泄露，PNG 导出 `/tmp/kzg-option-house-v146-export.png` 为 `1,482,138` bytes。

Previous local v1.47 note:

较早本地 v1.47 说明：

Web `1.47` is a previous local-only checkpoint. It is not deployed. It keeps production at v1.45 and compresses the phone advanced-preview entry plus the momentum-panel tail. Main code changes are `public/app.js` and `public/styles.css`: UI version `1.47`, two-line capability lead, two-column phone capability rails, one-row four-button unlock tabs, shorter capability meter, shorter focus rhythm stack/tape/charts, and phone momentum list reduced to 10 visible rows. Browser and Playwright verified v1.47, theme toggle interaction, no console warnings/errors, no horizontal overflow, no public-risk string leak, and PNG export `/tmp/kzg-option-house-v147-export.png` at `1,482,138` bytes.

Web `1.47` 是较早本地检查点，未部署生产。生产当时仍为 v1.45。本轮压缩手机端高级预览入口和动量面板尾部。主要代码改动是 `public/app.js` 和 `public/styles.css`：UI 版本 `1.47`、capability lead 两行化、手机 capability rails 两列化、unlock tabs 一行四按钮、更短的 capability meter、更短的 focus rhythm stack/tape/charts，手机动量列表压到 10 条可见。Browser 与 Playwright 已验证 v1.47、theme toggle 交互、无 console warning/error、无横向溢出、无公开风险词泄露，PNG 导出 `/tmp/kzg-option-house-v147-export.png` 为 `1,482,138` bytes。

Previous local v1.48 note:

较早本地 v1.48 说明：

Web `1.48` is a previous local-only checkpoint. It is not deployed. It keeps production at v1.45 and compresses the live-feed silhouette plus the lower desktop reading rhythm. Main code changes are `public/app.js` and `public/styles.css`: UI version `1.48`, desktop analysis-grid/panel padding unification, tighter desktop live silhouette columns, phone premium cards as two short columns, phone live silhouette lead reduced to a short title strip, phone live stream reduced to 7 visible pressure rows, and quadrant map lowered to `132px`. Browser verified page identity, theme toggle, no overlay, no console warnings/errors, and `user-select:none`; Browser screenshot timed out once, so Playwright provided visual proof. Playwright verified no horizontal overflow, no commercial-risk string leak after excluding market-data dollar amounts, and PNG export `/tmp/kzg-option-house-v148-export.png` at `1,482,138` bytes.

Web `1.48` 是较早本地检查点，未部署生产。生产当时仍为 v1.45。本轮压缩实时流轮廓和桌面下半区阅读节奏。主要代码改动是 `public/app.js` 和 `public/styles.css`：UI 版本 `1.48`、桌面 analysis-grid/panel padding 统一、桌面 live silhouette 三列更紧、手机 premium cards 两列短卡、手机 live silhouette lead 降为短标题条、手机 live stream 降为 7 条可见压力行、quadrant map 降到 `132px`。Browser 已验证页面身份、theme toggle、无 overlay、无 console warning/error、`user-select:none`；Browser 截图本轮超时一次，所以用 Playwright 补视觉证据。Playwright 已验证无横向溢出、排除市场数据美元金额后的商业风险词为 0，PNG 导出 `/tmp/kzg-option-house-v148-export.png` 为 `1,482,138` bytes。

Latest production v1.49 note:

最新生产 v1.49 说明：

Web `1.49` is now both the latest local and production checkpoint. It deploys the stable group after v1.45. Main code changes are `public/app.js` and `public/styles.css`: UI version `1.49`, tighter phone transition from advanced preview into rotation, shorter premium quadrant flow, quieter rotation quadrant map, denser desktop lower analysis, and stronger dark-mode contrast for live silhouette and rotation rows. Browser verified the local page identity, latest date, `user-select:none`, and no internal-risk strings; Browser screenshot capture timed out, so Playwright provided screenshot evidence. Local Playwright verified desktop and phone no horizontal overflow, no console warnings/errors, PNG export `/tmp/kzg-option-house-v149-export.png` at `1,482,138` bytes, and screenshots under `/tmp/kzg-option-house-v149-*.png`. Production unique deploy is `https://6a15a0b9761b0a09fe20d22b--kzg-option-house.netlify.app/`; live smoke confirms `/`, `/r/latest.html`, and `/latest` as `200`, `/data/index.json` and `/assets/kzg-pack.js` as `404`, `/app.js` with `UI_VERSION="1.49"`, and live phone no horizontal overflow or public-risk strings. Next default target is Web `1.50`, including the iOS companion cadence checkpoint.

Web `1.49` 现在是最新本地和生产检查点，已把 v1.45 之后的稳定版本组部署上线。主要代码改动是 `public/app.js` 和 `public/styles.css`：UI 版本 `1.49`、手机高级预览到轮动的过渡更紧、premium quadrant flow 更短、轮动象限图更安静、桌面下半区信息密度更统一、暗色模式下 live silhouette 与 rotation rows 对比更强。Browser 已验证本地页面身份、最新日期、`user-select:none`、无内部风险词；Browser 截图仍超时，所以用 Playwright 留视觉证据。本地 Playwright 已验证桌面和手机无横向溢出、无 console warning/error，PNG 导出 `/tmp/kzg-option-house-v149-export.png` 为 `1,482,138` bytes，截图在 `/tmp/kzg-option-house-v149-*.png`。生产唯一部署为 `https://6a15a0b9761b0a09fe20d22b--kzg-option-house.netlify.app/`；线上 smoke 确认 `/`、`/r/latest.html`、`/latest` 为 `200`，`/data/index.json` 与 `/assets/kzg-pack.js` 为 `404`，`/app.js` 为 `UI_VERSION="1.49"`，线上手机无横向溢出、无公开风险词。下一默认目标是 Web `1.50`，同时进入 iOS companion cadence checkpoint。

Previous local v1.50 note:

上一轮本地 v1.50 说明：

Web `1.50` is the latest local checkpoint and is not deployed to production. Production remains v1.49 at `https://kzg-option-house.netlify.app/`, unique deploy `https://6a15a0b9761b0a09fe20d22b--kzg-option-house.netlify.app/`. Main code changes are `public/app.js`, `public/styles.css`, and the native SwiftUI iOS companion files: UI version `1.50`, tighter phone first-screen path into the report canvas, mobile `.side-rail` no longer overlaps advanced preview, stronger dark-mode panel unity, and iOS companion `0.4` with tighter Header, checkpoint strip, timeline, rotation, symbol chips, KZGCard, and MetricTile. Local build produced `505` days with latest `2026-05-22`, pack asset `kzg-frame-b4e896d3b7a1.js`; risk scan over `public` and `dist` returned 0. Playwright verified desktop, phone first screen, phone report entry, phone advanced-preview light, and phone advanced-preview dark with no horizontal overflow or console issues; PNG export `/tmp/kzg-option-house-v150-export.png` is `1,482,138` bytes. XcodeBuildMCP profile is correct but `build_sim` still fails on simulator destination matching; `swiftc -typecheck` passes.

Web `1.50` 是最新本地检查点，未部署生产。生产仍为 v1.49，生产站 `https://kzg-option-house.netlify.app/`，唯一部署 `https://6a15a0b9761b0a09fe20d22b--kzg-option-house.netlify.app/`。主要代码改动是 `public/app.js`、`public/styles.css` 和原生 SwiftUI iOS 伴生文件：UI 版本 `1.50`、手机首屏到日报画布路径更短、移动端 `.side-rail` 不再覆盖高级预览、暗色模式 panel 更统一，iOS companion 到 `0.4`，Header、checkpoint strip、timeline、rotation、symbol chips、KZGCard、MetricTile 都更紧。Local build 生成 `505` 天，最新 `2026-05-22`，pack asset `kzg-frame-b4e896d3b7a1.js`；`public` 与 `dist` 风险词扫描为 0。Playwright 验证桌面、手机首屏、手机日报入口、手机高级预览浅色和暗色均无横向溢出和 console issue；PNG 导出 `/tmp/kzg-option-house-v150-export.png` 为 `1,482,138` bytes。XcodeBuildMCP profile 正确，但 `build_sim` 仍失败于 simulator destination 匹配；`swiftc -typecheck` 通过。

Previous local v1.51 note:

上一轮本地 v1.51 说明：

Web `1.51` is the latest local checkpoint and is not deployed to production. Production remains v1.49 at `https://kzg-option-house.netlify.app/`, unique deploy `https://6a15a0b9761b0a09fe20d22b--kzg-option-house.netlify.app/`. Main code changes are `public/app.js`, `public/styles.css`, and internal docs. UI version is `1.51`; the public page only gets a stronger `Live feed silhouette` visual layer, with scan texture, inline pressure dots, and dark-mode feed contrast. It does not expose Massive provider mechanics, API keys, plan prices, payment, checkout, registration, domain, or backend internals. The internal plan in `docs/MASSIVE_REALTIME_PRODUCT_PLAN.md` now states the real architecture: backend-only ingestion, curated contract universe, derived KZG signals, compact cache, entitlement fanout, Business/OPRA rights before public real-time resale, and API key rotation because Fangbao's screenshot exposed keys in conversation context. Do not use those exposed keys. Rotate keys before any real backend work. Verification passed: `node --check`, `505`-day build with latest `2026-05-22`, public/dist risk scan 0, Browser local title/version/live-silhouette/console check 0, Playwright desktop/mobile/live screenshots with no overflow, and PNG export `/tmp/kzg-option-house-v151-export.png` at `1,482,138` bytes. Next default Web step is `1.52` mock feed schema; next default iOS sync is Web `1.55`.

Web `1.51` 是最新本地检查点，未部署生产。生产仍为 v1.49，生产站 `https://kzg-option-house.netlify.app/`，唯一部署 `https://6a15a0b9761b0a09fe20d22b--kzg-option-house.netlify.app/`。主要代码改动是 `public/app.js`、`public/styles.css` 和内部文档。UI 版本为 `1.51`；公开页面只强化 `实时流轮廓 / Live feed silhouette` 的视觉层，加入扫描底纹、行内压力点、暗色模式实时层对比。不公开 Massive 供应商机制、API key、套餐价格、支付、checkout、注册、域名或后端内部。`docs/MASSIVE_REALTIME_PRODUCT_PLAN.md` 现在写清真实架构：后端采集、精选合约池、KZG 派生信号、紧凑缓存、权限分发、公开实时商业销售前确认 Business/OPRA 权利，并因为 Fangbao 截图在对话上下文暴露了 key，真实后端前必须轮换 API key。不要使用这些暴露 key。验证通过：`node --check`、`505` 天 build 最新 `2026-05-22`、public/dist 风险扫描 0、Browser 本地标题/版本/实时轮廓/console 0、Playwright 桌面/手机/实时流截图均无横向溢出、PNG 导出 `/tmp/kzg-option-house-v151-export.png` 为 `1,482,138` bytes。下一默认 Web 步骤是 `1.52` mock feed schema；下一默认 iOS 同步是 Web `1.55`。

Latest local v1.52 note:

最新本地 v1.52 说明：

Web `1.52` is the latest local and production checkpoint. It turns the safe live-feed silhouette into a derived event queue without using real credentials or a real backend. Main code changes are `public/app.js` and `public/styles.css`: UI version `1.52`, new `derivedFeedEvents()` and `liveEventQueue()`, desktop eight-cell short event tape, phone two-column event tape, rows after the fourth hidden on narrow phones. The new internal doc is `docs/REALTIME_FEED_SCHEMA.md`, and it defines event fields for Web, future backend, and iOS: `id`, `tradeDate`, `time`, `symbol`, `kind`, `tone`, `score`, `detail`, `source`, `visibleTier`, and compact metrics. Public event kinds are burst, premium, CP slope, defense, cooling, and rhythm. No real Massive key, provider route, plan price, payment, registration, domain, checkout, raw contract payload, or legal assumption is exposed. Local QA passed: `505`-day build, risk scan 0, desktop/mobile/event screenshots with no overflow or console issue, and PNG export `/tmp/kzg-option-house-v152-export.png` at `1,482,138` bytes. Production unique deploy is `https://6a15ae01b139b100d8816c5e--kzg-option-house.netlify.app/`; live smoke confirms `/`, `/latest`, and `/r/latest.html` as `200`, raw endpoints remain `404`, `/app.js` is `UI_VERSION="1.52"`, and production phone has no overflow or public-risk text. Next default Web step is `1.53` entitlement-safe event boundaries; next default iOS sync is Web `1.55`.

Web `1.52` 是最新本地和生产检查点。它把安全实时流轮廓推进成派生事件队列，但不使用真实凭证或真实后端。主要代码改动是 `public/app.js` 和 `public/styles.css`：UI 版本 `1.52`，新增 `derivedFeedEvents()` 和 `liveEventQueue()`，桌面八格短事件 tape，手机两列事件 tape，窄手机隐藏第 5 条之后的事件。新增内部文档 `docs/REALTIME_FEED_SCHEMA.md`，定义 Web、未来后端和 iOS 共用事件字段：`id`、`tradeDate`、`time`、`symbol`、`kind`、`tone`、`score`、`detail`、`source`、`visibleTier` 和紧凑 metrics。公开事件类型是爆发、权利金、CP 斜率、防守、降温和节奏。不暴露真实 Massive key、provider route、套餐价格、支付、注册、域名、checkout、原始合约 payload 或法律假设。本地 QA 通过：`505` 天构建、风险扫描 0、桌面/手机/事件区截图无横向溢出和 console issue，PNG 导出 `/tmp/kzg-option-house-v152-export.png` 为 `1,482,138` bytes。生产唯一部署为 `https://6a15ae01b139b100d8816c5e--kzg-option-house.netlify.app/`；线上 smoke 确认 `/`、`/latest`、`/r/latest.html` 为 `200`，raw endpoints 继续 `404`，`/app.js` 是 `UI_VERSION="1.52"`，线上手机无溢出、无公开风险词。下一默认 Web 步骤是 `1.53` 权限安全事件边界；下一默认 iOS 同步是 Web `1.55`。

Latest local v1.53 note:

最新本地 v1.53 说明：

Web `1.53` is the latest local checkpoint and is not deployed to production. Production remains v1.52 at `https://kzg-option-house.netlify.app/`, unique deploy `https://6a15ae01b139b100d8816c5e--kzg-option-house.netlify.app/`. Main code changes are `public/app.js` and `public/styles.css`: UI version `1.53`, new `feedVisibilityState()` and `feedBoundaryRail()`, derived events now carry `source` and a safe neutral `visibleTier`, and the live silhouette has a compact three-cell boundary rail for latest open, history preview, and deep derived queued. Public code uses `advanced-derived` instead of exposing paid-product mechanics. Verification passed: `node --check`, 505-day build latest `2026-05-22`, public/dist risk scan 0, local Playwright desktop/mobile/event screenshots with no overflow or console issue, 3 visible boundary cells, and PNG export `/tmp/kzg-option-house-v153-export.png` at `1,482,138` bytes. Next default Web step is `1.54` fanout/load/cache modeling; next default iOS sync is Web `1.55`.

Web `1.53` 是最新本地检查点，未部署生产。生产仍为 v1.52，生产站 `https://kzg-option-house.netlify.app/`，唯一部署 `https://6a15ae01b139b100d8816c5e--kzg-option-house.netlify.app/`。主要代码改动是 `public/app.js` 和 `public/styles.css`：UI 版本 `1.53`，新增 `feedVisibilityState()` 和 `feedBoundaryRail()`，派生事件现在带 `source` 和公开安全的中性 `visibleTier`，实时流轮廓加入三格短边界条，分别是今日开放、历史预览、深层派生排队。公开代码使用 `advanced-derived`，不暴露付费产品机制。验证通过：`node --check`、505 天构建最新 `2026-05-22`、public/dist 风险扫描 0、本地 Playwright 桌面/手机/事件区截图无溢出和 console issue、3 格边界条可见、PNG 导出 `/tmp/kzg-option-house-v153-export.png` 为 `1,482,138` bytes。下一默认 Web 步骤是 `1.54` fanout/load/cache 建模；下一默认 iOS 同步是 Web `1.55`。

Latest production v1.54 note:

最新生产 v1.54 说明：

Web `1.54` is now the latest local and production checkpoint. It corrects the public experience after Fangbao clarified that the current site should not blur, lock, or paywall any existing feature. Main code changes are `public/app.js` and `public/styles.css`: UI version `1.54`, `isHistoryLocked()` always returns `false`, the advanced preview always renders open, old `is-blurred` template output is removed from public JS, and the feed visibility tiers are now `public-latest`, `history-open`, and `future-live-feed`. Paid planning is moved back to the future real-time option feed backend/service layer only. Verification passed locally and in production: desktop and phone historical date `2026-01-22` show `historyLocked=false`, `visibleBlurred=0`, `visibleLocks=0`, `riskText=false`, `eventTier=history-open`, no horizontal overflow, and no console issue. PNG export remains stable at `1,482,138` bytes. Production unique deploy is `https://6a15b9924af25310d2950255--kzg-option-house.netlify.app/`.

Web `1.54` 现在是最新本地和生产检查点。它根据 Fangbao 纠偏修正公开体验：当前站不应对任何现有功能做 blur、lock 或 paywall。主要代码改动是 `public/app.js` 和 `public/styles.css`：UI 版本 `1.54`，`isHistoryLocked()` 始终返回 `false`，高级预览始终开放渲染，公开 JS 清掉旧的 `is-blurred` 模板输出，feed 可见层级改为 `public-latest`、`history-open`、`future-live-feed`。付费规划回到未来真实实时 option feed 后端/服务层。验证已在本地和生产通过：桌面与手机切到历史日 `2026-01-22` 后均为 `historyLocked=false`、`visibleBlurred=0`、`visibleLocks=0`、`riskText=false`、`eventTier=history-open`，无横向溢出，无 console issue。PNG 导出保持稳定，大小 `1,482,138` bytes。生产唯一部署是 `https://6a15b9924af25310d2950255--kzg-option-house.netlify.app/`。

## Verification checklist / 验证清单

Before any public deploy:

任何公开部署前：

- build succeeds / 构建成功；
- local or deployed page loads / 本地或部署页面能打开；
- PNG export still works / PNG 导出仍可用；
- mobile viewport has no obvious horizontal overflow / 移动端没有明显横向溢出；
- public site has no internal domain/payment/API planning text / 公开站没有内部域名、支付、API 规划文字；
- `/data/index.json` returns 404 on production unless intentionally changed / 生产环境 `/data/index.json` 除非明确改变，否则应返回 404；
- raw packed asset paths are not trivially exposed / 打包原始数据路径不要轻易暴露；
- latest date and file count are stated accurately / 最新日期与文件数准确。
- if touching iOS, SwiftUI simulator build succeeds or at least `swiftc -typecheck` passes and the Xcode destination blocker is recorded in `docs/IOS_COMPANION_PLAN.md` / 如果触碰 iOS，SwiftUI 模拟器构建要通过；至少也要 `swiftc -typecheck` 通过，并把 Xcode destination 阻塞写入 `docs/IOS_COMPANION_PLAN.md`。

## Apple Notes changelog / Apple Notes 置顶日志

The pinned Apple Note title is:

置顶 Apple Note 标题：

`CHANGLOG 期权终端`

The GitHub changelog is canonical for other agents; Apple Notes is the owner-facing live notebook. Update both. Also read `docs/PLUGIN_SERVICE_STATUS.md` before touching external connectors.

GitHub changelog 是其他 agent 的标准交接源；Apple Notes 是给 owner 看的现场笔记。两边都要更新。触碰外部 connector 前还必须读 `docs/PLUGIN_SERVICE_STATUS.md`。

## Product boundary / 产品边界

Public page may include:

公开页面可以包含：

- latest day free insights / 当日免费洞察；
- open historical and derived panels / 历史与派生面板开放可读；
- KZG-branded PNG export / KZG 品牌 PNG 导出；
- language and theme toggles / 中英文与深浅色切换；
- product-value hints without real payment plumbing / 不暴露真实支付流程的产品价值提示。

Public page must not include until approved:

未经批准公开页面不能包含：

- candidate domains / 域名候选；
- real pricing experiments / 真实价格实验；
- Stripe session wording / Stripe session 文案；
- wallet or WeChat payment implementation detail / 钱包或微信支付实现细节；
- Massive API plan internals / Massive API 套餐内部信息；
- legal/commercial redistribution assumptions / 法律与商业分发假设。

## Payment and domain work / 支付与域名工作

Stop and ask Fangbao before:

以下动作必须停下来问 Fangbao：

- buying a domain / 购买域名；
- upgrading Massive / 升级 Massive；
- creating or changing Stripe products / 创建或修改 Stripe 商品；
- connecting wallet payment rails / 接钱包支付；
- using WeChat merchant credentials / 使用微信商户凭证；
- transmitting any API key or secret / 传输任何 API key 或密钥；
- spending money / 花钱。
