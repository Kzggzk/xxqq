# KZG Option House changelog / KZG Option House 变更日志

This is the GitHub canonical changelog. Apple Notes has a pinned owner-facing copy, but GitHub is the durable handoff for another Codex.

这是 GitHub 标准 changelog。Apple Notes 里有给 Fangbao 看的置顶副本，但 GitHub 才是另一个 Codex 能稳定接手的交接源。

## Current state / 当前状态

- Workspace / 工作目录: `/Users/fangbao/kzg-options-minute-site`
- Git root / Git 根目录: `/Users/fangbao`
- Branch / 分支: `feat/kzg-option-house-daily-auto`
- Production / 生产站: <https://kzg-option-house.netlify.app/>
- Latest local verified version / 最近本地验证版本: `1.61` Web realtime mobile compression and 2023 read-only audit pass
- Latest production verified version / 最近生产验证版本: `1.60`
- iOS companion / iOS 伴生版本: `0.5` native SwiftUI scaffold at `/Users/fangbao/kzg-options-minute-site/ios/KZGOptionHouse`
- Latest production correction / 最近生产修正: `v1.60 realtime flow-router production deploy`
- Latest local restructure / 最近本地重构: `v1.61 realtime reserve mobile compression and 2023 entitlement audit notes`
- Latest unique deploy verified / 最近验证唯一部署: <https://6a15daeafdbe07993e28b173--kzg-option-house.netlify.app/>
- Local option-minute data verified / 本地期权分钟数据核验: `505` files, `2024-05-17 -> 2026-05-22`
- Public raw-data rule / 公开 raw-data 规则: `/data/index.json` and direct packed raw paths should stay blocked unless Fangbao approves.
- Git dirty generated exceptions / Git 脏文件例外: generated `public/data/days/2026-05-22.json`, `public/data/index.json`, `public/data/latest.json`, and `public/reports/2026-01-02.html` may remain dirty and should not be committed.

Important data note:

重要数据说明：

Fangbao mentioned a route/data target going back to `2023-05`. Current local iCloud proof shows `2024-05-17 -> 2026-05-22`. Treat `2023-05` as a target for API/plan-entitlement re-audit, not as already-landed local files. Massive's public minute-aggregate flat-file docs show a `2023/2023` directory and show deeper history by plan tier, but this agent did not use any exposed key to test account entitlement. Current public reference: <https://massive.com/docs/flat-files/options/minute-aggregates?assetClass=options&display=all&license=personal>.

Fangbao 提到有路线/目标可以追到 `2023-05`。当前本机 iCloud 能证明的是 `2024-05-17 -> 2026-05-22`。把 `2023-05` 当作需要用 API/套餐权限继续复核的目标，不要写成已经落地的本地文件。Massive 公开 minute-aggregate flat-file 文档显示存在 `2023/2023` 目录，也显示更深历史取决于套餐层级；本 agent 没有使用任何暴露过的 key 去测试账号权限。当前公开参考：<https://massive.com/docs/flat-files/options/minute-aggregates?assetClass=options&display=all&license=personal>。

Security note:

安全说明：

Fangbao's Massive dashboard screenshot exposed live API keys in the conversation/browser context. Do not repeat, store, commit, or use those keys. Rotate/regenerate keys inside Massive before any real backend integration or production launch.

Fangbao 的 Massive dashboard 截图在对话/浏览器上下文里暴露了真实 API key。不要复述、存储、提交或使用这些 key。任何真实后端接入或生产上线前，都应在 Massive 内轮换/重新生成 key。

## Hard rules / 硬规则

- Do not touch protected KZG OS paths.
- 不碰受保护 KZG OS 路径。
- Do not leak payment, domain, registration, Stripe, wallet, WeChat, API-key, or Massive-plan planning onto the public site.
- 不把支付、域名、注册、Stripe、钱包、微信、API key、Massive 套餐规划泄漏到公开站。
- Public page should keep current minute-data features open and readable. Future real-time-feed service planning belongs in docs, `.private/`, Apple Notes, or this thread.
- 公开页面应保持当前分钟数据能力开放可读。未来实时流服务规划属于 docs、`.private/`、Apple Notes 或本线程。
- Every meaningful improvement increments by `0.01` and must be logged.
- 每一个有意义改动递增 `0.01`，并且必须记录。
- Deploy every 3-5 solid versions, or immediately for a public-risk fix.
- 每 3-5 个扎实版本部署一次；公开风险修复必须立即部署。

## v1.61 - 2026-05-27 01:54 Asia/Shanghai - mobile realtime compression and 2023 audit note

中文:

- 改动: 公开 Web UI 从 `1.60` 提到 `1.61`。本轮不加真实 API、不加新的商业入口，而是压缩手机端未来 realtime reserve 的纵向高度。`public/styles.css` 新增 v1.61 mobile compression 层：realtime top line、transition rail、Flow Router、filter console、flow model、blurred terminal 和 Bull/Bear 列表在手机上更像一段紧凑金融终端，而不是很长的堆叠说明。
- 视觉: 手机端保留三段结构和未来实时席位的速度感，但减少首屏后的滚动阻力：router gates 维持 2-4 列自适应，router tape 在手机上改成短暗色网格，filter console 保持两列，策略云和 bias 列表在窄屏只展示最关键样张。当前生成分钟功能仍开放；压缩只作用于未来 realtime reserve。
- 数据审计: 把 Fangbao 的 `2023-05` 疑问写入内部审计。官方 Massive Options Minute Aggregates flat-file 文档显示存在 `2023/2023` 目录，并且历史深度按套餐层级区分；当前公开站仍只使用本机已证实的 `505` 文件，范围 `2024-05-17 -> 2026-05-22`。本轮没有使用截图里暴露过的任何 key，也没有测试账号权限。公开参考：<https://massive.com/docs/flat-files/options/minute-aggregates?assetClass=options&display=all&license=personal>。
- 验证: `node --check public/app.js` 通过；`git diff --check` 通过；公开风险词扫描 `public/app.js public/index.html public/styles.css` 无命中。`python3 scripts/build_payload.py` 生成 `505` 天 payload，latest `2026-05-22`，analytics days `505`，analytics symbols `98`，最终 pack asset `kzg-frame-30aac0e7a22e.js`；`python3 scripts/per_day_to_dist.py` 返回 `copied=505`。Browser 本地打开 `http://127.0.0.1:4194/`，确认 `23_DATA_期权分钟_Minute · 1.61 · 505/505 complete`、未来 realtime reserve 存在、Flow Router 存在、4 个 gate、16 格 router tape、旧锁层 0、旧 `.is-blurred` 0、横向溢出 0、console warn/error 0、`user-select:none`。Playwright 对 dist `http://127.0.0.1:4195/` 验证桌面 `1440x1100` 和手机 `390x844`：公开风险词 false，console issue 0，旧锁层 0，旧 `.is-blurred` 0，横向溢出 0，未来 realtime blur 仅保留在 `.terminal-table-body.is-realtime-gated`，手机 router gates 为 2 列，router tape 为 4 列，filter console 为 2 列，terminal 展示 10 行，PNG 导出成功，建议文件名 `kzg-option-house-2026-05-22-zh.png`，大小 `1,482,138` bytes。截图证据：`/tmp/kzg-option-house-v161-dist-desktop.png`、`/tmp/kzg-option-house-v161-dist-mobile.png`、`/tmp/kzg-option-house-v161-realtime-desktop.png`、`/tmp/kzg-option-house-v161-realtime-mobile.png`。
- 部署: 本轮默认不部署生产，除非验证发现公开风险。生产仍是 v1.60 <https://kzg-option-house.netlify.app/>。
- 下一步: v1.62 是 iOS cadence 附近版本，默认应同步一次 iOS companion，或明确记录为什么延期。

English:

- Change: Public Web UI moves from `1.60` to `1.61`. This round does not add a real API or new commercial entry point. It compresses the future realtime reserve on phones. `public/styles.css` adds a v1.61 mobile compression layer so the realtime top line, transition rail, Flow Router, filter console, flow model, blurred terminal, and Bull/Bear lists read like a compact finance terminal instead of a long explanatory stack.
- Visual: Phone keeps the three-sector structure and future live-seat energy while reducing scroll friction after the first screen: router gates stay adaptive across 2-4 columns, router tape becomes a short dark grid, filter console remains two-column, and the strategy cloud/bias lists show the strongest samples on narrow screens. Current generated-minute features remain open; compression only touches the future realtime reserve.
- Data audit: Fangbao's `2023-05` question is now recorded as an internal audit item. Massive's public Options Minute Aggregates flat-file docs show a `2023/2023` directory and history depth by plan tier; the public site still only uses locally proven `505` files from `2024-05-17 -> 2026-05-22`. This round did not use any exposed screenshot key or test account entitlement. Public reference: <https://massive.com/docs/flat-files/options/minute-aggregates?assetClass=options&display=all&license=personal>.
- Verification: `node --check public/app.js` passed; `git diff --check` passed; public-risk scan over `public/app.js public/index.html public/styles.css` had no matches. `python3 scripts/build_payload.py` produced a `505`-day payload, latest `2026-05-22`, analytics days `505`, analytics symbols `98`, final pack asset `kzg-frame-30aac0e7a22e.js`; `python3 scripts/per_day_to_dist.py` returned `copied=505`. Browser opened local `http://127.0.0.1:4194/` and confirmed `23_DATA_期权分钟_Minute · 1.61 · 505/505 complete`, future realtime reserve, Flow Router, 4 gates, 16 router-tape cells, 0 old lock layers, 0 old `.is-blurred` nodes, 0 horizontal overflow, 0 console warn/error logs, and `user-select:none`. Playwright against dist `http://127.0.0.1:4195/` verified desktop `1440x1100` and phone `390x844`: public-risk false, 0 console issues, 0 old lock layers, 0 old `.is-blurred` nodes, 0 horizontal overflow, future realtime blur only on `.terminal-table-body.is-realtime-gated`, phone router gates in 2 columns, router tape in 4 columns, filter console in 2 columns, terminal showing 10 rows, and PNG export succeeded with suggested filename `kzg-option-house-2026-05-22-zh.png`, size `1,482,138` bytes. Screenshot evidence: `/tmp/kzg-option-house-v161-dist-desktop.png`, `/tmp/kzg-option-house-v161-dist-mobile.png`, `/tmp/kzg-option-house-v161-realtime-desktop.png`, and `/tmp/kzg-option-house-v161-realtime-mobile.png`.
- Deploy: Not deployed by default unless verification finds a public-risk issue. Production remains v1.60 at <https://kzg-option-house.netlify.app/>.
- Next: v1.62 is near the iOS cadence checkpoint, so it should sync iOS companion or explicitly record a deferral.

## v1.60 - 2026-05-27 01:25 Asia/Shanghai - realtime flow-router compression

中文:

- 改动: 公开 Web UI 从 `1.59` 提到 `1.60`。本轮继续遵守 Fangbao 最新边界：当前生成分钟能力保持开放，只有未来 realtime tape/reserve 可以做预留体验。`public/app.js` 新增 `realtimeFlowRouter()`，把中段 realtime reserve 先压成一个可扫读的 Flow Router：方向门、权利金门、策略门、风险门，加一条 16 格暗色路由 tape 和底部量价同升/同步降温/峰值分钟摘要。它说明未来真实流进入页面前应先分流、再解释，而不是把一大堆复杂控件直接堆给用户。
- 视觉: `public/styles.css` 追加 v1.60 router 样式。桌面为三列：大标题解释、四个 gate、暗色微型流带；手机端逐层收成单列/双列，不制造新的大白块。另补一层手机 timeboard 修正：时间轴标题和覆盖日期拆成同一行，滑条单独成下一行，窄屏隐藏左右箭头，避免标题挤成竖排或压到 chart lane。中段 flow terminal 仍保留唯一允许的 realtime blur，历史趋势、轮动、事件队列和 PNG 导出继续开放。
- 边界: 本轮没有加入真实 API、供应商名、API key、支付、价格、域名、注册、账号或 plan 文案。Flow Router 只用现有分钟聚合与轮动数据派生样张，仍然不是实时 feed。
- 验证: `node --check public/app.js` 通过；`git diff --check` 通过；公开风险词扫描 `public/app.js public/index.html public/styles.css` 无命中。`python3 scripts/build_payload.py` 生成 `505` 天 payload，latest `2026-05-22`，analytics days `505`，analytics symbols `98`，最终 pack asset `kzg-frame-9969016096ae.js`；`python3 scripts/per_day_to_dist.py` 返回 `copied=505`。Browser 插件本地打开 `http://127.0.0.1:4192/`，确认 `23_DATA_期权分钟_Minute · 1.60 · 505/505 complete`、三段 sector、Flow Router、4 个 gate、16 格 router tape、旧锁层 0、旧 `.is-blurred` 0、横向溢出 0。Playwright 对 dist 形态 `http://127.0.0.1:4193/` 验证桌面 `1440x1100` 和手机 `390x844`：console issue 0，404 响应 0，公开风险词 false，`user-select:none`，右键 contextmenu 被阻止，实时 tape blur 为 `blur(2.7px) saturate(1.25)`，手机 timeboard title `nowrap` 且标题底部在滑条上方。PNG 导出成功，文件 `/tmp/kzg-option-house-v160-dist-export.png`，建议文件名 `kzg-option-house-2026-05-22-zh.png`，大小 `1,482,138` bytes。截图证据：`/tmp/kzg-option-house-v160-dist-desktop.png`、`/tmp/kzg-option-house-v160-dist-mobile.png`。
- 部署: 已部署 Netlify production。生产站 <https://kzg-option-house.netlify.app/>；唯一部署 <https://6a15daeafdbe07993e28b173--kzg-option-house.netlify.app/>；deploy id `6a15daeafdbe07993e28b173`。线上 smoke: `/` `200`，`/r/latest.html` `200`，`/app.js` `200` 且 `UI_VERSION="1.60"`，首页引用 `kzg-frame-9969016096ae.js`，`/data/index.json` `404`，`/assets/kzg-pack.js` `404`。线上 Playwright 验证桌面和手机均显示 v1.60，三段 sector 3 个，Flow Router 存在，4 个 gate，16 格 router tape，旧锁层 0，旧 `.is-blurred` 0，横向溢出 0，公开风险词 false，console issue 0，404 响应 0。线上 PNG 导出成功：`/tmp/kzg-option-house-v160-prod-export.png`，大小 `1,482,138` bytes。线上截图：`/tmp/kzg-option-house-v160-prod-desktop.png`、`/tmp/kzg-option-house-v160-prod-mobile.png`。Apple Notes 置顶 `CHANGLOG 期权终端` 已从 `docs/CHANGLOG_OPTION_TERMINAL.md` 同步，updated `1`，created `0`，正文约 `157,747` chars。
- 下一步: v1.61 应优先压缩手机 realtime reserve 长度、检查 Flow Router 与历史轮动之间的滚动节奏，并继续不接真实 key、不做真实升级、不花钱、不提交 raw data。

English:

