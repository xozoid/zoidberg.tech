---
name: astro-site
description:
  Use when editing Astro pages, routes, layout, footer navigation, page
  metadata, browser scripts, or small TypeScript interactions in this repo.
---

# Astro Site

## Scope

This is a personal static site built with Astro, Tailwind CSS v4, and small
browser-side TypeScript modules.

Core paths:

- `src/pages/` contains routes. Nested `index.astro` files map to directory
  routes.
- `src/layouts/BaseLayout.astro` owns shared metadata, fonts, footer navigation,
  theme controls, and footer scripts.
- `src/scripts/` contains client-side modules imported from Astro script tags.
- `public/` contains static assets copied as-is.
- `astro.config.mjs` sets `site: "https://zoidberg.tech"` and wires Tailwind
  through Vite.

## Editing Workflow

1. Read the target page and `src/layouts/BaseLayout.astro` before changing
   shared route behavior.
2. Keep route pages small and compose through `BaseLayout` unless a page has a
   specific reason to own document-level structure.
3. Use the existing absolute import style, such as
   `src/layouts/BaseLayout.astro` and `src/scripts/logo`.
4. Put client-side behavior in `src/scripts/*.ts` when it is reusable or
   non-trivial. Inline scripts are acceptable for tiny page-local cookie or
   redirect logic.
5. Preserve the footer behavior:
   - `/welcome` hides the regular footer nav.
   - `/style` is visible only in dev or when `PUBLIC_DEBUG=true`.
   - `PUBLIC_SITE_VERSION` appears in metadata and footer, falling back to
     `v0+dev`.

## UX and Content Conventions

- Headings use sentence case. `npm run lint:headings` enforces this for `.astro`
  and `.html` files under `src`.
- Use the site vocabulary already present: `logs`, `artifacts`, `profile`,
  `terminal`, `Xenon Core`, and `zoidberg.tech`.
- Do not turn internal pages into landing pages. Build the actual route content
  or interaction.
- For buttons and icons, prefer the existing `btn-*` utilities and Material
  Symbols `<icon>` element.
- Avoid adding new dependencies for simple static content or small browser
  interactions.

## Validation

Run checks based on the edit:

- Astro/type diagnostics: `npm run check`
- Heading case: `npm run lint:headings`
- Full static build: `npm run build`
- Formatting check before finishing broad edits: `npm run format:check`
