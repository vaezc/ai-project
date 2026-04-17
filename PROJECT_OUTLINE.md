# 加密货币交易所 APP 首页改版 — 项目大纲

## 项目信息

| 项目 | 说明 |
|------|------|
| 框架 | Next.js 15 (App Router) |
| UI 库 | shadcn/ui + Tailwind CSS |
| 数据 | 全量 Mock（无真实 API） |
| 设计稿 | Figma `VGP1FbEwvpDJa687POA59H` (APP 首页改版) |
| 设备 | 移动端优先，375px 宽度 |
| 主题 | 暗色（黑底） |
| 字体 | HarmonyOS Sans SC（Regular / Medium / Bold） |

---

## Figma 节点索引

> 所有链接均属于文件 `VGP1FbEwvpDJa687POA59H`（APP 首页改版）

### 第一种 — P1 首页（未登录）

> 默认展示：行情 Tab = **Hot（热门）**，子 Tab = **Spot（现货）**

| Node ID | Figma 链接 | 变体说明 |
|---------|-----------|---------|
| `68:8747` | [打开](https://www.figma.com/design/VGP1FbEwvpDJa687POA59H/APP%E9%A6%96%E9%A1%B5%E6%94%B9%E7%89%88?node-id=68-8747) | 未登录 — 有倒计时 |
| `110:7592` | [打开](https://www.figma.com/design/VGP1FbEwvpDJa687POA59H/APP%E9%A6%96%E9%A1%B5%E6%94%B9%E7%89%88?node-id=110-7592) | 未登录 — 无倒计时 |

### 第二种 — P2 首页（已登录，无自选）

| Node ID | Figma 链接 | 变体说明 |
|---------|-----------|---------|
| `64:7333` | [打开](https://www.figma.com/design/VGP1FbEwvpDJa687POA59H/APP%E9%A6%96%E9%A1%B5%E6%94%B9%E7%89%88?node-id=64-7333) | 已登录无自选 — Favorites + Spot 展示 |
| `67:8500` | [打开](https://www.figma.com/design/VGP1FbEwvpDJa687POA59H/APP%E9%A6%96%E9%A1%B5%E6%94%B9%E7%89%88?node-id=67-8500) | 资产区域收起状态 |
| `215:3527` | [打开](https://www.figma.com/design/VGP1FbEwvpDJa687POA59H/APP%E9%A6%96%E9%A1%B5%E6%94%B9%E7%89%88?node-id=215-3527) | 金刚区（快捷功能）超出屏幕宽度可横滑 |

### 第三种 — P3 首页（已登录，有自选）

| Node ID | Figma 链接 | 变体说明 |
|---------|-----------|---------|
| `68:9763` | [打开](https://www.figma.com/design/VGP1FbEwvpDJa687POA59H/APP%E9%A6%96%E9%A1%B5%E6%94%B9%E7%89%88?node-id=68-9763) | 已登录 — Hot 热门榜 · Spot 现货 |
| `68:10010` | [打开](https://www.figma.com/design/VGP1FbEwvpDJa687POA59H/APP%E9%A6%96%E9%A1%B5%E6%94%B9%E7%89%88?node-id=68-10010) | 已登录 — New Listed 新币榜 · Spot 现货 |

### 第四种 — P4 首页（已登录，入金相关状态）

| Node ID | Figma 链接 | 变体说明 |
|---------|-----------|---------|
| `68:10259` | [打开](https://www.figma.com/design/VGP1FbEwvpDJa687POA59H/APP%E9%A6%96%E9%A1%B5%E6%94%B9%E7%89%88?node-id=68-10259) | 已登录 — 未入金，带倒计时 |
| `68:10536` | [打开](https://www.figma.com/design/VGP1FbEwvpDJa687POA59H/APP%E9%A6%96%E9%A1%B5%E6%94%B9%E7%89%88?node-id=68-10536) | 已入金 — 未交易，有倒计时 |
| `68:10812` | [打开](https://www.figma.com/design/VGP1FbEwvpDJa687POA59H/APP%E9%A6%96%E9%A1%B5%E6%94%B9%E7%89%88?node-id=68-10812) | 已入金 — 未交易，无倒计时 |

### 第五种 — P5 首页（已登录，已入金，任务状态）

| Node ID | Figma 链接 | 变体说明 |
|---------|-----------|---------|
| `68:11085` | [打开](https://www.figma.com/design/VGP1FbEwvpDJa687POA59H/APP%E9%A6%96%E9%A1%B5%E6%94%B9%E7%89%88?node-id=68-11085) | 已登录已入金 — 完成其中1个任务，有倒计时 |
| `68:11361` | [打开](https://www.figma.com/design/VGP1FbEwvpDJa687POA59H/APP%E9%A6%96%E9%A1%B5%E6%94%B9%E7%89%88?node-id=68-11361) | 已登录已入金 — 失败其中1个任务，有倒计时 |
| `68:11637` | [打开](https://www.figma.com/design/VGP1FbEwvpDJa687POA59H/APP%E9%A6%96%E9%A1%B5%E6%94%B9%E7%89%88?node-id=68-11637) | 已登录已入金 — 失败其中2个任务，有倒计时 |

---

## 页面内容分析

> 全部 5 种均为**首页**不同状态，无独立子页面。

### 第一种 — 首页（未登录）

- **顶部导航**：Logo（左）+ 语言切换 + 通知图标（右）
- **Hero 区**：登录 / 注册按钮 + 欢迎文案
- **倒计时 Banner**：有倒计时变体显示限时活动，无倒计时变体隐藏
- **金刚区**：存款 / 提款 / 转账 / 买币（4 个图标，固定宽度）
- **行情 Tabs**：默认 **Hot · Spot**
- **行情表格**：币种列表（图标 + 名称 + 价格 + 涨跌幅）
- **底部 TabBar**：首页（激活）

### 第二种 — 首页（已登录，无自选）

- **顶部导航**：头像（已登录）+ 通知图标
- **资产卡片**：支持展开 / 折叠（折叠变体隐藏金额）
- **金刚区**：支持超出屏幕宽度时横向滚动
- **行情 Tabs**：显示 **Favorites（空）+ Spot** 选项
- **行情表格**：默认展示热门列表（自选为空）
- **底部 TabBar**：首页（激活）

### 第三种 — 首页（已登录，有自选）

- **顶部导航**：头像（已登录）+ 通知图标
- **资产卡片**：展开状态，显示总资产金额
- **金刚区**：固定 4 个按钮
- **行情 Tabs**：两种变体
  - Hot · Spot（热门榜）
  - New Listed · Spot（新币榜）
- **行情表格**：对应 Tab 下的币种列表
- **底部 TabBar**：首页（激活）

### 第四种 — 首页（已登录，入金相关任务状态）

- **顶部导航**：头像（已登录）+ 通知图标
- **任务 Banner**：内嵌于首页，三种变体：
  - 未入金 + 有倒计时（引导入金）
  - 已入金未交易 + 有倒计时
  - 已入金未交易 + 无倒计时
- **资产卡片**：已入金变体显示资产余额
- **行情区**：与第三种相同

### 第五种 — 首页（已登录，已入金，任务完成 / 失败状态）

- **顶部导航**：头像（已登录）+ 通知图标
- **任务 Banner**：内嵌任务进度卡，三种变体（均有倒计时）：
  - 完成其中 1 个任务
  - 失败其中 1 个任务
  - 失败其中 2 个任务
- **任务项**：每项显示完成 ✓ / 失败 ✗ / 进行中状态
- **行情区**：与第三种相同

---

## 组件拆分

### 公共组件（`/components/common/`）

| 组件 | 说明 |
|------|------|
| `StatusBar` | 顶部状态栏（时间、信号、电量） |
| `NavBar` | 顶部导航（Logo / 头像 + 图标） |
| `TabBar` | 底部导航（5 个 Tab，含激活态） |
| `CoinIcon` | 币种图标（带颜色背景） |
| `PriceChangeTag` | 涨跌幅标签（绿 / 红） |
| `CountdownTimer` | 倒计时组件（时：分：秒） |
| `ProgressBar` | 任务进度条 |

### 页面级组件（`/components/home/`）

| 组件 | 说明 |
|------|------|
| `HeroSection` | 未登录欢迎区（登录/注册按钮） |
| `AssetCard` | 资产总览卡片，支持展开/折叠 |
| `QuickActions` | 金刚区，支持横向滚动（内容超屏时） |
| `ActivityBanner` | 轮播活动横幅 |
| `MissionBanner` | 首页内嵌任务进度卡（含倒计时、任务项状态） |
| `MarketTabs` | 行情分类 Tab 栏（含 Favorites / Hot / New Listed 等） |
| `MarketTable` | 行情表格容器 |
| `MarketRow` | 单行币种数据 |
| `FavoritesEmpty` | 自选为空时的占位提示 |

---

## 路由结构

```
/app
├── layout.tsx          # 全局布局（字体、主题、Provider）
├── page.tsx            # 重定向到 /home
└── home
    └── page.tsx        # 首页（全部 5 种状态均在此页渲染）
```

---

## 状态管理

```typescript
// /store/appStore.ts (Zustand)
interface AppState {
  // 用户状态
  isLoggedIn: boolean
  hasDeposited: boolean        // 是否已入金
  hasTrade: boolean            // 是否已完成交易
  hasFavorites: boolean        // 是否有自选币种

  // UI 状态
  isAssetCollapsed: boolean    // 资产卡片是否收起
  hasCountdown: boolean        // 是否显示倒计时 Banner

  // 任务状态（内嵌于首页）
  missionStatus: {
    kyc:     'completed' | 'failed' | 'pending'
    deposit: 'completed' | 'failed' | 'pending'
    trade:   'completed' | 'failed' | 'pending'
  }

  // Tab 状态
  activeTab: 'favorites' | 'hot' | 'new' | 'topGainers' | 'newListed'
  activeSubTab: 'spot' | 'futures'
  activeBottomTab: 'home' | 'markets' | 'trade' | 'futures' | 'wallets'
}

// 首页渲染逻辑
// 第一种: !isLoggedIn → HeroSection + 倒计时 Banner（按 hasCountdown 控制）
// 第二种: isLoggedIn && !hasFavorites → AssetCard（可折叠）+ 金刚区（可横滑）
// 第三种: isLoggedIn && hasFavorites → MarketTabs 含自选数据
// 第四种: isLoggedIn && 入金任务驱动 → MissionBanner（未入金/已入金·有无倒计时）
// 第五种: isLoggedIn && hasDeposited → MissionBanner（任务完成/失败进度）
```

---

## Mock 数据结构

```typescript
// /mock/coins.ts
export const mockCoins = [
  { symbol: 'BTC',  name: 'Bitcoin',  price: 101023.66, change: +1.56, volume: '2.4B' },
  { symbol: 'ETH',  name: 'Ethereum', price: 3284.52,   change: +2.31, volume: '1.1B' },
  { symbol: 'BNB',  name: 'BNB',      price: 718.33,    change: -0.87, volume: '456M' },
  { symbol: 'SOL',  name: 'Solana',   price: 198.44,    change: +4.12, volume: '892M' },
  { symbol: 'XRP',  name: 'XRP',      price: 2.34,      change: +0.65, volume: '334M' },
  { symbol: 'SHIB', name: 'Shiba Inu',price: 0.0000284, change: -1.23, volume: '212M' },
  { symbol: 'DOGE', name: 'Dogecoin', price: 0.3821,    change: +3.44, volume: '678M' },
  { symbol: 'LTC',  name: 'Litecoin', price: 128.77,    change: -0.54, volume: '145M' },
]

// /mock/user.ts
export const mockUser = {
  totalAssets: 10285.32,
  dailyEarnings: +128.45,
  dailyEarningsPercent: +1.26,
  currency: 'USD',
}

// /mock/missions.ts
export const mockMissions = [
  { id: 'kyc',   title: '完成身份认证',   reward: 10,  completed: true,  progress: 100 },
  { id: 'deposit', title: '首次存款',     reward: 50,  completed: false, progress: 0   },
  { id: 'trade', title: '完成首笔交易',   reward: 20,  completed: false, progress: 0   },
]

// /mock/countdown.ts
export const missionDeadline = new Date(Date.now() + 72 * 60 * 60 * 1000) // 72 小时后
```

---

## 设计 Token（Tailwind 配置）

```javascript
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      'brand-primary':  '#f68f15',  // 主橙色
      'bg-primary':     '#000000',  // 页面背景
      'bg-card':        '#121211',  // 卡片背景
      'bg-input':       '#1a1a18',  // 输入框/次级背景
      'text-primary':   '#ffffff',  // 主文字
      'text-secondary': '#737370',  // 次级文字
      'text-tertiary':  '#4a4a47',  // 三级文字
      'chart-green':    '#2ebe65',  // 涨（绿）
      'chart-red':      '#f24040',  // 跌（红）
      'divider':        '#1f1f1d',  // 分割线
    },
    fontFamily: {
      sans: ['HarmonyOS Sans SC', 'PingFang SC', 'sans-serif'],
    },
    fontSize: {
      'xs':  ['10px', { lineHeight: '14px' }],
      'sm':  ['12px', { lineHeight: '16px' }],
      'base':['14px', { lineHeight: '20px' }],
      'lg':  ['16px', { lineHeight: '22px' }],
      'xl':  ['18px', { lineHeight: '24px' }],
      '2xl': ['30px', { lineHeight: '38px' }],
    },
  }
}
```

---

## 交互要求

| 交互 | 说明 |
|------|------|
| 登录/注册 | 点击按钮切换 isLoggedIn 状态（无弹窗，直接状态变更用于演示） |
| 存款 | 点击"存款"按钮切换 hasDeposited 状态 |
| Tab 切换 | 行情 Tab 点击切换，带下划线动画 |
| 底部 TabBar | 点击切换页面，图标 + 文字高亮 |
| 任务中心入口 | 点击活动 Banner 或特定按钮跳转 `/mission` |
| 行情表格 | 按涨跌幅/价格排序（纯前端排序） |
| 自选收藏 | 点击星标切换 hasFavorites，影响自选 Tab 显示 |
| 倒计时 | 实时倒计时（useEffect + setInterval） |
| 轮播 Banner | 自动轮播（3 秒），支持手动滑动 |

---

## 实施步骤（12 步）

```
Step 01  初始化 Next.js 15 项目（App Router + TypeScript）
Step 02  配置 Tailwind CSS + 注入设计 Token
Step 03  安装并配置 shadcn/ui（Button, Card, Tabs, Progress）
Step 04  配置 Zustand 状态管理，定义完整 AppState
Step 05  创建所有 Mock 数据文件
Step 06  实现公共组件（StatusBar, NavBar, TabBar, CoinIcon, PriceChangeTag）
Step 07  实现 CountdownTimer + ProgressBar 工具组件
Step 08  实现首页第一种（未登录）— HeroSection + 倒计时 Banner + 行情表格
Step 09  实现首页第二种（已登录无自选）— AssetCard 折叠 + 金刚区横滑
Step 10  实现首页第三种（已登录有自选）— Favorites Tab + Hot/New Listed 切换
Step 11  实现首页第四/五种 — MissionBanner 内嵌任务卡（入金状态 + 任务完成/失败变体）
Step 12  端到端联调：全状态切换 → UI 联动验证 → 响应式收尾
```

---

## 文件目录预览

```
ai-project/
├── PROJECT_OUTLINE.md          ← 本文件
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── home/
│       └── page.tsx
├── components/
│   ├── common/
│   │   ├── StatusBar.tsx
│   │   ├── NavBar.tsx
│   │   ├── TabBar.tsx
│   │   ├── CoinIcon.tsx
│   │   ├── PriceChangeTag.tsx
│   │   ├── CountdownTimer.tsx
│   │   └── ProgressBar.tsx
│   └── home/
│       ├── HeroSection.tsx
│       ├── AssetCard.tsx
│       ├── QuickActions.tsx
│       ├── ActivityBanner.tsx
│       ├── MissionBanner.tsx
│       ├── MarketTabs.tsx
│       ├── MarketTable.tsx
│       ├── MarketRow.tsx
│       └── FavoritesEmpty.tsx
├── store/
│   └── appStore.ts
├── mock/
│   ├── coins.ts
│   ├── user.ts
│   ├── missions.ts
│   └── countdown.ts
└── tailwind.config.ts
```
