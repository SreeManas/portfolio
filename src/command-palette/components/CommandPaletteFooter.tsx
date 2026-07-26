import type { ReactElement } from "react";

import { Kbd } from "@/components/ui/Kbd";
import {
  formatPlatformShortcut,
  getVisitorPlatform,
} from "@/command-palette/lib/platform";
import type { CommandPaletteContent } from "@/command-palette/types";

interface CommandPaletteFooterProps {
  shortcuts: CommandPaletteContent["footerShortcuts"];
}

export function CommandPaletteFooter({
  shortcuts,
}: CommandPaletteFooterProps): ReactElement {
  const platform = getVisitorPlatform();

  return (
    <footer className="border-t border-border bg-paper px-4 py-3">
      <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs leading-5 text-muted-foreground">
        {shortcuts.map((shortcut) => (
          <li key={shortcut.id} className="flex items-center gap-2">
            <Kbd className="min-h-5 min-w-5 px-1 text-[0.625rem]">
              {formatPlatformShortcut(shortcut.keys, platform)}
            </Kbd>
            <span>{shortcut.label}</span>
          </li>
        ))}
      </ul>
    </footer>
  );
}
