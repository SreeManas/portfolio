import type { SkillsContent } from "@/sections/skills/types";

export const skillsContent = {
  id: "skills",
  label: "SKILLS & TOOLKIT",
  title: "Tools I use to turn uncertain ideas into working systems.",
  introduction:
    "Version 0.1 toolkit map. This will become a clearer record of the languages, frameworks, and systems I use most often.",
  groups: [
    {
      id: "languages",
      title: "Languages",
      skills: [
        { id: "typescript", label: "TypeScript" },
        { id: "javascript", label: "JavaScript" },
        { id: "python", label: "Python" },
        { id: "java", label: "Java" },
      ],
    },
    {
      id: "frontend",
      title: "Frontend",
      skills: [
        { id: "react", label: "React" },
        { id: "tailwind-css", label: "Tailwind CSS" },
        { id: "vite", label: "Vite" },
        { id: "framer-motion", label: "Framer Motion" },
      ],
    },
    {
      id: "backend",
      title: "Backend",
      skills: [
        { id: "node-js", label: "Node.js" },
        { id: "express", label: "Express" },
        { id: "api-design", label: "API Design" },
        { id: "auth-flows", label: "Auth Flows" },
      ],
    },
    {
      id: "ai-ml",
      title: "AI / ML",
      skills: [
        { id: "llms", label: "LLMs" },
        { id: "prompt-systems", label: "Prompt Systems" },
        { id: "evaluation", label: "Evaluation" },
        { id: "decision-support", label: "Decision Support" },
      ],
    },
    {
      id: "databases",
      title: "Databases",
      skills: [
        { id: "firebase", label: "Firebase" },
        { id: "postgresql", label: "PostgreSQL" },
        { id: "mongodb", label: "MongoDB" },
        { id: "data-modeling", label: "Data Modeling" },
      ],
    },
    {
      id: "cloud",
      title: "Cloud",
      skills: [
        { id: "vercel", label: "Vercel" },
        { id: "firebase-hosting", label: "Firebase Hosting" },
        { id: "deployment-workflows", label: "Deployment Workflows" },
      ],
    },
    {
      id: "tools",
      title: "Tools",
      skills: [
        { id: "git", label: "Git" },
        { id: "github", label: "GitHub" },
        { id: "figma", label: "Figma" },
        { id: "postman", label: "Postman" },
      ],
    },
    {
      id: "currently-exploring",
      title: "Currently Exploring",
      skills: [
        { id: "agentic-systems", label: "Agentic Systems" },
        { id: "routing-evaluation", label: "Routing Evaluation" },
        { id: "human-ai-collaboration", label: "Human-AI Collaboration" },
      ],
    },
  ],
} satisfies SkillsContent;
