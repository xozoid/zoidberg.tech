---
name: optimized-image
description:
  Use when adding, replacing, or reviewing images that should render through
  src/components/OptimizedImage.astro in this Astro site, especially artifact
  detail images imported from src/assets, responsive WebP output, blurred
  previews, image captions, or conversions from inline image markup to the
  optimized image detail block format.
---

# Optimized Image

## Scope

Use `src/components/OptimizedImage.astro` for local, content-bearing artifact
images that should get Astro asset processing, responsive WebP output, a blurred
preview, and an optional caption.

The component expects:

```ts
interface Props {
  src: ImageMetadata;
  alt: string;
  caption?: string;
}
```

## Usage

Import images from `src/assets`, then add an image detail object to the
artifact's `details` array:

```ts
import exampleImage from "src/assets/artifacts/example/example.jpg";

details: [
  `
  <h2>Section heading</h2>
  <p>Text before the image.</p>`,
  {
    type: "image",
    src: exampleImage,
    alt: "Specific description of the visible image content",
    caption: "Short caption that adds context.",
  },
  `
  <p>Text after the image.</p>`,
],
```

`src/pages/artifacts/[slug].astro` detects `{ type: "image" }` detail blocks and
renders
`<OptimizedImage src={detailBlock.src} alt={detailBlock.alt} caption={detailBlock.caption} />`.

## Rules

- Keep source images under `src/assets`, not `public`, because `OptimizedImage`
  requires Astro `ImageMetadata` with a local `fsPath`.
- Use imported image modules for `src`; do not pass string URLs such as
  `"/static/example.jpg"`.
- Use this component for real content images. Keep tiny icons, generated brand
  assets, and decorative CSS backgrounds outside this flow.
- Write concrete `alt` text that describes the visible subject. Do not repeat
  the caption unless the caption is the only meaningful context.
- Omit `caption` when it adds no useful information.
- Do not wrap the component in prose HTML manually. Use the detail object form
  so the artifact route owns rendering consistently.

## Component Behavior

`OptimizedImage.astro` creates two outputs:

- A 2400px-wide WebP link target with quality 90 through `getImage`.
- A responsive `<Image>` at width 1600 with widths `[480, 768, 1200, 1600]`,
  WebP format, quality 82, lazy loading, and async decoding.

It also generates a 50px-wide blurred WebP preview with `sharp` from the local
filesystem path. If the imported asset does not expose `fsPath`, the component
throws during build.

The fade and layout classes live in `src/styles/images.css`:

- `optimized-image-link`
- `optimized-image-preview`
- `optimized-image-full`
- `optimized-image-loaded`

## Validation

After adding or changing optimized images, run the checks that match the edit:

- `npm run check` for Astro and TypeScript diagnostics.
- `npm run build` when adding image assets or changing image rendering.
- `npm run lint:prose` when changing artifact prose, captions, or alt text.
