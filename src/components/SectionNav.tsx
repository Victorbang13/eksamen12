type Section = { id: string; label: string };

export function SectionNav({
  sections,
  label = "På denne side",
}: {
  sections: Section[];
  label?: string;
}) {
  return (
    <nav
      aria-label={label}
      className="bg-background border-b border-soft"
    >
      <div className="mx-auto max-w-6xl px-4 py-3 flex flex-wrap items-center gap-x-4 gap-y-2">
        <span className="text-sm font-medium text-primary/70">{label}:</span>
        <ul className="flex flex-wrap gap-2">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="inline-block text-sm text-primary px-3 py-1 rounded-sm border border-primary/20 hover:bg-soft focus-visible:bg-soft transition-colors"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
