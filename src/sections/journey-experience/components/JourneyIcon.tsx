import type { ReactElement, SVGProps } from "react";

import type { JourneyIconName } from "@/journey/types";
import { cn } from "@/lib/cn";

interface JourneyIconProps extends SVGProps<SVGSVGElement> {
  name: JourneyIconName;
}

const paths: Record<JourneyIconName, ReactElement> = {
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m14.5 9.5-2 5-5 2 2-5 5-2Z" />
    </>
  ),
  code: (
    <>
      <path d="m8 8-4 4 4 4" />
      <path d="m16 8 4 4-4 4" />
    </>
  ),
  people: (
    <>
      <circle cx="9" cy="8" r="3" />
      <circle cx="16" cy="9" r="2.5" />
      <path d="M4 18c0-2.5 2.2-4.5 5-4.5s5 2 5 4.5" />
      <path d="M14 18c0-1.7 1.3-3.2 3.2-3.5" />
    </>
  ),
  flag: (
    <>
      <path d="M6 21V4" />
      <path d="M6 4h10l-2 4 2 4H6" />
    </>
  ),
  award: (
    <>
      <circle cx="12" cy="9" r="5" />
      <path d="m9 13-1.5 7 4.5-2.5L16.5 20 15 13" />
    </>
  ),
  building: (
    <>
      <path d="M5 21V5l7-2 7 2v16" />
      <path d="M9 21v-6h6v6" />
      <path d="M9 9h.01M15 9h.01M9 13h.01M15 13h.01" />
    </>
  ),
  notes: (
    <>
      <path d="M7 3h8l4 4v14H7V3Z" />
      <path d="M15 3v4h4M9 11h6M9 15h6" />
    </>
  ),
  spark: (
    <>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
      <path d="m6 6 2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
    </>
  ),
  health: (
    <>
      <path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 11c0 5.5-7 10-7 10Z" />
    </>
  ),
  tools: (
    <>
      <path d="M14.5 4.5a4 4 0 0 0-5.5 5.5L4 15v5h5l5-5a4 4 0 0 0 5.5-5.5L16 13l-3-3 1.5-5.5Z" />
    </>
  ),
  research: (
    <>
      <circle cx="11" cy="11" r="6" />
      <path d="m20 20-4-4" />
    </>
  ),
  human: (
    <>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M6 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
    </>
  ),
};

export function JourneyIcon({
  name,
  className,
  ...props
}: JourneyIconProps): ReactElement {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("size-5 shrink-0", className)}
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
