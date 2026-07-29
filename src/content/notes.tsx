import type { EngineeringArticle, PlatformConfiguration } from "@/notes/types";
import { ProseH2, ProseH3, ProseP, ProseCode, ProseCallout, ProseUl, ProseLi } from "@/sections/platform/components/Prose";
import { ProseImage } from "@/sections/platform/components/ProseImage";

export const platformConfig: PlatformConfiguration = {
  title: "Engineering Knowledge Hub",
  introduction:
    "A structured record of engineering decisions, technical experiments, architectural patterns, and systemic learning. This platform exists to make implicit knowledge explicit, turning temporary discoveries into reusable artifacts.",
  searchPlaceholder: "Search articles, categories, or keywords...",
  categories: [
    "AI",
    "Machine Learning",
    "React",
    "TypeScript",
    "Architecture",
    "Backend",
    "Frontend",
    "System Design",
    "Infrastructure",
    "Performance",
  ],
  popularTags: ["routing", "design-system", "LLMs", "state-management", "optimization"],
  author: {
    name: "SreeManas",
    role: "Software Engineer",
    biography: "Building decision-intelligence systems and scalable engineering platforms.",
    links: {
      github: "https://github.com/SreeManas",
      linkedin: "https://linkedin.com/in/sreemanas",
    },
  },
};

export const platformArticles: EngineeringArticle[] = [
  {
    id: "routing-architecture",
    slug: "lightweight-spa-routing",
    title: "Building a Lightweight SPA Router without Framework Lock-in",
    subtitle: "A deep dive into custom React routing and popstate management.",
    summary:
      "Why we chose to build a minimal SPA router for the portfolio instead of adopting heavy frameworks like Next.js or React Router.",
    excerpt: "Complex applications require complex routers, but what about simple portfolios?",
    date: "2026-07-15",
    lastUpdated: "2026-07-20",
    status: "published",
    category: "Architecture",
    tags: ["react", "routing", "spa", "performance"],
    readingTime: "5 min read",
    difficulty: "intermediate",
    featured: true,
    pinned: true,
    coverVariant: "default",
    seoDescription: "Learn how to build a custom lightweight SPA router in React using popstate.",
    keywords: ["react router", "spa router", "custom routing", "popstate"],
    relatedTechnologies: ["React", "TypeScript", "Browser History API"],
    content: (
      <>
        <ProseP>
          When building a modern portfolio, the first instinct is often to reach for a heavy framework like Next.js or Remix. While these tools are incredibly powerful for large-scale applications, they introduce unnecessary complexity for a static engineering portfolio.
        </ProseP>
        
        <ProseH2>The Problem with Heavy Frameworks</ProseH2>
        
        <ProseP>
          Adopting a framework means adopting its entire ecosystem, build pipeline, and routing paradigm. For a portfolio that primarily serves static content with some interactive components, this is often overkill. We wanted to maintain full control over the build process, keep dependencies to an absolute minimum, and ensure lightning-fast page transitions without the overhead of hydration for every page.
        </ProseP>

        <ProseCallout title="Design Philosophy" variant="tip">
          The goal was to build the absolute minimum viable router required to support SPA navigation, scroll restoration, and deep linking, without inventing a new framework.
        </ProseCallout>

        <ProseH2>Building a Custom Router</ProseH2>

        <ProseP>
          Instead of relying on <code>react-router-dom</code>, we built a lightweight routing utility around the native Browser History API. This approach allows us to intercept link clicks and manage state directly.
        </ProseP>

        <ProseCode language="typescript">
{`export function navigate(url: string, replace = false) {
  if (replace) {
    window.history.replaceState(null, "", url);
  } else {
    window.history.pushState(null, "", url);
  }
  // Dispatch custom event to notify React
  window.dispatchEvent(new Event("pushstate"));
}`}
        </ProseCode>

        <ProseH3>Handling Popstate</ProseH3>

        <ProseP>
          The core of the router listens to <code>popstate</code> and custom <code>pushstate</code> events. When the URL changes, we resolve the path to a React component and render it. Scroll restoration is handled manually to ensure smooth transitions between articles.
        </ProseP>

        <ProseImage 
          src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop" 
          alt="Code on a screen"
          caption="Our lightweight router in action."
        />

        <ProseH2>Lessons Learned</ProseH2>

        <ProseP>
          Building a custom router forced us to deeply understand how the browser history API works. It also highlighted the importance of handling edge cases like hash navigation and scroll persistence.
        </ProseP>

        <ProseUl>
          <ProseLi>Keep it simple: Don't over-engineer solutions for simple problems.</ProseLi>
          <ProseLi>Native APIs are powerful: The Browser History API provides everything needed for basic SPA routing.</ProseLi>
          <ProseLi>Performance matters: Removing heavy dependencies resulted in a significantly faster time-to-interactive.</ProseLi>
        </ProseUl>
      </>
    ),
  },
  {
    id: "design-system",
    slug: "design-system-unification",
    title: "Design System Unification: Lessons from a Component Library",
    subtitle: "Scaling UI consistency across dozens of interactive documentation components.",
    summary:
      "A look into the architectural decisions that drove the design system unification pass across our project framework.",
    date: "2026-07-28",
    status: "published",
    category: "Frontend",
    tags: ["design-system", "css", "tailwind", "ui"],
    readingTime: "8 min read",
    difficulty: "advanced",
    featured: false,
    content: "Content placeholder for FP9B.",
  },
  {
    id: "ai-decision-support",
    slug: "ai-decision-support-systems",
    title: "Designing AI Decision Support Systems",
    summary:
      "Exploring how to keep AI inputs inspectable and maintain human agency in critical routing decisions.",
    date: "2026-07-10",
    status: "published",
    category: "AI",
    tags: ["ai", "healthcare", "decision-intelligence"],
    readingTime: "12 min read",
    difficulty: "advanced",
    series: {
      id: "building-medrouter",
      name: "Building MEDROUTER",
      order: 1,
    },
    content: "Content placeholder for FP9B.",
  },
  {
    id: "draft-article",
    slug: "future-of-react-server-components",
    title: "The Future of React Server Components",
    summary: "Early thoughts on RSCs and their place in medium-scale engineering projects.",
    date: "2026-08-01",
    status: "draft",
    category: "React",
    tags: ["react", "rsc", "backend"],
    readingTime: "4 min read",
    content: "Content placeholder for FP9B.",
  }
];

export function getArticleBySlug(slug: string): EngineeringArticle | undefined {
  return platformArticles.find((article) => article.slug === slug && article.status !== "draft");
}

export function getAllPublishedArticles(): EngineeringArticle[] {
  return platformArticles.filter(article => article.status === "published");
}
