import type { APIRoute } from "astro";
import { books } from "../data/books";
import { publishedNotes } from "../data/notes";
import { services } from "../data/services";
import { site } from "../data/site";
import {
  workflowBookCompanion,
  workflowBookTemplates,
} from "../data/workflow-book";

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
      `- [${book.title}: ${book.subtitle}](${site.url}/books/${book.slug}/): ${book.blurb} Paperback published ${book.datePublished}; ISBN-13 ${book.isbn13}; ASIN ${book.asin}. [Goodreads](${book.goodreadsUrl}). [Open Library](${book.openLibraryUrl}).`
  );
  const workflowBookLines = workflowBookTemplates.map(
    (template) =>
      `- [${template.number}. ${template.title}](${site.url}/workflow-book/templates/${template.fileName}): ${template.purpose}`
  );
  const body = [
    "# Keith Staggers",
    "",
    "> Keith Staggers teaches leaders and small teams how to use AI at work, helps people solve one real problem in a one-to-one session, and builds practical AI tools for repetitive tasks. He is also a working nurse leader, speaker, author, and retired Baltimore detective.",
    "",
    "## Canonical sources",
    "",
    `- [Homepage](${site.url}/): Current identity, offers, and primary navigation.`,
    `- [About Keith Staggers](${site.url}/about/): Career history, operating method, and portfolio boundaries.`,
    `- [Examples of Keith's work](${site.url}/proof/): Plain-English examples of independent AI builds, client work, books, and finished creative work.`,
    `- [Books by Keith Staggers](${site.url}/books/): Canonical records for the two primary healthcare books.`,
    `- [AI Book Companion](${site.url}${workflowBookCompanion.route}): Ten free text templates for organizing AI work, recording important approvals, testing the result, and planning what to do if something fails.`,
    `- [Articles and guides](${site.url}/notes/): Practical articles about using AI at work, team training, finishing projects, and career reinvention.`,
    `- [RSS feed](${site.url}/rss.xml): Machine-readable article updates.`,
    `- [Full public text index](${site.url}/llms-full.txt): Current public service descriptions and full article text.`,
    "",
    "## Services",
    "",
    ...serviceLines,
    "",
    "## Books",
    "",
    ...bookLines,
    "",
    "## Free guides and worksheets for repetitive tasks",
    "",
    `- [10-Example AI Process Testing Worksheet](${site.url}/workflow-testing-template/): A browser worksheet for checking normal work, missing information, mistakes, required stops, duplicate actions, rejected results, and failures. Entries stay in the visitor's browser and can be exported as CSV or printed to PDF.`,
    `- [AI Book Companion](${site.url}${workflowBookCompanion.route}): Version ${workflowBookCompanion.version}. Ten editable text files that help a person organize, test, and safely run an AI-assisted task.`,
    ...workflowBookLines,
    "",
    "## Latest articles and guides",
    "",
    ...noteLines,
    "",
    "## Start here",
    "",
    `- [See if a task is ready for AI](${site.url}/workflow-readiness/): A free seven-question check with no email required.`,
    `- [Tell Keith about your task](${site.url}/project-fit/): Private inquiry form. Keith reviews every inquiry before sharing a calendar link.`,
    "",
    "## Source boundaries",
    "",
    "The public site uses independent work and public career facts. It excludes employer projects, employer data, patient information, confidential client material, and unsupported outcomes. AI may help with the work, but a person remains responsible for checking and making the final decision.",
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
};
