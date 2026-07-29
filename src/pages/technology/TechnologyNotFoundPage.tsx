import type { ReactElement } from "react";
import { Container } from "@/components/layout/Container";
import { BackLink } from "@/components/ui/BackLink";
import { EmptyState } from "@/components/knowledge/EmptyState";

export function TechnologyNotFoundPage(): ReactElement {
  return (
    <main className="min-h-dvh bg-canvas flex flex-col pt-32 pb-16">
      <Container size="narrow">
        <BackLink href="/notes">Back to Platform</BackLink>
        <div className="mt-20">
          <EmptyState 
            title="Technology Not Found"
            message="This technology may not be registered in the knowledge platform yet."
            actionHref="/notes"
            actionLabel="Return to Engineering Platform →"
          />
        </div>
      </Container>
    </main>
  );
}
