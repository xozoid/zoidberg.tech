import imgBonnetGap from "src/assets/logs/2026/2026-07-25-mg-bonnet-gap.jpg";
import imgDiff from "src/assets/logs/2026/2026-07-25-mg-differential.jpg";
import type { LogEntry } from "src/content/logs/types";

const mgBaselining = {
  title: "Establishing the roadster baseline",
  slug: "2026-07-25-baselining-the-mg",
  icon: "straighten",

  date: "2026-07-25",

  summary: [
    "Documenting the MG before disassembly: 164 reference photos, body-panel measurements, drivetrain checks, and the first restoration baseline data.",
  ],

  tags: ["MG Midget", "Restoration", "Measurement", "Documentation"],

  project: {
    label: "MG electric conversion",
    href: "/artifacts/mg-midget",
  },

  stats: [
    { label: "Photos", value: "164" },
    { label: "Measurements", value: "28" },
    { label: "Differential", value: "≈ 3.9:1", class: "font-mono" },
    { label: "Activity", value: "Baseline survey" },
  ],

  details: [
    `
    <h2>Document first, disassemble second</h2>
    <p>
      Before taking the MG apart, I wanted a thorough record of how the car fit
      together and how its panels currently arrange. Restoration work has a habit of
      erasing evidence once brackets, wiring, hoses, trim, and drivetrain components
      begin disappearing into labeled boxes.
    </p>
    <p>
      I took 164 photographs covering the exterior, engine bay, interior,
      underside, suspension, wiring, hoses, lines, fasteners, and other details that
      may become useful during reassembly.
    </p>

    <h2>Removing the bonnet</h2>
    <p>
      I began disassembly by removing the bonnet early in the session. Moving the
      panel aside improved access to the engine bay for photography, inspection, and
      measurement.
    </p>
    <p>
      I photographed the bonnet, hinges, fasteners, and existing alignment before
      removal.
    </p>

    <h2>Panel gaps and body alignment</h2>
    <p>
      I measured the major panel gaps around the bonnet, doors, and rear bodywork.
      These values provide a reference rather than targets for the finished car. They
      record body condition before structural repairs, blasting, and paint change
      anything.
    </p>
    <p>
      Recording both the dimensions and their locations should make it easier to
      distinguish existing asymmetry from movement introduced during restoration.
    </p>
    `,
    {
      type: "image",
      src: imgBonnetGap,
      alt: "Tape measure spanning the gap between the MG Midget's bonnet and front body panel",
      caption:
        "One of the measured bonnet gaps, recorded before removing the panel.",
    },
    `
    <h2>Checking the differential ratio</h2>
    <p>
      A Datsun A12 engine and transmission already replace the original drivetrain,
      so I measured the rear differential rather than trusting the vehicle's original
      specification.
    </p>
    <p>
      With one rear wheel held stationary, I rotated the driveshaft ten turns and
      observed approximately 5.2 turns at the free wheel. Accounting for the open
      differential gives:
    </p>

    <pre><code>10 / 5.2 × 2 ≈ 3.85</code></pre>

    <p>
      The calculation supports a nominal 3.9:1 differential. I will use 3.9:1 as the
      drivetrain baseline for later EV motor and gearing calculations.
    </p>`,
    {
      type: "image",
      src: imgDiff,
      alt: "MG Midget rear axle, leaf spring, and driveshaft viewed from underneath the car",
      caption:
        "The existing rear axle and driveline before conversion work begins.",
    },

    `
    <h2>Purpose of this baseline</h2>
    <p>
      This session focused on documentation rather than physical progress. I made that
      choice intentionally. These photographs and measurements create a reference point
      for body repair, drivetrain packaging, battery-box design, suspension work,
      and eventual reassembly.
    </p>
    `,
  ],
} satisfies LogEntry;

export default mgBaselining;
