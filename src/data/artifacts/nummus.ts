import imgAssetAllocation from "src/assets/artifacts/nummus/asset-allocation.png";
import imgBudgeting from "src/assets/artifacts/nummus/budgeting.png";
import imgDashboard from "src/assets/artifacts/nummus/dashboard.png";

export const nummus = {
  title: "nummus",
  icon: "account_balance_wallet",
  summary: [
    "A self-hosted financial planning application that aggregates account data and turns it into useful trends, forecasts, and planning workflows.",
  ],
  tags: ["Python", "Flask", "Finance", "Self-hosted"],
  allTags: [
    "Python",
    "Flask",
    "Finance",
    "Self-hosted",
    "SQLAlchemy",
    "Personal finance",
    "Budgeting",
    "Investments",
    "Relational models",
    "Authentication",
    "Database encryption",
    "Testing",
    "Container deployment",
    "Observability",
    "Tailwind CSS",
    "Docker",
    "Gunicorn",
    "Prometheus",
    "SQLCipher",
    "Jinja",
    "RapidFuzz",
    "yfinance",
    "Command-line interface",
    "Ruff",
    "basedpyright",
    "Prettier",
  ],
  stats: [
    { label: "Status", value: "In progress" },
    { label: "Started", value: "Jun 2023", class: "font-mono" },
    { label: "Type", value: "Financial web application" },
    { label: "Role", value: "Personal project" },
  ],
  links: [
    {
      icon: "code",
      label: "Repository",
      href: "https://github.com/xozoid/nummus",
    },
  ],
  details: [
    `
    <h2>Personal finance as an engineering problem</h2>
    <p>
      nummus fills the gap I kept running into: a self-hosted place where transaction
      history, budgets, investments, net worth, and long-term planning can share the same
      data model.
    </p>
    <p>
      The goal focuses less on recording what I spent yesterday and more on turning years
      of financial data into information useful for decisions.
    </p>`,
    {
      type: "image",
      src: imgDashboard,
      alt: "nummus dashboard showing net worth, income, spending categories, and emergency fund charts",
      caption:
        "The dashboard combines current balances, category summaries, and trend charts into one overview.",
      size: "lg",
    },
    `
    <h2>From transactions to a financial model</h2>
    <p>
      The application collects and categorizes transactions, manages budgets, tracks
      investments, calculates net worth, and projects future performance. Those functions
      intentionally live together so the same account data doesn't need duplication
      across separate tools.
    </p>`,
    {
      type: "image",
      src: imgBudgeting,
      alt: "nummus budgeting screen with category balances, monthly assignment totals, and a target progress chart",
      caption:
        "The budgeting workflow tracks assigned money, account activity, available balances, and target progress.",
    },
    {
      type: "image",
      src: imgAssetAllocation,
      alt: "nummus asset allocation chart grouped by U.S. sector with ETF holdings and dollar values",
      caption:
        "The asset allocation view breaks investment holdings down by sector and fund exposure.",
    },
    `
    <h2>A self-hosted web application</h2>
    <p>
      nummus primarily uses Python, Flask, and SQLAlchemy. The
      project has gradually accumulated the supporting pieces expected of a service rather
      than a script: authentication, optional database encryption, testing, packaging,
      metrics, container deployment, and automated development tooling.
    </p>

    <h2>Why it keeps growing</h2>
    <p>
      Personal finance has endless edge cases, and the backlog grows every time I use the
      application. Having complete control over the data and model makes experimentation
      cheap.
    </p>
    <p>
      It has also become a useful test bed for patterns that show up in my professional
      software work: data ingestion, normalization, matching, relational models, web
      interfaces, deployment, and observability.
    </p>`,
  ],
} as const;
