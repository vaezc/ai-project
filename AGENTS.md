# 加密货币交易所 APP 首页 — 项目大纲

本文档面向接手开发者 / AI。先读完本文，再动代码。

---

## 1. 技术栈

| 项目 | 版本 / 说明 |
|------|------------|
| 框架 | **Next.js 16**（App Router）— 重要：API/约定与训练数据可能有出入，写代码前先看 `node_modules/next/dist/docs/` |
| React | 19 |
| 语言 | TypeScript（严格模式） |
| 样式 | Tailwind CSS v4（`@theme inline` token 在 `app/globals.css`） |
| UI 基础 | shadcn/ui（`components/ui/*`） |
| 状态 | Zustand + `useShallow` |
| 主题 | next-themes（暗 / 亮双主题，所有组件必须双主题适配） |
| 字体 | HarmonyOS Sans SC |
| 设备 | 移动端优先 375px；容器 `max-w-screen-sm` |
| 设计稿 | Figma file `VGP1FbEwvpDJa687POA59H` |

---

## 2. 文件结构

```
app/
├── layout.tsx              # 字体 + ThemeProvider
├── page.tsx                # 重定向到 /home
├── globals.css             # 设计 token + 全局动画 keyframes
└── home/page.tsx           # 首页（5 种状态全在这里渲染）

components/
├── common/                 # 通用组件
│   ├── NavBar.tsx          # 顶部（头像 + 搜索 + 通知 + 客服）
│   ├── TabBar.tsx          # 底部 5 Tab
│   ├── MaskedIcon.tsx      # ⭐ 主题感知图标（见 §6）
│   ├── CoinIcon.tsx        # 币种图标（带品牌色 fallback）
│   ├── PriceChangeTag.tsx  # 涨跌幅胶囊
│   ├── CountdownTimer.tsx  # 倒计时
│   ├── ProgressBar.tsx
│   └── StatusBar.tsx
├── home/                   # 首页专属
│   ├── HeroSection.tsx     # 未登录 Hero（礼盒 + Sign up）
│   ├── AssetCard.tsx       # 资产卡（可折叠）
│   ├── QuickActions.tsx    # 金刚区（5 按钮）
│   ├── MissionBanner.tsx   # 任务进度卡（5 个 variant）
│   ├── MarketTabs.tsx      # 行情 Tab
│   ├── MarketTable.tsx     # 行情表格（已 memo）
│   ├── MarketRow.tsx       # 单行（已 memo）
│   ├── NewListedSection.tsx
│   ├── FavoritesEmpty.tsx  # 自选空态选币卡
│   └── ActivityBanner.tsx
├── ui/                     # shadcn 组件
└── theme-provider.tsx, theme-toggle.tsx

lib/
├── utils.ts                # cn() 工具
└── figma-assets.ts         # Hero / Mission / Avatar 图片路径常量

mock/
├── coins.ts                # 币种列表 + 分类筛选函数
├── missions.ts             # 任务 banner 5 个 variant 的文案/进度配置
├── user.ts                 # 当前用户
└── countdown.ts            # 倒计时截止时间

store/appStore.ts           # Zustand 全局状态

public/
├── icons/*.svg             # 通用 icon（已统一 currentColor）
├── quick-icons/*.svg       # 金刚区 icon
├── coin-icons/*.svg|png    # 币种 logo
├── hero-gift.webp          # 14KB（原 PNG 是 976KB）
├── mission-gift.webp       # 2KB（原 PNG 是 637KB）
├── avatar.png              # 头像
└── coin.png                # Rewards Banner 金币
```

---

## 3. 状态管理

`store/appStore.ts`（Zustand）— **所有 UI 状态**单一来源。

主要字段：
- `isLoggedIn`, `hasFavorites`, `favoriteSymbols`
- `isAssetCollapsed`, `hasCountdown`
- `homePreviewMode`: `"standard" | "mission"`（控制是否进入任务态）
- `missionBannerVariant`: `"deposit-pending" | "trade-pending" | "trade-pending-static" | "trade-completed" | "trade-failed" | "trade-failed-badge"`
- `activeTab`, `activeSubTab`, `activeBottomTab`

### 首页渲染分支（`app/home/page.tsx`）

