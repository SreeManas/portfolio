import { useState, type ReactElement } from "react";
import { cn } from "@/lib/cn";

export interface TerminalLine {
  id?: string;
  command?: string;
  output?: string;
  status?: "success" | "warning" | "error" | "loading" | "info";
}

export interface TerminalComponentData {
  title?: string;
  prompt?: string;
  lines: TerminalLine[];
}

interface TerminalComponentProps {
  data: TerminalComponentData;
  className?: string;
}

export function TerminalComponent({ data, className }: TerminalComponentProps): ReactElement {
  const [copied, setCopied] = useState(false);

  const fullText = data.lines
    .map((l) => `${l.command ? `$ ${l.command}\n` : ""}${l.output || ""}`)
    .join("\n");

  const handleCopy = (): void => {
    navigator.clipboard
      .writeText(fullText)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {
        // Fallback ignore
      });
  };

  const defaultPrompt = data.prompt || "medrouter@dispatch ~ %";

  return (
    <div
      className={cn(
        "border border-border bg-[#111215] font-mono text-xs text-[#e1e1e3] rounded-panel overflow-hidden shadow-sm",
        className,
      )}
    >
      {/* Terminal Title Bar */}
      <div className="border-b border border-border/60 bg-[#191b20] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56] inline-block opacity-80" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e] inline-block opacity-80" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f] inline-block opacity-80" />
          <span className="ml-2 font-mono text-xs text-muted-foreground font-semibold">
            {data.title || "zsh — terminal"}
          </span>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="font-mono text-[0.625rem] font-semibold uppercase tracking-wider text-muted-foreground hover:text-ink transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
        >
          {copied ? "Copied ✓" : "Copy Output"}
        </button>
      </div>

      {/* Terminal Lines Content */}
      <div className="p-5 space-y-3 overflow-x-auto max-h-96">
        {data.lines.map((line, index) => (
          <div key={line.id || index} className="space-y-1">
            {line.command ? (
              <div className="flex items-center gap-2">
                <span className="text-accent font-semibold">{defaultPrompt}</span>
                <span className="text-[#f4f4f5]">{line.command}</span>
              </div>
            ) : null}

            {line.output ? (
              <div
                className={cn(
                  "pl-2 leading-relaxed whitespace-pre-wrap",
                  line.status === "success" && "text-emerald-400",
                  line.status === "warning" && "text-amber-400",
                  line.status === "error" && "text-red-400",
                  line.status === "loading" && "text-sky-400 animate-pulse",
                  (!line.status || line.status === "info") && "text-[#94a3b8]",
                )}
              >
                {line.output}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
