import { CountdownTimer } from "@/components/common/CountdownTimer";
import { MaskedIcon } from "@/components/common/MaskedIcon";
import { cn } from "@/lib/utils";

interface ActivityBannerProps {
  showCountdown?: boolean;
  className?: string;
}

export function ActivityBanner({
  showCountdown = true,
  className,
}: ActivityBannerProps) {
  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <h2 className="text-[18px] leading-[1.45] font-semibold text-text-primary">
        新用户专属 <span className="text-brand-primary">100 USDT</span> 好礼
      </h2>
      {showCountdown ? (
        <div className="flex items-center gap-1.5 text-sm text-text-primary">
          <MaskedIcon src="/icons/time-flat.svg" className="size-[14px]" />
          <span>Time Limit:</span>
          <CountdownTimer variant="inline" />
        </div>
      ) : null}
    </div>
  );
}
