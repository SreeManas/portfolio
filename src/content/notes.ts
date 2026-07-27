import type { EngineeringNote, NotesContent } from "@/notes/types";

export const notesContent = {
  title: "Engineering Notes",
  introduction:
    "A knowledge base for technical thinking, experiments, architectural decisions, and engineering insights — not a blog.",
  searchPlaceholder: "Search notes by title, tag, category, or summary",
  categories: [
    "AI",
    "React",
    "System Design",
    "Architecture",
    "Backend",
    "Learning",
    "Experiments",
    "Engineering",
  ],
  notes: [
    {
      id: "command-palette",
      slug: "building-a-spotlight-like-command-palette",
      title: "Building a Spotlight-like Command Palette",
      summary:
        "Notes on structuring a keyboard-first command surface: search ranking, action types, and keeping the UI calm under pressure.",
      category: "React",
      tags: ["Command Palette", "UX", "Keyboard"],
      readingTime: "6 min",
      date: "2026-07-22",
      featured: true,
      content: "Coming soon...",
    },
    {
      id: "medrouter-architecture",
      slug: "designing-medrouters-architecture",
      title: "Designing MEDROUTER's Architecture",
      summary:
        "How routing, capability signals, and explainability constraints shape the system boundaries for a medical decision aid.",
      category: "Architecture",
      tags: ["MEDROUTER", "System Design", "Medical AI"],
      readingTime: "8 min",
      date: "2026-07-18",
      featured: false,
      content: "Coming soon...",
    },
    {
      id: "hackathon-lessons",
      slug: "lessons-from-hackathons",
      title: "Lessons from Hackathons",
      summary:
        "What ships under time pressure, what breaks first, and which engineering habits survive after the demo ends.",
      category: "Learning",
      tags: ["Hackathons", "Product", "Process"],
      readingTime: "5 min",
      date: "2026-07-12",
      featured: false,
      content: "Coming soon...",
    },
    {
      id: "react-structure",
      slug: "how-i-structure-react-projects",
      title: "How I Structure React Projects",
      summary:
        "A working preference for separating content, sections, and presentation so the codebase stays readable as features grow.",
      category: "React",
      tags: ["React", "Architecture", "Frontend"],
      readingTime: "7 min",
      date: "2026-07-08",
      featured: false,
      content: "Coming soon...",
    },
    {
      id: "engineering-decisions",
      slug: "engineering-decisions",
      title: "Engineering Decisions",
      summary:
        "A short record of trade-offs I want to remember: when simplicity wins, when it doesn't, and how to leave a trail others can inspect.",
      category: "Engineering",
      tags: ["Decisions", "Trade-offs", "Documentation"],
      readingTime: "4 min",
      date: "2026-07-04",
      featured: false,
      content: "Coming soon...",
    },
  ],
} satisfies NotesContent;

export function getNoteBySlug(slug: string): EngineeringNote | undefined {
  return notesContent.notes.find((note) => note.slug === slug);
}

export function getNotePath(slug: string): string {
  return `/notes/${slug}`;
}
