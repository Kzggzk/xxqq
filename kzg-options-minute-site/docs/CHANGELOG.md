# KZG Option House changelog / KZG Option House 变更日志

This is the GitHub canonical changelog. Apple Notes has a pinned owner-facing copy, but GitHub is the durable handoff for another Codex.

这是 GitHub 标准 changelog。Apple Notes 里有给 Fangbao 看的置顶副本，但 GitHub 才是另一个 Codex 能稳定接手的交接源。

## Current state / 当前状态

- Workspace / 工作目录: `/Users/fangbao/kzg-options-minute-site`
- Git root / Git 根目录: `/Users/fangbao`
- Branch / 分支: `feat/kzg-option-house-daily-auto`
- Production / 生产站: <https://kzg-option-house.netlify.app/>
- Latest public verified version / 最近公开验证版本: `1.32`
- Latest production fix / 最近生产修复: `6c909a9 remove public commercial planning from option house`
- Latest unique deploy verified / 最近验证唯一部署: <https://6a155f54945106b4d1611609--kzg-option-house.netlify.app/>
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
