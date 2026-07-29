import { useEffect, useState, type ReactElement } from "react";


interface ReadingProgressProps {
  targetId?: string; // Optional ID of the specific content area to track. Defaults to document.body
}

export function ReadingProgress({ targetId }: ReadingProgressProps): ReactElement {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frameId: number;
    
    const handleScroll = () => {
      // Use requestAnimationFrame to throttle scroll updates
      frameId = requestAnimationFrame(() => {
        let scrollY = window.scrollY;
        let scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        
        if (targetId) {
          const element = document.getElementById(targetId);
          if (element) {
            const rect = element.getBoundingClientRect();
            // How much of the element we've scrolled past relative to its top
            // Using window.scrollY relative to element's absolute top
            const elementTop = rect.top + window.scrollY;
            const elementHeight = element.offsetHeight;
            
            // Adjust calculation based on the element
            scrollY = Math.max(0, window.scrollY - elementTop + (window.innerHeight / 2));
            scrollHeight = elementHeight;
          }
        }
        
        if (scrollHeight > 0) {
          const rawProgress = (scrollY / scrollHeight) * 100;
          setProgress(Math.min(100, Math.max(0, rawProgress)));
        } else {
          setProgress(0);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial calculation
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(frameId);
    };
  }, [targetId]);

  return (
    <div 
      className="fixed top-0 left-0 right-0 h-1 z-50 pointer-events-none bg-transparent"
      aria-hidden="true"
    >
      <div 
        className="h-full bg-accent transition-[width] duration-75 ease-out shadow-[0_0_10px_rgba(var(--accent-rgb),0.5)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
