import { useState, type ReactElement } from "react";
import { cn } from "@/lib/cn";

export interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
  highlightedLines?: number[];
  className?: string;
}

export function CodeBlock({
  code,
  language = "typescript",
  filename,
  showLineNumbers = true,
  highlightedLines = [],
  className,
}: CodeBlockProps): ReactElement {
  const [copied, setCopied] = useState(false);

  const lines = code.trim().split("\n");

  const handleCopy = (): void => {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {
        // Fallback ignore
      });
  };

  return (
    <div
      className={cn(
        "border border-border bg-[#111215] font-mono text-xs text-[#e2e8f0] rounded-panel overflow-hidden shadow-sm",
        className,
      )}
    >
      {/* Code Header Bar */}
      <div className="border-b border-border/60 bg-[#191b20] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3 truncate">
          {filename ? (
            <span className="font-semibold text-xs text-[#f1f5f9] truncate">
              {filename}
            </span>
          ) : (
            <span className="font-mono text-[0.625rem] font-semibold uppercase tracking-wider text-muted-foreground">
              {language}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="font-mono text-[0.625rem] font-semibold uppercase tracking-wider text-muted-foreground hover:text-ink transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
        >
          {copied ? "Copied ✓" : "Copy Code"}
        </button>
      </div>

      {/* Code Lines View */}
      <div className="py-4 overflow-x-auto max-h-96">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((lineContent, idx) => {
              const lineNumber = idx + 1;
              const isHighlighted = highlightedLines.includes(lineNumber);
              return (
                <tr
                  key={idx}
                  className={cn(
                    "transition-colors",
                    isHighlighted ? "bg-accent/15 border-l-2 border-accent" : "",
                  )}
                >
                  {showLineNumbers ? (
                    <td className="w-12 select-none text-right pr-4 text-[#64748b] font-mono text-[0.6875rem] align-top">
                      {lineNumber}
                    </td>
                  ) : null}
                  <td className="pr-4 whitespace-pre text-[#e2e8f0] leading-6 font-mono align-top">
                    {lineContent || " "}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
