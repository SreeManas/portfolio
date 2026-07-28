import type { ReactElement } from "react";

interface LoadingProgressProps {
  isLoading: boolean;
}

export function LoadingProgress({ isLoading }: LoadingProgressProps): ReactElement | null {
  if (!isLoading) return null;

  return (
    <div
      role="progressbar"
      aria-label="Loading page"
      className="fixed top-0 left-0 right-0 z-50 h-0.5 overflow-hidden bg-transparent"
    >
      <div className="h-full w-full bg-accent animate-pulse origin-left" />
    </div>
  );
}
