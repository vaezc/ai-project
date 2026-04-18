import { memo } from "react";
import Image from "next/image";

import type { MockCoin } from "@/mock/coins";
import { CoinIcon } from "@/components/common/CoinIcon";
import { PriceChangeTag } from "@/components/common/PriceChangeTag";

interface MarketRowProps {
  coin: MockCoin;
  isFavorite?: boolean;
  onRemoveFavorite?: (symbol: string) => void;
}

export const MarketRow = memo(function MarketRow({
  coin,
  isFavorite = false,
  onRemoveFavorite,
}: MarketRowProps) {
  return (
    <div className="flex h-[62px] items-center gap-2 px-4 py-2">
      <div className="flex min-w-[90px] flex-1 items-center gap-2.5">
        <CoinIcon symbol={coin.symbol} className="size-6 text-[10px]" />
        <div className="flex min-w-0 flex-1 flex-col items-start pb-0.5">
          <div className="flex items-baseline gap-1">
            <span className="text-[14px] font-medium leading-[1.4] text-text-primary">
              {coin.symbol}
            </span>
            <span className="text-[12px] leading-[1.4] text-text-secondary">/USDT</span>
          </div>
          <span className="truncate text-[12px] leading-[1.4] text-text-secondary">
            {coin.name}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-end gap-4">
        {isFavorite && onRemoveFavorite ? (
          <button
            type="button"
            onClick={() => onRemoveFavorite(coin.symbol)}
            aria-label={`Remove ${coin.symbol} from favorites`}
            className="flex size-5 items-center justify-center text-text-primary transition-transform active:scale-95"
          >
            <Image
              src="/icons/checkbox-checked.svg"
              alt=""
              width={16}
              height={16}
              className="size-4"
            />
          </button>
        ) : null}
        <div className="flex flex-col items-end">
          <span className="text-[14px] font-medium leading-[1.4] text-text-primary">
            {coin.price.toLocaleString(undefined, {
              maximumFractionDigits: coin.price > 100 ? 2 : 5,
            })}
          </span>
          <span className="text-[12px] leading-[1.4] text-text-secondary">
            ${coin.price.toLocaleString(undefined, {
              maximumFractionDigits: coin.price > 100 ? 2 : 5,
            })}
          </span>
        </div>
        <PriceChangeTag
          value={coin.change}
          className="h-[30px] min-w-[74px] rounded-[6px] px-2"
        />
      </div>
    </div>
  );
});
