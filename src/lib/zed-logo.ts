export type Point = [number, number];
export type PathSample = { point: Point; distance: number };

export type ZedRenderProfile = {
  size: number;
  scale: number;
  center: Point;
  pointSpacing: number;
  plasmaStrokeWidth: number;
  nearGlowWidth: number;
  nearGlowBlur: number;
  nearGlowAlpha: number;
  wideGlowWidth: number;
  wideGlowBlur: number;
  wideGlowAlpha: number;
  tubeRadiusScale: number;
  tubeFaceAlpha: number;
  tubeEdgeAlpha: number;
  tubeEdgeWidthScale: number;
  tubeEdgeBlur: number;
  electrodeRadiusScale: number;
  electrodeStrokeWidth: number;
  showGlassEdges: boolean;
  showHelix: boolean;
  background?: string;
  ambientGlowAlpha?: number;
  ambientGlowBlur?: number;
  ambientGlowWidth?: number;
  fixedNoiseSeed?: number;
  fixedTimeSeconds?: number;
};

export type ZedRenderViewport = {
  size: number;
  drawSize: number;
  origin: Point;
  point: (point: Point) => Point;
  normalizedLength: (length: number) => number;
  profileLength: (length: number) => number;
};

export type ZedElectrodeDimensions = {
  length: number;
  overlap: number;
  radius: number;
};

export const zedCenterWidth = 0.7;
export const zedCenterRadius = 0.07;
export const zedCenterInset = (1 - zedCenterWidth) / 2;
export const zedPointSpacing = 0.004;
export const zedArcSteps = 48;
export const zedTraceDurationSeconds = 6;
export const zedHelixAmplitude = 0.05;
export const zedRadiusSpatialFrequency = 2;
export const zedRadiusTemporalFrequency = 0.1;
export const zedPhaseSpatialFrequency = 2;
export const zedPhaseTemporalFrequency = 0.1;
export const zedPhaseTurns = 12;
export const zedPhaseRotationRate = Math.PI * 2;
export const zedEndTaperPower = 0.7;
export const zedStrokeWidth = 3;
export const zedTubeRadius = 0.055;
export const zedTubeFaceAlpha = 0.07;
export const zedTubeEdgeAlpha = 0.38;
export const zedTubeEdgeWidth = 0.008;
export const zedTubeEdgeBlur = 0.0025;
export const zedElectrodeLength = 0.045;
export const zedElectrodeOverlap = 0.008;
export const zedElectrodeRadius = zedTubeRadius * 1.12;

export const zedElectrodeDimensions: ZedElectrodeDimensions = {
  length: zedElectrodeLength,
  overlap: zedElectrodeOverlap,
  radius: zedElectrodeRadius,
};

export const zedGlowLayers = [
  { width: 0.008, blur: 0.047, alpha: 0.9 },
  { width: 0.016, blur: 0.17, alpha: 0.5 },
  { width: 0.006, blur: 0.009, alpha: 0.1 },
] as const;

export const darkModeColors = {
  surface: "#0a0c10",
  primary: "#48d8ff",
  tube: "rgb(220 245 255)",
  electrodeStroke: "rgb(245 252 255)",
  electrodeGradient: [
    "rgb(88 96 100)",
    "rgb(168 178 182)",
    "rgb(116 126 130)",
    "rgb(186 196 198)",
    "rgb(82 90 94)",
  ],
} as const;

export const faviconRenderProfile: ZedRenderProfile = {
  size: 64,
  scale: 1,
  center: [0.5, 0.5],
  pointSpacing: 0.002,
  plasmaStrokeWidth: 5.6,
  nearGlowWidth: 6.4,
  nearGlowBlur: 1.15,
  nearGlowAlpha: 1,
  wideGlowWidth: 8.6,
  wideGlowBlur: 4.4,
  wideGlowAlpha: 0.78,
  tubeRadiusScale: 1,
  tubeFaceAlpha: zedTubeFaceAlpha,
  tubeEdgeAlpha: zedTubeEdgeAlpha,
  tubeEdgeWidthScale: 1,
  tubeEdgeBlur: 0.16,
  electrodeRadiusScale: 1,
  electrodeStrokeWidth: 0.002,
  showGlassEdges: true,
  showHelix: false,
};

