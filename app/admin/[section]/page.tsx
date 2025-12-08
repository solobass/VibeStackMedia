'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

type FileMeta = {
  slug: string
  title: string
  date: string
  coverImage?: string
}

export default function SectionList({
  params,
}: {
  params: Promise<{ section: string }> | { section: string }
}) {
  const [section, setSection] = useState<string>('')
  const [files, setFiles] = useState<FileMeta[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Handle both Promise and object params
    if (params instanceof Promise) {
      params.then((p) => setSection(p.section))
    } else {
      setSection(params.section)
    }
  }, [params])

  useEffect(() => {
    if (!section) return

    async function load() {
      try {
        const auth = localStorage.getItem('vsm_admin_auth')
        const res = await fetch(`/api/admin/list-files?section=${section}`, {
          headers: {
            authorization: `Bearer ${auth || ''}`,
          },
        })
        const data = await res.json()
        setFiles(data.files ?? [])
      } catch (err) {
        console.error('Error loading files', err)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [section])

  if (loading) {
    return <div>Loading {section}…</div>
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold capitalize">
          {section.replace('-', ' ')}
        </h2>
        <Link href={`/admin/${section}/new`}>
          <button className="bg-sky-600 text-white px-4 py-2 rounded">
            + Add New Article
          </button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {files.map((f) => (
          <Link key={f.slug} href={`/admin/${section}/${f.slug}`}>
            <div className="cursor-pointer border rounded bg-white hover:shadow-sm overflow-hidden">
              {f.coverImage && (
                <div className="relative h-40 w-full bg-slate-200">
                  <Image
                    src={f.coverImage}
                    alt={f.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              )}
              <div className="p-4">
                <h3 className="font-semibold text-sm md:text-base">
                  {f.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1">{f.date}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

