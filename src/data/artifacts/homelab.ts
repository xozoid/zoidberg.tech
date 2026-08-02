import imgRackTop from "src/assets/artifacts/homelab/rack-top.jpg";

export const homelab = {
  title: "Homelab",
  icon: "dns",
  summary: [
    "My long-running playground for networking, automation, virtualization, monitoring, and self-hosted services.",
    "Most services that power this website started here.",
  ],
  tags: ["Networking", "Ansible", "Automation", "Self-hosting"],
  allTags: [
    "Networking",
    "Ansible",
    "Automation",
    "Self-hosting",
    "Linux",
    "Virtualization",
    "Containers",
    "DNS",
    "Monitoring",
    "Routing",
    "Storage",
    "Deployment",
    "Backups",
    "Infrastructure as code",
    "Systems administration",
    "Ansible playbooks",
    "Inventory management",
    "Host variables",
    "Group variables",
  ],
  stats: [
    { label: "Status", value: "In progress" },
    { label: "Started", value: "2017", class: "font-mono" },
    { label: "Type", value: "Infrastructure & learning platform" },
    { label: "Role", value: "Personal project" },
  ],
  links: [
    {
      icon: "code",
      label: "Repository",
      href: "https://github.com/xozoid/homelab",
    },
  ],
  details: [
    `
    <h2>A permanent place to experiment</h2>
    <p>
      My homelab started as a collection of machines and services for experimenting with
      networking and Linux. Over time it became the infrastructure behind many of my
      personal projects.
    </p>
    <p>
      It gives me somewhere to learn technologies that need real systems around them.
      That includes virtualization, containers, dns, monitoring, routing, storage,
      deployment, backups, configuration management, and the thousand small problems
      involved in keeping services alive.
    </p>`,
    {
      type: "image",
      src: imgRackTop,
      alt: "Top of a homelab rack with network switches, patch cables, and rack-mounted electronics",
      caption:
        "The rack-top layer of the homelab, with switching, patching, and small always-on systems exposed.",
    },
    `
    <h2>Infrastructure as code</h2>
    <p>
      The current public repository centers on Ansible. Hosts and group variables
      describe the machines while playbooks encode configuration I would otherwise have to
      remember and reproduce manually.
    </p>
    <p>
      That transition from manually administered machines toward declarative
      configuration mirrors how the lab itself evolved: experiments that survive long
      enough eventually become automation.
    </p>

    <h2>Infrastructure for other projects</h2>
    <p>
      The homelab matters through the projects it enables. It makes other projects cheap
      to start. I can deploy a database, web application, monitoring
      target, or experimental service without first deciding how to host it.
    </p>
  `,
  ],
} as const;
