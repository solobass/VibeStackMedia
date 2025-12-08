import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDirectory = path.join(process.cwd(), 'content')

export interface ContentFrontmatter {
  title: string
  date: string
  slug: string
  type: string
  stackLayer?: string
  promptLevel?: string
  tags?: string[]
  coverImage?: string
  description: string
}

export interface ContentItem {
  frontmatter: ContentFrontmatter
  content: string
  filePath: string
}

export function getContentByType(type: string): ContentItem[] {
  const allContent = getAllContent()
  return allContent.filter((item) => item.frontmatter.type === type)
}

export function getContentBySlug(slug: string): ContentItem | undefined {
  const allContent = getAllContent()
  return allContent.find((item) => item.frontmatter.slug === slug)
}

export function getAllContent(): ContentItem[] {
  const contentItems: ContentItem[] = []

  function walkDir(dir: string, basePath: string = '') {
    const files = fs.readdirSync(dir)

    for (const file of files) {
      const filePath = path.join(dir, file)
      const stat = fs.statSync(filePath)

      if (stat.isDirectory()) {
        walkDir(filePath, path.join(basePath, file))
      } else if (file.endsWith('.mdx')) {
        const fileContents = fs.readFileSync(filePath, 'utf8')
        const { data, content } = matter(fileContents)

        contentItems.push({
          frontmatter: data as ContentFrontmatter,
          content,
          filePath: path.join(basePath, file),
        })
      }
    }
  }

  walkDir(contentDirectory)
  return contentItems.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
  )
}

export function getContentByDirectory(dir: string): ContentItem[] {
  const dirPath = path.join(contentDirectory, dir)
  if (!fs.existsSync(dirPath)) return []

  const files = fs.readdirSync(dirPath)
  const contentItems: ContentItem[] = []

  for (const file of files) {
    if (file.endsWith('.mdx')) {
      const filePath = path.join(dirPath, file)
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data, content } = matter(fileContents)

      contentItems.push({
        frontmatter: data as ContentFrontmatter,
        content,
        filePath: path.join(dir, file),
      })
    }
  }

  return contentItems.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
  )
}

