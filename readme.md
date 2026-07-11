# zoidberg.tech

Personal static website built with Astro and Tailwind CSS v4.

## Commands

```sh
npm run dev
npm run check
npm run lint:prose:sync
npm run lint:prose
npm run format:check
npm run build
```

## Deployment

Publishing a GitHub release tells GitHub Actions to build the static site and deploy `dist` to GitHub Pages. Production address: `https://zoidberg.tech`.

Git tags provide the source of truth for the deployed site version. The deploy workflow reads `PUBLIC_SITE_VERSION` from:

```sh
git describe --tags --always --dirty
```

The generated head metadata and site footer include that value.
