import type { ReactElement } from "react";

import { Kbd } from "@/components/ui/Kbd";
import type { CommandPaletteContent } from "@/command-palette/types";

interface CommandPaletteFooterProps {
  shortcuts: CommandPaletteContent["footerShortcuts"];
  shortcutHint: string;
}

export function CommandPaletteFooter({
  shortcuts,
  shortcutHint,
}: CommandPaletteFooterProps): ReactElement {
  return (
    <footer className="border-t border-border bg-paper px-4 py-3">
      <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs leading-5 text-muted-foreground">
        {shortcuts.map((shortcut) => (
          <li key={shortcut.id} className="flex items-center gap-2">
            <Kbd className="min-h-5 min-w-5 px-1 text-[0.625rem]">
              {shortcut.id === "toggle" ? shortcutHint : shortcut.keys}
            </Kbd>
            <span>{shortcut.label}</span>
          </li>
        ))}
      </ul>
    </footer>
  );
}
