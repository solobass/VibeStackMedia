import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const sections = [
  { name: 'Daily Vibe', slug: 'daily-vibe' },
  { name: 'Tool Spotlights', slug: 'tool-spotlights' },
  { name: 'Best Tools', slug: 'best-tools' },
  { name: 'Creator Stacks', slug: 'creator-stacks' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-slate-50">
      <aside className="w-64 bg-white border-r border-slate-200 p-4">
        <div className="mb-8">
          <h1 className="text-xl font-semibold">Vibe Stack Admin</h1>
        </div>
        <nav className="space-y-3">
          <Link href="/admin" className="block px-2 py-1 rounded hover:bg-slate-100">
            Home
          </Link>
          {sections.map((sec) => (
            <Link
              key={sec.slug}
              href={`/admin/${sec.slug}`}
              className="block px-2 py-1 rounded hover:bg-slate-100"
            >
              {sec.name}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  )
}

