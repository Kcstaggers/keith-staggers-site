const siteUrl = (process.env.SITE_URL ?? "https://www.keithstaggers.com").replace(/\/$/, "");
const apexUrl = process.env.APEX_URL ?? "https://keithstaggers.com";
const aliasUrl = process.env.ALIAS_URL ?? "https://keith-staggers-site.vercel.app";
const errors = [];

const fail = (message) => errors.push(message);
const request = async (url, init = {}) => {
  try {
    return await fetch(url, {
      ...init,
      signal: AbortSignal.timeout(15000),
      headers: {
        "user-agent": "Keith-Staggers-Live-SEO-Smoke/1.0",
        ...(init.headers ?? {}),
      },
    });
  } catch (error) {
    fail(`${url}: request failed (${error.message})`);
    return null;
  }
};
const bodyFor = async (response, label) => {
  try {
    return await response.text();
  } catch (error) {
    fail(`${label}: body read failed (${error.message})`);
    return "";
  }
};

const apexResponse = await request(`${apexUrl}/notes/?source=smoke`, { redirect: "manual" });
if (apexResponse) {
  const location = apexResponse.headers.get("location") ?? "";
  if (apexResponse.status !== 308) fail(`apex: expected 308, received ${apexResponse.status}`);
  if (location !== `${siteUrl}/notes/?source=smoke`) {
    fail(`apex: path or query was not preserved (${location || "missing location"})`);
  }
}

