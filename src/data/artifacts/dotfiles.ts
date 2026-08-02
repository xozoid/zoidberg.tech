import imgTmuxCodingPanes from "src/assets/artifacts/dotfiles/tmux-coding-panes.png";

export const dotfiles = {
  title: "dotfiles",
  icon: "atr",
  summary: [
    "A version-controlled Linux environment that has gradually become my portable toolbox for development, automation, and system setup.",
  ],
  tags: ["Linux", "Shell", "Automation", "Developer tooling"],
  stats: [
    { label: "Status", value: "Sustaining" },
    { label: "Started", value: "Oct 2023", class: "font-mono" },
    { label: "Type", value: "Linux configuration" },
    { label: "Role", value: "Personal project" },
  ],
  links: [
    {
      icon: "code",
      label: "Repository",
      href: "https://github.com/xozoid/dotfiles",
    },
  ],
  details: [
    `
    <h2>The computer should remember this, not me</h2>
    <p>
      My dotfiles repository stores small preferences and repeated setup work
      until they become infrastructure. Shell configuration, Git behavior, terminal
      tooling, language environments, and scripts all live there. Desktop configuration
      and development utilities also share that version-controlled place instead of
      requiring manual rebuilds on every Linux system I use.
    </p>`,
    {
      type: "image",
      src: imgTmuxCodingPanes,
      alt: "Terminal workspace with Neovim, tmux panes, shell output, and status bars arranged for software development",
      caption:
        "A tmux and Neovim development session configured through the dotfiles repository.",
      size: "lg",
    },
    `
    <h2>Topic-oriented configuration</h2>
    <p>
      The repository follows Zach Holman's topic-oriented dotfiles structure.
      Configuration groups by purpose rather than by machine: Git, Zsh, Python, Rust, Go,
      tmux, desktop tooling, Docker, fonts, PlatformIO, and other areas each own their
      setup.
    </p>
    <p>
      Bootstrap scripts create the appropriate symlinks into my home directory while
      topic-specific install scripts configure the surrounding software. Over 3 years of
      commits, that structure has turned the repository into a long-running record of how
      I prefer to use computers.
    </p>

    <h2>A project with no finish line</h2>
    <p>
      This acts less like a standalone product than a continuously maintained toolbox.
      Every time I remove a manual setup step, fix an annoyance, or discover a better
      tool, some of that knowledge tends to end up here.
    </p>
  `,
  ],
} as const;
