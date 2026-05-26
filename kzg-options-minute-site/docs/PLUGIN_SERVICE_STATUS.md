# Plugin and service status / 插件与服务接入状态

This is the operational ledger for every external plugin or service touched, planned, or explicitly held back for KZG Option House. It is internal documentation for Fangbao and future authorized agents. Do not publish this table on the public website.

这是 KZG Option House 的外部插件与服务总账，记录已经使用、正在规划、或明确暂停的服务。它是给 Fangbao 和后续授权 agent 的内部文档，不得放到公开网站。

## Service ledger / 服务总账

| Service / Plugin | Status | What has actually happened / 已实际完成 | Boundary and next action / 边界与下一步 |
|---|---|---|---|
| GitHub | Active | Source and docs are pushed on branch `feat/kzg-option-house-daily-auto`. v1.45 is the latest local mobile-ledger/iOS-sync checkpoint and should be visible in `git log -1` after backup. | Keep committing source/docs only. Do not commit raw generated data under `public/data/`, `public/reports/`, `.private/`, `dist/`, or raw `.csv.gz`. |
| Netlify | Active | Production site is `https://kzg-option-house.netlify.app/`. Latest production deploy is v1.42 at `https://6a158610e727dc1f741ecf8a--kzg-option-house.netlify.app/`. | Deploy every 3-5 solid versions or immediately after public-risk fixes. Production raw data endpoint `/data/index.json` should remain 404 unless Fangbao explicitly changes policy. |
| Apple Notes | Active but expanded now | Pinned owner note title is `CHANGLOG 期权终端`. It is synced from `docs/CHANGLOG_OPTION_TERMINAL.md`. | The note must be a real operating ledger, not a short status. This service matrix must be summarized into the note on each docs update. |
| Massive | Active as data source and research topic | Flat-file data currently powers the site. Local proof is `505` option-minute files covering `2024-05-17 -> 2026-05-22`. Official Massive pricing/docs were researched for real-time product planning. | No API key is used in browser. No plan upgrade has been executed. Real-time paid SaaS needs backend ingestion plus Business/legal entitlement confirmation before public sale. |
| iCloud Drive | Active as local raw-data storage | Local path verified earlier: `/Users/fangbao/Library/Mobile Documents/com~apple~CloudDocs/KZG/23_DATA_Massive_期权分钟_Minute`. Current local proof is 505 files, `2024-05-17 -> 2026-05-22`. | Treat `2023-05` as a target to re-audit, not as landed local proof. Keep local raw files out of Git. |
| Google Drive | Reported mirror, not connector-verified this turn | Fangbao reported Google Drive has the same 505 files and matching size. | Future agent with Google Drive connector should verify file count, byte size, and range directly, then write evidence here. |
| Browser / Playwright / Chrome | Active for QA | Used headless Chrome/Playwright to verify v1.45 local desktop/mobile viewports, no horizontal overflow, no public risk terms, `user-select:none`, and PNG export. Latest screenshots are `/tmp/kzg-option-house-v145-desktop.png`, `/tmp/kzg-option-house-v145-mobile.png`, and `/tmp/kzg-option-house-v145-mobile-rotation.png`; PNG proof is `/tmp/kzg-option-house-v145-export.png`. | Continue using for visual proof before deploy. Screenshots are QA evidence, not committed artifacts unless explicitly requested. |
| iOS / Xcode | Active companion scaffold | Native SwiftUI app created at `/Users/fangbao/kzg-options-minute-site/ios/KZGOptionHouse/KZGOptionHouse.xcodeproj`, scheme `KZG Option House`, bundle `com.kzg.optionhouse`; current iOS `0.3` source typecheck passes. XcodeBuildMCP sees the right profile but full destination build is blocked locally by simulator runtime/SDK mismatch. | iOS updates every 5 Web dense versions. App Store signing, TestFlight upload, developer-account changes, or review submission require Fangbao confirmation. |
| Stripe | Planned only | Payment architecture is documented, but no Stripe product, Checkout Session, Customer Portal, webhook, or real price was created. | Stop before creating products, changing Stripe account state, transmitting secrets, or collecting money. Needs Fangbao approval. |
| Supabase | Planned only | Candidate schema and role are documented: auth, profiles, subscriptions, entitlements, usage events, export jobs. No project connection or table mutation has happened. | Needs Fangbao approval and credentials/project selection before real backend work. Keep public page free of Supabase internals. |
| Network Solutions / domain registrar | Blocked before spend | Domain purchase logic is documented. Candidate domains and prices must stay internal. No domain was bought. | Stop before any purchase or DNS change. Ask Fangbao at the exact spending step. |
| WeChat Pay route | Planned only | Treated as China-money payment rail in internal docs. No merchant credential or QR collection flow has been connected. | Requires Fangbao approval and likely merchant account details. Do not put implementation details on public site. |
| USDT / wallet route | Planned only | Treated as later crypto payment rail. No wallet login, signature verification, address mapping, or chain collection has been connected. | Needs product decision and security design. Wallet login is not the same as payment. |
| Massive real-time backend | Planned only | Architecture documented: backend ingest, compact derived signals, cache, entitlement fanout, no browser-side API key. | Do not sell real-time OPRA-derived feed until business/legal entitlement is confirmed. |
| Automation heartbeat | Active | `kzg-option-house-pro-evolution-loop` keeps the dense UI/product iteration alive and records docs/Notes requirements. | Every heartbeat should record version target, changed files, verification, deploy URL if any, blocker, and next 0.01 direction. |
| Canva / Figma / Slack / Gmail / Calendar / Notion | Not used for this product phase | Available in environment, but not used for current code, deploy, payment, or data workflow. | Only use when Fangbao explicitly asks for design artifacts, messaging, calendar, or knowledge-base publishing. |

## Practical answer / 直接回答

中文:

已经跑通的是 GitHub、Netlify、Apple Notes、本地 iCloud 数据路径、浏览器/Playwright 验证、PNG 导出，以及原生 SwiftUI iOS 伴生工程到 `0.3` 的源码验证。已经研究但还不能上线的是 Massive 实时 API 路线。只写了架构、没有真实接入的是 Stripe、Supabase、Network Solutions 或其他域名商、微信支付、USDT/钱包。Google Drive 的 505 文件镜像来自 Fangbao 回执，未来需要 connector 直接复核。Canva、Figma、Slack、Gmail、Calendar、Notion 当前没用，因为这阶段核心不是设计稿或消息系统，而是数据终端、部署、交接、iOS 伴生端和未来 SaaS 架构。

English:

The working layer is GitHub, Netlify, Apple Notes, local iCloud data, browser/Playwright QA, PNG export, and native SwiftUI iOS companion source verification up to `0.3`. Massive real-time API has been researched but is not ready for public resale. Stripe, Supabase, Network Solutions or any domain registrar, WeChat Pay, and USDT/wallet are architecture-only and not live. Google Drive's 505-file mirror is Fangbao-reported and should be connector-verified later. Canva, Figma, Slack, Gmail, Calendar, and Notion are unused because this phase is about the data terminal, deployment, handoff, and future SaaS architecture.
