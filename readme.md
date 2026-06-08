# zoidberg.tech

Personal static website built with Astro and Tailwind CSS v4.

## Commands

```sh
npm run dev
npm run check
npm run format:check
npm run build
```

## Deployment

GitHub Actions builds the static site and deploys `dist` to GitHub Pages when a GitHub release is published. The production URL is `https://zoidberg.tech`.

Git tags are the source of truth for the deployed site version. The deploy workflow sets `PUBLIC_SITE_VERSION` from:

```sh
git describe --tags --always --dirty
```

That value is included in the generated head metadata and site footer.
