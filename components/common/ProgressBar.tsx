import { Progress, ProgressLabel, ProgressValue } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  label?: string;
  helperText?: string;
  className?: string;
}

export function ProgressBar({
  value,
  label = "任务进度",
  helperText,
  className,
}: ProgressBarProps) {
  return (
    <div
      className={cn(
        "rounded-[24px] border border-divider bg-bg-card p-4",
        className
      )}
    >
      <Progress value={value} className="w-full gap-2">
        <ProgressLabel className="text-sm text-text-primary">
          {label}
        </ProgressLabel>
        <ProgressValue className="text-xs text-text-secondary" />
      </Progress>
      {helperText ? (
        <p className="mt-3 text-xs leading-5 text-text-secondary">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}
