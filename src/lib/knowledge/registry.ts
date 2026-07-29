import { store } from "./store/memoryStore";
import { platformArticles } from "@/content/notes";
import { medrouterProject } from "@/content/projects/medrouter";
import { getAllTechnologies } from "@/content/technologies";
import { articleToKnowledgeEntity } from "./adapters/articleAdapter";
import { projectToKnowledgeEntity } from "./adapters/projectAdapter";
import { technologyToKnowledgeEntity } from "./adapters/technologyAdapter";

let isRegistered = false;

export function initializeKnowledgeRegistry() {
  if (isRegistered) return;

  // Adapt and register all articles
  const articleEntities = platformArticles.map(articleToKnowledgeEntity);
  store.register(articleEntities);

  // Adapt and register all projects
  const projectEntities = [projectToKnowledgeEntity(medrouterProject)];
  store.register(projectEntities);

  // Adapt and register all technologies
  const technologyEntities = getAllTechnologies().map(technologyToKnowledgeEntity);
  store.register(technologyEntities);

  isRegistered = true;
}
