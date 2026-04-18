import Image from "next/image";

import { MaskedIcon } from "@/components/common/MaskedIcon";
import { mockUser } from "@/mock/user";
import { cn } from "@/lib/utils";

interface NavBarProps {
  isLoggedIn?: boolean;
  className?: string;
  onAuthAction?: () => void;
  searchValue?: string;
  onNotificationsClick?: () => void;
  onSupportClick?: () => void;
}

export function NavBar({
  isLoggedIn = false,
  className,
  onAuthAction,
  searchValue = "BTC",
  onNotificationsClick,
  onSupportClick,
}: NavBarProps) {
  return (
    <header className={cn("flex h-11 items-center gap-4 px-4", className)}>
      <button
        type="button"
        onClick={onAuthAction}
        className={cn(
          "relative flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full",
          isLoggedIn
            ? "bg-surface-strong ring-1 ring-white/10"
            : "bg-surface-strong text-text-secondary"
        )}
      >
        {isLoggedIn ? (
          <Image
            src="/avatar.png"
            alt={`${mockUser.username} avatar`}
            fill
            sizes="32px"
            className="object-cover"
          />
        ) : (
          <Image src="/icons/nav-user.svg" alt="" width={16} height={16} className="size-4" />
        )}
        <span className="sr-only">Profile</span>
      </button>

      <div className="flex h-8 flex-1 items-center gap-2 rounded-full bg-bg-input px-3 py-1.5 text-left text-[14px] font-medium leading-[1.4] text-text-secondary">
        <Image src="/icons/nav-search.svg" alt="" width={16} height={16} className="size-4 shrink-0" />
        <span className="flex items-center gap-1 truncate">
          <Image src="/icons/nav-hot.svg" alt="" width={13} height={16} className="h-4 w-[13px] shrink-0" />
          {searchValue}
        </span>
      </div>

      <div className="ml-auto flex items-center gap-4 text-text-primary">
        <button
          type="button"
          onClick={onNotificationsClick}
          disabled={!onNotificationsClick}
          className="flex size-6 items-center justify-center transition-opacity hover:opacity-80 disabled:pointer-events-none"
        >
          <MaskedIcon src="/icons/nav-bell.svg" className="size-5" />
          <span className="sr-only">通知</span>
        </button>
        <button
          type="button"
          onClick={onSupportClick}
          disabled={!onSupportClick}
          className="flex size-6 items-center justify-center transition-opacity hover:opacity-80 disabled:pointer-events-none"
        >
          <MaskedIcon src="/icons/nav-headphones.svg" className="size-5" />
          <span className="sr-only">客服</span>
        </button>
      </div>
    </header>
  );
}
