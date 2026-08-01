import imgOriginalState from "src/assets/artifacts/mg-midget/original-state.jpg";

export const mgMidget = {
  title: "1977 MG Midget EV Conversion",
  icon: "directions_car",
  summary: [
    "Engineering a lightweight electric drivetrain through vehicle modeling, component selection, packaging, and hands-on restoration.",
  ],
  tags: ["EV conversion", "Vehicle modeling", "Automotive", "Restoration"],
  stats: [
    { label: "Status", value: "In progress" },
    { label: "Started", value: "Apr 2026", class: "font-mono" },
    { label: "Type", value: "Vehicle / EV conversion" },
    { label: "Role", value: "Personal project" },
  ],
  links: [
    {
      icon: "code",
      label: "Repository",
      href: "https://github.com/xozoid/mg-midget-ev",
    },
  ],
  details: [
    `
    <h2>An old sports car, minus the old drivetrain</h2>
    <p>
      This project rebuilds and electrifies a 1977 MG roadster. The car arrived already
      modified with a Datsun A12 engine and transmission,
      so preservation never drove the goal.
    </p>
    <p>
      I want to keep the character that makes the car entertaining: light weight,
      direct controls, low seating position, and compact dimensions. The new drivetrain
      should make the car quieter and more responsive.
    </p>`,
    {
      type: "image",
      src: imgOriginalState,
      alt: "Maroon 1977 MG Midget sitting on a U-Haul trailer outside an industrial building",
      caption:
        "The MG Midget as acquired, before disassembly and EV conversion work began.",
    },
    `
    <h2>Engineering before fabrication</h2>
    <p>
      Before buying the major EV components I built a vehicle model to compare motors,
      battery configurations, gearing, weight, range, top speed, and hill-climbing
      performance.
    </p>
    <p>
      Rather than optimize for peak power, the design works around the car itself. The
      targets include keeping the converted car light, retaining useful
      local-driving range, maintaining highway-capable speed, and climbing the grades
      around Pullman without exceeding continuous motor or battery limits.
    </p>

    <h2>Measuring the real car</h2>
    <p>
      A model helps only when its assumptions resemble the vehicle, so I have collected
      measurements before disassembly. One experiment used repeated
      bidirectional coast-down runs while logging GPS speed, barometric pressure, and
      temperature.
    </p>
    <p>
      Fitting those runs to a basic vehicle-resistance model provides empirical estimates
      for rolling resistance and aerodynamic drag rather than relying entirely on generic
      values for a 1970s roadster.
    </p>
<!--
    <h2>Restoration and packaging</h2>
    <p>
      The next stage is much more physical: disassemble and document the car, repair the
      body, restore the suspension and driveline components that remain useful, and design
      battery enclosures around the available structure.
    </p>
    <p>
      Packaging matters as much as electrical performance. Battery boxes affect weight
      distribution, ground clearance, crash structure, serviceability, and ultimately
      whether the conversion still feels like a Midget.
    </p>

    <h2>The goal</h2>
    <p>
      I'm not trying to build the fastest electric MG. The target is a small, torquey,
      low-center-of-gravity car with go-kart manners and enough range that I rarely need
      to think about it for local driving.
    </p>
    <p>
      The project is also an excuse to combine a lot of things I enjoy: modeling,
      electronics, mechanical design, fabrication, controls, data analysis, and learning
      whichever skill becomes necessary next.
    </p>
-->
  `,
  ],
} as const;
