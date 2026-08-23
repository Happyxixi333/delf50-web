# DELF50 Web

A1+ → DELF B1 的 50 天网页备考训练系统。

## 当前生产版本

当前采用三层版本管理：

- App：`1.7.4`
- State Schema：`2`
- Teaching Content：`1.7.1`

生产地址：`https://delf50-mvp.vercel.app`

V1.7.4 在 V1.7.3 的学习档案基础上新增“学习材料翻页”和“18 个语法节点详细讲解”。State Schema 仍为 2，因此没有对既有用户状态做数据迁移；50 天路线、题库题目、阅读/听力篇章、写作/口语任务本身没有重排或替换。Teaching Content 从 1.7.0 升到 1.7.1，仅用于标记新增的语法教学讲解层。

## V1.7 → V1.7.4 演进

- V1.7：50 天逐日课程、教学化界面、内容来源可追溯。
- V1.7.1：主页用户手册、自动保存说明、写作/应用草稿自动保存。
- V1.7.2：Schema 2 兼容架构、同日加练不覆盖、Day 独立强度历史、Content ID 锁定、迁移安全快照。
- V1.7.3：新增只读“学习档案”，按 Day 回看文字、答题记录和本机口语录音。
- V1.7.4：阅读/听力/语法增加前后翻页；浏览位置与完成数量分离；18 个语法节点加入系统化基础详解。

## 50 天路线

- Day 1–18：基础与语法自动化。
- Day 19–30：应用迁移。
- Day 31–40：DELF B1 四项专项。
- Day 41–50：模拟与修复。

主要教学与架构资产：

- `content/curriculum-v17.json`
- `content/source-catalog-v17.json`
- `content/grammar-guides-v174.js`
- `v17-pedagogy.js`
- `v171-user-manual.js`
- `v172-compat-architecture.js`
- `v173-learning-archive.js`
- `v174-navigation.js`

## 每日强度

- 5 小时：语法客观题 8、主动产出 6、应用 2、听力 2、阅读 2、写作 1、口语 2。
- 6.5 小时：语法客观题 10、主动产出 8、应用 3、听力 3、阅读 3、写作 1、口语 3。
- 8 小时：语法客观题 12、主动产出 10、应用 4、听力 4、阅读 4、写作 2、口语 4。

高强度只增加当前阶段的不同材料、重复调用和复盘，不越级引入后续语法。

## V1.7.4 翻页机制

V1.7.4 正式将“当前正在浏览哪一题/哪一篇”和“真正完成了多少训练”分离。

### 阅读与听力

阅读和听力使用独立的临时 browse cursor：

- `上一篇 / 上一组`：回看已经完成的材料；
- `下一篇 / 下一组`：在已经解锁的范围内前进；
- 单纯翻页不会增加 `daily().reading` / `daily().listening`；
- 单纯翻页不会改变正确率或生成新的完成记录；
- 回看已完成材料后再次前进不会重复计数；
- 当前尚未完成的新材料不能被直接跳过，从而避免只靠翻页提前解锁后续材料；
- 进入阅读/听力页时，默认优先定位到当天“下一份尚未完成”的材料。

因此，完成阅读 1 后进入阅读 2，可以随时翻回阅读 1 查看原文和答案，再返回阅读 2，不需要等全天阅读配额全部做完后才循环。

### 语法

每个语法节点新增：

`← 上一题 | 第 x / n 题 | 下一题 →`

翻题只改变 `UI.gQ`，不会增加：

- `S.grammar.attempts`
- `daily().grammar`
- 客观正确/错误计数

只有真正选择答案并提交后，才产生训练证据。

历史已作答题如果存在 Content ID 记录，会在翻页区域显示“历史：正确 / 需复盘”。

V1.7.4 暴露诊断入口：

`window.DELF50_NAVIGATION`

用于检查当前阅读/听力 browse cursor、可浏览范围和语法详解节点数量。

## V1.7.4 语法基础详解

18 个现有高收益语法节点全部增加了更完整的教学卡，但没有替换原来的客观题或 Content ID。

每个节点统一按五层展开：

1. **核心结构 / 变位**：先把形式和句子骨架讲清楚。
2. **最小对比**：对比相似结构，解释“什么时候用哪个”。
3. **高频错误**：展示 A1+/A2 学习者常见错误以及错误原因。
4. **DELF 调用场景**：说明这个语法会在写作、口语或互动中如何实际使用。
5. **主动产出**：从识别题过渡到变形、造句、口头表达和真实任务。

详细讲解覆盖：

