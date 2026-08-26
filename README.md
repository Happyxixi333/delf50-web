# DELF50 Web

A1+ → DELF B1 的 50 天网页备考训练系统。

## 当前生产版本

- App：`1.8.1`
- State Schema：`2`
- Teaching Content：`1.8.1`
- 生产地址：`https://delf50-mvp.vercel.app`
- 路由：`source-driven-v1`
- 全题干审计：`full-question-audit-v1`
- 高强度容量档：`8h-50d-core-v1`
- 权威来源族：`18`
- Source seeds：`180`

V1.8.1 沿用 V1.8.0 的 Schema 2、完成锁定、全程唯一分配和 8 小时 × 50 天容量机制，并为 Day 3–50 接入 source-driven 题库层。18 个权威来源族共 180 个 source seeds 通过服务端固定 commit SHA 注入运行 bundle，再由 `v181-source-driven-content.js` 生成 reading / listening / writing / speaking / application 的新训练材料。

本轮是 additive update，不重置、不重算已有学习记录。已经完成、已作答、已有草稿/正文或口语记录的历史槽位继续使用既有 Content ID 和历史证据；只有尚未开始的槽位允许接入 V1.8.1 新题库。

## V1.8.1 source-driven 题库

Day 3–50 按 8 小时最高强度可分配 864 个 source-driven 槽位：

| 模块 | 每日最高量 | Day 3–50 槽位 |
| --- | ---: | ---: |
| 阅读 | 4 篇 | 192 |
| 听力 | 4 组 | 192 |
| 写作 | 2 项 | 96 |
| 口语 | 4 轮 | 192 |
| 应用 | 4 项 | 192 |
| 合计 | 18 | 864 |

V1.8.1 使用按 `Day + slot` 固定生成的 Content ID（`r181-* / l181-* / w181-* / s181-* / a181-*`）。来源 seed、来源族、权威机构、来源 URL、许可、核验时间、能力功能和 semantic fingerprint 都写入 provenance，便于之后追踪与审计。

180 个 seed 来自 18 个权威来源族，每个来源族固定 10 个 seed。`api/source.js` 在服务端加载这些 JSON 时强制检查：来源族数量必须为 18、每族必须为 10、总 seed 必须为 180、family ID / seed ID / 核心事实不得重复；任何一项不满足时接口直接失败，不向浏览器发送不完整题库。

## 历史学习记录保护

V1.8.1 保持 Schema 2 的 additive migration 原则。

- `S.assignments172` 继续保存每个 Day 已经确定的 reading / listening / writing / speaking / application Content ID。
- 已完成数量继续从当天 `S.daily` 判断；已完成槽位不会重新分配。
- 阅读/听力只要已有逐题 answer key，即视为已有学习证据并锁定。
- 写作/应用已有提交记录或草稿时锁定。
- 口语已有对应 Content ID 的记录时锁定。
- 提高学习强度只增加尚未开始的新槽位，不删除已经完成的额外训练。
- `localStorage`、IndexedDB 录音、历史答案、完成数量、草稿和正文不因 V1.8.1 升级被清空或覆盖。

因此，从 V1.8.0 升级到 V1.8.1 后，之前 Day 1、Day 2 或任何已经开始的 Day 仍保留原学习证据；新的 source-driven 材料主要接管 Day 3–50 中尚未开始的任务。

## 去重与容量审计

V1.8 系列继续执行 `v178-full-question-audit.js` 和高强度容量审计。V1.8.1 source-driven 生成层在本地审计中验证了 864 个槽位可分配，并对以下维度进行重复检查：

- Content ID；
- 阅读全文和听力脚本；
- 写作、口语、应用任务文本；
- 阅读与听力每一道小题题干；
- semantic fingerprint。

V1.8.1 接线前的审计结果为上述重复项均为 0。既有历史任务和新生成任务分开处理：历史证据优先锁定，新题库只填充未开始槽位。

## Day 3 重复材料修复

早期版本中 Day 3 与 Day 1 出现重复的历史材料仍按照“保留证据、追加纠偏”的原则处理。已经完成的重复阅读不删除旧答案和完成记录；尚未开始的槽位可以被 V1.8.1 source-driven 内容安全替换。若槽位已经产生真实作答、草稿或录音，则继续锁定旧 Content ID，不强行换题。

## 8 小时 × 50 天容量

8 小时档的 50 天核心需求为：

| 模块 | 每日最高量 | 50 天最低容量要求 | 当前容量 |
| --- | ---: | ---: | ---: |
| 语法客观题 | 12 | 600 | ≥650；保守测试 817 |
| 阅读 | 4 篇 | 200 | V1.8 基础容量 + V1.8.1 source-driven Day 3–50 |
| 听力 | 4 组 | 200 | V1.8 基础容量 + V1.8.1 source-driven Day 3–50 |
| 写作 | 2 项 | 100 | V1.8 基础容量 + V1.8.1 source-driven Day 3–50 |
| 口语 | 4 轮 | 200 | V1.8 基础容量 + V1.8.1 source-driven Day 3–50 |
| 应用 | 4 项 | 200 | V1.8 基础容量 + V1.8.1 source-driven Day 3–50 |

语法扩容仍由 `v180-authoritative-volume.js` 提供；新增题只追加在旧题之后，旧题顺序和旧 Trace ID 不改。

## 权威来源与版权边界

课程与题型校准使用 France Éducation international DELF B1 官方考试结构、样题和备考说明，以及 Council of Europe CEFR descriptors。官方样题仅用于题型、时长、评分和难度校准，不批量复制官方真题文本。

V1.8.1 的 source seeds 使用法国公共服务、就业、教育、医疗、交通、能源、统计、数据保护、网络安全和文化等权威公共信息来源。系统使用这些来源提供事实类型、现实场景和词汇方向，再生成 DELF50 原创训练文本；运行时 provenance 保留来源 URL、authority、licence 与 verifiedAt。

## 50 天路线

- Day 1–18：基础与语法自动化。
- Day 19–30：应用迁移。
- Day 31–40：DELF B1 四项专项。
- Day 41–50：模拟、错误修复和稳定性训练。

## 每日强度

- 5 小时：语法 8 + 主动产出 6；应用 2；听力 2；阅读 2；写作 1；口语 2。
- 6.5 小时：语法 10 + 主动产出 8；应用 3；听力 3；阅读 3；写作 1；口语 3。
- 8 小时：语法 12 + 主动产出 10；应用 4；听力 4；阅读 4；写作 2；口语 4。

## 数据保护

学习状态保存于浏览器 `localStorage`；口语录音保存在 IndexedDB `delf50_audio_v1`。Schema 2 坚持 additive migration。历史答案、完成数量、写作/应用正文、草稿、错题和录音引用默认只保留、不重算。JSON 备份不包含录音文件。

## V1.8.1 主要文件

- `content/seeds-v181/01-sp-housing.json` … `18-culture-access.json`
- `v181-source-driven-content.js`
- `v180-authoritative-volume.js`
- `v178-full-question-audit.js`
- `v180-finalize.js`
- `v177-global-unique-routing.js`
- `v176-day2-reading-repair.js`
- `v172-compat-architecture.js`
- `v173-learning-archive.js`
- `api/source.js`
- `index.html`（loader cache key：`v181`）
