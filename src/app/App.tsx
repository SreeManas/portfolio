import type { ReactElement } from "react";

import { CommandPalette } from "@/command-palette/CommandPalette";
import { Footer } from "@/components/layout/Footer";
import { footerContent } from "@/content/footer";
import { getNoteBySlug } from "@/content/notes";
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
    const note = getNoteBySlug(slug);

    if (!note) {
      return <NoteNotFoundPage />;
    }

    return <NoteDetailPage note={note} />;
  }

  return (
    <main
      id="main-content"
      aria-label="Portfolio content"
      className="min-h-dvh"
    >
      <HomePage />
    </main>
  );
}

export function App(): ReactElement {
  const path = window.location.pathname.replace(/\/$/, "") || "/";
  const page = resolvePage(path);

  return (
    <RootLayout>
      {page}
      <Footer content={footerContent} />
      <CommandPalette />
    </RootLayout>
  );
}
