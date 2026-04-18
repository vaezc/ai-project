"use client";

import type { ActiveBottomTab } from "@/store/appStore";
import { MaskedIcon } from "@/components/common/MaskedIcon";
import { cn } from "@/lib/utils";

interface TabBarProps {
  activeTab: ActiveBottomTab;
  onChange?: (tab: ActiveBottomTab) => void;
  className?: string;
}

const tabItems: Array<{
  value: ActiveBottomTab;
  label: string;
  icon: string;
}> = [
  { value: "home", label: "Home", icon: "/icons/tab-home-active.svg" },
  { value: "markets", label: "Markets", icon: "/icons/tab-markets.svg" },
  { value: "trade", label: "Trade", icon: "/icons/tab-trade.svg" },
  { value: "futures", label: "Futures", icon: "/icons/tab-futures.svg" },
  { value: "wallets", label: "Wallets", icon: "/icons/tab-wallets.svg" },
];

export function TabBar({ activeTab, onChange, className }: TabBarProps) {
  return (
    <nav
      className={cn(
        "grid grid-cols-5 rounded-t-[20px] border-t border-divider bg-bg-primary",
        className
      )}
      aria-label="Primary navigation"
    >
      {tabItems.map(({ value, label, icon }) => {
        const isActive = activeTab === value;

        return (
          <button
            key={value}
            type="button"
            onClick={() => onChange?.(value)}
            aria-current={isActive ? "page" : undefined}
            aria-label={label}
            className={cn(
              "flex h-[54px] flex-col items-center justify-center gap-0.5 px-4 pt-2.5 pb-1.5 text-[10px] leading-[1.4] transition-colors",
              isActive
                ? "text-text-primary"
                : "text-text-secondary hover:text-text-primary"
            )}
          >
            <MaskedIcon
              src={icon}
              className={cn("size-6 transition-opacity", !isActive && "opacity-60")}
            />
            <span className={cn(isActive && "font-semibold")}>{label}</span>
          </button>
        );
      })}
    </nav>
  );
}
