export const badgeLife = {
  title: "Badge life",
  icon: "badge",
  summary: [
    "My playground for networking, automation, virtualization, monitoring, and self-hosted services.",
    "Most services that power this website started here.",
  ],
  tags: ["Networking", "Automation", "Self-hosting"],
  stats: [
    { label: "Status", value: "Complete" },
    { label: "Started", value: "Nov 2019", class: "font-mono" },
    { label: "Finished", value: "Mar 2020", class: "font-mono" },
    { label: "Type", value: "Artwork" },
    { label: "Role", value: "Personal project" },
  ],
  links: [
    {
      icon: "code",
      label: "Repository",
      href: "https://github.com/xozoid/BadgeLife",
    },
  ],
  details: [["s1", "s2"], ["p2 s1"]],
} as const;
