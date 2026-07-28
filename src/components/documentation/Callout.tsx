import type { ReactElement, ReactNode } from "react";
import { cn } from "@/lib/cn";

export type CalloutType =
  | "info"
  | "tip"
  | "important"
  | "warning"
  | "success"
  | "error";

export interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
  className?: string;
}

function getCalloutStyles(type: CalloutType): {
  container: string;
  badge: string;
  icon: string;
} {
  switch (type) {
    case "tip":
      return {
        container: "border-emerald-600/30 bg-emerald-500/5 text-ink",
        badge: "text-emerald-700 border-emerald-600/30",
        icon: "💡",
      };
    case "important":
      return {
        container: "border-accent bg-accent/5 text-ink",
        badge: "text-accent border-accent/40",
        icon: "📌",
      };
    case "warning":
      return {
        container: "border-amber-600/30 bg-amber-500/5 text-ink",
        badge: "text-amber-700 border-amber-600/30",
        icon: "⚠️",
      };
    case "success":
      return {
        container: "border-emerald-600/30 bg-emerald-500/5 text-ink",
        badge: "text-emerald-700 border-emerald-600/30",
        icon: "✓",
      };
    case "error":
      return {
        container: "border-red-600/30 bg-red-500/5 text-ink",
        badge: "text-red-700 border-red-600/30",
        icon: "🚨",
      };
    case "info":
    default:
      return {
        container: "border-border bg-paper text-ink",
        badge: "text-muted-foreground border-border",
        icon: "ℹ️",
      };
  }
}

export function Callout({
  type = "info",
  title,
  children,
  className,
}: CalloutProps): ReactElement {
  const styles = getCalloutStyles(type);

  return (
    <aside
      className={cn(
        "border-l-4 border p-5 my-6 rounded-control transition-colors shadow-sm",
        styles.container,
        className,
      )}
    >
      <div className="flex items-center gap-2.5">
        <span aria-hidden="true" className="text-sm">
          {styles.icon}
        </span>
        <span
          className={cn(
            "font-mono text-[0.625rem] uppercase tracking-wider px-2 py-0.5 border font-semibold rounded-none",
            styles.badge,
          )}
        >
          {title || type}
        </span>
      </div>

      <div className="mt-3 text-sm leading-7 text-ink">{children}</div>
    </aside>
  );
}
