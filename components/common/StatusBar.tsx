import { BatteryFull, SignalHigh, Wifi } from "lucide-react";

import { cn } from "@/lib/utils";

interface StatusBarProps {
  time?: string;
  className?: string;
}

export function StatusBar({
  time = "9:41",
  className,
}: StatusBarProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between px-4 pt-2.5 pb-1 text-[11px] font-semibold text-text-primary",
        className
      )}
    >
      <span className="tracking-[0.02em]">{time}</span>
      <div className="flex items-center gap-1.5 text-text-primary">
        <SignalHigh className="size-3.5" />
        <Wifi className="size-3.5" />
        <BatteryFull className="size-4" />
      </div>
    </div>
  );
}
