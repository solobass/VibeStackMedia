export function SectionHeader({ title, eyebrow }: { title: string; eyebrow?: string }) {
  return (
    <div className="mb-4 flex items-baseline justify-between gap-2">
      <div>
        {eyebrow && (
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            {eyebrow}
          </div>
        )}
        <h2 className="text-lg md:text-xl font-semibold tracking-tight text-slate-900">
          {title}
        </h2>
      </div>
    </div>
  )
}

