"use client";

import { Button } from "@/components/ui/button";
import { MaskedIcon } from "@/components/common/MaskedIcon";
import { mockUser } from "@/mock/user";
import { cn } from "@/lib/utils";

interface AssetCardProps {
  collapsed?: boolean;
  onToggle?: () => void;
  onAddFunds?: () => void;
}

export function AssetCard({
  collapsed = false,
  onToggle,
  onAddFunds,
}: AssetCardProps) {
  return (
    <section className="px-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex w-[239px] flex-col gap-1">
          <button
            type="button"
            onClick={onToggle}
            className="flex items-center gap-1 text-[12px] font-medium leading-[1.4] text-text-secondary"
          >
            <span>Total Asset</span>
            <MaskedIcon
              src="/icons/chevron-down.svg"
              className={cn("size-3 transition-transform", collapsed && "-rotate-90")}
            />
          </button>
          {!collapsed ? (
            <div className="flex items-center gap-1.5 pt-1">
              <span className="text-[30px] font-semibold leading-none tracking-[-0.03em] text-text-primary">
                {mockUser.totalAssets.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
              <button
                type="button"
                className="flex items-center gap-1 pt-1 text-[12px] font-medium leading-[1.4] text-text-secondary"
              >
                <span>USDT</span>
                <MaskedIcon src="/icons/chevron-down.svg" className="size-3" />
              </button>
            </div>
          ) : null}
        </div>

        <Button
          className="h-8 min-w-[104px] rounded-full bg-brand-primary px-4 text-[14px] font-medium leading-[1.4] text-black hover:bg-brand-primary/90"
          onClick={onAddFunds}
        >
          Add Funds
        </Button>
      </div>
    </section>
  );
}
