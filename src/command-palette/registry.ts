import { aboutContent } from "@/content/about";
import { contactContent } from "@/content/contact";
import { currentMissionContent } from "@/content/currentMission";
import { engineeringPrinciplesContent } from "@/content/engineeringPrinciples";
import { journalContent } from "@/content/journal";
import { journeyContent } from "@/content/journey";
import { getNotePath, notesContent } from "@/content/notes";
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
    id: "nav-home",
    title: "Home",
    description: "Return to the opening section",
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
      notesContent.title,
      notesContent.introduction,
      journalContent.title,
      journalContent.introduction,
      ...notesContent.notes.flatMap((note) => [
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
    description: "Career timeline",
    category: "navigation",
    action: { type: "scroll", targetId: journeyContent.id },
    keywords: [
      journeyContent.title,
      journeyContent.introduction,
      ...journeyContent.milestones.flatMap((milestone) => [
        milestone.year,
        milestone.title,
        milestone.description,
      ]),
      "hackathon",
      "hya",
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
      targetId: project.featured ? project.display.sectionId : projectsContent.id,
    },
    keywords: [
      project.title,
      project.tagline,
      project.category,
      project.status,
      project.year,
      project.overview.title,
      project.overview.body,
      project.problem.title,
      project.problem.body,
      project.solution.title,
      project.solution.body,
      ...project.technologies,
    ],
    aliases: [
      project.slug,
      project.title.toLowerCase(),
      project.category.toLowerCase(),
      ...project.technologies.map((technology) => technology.toLowerCase()),
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

const noteCommands: readonly CommandDefinition[] = notesContent.notes.map(
  (note) => ({
    id: `note-${note.id}`,
    title: note.title,
    description: note.summary,
    category: "note",
    action: { type: "navigate", href: getNotePath(note.slug) },
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

const journeyAliasesById: Record<string, readonly string[]> = {
  "student-leadership": ["hya", "hyderabad youth assembly", "leadership"],
  "product-experiments": ["hackathon", "prototype", "podpreneur"],
};

const journeyCommands: readonly CommandDefinition[] =
  journeyContent.milestones.map((milestone) => ({
    id: `journey-${milestone.id}`,
    title: milestone.title,
    description: milestone.description,
    category: "journey",
    action: { type: "scroll", targetId: journeyContent.id },
    keywords: [
      milestone.year,
      milestone.title,
      milestone.description,
      ...(journeyAliasesById[milestone.id] ?? []),
    ],
    aliases: [
      milestone.year,
      milestone.title.toLowerCase(),
      ...(journeyAliasesById[milestone.id] ?? []),
    ],
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
