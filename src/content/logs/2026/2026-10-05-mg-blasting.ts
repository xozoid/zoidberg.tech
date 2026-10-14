import imgBare from "src/assets/logs/2026/2026-10-05-mg-bare.jpg";
import imgTumbler from "src/assets/logs/2026/2026-10-05-tumbler.jpg";
import imgPrimed from "src/assets/logs/2026/2026-10-05-primed.jpg";
import type { LogEntry } from "src/content/logs/types";

const mgBlasting = {
  title: "Stripping, blasting, and priming the MG Midget",
  slug: "2026-10-05-mg-blasting",
  icon: "brush",

  date: "2026-10-05",

  summary: [
    "Stripped the MG Midget, cleaned decades of accumulated grime, and had the body and panels media blasted and coated in 2K epoxy primer.",
  ],

  tags: ["MG Midget", "Restoration", "Bodywork", "Paint"],
  allTags: [
    "MG Midget",
    "EV conversion",
    "Restoration",
    "Bodywork",
    "Media blasting",
    "Epoxy primer",
    "Paint",
    "Disassembly",
    "Rust removal",
  ],

  project: {
    label: "MG electric conversion",
    href: "/artifacts/mg-midget",
  },

  stats: [
    { label: "Activity", value: "Body stripping and priming" },
    { label: "Coating", value: "FP420 2K epoxy primer" },
    { label: "Status", value: "Bare chassis" },
  ],

  details: [
    `
    <h2>Taking everything apart</h2>
    <p>
      With the drivetrain already removed, the next step was to strip the rest
      of the MG down to its bare shell.
      Everything came off, including the suspension, wiring, interior, and
      remaining hardware.
    </p>
    <p>
      Every fastener was sorted and labeled in tray organizers during
      disassembly.
      A surprising number of small parts hold a car together, and keeping track
      of them now should make reassembly considerably easier.
    </p>
    `,
    {
      type: "image",
      src: imgBare,
      alt: "MG Midget stripped to its bare body shell in the workshop",
      caption:
        "The MG stripped down to its bare shell, ready for cleaning and blasting.",
      size: "lg",
    },
    `
    <h2>Cleaning up 49 years of grime</h2>
    <p>
      Disassembly was followed by a thorough cleaning.
      Five decades of accumulated oil, grease, dirt, and road grime had coated
      just about every surface, particularly underneath the car.
    </p>
    <p>
      I cleaned everything I could reach before sending the body out for
      blasting.
      Removing the heavy contamination beforehand meant the blasting could focus
      on stripping the old paint and corrosion rather than fighting layers of
      grease.
    </p>
    `,
    {
      type: "image",
      src: imgTumbler,
      alt: "Stripped MG Midget body mounted sideways on a wooden support fixture",
      caption:
        "The body positioned on its side, exposing the underside for cleaning and inspection.",
      size: "lg",
    },
    `
    <h2>Media blasting and epoxy primer</h2>
    <p>
      Tyson Spencer of
      <a href="https://northwestmobileblasting.com/" target="_blank" rel="noopener noreferrer">Northwest Mobile Blasting LLC</a>
      blasted the chassis, quarter panels, doors, bonnet, and boot lid.
    </p>
    <p>
      After blasting, Tyson coated the freshly stripped metal with FP420
      two-component epoxy primer.
      This provides a corrosion-resistant foundation while the remaining
      fabrication and bodywork are completed.
    </p>
    `,
    {
      type: "image",
      src: imgPrimed,
      alt: "MG Midget body shell after media blasting and gray epoxy priming",
      caption: "The freshly blasted body coated in 2K epoxy primer.",
      size: "lg",
    },
    `
    <h2>Ready for fabrication</h2>
    <p>
      The car has been transformed.
      What started as a weathered, disassembled car is now a clean, primed
      shell.
    </p>
    <p>
      With the old coatings and grime removed, the body is much easier to
      inspect and work on.
      The next stages of the restoration and electric conversion can proceed
      from a clean foundation, including any welding, structural modifications,
      and suspension mounting changes that become necessary.
    </p>
    `,
  ],
} satisfies LogEntry;

export default mgBlasting;
