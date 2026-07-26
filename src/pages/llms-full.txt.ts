import type { APIRoute } from "astro";
import { books } from "../data/books";
import { publishedNotes } from "../data/notes";
import { services } from "../data/services";
import { site } from "../data/site";
import { workflowTestCases } from "../data/workflow-testing";

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
  const bookSections = books.flatMap((book) => [
    `## ${book.title}: ${book.subtitle}`,
    "",
    `Canonical URL: ${site.url}/books/${book.slug}/`,
    "",
    `Author: Keith Staggers. Published: ${book.datePublished}. Publisher: ${book.publisher}. Format: ${book.format}. Language: ${book.language}. Length: ${book.pageCount} pages. ISBN-13: ${book.isbn13}. ASIN: ${book.asin}. Amazon record: ${book.amazonUrl}. Goodreads record: ${book.goodreadsUrl}. Open Library record: ${book.openLibraryUrl}.`,
    "",
    ...book.overview.flatMap((paragraph) => [paragraph, ""]),
    "What the book addresses:",
    ...book.themes.map((theme) => `- ${theme}`),
    "",
    "Intended readers:",
    ...book.audience.map((audience) => `- ${audience}`),
    "",
  ]);
  const workflowTestSections = workflowTestCases.flatMap((testCase) => [
    `### ${testCase.number}. ${testCase.name}`,
    "",
    testCase.purpose,
    "",
    `Expected behavior: ${testCase.expected}`,
    "",
  ]);
  const body = [
    "# Keith Staggers Studio: full public text index",
    "",
    "This file mirrors the site's current public service descriptions and Studio Notes for agent retrieval. The canonical HTML pages remain authoritative.",
    "",
    "# Identity",
    "",
    "Keith Staggers is an AI creator, trainer, workflow builder, working nurse leader, author, and independent producer. He builds practical AI-assisted systems, trains people to use them responsibly, and documents where human judgment stays in control. His primary public book catalog contains Nurse the F*ck Up and Leading with Care.",
    "",
    `About: ${site.url}/about/`,
    `Proof: ${site.url}/proof/`,
    `Project Fit inquiry: ${site.url}/project-fit/`,
    `Goodreads author record: ${site.social.goodreads}`,
    `Open Library author record: ${site.social.openLibrary}`,
    "",
    "# Services",
    "",
    ...serviceSections,
    "# Books",
    "",
    ...bookSections,
    "# Free workflow testing resource",
    "",
    `Canonical URL: ${site.url}/workflow-testing-template/`,
    "",
    "The 10-Case AI Workflow Testing Template is a free browser worksheet. It records the workflow owner, trigger, approved inputs, finish line, human reviewer, data boundary, stop conditions, manual fallback, expected behavior, actual evidence, outcome, release decision, known limits, and next test. Entries remain in the visitor's browser and can be exported as CSV or printed to PDF.",
    "",
    ...workflowTestSections,
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
