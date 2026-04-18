"use client";

import { startTransition, useCallback, useMemo } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useShallow } from "zustand/react/shallow";

import { NavBar } from "@/components/common/NavBar";
import { TabBar } from "@/components/common/TabBar";
import { AssetCard } from "@/components/home/AssetCard";
import { FavoritesEmpty } from "@/components/home/FavoritesEmpty";
import { HeroSection } from "@/components/home/HeroSection";
import { MarketTable } from "@/components/home/MarketTable";
import { MarketTabs } from "@/components/home/MarketTabs";
import { MissionBanner } from "@/components/home/MissionBanner";
import { NewListedSection } from "@/components/home/NewListedSection";
import { QuickActions } from "@/components/home/QuickActions";
import {
  getCoinsByCategory,
  getCoinsBySymbols,
  getFeaturedNewListings,
} from "@/mock/coins";
import { useAppStore } from "@/store/appStore";

interface RewardsBannerProps {
  onClick?: () => void;
}

function RewardsBanner({ onClick }: RewardsBannerProps) {
  const content = (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-xs text-text-secondary">Rewards Center</p>
        <p className="mt-2 max-w-[230px] text-[14px] font-semibold leading-6 text-text-primary">
          $10,000 Exclusive Bonus for New Users
        </p>
      </div>
      <div className="float-subtle">
        <Image
          src="/coin.png"
          alt=""
          width={52}
          height={52}
          className="size-[52px] rotate-[-18.46deg]"
          unoptimized
        />
      </div>
    </div>
  );

  return (
    <section className="px-4">
      {onClick ? (
        <button
          type="button"
          onClick={onClick}
          className="fade-slide-up w-full rounded-[18px] border border-divider bg-surface-elevated px-4 py-4 text-left transition-transform active:scale-[0.99]"
        >
          {content}
        </button>
      ) : (
        <div className="fade-slide-up w-full rounded-[18px] border border-divider bg-surface-elevated px-4 py-4 text-left">
          {content}
        </div>
      )}
      <div className="mt-3 flex justify-center">
        <div className="h-[3px] w-7 rounded-full bg-black/85 dark:bg-white" />
      </div>
    </section>
  );
}

