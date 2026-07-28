import { useState, type ReactElement } from "react";
import { cn } from "@/lib/cn";

export interface ImageWithCaptionProps {
  src: string;
  alt: string;
  caption?: string;
  description?: string;
  className?: string;
}

export function ImageWithCaption({
  src,
  alt,
  caption,
  description,
  className,
}: ImageWithCaptionProps): ReactElement {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <figure className={cn("my-6 border border-border bg-paper p-5 rounded-panel shadow-sm", className)}>
      <div
        tabIndex={0}
        role="button"
        aria-label={`Zoom ${caption || alt}`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsZoomed(true);
          }
        }}
        onClick={() => setIsZoomed(true)}
        className="relative cursor-zoom-in overflow-hidden border border-border bg-canvas rounded-control group focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
      >
        <img
          src={src}
          alt={alt}
          className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-[1.01]"
        />
        <div className="absolute right-3 bottom-3 border border-border bg-paper/90 px-2 py-1 font-mono text-[0.625rem] text-muted-foreground uppercase opacity-0 group-hover:opacity-100 transition-opacity font-semibold">
          Click to Zoom
        </div>
      </div>

      {caption || description ? (
        <figcaption className="mt-3.5 space-y-1">
          {caption ? (
            <p className="font-mono text-xs font-semibold text-ink">{caption}</p>
          ) : null}
          {description ? (
            <p className="text-xs leading-5 text-muted-foreground">{description}</p>
          ) : null}
        </figcaption>
      ) : null}

      {/* Lightbox Modal */}
      {isZoomed ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={caption || alt}
          onClick={() => setIsZoomed(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm cursor-zoom-out"
        >
          <div className="max-w-5xl max-h-[90vh] overflow-auto border border-border bg-paper p-3 rounded-panel shadow-soft">
            <img src={src} alt={alt} className="h-auto max-w-full rounded-control" />
            {caption ? (
              <p className="p-3 font-mono text-xs text-ink text-center border-t border-border mt-2 font-semibold">
                {caption}
              </p>
            ) : null}
          </div>
        </div>
      ) : null}
    </figure>
  );
}
