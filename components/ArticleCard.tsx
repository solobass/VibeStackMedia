type ArticleCardProps = {
  title: string
  href: string
  description: string
  tag?: string
  meta?: string
}

export function ArticleCard({ title, href, description, tag, meta }: ArticleCardProps) {
  return (
    <a
      href={href}
      className="block rounded-lg border border-slate-200 bg-white p-4 hover:border-slate-300 hover:shadow-sm transition"
    >
      {tag && (
        <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-sky-600">
          {tag}
        </div>
      )}
      <h3 className="text-sm md:text-base font-semibold text-slate-900 line-clamp-2">
        {title}
      </h3>
      <p className="mt-1 text-xs md:text-sm text-slate-600 line-clamp-3">
        {description}
      </p>
      {meta && (
        <div className="mt-3 text-[11px] uppercase tracking-wide text-slate-400">
          {meta}
        </div>
      )}
    </a>
  )
}

