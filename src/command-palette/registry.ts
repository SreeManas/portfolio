import { aboutContent } from "@/content/about";
import { contactContent } from "@/content/contact";
import { currentMissionContent } from "@/content/currentMission";
import { engineeringPrinciplesContent } from "@/content/engineeringPrinciples";
import { journalContent } from "@/content/journal";
import { journeyContent } from "@/content/journey";
import { journeyExperienceContent } from "@/content/journeyExperience";
import { platformArticles, platformConfig } from "@/content/notes";
import { projectsContent } from "@/content/projects";
import { skillsContent } from "@/content/skills";
import type {
  CommandDefinition,
  CommandRegistry,
} from "@/command-palette/types";

const contactLinks = new Map(
  contactContent.links.map((link) => [link.id, link] as const),
);

const email = contactLinks.get("email");
const github = contactLinks.get("github");
const linkedin = contactLinks.get("linkedin");
const resume = contactLinks.get("resume");

const emailAddress = (email?.href ?? "mailto:sree.manas@example.com").replace(
  /^mailto:/,
  "",
);
const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(emailAddress)}`;

const navigationCommands: readonly CommandDefinition[] = [
  {
    id: "nav-go-home",
    title: "Go Home",
    description: "Navigate to home page",
    category: "navigation",
    action: { type: "navigate", href: "/" },
    keywords: ["home", "go home", "start", "landing"],
    aliases: ["go home", "home"],
    indicator: "↵",
    priority: 88,
  },
  {
    id: "nav-go-projects",
    title: "Go Projects",
    description: "Navigate to projects page",
    category: "navigation",
    action: { type: "navigate", href: "/projects" },
    keywords: ["projects", "go projects", "work"],
    aliases: ["go projects", "projects"],
    indicator: "↵",
    priority: 86,
  },
  {
    id: "nav-go-journey",
    title: "Go Journey",
    description: "Navigate to journey page",
    category: "navigation",
    action: { type: "navigate", href: "/journey" },
    keywords: ["journey", "go journey", "timeline"],
    aliases: ["go journey", "journey"],
    indicator: "↵",
    priority: 84,
  },
  {
    id: "nav-go-notes",
    title: "Go Notes",
    description: "Navigate to engineering notes",
    category: "navigation",
    action: { type: "navigate", href: "/notes" },
    keywords: ["notes", "go notes", "writing"],
    aliases: ["go notes", "notes"],
    indicator: "↵",
    priority: 84,
  },
  {
    id: "nav-scroll-top",
    title: "Scroll Top",
    description: "Scroll to top of current page",
    category: "navigation",
    action: { type: "scroll-top" },
    keywords: ["scroll top", "top", "up"],
    aliases: ["scroll top", "top"],
    indicator: "↑",
    priority: 70,
  },
  {
    id: "nav-scroll-bottom",
    title: "Scroll Bottom",
    description: "Scroll to bottom of current page",
    category: "navigation",
    action: { type: "scroll-bottom" },
    keywords: ["scroll bottom", "bottom", "down", "footer"],
    aliases: ["scroll bottom", "bottom"],
    indicator: "↓",
    priority: 68,
  },
  {
    id: "nav-back",
    title: "Back",
    description: "Go back to previous page",
    category: "navigation",
    action: { type: "go-back" },
    keywords: ["back", "history back", "previous"],
    aliases: ["back", "previous"],
    indicator: "←",
    priority: 75,
  },
  {
    id: "nav-forward",
    title: "Forward",
    description: "Go forward to next page",
    category: "navigation",
    action: { type: "go-forward" },
    keywords: ["forward", "history forward", "next"],
    aliases: ["forward", "next"],
    indicator: "→",
    priority: 65,
  },
  {
    id: "nav-home",
    title: "Home Section",
    description: "Scroll to the opening section",
    category: "navigation",
    action: { type: "scroll", targetId: "hero" },
    keywords: ["home", "top", "start", "intro", "opening"],
    aliases: ["home", "top", "start"],
    indicator: "↵",
    priority: 72,
  },
  {
    id: "nav-about",
    title: "About",
    description: "Learn more about me",
    category: "navigation",
    action: { type: "scroll", targetId: aboutContent.id },
    keywords: [
      aboutContent.title,
      aboutContent.introduction,
      aboutContent.narrative,
      aboutContent.profile.education.value,
      aboutContent.profile.location.value,
      ...aboutContent.profile.interests,
      ...aboutContent.highlights.map((highlight) => highlight.label),
      "college",
      "education",
      "hyderabad",
      "it",
    ],
    aliases: ["about", "me", "bio", "profile", "college", "education"],
    indicator: "↵",
    priority: 80,
  },
  {
    id: "nav-mission",
    title: "Mission",
    description: "Read the current engineering mission",
    category: "navigation",
    action: { type: "scroll", targetId: currentMissionContent.id },
    keywords: [
      currentMissionContent.statement,
      ...currentMissionContent.paragraphs,
      ...currentMissionContent.exploring,
    ],
    aliases: ["mission", "problem", "current mission"],
    indicator: "↵",
    priority: 76,
  },
  {
    id: "nav-thinking",
    title: "Thinking",
    description: "Explore engineering principles",
    category: "navigation",
    action: { type: "scroll", targetId: engineeringPrinciplesContent.id },
    keywords: [
      engineeringPrinciplesContent.title,
      engineeringPrinciplesContent.introduction,
      ...engineeringPrinciplesContent.principles.flatMap((principle) => [
        principle.title,
        principle.description,
      ]),
    ],
    aliases: ["thinking", "principles", "how i think", "engineering"],
    indicator: "↵",
    priority: 74,
  },
  {
    id: "nav-projects",
    title: "Projects",
    description: "Browse engineering projects",
    category: "navigation",
    action: { type: "scroll", targetId: projectsContent.id },
    keywords: [
      projectsContent.title,
      projectsContent.introduction,
      ...projectsContent.projects.map((project) => project.title),
    ],
    aliases: ["projects", "portfolio", "work", "case studies"],
    indicator: "↵",
    priority: 82,
  },
  {
    id: "nav-skills",
    title: "Skills",
    description: "Technical stack",
    category: "navigation",
    action: { type: "scroll", targetId: skillsContent.id },
    keywords: [
      skillsContent.title,
      skillsContent.introduction,
      ...skillsContent.groups.flatMap((group) => [
        group.title,
        ...group.skills.map((skill) => skill.label),
      ]),
    ],
    aliases: ["skills", "stack", "tech", "technologies", "toolkit"],
    indicator: "↵",
    priority: 78,
  },
  {
    id: "nav-notes",
    title: "Notes",
    description: "Engineering knowledge hub",
    category: "navigation",
    action: { type: "navigate", href: "/notes" },
    keywords: [
      platformConfig.title,
      platformConfig.introduction,
      journalContent.title,
      journalContent.introduction,
      ...platformArticles.flatMap((note) => [
        note.title,
        note.summary,
        note.category,
        ...note.tags,
      ]),
      ...journalContent.entries.flatMap((entry) => [
        entry.title,
        entry.note,
        entry.category,
        ...(entry.tags ?? []),
      ]),
    ],
    aliases: ["notes", "blog", "writing", "journal", "notebook", "knowledge"],
    indicator: "↵",
    priority: 78,
  },
  {
    id: "nav-journey",
    title: "Journey",
    description: "Engineering journey experience",
    category: "navigation",
    action: { type: "navigate", href: "/journey" },
    keywords: [
      journeyContent.title,
      journeyContent.introduction,
      journeyExperienceContent.hero.title,
      journeyExperienceContent.hero.description,
      ...journeyExperienceContent.timeline.items.flatMap((item) => [
        item.year,
        item.title,
        item.summary,
        item.category,
      ]),
      "hackathon",
      "hya",
      "leadership",
      "medrouter",
    ],
    aliases: ["journey", "timeline", "career", "path"],
    indicator: "↵",
    priority: 76,
  },
  {
    id: "nav-contact",
    title: "Contact",
    description: "Ways to reach me",
    category: "navigation",
    action: { type: "scroll", targetId: contactContent.id },
    keywords: [
      contactContent.title,
      contactContent.introduction,
      ...contactContent.links.flatMap((link) => [link.label, link.href]),
    ],
    aliases: ["contact", "reach", "connect"],
    indicator: "↵",
    priority: 74,
  },
];

const projectCommands: readonly CommandDefinition[] = projectsContent.projects.map(
  (project) => ({
    id: `project-${project.slug}`,
    title: project.title,
    description: project.featured
      ? "Featured healthcare AI project"
      : "Future project case study",
    category: "project",
    action: {
      type: "scroll",
      targetId: project.featured ? "featured-project" : projectsContent.id,
    },
    keywords: [
      project.title,
      project.tagline,
      project.category,
      project.status,
      project.year,
      ...(project.technologies || []),
    ],
    aliases: [
      project.slug,
      project.title.toLowerCase(),
      project.category.toLowerCase(),
      ...(project.technologies || []).map((technology: string) => technology.toLowerCase()),
    ],
    indicator: "↵",
    priority: project.featured ? 92 : 66,
  }),
);

const skillCommands: readonly CommandDefinition[] = skillsContent.groups.flatMap(
  (group) =>
    group.skills.map((skill) => ({
      id: `skill-${skill.id}`,
      title: skill.label,
      description: `${group.title} skill`,
      category: "skill",
      action: { type: "scroll", targetId: skillsContent.id },
      keywords: [
        skill.label,
        group.title,
        skillsContent.title,
        "skills",
        "stack",
        "tech",
        "technologies",
      ],
      aliases: [skill.label.toLowerCase(), group.title.toLowerCase()],
      indicator: "↵",
      priority: 58,
    })),
);

const noteCommands: readonly CommandDefinition[] = platformArticles.map(
  (note) => ({
    id: `note-${note.id}`,
    title: note.title,
    description: note.summary,
    category: "note",
    action: { type: "navigate", href: `/notes/${note.slug}` },
    keywords: [
      note.title,
      note.summary,
      note.category,
      note.date,
      ...note.tags,
    ],
    aliases: [
      note.slug,
      note.title.toLowerCase(),
      note.category.toLowerCase(),
    ],
    indicator: "↵",
    priority: note.featured ? 70 : 52,
  }),
);

const journeyCommands: readonly CommandDefinition[] =
  journeyExperienceContent.timeline.items.map((item) => ({
    id: `journey-${item.id}`,
    title: item.title,
    description: item.summary,
    category: "journey",
    action: { type: "navigate", href: "/journey" },
    keywords: [
      item.year,
      item.title,
      item.summary,
      item.details,
      item.category,
    ],
    aliases: [item.title.toLowerCase(), item.category.toLowerCase()],
    indicator: "↵",
    priority: 54,
  }));

const actionCommands: readonly CommandDefinition[] = [
  {
    id: "action-download-resume",
    title: "Download Resume",
    description: "Download latest PDF resume",
    category: "action",
    action: {
      type: "download",
      href: resume?.href ?? "/resume.pdf",
      filename: "Sree-Manas-Resume.pdf",
    },
    keywords: ["resume", "cv", "download resume", "download cv"],
    aliases: ["resume", "cv", "download cv", "curriculum vitae"],
    indicator: "↓",
    priority: 94,
  },
  {
    id: "action-email",
    title: "Email",
    description: "Compose a new email",
    category: "action",
    action: {
      type: "open",
      href: gmailComposeUrl,
    },
    keywords: ["mail", "email", "contact", "hire", "send mail"],
    aliases: ["mail", "email", "contact", "hire", "send mail"],
    indicator: "✉",
    priority: 90,
  },
  {
    id: "action-copy-email",
    title: "Copy Email",
    description: "Copy email address",
    category: "action",
    action: {
      type: "copy",
      value: emailAddress,
      successMessage: "Email copied.",
    },
    keywords: ["copy email", "email copy", "mail"],
    aliases: ["copy email", "email", "mail"],
    indicator: "⧉",
    priority: 84,
  },
  {
    id: "action-copy-github",
    title: "Copy GitHub",
    description: "Copy GitHub profile URL",
    category: "action",
    action: {
      type: "copy",
      value: github?.href ?? "https://github.com/SreeManas",
      successMessage: "GitHub copied.",
    },
    keywords: ["copy github", "github copy", "copy git"],
    aliases: ["copy github", "github", "git"],
    indicator: "⧉",
    priority: 82,
  },
  {
    id: "action-copy-linkedin",
    title: "Copy LinkedIn",
    description: "Copy LinkedIn profile URL",
    category: "action",
    action: {
      type: "copy",
      value: linkedin?.href ?? "https://www.linkedin.com/",
      successMessage: "LinkedIn copied.",
    },
    keywords: ["copy linkedin", "linkedin copy", "copy li"],
    aliases: ["copy linkedin", "linkedin", "li"],
    indicator: "⧉",
    priority: 82,
  },
  {
    id: "action-copy-portfolio-url",
    title: "Copy Portfolio URL",
    description: "Copy this portfolio URL",
    category: "action",
    action: {
      type: "copy-current-url",
      successMessage: "Portfolio URL copied.",
    },
    keywords: ["copy portfolio url", "copy site", "copy website"],
    aliases: ["copy portfolio url", "portfolio url", "website"],
    indicator: "⧉",
    priority: 72,
  },
  {
    id: "action-copy-resume-link",
    title: "Copy Resume Link",
    description: "Copy resume PDF link",
    category: "action",
    action: {
      type: "copy-url",
      href: resume?.href ?? "/resume.pdf",
      successMessage: "Resume link copied.",
    },
    keywords: ["copy resume link", "copy cv link", "resume url"],
    aliases: ["copy resume link", "resume link", "cv link"],
    indicator: "⧉",
    priority: 72,
  },
  {
    id: "action-clear-recent",
    title: "Clear Recent",
    description: "Remove recent command history",
    category: "action",
    action: {
      type: "clear-recent",
      successMessage: "Recent commands cleared.",
    },
    keywords: ["clear recent", "recent history", "remove recent"],
    aliases: ["clear recent", "recent history"],
    indicator: "↺",
    priority: 50,
    personalizable: false,
  },
  {
    id: "action-clear-most-used",
    title: "Clear Most Used",
    description: "Remove command usage counts",
    category: "action",
    action: {
      type: "clear-most-used",
      successMessage: "Most used commands cleared.",
    },
    keywords: ["clear most used", "clear usage", "usage history"],
    aliases: ["clear usage", "clear most used", "most used"],
    indicator: "↺",
    priority: 50,
    personalizable: false,
  },
  {
    id: "action-reset-command-palette",
    title: "Reset Command Palette",
    description: "Clear pinned, recent, and usage history",
    category: "action",
    action: {
      type: "reset-personalization",
      successMessage: "Command palette reset.",
    },
    keywords: ["reset command palette", "clear all", "reset history"],
    aliases: ["reset palette", "reset command palette", "clear all"],
    indicator: "↺",
    priority: 52,
    personalizable: false,
  },
];

const externalCommands: readonly CommandDefinition[] = [
  {
    id: "external-github",
    title: "GitHub",
    description: "Open source repositories",
    category: "external",
    action: {
      type: "open",
      href: github?.href ?? "https://github.com/SreeManas",
    },
    keywords: ["github", "git", "repo", "repositories", "source"],
    aliases: ["github", "repo", "repositories", "git", "source"],
    indicator: "↗",
    priority: 180,
  },
  {
    id: "external-linkedin",
    title: "LinkedIn",
    description: "Professional profile",
    category: "external",
    action: {
      type: "open",
      href: linkedin?.href ?? "https://www.linkedin.com/",
    },
    keywords: ["linkedin", "li", "linkedin profile"],
    aliases: ["linkedin", "li", "professional profile", "profile"],
    indicator: "↗",
    priority: 90,
  },
];

const futureCommands: readonly CommandDefinition[] = [
  {
    id: "future-theme",
    title: "Theme Switching",
    description: "Theme architecture placeholder",
    category: "future-ai",
    action: { type: "disabled" },
    keywords: ["theme", "dark", "light", "toggle theme"],
    aliases: ["theme", "dark", "light"],
    indicator: "Soon",
    disabled: true,
    disabledReason: "Not available yet",
    priority: 20,
  },
];

const commands = [
  ...navigationCommands,
  ...projectCommands,
  ...skillCommands,
  ...noteCommands,
  ...journeyCommands,
  ...actionCommands,
  ...externalCommands,
  ...futureCommands,
] satisfies readonly CommandDefinition[];

export const commandRegistry = {
  commands,
  commandById: new Map(commands.map((command) => [command.id, command])),
} satisfies CommandRegistry;
