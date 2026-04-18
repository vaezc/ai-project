import type {
  MissionBannerVariant,
  MissionTaskKey,
  MissionTaskStatus,
} from "@/store/appStore";

export interface MockMission {
  id: MissionTaskKey;
  title: string;
  reward: number;
  completed: boolean;
  progress: number;
  status: MissionTaskStatus;
}

export interface MissionBannerConfig {
  variant: MissionBannerVariant;
  kind: "deposit" | "trade";
  title: string;
  description: string;
  highlightLabel: string;
  rewardLabel: string;
  checkpointRewardLabel: string;
  current: number;
  total: number;
  footerLabel: string;
  footerTone: "muted" | "success" | "danger";
  ctaLabel: string;
  showCountdown: boolean;
  fullWidthCta?: boolean;
  topProgress: number;
  topLeftLabel?: string;
  topLeftTone?: "success" | "danger";
  segmentLabels?: [string, string];
  activeSegment?: 0 | 1;
}

export const mockMissions: MockMission[] = [
  {
    id: "kyc",
    title: "完成身份认证",
    reward: 10,
    completed: true,
    progress: 100,
    status: "completed",
  },
  {
    id: "deposit",
    title: "首次存款",
    reward: 50,
    completed: false,
    progress: 0,
    status: "pending",
  },
  {
    id: "trade",
    title: "完成首笔交易",
    reward: 20,
    completed: false,
    progress: 0,
    status: "pending",
  },
];

export const missionBannerConfigs: Record<
  MissionBannerVariant,
  MissionBannerConfig
> = {
  "deposit-pending": {
    variant: "deposit-pending",
    kind: "deposit",
    title: "Deposit",
    description: "Initial deposit ≥100 USDT, Receive 5 USDT trial funds",
    highlightLabel: "5 USDT",
    rewardLabel: "30 USDT",
    checkpointRewardLabel: "5 USDT",
    current: 30,
    total: 100,
    footerLabel: "Time Limit",
    footerTone: "muted",
    ctaLabel: "Deposit",
    showCountdown: true,
    topProgress: 0.36,
  },
  "trade-pending": {
    variant: "trade-pending",
    kind: "trade",
    title: "Trade",
    description:
      "Cumulative derivatives trade ≥500 USDT, Receive 20 USDT trial funds",
    highlightLabel: "20 USDT",
    rewardLabel: "30 USDT",
    checkpointRewardLabel: "5 USDT",
    current: 0,
    total: 500,
    footerLabel: "Time Limit",
    footerTone: "muted",
    ctaLabel: "Trade Now",
    showCountdown: true,
    topProgress: 0.36,
    segmentLabels: ["Derivatives", "Spot"],
    activeSegment: 0,
  },
  "trade-pending-static": {
    variant: "trade-pending-static",
    kind: "trade",
    title: "Trade",
    description:
      "Cumulative derivatives trade ≥500 USDT, Receive 20 USDT trial funds",
    highlightLabel: "20 USDT",
    rewardLabel: "30 USDT",
    checkpointRewardLabel: "5 USDT",
    current: 0,
    total: 500,
    footerLabel: "Trade mission is live",
    footerTone: "muted",
    ctaLabel: "Trade Now",
    showCountdown: false,
    fullWidthCta: true,
    topProgress: 0.36,
    segmentLabels: ["Derivatives", "Spot"],
    activeSegment: 0,
  },
  "trade-completed": {
    variant: "trade-completed",
    kind: "trade",
    title: "Trade",
    description:
      "Cumulative derivatives trade ≥500 USDT, Receive 20 USDT trial funds",
    highlightLabel: "20 USDT",
    rewardLabel: "30 USDT",
    checkpointRewardLabel: "5 USDT",
    current: 500,
    total: 500,
    footerLabel: "已完成",
    footerTone: "success",
    ctaLabel: "Trade Now",
    showCountdown: false,
    topProgress: 0.72,
    topLeftLabel: "已完成",
    topLeftTone: "success",
    segmentLabels: ["Derivatives", "Spot"],
    activeSegment: 0,
  },
  "trade-failed": {
    variant: "trade-failed",
    kind: "trade",
    title: "Trade",
    description:
      "Cumulative derivatives trade ≥500 USDT, Receive 20 USDT trial funds",
    highlightLabel: "20 USDT",
    rewardLabel: "30 USDT",
    checkpointRewardLabel: "5 USDT",
    current: 432,
    total: 500,
    footerLabel: "Expired",
    footerTone: "danger",
    ctaLabel: "Trade Now",
    showCountdown: false,
    topProgress: 0.72,
    segmentLabels: ["Derivatives", "Spot"],
    activeSegment: 0,
  },
  "trade-failed-badge": {
    variant: "trade-failed-badge",
    kind: "trade",
    title: "Trade",
    description:
      "Cumulative derivatives trade ≥500 USDT, Receive 20 USDT trial funds",
    highlightLabel: "20 USDT",
    rewardLabel: "30 USDT",
    checkpointRewardLabel: "5 USDT",
    current: 432,
    total: 500,
    footerLabel: "Expired",
    footerTone: "danger",
    ctaLabel: "Trade Now",
    showCountdown: false,
    topProgress: 0.72,
    topLeftLabel: "Expired",
    topLeftTone: "danger",
    segmentLabels: ["Derivatives", "Spot"],
    activeSegment: 0,
  },
};