- Change: Public Web UI moves from `1.59` to `1.60`. This keeps Fangbao's latest boundary: current generated-minute features stay open, and only the future realtime tape/reserve may use a reserve treatment. `public/app.js` adds `realtimeFlowRouter()`, compressing the middle realtime reserve into a readable Flow Router: bias gate, premium gate, strategy gate, risk gate, a 16-cell dark routing tape, and a bottom summary for volume-premium warming, cooling, and peak minute. It explains that future live flow should be routed first and explained second instead of dumping complex controls directly onto the user.
- Visual: `public/styles.css` adds the v1.60 router layer. Desktop uses three columns: large explanation, four gates, and a dark micro tape. Mobile collapses into single/two-column layers without creating a new large blank block. A mobile timeboard correction also keeps the timeline title and coverage dates on one line above the slider, hides narrow-screen day arrows, and prevents the title from collapsing into a vertical strip or entering the chart lane. The middle flow terminal keeps the only allowed realtime blur; historical trends, rotation, event queues, and PNG export remain open.
- Boundary: No real API, provider name, API key, payment, price, domain, registration, account, or plan copy was added. Flow Router uses only derived samples from existing minute aggregates and rotation data; it is still not a live feed.
- Verification: `node --check public/app.js` passed; `git diff --check` passed; public-risk scan over `public/app.js public/index.html public/styles.css` had no matches. `python3 scripts/build_payload.py` produced a `505`-day payload, latest `2026-05-22`, analytics days `505`, analytics symbols `98`, final pack asset `kzg-frame-9969016096ae.js`; `python3 scripts/per_day_to_dist.py` returned `copied=505`. Browser opened local `http://127.0.0.1:4192/` and confirmed `23_DATA_期权分钟_Minute · 1.60 · 505/505 complete`, 3 sector cards, the Flow Router, 4 gates, 16 router-tape cells, 0 old lock layers, 0 old `.is-blurred` nodes, and 0 horizontal overflow. Playwright against dist `http://127.0.0.1:4193/` verified desktop `1440x1100` and phone `390x844`: 0 console issues, 0 bad responses, public-risk false, `user-select:none`, right-click contextmenu prevented, realtime tape blur `blur(2.7px) saturate(1.25)`, and mobile timeboard title `nowrap` with the title bottom above the slider top. PNG export succeeded at `/tmp/kzg-option-house-v160-dist-export.png`, suggested filename `kzg-option-house-2026-05-22-zh.png`, size `1,482,138` bytes. Screenshot evidence: `/tmp/kzg-option-house-v160-dist-desktop.png` and `/tmp/kzg-option-house-v160-dist-mobile.png`.
- Deploy: Deployed to Netlify production. Production site <https://kzg-option-house.netlify.app/>; unique deploy <https://6a15daeafdbe07993e28b173--kzg-option-house.netlify.app/>; deploy id `6a15daeafdbe07993e28b173`. Live smoke: `/` `200`, `/r/latest.html` `200`, `/app.js` `200` with `UI_VERSION="1.60"`, home references `kzg-frame-9969016096ae.js`, `/data/index.json` `404`, and `/assets/kzg-pack.js` `404`. Live Playwright verified desktop and phone both show v1.60, 3 sector cards, Flow Router, 4 gates, 16 router-tape cells, 0 old lock layers, 0 old `.is-blurred` nodes, 0 horizontal overflow, public-risk false, 0 console issues, and 0 bad responses. Live PNG export succeeded at `/tmp/kzg-option-house-v160-prod-export.png`, size `1,482,138` bytes. Live screenshots: `/tmp/kzg-option-house-v160-prod-desktop.png` and `/tmp/kzg-option-house-v160-prod-mobile.png`. Pinned Apple Notes `CHANGLOG 期权终端` was synced from `docs/CHANGLOG_OPTION_TERMINAL.md`: updated `1`, created `0`, about `157,747` body characters.
- Next: v1.61 should compress the mobile realtime reserve length, check scroll rhythm between Flow Router and historical rotation, and still avoid real keys, real upgrades, spending, or raw-data commits.

## v1.59 - 2026-05-27 00:32 Asia/Shanghai - three-sector product spine and public label scrub

中文:

- 改动: 公开 Web UI 从 `1.58` 提到 `1.59`。本轮按 Fangbao 最新“三段 sector”要求，不继续堆复杂组件，而是在 `accessStrip` 后新增 `sectorSpine`，把页面读法压成三张可点击导航卡：`01 昨日数据总线`、`02 未来实时席位`、`03 历史日内层`。用户从首屏往下即可理解：日报与 PNG 全开放；未来实时 Flow Tape 只是预留席位；历史趋势与轮动继续开放。`public/app.js` 新增 `renderSectorSpine()` 和 `[data-scroll-sector]` 点击跳转；`public/index.html` 新增 `section#sectorSpine`；`public/styles.css` 新增 v1.59 sector spine 样式并修复手机与桌面数字列越界。另一个公开面修复是把 `dataAudit.dataset` 从 `23_DATA_Massive_期权分钟_Minute` 改成 `23_DATA_期权分钟_Minute`，避免公开站展示供应商名；真实来源和 API 研究继续留在 docs。
- 视觉: 首屏后出现一个清楚的“产品阅读路径”横向/纵向脊柱。桌面为左侧大标题加三枚紧凑 sector 卡，手机收为纵向卡片，数值回到正文列内，不再贴边或溢出。中段 realtime reserve 仍保留 v1.58 的 transition rail 和 filter weight rail；本轮没有改动 PNG 画布样式。
- 边界: 当前生成分钟能力继续全开放。历史、趋势、轮动、事件队列和 PNG 导出没有 blur、lock 或 paywall。唯一 blur 仍是未来 realtime tape 的 `.terminal-table-body.is-realtime-gated`。公开页面渲染文本已扫描，不显示供应商名、支付、域名、真实 API、价格、注册或账号路线。
- 验证: `node --check public/app.js` 通过；`git diff --check -- public/app.js public/index.html public/styles.css` 通过；公开风险词扫描 `public/app.js public/index.html public/styles.css` 无命中。`python3 scripts/build_payload.py` 生成 `505` 天 payload，latest `2026-05-22`，analytics days `505`，analytics symbols `98`，最终 pack asset `kzg-frame-d02ec0281e37.js`；`python3 scripts/per_day_to_dist.py` 返回 `copied=505`。Browser 插件验证 `http://127.0.0.1:4191/` 页面身份、`1.59` 和三段 spine 均存在，console warning/error 0。Playwright 桌面 `1440x1100` 与手机 `390x844` 验证：source path 为 `23_DATA_期权分钟_Minute · 1.59 · 505/505 complete`；sector 按钮 3 个且 child 越界 0；transition rail 3 格；filter weight rail 4 格；realtime tape 18 行；realtime blur 为 `blur(2.7px) saturate(1.25)`；旧锁层 0；旧 `.is-blurred` 0；供应商/支付/API/域名/价格风险词 false；doc/body 横向溢出 0；console issue 0；`user-select:none`。点击 `未来实时席位` 可跳到 realtime reserve。PNG 导出成功：建议文件名 `kzg-option-house-2026-05-22-zh.png`，文件 `/tmp/kzg-option-house-v159-export.png`，大小 `1,482,138` bytes。截图证据：`/tmp/kzg-option-house-v159-desktop.png`、`/tmp/kzg-option-house-v159-phone.png`。
- 部署: 本轮不部署生产，因为 v1.59 是 v1.56 之后第 3 个本地 Web/iOS solid checkpoint 的中间收束；按 3-5 版本 cadence，v1.60 或 v1.61 适合生产部署，除非 Fangbao 要求提前。生产仍是 `https://kzg-option-house.netlify.app/` 上的 v1.56。
- 下一步: v1.60 可以继续压缩三段 spine 到 realtime reserve 之间的滚动距离，检查中段 flow terminal 在手机上是否过长，并准备一个生产部署候选；仍不接真实 key、不做真实升级、不花钱、不提交 raw data。

English:

- Change: Public Web UI moves from `1.58` to `1.59`. Following Fangbao's latest three-sector direction, this round does not add more complexity. It adds `sectorSpine` after `accessStrip`, compressing the page into three clickable navigation cards: `01 Daily data bus`, `02 Future live seat`, and `03 Historical intraday`. After the first screen, users can immediately understand that the daily report and PNG are open, the future realtime Flow Tape is only a reserve seat, and historical trends/rotation remain open. `public/app.js` adds `renderSectorSpine()` and `[data-scroll-sector]` scroll handling; `public/index.html` adds `section#sectorSpine`; `public/styles.css` adds the v1.59 sector-spine system and fixes desktop/mobile numeric overflow. The public source label also changes `dataAudit.dataset` from `23_DATA_Massive_期权分钟_Minute` to `23_DATA_期权分钟_Minute`, so the public site no longer shows a provider name. Real source/API planning stays in docs.
- Visual: A clear product reading spine now appears after the first screen. Desktop uses a large left title plus three compact sector cards; phone collapses to vertical cards with numeric values inside the text column, no edge spill. The middle realtime reserve keeps the v1.58 transition rail and filter-weight rail. PNG sheet styling is untouched.
- Boundary: Current generated-minute capabilities remain fully open. History, trends, rotation, event queues, and PNG export are not blurred, locked, or paywalled. The only blur remains the future realtime tape `.terminal-table-body.is-realtime-gated`. Rendered public text scan shows no provider name, payment, domain, real API, price, registration, or account route.
- Verification: `node --check public/app.js` passed; `git diff --check -- public/app.js public/index.html public/styles.css` passed; public risk-term scan over `public/app.js public/index.html public/styles.css` had no matches. `python3 scripts/build_payload.py` produced a `505`-day payload, latest `2026-05-22`, analytics days `505`, analytics symbols `98`, final pack asset `kzg-frame-d02ec0281e37.js`; `python3 scripts/per_day_to_dist.py` returned `copied=505`. Browser plugin verified `http://127.0.0.1:4191/` page identity, `1.59`, sector spine presence, and zero warning/error logs. Playwright desktop `1440x1100` and phone `390x844` verified: source path is `23_DATA_期权分钟_Minute · 1.59 · 505/505 complete`; 3 sector buttons with 0 child overflow; 3 transition-rail cells; 4 filter-weight cells; 18 realtime tape rows; realtime blur is `blur(2.7px) saturate(1.25)`; old lock layers are 0; old `.is-blurred` nodes are 0; provider/payment/API/domain/price risk text is false; document/body horizontal overflow is 0; console issues are 0; `user-select:none`. Clicking `Future live seat` scrolls to realtime reserve. PNG export succeeded with suggested filename `kzg-option-house-2026-05-22-zh.png`, file `/tmp/kzg-option-house-v159-export.png`, size `1,482,138` bytes. Screenshot evidence: `/tmp/kzg-option-house-v159-desktop.png` and `/tmp/kzg-option-house-v159-phone.png`.
- Deploy: Not deployed this round. v1.59 is an intermediate local solid checkpoint after production v1.56; under the 3-5 version cadence, v1.60 or v1.61 is a better production-deploy candidate unless Fangbao asks earlier. Production remains v1.56 at `https://kzg-option-house.netlify.app/`.
- Next: v1.60 can keep compressing the scroll distance between the three-sector spine and realtime reserve, check whether the middle flow terminal is too tall on phones, and prepare a production-deploy candidate. Still do not connect real keys, perform real upgrades, spend money, or commit raw data.

## v1.58 - 2026-05-27 00:17 Asia/Shanghai - realtime reserve transition and filter rail pass

中文:

- 改动: 公开 Web UI 从 `1.56` 提到 `1.58`，承接 v1.57 的 iOS 同步后重新回到 Web。`public/app.js` 增加 `realtimeTransitionRail()`，在中段 realtime reserve 顶部加入三格阅读路径：昨日总线、未来实时流、历史开放层，让用户从顶部日报自然滑入未来实时预留席位。`realtimeFilterConsole()` 新增 `realtimeFilterWeightRail()`，把未来 filter 从普通按钮堆升级成可扫读的权重条：偏向、量能、权利金、噪音阈值。文案也从“接入后打开”改成“后端确认后”，避免公开页暗示已经有真实接入。
- 视觉: `public/styles.css` 增加 v1.58 覆盖层。中段整体 gap 和 margin 更紧，`realtime-transition-rail` 用三段式台阶把日报、实时 reserve、历史开放层串起来；`filter-weight-rail` 在 filter grid 和 strategy cloud 之间形成更像交易终端的控制密度；手机端保留三枚 command chip 横排，filter grid 在手机先保留双列，窄屏再收成单列；terminal 高度略收，减少中段拖长。
- 边界: 当前生成分钟能力仍开放；本轮没有对历史、趋势、轮动、事件队列或 PNG 导出做 blur/lock/paywall。唯一视觉 blur 仍在 `.terminal-table-body.is-realtime-gated`，表示未来实时 tape 预留；没有加入真实 API、供应商、支付、域名、价格、注册或账号路线。风险词扫描只命中公开数据集名里的 `Massive`，没有命中支付/域名/密钥/价格/外部品牌等公开风险词。
- 验证: `node --check public/app.js` 通过；`python3 scripts/build_payload.py` 生成 `505` 天 payload，latest `2026-05-22`，analytics days `505`，analytics symbols `98`，pack asset `kzg-frame-705fedd65d01.js`；`python3 scripts/per_day_to_dist.py` 返回 `copied=505`。本地 Playwright 使用 `http://127.0.0.1:4190/` 验证桌面 `1440x1100` 和手机 `390x844`：页面显示 `23_DATA_Massive_期权分钟_Minute · 1.58 · 505/505 complete`，transition rail 3 格，filter weight rail 4 格，实时 tape 18 行，实时 tape filter 为 `blur(2.7px) saturate(1.25)`，旧锁层 0，旧 `.is-blurred` 0，风险词 false，doc/body 横向溢出 0，console warning/error 0，`user-select:none`。PNG 导出成功，文件 `/tmp/kzg-option-house-v158-export.png`，建议文件名 `kzg-option-house-2026-05-22-zh.png`，大小 `1,482,138` bytes。截图证据：`/tmp/kzg-option-house-v158-desktop.png`、`/tmp/kzg-option-house-v158-phone.png`。
- 部署: 本轮不部署生产，因为 v1.58 是本地 Web 体验迭代，生产仍为 v1.56 `https://6a15c1b6531adb3fd145e39d--kzg-option-house.netlify.app/`。按 3-5 个扎实版本或公开风险修复规则，下一次可在 v1.60/v1.61 附近合并部署，除非 Fangbao 要求提前。
- 下一步: v1.59 继续处理中段下方和历史开放层的视觉节奏，重点检查桌面右侧列表、手机 filter 密度、历史 intro 与轮动象限之间的空白。

English:

- Change: Public Web UI moves from `1.56` to `1.58`, returning to Web after the v1.57 iOS sync. `public/app.js` adds `realtimeTransitionRail()`, a three-cell reading path at the top of the realtime reserve: daily bus, future realtime flow, and open historical layer. This lets users slide naturally from the top daily dashboard into the future realtime seat. `realtimeFilterConsole()` adds `realtimeFilterWeightRail()`, turning future filters from a button stack into a scan-ready control strip: bias, volume, premium, and noise gate. Copy changes from "opens after backend" to "after backend approval" so the public page does not imply a real connection already exists.
- Visual: `public/styles.css` adds a v1.58 override layer. The middle sector gap and margin are tighter; `realtime-transition-rail` links daily report, realtime reserve, and historical layer as a stepped reading path; `filter-weight-rail` adds trading-terminal density between filter grid and strategy cloud; phones keep the three command chips in one row, keep filter grid two-column first, and collapse to one column on narrow screens. Terminal height is slightly reduced to avoid dragging the middle sector too long.
- Boundary: Current generated-minute capabilities remain open. This round does not blur, lock, or paywall history, trends, rotation, event queues, or PNG export. The only visual blur remains `.terminal-table-body.is-realtime-gated`, representing the future realtime tape reserve. No real API, provider, payment, domain, price, registration, or account route is added. Risk scan only matches the public dataset name `Massive`, not payment/domain/key/price/external-brand risk terms.
- Verification: `node --check public/app.js` passed; `python3 scripts/build_payload.py` produced a `505`-day payload, latest `2026-05-22`, analytics days `505`, analytics symbols `98`, pack asset `kzg-frame-705fedd65d01.js`; `python3 scripts/per_day_to_dist.py` returned `copied=505`. Local Playwright against `http://127.0.0.1:4190/` verified desktop `1440x1100` and phone `390x844`: page shows `23_DATA_Massive_期权分钟_Minute · 1.58 · 505/505 complete`; transition rail has 3 cells; filter weight rail has 4 cells; realtime tape has 18 rows; realtime tape filter is `blur(2.7px) saturate(1.25)`; old lock layers are 0; old `.is-blurred` nodes are 0; risk text is false; document/body horizontal overflow is 0; console warning/error count is 0; `user-select:none`. PNG export succeeded at `/tmp/kzg-option-house-v158-export.png`, suggested filename `kzg-option-house-2026-05-22-zh.png`, size `1,482,138` bytes. Screenshot evidence: `/tmp/kzg-option-house-v158-desktop.png` and `/tmp/kzg-option-house-v158-phone.png`.
- Deploy: Not deployed to production because v1.58 is a local Web experience iteration. Production remains v1.56 at `https://6a15c1b6531adb3fd145e39d--kzg-option-house.netlify.app/`. Under the 3-5 solid-version cadence, the next deploy can happen around v1.60/v1.61 unless Fangbao asks earlier.
- Next: v1.59 should continue the rhythm below the middle sector and into the open historical layer, focusing on desktop side-list balance, mobile filter density, and whitespace between history intro and rotation quadrant.

## v1.57 - 2026-05-27 00:03 Asia/Shanghai - iOS companion three-sector reserve sync

中文:

