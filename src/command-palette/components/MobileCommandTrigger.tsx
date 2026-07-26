import type { ReactElement } from "react";

interface MobileCommandTriggerProps {
  label: string;
  onOpen: () => void;
}

export function MobileCommandTrigger({
  label,
  onOpen,
}: MobileCommandTriggerProps): ReactElement {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="fixed bottom-5 right-5 z-40 rounded-panel border border-border bg-paper px-4 py-2 font-mono text-xs uppercase leading-6 text-ink shadow-soft transition-colors duration-200 ease-dossier hover:border-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent md:hidden"
    >
      {label}
    </button>
  );
}
