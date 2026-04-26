import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const dist = path.join(root, "dist");
const config = JSON.parse(await readFile(path.join(root, "site.config.json"), "utf8"));

const existingPages = [
  ["/", "Cavalier"],
  ["/about-us", "About Cavalier"],
  ["/contact-us", "Contact Us"],
  ["/faq", "FAQ"],
  ["/gallery", "Gallery"],
  ["/legal-disclaimer", "Legal Disclaimer"],
  ["/privacy-policy", "Privacy Policy"],
  ["/refund-policy", "Refund Policy"],
  ["/terms-conditions", "Terms and Conditions"],
  ["/best-nda-coaching", "Best NDA Coaching"],
  ["/best-cds-coaching", "Best CDS Coaching"],
  ["/ssb-interview-coaching", "SSB Interview Coaching"],
  ["/afcat-coaching", "AFCAT Coaching"],
  ["/capf-coaching", "CAPF Coaching"],
  ["/gto-series", "GTO Series"],
  ["/best-acc-coaching", "Best ACC Coaching"],
  ["/coast-guard-ac-coaching", "Coast Guard AC Coaching"],
  ["/tes-ssb-coaching", "TES SSB Coaching"],
  ["/nda-foundation-course-after-10th", "NDA Foundation Course After 10th"],
  ["/sainik-military-school", "Sainik and Military School"],
  ["/territorial-army", "Territorial Army"],
  ["/upcoming-courses-cavalier-delhi", "Upcoming Courses Cavalier Delhi"],
  ["/the-cavalier-classroom", "The Cavalier Classroom"],
  ["/nda-cds-medical-standards", "NDA CDS Medical Standards"],
  ["/nda-for-girls", "NDA for Girls"],
  ["/nda-pyq-answer-key", "NDA PYQ Answer Key"],
  ["/cds-pyq-answer-key", "CDS PYQ Answer Key"],
  ["/age-calculator", "Age Calculator"],
  ["/indian-army-salary-and-pay-scale-structure", "Indian Army Salary and Pay Scale Structure"],
  ["/exam-notifications", "Exam Notifications"],
  ["/free-resources", "Free Resources"],
  ["/screening-test", "Screening Test"],
  ["/psychological-test", "Psychological Test"],
  ["/ppdt", "PPDT"],
  ["/thematic-apperception-test", "Thematic Apperception Test"],
  ["/situation-reaction-test-srt", "Situation Reaction Test"],
  ["/wat-examples-for-ssb-interviews", "WAT Examples for SSB Interviews"],
  ["/self-discription-sd", "Self Description SD"],
  ["/pi-in-ssb", "PI in SSB"],
  ["/ssb-interview-tips", "SSB Interview Tips"],
  ["/lecturette", "Lecturette"],
  ["/importance-of-offline-ssb-interview-coaching", "Importance of Offline SSB Interview Coaching"],
  ["/ssb-outdoor-training-images", "SSB Outdoor Training Images"],
  ["/group-testing-officers-gto", "Group Testing Officers GTO"],
  ["/command-task", "Command Task"],
  ["/progressive-group-task-pgt-ssb", "Progressive Group Task PGT SSB"],
  ["/half-group-task-hgt", "Half Group Task HGT"],
  ["/final-group-task", "Final Group Task"],
  ["/individual-obstacles", "Individual Obstacles"],
  ["/snake-race-in-ssb", "Snake Race in SSB"],
  ["/group-discussion-ssb", "Group Discussion SSB"],
  ["/group-planning-exercise-gpe-ssb", "Group Planning Exercise GPE SSB"],
  ["/student-testimonials", "Student Testimonials"],
  ["/success-stories", "Success Stories"],
  ["/the-cavalier-outdoors", "The Cavalier Outdoors"],
  ["/nda-current-affairs", "NDA Current Affairs"],
  ["/cds-capf-current-affair", "CDS CAPF Current Affairs"],
  ["/cds-capf-weekly-current-affairs", "CDS CAPF Weekly Current Affairs"]
];

const categoryPages = [
  ["/blog/categories/nda-preparation", "NDA Preparation"],
  ["/blog/categories/cds-exam-prep", "CDS Exam Prep"],
  ["/blog/categories/ssb-interview-prep", "SSB Interview Prep"],
  ["/blog/categories/afcat-insights", "AFCAT Insights"],
  ["/blog/categories/capf-ac", "CAPF AC"],
  ["/blog/categories/gto-ssb", "GTO SSB"],
  ["/blog/categories/current-affairs", "Current Affairs"]
];

const fixedNewPages = [
  ["/defence-news", "Defence News"],
  ["/ssb-current-affairs", "SSB Current Affairs"],
  ["/nda-study-material", "NDA Study Material"],
  ["/nda-study-material/maths", "NDA Maths Study Material"],
  ["/nda-study-material/physics", "NDA Physics Study Material"],
  ["/nda-study-material/chemistry", "NDA Chemistry Study Material"],
  ["/nda-study-material/biology", "NDA Biology Study Material"],
  ["/nda-study-material/history", "NDA History Study Material"],
  ["/nda-study-material/geography", "NDA Geography Study Material"],
  ["/nda-study-material/polity", "NDA Polity Study Material"],
  ["/nda-study-material/english", "NDA English Study Material"],
  ["/cds-ota-study-material", "CDS OTA Study Material"],
  ["/cds-ota-study-material/english", "CDS OTA English Study Material"],
  ["/cds-ota-study-material/history", "CDS OTA History Study Material"],
  ["/cds-ota-study-material/geography", "CDS OTA Geography Study Material"],
  ["/cds-ota-study-material/polity", "CDS OTA Polity Study Material"],
  ["/cds-ota-study-material/economy", "CDS OTA Economy Study Material"],
  ["/cds-ota-study-material/science", "CDS OTA Science Study Material"],
  ["/cds-ota-study-material/maths", "CDS OTA Maths Study Material"],
  ["/practice-daily", "Daily Practice"],
  ["/practice-daily/nda-exam", "NDA Daily Practice"],
  ["/practice-daily/cds-ota-exam", "CDS OTA Daily Practice"],
  ["/practice-daily/ssb-interview", "SSB Interview Daily Practice"]
];

