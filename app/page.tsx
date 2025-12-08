import { ArticleCard } from '@/components/ArticleCard'
import { DailyVibeCard } from '@/components/DailyVibeCard'
import { SectionHeader } from '@/components/SectionHeader'

const mockSpotlights = [
  {
    title: 'Cursor as a Creative Coding Companion',
    href: '/tool-spotlights/cursor-creative-companion',
    description:
      'How creators are using Cursor as the backbone of their AI-assisted build stack, from prototypes to production.',
    tag: 'Tool Spotlight',
    meta: 'Generation Layer • Prompt Level 5',
  },
  {
    title: 'Runway + Topaz: The Short-Form Video Refinement Stack',
    href: '/tool-spotlights/runway-topaz-shortform-stack',
    description:
      'A two-tool stack for creators who want cinematic output with minimal manual editing.',
    tag: 'Tool Spotlight',
    meta: 'Generation & Refinement • Levels 4–5',
  },
]

const mockBestTools = [
  {
    title: 'Best AI Tools for TikTok Creators (2025)',
    href: '/best-tools/tiktok-creators-2025',
    description:
      'From editing to automation, here\'s the stack that powers high-output TikTok channels.',
    tag: 'Best Tools for X',
    meta: 'Distribution & Optimization',
  },
  {
    title: 'Best Tools for Indie Filmmakers Using AI',
    href: '/best-tools/indie-filmmakers-ai',
    description:
      'A stack that balances AI generation with director-level control and aesthetics.',
    tag: 'Best Tools for X',
    meta: 'Inspiration • Generation • Assembly',
  },
]

const mockCreatorStacks = [
  {
    title: 'Inside the Stack of a Short-Form Video Creator',
    href: '/creator-stacks/short-form-video-stack',
    description:
      'Breaking down the full toolchain: ideation, cut-downs, sound, and scheduling.',
    tag: 'Creator Stack Spotlight',
    meta: 'Multi-layer Vibe Stack',
  },
]

const mockDailyVibes = [
  {
    tool: 'Runway Gen-3 Alpha',
    layer: 'Generation Layer',
    promptLevel: 'Level 5',
    href: '/daily-vibe/runway-gen3-alpha',
  },
  {
    tool: 'Topaz Video AI',
    layer: 'Refinement Layer',
    promptLevel: 'Level 5',
    href: '/daily-vibe/topaz-video-ai',
  },
  {
    tool: 'Cursor',
    layer: 'Assembly Layer',
    promptLevel: 'Level 4',
    href: '/daily-vibe/cursor-ai-editor',
  },
  {
    tool: 'Meshy',
    layer: 'Generation Layer',
    promptLevel: 'Level 4',
    href: '/daily-vibe/meshy-3d',
  },
]

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6 md:py-8">
      {/* Hero / Top Section */}
      <div className="grid gap-6 md:grid-cols-[2fr,1.2fr]">
        <section className="space-y-4">
          <div className="text-xs font-semibold uppercase tracking-wide text-sky-600">
            Featured
          </div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">
            The creator AI stack, explained one tool, one workflow, one vibe at a time.
          </h1>
          <p className="text-sm md:text-base text-slate-600 max-w-2xl">
            Vibe Stack Media covers the tools, stacks, and prompt workflows powering the new
            generation of creators. Less hype, more usable stacks.
          </p>
        </section>
        {/* Newsletter / CTA */}
        <aside className="rounded-lg border border-slate-200 bg-white p-4">
          <h2 className="text-sm font-semibold text-slate-900">
            Get the Vibe Stack Briefing
          </h2>
          <p className="mt-1 text-xs text-slate-600">
            A concise, stack-focused briefing on AI tools and creator workflows. 1–2x per week.
          </p>
          <form className="mt-3 flex flex-col gap-2 sm:flex-row">
            <input
              type="email"
              placeholder="you@studio.com"
              className="flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            />
            <button
              type="submit"
              className="rounded-md bg-slate-900 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-50 hover:bg-slate-800"
            >
              Subscribe
            </button>
          </form>
          <p className="mt-2 text-[11px] text-slate-400">
            No spam. Just stacks.
          </p>
        </aside>
      </div>

      {/* Main Content + Sidebar */}
      <div className="mt-8 grid gap-8 lg:grid-cols-[2.1fr,1.2fr]">
        {/* Main column */}
        <div className="space-y-8">
          {/* Tool Spotlights */}
          <section>
            <SectionHeader
              eyebrow="Spotlights"
              title="Latest Tool Spotlights"
            />
            <div className="grid gap-4 md:grid-cols-2">
              {mockSpotlights.map((item) => (
                <ArticleCard key={item.href} {...item} />
              ))}
            </div>
          </section>

          {/* Best Tools for X */}
          <section>
            <SectionHeader
              eyebrow="Guides"
              title="Best Tools for X"
            />
            <div className="grid gap-4 md:grid-cols-2">
              {mockBestTools.map((item) => (
                <ArticleCard key={item.href} {...item} />
              ))}
            </div>
          </section>

          {/* Creator Stack */}
          <section>
            <SectionHeader
              eyebrow="Creator Stacks"
              title="Latest Creator Stack Spotlight"
            />
            <div className="grid gap-4 md:grid-cols-1">
              {mockCreatorStacks.map((item) => (
                <ArticleCard key={item.href} {...item} />
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Daily Vibe */}
          <section>
            <SectionHeader
              eyebrow="Daily Vibe"
              title="Today's Tools"
            />
            <div className="space-y-2">
              {mockDailyVibes.map((vibe) => (
                <DailyVibeCard key={vibe.href} {...vibe} />
              ))}
            </div>
          </section>

          {/* Framework CTA */}
          <section className="rounded-lg border border-slate-200 bg-slate-900 px-4 py-3 text-slate-50">
            <div className="text-[11px] font-semibold uppercase tracking-wide text-sky-300">
              Framework
            </div>
            <div className="mt-1 text-sm font-semibold">
              The Creative Vibe Stack & Prompt Coding Stack
            </div>
            <p className="mt-1 text-xs text-slate-200">
              Our dual frameworks for mapping tools, workflows, and prompts across the modern
              creator pipeline.
            </p>
            <a
              href="/vibe-stack-framework"
              className="mt-2 inline-flex text-[11px] font-semibold uppercase tracking-wide text-sky-300 hover:text-sky-200"
            >
              Explore the frameworks →
            </a>
          </section>
        </aside>
      </div>
    </div>
  )
}
