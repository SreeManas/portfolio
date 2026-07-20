import type { PropsWithChildren, ReactElement } from "react";

import { PageShell } from "@/components/layout/PageShell";
import { DocumentMeta } from "@/components/seo/DocumentMeta";
import { siteConfig } from "@/config/site";

export function RootLayout({ children }: PropsWithChildren): ReactElement {
  return (
    <>
      <DocumentMeta
        title={siteConfig.title}
        description={siteConfig.description}
      />
      <PageShell>{children}</PageShell>
    </>
  );
}