- 改动: 本轮不改公开 Web 生产页面，把 Web `1.55/1.56` 形成的三段逻辑同步到原生 iOS 伴生端。`DashboardView.swift` 的手机读盘顺序变为顶部开放日内 dashboard、中央未来实时流 Reserve、底部开放历史层；`Models.swift` 新增 `FlowFilter`、`FlowLane`、`FlowItem`、`HistoryPillar`；`SnapshotProvider.swift` 增加本地派生 flow book 样张、四个过滤入口和三枚历史层指标。Header 从 iOS `0.4` 提到 `0.5`，checkpoint 从 Web `1.50` 更新为 Web `1.57` / iOS `0.5` / Live Future derived。
- 边界: iOS 里没有真实 API key、供应商名称、支付、域名、价格、注册或账号路线；future realtime 区只表达产品形态和派生样张。当前日报、历史、轮动、趋势、PNG 导出等已生成分钟功能仍按公开开放原则处理，本轮不做 App Store、TestFlight、签名、付费账号或真实凭证动作。
- 视觉: iOS 主栈 spacing 从 v0.4 的紧凑读盘继续升级为三段式纵向节奏。Realtime Reserve 卡片增加 filter chips、Bullish/Bearish 两条 flow lanes 和紧凑行格式；开放历史层单独解释 505 文件窗口、98 标的样本和 60D 趋势读法；轮动象限从固定 300x200 坐标改成 GeometryReader 自适应坐标，减少手机宽度变化时的错位。
- 验证: 已先用 XcodeBuildMCP `session_show_defaults` 确认当前 profile 是 `/Users/fangbao/kzg-options-minute-site/ios/KZGOptionHouse/KZGOptionHouse.xcodeproj`、scheme `KZG Option House`、simulator `iPhone 17 Pro`。`build_run_sim` 仍因本机 simulator destination `{ platform:iOS Simulator, id:9DAFEA29-80F2-4D94-BE75-C0106CE8D97E }` 无法匹配 runtime 失败，build log 为 `/Users/fangbao/Library/Developer/XcodeBuildMCP/workspaces/fangbao-e14a434e56b6/logs/build_run_sim_2026-05-26T16-03-05-731Z_pid85738_5623ca35.log`。随后 fallback `xcrun --sdk iphonesimulator swiftc -typecheck ios/KZGOptionHouse/KZGOptionHouse/*.swift -target arm64-apple-ios17.0-simulator` 通过。
- 部署: 不部署 Netlify，因为生产 Web 无代码变化，生产仍是 v1.56 `https://6a15c1b6531adb3fd145e39d--kzg-option-house.netlify.app/`。本轮应作为 GitHub backup 和 Apple Notes 交接版本提交。
- 下一步: v1.58 应回到 Web 端继续压缩顶部 dashboard 到中段 realtime reserve 的过渡，并把中段 flow filter 做得更像“可扫读的交易终端”，但仍不接真实 key、不显示供应商/支付/域名/价格。

English:

- Change: This round does not change the public Web production page. It syncs the Web `1.55/1.56` three-sector logic into the native iOS companion. `DashboardView.swift` now reads as top open intraday dashboard, middle future realtime Reserve, and bottom open historical layer. `Models.swift` adds `FlowFilter`, `FlowLane`, `FlowItem`, and `HistoryPillar`. `SnapshotProvider.swift` adds a local derived flow-book sample, four filter controls, and three historical-layer metrics. Header moves from iOS `0.4` to `0.5`; checkpoint tiles now show Web `1.57`, iOS `0.5`, and Live Future derived.
- Boundary: iOS contains no real API key, provider name, payment, domain, price, registration, or account route. The future realtime area only expresses product form and derived sample rows. Current generated-minute features such as daily report, history, rotation, trends, and PNG export stay under the public-open principle. No App Store, TestFlight, signing, paid account, or real credential action happened.
- Visual: The iOS main stack moves from v0.4 compact scanning into a clear three-sector vertical rhythm. The Realtime Reserve card adds filter chips, Bullish/Bearish lanes, and compact flow rows; the open historical layer separately explains the 505-file window, 98-symbol sample, and 60D trend reading. The rotation quadrant now uses GeometryReader adaptive coordinates instead of a fixed 300x200 grid, reducing width-related misalignment on phones.
- Verification: XcodeBuildMCP `session_show_defaults` confirmed the active profile points to `/Users/fangbao/kzg-options-minute-site/ios/KZGOptionHouse/KZGOptionHouse.xcodeproj`, scheme `KZG Option House`, simulator `iPhone 17 Pro`. `build_run_sim` still fails on this machine because destination `{ platform:iOS Simulator, id:9DAFEA29-80F2-4D94-BE75-C0106CE8D97E }` cannot match the installed runtime; build log is `/Users/fangbao/Library/Developer/XcodeBuildMCP/workspaces/fangbao-e14a434e56b6/logs/build_run_sim_2026-05-26T16-03-05-731Z_pid85738_5623ca35.log`. Fallback `xcrun --sdk iphonesimulator swiftc -typecheck ios/KZGOptionHouse/KZGOptionHouse/*.swift -target arm64-apple-ios17.0-simulator` passed.
- Deploy: No Netlify deploy because production Web code did not change. Production remains v1.56 at `https://6a15c1b6531adb3fd145e39d--kzg-option-house.netlify.app/`. This round should be committed as a GitHub backup and synced into Apple Notes.
- Next: v1.58 should return to Web and compress the transition from top dashboard into the middle realtime reserve, making the flow filters feel more like a scan-ready trading terminal while still not connecting real keys or showing provider/payment/domain/pricing details.

## v1.56 - 2026-05-26 23:58 Asia/Shanghai - realtime flow-book and strategy filter pass

中文:

- 改动: 公开 Web UI 从 `1.55` 提到 `1.56`。承接 Fangbao 新发的外部 flow 页面参考，本轮没有把对方品牌、价格、活动文案或法律脚注搬进站点，而是把“实时期权流预留席位”里的 KZG 自有 flow book 做得更像可交易终端：Bullish/Bearish 列表从普通标的列表升级为 `标的 / 次数 / 策略类型+变化 / 权利金` 的紧凑账本；策略识别库从四组标签扩成方向、收入、价差、波动、高级五类；过滤器把 `Flow Book` 作为一等控制项，明确未来会按多空流向、权利金、到期、策略和异动提醒来筛。
- 设计原则: 当前日报和历史数据继续开放。唯一保留 blur 的仍是中段未来实时 tape，用来表达未来真实 feed 接入后的高速明细；其它现有分钟聚合、轮动、趋势、PNG 导出都不遮挡。v1.56 的重点是让中段“为什么以后实时 feed 值钱”更可感知，而不是提前做支付或锁功能。
- 公开边界: 公开源码和渲染文本中没有外部 flow 站品牌、Stripe、Namecheap、Network Solutions、API key、Memorial Day、Upgrade、真实价格、checkout、域名候选或供应商凭证。截图里暴露过的 Massive key 继续未使用、未存储、未提交。
- 验证: `node --check public/app.js` 通过；`python3 scripts/build_payload.py` 生成 `505` 天 payload，最新日 `2026-05-22`，analytics symbols `98`，pack asset `kzg-frame-2e0dbdf2b94a.js`；`python3 scripts/per_day_to_dist.py` 返回 `copied=505`。Playwright/Node local QA 验证桌面 `1440x1100` 和手机 `390x844` 均显示 `23_DATA_Massive_期权分钟_Minute · 1.56 · 505/505 complete`，实时区和历史 intro 存在，实时 tape 18 行，唯一 filter 为 `.terminal-table-body` 的 `blur(2.7px) saturate(1.25)`，旧锁层 0，旧 `.is-blurred` 0，横向溢出 0，console warning/error 0。Bullish book 第一行示例为 `RGTI 103 扫单 · +417.9% $122.7M`。PNG 导出成功，建议文件名 `kzg-option-house-2026-05-22-zh.png`，本地文件 `/tmp/kzg-v156-export.png`。
- Deploy: 已部署生产。生产站 `https://kzg-option-house.netlify.app/`；唯一部署 `https://6a15c1b6531adb3fd145e39d--kzg-option-house.netlify.app/`；Netlify deploy id `6a15c1b6531adb3fd145e39d`。线上 smoke: `/` `200`，`/app.js` `200` 且包含 `UI_VERSION = "1.56"`，`/data/index.json` `404`，`/assets/kzg-pack.js` `404`。线上桌面与手机均显示 `1.56 · 505/505 complete`，实时区和历史 intro 存在，实时 tape 18 行，旧锁层 0，旧 `.is-blurred` 0，横向溢出 0，风险词 0，console issue 0。线上 PNG 导出 `/tmp/kzg-v156-prod-export.png` 成功，建议文件名 `kzg-option-house-2026-05-22-zh.png`。
- 下一步: v1.57 应继续压缩中段手机高度和顶部 dashboard 到实时区的过渡，同时可以开始内部 backend-only realtime schema/fanout 规划；不要把支付、域名、真实 API 或价格放回公开页面。

English:

- Change: Public Web UI moved from `1.55` to `1.56`. Following Fangbao's latest external flow-page reference, this round does not copy the other site's brand, pricing, sale copy, or legal footer. It turns KZG's own realtime reserve into a more terminal-like flow book: Bullish/Bearish lists now read as compact `symbol / count / strategy+change / premium` ledgers; the strategy recognition library expands into Directional, Income, Spreads, Volatility, and Advanced groups; filters make `Flow Book` a first-class future control for bias, premium, expiration, strategy, and anomaly alerts.
- Design principle: The daily dashboard and historical data remain open. The only blur is still the middle future realtime tape, representing high-speed detail after a real feed connection. Existing minute aggregates, rotation, trends, and PNG export are not blocked. v1.56 makes the middle sector's future paid value easier to feel without launching payment or locking current features.
- Public boundary: Public source and rendered text contain no external flow-site brand, Stripe, Namecheap, Network Solutions, API key, Memorial Day, Upgrade, real prices, checkout, domain candidates, or provider credentials. Massive keys exposed in screenshots remain unused, unstored, and uncommitted.
- Verification: `node --check public/app.js` passed; `python3 scripts/build_payload.py` produced a `505`-day payload, latest date `2026-05-22`, analytics symbols `98`, pack asset `kzg-frame-2e0dbdf2b94a.js`; `python3 scripts/per_day_to_dist.py` returned `copied=505`. Playwright/Node local QA verified desktop `1440x1100` and phone `390x844` both show `23_DATA_Massive_期权分钟_Minute · 1.56 · 505/505 complete`; realtime sector and history intro exist; realtime tape has 18 rows; the only filter is `.terminal-table-body` with `blur(2.7px) saturate(1.25)`; old lock layers are 0; old `.is-blurred` nodes are 0; horizontal overflow is 0; console warnings/errors are 0. First Bullish book row is `RGTI 103 扫单 · +417.9% $122.7M`. PNG export succeeded with suggested filename `kzg-option-house-2026-05-22-zh.png`, local file `/tmp/kzg-v156-export.png`.
- Deploy: Deployed to production. Production site `https://kzg-option-house.netlify.app/`; unique deploy `https://6a15c1b6531adb3fd145e39d--kzg-option-house.netlify.app/`; Netlify deploy id `6a15c1b6531adb3fd145e39d`. Live smoke: `/` `200`, `/app.js` `200` with `UI_VERSION = "1.56"`, `/data/index.json` `404`, and `/assets/kzg-pack.js` `404`. Live desktop and phone both show `1.56 · 505/505 complete`; realtime sector and history intro exist; realtime tape has 18 rows; old lock layers are 0; old `.is-blurred` nodes are 0; horizontal overflow is 0; risk strings are 0; console issues are 0. Live PNG export `/tmp/kzg-v156-prod-export.png` succeeded with suggested filename `kzg-option-house-2026-05-22-zh.png`.
- Next: v1.57 should keep compressing middle-sector phone height and the transition from top dashboard into realtime reserve, while internal backend-only realtime schema/fanout planning can continue. Do not put payment, domain, real API, or prices back on the public page.

## v1.55 - 2026-05-26 23:41 Asia/Shanghai - three-sector realtime-flow reserve

中文:

- 改动: 公开 Web UI 从 `1.54` 提到 `1.55`。根据 Fangbao 对 OptionStrat/实时 flow 的参考和纠偏，本轮把页面重新压成三段结构：顶部是当前/昨日分钟聚合 dashboard 和时间轴，保持开放；中段是未来实时期权流预留席位，展示高速 tape、Bullish/Bearish 分栏、过滤器、策略识别库和事件密度；底部是开放历史日内趋势导语，继续承接跨日趋势、轮动象限、日内桶和标的动量。只有中段未来实时 tape 使用 `blur(2.7px) saturate(1.25)` 表达“未来接入后打开”，当前已生成的日报、历史、轮动和预测派生能力全部保持开放。
- 原因: Fangbao 明确要求不要把现有内容复杂化或锁住；公开页必须先让用户看懂三件事：昨天发生了什么、未来实时 feed 会强在哪里、历史分钟数据能怎样发现量价同升/同步降温。现阶段真正可能付费的地方是以后真实实时 option feed，不是当前已经落地的分钟聚合页面。
- 公开边界: 没有使用、复述、存储、提交任何截图中暴露的 Massive key。公开源码和渲染文本风险扫描确认没有 Stripe、Namecheap、Network Solutions、OptionStrat、API key、价格、套餐、Upgrade、支付路线、供应商密钥或域名候选等内部商业/凭证词。中段只展示产品体验，不展示真实 API/provider/checkout/域名/价格路线。
- 视觉: 桌面中段改为四列：实时层逻辑、过滤器与策略识别库、模糊实时 tape、Bullish/Bearish flow 列。第一次截图发现右侧大空白和 filter 过高，随后改为四列填满，并补上策略识别库和 flow model，避免空洞。手机端按纵向终端阅读展开，无横向溢出。
- 验证: `node --check public/app.js` 通过；`python3 scripts/build_payload.py` 生成 `505` 天 payload，最新日 `2026-05-22`，analytics symbols `98`，pack asset `kzg-frame-7c2d5997acd1.js`；`python3 scripts/per_day_to_dist.py` 返回 `copied=505`。Browser 本地验证页面身份、v1.55、实时 sector、历史 intro、实时 blur、无旧锁层、无旧 `.is-blurred`、无横向溢出、console issue 为 0。Playwright 验证桌面 `1440x1100` 与手机 `390x844`：`sourcePath` 为 `23_DATA_Massive_期权分钟_Minute · 1.55 · 505/505 complete`，实时区和历史 intro 存在，实时 tape 18 行，唯一 blur 只在 `.terminal-table-body`，旧 lock/blur 节点 0，风险词 0，横向溢出 0，console warning/error 0。PNG 导出成功：`/tmp/kzg-v155-finalqa/kzg-option-house-2026-05-22-zh.png`。
- Deploy: 本地已验证，待本轮文档同步后作为 3-5 版本检查点部署生产。生产当前仍是 v1.54。
- 下一步: 部署 v1.55 后，继续 v1.56 做顶部 dashboard 与中段实时区之间的过渡节奏，并把真实实时 feed 的后端/权限/缓存研究继续留在内部文档，不回流到公开主页。

English:

