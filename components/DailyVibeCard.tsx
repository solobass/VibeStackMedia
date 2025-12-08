type DailyVibeCardProps = {
  tool: string
  layer: string
  promptLevel: string
  href: string
}

export function DailyVibeCard({ tool, layer, promptLevel, href }: DailyVibeCardProps) {
  return (
    <a
      href={href}
      className="flex flex-col rounded-md border border-slate-200 bg-white px-3 py-2 hover:border-slate-300 hover:bg-slate-50 transition"
    >
      <div className="text-xs font-semibold text-slate-900">
        {tool}
      </div>
      <div className="mt-1 flex flex-wrap gap-1">
        <span className="rounded-full bg-slate-100 px-2 py-[2px] text-[10px] font-medium text-slate-600">
          {layer}
        </span>
        <span className="rounded-full bg-sky-50 px-2 py-[2px] text-[10px] font-medium text-sky-700">
          Prompt: {promptLevel}
        </span>
      </div>
    </a>
  )
}

