import type { ReactElement } from "react";
import type { AuthorProfile } from "@/notes/types";

interface AuthorProfileCardProps {
  author: AuthorProfile;
}

export function AuthorProfileCard({ author }: AuthorProfileCardProps): ReactElement {
  return (
    <div className="flex flex-col sm:flex-row items-start gap-4 border border-border bg-paper p-5 md:p-6 rounded-panel shadow-sm">
      <div className="h-16 w-16 shrink-0 rounded-full border border-border bg-canvas overflow-hidden flex items-center justify-center">
        {author.avatarUrl ? (
          <img src={author.avatarUrl} alt={author.name} className="h-full w-full object-cover" />
        ) : (
          <span className="font-display text-2xl text-muted-foreground">{author.name.charAt(0)}</span>
        )}
      </div>
      <div className="flex-1">
        <h4 className="font-semibold text-ink text-lg">{author.name}</h4>
        <p className="font-mono text-[0.625rem] font-semibold uppercase tracking-wider text-accent">
          {author.role}
        </p>
        <p className="mt-2 text-sm leading-6 text-muted-foreground max-w-prose">
          {author.biography}
        </p>
        
        <div className="mt-4 flex flex-wrap gap-4">
          {author.links.github && (
            <a href={author.links.github} target="_blank" rel="noopener noreferrer" className="font-mono text-[0.625rem] font-semibold uppercase tracking-wider text-muted-foreground hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent underline underline-offset-4">
              GitHub
            </a>
          )}
          {author.links.linkedin && (
            <a href={author.links.linkedin} target="_blank" rel="noopener noreferrer" className="font-mono text-[0.625rem] font-semibold uppercase tracking-wider text-muted-foreground hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent underline underline-offset-4">
              LinkedIn
            </a>
          )}
          {author.links.twitter && (
            <a href={author.links.twitter} target="_blank" rel="noopener noreferrer" className="font-mono text-[0.625rem] font-semibold uppercase tracking-wider text-muted-foreground hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent underline underline-offset-4">
              Twitter
            </a>
          )}
          {author.links.portfolio && (
            <a href={author.links.portfolio} target="_blank" rel="noopener noreferrer" className="font-mono text-[0.625rem] font-semibold uppercase tracking-wider text-muted-foreground hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent underline underline-offset-4">
              Portfolio
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
