import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";

interface MaskedIconProps {
  src: string;
  className?: string;
  size?: number;
  style?: CSSProperties;
}

export function MaskedIcon({ src, className, size, style }: MaskedIconProps) {
  return (
    <span
      aria-hidden
      className={cn("inline-block bg-current", className)}
      style={{
        ...(size ? { width: size, height: size } : null),
        WebkitMaskImage: `url(${src})`,
        maskImage: `url(${src})`,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        ...style,
      }}
    />
  );
}
