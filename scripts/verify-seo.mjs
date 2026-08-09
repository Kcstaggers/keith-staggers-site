import fs from "node:fs";
import path from "node:path";

const distDir = path.resolve("dist");
const siteUrl = "https://www.keithstaggers.com";
const workflowPaperbackUrl = "https://www.amazon.com/dp/B0HCCG4CTX";
const directSessionUrl = "https://cal.com/keith-staggers-rpphlg/one-to-one-ai-working-session";
const errors = [];

const fail = (message) => errors.push(message);
const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const hasAttributedAmazonLink = (html, amazonUrl, bookSlug, format) =>
  new RegExp(
    `<a\\b(?=[^>]*\\bhref=["']${escapeRegExp(amazonUrl)}["'])(?=[^>]*\\bdata-amazon-book=["']${escapeRegExp(bookSlug)}["'])(?=[^>]*\\bdata-amazon-format=["']${escapeRegExp(format)}["'])[^>]*>`,
    "i"
  ).test(html);
const hasPlacedAmazonLink = (html, amazonUrl, bookSlug, format, placement) =>
  new RegExp(
    `<a\\b(?=[^>]*\\bhref=["']${escapeRegExp(amazonUrl)}["'])(?=[^>]*\\bdata-amazon-book=["']${escapeRegExp(bookSlug)}["'])(?=[^>]*\\bdata-amazon-format=["']${escapeRegExp(format)}["'])(?=[^>]*\\bdata-amazon-placement=["']${escapeRegExp(placement)}["'])[^>]*>`,
    "i"
  ).test(html);
const hasPlacedSessionLink = (html, sessionUrl, placement) =>
  new RegExp(
    `<a\\b(?=[^>]*\\bhref=["']${escapeRegExp(sessionUrl)}["'])(?=[^>]*\\btarget=["']_blank["'])(?=[^>]*\\brel=["']noopener noreferrer["'])(?=[^>]*\\bdata-session-booking=["']coaching["'])(?=[^>]*\\bdata-session-placement=["']${escapeRegExp(placement)}["'])[^>]*>`,
    "i"
  ).test(html);
const hasAttributedAudiobookLink = (html, checkoutUrl, bookSlug, placement) =>
  new RegExp(
    `<a\\b(?=[^>]*\\bhref=["']${escapeRegExp(checkoutUrl)}["'])(?=[^>]*\\bdata-audiobook-purchase=["']${escapeRegExp(bookSlug)}["'])(?=[^>]*\\bdata-audiobook-format=["']mp3["'])(?=[^>]*\\bdata-audiobook-placement=["']${escapeRegExp(placement)}["'])(?=[^>]*\\bdata-audiobook-destination=["']lemon-squeezy["'])[^>]*>`,
    "i"
  ).test(html);