```
!isLoggedIn                              → HeroSection + 简化 MarketTable
isLoggedIn && homePreviewMode==="mission" → MissionBanner + QuickActions + RewardsBanner + Market
isLoggedIn 默认                          → AssetCard + QuickActions + RewardsBanner + Market
                                          ↳ activeTab="favorites" && !hasFavorites → FavoritesEmpty
                                          ↳ activeTab="newListed"                 → NewListedSection
```

---

## 4. 设计 Token

全部在 `app/globals.css`，`:root`（浅）/ `.dark`（暗）双套：

| Token | 用途 |
|-------|------|
| `--brand-primary` | 主橙 #f68f15（双主题相同） |
| `--bg-primary` / `--bg-card` / `--bg-input` | 页面 / 卡片 / 输入背景 |
| `--surface-elevated` / `--surface-soft` / `--surface-strong` | 三档浮层 |
| `--text-primary` / `--text-secondary` / `--text-tertiary` | 三级文字 |
| `--chart-green` / `--chart-red` | 涨跌色 |
| `--mission-track` / `--mission-fill` | 任务进度条 |
| `--divider` | 分割线 |

**Tailwind 用法**：通过 `@theme inline` 映射成 `bg-bg-primary` / `text-text-primary` / `bg-brand-primary` 等类名。**禁止**在 className 里写 `#xxxxxx` 硬编码颜色（CoinIcon 里的 per-coin 品牌色除外，那是币种官方色）。

---

## 5. 双主题原则

任何颜色、图标、图片都必须在亮 / 暗模式下都能看清。具体：

- **颜色** — 用 token，不要写死 `text-white` / `bg-black`，用 `text-text-primary` / `bg-bg-primary`
- **图标** — 见 §6 MaskedIcon 模式
- **图片** — 含品牌主色的图片（如 hero-gift）一般通用；纯黑/纯白的需准备两套或加 `dark:` 切换

---

## 6. 图标系统（重要）

### 三种 icon 渲染方式

| 场景 | 用什么 | 示例 |
|------|--------|------|
| 单色、需跟随主题色 | `<MaskedIcon src="/icons/x.svg" className="size-4" />` | bell / chevron / time |
| 多色或带 gradient（不能用 mask） | `<Image src=... />` | nav-hot 火苗、coin logo |
| 截屏/插画 | `<Image src=... />` 走 next/image 优化 | hero-gift |

### MaskedIcon 工作原理

`components/common/MaskedIcon.tsx` — 用 CSS `mask-image` + `bg-current` 让 svg 形状被父级文字色着色。

```tsx
<button className="text-text-primary">
  <MaskedIcon src="/icons/bell.svg" className="size-5" />
</button>
```

➡️ 浅色模式黑图标，暗色模式白图标，自动跟随。

### Figma SVG 导出陷阱

Figma 导出的 svg 默认带 `preserveAspectRatio="none"` —— 强制塞进任意容器会变形。**所有 `public/icons/*.svg` 已批量 sed 移除**。新增图标后用：

```bash
sed -i '' 's/preserveAspectRatio="none" //g' public/icons/your-new.svg
```

**还要把 `fill="white"` / `fill="var(--fill-0,...)"` 替换为 `fill="currentColor"`**，MaskedIcon 才能正常着色。

---

## 7. 动画

`app/globals.css` 里定义了 5 个全局 keyframe：

| 类名 | 用途 | 周期 |
|------|------|------|
| `.float-subtle` | 浮动（Hero 礼盒、Reward 金币） | 3.6s |
| `.fade-slide-up` | 入场（Sign up 按钮、RewardsBanner） | 0.36s |
| `.halo-pulse` | 光晕脉冲（Hero 礼盒背后） | 3.6s |
| `.shimmer-sweep` | CTA 按钮高光扫过（Sign up） | 3.4s 循环 |
| 内联 `progress-sheen` | 进度条流光 | 2.2s 循环 |

全部走 `@layer utilities`，受全局 `prefers-reduced-motion: reduce` 自动停。新增动画时：
- **优先用 transform / opacity**（GPU 合成），不要动 width/height/top/left
- **不要在 fixed/sticky 元素上叠 backdrop-blur**（已踩过坑，会触发滚动重绘）

