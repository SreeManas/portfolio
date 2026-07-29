export interface Technology {
  id: string;
  name: string;
  slug: string;
  description: string;
  role: string;
  category: string;
  website?: string;
  relatedTechnologies: string[];
}
