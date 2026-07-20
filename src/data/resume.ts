export const experience = [
  {
    role: "Lead Software Engineer",
    organization: "Schweitzer Engineering Laboratories",
    dates: "Apr 2026 - Present",

    focus: [
      "Internal platforms",
      "Workflow automation",
      "Developer productivity",
    ],

    overview: [
      "After years building embedded systems and hardware, my work expanded into software.",
      "Today I spend most of my time building internal platforms that help engineers answer questions faster, automate repetitive work, and connect information scattered across the engineering organization.",
      "I still enjoy getting close to the hardware whenever software meets physical products.",
    ],

    topics: [
      "Python",
      "Flask",
      "HTMX",
      "SQLAlchemy",
      "Linux",
      "JSON APIs",
      "PostgreSQL",
      "Docker",
      "Git",
    ],

    tasks: [
      "Build internal applications that unify engineering and manufacturing data into searchable workflows.",
      "Partner directly with engineers across R&D to turn recurring pain points into software that fits their daily workflow.",
      "Own projects end-to-end, from database design and server-side services to deployment, monitoring, and user experience.",
      "Bridge software and hardware teams whenever applications interact with embedded systems or manufacturing processes.",
    ],
  },

  {
    role: "Lead Hardware Engineer",
    organization: "Schweitzer Engineering Laboratories",
    dates: "Jan 2025 - Apr 2026",

    focus: [
      "Systems engineering",
      "Embedded Linux",
      "Hardware/software integration",
    ],

    overview: [
      "This role shifted my perspective from designing individual circuits to owning complete systems.",
      "I enjoyed connecting hardware, firmware, Linux, and software into products that teams could build, test, and support throughout their lifecycle.",
    ],

    topics: [
      "KiCad",
      "FPGA",
      "Linux",
      "Yocto",
      "C/C++",
      "Python",
      "Flask",
      "HTMX",
      "Prometheus",
    ],

    tasks: [
      "Led multidisciplinary development of a GNSS timing platform from early concept through working prototype.",
      "Connected PCB design, FPGA logic, embedded Linux, server-side software, and telemetry into a cohesive system.",
      "Built automated validation tools that reduced manual effort during high-speed networking and PoE testing.",
      "Partnered with manufacturing engineers to streamline test workflows and improve engineering visibility.",
    ],
  },

  {
    role: "Hardware Engineer",
    organization: "Schweitzer Engineering Laboratories",
    dates: "Jul 2022 - Dec 2024",

    focus: ["Precision timing", "Customer collaboration", "Test automation"],

    overview: [
      "During this stage I became increasingly involved with customer-facing development and technical leadership.",
      "I enjoyed translating difficult engineering problems into practical hardware designs while automating as much testing as possible.",
    ],

    topics: ["KiCad", "Python", "VISA", "Oscilloscopes", "Timing Systems"],

    tasks: [
      "Delivered new timing capabilities requiring nanosecond-level precision.",
      "Worked alongside customers to transform requirements into production-ready hardware designs.",
      "Automated repetitive laboratory testing, improving repeatability while freeing engineers to focus on analysis.",
      "Mentored engineering interns through design reviews, debugging, and hands-on laboratory work.",
    ],
  },

  {
    role: "Associate Hardware Engineer",
    organization: "Schweitzer Engineering Laboratories",
    dates: "Jul 2021 - Jun 2022",

    focus: ["Signal integrity", "EMC", "Hardware debugging"],

    overview: [
      "After joining full-time I began moving beyond validation work into understanding why hardware behaved the way it did.",
      "This role strengthened my understanding of signal integrity, EMC, component selection, and practical debugging.",
    ],

    topics: [
      "ANSYS SIwave",
      "Signal Integrity",
      "EMC",
      "Oscilloscopes",
      "Network Analysis",
    ],

    tasks: [
      "Used simulation to improve PCB routing decisions before hardware reached the lab.",
      "Qualified alternate components to keep manufacturing moving during supply chain disruptions.",
      "Tracked down difficult hardware failures through measurement, experimentation, and root-cause analysis.",
      "Supported product development through design review, validation, and debugging.",
    ],
  },

  {
    role: "Hardware Engineering Intern",
    organization: "Schweitzer Engineering Laboratories",
    dates: "May 2018 - Jun 2021",

    focus: ["Product development", "Validation", "Engineering fundamentals"],

    overview: [
      "I joined SEL after my first year of college and spent three years learning every stage of hardware product development.",
      "From board bring-up and compliance testing to manufacturing support and software development, this role gave me the broad systems perspective that continues to shape how I approach engineering today.",
    ],

    topics: [
      "C/C++",
      "Ethernet",
      "Intel x86",
      "Oscilloscopes",
      "Packet Analysis",
      "Agile",
      "JIRA",
      "PCB Design",
    ],

    tasks: [
      "Built Ethernet reliability and manufacturing software that supported product validation.",
      "Performed regulatory and environmental testing to verify products under demanding operating conditions.",
      "Designed manufacturing hardware that improved assembly safety and reduced defects.",
      "Investigated electrical failures using laboratory instrumentation and structured root-cause analysis.",
      "Took an experimental networking project from research through validation and presentation to engineering leadership.",
      "Helped keep production moving by qualifying alternate electronic components during global supply shortages.",
      "Learned alongside a small Agile hardware team, contributing to products throughout their development lifecycle.",
    ],
  },
] as const;

export const education = [
  {
    credential: "M.Eng. Computer Engineering",
    institution: "Colorado State University",
    dates: "2026 (expected)",
    detail:
      "Coursework spanning embedded systems, machine learning, optimization, systems engineering, and applied mathematics.",
  },
  {
    credential: "B.S. Electrical Engineering",
    institution: "Washington State University",
    dates: "2021",
    detail:
      "Magna Cum Laude • Mathematics and Physics minors • Systems lead for CougSat",
  },
] as const;

export const skills = [
  "Python",
  "C/C++",
  "Embedded Linux",
  "Flask",
  "HTMX",
  "SQLAlchemy",
  "Hardware Design",
  "PCB Layout",
  "FPGA",
  "Embedded Systems",
  "Test Automation",
  "Linux",
  "Networking",
  "Ethernet",
  "Hardware Validation",
  "Process Automation",
  "Yocto",
  "Git",
] as const;

export const projects = [
  {
    name: "1977 MG Midget EV Conversion",
    summary: [
      "Engineering a lightweight electric drivetrain through vehicle modeling, coast-down testing, component selection, packaging, and hands-on restoration.",
    ],
    link: "/artifacts/mg-midget",
  },
  {
    name: "nummus",
    summary: [
      "A self-hosted financial planning application that aggregates account data and turns it into useful trends, forecasts, and planning workflows.",
    ],
    link: "/artifacts/nummus",
  },
  {
    name: "CougSat-1 CubeSat",
    summary: [
      "Served as systems lead for a student-built CubeSat, coordinating electronics, communications, and embedded systems development.",
      "Although the satellite never launched, the project shaped how I approach multidisciplinary engineering.",
    ],
    link: "/artifacts/cougsat",
  },
  {
    name: "Homelab",
    summary: [
      "My playground for networking, automation, virtualization, monitoring, and self-hosted services.",
      "Most services that power this website started here.",
    ],
    link: "/artifacts/homelab",
  },
] as const;
