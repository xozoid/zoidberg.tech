import imgAllTrays from "src/assets/artifacts/tm/all-trays.jpg";
import imgCase from "src/assets/artifacts/tm/case.jpg";
import imgComponentTray from "src/assets/artifacts/tm/component-tray.jpg";
import imgPaintedTiles from "src/assets/artifacts/tm/painted-tiles.jpg";

export const tm = {
  title: "Terraforming Mars box",
  icon: "chess",
  summary: [
    "A custom Pelican-case storage system for Terraforming Mars, its expansions, upgraded player components, and a large collection of 3D-printed tiles.",
  ],
  tags: ["CAD", "3D printing", "Product design", "Board games"],
  stats: [
    { label: "Status", value: "Complete" },
    { label: "Started", value: "Apr 2021", class: "font-mono" },
    { label: "Finished", value: "May 2021", class: "font-mono" },
    { label: "Type", value: "Board game storage" },
    { label: "Role", value: "Personal project" },
  ],
  links: [
    {
      icon: "code",
      label: "Repository",
      href: "https://github.com/xozoid/Terraforming-Mars",
    },
  ],
  details: [
    `
    <h2>Everything in one case</h2>
    <p>
      This project started because Terraforming Mars had grown well beyond its original
      box. I wanted one transportable case that could hold the base game, the
      expansions, upgraded player components, and a large set of printed replacement
      terrain.
    </p>
    <p>
      The final design fits the collection into a Pelican 1400 case using custom trays
      modeled around the actual components.
    </p>`,
    {
      type: "image",
      src: imgCase,
      alt: "Black Pelican case labeled with geeky references stickers",
      caption:
        "The complete Terraforming Mars collection packed into a single Pelican 1400 case.",
    },
    `
    <h2>Packing by function</h2>
    <p>
      The interior uses dedicated tree, city, and card trays rather than a collection of
      generic bins. The trays accommodate greenery and ocean tiles, cities, colonies,
      trade fleets, and player mats. They also hold resource cubes, political components,
      tracking markers, cards, maps, rulebooks, and the many smaller pieces accumulated
      across the expansions.
    </p>`,
    {
      type: "image",
      src: imgAllTrays,
      alt: "Terraforming Mars boards, maps, player mats, cards, resource cubes, tiles, and custom trays arranged on a table",
      caption:
        "The storage system unpacked, showing the trays and component groups outside the case.",
    },
    {
      type: "image",
      src: imgComponentTray,
      alt: "Open Pelican case with printed trays holding Terraforming Mars resource cubes, markers, ships, and other game pieces",
      caption:
        "The top tray layer with resource cubes, markers, fleets, and small components held in fixed compartments.",
    },
    `
    <h2>Designing around fabrication</h2>
    <p>
      Some tray components exceeded my printer's build volume, so I split the parts for
      printing and bonded them back together with cyanoacrylate. The injection-molded
      case also had a slight warp, requiring printed shims. Shallow tiles needed retained
      foam so they would not migrate when someone turned over the closed case.
    </p>
    <p>
      Those details turned the project from basic compartment modeling into a small
      exercise in tolerance, assembly, and designing around imperfect manufactured parts.
    </p>`,
    {
      type: "image",
      src: imgPaintedTiles,
      alt: "Close-up of hand-painted 3D-printed Terraforming Mars terrain with a mushroom cloud, cities, greenery, and red resource cubes",
      caption:
        "Hand-painted replacement terrain pieces printed during organizer design phase",
    },
    `

    <h2>Painting Everything</h2>
    <p>
      I also printed replacements for many of the game's cities, greenery, and unique
      tiles. Hand-painting that collection required more manual work than
      designing the box. The end result seems excessive for a board-game organizer, which
      explains why I like it.
    </p>
  `,
  ],
} as const;
