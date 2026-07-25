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
      href: "https://github.com/WattsUp/Terraforming-Mars",
    },
  ],
  details: `
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
    </p>

    <figure>
      <img src="/static/todo.jpg" alt="Completed Terraforming Mars storage system" />
      <figcaption>The complete Terraforming Mars storage system.</figcaption>
    </figure>

    <h2>Packing by function</h2>
    <p>
      The interior uses dedicated tree, city, and card trays rather than a collection of
      generic bins. The trays accommodate greenery and ocean tiles, cities, colonies,
      trade fleets, and player mats. They also hold resource cubes, political components,
      tracking markers, cards, maps, rulebooks, and the many smaller pieces accumulated
      across the expansions.
    </p>

    <figure>
      <img src="/static/todo.jpg" alt="Trays removed from case" />
      <figcaption>The main organizers and game components outside the case.</figcaption>
    </figure>

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
    </p>

    <figure>
      <img src="/static/todo.jpg" alt="Painted 3D-printed Terraforming Mars terrain tiles" />
      <figcaption>Painted cities, greenery, and unique replacement tiles.</figcaption>
    </figure>

    <h2>Painting Everything</h2>
    <p>
      I also printed replacements for many of the game's cities, greenery, and unique
      tiles. Hand-painting that collection required more manual work than
      designing the box. The end result seems excessive for a board-game organizer, which
      explains why I like it.
    </p>
  `,
} as const;