const hasMarkedInternalLink = (html, marker, href) =>
  new RegExp(
    `<a\\b(?=[^>]*\\b${escapeRegExp(marker)}(?:=["'][^"']*["'])?)(?=[^>]*\\bhref=["']${escapeRegExp(href)}["'])[^>]*>`,
    "i"
  ).test(html);
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
const visibleText = (html) =>
  html
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&(?:nbsp|#160);/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/(?:&#39;|&#x27;|&apos;)/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/\s+/g, " ")
    .replace(/\s+([.,!?;:])/g, "$1")
    .trim();
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
const schemaGraphNodes = (html) =>
  [...html.matchAll(/<script\s+[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].flatMap(
    (script) => {
      try {
        const json = JSON.parse(script[1]);
        return Array.isArray(json["@graph"]) ? json["@graph"] : [json];
      } catch {
        return [];
      }
    }
  );
const nestedSchemaObjects = (value) => {
  if (Array.isArray(value)) return value.flatMap(nestedSchemaObjects);
  if (!value || typeof value !== "object") return [];
  return [value, ...Object.values(value).flatMap(nestedSchemaObjects)];
};
const hasSchemaType = (node, expectedType) => {
  const nodeTypes = Array.isArray(node?.["@type"]) ? node["@type"] : [node?.["@type"]];
  return nodeTypes.includes(expectedType);
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
const visibleTextByRoute = new Map(
  pages.map((page) => [page.route, visibleText(page.html)])
);

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
for (const excludedRoute of ["/finish-loop/thank-you/", "/privacy/"]) {
  if (sitemapRoutes.includes(excludedRoute)) fail(`sitemap: ${excludedRoute} must be excluded`);
}
if (sitemapRoutes.includes("/ai-workflow-guide.pdf")) fail("sitemap: PDF must remain excluded");

const titles = new Map();
const descriptions = new Map();
const indexableRoutes = [];
const expectedNoindexRoutes = new Set(["/finish-loop/thank-you/", "/privacy/"]);
const requiredSchema = new Map([
  ["/", ["WebSite", "Person", "Organization"]],
  ["/about/", ["ProfilePage", "BreadcrumbList"]],
  ["/books/", ["CollectionPage", "ItemList", "BreadcrumbList"]],
  ["/finish-loop/", ["Product", "FAQPage", "BreadcrumbList"]],
  ["/frontline-nurse-leader/", ["Course", "BreadcrumbList"]],
  ["/notes/", ["Blog", "ItemList", "BreadcrumbList"]],
  ["/newsletter/", ["WebPage", "ItemList", "BreadcrumbList"]],
  ["/privacy/", ["WebPage", "BreadcrumbList"]],
  ["/project-fit/", ["WebPage", "BreadcrumbList"]],
  ["/proof/", ["CollectionPage", "ItemList", "BreadcrumbList"]],
  ["/services/", ["CollectionPage", "ItemList", "BreadcrumbList"]],
  ["/workflow-book/", ["WebPage", "LearningResource", "ItemList", "FAQPage", "BreadcrumbList"]],
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
    ogImageAlt !== "Keith Staggers: practical AI training, one-to-one help, and done-for-you solutions."
  ) {
    fail(`${route}: shared Studio social image has inaccurate alt text`);
  }
  if (
    ogImage === `${siteUrl}/media/finish-loop/finish-loop-og.png` &&
    ogImageAlt !== "The Finish Loop: a $49 project-finishing toolkit with a practical guide, planner, calendar, briefs, and scorecard."
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

  if (expectedNoindexRoutes.has(route) && !noindex) fail(`${route}: expected noindex`);
  if (!expectedNoindexRoutes.has(route) && noindex) fail(`${route}: unexpected noindex`);
  if (!noindex && !robotsMeta.includes("max-image-preview:large")) {
    fail(`${route}: missing max-image-preview:large`);
  }
  if (!html.includes('href="#main-content"') || !/<main\s+[^>]*id="main-content"/i.test(html)) {
    fail(`${route}: skip link or main target is missing`);
  }
  if (/<video\b[^>]*\sautoplay/i.test(html)) fail(`${route}: autoplay video is not allowed`);

  for (const [marker, href] of [
    ["data-global-buy", "/books/build-the-workflow-keep-the-judgment/"],
    ["data-global-product", "/finish-loop/"],
    ["data-global-contact", "/project-fit/"],
    ["data-global-newsletter", "/newsletter/"],
  ]) {
    if (!hasMarkedInternalLink(html, marker, href)) {
      fail(`${route}: global conversion link ${marker} must point to ${href}`);
    }
  }
  const sharedHeader = html.match(/<header\b[^>]*\bclass=["'][^"']*studio-nav-wrap[^"']*["'][^>]*>[\s\S]*?<\/header>/i)?.[0] ?? "";
  for (const [label, href] of [
    ["Proof", "/proof/"],
    ["Buy", "/#finish-loop"],
    ["Books", "/books/"],
  ]) {
    const linkCount = (
      sharedHeader.match(
        new RegExp(`<a\\b(?=[^>]*\\bhref=["']${escapeRegExp(href)}["'])[^>]*>\\s*${escapeRegExp(label)}\\s*</a>`, "gi")
      ) ?? []
    ).length;
    if (linkCount < 2) {
      fail(`${route}: desktop and mobile navigation both need ${label} linking to ${href}`);
    }
  }

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
const homepageText = visibleTextByRoute.get("/") ?? "";
const plainLanguageContracts = new Map([
  [
    "/",
    [
      "Practical AI help for real work.",
      "I help leaders and small teams use AI to save time.",
      "Build it for me",
      "Done-for-you AI setup",
      "Help me one-to-one",
      "One-to-one AI working session",
      "Train my team",
      "Practical AI training",
      "Bring Keith to my event",
      "AI speaking for leaders and teams",
      "See how I can help",
      "Tell me about your task",
    ],
  ],
  [
    "/services/",
    [
      "Practical AI help for real work.",
      "Done-for-You AI Setup",
      "One-to-One AI Working Session",
      "Practical AI Training",
      "AI Speaking for Leaders and Teams",
    ],
  ],
  [
    "/project-fit/",
    [
      "What do you want to make easier?",
      "You do not need a technical explanation.",
      "Tell Keith about your task",
      "Need one hour of direct help? See the $250 one-to-one session",
    ],
  ],
  [
    "/proof/",
    [
      "Examples of what Keith has built.",
      "Each example says plainly what it proves and what it does not.",
    ],
  ],
  [
    "/notes/",
    [
      "Articles and guides",
      "Plain-English articles about using AI at work",
    ],
  ],
  [
    "/books/",
    [
      "Books for real work and real decisions.",
      "Keith has written three books:",
    ],
  ],
  [
    "/newsletter/",
    [
      "The Frontline AI Brief",
      "At most two emails per month",
      "Buttondown will email you a confirmation link",
      "You are not subscribed unless you use that link",
      "Five public examples",
      "The free tools stay free whether you subscribe or not",
    ],
  ],
  [
    "/privacy/",
    [
      "Do not send sensitive information",
      "Newsletter email through Buttondown",
      "Inquiries through Formspree",
      "Session booking through Cal.com",
      "Cal.com and Keith receive the name",
      "Keith can review those booking details in his Cal.com account",
      "Cal Video provides the meeting room",
      "The session is not recorded automatically",
      "No one should start a recording unless everyone expressly agrees before it begins",
      "any reason the visitor provides when canceling or rescheduling",
      "Hosting and privacy-safe measurement through Vercel",
      "Purchases happen in external stores",
      "protected health information or PHI",
    ],
  ],
  [
    "/finish-loop/",
    [
      "$49 project-finishing toolkit · The Finish Loop",
      "Finish one project. Release it.",
      "Get the $49 toolkit",
    ],
  ],
  ["/services/done-for-you/", ["Done-for-You AI Setup"]],
  [
    "/services/coaching/",
    [
      "One-to-One AI Working Session",
      "Book the $250 session",
      "Choose a time · Answer three questions · Pay $250 to reserve",
      "The session is not recorded automatically",
      "Later cancellations and no-shows are not refundable",
    ],
  ],
  ["/services/training/", ["Practical AI Training"]],
  ["/services/speaking/", ["AI Speaking for Leaders and Teams"]],
]);

for (const [route, requiredPhrases] of plainLanguageContracts) {
  const routeText = visibleTextByRoute.get(route) ?? "";
  for (const phrase of requiredPhrases) {
    if (!routeText.toLowerCase().includes(phrase.toLowerCase())) {
      fail(`${route}: plain-language contract is missing "${phrase}"`);
    }
  }
}

const coachingPage = pages.find((page) => page.route === "/services/coaching/")?.html ?? "";
for (const placement of ["service-hero", "service-close"]) {
  if (!hasPlacedSessionLink(coachingPage, directSessionUrl, placement)) {
    fail(`/services/coaching/: measured direct booking link is missing at ${placement}`);
  }
}
const coachingSchemaObjects = schemaGraphNodes(coachingPage).flatMap(nestedSchemaObjects);
const coachingOffer = coachingSchemaObjects.find(
  (node) => hasSchemaType(node, "Offer") && node.url === directSessionUrl
);
if (!coachingOffer) {
  fail("/services/coaching/: $250 Cal.com Offer schema is missing");
} else if (
  String(coachingOffer.price) !== "250" ||
  coachingOffer.priceCurrency !== "USD"
) {
  fail("/services/coaching/: direct-booking Offer price or currency is incorrect");
}
for (const route of [
  "/services/done-for-you/",
  "/services/training/",
  "/services/speaking/",
]) {
  const pageHtml = pages.find((page) => page.route === route)?.html ?? "";
  if (pageHtml.includes(directSessionUrl) || /cal\.com\/keith-staggers-rpphlg/i.test(pageHtml)) {
    fail(`${route}: direct session URL must remain isolated to coaching`);
  }
  if (!pageHtml.includes('href="/project-fit/"')) {
    fail(`${route}: larger-service Project Fit route is missing`);
  }
}
const projectFitSessionPage = pages.find((page) => page.route === "/project-fit/")?.html ?? "";
if (!projectFitSessionPage.includes('href="/services/coaching/"')) {
  fail("/project-fit/: direct-session handoff is missing");
}
if (/value="one-to-one"|\$250 one-to-one working session/i.test(projectFitSessionPage)) {
  fail("/project-fit/: one-to-one session still enters the larger-work form");
}
const finishLoopPageForSession = pages.find((page) => page.route === "/finish-loop/")?.html ?? "";
if (
  !finishLoopPageForSession.includes('href="/services/coaching/"') ||
  finishLoopPageForSession.includes(directSessionUrl)
) {
  fail("/finish-loop/: session handoff must use the owned coaching page");
}
const finishLoopThankYouPageForSession = pages.find((page) => page.route === "/finish-loop/thank-you/")?.html ?? "";
if (
  !finishLoopThankYouPageForSession.includes('href="/services/coaching/"') ||
  finishLoopThankYouPageForSession.includes(directSessionUrl)
) {
  fail("/finish-loop/thank-you/: session handoff must use the owned coaching page");
}

const retiredBuyerPhrases = [
  "See the install sprint",
  "Bring me the workflow",
  "Start with fit questions",
  "Choose the move",
  "Use the smallest door",
  "client-owned path",
  "The music is the proof",
  "The work moves",
  "One operating code",
  "No recycled prompts",
  "Put the thinking to work",
  "Read the record",
  "cross the line",
  "smallest useful next move",
  "AI studio · Training, systems, and finished work",
];
const buyerFacingRoutes = [
  "/",
  "/about/",
  "/books/",
  "/finish-loop/",
  "/notes/",
  "/project-fit/",
  "/proof/",
  "/services/",
  "/services/done-for-you/",
  "/services/coaching/",
  "/services/training/",
  "/services/speaking/",
];
for (const route of buyerFacingRoutes) {
  const routeText = (visibleTextByRoute.get(route) ?? "").toLowerCase();
  for (const phrase of retiredBuyerPhrases) {
    if (routeText.includes(phrase.toLowerCase())) {
      fail(`${route}: retired cryptic buyer phrase remains "${phrase}"`);
    }
  }
}

const directAnswerPosition = homepageText.indexOf("Practical AI help for real work.");
const brandTaglinePosition = homepageText.indexOf("Build the workflow. Keep the judgment.");
if (
  directAnswerPosition < 0 ||
  (brandTaglinePosition >= 0 && directAnswerPosition > brandTaglinePosition)
) {
  fail("homepage: plain-English answer must appear before the brand tagline");
}
const serviceChoicePosition = homepageText.indexOf("Build it for me");
const methodPosition = homepageText.indexOf("What can Keith make easier?");
if (serviceChoicePosition < 0 || methodPosition < 0 || serviceChoicePosition > methodPosition) {
  fail("homepage: clear service choices must appear before the method section");
}

const homepageDescription = metaContent(homepage, "name", "description").toLowerCase();
for (const phrase of [
  "leaders and small teams",
  "builds solutions for repetitive tasks",
  "works one-to-one",
  "trains teams",
]) {
  if (!homepageDescription.includes(phrase)) {
    fail(`homepage: metadata does not explain the offer in plain language (${phrase})`);
  }
}
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
  "/media/book-build-the-workflow-keep-the-judgment.webp",
  "/media/book-nurse-the-fck-up.webp",
  "/media/book-leading-with-care.webp",
];
for (const imagePath of meaningfulHomepageImages) {
  const escapedPath = imagePath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const tag = homepage.match(new RegExp(`<img\\s+[^>]*src="${escapedPath}"[^>]*>`, "i"))?.[0] ?? "";
  if (!tag || !/\balt="[^"]+"/i.test(tag)) fail(`homepage: meaningful image ${imagePath} needs descriptive alt text`);
}
const allPublicHtml = pages.map((page) => page.html).join("\n");
const compiledClientScripts = walk(distDir)
  .filter((file) => file.endsWith(".js"))
  .map((file) => fs.readFileSync(file, "utf8"))
  .join("\n");
if (!compiledClientScripts.includes("Site Conversion Path Selected")) {
  fail("conversion: shared book, product, contact, and newsletter paths need an analytics event");
}
for (const marker of ["data-global-buy", "data-global-product", "data-global-contact", "data-global-newsletter"]) {
  if (!compiledClientScripts.includes(marker)) {
    fail(`conversion: analytics handler does not consume ${marker}`);
  }
}
if (/advent\s*health|4\s*east|\bhuron\b/i.test(allPublicHtml)) {
  fail("release: excluded employer material is present");
}

const charterAllowedRoutes = new Set(["/", "/proof/"]);
for (const page of pages.filter((candidate) => /charter\s*rn/i.test(visibleText(candidate.html)))) {
  if (!charterAllowedRoutes.has(page.route)) {
    fail(`${page.route}: CharterRN may appear only on the homepage and Proof page`);
    continue;
  }

  const boundaries = [
    ...page.html.matchAll(
      /<([a-z][a-z0-9:-]*)\b[^>]*\bdata-charterrn-boundary(?:=["'][^"']*["'])?[^>]*>([\s\S]*?)<\/\1\s*>/gi
    ),
  ];
  if (boundaries.length === 0) {
    fail(`${page.route}: CharterRN needs a data-charterrn-boundary disclosure`);
    continue;
  }

  const boundaryText = boundaries.map((boundary) => visibleText(boundary[0])).join(" ").toLowerCase();
  for (const phrase of [
    "charterrn",
    "separate venture",
    "synthetic demo data",
    "not a keith staggers studio service",
  ]) {
    if (!boundaryText.includes(phrase)) {
      fail(`${page.route}: CharterRN boundary is missing "${phrase}"`);
    }
  }
  if (/\b(?:employer|client|customer|result|results|outcome|outcomes)\b|\b(?:built for|used by|delivered to|improved for)\b/i.test(boundaryText)) {
    fail(`${page.route}: CharterRN boundary implies an employer, client, or result claim`);
  }
}

if (/mailto:|kcstaggers@gmail\.com/i.test(allPublicHtml)) {
  fail("release: public personal email path is present");
}
if (/Beyond Burnout|No Fear Nursing/i.test(allPublicHtml)) {
  fail("books: retired test or alternate-title records must not appear in the public site");
}
if (/\b2 primary books\b|two primary works|Keith has written two healthcare books/i.test(allPublicHtml)) {
  fail("books: stale two-book public count remains");
}
if (/Companion to Keith(?:'|&#39;)s next book|does not yet have a verified public retail record/i.test(allPublicHtml)) {
  fail("books: stale pre-release book language remains");
}
if (/Amazon page (?:still )?propagating/i.test(visibleText(allPublicHtml))) {
  fail("books: stale United States paperback propagation language remains");
}

const bookExpectations = [
  {
    route: "/books/build-the-workflow-keep-the-judgment/",
    title: "Build the Workflow. Keep the Judgment.",
    date: "2026-07-31",
    coverWidth: 600,
    coverHeight: 960,
    editions: [
      {
        format: "Kindle",
        attributionFormat: "kindle",
        schemaFormat: "EBook",
        asin: "B0HCC3L365",
        price: "9.99",
        amazon: "https://www.amazon.com/dp/B0HCC3L365",
        ctaAmazon:
          "https://www.amazon.com/dp/B0HCC3L365?maas=maas_adg_E498A685DB2F0F0FFA051FC18686BEFB_afap_abs&amp;ref_=aa_maas&amp;tag=maas",
      },
      {
        format: "Paperback",
        attributionFormat: "paperback",
        schemaFormat: "Paperback",
        asin: "B0HCCG4CTX",
        isbn: "9798190013788",
        pages: 88,
        price: "17.99",
        amazon: workflowPaperbackUrl,
      },
    ],
    directAudiobook: {
      checkout:
        "https://keithstaggers.lemonsqueezy.com/checkout/buy/9c8c2f24-c58c-4b7b-ad3f-844501fbfcd1",
      price: "12.99",
      duration: "PT2H38M13S",
      durationLabel: "2 hours 38 minutes",
      delivery: "MP3 download",
      availability: "Immediate delivery",
      disclosure: "Narrated with Keith Staggers's authorized AI voice.",
    },
    companion: "/workflow-book/",
  },
  {
    route: "/books/nurse-the-fck-up/",
    title: "Nurse the F*ck Up",
    date: "2023-09-16",
    coverWidth: 600,
    coverHeight: 900,
    editions: [
      {
        format: "Paperback",
        attributionFormat: "paperback",
        schemaFormat: "Paperback",
        asin: "B0CJ44XP81",
        isbn: "9798861621335",
        pages: 166,
        price: "10.99",
        amazon: "https://www.amazon.com/dp/B0CJ44XP81",
        ctaAmazon:
          "https://www.amazon.com/dp/B0CJ44XP81?maas=maas_adg_57E64B69A8DE109B65FAE9175834B3AF_afap_abs&amp;ref_=aa_maas&amp;tag=maas",
      },
    ],
    goodreads: "https://www.goodreads.com/book/show/201866638-nurse-the-f-ck-up",
    openLibrary:
      "https://openlibrary.org/books/OL62365292M/Nurse_the_F%2Ack_Up_The_Raw_Truth_About_Surviving_Med-Surg",
  },
  {
    route: "/books/leading-with-care/",
    title: "Leading with Care",
    date: "2023-11-24",
    coverWidth: 600,
    coverHeight: 900,
    editions: [
      {
        format: "Paperback",
        attributionFormat: "paperback",
        schemaFormat: "Paperback",
        asin: "B0CNYLZ5FC",
        isbn: "9798869793935",
        pages: 178,
        amazon: "https://www.amazon.com/dp/B0CNYLZ5FC",
      },
    ],
    goodreads: "https://www.goodreads.com/book/show/202652162-leading-with-care",
    openLibrary:
      "https://openlibrary.org/books/OL62365304M/Leading_with_Care_Mastering_Healthcare_Management",
  },
];
for (const expected of bookExpectations) {
  const page = pages.find((candidate) => candidate.route === expected.route);
  if (!page) {
    fail(`${expected.route}: canonical book page is missing`);
    continue;
  }
  for (const token of [expected.title, expected.date, "Independently published"]) {
    if (!page.html.includes(token)) fail(`${expected.route}: verified book metadata is missing ${token}`);
  }
  const bookSlug = expected.route.split("/")[2];
  const graphNodes = schemaGraphNodes(page.html);
  const schemaObjects = graphNodes.flatMap(nestedSchemaObjects);
  const canonicalBookId = `${siteUrl}${expected.route}#book`;
  const workNode = graphNodes.find(
    (node) => node?.["@id"] === canonicalBookId && hasSchemaType(node, "Book")
  );
  if (!workNode) fail(`${expected.route}: canonical #book schema node is missing`);
  const liveCatalogUrls = [];
  const expectedEditionIds = [];
  for (const edition of expected.editions) {
    for (const token of [
      edition.format,
      edition.asin,
      `https://schema.org/${edition.schemaFormat}`,
      edition.isbn,
      edition.pages ? String(edition.pages) : undefined,
      edition.price,
    ].filter(Boolean)) {
      if (!page.html.includes(token)) {
        fail(`${expected.route}: verified ${edition.format} metadata is missing ${token}`);
      }
    }
    const editionId = `${siteUrl}${expected.route}#edition-${edition.format.toLowerCase()}`;
    expectedEditionIds.push(editionId);
    const editionSchema = graphNodes.find(
      (node) =>
        node?.["@id"] === editionId &&
        hasSchemaType(node, "Book") &&
        JSON.stringify(node).includes(edition.asin) &&
        JSON.stringify(node).includes(`https://schema.org/${edition.schemaFormat}`)
    );
    if (!editionSchema) {
      fail(`${expected.route}: ${edition.format} edition data is not connected to a Book schema node`);
    } else {
      const serializedEdition = JSON.stringify(editionSchema);
      for (const editionIdentifier of [
        edition.isbn,
        edition.pages ? String(edition.pages) : undefined,
      ].filter(Boolean)) {
        if (!serializedEdition.includes(editionIdentifier)) {
          fail(`${expected.route}: ${edition.format} Book schema is missing ${editionIdentifier}`);
        }
      }
      if (editionSchema.exampleOfWork?.["@id"] !== canonicalBookId) {
        fail(`${expected.route}: ${edition.format} edition is not linked to the canonical Book work`);
      }
    }
    if (edition.amazon) {
      const ctaAmazon = "ctaAmazon" in edition ? edition.ctaAmazon : edition.amazon;
      liveCatalogUrls.push(edition.amazon);
      if (!page.html.includes(edition.amazon)) {
        fail(`${expected.route}: verified ${edition.format} Amazon URL is missing`);
      }
      const offer = schemaObjects.find(
        (node) => hasSchemaType(node, "Offer") && node.url === edition.amazon
      );
      if (!offer) {
        fail(`${expected.route}: verified ${edition.format} Offer schema is missing`);
      } else if (edition.price && String(offer.price) !== edition.price) {
        fail(`${expected.route}: verified ${edition.format} Offer price is incorrect`);
      }
      if (!hasAttributedAmazonLink(page.html, ctaAmazon, bookSlug, edition.attributionFormat)) {
        fail(`${expected.route}: ${edition.format} Amazon click attribution is missing`);
      }
    } else {
      const unavailableAmazonUrl = `https://www.amazon.com/dp/${edition.asin}`;
      if (page.html.includes(unavailableAmazonUrl)) {
        fail(`${expected.route}: unavailable ${edition.format} Amazon URL must not be published`);
      }
    }
  }
  if (
    expected.editions.some((edition) => "ctaAmazon" in edition) &&
    !page.html.includes('data-amazon-placement="book-mobile-sticky"')
  ) {
    fail(`${expected.route}: measured mobile purchase control is missing`);
  }
  if (
    expected.route === "/books/build-the-workflow-keep-the-judgment/" &&
    !hasPlacedAmazonLink(
      page.html,
      workflowPaperbackUrl,
      "build-the-workflow-keep-the-judgment",
      "paperback",
      "book-mobile-sticky"
    )
  ) {
    fail(`${expected.route}: measured paperback mobile purchase control is missing`);
  }
  if (expected.directAudiobook) {
    const audiobookId = `${siteUrl}${expected.route}#edition-audiobook`;
    expectedEditionIds.push(audiobookId);
    for (const token of [
      `$${expected.directAudiobook.price} once`,
      expected.directAudiobook.durationLabel,
      expected.directAudiobook.delivery,
      expected.directAudiobook.availability,
      "https://schema.org/AudiobookFormat",
    ]) {
      if (!page.html.includes(token)) {
        fail(`${expected.route}: direct audiobook metadata is missing ${token}`);
      }
    }
    if (!visibleText(page.html).includes(expected.directAudiobook.disclosure)) {
      fail(`${expected.route}: direct audiobook disclosure is missing`);
    }
    const audiobookSchema = graphNodes.find(
      (node) =>
        node?.["@id"] === audiobookId &&
        hasSchemaType(node, "Book") &&
        hasSchemaType(node, "Audiobook") &&
        node.bookFormat === "https://schema.org/AudiobookFormat"
    );
    if (!audiobookSchema) {
      fail(`${expected.route}: direct audiobook Book and Audiobook schema node is missing`);
    } else {
      if (audiobookSchema.exampleOfWork?.["@id"] !== canonicalBookId) {
        fail(`${expected.route}: direct audiobook is not linked to the canonical Book work`);
      }
      if (audiobookSchema.duration !== expected.directAudiobook.duration) {
        fail(`${expected.route}: direct audiobook duration is incorrect`);
      }
    }
    const audiobookOffer = schemaObjects.find(
      (node) => hasSchemaType(node, "Offer") && node.url === expected.directAudiobook.checkout
    );
    if (!audiobookOffer) {
      fail(`${expected.route}: direct audiobook Offer schema is missing`);
    } else if (
      String(audiobookOffer.price) !== expected.directAudiobook.price ||
      audiobookOffer.priceCurrency !== "USD"
    ) {
      fail(`${expected.route}: direct audiobook Offer price is incorrect`);
    }
    if (!hasAttributedAudiobookLink(
      page.html,
      expected.directAudiobook.checkout,
      bookSlug,
      "book-hero"
    )) {
      fail(`${expected.route}: direct audiobook checkout attribution is missing`);
    }
  }
  const workExamples = workNode
    ? Array.isArray(workNode.workExample)
      ? workNode.workExample
      : workNode.workExample
        ? [workNode.workExample]
        : []
    : [];
  const workExampleIds = workExamples
    .map((workExample) =>
      typeof workExample === "string" ? workExample : workExample?.["@id"]
    )
    .filter(Boolean);
  for (const editionId of expectedEditionIds) {
    if (!workExampleIds.includes(editionId)) {
      fail(`${expected.route}: canonical Book work does not reference edition ${editionId}`);
    }
    if (!graphNodes.some((node) => node?.["@id"] === editionId && hasSchemaType(node, "Book"))) {
      fail(`${expected.route}: workExample does not resolve to a Book edition node ${editionId}`);
    }
  }
  const sameAsUrls = [
    ...liveCatalogUrls,
    expected.goodreads,
    expected.openLibrary,
  ].filter(Boolean);
  const schemaSameAsUrls = schemaObjects.flatMap((node) => {
    if (!node.sameAs) return [];
    return Array.isArray(node.sameAs) ? node.sameAs : [node.sameAs];
  });
  for (const sameAsUrl of sameAsUrls) {
    if (!schemaSameAsUrls.includes(sameAsUrl)) {
      fail(`${expected.route}: verified Book sameAs record is missing ${sameAsUrl}`);
    }
  }
  if (expected.goodreads && (page.html.match(new RegExp(escapeRegExp(expected.goodreads), "g")) ?? []).length < 2) {
    fail(`${expected.route}: visible Goodreads catalog record is missing`);
  }
  if (expected.openLibrary && (page.html.match(new RegExp(escapeRegExp(expected.openLibrary), "g")) ?? []).length < 2) {
    fail(`${expected.route}: visible Open Library catalog record is missing`);
  }
  const coverSchema = graphNodes.find(
    (node) =>
      hasSchemaType(node, "ImageObject") &&
      node.width === expected.coverWidth &&
      node.height === expected.coverHeight
  );
  if (!coverSchema) {
    fail(`${expected.route}: cover schema dimensions are incorrect`);
  }
  const coverTag = page.html.match(
    new RegExp(`<img\\b(?=[^>]*\\bsrc=["']/media/book-${escapeRegExp(bookSlug)}\\.webp["'])[^>]*>`, "i")
  )?.[0] ?? "";
  if (
    !coverTag ||
    !new RegExp(`\\bwidth=["']${expected.coverWidth}["']`, "i").test(coverTag) ||
    !new RegExp(`\\bheight=["']${expected.coverHeight}["']`, "i").test(coverTag)
  ) {
    fail(`${expected.route}: cover image dimensions are incorrect`);
  }
  if (expected.companion && !page.html.includes(`href="${expected.companion}"`)) {
    fail(`${expected.route}: free companion templates are not linked`);
  }
}

const baseLayoutSource = fs.readFileSync(path.join("src", "layouts", "Base.astro"), "utf8");
const sessionTrackingBlock = baseLayoutSource.match(
  /else if \(link\.dataset\.sessionBooking\) \{([\s\S]*?)\n\s*\} else if \(link\.dataset\.workflowBookDownload\)/
)?.[1] ?? "";
for (const token of [
  "Session Booking Intent",
  "link.dataset.sessionBooking",
  "link.dataset.sessionPlacement",
  'destination: "cal.com"',
  "source",
  "page",
]) {
  if (!sessionTrackingBlock.includes(token)) {
    fail(`session: privacy-safe booking analytics is missing ${token}`);
  }
}
if (/\b(?:email|answer|timezone|bookingUid|payment|card|formData|value)\b/i.test(sessionTrackingBlock)) {
  fail("session: booking-intent analytics must not contain personal, intake, schedule, or payment data");
}
const booksHub = pages.find((page) => page.route === "/books/")?.html ?? "";
for (const expected of bookExpectations) {
  if (!booksHub.includes(`href="${expected.route}"`)) fail(`/books/: missing owned link to ${expected.route}`);
  const bookSlug = expected.route.split("/")[2];
  for (const edition of expected.editions.filter((candidate) => candidate.amazon)) {
    const ctaAmazon = "ctaAmazon" in edition ? edition.ctaAmazon : edition.amazon;
    if (!hasAttributedAmazonLink(booksHub, ctaAmazon, bookSlug, edition.attributionFormat)) {
      fail(`/books/: missing ${edition.format} Amazon attribution for ${expected.route}`);
    }
  }
  if (expected.directAudiobook && !hasAttributedAudiobookLink(
    booksHub,
    expected.directAudiobook.checkout,
    bookSlug,
    "books-hub"
  )) {
    fail(`/books/: missing direct audiobook attribution for ${expected.route}`);
  }
}
if ((allPublicHtml.match(/data-audiobook-purchase="build-the-workflow-keep-the-judgment"/g) ?? []).length !== 2) {
  fail("audiobook: expected exactly two direct checkout controls across public HTML");
}
const audiobookTrackingBlock = baseLayoutSource.match(
  /else if \(link\.dataset\.audiobookPurchase\) \{([\s\S]*?)\n\s*\} else if \(link\.dataset\.amazonBook\)/
)?.[1] ?? "";
for (const token of [
  "Audiobook Checkout Intent",
  "link.dataset.audiobookPurchase",
  "link.dataset.audiobookFormat",
  "link.dataset.audiobookPlacement",
  "link.dataset.audiobookDestination",
  "source",
  "page",
]) {
  if (!audiobookTrackingBlock.includes(token)) {
    fail(`audiobook: privacy-safe checkout analytics is missing ${token}`);
  }
}
if (/email|customer|card|order|formData|response|value/i.test(audiobookTrackingBlock)) {
  fail("audiobook: checkout-intent analytics must not contain personal, payment, order, or response data");
}

const workflowTemplate = pages.find((page) => page.route === "/workflow-testing-template/")?.html ?? "";
if ((workflowTemplate.match(/\bdata-test-case\b/g) ?? []).length !== 10) {
  fail("workflow-testing-template: expected exactly ten test cases");
}
for (const requiredControl of ["data-workflow-print", "data-workflow-download", "data-workflow-clear"]) {
  if (!workflowTemplate.includes(requiredControl)) fail(`workflow-testing-template: missing ${requiredControl} control`);
}
for (const caseName of [
  "Normal task",
  "Missing input",
  "Unusual but valid input",
  "Conflicting information",
  "Ambiguous or poor-quality input",
  "Restricted input",
  "Tool or model unavailable",
  "Duplicate run",
  "Human rejection",
  "Finish manually after a failure",
]) {
  if (!workflowTemplate.includes(caseName)) fail(`workflow-testing-template: missing ${caseName}`);
}
if (!workflowTemplate.includes("keith-staggers-workflow-test-v1")) {
  fail("workflow-testing-template: local autosave contract is missing");
}
if (!workflowTemplate.includes("keith-staggers-10-case-workflow-test.csv")) {
  fail("workflow-testing-template: CSV export is missing");
}
if (!workflowTemplate.includes('href="/workflow-book/"')) {
  fail("workflow-testing-template: companion template collection is not linked");
}

const workflowBookPage = pages.find((page) => page.route === "/workflow-book/")?.html ?? "";
const workflowBookText = visibleTextByRoute.get("/workflow-book/") ?? "";
const workflowBookTemplateFiles = [
  "01-CONTEXT-template.md",
  "02-RULES-template.md",
  "03-CURRENT-STATE-template.md",
  "04-WORK-template.md",
  "05-PROOF-template.md",
  "06-AUTOMATIONS-template.md",
  "07-WORKFLOW-CONTRACT-template.md",
  "08-TEN-CASE-TEST-template.md",
  "09-ACTION-LADDER-template.md",
  "10-TRANSFER-RECOVERY-checklist.md",
];
if ((workflowBookPage.match(/\bdata-workflow-book-download=/g) ?? []).length !== 10) {
  fail("workflow-book: expected exactly ten measured template downloads");
}
for (const fileName of workflowBookTemplateFiles) {
  if (!workflowBookPage.includes(`/workflow-book/templates/${fileName}`)) {
    fail(`workflow-book: missing companion template ${fileName}`);
  }
}
for (const statusText of [
  "Companion to Build the Workflow. Keep the Judgment.",
  "The Kindle edition is available on Amazon for $9.99.",
  "The paperback is available on Amazon for $17.99.",
]) {
  if (!workflowBookText.includes(statusText)) {
    fail(`workflow-book: current book status is missing ${statusText}`);
  }
}
if (!baseLayoutSource.includes("Workflow Book Template Download")) {
  fail("workflow-book: download attribution is missing");
}
if (!baseLayoutSource.includes("format: link.dataset.amazonFormat")) {
  fail("books: Amazon format attribution is missing from the analytics event");
}
for (const token of [
  "Book Campaign Landing",
  "getValidatedBookUtm",
  "attribution: link.dataset.amazonAttribution",
]) {
  if (!baseLayoutSource.includes(token)) {
    fail(`books: campaign measurement is missing ${token}`);
  }
}
const workflowBookRoute = "/books/build-the-workflow-keep-the-judgment/";
const workflowKindleUrl =
  "https://www.amazon.com/dp/B0HCC3L365?maas=maas_adg_E498A685DB2F0F0FFA051FC18686BEFB_afap_abs&amp;ref_=aa_maas&amp;tag=maas";
if (!workflowBookPage.includes(`href="${workflowBookRoute}"`)) {
  fail("workflow-book: canonical book page is not linked");
}
if (!hasAttributedAmazonLink(
  workflowBookPage,
  workflowKindleUrl,
  "build-the-workflow-keep-the-judgment",
  "kindle"
)) {
  fail("workflow-book: measured Kindle purchase link is missing");
}
if ((workflowBookPage.match(/data-amazon-format="kindle"/g) ?? []).length !== 2) {
  fail("workflow-book: both Kindle calls to action must carry format attribution");
}
if (!hasAttributedAmazonLink(
  workflowBookPage,
  workflowPaperbackUrl,
  "build-the-workflow-keep-the-judgment",
  "paperback"
)) {
  fail("workflow-book: measured paperback purchase link is missing");
}
if ((workflowBookPage.match(/data-amazon-format="paperback"/g) ?? []).length !== 2) {
  fail("workflow-book: both paperback calls to action must carry format attribution");
}
if (!booksHub.includes('href="/workflow-book/"')) {
  fail("books: workflow book companion is not linked");
}

const finishLoopPage = pages.find((page) => page.route === "/finish-loop/")?.html ?? "";
const liveCheckout =
  "https://keithstaggers.lemonsqueezy.com/checkout/buy/b7bc50dd-cd89-4371-8227-4c85c36c0591";
if (!finishLoopPage.includes(liveCheckout)) fail("finish-loop: live checkout URL changed or is missing");
for (const token of [
  "Finish Loop Campaign Landing",
  "finish_loop_facebook_2026_08",
  "01-90-percent",
  "02-last-10-percent",
  "03-catalog",
]) {
  if (!baseLayoutSource.includes(token)) fail(`finish-loop: campaign attribution is missing ${token}`);
}

const cohortPage = pages.find((page) => page.route === "/frontline-nurse-leader/")?.html ?? "";
const cohortCheckout = "https://buy.stripe.com/eVq6oH9wt2iV2B50rF6wE00";
if (!cohortPage) fail("cohort: secondary route is missing");
if (!cohortPage.includes(cohortCheckout)) fail("cohort: live Stripe checkout changed or is missing");
if ((cohortPage.match(/data-cohort-purchase="frontline-nurse-leader-sept-16"/g) ?? []).length !== 2) {
  fail("cohort: both Stripe checkout links must carry the cohort marker");
}
if (!cohortPage.includes('data-cohort-landing="frontline-nurse-leader-sept-16"')) {
  fail("cohort: landing attribution marker is missing");
}
for (const token of ["Cohort Campaign Landing", "appendValidatedStripeUtm", "getValidatedStripeUtm"]) {
  if (!baseLayoutSource.includes(token)) fail(`cohort: campaign attribution is missing ${token}`);
}
if ((cohortPage.match(/4\.0 nursing contact hours pending approval\./g) ?? []).length !== 2) {
  fail("cohort: pending contact-hour wording must appear exactly twice");
}
for (const token of ["September 16, 2026", "9:00 AM to 1:15 PM ET", "20 registrations", "$179 USD"] ) {
  if (!cohortPage.includes(token)) fail(`cohort: fixed event detail is missing ${token}`);
}
const trainingPage = pages.find((page) => page.route === "/services/training/")?.html ?? "";
if (!trainingPage.includes('href="/frontline-nurse-leader/"')) {
  fail("training: secondary cohort route is not linked");
}

const projectFitPage = pages.find((page) => page.route === "/project-fit/")?.html ?? "";
if (!projectFitPage.includes('action="https://formspree.io/f/xwvgnryp"')) {
  fail("project-fit: secure inquiry endpoint changed or is missing");
}

const newsletterPage = pages.find((page) => page.route === "/newsletter/")?.html ?? "";
const newsletterText = visibleTextByRoute.get("/newsletter/") ?? "";
const newsletterFormTag = newsletterPage.match(
  /<form\b(?=[^>]*\bdata-newsletter-form(?:=["'][^"']*["'])?)(?=[^>]*\bdata-newsletter-placement=["']newsletter-page["'])(?=[^>]*\baction=["']https:\/\/buttondown\.com\/api\/emails\/embed-subscribe\/staggers["'])(?=[^>]*\bmethod=["']post["'])[^>]*>/i
)?.[0];
if (!newsletterFormTag) {
  fail("newsletter: official normal Buttondown POST form is missing");
}
if (!/<input\b(?=[^>]*\btype=["']hidden["'])(?=[^>]*\bname=["']embed["'])(?=[^>]*\bvalue=["']1["'])[^>]*>/i.test(newsletterPage)) {
  fail("newsletter: Buttondown embed=1 field is missing");
}
if (!/<input\b(?=[^>]*\btype=["']email["'])(?=[^>]*\bname=["']email["'])(?=[^>]*\brequired(?:\s|=|>))[^>]*>/i.test(newsletterPage)) {
  fail("newsletter: required email field is missing");
}
const newsletterConsent = newsletterPage.match(
  /<input\b(?=[^>]*\btype=["']checkbox["'])(?=[^>]*\bname=["']newsletter_consent["'])(?=[^>]*\brequired(?:\s|=|>))[^>]*>/i
)?.[0] ?? "";
if (!newsletterConsent) fail("newsletter: required consent checkbox is missing");
if (/\bchecked(?:\s|=|>)/i.test(newsletterConsent)) {
  fail("newsletter: consent checkbox must be unchecked by default");
}
for (const phrase of [
  "Buttondown will email you a confirmation link",
  "You are not subscribed unless you use that link",
  "At most two emails per month",
]) {
  if (!newsletterText.toLowerCase().includes(phrase.toLowerCase())) {
    fail(`newsletter: consent or cadence copy is missing "${phrase}"`);
  }
}
const newsletterExampleRoutes = sitemapRoutes.filter((route) => /^\/notes\/[^/]+\/$/.test(route));
if (newsletterExampleRoutes.length !== 5) {
  fail(`newsletter: expected five published Note examples, found ${newsletterExampleRoutes.length}`);
}
for (const route of newsletterExampleRoutes) {
  if (!newsletterPage.includes(`href="${route}"`)) {
    fail(`newsletter: published Note example is missing ${route}`);
  }
}
for (const freeResource of ["/workflow-book/", "/workflow-testing-template/"]) {
  if (!newsletterPage.includes(`href="${freeResource}"`)) {
    fail(`newsletter: ungated public resource is missing ${freeResource}`);
  }
}
const newsletterSource = fs.readFileSync(path.join("src", "pages", "newsletter.astro"), "utf8");
if (/preventDefault\s*\(|\bfetch\s*\(|data-newsletter-success|thanks for subscribing/i.test(newsletterSource)) {
  fail("newsletter: fake success or intercepted provider submission is not allowed");
}
const newsletterTrackingBlock = baseLayoutSource.match(
  /track\("Newsletter Subscribe Attempt",\s*\{([\s\S]*?)\}\);/
)?.[1] ?? "";
if (!newsletterTrackingBlock.includes("placement:") || !newsletterTrackingBlock.includes("page:")) {
  fail("newsletter: privacy-safe subscribe-attempt tracking is missing placement or page");
}
if (/email|consent|value|formData|provider|response/i.test(newsletterTrackingBlock)) {
  fail("newsletter: subscribe-attempt analytics must not contain personal or provider-response data");
}

const privacyPage = pages.find((page) => page.route === "/privacy/")?.html ?? "";
const privacyText = visibleTextByRoute.get("/privacy/") ?? "";
for (const phrase of [
  "Buttondown",
  "Formspree",
  "Vercel",
  "Cal.com",
  "Cal Video",
  "Amazon",
  "Lemon Squeezy",
  "Stripe",
  "protected health information or PHI",
  "confidential employer or client material",
  "does not receive or store card numbers",
  "selected time",
  "three required booking questions",
  "canceling or rescheduling",
  "Cal.com account",
  "not recorded automatically",
  "everyone expressly agrees before it begins",
  "Submitting an inquiry does not add you to the newsletter",
]) {
  if (!privacyText.toLowerCase().includes(phrase.toLowerCase())) {
    fail(`privacy: disclosure is missing "${phrase}"`);
  }
}
if (!/<meta\s+[^>]*name=["']robots["'][^>]*content=["']noindex, follow["']/i.test(privacyPage)) {
  fail("privacy: robots directive must be exactly noindex, follow");
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
if (!rssHeaders.some((header) => header.key === "X-Robots-Tag" && header.value === "noindex, follow")) {
  fail("vercel.json: RSS noindex, follow header is missing");
}
const workflowTemplateHeaders = vercelConfig.headers?.find(
  (rule) => rule.source === "/workflow-book/templates/:path*"
)?.headers ?? [];
if (!workflowTemplateHeaders.some((header) => header.key === "X-Robots-Tag" && header.value === "noindex, follow")) {
  fail("vercel.json: raw workflow-book templates need noindex, follow");
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
  if (
    !content.includes(siteUrl) ||
    !content.includes(`${siteUrl}/project-fit/`) ||
    !content.toLowerCase().includes("tell keith about a larger project")
  ) {
    fail(`${fileName}: canonical identity or inquiry path is missing`);
  }
}
const llms = fs.readFileSync(path.join(distDir, "llms.txt"), "utf8");
if (!llms.includes(`${siteUrl}/llms-full.txt`)) fail("llms.txt: full public text index link is missing");
const plainAiIdentity =
  "Keith Staggers teaches leaders and small teams how to use AI at work, helps people solve one real problem in a one-to-one session, and builds practical AI tools for repetitive tasks.";
if (!llms.includes(plainAiIdentity)) fail("llms.txt: plain-language identity is missing");
for (const requiredAiRecord of [
  `${siteUrl}/books/`,
  `${siteUrl}/books/build-the-workflow-keep-the-judgment/`,
  `${siteUrl}/books/nurse-the-fck-up/`,
  `${siteUrl}/books/leading-with-care/`,
  `${siteUrl}/workflow-testing-template/`,
  `${siteUrl}/workflow-book/`,
  "Build the Workflow. Keep the Judgment.",
  "9798190013788",
  "9798861621335",
  "9798869793935",
  "B0HCC3L365",
  "B0HCCG4CTX",
  "B0CJ44XP81",
  "B0CNYLZ5FC",
  "https://www.amazon.com/dp/B0HCC3L365",
  workflowPaperbackUrl,
  "https://www.goodreads.com/book/show/201866638-nurse-the-f-ck-up",
  "https://openlibrary.org/books/OL62365292M/Nurse_the_F%2Ack_Up_The_Raw_Truth_About_Surviving_Med-Surg",
  "https://www.goodreads.com/book/show/202652162-leading-with-care",
  "https://openlibrary.org/books/OL62365304M/Leading_with_Care_Mastering_Healthcare_Management",
]) {
  if (!llms.includes(requiredAiRecord)) fail(`llms.txt: missing public book or resource record ${requiredAiRecord}`);
}
const llmsFull = fs.readFileSync(path.join(distDir, "llms-full.txt"), "utf8");
if (!llmsFull.includes(plainAiIdentity)) fail("llms-full.txt: plain-language identity is missing");
for (const [fileName, content] of [
  ["llms.txt", llms],
  ["llms-full.txt", llmsFull],
]) {
  for (const requiredDiscoveryPath of [
    "/finish-loop/",
    "/frontline-nurse-leader/",
    "/workflow-readiness/",
    "/newsletter/",
    "/services/coaching/",
  ]) {
    if (!content.includes(`${siteUrl}${requiredDiscoveryPath}`)) {
      fail(`${fileName}: missing discovery path ${requiredDiscoveryPath}`);
    }
  }
  for (const requiredWorkflowBookRecord of [
    `${siteUrl}/books/build-the-workflow-keep-the-judgment/`,
    "Build the Workflow. Keep the Judgment.",
    "9798190013788",
    "B0HCC3L365",
    "B0HCCG4CTX",
    "https://www.amazon.com/dp/B0HCC3L365",
    workflowPaperbackUrl,
    "https://keithstaggers.lemonsqueezy.com/checkout/buy/9c8c2f24-c58c-4b7b-ad3f-844501fbfcd1",
    "$12.99 once",
    "2 hours 38 minutes",
    "MP3 download",
    "Immediate delivery",
    "Narrated with Keith Staggers's authorized AI voice.",
  ]) {
    if (!content.includes(requiredWorkflowBookRecord)) {
      fail(`${fileName}: missing Build the Workflow record ${requiredWorkflowBookRecord}`);
    }
  }
  if (/Amazon page (?:still )?propagating/i.test(content)) {
    fail(`${fileName}: stale United States paperback propagation status remains`);
  }
  if (!content.includes(workflowPaperbackUrl)) {
    fail(`${fileName}: verified United States paperback URL is missing`);
  }
  if (!content.includes(`${siteUrl}/services/coaching/`)) {
    fail(`${fileName}: owned one-to-one booking path is missing`);
  }
  if (content.includes(directSessionUrl)) {
    fail(`${fileName}: raw Cal.com URL must remain isolated to the owned coaching page`);
  }
}
for (const requiredAuthorRecord of [
  "https://www.goodreads.com/author/show/45798281.Keith_Staggers",
  "https://openlibrary.org/authors/OL16535970A/Keith_Staggers",
]) {
  if (!homepage.includes(requiredAuthorRecord)) fail(`homepage: Person sameAs is missing ${requiredAuthorRecord}`);
  if (!llmsFull.includes(requiredAuthorRecord)) fail(`llms-full.txt: author record is missing ${requiredAuthorRecord}`);
}
for (const caseName of ["Normal task", "Restricted input", "Duplicate run", "Finish manually after a failure"]) {
  if (!llmsFull.includes(caseName)) fail(`llms-full.txt: missing workflow test ${caseName}`);
}

if (errors.length > 0) {
  console.error(`SEO verification failed with ${errors.length} issue${errors.length === 1 ? "" : "s"}:`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`SEO verification passed: ${pages.length} HTML routes, ${sitemapUrls.length} indexable URLs.`);
