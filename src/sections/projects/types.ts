export interface ProjectLink {
  label: string;
  href: string;
}

export interface ProjectRecord {
  title: string;
  shortDescription: string;
  category: string;
  status: string;
  year: string;
  technologies: readonly string[];
  featured: boolean;
  slug: string;
  thumbnail?: string;
  links?: readonly ProjectLink[];
}

export interface ProjectsContent {
  id: string;
  label: string;
  title: string;
  introduction: string;
  metadataLabels: {
    status: string;
    category: string;
    year: string;
  };
  projects: readonly ProjectRecord[];
}

