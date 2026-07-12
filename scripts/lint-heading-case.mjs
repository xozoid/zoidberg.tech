import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const ROOT_DIR = process.cwd();
const SOURCE_DIRS = ["src"];
const CHECKED_EXTENSIONS = new Set([".astro", ".html"]);
const HEADING_PATTERN = /<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi;
const TAG_PATTERN = /<[^>]*>/g;
const WORD_PATTERN = /[\p{L}][\p{L}\p{M}'-]*/gu;

const ENTITY_MAP = new Map([
  ["amp", "&"],
  ["gt", ">"],
  ["lt", "<"],
  ["quot", '"'],
  ["apos", "'"],
  ["nbsp", " "],
]);

const files = [];

for (const sourceDir of SOURCE_DIRS) {
  await collectFiles(path.join(ROOT_DIR, sourceDir));
}

const failures = [];

for (const filePath of files) {
  const source = await readFile(filePath, "utf8");

  for (const match of source.matchAll(HEADING_PATTERN)) {
    const headingLevel = match[1];
    const rawContent = match[2];

    if (rawContent.includes("{") || rawContent.includes("}")) {
      continue;
    }

    const headingText = decodeEntities(rawContent)
      .replace(TAG_PATTERN, "")
      .replace(/\s+/g, " ")
      .trim();

    if (!headingText) {
      continue;
    }

    const titleWords = findTitleCaseWords(headingText);

    if (titleWords.length === 0) {
      continue;
    }

    failures.push({
      filePath,
      headingLevel,
      headingText,
      lineNumber: getLineNumber(source, match.index ?? 0),
      titleWords,
    });
  }
}

if (failures.length > 0) {
  console.error("Headings must use sentence case.");
  console.error(
    "Only the first word should be title-cased; acronyms and camel-cased proper names are allowed.",
  );

  for (const failure of failures) {
    const relativePath = path.relative(ROOT_DIR, failure.filePath);
    console.error(
      `${relativePath}:${failure.lineNumber}: h${failure.headingLevel} "${failure.headingText}"`,
    );
    console.error(`  Title-cased words: ${failure.titleWords.join(", ")}`);
  }

  process.exitCode = 1;
}

async function collectFiles(dirPath) {
  const entries = await readdir(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const entryPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      await collectFiles(entryPath);
      continue;
    }

    if (CHECKED_EXTENSIONS.has(path.extname(entry.name))) {
      files.push(entryPath);
    }
  }
}

function decodeEntities(value) {
  return value.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (entity, body) => {
    if (body.startsWith("#x")) {
      return String.fromCodePoint(Number.parseInt(body.slice(2), 16));
    }

    if (body.startsWith("#")) {
      return String.fromCodePoint(Number.parseInt(body.slice(1), 10));
    }

    return ENTITY_MAP.get(body.toLowerCase()) ?? entity;
  });
}

function findTitleCaseWords(text) {
  const words = Array.from(text.matchAll(WORD_PATTERN), ([word]) => word);

  return words.slice(1).filter(isSimpleTitleCaseWord);
}

function isSimpleTitleCaseWord(word) {
  return /^\p{Lu}[\p{Ll}\p{M}'-]+$/u.test(word);
}

function getLineNumber(source, index) {
  return source.slice(0, index).split("\n").length;
}
