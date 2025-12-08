import type { Metadata } from 'next'
import './globals.css'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Vibe Stack Media',
  description: 'Tools, workflows, and vibe stacks for the AI creator economy.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900">
        <div className="min-h-screen flex flex-col">
          <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
            <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-md bg-slate-900 flex items-center justify-center text-xs font-semibold text-slate-50">
                  VS
                </div>
                <div>
                  <div className="text-lg font-semibold tracking-tight">
                    Vibe Stack Media
                  </div>
                  <div className="text-xs text-slate-500">
                    The creator AI stack, decoded.
                  </div>
                </div>
              </div>
              <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
                <a href="/" className="hover:text-slate-900">
                  Home
                </a>
                <a href="/daily-vibe" className="hover:text-slate-900">
                  Daily Vibe
                </a>
                <a href="/tool-spotlights" className="hover:text-slate-900">
                  Tool Spotlights
                </a>
                <a href="/vibe-stack-framework" className="hover:text-slate-900">
                  Vibe Stack
                </a>
                <a href="/about" className="hover:text-slate-900">
                  About
                </a>
              </nav>
            </div>
          </header>
          <main className="flex-1">
            {children}
          </main>
          <footer className="border-t border-slate-200 bg-white">
            <div className="mx-auto max-w-6xl px-4 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
              <div className="text-xs text-slate-500">
                © {new Date().getFullYear()} Vibe Stack Media. All rights reserved.
              </div>
              <div className="flex gap-4 text-xs text-slate-500">
                <a href="/newsletter" className="hover:text-slate-900">
                  Newsletter
                </a>
                <a href="https://instagram.com" className="hover:text-slate-900">
                  Instagram
                </a>
                <a href="https://x.com" className="hover:text-slate-900">
                  X / Twitter
                </a>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}

