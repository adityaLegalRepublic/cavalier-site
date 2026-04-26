import { access, readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const dist = path.join(root, "dist");
const required = [
  "/",
  "/best-nda-coaching",
  "/best-cds-coaching",
  "/ssb-interview-coaching",
  "/defence-news",
  "/ssb-current-affairs",
  "/nda-study-material",
  "/cds-ota-study-material",
  "/practice-daily"
];

const sitemap = await readFile(path.join(dist, "sitemap.xml"), "utf8");
const missing = [];

for (const url of required) {
  const file = url === "/" ? path.join(dist, "index.html") : path.join(dist, url.slice(1), "index.html");
  try {
    await access(file);
  } catch {
    missing.push(url);
  }
  const loc = url === "/" ? "https://www.cavalier.in" : `https://www.cavalier.in${url}`;
  if (!sitemap.includes(`<loc>${loc}</loc>`)) missing.push(`${url} missing from sitemap`);
}

if (missing.length) {
  console.error("Missing required outputs:");
  for (const item of missing) console.error(`- ${item}`);
  process.exit(1);
}

console.log("URL check passed.");