export const avatarRenderProfile: ZedRenderProfile = {
  size: 1024,
  scale: 0.8,
  center: [0.5, 0.5],
  pointSpacing: 0.0016,
  plasmaStrokeWidth: 40,
  nearGlowWidth: 20,
  nearGlowBlur: 20,
  nearGlowAlpha: 0.6,
  wideGlowWidth: 132,
  wideGlowBlur: 70,
  wideGlowAlpha: 0.34,
  tubeRadiusScale: 1.22,
  tubeFaceAlpha: 0.1,
  tubeEdgeAlpha: 0.4,
  tubeEdgeWidthScale: 1.45,
  tubeEdgeBlur: 1.2,
  electrodeRadiusScale: 1.24,
  electrodeStrokeWidth: 0.0026,
  showGlassEdges: true,
  showHelix: true,
  background: darkModeColors.surface,
  ambientGlowAlpha: 0.14,
  ambientGlowBlur: 86,
  ambientGlowWidth: 188,
  fixedNoiseSeed: 0,
  fixedTimeSeconds: 40,
};

export function zedRenderViewport(
  profile: Pick<ZedRenderProfile, "size" | "scale" | "center">,
): ZedRenderViewport {
  const drawSize = profile.size * profile.scale;
  const origin: Point = [
    profile.center[0] * profile.size - drawSize / 2,
    profile.center[1] * profile.size - drawSize / 2,
  ];

  return {
    size: profile.size,
    drawSize,
    origin,
    point: (point) => [
      origin[0] + point[0] * drawSize,
      origin[1] + point[1] * drawSize,
    ],
    normalizedLength: (length) => length * drawSize,
    profileLength: (length) => length * profile.scale,
  };
}

export function distanceBetween(a: Point, b: Point): number {
  return Math.hypot(b[0] - a[0], b[1] - a[1]);
}

export function lerpPoint(a: Point, b: Point, t: number): Point {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
}

function pointOnCircle(center: Point, radius: number, angle: number): Point {
  return [
    center[0] + radius * Math.cos(angle),
    center[1] + radius * Math.sin(angle),
  ];
}

function appendSample(samples: PathSample[], point: Point) {
  const previous = samples.at(-1);
  const distance = previous
    ? previous.distance + distanceBetween(previous.point, point)
    : 0;

  samples.push({ point, distance });
}

function appendArc(
  samples: PathSample[],
  center: Point,
  radius: number,
  startAngle: number,
  endAngle: number,
  direction: 1 | -1,
) {
  const fullTurn = Math.PI * 2;
  let sweep = endAngle - startAngle;

  if (direction > 0 && sweep < 0) sweep += fullTurn;
  if (direction < 0 && sweep > 0) sweep -= fullTurn;

  for (let i = 1; i <= zedArcSteps; i++) {
    const angle = startAngle + (sweep * i) / zedArcSteps;

    appendSample(samples, pointOnCircle(center, radius, angle));
  }
}

export function zedPathSamples(): PathSample[] {
  const left = zedCenterInset;
  const right = 1 - zedCenterInset;
  const top = zedCenterInset;
  const bottom = 1 - zedCenterInset;
  const radius = zedCenterRadius;

  const start: Point = [left, top];
  const end: Point = [right, bottom];
  const topCenter: Point = [right - radius, top + radius];
  const bottomCenter: Point = [left + radius, bottom - radius];
  const centerDelta: Point = [
    bottomCenter[0] - topCenter[0],
    bottomCenter[1] - topCenter[1],
  ];
  const centerDistance = distanceBetween(topCenter, bottomCenter);
  const centerDirection: Point = [
    centerDelta[0] / centerDistance,
    centerDelta[1] / centerDistance,
  ];
  const perpendicular: Point = [-centerDirection[1], centerDirection[0]];
  const tangentOffset = (-2 * radius) / centerDistance;
  const tangentScale = Math.sqrt(1 - tangentOffset * tangentOffset);
  const tangentNormal: Point = [
    tangentOffset * centerDirection[0] + tangentScale * perpendicular[0],
    tangentOffset * centerDirection[1] + tangentScale * perpendicular[1],
  ];
  const topLineEnd: Point = [topCenter[0], top];
  const topArcEnd: Point = [
    topCenter[0] - radius * tangentNormal[0],
    topCenter[1] - radius * tangentNormal[1],
  ];
  const bottomArcStart: Point = [
    bottomCenter[0] + radius * tangentNormal[0],
    bottomCenter[1] + radius * tangentNormal[1],
  ];
  const bottomArcEnd: Point = [bottomCenter[0], bottom];
  const samples: PathSample[] = [];

  appendSample(samples, start);
  appendSample(samples, topLineEnd);

  appendArc(
    samples,
    topCenter,
    radius,
    -Math.PI / 2,
    Math.atan2(topArcEnd[1] - topCenter[1], topArcEnd[0] - topCenter[0]),
    1,
  );

  appendSample(samples, bottomArcStart);

  appendArc(
    samples,
    bottomCenter,
    radius,
    Math.atan2(
      bottomArcStart[1] - bottomCenter[1],
      bottomArcStart[0] - bottomCenter[0],
    ),
    Math.atan2(
      bottomArcEnd[1] - bottomCenter[1],
      bottomArcEnd[0] - bottomCenter[0],
    ),
    -1,
  );

  appendSample(samples, end);

  return samples;
}

