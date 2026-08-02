import imgAssembled from "src/assets/artifacts/mustang-irs/assembled.png";
import imgDrawing from "src/assets/artifacts/mustang-irs/drawing.png";
import imgInstalled from "src/assets/artifacts/mustang-irs/installed.png";
import imgRender from "src/assets/artifacts/mustang-irs/render.png";

export const mustangIrs = {
  title: "1968 Mustang Independent Rear Suspension",
  icon: "directions_car",
  summary: [
    "Converted a wood mockup for a Jaguar independent-rear-suspension swap into a complete CAD design and fabrication drawing set for a 1968 Mustang.",
    "The fabricator built and installed the finished assembly, then used it successfully in competitive autocross.",
  ],
  tags: ["CAD", "Mechanical design", "Technical drawings", "Automotive"],
  stats: [
    { label: "Status", value: "Complete" },
    { label: "Started", value: "Dec 2015", class: "font-mono" },
    { label: "Finished", value: "Jul 2016", class: "font-mono" },
    { label: "Type", value: "Automotive suspension design" },
    { label: "Role", value: "Freelance CAD designer" },
  ],
  links: [],
  details: [
    `
    <h2>Turning a mockup into a buildable suspension</h2>
    <p>
      During my junior year of high school, one of the mentors in my robotics club asked
      for help with his 1968 Mustang project. The project replaced the original rear
      suspension with an independent rear suspension from a 1976 Jaguar XJ12.
    </p>
    <p>
      My role took his wooden mockup and turned it into a complete CAD design and
      technical drawing set for the custom support frame.
    </p>`,
    {
      type: "image",
      src: imgRender,
      alt: "CAD rendering of a Jaguar independent rear suspension and support frame",
      caption:
        "The Jaguar IRS conversion modeled around the 1968 Mustang packaging constraints.",
      size: "lg",
    },
    `
    <h2>Packaging the Jaguar hardware</h2>
    <p>
      I modeled the structure in Autodesk Inventor using welded assemblies, polyurethane
      bearings, the original Jaguar linkages, and shocks. The frame had to fit around the
      existing Mustang body while locating the suspension so the finished car would sit at
      the intended ride height.
    </p>`,
    {
      type: "image",
      src: imgDrawing,
      alt: "Technical fabrication drawing for a machined Mustang IRS support frame detail with dimensions and an isometric part view",
      caption:
        "One fabrication drawing from the custom IRS support-frame package.",
    },
    `
    <h2>From CAD to autocross</h2>
    <p>
      The fabricator built and installed the design the following summer. Unlike a school
      CAD exercise, this one immediately became structural hardware under a real car.
    </p>
    <p>
      The completed conversion later went through road testing and competitive autocross.
      I watched a rough physical concept move through CAD and drawings into a working
      vehicle. That made this one of my earliest projects where engineering documentation
      directly enabled fabrication.
    </p>`,
    {
      type: "image",
      src: imgAssembled,
      alt: "Fabricated Mustang IRS support frame with blue brackets, springs, shocks, and Jaguar suspension components on a shop floor",
      caption:
        "The fabricated support frame and Jaguar suspension hardware before installation.",
    },
    {
      type: "image",
      src: imgInstalled,
      alt: "Blue independent rear suspension assembly installed under the rear of a 1968 Mustang",
      caption: "The completed IRS conversion installed under the Mustang.",
    },
  ],
} as const;
