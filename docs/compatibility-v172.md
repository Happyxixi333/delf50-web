# DELF50 V1.7.2 兼容性架构

本版本只更新状态、迁移和内容分配架构，不修改任何教学内容。

## 1. 同日强度切换

学习进度与目标配额分离保存。

- 已完成数量保存在 `S.daily[day]`、客观题答案、写作/应用/口语 records、错题和录音引用中。
- 当前强度只决定目标配额，不重置任何已完成数量。
- `S.dayPlans172[day]` 保存：`startedIntensity`、`currentIntensity`、`maxIntensityReached`、`startedTargets`、`intensityEvents`、`completedSnapshot`。
- 在当天还没有学习证据前调整 5h / 6.5h / 8h，只视为设置计划，不生成 upgrade 事件。
- 当天已经产生学习证据后再提高强度，记录 `upgrade`；降低则记录 `downgrade`。历史学习记录始终保留。

词块与复习从 V1.7.2 开始增加 `practiceCounters172`。旧版只有完成/未完成 Boolean 的记录会保守迁移，不会凭空放大历史训练量。

## 2. Schema 与迁移

状态 Schema 为 `2`，教学内容版本仍为 `1.7.0`。

`S.meta172` 保存：

- `schemaVersion`
- `contentVersion`
- `appVersion`
- `migrations`
- `modules`
- `compatWarnings`

首次从旧 Schema 升级时，会在 localStorage 创建 `delf50_safety_snapshot_pre_schema2` 安全快照。

迁移采用 additive migration：只能新增字段、补充 ID 或元数据。受保护的旧指标在迁移前后必须保持一致，包括语法/阅读/听力 attempts 与 correct、写作/应用/口语 count 与 record 数、口语累计时长、错题数量和历史任务完成数。如果这些指标变化，迁移应失败而不是静默覆盖旧数据。

## 3. 内容 ID 与每日分配锁定

已有内容 ID 视为永久 ID：

- 不改名
- 不复用
- 不用一个旧 ID 替换成完全不同的内容

新增内容应 append，而不是重排已有内容。

`S.assignments172[day]` 按 Day 保存阅读、听力、写作、口语和应用的实际内容 ID。这样以后题库扩容或排序发生变化，已经学习过或已经分配给旧用户的内容不会因为数组位置变化而跳到别的材料。

`S.contentProgress172` 以 contentId / traceId 记录完成内容。V1.7.2 会检查当前所有 provenance traceId 与可分配内容 ID 是否缺失或重复。

## 4. 新模块接入

浏览器暴露 `window.DELF50_ARCH`：

- `registerModule(id, version, migrateFn)`：注册新模块，并以受保护 invariant 检查迁移。
- `report()`：返回当前 app/schema/content 版本、当天强度历史、content ID 审计和迁移数量。
- `changeIntensity()`：统一处理强度调整。
- `getDayPlan()` / `getAssignments()`：读取日计划和内容分配。
- `resolveAssignedContent()`：按稳定 ID 解析已分配材料。
- `contentAudit()`：检查内容 ID 完整性。

未来模块应使用独立命名空间字段，例如 `S.vocabularyV2`、`S.dictationV1`、`S.mockExamV1`，而不是改写现有字段的含义。

## 5. 发布兼容规则

每次发布新模块或内容扩展前至少检查：

1. 旧用户状态迁移后核心计数不减少；
2. 已有 contentId / traceId 不被删除、改名或复用；
3. 已分配材料在题库新增内容后仍解析为原 ID；
4. 5h → 8h 不清零或覆盖已完成学习；
5. 新模块拥有独立 migration；
6. Preview 通过后再发布 Production。

当前教学内容版本仍为 V1.7.0；V1.7.2 只改变兼容性架构。