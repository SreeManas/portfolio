import type { ComponentPropsWithoutRef, ReactElement } from "react";

import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantClassName: Record<ButtonVariant, string> = {
  primary:
    "border-ink bg-ink text-canvas hover:bg-accent hover:border-accent",
  secondary:
    "border-border bg-paper text-ink hover:border-ink hover:bg-canvas",
  ghost:
    "border-transparent bg-transparent text-muted-foreground hover:text-ink",
};

const sizeClassName: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-4 text-sm",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  type = "button",
  ...props
}: ButtonProps): ReactElement {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-control border font-medium transition-colors duration-200 ease-dossier disabled:pointer-events-none disabled:opacity-50",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent",
        variantClassName[variant],
        sizeClassName[size],
        className,
      )}
      {...props}
    />
  );
}

