# DELF50 Web

A1+ → DELF B1 的 50 天网页备考训练系统。

## 当前生产版本

- App：`1.7.7`
- State Schema：`2`
- Teaching Content：`1.7.3`
- 生产地址：`https://delf50-mvp.vercel.app`

V1.7.7 解决 Day 3 再次回卷到 Day 1 材料的问题，并把内容分配从“只避开相邻一天”升级为“未完成槽位全程唯一”。本版不删除、不倒扣已经完成或已经开始的学习证据。

## V1.7 → V1.7.7

- V1.7：50 天逐日课程、来源可追溯。
- V1.7.1：用户手册、自动保存与草稿。
- V1.7.2：Schema 2、Day 独立计划、Content assignments、兼容迁移。
- V1.7.3：只读学习档案。
- V1.7.4：阅读/听力/语法浏览 cursor 与语法详解。
- V1.7.5：初版 Day-aware 路由。
- V1.7.6：Day 2 专属内容、Day-aware v2、完成时间锁定、精简语法 UI、Day 2 精准阅读修复。
- V1.7.7：`global-unique-v1`、Day 3 重复阅读纠偏、Day 3 未完成重复听力重分配、Day 3–50 五类分配型模块的唯一 Content ID 与运行时查重审计。

## 50 天路线

- Day 1–18：基础与语法自动化。
- Day 19–30：应用迁移。
- Day 31–40：DELF B1 四项专项。
- Day 41–50：模拟与修复。

每日强度：

- 5 小时：语法客观题 8、主动产出 6、应用 2、听力 2、阅读 2、写作 1、口语 2。
- 6.5 小时：语法客观题 10、主动产出 8、应用 3、听力 3、阅读 3、写作 1、口语 3。
- 8 小时：语法客观题 12、主动产出 10、应用 4、听力 4、阅读 4、写作 2、口语 4。

提高强度只增加当前阶段训练量，不覆盖已完成证据。

## V1.7.7 根因与修复

V1.7.6 的 Day-aware v2 只优先避开“前一天真实使用过的 Content ID”。因此 Day 3 的后部槽位仍有可能在有限旧内容池中回卷到 Day 1，出现 Day 3 第 3 篇阅读/第 3 组听力与 Day 1 重复。

V1.7.7 不再依赖有限池回卷。对真正通过 `S.assignments172` 做 Day → Content 分配的五类模块统一使用唯一槽位内容：

- reading
- listening
- writing
- speaking
- application

Day 3–50 每一个最大强度槽位都有独立稳定 ID：

- 阅读：`r177-dXX-sYY`
- 听力：`l177-dXX-sYY`
- 写作：`w177-dXX-sYY`
- 口语：`s177-dXX-sYY`
- 应用：`a177-dXX-sYY`

最大槽位按 8 小时强度预留：阅读 4、听力 4、写作 2、口语 4、应用 4。5h / 6.5h 只使用其中前部槽位，之后升强度会继续使用尚未开始的唯一槽位，不会回卷旧材料。

## 历史证据保护

V1.7.7 的第一原则是：修复未来分配，不牺牲真实历史。

以下槽位会锁定，不允许重新分配：

- 已计入当天完成数的阅读/听力/写作/口语/应用；
- 阅读/听力已有任意逐题答案；
- 写作/应用已有正文、提交记录或自动保存草稿；
- 口语已有完成记录或录音引用。

只有没有任何真实学习证据的后续槽位会被替换成新的 `*177-dXX-sYY` 内容。

## Day 3 第 3 篇阅读纠偏

Repair version：`day3-correction-v1`。

如果 Day 3 第 3 篇阅读已经完成，而且它与 Day 1 已完成阅读重复，V1.7.7 不删除旧答案、不减少 `daily.reading`、不回退全局阅读 attempts/correct，也不改写旧 Content ID。

系统会建立一个独立 replacement：

- `oldId`：原来误重复但已经完成的材料；
- `newId`：`r177-d03-s03`；
- `status`：`pending` → `completed`。

用户回到 Day 3 第 3 篇时会看到“Day 3 重复阅读纠偏”提示并完成一篇全新阅读。完成新材料后，只新增一条带 `replacementFor` 的纠偏证据；旧学习档案继续完整保留，原 Day 3 阅读完成数不被重复增加。

诊断：

`window.DELF50_NOREPEAT.replacement('reading', 3, 2)`

## Day 3 第 3 组听力

如果该槽位没有答题/完成证据，它会直接重新分配为：

`l177-d03-s03`

如果用户实际上已经产生过答题证据，则旧记录锁定不删，并使用与阅读相同的 replacement 纠偏机制。

## 全量未完成分配审计

V1.7.7 增加运行时审计：

`window.DELF50_NOREPEAT.audit()`

审计同时检查：

1. Content ID 是否重复；
2. 阅读正文、听力脚本、写作 prompt、口语 prompt、应用 task 的规范化全文是否完全重复。

审计把问题分成：

- `unresolved`：未来/未完成分配仍然重复，必须修复；
- `protectedHistorical`：历史中已经产生真实学习证据的重复，只保留档案，不再继续分配。

V1.7.7 本地冲突模拟覆盖 Day 3–50 最大强度槽位：

- 阅读 196 个槽位；
- 听力 196 个槽位；
- 写作 98 个槽位；
- 口语 196 个槽位；
- 应用 196 个槽位。

测试结果：未来未完成分配 `unresolved = 0`。历史中已锁定的旧重复可以继续存在于只读档案，这是为了满足“不影响之前已经完成的学习记录”。

### 语法模块边界

语法不走 `S.assignments172` 的 Day → Content 分配器，而是独立的 Grammar Gym / 间隔复测体系。复习同一语法知识点属于课程设计的一部分，不应和“把同一篇阅读/同一段听力错误分配到不同 Day”混为一谈。V1.7.7 的全程唯一约束针对五类分配型内容模块；语法题仍按知识节点、错误回炉和延迟复测规则运行。

## 自动保存与存储

- `localStorage`：学习状态、答题、进度、Day 计划、assignments、草稿、repair/replacement marker、兼容元数据。
- IndexedDB `delf50_audio_v1`：口语录音 Blob。
- JSON 备份：学习状态迁移，不包含录音 Blob。

Vercel 服务端无法读取用户本机 localStorage。因此服务器可以验证 V1.7.7 代码和分配器已经上线，但某个用户的 Day 3 replacement 只有在保存原数据的同一浏览器打开新版后才会实际建立。

## 主要文件

- `content/curriculum-v17.json`
- `content/source-catalog-v17.json`
- `content/grammar-guides-v174.js`
- `v17-pedagogy.js`
- `v171-user-manual.js`
- `v172-compat-architecture.js`
- `v173-learning-archive.js`
- `v174-navigation.js`
- `v175-day-content-routing.js`
- `v176-day2-lifecycle-ui.js`
- `v176-day2-reading-repair.js`
- `v177-global-unique-routing.js`
- `api/source.js`

## 当前生产标记

- `X-DELF50-App: 1.7.7`
- `X-DELF50-Schema: 2`
- `X-DELF50-Content: 1.7.3`
- `X-DELF50-Day-Routing: global-unique-v1`
- `X-DELF50-Day3-Correction: day3-correction-v1`
- `X-DELF50-No-Repeat-Audit: runtime`
- `X-DELF50-Lifecycle: completion-lock-v1`
- `X-DELF50-Grammar-UI: lean-v1`
- `X-DELF50-Navigation: separate-cursor`

稳定启动策略保持不变：静态首屏先显示，浏览器再加载 13 个模块；Vercel `/api/source` 在返回最终组合 JavaScript 前执行编译检查。