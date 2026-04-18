import { create } from "zustand";

export type MissionTaskKey = "kyc" | "deposit" | "trade";
export type MissionTaskStatus = "completed" | "failed" | "pending";
export type HomePreviewMode = "standard" | "mission";
export type MissionBannerVariant =
  | "deposit-pending"
  | "trade-pending"
  | "trade-pending-static"
  | "trade-completed"
  | "trade-failed"
  | "trade-failed-badge";
export type ActiveMarketTab =
  | "favorites"
  | "hot"
  | "new"
  | "topGainers"
  | "newListed";
export type ActiveMarketSubTab = "spot" | "futures";
export type ActiveBottomTab =
  | "home"
  | "markets"
  | "trade"
  | "futures"
  | "wallets";

export interface MissionStatus {
  kyc: MissionTaskStatus;
  deposit: MissionTaskStatus;
  trade: MissionTaskStatus;
}

export interface AppState {
  isLoggedIn: boolean;
  hasDeposited: boolean;
  hasTrade: boolean;
  hasFavorites: boolean;
  favoriteSymbols: string[];
  isAssetCollapsed: boolean;
  hasCountdown: boolean;
  homePreviewMode: HomePreviewMode;
  missionBannerVariant: MissionBannerVariant;
  missionStatus: MissionStatus;
  activeTab: ActiveMarketTab;
  activeSubTab: ActiveMarketSubTab;
  activeBottomTab: ActiveBottomTab;
  setLoggedIn: (value: boolean) => void;
  toggleLoggedIn: () => void;
  setDeposited: (value: boolean) => void;
  setTradeCompleted: (value: boolean) => void;
  setHasFavorites: (value: boolean) => void;
  addFavoriteSymbols: (symbols: string[]) => void;
  removeFavoriteSymbol: (symbol: string) => void;
  toggleAssetCollapsed: () => void;
  setHasCountdown: (value: boolean) => void;
  setHomePreviewMode: (mode: HomePreviewMode) => void;
  setMissionBannerVariant: (variant: MissionBannerVariant) => void;
  setMissionTaskStatus: (
    task: MissionTaskKey,
    status: MissionTaskStatus
  ) => void;
  setMissionStatus: (status: Partial<MissionStatus>) => void;
  setActiveTab: (tab: ActiveMarketTab) => void;
  setActiveSubTab: (tab: ActiveMarketSubTab) => void;
  setActiveBottomTab: (tab: ActiveBottomTab) => void;
  resetState: () => void;
}

const defaultMissionStatus: MissionStatus = {
  kyc: "pending",
  deposit: "pending",
  trade: "pending",
};

const defaultState = {
  isLoggedIn: false,
  hasDeposited: false,
  hasTrade: false,
  hasFavorites: false,
  favoriteSymbols: ["BTC", "DOGE"],
  isAssetCollapsed: true,
  hasCountdown: true,
  homePreviewMode: "standard" as const,
  missionBannerVariant: "deposit-pending" as const,
  missionStatus: defaultMissionStatus,
  activeTab: "hot" as const,
  activeSubTab: "spot" as const,
  activeBottomTab: "home" as const,
};

function getMissionVariantState(variant: MissionBannerVariant) {
  switch (variant) {
    case "deposit-pending":
      return {
        hasDeposited: false,
        hasTrade: false,
        hasCountdown: true,
        missionStatus: {
          kyc: "completed" as const,
          deposit: "pending" as const,
          trade: "pending" as const,
        },
      };
    case "trade-pending":
      return {
        hasDeposited: true,
        hasTrade: false,
        hasCountdown: true,
        missionStatus: {
          kyc: "completed" as const,
          deposit: "completed" as const,
          trade: "pending" as const,
        },
      };
    case "trade-pending-static":
      return {
        hasDeposited: true,
        hasTrade: false,
        hasCountdown: false,
        missionStatus: {
          kyc: "completed" as const,
          deposit: "completed" as const,
          trade: "pending" as const,
        },
      };
    case "trade-completed":
      return {
        hasDeposited: true,
        hasTrade: true,
        hasCountdown: false,
        missionStatus: {
          kyc: "completed" as const,
          deposit: "completed" as const,
          trade: "completed" as const,
        },
      };
    case "trade-failed":
    case "trade-failed-badge":
      return {
        hasDeposited: true,
        hasTrade: false,
        hasCountdown: false,
        missionStatus: {
          kyc: "completed" as const,
          deposit: "completed" as const,
          trade: "failed" as const,
        },
      };
  }
}

export const useAppStore = create<AppState>()((set) => ({
  ...defaultState,
  setLoggedIn: (value) => {
    set((state) => ({
      isLoggedIn: value,
      homePreviewMode: value ? state.homePreviewMode : "standard",
      activeTab: value ? "favorites" : "hot",
      activeBottomTab: value ? state.activeBottomTab : "home",
      isAssetCollapsed: value ? true : state.isAssetCollapsed,
    }));
  },
  toggleLoggedIn: () => {
    set((state) => ({
      isLoggedIn: !state.isLoggedIn,
      homePreviewMode: !state.isLoggedIn ? state.homePreviewMode : "standard",
      activeTab: !state.isLoggedIn ? "favorites" : "hot",
      activeBottomTab: "home",
    }));
  },
  setDeposited: (value) => set({ hasDeposited: value }),
  setTradeCompleted: (value) => set({ hasTrade: value }),
  setHasFavorites: (value) => {
    set((state) => ({
      hasFavorites: value,
      activeTab: state.activeTab,
    }));
  },
  addFavoriteSymbols: (symbols) => {
    set((state) => ({
      favoriteSymbols: Array.from(
        new Set([...state.favoriteSymbols, ...symbols])
      ),
      hasFavorites: true,
    }));
  },
  removeFavoriteSymbol: (symbol) => {
    set((state) => {
      const favoriteSymbols = state.favoriteSymbols.filter(
        (item) => item !== symbol
      );

      return {
        favoriteSymbols,
        hasFavorites: favoriteSymbols.length > 0,
      };
    });
  },
  toggleAssetCollapsed: () => {
    set((state) => ({ isAssetCollapsed: !state.isAssetCollapsed }));
  },
  setHasCountdown: (value) => set({ hasCountdown: value }),
  setHomePreviewMode: (mode) => set({ homePreviewMode: mode }),
  setMissionBannerVariant: (variant) =>
    set(() => ({
      missionBannerVariant: variant,
      homePreviewMode: "mission",
      ...getMissionVariantState(variant),
    })),
  setMissionTaskStatus: (task, status) => {
    set((state) => ({
      missionStatus: {
        ...state.missionStatus,
        [task]: status,
      },
    }));
  },
  setMissionStatus: (status) => {
    set((state) => ({
      missionStatus: {
        ...state.missionStatus,
        ...status,
      },
    }));
  },
  setActiveTab: (tab) => {
    set({ activeTab: tab });
  },
  setActiveSubTab: (tab) => set({ activeSubTab: tab }),
  setActiveBottomTab: (tab) => set({ activeBottomTab: tab }),
  resetState: () =>
    set({
      ...defaultState,
      missionStatus: { ...defaultMissionStatus },
    }),
}));
