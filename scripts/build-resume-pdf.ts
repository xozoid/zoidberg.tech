import {
  createServer,
  type IncomingMessage,
  type ServerResponse,
} from "node:http";
import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";

import { chromium, type Browser } from "playwright";

const distDir = path.resolve("dist");
const outputPath = path.join(distDir, "profile", "resume.pdf");

const contentTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".png", "image/png"],
  [".svg", "image/svg+xml"],
  [".webp", "image/webp"],
  [".woff2", "font/woff2"],
]);

const resolveRequestPath = (requestUrl: string | undefined) => {
  const url = new URL(requestUrl ?? "/", "http://127.0.0.1");
  const pathname = decodeURIComponent(url.pathname);
  const filePath = pathname.endsWith("/")
    ? path.join(distDir, pathname, "index.html")
    : path.join(distDir, pathname);
  const normalizedPath = path.normalize(filePath);

  if (!normalizedPath.startsWith(distDir + path.sep)) {
    return null;
  }

  return normalizedPath;
};

const serveDistFile = async (
  request: IncomingMessage,
  response: ServerResponse,
) => {
  const filePath = resolveRequestPath(request.url);

  if (filePath === null) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  response.setHeader(
    "Content-Type",
    contentTypes.get(path.extname(filePath)) ?? "application/octet-stream",
  );
  response.writeHead(200);
  response.end(await readFile(filePath));
};

const server = createServer((request, response) => {
  void serveDistFile(request, response).catch(() => {
    response.writeHead(404);
    response.end("Not found");
  });
});

await new Promise<void>((resolve) => {
  server.listen(0, "127.0.0.1", resolve);
});

const address = server.address();

if (address === null || typeof address === "string") {
  throw new Error("Could not start local static server");
}

let browser: Browser | undefined;

try {
  browser = await chromium.launch({
    args: process.env.CI === "true" ? ["--no-sandbox"] : [],
  });
  const page = await browser.newPage();

  await page.goto(`http://127.0.0.1:${address.port}/profile/resume/`, {
    waitUntil: "networkidle",
  });
  await page.evaluate(() => document.fonts.ready);

  await mkdir(path.dirname(outputPath), { recursive: true });
  await page.pdf({
    path: outputPath,
    format: "Letter",
    printBackground: true,
    margin: {
      top: "0",
      right: "0",
      bottom: "0",
      left: "0",
    },
    scale: 1,
    preferCSSPageSize: true,
  });
} finally {
  await browser?.close();
  await new Promise<void>((resolve, reject) => {
    server.close((error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve();
    });
  });
}
