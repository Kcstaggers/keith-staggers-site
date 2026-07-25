import fs from "node:fs";
import path from "node:path";

const siteUrl = (process.env.SITE_URL ?? "https://www.keithstaggers.com").replace(/\/$/, "");
const key = "86c71be746a869ecd605457ed7598124";
const keyFile = path.resolve("public", `${key}.txt`);
if (!fs.existsSync(keyFile) || fs.readFileSync(keyFile, "utf8").trim() !== key) {
  throw new Error("The public IndexNow key file is missing or does not match.");
}

const requestedPaths = process.argv.slice(2);
if (requestedPaths.length === 0) {
  throw new Error("Pass one or more changed paths, or pass --all explicitly.");
}
if (requestedPaths.includes("--all") && requestedPaths.length !== 1) {
  throw new Error("Use --all by itself.");
}

const sitemapResponse = await fetch(`${siteUrl}/sitemap.xml`, { signal: AbortSignal.timeout(15000) });
if (!sitemapResponse.ok) throw new Error(`Could not load live sitemap (${sitemapResponse.status}).`);
const sitemap = await sitemapResponse.text();
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const sitemapSet = new Set(sitemapUrls);
let urlList = requestedPaths[0] === "--all"
  ? sitemapUrls
  : requestedPaths.map((value) => new URL(value, `${siteUrl}/`).href);

urlList = [...new Set(urlList)];
if (urlList.length === 0 || urlList.length > 10000) throw new Error(`Invalid IndexNow URL count: ${urlList.length}.`);
for (const url of urlList) {
  const parsed = new URL(url);
  if (parsed.protocol !== "https:" || parsed.origin !== siteUrl) {
    throw new Error(`IndexNow URL is outside the canonical HTTPS origin: ${url}`);
  }
  if (!sitemapSet.has(url)) throw new Error(`IndexNow URL is not present in the live sitemap: ${url}`);
  const liveResponse = await fetch(url, { redirect: "manual", signal: AbortSignal.timeout(15000) });
  if (liveResponse.status !== 200) throw new Error(`IndexNow URL is not a live 200 page (${liveResponse.status}): ${url}`);
  const html = await liveResponse.text();
  const canonical = html.match(/<link\s+[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i)?.[1] ?? "";
  if (canonical !== url) throw new Error(`IndexNow URL is not self-canonical: ${url}`);
}

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: new URL(siteUrl).host,
    key,
    keyLocation: `${siteUrl}/${key}.txt`,
    urlList,
  }),
  signal: AbortSignal.timeout(15000),
});

if (![200, 202].includes(response.status)) {
  const responseBody = (await response.text()).slice(0, 500);
  throw new Error(`IndexNow rejected the submission (${response.status}): ${responseBody}`);
}

console.log(`IndexNow accepted ${urlList.length} URL${urlList.length === 1 ? "" : "s"} with status ${response.status}.`);
