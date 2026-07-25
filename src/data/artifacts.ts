import { badgeLife } from "./artifacts/badge-life";
import { mgMidget } from "./artifacts/mg-midget";
import { cougsat } from "./artifacts/cougsat";
import { dotfiles } from "./artifacts/dotfiles";
import { homelab } from "./artifacts/homelab";
import { mallardMadness } from "./artifacts/mallard-madness";
import { nummus } from "./artifacts/nummus";
import { ti4 } from "./artifacts/ti4";
import { tm } from "./artifacts/tm";
import { website } from "./artifacts/website";

export const nTopArtifacts = 4 as const;
export const artifacts = {
  // Selected projects
  "mg-midget": mgMidget,
  nummus: nummus,
  cougsat: cougsat,
  homelab: homelab,
  // Not selected below, sorted by recent
  "zoidberg.tech": website,
  dotfiles: dotfiles,
  ti4: ti4,
  tm: tm,
  "badge-life": badgeLife,
  "mallard-madness": mallardMadness,
} as const;

export type ArtifactSlug = keyof typeof artifacts;
