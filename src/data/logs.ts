import mgBaselining from "src/content/logs/2026/2026-07-25-baselining-the-mg";
import vaultPostmortem from "src/content/logs/2026/2026-08-09-vault-postmortem";
import type { LogEntry } from "src/content/logs/types";

export const logs: readonly LogEntry[] = [mgBaselining, vaultPostmortem];

export function slugFromTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function logSlug(log: LogEntry): string {
  return log.slug ?? log.date + "-" + slugFromTitle(log.title);
}

export const sortedLogs = [...logs].sort((a, b) =>
  b.date.localeCompare(a.date),
);
