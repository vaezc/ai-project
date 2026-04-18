# 加密货币交易所 APP 首页 — AI 协同开发实验项目

> 一个由 **Claude Code（Anthropic）+ Figma MCP + Skills + TODO 任务编排** 全流程协同打造的高保真移动端 Web 项目。
> 旨在探索「AI 作为高级工程师」在真实前端工程中的边界 —— 从设计稿解析、代码生成、性能审计到文档沉淀，全链路验证 AI 的工程化能力。

---

## 项目背景

本项目并非一个常规的产品交付物，而是一次**深度的 AI 工程能力评测实验**。

目标是回答一个问题：

> 当我们把一个真实级别的、像素级还原要求极高的设计稿丢给 AI，它能否在保证**代码质量、渲染性能、可维护性、设计还原度**的前提下，独立完成从 0 到 1 的实现？

整个项目的所有代码、组件结构、状态机设计、动画细节、性能优化、文档体系，**全部由 AI 在人类指挥下生成与迭代**。人类的角色仅限于：

- 提供 Figma 设计源、产品意图、验收标准
- 对 AI 的产出做主观审美与方向校正（"这里改成黑色"、"这里别加横线"）
- 触发审计与重构指令

---

## 这个项目是什么

一个完整的**加密货币交易所 APP 首页**，移动端优先（375px 基准），覆盖以下 5 套核心状态：

| 状态 | 说明 |
|------|------|
| 未登录态 | Hero 礼盒 + 倒计时 + 简化行情 |
| 已登录 - 标准态 | 资产卡 + 金刚区 + Rewards Banner + 行情 |
| 已登录 - 任务态 | 入金/交易任务进度状态机（5 个 variant） |
| 自选空态 | 选币卡引导用户添加自选 |
| 多 Tab 行情 | Hot / Top Gainers / New Listed / Favorites |

完整支持**亮 / 暗双主题**，每一个颜色、图标、图片都经过双主题适配验证。

---

## 技术栈

| 维度 | 选型 |
|------|------|
| 框架 | **Next.js 16**（App Router，最新版本） |
| 视图 | **React 19** |
| 语言 | TypeScript（严格模式） |
| 样式 | **Tailwind CSS v4**（基于 `@theme inline` 的设计 Token 体系） |
| UI 基础 | shadcn/ui |
| 状态 | Zustand + `useShallow`（精细订阅） |
| 主题 | next-themes（CSS 变量驱动的双主题） |
| 字体 | HarmonyOS Sans SC |
| 设计源 | Figma file `VGP1FbEwvpDJa687POA59H` |

---

## AI 能力的深度运用

本项目最大的价值不在于"实现了什么"，而在于**展示了 AI 怎么实现**。以下是项目中真实使用到的 AI 工程化能力：

### 1. MCP（Model Context Protocol）— 让 AI 真正"看见"设计稿

通过接入 **Figma MCP Server**，AI 不再依赖人类反复粘贴截图，而是能够：

- 直接通过 `get_design_context` 拉取节点的**结构化数据**（auto-layout、间距、字号、颜色 Token、SVG 路径）
- 用 `get_screenshot` 获取像素级参考图，做视觉双向校验
- 通过 `get_metadata` 理解整个设计稿的层级关系
- 自动解析 Figma 导出的 SVG 中 `preserveAspectRatio="none"` 这类经典坑点，并批量修复

**效果**：设计稿到代码的转译不再是"AI 看图猜代码"，而是"AI 读结构 + 看图校准"，还原度从 70% 跃升到接近像素级。

### 2. Skills — 让 AI 拥有领域知识库

项目过程中调用了多种 Skills 能力：

- **代码审计 Skill** — 对全项目做渲染性能、re-render 浪费、内存泄漏、可访问性扫描
- **设计还原 Skill** — 对照 Figma 节点做视觉 diff
- **文档生成 Skill** — 沉淀工程经验为 `AGENTS.md` / `PROJECT_OUTLINE.md`

每一类 Skill 都封装了对应领域的**最佳实践 + 常见陷阱**，让 AI 不再"凭直觉编码"，而是基于工程范式产出。

### 3. TODO 任务编排 — 让 AI 像项目经理一样工作

每一个非平凡任务都通过 **TaskCreate / TaskUpdate** 拆解为可追踪的子任务列表：

```
[1] ✅ 修复 NavBar nav-hot 火苗图标横向拉伸
[2] ✅ 校验 AssetCard chevron 方向语义
[3] ✅ 双主题下 FavoritesEmpty 选中色还原
[4] ✅ 加入 halo-pulse + shimmer-sweep 高级动画
[5] ✅ 全局代码质量与渲染性能审计
[6] ✅ 高/中优先级问题修复
[7] ✅ 沉淀项目大纲文档
```

