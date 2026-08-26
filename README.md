# DELF50 Web

A1+ → DELF B1 的 50 天网页备考训练系统。

## 当前生产版本

- App：`1.8.0`
- State Schema：`2`
- Teaching Content：`1.8.0`
- 生产地址：`https://delf50-mvp.vercel.app`
- 路由：`global-unique-v1`
- 全题干审计：`full-question-audit-v1`
- 高强度容量档：`8h-50d-core-v1`

V1.8.0 在 V1.7.7 的全程唯一分配基础上，加入语法题量扩容、读听小题题干级去重和 8 小时 × 50 天容量检查。已完成、已作答、已有草稿或录音的历史学习证据继续锁定，不因扩容或重分配被删除、倒扣或重写。

## Day 3 重复材料修复

Day 3 已经完成但与 Day 1 重复的第 3 篇阅读不删除旧答案和旧完成记录；系统为该槽位建立独立纠偏替代材料，并把补做结果作为新增学习证据保存。尚未开始的 Day 3 重复听力直接换成新的唯一材料；若已经产生真实作答证据，则旧证据同样保留并进入纠偏补做逻辑。

Day 3–50 的 reading / listening / writing / speaking / application 使用按 `Day + slot` 固定的唯一 Content ID。未开始槽位可以安全更新；已经开始或完成的槽位锁定不动。

## 8 小时 × 50 天容量

8 小时档的 50 天核心需求为：

| 模块 | 每日最高量 | 50 天最低容量要求 | V1.8 容量 |
| --- | ---: | ---: | ---: |
| 语法客观题 | 12 | 600 | ≥650；保守测试 817 |
| 阅读 | 4 篇 | 200 | 200 |
| 听力 | 4 组 | 200 | 200 |
| 写作 | 2 项 | 100 | 100 |
| 口语 | 4 轮 | 200 | 200 |
| 应用 | 4 项 | 200 | 200 |

每篇阅读和每组听力按 3 道客观题计算，对应约 600 道阅读小题和 600 道听力小题。核心题目/任务量约 2300 个独立训练单元，不含主动产出、词块与错题复习。

语法扩容文件：`v180-authoritative-volume.js`。新增题只追加在既有题目之后，旧题顺序和旧 Trace ID 不改。新题使用 `GQ180-*` Trace ID。扩容模块要求语法总量至少 650 且精确题干重复数、Trace ID 重复数均为 0 才标记容量审计通过。

## 全题干去重

文件：`v178-full-question-audit.js`。

最终审计在所有扩容之后执行，检查：

- reading / listening / writing / speaking / application 的 Content ID；
- 阅读全文、听力脚本、写作题目、口语题目、应用任务的精确重复；
- 每一道阅读和听力小题题干；
- 全部语法客观题题干；
- 已完成历史重复与未来未完成重复分开统计。

未开始的 V1.7.7 生成型阅读/听力会使用带 dossier、地点和上下文的唯一题干；已经开始或完成的材料不会被改题。

## 权威来源与版权边界

课程与题型校准使用：

- France Éducation international DELF B1 官方考试结构、样题和备考说明；
- Council of Europe CEFR descriptors；
- France Éducation international 官方样题仅用于题型、时长、评分和难度校准，不复制官方真题文本；
- Service-Public.gouv.fr / DILA `Fiches pratiques et ressources – Particuliers` 作为法国公共生活主题的权威开放信息来源池；
- Licence Ouverte / Etalab 2.0 作为开放公共信息再利用的许可依据。

官方 DELF 样题明确受复印/重复使用限制，因此内部大题库采用 DELF50 原创题，不把官方真题批量搬运进系统。开放政府信息用于提供真实主题、事实类型和场景种子；原创题保留来源和能力对齐元数据。

## 50 天路线

- Day 1–18：基础与语法自动化。
- Day 19–30：应用迁移。
- Day 31–40：DELF B1 四项专项。
- Day 41–50：模拟、错误修复和稳定性训练。

## 每日强度

- 5 小时：语法 8 + 主动产出 6；应用 2；听力 2；阅读 2；写作 1；口语 2。
- 6.5 小时：语法 10 + 主动产出 8；应用 3；听力 3；阅读 3；写作 1；口语 3。
- 8 小时：语法 12 + 主动产出 10；应用 4；听力 4；阅读 4；写作 2；口语 4。

提高强度只增加当前阶段尚未开始的训练槽位，不覆盖已经完成的证据。

## 数据保护

学习状态保存于浏览器 `localStorage`；口语录音保存在 IndexedDB `delf50_audio_v1`。Schema 2 坚持 additive migration。历史答案、完成数量、写作/应用正文、草稿、错题和录音引用默认只保留、不重算。JSON 备份不包含录音文件。

## 主要文件

- `v177-global-unique-routing.js`
- `v178-full-question-audit.js`
- `v180-authoritative-volume.js`
- `v180-finalize.js`
- `v176-day2-reading-repair.js`
- `v172-compat-architecture.js`
- `v173-learning-archive.js`
- `api/source.js`
