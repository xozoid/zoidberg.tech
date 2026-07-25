export const ti4 = {
  title: "Twilight Imperium 4 box",
  icon: "chess",
  summary: [
    "A custom storage system for Twilight Imperium 4 and its expansions, designed around faster setup, organized play, and fitting an unreasonable amount of cardboard into one box.",
  ],
  tags: ["CAD", "3D printing", "Product design", "Board games"],
  stats: [
    { label: "Status", value: "Complete" },
    { label: "Started", value: "Mar 2023", class: "font-mono" },
    { label: "Finished", value: "Mar 2023", class: "font-mono" },
    { label: "Type", value: "Board game storage" },
    { label: "Role", value: "Personal project" },
  ],
  links: [
    {
      icon: "code",
      label: "Repository",
      href: "https://github.com/WattsUp/TI4",
    },
  ],
  details: `
    <h2>The storage problem</h2>
    <p>
      Twilight Imperium turns setup into a project of its own. The base game and
      expansions contain many faction components, cards, tiles, tokens, and player pieces.
    </p>
    <p>
      I designed a custom insert and box system so those parts could stay organized
      between games and move from storage to the table with less sorting.
    </p>

    <figure>
      <img src="/static/todo.jpg" alt="Completed Twilight Imperium storage system" />
      <figcaption>The full organizer packed into the game box.</figcaption>
    </figure>

    <h2>Designed around the game</h2>
    <p>
      Instead of treating the interior as one generic organizer, I modeled storage around
      the game's component hierarchy. The CAD repository includes dedicated player boxes,
      faction storage, hex storage, component organizers, an agenda holder, and other
      printed parts.
    </p>

    <figure>
      <img src="/static/todo.jpg" alt="Player and faction organizers" />
      <figcaption>Individual trays removed from the main box.</figcaption>
    </figure>

    <h2>A practical CAD exercise</h2>
    <p>
      Board-game inserts make a useful mechanical-design exercise. Every millimeter of
      volume matters, printed parts need realistic clearances, components must remain
      quick to retrieve, and the final arrangement has to survive transport.
    </p>
    <p>
      Unlike a CAD model made only to look correct on screen, every mistake in an organizer
      becomes visible the first time the game gets packed.
    </p>
  `,
} as const;
