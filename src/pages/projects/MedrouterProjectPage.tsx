import type { ReactElement } from "react";
import { CaseStudyLayout } from "@/components/project/CaseStudyLayout";
import { medrouterProject } from "@/content/projects/medrouter";

export function MedrouterProjectPage(): ReactElement {
  return <CaseStudyLayout project={medrouterProject} />;
}