- Change: Public Web UI moved from `1.54` to `1.55`. Following Fangbao's OptionStrat/live-flow reference and correction, the page is reshaped into three sectors: the top remains the open current/yesterday minute-aggregate dashboard with timeline; the middle becomes the future realtime options-flow reserve with fast tape, Bullish/Bearish lanes, filters, strategy recognition, and event density; the bottom adds an open historical-intraday intro leading into cross-day trends, rotation quadrant, intraday buckets, and symbol momentum. Only the middle future realtime tape uses `blur(2.7px) saturate(1.25)` to signal "opens after live connection." All existing generated daily, history, rotation, and derived capabilities stay open.
- Reason: Fangbao explicitly asked not to overcomplicate or lock existing content. The public page should make three things immediately legible: what happened yesterday, why the future realtime feed is powerful, and how historical minute data reveals volume-premium warming/cooling. The future paid candidate is real-time option feed, not the already-landed generated-minute dashboard.
- Public boundary: No exposed Massive key from screenshots was used, repeated, stored, or committed. Public source and rendered-text risk scans confirm no Stripe, Namecheap, Network Solutions, OptionStrat, API key, price, plan, Upgrade, payment route, provider secret, or domain-candidate terms. The middle sector shows only product experience, not real API/provider/checkout/domain/pricing routes.
- Visual: Desktop middle sector is now four columns: live-layer logic, filter and strategy recognition, blurred realtime tape, and Bullish/Bearish flow lanes. First screenshot showed a right-side blank area and overstretched filters; it was corrected to fill the grid, with a strategy-recognition library and flow model added to avoid empty space. Mobile expands into a vertical terminal reading flow with no horizontal overflow.
- Verification: `node --check public/app.js` passed; `python3 scripts/build_payload.py` produced a `505`-day payload, latest date `2026-05-22`, analytics symbols `98`, pack asset `kzg-frame-7c2d5997acd1.js`; `python3 scripts/per_day_to_dist.py` returned `copied=505`. Browser local verification confirmed page identity, v1.55, realtime sector, history intro, realtime blur, no old lock layers, no old `.is-blurred`, no horizontal overflow, and zero console issues. Playwright verified desktop `1440x1100` and phone `390x844`: `sourcePath` is `23_DATA_Massive_期权分钟_Minute · 1.55 · 505/505 complete`, realtime section and history intro exist, realtime tape has 18 rows, the only blur is on `.terminal-table-body`, old lock/blur nodes are 0, risk strings are 0, horizontal overflow is 0, and console warnings/errors are 0. PNG export succeeded at `/tmp/kzg-v155-finalqa/kzg-option-house-2026-05-22-zh.png`.
- Deploy: Locally verified. It should be deployed after this documentation sync as the next checkpoint. Current production is still v1.54.
- Next: After deploying v1.55, v1.56 should refine the transition rhythm between the top dashboard and realtime sector while keeping real realtime feed backend/entitlement/cache research inside internal docs, not the public homepage.

## v1.54 - 2026-05-26 23:02 Asia/Shanghai - public-open no-blur correction

中文:

- 改动: 公开 Web UI 从 `1.53` 提到 `1.54`。根据 Fangbao 最新纠偏，当前站不再对任何现有功能做 blur、lock 或 paywall。`public/app.js` 把 `isHistoryLocked()` 改为始终 `false`，高级预览的 `locked` 固定为 `false`，并移除公开 JS 中旧的 `is-blurred` 模板输出；后续补刀让 `applyAccessState()` 直接移除旧 `.pro-lock-overlay`，不再生成锁层。文案从“历史锁定/模糊预览/付费层”改为“历史回看开放/当前分钟数据能力完整开放/未来实时流另行设计”。`feedVisibilityState()` 现在只给公开层级 `public-latest`、`history-open` 和 `future-live-feed`，其中 `future-live-feed` 只是未来真实实时流阶段的产品路线，不是当前页面收费动作。`public/styles.css` 增加 v1.54 兜底，并把旧 `.is-blurred` 与 `.is-pro-locked` 的 filter/opacity 规则改为无视觉遮挡，旧锁层或遮罩即使误挂也不再产生可见模糊。
- 原因: Fangbao 明确指出现阶段不要 blur 任何事，所有当前可见能力都给用户使用；真正值得研究付费计划的是以后真实实时 option feed 接入之后的服务层，而不是现在把现有日报/历史能力遮起来。
- 公开边界: 公开页面不展示 Stripe、Checkout、Wallet、WeChat、Namecheap、Network Solutions、pricing、payment、billing、API key、Massive plan、`$199`、provider、real API 等内部商业或凭证词。截图中暴露过的 Massive key 继续视为已暴露，未使用、未存储、未提交。
- 验证: `node --check public/app.js` 通过；build 生成 `505` 天 payload，最新日 `2026-05-22`，analytics symbols `98`，pack asset `kzg-frame-20c5a70ad594.js`；`per_day_to_dist.py` 返回 `copied=505`。公开 source/dist 风险词扫描为 0；`public/app.js` 与 `dist/app.js` 已无 `模糊/blurred/paid/paywall` 等旧公开文案。Browser 本地验证 `historyLocked=false`、`visibleBlurred=0`、`visibleLocks=0`、`riskText=false`、`overflowX=0`。Playwright 本地验证桌面 `1440x1100` 和手机 `390x844`，把时间轴切到历史日 `2026-01-22` 后仍为 `history-open`、无可见模糊、无遮罩、无横向溢出、无 console issue。PNG 导出 `/tmp/kzg-option-house-v154-export.png` 成功，建议文件名 `kzg-option-house-2026-05-22-zh.png`，大小 `1,482,138` bytes。
- Deploy: 已立即部署生产。生产站 `https://kzg-option-house.netlify.app/`；唯一部署 `https://6a15b9924af25310d2950255--kzg-option-house.netlify.app/`。线上 smoke: `/` `200`，`/app.js` `UI_VERSION="1.54"`，`/data/index.json` `404`，`/assets/kzg-pack.js` `404`。线上桌面和手机历史日均 `historyLocked=false`、`visibleBlurred=0`、`visibleLocks=0`、`riskText=false`、`eventTier=history-open`、无横向溢出。线上 PNG 导出 `/tmp/kzg-option-house-v154-prod-export.png` 成功，大小 `1,482,138` bytes。
- Apple Notes: `CHANGLOG 期权终端` 已从 `docs/CHANGLOG_OPTION_TERMINAL.md` 同步，当前同名 note 数量为 1，正文约 `127k` 字符。
- 下一步: v1.55 可以继续做 spacing/calligraphy 和手机阅读感；若要讨论付费计划，只围绕未来真实实时 option feed 的后端、授权、缓存、分发和服务层研究，不再遮挡当前分钟数据功能。

English:

- Change: Public Web UI moved from `1.53` to `1.54`. Following Fangbao's correction, the current site no longer blurs, locks, or paywalls any existing feature. `public/app.js` makes `isHistoryLocked()` always return `false`, forces the advanced preview `locked` flag to `false`, removes old `is-blurred` template output from public JS, and then hardens `applyAccessState()` so it removes old `.pro-lock-overlay` nodes instead of creating lock layers. Copy changed from history locked / blurred preview / paid layer to history open / current minute-data features open / future live feed as a separate design. `feedVisibilityState()` now exposes only `public-latest`, `history-open`, and `future-live-feed`; the last one is a future real-time-feed product route, not a current monetization action. `public/styles.css` adds a v1.54 safeguard and changes old `.is-blurred` / `.is-pro-locked` filter rules to no-op visibility, so old lock or veil classes cannot visually blur content if accidentally attached.
- Reason: Fangbao explicitly said not to blur anything at this stage and to let users use all current visible capability. The real paid-plan research belongs to the future real-time option feed service layer after backend/API work, not to hiding the existing daily/history dashboard.
- Public boundary: The public page does not expose Stripe, Checkout, Wallet, WeChat, Namecheap, Network Solutions, pricing, payment, billing, API key, Massive plan, `$199`, provider, real API, or internal credential/commercial terms. Massive keys exposed in screenshots are still treated as exposed and were not used, stored, or committed.
- Verification: `node --check public/app.js` passed; build produced a `505`-day payload, latest date `2026-05-22`, analytics symbols `98`, pack asset `kzg-frame-20c5a70ad594.js`; `per_day_to_dist.py` returned `copied=505`. Public source/dist risk scan returned 0; `public/app.js` and `dist/app.js` no longer contain the old public blur/paid/paywall copy. Browser local verification reported `historyLocked=false`, `visibleBlurred=0`, `visibleLocks=0`, `riskText=false`, and `overflowX=0`. Local Playwright verified desktop `1440x1100` and phone `390x844`; after moving the timeline to historical date `2026-01-22`, both stayed `history-open` with no visible blur, no veil, no horizontal overflow, and no console issues. PNG export `/tmp/kzg-option-house-v154-export.png` succeeded with suggested filename `kzg-option-house-2026-05-22-zh.png`, size `1,482,138` bytes.
- Deploy: Deployed immediately to production. Production site `https://kzg-option-house.netlify.app/`; unique deploy `https://6a15b9924af25310d2950255--kzg-option-house.netlify.app/`. Live smoke: `/` `200`, `/app.js` has `UI_VERSION="1.54"`, `/data/index.json` `404`, and `/assets/kzg-pack.js` `404`. Live desktop and phone on a historical date both reported `historyLocked=false`, `visibleBlurred=0`, `visibleLocks=0`, `riskText=false`, `eventTier=history-open`, and no horizontal overflow. Live PNG export `/tmp/kzg-option-house-v154-prod-export.png` succeeded at `1,482,138` bytes.
- Apple Notes: `CHANGLOG 期权终端` has been synced from `docs/CHANGLOG_OPTION_TERMINAL.md`; there is now 1 note with that exact title, about `127k` body characters.
- Next: v1.55 can continue spacing/calligraphy and phone reading flow. Any paid-plan discussion should now stay around the future real-time option feed backend, entitlement, cache, fanout, and service layer; current minute-data features should stay open.

## v1.53 - 2026-05-26 22:40 Asia/Shanghai - feed visibility boundary rail

中文:

- 改动: 公开 Web UI 从 `1.52` 提到 `1.53`。本轮把 v1.52 的派生事件队列接入“可见边界”骨架，不接真实 key、不接真实后端、不做套餐升级、不展示任何商业内部路线。`public/app.js` 新增 `feedVisibilityState()` 和 `feedBoundaryRail()`，给事件对象补上 `source: derived-minute-aggregate` 与安全 `visibleTier`。公开代码使用中性层级：`public-latest`、`blurred-history`、`advanced-derived`；其中 `advanced-derived` 是公开页可展示的中性能力边界，内部文档再映射到未来的 paid-derived 权限层。`public/styles.css` 新增 `.feed-boundary-rail`，在实时流轮廓和事件队列之间压出三格短状态胶片：今日开放、历史预览、深层派生。
- 原因: Fangbao 要免费版和高级版的差异能被用户“看见”，但不能把 payment、pricing、domain、API key、plan 内部方案放到公开页。v1.53 先让事件流自己带清楚的可见边界：最新日公开可读，历史日期模糊预览，未来更深派生层只以能力轮廓排队。
- 公开边界: 风险词扫描确认公开 source/dist 没有 Stripe、Checkout、Wallet、WeChat、Namecheap、Network Solutions、pricing、payment、billing、API key、Massive plan、`$199`、provider、real API 等词。截图里暴露过的 Massive key 仍视为已暴露，不使用、不提交、不写入公开代码。
- 验证: `node --check public/app.js` 通过；build 生成 `505` 天 payload，最新日 `2026-05-22`，analytics symbols `98`，pack asset `kzg-frame-81f858a7af7c.js`；`per_day_to_dist.py` 返回 `copied=505`。风险扫描 `public` 和 `dist` 为 0。Playwright 本地验证桌面 `1440x1100`、手机 `390x844`、手机事件区均无横向溢出和 console issue；桌面事件队列 8 条可见，手机 4 条可见，边界条 3 格可见，当前层级 `public-latest`。截图为 `/tmp/kzg-option-house-v153-desktop.png`、`/tmp/kzg-option-house-v153-mobile.png`、`/tmp/kzg-option-house-v153-mobile-events.png`。PNG 导出 `/tmp/kzg-option-house-v153-export.png` 成功，建议文件名 `kzg-option-house-2026-05-22-zh.png`，大小 `1,482,138` bytes。
- Deploy: 本轮不部署生产。生产仍为 v1.52，唯一部署 `https://6a15ae01b139b100d8816c5e--kzg-option-house.netlify.app/`。
- 下一步: v1.54 应建模 fanout/load/cache 和事件压缩；v1.55 是默认 iOS companion 同步点。

English:

- Change: Public Web UI moved from `1.52` to `1.53`. This round connects the v1.52 derived event queue to a visibility-boundary skeleton without real keys, real backend work, plan upgrades, or public commercial internals. `public/app.js` adds `feedVisibilityState()` and `feedBoundaryRail()`, and event objects now carry `source: derived-minute-aggregate` plus a safe `visibleTier`. Public code uses neutral tiers: `public-latest`, `blurred-history`, and `advanced-derived`; `advanced-derived` is the public-safe capability boundary, while internal docs map it to the future paid-derived entitlement layer. `public/styles.css` adds `.feed-boundary-rail`, a compact three-cell status strip between the live silhouette and the event queue: latest open, history preview, deep derived.
- Reason: Fangbao wants users to feel the free versus advanced difference, but payment, pricing, domain, API key, plan mechanics, and internal routes must stay off the public page. v1.53 makes the event feed carry the boundary itself: latest day readable, historical dates blurred, deeper derived layer shown only as a queued capability silhouette.
- Public boundary: Risk scan confirms public source/dist do not contain Stripe, Checkout, Wallet, WeChat, Namecheap, Network Solutions, pricing, payment, billing, API key, Massive plan, `$199`, provider, real API, or similar terms. Massive keys exposed in screenshots are still treated as exposed and were not used, committed, or written into public code.
- Verification: `node --check public/app.js` passed; build produced a `505`-day payload, latest date `2026-05-22`, analytics symbols `98`, pack asset `kzg-frame-81f858a7af7c.js`; `per_day_to_dist.py` returned `copied=505`. Risk scan over `public` and `dist` returned 0. Local Playwright verified desktop `1440x1100`, phone `390x844`, and phone event area with no horizontal overflow and no console issue; desktop shows 8 event cards, phone shows 4, the boundary strip has 3 visible cells, and the current tier is `public-latest`. Screenshots are `/tmp/kzg-option-house-v153-desktop.png`, `/tmp/kzg-option-house-v153-mobile.png`, and `/tmp/kzg-option-house-v153-mobile-events.png`. PNG export `/tmp/kzg-option-house-v153-export.png` succeeded, suggested filename `kzg-option-house-2026-05-22-zh.png`, size `1,482,138` bytes.
- Deploy: Not deployed to production. Production remains v1.52, unique deploy `https://6a15ae01b139b100d8816c5e--kzg-option-house.netlify.app/`.
- Next: v1.54 should model fanout/load/cache and event compression; v1.55 remains the default iOS companion sync point.

## v1.52 - 2026-05-26 22:32 Asia/Shanghai - derived event queue and feed schema

中文:

- 改动: 公开 Web UI 从 `1.51` 提到 `1.52`。本轮不接真实 Massive key、不接真实后端、不做套餐升级，只把 v1.51 的实时流轮廓推进成“派生事件队列”。`public/app.js` 新增 `derivedFeedEvents()` 和 `liveEventQueue()`，从现有分钟聚合、标的轮动、权利金变化、CP 斜率和 30 分钟桶中生成安全事件：爆发、权利金、CP斜率、防守、降温、节奏。事件只包含 symbol、time、kind、tone、score、短解释和派生指标，不包含原始合约 payload、API route、provider、真实 key 或价格。`public/styles.css` 新增 `.live-event-queue`，桌面为八格短事件 tape，手机为两列并隐藏第 5 条之后，保证实时感但不拖长首屏。新增内部文档 `docs/REALTIME_FEED_SCHEMA.md`，定义 Web、未来后端和 iOS 共用的事件字段。
- 原因: Fangbao 要的是像 OptionStrat 那种“实实在在的流”，但现阶段不能把 key 或真实 feed 直接放到页面上。v1.52 先建立产品语言和数据契约：用户看见的是 KZG 解读后的事件节奏，未来后端接入时替换数据源即可，前端和 iOS 不需要知道底层供应商和 secret。
- 公开边界: 公开页仍不展示 Massive provider、API key、套餐名、`$199`、pricing、payment、billing、Stripe、wallet、WeChat、domain candidate、checkout、registration 或法律假设。事件队列只有派生信号，不是原始 OPRA 再分发。
- 验证: `node --check public/app.js` 通过；`python3 scripts/build_payload.py` 生成 `505` 天 payload，最新日 `2026-05-22`，analytics symbols `98`，pack asset `kzg-frame-bfd6858cf066.js`；`python3 scripts/per_day_to_dist.py` 返回 `copied=505`。`public` 与 `dist` 风险词扫描为 0。Playwright 本地验证桌面 `1440x1100`、手机 `390x844`、手机事件区、桌面事件区均无横向溢出、无 console warning/error、`user-select:none`、`publicRisk=false`；桌面事件队列 8 条可见且队列高度约 `56px`，手机可见 4 条。截图为 `/tmp/kzg-option-house-v152-desktop.png`、`/tmp/kzg-option-house-v152-mobile.png`、`/tmp/kzg-option-house-v152-mobile-events.png`、`/tmp/kzg-option-house-v152-desktop-events.png`。PNG 导出实际点击成功：`/tmp/kzg-option-house-v152-export.png`，建议文件名 `kzg-option-house-2026-05-22-zh.png`，大小 `1,482,138` bytes。
- Deploy: 已部署生产。生产站 `https://kzg-option-house.netlify.app/`；唯一部署 `https://6a15ae01b139b100d8816c5e--kzg-option-house.netlify.app/`。线上 smoke: `/` `200`，`/latest` `200`，`/r/latest.html` `200`，`/app.js` `200` 且 `UI_VERSION="1.52"`，`/data/index.json` `404`，`/assets/kzg-pack.js` `404`。线上手机 `390x844` 显示 `1.52 · 505/505 complete`，事件队列 4 条可见，无横向溢出、无 console issue、无公开风险词。
- 下一步: v1.53 应把事件队列接入权限安全边界：latest-day public、history blurred、paid-derived 三层都用同一 event shape；继续不接真实 key。

