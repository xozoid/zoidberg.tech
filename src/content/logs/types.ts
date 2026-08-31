import type { ImageMetadata } from "astro";

export type LogStat = {
  label: string;
  value: string;
  class?: string;
};

export type LogDetailImage = {
  type: "image";
  src: ImageMetadata;
  alt: string;
  caption?: string;
  size?: "sm" | "md" | "lg";
};

export type LogDetailBlock = string | LogDetailImage;

export type LogEntry = {
  title: string;
  slug?: string;
  icon: string;
  date: string;
  summary: readonly string[];
  tags: readonly string[];
  allTags: readonly string[];
  project?: {
    label: string;
    href: string;
  };
  stats: readonly LogStat[];
  details: readonly LogDetailBlock[];
};
