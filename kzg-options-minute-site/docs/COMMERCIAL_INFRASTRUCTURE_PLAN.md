# KZG Option House commercial infrastructure plan / 商业基础设施计划

This document is internal owner documentation. It is not public website copy. No domain purchase, account mutation, payment setup, credential use, Supabase mutation, or paid provider action has been performed from this plan.

本文档是 owner 内部文档，不是公开网站文案。本计划未执行任何域名购买、账号状态修改、支付设置、凭据使用、Supabase 改库或付费服务动作。

## Current Boundary / 当前边界

- Public site: show the generated minute-data terminal, historical lookback, rotation, event samples, and PNG export.
- 公开站：展示已经生成的分钟数据终端、历史回看、轮动、事件样张和 PNG 导出。
- Internal docs: domain purchase path, login/auth, Supabase schema, entitlement checks, provider/API/commercial planning.
- 内部文档：域名购买路径、登录/鉴权、Supabase schema、权益校验、供应商/API/商业规划。
- Hard stop: ask Fangbao again before spending money, buying a domain, changing DNS, creating payment products, using credentials, or transmitting secrets.
- 硬停点：任何花钱、购买域名、改 DNS、创建支付产品、使用凭据或传输 secrets 前必须再次问 Fangbao。

## Network Solutions Domain Path / Network Solutions 域名路径

Recommended read-only preparation:

建议只读准备：

- Define the exact brand/domain shortlist in this doc or `.private/`, not on the public site.
- 在本文档或 `.private/` 里确认品牌/域名 shortlist，不放公开站。
- Check availability, first-year price, renewal price, privacy fee, DNS management, transfer lock, and auto-renew terms.
- 核对可注册状态、首年价格、续费价格、隐私保护费用、DNS 管理、转移锁和自动续费条款。
- Record candidate domains as placeholders until Fangbao chooses one: `DOMAIN_CANDIDATE_PLACEHOLDER`.
- 在 Fangbao 选择前只用占位记录候选域名：`DOMAIN_CANDIDATE_PLACEHOLDER`。
- Before purchase, present: exact domain, checkout total, renewal terms, privacy setting, account used, and DNS plan.
- 购买前必须向 Fangbao 展示：精确域名、结账总价、续费条款、隐私设置、使用账号和 DNS 计划。

Post-approval purchase flow:

批准后的购买流程：

- Buy domain only after explicit Fangbao confirmation in the current turn.
- 只有在当前回合 Fangbao 明确确认后才购买。
- Keep auto-renew and privacy decisions visible in the confirmation.
- 自动续费和隐私保护设置必须在确认里写清楚。
- Point DNS to Netlify using Netlify DNS or registrar DNS records.
- 用 Netlify DNS 或注册商 DNS record 指向 Netlify。
- Verify SSL, apex domain, `www` redirect, and production canonical URL.
- 验证 SSL、根域名、`www` 跳转和生产 canonical URL。
- Record final registrar, DNS records, renewal date, and rollback path in docs.
- 在 docs 里记录最终注册商、DNS records、续费日期和回滚路径。

## User Authentication / 用户登录

Recommended phased approach:

建议分阶段：

- Phase 0: no public auth. Current generated-minute features remain open.
- Phase 0：公开站无登录。当前生成分钟能力保持开放。
- Phase 1: Supabase Auth with email OTP or magic link.
- Phase 1：Supabase Auth，使用 email OTP 或 magic link。
- Phase 2: add OAuth only if Fangbao wants smoother login.
- Phase 2：只有 Fangbao 需要更顺滑登录时再加 OAuth。
- Phase 3: wallet login is optional and separate from payment.
- Phase 3：钱包登录是可选项，且与支付不是同一件事。

User-facing rule:

面向用户规则：

- Login copy should be plain: account, saved workspace, alerts, or export history.
- 登录文案要普通：账户、保存工作台、提醒、导出记录。
- Do not expose implementation names, provider names, API plan details, or commercial routing on the public homepage.
- 不在公开首页暴露实现名、供应商名、API 套餐细节或商业路线。

