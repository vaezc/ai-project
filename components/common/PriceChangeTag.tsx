import { memo } from "react";

import { cn } from "@/lib/utils";

interface PriceChangeTagProps {
  value: number;
  className?: string;
}

export const PriceChangeTag = memo(function PriceChangeTag({
  value,
  className,
}: PriceChangeTagProps) {
  const isPositive = value >= 0;
  const label = `${isPositive ? "+" : ""}${value.toFixed(2)}%`;

  return (
    <span
      className={cn(
        "inline-flex min-w-18 items-center justify-center rounded-[6px] px-3 py-1 text-[14px] font-medium leading-[1.4] tabular-nums text-white",
        isPositive
          ? "bg-chart-green"
          : "bg-chart-red",
        className
      )}
    >
      {label}
    </span>
  );
});
