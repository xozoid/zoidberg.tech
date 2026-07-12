import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";

import { optimize } from "svgo";

import { buildAvatarSvg } from "./generate-avatar";
import {
  zedCenterInset,
  zedCenterPath,
  zedElectrodePolygon,
  zedOffsetPath,
  zedPathSamples,
} from "../src/lib/zed-logo";

function assert(condition: boolean, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

function assertFinitePoint(point: readonly number[], label: string): void {
  assert(point.length === 2, `${label} must have two coordinates`);
  assert(Number.isFinite(point[0]), `${label} x must be finite`);
  assert(Number.isFinite(point[1]), `${label} y must be finite`);
}

function assertClose(actual: number, expected: number, label: string): void {
  const tolerance = 1e-12;

  assert(
    Math.abs(actual - expected) <= tolerance,
    `${label} expected ${expected}, received ${actual}`,
  );
}

function hash(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

async function assertSvgParses(path: string): Promise<void> {
  const svg = await readFile(path, "utf8");
  const result = optimize(svg, {
    multipass: false,
    path,
  });

  assert("data" in result && result.data.length > 0, `${path} must parse`);
}

async function main(): Promise<void> {
  const samples = zedPathSamples();
  const first = samples[0];
  const last = samples.at(-1);

  assert(first !== undefined, "centerline must contain a first sample");
  assert(last !== undefined, "centerline must contain a last sample");
  assertClose(first.point[0], zedCenterInset, "centerline start x");
  assertClose(first.point[1], zedCenterInset, "centerline start y");
  assertClose(last.point[0], 1 - zedCenterInset, "centerline end x");
  assertClose(last.point[1], 1 - zedCenterInset, "centerline end y");

  for (let i = 0; i < samples.length; i++) {
    const sample = samples[i];
    const previous = samples[i - 1];

    assertFinitePoint(sample.point, `sample ${i}`);
    if (previous) {
      assert(
        sample.distance >= previous.distance,
        `sample ${i} distance must be monotonic`,
      );
    }
  }

  const centerPath = zedCenterPath();
  const positiveTubeEdge = zedOffsetPath(0.055);
  const negativeTubeEdge = zedOffsetPath(-0.055);

  assert(
    positiveTubeEdge.length === centerPath.length,
    "positive tube-edge path must match center path point count",
  );
  assert(
    negativeTubeEdge.length === centerPath.length,
    "negative tube-edge path must match center path point count",
  );

  for (const [name, path] of [
    ["center", centerPath],
    ["positive edge", positiveTubeEdge],
    ["negative edge", negativeTubeEdge],
  ] as const) {
    for (let i = 0; i < path.length; i++) {
      assertFinitePoint(path[i], `${name} point ${i}`);
    }
  }

  const totalDistance = last.distance;
  const electrodes = [
    zedElectrodePolygon(samples, 0, -1),
    zedElectrodePolygon(samples, totalDistance, 1),
  ];

  for (
    let electrodeIndex = 0;
    electrodeIndex < electrodes.length;
    electrodeIndex++
  ) {
    const electrode = electrodes[electrodeIndex];

    assert(
      electrode.length === 4,
      `electrode ${electrodeIndex} must have four points`,
    );
    for (let pointIndex = 0; pointIndex < electrode.length; pointIndex++) {
      assertFinitePoint(
        electrode[pointIndex],
        `electrode ${electrodeIndex} point ${pointIndex}`,
      );
    }
  }

  await assertSvgParses("public/favicon.svg");
  await assertSvgParses("public/avatar.svg");

  const firstAvatarSvg = buildAvatarSvg();
  const secondAvatarSvg = buildAvatarSvg();

  assert(
    hash(firstAvatarSvg) === hash(secondAvatarSvg),
    "avatar SVG generation must be deterministic",
  );

  const browserEntrypoint = await readFile("src/scripts/logo.ts", "utf8");

  assert(
    !browserEntrypoint.includes('"node:') &&
      !browserEntrypoint.includes("'node:"),
    "browser logo entrypoint must not import Node-only modules",
  );

  console.log("Brand asset verification passed");
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
