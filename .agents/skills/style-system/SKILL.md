---
name: style-system
description:
  Use when changing visual design, Tailwind CSS v4 tokens, light/dark themes,
  buttons, prose, typography, icon styling, or the style test page.
---

# Style System

## Scope

The visual system is custom Tailwind CSS v4 CSS-first configuration.

Core paths:

- `src/styles/global.css` imports all style layers, defines theme tokens, custom
  variants, base styles, shared layout, footer, and the `icon` element.
- `src/styles/buttons.css` defines `btn`, `btn-filled`, `btn-outlined`,
  `btn-text`, size utilities, and square button behavior.
- `src/styles/prose.css`, `fonts.css`, and `effects.css` hold prose, font, and
  effect utilities.
- `src/pages/style.astro` is the visual regression and token sample page.
- `src/layouts/BaseLayout.astro` loads fonts, Material Symbols, global CSS,
  footer controls, and theme bootstrap script.

## Design Rules

- Keep the terminal-inspired, high-contrast Material-style palette: cyan
  primary, teal secondary, violet tertiary, neutral surfaces.
- When changing a color token, update both dark defaults and the `html` light
  variant unless the token is intentionally theme-specific.
- Use semantic tokens (`bg-surface-container`, `text-on-surface`,
  `text-primary`) instead of one-off hex colors in markup.
- Prefer existing button utilities over ad hoc button classes.
- The custom `<icon>` element uses Material Symbols. Use symbol names as text
  content.
- Keep compact UI compact. Do not introduce large landing-page sections unless
  the user explicitly asks for one.
- Maintain mobile constraints for grid-heavy style samples. Check that labels do
  not overflow narrow screens.

## Tailwind v4 Patterns

- Define design tokens inside `@theme`.
- Define state selectors with `@custom-variant`.
- Define reusable component utilities with `@utility`.
- Use `@apply` for local composition where this repo already does.
- Keep imported style file order in `global.css` deliberate: buttons, effects,
  fonts, prose.

## Validation

Run checks based on the visual change:

- `npm run build` for Tailwind/Astro CSS compilation.
- `npm run check` for Astro diagnostics.
- `npm run format:check` after touching `.astro`, `.css`, or `.ts` files.
- Inspect `src/pages/style.astro` when changing shared tokens, typography,
  prose, buttons, or icons.
