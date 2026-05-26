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
- Production version last verified / 最近生产验证版本: `1.45`
- Local version last verified / 最近本地验证版本: `1.48`
- Latest unique deploy / 最近唯一部署: `https://6a15912a59bdd5425440cdb1--kzg-option-house.netlify.app/`
- iOS companion / iOS 伴生工程: `/Users/fangbao/kzg-options-minute-site/ios/KZGOptionHouse/KZGOptionHouse.xcodeproj`, scheme `KZG Option House`, bundle `com.kzg.optionhouse`, current iOS `0.3`
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

Latest v1.42 note:

最新 v1.42 说明：

Web `1.42` is a mobile/desktop spacing checkpoint, not a payment or domain feature. It compresses the phone header and summary rail, keeps PNG export stable, and keeps internal payment/domain/API planning out of the public site. Production unique deploy is `https://6a158610e727dc1f741ecf8a--kzg-option-house.netlify.app/`.

Web `1.42` 是移动端/桌面端 spacing 检查点，不是支付或域名功能。它压缩手机顶栏和摘要指标区，保持 PNG 导出稳定，并继续把支付/域名/API 内部规划排除在公开站之外。生产唯一部署是 `https://6a158610e727dc1f741ecf8a--kzg-option-house.netlify.app/`。

Latest local v1.45 note:

最新本地 v1.45 说明：

Web `1.45` is the latest production checkpoint and focuses on phone ledger density plus iOS companion sync. It preserves the v1.44 desktop/tablet stability, hides long mobile rotation narrative, reduces mobile rotation and momentum visible rows to `12` each, and updates the native SwiftUI companion to iOS `0.3`. Unique deploy: `https://6a15912a59bdd5425440cdb1--kzg-option-house.netlify.app/`. XcodeBuildMCP still hits a local simulator destination blocker, but `swiftc -typecheck` passes.

Web `1.45` 是最新生产检查点，重点是手机端账本密度和 iOS 伴生端同步。它保留 v1.44 的桌面/iPad 稳定成果，隐藏手机端轮动长说明，把手机轮动与动量可见行都压到 `12` 条，并把原生 SwiftUI 伴生端更新到 iOS `0.3`。唯一部署：`https://6a15912a59bdd5425440cdb1--kzg-option-house.netlify.app/`。XcodeBuildMCP 仍遇到本机 simulator destination 阻塞，但 `swiftc -typecheck` 通过。

Latest local v1.46 note:

最新本地 v1.46 说明：

Web `1.46` is the latest local-only checkpoint. It is not deployed. It keeps production at v1.45 and improves the phone lower-page unity between advanced preview, symbol rotation, and symbol momentum. Main code changes are `public/app.js` and `public/styles.css`: UI version `1.46`, mobile/narrow visual connector lines, unified section heading borders/radius, tighter premium/rotation/momentum gaps, and quieter mobile rotation dots capped at `30px`. Browser and Playwright verified v1.46, no console warnings/errors, no horizontal overflow, no public-risk string leak, and PNG export `/tmp/kzg-option-house-v146-export.png` at `1,482,138` bytes. Next deploy should normally wait until v1.48-v1.50.

Web `1.46` 是最新本地检查点，未部署生产。生产仍为 v1.45。本轮改的是手机下半页统一感，把高级预览、标的轮动、核心动量三段接成更连续的读盘脊柱。主要代码改动是 `public/app.js` 和 `public/styles.css`：UI 版本 `1.46`、移动/窄屏连接线、统一 section heading 边界与圆角、更紧的 premium/rotation/momentum 间距、手机轮动气泡上限降到 `30px`。Browser 与 Playwright 已验证 v1.46、无 console warning/error、无横向溢出、无公开风险词泄露，PNG 导出 `/tmp/kzg-option-house-v146-export.png` 为 `1,482,138` bytes。下一次常规部署默认等 v1.48-v1.50。

Latest local v1.47 note:

最新本地 v1.47 说明：

Web `1.47` is the latest local-only checkpoint. It is not deployed. It keeps production at v1.45 and compresses the phone advanced-preview entry plus the momentum-panel tail. Main code changes are `public/app.js` and `public/styles.css`: UI version `1.47`, two-line capability lead, two-column phone capability rails, one-row four-button unlock tabs, shorter capability meter, shorter focus rhythm stack/tape/charts, and phone momentum list reduced to 10 visible rows. Browser and Playwright verified v1.47, theme toggle interaction, no console warnings/errors, no horizontal overflow, no public-risk string leak, and PNG export `/tmp/kzg-option-house-v147-export.png` at `1,482,138` bytes. Next deploy should normally wait until v1.48-v1.50.

Web `1.47` 是最新本地检查点，未部署生产。生产仍为 v1.45。本轮压缩手机端高级预览入口和动量面板尾部。主要代码改动是 `public/app.js` 和 `public/styles.css`：UI 版本 `1.47`、capability lead 两行化、手机 capability rails 两列化、unlock tabs 一行四按钮、更短的 capability meter、更短的 focus rhythm stack/tape/charts，手机动量列表压到 10 条可见。Browser 与 Playwright 已验证 v1.47、theme toggle 交互、无 console warning/error、无横向溢出、无公开风险词泄露，PNG 导出 `/tmp/kzg-option-house-v147-export.png` 为 `1,482,138` bytes。下一次常规部署默认等 v1.48-v1.50。

Latest local v1.48 note:

最新本地 v1.48 说明：

Web `1.48` is the latest local-only checkpoint. It is not deployed. It keeps production at v1.45 and compresses the live-feed silhouette plus the lower desktop reading rhythm. Main code changes are `public/app.js` and `public/styles.css`: UI version `1.48`, desktop analysis-grid/panel padding unification, tighter desktop live silhouette columns, phone premium cards as two short columns, phone live silhouette lead reduced to a short title strip, phone live stream reduced to 7 visible pressure rows, and quadrant map lowered to `132px`. Browser verified page identity, theme toggle, no overlay, no console warnings/errors, and `user-select:none`; Browser screenshot timed out once, so Playwright provided visual proof. Playwright verified no horizontal overflow, no commercial-risk string leak after excluding market-data dollar amounts, and PNG export `/tmp/kzg-option-house-v148-export.png` at `1,482,138` bytes. Next deploy should normally wait until v1.49-v1.50.

Web `1.48` 是最新本地检查点，未部署生产。生产仍为 v1.45。本轮压缩实时流轮廓和桌面下半区阅读节奏。主要代码改动是 `public/app.js` 和 `public/styles.css`：UI 版本 `1.48`、桌面 analysis-grid/panel padding 统一、桌面 live silhouette 三列更紧、手机 premium cards 两列短卡、手机 live silhouette lead 降为短标题条、手机 live stream 降为 7 条可见压力行、quadrant map 降到 `132px`。Browser 已验证页面身份、theme toggle、无 overlay、无 console warning/error、`user-select:none`；Browser 截图本轮超时一次，所以用 Playwright 补视觉证据。Playwright 已验证无横向溢出、排除市场数据美元金额后的商业风险词为 0，PNG 导出 `/tmp/kzg-option-house-v148-export.png` 为 `1,482,138` bytes。下一次常规部署默认等 v1.49-v1.50。

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
- blurred advanced previews / 模糊高级预览；
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
