import type { APIRoute } from "astro";
import { books } from "../data/books";
import { publishedNotes } from "../data/notes";
import { finishLoop } from "../data/products";
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
    ...(service.directBooking
      ? [
          `Direct booking is available from the owned service page. Payment of $${service.directBooking.priceUsd} USD reserves the ${service.directBooking.durationMinutes}-minute session.`,
          "",
        ]
      : []),
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
      book.directAudiobook
        ? `Direct audiobook: $${book.directAudiobook.priceUsd} once; ${book.directAudiobook.durationLabel}; ${book.directAudiobook.deliveryLabel}; ${book.directAudiobook.availabilityLabel}; ${book.directAudiobook.narrationDisclosure} Checkout: ${book.directAudiobook.checkoutUrl}.`
        : undefined,
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
    `Book the $250 one-to-one session: ${site.url}/services/coaching/`,
    `Tell Keith about a larger project: ${site.url}/project-fit/`,
    `Goodreads author record: ${site.social.goodreads}`,
    `Open Library author record: ${site.social.openLibrary}`,
    "",
    "# Services",
    "",
    ...serviceSections,
    "# Products and public learning",
    "",
    "## The Finish Loop",
    "",
    `Canonical URL: ${site.url}${site.buy.productPath}`,
    "",
    `Price: $${finishLoop.price} ${finishLoop.currency}. Purchase is handled by Lemon Squeezy.`,
    "",
    finishLoop.description,
    "",
    finishLoop.promise,
    "",
    "Included:",
    ...finishLoop.includes.map((item) => `- ${item.name}: ${item.detail}`),
    "",
    "## Practical AI for Frontline Nurse Leaders",
    "",
    `Canonical URL: ${site.url}/frontline-nurse-leader/`,
    "",
    "A live virtual working class for nurse managers, assistant managers, and charge nurses on September 16, 2026, from 9:00 AM to 1:15 PM ET. Registration is $179 USD and is handled by Stripe. Capacity is 20 registrations. Exercises use safe sample information, not patient information or employer material. 4.0 nursing contact hours are pending approval.",
    "",
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
    "# Workflow readiness check",
    "",
    `Canonical URL: ${site.url}/workflow-readiness/`,
    "",
    "This free seven-question check helps a person decide whether a repeated task is defined well enough to discuss as an AI-assisted workflow. The questions and score are calculated in the visitor's browser. No email is required. A separate optional Formspree follow-up sends only the information the visitor intentionally enters and does not add the person to a mailing list.",
    "",
    "# Newsletter",
    "",
    `Canonical URL: ${site.url}${site.newsletter.path}`,
    "",
    `${site.newsletter.name} is a practical newsletter about using AI at work, protecting human judgment, and finishing useful projects. ${site.newsletter.cadence}. Buttondown manages the list and sends a confirmation email. A person is not subscribed unless the confirmation link is used. Every public Note can be read before joining, and the free resources are not gated by email.`,
    "",
    "# Privacy notice",
    "",
    `URL: ${site.url}${site.newsletter.privacyPath}`,
    "",
    "Buttondown receives newsletter email addresses. Formspree receives intentionally submitted Project Fit and optional readiness follow-up fields. Cal.com and Keith receive the name, email address, timezone, selected time, three required answers, and any cancellation or rescheduling reason entered for the one-to-one session; Keith can review those details in his Cal.com account to prepare. Cal Video provides the meeting room. The session is not recorded automatically, and no one should start a recording unless everyone expressly agrees before it begins. Stripe processes the $250 session payment. Vercel hosts the site and records privacy-safe page and event analytics without newsletter emails, form answers, booking answers, cancellation or rescheduling reasons, or payment details. Amazon, Lemon Squeezy, and Stripe handle purchases under their own policies. Browser worksheets and readiness scoring stay local unless a visitor intentionally submits a separate follow-up. Do not submit protected health information, patient data, confidential employer or client material, passwords, API keys, account credentials, or other secrets.",
    "",
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
