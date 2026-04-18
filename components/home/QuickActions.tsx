import { MaskedIcon } from "@/components/common/MaskedIcon";
import { cn } from "@/lib/utils";

const actions = [
  { label: "Deposit", icon: "/quick-icons/deposit.svg" },
  { label: "Reward", icon: "/quick-icons/reward.svg" },
  { label: "Referral", icon: "/quick-icons/referral.svg" },
  { label: "Earn", icon: "/quick-icons/earn.svg" },
  { label: "More", icon: "/quick-icons/more.svg" },
];

interface QuickActionsProps {
  className?: string;
  onAction?: (action: string) => void;
}

export function QuickActions({ className, onAction }: QuickActionsProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-5 gap-2 px-4",
        className
      )}
    >
      {actions.map(({ label, icon }) => (
        <button
          key={label}
          type="button"
          aria-label={label}
          onClick={() => onAction?.(label)}
          className="flex w-full flex-col items-center gap-1.5 text-center text-text-primary transition-transform active:scale-95"
        >
          <MaskedIcon src={icon} className="size-6" />
          <span className="text-[12px] font-normal leading-[1.4] text-text-primary">
            {label}
          </span>
        </button>
      ))}
    </div>
  );
}
