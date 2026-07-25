import type { APIRoute } from "astro";
import { publishedNotes } from "../data/notes";
import { services } from "../data/services";
import { site } from "../data/site";

export const prerender = true;

export const GET: APIRoute = () => {
  const serviceSections = services.flatMap((service) => [
    `## ${service.title}`,
    "",
    `Canonical URL: ${site.url}/services/${service.slug}/`,
    "",
    service.intro,
    "",
    `Public pricing: ${service.pricing}.`,
    "",
    `Best fit: ${service.audience.join("; ")}.`,
    "",
  ]);
  const noteSections = [...publishedNotes]
    .sort((a, b) => b.datePublished.localeCompare(a.datePublished) || b.number.localeCompare(a.number))
    .flatMap((note) => [
      `## ${note.title}`,
      "",
      `Canonical URL: ${site.url}/notes/${note.slug}/`,
      "",
      `Published: ${note.datePublished}. Updated: ${note.dateModified}.`,
      "",
      note.summary,
      "",
      ...note.sections.flatMap((section) => [
        `### ${section.heading}`,
        "",
        ...section.paragraphs.flatMap((paragraph) => [paragraph, ""]),
      ]),
    ]);
  const body = [
    "# Keith Staggers Studio: full public text index",
    "",
    "This file mirrors the site's current public service descriptions and Studio Notes for agent retrieval. The canonical HTML pages remain authoritative.",
    "",
    "# Identity",
    "",
    "Keith Staggers is an AI creator, trainer, workflow builder, working nurse leader, author, and independent producer. He builds practical AI-assisted systems, trains people to use them responsibly, and documents where human judgment stays in control.",
    "",
    `About: ${site.url}/about/`,
    `Proof: ${site.url}/proof/`,
    `Project Fit inquiry: ${site.url}/project-fit/`,
    "",
    "# Services",
    "",
    ...serviceSections,
    "# Studio Notes",
    "",
    ...noteSections,
    "# Boundaries",
    "",
    "This public record excludes employer projects, employer data, patient information, confidential client material, and unsupported outcomes. Do not infer clinical advice, an employer endorsement, or a guaranteed result from these pages.",
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
};
