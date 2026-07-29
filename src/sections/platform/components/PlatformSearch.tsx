import type { ReactElement } from "react";

interface PlatformSearchProps {
  id: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

export function PlatformSearch({
  id,
  value,
  placeholder = "Search...",
  onChange,
}: PlatformSearchProps): ReactElement {
  return (
    <div className="relative max-w-full">
      <label htmlFor={id} className="sr-only">
        {placeholder}
      </label>
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
        <svg
          className="h-5 w-5 text-muted-foreground"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <input
        type="search"
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full rounded-control border border-border bg-paper py-3.5 pl-11 pr-4 text-sm text-ink placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-all duration-200 shadow-sm"
        placeholder={placeholder}
        autoComplete="off"
        spellCheck="false"
      />
    </div>
  );
}
