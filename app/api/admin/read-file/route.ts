import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { requireAuth } from '@/utils/auth'

export async function POST(req: NextRequest) {
  const authError = requireAuth(req)
  if (authError) return authError

  const { filePath } = await req.json()
  const fullPath = path.join(process.cwd(), filePath)

  if (!fullPath.startsWith(path.join(process.cwd(), 'content'))) {
    return NextResponse.json({ error: 'Invalid path' }, { status: 400 })
  }

  if (!fullPath.endsWith('.mdx')) {
    return NextResponse.json({ error: 'Invalid file' }, { status: 400 })
  }

  try {
    const fileContents = fs.readFileSync(fullPath, 'utf-8')
    const { data, content } = matter(fileContents)
    return NextResponse.json({
      content: fileContents,
      frontmatter: data,
      body: content,
    })
  } catch (err) {
    return NextResponse.json({ error: 'File not found' }, { status: 404 })
  }
}

