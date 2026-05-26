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
- The currently visible public site was verified at `1.27`. The next public UI step should continue as `1.28` unless Fangbao renames the product/version baseline.
- 当前公开站点已验证显示 `1.27`。下一次公开 UI 迭代应继续为 `1.28`，除非 Fangbao 重新命名产品或版本基线。

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
