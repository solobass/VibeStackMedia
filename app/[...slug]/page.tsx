import { getContentBySlug } from '@/lib/mdx'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { notFound } from 'next/navigation'

export default async function ContentPage({
  params,
}: {
  params: Promise<{ slug: string[] }>
}) {
  const { slug: slugArray } = await params
  
  // Don't handle empty slugs - let app/page.tsx handle root
  if (!slugArray || slugArray.length === 0) {
    notFound()
  }
  
  // Don't handle Next.js internal paths (_next, api, etc.) - return early
  const firstSegment = slugArray[0]
  if (firstSegment?.startsWith('_') || firstSegment === 'api' || firstSegment === 'favicon.ico') {
    // Return a response that Next.js will handle as a static asset
    notFound()
  }
  
  const slug = '/' + slugArray.join('/')
  const content = getContentBySlug(slug)

  if (!content) {
    notFound()
  }

  const { frontmatter, content: mdxContent } = content

  return (
    <article className="mx-auto max-w-4xl px-4 py-8">
      <header className="mb-8">
        {frontmatter.coverImage && (
          <img
            src={frontmatter.coverImage}
            alt={frontmatter.title}
            className="mb-6 w-full rounded-lg"
          />
        )}
        <div className="mb-4">
          {frontmatter.stackLayer && (
            <span className="text-xs font-semibold uppercase tracking-wide text-sky-600">
              {frontmatter.stackLayer}
            </span>
          )}
          {frontmatter.promptLevel && (
            <span className="ml-2 text-xs font-semibold uppercase tracking-wide text-purple-600">
              {frontmatter.promptLevel}
            </span>
          )}
        </div>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900 mb-2">
          {frontmatter.title}
        </h1>
        <div className="flex items-center gap-4 text-sm text-slate-500">
          <time dateTime={frontmatter.date}>
            {new Date(frontmatter.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          {frontmatter.tags && frontmatter.tags.length > 0 && (
            <div className="flex gap-2">
              {frontmatter.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>
      <div className="prose prose-slate prose-lg max-w-none">
        <MDXRemote source={mdxContent} />
      </div>
    </article>
  )
}

