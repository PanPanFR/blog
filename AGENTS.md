# AGENTS.md

This file provides guidance to agents when working with code in this repository.

## Build Commands
- Run `fumadocs-mdx` before `next dev` or `next build` (handled automatically by package.json scripts)
- Use `--turbopack` flag for faster development builds

## Code Patterns
- Blog content stored in `blog/content/` as MDX files with custom frontmatter: `date`, `tags`, `featured`, `readTime`, `author`, `thumbnail`
- Authors defined in `lib/authors.ts` with string keys; validate with `isValidAuthor()` before use
- Custom components: `FlickeringGrid` (canvas-based background animation), `TableOfContents` (scans only h1/h2, copies URL on click), `ReadMoreSection` (tag-based relevance scoring), `HashScrollHandler` (smooth scroll with 80px offset)
- OG images generated dynamically using `ImageResponse` with custom fonts (Clash Display, Cabinet Grotesk)
- HTML element uses `suppressHydrationWarning` for theme compatibility
- TypeScript paths include `@/.source` for generated Fumadocs content
- MDX configured with custom provider from `@/mdx-components`