import type { APIRoute } from "astro";
import { books } from "../data/books";
import { publishedNotes } from "../data/notes";
import { services } from "../data/services";
import { site } from "../data/site";
import {
  workflowBookCompanion,
  workflowBookTemplates,
} from "../data/workflow-book";
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
  const bookSections = books.flatMap((book) => {
    const editionLines = book.editions.map((edition) => {
      const details = [
        `ASIN ${edition.asin}`,
        edition.isbn13 ? `ISBN-13 ${edition.isbn13}` : undefined,
        edition.pageCount ? `${edition.pageCount} pages` : undefined,
        edition.priceUsd ? `$${edition.priceUsd} USD` : undefined,
        edition.amazonUrl ? `Amazon record ${edition.amazonUrl}` : "United States Amazon page still propagating",
      ].filter(Boolean);
      return `- ${edition.format}: ${details.join("; ")}.`;
    });
    const catalogLines = [
      book.goodreadsUrl ? `Goodreads record: ${book.goodreadsUrl}.` : undefined,
      book.openLibraryUrl ? `Open Library record: ${book.openLibraryUrl}.` : undefined,
      book.companionUrl ? `Free companion templates: ${site.url}${book.companionUrl}.` : undefined,
    ].filter((line): line is string => Boolean(line));
    return [
    `## ${book.title}: ${book.subtitle}`,
    "",
    `Canonical URL: ${site.url}/books/${book.slug}/`,
    "",
    `Author: Keith Staggers. Published: ${book.datePublished}. Publisher: ${book.publisher}. Language: ${book.language}.`,
    "",
    "Verified editions:",
    ...editionLines,
    ...catalogLines,
    "",
    ...book.overview.flatMap((paragraph) => [paragraph, ""]),
    "What the book addresses:",
    ...book.themes.map((theme) => `- ${theme}`),
    "",
    "Intended readers:",
    ...book.audience.map((audience) => `- ${audience}`),
    "",
    ];
  });
  const workflowTestSections = workflowTestCases.flatMap((testCase) => [
    `### ${testCase.number}. ${testCase.name}`,
    "",
    testCase.purpose,
    "",
    `Expected behavior: ${testCase.expected}`,
    "",
  ]);
  const workflowBookSections = workflowBookTemplates.flatMap((template) => [
    `## ${template.number}. ${template.title}`,
    "",
    `Download: ${site.url}/workflow-book/templates/${template.fileName}`,
    "",
    template.purpose,
    "",
  ]);
  const body = [
    "# Keith Staggers Studio: full public text index",
    "",
    "This file mirrors the site's current public service descriptions and articles for agent retrieval. The canonical HTML pages remain authoritative.",
    "",
    "# Identity",
    "",
    "Keith Staggers teaches leaders and small teams how to use AI at work, helps people solve one real problem in a one-to-one session, and builds practical AI tools for repetitive tasks. He is also a working nurse leader, speaker, author, retired Baltimore detective, and independent producer. His public book catalog contains Build the Workflow. Keep the Judgment., Nurse the F*ck Up, and Leading with Care.",
    "",
    `About: ${site.url}/about/`,
    `Proof: ${site.url}/proof/`,
    `Tell Keith about your task: ${site.url}/project-fit/`,
    `Goodreads author record: ${site.social.goodreads}`,
    `Open Library author record: ${site.social.openLibrary}`,
    "",
    "# Services",
    "",
    ...serviceSections,
    "# Books",
    "",
    ...bookSections,
    "# AI Book Companion",
    "",
    `Canonical URL: ${site.url}${workflowBookCompanion.route}`,
    "",
    `Companion version: ${workflowBookCompanion.version}. Updated: ${workflowBookCompanion.dateModified}.`,
    "",
    "This is the companion resource for Build the Workflow. Keep the Judgment. The ten editable text files help a person explain the task, record what already exists, list unfinished work, name decisions that require a person, test the result, record what happened, teach another person to use it, and prepare for failures.",
    "",
    "The templates do not make an AI tool safe, legal, or correct by themselves. The person responsible must adapt them to the laws, workplace rules, privacy requirements, account controls, contracts, and professional duties that apply.",
    "",
    ...workflowBookSections,
    "# Free AI process testing worksheet",
    "",
    `Canonical URL: ${site.url}/workflow-testing-template/`,
    "",
    "The 10-Example AI Process Testing Worksheet is free. It records the person responsible, what starts the task, what information is allowed, what a good result looks like, who checks it, when the process must stop, how to finish manually, what happened in the test, whether the process is ready to use, known limits, and the next test. Entries remain in the visitor's browser and can be exported as CSV or printed to PDF.",
    "",
    ...workflowTestSections,
    "# Articles and guides",
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