English:

- Change: Public Web UI moved from `1.51` to `1.52`. This round does not use a real Massive key, connect a real backend, or upgrade any plan. It turns the v1.51 live-feed silhouette into a derived event queue. `public/app.js` adds `derivedFeedEvents()` and `liveEventQueue()`, generating safe events from existing minute aggregates, symbol rotation, premium change, CP slope, and 30-minute buckets: burst, premium, CP slope, defense, cooling, and rhythm. Events contain symbol, time, kind, tone, score, short explanation, and derived metrics only; they do not contain raw contract payloads, API routes, provider names, real keys, or prices. `public/styles.css` adds `.live-event-queue`, an eight-cell short event tape on desktop and a two-column short tape on phones with rows after the fourth hidden. A new internal document, `docs/REALTIME_FEED_SCHEMA.md`, defines the shared event shape for Web, future backend, and iOS.
- Reason: Fangbao wants a real flow experience similar to OptionStrat, but keys and real feeds must not be placed on the public page. v1.52 establishes the product language and data contract first: users see KZG-interpreted event rhythm, and a future backend can replace the source while Web and iOS keep the same shape.
- Public boundary: The public page still does not show a Massive provider, API key, plan name, `$199`, pricing, payment, billing, Stripe, wallet, WeChat, domain candidate, checkout, registration, or legal assumption. The event queue is derived signal display, not raw OPRA redistribution.
- Verification: `node --check public/app.js` passed; `python3 scripts/build_payload.py` produced a `505`-day payload, latest date `2026-05-22`, analytics symbols `98`, pack asset `kzg-frame-bfd6858cf066.js`; `python3 scripts/per_day_to_dist.py` returned `copied=505`. Risk scan over `public` and `dist` returned 0. Local Playwright verified desktop `1440x1100`, phone `390x844`, phone event area, and desktop event area with no horizontal overflow, no console warning/error, `user-select:none`, and `publicRisk=false`; desktop shows 8 visible event cards with queue height about `56px`, and phone shows 4. Screenshots are `/tmp/kzg-option-house-v152-desktop.png`, `/tmp/kzg-option-house-v152-mobile.png`, `/tmp/kzg-option-house-v152-mobile-events.png`, and `/tmp/kzg-option-house-v152-desktop-events.png`. PNG export clicked successfully: `/tmp/kzg-option-house-v152-export.png`, suggested filename `kzg-option-house-2026-05-22-zh.png`, size `1,482,138` bytes.
- Deploy: Deployed to production. Production site `https://kzg-option-house.netlify.app/`; unique deploy `https://6a15ae01b139b100d8816c5e--kzg-option-house.netlify.app/`. Live smoke: `/` `200`, `/latest` `200`, `/r/latest.html` `200`, `/app.js` `200` with `UI_VERSION="1.52"`, `/data/index.json` `404`, and `/assets/kzg-pack.js` `404`. Live phone `390x844` shows `1.52 · 505/505 complete`, 4 visible event cards, no horizontal overflow, no console issue, and no public-risk text.
- Next: v1.53 should connect the event queue to an entitlement-safe boundary: latest-day public, history blurred, and paid-derived all using the same event shape, still without a real key.

## v1.51 - 2026-05-26 22:07 Asia/Shanghai - Massive real-time architecture and live-feed silhouette pass

中文:

- 改动: 公开 Web UI 从 `1.50` 提到 `1.51`。公开代码只做实时流轮廓的视觉强化：`public/styles.css` 追加 v1.51 层，让 `live-silhouette` 更像真实 feed terminal 的模糊影子：左侧细纵线、轻微扫描底纹、stream 行内压力点、暗色模式实时层对比、capability meter 胶片纹理。没有加入真实 Massive provider、API key、价格、支付、注册、域名或内部商业路线。`docs/MASSIVE_REALTIME_PRODUCT_PLAN.md` 增补官方研究和真实架构：后端采集、精选合约池、派生信号、权限分发、Business/商业授权确认、API key 轮换、1000 用户压力模型。`docs/PLUGIN_SERVICE_STATUS.md`、`docs/DENSE_VERSIONING.md`、`docs/HANDOFF_FOR_OTHER_CODEX.md` 和 Apple Notes 交接日志同步更新。
- 原因: Fangbao 明确指出 Massive `$199/month` Options Advanced 的关键不是语言描述，而是实时 trades、quotes、WebSocket、snapshot、Greeks/IV、OI、flat files 等能力能不能变成像 OptionStrat 一样有真实流动感的产品。研究后的结论是：个人套餐可以做 owner 研究和内部原型，但不能默认支持付费公众 SaaS 的 OPRA 实时数据再分发；公开站现在只能展示安全的能力轮廓，真实实时 feed 必须以后端持有 key、合规授权和权限层来做。
- 官方研究: Massive 官方 Options 页面列出 Options Advanced `$199/month` 包含 real-time data、5+ years、WebSockets、snapshots、second aggregates、trades、quotes、Greeks/IV、daily open interest、flat files 等；Options REST overview 写明 snapshot 可返回 IV、open interest、Greeks、last quote/trade；Options WebSocket docs 写明 trades 是 tick-level，quotes 是 bid/ask/size stream，且 quote WebSocket 每连接最多订阅 1000 个 option contracts；WebSocket quickstart 写明默认每个 asset class 一个并发连接，更多需要 support；Market Data Terms 写明个人市场数据是 personal/non-business/non-commercial，不得未经书面同意构建给其他终端用户使用的应用或再分发/销售/展示派生作品。
- 产品结论: 不让 1000 个用户浏览器直连 Massive，不把 API key 放进浏览器或 iOS app。正确路径是：一个或少数受控后端连接采集 Massive -> 选定 100-500 个 underlying 和精选合约 -> 生成 KZG 自有的 burst、imbalance、rotation、premium pressure、quote pressure、alert queue -> 缓存紧凑快照 -> 前端和 iOS 只拿派生信号与模糊预览。真实商业销售前必须确认 Massive Business/OPRA 展示和再分发权限。
- 公开边界: 本轮明确记录截图里的 Massive API key 已暴露但未使用、未写入文件、未提交 Git、未进入公开页。公开页没有出现真实 API key、provider 计划、`$199` 价格、pricing、payment、billing、Stripe、wallet、WeChat、domain candidate、checkout、registration 方案。公开页可出现的只有“实时流轮廓 / Live feed silhouette”这种能力暗示。
- 验证: `node --check public/app.js` 通过；`python3 scripts/build_payload.py` 生成 `505` 天 payload，最新日 `2026-05-22`，analytics symbols `98`，pack asset `kzg-frame-8c3b708705de.js`；`python3 scripts/per_day_to_dist.py` 返回 `copied=505`。公开 source/dist 风险词扫描为 0。Browser 打开本地 `http://127.0.0.1:4181/`，确认页面标题、`UI_VERSION 1.51`、实时流轮廓可见、console warning/error 为 0，并保存截图 `/tmp/kzg-option-house-v151-browser-desktop.png`。Playwright 验证桌面 `1440x1100`、手机 `390x844`、手机实时流区域：`docOverflowX=0`、`bodyOverflowX=0`、`user-select:none`、`publicRisk=false`、console issue 为 0；截图为 `/tmp/kzg-option-house-v151-desktop.png`、`/tmp/kzg-option-house-v151-mobile.png`、`/tmp/kzg-option-house-v151-mobile-live.png`。PNG 导出实际点击成功，文件 `/tmp/kzg-option-house-v151-export.png`，建议文件名 `kzg-option-house-2026-05-22-zh.png`，大小 `1,482,138` bytes。v1.51 不部署生产，生产仍为 v1.49。下一步 v1.52 应做内部 mock feed adapter/schema，不接真实 key；v1.55 才是下一次默认 iOS 同步点。

English:

- Change: Public Web UI moved from `1.50` to `1.51`. Public code only strengthens the live-feed silhouette: `public/styles.css` adds a v1.51 layer so `live-silhouette` feels more like the blurred shadow of a live feed terminal, with a slim left status line, scan texture, inline pressure dots, stronger dark-mode contrast, and film-strip texture in the capability meter. It does not add a real Massive provider, API key, price, payment, registration, domain, or internal commercial route. `docs/MASSIVE_REALTIME_PRODUCT_PLAN.md` now carries the official research and real architecture: backend ingestion, curated contract universe, derived signals, entitlement fanout, Business/commercial authorization confirmation, API-key rotation, and the 1,000-user pressure model. `docs/PLUGIN_SERVICE_STATUS.md`, `docs/DENSE_VERSIONING.md`, `docs/HANDOFF_FOR_OTHER_CODEX.md`, and Apple Notes are updated for handoff.
- Reason: Fangbao clarified that the Massive `$199/month` Options Advanced value is not copywriting; it is whether real-time trades, quotes, WebSockets, snapshots, Greeks/IV, OI, and flat files can become a product with real feed motion similar to OptionStrat. The research conclusion is that an individual plan can power owner research and internal prototypes, but must not be assumed to authorize a paid public OPRA real-time redistribution SaaS. The public site can only show a safe capability silhouette today; the real live feed needs backend-held keys, legal entitlement, and a paid-access layer.
- Official research: Massive's official Options page lists Options Advanced at `$199/month` with real-time data, 5+ years, WebSockets, snapshots, second aggregates, trades, quotes, Greeks/IV, daily open interest, flat files, and more. Options REST overview says snapshots can return IV, open interest, Greeks, latest quote, and latest trade. Options WebSocket docs describe tick-level trades and bid/ask/size quote streams, and quote WebSocket subscriptions are capped at 1,000 contracts per connection. WebSocket quickstart says the default is one concurrent WebSocket connection per asset class, with additional simultaneous connections requiring support. Market Data Terms say individual market data is personal, non-business, and non-commercial, and cannot be used to build an end-user application or redistribute/sell/display derived works without written consent.
- Product conclusion: Do not let 1,000 browsers connect directly to Massive, and do not put the API key in the browser or iOS app. Correct path: one or a few controlled backend connections ingest Massive -> curate 100-500 underlyings and selected contracts -> compute KZG-owned burst, imbalance, rotation, premium pressure, quote pressure, and alert queue -> cache compact snapshots -> frontend and iOS receive only derived signals and blurred previews. Before real commercial sale, confirm Massive Business/OPRA display and redistribution rights.
- Public boundary: This round records that Massive API keys were visible in Fangbao's screenshot but were not used, not written to files, not committed, and not put on the public page. The public page does not contain a real API key, provider plan, `$199` price, pricing, payment, billing, Stripe, wallet, WeChat, domain candidate, checkout, or registration plan. The only public concept is the safe `Live feed silhouette`.
- Verification: `node --check public/app.js` passed; `python3 scripts/build_payload.py` produced a `505`-day payload, latest date `2026-05-22`, analytics symbols `98`, pack asset `kzg-frame-8c3b708705de.js`; `python3 scripts/per_day_to_dist.py` returned `copied=505`. Public source/dist risk scan returned 0. Browser opened local `http://127.0.0.1:4181/`, confirmed page title, `UI_VERSION 1.51`, visible live-feed silhouette, and 0 console warnings/errors, then saved `/tmp/kzg-option-house-v151-browser-desktop.png`. Playwright verified desktop `1440x1100`, phone `390x844`, and phone live-feed area with `docOverflowX=0`, `bodyOverflowX=0`, `user-select:none`, `publicRisk=false`, and 0 console issues; screenshots are `/tmp/kzg-option-house-v151-desktop.png`, `/tmp/kzg-option-house-v151-mobile.png`, and `/tmp/kzg-option-house-v151-mobile-live.png`. PNG export was clicked successfully: `/tmp/kzg-option-house-v151-export.png`, suggested filename `kzg-option-house-2026-05-22-zh.png`, size `1,482,138` bytes. v1.51 is not deployed to production, so production remains v1.49. Next v1.52 should create an internal mock feed adapter/schema without real keys; v1.55 is the next default iOS sync point.

## v1.50 - 2026-05-26 21:54 Asia/Shanghai - phone first-screen and iOS 0.4 checkpoint

中文:

- 改动: 公开 Web UI 从 `1.49` 提到 `1.50`。本轮不部署生产，是 v1.49 生产后的第一个本地稠密 checkpoint。`public/styles.css` 追加 v1.50 层：手机端继续压缩从顶栏、时间轴、指标 rail、今日读盘总线到日报画布入口的纵向距离；日报画布入口从手机首屏内更早出现，section heading、卡片圆角、report-stage padding 和暗色模式 panel 统一。修复一个 v1.50 验证中发现的手机问题：侧栏摘要在滚动到高级预览时因后续样式重设 `max-height` 而形成残影重叠；现在手机端 `.side-rail` 明确 `max-height:none`，高级预览不再被前一段内容压住。同步 iOS companion 到 `0.4`：SwiftUI 主栈 spacing、header、checkpoint strip、timeline、rotation quadrant、symbol chips、KZGCard 和 MetricTile 全部做一次小屏密度收紧，checkpoint 显示 Web `1.50` / iOS `0.4` / PNG `KZG`。
- 原因: Fangbao 明确要求手机端、网页版和 iOS 端继续提高 spacing/calligraphy；同时 iOS 默认每 5 个 Web 版本同步一次，Web `1.50` 正好是 `1.45` 之后的自然检查点。v1.50 不新增支付、域名、API、注册、价格或内部商业路线，只做公开体验和 iOS companion。
- 视觉影响: 桌面 `1440x1100` 稳定：topbar `69px`、timeboard `137px`、metric rail `91px`、report stage `1322px`、advanced preview `1782px`、rotation `816px`、momentum `587px`，`overflowX=0`。手机 `390x844`：topbar `91px`、timeboard `90px`、metric rail `113px`、session tape `141px`、access strip `54px`、日报画布入口 `y=507`，report stage `765px`，side rail `1506px`，advanced preview `2638px`，rotation `774px`，momentum `794px`，`overflowX=0`。高级预览滚动截屏中 `sidePremiumOverlap=false`，修复了侧栏残影覆盖高级预览的问题。
- 公开边界: source 与 dist 风险词扫描为 0。公开页没有支付、域名、API key、Massive plan、注册、Stripe、钱包、微信支付或内部商业方案文案；仍只展示用户可读的市场数据、免费当日洞察、模糊高级预览与 PNG 输出边界。
- 验证: `node --check public/app.js` 通过；`python3 scripts/build_payload.py` 生成 `505` 天 payload，最新日 `2026-05-22`，analytics symbols `98`，pack asset `kzg-frame-b4e896d3b7a1.js`；`python3 scripts/per_day_to_dist.py` 复制 `505` 个 report。Playwright/Chrome 本地验证桌面、手机首屏、手机日报画布入口、手机高级预览浅色、手机高级预览暗色均无横向溢出、无 console warning/error、无公开风险词、`user-select:none`。PNG 导出实际点击成功，文件 `/tmp/kzg-option-house-v150-export.png`，建议文件名 `kzg-option-house-2026-05-22-zh.png`，大小 `1,482,138` bytes。XcodeBuildMCP 读取到正确 profile `kzg-option-house-ios`、project、scheme 和 simulator id，但 `build_sim` 仍因本机 simulator destination 不匹配失败；fallback `xcrun --sdk iphonesimulator swiftc -typecheck ios/KZGOptionHouse/KZGOptionHouse/*.swift -target arm64-apple-ios17.0-simulator` 通过。Apple Notes 置顶 `CHANGLOG 期权终端` 已同步，正文约 `103,830` chars。截图证据：`/tmp/kzg-option-house-v150-desktop.png`、`/tmp/kzg-option-house-v150-mobile.png`、`/tmp/kzg-option-house-v150-mobile-report-entry.png`、`/tmp/kzg-option-house-v150-mobile-premium-light.png`、`/tmp/kzg-option-house-v150-mobile-dark.png`。
- 部署: 未部署生产。生产仍为 v1.49，生产站 `https://kzg-option-house.netlify.app/`，唯一部署 `https://6a15a0b9761b0a09fe20d22b--kzg-option-house.netlify.app/`。
- 下一步: v1.51 继续做手机端 side-rail 长度、日报画布下方 digest 到高级预览之间的节奏、暗色模式下高级预览灰层的质感，以及 iOS 0.4 的真实模拟器 destination 阻塞复核。下一次常规生产部署默认等 v1.52-v1.54 形成一组稳定版本后再决定，除非出现公开风险修复。

