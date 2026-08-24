# DELF50 Web

A1+ → DELF B1 的 50 天网页备考训练系统。

## 当前生产版本

采用三层版本管理：

- App：`1.7.6`
- State Schema：`2`
- Teaching Content：`1.7.2`

生产地址：`https://delf50-mvp.vercel.app`

V1.7.6 解决三个实际学习问题：Day 2 与 Day 1 学习材料重复、语法页经过多轮功能叠加后信息层级冗余、已完成学习日被下一次打开页面的活动时间继续污染。本版同时包含一个一次性的 Day 2 重复阅读历史纠偏器，用于精准撤销修复上线前误计入 Day 2 的重复阅读证据；它不会删除 Day 1 的对应学习记录。

## V1.7 → V1.7.6 演进

- V1.7：50 天逐日课程、教学化界面、内容来源可追溯。
- V1.7.1：主页用户手册、自动保存说明、写作/应用草稿自动保存。
- V1.7.2：Schema 2 兼容架构、同日加练不覆盖、Day 独立强度历史、Content ID 锁定、迁移安全快照。
- V1.7.3：只读学习档案，按 Day 回看文字、答题记录和本机口语录音。
- V1.7.4：阅读/听力/语法前后翻页；浏览位置与完成数量分离；18 个语法节点加入系统化基础详解。
- V1.7.5：初版 Day-aware 路由，开始修复不同学习日重复取同一阶段池首项的问题。
- V1.7.6：Day-aware v2、Day 2 专属内容层、精简语法 UI、完成时间锁定与跨自然日自动进入下一 Day，以及一次性 Day 2 重复阅读证据修复。

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
- `v176-day2-lifecycle-ui.js`
- `v176-day2-reading-repair.js`

## 每日强度与同日加练

- 5 小时：语法客观题 8、主动产出 6、应用 2、听力 2、阅读 2、写作 1、口语 2。
- 6.5 小时：语法客观题 10、主动产出 8、应用 3、听力 3、阅读 3、写作 1、口语 3。
- 8 小时：语法客观题 12、主动产出 10、应用 4、听力 4、阅读 4、写作 2、口语 4。

5h → 6.5h → 8h 只提高当天目标配额。已经完成的题、正文、录音和 Content ID 不会因为强度变化被覆盖；降低强度也不会删除已经完成的额外训练。

## V1.7.6 Day-aware v2

### 根因

V1.7.5 仍存在一个边界问题：为了避免相邻学习日重复，它把前一天为 8 小时最大配额预分配的 Content ID 也视作“已经使用”。这会在早期小题库中造成过度避重和绕回。

更重要的是，旧早期题库虽然有 Day 1 内容，但部分类型没有真正的 `minDay: 2` 内容层，因此单纯轮换 Day 1 材料无法做到教学目标与 Day 2 对齐。

### 新路由原则

`day-aware-v2` 对 reading / listening / writing / speaking / application 统一执行：

1. 只使用 `minDay <= 当前 Day` 的内容，不越级。
2. 当前 Day 有专属新解锁层时，优先使用该层。
3. 相邻日避重只依据真实学习证据：完成数、逐题答案、已提交正文、草稿或口语记录；纯预分配槽位不再算作“已学”。
4. 已经真实开始或完成的历史前缀继续锁定，不因路由升级重排。
5. 尚未开始的槽位可以安全重新计算。
6. 分配继续保存在 `S.assignments172`，Content ID 仍是长期追溯主键。

生产标记：`X-DELF50-Day-Routing: day-aware-v2`。

## Day 2 专属教学内容

Teaching Content `1.7.2` 新增一层真正属于 Day 2 的原创材料，课程目标对齐“描述、冠词、形容词、提问 / 人物与城市”：

- 阅读 4 篇：人物描述、房源、城市介绍、人物识别。
- 听力 4 组：人物寻找、房屋信息、问路、社区描述。
- 写作 2 项：描述人物/地点；询问住房信息。
- 口语 4 项：描述社区、旅游咨询、介绍人物、看房互动。
- 应用 4 项：旅游咨询、住房电话、人物识别、课程咨询。

这些材料使用独立稳定 Content ID，例如：

- `READ-r176-d2-01`
- `LIST-l176-d2-01`
- `WRITE-w176-d2-01`
- `SPEAK-s176-d2-01`
- `APP-a176-d2-01`

全部明确标记为 DELF50 原创训练材料，并保留 France Éducation international / CEFR 设计依据，不冒充官方真题。

加入 Day 2 内容后，当前池规模约为：阅读 28、听力 28、写作 26、口语 28、应用 28；18 个核心语法节点保持不变。

## 一次性 Day 2 重复阅读修复

文件：`v176-day2-reading-repair.js`

Repair ID：`day2-duplicate-reading-evidence-v1`

用途只针对 V1.7.6 上线前已经发生的历史错误：用户在 Day 2 完成了与 Day 1 相同的阅读材料。

首次在原浏览器加载 V1.7.6 时，修复器会：

1. 读取 Day 1 实际完成的阅读 Content ID。
2. 读取 Day 2 已完成的阅读 Content ID。
3. 只选择两天真正重复、且属于旧阅读池的 Day 2 记录。
4. 删除这些重复材料在 Day 2 的逐题答案；Day 1 同一材料的答案保持不变。
5. 根据被删除答案实际是否正确，精确回退 `S.reading.attempts` 与 `S.reading.correct`，而不是固定减去某个假定分数。
6. 回退 Day 2 `daily.reading` 已完成篇数和兼容索引。
7. 清除 Day 2 旧阅读 assignments，并从新的 Day 2 专属内容层重新分配。
8. 把浏览 cursor 回到新的 Day 2 阅读起点。
9. 写入 `S.repairs176[repairId]`，保证同一浏览器只执行一次，不会重复扣除。