---

## 8. 性能约定

- **Handler 全部 `useCallback`**（`app/home/page.tsx`），子组件 memo 才生效
- **MarketTable / MarketRow 都 `memo`**，`favoriteSymbols.includes` 在父级算，传 boolean 给 row
- **派生数据用 `useMemo`**（marketCoins, favoriteCoins, ...）
- **Zustand setter 单独 selector**（setter 引用稳定，不和 useShallow 一起拉）
- **大图必须 webp + 移除 `unoptimized`**，并加 `sizes` 属性让 next/image 选对分辨率
- **`<img>` 仅在内联 svg 装饰场景用，其他用 `next/image`**

---

## 9. 交互联动备忘

| 入口 | 动作 |
|------|------|
| 未登录 → Sign up | `setLoggedIn(true)` + `setHomePreviewMode("standard")` |
| 已登录 → 头像 | 切换暗/亮主题 |
| 已登录 → Quick Action "Deposit" | 进入任务态 `setMissionBannerVariant("deposit-pending")` |
| Mission CTA | 推进 variant 状态机：deposit-pending → trade-pending → trade-pending-static → trade-completed → 退出任务态 |
| Favorites Tab + 空 | 渲染 `FavoritesEmpty`，提交后 `addFavoriteSymbols + setHasFavorites(true)` |
| 行情 Tab `newListed` | 渲染 `NewListedSection`，过滤掉带 `listingCountdown` 的 |

---

## 10. 怎么加 / 改一个东西

### 加新图标
1. 把 svg 放进 `public/icons/`
2. 移除 `preserveAspectRatio="none"`
3. fill 全改成 `currentColor`
4. 用 `<MaskedIcon src="/icons/x.svg" className="size-4 text-text-primary" />`

### 加新颜色
1. 在 `app/globals.css` 的 `:root` 和 `.dark` 都定义 `--xxx`
2. 在 `@theme inline` 加 `--color-xxx: var(--xxx)`
3. className 用 `bg-xxx` / `text-xxx`

### 加新 MissionBanner variant
1. `store/appStore.ts` MissionBannerVariant 加枚举
2. `mock/missions.ts` `missionBannerConfigs` 加配置
3. `components/home/MissionBanner.tsx` `railMap` 加 rail 节点配置
4. `app/home/page.tsx` `handleMissionAction` 加状态切换

### 加新页面
1. `app/<route>/page.tsx` 创建（App Router）
2. 复用 `NavBar` + `TabBar`
3. 容器套 `max-w-screen-sm` 保持移动端宽度

---

## 11. Figma 节点索引

| 状态 | Node ID |
|------|---------|
| 未登录 — 有倒计时 | `68:8747` |
| 未登录 — 无倒计时 | `110:7592` |
| 已登录无自选 | `64:7333` |
| 资产卡折叠 | `67:8500` |
| 已登录有自选（Hot） | `68:9763` |
| 已登录有自选（New Listed） | `68:10010` |
| 任务态 — 未入金 | `68:10259` |
| 任务态 — 已入金未交易 | `68:10536` |
| 任务态 — 完成 1 个 | `68:11085` |
| 任务态 — 失败 1 个 | `68:11361` |
| 底部 TabBar 5 状态 | `126:2242` |

打开方式：`https://www.figma.com/design/VGP1FbEwvpDJa687POA59H/...?node-id=<id 替换 - 为冒号>`

---

## 12. 已知约束 / 雷区

1. **Next.js 16** — 训练数据里的 Next 13/14/15 写法可能不再适用，先查 `node_modules/next/dist/docs/`
2. **shadcn 组件不要乱改样式** — 通过 className 覆盖，不直接改 `components/ui/*`
3. **CoinIcon 里的 per-coin 颜色硬编码是有意的**（币种官方色），不要"重构"成 token
4. **next/image 禁用 `unoptimized`** —— 除非确实必要（如纯静态小 icon 不想走优化）
5. **不要在按钮里嵌按钮** — RewardsBanner 已踩过 hydration 坑，所以拆了 button / div 两套
6. **CSS mask + 多色 svg 不兼容** — 多色 / gradient svg 必须 `<Image>` 渲染，不能 MaskedIcon
