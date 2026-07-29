export type ArticleStatus = "draft" | "published" | "archived";
export type ArticleDifficulty = "beginner" | "intermediate" | "advanced";

export type NoteCategory =
  | "AI"
  | "Machine Learning"
  | "React"
  | "TypeScript"
  | "Architecture"
  | "Backend"
  | "Frontend"
  | "Firebase"
  | "Infrastructure"
  | "Performance"
  | "System Design"
  | "Research"
  | "Developer Experience"
  | "Career"
  | "Hackathons"
  | "Engineering"
  | "Learning"
  | "Experiments";

export interface ArticleSeries {
  id: string;
  name: string;
  description?: string;
  order: number;
}

export interface ArticleLink {
  label: string;
  url: string;
}

export interface ArticleMetadata {
  // Core
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  summary: string;
  excerpt?: string;
  
  // Dates & Status
  date: string; // Publication Date
  lastUpdated?: string;
  status: ArticleStatus;
  
  // Classification
  category: NoteCategory;
  tags: readonly string[];
  readingTime: string;
  difficulty?: ArticleDifficulty;
  
  // Organization
  series?: ArticleSeries;
  featured?: boolean;
  pinned?: boolean;
  
  // Media & SEO
  heroImage?: string;
  coverVariant?: "default" | "large" | "minimal";
  seoDescription?: string;
  keywords?: readonly string[];
  
  // Relations
  relatedTechnologies?: readonly string[];
  relatedProjects?: readonly string[];
  externalLinks?: readonly ArticleLink[];
}

import type { ReactNode } from "react";

// Data model for the Article itself (combining metadata and content)
export interface EngineeringArticle extends ArticleMetadata {
  content: ReactNode; // Supports rich content components
}

export interface AuthorProfile {
  name: string;
  role: string;
  biography: string;
  avatarUrl?: string;
  links: {
    github?: string;
    linkedin?: string;
    portfolio?: string;
    twitter?: string;
  };
}

export interface PlatformConfiguration {
  title: string;
  introduction: string;
  searchPlaceholder: string;
  categories: readonly NoteCategory[];
  popularTags: readonly string[];
  author: AuthorProfile;
}
