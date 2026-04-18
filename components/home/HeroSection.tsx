import Image from "next/image";

import { ActivityBanner } from "@/components/home/ActivityBanner";
import { Button } from "@/components/ui/button";
import { figmaAssets } from "@/lib/figma-assets";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  showCountdown?: boolean;
  className?: string;
  onSignUp?: () => void;
}

export function HeroSection({
  showCountdown = true,
  className,
  onSignUp,
}: HeroSectionProps) {
  return (
    <section
      className={cn(
        "flex flex-col items-center gap-3 px-4 pt-4 text-center",
        className
      )}
    >
      <div className="relative size-[150px]">
        <div
          aria-hidden
          className="halo-pulse absolute left-1/2 top-1/2 size-[180px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(246,143,21,0.45),transparent_65%)] blur-2xl"
        />
        <div className="float-subtle relative size-full">
          <Image
            src={figmaAssets.heroGift}
            alt="新用户礼盒"
            loading="eager"
            fetchPriority="high"
            width={150}
            height={150}
            sizes="150px"
            className="size-full object-contain"
          />
        </div>
      </div>

      <div className="flex flex-col items-center gap-2">
        <ActivityBanner showCountdown={showCountdown} />
      </div>

      <Button
        size="lg"
        className="fade-slide-up shimmer-sweep mt-2 h-12 w-full rounded-full bg-brand-primary text-base font-medium text-black hover:bg-brand-primary/90"
        onClick={onSignUp}
      >
        <Image
          src="/icons/gift.svg"
          alt=""
          width={20}
          height={20}
          data-icon="inline-start"
          className="size-5"
        />
        Sign up
      </Button>
    </section>
  );
}
