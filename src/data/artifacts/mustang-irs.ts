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
  details: `
    <h2>Turning a mockup into a buildable suspension</h2>
    <p>
      During my junior year of high school, one of the mentors in my robotics club asked
      for help with his 1968 Mustang project. The project replaced the original rear
      suspension with an independent rear suspension from a 1976 Jaguar XJ12.
    </p>
    <p>
      My role took his wooden mockup and turned it into a complete CAD design and
      technical drawing set for the custom support frame.
    </p>

    <figure>
      <img src="/static/todo.jpg" alt="CAD render of Jaguar IRS conversion in a 1968 Mustang" />
      <figcaption>The Jaguar IRS conversion modeled in the 1968 Mustang.</figcaption>
    </figure>

    <h2>Packaging the Jaguar hardware</h2>
    <p>
      I modeled the structure in Autodesk Inventor using welded assemblies, polyurethane
      bearings, the original Jaguar linkages, and shocks. The frame had to fit around the
      existing Mustang body while locating the suspension so the finished car would sit at
      the intended ride height.
    </p>

    <figure>
      <img src="/static/todo.jpg" alt="Fabrication drawing for the Mustang IRS support frame" />
      <figcaption>One of the fabrication drawings produced from the CAD assembly.</figcaption>
    </figure>

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
    </p>

    <figure>
      <img src="/static/todo.jpg" alt="Fabricated Mustang IRS support frame before installation" />
      <figcaption>The fabricated IRS support frame before installation.</figcaption>
    </figure>

    <figure>
      <img src="/static/todo.jpg" alt="Completed Jaguar IRS conversion installed in the Mustang" />
      <figcaption>The completed conversion installed in the Mustang.</figcaption>
    </figure>
  `,
} as const;
