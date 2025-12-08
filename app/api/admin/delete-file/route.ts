import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { requireAuth } from '@/utils/auth'

export async function POST(req: NextRequest) {
  const authError = requireAuth(req)
  if (authError) return authError

  const { filePath } = await req.json()

  if (!filePath || typeof filePath !== 'string') {
    return NextResponse.json(
      { error: 'Missing or invalid filePath' },
      { status: 400 }
    )
  }

  const full = path.join(process.cwd(), filePath)

  // basic safety: only allow deleting .mdx inside /content
  const contentRoot = path.join(process.cwd(), 'content')

  if (!full.startsWith(contentRoot) || !full.endsWith('.mdx')) {
    return NextResponse.json(
      { error: 'Invalid delete target' },
      { status: 400 }
    )
  }

  try {
    if (fs.existsSync(full)) {
      fs.unlinkSync(full)
    }
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Delete error:', err)
    return NextResponse.json(
      { error: 'Delete error' },
      { status: 500 }
    )
  }
}

