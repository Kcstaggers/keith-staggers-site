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

if (sitemapUrls.length !== 15) fail(`sitemap: expected 15 URLs, found ${sitemapUrls.length}`);
if (sitemapLastmods.length !== sitemapUrls.length) fail("sitemap: every URL must have lastmod");
const today = new Date().toISOString().slice(0, 10);
if (sitemapLastmods.some((value) => !/^\d{4}-\d{2}-\d{2}$/.test(value) || value > today)) {
  fail("sitemap: lastmod values must be valid, non-future ISO dates");
}
if (sitemapRoutes.includes("/finish-loop/thank-you/")) fail("sitemap: thank-you route must be excluded");

const titles = new Map();
const descriptions = new Map();
const indexableRoutes = [];
const requiredSchema = new Map([
  ["/", ["WebSite", "Person", "ProfessionalService"]],
  ["/about/", ["ProfilePage", "BreadcrumbList"]],
  ["/finish-loop/", ["Product", "FAQPage", "BreadcrumbList"]],
  ["/notes/", ["Blog", "ItemList", "BreadcrumbList"]],
  ["/project-fit/", ["WebPage", "BreadcrumbList"]],
  ["/proof/", ["CollectionPage", "ItemList", "BreadcrumbList"]],
  ["/services/", ["CollectionPage", "ItemList", "BreadcrumbList"]],
  ["/workflow-readiness/", ["WebPage", "BreadcrumbList"]],
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
  if (!html.includes('href="#main-content"') || !/<main\s+[^>]*id="main-content"/i.test(html)) {
    fail(`${route}: skip link or main target is missing`);
  }
  if (/<video\b[^>]*\sautoplay/i.test(html)) fail(`${route}: autoplay video is not allowed`);

  const routeSchema = requiredSchema.get(route) ?? [];
  if (route.startsWith("/services/") && route !== "/services/") {
    routeSchema.push("Service", "FAQPage", "BreadcrumbList");
  }
  if (route.startsWith("/notes/") && route !== "/notes/") {
    routeSchema.push("Article", "BreadcrumbList");
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
if (/advent\s*health|charter\s*rn|4\s*east|\bhuron\b/i.test(pages.map((page) => page.html).join("\n"))) {
  fail("release: excluded public material is present");
}
if (/mailto:|kcstaggers@gmail\.com/i.test(pages.map((page) => page.html).join("\n"))) {
  fail("release: public personal email path is present");
}
if (fs.existsSync(path.join(distDir, "frontline-nurse-leader", "index.html"))) {
  fail("release: staged cohort route must remain absent");
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

if (errors.length > 0) {
  console.error(`SEO verification failed with ${errors.length} issue${errors.length === 1 ? "" : "s"}:`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`SEO verification passed: ${pages.length} HTML routes, ${sitemapUrls.length} indexable URLs.`);
