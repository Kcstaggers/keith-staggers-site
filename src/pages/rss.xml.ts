import type { APIRoute } from "astro";
import { publishedNotes } from "../data/notes";
import { site } from "../data/site";

export const prerender = true;

const escapeXml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

export const GET: APIRoute = () => {
  const orderedNotes = [...publishedNotes].sort(
    (a, b) => b.datePublished.localeCompare(a.datePublished) || b.number.localeCompare(a.number)
  );
  const latestDate = orderedNotes.reduce(
    (latest, note) => (note.dateModified > latest ? note.dateModified : latest),
    "2026-07-11"
  );
  const items = orderedNotes
    .map((note) => {
      const url = `${site.url}/notes/${note.slug}/`;
      return [
        "    <item>",
        `      <title>${escapeXml(note.title)}</title>`,
        `      <link>${escapeXml(url)}</link>`,
        `      <guid isPermaLink="true">${escapeXml(url)}</guid>`,
        `      <description>${escapeXml(note.summary)}</description>`,
        `      <category>${escapeXml(note.category)}</category>`,
        `      <pubDate>${new Date(`${note.datePublished}T12:00:00Z`).toUTCString()}</pubDate>`,
        "    </item>",
      ].join("\n");
    })
    .join("\n");

  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "  <channel>",
    "    <title>Keith Staggers Studio Notes</title>",
    `    <link>${site.url}/notes/</link>`,
    `    <atom:link href="${site.url}/rss.xml" rel="self" type="application/rss+xml" />`,
    `    <description>${escapeXml("Practical notes on AI workflows, responsible adoption, training, production, and finishing the work.")}</description>`,
    "    <language>en-us</language>",
    `    <lastBuildDate>${new Date(`${latestDate}T12:00:00Z`).toUTCString()}</lastBuildDate>`,
    items,
    "  </channel>",
    "</rss>",
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
};
