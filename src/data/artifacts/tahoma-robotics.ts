import img2012 from "src/assets/artifacts/tahoma-robotics/2012.jpg";
import img2013 from "src/assets/artifacts/tahoma-robotics/2013.jpg";
import img2014 from "src/assets/artifacts/tahoma-robotics/2014.jpg";
import img2015 from "src/assets/artifacts/tahoma-robotics/2015.jpg";
import img2016Poster from "src/assets/artifacts/tahoma-robotics/2016-poster.jpg";
import img2016 from "src/assets/artifacts/tahoma-robotics/2016.jpg";
import img2017Render from "src/assets/artifacts/tahoma-robotics/2017-render.png";
import img2017 from "src/assets/artifacts/tahoma-robotics/2017.jpg";

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
  details: [
    `
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
    </p>`,
    {
      type: "image",
      src: img2012,
      alt: "Bear Metal 2046 robot with aluminum frame and orange basketball mechanisms standing in a robotics shop",
      caption:
        "Bearmageddon, the 2012 robot, in the shop with its turret and ball-handling structure",
    },
    {
      type: "image",
      src: img2013,
      alt: "Bear Metal 2046 robot frame and climbing mechanism mounted on a blue test structure in a workshop",
      caption: "Bearodactyl during development of the 2013 climbing mechanism.",
    },
    {
      type: "image",
      src: img2014,
      alt: "Bear Metal 2046 robot with a large red exercise ball positioned at its front mechanism",
      caption:
        "Bearium, the 2014 robot, built around collecting and launching the large game ball.",
    },
    `
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
    </p>`,
    {
      type: "image",
      src: img2015,
      alt: "Bear Metal 2046 robot on a competition field lifting gray totes during a match",
      caption:
        "Maverick competing in the 2015 recycling-container and tote-stacking game.",
    },
    {
      type: "image",
      src: img2016Poster,
      alt: "Bear Metal Xcalibear design poster with a yellow and black CAD robot render and mechanism labels",
      caption:
        "The 2016 Xcalibear design poster showing the obstacle-crossing robot and its mechanisms.",
    },
    {
      type: "image",
      src: img2016,
      alt: "Bear Metal 2046 robot launching a ball into a tower during a 2016 FIRST Robotics Competition match",
      caption:
        "Xcalibear launching boulders into a tower during the mediveal themed game.",
    },
    `
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
    </p>`,
    {
      type: "image",
      src: img2017Render,
      alt: "OTOY render of Hindenbearg with transparent side plates, red ball conveyor, and blue shooter wheels",
      caption:
        "A photorealistic OTOY render of Hindenbearg produced from the build-season CAD assembly.",
    },
    {
      type: "image",
      src: img2017,
      alt: "Bear Metal 2046 Hindenbearg robot driving across a competition field with green fuel balls contained in its hopper",
      caption:
        "Hindenbearg on the 2017 competition field with its fuel hopper primed for launching.",
    },
    `
    <h2>What the five years taught me</h2>
    <p>
      FRC made iterative engineering feel normal long before I had formal engineering
      coursework. CAD had to become real parts. Those parts had to assemble on schedule,
      mechanisms had to survive impacts, and electronics had to remain serviceable. Every
      design choice eventually faced a competition field instead of a grading rubric.
    </p>`,
  ],
} as const;
