import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

import { optimize } from "svgo";

import {
  darkModeColors,
  type PathSample,
  type Point,
  zedElectrodeLength,
  zedElectrodeOverlap,
  zedElectrodeRadius,
  zedNormalAtDistance,
  zedPathSamples,
  zedPointAtDistance,
  zedSampledPath,
  zedTangentAtDistance,
  zedTubeEdgeAlpha,
  zedTubeEdgeWidth,
  zedTubeFaceAlpha,
  zedTubeRadius,
} from "../src/scripts/logo";

const outputPath = resolve("public/favicon.svg");

const size = 64;
const zedStrokeWidth = 5.6;
const zedNearGlowWidth = 6.4;
const zedWideGlowWidth = 8.6;
const faviconPointSpacing = 0.002;

/*
 * SVG-space transform.
 *
 * The Canvas renderer uses the complete square viewport. This does too.
 */
function toSvgPoint(point: Point): Point {
  return [point[0] * size, point[1] * size];
}

function zedCenterPath(): Point[] {
  return zedSampledPath((point) => toSvgPoint(point), faviconPointSpacing);
}

function zedOffsetPath(offset: number): Point[] {
  return zedSampledPath(
    (point, normal) =>
      toSvgPoint([
        point[0] + offset * normal[0],
        point[1] + offset * normal[1],
      ]),
    faviconPointSpacing,
  );
}

function round(value: number): string {
  return Number(value.toFixed(3)).toString();
}

/**
 * SVG polyline path.
 *
 * The source Canvas implementation also draws sampled line segments, so this
 * preserves the renderer's behavior rather than fitting a different curve.
 */
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

function electrodePolygon(
  samples: PathSample[],
  distance: number,
  outwardDirection: 1 | -1,
): Point[] {
  const totalDistance = samples.at(-1)?.distance ?? 0;

  const point = zedPointAtDistance(samples, distance);

  const sampleDistance = faviconPointSpacing / 2;

  const tangent = zedTangentAtDistance(
    samples,
    distance,
    totalDistance,
    sampleDistance,
  );

  const normal = zedNormalAtDistance(
    samples,
    distance,
    totalDistance,
    sampleDistance,
  );

  const outward: Point = [
    tangent[0] * outwardDirection,
    tangent[1] * outwardDirection,
  ];

  const inner = zedElectrodeOverlap;
  const outer = zedElectrodeLength;

  return [
    toSvgPoint([
      point[0] - inner * outward[0] + zedElectrodeRadius * normal[0],
      point[1] - inner * outward[1] + zedElectrodeRadius * normal[1],
    ]),
    toSvgPoint([
      point[0] + outer * outward[0] + zedElectrodeRadius * normal[0],
      point[1] + outer * outward[1] + zedElectrodeRadius * normal[1],
    ]),
    toSvgPoint([
      point[0] + outer * outward[0] - zedElectrodeRadius * normal[0],
      point[1] + outer * outward[1] - zedElectrodeRadius * normal[1],
    ]),
    toSvgPoint([
      point[0] - inner * outward[0] - zedElectrodeRadius * normal[0],
      point[1] - inner * outward[1] - zedElectrodeRadius * normal[1],
    ]),
  ];
}

function pointsToPolygon(points: Point[]): string {
  return points.map(([x, y]) => `${round(x)},${round(y)}`).join(" ");
}

function electrodeGradientCoordinates(
  samples: PathSample[],
  distance: number,
): {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
} {
  const totalDistance = samples.at(-1)?.distance ?? 0;
  const point = zedPointAtDistance(samples, distance);

  const normal = zedNormalAtDistance(
    samples,
    distance,
    totalDistance,
    faviconPointSpacing / 2,
  );

  const start = toSvgPoint([
    point[0] - zedElectrodeRadius * normal[0],
    point[1] - zedElectrodeRadius * normal[1],
  ]);

  const end = toSvgPoint([
    point[0] + zedElectrodeRadius * normal[0],
    point[1] + zedElectrodeRadius * normal[1],
  ]);

  return {
    x1: start[0],
    y1: start[1],
    x2: end[0],
    y2: end[1],
  };
}

