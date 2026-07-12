import {
  darkModeColors,
  type PathSample,
  type Point,
  zedElectrodeGradientAxis,
  zedElectrodePolygon,
  zedGlowLayers,
  zedHelixAmplitude,
  zedPhaseRotationRate,
  zedPhaseSpatialFrequency,
  zedPhaseTemporalFrequency,
  zedPhaseTurns,
  zedPointAtDistance,
  zedPointSpacing,
  zedRadiusSpatialFrequency,
  zedRadiusTemporalFrequency,
  zedSampledPath,
  zedStrokeWidth,
  zedTraceDurationSeconds,
  zedTubeEdgeAlpha,
  zedTubeEdgeBlur,
  zedTubeEdgeWidth,
  zedTubeFaceAlpha,
  zedTubeRadius,
  zedEndTaperPower,
  zedPathSamples,
  zedNormalAtDistance,
} from "src/lib/zed-logo";

type Rect = { x: number; y: number; w: number; h: number };

let animationFrame = 0;
let devicePixelRatioCapped = 1;
let view: Rect = { x: 0, y: 0, w: 0, h: 0 };
let glowCanvas: HTMLCanvasElement | undefined;
let glowContext: CanvasRenderingContext2D | undefined;
let noiseSeed = Math.random() * 10_000;

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

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function smoothstep(t: number): number {
  return t * t * (3 - 2 * t);
}

function toCanvasPoint(point: Point): Point {
  return [view.x + view.w * point[0], view.y + view.h * point[1]];
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
  const corners = zedElectrodePolygon(samples, distance, outwardDirection).map(
    toCanvasPoint,
  );
  const gradientAxis = zedElectrodeGradientAxis(samples, distance);
  const gradientStart = toCanvasPoint(gradientAxis.start);
  const gradientEnd = toCanvasPoint(gradientAxis.end);
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
