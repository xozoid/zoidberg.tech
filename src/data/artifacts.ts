import { mgMidget } from "./artifacts/mg-midget";
import { cougsat } from "./artifacts/cougsat";
import { homelab } from "./artifacts/homelab";
import { nummus } from "./artifacts/nummus";

export const artifacts = {
  "mg-midget": mgMidget,
  nummus: nummus,
  cougsat: cougsat,
  homelab: homelab,
} as const;

export type ArtifactSlug = keyof typeof artifacts;
