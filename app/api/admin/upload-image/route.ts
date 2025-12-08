import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { requireAuth } from '@/utils/auth'

export async function POST(req: NextRequest) {
  const authError = requireAuth(req)
  if (authError) return authError

  const formData = await req.formData()

  const file = formData.get('file') as File | null
  const section = formData.get('section') as string | null
  const slug = formData.get('slug') as string | null

  if (!file || !section || !slug) {
    return NextResponse.json(
      { error: 'Missing file, section, or slug' },
      { status: 400 }
    )
  }

  const bytes = Buffer.from(await file.arrayBuffer())

  // use consistent path: public/images/covers/{section}-{slug}.ext
  const ext = (file.type.split('/')[1] || 'jpg').toLowerCase()
  const safeExt = ext === 'jpeg' ? 'jpg' : ext
  const fileName = `${section}-${slug}.${safeExt}`
  const relativePath = `/images/covers/${fileName}`
  const dest = path.join(process.cwd(), 'public', 'images', 'covers')

  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true })
  }

  const fullPath = path.join(dest, fileName)

  // overwrite = "delete old + add new" in one step
  fs.writeFileSync(fullPath, bytes)

  return NextResponse.json({ path: relativePath })
}

