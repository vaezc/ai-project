"use client";

import { useEffect, useEffectEvent, useState } from "react";

import { getRemainingMilliseconds, missionDeadline } from "@/mock/countdown";
import { cn } from "@/lib/utils";

interface CountdownTimerProps {
  targetDate?: Date;
  className?: string;
  compact?: boolean;
  variant?: "inline" | "blocks";
}

interface CountdownParts {
  hours: string;
  minutes: string;
  seconds: string;
}

const placeholderParts: CountdownParts = {
  hours: "00",
  minutes: "00",
  seconds: "00",
};

function formatCountdownParts(remainingMs: number): CountdownParts {
  const totalSeconds = Math.floor(remainingMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    hours: String(hours).padStart(2, "0"),
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0"),
  };
}

export function CountdownTimer({
  targetDate = missionDeadline,
  className,
  compact = false,
  variant = "inline",
}: CountdownTimerProps) {
  const [parts, setParts] = useState<CountdownParts>(placeholderParts);
  const updateCountdown = useEffectEvent(() => {
    setParts((currentParts) => {
      const nextParts = formatCountdownParts(
        getRemainingMilliseconds(targetDate)
      );

      if (
        currentParts.hours === nextParts.hours &&
        currentParts.minutes === nextParts.minutes &&
        currentParts.seconds === nextParts.seconds
      ) {
        return currentParts;
      }

      return nextParts;
    });
  });

  useEffect(() => {
    const timeout = window.setTimeout(updateCountdown, 0);
    const interval = window.setInterval(updateCountdown, 1000);

    return () => {
      window.clearTimeout(timeout);
      window.clearInterval(interval);
    };
  }, [targetDate]);

  if (variant === "inline") {
    return (
      <span
        className={cn("font-medium tabular-nums", className)}
        aria-live="off"
      >
        {parts.hours}:{parts.minutes}:{parts.seconds}
      </span>
    );
  }

  const blockClassName = compact
    ? "min-w-10 rounded-xl px-2 py-1 text-xs"
    : "min-w-12 rounded-2xl px-3 py-2 text-sm";

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {(["hours", "minutes", "seconds"] as const).map((key, index) => (
        <div key={key} className="flex items-center gap-2">
          <div
            className={cn(
              "flex items-center justify-center bg-bg-input font-semibold text-text-primary tabular-nums",
              blockClassName
            )}
          >
            {parts[key]}
          </div>
          {index < 2 ? (
            <span className="text-sm font-semibold text-text-secondary">:</span>
          ) : null}
        </div>
      ))}
    </div>
  );
}
