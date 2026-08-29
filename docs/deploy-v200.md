# DELF50 v1.9.0 · 上线说明

我无法直接 push：本会话对 `Happyxixi333/delf50-web` 只有读权限，push 被 GitHub 授权层拒绝
（`Claude doesn't have GitHub access to ... for your organization`）。开通方式二选一：

- 组织管理员安装 Claude GitHub App：https://github.com/apps/claude/installations/select_target
- 或在 claude.ai 重新连接 GitHub：https://claude.ai/customize/connectors?auth_start=github&auth_start_force=1

开通后我可以直接推送并开 PR。在此之前，用下面任一方式落地这次改动。

## 方式 A：git bundle（推荐，保留提交信息）

```bash
cd <你的 delf50-web 本地仓库>
git fetch origin main && git checkout main && git pull
git bundle verify /path/to/delf50-v1.9.0.bundle
git pull /path/to/delf50-v1.9.0.bundle claude/delf50-optimization-deploy-p4cn1t
git push origin main
```

## 方式 B：打补丁

```bash
cd <你的 delf50-web 本地仓库>
git checkout main && git pull
git apply --stat /path/to/delf50-v1.9.0.patch   # 先看清单
git apply /path/to/delf50-v1.9.0.patch
git add -A && git commit -m "Serve the bundle from the deployment and hand-author days 4-20"
git push origin main
```

## 方式 C：直接覆盖文件

解压 `delf50-v1.9.0-files.zip`，按相同路径覆盖到仓库，然后提交推送。
文件清单见下方「本次改动」。

## Vercel

项目已连接 Git，push 到 `main` 会自动触发生产部署，**地址不变**
（`https://delf50-mvp.vercel.app`）。无需任何构建配置：`build/bundle-parts.js`
已随代码提交，`api/source.js` 直接 require 它。

若项目未连接 Git，在仓库根目录执行 `vercel --prod`（不要用无源码的强制部署）。

## 上线后验证

```bash
# 1. 版本已更新
curl -s https://delf50-mvp.vercel.app/release-meta.js | grep -E "app:|content:|cacheKey:"
#    期望 app:'1.9.0'  content:'1.9.0'  cacheKey:'v200-corpus-authored'

# 2. bundle 正常，且来自部署本体而不是 GitHub
curl -sI "https://delf50-mvp.vercel.app/api/source?i=12&v=v200-corpus-authored" \
  | grep -iE "x-delf50-(app|build|bundle-origin|student-content)"
#    期望 x-delf50-bundle-origin: deployment-local-v1

# 3. 新材料在，旧生成层已下线
curl -s "https://delf50-mvp.vercel.app/api/source?i=12&v=v200-corpus-authored" | grep -c "__DELF50_CORPUS_V200"   # ≥1
curl -s "https://delf50-mvp.vercel.app/api/source?i=12&v=v200-corpus-authored" | grep -c "authentic-diversity-v3" # 0
```

打开网站后，在「进度」页应看到新增的「学习材料校验」卡片，状态为「✓ 全部通过」。
浏览器控制台执行 `__DELF50_CORPUS_AUDIT` 可看到明细；其中 `protectedItems`
列出的是**因为你已经做过而被冻结**的条目，属于正常。

## 本次改动

| 文件 | 状态 | 作用 |
|---|---|---|
| `scripts/build-bundle.js` | 新增 | 从仓库文件生成 `build/bundle-parts.js`，含 seed 校验与语法校验 |
| `scripts/verify.js` | 新增 | jsdom 端到端验证：学习记录保护 + 内容质量，共 34 项断言 |
| `build/bundle-parts.js` | 新增（生成物） | 随部署发布的 bundle，改内容后需重新生成 |
| `api/source.js` | 重写 | 从本地读取 bundle，不再抓 GitHub；浏览器接口契约不变 |
| `content/corpus-v200.js` | 新增 | Day 4 听力 s02–s04、Day 5–7 阅读听力各 4 篇（27 篇） |
| `content/corpus-v200-d04-d09.js` | 新增 | Day 4 阅读 4 篇 + 听力 s01、Day 8–9 各 8 篇（21 篇） |
| `content/corpus-v200-d10-d14.js` | 新增 | Day 10–14 阅读听力各 4 篇（40 篇） |
| `content/corpus-v200-d15-d20.js` | 新增 | Day 15–20 阅读听力各 4 篇（48 篇） |
| `v200-corpus-materials.js` | 新增 | 装载层：阻断式校验、身份锁定、来源显示、审计上屏 |
| `v176-day2-reading-repair.js` | 改为非破坏性 | 不再删除答题记录与回退计数器 |
| `release-meta.js` | 版本 1.9.0 | `cacheKey` 改为 `v200-corpus-authored`，击穿 CDN 缓存 |
| `index.html` | 删除死代码 | 移除已失效的 commit 常量；加载契约未变 |
| `README.md` | 更新 | 记录架构改动、内容口径与验证方式 |

`v199-authentic-materials.js` **未删除**，只是移出加载链，保留在仓库中供参考。

## 修改内容后必须重新构建

```bash
node scripts/build-bundle.js                  # 生成 build/bundle-parts.js
NODE_PATH=$(npm root -g) node scripts/verify.js   # 需要 jsdom：npm i -g jsdom
```

`scripts/verify.js` 会先检查 `build/bundle-parts.js` 是否与源文件一致，不一致直接失败——
避免「改了材料但没构建，线上没变化」这类问题。
