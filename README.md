# DELF50 Web

A1+ → DELF B1 的 50 天网页备考训练系统。

## 当前生产版本

当前采用三层版本管理：

- App：`1.7.3`
- State Schema：`2`
- Teaching Content：`1.7.0`

生产地址：`https://delf50-mvp.vercel.app`

V1.7.3 只新增“学习档案”可视化模块；State Schema 仍为 2，教学内容、50 天课程规划和题库仍保持 Content 1.7.0，因此本轮不会重算、迁移或清空已有学习记录。

## V1.7 → V1.7.3 演进

- V1.7：50 天逐日课程、教学化界面、内容来源可追溯。
- V1.7.1：主页用户手册、自动保存说明、写作/应用草稿自动保存。
- V1.7.2：Schema 2 兼容架构、同日加练不覆盖、Day 独立强度历史、Content ID 锁定、迁移安全快照。
- V1.7.3：新增只读“学习档案”，按 Day 回看文字、答题记录和本机口语录音。

## 50 天路线

- Day 1–18：基础与语法自动化。
- Day 19–30：应用迁移。
- Day 31–40：DELF B1 四项专项。
- Day 41–50：模拟与修复。

主要教学资产：

- `content/curriculum-v17.json`
- `content/source-catalog-v17.json`
- `v17-pedagogy.js`
- `v171-user-manual.js`
- `v172-compat-architecture.js`
- `v173-learning-archive.js`

## 每日强度

- 5 小时：语法客观题 8、主动产出 6、应用 2、听力 2、阅读 2、写作 1、口语 2。
- 6.5 小时：语法客观题 10、主动产出 8、应用 3、听力 3、阅读 3、写作 1、口语 3。
- 8 小时：语法客观题 12、主动产出 10、应用 4、听力 4、阅读 4、写作 2、口语 4。

高强度只增加当前阶段的不同材料、重复调用和复盘，不越级引入后续语法。

## 同一天加练

V1.7.2+ 将“已经完成多少”和“当前强度要求多少”分开管理。

例如 Day 8 在 5 小时模式已完成语法 8、应用 2、听力 2、阅读 2、写作 1、口语 2，之后切换到 8 小时模式时，以上完成记录保持不变，只提高目标到语法 12、应用 4、听力 4、阅读 4、写作 2、口语 4。

每个 Day 的强度历史保存在 `S.dayPlans172`，包括：

- `startedIntensity`
- `currentIntensity`
- `maxIntensityReached`
- `intensityEvents`
- `startedAt`
- `lastActiveAt`
- `completedSnapshot`

学习前调整时长只修改计划；已有学习证据后再提高时长才记录为一次 upgrade。

## 自动保存与存储边界

学习状态通过 `save()` 自动写入本机浏览器。

自动保存包括：

- 语法、阅读、听力答题；
- Day 和强度调整；
- 应用、写作提交；
- 口语任务与录音完成；
- 错题/复习操作；
- 写作和应用输入停止约 650 ms 后保存草稿。

存储位置：

- `localStorage`：学习状态、答题、进度、写作/应用正文、草稿、Day 计划和兼容元数据。
- IndexedDB 数据库 `delf50_audio_v1` / object store `clips`：口语录音 Blob。
- JSON 导出/导入：学习状态备份与迁移，不包含录音文件。

当前尚未提供云同步。清除站点数据或换设备可能丢失本机录音，因此建议定期导出 JSON，并避免清理该站点浏览器数据。

## V1.7.3 学习档案

主页和“进度”页新增「学习档案」入口。

学习档案是只读视图：浏览 Day 1–50、切换档案天数、展开文字或播放录音，都不会改变当前学习 Day，也不会调用 `save()` 改写历史状态。

档案按 Day 展示：

- 当天起始/当前/最高学习强度及加练历史；
- 语法客观题数量和主动产出数量；
- 阅读、听力完成材料，若存在逐题记录则显示用户答案和正确答案；
- 写作已提交正文和未提交自动保存草稿；
- 应用任务已提交正文和未提交草稿；
- 口语记录、录音时长，并可从当前浏览器 IndexedDB 直接播放已保存录音；
- 词块和复习计数；
- 最后活动时间和 Content ID。

为了适应学习天数增加，档案不把 50 天内容一次全部展开。顶部提供 Day 下拉选择、前后切换以及“已学习 Day”快捷列表，详情只渲染当前选中的一天。

如果录音元数据存在但 IndexedDB 中找不到对应 Blob，档案会提示“可能在另一台设备录制或浏览器站点数据已被清理”，不会伪造可播放状态。

V1.7.3 暴露只读诊断入口：

`window.DELF50_ARCHIVE`

包含：

- `getRecordedDays()`
- `renderDay(day)`
- `hasDay(day)`

## State Schema 2 与兼容规则

Schema 2 使用 additive migration：只允许增加和补充数据，不允许静默删除或重算已有学习证据。

首次从旧 Schema 升级时，会尝试创建迁移前安全快照：

`delf50_safety_snapshot_pre_schema2`

受保护的历史指标包括：selectedDay、语法/阅读/听力 attempts 与 correct、应用/写作/口语记录数、口语累计时长、错题数量和历史任务完成量。

架构规范：`docs/compatibility-v172.md`

## Content ID 与题库扩展保护

每日材料分配按稳定 Content ID 锁定在 `S.assignments172`。

长期规则：

- 已有 ID 不改名；
- 不复用旧 ID；
- 新内容优先 append；
- 修正旧内容应保留 ID 并记录 revision/change history。

当前审计：

- provenance / traceId：464 个；
- 可分配内容 ID：120 个；
- 缺失：0；
- 重复：0。

## 新模块扩展规则

未来增加词汇、听写、Shadowing、AI 写作、AI 口语、SRS、Mock Exam 等模块时，应新增独立字段和 migration，不得修改既有核心字段的含义。

统一架构入口：`window.DELF50_ARCH`

包含 `registerModule()`、`report()`、`changeIntensity()`、`getDayPlan()`、`getAssignments()`、`resolveAssignedContent()` 和 `contentAudit()`。

## 来源与可追溯性

每个内容项拥有稳定 `traceId`。DELF50 自编题明确标记为原创训练材料，不冒充 France Éducation international 官方真题。

核心来源：

- France Éducation international：DELF B1 考试结构、样题、评分与备考要求。
- Council of Europe CEFR：B1 Can-do 与行动导向课程设计。
- Académie française：规范法语和词义查证。
- RFI / TV5MONDE：拓展学习链接，不复制受版权保护内容。

内容规范：`docs/content-model.md`

## 当前内容规模

Teaching Content 仍为 1.7.0：

- 18 个高收益语法节点；
- 阅读 24 篇；
- 听力 24 组；
- 写作 24 项；
- 口语 24 项；
- 应用情境 24 项。

## 稳定启动

首屏静态 HTML 永远可见。浏览器保持 13/13 稳定启动链；V1.6 内容层、V1.7 教学层、V1.7.1 用户手册、V1.7.2 兼容架构和 V1.7.3 学习档案由 Vercel 服务端组合到最后一个模块，并在返回浏览器前执行 JavaScript 编译检查。

当前生产响应头：

- `X-DELF50-App: 1.7.3`
- `X-DELF50-Schema: 2`
- `X-DELF50-Content: 1.7.0`
- `X-DELF50-Archive: read-only`
