export const tahomaRobotics = {
  title: "Bear Metal - FRC Team 2046",
  icon: "precision_manufacturing",
  summary: [
    "Five years designing and fabricating competition robots with Bear Metal, progressing from shop work to Design Lead.",
    "This made CAD, machining, mechanical design, iteration, and building under a hard deadline normal to me.",
  ],
  tags: ["Robotics", "CAD", "Mechanical design", "Manufacturing"],
  stats: [
    { label: "Status", value: "Complete" },
    { label: "Joined", value: "Sep 2012", class: "font-mono" },
    { label: "Departed", value: "Jun 2017", class: "font-mono" },
    { label: "Type", value: "FIRST Robotics Competition" },
    { label: "Role", value: "Design Lead" },
  ],
  links: [],
  details: `
    <h2>Learning engineering by building robots</h2>
    <p>
      I joined Bear Metal, FIRST Robotics Competition Team 2046, in 2012. FRC gives teams
      a new game each year and only a few weeks to strategize, design, fabricate, assemble,
      wire, program, and practice with a human-scale competition robot.
    </p>
    <p>
      I started with the usual shop work: cutting stock, deburring parts, sanding, and
      helping wherever needed. Then I took on mechanism design and CNC machining. CAD and
      the Design Lead role followed.
    </p>

    <figure>
      <img src="/static/todo.jpg" alt="Bear Metal competition robot lineup from 2012 to 2017" />
      <figcaption>Bearmageddon, Bearodactyl, Bearium, Maverick, Xcalibear, and Hindenbearg.</figcaption>
    </figure>

    <h2>2012-2014: Learning What Survives Competition</h2>
    <p>
      On Bearmageddon in 2012 I contributed to the turret design and machined parts on the
      CNC mill. In 2013, Bearodactyl attempted disc launching and a ten-foot pyramid
      climb. My work on the claw-based climbing system taught an early lesson: a mechanism
      working in the shop doesn't guarantee match reliability.
    </p>
    <p>
      For 2014's Bearium I served as Assistant Design Lead and handled much of the
      spring-powered catapult. Collector and electrical reliability problems limited the
      robot, which permanently influenced how I think about service access and fault
      troubleshooting.
    </p>

    <figure>
      <img src="/static/todo.jpg" alt="Early Bear Metal robot mechanism" />
      <figcaption>An early mechanism showing the progression into design responsibility.</figcaption>
    </figure>

    <h2>2015-2016: Design Lead</h2>
    <p>
      Maverick became my first robot as Design Lead. Its H-drive chassis could move sideways
      for precise alignment, while a tall lift handled totes and an actuated rake captured
      recycling containers.
    </p>
    <p>
      Xcalibear followed in 2016 with an obstacle-crossing chassis using eight-inch
      pneumatic wheels and dual-speed gearboxes. The collector used split pneumatic
      positions and independently articulated wheels and conveyors. The team also
      developed a telescoping climbing system during the season.
    </p>

    <figure>
      <img src="/static/todo.jpg" alt="Maverick and Xcalibear competition robots" />
      <figcaption>Use competition photography or the 2016 design poster.</figcaption>
    </figure>

    <h2>2017: Hindenbearg</h2>
    <p>
      Hindenbearg became my senior-year robot. The drivetrain prioritized speed, the robot
      collected both gears and fuel, and a camera-guided double-wide shooter could send
      fuel toward the boiler at high rate. Its climber used a rotating fastener drum to
      grab the field rope and lift the entire machine.
    </p>
    <p>
      The CAD assembly contained about 2,000 modeled parts, from frame members and motors
      down to hardware and electronics. I produced most of that model during the first 18
      days of build season in Autodesk Inventor. Then I used the completed assembly to
      create a photorealistic preview while fabrication moved into the shop.
    </p>

    <figure>
      <img src="/static/todo.jpg" alt="Autodesk Inventor render of Hindenbearg" />
      <figcaption>Photorealistic Autodesk Inventor render of Hindenbearg.</figcaption>
    </figure>

    <figure>
      <img src="/static/todo.jpg" alt="Hindenbearg climbing during competition" />
      <figcaption>The successful climb revealed the team logo hidden on the underside.</figcaption>
    </figure>

    <h2>What the five years taught me</h2>
    <p>
      FRC made iterative engineering feel normal long before I had formal engineering
      coursework. CAD had to become real parts. Those parts had to assemble on schedule,
      mechanisms had to survive impacts, and electronics had to remain serviceable. Every
      design choice eventually faced a competition field instead of a grading rubric.
    </p>
  `,
} as const;
