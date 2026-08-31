import imgHoneyComparison from "src/assets/logs/2026/2026-08-15-honey-comparison.jpg";
import imgHoneyFiltering from "src/assets/logs/2026/2026-08-15-honey-filtering.jpg";
import type { LogEntry } from "src/content/logs/types";

const honeyHarvest = {
  title: "Harvesting 17 kg of honey",
  slug: "2026-08-15-honey-harvest",
  icon: "hive",

  date: "2026-08-15",

  summary: [
    "Harvested 17.1 kg of honey from two hives, with different colors from the Caucasian bees and Clarkston mutts.",
  ],

  tags: ["Beekeeping", "Honey", "Harvest"],
  allTags: [
    "Beekeeping",
    "Honey",
    "Harvest",
    "Honey bees",
    "Caucasian bees",
    "Italian bees",
    "Carniolan bees",
    "Honey extraction",
  ],

  stats: [
    { label: "Total harvest", value: "17.1 kg", class: "font-mono" },
    { label: "Caucasian hive", value: "13.4 kg", class: "font-mono" },
    { label: "Clarkston mutts", value: "3.7 kg", class: "font-mono" },
    { label: "Stings", value: "≈ 5", class: "font-mono" },
  ],

  details: [
    `
    <h2>Two hives, two distinct honeys</h2>
    <p>
      I co-parent approximately 60,000 bees across two hives. We harvested
      honey from both this year. The Caucasian hive produced 13.4 kg of lighter
      honey, while the Clarkston mutts, Italian-Carniolan
      cross-breeds, produced 3.7 kg of darker honey.
      Both taste great.
    </p>
    `,
    {
      type: "image",
      src: imgHoneyComparison,
      alt: "Two jars showing the lighter honey from the Caucasian hive and darker honey from the Italian-Carniolan hive",
      caption:
        "Caucasian honey on the left and Clarkston-mutt honey on the right.",
      size: "lg",
    },

    `
    <h2>Extraction</h2>
    <p>
      I pulled the honey supers and extracted the frames by spinning them. The
      extractor throws the honey out of the comb, after which it can be
      collected and filtered.
    </p>

    <p>
      I also ate some comb directly. Between that and everything else
      sampled during extraction, I probably ate about a quarter cup of honey
      that day.
    </p>
    `,
    {
      type: "image",
      src: imgHoneyFiltering,
      alt: "Freshly extracted honey flowing into a filter with pieces of beeswax comb",
      caption: "Fresh honey draining through the filter after extraction.",
    },

    `
    <h2>The bees would like their boxes back</h2>
    <p>
      Returning the supers became chaotic. It had started raining,
      which meant most of the bees had moved back inside the hive. They were
      unhappy about me opening it again.
    </p>

    <p>
      What followed resembled a Benny Hill skit. An increasingly angry hive,
      a box that didn't make it back onto the hive, and a bee stuck in my hair
      made for a memorable few minutes. I ended up with about five stings.
    </p>

    <h2>Let the bees do the dishes</h2>
    <p>
      Cleanup was easier. I placed the extraction equipment with its remaining
      honey residue outside and let the local bees find it. They descended on
      the equipment. Many enthusiastic bees licked essentially everything clean
      in less than eight hours.
    </p>

    <p>
      Final yield was 17.1 kg of honey, with the Caucasian hive accounting
      for about four-fifths of the harvest.
    </p>
    `,
  ],
} satisfies LogEntry;

export default honeyHarvest;
