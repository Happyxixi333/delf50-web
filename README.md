# DELF50 Web

A1+ → DELF B1 的 50 天网页备考训练系统。

## 当前生产版本

采用三层版本管理：

- App：`1.7.5`
- State Schema：`2`
- Teaching Content：`1.7.1`

生产地址：`https://delf50-mvp.vercel.app`

V1.7.5 是“Day → 学习材料路由”修复版。本次没有修改 50 天课程、题目正文、阅读/听力篇章、写作/口语任务或来源数据，也没有升级 State Schema。修复目标是：当某一天没有恰好 `minDay = 当天` 的新材料时，不再从同一个阶段池第 1 项重新开始，避免 Day 2 等新学习日重复拿到 Day 1 的阅读、听力、写作、口语和应用任务。

## V1.7 → V1.7.5 演进

- V1.7：50 天逐日课程、教学化界面、内容来源可追溯。
- V1.7.1：主页用户手册、自动保存说明、写作/应用草稿自动保存。
- V1.7.2：Schema 2 兼容架构、同日加练不覆盖、Day 独立强度历史、Content ID 锁定、迁移安全快照。
- V1.7.3：只读学习档案，按 Day 回看文字、答题记录和本机口语录音。
- V1.7.4：阅读/听力/语法增加前后翻页；浏览位置与完成数量分离；18 个语法节点加入系统化基础详解。
- V1.7.5：新增 day-aware 内容路由；相邻学习日优先分配不同 Content ID，同时保护已经开始或完成的历史材料链接。

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
- `v175-day-content-routing.js`

## 每日强度

- 5 小时：语法客观题 8、主动产出 6、应用 2、听力 2、阅读 2、写作 1、口语 2。
- 6.5 小时：语法客观题 10、主动产出 8、应用 3、听力 3、阅读 3、写作 1、口语 3。
- 8 小时：语法客观题 12、主动产出 10、应用 4、听力 4、阅读 4、写作 2、口语 4。

提高强度只增加当前阶段的训练量，不覆盖当天已经完成的内容，也不越级引入后续语法。

## V1.7.5 Day-aware 内容路由

### 修复的问题

旧分配逻辑在每个新 Day 都从 `stagePool()` 的第一个可用材料开始。若 Day 2 没有新的 `minDay: 2` 材料，Day 2 会再次得到 Day 1 阶段池的首批材料，因此出现“语法已经进入 Day 2，但阅读、听力、写作/口语/应用仍像 Day 1”的现象。

### 新路由规则

V1.7.5 对以下五类材料统一使用 Day-aware 路由：

- reading
- listening
- writing
- speaking
- application

规则：

1. 只从 `minDay <= 当前 Day` 的材料中选择，不提前越级。
2. 当天有新解锁材料时，优先使用最新解锁层。
3. 当天没有新解锁材料时，根据 Day 在可用池中做稳定轮换，而不是每一天都从索引 0 开始。
4. 新一天优先避开前一天已经分配过的 Content ID；只有当前可用池不足时才允许复用。
5. 分配结果继续持久化在 `S.assignments172`，因此学习档案、自动保存和 Content ID 追溯仍使用同一数据源。

### 历史数据保护

V1.7.5 不会为了修正路由而重新分配已经产生真实学习证据的内容。

锁定规则：

- 阅读/听力：已经有逐题答案的材料锁定；
- 阅读/听力：已经计入当天完成数的前缀锁定；
- 写作/应用：已有提交记录或当前自动保存草稿时，对应任务锁定；
- 口语：已经完成或录音的任务前缀锁定；
- 只允许重排尚未开始的后续槽位。

因此，如果旧版本曾经把 Day 2 的某篇材料错误链接成 Day 1 材料，但用户尚未开始做，V1.7.5 会安全纠正；如果用户已经实际作答、写过正文或录过音，该材料保持原 Content ID，不牺牲历史记录来追求“看起来更新”。

诊断入口：

`window.DELF50_ROUTING`

可查看 routing version、某 Day 的候选路由、最终 assignments、解析后的材料和已锁定前缀。

当前路由标记：`day-aware-v1`。

## V1.7.4 翻页机制

