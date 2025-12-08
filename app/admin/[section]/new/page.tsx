'use client'

import { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type FormData = {
  headline: string
  subText: string
  article: string
  image: File | null
  coverImage: string
  type: string
  slugPrefix: string
}

export default function NewArticlePage({
  params,
}: {
  params: Promise<{ section: string }> | { section: string }
}) {
  const [section, setSection] = useState<string>('')
  const router = useRouter()

  useEffect(() => {
    // Handle both Promise and object params
    if (params instanceof Promise) {
      params.then((p) => setSection(p.section))
    } else {
      setSection(params.section)
    }
  }, [params])

  const [formData, setFormData] = useState<FormData>({
    headline: '',
    subText: '',
    article: '',
    image: null,
    coverImage: '',
    type: section.replace('-', ' '),
    slugPrefix: `/${section}/`,
  })

  useEffect(() => {
    if (section) {
      setFormData((prev) => ({
        ...prev,
        type: section.replace('-', ' '),
        slugPrefix: `/${section}/`,
      }))
    }
  }, [section])

  const [saving, setSaving] = useState(false)

  function handleInputChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null
    setFormData((prev) => ({ ...prev, image: file }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSaving(true)

    const auth = localStorage.getItem('vsm_admin_auth')
    if (!auth) {
      router.push('/admin/login')
      return
    }

    try {
      const safeSlugPart = formData.headline
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')

      const slug = `${formData.slugPrefix}${safeSlugPart}`
      const filePath = `content/${section}/${safeSlugPart}.mdx`

      // 1) upload image if present
      let coverImagePath = ''
      if (formData.image) {
        const fd = new FormData()
        fd.append('file', formData.image)
        fd.append('section', section)
        fd.append('slug', safeSlugPart)

        const uploadRes = await fetch('/api/admin/upload-image', {
          method: 'POST',
          headers: {
            authorization: `Bearer ${auth}`,
          },
          body: fd,
        })

        if (uploadRes.status === 401) {
          localStorage.removeItem('vsm_admin_auth')
          router.push('/admin/login')
          return
        }

        const uploadData = await uploadRes.json()
        if (uploadData.path) {
          coverImagePath = uploadData.path
        }
      }

      // 2) build MDX with coverImage
      const mdx = `---
title: "${formData.headline}"
description: "${formData.subText}"
slug: "${slug}"
type: "${section}"
date: "${new Date().toISOString().slice(0, 10)}"
${coverImagePath ? `coverImage: "${coverImagePath}"` : ''}
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

      alert('Article saved!')
      router.push(`/admin/${section}`)
    } catch (err) {
      console.error(err)
      alert('Error saving article')
    } finally {
      setSaving(false)
    }
  }

  if (!section) {
    return <div>Loading...</div>
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <Link href={`/admin/${section}`} className="text-sky-600 hover:underline text-sm">
          ← Back to {section.replace(/-/g, ' ')}
        </Link>
        <h2 className="text-xl font-semibold mt-2">
          Add New Article — {section.replace(/-/g, ' ')}
        </h2>
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
            rows={14}
            className="w-full border border-slate-300 rounded px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-sky-500"
            placeholder="Write your article here..."
            required
          />
        </div>

        {/* Image upload */}
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="image">
            Image (cover thumbnail)
          </label>
          <p className="text-xs text-slate-500 mb-1">
            Upload a 16:9 image, ideally 1600×900px (minimum 1200×675px),
            JPG/PNG/WebP.
          </p>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm"
          />
        </div>

        {/* Publish */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={saving}
            className="bg-sky-600 text-white px-4 py-2 rounded hover:bg-sky-700 disabled:opacity-60 transition"
          >
            {saving ? 'Publishing…' : 'Publish'}
          </button>
        </div>
      </form>
    </div>
  )
}