export default function HomePage() {
  const {
    isLoggedIn,
    hasCountdown,
    hasFavorites,
    favoriteSymbols,
    isAssetCollapsed,
    homePreviewMode,
    missionBannerVariant,
    activeTab,
    activeSubTab,
    activeBottomTab,
  } = useAppStore(
    useShallow((state) => ({
      isLoggedIn: state.isLoggedIn,
      hasCountdown: state.hasCountdown,
      hasFavorites: state.hasFavorites,
      favoriteSymbols: state.favoriteSymbols,
      isAssetCollapsed: state.isAssetCollapsed,
      homePreviewMode: state.homePreviewMode,
      missionBannerVariant: state.missionBannerVariant,
      activeTab: state.activeTab,
      activeSubTab: state.activeSubTab,
      activeBottomTab: state.activeBottomTab,
    }))
  );
  const setHomePreviewMode = useAppStore((s) => s.setHomePreviewMode);
  const setMissionBannerVariant = useAppStore((s) => s.setMissionBannerVariant);
  const setActiveTab = useAppStore((s) => s.setActiveTab);
  const setActiveSubTab = useAppStore((s) => s.setActiveSubTab);
  const setActiveBottomTab = useAppStore((s) => s.setActiveBottomTab);
  const setLoggedIn = useAppStore((s) => s.setLoggedIn);
  const setHasFavorites = useAppStore((s) => s.setHasFavorites);
  const addFavoriteSymbols = useAppStore((s) => s.addFavoriteSymbols);
  const removeFavoriteSymbol = useAppStore((s) => s.removeFavoriteSymbol);
  const toggleAssetCollapsed = useAppStore((s) => s.toggleAssetCollapsed);
  const { resolvedTheme, setTheme } = useTheme();

  const setHomeTabActive = useCallback(() => {
    setActiveBottomTab("home");
  }, [setActiveBottomTab]);

  const handleAddFunds = useCallback(() => {
    startTransition(() => {
      setHomeTabActive();
    });
  }, [setHomeTabActive]);

  const handleSignUp = useCallback(() => {
    startTransition(() => {
      setLoggedIn(true);
      setHomePreviewMode("standard");
      setHomeTabActive();
    });
  }, [setLoggedIn, setHomePreviewMode, setHomeTabActive]);

  const handleProfileAction = useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
    startTransition(() => {
      setHomeTabActive();
    });
  }, [resolvedTheme, setTheme, setHomeTabActive]);

  const handleMissionAction = useCallback(() => {
    switch (missionBannerVariant) {
      case "deposit-pending":
        startTransition(() => {
          setMissionBannerVariant("trade-pending");
          setHomeTabActive();
        });
        break;
      case "trade-pending":
        startTransition(() => {
          setMissionBannerVariant("trade-pending-static");
          setHomeTabActive();
        });
        break;
      case "trade-pending-static":
        startTransition(() => {
          setMissionBannerVariant("trade-completed");
          setHomeTabActive();
        });
        break;
      case "trade-completed":
        startTransition(() => {
          setHomePreviewMode("standard");
          setHomeTabActive();
        });
        break;
      case "trade-failed":
      case "trade-failed-badge":
        startTransition(() => {
          setMissionBannerVariant("trade-pending");
          setHomeTabActive();
        });
        break;
    }
  }, [
    missionBannerVariant,
    setMissionBannerVariant,
    setHomePreviewMode,
    setHomeTabActive,
  ]);

  const handleQuickAction = useCallback(
    (action: string) => {
      if (action === "Deposit") {
        startTransition(() => {
          setMissionBannerVariant("deposit-pending");
          setHomeTabActive();
        });
        return;
      }
      startTransition(() => setHomeTabActive());
    },
    [setMissionBannerVariant, setHomeTabActive]
  );

  const handleFavoritesSubmit = useCallback(
    (symbols: string[]) => {
      startTransition(() => {
        addFavoriteSymbols(symbols);
        setHasFavorites(true);
        setActiveTab("favorites");
        setHomeTabActive();
        setHomePreviewMode("standard");
      });
    },
    [
      addFavoriteSymbols,
      setHasFavorites,
      setActiveTab,
      setHomeTabActive,
      setHomePreviewMode,
    ]
  );

  const handleRemoveFavorite = useCallback(
    (symbol: string) => {
      startTransition(() => {
        removeFavoriteSymbol(symbol);
        setHomeTabActive();
      });
    },
    [removeFavoriteSymbol, setHomeTabActive]
  );

  const handleBottomTabChange = useCallback(
    (tab: typeof activeBottomTab) => {
      startTransition(() => {
        setActiveBottomTab(tab);
      });
    },
    [setActiveBottomTab]
  );

  const handlePrimaryTabChange = useCallback(
    (tab: typeof activeTab) => {
      if (!isLoggedIn && tab === "favorites") {
        return;
      }
      startTransition(() => {
        setHomeTabActive();
        setActiveTab(tab);
      });
    },
    [isLoggedIn, setHomeTabActive, setActiveTab]
  );

  const handleSubTabChange = useCallback(
    (tab: typeof activeSubTab) => {
      startTransition(() => {
        setActiveSubTab(tab);
        setHomeTabActive();
      });
    },
    [setActiveSubTab, setHomeTabActive]
  );

  const isMissionPreview = isLoggedIn && homePreviewMode === "mission";
  const currentTab = activeTab;

  const marketCoins = useMemo(
    () =>
      getCoinsByCategory(
        currentTab === "topGainers"
          ? "topGainers"
          : currentTab === "newListed"
            ? "newListed"
            : currentTab === "favorites"
              ? "hot"
              : currentTab
      ),
    [currentTab]
  );
  const favoriteCoins = useMemo(
    () => getCoinsBySymbols(favoriteSymbols),
    [favoriteSymbols]
  );
  const featuredNewListings = useMemo(() => getFeaturedNewListings(), []);
  const unauthenticatedCoins = useMemo(
    () => getCoinsByCategory(activeTab).slice(0, 3),
    [activeTab]
  );
  const missionPreviewCoins = useMemo(
    () => getCoinsByCategory(activeTab).slice(0, 8),
    [activeTab]
  );
  const missionPreviewNewListed = useMemo(
    () =>
      getCoinsByCategory("newListed").filter((coin) => !coin.listingCountdown),
    []
  );
  const standardNewListed = useMemo(
    () => marketCoins.filter((coin) => !coin.listingCountdown),
    [marketCoins]
  );

  return (
    <main className="min-h-screen bg-bg-primary">
      <section className="mx-auto min-h-screen w-full max-w-screen-sm bg-bg-primary">
        <div className="relative min-h-screen bg-bg-primary">
          <div className="pb-[76px]">
            <div className="sticky top-0 z-40 bg-bg-primary pt-[max(env(safe-area-inset-top),12px)]">
              <NavBar
                isLoggedIn={isLoggedIn}
                searchValue="BTC"
                onAuthAction={handleProfileAction}
              />
            </div>

            {!isLoggedIn ? (
              <div className="flex flex-col gap-6 pt-3">
                <HeroSection
                  showCountdown={hasCountdown}
                  onSignUp={handleSignUp}
                />

                <section className="flex flex-col gap-4">
                  <MarketTabs
                    activeTab={activeTab}
                    activeSubTab={activeSubTab}
                    disableFavorites
                    onTabChange={handlePrimaryTabChange}
                    onSubTabChange={handleSubTabChange}
                  />
                  <MarketTable coins={unauthenticatedCoins} />
                </section>
              </div>
            ) : isMissionPreview ? (
              <div className="flex flex-col gap-5 pt-6">
                <MissionBanner
                  variant={missionBannerVariant}
                  onAction={handleMissionAction}
                />
                <QuickActions onAction={handleQuickAction} />
                <RewardsBanner />
                <section className="flex flex-col gap-4">
                  <MarketTabs
                    activeTab={activeTab}
                    activeSubTab={activeSubTab}
                    onTabChange={handlePrimaryTabChange}
                    onSubTabChange={handleSubTabChange}
                  />
                  {activeTab === "newListed" ? (
                    <NewListedSection
                      featuredCoins={featuredNewListings}
                      tableCoins={missionPreviewNewListed}
                    />
                  ) : (
                    <MarketTable coins={missionPreviewCoins} />
                  )}
                </section>
              </div>
            ) : (
              <div className="flex flex-col gap-5 pt-2">
                <AssetCard
                  collapsed={isAssetCollapsed}
                  onToggle={toggleAssetCollapsed}
                  onAddFunds={handleAddFunds}
                />
                <QuickActions onAction={handleQuickAction} />
                <RewardsBanner />
                <section className="flex flex-col gap-4">
                  <MarketTabs
                    activeTab={currentTab}
                    activeSubTab={activeSubTab}
                    onTabChange={handlePrimaryTabChange}
                    onSubTabChange={handleSubTabChange}
                  />
                  {currentTab === "favorites" && !hasFavorites ? (
                    <FavoritesEmpty onSubmitFavorites={handleFavoritesSubmit} />
                  ) : currentTab === "favorites" ? (
                    <MarketTable
                      coins={favoriteCoins}
                      favoriteSymbols={favoriteSymbols}
                      onRemoveFavorite={handleRemoveFavorite}
                    />
                  ) : currentTab === "newListed" ? (
                    <NewListedSection
                      featuredCoins={featuredNewListings}
                      tableCoins={standardNewListed}
                    />
                  ) : (
                    <MarketTable coins={marketCoins} />
                  )}
                </section>
              </div>
            )}
          </div>

          <div className="fixed inset-x-0 bottom-0 z-20 bg-bg-primary">
            <div className="mx-auto w-full max-w-screen-sm border-t border-divider bg-bg-primary pb-[max(env(safe-area-inset-bottom),8px)]">
              <TabBar
                activeTab={activeBottomTab}
                onChange={handleBottomTabChange}
                className="border-x-0 border-b-0 bg-bg-primary"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
