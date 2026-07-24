export const resumeProfile = {
  name: "Xenon Ollie Zoidberg",
  title: "Lead Software Engineer",
  descriptor:
    "Software, embedded systems, hardware integration, and automation",
  links: [
    {
      icon: "location_on",
      label: "Pullman, Washington",
      href: null,
    },
    {
      icon: "hub",
      label: "zoidberg.tech",
      href: "https://zoidberg.tech",
    },
    {
      icon: "contact_mail",
      label: "xoz@zoidberg.tech",
      href: "mailto:xoz@zoidberg.tech",
    },
    {
      icon: "code",
      label: "GitHub: @xozoid",
      href: "https://github.com/xozoid",
    },
  ],
  resumeOverview:
    "Software engineer with a hardware background, building internal platforms and automation for complex engineering and manufacturing workflows.",
  resumeFocus: [
    "Internal platforms",
    "Engineering automation",
    "Developer productivity",
    "Hardware/software integration",
  ],
} as const;

export const experience = [
  {
    organization: "Schweitzer Engineering Laboratories",
    location: "Pullman, Washington",
    roles: [
      {
        role: "Lead Software Engineer",
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

        resumeTasks: [
          "Build internal applications that turn fragmented engineering and manufacturing data into searchable workflows used across ~20% of the company.",
          "Design internal platforms end-to-end across data models, server-side services, deployment, monitoring, and user experience.",
          "Partner with R&D engineers to turn recurring pain points into durable software workflows.",
        ],
      },

      {
        role: "Lead Hardware Engineer",
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

        resumeTasks: [
          "Led multidisciplinary development of a GNSS timing platform from concept through working prototype.",
          "Integrated PCB/FPGA design, Yocto Linux, C++ services, web tooling, Prometheus telemetry, and automated validation.",
        ],
      },

      {
        role: "Hardware Engineer",
        dates: "Jul 2022 - Dec 2024",

        focus: [
          "Precision timing",
          "Customer collaboration",
          "Test automation",
        ],

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

        resumeTasks: [
          "Delivered nanosecond-level timing capabilities, translating customer requirements into production hardware.",
          "Automated laboratory testing to improve repeatability and reduce manual test effort.",
        ],
      },

      {
        role: "Associate Hardware Engineer",
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

        resumeTasks: [
          "Improved PCB signal-integrity and EMC decisions through simulation and lab measurement; debugged failures and qualified alternate components during supply disruptions.",
        ],
      },

      {
        role: "Hardware Engineering Intern",
        dates: "May 2018 - Jun 2021",

        focus: [
          "Product development",
          "Validation",
          "Engineering fundamentals",
        ],

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
          "Built Ethernet reliability software that supported product validation.",
          "Performed regulatory and environmental testing to verify products under demanding operating conditions.",
          "Designed manufacturing hardware that improved assembly safety and reduced defects.",
          "Investigated electrical failures using laboratory instrumentation and structured root-cause analysis.",
          "Took an experimental networking project from research through validation and presentation to engineering leadership.",
          "Helped keep production moving by qualifying alternate electronic components during global supply shortages.",
          "Learned alongside a small Agile hardware team, contributing to products throughout their development lifecycle.",
        ],

        resumeTasks: [
          "Built Ethernet validation software and supported regulatory, environmental, manufacturing, and hardware validation.",
        ],
      },
    ],
  },
] as const;

export const education = [
  {
    credential: "M.Eng. Computer Engineering",
    institution: "Colorado State University",
    dates: "Expected Dec 2026",
    detail:
      "Coursework in embedded systems, machine learning, optimization, systems engineering, and applied mathematics.",
  },
  {
    credential: "B.S. Electrical Engineering",
    institution: "Washington State University",
    dates: "Dec 2021",
    detail: "Magna Cum Laude • Mathematics and Physics minors",
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

export const resumeSkills = {
  software: [
    "Python",
    "Flask",
    "HTMX",
    "SQLAlchemy",
    "SQLite",
    "JSON APIs",
    "Docker",
    "Git",
    "pytest",
  ],
  systems: [
    "Embedded Linux",
    "Yocto",
    "C/C++",
    "FPGA",
    "Networking",
    "Ethernet",
    "Prometheus",
  ],
  hardware: [
    "PCB layout",
    "Signal integrity",
    "EMC",
    "Hardware validation",
    "Test automation",
    "VISA",
    "Oscilloscopes",
  ],
} as const;

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
      "A self-hosted financial planning application that aggregates account data into budgeting, forecasting, and long-term planning workflows.",
    ],
    link: "/artifacts/nummus",
  },
  {
    name: "CougSat-1 CubeSat",
    summary: [
      "Led systems engineering for a student-built CubeSat, coordinating electronics, communications, and embedded systems development.",
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
