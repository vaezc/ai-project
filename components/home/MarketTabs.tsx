"use client";

import type { ActiveMarketSubTab, ActiveMarketTab } from "@/store/appStore";
import { cn } from "@/lib/utils";

const primaryTabs: Array<{ label: string; value: ActiveMarketTab }> = [
  { label: "Favorites", value: "favorites" },
  { label: "Hot", value: "hot" },
  { label: "New", value: "new" },
  { label: "Top Gainers", value: "topGainers" },
  { label: "New Listed", value: "newListed" },
];

const secondaryTabs: Array<{ label: string; value: ActiveMarketSubTab }> = [
  { label: "Spot", value: "spot" },
  { label: "Futures", value: "futures" },
];

interface MarketTabsProps {
  activeTab: ActiveMarketTab;
  activeSubTab: ActiveMarketSubTab;
  disableFavorites?: boolean;
  onTabChange: (tab: ActiveMarketTab) => void;
  onSubTabChange: (tab: ActiveMarketSubTab) => void;
}

export function MarketTabs({
  activeTab,
  activeSubTab,
  disableFavorites = false,
  onTabChange,
  onSubTabChange,
}: MarketTabsProps) {
  return (
    <div className="flex flex-col">
      <div
        className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="tablist"
        aria-label="Market categories"
      >
        <div className="flex h-11 min-w-max items-center gap-4 pl-4 pr-4 text-[16px] leading-[1.4]">
          {primaryTabs.map((tab) => {
            const isActive = tab.value === activeTab;
            const isDisabled = disableFavorites && tab.value === "favorites";

            return (
              <button
                key={tab.value}
                type="button"
                onClick={() => {
                  if (!isDisabled) {
                    onTabChange(tab.value);
                  }
                }}
                role="tab"
                aria-selected={isActive}
                aria-disabled={isDisabled}
                disabled={isDisabled}
                className={cn(
                  "shrink-0 transition-colors disabled:pointer-events-none",
                  isActive
                    ? "font-bold text-text-primary"
                    : "font-normal text-text-secondary",
                  isDisabled && "cursor-not-allowed opacity-45"
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <div
        className="flex items-center gap-4 border-b border-divider pl-4"
        role="tablist"
        aria-label="Market subcategories"
      >
        {secondaryTabs.map((tab) => {
          const isActive = tab.value === activeSubTab;

          return (
            <button
              key={tab.value}
              type="button"
              onClick={() => onSubTabChange(tab.value)}
              role="tab"
              aria-selected={isActive}
              className="flex h-8 flex-col items-center justify-center"
            >
              <span
                className={cn(
                  "py-2 text-[12px] leading-[1.4] transition-colors",
                  isActive
                    ? "font-bold text-text-primary"
                    : "font-medium text-text-secondary"
                )}
              >
                {tab.label}
              </span>
              <span
                className={cn(
                  "h-0.5 w-4 rounded-full bg-text-primary transition-opacity",
                  isActive ? "opacity-100" : "opacity-0"
                )}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
