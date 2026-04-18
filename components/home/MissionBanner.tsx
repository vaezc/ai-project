"use client";

import type { ReactNode } from "react";
import Image from "next/image";

import { CountdownTimer } from "@/components/common/CountdownTimer";
import { MaskedIcon } from "@/components/common/MaskedIcon";
import { Button } from "@/components/ui/button";
import { figmaAssets } from "@/lib/figma-assets";
import { cn } from "@/lib/utils";
import { missionBannerConfigs } from "@/mock/missions";
import type { MissionBannerVariant } from "@/store/appStore";

interface MissionBannerProps {
  variant: MissionBannerVariant;
  className?: string;
  onAction?: () => void;
}

function renderHighlightedDescription(description: string, highlight: string) {
  const segments = description.split(highlight);

  if (segments.length === 1) {
    return <span>{description}</span>;
  }

  return segments.flatMap((segment, index) => {
    const items: ReactNode[] = [
      <span key={`segment-${index}`}>{segment}</span>,
    ];

    if (index < segments.length - 1) {
      items.push(
        <span key={`highlight-${index}`} className="font-semibold text-brand-primary">
          {highlight}
        </span>
      );
    }

    return items;
  });
}

function MissionGiftNode({
  dimmed = false,
}: {
  dimmed?: boolean;
}) {
  return (
    <Image
      src={figmaAssets.missionGift}
      alt=""
      width={24}
      height={24}
      sizes="24px"
      className={cn(
        "size-6 shrink-0 object-contain transition-opacity",
        dimmed && "opacity-70 saturate-0"
      )}
    />
  );
}

function RewardBubble({
  label,
  tone,
}: {
  label: string;
  tone: "primary" | "white";
}) {
  const bg = tone === "primary" ? "bg-brand-primary" : "bg-white";

  return (
    <div
      className={cn(
        "relative flex h-[23px] items-center justify-center rounded-full px-[7.5px] text-[10px] font-bold leading-[1.4] text-black whitespace-nowrap",
        bg
      )}
    >
      {label}
      <span
        aria-hidden
        className={cn(
          "absolute left-1/2 top-full size-[6px] -translate-x-1/2 -translate-y-[4px] rotate-45",
          bg
        )}
      />
    </div>
  );
}

type RailNode =
  | { type: "check" }
  | { type: "gift"; label: string; tone: "primary" | "white"; dimmed: boolean };

const railMap: Record<MissionBannerVariant, { leftNode: RailNode; rightNode: RailNode }> = {
  "deposit-pending": {
    leftNode: { type: "gift", label: "5 USDT", tone: "primary", dimmed: false },
    rightNode: { type: "gift", label: "30 USDT", tone: "white", dimmed: true },
  },
  "trade-pending": {
    leftNode: { type: "check" },
    rightNode: { type: "gift", label: "30 USDT", tone: "primary", dimmed: false },
  },
  "trade-pending-static": {
    leftNode: { type: "check" },
    rightNode: { type: "gift", label: "30 USDT", tone: "primary", dimmed: false },
  },
  "trade-completed": {
    leftNode: { type: "check" },
    rightNode: { type: "gift", label: "30 USDT", tone: "primary", dimmed: false },
  },
  "trade-failed": {
    leftNode: { type: "check" },
    rightNode: { type: "gift", label: "30 USDT", tone: "primary", dimmed: false },
  },
  "trade-failed-badge": {
    leftNode: { type: "gift", label: "已失效", tone: "white", dimmed: true },
    rightNode: { type: "gift", label: "30 USDT", tone: "primary", dimmed: false },
  },
};

function MissionRail({
  variant,
}: {
  variant: MissionBannerVariant;
}) {
  const { leftNode, rightNode } = railMap[variant];
  const middleReached = variant !== "deposit-pending";

  return (
    <div className="relative pt-[30px]">
      <div className="flex items-center gap-1">
        <div className="h-px w-16 shrink-0 bg-brand-primary" />
        {leftNode.type === "check" ? (
          <div className="flex size-[18px] items-center justify-center rounded-[9px] bg-brand-primary p-[3px]">
            <MaskedIcon src="/icons/check.svg" className="size-3 text-black" />
          </div>
        ) : (
          <MissionGiftNode dimmed={leftNode.dimmed} />
        )}
        <div
          className={cn(
            "h-px flex-1 transition-colors duration-500 ease-out",
            middleReached ? "bg-brand-primary" : "bg-divider"
          )}
        />
        {rightNode.type === "check" ? (
          <div className="flex size-[18px] items-center justify-center rounded-[9px] bg-brand-primary p-[3px]">
            <MaskedIcon src="/icons/check.svg" className="size-3 text-black" />
          </div>
        ) : (
          <MissionGiftNode dimmed={rightNode.dimmed} />
        )}
        <div className="h-px w-10 shrink-0 bg-divider" />
      </div>

      {leftNode.type === "gift" && (
        <div className="absolute left-[80px] top-0 -translate-x-1/2">
          <RewardBubble label={leftNode.label} tone={leftNode.tone} />
        </div>
      )}
      {rightNode.type === "gift" && (
        <div className="absolute right-[56px] top-0 translate-x-1/2">
          <RewardBubble label={rightNode.label} tone={rightNode.tone} />
        </div>
      )}
    </div>
  );
}

