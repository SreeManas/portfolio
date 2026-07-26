import type { ReactElement } from "react";

interface CommandToastProps {
  message: string;
}

export function CommandToast({ message }: CommandToastProps): ReactElement {
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-5 left-1/2 z-[70] -translate-x-1/2 rounded-panel border border-border bg-paper px-4 py-2 text-sm leading-6 text-ink shadow-soft"
    >
      {message}
    </div>
  );
}
