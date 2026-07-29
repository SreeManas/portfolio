import { useState, useEffect, type ReactElement } from "react";
import { cn } from "@/lib/cn";
import { AnimatePresence, motion } from "framer-motion";

interface ProseImageProps {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
}

export function ProseImage({ src, alt, caption, className }: ProseImageProps): ReactElement {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <figure className={cn("my-12 group relative", className)}>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="block w-full overflow-hidden rounded-panel border border-border/60 bg-canvas shadow-sm hover:shadow-md focus-visible:outline-accent cursor-zoom-in group-hover:border-accent/40 transition-all duration-200 ease-out"
          aria-label={`Enlarge image: ${alt}`}
        >
          <img 
            src={src} 
            alt={alt} 
            className="w-full h-auto object-cover transition-transform duration-500 ease-out group-hover:scale-[1.01]"
            loading="lazy"
          />
        </button>
        {caption && (
          <figcaption className="mt-4 text-center text-[0.8125rem] leading-relaxed text-muted-foreground">
            {caption}
          </figcaption>
        )}
      </figure>

      {/* Lightbox */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-canvas/95 backdrop-blur-md p-4 md:p-8"
            onClick={() => setIsOpen(false)}
          >
            <div className="absolute top-4 right-4 z-50">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-paper border border-border text-ink hover:text-accent hover:border-accent/40 transition-colors focus-visible:outline-accent shadow-sm"
                aria-label="Close image lightbox"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <motion.img
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              src={src}
              alt={alt}
              className="max-h-full max-w-full object-contain shadow-2xl rounded-sm"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