阅读和听力正式将“浏览位置”和“真正完成数量”分离：上一篇/下一篇只在已解锁范围内移动，不增加完成数、不改变正确率、不生成重复完成记录；当前尚未完成的新材料不能被翻页直接跳过。

语法使用：

`← 上一题 | 第 x / n 题 | 下一题 →`

翻题只改变 `UI.gQ`，只有真正提交答案才增加 `S.grammar.attempts` 与当天语法训练量。

诊断入口：`window.DELF50_NAVIGATION`。

## 语法基础详解

18 个高收益语法节点采用统一五层教学卡：

1. 核心结构 / 变位；
2. 最小对比；
3. 高频错误；
4. DELF 调用场景；
5. 主动产出。

讲解层采用折叠 UI，并未替换已有语法题或 Content ID。

## 同一天加练

Schema 2 将“已经完成多少”和“当前强度要求多少”分开管理。5h → 6.5h → 8h 只提高目标配额，之前完成的语法、听读、写作、口语、应用及答案不会被删除或覆盖。

每个 Day 的强度历史保存在 `S.dayPlans172`，包括起始强度、当前强度、最高强度、切换事件和完成快照。

## 自动保存与存储边界

- `localStorage`：学习状态、答题、进度、写作/应用正文、草稿、Day 计划、Content assignments 和兼容元数据。
- IndexedDB `delf50_audio_v1` / `clips`：口语录音 Blob。
- JSON 导出/导入：学习状态备份与迁移，不包含录音文件。

答题、任务完成、Day/强度调整、写作/应用提交、口语记录会自动保存；写作和应用输入停止约 650 ms 后保存草稿。

浏览翻页本身不作为学习完成证据。V1.7.5 在需要修正“尚未开始的错误预分配”时只更新 assignments，不伪造学习活动。

## 学习档案

主页和“进度”页提供只读「学习档案」。按 Day 1–50 查看：

- 当天强度与加练历史；
- 语法训练记录；
- 阅读/听力完成材料及可用逐题答案；
- 写作/应用正文和草稿；
- 口语记录、时长和当前浏览器中的录音播放；
- Content ID 与最后活动时间。

查看档案不会改变当前学习 Day。

诊断入口：`window.DELF50_ARCHIVE`。

## State Schema 2 与兼容规则

Schema 2 使用 additive migration：只增加和补充字段，不允许静默删除或重算既有学习证据。

首次从旧 Schema 升级时会尝试创建：

`delf50_safety_snapshot_pre_schema2`

受保护指标包括 selectedDay、语法/阅读/听力 attempts 与 correct、应用/写作/口语记录数、口语累计时长、错题数量和历史任务完成量。

架构规范：`docs/compatibility-v172.md`

## Content ID 与可追溯性

每日材料分配按稳定 Content ID 保存在 `S.assignments172`。

长期规则：

- 已有 ID 不改名；
- 不复用旧 ID；
- 新内容优先 append；
- 修正旧内容时保留 ID，并记录 revision/change history。

当前追溯审计维持：

- provenance / traceId：464 个；
- 可分配内容 ID：120 个；
- 缺失：0；
- 重复：0。

DELF50 自编题明确标记为原创训练材料，不冒充官方真题。核心依据包括 France Éducation international、Council of Europe CEFR、Académie française；RFI / TV5MONDE 为拓展学习链接。

内容规范：`docs/content-model.md`

## 当前内容规模

V1.7.5 没有改变题库规模：

- 18 个高收益语法节点；
- 阅读 24 篇；
- 听力 24 组；
- 写作 24 项；
- 口语 24 项；
- 应用情境 24 项。

Teaching Content 仍为 `1.7.1`。本次只修内容与 Day 的链接算法。

## 稳定启动

首屏静态 HTML 永远可见。浏览器保持 13/13 启动链；V1.7–V1.7.5 的后续功能由 Vercel 服务端组合到最后一个模块，并在返回浏览器前执行 JavaScript 编译检查。

当前生产响应头：

- `X-DELF50-App: 1.7.5`
- `X-DELF50-Schema: 2`
- `X-DELF50-Content: 1.7.1`
- `X-DELF50-Archive: read-only`
- `X-DELF50-Navigation: separate-cursor`
- `X-DELF50-Grammar-Guides: 18`
- `X-DELF50-Day-Routing: day-aware-v1`