const statusToneClassName = {
  muted: "text-text-primary",
  success: "text-text-primary",
  danger: "text-status-danger",
} as const;

export function MissionBanner({
  variant,
  className,
  onAction,
}: MissionBannerProps) {
  const config = missionBannerConfigs[variant];
  const progressValue = Math.max(
    0,
    Math.min(100, (config.current / config.total) * 100)
  );
  const isCompleted = config.footerTone === "success";
  const isDanger = config.footerTone === "danger";

  return (
    <section className={cn("flex flex-col gap-[10px] px-4", className)}>
      <MissionRail variant={variant} />

      <div className="rounded-[16px] bg-bg-card p-4">
        <div className="flex flex-col gap-3">
          {config.segmentLabels ? (
            <div className="inline-flex h-6 w-fit items-center rounded-[99px] bg-bg-input p-0.5">
              {config.segmentLabels.map((label, index) => {
                const isActive = config.activeSegment === index;

                return (
                  <span
                    key={label}
                    className={cn(
                      "flex h-5 items-center rounded-[99px] px-4 text-[14px] leading-none",
                      isActive
                        ? "bg-bg-card font-bold text-text-primary"
                        : "font-medium text-text-secondary"
                    )}
                  >
                    {label}
                  </span>
                );
              })}
            </div>
          ) : null}

          <div className="flex flex-col items-start gap-3">
            <div className="flex flex-col gap-4">
              <h3 className="text-[16px] font-bold leading-[1.4] text-text-primary">
                {config.title}
              </h3>

              <div className="w-full text-[12px] leading-[1.4] text-text-secondary">
                <p>
                  {renderHighlightedDescription(
                    config.description,
                    config.highlightLabel
                  )}
                  <Image
                    src="/icons/info.svg"
                    alt=""
                    width={14}
                    height={14}
                    className="ml-[2px] inline-block size-[14px] translate-y-[2px] align-baseline"
                  />
                </p>
              </div>
            </div>

            <div className="flex w-full items-center gap-[14px]">
              <div className="relative h-1 flex-1 overflow-hidden rounded-[1px] bg-mission-track">
                <div
                  className="relative h-full overflow-hidden rounded-[1px] bg-text-primary transition-[width] duration-700 ease-out"
                  style={{ width: `${progressValue}%` }}
                >
                  <span
                    aria-hidden
                    className="absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/70 to-transparent mix-blend-overlay animate-[progress-sheen_2.2s_ease-in-out_infinite]"
                  />
                </div>
              </div>
              <p className="text-[10px] font-bold leading-[1.4] tabular-nums">
                <span className="text-text-primary">{config.current}</span>
                <span className="font-medium text-text-secondary">/{config.total}</span>
              </p>
            </div>
          </div>

          <div className="flex w-full items-center justify-between">
            <div
              className={cn(
                "flex min-h-8 items-center gap-0.5 text-[12px] leading-[1.4]",
                statusToneClassName[config.footerTone]
              )}
            >
              {config.showCountdown ? (
                <>
                  <MaskedIcon
                    src="/icons/time-flat.svg"
                    className="size-[14px] shrink-0"
                  />
                  <span className="text-text-primary">
                    Time Limit:{" "}
                    <CountdownTimer
                      variant="inline"
                      className="font-normal text-text-primary"
                    />
                  </span>
                </>
              ) : isCompleted ? (
                <>
                  <MaskedIcon
                    src="/icons/success-flat.svg"
                    className="size-3 shrink-0"
                  />
                  <span className="text-text-primary">{config.footerLabel}</span>
                </>
              ) : isDanger ? (
                <>
                  <MaskedIcon
                    src="/icons/error-flat.svg"
                    className="size-3 shrink-0"
                  />
                  <span>{config.footerLabel}</span>
                </>
              ) : (
                <>
                  <MaskedIcon
                    src="/icons/time-flat.svg"
                    className="size-3 shrink-0"
                  />
                  <span>{config.footerLabel}</span>
                </>
              )}
            </div>

            <Button
              size="sm"
              className="h-8 w-[100px] self-center rounded-full bg-brand-primary px-4 text-[14px] font-medium leading-[22px] text-black hover:bg-brand-primary/90"
              onClick={onAction}
              aria-label={config.ctaLabel}
            >
              {config.ctaLabel}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
