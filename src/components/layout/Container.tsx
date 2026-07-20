import type { ComponentPropsWithoutRef, ReactElement } from "react";

import { cn } from "@/lib/cn";

type ContainerSize = "narrow" | "content" | "wide" | "full";

interface ContainerProps extends ComponentPropsWithoutRef<"div"> {
  size?: ContainerSize;
}

const sizeClassName: Record<ContainerSize, string> = {
  narrow: "max-w-[var(--layout-narrow)]",
  content: "max-w-[var(--layout-content)]",
  wide: "max-w-[var(--layout-wide)]",
  full: "max-w-none",
};

export function Container({
  size = "content",
  className,
  children,
  ...props
}: ContainerProps): ReactElement {
  return (
    <div
      className={cn(
        "mx-auto w-full px-[var(--layout-gutter)]",
        sizeClassName[size],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