export function zedPointAtDistance(samples: PathSample[], t: number): Point {
  const last = samples.at(-1);

  if (!last || t <= 0) return samples[0]?.point ?? [0, 0];
  if (t >= last.distance) return last.point;

  for (let i = 1; i < samples.length; i++) {
    const sample = samples[i];
    const previous = samples[i - 1];

    if (t <= sample.distance) {
      const segmentLength = sample.distance - previous.distance;
      const segmentT = segmentLength
        ? (t - previous.distance) / segmentLength
        : 0;

      return lerpPoint(previous.point, sample.point, segmentT);
    }
  }

  return last.point;
}

export function zedNormalAtDistance(
  samples: PathSample[],
  t: number,
  totalDistance: number,
  sampleDistance = zedPointSpacing / 2,
): Point {
  const startDistance = Math.max(t - sampleDistance, 0);
  const endDistance = Math.min(t + sampleDistance, totalDistance);
  const start = zedPointAtDistance(samples, startDistance);
  const end = zedPointAtDistance(samples, endDistance);
  const dx = end[0] - start[0];
  const dy = end[1] - start[1];
  const length = Math.hypot(dx, dy);

  if (!length) return [0, 0];

  return [dy / length, -dx / length];
}

export function zedTangentAtDistance(
  samples: PathSample[],
  t: number,
  totalDistance: number,
  sampleDistance = zedPointSpacing / 2,
): Point {
  const normal = zedNormalAtDistance(samples, t, totalDistance, sampleDistance);

  return [-normal[1], normal[0]];
}

export function zedSampledPath(
  project: (
    point: Point,
    normal: Point,
    distance: number,
    totalDistance: number,
  ) => Point,
  pointSpacing = zedPointSpacing,
): Point[] {
  const samples = zedPathSamples();
  const totalDistance = samples.at(-1)?.distance ?? 0;
  const pointCount = Math.ceil(totalDistance / pointSpacing);
  const path: Point[] = [];

  for (let i = 0; i <= pointCount; i++) {
    const t = Math.min(i * pointSpacing, totalDistance);
    const point = zedPointAtDistance(samples, t);
    const normal = zedNormalAtDistance(
      samples,
      t,
      totalDistance,
      pointSpacing / 2,
    );

    path.push(project(point, normal, t, totalDistance));
  }

  return path;
}

export function zedCenterPath(
  project: (point: Point) => Point = (point) => point,
  pointSpacing = zedPointSpacing,
): Point[] {
  return zedSampledPath((point) => project(point), pointSpacing);
}

export function zedOffsetPath(
  offset: number,
  project: (point: Point) => Point = (point) => point,
  pointSpacing = zedPointSpacing,
): Point[] {
  return zedSampledPath(
    (point, normal) =>
      project([point[0] + offset * normal[0], point[1] + offset * normal[1]]),
    pointSpacing,
  );
}

export function zedElectrodePolygon(
  samples: PathSample[],
  distance: number,
  outwardDirection: 1 | -1,
  sampleDistance = zedPointSpacing / 2,
  dimensions = zedElectrodeDimensions,
): Point[] {
  const totalDistance = samples.at(-1)?.distance ?? 0;
  const point = zedPointAtDistance(samples, distance);
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
  const inner = dimensions.overlap;
  const outer = dimensions.length;
  const radius = dimensions.radius;

  return [
    [
      point[0] - inner * outward[0] + radius * normal[0],
      point[1] - inner * outward[1] + radius * normal[1],
    ],
    [
      point[0] + outer * outward[0] + radius * normal[0],
      point[1] + outer * outward[1] + radius * normal[1],
    ],
    [
      point[0] + outer * outward[0] - radius * normal[0],
      point[1] + outer * outward[1] - radius * normal[1],
    ],
    [
      point[0] - inner * outward[0] - radius * normal[0],
      point[1] - inner * outward[1] - radius * normal[1],
    ],
  ];
}

export function zedElectrodeGradientAxis(
  samples: PathSample[],
  distance: number,
  sampleDistance = zedPointSpacing / 2,
  radius = zedElectrodeRadius,
): { start: Point; end: Point } {
  const totalDistance = samples.at(-1)?.distance ?? 0;
  const point = zedPointAtDistance(samples, distance);
  const normal = zedNormalAtDistance(
    samples,
    distance,
    totalDistance,
    sampleDistance,
  );

  return {
    start: [point[0] - radius * normal[0], point[1] - radius * normal[1]],
    end: [point[0] + radius * normal[0], point[1] + radius * normal[1]],
  };
}