## Supabase Architecture / Supabase 架构

Suggested tables:

建议表：

- `profiles`: `id`, `email`, `display_name`, `created_at`, `last_seen_at`.
- `subscriptions`: `id`, `user_id`, `provider`, `status`, `current_period_end`, `created_at`.
- `entitlements`: `id`, `user_id`, `feature_key`, `status`, `expires_at`, `source`.
- `usage_events`: `id`, `user_id`, `event_type`, `symbol`, `trade_date`, `created_at`.
- `export_jobs`: `id`, `user_id`, `trade_date`, `format`, `status`, `created_at`.
- `signal_snapshots`: `id`, `trade_date`, `symbol`, `payload`, `created_at`.

Security rules:

安全规则：

- Enable RLS on every user table.
- 每张用户表启用 RLS。
- Browser and iOS may use only scoped anon access.
- 浏览器和 iOS 只能使用受限 anon access。
- Service-role keys live only in backend environment variables.
- service-role key 只放后端环境变量。
- Real provider/API keys never enter browser code, iOS code, Git, screenshots, docs, or public logs.
- 真实供应商/API key 不进入浏览器代码、iOS 代码、Git、截图、docs 或公开日志。

Backend components:

后端组件：

- Auth callback function: normalize user profile after sign-in.
- Auth callback function：登录后规范化用户 profile。
- Entitlement function: return only the current user's feature flags.
- Entitlement function：只返回当前用户自己的 feature flags。
- Feed snapshot function: later server-side event compression and fanout.
- Feed snapshot function：未来用于服务端事件压缩和分发。
- Audit function: record export, alert, and account-sensitive events.
- Audit function：记录导出、提醒和账户敏感事件。

## Entitlement Flow / 权益流程

Recommended flow:

建议流程：

- User signs in through Supabase Auth.
- 用户通过 Supabase Auth 登录。
- Backend creates or updates `profiles`.
- 后端创建或更新 `profiles`。
- Backend reads subscription/payment status from a private server-side source.
- 后端从私有服务端来源读取订阅/支付状态。
- Backend writes `entitlements`.
- 后端写入 `entitlements`。
- Browser/iOS asks backend for a minimal entitlement snapshot.
- 浏览器/iOS 向后端请求最小权益快照。
- Current generated-minute features stay open; only future service-specific capabilities should check entitlements.
- 当前生成分钟能力保持开放；只有未来服务型能力需要校验权益。

## Rollout Checklist / 上线清单

- Fangbao chooses exact domain.
- Fangbao 选择精确域名。
- Fangbao confirms no exposed API keys will be reused; keys are rotated before backend use.
- Fangbao 确认不会复用已经暴露的 API key；后端使用前先轮换。
- Supabase project selected or created after explicit approval.
- Supabase project 只能在明确批准后选择或创建。
- Auth redirect URLs configured for staging and production.
- 配置 staging 与 production 的 auth redirect URL。
- RLS policies written and tested.
- 写好并测试 RLS policies。
- Backend secrets set only in the deploy platform.
- 后端 secrets 只放部署平台。
- Staging deploy verified before production.
- 生产前先验证 staging。
- Public copy reviewed to ensure no provider/API/payment/domain planning appears on the homepage.
- 审查公开文案，确认首页不出现供应商/API/支付/域名规划。

## Hard Stops / 硬停点

Stop and ask Fangbao again before:

以下动作前必须停下并再次问 Fangbao：

- Any Network Solutions checkout, renewal, or DNS change.
- 任何 Network Solutions 结账、续费或 DNS 修改。
- Any Supabase project creation, table mutation, or secret entry.
- 任何 Supabase project 创建、改表或录入 secret。
- Any payment provider product, price, webhook, or customer portal setup.
- 任何支付服务的产品、价格、webhook 或 customer portal 设置。
- Any real provider/API credential use.
- 任何真实供应商/API 凭据使用。
- Any App Store, TestFlight, developer-account, or production entitlement action.
- 任何 App Store、TestFlight、开发者账号或生产权益动作。
