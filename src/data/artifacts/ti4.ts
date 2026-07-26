import imgFactionsMinis from "src/assets/artifacts/ti4/factions-minis.jpg";
import imgHexesDiceCardboard from "src/assets/artifacts/ti4/hexes-dice-cardboard.jpg";
import imgPackedBox from "src/assets/artifacts/ti4/packed-box.jpg";

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
  details: [
    `
    <h2>The storage problem</h2>
    <p>
      Twilight Imperium turns setup into a project of its own. The base game and
      expansions contain many faction components, cards, tiles, tokens, and player pieces.
    </p>
    <p>
      I designed a custom insert and box system so those parts could stay organized
      between games and move from storage to the table with less sorting.
    </p>`,
    {
      type: "image",
      src: imgPackedBox,
      alt: "Twilight Imperium box filled with custom trays holding rulebooks, cards, boards, tokens, and game components",
      caption:
        "The packed Twilight Imperium storage system with the main organizer layers in place.",
    },
    `
    <h2>Designed around the game</h2>
    <p>
      Instead of treating the interior as one generic organizer, I modeled storage around
      the game's component hierarchy. The CAD repository includes dedicated player boxes,
      faction storage, hex storage, component organizers, an agenda holder, and other
      printed parts.
    </p>`,
    {
      type: "image",
      src: imgFactionsMinis,
      alt: "Custom Twilight Imperium trays holding faction hexes, fleet trays in player colors, map tiles, and cards",
      caption:
        "Faction and player trays organized around the way components move from box to table.",
    },
    {
      type: "image",
      src: imgHexesDiceCardboard,
      alt: "Twilight Imperium faction pucks, dice, and tokens arranged in printed organizers on a table",
      caption:
        "Faction pucks, dice, and cardboard sorted into dedicated printed storage.",
    },
    `
    <h2>A practical CAD exercise</h2>
    <p>
      Board-game inserts make a useful mechanical-design exercise. Every millimeter of
      volume matters, printed parts need realistic clearances, components must remain
      quick to retrieve, and the final arrangement has to survive transport.
    </p>
    <p>
      Unlike a CAD model made only to look correct on screen, every mistake in an organizer
      becomes visible the first time the game gets packed.
    </p>`,
  ],
} as const;
