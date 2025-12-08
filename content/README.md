# Content Structure

This directory contains all MDX content files for Vibe Stack Media.

## Directory Structure

- `/daily-vibe` - Daily tool spotlights (format: `YYYY-MM-DD-tool-name.mdx`)
- `/tool-spotlights` - In-depth tool reviews (format: `tool-name.mdx`)
- `/best-tools` - Best tools guides (format: `best-tools-for-{topic}.mdx`)
- `/creator-stacks` - Creator stack breakdowns (format: `creator-stack-{slug}.mdx`)
- `/framework` - Framework documentation (format: `vibe-stack-framework.mdx`)
- `/pages` - Static pages (format: `{page-name}.mdx`)

## Frontmatter Format

All MDX files should include the following frontmatter:

```yaml
---
title: "Your Article Title Here"
date: "2025-12-10"            # YYYY-MM-DD
slug: "/tool-spotlights/tool-name"   # URL path
type: "tool-spotlight"        # one of: daily-vibe, tool-spotlight, best-tools, creator-stack, page
stackLayer: "Generation"      # Creative Vibe Stack layer (if applicable)
promptLevel: "Level 5"        # Prompt Coding Stack level (if applicable)
tags: ["AI", "Video", "Workflow"]   # arbitrary tags
coverImage: "/images/cover-tool-name.jpg"  # optional: path to cover image
description: "Short summary / blurb for meta + previews."
---
```

## Content Types

- `daily-vibe` - Daily featured tools
- `tool-spotlight` - Detailed tool reviews
- `best-tools` - Best tools guides for specific topics
- `creator-stack` - Creator workflow breakdowns
- `page` - Static pages (about, newsletter, etc.)

## Stack Layers (Creative Vibe Stack)

- Inspiration
- Generation
- Refinement
- Assembly
- Distribution

## Prompt Levels (Prompt Coding Stack)

- Level 1 - Basic single prompts
- Level 2 - Structured prompts with parameters
- Level 3 - Multi-step prompts
- Level 4 - Chained prompts with context
- Level 5 - Advanced workflows with conditional logic

