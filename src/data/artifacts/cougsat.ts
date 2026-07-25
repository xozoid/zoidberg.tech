export const cougsat = {
  title: "CougSat-1 CubeSat",
  icon: "satellite_alt",
  summary: [
    "Served as systems lead for a student-built CubeSat, coordinating electronics, communications, and embedded systems development.",
    "Although the satellite never launched, the project shaped how I approach multidisciplinary engineering.",
  ],
  tags: ["CubeSat", "Systems engineering", "PCB design", "Embedded systems"],
  stats: [
    { label: "Status", value: "No longer involved" },
    { label: "Joined", value: "Aug 2017", class: "font-mono" },
    { label: "Departed", value: "Dec 2021", class: "font-mono" },
    { label: "Type", value: "University CubeSat" },
    { label: "Role", value: "Chief Technical Officer" },
  ],
  links: [
    {
      icon: "code",
      label: "Repository",
      href: "https://github.com/CougsInSpace/CougSat1-Readme",
    },
  ],
  details: `
    <h2>Learning systems engineering by building a satellite</h2>
    <p>
      I joined Cougs in Space during my first week at Washington State University and
      moved into the role of Chief Technical Officer. CougSat-1 aimed to become a 10 cm
      CubeSat and a reusable platform for future WSU missions. Secondary goals included a
      germination experiment and a ham-radio broadcast.
    </p>
    <p>
      My role increasingly centered on interfaces between disciplines. I advised and
      coordinated subsystem teams, maintained a coherent architecture, and helped
      hardware and software from different students operate as one spacecraft.
    </p>

    <figure>
      <img src="/static/todo.jpg" alt="CougSat-1 render" />
      <figcaption>Use the original orbital render or a later spacecraft render.</figcaption>
    </figure>

    <h2>Architecture and integration</h2>
    <p>
      The spacecraft split into avionics, command and data handling, attitude
      determination and control, communications, electrical power, structure, payload, and
      ground-support functions. A common backplane and card architecture let subsystem
      teams develop hardware independently while preserving defined electrical and
      mechanical interfaces.
    </p>
    <p>
      Coordinating those interfaces drove the core systems problem. A satellite can contain
      strong individual subsystems and still fail if their assumptions about power,
      data, timing, mechanics, or operations don't agree.
    </p>

    <figure>
      <img src="/static/todo.jpg" alt="Functional block diagram" />
      <figcaption>CougSat-1 subsystem architecture and interfaces.</figcaption>
    </figure>

    <h2>Electronics</h2>
    <p>
      I made my direct engineering contributions through the Electrical Systems team.
      During the project I designed surface-mount PCBs, including work on the
      electrical power and communications subsystems.
    </p>
    <p>
      The power subsystem harvested solar energy, stored energy for eclipse operation,
      regulated and distributed power, and monitored loads. The communications hardware
      connected the spacecraft to its ground station over ham-radio bands. Routing the
      multi-layer radio board demanded extra care because of the component
      density, efficiency goals, and RF trace constraints.
    </p>

    <figure>
      <img src="/static/todo.jpg" alt="Assembled electrical subsystem PCB" />
      <figcaption>One of the CougSat-1 electrical subsystem boards.</figcaption>
    </figure>

    <h2>Embedded software and engineering infrastructure</h2>
    <p>
      I also wrote C++ firmware using Mbed and developed drivers for integrated circuits
      connected to the flight microcontrollers. Alongside the engineering itself, I
      helped establish project-management and documentation practices for a club with
      many members, teams, and continuously changing student ownership.
    </p>
    <p>
      The public project repositories accumulated requirements, schematics, mechanical
      models, component inventories, shared design libraries, fabrication rules, supplier
      documentation, software, and operating procedures. Keeping that information
      available mattered almost as much as the hardware because every graduating class
      handed the project to the next one.
    </p>

    <h2>What stayed with me</h2>
    <p>
      CougSat-1 never reached orbit, so I don't treat it as a spacecraft success story.
      Its value to me came from the engineering process: years spent dealing with
      requirements, interfaces, documentation, electronics, embedded software,
      mechanical constraints, and a large multidisciplinary team.
    </p>
    <p>
      A lot of my engineering philosophy comes from that experience. Define interfaces
      early. Automate repetitive work. Make systems understandable to the next person.
      Spend disproportionate attention on the interfaces between disciplines.
    </p>
  `,
} as const;