function linearGradient(
  id: string,
  coordinates: ReturnType<typeof electrodeGradientCoordinates>,
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

function buildSvg(): string {
  const samples = zedPathSamples();
  const totalDistance = samples.at(-1)?.distance ?? 0;

  const centerPath = pointsToPath(zedCenterPath());
  const positiveEdgePath = pointsToPath(zedOffsetPath(zedTubeRadius));
  const negativeEdgePath = pointsToPath(zedOffsetPath(-zedTubeRadius));

  const plasmaPath = centerPath;

  const startElectrode = electrodePolygon(samples, 0, -1);

  const endElectrode = electrodePolygon(samples, totalDistance, 1);

  const startGradient = electrodeGradientCoordinates(samples, 0);

  const endGradient = electrodeGradientCoordinates(samples, totalDistance);

  const tubeWidth = zedTubeRadius * 2 * size;
  const tubeEdgeWidth = zedTubeEdgeWidth * size;
  const electrodeStrokeWidth = 0.002 * size;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="${size}"
  height="${size}"
  viewBox="0 0 ${size} ${size}"
  fill="none"
>
  <title>Zed plasma tube</title>

  <defs>
    ${linearGradient("start-electrode", startGradient)}
    ${linearGradient("end-electrode", endGradient)}

    <filter
      id="plasma-glow-near"
      x="-35%"
      y="-35%"
      width="170%"
      height="170%"
      color-interpolation-filters="sRGB"
    >
      <feGaussianBlur stdDeviation="1.15"/>
    </filter>

    <filter
      id="plasma-glow-wide"
      x="-70%"
      y="-70%"
      width="240%"
      height="240%"
      color-interpolation-filters="sRGB"
    >
      <feGaussianBlur stdDeviation="4.4"/>
    </filter>

    <filter
      id="tube-edge-blur"
      x="-20%"
      y="-20%"
      width="140%"
      height="140%"
      color-interpolation-filters="sRGB"
    >
      <feGaussianBlur stdDeviation="0.16"/>
    </filter>
  </defs>

  <!-- Glass tube face -->
  <path
    d="${centerPath}"
    stroke="${darkModeColors.tube}"
    stroke-width="${round(tubeWidth)}"
    stroke-linecap="butt"
    stroke-linejoin="round"
    opacity="${zedTubeFaceAlpha}"
  />

  <!-- Blurred glass edges -->
  <g
    stroke="${darkModeColors.tube}"
    stroke-width="${round(tubeEdgeWidth)}"
    stroke-linecap="butt"
    stroke-linejoin="round"
    opacity="${zedTubeEdgeAlpha}"
    filter="url(#tube-edge-blur)"
  >
    <path d="${positiveEdgePath}"/>
    <path d="${negativeEdgePath}"/>
  </g>

  <!-- Crisp glass edges -->
  <g
    stroke="${darkModeColors.tube}"
    stroke-width="${round(tubeEdgeWidth / 2)}"
    stroke-linecap="butt"
    stroke-linejoin="round"
    opacity="${zedTubeEdgeAlpha * 0.75}"
  >
    <path d="${positiveEdgePath}"/>
    <path d="${negativeEdgePath}"/>
  </g>

  <!-- Wide plasma glow -->
  <path
    d="${plasmaPath}"
    stroke="${darkModeColors.primary}"
    stroke-width="${zedWideGlowWidth}"
    stroke-linecap="butt"
    stroke-linejoin="round"
    opacity="0.78"
    filter="url(#plasma-glow-wide)"
  />

  <!-- Near plasma glow -->
  <path
    d="${plasmaPath}"
    stroke="${darkModeColors.primary}"
    stroke-width="${zedNearGlowWidth}"
    stroke-linecap="butt"
    stroke-linejoin="round"
    opacity="1"
    filter="url(#plasma-glow-near)"
  />

  <!-- Plasma trace -->
  <path
    d="${plasmaPath}"
    stroke="${darkModeColors.primary}"
    stroke-width="${zedStrokeWidth}"
    stroke-linecap="butt"
    stroke-linejoin="round"
  />

  <!-- Start electrode -->
  <polygon
    points="${pointsToPolygon(startElectrode)}"
    fill="url(#start-electrode)"
    stroke="${darkModeColors.electrodeStroke}"
    stroke-width="${round(electrodeStrokeWidth)}"
    stroke-opacity="0.28"
  />

  <!-- End electrode -->
  <polygon
    points="${pointsToPolygon(endElectrode)}"
    fill="url(#end-electrode)"
    stroke="${darkModeColors.electrodeStroke}"
    stroke-width="${round(electrodeStrokeWidth)}"
    stroke-opacity="0.28"
  />
</svg>
`;
}

async function main(): Promise<void> {
  const svg = buildSvg();
  const optimizedSvg = optimize(svg, {
    multipass: true,
    path: outputPath,
  }).data;

  await mkdir(dirname(outputPath), {
    recursive: true,
  });

  await writeFile(outputPath, `${optimizedSvg}\n`, "utf8");

  console.log(`Generated ${outputPath}`);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
