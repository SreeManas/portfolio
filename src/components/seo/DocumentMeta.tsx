import { useEffect, type ReactElement } from "react";

interface DocumentMetaProps {
  title: string;
  description: string;
}

function upsertMeta(
  attribute: "name" | "property",
  key: string,
  content: string,
): void {
  const selector = `meta[${attribute}="${key}"]`;
  let element = document.head.querySelector<HTMLMetaElement>(selector);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.append(element);
  }

  element.content = content;
}

export function DocumentMeta({
  title,
  description,
}: DocumentMetaProps): ReactElement | null {
  useEffect(() => {
    document.title = title;
    upsertMeta("name", "description", description);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
  }, [description, title]);

  return null;
}
