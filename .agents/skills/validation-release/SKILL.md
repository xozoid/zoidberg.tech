---
name: validation-release
description:
  Use when validating site changes, debugging npm checks, updating CI or GitHub
  Pages deployment, preparing releases, or reasoning about deployed site version
  metadata.
---

# Validation and Release

## Local Commands

Use the narrowest command that validates the change, then broaden when touching
shared behavior.

- `npm run check`: Astro diagnostics and TypeScript checks.
- `npm run lint:headings`: sentence-case heading lint for source `.astro` and
  `.html`.
- `npm run lint:prose:sync`: sync Vale packages before prose linting when
  needed.
- `npm run lint:prose`: builds the site, then runs Vale against `readme.md` and
  generated `dist`, excluding `style`.
- `npm run format:check`: Prettier check for the repo.
- `npm run build`: production static build.
- `npm run dev`: local Astro dev server.
- `npm run preview`: preview the production build.

## CI

`.github/workflows/ci.yml` runs on pull requests and manual dispatch.

Jobs:

- `format`: `npm ci`, then `npm run format:check`.
- `lint`: `npm ci`, then `npm run check` and `npm run lint:headings`.
- `build`: `npm ci`, then `npm run build`.

Keep CI aligned with local `package.json` scripts. If adding a local validation
command that should block pull requests, add it to CI in the relevant job.

## Deployment

`.github/workflows/deploy.yml` deploys GitHub Pages on published releases and
manual dispatch.

Important details:

- Checkout uses `fetch-depth: 0` so `git describe --tags --always --dirty` can
  compute the site version.
- The workflow writes `PUBLIC_SITE_VERSION` into `$GITHUB_ENV`.
- `src/layouts/BaseLayout.astro` reads `PUBLIC_SITE_VERSION`, with `v0+dev` as
  the local fallback.
- The generated version appears in the document metadata and footer.
- Deployment uploads `dist` with `actions/upload-pages-artifact` and deploys
  with `actions/deploy-pages`.

## Release Notes

Publishing a GitHub release is the normal production deploy path for
`https://zoidberg.tech`.

Before release-oriented changes are considered done:

1. Confirm `npm run build` succeeds locally.
2. Confirm heading lint passes if headings changed.
3. Confirm version-sensitive behavior still works with
   `git describe --tags --always --dirty`.
4. Do not commit generated `dist` unless the user explicitly asks.
