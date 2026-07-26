import type { APIRoute } from "astro";
import { books } from "../data/books";
import { publishedNotes } from "../data/notes";
import { fixedRouteLastModified } from "../data/route-metadata";
import { services } from "../data/services";
import { site } from "../data/site";

export const prerender = true;

const newestDate = (dates: string[]) => [...dates].sort().at(-1) ?? "2026-07-11";
const fixedHomepageDate = fixedRouteLastModified.find(({ route }) => route === "/")?.lastModified ?? "2026-07-11";
const homepageRoute = {
  route: "/",
  lastModified: newestDate([
    fixedHomepageDate,
    ...publishedNotes.map((note) => note.dateModified),
    ...services.map((service) => service.lastModified),
    ...books.map((book) => book.dateModified),
  ]),
};
const collectionRoutes = [
  {
    route: "/services/",
    lastModified: newestDate(services.map((service) => service.lastModified)),
  },
  {
    route: "/notes/",
    lastModified: newestDate(publishedNotes.map((note) => note.dateModified)),
  },
  {
    route: "/books/",
    lastModified: newestDate(books.map((book) => book.dateModified)),
  },
];

const routes = [
  homepageRoute,
  ...fixedRouteLastModified.filter(({ route }) => route !== "/"),
  ...collectionRoutes,
  ...services.map((service) => ({
    route: `/services/${service.slug}/`,
    lastModified: service.lastModified,
  })),
  ...publishedNotes.map((note) => ({
    route: `/notes/${note.slug}/`,
    lastModified: note.dateModified,
  })),
  ...books.map((book) => ({
    route: `/books/${book.slug}/`,
    lastModified: book.dateModified,
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