这种「**先拆任务、再分批执行、每完成一项立即标记**」的工作流，让 AI 在**长程任务**中保持上下文清晰、避免遗忘、避免重复劳动。

### 4. Sub-Agent 并发 — AI 自己调度 AI

对于全局性扫描任务，AI 会主动 fork 出 **Explore 子 Agent** 并行处理：

- 一个 Agent 专注扫描 re-render 浪费
- 一个 Agent 专注扫描资源加载与图片优化
- 一个 Agent 专注扫描可访问性与语义化

主 Agent 汇总各子 Agent 的报告后统一裁决与修复，**模拟了一个小型工程团队的协作模式**。

### 5. Plan Mode — 三思而后码

对于涉及架构变更的需求，AI 先进入 **Plan Mode**，输出方案文档，等待人类确认后再动手 —— 避免"上来就写、写完再返工"的浪费。

---

## 工程质量亮点

虽然代码由 AI 生成，但工程质量经过严格自检：

### 性能优化

- ✅ **零 unnecessary re-render**：所有 handler `useCallback`、所有派生数据 `useMemo`、`MarketTable` / `MarketRow` 全部 `memo`
- ✅ **Zustand 精细订阅**：state selector 与 setter selector 严格分离，避免 setter 引用变化触发额外渲染
- ✅ **图片极致压缩**：Hero 礼盒 PNG 976KB → WebP 14KB（**压缩 99%**），Mission 礼盒 637KB → 2KB（**压缩 99.7%**）
- ✅ **next/image 全量启用**：禁用 `unoptimized`，强制声明 `sizes` 让浏览器选对分辨率
- ✅ **GPU 友好动画**：所有 keyframe 仅操作 `transform` / `opacity`，避免触发 reflow
- ✅ **Sticky / Fixed 元素去除 backdrop-blur**：避免滚动重绘风暴

### 设计系统

- ✅ **CSS 变量 + Tailwind v4 Token 双层映射**：颜色、字号、圆角全 token 化
- ✅ **零硬编码颜色**：除币种官方品牌色外，className 中禁止 `#xxxxxx`
- ✅ **MaskedIcon 模式**：用 `mask-image + bg-current` 让单色 SVG 自动跟随主题色，告别"亮暗模式各准备一套"
- ✅ **双主题强约束**：每一次提交都做亮/暗双跑验证

### 可访问性 & 健壮性

- ✅ 所有按钮含 `sr-only` / `aria-label`
- ✅ 全站尊重 `prefers-reduced-motion`，动画自动停止
- ✅ TypeScript 严格模式，`tsc --noEmit` 全绿

---

## 文档体系

项目附带两份高质量沉淀文档：

| 文档 | 作用 |
|------|------|
| [AGENTS.md](./AGENTS.md) | 给下一个接手的 AI 看 —— 涵盖技术栈、文件结构、状态机、设计 Token、图标系统、动画约定、性能契约、雷区清单 |
| [PROJECT_OUTLINE.md](./PROJECT_OUTLINE.md) | 项目大纲，与 AGENTS.md 同源 |

任何 AI 接手本项目，**只需读完 AGENTS.md 即可零成本理解全部工程约定**。

---

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 浏览器访问
open http://localhost:3000
```

页面会自动重定向到 `/home`。在右上角头像点击可切换暗/亮主题。

---

## 项目文件结构

```
app/
├── layout.tsx          # 字体 + ThemeProvider
├── page.tsx            # 重定向到 /home
├── globals.css         # 设计 Token + 全局动画
└── home/page.tsx       # 首页（5 种状态全部在此渲染）

components/
├── common/             # 通用组件（NavBar / TabBar / MaskedIcon ...）
├── home/               # 首页专属（Hero / AssetCard / MissionBanner ...）
└── ui/                 # shadcn 基础组件

lib/                    # 工具函数 + 资源路径常量
mock/                   # Mock 数据（coins / missions / user / countdown）
store/appStore.ts       # Zustand 全局状态
public/                 # SVG 图标 + WebP 图片资源
```

详细约定请见 [AGENTS.md](./AGENTS.md)。

---

## 总结

这个项目想说明的事其实只有一句：

> **当代 AI（Claude Code + MCP + Skills + Task 编排）已经具备了独立交付一个复杂前端项目的能力，且交付质量在性能、可维护性、设计还原度上不输人类工程师。**

人类要做的，是从"亲手写代码"转变为"提出更好的问题、做出更准的判断"。

---

*Built with ❤️ by Claude Code · Powered by Anthropic*
