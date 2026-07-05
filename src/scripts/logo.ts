type Point = [number, number];
type Rect = { x: number; y: number; w: number; h: number };
type PathSample = { point: Point; distance: number };

let animationFrame = 0;
let devicePixelRatioCapped = 1;
let view: Rect = { x: 0, y: 0, w: 0, h: 0 };

const zedCenterWidth = 0.7;
const zedCenterRadius = 0.07;
const zedCenterInset = (1 - zedCenterWidth) / 2;
const zedPointSpacing = 0.01;
const zedArcSteps = 24;
const zedTraceDurationSeconds = 5;

function resize(canvas: HTMLCanvasElement) {
  devicePixelRatioCapped = Math.min(window.devicePixelRatio || 1, 2);

  const rect = canvas.getBoundingClientRect();
  const w = Math.floor(rect.width * devicePixelRatioCapped);
  const h = Math.floor(rect.height * devicePixelRatioCapped);
  canvas.width = w;
  canvas.height = h;

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

function zedPathSamples(): Array<PathSample> {
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

function zedPointAtDistance(samples: Array<PathSample>, t: number): Point {
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

    path.push(toCanvasPoint(zedPointAtDistance(samples, t)));
  }

  return path;
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

    context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

    const path = zedPath(time);

    context.beginPath();
    context.moveTo(path[0][0], path[0][1]);
    for (const p of path) {
      context.lineTo(p[0], p[1]);
    }
    context.lineWidth = 1;
    context.strokeStyle = "white";
    context.stroke();

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

initLogo();
