import type { FooterContent } from "@/components/layout/footerTypes";

export const footerContent = {
  copyright: "© 2026 K. Sree Manas",
  navigationLabel: "Navigation",
  navigation: [
    { id: "work", label: "Work", href: "/projects" },
    { id: "notes", label: "Notes", href: "/notes" },
    { id: "journey", label: "Journey", href: "/#journey" },
    { id: "contact", label: "Contact", href: "/#contact" },
  ],
  socialLabel: "Social",
  socialLinks: [
    { id: "github", label: "GitHub", href: "https://github.com/SreeManas" },
    { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/" },
  ],
  versionLabel: "Version",
  version: "0.2 structural",
  lastUpdatedLabel: "Last Updated",
  lastUpdated: "2026-07-26",
} satisfies FooterContent;