const aliasResponse = await request(`${aliasUrl}/notes/?source=smoke`, { redirect: "manual" });
if (aliasResponse) {
  const location = aliasResponse.headers.get("location") ?? "";
  if (aliasResponse.status === 308) {
    if (location !== `${siteUrl}/notes/?source=smoke`) {
      fail(`Vercel alias: path or query was not preserved (${location || "missing location"})`);
    }
  } else if (aliasResponse.status === 200) {
    const aliasHtml = await bodyFor(aliasResponse, "Vercel alias");
    const aliasCanonical =
      aliasHtml.match(/<link\s+[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i)?.[1] ?? "";
    if (aliasCanonical !== `${siteUrl}/notes/`) {
      fail(`Vercel alias: canonical is ${aliasCanonical || "missing"}`);
    }
  } else {
    fail(`Vercel alias: expected 200 or 308, received ${aliasResponse.status}`);
  }
}

const sitemapResponse = await request(`${siteUrl}/sitemap.xml`);
if (sitemapResponse?.status !== 200) fail(`sitemap: expected 200, received ${sitemapResponse?.status ?? "no response"}`);
const sitemap = sitemapResponse ? await bodyFor(sitemapResponse, "sitemap") : "";
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
if (sitemapUrls.length === 0) fail("sitemap: no URLs found");

for (const url of sitemapUrls) {
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    fail(`sitemap: invalid URL ${url}`);
    continue;
  }
  if (parsed.protocol !== "https:" || parsed.origin !== siteUrl) {
    fail(`sitemap: URL is outside the canonical HTTPS origin (${url})`);
    continue;
  }
  const response = await request(url);
  if (!response) continue;
  if (response.status !== 200) {
    fail(`${url}: expected 200, received ${response.status}`);
    continue;
  }
  const html = await bodyFor(response, url);
  const canonical = html.match(/<link\s+[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i)?.[1] ?? "";
  if (canonical !== url) fail(`${url}: canonical is ${canonical || "missing"}`);
  if (!/<meta\s+[^>]*name=["']robots["'][^>]*content=["'][^"']*max-image-preview:large/i.test(html)) {
    fail(`${url}: indexable robots contract is missing`);
  }
  if (
    url !== `${siteUrl}/services/coaching/` &&
    html.includes("https://cal.com/keith-staggers-rpphlg/one-to-one-ai-working-session")
  ) {
    fail(`${url}: direct Cal.com URL leaked outside the coaching page`);
  }
}

const requiredLiveContracts = [
  {
    path: "/books/build-the-workflow-keep-the-judgment/",
    phrases: [
      "https://www.amazon.com/dp/B0HCCG4CTX",
      "Buy paperback · $17.99",
      "ASIN B0HCCG4CTX",
    ],
  },
  {
    path: "/services/coaching/",
    phrases: [
      "https://cal.com/keith-staggers-rpphlg/one-to-one-ai-working-session",
      "Book the $250 session",
      "Pay $250 to reserve",
      "data-session-booking=\"coaching\"",
    ],
  },
  {
    path: "/project-fit/",
    phrases: [
      "href=\"/services/coaching/\"",
      "Use this form for a done-for-you setup, team training, speaking, or a larger project",
    ],
    forbidden: [
      "value=\"one-to-one\"",
      "$250 one-to-one working session",
      "cal.com/keith-staggers-rpphlg",
    ],
  },
];

for (const contract of requiredLiveContracts) {
  const response = await request(`${siteUrl}${contract.path}`);
  if (response?.status !== 200) {
    fail(`${contract.path}: expected 200 for conversion contract`);
    continue;
  }
  const html = await bodyFor(response, contract.path);
  for (const phrase of contract.phrases) {
    if (!html.includes(phrase)) fail(`${contract.path}: live conversion contract is missing ${phrase}`);
  }
  for (const phrase of contract.forbidden ?? []) {
    if (html.includes(phrase)) fail(`${contract.path}: forbidden conversion content remains ${phrase}`);
  }
}

for (const path of [
  "/services/done-for-you/",
  "/services/training/",
  "/services/speaking/",
]) {
  const response = await request(`${siteUrl}${path}`);
  if (response?.status !== 200) {
    fail(`${path}: expected 200 for Project Fit isolation`);
    continue;
  }
  const html = await bodyFor(response, path);
  if (!html.includes('href="/project-fit/"')) fail(`${path}: Project Fit route is missing`);
  if (html.includes("cal.com/keith-staggers-rpphlg")) fail(`${path}: direct session URL leaked outside coaching`);
}

const thankYouResponse = await request(`${siteUrl}/finish-loop/thank-you/`);
if (thankYouResponse?.status !== 200) fail("thank-you: expected 200");
const thankYou = thankYouResponse ? await bodyFor(thankYouResponse, "thank-you") : "";
if (!/<meta\s+[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(thankYou)) {
  fail("thank-you: noindex is missing");
}
if (!thankYou.includes('href="/services/coaching/"')) fail("thank-you: owned session handoff is missing");
if (thankYou.includes("cal.com/keith-staggers-rpphlg")) fail("thank-you: direct Cal.com URL must not appear");

const rssResponse = await request(`${siteUrl}/rss.xml`);
if (rssResponse?.status !== 200) fail("rss.xml: expected 200");
if (!(rssResponse?.headers.get("content-type") ?? "").includes("application/rss+xml")) {
  fail("rss.xml: incorrect content type");
}
const rss = rssResponse ? await bodyFor(rssResponse, "rss.xml") : "";
if ((rss.match(/<item>/g)?.length ?? 0) !== sitemapUrls.filter((url) => /\/notes\/[^/]+\/$/.test(url)).length) {
  fail("rss.xml: item count does not match note URLs in sitemap");
}

for (const path of ["/llms.txt", "/llms-full.txt"]) {
  const response = await request(`${siteUrl}${path}`);
  if (response?.status !== 200) fail(`${path}: expected 200`);
  const text = response ? await bodyFor(response, path) : "";
  if (!text.includes(siteUrl)) fail(`${path}: canonical site URL is missing`);
  if (text.includes("cal.com/keith-staggers-rpphlg")) fail(`${path}: raw Cal.com URL must not appear`);
  if (!(response?.headers.get("x-robots-tag") ?? "").includes("noindex")) {
    fail(`${path}: X-Robots-Tag noindex is missing`);
  }
}

const pdfResponse = await request(`${siteUrl}/ai-workflow-guide.pdf`, { method: "HEAD" });
if (pdfResponse?.status !== 200) fail("PDF: expected 200");
if (!(pdfResponse?.headers.get("x-robots-tag") ?? "").includes("noindex")) fail("PDF: X-Robots-Tag noindex is missing");

const mediaResponse = await request(`${siteUrl}/media/keith-photo-9-360.webp`, { method: "HEAD" });
if (mediaResponse?.status !== 200) fail("responsive hero image: expected 200");
if (!(mediaResponse?.headers.get("cache-control") ?? "").includes("max-age=86400")) {
  fail("media: bounded browser cache header is missing");
}

for (const userAgent of ["Googlebot", "Bingbot", "OAI-SearchBot", "GPTBot", "ClaudeBot", "PerplexityBot"]) {
  const response = await request(`${siteUrl}/notes/`, { headers: { "user-agent": userAgent } });
  if (response?.status !== 200) fail(`${userAgent}: expected 200, received ${response?.status ?? "no response"}`);
}

if (errors.length > 0) {
  console.error(`Live verification failed with ${errors.length} issue${errors.length === 1 ? "" : "s"}:`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(
  `Live verification passed: ${sitemapUrls.length} indexable URLs, canonical hosts, RSS, AI text, PDF, cache, and bot access.`
);
