import Image from "next/image";
import { memo } from "react";

import { cn } from "@/lib/utils";

interface CoinIconProps {
  symbol: string;
  className?: string;
}

const coinImageMap: Record<string, string> = {
  BTC: "/coin-icons/btc.svg",
  ETH: "/coin-icons/eth.svg",
  BNB: "/coin-icons/bnb.svg",
  SOL: "/coin-icons/sol.svg",
  XRP: "/coin-icons/xrp.svg",
  SHIB: "/coin-icons/shib.png",
  DOGE: "/coin-icons/doge.svg",
  LTC: "/coin-icons/ltc.svg",
};

const fallbackThemes: Record<string, string> = {
  BTC: "bg-[#f7931a] text-white",
  ETH: "bg-[#627eea] text-white",
  BNB: "bg-[#f3ba2f] text-white",
  SOL: "bg-[linear-gradient(180deg,#7a5cff,#14f195)] text-white",
  XRP: "bg-[#1f2630] text-white",
  SHIB: "bg-[#f15a29] text-white",
  DOGE: "bg-[#c2a633] text-white",
  LTC: "bg-[#8d8d8d] text-white",
};

export const CoinIcon = memo(function CoinIcon({
  symbol,
  className,
}: CoinIconProps) {
  const imageSrc = coinImageMap[symbol];

  if (imageSrc) {
    return (
      <div
        className={cn(
          "relative size-10 shrink-0 overflow-hidden rounded-full bg-transparent",
          className
        )}
      >
        <Image
          src={imageSrc}
          alt={`${symbol} logo`}
          fill
          sizes="40px"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex size-10 items-center justify-center rounded-full text-xs font-semibold shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]",
        fallbackThemes[symbol] ?? "bg-brand-primary/12 text-brand-primary",
        className
      )}
    >
      {symbol.slice(0, 3)}
    </div>
  );
});
