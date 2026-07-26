import imgBadge from "src/assets/artifacts/badge-life/badge.jpg";

export const badgeLife = {
  title: "Badge Life",
  icon: "badge",
  summary: [
    "An over-engineered PCB ID holder that turns an ordinary work badge into a piece of RF-themed electronic art.",
    "An early experiment in treating a printed circuit board as both a mechanical material and a visual medium.",
  ],
  tags: ["PCB design", "RF", "Fabrication", "Artwork"],
  stats: [
    { label: "Status", value: "Complete" },
    { label: "Started", value: "Nov 2019", class: "font-mono" },
    { label: "Finished", value: "Mar 2020", class: "font-mono" },
    { label: "Type", value: "PCB artwork" },
    { label: "Role", value: "Personal project" },
  ],
  links: [
    {
      icon: "code",
      label: "Repository",
      href: "https://github.com/WattsUp/BadgeLife",
    },
  ],
  details: [
    `
    <h2>A badge for engineers</h2>
    <p>
      Badge Life started with a small idea: if I had to wear an ID card every day,
      the holder might as well look interesting. Instead of designing a conventional
      plastic enclosure, I treated the PCB itself as both the structure and the artwork.
    </p>
    <p>
      The result uses intentionally non-functional electronics. The copper creates a
      circuit-like surface, explores RF geometry, and makes an otherwise mundane object
      feel like a compact engineering artifact.
    </p>`,
    {
      type: "image",
      src: imgBadge,
      alt: "Two black PCB badge holder frames with gold circuit artwork around rectangular ID openings",
      caption: "The finished three-board PCB badge holder.",
    },
    `
    <h2>RF as artwork</h2>
    <p>
      RF-inspired details fill the board: trace antennas, a Sierpiński fractal antenna,
      and a trace capacitor. It also includes microstrip impedance-matching networks and
      a region where PCB traces play a miniature game of Snake.
    </p>
    <p>
      I never intended those structures to operate. The project gave me an excuse to take
      design elements normally driven by electrical requirements and use them purely as
      visual language.
    </p>

    <h2>PCB as a mechanical material</h2>
    <p>
      The mechanical design pleased me more than the electrical artwork. The fabricator
      machined retaining clips directly into the PCB outline, and they worked on the
      first fabrication attempt.
    </p>
    <p>
      The finished holder sandwiches three boards reflowed together. That assembly
      method worked, although heat-induced warping showed where another revision could
      improve the mechanical process.
    </p>
  `,
  ],
} as const;
