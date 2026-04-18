"use client";

import { LaptopMinimal, MoonStar, SunMedium } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

const themes = [
  { label: "浅色", value: "light", icon: SunMedium },
  { label: "深色", value: "dark", icon: MoonStar },
  { label: "跟随系统", value: "system", icon: LaptopMinimal },
] as const;

export function ThemeToggle() {
  const { resolvedTheme, setTheme, theme } = useTheme();

  return (
    <div className="flex items-center rounded-full border border-border bg-background/80 p-1 shadow-sm backdrop-blur">
      {themes.map(({ label, value, icon: Icon }) => {
        const isActive =
          theme === value || (value === "system" && theme === "system");

        return (
          <Button
            key={value}
            type="button"
            variant={isActive ? "default" : "ghost"}
            size="sm"
            className="rounded-full"
            onClick={() => setTheme(value)}
            aria-pressed={isActive}
            aria-label={label}
            title={
              value === "system"
                ? `当前跟随系统，实际主题：${resolvedTheme === "dark" ? "深色" : "浅色"}`
                : label
            }
          >
            <Icon data-icon="inline-start" />
            <span>{label}</span>
          </Button>
        );
      })}
    </div>
  );
}
