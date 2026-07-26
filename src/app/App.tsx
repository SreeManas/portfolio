import type { ReactElement } from "react";

import { CommandPalette } from "@/command-palette/CommandPalette";
import { Footer } from "@/components/layout/Footer";
import { footerContent } from "@/content/footer";
import { RootLayout } from "@/app/RootLayout";
import { HomePage } from "@/pages/HomePage";
import { MedrouterProjectPage } from "@/pages/projects/MedrouterProjectPage";
import { ProjectsPage } from "@/pages/projects/ProjectsPage";

export function App(): ReactElement {
  const path = window.location.pathname.replace(/\/$/, "") || "/";
  const page =
    path === "/projects" ? (
      <ProjectsPage />
    ) : path === "/projects/medrouter" ? (
      <MedrouterProjectPage />
    ) : (
      <main
        id="main-content"
        aria-label="Portfolio content"
        className="min-h-dvh"
      >
        <HomePage />
      </main>
    );

  return (
    <RootLayout>
      {page}
      <Footer content={footerContent} />
      <CommandPalette />
    </RootLayout>
  );
}