English:

- Change: Public Web UI moved from `1.49` to `1.50`. This is a local dense checkpoint after the v1.49 production deploy, not a production deploy. `public/styles.css` adds a v1.50 layer: on phone, the vertical distance from topbar, timeline, metric rail, read bus, and access strip into the report canvas is compressed; the report canvas enters earlier in the first phone scroll; section headings, card radius, report-stage padding, and dark-mode panel surfaces are made more unified. A validation-found mobile issue was fixed: side-rail content could visually overlap the advanced preview because later CSS restored `max-height`; phone `.side-rail` now explicitly uses `max-height:none`, so the advanced preview is no longer covered by previous content. iOS companion is synced to `0.4`: SwiftUI stack spacing, header, checkpoint strip, timeline, rotation quadrant, symbol chips, KZGCard, and MetricTile are tightened for phone reading, with checkpoint tiles now showing Web `1.50`, iOS `0.4`, PNG `KZG`.
- Reason: Fangbao asked for continued spacing/calligraphy improvement across mobile web, desktop web, and iOS. iOS also updates every 5 Web versions by default, and Web `1.50` is the natural checkpoint after `1.45`. v1.50 adds no payment, domain, API, registration, price, or internal commercial route; it is public experience and iOS companion work only.
- Visual impact: Desktop `1440x1100` is stable: topbar `69px`, timeboard `137px`, metric rail `91px`, report stage `1322px`, advanced preview `1782px`, rotation `816px`, momentum `587px`, `overflowX=0`. Phone `390x844`: topbar `91px`, timeboard `90px`, metric rail `113px`, session tape `141px`, access strip `54px`, report canvas entry at `y=507`, report stage `765px`, side rail `1506px`, advanced preview `2638px`, rotation `774px`, momentum `794px`, `overflowX=0`. Advanced-preview scroll checks show `sidePremiumOverlap=false`, confirming the side-rail overlap was fixed.
- Public boundary: Source and dist risk scans returned 0. The public page contains no payment, domain, API key, Massive plan, registration, Stripe, wallet, WeChat Pay, or internal commercial-planning text. It continues to show only user-readable market data, latest-day free insight, blurred advanced previews, and PNG export boundaries.
- Verification: `node --check public/app.js` passed; `python3 scripts/build_payload.py` produced a `505`-day payload, latest date `2026-05-22`, analytics symbols `98`, pack asset `kzg-frame-b4e896d3b7a1.js`; `python3 scripts/per_day_to_dist.py` copied `505` reports. Playwright/Chrome local checks for desktop, phone first screen, phone report entry, phone advanced-preview light, and phone advanced-preview dark all had no horizontal overflow, no console warnings/errors, no public-risk strings, and `user-select:none`. PNG export was clicked successfully: `/tmp/kzg-option-house-v150-export.png`, suggested filename `kzg-option-house-2026-05-22-zh.png`, size `1,482,138` bytes. XcodeBuildMCP found the correct `kzg-option-house-ios` profile, project, scheme, and simulator id, but `build_sim` still fails because the local simulator destination cannot be matched. Fallback `xcrun --sdk iphonesimulator swiftc -typecheck ios/KZGOptionHouse/KZGOptionHouse/*.swift -target arm64-apple-ios17.0-simulator` passed. Pinned Apple Notes `CHANGLOG 期权终端` was synced at about `103,830` chars. Screenshot evidence: `/tmp/kzg-option-house-v150-desktop.png`, `/tmp/kzg-option-house-v150-mobile.png`, `/tmp/kzg-option-house-v150-mobile-report-entry.png`, `/tmp/kzg-option-house-v150-mobile-premium-light.png`, `/tmp/kzg-option-house-v150-mobile-dark.png`.
- Deploy: Not deployed to production. Production remains v1.49 at `https://kzg-option-house.netlify.app/`, unique deploy `https://6a15a0b9761b0a09fe20d22b--kzg-option-house.netlify.app/`.
- Next: v1.51 should keep improving phone side-rail length, the rhythm from digest into advanced preview, dark-mode gray-layer quality inside the advanced preview, and the iOS 0.4 simulator destination blocker. The next normal production deploy should wait until roughly v1.52-v1.54 unless a public-risk fix appears.

## v1.49 - 2026-05-26 21:32 Asia/Shanghai - production transition and dark contrast pass

中文:

- 改动: 公开 Web UI 从 `1.48` 提到 `1.49`，并把 v1.45 之后第 4 个稳定组部署到生产。`public/styles.css` 追加 v1.49 层：桌面端压缩 lower analysis 的局部 gap，让 trend/regime/bucket/rotation/momentum 的密度更一致；手机端把高级预览尾部、premium quadrant 和 rotation panel 的过渡线再收紧，轮动象限图降噪，quadrant flow 改成短双列；暗色模式下加强 `live-silhouette`、stream、rotation lane、rotation row 的边框和底色对比。
- 原因: v1.48 已经把实时流轮廓压短，但手机从高级预览滑到轮动区域时仍需要更统一，暗色模式也需要让 live/rotation 看起来不是同一层灰。v1.49 只做公开体验质量，不加入支付、域名、API、注册、价格、Stripe、钱包、微信支付、Massive plan 或任何内部商业方案。
- 视觉影响: 桌面 `1440x1100` 显示 v1.49，topbar `69px`，高级预览 `1782px`，rotation `816px`，momentum `587px`，`overflowX=0`。手机 `390x844` 显示 v1.49，topbar `91px`，高级预览 `2638px`，rotation `776px`，momentum `794px`，live silhouette `308px`，visible rotation rows `12`，visible momentum rows `10`，`overflowX=0`。暗色模式下 live 背景为更深的双段 gradient，stream border 为 `rgba(238,232,218,0.15)`，rotation lane 背景为轻透明暖灰。
- 公开边界: source、dist 和线上浏览器文本风险扫描为 0。公开页没有商业/付款/域名/账号接入方案；`$29.4B` 等只属于市场权利金数据，不作为商业定价。
- 验证: `node --check public/app.js` 通过；`python3 scripts/build_payload.py` 生成 `505` 天 payload，最新日 `2026-05-22`，analytics symbols `98`，pack asset `kzg-frame-98f993776851.js`；`python3 scripts/per_day_to_dist.py` 复制 `505` 个 report。内置 Browser 打开本地页确认 v1.49、最新日、`user-select:none`、无内部风险词；Browser 截图能力仍超时，Playwright 提供截图证明。Playwright/Chrome 本地桌面和手机无横向溢出、无 console warn/error、PNG 导出实际点击成功，文件 `/tmp/kzg-option-house-v149-export.png`，建议文件名 `kzg-option-house-2026-05-22-zh.png`，大小 `1,482,138` bytes。Apple Notes 置顶 `CHANGLOG 期权终端` 已同步，正文约 `97,412` chars。截图证据：`/tmp/kzg-option-house-v149-desktop.png`、`/tmp/kzg-option-house-v149-mobile.png`、`/tmp/kzg-option-house-v149-mobile-transition.png`、`/tmp/kzg-option-house-v149-mobile-dark.png`。
- 部署: 已部署生产。生产站 `https://kzg-option-house.netlify.app/`；唯一部署 `https://6a15a0b9761b0a09fe20d22b--kzg-option-house.netlify.app/`。线上 smoke: `/` `200`、`/r/latest.html` `200`、`/latest` `200`、`/data/index.json` `404`、`/assets/kzg-pack.js` `404`、线上 `/app.js` 显示 `UI_VERSION="1.49"`，线上手机 `390x844` 无横向溢出、无公开风险词、无 console issue。
- 下一步: v1.50 是默认 iOS companion cadence checkpoint。下一轮优先做手机首屏到日报画布之间的纵向扫读、暗色模式中的历史/轮动/动量统一，以及 iOS 0.4 小同步；继续不把内部商业机制写进公开站。

English:

- Change: Public Web UI moved from `1.48` to `1.49`, and the fourth stable group after production v1.45 was deployed. `public/styles.css` adds a v1.49 layer: desktop lower analysis gets tighter local gaps so trend/regime/bucket/rotation/momentum density is more consistent; phone transition from the advanced-preview tail into premium quadrant and rotation is tightened; the rotation quadrant is quieter; quadrant flow becomes short two-column rows; dark mode gets stronger contrast for `live-silhouette`, stream, rotation lane, and rotation row surfaces.
- Reason: v1.48 shortened the live-feed silhouette, but the phone transition from advanced preview into rotation still needed more unity, and dark mode needed live/rotation to read as layered surfaces rather than one gray mass. v1.49 is public experience quality only. It adds no payment, domain, API, registration, price, Stripe, wallet, WeChat Pay, Massive plan, or internal commercial route.
- Visual impact: Desktop `1440x1100` shows v1.49 with topbar `69px`, advanced preview `1782px`, rotation `816px`, momentum `587px`, and `overflowX=0`. Phone `390x844` shows v1.49 with topbar `91px`, advanced preview `2638px`, rotation `776px`, momentum `794px`, live silhouette `308px`, visible rotation rows `12`, visible momentum rows `10`, and `overflowX=0`. In dark mode, the live background is a deeper two-stop gradient, stream border is `rgba(238,232,218,0.15)`, and rotation lane background is a light translucent warm gray.
- Public boundary: Source, dist, and live browser text risk scans returned 0. The public page contains no commercial/payment/domain/account access mechanics; values such as `$29.4B` are market premium-notional data, not commercial pricing.
- Verification: `node --check public/app.js` passed; `python3 scripts/build_payload.py` produced a `505`-day payload, latest date `2026-05-22`, analytics symbols `98`, pack asset `kzg-frame-98f993776851.js`; `python3 scripts/per_day_to_dist.py` copied `505` reports. In-app Browser opened the local page and confirmed v1.49, latest date, `user-select:none`, and no internal risk strings. Browser screenshot capture still timed out, so Playwright supplied screenshot proof. Local Playwright/Chrome desktop and phone had no horizontal overflow, no console warnings/errors, and PNG export was clicked successfully: `/tmp/kzg-option-house-v149-export.png`, suggested filename `kzg-option-house-2026-05-22-zh.png`, size `1,482,138` bytes. Pinned Apple Notes `CHANGLOG 期权终端` was synced at about `97,412` chars. Screenshot evidence: `/tmp/kzg-option-house-v149-desktop.png`, `/tmp/kzg-option-house-v149-mobile.png`, `/tmp/kzg-option-house-v149-mobile-transition.png`, `/tmp/kzg-option-house-v149-mobile-dark.png`.
- Deploy: Production deployed. Production site `https://kzg-option-house.netlify.app/`; unique deploy `https://6a15a0b9761b0a09fe20d22b--kzg-option-house.netlify.app/`. Live smoke: `/` `200`, `/r/latest.html` `200`, `/latest` `200`, `/data/index.json` `404`, `/assets/kzg-pack.js` `404`, live `/app.js` shows `UI_VERSION="1.49"`, and live phone `390x844` has no horizontal overflow, no public-risk strings, and no console issues.
- Next: v1.50 is the default iOS companion cadence checkpoint. Next round should prioritize phone vertical scanning from first viewport into the report canvas, dark-mode unity across history/rotation/momentum, and a small iOS 0.4 sync, while keeping internal commercial mechanics off the public site.

## v1.48 - 2026-05-26 21:17 Asia/Shanghai - live silhouette and lower desktop rhythm compression

中文:

- 改动: 公开 Web UI 从 `1.47` 提到 `1.48`。本轮不部署生产，继续做 spacing/calligraphy 的细节迭代。`public/styles.css` 追加 v1.48 样式层：桌面 `1181px+` 下把 analysis grid 的行列间距略收紧，trend、signal、regime、heatmap、bucket、rotation、momentum 的 panel padding 统一为 `13px`，rotation panel 微微上提，使 trend 到 rotation 的阅读流更像一个连续终端。高级预览里的实时流轮廓在桌面变成更紧的三列，stream 行高从约 `31px` 降到 `27px`。手机端把 premium summary cards 重新压成两列短卡，隐藏次级说明；`.live-silhouette` 的 lead 压成 `32px` 短标题条，lanes 变成两列指标，stream 只显示前 7 条有效压力行，行高约 `19px`，并将 quadrant map 降到 `132px`。
- 原因: v1.47 压掉了高级入口和动量尾巴，但实时流轮廓仍然像一个独立长卡，不够像“强功能被 blur 后仍能感受到威力”的产品轮廓。v1.48 不改数据、不改 PNG、不加入商业入口，只把这块改成更短、更像 feed terminal 的信号带。
- 视觉影响: 桌面 `1440x1100` 下高级预览从 `1828px` 降到 `1782px`，live silhouette `301px`，rotation `816px`，momentum `587px`，`docOverflowX=0`、`bodyOverflowX=0`。手机 `390x844` 下高级预览从 `2780px` 降到 `2686px`，live silhouette `308px`，live lead `32px`，visible live rows `7`，visible momentum rows 仍为 `10`，无横向溢出。
- 公开边界: 没有加入支付、域名、API、注册、价格、Stripe、钱包、微信支付、Massive plan 或任何内部商业规划公开文案。source 与 dist 风险词扫描为 0；浏览器文本检查中 `$29.4B`、`$49.6B` 这类权利金数据不是商业价格，专门排除后商业风险词为 0。
- 验证: `node --check public/app.js` 通过；build 生成 `505` 天 payload，最新日 `2026-05-22`，analytics symbols `98`，pack asset `kzg-frame-001c1dbd17f4.js`；`per_day_to_dist` 复制 `505` 个 report；内置 Browser 打开本地页面确认 v1.48、页面无 framework overlay、theme toggle 可从 light 切到 dark、`user-select:none`、无 console warn/error，Browser 截图能力本轮超时一次，已由 Playwright 截图兜底。Playwright/Chrome 验证桌面和手机均 `docOverflowX=0`、`bodyOverflowX=0`、无商业风险词；PNG 导出实际点击成功，文件 `/tmp/kzg-option-house-v148-export.png`，建议文件名 `kzg-option-house-2026-05-22-zh.png`，大小 `1,482,138` bytes。Apple Notes 置顶 `CHANGLOG 期权终端` 已同步，正文约 `90,395` chars。截图证据：`/tmp/kzg-option-house-v148-desktop.png`、`/tmp/kzg-option-house-v148-mobile.png`、`/tmp/kzg-option-house-v148-mobile-premium.png`、`/tmp/kzg-option-house-v148-mobile-live.png`。
- 部署: 未部署生产。生产仍为 v1.45，生产站 `https://kzg-option-house.netlify.app/`，唯一部署 `https://6a15912a59bdd5425440cdb1--kzg-option-house.netlify.app/`。
- 下一步: v1.49 继续检查手机高级预览尾部到轮动面板的过渡、暗色模式下 live silhouette/rotation 的对比，以及桌面 lower analysis 的信息密度。下一次常规生产部署默认等 v1.49-v1.50 再决定是否推生产。

English:

- Change: Moved public Web UI from `1.47` to `1.48`. This round is not deployed to production and continues spacing/calligraphy refinement. `public/styles.css` adds a v1.48 layer: on desktop `1181px+`, the analysis grid gets slightly tighter row/column gaps, trend/signal/regime/heatmap/bucket/rotation/momentum panels share `13px` padding, and rotation is nudged upward so the transition from trend into rotation reads as one continuous terminal. Inside the advanced preview, the live-feed silhouette becomes a tighter three-column desktop strip and stream row height drops from about `31px` to `27px`. On phone, premium summary cards compress into two short columns with secondary copy hidden; `.live-silhouette` lead becomes a `32px` title strip, lanes become two-column metrics, stream shows the first 7 effective pressure rows at about `19px` row height, and the quadrant map drops to `132px`.
- Reason: v1.47 reduced the advanced entry and momentum tail, but the live silhouette still felt like a separate long card rather than a powerful blurred product preview. v1.48 changes no data, no PNG behavior, and no commercial entry; it only turns that area into a shorter feed-terminal signal strip.
- Visual impact: On desktop `1440x1100`, advanced preview drops from `1828px` to `1782px`, live silhouette is `301px`, rotation `816px`, momentum `587px`, with `docOverflowX=0` and `bodyOverflowX=0`. On phone `390x844`, advanced preview drops from `2780px` to `2686px`, live silhouette is `308px`, live lead `32px`, visible live rows `7`, visible momentum rows remain `10`, and there is no horizontal overflow.
- Public boundary: No payment, domain, API, registration, price, Stripe, wallet, WeChat Pay, Massive plan, or internal commercial-planning copy was added. Source and dist risk scans returned 0; browser text saw data values such as `$29.4B` and `$49.6B`, which are premium-notional market data rather than commercial pricing, and after excluding those data amounts, commercial risk hits were 0.
- Verification: `node --check public/app.js` passed; build produced a `505`-day payload, latest date `2026-05-22`, analytics symbols `98`, pack asset `kzg-frame-001c1dbd17f4.js`; `per_day_to_dist` copied `505` reports; in-app Browser opened the local page and confirmed v1.48, no framework overlay, theme toggle from light to dark, `user-select:none`, and no console warnings/errors. Browser screenshot capture timed out once, so Playwright supplied screenshot proof. Playwright/Chrome verified desktop and phone with `docOverflowX=0`, `bodyOverflowX=0`, and no commercial-risk strings; PNG export was clicked successfully: `/tmp/kzg-option-house-v148-export.png`, suggested filename `kzg-option-house-2026-05-22-zh.png`, size `1,482,138` bytes. Pinned Apple Notes `CHANGLOG 期权终端` was synced at about `90,395` chars. Screenshot evidence: `/tmp/kzg-option-house-v148-desktop.png`, `/tmp/kzg-option-house-v148-mobile.png`, `/tmp/kzg-option-house-v148-mobile-premium.png`, `/tmp/kzg-option-house-v148-mobile-live.png`.
- Deploy: Not deployed to production. Production remains v1.45 at `https://kzg-option-house.netlify.app/`, unique deploy `https://6a15912a59bdd5425440cdb1--kzg-option-house.netlify.app/`.
- Next: v1.49 should inspect the phone transition from advanced-preview tail into rotation, dark-mode contrast for live silhouette/rotation, and desktop lower-analysis density. The next normal production deploy should wait until v1.49-v1.50 before deciding.

## v1.47 - 2026-05-26 20:51 Asia/Shanghai - mobile advanced entry and momentum tail compression

中文:

- 改动: 公开 Web UI 从 `1.46` 提到 `1.47`。本轮不部署生产，继续专注手机端 spacing/calligraphy。`public/styles.css` 追加 v1.47 样式层：手机端高级预览入口的 capability lead 改成标题/主导标的同排的紧结构，说明压成两行；capability rails 从 `390px` 下的一列恢复为两列短指标，并隐藏次要 small 文案；capability meter 去掉底部日期标签，变成更短的量能条；高级功能地图的四个 tabs 改为一行四列短按钮，unlock mini tape 降高。动量面板里，标的短中长节奏改成左侧小 lead + 右侧三窗口卡的短结构，节奏带和三条小图高度降低，手机动量列表从 `12` 条可见压到 `10` 条可见。
- 原因: v1.46 解决了三段统一感，但手机高级预览入口仍然是最容易拖长页面的区域；动量面板尾部也还可以更像终端账本而不是长列表。v1.47 只压缩阅读路径，不改数据、不改 PNG、不加任何商业入口。
- 视觉影响: 桌面 `1440x1100` 不受影响：高级预览 `1828px`、rotation `814px`、momentum `585px`、`overflowX=0`。手机 `390x844` 下，高级预览从 v1.46 的约 `3204px` 降到 `2780px`，减少约 `424px`；momentum 从约 `967px` 降到 `794px`，减少约 `173px`；visible rotation rows 仍为 `12`，visible momentum rows 改为 `10`；topbar 仍为 `91px`。
- 公开边界: 没有加入支付、域名、API、注册、价格、Stripe、钱包、微信支付、Massive plan 或任何内部商业规划公开文案。source 与 dist 公开风险词扫描均为 0。
- 验证: `node --check public/app.js` 通过；build 生成 `505` 天 payload，最新日 `2026-05-22`，analytics symbols `98`，pack asset `kzg-frame-a8980441344c.js`；`per_day_to_dist` 复制 `505` 个 report；内置 Browser 打开本地页面确认 v1.47、KZG 内容可见、theme toggle 可从 light 切到 dark 再切回、`user-select:none`、无 console warn/error。Playwright/Chrome 验证桌面和手机均 `docOverflowX=0`、`bodyOverflowX=0`、无内部词泄露；PNG 导出实际点击成功，文件 `/tmp/kzg-option-house-v147-export.png`，建议文件名 `kzg-option-house-2026-05-22-zh.png`，大小 `1,482,138` bytes。截图证据：`/tmp/kzg-option-house-v147-desktop.png`、`/tmp/kzg-option-house-v147-mobile.png`、`/tmp/kzg-option-house-v147-mobile-premium.png`、`/tmp/kzg-option-house-v147-mobile-momentum.png`。
- 部署: 未部署生产。生产仍为 v1.45，生产站 `https://kzg-option-house.netlify.app/`，唯一部署 `https://6a15912a59bdd5425440cdb1--kzg-option-house.netlify.app/`。
- 下一步: v1.48 可以继续做桌面下半区的 trend -> rotation 过渡、手机高级预览内部 live silhouette 的高度、以及暗色模式的细节对比。下一次常规生产部署默认等 v1.48-v1.50 中形成一组稳定版本后再上线。

English:

- Change: Moved public Web UI from `1.46` to `1.47`. This round is not deployed to production and stays focused on phone spacing/calligraphy. `public/styles.css` adds a v1.47 layer: on phone, the advanced-preview capability lead becomes a compact title/leader row with copy clamped to two lines; capability rails return from one column to two short metric columns at `390px` and hide secondary small copy; the capability meter drops date labels and becomes a shorter energy strip; advanced feature tabs become one row of four short buttons; the unlock mini tape gets lower. In momentum, the short/mid/long symbol rhythm becomes a compact left lead plus three window cards, the rhythm tape and three mini charts shrink, and the visible phone momentum list moves from `12` rows to `10` rows.
- Reason: v1.46 unified the three lower sections, but the phone advanced-preview entry still carried too much height, and the momentum tail could still read like a long list instead of a terminal ledger. v1.47 compresses the reading path only; data, PNG export, and public commercial boundary remain unchanged.
- Visual impact: Desktop `1440x1100` is unchanged: advanced preview `1828px`, rotation `814px`, momentum `585px`, `overflowX=0`. On phone `390x844`, advanced preview drops from about `3204px` in v1.46 to `2780px`, down about `424px`; momentum drops from about `967px` to `794px`, down about `173px`; visible rotation rows remain `12`, visible momentum rows become `10`; topbar remains `91px`.
- Public boundary: No payment, domain, API, registration, price, Stripe, wallet, WeChat Pay, Massive plan, or internal commercial-planning copy was added. Source and dist public risk scans both returned 0.
- Verification: `node --check public/app.js` passed; build produced a `505`-day payload, latest date `2026-05-22`, analytics symbols `98`, pack asset `kzg-frame-a8980441344c.js`; `per_day_to_dist` copied `505` reports; in-app Browser opened the local page and confirmed v1.47, visible KZG content, theme toggle from light to dark and back, `user-select:none`, and no console warnings/errors. Playwright/Chrome verified desktop and phone with `docOverflowX=0`, `bodyOverflowX=0`, and no internal string leak; PNG export was clicked successfully: `/tmp/kzg-option-house-v147-export.png`, suggested filename `kzg-option-house-2026-05-22-zh.png`, size `1,482,138` bytes. Screenshot evidence: `/tmp/kzg-option-house-v147-desktop.png`, `/tmp/kzg-option-house-v147-mobile.png`, `/tmp/kzg-option-house-v147-mobile-premium.png`, `/tmp/kzg-option-house-v147-mobile-momentum.png`.
- Deploy: Not deployed to production. Production remains v1.45 at `https://kzg-option-house.netlify.app/`, unique deploy `https://6a15912a59bdd5425440cdb1--kzg-option-house.netlify.app/`.
- Next: v1.48 can continue desktop lower-page trend-to-rotation transition, phone live-silhouette height inside advanced preview, and dark-mode contrast details. The next normal production deploy should wait until the v1.48-v1.50 group is stable.

## v1.46 - 2026-05-26 20:34 Asia/Shanghai - mobile spine unity pass

中文:

- 改动: 公开 Web UI 从 `1.45` 提到 `1.46`。本轮不部署生产，专门处理 Fangbao 指出的手机端整体感：把“高级功能预览”、“标的轮动扩散”、“核心标的动量”三段在手机上接成一条连续读盘脊柱。`public/styles.css` 追加 v1.46 样式层：手机和窄屏下压缩 analysis grid 间距，给高级预览与轮动之间加入很轻的分隔线，统一三段标题区的下边界、圆角和卡片半径；手机端把高级预览内部卡片、历史回看、信号栈、轮动统计、动量摘要的 gap 和 radius 统一到更小尺度；轮动象限点进一步从 `38px` 上限缩到 `30px` 上限，降低阴影和透明度，减少左下角拥挤气泡的噪音。
- 原因: v1.45 已经把轮动/动量压成账本，但下半页仍可能像三个不同产品拼在一起。v1.46 不追求新增功能，而是让视觉哲学统一：标题、分隔、卡片密度、气泡尺度、读盘流向都靠近同一套终端语言。
- 视觉影响: 桌面 `1440x1100` 保持稳定：topbar `69px`、高级预览 `1828px`、rotation `814px`、momentum `585px`、`overflowX=0`。手机 `390x844` 显示 v1.46，topbar `91px`，高级预览约 `3204px`，rotation `781px`，momentum `967px`；可见轮动行 `12`、可见动量行 `12` 不回退；手机轮动象限点 CSS 上限为 `30px`，比 v1.45 更安静。
- 公开边界: 没有加入支付、域名、API、注册、价格、Stripe、钱包、微信支付、Massive plan 或任何内部商业规划公开文案。source 与 dist 公开风险词扫描均为 0。
- 验证: `node --check public/app.js` 通过；build 生成 `505` 天 payload，最新日 `2026-05-22`，analytics symbols `98`，pack asset `kzg-frame-779e2008ac11.js`；`per_day_to_dist` 复制 `505` 个 report；内置 Browser 打开本地页面并确认 v1.46、KZG 内容可见、`user-select:none`、无 console warn/error。Playwright/Chrome 验证桌面和手机均 `docOverflowX=0`、`bodyOverflowX=0`、无内部词泄露；PNG 导出实际点击成功，文件 `/tmp/kzg-option-house-v146-export.png`，建议文件名 `kzg-option-house-2026-05-22-zh.png`，大小 `1,482,138` bytes。截图证据：`/tmp/kzg-option-house-v146-desktop.png`、`/tmp/kzg-option-house-v146-mobile.png`、`/tmp/kzg-option-house-v146-mobile-rotation.png`、`/tmp/kzg-option-house-v146-mobile-momentum.png`。
- 部署: 未部署生产。生产仍为 v1.45，生产站 `https://kzg-option-house.netlify.app/`，唯一部署 `https://6a15912a59bdd5425440cdb1--kzg-option-house.netlify.app/`。
- 下一步: v1.47 继续做手机下半页细节，优先检查高级预览入口高度、轮动象限气泡密度、动量列表末端留白，以及桌面下半区从 trend 到 rotation 的阅读节奏。下一次常规生产部署默认等 v1.48-v1.50，除非出现公开风险修复。

English:

- Change: Moved public Web UI from `1.45` to `1.46`. This round is not deployed to production. It focuses on Fangbao's mobile unity concern: making `advanced preview`, `symbol rotation`, and `symbol momentum` read as one continuous analysis spine instead of three stitched-together products. `public/styles.css` adds a v1.46 layer: tighter analysis-grid spacing on phone/narrow screens, a very light connector line between advanced preview and rotation, unified heading boundaries, radius, and card treatment across the three sections. On phone, premium cards, lookback, signal stack, rotation stats, and momentum summary use a smaller shared gap/radius scale; rotation-quadrant dots shrink from the previous `38px` cap to `30px`, with softer shadow and opacity to reduce the noisy lower-left cluster.
- Reason: v1.45 made rotation and momentum more ledger-like, but the lower page could still feel like three separate products. v1.46 adds no new feature surface; it aligns the visual philosophy: headings, separators, card density, bubble scale, and reading flow now belong to one terminal language.
- Visual impact: Desktop `1440x1100` remains stable: topbar `69px`, advanced preview `1828px`, rotation `814px`, momentum `585px`, `overflowX=0`. Phone `390x844` shows v1.46 with topbar `91px`, advanced preview about `3204px`, rotation `781px`, and momentum `967px`; visible rotation rows stay at `12`, visible momentum rows stay at `12`; mobile rotation dots are capped at `30px`, quieter than v1.45.
- Public boundary: No payment, domain, API, registration, price, Stripe, wallet, WeChat Pay, Massive plan, or internal commercial-planning copy was added. Source and dist public risk scans both returned 0.
- Verification: `node --check public/app.js` passed; build produced a `505`-day payload, latest date `2026-05-22`, analytics symbols `98`, pack asset `kzg-frame-779e2008ac11.js`; `per_day_to_dist` copied `505` reports; in-app Browser opened the local page and confirmed v1.46, visible KZG content, `user-select:none`, and no console warnings/errors. Playwright/Chrome verified desktop and phone with `docOverflowX=0`, `bodyOverflowX=0`, and no internal string leak; PNG export was clicked successfully: `/tmp/kzg-option-house-v146-export.png`, suggested filename `kzg-option-house-2026-05-22-zh.png`, size `1,482,138` bytes. Screenshot evidence: `/tmp/kzg-option-house-v146-desktop.png`, `/tmp/kzg-option-house-v146-mobile.png`, `/tmp/kzg-option-house-v146-mobile-rotation.png`, `/tmp/kzg-option-house-v146-mobile-momentum.png`.
- Deploy: Not deployed to production. Production remains v1.45 at `https://kzg-option-house.netlify.app/`, unique deploy `https://6a15912a59bdd5425440cdb1--kzg-option-house.netlify.app/`.
- Next: v1.47 should keep working on lower-phone details, especially advanced-preview entry height, rotation-quadrant dot density, momentum-list tail whitespace, and desktop reading rhythm from trend into rotation. The next normal production deploy should wait until v1.48-v1.50 unless a public-risk fix appears earlier.

## v1.45 - 2026-05-26 20:16 Asia/Shanghai - mobile ledger and iOS 0.3 sync

中文:

