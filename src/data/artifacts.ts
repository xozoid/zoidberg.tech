import { badgeLife } from "./artifacts/badge-life";
import { mgMidget } from "./artifacts/mg-midget";
import { cougsat } from "./artifacts/cougsat";
import { dotfiles } from "./artifacts/dotfiles";
import { homelab } from "./artifacts/homelab";
import { nummus } from "./artifacts/nummus";
import { mustangIrs } from "./artifacts/mustang-irs";
import { tahomaRobotics } from "./artifacts/tahoma-robotics";
import { tahomaRoboticsCamp } from "./artifacts/tahoma-robotics-camp";
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
  "mustang-irs": mustangIrs,
  "tahoma-robotics-camp": tahomaRoboticsCamp,
  "tahoma-robotics": tahomaRobotics,
} as const;

export type ArtifactSlug = keyof typeof artifacts;
