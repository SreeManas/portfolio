import { type ReactElement, type ReactNode, useState } from "react";
import { cn } from "@/lib/cn";

export function Prose({ children }: { children: ReactNode }): ReactElement {
  return (
    <div className="prose prose-zinc lg:prose-lg text-ink max-w-[var(--measure-copy)]">
      {children}
    </div>
  );
}

// Ensure heading IDs are formatted safely for URL hashes
function getSafeId(id?: string, children?: ReactNode): string {
  if (id) return id;
  if (typeof children === "string") {
    return children.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }
  return "";
}

interface ProseHeadingProps {
  id?: string;
  children: ReactNode;
  className?: string;
}

export function ProseH2({ id, children, className }: ProseHeadingProps): ReactElement {
  const safeId = getSafeId(id, children);
  
  return (
    <h2
      id={safeId}
      className={cn(
        "group relative mt-16 mb-6 scroll-mt-32 font-display text-2xl md:text-3xl font-semibold text-ink leading-tight",
        className
      )}
    >
      <a
        href={`#${safeId}`}
        className="absolute -left-8 top-1/2 -translate-y-1/2 opacity-0 transition-all duration-200 ease-out group-hover:opacity-100 hidden md:flex items-center justify-center p-2 text-muted-foreground hover:text-accent focus-visible:opacity-100 focus-visible:outline-accent rounded-md"
        aria-label="Link to this section"
        onClick={(e) => {
          // Allow normal anchor navigation but also push state for copyability
          e.currentTarget.blur();
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
        </svg>
      </a>
      {children}
    </h2>
  );
}

export function ProseH3({ id, children, className }: ProseHeadingProps): ReactElement {
  const safeId = getSafeId(id, children);
  
  return (
    <h3
      id={safeId}
      className={cn(
        "group relative mt-10 mb-4 scroll-mt-32 font-display text-xl md:text-2xl font-semibold text-ink leading-snug",
        className
      )}
    >
      <a
        href={`#${safeId}`}
        className="absolute -left-8 top-1/2 -translate-y-1/2 opacity-0 transition-all duration-200 ease-out group-hover:opacity-100 hidden md:flex items-center justify-center p-2 text-muted-foreground hover:text-accent focus-visible:opacity-100 focus-visible:outline-accent rounded-md"
        aria-label="Link to this section"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
        </svg>
      </a>
      {children}
    </h3>
  );
}

export function ProseP({ children, className }: { children: ReactNode; className?: string }): ReactElement {
  return (
    <p className={cn("mt-6 mb-6 last:mb-0 text-lg leading-relaxed text-muted-foreground", className)}>
      {children}
    </p>
  );
}

export function ProseUl({ children }: { children: ReactNode }): ReactElement {
  return <ul className="mt-6 mb-6 last:mb-0 list-disc pl-6 space-y-3 text-lg leading-relaxed text-muted-foreground">{children}</ul>;
}

export function ProseLi({ children }: { children: ReactNode }): ReactElement {
  return <li className="pl-2 marker:text-border">{children}</li>;
}

export function ProseCode({ children, language = "bash" }: { children: string; language?: string }): ReactElement {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    void navigator.clipboard.writeText(children).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="group relative mt-8 mb-8 overflow-hidden rounded-panel border border-border bg-paper shadow-sm">
      <div className="flex items-center justify-between border-b border-border/60 bg-canvas/50 px-5 py-2.5">
        <span className="font-mono text-[0.625rem] font-semibold uppercase tracking-wider text-muted-foreground">
          {language}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-control px-2 py-1 font-mono text-[0.625rem] font-semibold uppercase tracking-wider text-muted-foreground hover:bg-border/40 hover:text-ink transition-all duration-200 ease-out focus-visible:outline-accent"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <svg className="h-3.5 w-3.5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-green-500">Copied</span>
            </>
          ) : (
            <>
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <div className="overflow-x-auto p-5">
        <pre className="font-mono text-[0.8125rem] leading-relaxed text-ink min-w-full">
          <code>{children}</code>
        </pre>
      </div>
    </div>
  );
}

interface ProseCalloutProps {
  title?: string;
  children: ReactNode;
  variant?: "info" | "warning" | "success" | "danger" | "tip";
}

export function ProseCallout({ title, children, variant = "info" }: ProseCalloutProps): ReactElement {
  const styles = {
    info: "border-accent/20 bg-accent/[0.03] text-ink",
    warning: "border-amber-500/20 bg-amber-500/[0.03] text-ink",
    success: "border-emerald-500/20 bg-emerald-500/[0.03] text-ink",
    danger: "border-red-500/20 bg-red-500/[0.03] text-ink",
    tip: "border-indigo-500/20 bg-indigo-500/[0.03] text-ink",
  };

  const icons = {
    info: (
      <svg className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    warning: (
      <svg className="h-5 w-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    success: (
      <svg className="h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    danger: (
      <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    tip: (
      <svg className="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  };

  return (
    <div className={cn("mt-10 mb-10 flex gap-4 rounded-panel border p-5 md:p-6 shadow-sm", styles[variant])}>
      <div className="shrink-0 mt-0.5">{icons[variant]}</div>
      <div>
        {title && <h4 className="font-semibold mb-1.5 text-ink tracking-tight">{title}</h4>}
        <div className="text-muted-foreground text-base leading-relaxed [&>p:first-child]:mt-0 [&>p:last-child]:mb-0">
          {children}
        </div>
      </div>
    </div>
  );
}
