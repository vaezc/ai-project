import { memo } from "react";
import Image from "next/image";

import type { MockCoin } from "@/mock/coins";
import { MarketRow } from "@/components/home/MarketRow";
import { MaskedIcon } from "@/components/common/MaskedIcon";

interface MarketTableProps {
  coins: MockCoin[];
  favoriteSymbols?: string[];
  onRemoveFavorite?: (symbol: string) => void;
}

export const MarketTable = memo(function MarketTable({
  coins,
  favoriteSymbols,
  onRemoveFavorite,
}: MarketTableProps) {
  return (
    <section className="flex flex-col">
      <div className="flex h-8 items-center px-4 text-[12px] font-normal text-text-secondary">
        <div className="flex flex-1 items-center gap-1">
          <span>币种</span>
          <Image src="/icons/sort.svg" alt="" width={8} height={8} className="size-2" />
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-end gap-1">
            <span>最新价</span>
            <Image src="/icons/sort.svg" alt="" width={8} height={8} className="size-2" />
          </div>
          <div className="flex min-w-[74px] items-center justify-end gap-1">
            <span>涨跌幅</span>
            <Image src="/icons/sort.svg" alt="" width={8} height={8} className="size-2" />
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        {coins.map((coin) => (
          <MarketRow
            key={coin.symbol}
            coin={coin}
            isFavorite={favoriteSymbols?.includes(coin.symbol) ?? false}
            onRemoveFavorite={onRemoveFavorite}
          />
        ))}
      </div>

      <div className="flex h-8 items-center justify-center gap-1 px-4 text-sm font-medium text-text-primary">
        <span>See More</span>
        <MaskedIcon src="/icons/arrow-right.svg" className="size-4" />
      </div>
    </section>
  );
});
