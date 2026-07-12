import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { pathToFileURL } from "node:url";

import sharp from "sharp";
import { optimize } from "svgo";

import {
  avatarRenderProfile,
  darkModeColors,
  type Point,
  zedCenterPath,
  zedElectrodeDimensions,
  zedElectrodeGradientAxis,
  zedElectrodePolygon,
  zedEndTaperPower,
  zedHelixAmplitude,
  zedOffsetPath,
  zedPathSamples,
  zedPhaseRotationRate,
  zedPhaseSpatialFrequency,
  zedPhaseTemporalFrequency,
  zedPhaseTurns,
  zedPointAtDistance,
  zedRadiusSpatialFrequency,
  zedRadiusTemporalFrequency,
  zedNormalAtDistance,
  zedRenderViewport,
  zedTubeEdgeWidth,
  zedTubeRadius,
} from "../src/lib/zed-logo";

const outputSvgPath = resolve("public/avatar.svg");
const outputPngSizes = [1024, 512, 256] as const;

const profile = avatarRenderProfile;
const size = profile.size;
const viewport = zedRenderViewport(profile);

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function smoothstep(t: number): number {
  return t * t * (3 - 2 * t);
}

function randomUnit(x: number, y: number): number {
  const seed = profile.fixedNoiseSeed ?? 0;
  const n = Math.sin(x * 127.1 + y * 311.7 + seed) * 43758.5453123;

  return n - Math.floor(n);
}

function smoothNoise(x: number, y: number): number {
  const x0 = Math.floor(x);
  const y0 = Math.floor(y);
  const tx = smoothstep(x - x0);
  const ty = smoothstep(y - y0);
  const a = randomUnit(x0, y0);
  const b = randomUnit(x0 + 1, y0);
  const c = randomUnit(x0, y0 + 1);
  const d = randomUnit(x0 + 1, y0 + 1);

  return lerp(lerp(a, b, tx), lerp(c, d, tx), ty);
}

function zedHelixRadius(
  distance: number,
  timeSeconds: number,
  totalDistance: number,
): number {
  const pathProgress = totalDistance
    ? Math.min(Math.max(distance / totalDistance, 0), 1)
    : 0;
  const endTaper = Math.sin(Math.PI * pathProgress) ** zedEndTaperPower;

  return (
    zedHelixAmplitude *
    endTaper *
    smoothNoise(
      distance * zedRadiusSpatialFrequency,
      timeSeconds * zedRadiusTemporalFrequency,
    )
  );
}

function zedHelixPhi(distance: number, timeSeconds: number): number {
  return (
    Math.PI *
      2 *
      zedPhaseTurns *
      smoothNoise(
        distance * zedPhaseSpatialFrequency,
        timeSeconds * zedPhaseTemporalFrequency,
      ) +
    timeSeconds * zedPhaseRotationRate
  );
}

function toSvgPoint(point: Point): Point {
  return viewport.point(point);
}

function round(value: number): string {
  return Number(value.toFixed(3)).toString();
}

function pointsToPath(points: Point[]): string {
  const first = points[0];

  if (!first) {
    return "";
  }

  return [
    `M ${round(first[0])} ${round(first[1])}`,
    ...points.slice(1).map(([x, y]) => `L ${round(x)} ${round(y)}`),
  ].join(" ");
}

function pointsToPolygon(points: Point[]): string {
  return points.map(([x, y]) => `${round(x)},${round(y)}`).join(" ");
}

function zedFrozenHelixPath(): Point[] {
  const samples = zedPathSamples();
  const totalDistance = samples.at(-1)?.distance ?? 0;
  const pointCount = Math.ceil(totalDistance / profile.pointSpacing);
  const timeSeconds = profile.fixedTimeSeconds ?? 0;
  const path: Point[] = [];

  for (let i = 0; i <= pointCount; i++) {
    const distance = Math.min(i * profile.pointSpacing, totalDistance);
    const point = zedPointAtDistance(samples, distance);
    const normal = zedNormalAtDistance(
      samples,
      distance,
      totalDistance,
      profile.pointSpacing / 2,
    );
    const radius = zedHelixRadius(distance, timeSeconds, totalDistance);
    const offset = radius * Math.cos(zedHelixPhi(distance, timeSeconds));

    path.push(
      toSvgPoint([
        point[0] + offset * normal[0],
        point[1] + offset * normal[1],
      ]),
    );
  }

  return path;
}

