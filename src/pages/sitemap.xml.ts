import type { APIRoute } from "astro";
import { notes } from "../data/notes";
import { services } from "../data/services";
import { site } from "../data/site";

export const prerender = true;

const releaseDate = "2026-07-23";
const coreRoutes = [
  "/",
  "/about/",
  "/services/",
  "/notes/",
  "/finish-loop/",
  "/proof/",
  "/workflow-readiness/",
  "/project-fit/",
].map((route) => ({ route, lastModified: releaseDate }));

const routes = [
  ...coreRoutes,
  ...services.map((service) => ({
    route: `/services/${service.slug}/`,
    lastModified: service.lastModified,
  })),
  ...notes.map((note) => ({
    route: `/notes/${note.slug}/`,
    lastModified: note.dateModified,
  })),
];

const escapeXml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

export const GET: APIRoute = () => {
  const uniqueRoutes = [
    ...new Map(routes.map((entry) => [entry.route, entry])).values(),
  ];
  const urls = uniqueRoutes
    .map(({ route, lastModified }) => {
      const location = new URL(route, site.url).href;
      return `  <url>\n    <loc>${escapeXml(location)}</loc>\n    <lastmod>${lastModified}</lastmod>\n  </url>`;
    })
    .join("\n");

  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls,
    "</urlset>",
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
};