浏览器诊断：`window.DELF50_DAY2_REPAIR.result`。

注意：Vercel 服务端无法读取用户本机 localStorage。因此生产部署只能保证修复逻辑已上线；具体用户的 Day 2 历史只有在该用户用保存原数据的同一浏览器首次打开 V1.7.6 时才会实际纠偏。

## V1.7.6 完成时间锁定与自动进入下一 Day

以前 `lastActivityAt` 既承担活动时间又被用户理解为一天的结束时间；如果第二天再次打开前一天，它会被继续更新，从而污染上一学习日的时间边界。

V1.7.6 新增 `completion-lock-v1`：

- 当某 Day 在当前强度下达到全部学习配额时，写入 `completedAt176`、`completedLocalDate176` 和 `completedIntensity176`。
- 普通页面打开、档案回看和后续保存不会覆盖这个已锁定完成时间。
- 如果完成后主动把强度升级，并且新强度尚未完成，则旧完成点写入 `completionHistory176`，当前 Day 重新进入“待完成”。
- 如果当前 Day 已完成，而且下一次打开已经是另一个自然日，系统会在新的学习操作发生前自动切到 `Day + 1`。
- 学习档案优先展示“完成时间（已锁定）”，而不是把下一次打开页面的活动时间当作上一天结束时间。

生产标记：`X-DELF50-Lifecycle: completion-lock-v1`。

## V1.7.6 精简语法 UI

V1.7.4 之后语法页曾同时存在旧 Grammar Gym、配额卡、翻题条、完整知识地图、深度讲解和主动产出区，属于多版本功能叠加造成的信息重复。

V1.7.6 不再通过 CSS 隐藏旧块，而是使用单一 renderer 重建语法页：

1. 一个语法页头。
2. 一个“今日节点”摘要：节点选择、客观题进度、主动产出进度、节点正确率。
3. 一个题目卡：前后翻题、例句、来源、题目和答案反馈。
4. 一个折叠的“知识讲解与常见错误”：核心结构、最小对比、高频错误、DELF 调用。
5. 一个唯一的主动产出区。

完整 18 节点知识地图不再与当前题目并排重复显示；节点切换改为紧凑选择器。详细语法知识本身仍保留，只重新组织信息层级。

生产标记：`X-DELF50-Grammar-UI: lean-v1`。

## 翻页机制

阅读和听力使用独立 browse cursor。上一篇/下一篇只在已解锁范围内浏览：

- 不增加完成数；
- 不改变正确率；
- 不生成重复完成记录；
- 未完成的新材料不能被连续翻页绕过。

语法前后题同样只改变 UI cursor，只有提交答案才增加训练证据。

生产标记：`X-DELF50-Navigation: separate-cursor`。

## 自动保存与存储边界

- `localStorage`：学习状态、答题、进度、写作/应用正文、草稿、Day 计划、Content assignments、repair marker 和兼容元数据。
- IndexedDB `delf50_audio_v1` / `clips`：口语录音 Blob。
- JSON 导出/导入：学习状态备份与迁移，不包含录音文件。

答题、任务完成、Day/强度调整、写作/应用提交、口语记录自动保存；写作和应用输入停止约 650 ms 后保存草稿。

## 学习档案

主页和“进度”页提供只读「学习档案」，可按 Day 查看：

- 强度与加练历史；
- 锁定后的完成时间；
- 语法训练记录；
- 阅读/听力材料与可用逐题答案；
- 写作/应用正文和草稿；
- 口语记录、时长及当前浏览器 IndexedDB 中的录音；
- Content ID、复习数据和活动记录。

查看档案不会改变当前学习 Day 或学习完成证据。

## State Schema 2 与兼容原则

Schema 仍为 `2`。V1.7.6 没有做全局 State Schema 迁移；Day 2 重复阅读纠偏是带一次性 marker 的狭窄数据修复，不改变其他 Day、其他技能或 Day 1 的正确历史。

长期原则：

- 状态升级使用 additive migration；
- 已有 Content ID 不改名、不复用；
- 新模块使用独立字段；
- 历史学习证据默认只保留、不重算；
- 若必须纠正历史 bug，修复器必须具有明确适用条件、精确回退逻辑、一次性 marker 和可审计结果。

首次从旧 Schema 升级时的安全快照仍为：

`delf50_safety_snapshot_pre_schema2`

架构规范：`docs/compatibility-v172.md`

## 来源与可追溯性

所有 DELF50 自编题明确标记为原创训练材料。官方资源仅作为能力、考试结构与评分标准依据。

核心依据包括：

- France Éducation international
- Council of Europe CEFR
- Académie française
- RFI / TV5MONDE 仅作为外部拓展入口

内容规范：`docs/content-model.md`

## 稳定启动与当前生产标记

首屏静态 HTML 永远可见。浏览器继续保持 13/13 启动链；V1.7.x 后续模块由 Vercel 服务端组合到最后一个模块，并在返回浏览器前执行 JavaScript 编译检查。

当前生产响应头：

- `X-DELF50-App: 1.7.6`
- `X-DELF50-Schema: 2`
- `X-DELF50-Content: 1.7.2`
- `X-DELF50-Archive: read-only`
- `X-DELF50-Navigation: separate-cursor`
- `X-DELF50-Grammar-Guides: 18`
- `X-DELF50-Day-Routing: day-aware-v2`
- `X-DELF50-Lifecycle: completion-lock-v1`
- `X-DELF50-Grammar-UI: lean-v1`
- `X-DELF50-Day2-Reading-Repair: precise-v1`
