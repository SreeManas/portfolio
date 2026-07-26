import { contactContent } from "@/content/contact";
import { projectsContent } from "@/content/projects";
import type { CommandPaletteContent } from "@/command-palette/types";

const contactLinks = new Map(
  contactContent.links.map((link) => [link.id, link] as const),
);

const email = contactLinks.get("email");
const github = contactLinks.get("github");
const linkedin = contactLinks.get("linkedin");
const resume = contactLinks.get("resume");
const medrouter = projectsContent.projects.find(
  (project) => project.slug === "medrouter",
);

export const commandPaletteContent = {
  title: "Command Palette",
  inputLabel: "Search commands",
  resultsLabel: "Command results",
  placeholder: "Search projects, notes, commands...",
  shortcutHint: {
    mac: "⌘K",
    default: "Ctrl+K",
  },
  emptyLabel: "Suggestions",
  noResultsTitle: "No commands found.",
  noResultsDescription: "Try a navigation item, project name, or quick action.",
  mobileTriggerLabel: "Command",
  categories: [
    { id: "navigation", label: "Navigation" },
    { id: "project", label: "Project" },
    { id: "action", label: "Actions" },
    { id: "external", label: "External" },
    { id: "theme", label: "Theme" },
  ],
  suggestionGroups: [
    {
      id: "recent",
      label: "Recent",
      commandIds: ["project-medrouter", "download-resume", "open-linkedin"],
    },
    {
      id: "quick-actions",
      label: "Quick Actions",
      commandIds: ["email", "open-github"],
    },
    {
      id: "navigation",
      label: "Navigation",
      commandIds: ["nav-about", "nav-projects", "nav-notes", "nav-journey"],
    },
  ],
  commands: [
    {
      id: "nav-home",
      title: "Home",
      category: "navigation",
      action: { type: "scroll", targetId: "hero" },
      keywords: ["home", "top", "start", "intro", "opening"],
    },
    {
      id: "nav-about",
      title: "About",
      category: "navigation",
      action: { type: "scroll", targetId: "about" },
      keywords: ["about", "profile", "person", "intro"],
    },
    {
      id: "nav-mission",
      title: "Mission",
      category: "navigation",
      action: { type: "scroll", targetId: "current-mission" },
      keywords: ["mission", "current mission", "problem"],
    },
    {
      id: "nav-thinking",
      title: "Thinking",
      category: "navigation",
      action: { type: "scroll", targetId: "engineering-principles" },
      keywords: ["thinking", "principles", "how i think", "engineering"],
    },
    {
      id: "nav-projects",
      title: "Projects",
      category: "navigation",
      action: { type: "scroll", targetId: "projects" },
      keywords: ["projects", "work", "featured projects"],
    },
    {
      id: "nav-skills",
      title: "Skills",
      category: "navigation",
      action: { type: "scroll", targetId: "skills" },
      keywords: ["skills", "toolkit", "tools", "stack"],
    },
    {
      id: "nav-notes",
      title: "Notes",
      category: "navigation",
      action: { type: "scroll", targetId: "journal" },
      keywords: ["notes", "journal", "writing", "learning"],
    },
    {
      id: "nav-journey",
      title: "Journey",
      category: "navigation",
      action: { type: "scroll", targetId: "journey" },
      keywords: ["journey", "timeline", "path"],
    },
    {
      id: "nav-contact",
      title: "Contact",
      category: "navigation",
      action: { type: "scroll", targetId: "contact" },
      keywords: ["contact", "reach", "connect"],
    },
    {
      id: "project-medrouter",
      title: medrouter?.title ?? "MEDROUTER",
      category: "project",
      action: { type: "scroll", targetId: "featured-project" },
      keywords: ["medrouter", "medical ai", "routing", "case study"],
    },
    {
      id: "project-bhagavadgeetha",
      title: "BhagavadGeetha.io",
      category: "project",
      action: { type: "disabled" },
      keywords: ["bhagavadgeetha", "bhagavadgeetha.io", "geetha"],
      disabled: true,
      disabledReason: "Placeholder",
    },
    {
      id: "project-nova",
      title: "NOVA",
      category: "project",
      action: { type: "disabled" },
      keywords: ["nova", "assistant", "agent"],
      disabled: true,
      disabledReason: "Placeholder",
    },
    {
      id: "download-resume",
      title: "Download Resume",
      category: "action",
      action: {
        type: "download",
        href: resume?.href ?? "/resume.pdf",
        filename: "Sree-Manas-Resume.pdf",
      },
      keywords: ["resume", "cv", "download resume", "download cv"],
    },
    {
      id: "email",
      title: "Email",
      category: "action",
      action: { type: "mailto", href: email?.href ?? "mailto:sree.manas@example.com" },
      keywords: ["mail", "email", "contact", "hire", "send mail"],
    },
    {
      id: "open-github",
      title: "GitHub",
      category: "external",
      action: { type: "open", href: github?.href ?? "https://github.com/SreeManas" },
      keywords: ["github", "git", "repo", "repositories", "source"],
    },
    {
      id: "open-linkedin",
      title: "LinkedIn",
      category: "external",
      action: { type: "open", href: linkedin?.href ?? "https://www.linkedin.com/" },
      keywords: ["linkedin", "li", "linkedin profile"],
    },
    {
      id: "copy-email",
      title: "Copy Email",
      category: "action",
      action: {
        type: "copy",
        value: (email?.href ?? "mailto:sree.manas@example.com").replace(
          /^mailto:/,
          "",
        ),
        successMessage: "Email copied.",
      },
      keywords: ["copy email", "email copy", "mail"],
    },
    {
      id: "copy-github",
      title: "Copy GitHub",
      category: "action",
      action: {
        type: "copy",
        value: github?.href ?? "https://github.com/SreeManas",
        successMessage: "GitHub copied.",
      },
      keywords: ["copy github", "github copy", "copy git"],
    },
    {
      id: "copy-linkedin",
      title: "Copy LinkedIn",
      category: "action",
      action: {
        type: "copy",
        value: linkedin?.href ?? "https://www.linkedin.com/",
        successMessage: "LinkedIn copied.",
      },
      keywords: ["copy linkedin", "linkedin copy", "copy li"],
    },
    {
      id: "theme-placeholder",
      title: "Theme Switching",
      category: "theme",
      action: { type: "disabled" },
      keywords: ["theme", "dark", "light", "toggle theme"],
      disabled: true,
      disabledReason: "Not available yet",
    },
  ],
} satisfies CommandPaletteContent;
