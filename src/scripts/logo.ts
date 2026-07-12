export type Point = [number, number];
type Rect = { x: number; y: number; w: number; h: number };
export type PathSample = { point: Point; distance: number };

let animationFrame = 0;
let devicePixelRatioCapped = 1;
let view: Rect = { x: 0, y: 0, w: 0, h: 0 };
let glowCanvas: HTMLCanvasElement | undefined;
let glowContext: CanvasRenderingContext2D | undefined;
let noiseSeed = Math.random() * 10_000;

const zedCenterWidth = 0.7;
const zedCenterRadius = 0.07;
const zedCenterInset = (1 - zedCenterWidth) / 2;
export const zedPointSpacing = 0.004;
const zedArcSteps = 48;
const zedTraceDurationSeconds = 6;
const zedHelixAmplitude = 0.05;
const zedRadiusSpatialFrequency = 2;
const zedRadiusTemporalFrequency = 0.1;
const zedPhaseSpatialFrequency = 2;
const zedPhaseTemporalFrequency = 0.1;
const zedPhaseTurns = 12;
const zedPhaseRotationRate = Math.PI * 2;
const zedEndTaperPower = 0.7;
const zedStrokeWidth = 3;
export const zedTubeRadius = 0.055;
export const zedTubeFaceAlpha = 0.07;
export const zedTubeEdgeAlpha = 0.38;
export const zedTubeEdgeWidth = 0.008;
const zedTubeEdgeBlur = 0.0025;
export const zedElectrodeLength = 0.045;
export const zedElectrodeOverlap = 0.008;
export const zedElectrodeRadius = zedTubeRadius * 1.12;
const zedGlowLayers = [
  { width: 0.008, blur: 0.047, alpha: 0.9 },
  { width: 0.016, blur: 0.17, alpha: 0.5 },
  { width: 0.006, blur: 0.009, alpha: 0.1 },
];
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

function resize(canvas: HTMLCanvasElement) {
  devicePixelRatioCapped = Math.min(window.devicePixelRatio || 1, 2);

  const rect = canvas.getBoundingClientRect();
  const w = Math.floor(rect.width * devicePixelRatioCapped);
  const h = Math.floor(rect.height * devicePixelRatioCapped);
  canvas.width = w;
  canvas.height = h;
  glowCanvas ??= document.createElement("canvas");
  glowCanvas.width = w;
  glowCanvas.height = h;
  glowContext = glowCanvas.getContext("2d", { alpha: true }) ?? undefined;

  view.w = view.h = Math.min(w, h);
  view.x = (w - view.w) / 2;
  view.y = (h - view.w) / 2;
}

function distanceBetween(a: Point, b: Point): number {
  return Math.hypot(b[0] - a[0], b[1] - a[1]);
}

