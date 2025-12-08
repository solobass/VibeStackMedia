'use client'

import { useEffect, useState, ChangeEvent, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

type FormData = {
  headline: string
  subText: string
  article: string
  coverImage: string
}

function parseFrontMatter(raw: string) {
  // very simple front-matter parser for:
  // ---
  // key: "value"
  // ---
  let fm: Record<string, string> = {}
  let body = raw

  if (raw.startsWith('---')) {
    const match = raw.match(/^---([\s\S]*?)---\s*/)
    if (match) {
      const fmText = match[1]
      body = raw.slice(match[0].length)
      fmText
        .split('\n')
        .map((l) => l.trim())
        .filter(Boolean)
        .forEach((line) => {
          const [k, ...rest] = line.split(':')
          if (!k || rest.length === 0) return
          let v = rest.join(':').trim()
          // strip wrapping quotes
          v = v.replace(/^"(.*)"$/, '$1')
          fm[k.trim()] = v
        })
    }
  }

  return { frontMatter: fm, body }
}

export default function EditArticlePage({
  params,
}: {
  params: Promise<{ section: string; slug: string }> | { section: string; slug: string }
}) {
  const [section, setSection] = useState<string>('')
  const [slug, setSlug] = useState<string>('')
  const router = useRouter()

  useEffect(() => {
    // Handle both Promise and object params
    if (params instanceof Promise) {
      params.then((p) => {
        setSection(p.section)
        setSlug(p.slug)
      })
    } else {
      setSection(params.section)
      setSlug(params.slug)
    }
  }, [params])

  const [formData, setFormData] = useState<FormData>({
    headline: '',
    subText: '',
    article: '',
    coverImage: '',
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [newImageFile, setNewImageFile] = useState<File | null>(null)
  const [updatingImage, setUpdatingImage] = useState(false)

  useEffect(() => {
    if (!section || !slug) return

    async function load() {
      try {
        const auth = localStorage.getItem('vsm_admin_auth')
        if (!auth) {
          router.push('/admin/login')
          return
        }

        // Handle both with and without .mdx extension
        const fileSlug = slug.endsWith('.mdx') ? slug : `${slug}.mdx`
        const filePath = `content/${section}/${fileSlug}`

        const res = await fetch('/api/admin/read-file', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${auth}`,
          },
          body: JSON.stringify({ filePath }),
        })

        if (res.status === 401) {
          localStorage.removeItem('vsm_admin_auth')
          router.push('/admin/login')
          return
        }

        const data = await res.json()
        if (!data.content) throw new Error('No content')

        const { frontMatter, body } = parseFrontMatter(data.content)

        setFormData({
          headline: frontMatter.title || '',
          subText: frontMatter.description || '',
          article: body,
          coverImage: frontMatter.coverImage || '',
        })
      } catch (err) {
        console.error('Error loading article', err)
        alert('Error loading article')
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [section, slug, router])

  function handleInputChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  function handleNewImageChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null
    setNewImageFile(file)
  }

  async function saveMDX() {
    const auth = localStorage.getItem('vsm_admin_auth')
    if (!auth) {
      router.push('/admin/login')
      return
    }

    const fileSlug = slug.endsWith('.mdx') ? slug : `${slug}.mdx`
    const filePath = `content/${section}/${fileSlug}`

    const mdx = `---
title: "${formData.headline}"
description: "${formData.subText}"
slug: "/${section}/${slug.replace('.mdx', '')}"
type: "${section}"
date: "${new Date().toISOString().slice(0, 10)}"
${formData.coverImage ? `coverImage: "${formData.coverImage}"` : ''}
---

${formData.article}
`

    const res = await fetch('/api/admin/save-file', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${auth}`,
      },
      body: JSON.stringify({ filePath, content: mdx }),
    })

    if (res.status === 401) {
      localStorage.removeItem('vsm_admin_auth')
      router.push('/admin/login')
      return
    }

    if (!res.ok) {
      throw new Error('Failed to save')
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSaving(true)

    try {
      await saveMDX()
      alert('Article updated!')
      router.push(`/admin/${section}`)
    } catch (err) {
      console.error('Error saving article', err)
      alert('Error saving article')
    } finally {
      setSaving(false)
    }
  }

  async function handleUpdateImage() {
    if (!newImageFile) {
      alert('Choose a new image first.')
      return
    }

    setUpdatingImage(true)

    const auth = localStorage.getItem('vsm_admin_auth')
    if (!auth) {
      router.push('/admin/login')
      return
    }

    try {
      const fd = new FormData()
      fd.append('file', newImageFile)
      fd.append('section', section)
      fd.append('slug', slug.replace('.mdx', ''))

      const res = await fetch('/api/admin/upload-image', {
        method: 'POST',
        headers: {
          authorization: `Bearer ${auth}`,
        },
        body: fd,
      })

      if (res.status === 401) {
        localStorage.removeItem('vsm_admin_auth')
        router.push('/admin/login')
        return
      }

      const data = await res.json()
      if (data.path) {
        // update state and save MDX so front-matter has new coverImage path
        setFormData((prev) => ({ ...prev, coverImage: data.path }))
        await saveMDX()
        setNewImageFile(null)
        alert('Image updated!')
      } else {
        alert('Image upload failed')
      }
    } catch (err) {
      console.error('Error updating image', err)
      alert('Error updating image')
    } finally {
      setUpdatingImage(false)
    }
  }

  async function handleDelete() {
    const confirmed = window.confirm(
      'Are you sure you want to delete this article? This cannot be undone.'
    )
    if (!confirmed) return

    setDeleting(true)

    const auth = localStorage.getItem('vsm_admin_auth')
    if (!auth) {
      router.push('/admin/login')
      return
    }

    try {
      const fileSlug = slug.endsWith('.mdx') ? slug : `${slug}.mdx`
      const filePath = `content/${section}/${fileSlug}`

      const res = await fetch('/api/admin/delete-file', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${auth}`,
        },
        body: JSON.stringify({ filePath }),
      })

      if (res.status === 401) {
        localStorage.removeItem('vsm_admin_auth')
        router.push('/admin/login')
        return
      }

      if (!res.ok) {
        throw new Error('Failed to delete')
      }

      alert('Article deleted.')
      router.push(`/admin/${section}`)
    } catch (err) {
      console.error('Error deleting article', err)
      alert('Error deleting article')
    } finally {
      setDeleting(false)
    }
  }

  if (loading) {
    return <div>Loading article…</div>
  }

  if (!section || !slug) {
    return <div>Loading...</div>
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <Link href={`/admin/${section}`} className="text-sky-600 hover:underline text-sm">
          ← Back to {section.replace(/-/g, ' ')}
        </Link>
        <h2 className="text-xl font-semibold mt-2">
          Edit Article — {section.replace(/-/g, ' ')}
        </h2>
      </div>

      {/* Current cover + update control */}
      <div className="mb-6 space-y-2">
        <p className="text-sm font-medium">Current cover image</p>
        {formData.coverImage ? (
          <div className="relative w-full max-w-md h-40">
            <Image
              src={formData.coverImage}
              alt="Cover"
              fill
              className="object-cover rounded border"
              unoptimized
            />
          </div>
        ) : (
          <p className="text-xs text-slate-500">No cover image set.</p>
        )}
        <div className="mt-3">
          <label
            className="block text-sm font-medium mb-1"
            htmlFor="newImage"
          >
            Update Image (cover thumbnail)
          </label>
          <p className="text-xs text-slate-500 mb-1">
            Upload a 16:9 image, ideally 1600×900px (minimum 1200×675px),
            JPG/PNG/WebP.
          </p>
          <input
            id="newImage"
            type="file"
            accept="image/*"
            onChange={handleNewImageChange}
            className="block w-full text-sm mb-2"
          />
          <button
            type="button"
            disabled={updatingImage || !newImageFile}
            onClick={handleUpdateImage}
            className="bg-slate-800 text-white px-3 py-1 rounded text-sm hover:bg-slate-700 disabled:opacity-60 transition"
          >
            {updatingImage ? 'Updating Image…' : 'Update Image'}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Headline */}
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="headline">
            Headline
          </label>
          <input
            id="headline"
            name="headline"
            type="text"
            value={formData.headline}
            onChange={handleInputChange}
            className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
            required
          />
        </div>

        {/* SubText */}
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="subText">
            SubText
          </label>
          <input
            id="subText"
            name="subText"
            type="text"
            value={formData.subText}
            onChange={handleInputChange}
            className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        {/* Article body */}
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="article">
            Article (MDX / Markdown)
          </label>
          <textarea
            id="article"
            name="article"
            value={formData.article}
            onChange={handleInputChange}
            rows={16}
            className="w-full border border-slate-300 rounded px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-sky-500"
            required
          />
        </div>

        {/* Action buttons */}
        <div className="pt-2 flex gap-3">
          <button
            type="submit"
            disabled={saving || deleting}
            className="bg-sky-600 text-white px-4 py-2 rounded hover:bg-sky-700 disabled:opacity-60 transition"
          >
            {saving ? 'Saving…' : 'Save Changes'}
          </button>
          <button
            type="button"
            disabled={saving || deleting}
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-60 transition"
          >
            {deleting ? 'Deleting…' : 'Delete Article'}
          </button>
        </div>
      </form>
    </div>
  )
}
