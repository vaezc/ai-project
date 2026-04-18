import type { MockCoin } from "@/mock/coins";
import { CoinIcon } from "@/components/common/CoinIcon";
import { MarketTable } from "@/components/home/MarketTable";

interface NewListedSectionProps {
  featuredCoins: MockCoin[];
  tableCoins: MockCoin[];
}

export function NewListedSection({
  featuredCoins,
  tableCoins,
}: NewListedSectionProps) {
  return (
    <div className="flex flex-col gap-4">
      <section className="flex flex-col">
        <div className="flex h-8 items-center px-4 text-[12px] font-normal text-text-secondary">
          <div className="flex flex-1 items-center gap-1">
            <span>币种</span>
          </div>
          <div className="flex items-center gap-1">
            <span>结束倒计时</span>
          </div>
        </div>

        {featuredCoins.map((coin) => (
          <div
            key={`${coin.symbol}-listing`}
            className="flex h-[62px] items-center gap-2 px-4 py-3"
          >
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

            <div className="flex flex-col items-end">
              <span className="text-[14px] font-medium leading-[1.4] text-text-primary">
                {coin.listingCountdown}
              </span>
              <span className="text-[12px] leading-[1.4] text-text-secondary">
                {coin.listingStatusLabel ?? "距结束"}
              </span>
            </div>
          </div>
        ))}
      </section>

      <MarketTable coins={tableCoins} />
    </div>
  );
}
