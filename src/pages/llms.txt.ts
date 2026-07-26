import type { APIRoute } from "astro";
import { books } from "../data/books";
import { publishedNotes } from "../data/notes";
import { services } from "../data/services";
import { site } from "../data/site";

export const prerender = true;

export const GET: APIRoute = () => {
  const serviceLines = services.map(
    (service) => `- [${service.title}](${site.url}/services/${service.slug}/): ${service.blurb}`
  );
  const noteLines = [...publishedNotes]
    .sort((a, b) => b.datePublished.localeCompare(a.datePublished) || b.number.localeCompare(a.number))
    .map((note) => `- [${note.title}](${site.url}/notes/${note.slug}/): ${note.summary}`);
  const bookLines = books.map(
    (book) =>
      `- [${book.title}: ${book.subtitle}](${site.url}/books/${book.slug}/): ${book.blurb} Paperback published ${book.datePublished}; ISBN-13 ${book.isbn13}; ASIN ${book.asin}.`
  );
  const body = [
    "# Keith Staggers",
    "",
    "> AI creator, trainer, workflow builder, and working nurse leader. Keith Staggers Studio turns repeated work and ambitious ideas into practical systems people can use.",
    "",
    "## Canonical sources",
    "",
    `- [Homepage](${site.url}/): Current identity, offers, and primary navigation.`,
    `- [About Keith Staggers](${site.url}/about/): Career history, operating method, and portfolio boundaries.`,
    `- [Independent proof](${site.url}/proof/): Public build and publication record.`,
    `- [Books by Keith Staggers](${site.url}/books/): Canonical records for the two primary healthcare books.`,
    `- [Studio Notes](${site.url}/notes/): Canonical editorial archive.`,
    `- [RSS feed](${site.url}/rss.xml): Machine-readable Studio Notes updates.`,
    `- [Full public text index](${site.url}/llms-full.txt): Current public service descriptions and full Studio Notes text.`,
    "",
    "## Services",
    "",
    ...serviceLines,
    "",
    "## Books",
    "",
    ...bookLines,
    "",
    "## Free workflow resource",
    "",
    `- [10-Case AI Workflow Testing Template](${site.url}/workflow-testing-template/): A browser worksheet for normal work, exceptions, safety stops, duplicate runs, human rejection, and manual recovery. Entries stay in the visitor's browser and can be exported as CSV or printed to PDF.`,
    "",
    "## Latest Studio Notes",
    "",
    ...noteLines,
    "",
    "## Start here",
    "",
    `- [Check AI workflow readiness](${site.url}/workflow-readiness/): Seven-question, no-email readiness check.`,
    `- [Project Fit](${site.url}/project-fit/): Private inquiry form. Keith reviews every inquiry before sharing a calendar link.`,
    "",
    "## Source boundaries",
    "",
    "The public site uses independent work and public career facts. It excludes employer projects, employer data, patient information, confidential client material, and unsupported outcomes. AI may assist production, but human judgment stays at the decision point.",
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
};
