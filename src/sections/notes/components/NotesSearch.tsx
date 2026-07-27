import type { ChangeEvent, ReactElement } from "react";

interface NotesSearchProps {
  id: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}

export function NotesSearch({
  id,
  value,
  placeholder,
  onChange,
}: NotesSearchProps): ReactElement {
  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    onChange(event.target.value);
  }

  return (
    <div>
      <label htmlFor={id} className="sr-only">
        Search notes
      </label>
      <input
        id={id}
        type="search"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        autoComplete="off"
        spellCheck={false}
        className="w-full border border-border bg-paper px-4 py-3 font-sans text-base leading-7 text-ink placeholder:text-muted-foreground transition-colors duration-200 ease-dossier hover:border-ink/30 focus-visible:border-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      />
    </div>
  );
}