const dataFiles = {
  nda: JSON.parse(await readFile(path.join(root, "data/nda-topics.json"), "utf8")),
  cds: JSON.parse(await readFile(path.join(root, "data/cds-topics.json"), "utf8")),
  practiceNda: JSON.parse(await readFile(path.join(root, "data/practice-nda.json"), "utf8")),
  practiceCds: JSON.parse(await readFile(path.join(root, "data/practice-cds.json"), "utf8")),
  practiceSsb: JSON.parse(await readFile(path.join(root, "data/practice-ssb.json"), "utf8")),
  defenceNews: JSON.parse(await readFile(path.join(root, "data/defence-news.json"), "utf8"))
};

const allPages = [...existingPages, ...categoryPages, ...fixedNewPages];
const generatedUrls = [
  ...dataFiles.nda.map((item) => [item.url, item.title]),
  ...dataFiles.cds.map((item) => [item.url, item.title]),
  ...dataFiles.practiceNda.map((item) => [item.url, `${item.date} NDA Practice`]),
  ...dataFiles.practiceCds.map((item) => [item.url, `${item.date} CDS OTA Practice`]),
  ...dataFiles.practiceSsb.map((item) => [item.url, `${item.date} SSB Practice`]),
  ...dataFiles.defenceNews.map((item) => [item.url, item.title])
];

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });

for (const [url, title] of [...allPages, ...generatedUrls]) {
  await writePage(url, pageHtml({ url, title, body: listingFor(url) }));
}

await writeFile(path.join(dist, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${config.siteUrl}/sitemap.xml\n`);
await writeFile(path.join(dist, "sitemap.xml"), sitemapXml([...allPages, ...generatedUrls].map(([url]) => url)));

function listingFor(url) {
  if (url === "/nda-study-material") return listItems(dataFiles.nda);
  if (url.startsWith("/nda-study-material/")) return listItems(dataFiles.nda.filter((item) => url.endsWith(`/${item.subject}`)));
  if (url === "/cds-ota-study-material") return listItems(dataFiles.cds);
  if (url.startsWith("/cds-ota-study-material/")) return listItems(dataFiles.cds.filter((item) => url.endsWith(`/${item.subject}`)));
  if (url === "/practice-daily") return listItems([...dataFiles.practiceNda, ...dataFiles.practiceCds, ...dataFiles.practiceSsb], "topic");
  if (url === "/practice-daily/nda-exam") return listItems(dataFiles.practiceNda, "topic");
  if (url === "/practice-daily/cds-ota-exam") return listItems(dataFiles.practiceCds, "topic");
  if (url === "/practice-daily/ssb-interview") return listItems(dataFiles.practiceSsb, "topic");
  if (url === "/ssb-current-affairs") return listItems(dataFiles.practiceSsb, "topic");
  if (url === "/defence-news") return listItems(dataFiles.defenceNews);
  return `<p>This page is ready for final Cavalier content.</p>`;
}

function listItems(items, label = "title") {
  if (!items.length) return `<p>New content will appear here after publishing.</p>`;
  return `<ul>${items.map((item) => `<li><a href="${escapeHtml(item.url)}">${escapeHtml(item[label] || item.title)}</a></li>`).join("")}</ul>`;
}

async function writePage(url, html) {
  const cleanPath = url === "/" ? "index.html" : `${url.slice(1)}/index.html`;
  const filePath = path.join(dist, cleanPath);
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, html);
}

function pageHtml({ url, title, body }) {
  const canonical = `${config.siteUrl}${url === "/" ? "" : url}`;
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)} | ${escapeHtml(config.siteName)}</title>
  <meta name="description" content="${escapeHtml(config.description)}">
  <link rel="canonical" href="${canonical}">
  <style>
    body{font-family:Arial,sans-serif;margin:0;color:#172033;background:#fff}
    header,main,footer{max-width:1080px;margin:auto;padding:24px}
    header{border-bottom:1px solid #e5e7eb}
    nav a{margin-right:16px;color:#173f7a;text-decoration:none}
    h1{font-size:clamp(2rem,4vw,3.4rem);line-height:1.1;margin:48px 0 16px}
    p,li{font-size:1.05rem;line-height:1.7}
    a{color:#0b5cab}
    footer{border-top:1px solid #e5e7eb;margin-top:56px;color:#526070}
  </style>
</head>
<body>
  <header>
    <strong>${escapeHtml(config.siteName)}</strong>
    <nav aria-label="Primary">
      <a href="/">Home</a>
      <a href="/best-nda-coaching">NDA</a>
      <a href="/best-cds-coaching">CDS</a>
      <a href="/ssb-interview-coaching">SSB</a>
      <a href="/contact-us">Contact</a>
    </nav>
  </header>
  <main>
    <h1>${escapeHtml(title)}</h1>
    ${body}
  </main>
  <footer>Copyright ${new Date().getFullYear()} Cavalier</footer>
</body>
</html>`;
}

function sitemapXml(urls) {
  const unique = [...new Set(urls)];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${unique.map((url) => `  <url><loc>${config.siteUrl}${url === "/" ? "" : url}</loc></url>`).join("\n")}
</urlset>
`;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
