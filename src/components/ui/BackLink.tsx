import type { AnchorHTMLAttributes, ReactElement } from "react";

interface BackLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
}

export function BackLink({ href, children, className = "", ...props }: BackLinkProps): ReactElement {
  return (
    <a
      href={href}
      className={`group inline-flex items-center gap-1.5 font-mono text-xs uppercase leading-6 text-muted-foreground transition-colors duration-200 ease-dossier hover:text-ink focus-visible:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${className}`}
      {...props}
    >
      <span
        aria-hidden="true"
        className="transition-transform duration-200 ease-dossier group-hover:-translate-x-1"
      >
        ←
      </span>
      <span>{children}</span>
    </a>
  );
}