function lerpPoint(a: Point, b: Point, t: number): Point {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function smoothstep(t: number): number {
  return t * t * (3 - 2 * t);
}

function toCanvasPoint(point: Point): Point {
  return [view.x + view.w * point[0], view.y + view.h * point[1]];
}

function appendSample(samples: Array<PathSample>, point: Point) {
  const previous = samples.at(-1);
  const distance = previous
    ? previous.distance + distanceBetween(previous.point, point)
    : 0;

  samples.push({ point, distance });
}

function randomUnit(x: number, y: number): number {
  const n = Math.sin(x * 127.1 + y * 311.7 + noiseSeed) * 43758.5453123;

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

function pointOnCircle(center: Point, radius: number, angle: number): Point {
  return [
    center[0] + radius * Math.cos(angle),
    center[1] + radius * Math.sin(angle),
  ];
}

function appendArc(
  samples: Array<PathSample>,
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

export function zedPathSamples(): Array<PathSample> {
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
  const samples: Array<PathSample> = [];

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

export function zedPointAtDistance(
  samples: Array<PathSample>,
  t: number,
): Point {
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
  samples: Array<PathSample>,
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
  samples: Array<PathSample>,
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
): Array<Point> {
  const samples = zedPathSamples();
  const totalDistance = samples.at(-1)?.distance ?? 0;
  const pointCount = Math.ceil(totalDistance / pointSpacing);
  const path: Array<Point> = [];

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

function zedPath(timeSeconds: number): Array<Point> {
  const samples = zedPathSamples();
  const totalDistance = samples.at(-1)?.distance ?? 0;
  const progress = Math.min(
    Math.max(timeSeconds / zedTraceDurationSeconds, 0),
    1,
  );
  const visibleDistance = totalDistance * progress;
  const pointCount = Math.ceil(visibleDistance / zedPointSpacing);
  const path: Array<Point> = [];

  for (let i = 0; i <= pointCount; i++) {
    const t = Math.min(i * zedPointSpacing, visibleDistance);
    const point = zedPointAtDistance(samples, t);
    const normal = zedNormalAtDistance(samples, t, totalDistance);
    const radius = zedHelixRadius(t, timeSeconds, totalDistance);
    const offset = radius * Math.cos(zedHelixPhi(t, timeSeconds));

    path.push(
      toCanvasPoint([
        point[0] + offset * normal[0],
        point[1] + offset * normal[1],
      ]),
    );
  }

  return path;
}

function zedCenterPath(): Array<Point> {
  return zedSampledPath((point) => toCanvasPoint(point));
}

function zedOffsetPath(offset: number): Array<Point> {
  return zedSampledPath((point, normal) =>
    toCanvasPoint([
      point[0] + offset * normal[0],
      point[1] + offset * normal[1],
    ]),
  );
}

function tracePath(context: CanvasRenderingContext2D, path: Array<Point>) {
  context.beginPath();
  context.moveTo(path[0][0], path[0][1]);
  for (const p of path) {
    context.lineTo(p[0], p[1]);
  }
}

function drawElectrode(
  context: CanvasRenderingContext2D,
  samples: Array<PathSample>,
  distance: number,
  outwardDirection: 1 | -1,
) {
  const totalDistance = samples.at(-1)?.distance ?? 0;
  const point = zedPointAtDistance(samples, distance);
  const tangent = zedTangentAtDistance(samples, distance, totalDistance);
  const normal = zedNormalAtDistance(samples, distance, totalDistance);
  const outward: Point = [
    tangent[0] * outwardDirection,
    tangent[1] * outwardDirection,
  ];
  const inner = zedElectrodeOverlap;
  const outer = zedElectrodeLength;
  const corners = [
    toCanvasPoint([
      point[0] - inner * outward[0] + zedElectrodeRadius * normal[0],
      point[1] - inner * outward[1] + zedElectrodeRadius * normal[1],
    ]),
    toCanvasPoint([
      point[0] + outer * outward[0] + zedElectrodeRadius * normal[0],
      point[1] + outer * outward[1] + zedElectrodeRadius * normal[1],
    ]),
    toCanvasPoint([
      point[0] + outer * outward[0] - zedElectrodeRadius * normal[0],
      point[1] + outer * outward[1] - zedElectrodeRadius * normal[1],
    ]),
    toCanvasPoint([
      point[0] - inner * outward[0] - zedElectrodeRadius * normal[0],
      point[1] - inner * outward[1] - zedElectrodeRadius * normal[1],
    ]),
  ];
  const gradientStart = toCanvasPoint([
    point[0] - zedElectrodeRadius * normal[0],
    point[1] - zedElectrodeRadius * normal[1],
  ]);
  const gradientEnd = toCanvasPoint([
    point[0] + zedElectrodeRadius * normal[0],
    point[1] + zedElectrodeRadius * normal[1],
  ]);
  const gradient = context.createLinearGradient(
    gradientStart[0],
    gradientStart[1],
    gradientEnd[0],
    gradientEnd[1],
  );

  gradient.addColorStop(0, darkModeColors.electrodeGradient[0]);
  gradient.addColorStop(0.2, darkModeColors.electrodeGradient[1]);
  gradient.addColorStop(0.5, darkModeColors.electrodeGradient[2]);
  gradient.addColorStop(0.8, darkModeColors.electrodeGradient[3]);
  gradient.addColorStop(1, darkModeColors.electrodeGradient[4]);

  context.save();
  context.filter = "none";
  context.globalAlpha = 1;
  context.beginPath();
  context.moveTo(corners[0][0], corners[0][1]);
  for (const corner of corners.slice(1)) {
    context.lineTo(corner[0], corner[1]);
  }
  context.closePath();
  context.fillStyle = gradient;
  context.fill();
  context.lineWidth = 0.002 * view.w;
  context.strokeStyle = darkModeColors.electrodeStroke;
  context.globalAlpha = 0.28;
  context.stroke();
  context.restore();
}

function drawElectrodes(context: CanvasRenderingContext2D) {
  const samples = zedPathSamples();
  const totalDistance = samples.at(-1)?.distance ?? 0;

  drawElectrode(context, samples, 0, -1);
  drawElectrode(context, samples, totalDistance, 1);
}

function drawGlassTube(context: CanvasRenderingContext2D) {
  const centerPath = zedCenterPath();
  const edgePaths = [
    zedOffsetPath(zedTubeRadius),
    zedOffsetPath(-zedTubeRadius),
  ];

  context.save();
  context.lineCap = "butt";
  context.lineJoin = "round";
  context.strokeStyle = darkModeColors.tube;
  context.filter = "none";
  context.globalAlpha = zedTubeFaceAlpha;
  tracePath(context, centerPath);
  context.lineWidth = zedTubeRadius * 2 * view.w;
  context.stroke();

  context.globalAlpha = zedTubeEdgeAlpha;
  context.filter = `blur(${zedTubeEdgeBlur * view.w}px)`;
  context.lineWidth = zedTubeEdgeWidth * view.w;
  for (const edgePath of edgePaths) {
    tracePath(context, edgePath);
    context.stroke();
  }

  context.filter = "none";
  context.globalAlpha = zedTubeEdgeAlpha * 0.75;
  context.lineWidth = (zedTubeEdgeWidth * view.w) / 2;
  for (const edgePath of edgePaths) {
    tracePath(context, edgePath);
    context.stroke();
  }
  context.restore();
}

function initLogo() {
  const canvas = document.querySelector<HTMLCanvasElement>("#z-glow");
  const context = canvas?.getContext("2d", { alpha: true });

  if (!canvas || !context) return;

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  let animationStartMs: number | undefined;

  const render = (now = 0) => {
    animationStartMs ??= now;
    const time = reduceMotion
      ? zedTraceDurationSeconds
      : (now - animationStartMs) / 1000;

    context.clearRect(0, 0, canvas.width, canvas.height);

    const path = zedPath(time);
    const primaryColor = darkModeColors.primary;

    drawGlassTube(context);

    context.lineCap = "butt";
    context.lineJoin = "round";
    context.filter = "none";
    context.globalAlpha = 1;
    tracePath(context, path);
    context.lineWidth = zedStrokeWidth * devicePixelRatioCapped;
    context.strokeStyle = primaryColor;
    context.stroke();

    drawElectrodes(context);

    if (glowContext && glowCanvas) {
      glowContext.clearRect(0, 0, glowCanvas.width, glowCanvas.height);
      glowContext.lineCap = "butt";
      glowContext.lineJoin = "round";
      glowContext.strokeStyle = primaryColor;
      glowContext.globalAlpha = 1;
      glowContext.filter = "none";

      for (const layer of zedGlowLayers) {
        tracePath(glowContext, path);
        glowContext.lineWidth = layer.width * view.w;
        glowContext.stroke();
      }

      for (const layer of zedGlowLayers) {
        context.globalAlpha = layer.alpha;
        context.filter = `blur(${layer.blur * view.w}px)`;
        context.drawImage(glowCanvas, 0, 0);
      }
    }
    context.filter = "none";
    context.globalAlpha = 1;

    if (!reduceMotion) animationFrame = window.requestAnimationFrame(render);
  };
  const handleResize = () => {
    resize(canvas);
    if (reduceMotion) render();
  };
  const cleanup = () => {
    window.cancelAnimationFrame(animationFrame);
    window.removeEventListener("resize", handleResize);
    document.removeEventListener("astro:before-swap", cleanup);
  };

  window.addEventListener("resize", handleResize);
  document.addEventListener("astro:before-swap", cleanup);
  resize(canvas);
  animationFrame = window.requestAnimationFrame(render);
}

if (typeof document !== "undefined") {
  initLogo();
}
