# DELF50 内容与追溯模型

## 目标

课程内容必须同时满足：教学可用、可扩展、可追溯。任何新增材料不得只是一段无来源的字符串。

## 内容层级

- `CurriculumManifest`：Day 1–50 的教学目标、前置复习、输入、输出、检查点与来源依据。
- `GrammarNode`：语法节点及问题列表。
- `ReadingItem` / `ListeningItem`：篇章或脚本 + 客观问题。
- `WritingTask` / `SpeakingTask` / `ApplicationTask`：输出任务。
- `provenance`：每个内容项的来源元数据。

## provenance 字段

```text
traceId      稳定追溯 ID，例如 GQ-present-01 / RQ-r16-01-1
kind         original / official / reference / extension
author       原创内容作者标识，目前为 DELF50
basis        设计依据 sourceId 列表
extension    可继续学习的外部资源 sourceId 列表
note         版权/性质说明
```

## 来源原则

1. DELF50 自编文字、问题和选项必须标记为“DELF50原创训练材料”。
2. France Éducation international 的样题只用于考试结构与评分标准对齐，不复制、改写后冒充本站原创，也不把本站原创题称为官方题。
3. RFI / TV5MONDE 只作为拓展真实输入链接，除非未来取得明确授权，否则不复制其文章、音频或练习正文。
4. Académie française 等规范资源用于语言查证，不批量复制受保护内容。
5. 新增内容必须通过 provenance coverage audit；目标始终为 100%。

## 教学路线

- Day 1–18：基础与语法自动化
- Day 19–30：应用迁移
- Day 31–40：DELF 四项专项
- Day 41–50：模拟、错因定位和修复

新增材料必须设置适用阶段，不能为了提高 8 小时档题量而提前引入后续阶段的新语法。
