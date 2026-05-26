# KZG Option House docs / 文档入口

This folder is the GitHub-side operating memory for KZG Option House. It is intentionally detailed so another authorized Codex can continue the work from the repository without depending on local chat history.

这个目录是 KZG Option House 在 GitHub 里的可交接操作记忆。它故意写得很细，目的是让另一个已经授权的 Codex 只拿到仓库，也能继续构建、验证、部署、记录。

## Canonical files / 核心文件

- [CHANGELOG.md](CHANGELOG.md): dense bilingual version log, product decisions, deploy evidence, and current data boundary.
- [CHANGLOG_OPTION_TERMINAL.md](CHANGLOG_OPTION_TERMINAL.md): owner-requested long-form bilingual handoff log for the option-terminal SaaS.
- [CHANGLOG_OPTION_TERMINAL_MINDMAP.opml](CHANGLOG_OPTION_TERMINAL_MINDMAP.opml): MindNode-compatible architecture outline.
- [HANDOFF_FOR_OTHER_CODEX.md](HANDOFF_FOR_OTHER_CODEX.md): exact handoff instructions for another Codex or agent.
- [DENSE_VERSIONING.md](DENSE_VERSIONING.md): 0.01 version cadence, heartbeat protocol, deploy rules, and changelog template.
- [MASSIVE_REALTIME_PRODUCT_PLAN.md](MASSIVE_REALTIME_PRODUCT_PLAN.md): internal product plan for Massive real-time data, legal/commercial boundary, concurrency model, and paid feature architecture.
- [PLUGIN_SERVICE_STATUS.md](PLUGIN_SERVICE_STATUS.md): internal ledger for GitHub, Netlify, Apple Notes, Massive, iCloud, Google Drive, Stripe, Supabase, domains, WeChat, USDT, browser QA, and unused plugins.
- [IOS_COMPANION_PLAN.md](IOS_COMPANION_PLAN.md): native SwiftUI iOS companion cadence, project path, verification proof, and App Store boundary.
- [TEXT_REPLACEMENT_TRACEABLE_SAAS_PROMPT.md](TEXT_REPLACEMENT_TRACEABLE_SAAS_PROMPT.md): 1951-character no-punctuation Text Replacement prompt for starting any future traceable SaaS build.
- [processing-spec.md](processing-spec.md): current CSV parsing and derived-metric spec.
- [lessons.md](lessons.md): first-session lessons and traps.

## Public/private boundary / 公开与内部边界

Public site can show product value, latest-day signals, blurred advanced previews, PNG export, and KZG branding.

公开网站可以展示产品价值、当日信号、模糊高级预览、PNG 导出、KZG 品牌。

Do not put the following on the public website until Fangbao explicitly approves:

在 Fangbao 明确批准前，不要把下面内容放到公开网页：

- candidate domains / 域名候选；
- registration mechanics / 注册流程细节；
- real pricing experiments / 真实价格实验；
- Stripe, wallet, WeChat payment implementation details / Stripe、钱包、微信支付实现细节；
- API keys, credential routes, Massive plan internals / API key、凭证路线、Massive 套餐内部信息；
- internal business planning or legal risk analysis / 内部商业规划或法律风险分析。

Those belong in this docs folder, `.private/`, Apple Notes, or this thread.

这些内容只能放在本目录、`.private/`、Apple Notes 或本线程。
