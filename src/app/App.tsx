import type { ReactElement } from "react";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { CommandPalette } from "@/command-palette/CommandPalette";
import { Footer } from "@/components/layout/Footer";
import { LoadingProgress } from "@/components/ui/LoadingProgress";
import { footerContent } from "@/content/footer";
import { getArticleBySlug } from "@/content/notes";
import { useLocation, useLinkInterception } from "@/lib/router";
import { RootLayout } from "@/app/RootLayout";
import { HomePage } from "@/pages/HomePage";
import { JourneyPage } from "@/pages/journey/JourneyPage";
import { NoteDetailPage } from "@/pages/notes/NoteDetailPage";
import { NoteNotFoundPage } from "@/pages/notes/NoteNotFoundPage";
import { NotesPage } from "@/pages/notes/NotesPage";
import { MedrouterProjectPage } from "@/pages/projects/MedrouterProjectPage";
import { ProjectsPage } from "@/pages/projects/ProjectsPage";

function resolvePage(path: string): ReactElement {
  if (path === "/projects") {
    return <ProjectsPage />;
  }

  if (path === "/projects/medrouter") {
    return <MedrouterProjectPage />;
  }

  if (path === "/journey") {
    return <JourneyPage />;
  }

  if (path === "/notes") {
    return <NotesPage />;
  }

  if (path.startsWith("/notes/")) {
    const slug = path.slice("/notes/".length);
    const note = getArticleBySlug(slug);

    if (!note) {
      return <NoteNotFoundPage />;
    }

    return <NoteDetailPage note={note} />;
  }

  return <HomePage />;
}

export function App(): ReactElement {
  const { path } = useLocation();
  useLinkInterception();

  const prefersReducedMotion = useReducedMotion();
  const mainRef = useRef<HTMLDivElement>(null);

  // Focus main content on navigation for accessibility
  useEffect(() => {
    const timer = setTimeout(() => {
      const heading = mainRef.current?.querySelector("h1") || mainRef.current;
      if (heading && "focus" in heading) {
        heading.setAttribute("tabindex", "-1");
        heading.focus({ preventScroll: true });
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [path]);

  const page = resolvePage(path);

  return (
    <RootLayout>
      <LoadingProgress isLoading={false} />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={path}
          ref={mainRef}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0, y: -10 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="min-h-dvh"
        >
          {page}
        </motion.div>
      </AnimatePresence>
      <Footer content={footerContent} />
      <CommandPalette />
    </RootLayout>
  );
}