- 改动: 公开 Web UI 从 `1.44` 提到 `1.45`。本轮不部署生产，提前做下一轮密度迭代：新增 v1.45 手机样式层，把“标的轮动扩散”和“核心标的动量”在 `390px` 手机上压成更细的账本式阅读；轮动说明长句在手机隐藏，象限 lead 缩成两列短标识，象限气泡尺寸降低，轮动 lanes 每列只显示前 6 个有效行，动量队列只显示前 12 个有效行。同步 iOS companion 到 `0.3`：SwiftUI 主栈、Header、KZGCard、MetricTile、轮动象限和横向 symbol chip 全部减小 padding/spacing，checkpoint tile 改为 Web `1.45` / iOS `0.3` / PNG `KZG`。
- 原因: v1.44 已解决中等宽度顶栏和下半区松散问题，但手机端继续向下看时轮动/动量仍然像“大量按钮堆叠”。Fangbao 同时要求 iOS 每 5 个 Web 版本同步一次，并强调手机端体验要继续抬高，所以 `1.45` 是自然的 Web+iOS checkpoint。
- 视觉影响: 桌面 `1440x1100` 保持 v1.44 稳定结果：topbar `69px`、timeline `137px`、rotation `814px`、momentum `585px`、无横向溢出。手机 `390x844` 下 topbar `91px`、高级预览 `3163px` 不回退；轮动 panel `778px`，动量 panel `959px`；可见轮动行压成 `12` 条，可见动量行压成 `12` 条。iOS 端从 0.2 的松卡片间距改成更紧的 0.3 companion 节奏，仍保留原生 SwiftUI 和 KZG serif header。
- 公开边界: 没有加入支付、域名、API、注册、价格、Stripe、钱包、微信支付、Massive plan 或任何内部商业规划公开文案。公开风险词扫描 source 与 dist 均为 0。
- 验证: `node --check public/app.js` 通过；build 生成 `505` 天 payload，最新日 `2026-05-22`，analytics symbols `98`，pack asset `kzg-frame-83d3cae4a163.js`；`per_day_to_dist` 复制 `505` 个 report；XcodeBuildMCP 读取到正确工程/scheme/simulator profile，但 simulator destination 仍因本机 runtime/SDK 匹配问题失败，和已记录阻塞一致；随后 `xcrun --sdk iphonesimulator swiftc -typecheck ios/KZGOptionHouse/KZGOptionHouse/*.swift -target arm64-apple-ios17.0-simulator` 通过。Playwright/Chrome 本地验证桌面和手机均 `overflowX=0`、`user-select:none`、无 console error、无公开风险词；PNG 导出实际点击成功，保存 `/tmp/kzg-option-house-v145-export.png`，建议文件名 `kzg-option-house-2026-05-22-zh.png`，大小 `1,482,138` bytes。截图证据为 `/tmp/kzg-option-house-v145-desktop.png`、`/tmp/kzg-option-house-v145-mobile.png`、`/tmp/kzg-option-house-v145-mobile-rotation.png`。
- 部署: 已部署生产。生产站 `https://kzg-option-house.netlify.app/`；唯一部署 `https://6a15912a59bdd5425440cdb1--kzg-option-house.netlify.app/`；线上 smoke: `/` `200`、`/r/latest.html` `200`、`/latest` `200`、`/data/index.json` `404`、`/assets/kzg-pack.js` `404`、`/app.js` 显示 `UI_VERSION="1.45"`；线上手机 `390x844` 为 `overflowX=0`、无公开风险词泄露。
- 下一步: v1.46 继续做手机下半页的 visual unity，重点检查高级预览、轮动、动量三段之间的节奏衔接；下一次常规生产部署默认等 v1.48-v1.50，除非出现公开风险修复。

English:

- Change: Moved public Web UI from `1.44` to `1.45`. This round is not deployed to production. It starts the next density iteration early: a v1.45 mobile CSS layer turns `symbol rotation` and `symbol momentum` into slimmer ledger-like reading on `390px` phones; the long rotation narrative is hidden on phone, quadrant lead becomes a two-column short marker, quadrant dots shrink, each rotation lane shows the first 6 effective rows, and the momentum queue shows the first 12 effective rows. iOS companion is synced to `0.3`: SwiftUI main stack, Header, KZGCard, MetricTile, rotation quadrant, and horizontal symbol chips all use tighter padding/spacing; checkpoint tiles now read Web `1.45`, iOS `0.3`, PNG `KZG`.
- Reason: v1.44 fixed the mid-width topbar and looseness in lower panels, but the phone experience still felt like a large stack of buttons when reading rotation and momentum. Fangbao also requested iOS to sync every 5 Web versions and kept raising the phone-experience bar, so `1.45` is the natural Web+iOS checkpoint.
- Visual impact: Desktop `1440x1100` preserves the v1.44 stable result: topbar `69px`, timeline `137px`, rotation `814px`, momentum `585px`, no horizontal overflow. On `390x844` phone, topbar remains `91px` and advanced preview remains `3163px`; rotation panel is `778px`, momentum panel is `959px`; visible rotation rows are reduced to `12`, visible momentum rows to `12`. iOS moves from 0.2's looser card spacing to a tighter 0.3 companion rhythm while keeping native SwiftUI and the KZG serif header.
- Public boundary: No payment, domain, API, registration, price, Stripe, wallet, WeChat Pay, Massive plan, or internal commercial-planning copy was added. Source and dist public risk scans returned 0.
- Verification: `node --check public/app.js` passed; build produced a `505`-day payload, latest date `2026-05-22`, analytics symbols `98`, pack asset `kzg-frame-83d3cae4a163.js`; `per_day_to_dist` copied `505` reports; XcodeBuildMCP saw the correct project/scheme/simulator profile but simulator destination still fails because of the local runtime/SDK mismatch already documented; fallback `xcrun --sdk iphonesimulator swiftc -typecheck ios/KZGOptionHouse/KZGOptionHouse/*.swift -target arm64-apple-ios17.0-simulator` passed. Playwright/Chrome local verification confirmed desktop and phone `overflowX=0`, `user-select:none`, no console errors, and no public-risk strings; PNG export was clicked and saved to `/tmp/kzg-option-house-v145-export.png`, suggested filename `kzg-option-house-2026-05-22-zh.png`, size `1,482,138` bytes. Screenshot evidence: `/tmp/kzg-option-house-v145-desktop.png`, `/tmp/kzg-option-house-v145-mobile.png`, `/tmp/kzg-option-house-v145-mobile-rotation.png`.
- Deploy: Deployed to production. Production site `https://kzg-option-house.netlify.app/`; unique deploy `https://6a15912a59bdd5425440cdb1--kzg-option-house.netlify.app/`; live smoke: `/` `200`, `/r/latest.html` `200`, `/latest` `200`, `/data/index.json` `404`, `/assets/kzg-pack.js` `404`, `/app.js` shows `UI_VERSION="1.45"`; production phone `390x844` has `overflowX=0` and no public-risk string leak.
- Next: v1.46 should keep improving mobile lower-page visual unity, especially the transitions among advanced preview, rotation, and momentum. The next normal production deploy should be around v1.48-v1.50 unless a public-risk fix appears earlier.

## v1.44 - 2026-05-26 20:00 Asia/Shanghai - rotation and momentum fit pass

中文:

- 改动: 公开 Web UI 从 `1.43` 提到 `1.44`。本轮不部署生产，提前启动下一轮 update，继续处理手机端和中等宽度窗口的 spacing/calligraphy。新增 v1.44 样式层：桌面端压缩轮动象限图、轮动 lanes、核心标的聚焦卡、短中长节奏带和动量列表；手机端把轮动头部、说明、象限图、四格统计、升温/降温列表、标的聚焦、窗口卡和动量队列进一步压紧；同时补上 `521px -> 1080px` 的顶栏规则，让小窗口/iPad 宽度下工具按钮落到整齐第二行。
- 原因: v1.43 已压短高级预览，但下方“标的轮动扩散”和“核心标的动量”仍然是最容易拖长阅读节奏的地方；内置 Browser 默认中等宽度还暴露了顶栏按钮拥挤的问题。本轮目标是让中下半屏读起来更像连续终端，而不是表格和卡片一段段断开。
- 视觉影响: 桌面 `1440x1100` 下 topbar `69px`、rotation panel `814px`、momentum panel `585px`，无横向溢出。中等宽度约 `973px` 下顶栏变成 `105px` 双层结构，toolbar `937px` 全宽四等分，不再挤到边缘。手机 `390x844` 下保持 v1.42/v1.43 首屏成果：topbar `91px`、metric rail `201px`、日报画布入口 `y=766`、高级预览 `3163px`，同时下半区轮动/动量控件更密。
- 公开边界: 没有加入支付、域名、API、注册、价格、Stripe、钱包、微信支付、Massive plan 或任何内部商业规划公开文案。公开风险词扫描仍为 0。
- 验证: `node --check public/app.js` 通过；build 生成 `505` 天 payload，最新日 `2026-05-22`，analytics symbols `98`，pack asset `kzg-frame-af03d65ae13f.js`；`per_day_to_dist` 复制 `505` 个 report；内置 Browser 本地 smoke 确认 v1.44、无 console error、无横向溢出、`user-select:none`、无内部词泄露；Playwright/Chrome 截图验证 `1440x1100`、`973x547`、`390x844` 三个视口均 `overflowX=0`；PNG 导出实际点击成功，文件 `/tmp/kzg-option-house-v144-export.png`，文件名 `kzg-option-house-2026-05-22-zh.png`，大小 `1,482,138` bytes。截图证据为 `/tmp/kzg-option-house-v144-desktop.png`、`/tmp/kzg-option-house-v144-tablet.png`、`/tmp/kzg-option-house-v144-mobile.png`、`/tmp/kzg-option-house-v144-mobile-rotation.png`。
- 部署: 未部署生产。生产仍为 v1.42，唯一部署仍是 `https://6a158610e727dc1f741ecf8a--kzg-option-house.netlify.app/`。
- 下一步: v1.45 进入下一组稠密检查点，继续压手机轮动 lanes 和动量行的纵向高度，并按“每 5 个 Web 版本同步一次 iOS”的规则评估是否推进 iOS companion `0.3`。

English:

- Change: Moved public Web UI from `1.43` to `1.44`. This round is not deployed to production. It started the next update early and keeps working on mobile plus mid-width spacing/calligraphy. A v1.44 CSS layer tightens the desktop rotation quadrant, rotation lanes, symbol-focus card, window rhythm band, and momentum list; on phone it compresses the rotation header, narrative, quadrant, four stat cells, warming/cooling lanes, symbol focus, window cards, and momentum queue. It also adds a `521px -> 1080px` topbar rule so tablet/small-window tool buttons sit as a clean second row.
- Reason: v1.43 shortened the advanced preview, but the lower `symbol rotation` and `symbol momentum` sections still carried the most reading drag. The in-app Browser mid-width check also revealed a cramped topbar. The goal is to make the lower dashboard read as one continuous terminal instead of disconnected tables and cards.
- Visual impact: At desktop `1440x1100`, topbar is `69px`, rotation panel `814px`, momentum panel `585px`, with no horizontal overflow. Around `973px` width, topbar becomes a `105px` two-line structure and the toolbar becomes a full-width four-column strip. At mobile `390x844`, the v1.42/v1.43 first-screen wins remain: topbar `91px`, metric rail `201px`, report-canvas entry `y=766`, advanced preview `3163px`, while lower rotation/momentum controls are denser.
- Public boundary: No payment, domain, API, registration, price, Stripe, wallet, WeChat Pay, Massive plan, or internal commercial-planning copy was added. Public risk-token scan remains 0.
- Verification: `node --check public/app.js` passed; build produced a `505`-day payload, latest date `2026-05-22`, analytics symbols `98`, pack asset `kzg-frame-af03d65ae13f.js`; `per_day_to_dist` copied `505` reports; in-app Browser smoke confirmed v1.44, no console errors, no horizontal overflow, `user-select:none`, and no internal string leak; Playwright/Chrome screenshots verified `1440x1100`, `973x547`, and `390x844`, all with `overflowX=0`; PNG export was clicked and saved successfully as `/tmp/kzg-option-house-v144-export.png`, suggested filename `kzg-option-house-2026-05-22-zh.png`, size `1,482,138` bytes. Screenshot evidence: `/tmp/kzg-option-house-v144-desktop.png`, `/tmp/kzg-option-house-v144-tablet.png`, `/tmp/kzg-option-house-v144-mobile.png`, `/tmp/kzg-option-house-v144-mobile-rotation.png`.
- Deploy: Not deployed to production. Production remains v1.42; unique deploy remains `https://6a158610e727dc1f741ecf8a--kzg-option-house.netlify.app/`.
- Next: v1.45 should continue reducing the vertical height of phone rotation lanes and momentum rows, then evaluate whether to sync iOS companion `0.3` under the every-5-Web-versions rule.

## v1.43 - 2026-05-26 19:48 Asia/Shanghai - mobile lower-page compression

中文:

- 改动: 公开 Web UI 从 `1.42` 提到 `1.43`。本轮不部署生产，专门处理手机长页面下半段，把高级预览、历史回看、信号栈、实时轮廓和轮动象限的手机布局继续压短。新增 v1.43 移动端样式层：解锁区变成更紧的双列按钮，历史回看指标、信号指标、实时 lanes、轮动统计统一为 `4` 列小仪表，隐藏手机上重复解释性长句，保留数据读盘主体。
- 原因: v1.42 已把手机首屏打下来，但高级预览区在 `390px` 手机上仍高达约 `4825px`，太像长文档而不是移动终端。本轮目标是把下半区从“大块堆叠”改成“短块连续读盘”。
- 视觉影响: 手机 `390x844` 下，高级预览总高度从 v1.42 的约 `4825px` 压到 `3163px`，减少约 `1662px`。历史回看 `296px`、信号栈 `220px`、实时轮廓 `381px`、轮动象限 `467px`；首屏结构保持 v1.42 的 topbar `91px`、核心摘要 `201px`、日报画布入口 `y=766`。
- 公开边界: 没有加入支付、域名、API、注册、价格、Stripe、钱包、微信支付、Massive plan 或任何内部商业规划公开文案。
- 验证: `node --check public/app.js` 通过；build 仍生成 `505` 天 payload，最新日 `2026-05-22`，analytics symbols `98`，pack asset `kzg-frame-a14a84714653.js`；公开风险词扫描为 0；内置 Browser 本地 smoke 确认 v1.43、无 console error、无横向溢出、`user-select:none`；Chrome/CDP 桌面 `1440x1100` 与手机 `390x844` 均 `overflowX=0`。
- 部署: 未部署生产。生产仍为 v1.42，唯一部署仍是 `https://6a158610e727dc1f741ecf8a--kzg-option-house.netlify.app/`。
- 下一步: v1.44 继续压缩手机轮动象限和核心标的动量，并检查桌面下半区是否可以进一步减少 section 间断裂感。

English:

- Change: Moved public Web UI from `1.42` to `1.43`. This round is not deployed to production. It focuses on the phone long page below the fold, shortening the advanced preview, history lookback, signal stack, live silhouette, and rotation quadrant. A v1.43 mobile CSS layer turns unlock controls into tighter two-column buttons, unifies history metrics, signal metrics, live lanes, and rotation stats into compact `4`-column instruments, and hides repeated explanatory copy on mobile while preserving the data-reading surface.
- Reason: v1.42 fixed the phone first screen, but the advanced preview still measured about `4825px` tall at `390px` width, making it feel like a long document instead of a mobile terminal. This round turns the lower area from stacked blocks into shorter continuous reading bands.
- Visual impact: At `390x844`, advanced preview height drops from about `4825px` in v1.42 to `3163px`, a reduction of about `1662px`. History lookback is `296px`, signal stack `220px`, live silhouette `381px`, and rotation quadrant `467px`; the first-screen structure keeps v1.42's topbar `91px`, core summary `201px`, and report-canvas entry at `y=766`.
- Public boundary: No payment, domain, API, registration, price, Stripe, wallet, WeChat Pay, Massive plan, or internal commercial-planning copy was added to the public site.
- Verification: `node --check public/app.js` passed; build still produces a `505`-day payload, latest date `2026-05-22`, analytics symbols `98`, pack asset `kzg-frame-a14a84714653.js`; public risk-token scan is 0; in-app Browser local smoke confirms v1.43, no console errors, no horizontal overflow, and `user-select:none`; Chrome/CDP desktop `1440x1100` and mobile `390x844` both measure `overflowX=0`.
- Deploy: Not deployed to production. Production remains v1.42; unique deploy remains `https://6a158610e727dc1f741ecf8a--kzg-option-house.netlify.app/`.
- Next: v1.44 should continue tightening phone rotation quadrant and symbol momentum, then check whether the lower desktop sections can lose more section-break friction.

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

Current active Web UI status is documented in the detailed entries above. This older Git-evidenced table preserves the early all-night build trail, including pre-scrub Pro experiments, and should not override the current verified state at the top of this file.

当前活跃 Web UI 状态以上方详细条目为准。下面这个较早的 Git 可证实表保留通宵构建轨迹，包括公开风险清理前的 Pro 实验，不应覆盖本文顶部当前已核状态。

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
- Future real-time service: keep current generated-minute features open; research paid value only around live feed backend, cache, fanout, entitlement, and alert service.
- 未来实时服务：当前已生成分钟数据功能继续开放；付费价值只围绕实时 feed 后端、缓存、分发、权限和提醒服务研究。
- Data expansion: re-audit `2023-05` entitlement route with Massive plan/API/S3, but do not claim the files are local until they are found.
- 数据扩展：重新复核 `2023-05` 的 Massive 套餐/API/S3 权限路线，找到文件前不宣称已落地。
- GitHub continuity: every deploy should leave a commit-level breadcrumb for another Codex.
- GitHub 连续性：每次部署都要留下另一个 Codex 能接的 commit 级线索。
