import type { Technology } from "./types";
import { react } from "./instances/react";
import { typescript } from "./instances/typescript";
import { architecture, frontend, backend, performance } from "./instances/domains";

// Consolidated list of all registered technologies
const technologies: Technology[] = [
  react,
  typescript,
  architecture,
  frontend,
  backend,
  performance,
];

/**
 * Technology Repository
 * 
 * Provides an abstraction over the underlying technology metadata files.
 * This ensures the application remains decoupled from how we store this data
 * (e.g. if we move to a database, CMS, or different folder structure in the future).
 */

export function getAllTechnologies(): Technology[] {
  return [...technologies];
}

export function getTechnologyBySlug(slug: string): Technology | undefined {
  const normalizedSlug = slug.toLowerCase();
  return technologies.find(t => t.slug.toLowerCase() === normalizedSlug);
}

export function getTechnologyById(id: string): Technology | undefined {
  return technologies.find(t => t.id === id);
}
