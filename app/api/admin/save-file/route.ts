import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { requireAuth } from '@/utils/auth'

export async function POST(req: NextRequest) {
  const authError = requireAuth(req)
  if (authError) return authError

  const { filePath, content } = await req.json()
  const fullPath = path.join(process.cwd(), filePath)

  if (!fullPath.startsWith(path.join(process.cwd(), 'content'))) {
    return NextResponse.json({ error: 'Invalid path' }, { status: 400 })
  }

  if (!fullPath.endsWith('.mdx')) {
    return NextResponse.json({ error: 'Invalid file' }, { status: 400 })
  }

  try {
    fs.writeFileSync(fullPath, content, 'utf-8')
    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ error: 'Write error' }, { status: 500 })
  }
}