- Présent
- Négation
- Questions
- pouvoir / devoir / vouloir
- Articles & quantité
- Adjectifs & accords
- Prépositions & temps
- Passé composé
- Imparfait
- Passé composé vs imparfait
- Futur proche / futur simple
- COD / COI
- y / en
- qui / que / où
- Conditionnel présent
- Connecteurs
- Comparaison
- Opinion & argumentation

教学卡采用折叠式 UI。默认打开核心结构，其余内容按需展开，避免为了“讲得详细”把语法页变成长篇文字堆叠。

## 同一天加练

Schema 2 将“已经完成多少”和“当前强度要求多少”分开管理。

例如 Day 8 在 5 小时模式已完成语法 8、应用 2、听力 2、阅读 2、写作 1、口语 2，之后切到 8 小时模式时，以上记录保持不变，只提高当天目标。已经完成的额外训练以后即使再降回 5 小时也不会被删除。

每个 Day 的强度历史保存在 `S.dayPlans172`，包括起始强度、当前强度、最高强度、强度切换历史与完成快照。

## 自动保存与存储边界

学习状态通过 `save()` 自动写入本机浏览器。

自动保存包括：答题、Day/强度调整、应用/写作提交、口语任务与录音、错题/复习，以及写作和应用的延迟草稿保存。

存储位置：

- `localStorage`：学习状态、答题、进度、写作/应用正文、草稿、Day 计划和兼容元数据。
- IndexedDB `delf50_audio_v1` / `clips`：口语录音 Blob。
- JSON 导出/导入：学习状态备份与迁移，不包含录音文件。

翻页 cursor 属于 UI 浏览状态，不作为“学习完成证据”写入历史，因此浏览上一篇/下一篇不会污染自动保存记录。

## 学习档案

主页和“进度”页提供「学习档案」入口。

档案是只读视图，按 Day 1–50 查看：

- 当天学习强度与加练历史；
- 语法训练记录；
- 阅读/听力完成材料和可用的逐题答案历史；
- 写作/应用正文和自动保存草稿；
- 口语记录、录音时长及当前浏览器 IndexedDB 中的录音播放；
- 词块、复习计数、最后活动时间和 Content ID。

切换档案 Day、展开文字和播放录音不会改变当前学习 Day。

只读诊断入口：`window.DELF50_ARCHIVE`。

## State Schema 2 与兼容规则

Schema 2 使用 additive migration：只允许增加和补充数据，不允许静默删除或重算已有学习证据。

首次从旧 Schema 升级时，会尝试创建迁移前安全快照：

`delf50_safety_snapshot_pre_schema2`

受保护指标包括 selectedDay、语法/阅读/听力 attempts 与 correct、应用/写作/口语记录数、口语累计时长、错题数量和历史任务完成量。

架构规范：`docs/compatibility-v172.md`

## Content ID 与题库扩展保护

每日材料分配按稳定 Content ID 锁定在 `S.assignments172`。

长期规则：已有 ID 不改名、不复用；新内容优先 append；修正旧内容应保留 ID 并记录 revision/change history。

当前追溯审计维持：

- provenance / traceId：464 个；
- 可分配内容 ID：120 个；
- 缺失：0；
- 重复：0。

V1.7.4 的语法讲解层不会更改这些已有题目 ID。

## 来源与可追溯性

DELF50 自编题明确标记为原创训练材料，不冒充 France Éducation international 官方真题。

核心来源包括 France Éducation international、Council of Europe CEFR、Académie française；RFI / TV5MONDE 作为拓展链接，不复制受版权保护内容。

内容规范：`docs/content-model.md`

## 当前内容规模

题库与任务数量没有因 V1.7.4 改变：

- 18 个高收益语法节点；
- 阅读 24 篇；
- 听力 24 组；
- 写作 24 项；
- 口语 24 项；
- 应用情境 24 项。

Teaching Content `1.7.1` 相比 1.7.0 新增的是 18 个语法节点的详细教学说明，而不是重排或替换已有题库。

## 稳定启动

首屏静态 HTML 永远可见。浏览器继续保持 13/13 稳定启动链；新增 V1.7.4 逻辑由 Vercel 服务端组合进最后一个模块，并在返回浏览器前执行 JavaScript 编译检查，不增加客户端启动请求数。

当前生产响应头：

- `X-DELF50-App: 1.7.4`
- `X-DELF50-Schema: 2`
- `X-DELF50-Content: 1.7.1`
- `X-DELF50-Archive: read-only`
- `X-DELF50-Navigation: separate-cursor`
- `X-DELF50-Grammar-Guides: 18`
