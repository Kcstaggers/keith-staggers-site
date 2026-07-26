import fs from "node:fs";
import path from "node:path";

const distDir = path.resolve("dist");
const siteUrl = "https://www.keithstaggers.com";
const errors = [];

const fail = (message) => errors.push(message);
const walk = (directory) =>
  fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(target) : [target];
  });
const routeFor = (file) => {
  const relative = path.relative(distDir, file).split(path.sep).join("/");
  if (relative === "index.html") return "/";
  return `/${path.posix.dirname(relative)}/`;
};
const tagContent = (html, expression) => html.match(expression)?.[1] ?? "";
const metaContent = (html, attribute, value) =>
  tagContent(
    html,
    new RegExp(
      `<meta\\s+[^>]*${attribute}="${value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"[^>]*content="([^"]*)"[^>]*>`,
      "i"
    )
  );
const linkHref = (html, rel) =>
  tagContent(
    html,
    new RegExp(`<link\\s+[^>]*rel="${rel}"[^>]*href="([^"]+)"[^>]*>`, "i")
  );
const schemaTypes = (html, route) => {
  const types = new Set();
  const scripts = [...html.matchAll(/<script\s+[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  if (scripts.length === 0) fail(`${route}: missing JSON-LD`);
  for (const script of scripts) {
    try {
      const json = JSON.parse(script[1]);
      const nodes = json["@graph"] ?? [json];
      for (const node of nodes) {
        const nodeTypes = Array.isArray(node["@type"]) ? node["@type"] : [node["@type"]];
        nodeTypes.filter(Boolean).forEach((type) => types.add(type));
      }
    } catch (error) {
      fail(`${route}: invalid JSON-LD (${error.message})`);
    }
  }
  return types;
};
const resolveInternal = (urlPath) => {
  const clean = urlPath.split("#")[0].split("?")[0];
  if (!clean || clean === "/") return path.join(distDir, "index.html");
  if (clean.endsWith("/")) return path.join(distDir, clean, "index.html");
  return path.join(distDir, clean);
};

if (!fs.existsSync(distDir)) {
  console.error("dist/ is missing. Run npm run build first.");
  process.exit(1);
}

const htmlFiles = walk(distDir).filter((file) => file.endsWith(".html"));
const pages = htmlFiles
  .map((file) => ({ file, route: routeFor(file), html: fs.readFileSync(file, "utf8") }))
  .sort((a, b) => a.route.localeCompare(b.route));

const sitemapPath = path.join(distDir, "sitemap.xml");
if (!fs.existsSync(sitemapPath)) fail("sitemap.xml is missing");
const sitemap = fs.existsSync(sitemapPath) ? fs.readFileSync(sitemapPath, "utf8") : "";
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const sitemapLastmods = [...sitemap.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map((match) => match[1]);
const sitemapRoutes = sitemapUrls.map((url) => new URL(url).pathname).sort();

if (sitemapUrls.length === 0) fail("sitemap: no URLs found");
if (sitemapLastmods.length !== sitemapUrls.length) fail("sitemap: every URL must have lastmod");
const today = new Date().toISOString().slice(0, 10);
if (sitemapLastmods.some((value) => !/^\d{4}-\d{2}-\d{2}$/.test(value) || value > today)) {
  fail("sitemap: lastmod values must be valid, non-future ISO dates");
}
if (sitemapRoutes.includes("/finish-loop/thank-you/")) fail("sitemap: thank-you route must be excluded");
if (sitemapRoutes.includes("/ai-workflow-guide.pdf")) fail("sitemap: PDF must remain excluded");

const titles = new Map();
const descriptions = new Map();
const indexableRoutes = [];
const requiredSchema = new Map([
  ["/", ["WebSite", "Person", "Organization"]],
  ["/about/", ["ProfilePage", "BreadcrumbList"]],
  ["/books/", ["CollectionPage", "ItemList", "BreadcrumbList"]],
  ["/finish-loop/", ["Product", "FAQPage", "BreadcrumbList"]],
  ["/notes/", ["Blog", "ItemList", "BreadcrumbList"]],
  ["/project-fit/", ["WebPage", "BreadcrumbList"]],
  ["/proof/", ["CollectionPage", "ItemList", "BreadcrumbList"]],
  ["/services/", ["CollectionPage", "ItemList", "BreadcrumbList"]],
  ["/workflow-readiness/", ["WebPage", "BreadcrumbList"]],
  ["/workflow-testing-template/", ["WebPage", "LearningResource", "BreadcrumbList"]],
]);

for (const page of pages) {
  const { route, html } = page;
  const noindex = /<meta\s+[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html);
  const title = tagContent(html, /<title>([\s\S]*?)<\/title>/i).trim();
  const description = metaContent(html, "name", "description");
  const canonical = linkHref(html, "canonical");
  const ogTitle = metaContent(html, "property", "og:title");
  const ogDescription = metaContent(html, "property", "og:description");
  const ogUrl = metaContent(html, "property", "og:url");
  const ogImage = metaContent(html, "property", "og:image");
  const ogImageAlt = metaContent(html, "property", "og:image:alt");
  const twitterCard = metaContent(html, "name", "twitter:card");
  const twitterImageAlt = metaContent(html, "name", "twitter:image:alt");
  const robotsMeta = metaContent(html, "name", "robots");
  const h1Count = (html.match(/<h1\b/gi) ?? []).length;
  const expectedCanonical = `${siteUrl}${route}`;
  const types = schemaTypes(html, route);

  if (!/<html\s+[^>]*lang=["']en["']/i.test(html)) fail(`${route}: html lang must be en`);
  if (!title) fail(`${route}: missing title`);
  if (!description) fail(`${route}: missing description`);
  if (h1Count !== 1) fail(`${route}: expected one H1, found ${h1Count}`);
  if (canonical !== expectedCanonical) fail(`${route}: canonical ${canonical} does not match ${expectedCanonical}`);
  if (ogTitle !== title) fail(`${route}: og:title does not match title`);
  if (ogDescription !== description) fail(`${route}: og:description does not match description`);
  if (ogUrl !== canonical) fail(`${route}: og:url does not match canonical`);
  if (!ogImage.startsWith(`${siteUrl}/`)) fail(`${route}: missing first-party og:image`);
  if (!ogImageAlt) fail(`${route}: missing og:image:alt`);
  if (
    ogImage === `${siteUrl}/og-keith-staggers-v2.png` &&
    ogImageAlt !== "Keith Staggers: AI training, workflow systems, and finished work."
  ) {
    fail(`${route}: shared Studio social image has inaccurate alt text`);
  }
  if (
    ogImage === `${siteUrl}/media/finish-loop/finish-loop-og.png` &&
    ogImageAlt !== "The Finish Loop: Finish the work. Ship the thing. $49 manual, planner, and calendar."
  ) {
    fail(`${route}: Finish Loop social image has inaccurate alt text`);
  }
  if (twitterCard !== "summary_large_image") fail(`${route}: missing summary_large_image card`);
  if (!twitterImageAlt) fail(`${route}: missing twitter:image:alt`);
  if (!robotsMeta) fail(`${route}: missing robots directive`);

  if (!noindex) {
    indexableRoutes.push(route);
    if (title.length > 65) fail(`${route}: title is ${title.length} characters`);
    if (description.length < 80 || description.length > 165) {
      fail(`${route}: description is ${description.length} characters`);
    }
    if (titles.has(title)) fail(`${route}: duplicate title also used by ${titles.get(title)}`);
    if (descriptions.has(description)) fail(`${route}: duplicate description also used by ${descriptions.get(description)}`);
    titles.set(title, route);
    descriptions.set(description, route);
  }

  if (route === "/finish-loop/thank-you/" && !noindex) fail(`${route}: expected noindex`);
  if (route !== "/finish-loop/thank-you/" && noindex) fail(`${route}: unexpected noindex`);
  if (!noindex && !robotsMeta.includes("max-image-preview:large")) {
    fail(`${route}: missing max-image-preview:large`);
  }
  if (!html.includes('href="#main-content"') || !/<main\s+[^>]*id="main-content"/i.test(html)) {
    fail(`${route}: skip link or main target is missing`);
  }
  if (/<video\b[^>]*\sautoplay/i.test(html)) fail(`${route}: autoplay video is not allowed`);

  const routeSchema = requiredSchema.get(route) ?? [];
  if (route.startsWith("/services/") && route !== "/services/") {
    routeSchema.push("Service", "FAQPage", "BreadcrumbList");
  }
  if (route.startsWith("/notes/") && route !== "/notes/") {
    routeSchema.push("BlogPosting", "BreadcrumbList");
    if (!/<a\b(?=[^>]*\brel=["']author["'])(?=[^>]*\bhref=["']\/about\/["'])[^>]*>/i.test(html)) {
      fail(`${route}: linked author byline is missing`);
    }
    if ((html.match(/<time\b/gi) ?? []).length === 0) fail(`${route}: visible publication date is missing`);
    if (metaContent(html, "property", "og:image:width") !== "1200") {
      fail(`${route}: representative image must be 1200 pixels wide`);
    }
  }
  if (route.startsWith("/books/") && route !== "/books/") {
    routeSchema.push("WebPage", "Book", "ImageObject", "BreadcrumbList");
  }
  for (const expectedType of routeSchema) {
    if (!types.has(expectedType)) fail(`${route}: missing ${expectedType} schema`);
  }

  for (const tag of html.match(/<img\b[^>]*>/gi) ?? []) {
    if (!/\balt=["'][^"']*["']/i.test(tag)) fail(`${route}: image is missing alt`);
    if (/\bsrc=["'][^"']+["']/i.test(tag)) {
      if (!/\bwidth=["'][^"']+["']/i.test(tag) || !/\bheight=["'][^"']+["']/i.test(tag)) {
        fail(`${route}: sourced image is missing intrinsic dimensions`);
      }
    }
  }

  for (const match of html.matchAll(/\b(?:href|src)=["'](\/[^"'?#]*(?:[?#][^"']*)?)["']/gi)) {
    const internal = match[1];
    const clean = internal.split("#")[0].split("?")[0];
    if (!clean) continue;
    const target = resolveInternal(internal);
    if (!fs.existsSync(target)) fail(`${route}: broken internal reference ${internal}`);
  }
}

if (pages.some((page) => schemaTypes(page.html, page.route).has("ProfessionalService"))) {
  fail("schema: deprecated ProfessionalService remains in the release");
}

if (indexableRoutes.sort().join("\n") !== sitemapRoutes.join("\n")) {
  fail("sitemap: routes do not exactly match indexable HTML routes");
}

const homepage = pages.find((page) => page.route === "/")?.html ?? "";
if (!homepage.includes("Build the workflow.")) fail("homepage: broad Studio identity is missing");
if (
  metaContent(homepage, "name", "google-site-verification") !==
  "rgjOz-yffU1GPVoW7egiohALY7BiR2sCpCCV8zsojkY"
) {
  fail("homepage: Google Search Console verification is missing");
}
if (/<video\b[^>]*\ssrc=/i.test(homepage)) fail("homepage: preview video has an eager src");
if (/<iframe\b[^>]*\ssrc=/i.test(homepage)) fail("homepage: Spotify iframe has an eager src");
if (!homepage.includes("https://music.apple.com/us/artist/keith-staggers/1743790202")) {
  fail("homepage: verified Apple Music identity is missing");
}
if (!homepage.includes("https://www.youtube.com/@kcstaggers")) {
  fail("homepage: YouTube identity is missing");
}
if (!homepage.includes('rel="alternate" type="application/rss+xml"')) {
  fail("homepage: RSS autodiscovery is missing");
}
if (!homepage.includes(`"@id":"${siteUrl}/#keith","name":"Keith Staggers","url":"${siteUrl}/about/"`)) {
  fail("homepage: Person schema must use the About page as its identity URL");
}
if (homepage.includes(`"@id":"${siteUrl}/#studio","name":"Keith Staggers Studio","alternateName":"Keith Staggers"`)) {
  fail("homepage: Person and Studio identities must not be conflated");
}
const meaningfulHomepageImages = [
  "/media/keith-neon-pink.webp",
  "/media/keith-noir.webp",
  "/media/keith-diner.webp",
  "/media/keith-neon-violet.webp",
  "/media/book-nurse-the-fck-up.webp",
  "/media/book-leading-with-care.webp",
];
for (const imagePath of meaningfulHomepageImages) {
  const escapedPath = imagePath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const tag = homepage.match(new RegExp(`<img\\s+[^>]*src="${escapedPath}"[^>]*>`, "i"))?.[0] ?? "";
  if (!tag || !/\balt="[^"]+"/i.test(tag)) fail(`homepage: meaningful image ${imagePath} needs descriptive alt text`);
}
if (/advent\s*health|charter\s*rn|4\s*east|\bhuron\b/i.test(pages.map((page) => page.html).join("\n"))) {
  fail("release: excluded public material is present");
}
if (/mailto:|kcstaggers@gmail\.com/i.test(pages.map((page) => page.html).join("\n"))) {
  fail("release: public personal email path is present");
}
if (fs.existsSync(path.join(distDir, "frontline-nurse-leader", "index.html"))) {
  fail("release: staged cohort route must remain absent");
}

const allPublicHtml = pages.map((page) => page.html).join("\n");
if (/Beyond Burnout|No Fear Nursing/i.test(allPublicHtml)) {
  fail("books: retired test or alternate-title records must not appear in the public site");
}
if (/\b3 books\b|three healthcare books|three published/i.test(allPublicHtml)) {
  fail("books: stale three-book public count remains");
}

const bookExpectations = [
  {
    route: "/books/nurse-the-fck-up/",
    title: "Nurse the F*ck Up",
    isbn: "9798861621335",
    asin: "B0CJ44XP81",
    date: "2023-09-16",
    pages: 166,
    amazon: "https://www.amazon.com/dp/B0CJ44XP81",
  },
  {
    route: "/books/leading-with-care/",
    title: "Leading with Care",
    isbn: "9798869793935",
    asin: "B0CNYLZ5FC",
    date: "2023-11-24",
    pages: 178,
    amazon: "https://www.amazon.com/dp/B0CNYLZ5FC",
  },
];
for (const expected of bookExpectations) {
  const page = pages.find((candidate) => candidate.route === expected.route);
  if (!page) {
    fail(`${expected.route}: canonical book page is missing`);
    continue;
  }
  for (const token of [
    expected.title,
    expected.isbn,
    expected.asin,
    expected.date,
    String(expected.pages),
    expected.amazon,
    "Independently published",
    "https://schema.org/Paperback",
  ]) {
    if (!page.html.includes(token)) fail(`${expected.route}: verified book metadata is missing ${token}`);
  }
  if (!page.html.includes(`data-amazon-book="${expected.route.split("/")[2]}"`)) {
    fail(`${expected.route}: Amazon click attribution is missing`);
  }
}

const booksHub = pages.find((page) => page.route === "/books/")?.html ?? "";
for (const expected of bookExpectations) {
  if (!booksHub.includes(`href="${expected.route}"`)) fail(`/books/: missing owned link to ${expected.route}`);
  if (!booksHub.includes(`data-amazon-book="${expected.route.split("/")[2]}"`)) {
    fail(`/books/: missing Amazon attribution for ${expected.route}`);
  }
}

const workflowTemplate = pages.find((page) => page.route === "/workflow-testing-template/")?.html ?? "";
if ((workflowTemplate.match(/\bdata-test-case\b/g) ?? []).length !== 10) {
  fail("workflow-testing-template: expected exactly ten test cases");
}
for (const requiredControl of ["data-workflow-print", "data-workflow-download", "data-workflow-clear"]) {
  if (!workflowTemplate.includes(requiredControl)) fail(`workflow-testing-template: missing ${requiredControl} control`);
}
for (const caseName of [
  "Normal path",
  "Missing input",
  "Unusual but valid input",
  "Conflicting information",
  "Ambiguous or poor-quality input",
  "Restricted input",
  "Tool or model unavailable",
  "Duplicate run",
  "Human rejection",
  "Manual recovery",
]) {
  if (!workflowTemplate.includes(caseName)) fail(`workflow-testing-template: missing ${caseName}`);
}
if (!workflowTemplate.includes("keith-staggers-workflow-test-v1")) {
  fail("workflow-testing-template: local autosave contract is missing");
}
if (!workflowTemplate.includes("keith-staggers-10-case-workflow-test.csv")) {
  fail("workflow-testing-template: CSV export is missing");
}

const finishLoopPage = pages.find((page) => page.route === "/finish-loop/")?.html ?? "";
const liveCheckout =
  "https://keithstaggers.lemonsqueezy.com/checkout/buy/b7bc50dd-cd89-4371-8227-4c85c36c0591";
if (!finishLoopPage.includes(liveCheckout)) fail("finish-loop: live checkout URL changed or is missing");

const projectFitPage = pages.find((page) => page.route === "/project-fit/")?.html ?? "";
if (!projectFitPage.includes('action="https://formspree.io/f/xwvgnryp"')) {
  fail("project-fit: secure inquiry endpoint changed or is missing");
}

const robots = fs.readFileSync(path.join(distDir, "robots.txt"), "utf8");
if (!robots.includes("User-agent: *") || !robots.includes("Allow: /")) fail("robots.txt: crawl allow rule is missing");
if (!robots.includes(`Sitemap: ${siteUrl}/sitemap.xml`)) fail("robots.txt: canonical sitemap is missing");

const vercelConfig = JSON.parse(fs.readFileSync("vercel.json", "utf8"));
if (vercelConfig.trailingSlash !== true) fail("vercel.json: trailingSlash must be true");
if (vercelConfig.buildCommand !== "npm run build") fail("vercel.json: buildCommand must run the full verifier");
const pdfHeaders = vercelConfig.headers?.find((rule) => rule.source === "/ai-workflow-guide.pdf")?.headers ?? [];
if (!pdfHeaders.some((header) => header.key === "X-Robots-Tag" && header.value.includes("noindex"))) {
  fail("vercel.json: PDF noindex header is missing");
}
const expectedCanonicalHosts = ["keithstaggers.com"];
for (const host of expectedCanonicalHosts) {
  const redirect = vercelConfig.redirects?.find((rule) =>
    rule.has?.some((condition) => condition.type === "host" && condition.value === host)
  );
  if (!redirect?.permanent || redirect.destination !== "https://www.keithstaggers.com/:path*") {
    fail(`vercel.json: permanent canonical redirect is missing for ${host}`);
  }
}
const rssHeaders = vercelConfig.headers?.find((rule) => rule.source === "/rss.xml")?.headers ?? [];
if (!rssHeaders.some((header) => header.key === "Content-Type" && header.value.includes("application/rss+xml"))) {
  fail("vercel.json: RSS content-type header is missing");
}
for (const fileName of ["/llms.txt", "/llms-full.txt"]) {
  const headers = vercelConfig.headers?.find((rule) => rule.source === fileName)?.headers ?? [];
  if (!headers.some((header) => header.key === "X-Robots-Tag" && header.value.includes("noindex"))) {
    fail(`vercel.json: ${fileName} noindex header is missing`);
  }
}

const rssPath = path.join(distDir, "rss.xml");
if (!fs.existsSync(rssPath)) fail("rss.xml is missing");
const rss = fs.existsSync(rssPath) ? fs.readFileSync(rssPath, "utf8") : "";
const rssItems = rss.match(/<item>/g)?.length ?? 0;
const noteRoutes = sitemapRoutes.filter((route) => /^\/notes\/[^/]+\/$/.test(route));
if (rssItems !== noteRoutes.length) fail(`rss.xml: expected ${noteRoutes.length} items, found ${rssItems}`);
if (!rss.includes(`${siteUrl}/rss.xml`) || !rss.includes("application/rss+xml")) {
  fail("rss.xml: canonical self link is missing");
}

for (const fileName of ["llms.txt", "llms-full.txt"]) {
  const filePath = path.join(distDir, fileName);
  if (!fs.existsSync(filePath)) {
    fail(`${fileName} is missing`);
    continue;
  }
  const content = fs.readFileSync(filePath, "utf8");
  if (!content.includes(siteUrl) || !content.includes("Project Fit")) {
    fail(`${fileName}: canonical identity or inquiry path is missing`);
  }
}
const llms = fs.readFileSync(path.join(distDir, "llms.txt"), "utf8");
if (!llms.includes(`${siteUrl}/llms-full.txt`)) fail("llms.txt: full public text index link is missing");
for (const requiredAiRecord of [
  `${siteUrl}/books/`,
  `${siteUrl}/books/nurse-the-fck-up/`,
  `${siteUrl}/books/leading-with-care/`,
  `${siteUrl}/workflow-testing-template/`,
  "9798861621335",
  "9798869793935",
  "B0CJ44XP81",
  "B0CNYLZ5FC",
]) {
  if (!llms.includes(requiredAiRecord)) fail(`llms.txt: missing public book or resource record ${requiredAiRecord}`);
}
const llmsFull = fs.readFileSync(path.join(distDir, "llms-full.txt"), "utf8");
for (const caseName of ["Normal path", "Restricted input", "Duplicate run", "Manual recovery"]) {
  if (!llmsFull.includes(caseName)) fail(`llms-full.txt: missing workflow test ${caseName}`);
}

if (errors.length > 0) {
  console.error(`SEO verification failed with ${errors.length} issue${errors.length === 1 ? "" : "s"}:`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`SEO verification passed: ${pages.length} HTML routes, ${sitemapUrls.length} indexable URLs.`);
