import { useState } from "react";

import { Button } from "@/components/ui/button";
import { MaskedIcon } from "@/components/common/MaskedIcon";
import { getCoinsByCategory } from "@/mock/coins";
import { cn } from "@/lib/utils";

const favoriteCoins = getCoinsByCategory("favorites");
const candidateCoins = favoriteCoins
  .concat(
    getCoinsByCategory("hot").filter(
      (coin) => !favoriteCoins.some((item) => item.symbol === coin.symbol)
    )
  )
  .slice(0, 6);

interface FavoritesEmptyProps {
  className?: string;
  onSubmitFavorites?: (symbols: string[]) => void;
}

export function FavoritesEmpty({
  className,
  onSubmitFavorites,
}: FavoritesEmptyProps) {
  const [selectedSymbols, setSelectedSymbols] = useState<string[]>(
    candidateCoins
      .filter((_, index) => index % 2 === 1)
      .map((coin) => coin.symbol)
  );

  const toggleCoin = (symbol: string) => {
    setSelectedSymbols((current) =>
      current.includes(symbol)
        ? current.filter((item) => item !== symbol)
        : [...current, symbol]
    );
  };

  return (
    <div className={cn("flex flex-col gap-4 px-4", className)}>
      <div className="grid grid-cols-2 gap-3">
        {candidateCoins.map((coin) => {
          const selected = selectedSymbols.includes(coin.symbol);

          return (
            <button
              key={coin.symbol}
              type="button"
              onClick={() => toggleCoin(coin.symbol)}
              className="flex h-[65px] items-start rounded-[12px] border border-divider bg-surface-elevated px-[12px] py-[14px] text-left"
            >
              <div className="flex w-full items-center justify-between gap-2">
                <div className="flex min-w-0 flex-1 flex-col items-start leading-none">
                  <div className="flex items-baseline gap-1">
                    <span className="text-[14px] font-medium leading-[1.4] text-text-primary">
                      {coin.symbol}
                    </span>
                    <span className="text-[12px] leading-[22px] text-text-secondary">
                      /USDT
                    </span>
                  </div>
                  <p
                    className={cn(
                      "text-left text-[12px] font-medium leading-[1.4]",
                      coin.change >= 0 ? "text-chart-green" : "text-chart-red"
                    )}
                  >
                    {coin.change >= 0 ? "+" : ""}
                    {coin.change.toFixed(2)}%
                  </p>
                </div>
                {selected ? (
                  <MaskedIcon
                    src="/icons/checkbox-checked.svg"
                    className="size-[14px] shrink-0 text-text-primary"
                  />
                ) : (
                  <span className="block size-[14px] shrink-0 rounded-full border-[1.3px] border-divider" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      <Button
        className="h-[48px] rounded-full bg-brand-primary text-[16px] font-medium text-black hover:bg-brand-primary/90"
        onClick={() => onSubmitFavorites?.(selectedSymbols)}
        disabled={selectedSymbols.length === 0}
      >
        Add to Favorites
      </Button>
    </div>
  );
}