function toGradientCoordinates(axis: { start: Point; end: Point }): {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
} {
  const start = toSvgPoint(axis.start);
  const end = toSvgPoint(axis.end);

  return {
    x1: start[0],
    y1: start[1],
    x2: end[0],
    y2: end[1],
  };
}

function linearGradient(
  id: string,
  coordinates: ReturnType<typeof toGradientCoordinates>,
): string {
  return `
    <linearGradient
      id="${id}"
      gradientUnits="userSpaceOnUse"
      x1="${round(coordinates.x1)}"
      y1="${round(coordinates.y1)}"
      x2="${round(coordinates.x2)}"
      y2="${round(coordinates.y2)}"
    >
      <stop offset="0" stop-color="${darkModeColors.electrodeGradient[0]}"/>
      <stop offset="0.2" stop-color="${darkModeColors.electrodeGradient[1]}"/>
      <stop offset="0.5" stop-color="${darkModeColors.electrodeGradient[2]}"/>
      <stop offset="0.8" stop-color="${darkModeColors.electrodeGradient[3]}"/>
      <stop offset="1" stop-color="${darkModeColors.electrodeGradient[4]}"/>
    </linearGradient>
  `;
}

export function buildAvatarSvg(): string {
  const samples = zedPathSamples();
  const totalDistance = samples.at(-1)?.distance ?? 0;
  const scaledTubeRadius = zedTubeRadius * profile.tubeRadiusScale;
  const scaledElectrodeRadius =
    zedElectrodeDimensions.radius * profile.electrodeRadiusScale;
  const scaledElectrodeDimensions = {
    ...zedElectrodeDimensions,
    radius: scaledElectrodeRadius,
  };
  const centerPath = pointsToPath(
    zedCenterPath(toSvgPoint, profile.pointSpacing),
  );
  const positiveEdgePath = pointsToPath(
    zedOffsetPath(scaledTubeRadius, toSvgPoint, profile.pointSpacing),
  );
  const negativeEdgePath = pointsToPath(
    zedOffsetPath(-scaledTubeRadius, toSvgPoint, profile.pointSpacing),
  );
  const plasmaPath = pointsToPath(zedFrozenHelixPath());
  const startElectrode = zedElectrodePolygon(
    samples,
    0,
    -1,
    profile.pointSpacing / 2,
    scaledElectrodeDimensions,
  ).map(toSvgPoint);
  const endElectrode = zedElectrodePolygon(
    samples,
    totalDistance,
    1,
    profile.pointSpacing / 2,
    scaledElectrodeDimensions,
  ).map(toSvgPoint);
  const startGradient = toGradientCoordinates(
    zedElectrodeGradientAxis(
      samples,
      0,
      profile.pointSpacing / 2,
      scaledElectrodeRadius,
    ),
  );
  const endGradient = toGradientCoordinates(
    zedElectrodeGradientAxis(
      samples,
      totalDistance,
      profile.pointSpacing / 2,
      scaledElectrodeRadius,
    ),
  );
  const tubeWidth = viewport.normalizedLength(scaledTubeRadius * 2);
  const tubeEdgeWidth = viewport.normalizedLength(
    zedTubeEdgeWidth * profile.tubeEdgeWidthScale,
  );
  const electrodeStrokeWidth = viewport.normalizedLength(
    profile.electrodeStrokeWidth,
  );

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="${size}"
  height="${size}"
  viewBox="0 0 ${size} ${size}"
  fill="none"
>
  <title>Zed plasma avatar</title>

  <defs>
    ${linearGradient("start-electrode", startGradient)}
    ${linearGradient("end-electrode", endGradient)}

    <filter
      id="ambient-glow"
      x="-35%"
      y="-35%"
      width="170%"
      height="170%"
      color-interpolation-filters="sRGB"
    >
      <feGaussianBlur stdDeviation="${viewport.profileLength(
        profile.ambientGlowBlur ?? 0,
      )}"/>
    </filter>

    <filter
      id="plasma-glow-near"
      x="-25%"
      y="-25%"
      width="150%"
      height="150%"
      color-interpolation-filters="sRGB"
    >
      <feGaussianBlur stdDeviation="${viewport.profileLength(
        profile.nearGlowBlur,
      )}"/>
    </filter>

    <filter
      id="plasma-glow-wide"
      x="-45%"
      y="-45%"
      width="190%"
      height="190%"
      color-interpolation-filters="sRGB"
    >
      <feGaussianBlur stdDeviation="${viewport.profileLength(
        profile.wideGlowBlur,
      )}"/>
    </filter>

    <filter
      id="tube-edge-blur"
      x="-15%"
      y="-15%"
      width="130%"
      height="130%"
      color-interpolation-filters="sRGB"
    >
      <feGaussianBlur stdDeviation="${viewport.profileLength(
        profile.tubeEdgeBlur,
      )}"/>
    </filter>
  </defs>

  <rect width="${size}" height="${size}" fill="${profile.background}"/>

  <path
    d="${centerPath}"
    stroke="${darkModeColors.primary}"
    stroke-width="${viewport.profileLength(profile.ambientGlowWidth ?? 0)}"
    stroke-linecap="butt"
    stroke-linejoin="round"
    opacity="${profile.ambientGlowAlpha}"
    filter="url(#ambient-glow)"
  />

  <path
    d="${centerPath}"
    stroke="${darkModeColors.tube}"
    stroke-width="${round(tubeWidth)}"
    stroke-linecap="butt"
    stroke-linejoin="round"
    opacity="${profile.tubeFaceAlpha}"
  />

  <g
    stroke="${darkModeColors.tube}"
    stroke-width="${round(tubeEdgeWidth)}"
    stroke-linecap="butt"
    stroke-linejoin="round"
    opacity="${profile.tubeEdgeAlpha}"
    filter="url(#tube-edge-blur)"
  >
    <path d="${positiveEdgePath}"/>
    <path d="${negativeEdgePath}"/>
  </g>

  <g
    stroke="${darkModeColors.tube}"
    stroke-width="${round(tubeEdgeWidth / 2)}"
    stroke-linecap="butt"
    stroke-linejoin="round"
    opacity="${profile.tubeEdgeAlpha * 0.7}"
  >
    <path d="${positiveEdgePath}"/>
    <path d="${negativeEdgePath}"/>
  </g>

  <path
    d="${plasmaPath}"
    stroke="${darkModeColors.primary}"
    stroke-width="${viewport.profileLength(profile.wideGlowWidth)}"
    stroke-linecap="butt"
    stroke-linejoin="round"
    opacity="${profile.wideGlowAlpha}"
    filter="url(#plasma-glow-wide)"
  />

  <path
    d="${plasmaPath}"
    stroke="${darkModeColors.primary}"
    stroke-width="${viewport.profileLength(profile.nearGlowWidth)}"
    stroke-linecap="butt"
    stroke-linejoin="round"
    opacity="${profile.nearGlowAlpha}"
    filter="url(#plasma-glow-near)"
  />

  <path
    d="${plasmaPath}"
    stroke="${darkModeColors.primary}"
    stroke-width="${viewport.profileLength(profile.plasmaStrokeWidth)}"
    stroke-linecap="butt"
    stroke-linejoin="round"
  />

  <polygon
    points="${pointsToPolygon(startElectrode)}"
    fill="url(#start-electrode)"
    stroke="${darkModeColors.electrodeStroke}"
    stroke-width="${round(electrodeStrokeWidth)}"
    stroke-opacity="0.3"
  />

  <polygon
    points="${pointsToPolygon(endElectrode)}"
    fill="url(#end-electrode)"
    stroke="${darkModeColors.electrodeStroke}"
    stroke-width="${round(electrodeStrokeWidth)}"
    stroke-opacity="0.3"
  />
</svg>
`;
}

async function writePng(svg: string, pngSize: number): Promise<void> {
  const outputPath = resolve(`public/avatar-${pngSize}.png`);

  await sharp(Buffer.from(svg))
    .resize(pngSize, pngSize, { fit: "fill" })
    .png()
    .toFile(outputPath);
}

async function main(): Promise<void> {
  const svg = buildAvatarSvg();
  const optimizedSvg = optimize(svg, {
    multipass: true,
    path: outputSvgPath,
  }).data;

  await mkdir(dirname(outputSvgPath), {
    recursive: true,
  });

  await writeFile(outputSvgPath, `${optimizedSvg}\n`, "utf8");

  for (const pngSize of outputPngSizes) {
    await writePng(optimizedSvg, pngSize);
  }

  console.log(`Generated ${outputSvgPath}`);
  for (const pngSize of outputPngSizes) {
    console.log(`Generated ${resolve(`public/avatar-${pngSize}.png`)}`);
  }
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  main().catch((error: unknown) => {
    console.error(error);
    process.exitCode = 1;
  });
}
