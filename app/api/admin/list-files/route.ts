import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { requireAuth } from '@/utils/auth'

export async function GET(req: NextRequest) {
  const authError = requireAuth(req)
  if (authError) return authError

  const { searchParams } = new URL(req.url)
  const section = searchParams.get('section')

  const contentDir = section
    ? path.join(process.cwd(), 'content', section)
    : path.join(process.cwd(), 'content')

  if (!fs.existsSync(contentDir)) {
    return NextResponse.json({ files: [] })
  }

  const files: Array<{
    slug: string
    title: string
    date: string
    coverImage?: string
  }> = []

  try {
    const entries = fs.readdirSync(contentDir)

    for (const entry of entries) {
      const fullPath = path.join(contentDir, entry)
      const stat = fs.statSync(fullPath)

      if (stat.isFile() && entry.endsWith('.mdx')) {
        try {
          const fileContents = fs.readFileSync(fullPath, 'utf-8')
          const { data } = matter(fileContents)
          const slug = entry.replace('.mdx', '')

          files.push({
            slug,
            title: data.title || entry,
            date: data.date || '',
            coverImage: data.coverImage,
          })
        } catch (err) {
          // If we can't parse frontmatter, still include the file
          const slug = entry.replace('.mdx', '')
          files.push({
            slug,
            title: entry,
            date: '',
          })
        }
      }
    }

    // Sort by date (newest first)
    files.sort((a, b) => {
      if (!a.date) return 1
      if (!b.date) return -1
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })

    return NextResponse.json({ files })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to list files' }, { status: 500 })
  }
}

