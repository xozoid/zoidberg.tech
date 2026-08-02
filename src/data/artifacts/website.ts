import imgMk1 from "src/assets/artifacts/website/mk-1.png";
import imgMk2 from "src/assets/artifacts/website/mk-2.png";

export const website = {
  title: "zoidberg.tech",
  icon: "book_2",
  featured: true,
  summary: [
    "The current version of my personal website: part portfolio, part public notebook, and part excuse to keep experimenting with web tooling.",
  ],
  tags: ["Astro", "TypeScript", "Tailwind CSS", "Web development"],
  allTags: [
    "Astro",
    "TypeScript",
    "Tailwind CSS",
    "Web development",
    "Static site",
    "Vite",
    "Personal website",
    "Portfolio",
    "Content modeling",
    "Responsive design",
    "GitHub Actions",
    "GitHub Pages",
    "Sharp",
    "Playwright",
    "Prettier",
    "Vale",
  ],
  stats: [
    { label: "Status", value: "In progress" },
    { label: "Started", value: "Jun 2026", class: "font-mono" },
    { label: "Type", value: "Personal website" },
    { label: "Role", value: "Personal project" },
  ],
  links: [
    {
      icon: "code",
      label: "Repository",
      href: "https://github.com/xozoid/zoidberg.tech",
    },
  ],
  details: [
    `
    <h2>The website you have open</h2>
    <p>
      zoidberg.tech continues a personal website I have maintained in many forms for
      years. I use it as a portfolio, a public notebook, and a home for
      projects that need more than the few lines available on a résumé.
    </p>`,
    {
      type: "image",
      src: imgMk2,
      alt: "Dark zoidberg.tech welcome screen with a glowing cyan Z logo, system-engineering subtitle, and terminal-style controls",
      caption:
        "The current zoidberg.tech welcome screen and Xenon Core visual language.",
      size: "sm",
    },
    `
    <h2>Why rebuild it</h2>
    <p>
      My previous site accumulated years of hand-written HTML, CSS, JavaScript,
      interactive résumé pages, project pages, tools, and experiments. Rather than
      continue renovating that structure indefinitely, I started over in 2026 with a
      smaller architecture and a clearer content model.
    </p>`,
    {
      type: "image",
      src: imgMk1,
      alt: "Pixel-art bradleydavis.tech website scene with a small character, Mars rover, trees, and an engine of a rocket",
      caption:
        "An earlier personal-site iteration built around a pixel-art interactive scene.",
    },
    `
    <h2>Static by default</h2>
    <p>
      The new site uses Astro, TypeScript, and Tailwind CSS. Most pages contain content
      rather than applications, so static HTML keeps the architecture small while still
      leaving room for interactive components where they add value.
    </p>
    <p>
      Projects, résumé information, and other repeated content live as structured data
      rather than copied markup.
    </p>

    <h2>A place for unfinished things</h2>
    <p>
      Maintaining a personal website stays interesting because it never becomes finished.
      This version gives experiments, side projects, and work in progress somewhere to
      live before each item turns into a conventional portfolio piece.
    </p>`,
  ],
} as const;
