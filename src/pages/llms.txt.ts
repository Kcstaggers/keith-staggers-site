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

export const prerender = true;

export const GET: APIRoute = () => {
  const serviceLines = services.map(
    (service) => `- [${service.title}](${site.url}/services/${service.slug}/): ${service.blurb}${service.directBooking ? " Direct booking is available from this owned service page." : ""}`
  );
  const noteLines = [...publishedNotes]
    .sort((a, b) => b.datePublished.localeCompare(a.datePublished) || b.number.localeCompare(a.number))
    .map((note) => `- [${note.title}](${site.url}/notes/${note.slug}/): ${note.directAnswer ?? note.summary}`);
  const bookLines = books.map((book) => {
    const editions = book.editions
      .map((edition) => {
        const identifiers = [
          `ASIN ${edition.asin}`,
          edition.isbn13 ? `ISBN-13 ${edition.isbn13}` : undefined,
          edition.pageCount ? `${edition.pageCount} pages` : undefined,
          edition.priceUsd ? `$${edition.priceUsd} USD` : undefined,
          edition.amazonUrl ? `Amazon ${edition.amazonUrl}` : "US Amazon page propagating",
        ].filter(Boolean);
        return `${edition.format}: ${identifiers.join(", ")}`;
      })
      .join("; ");
    const catalogLinks = [
      book.directAudiobook
        ? `Direct audiobook: $${book.directAudiobook.priceUsd} once; ${book.directAudiobook.durationLabel}; ${book.directAudiobook.deliveryLabel}; ${book.directAudiobook.availabilityLabel}; ${book.directAudiobook.narrationDisclosure} Checkout ${book.directAudiobook.checkoutUrl}.`
        : undefined,
      book.goodreadsUrl ? `[Goodreads](${book.goodreadsUrl}).` : undefined,
      book.openLibraryUrl ? `[Open Library](${book.openLibraryUrl}).` : undefined,
      book.companionUrl ? `[Free companion templates](${site.url}${book.companionUrl}).` : undefined,
    ].filter(Boolean).join(" ");
    return `- [${book.title}: ${book.subtitle}](${site.url}/books/${book.slug}/): ${book.blurb} Published ${book.datePublished}. ${editions}. ${catalogLinks}`.trim();
  });
  const workflowBookLines = workflowBookTemplates.map(
    (template) =>
      `- [${template.number}. ${template.title}](${site.url}/workflow-book/templates/${template.fileName}): ${template.purpose}`
  );
  const body = [
    "# Keith Staggers",
    "",
    "> Keith Staggers is an AI trainer and workflow builder, nurse leader, author, and independent R&B/soul artist. He helps leaders and small teams use AI for real work while keeping human judgment at the decision point.",
    "",
    "## Canonical sources",
    "",
    `- [Homepage](${site.url}/): Current identity, offers, and primary navigation.`,
    `- [About Keith Staggers](${site.url}/about/): Career history, operating method, and portfolio boundaries.`,
    `- [Examples of Keith's work](${site.url}/proof/): Plain-English examples of independent AI builds, client work, books, and finished creative work.`,
    `- [Books by Keith Staggers](${site.url}/books/): Canonical records for three published books about practical AI workflows, nursing, and healthcare leadership.`,
    `- [The Finish Loop](${site.url}${site.buy.productPath}): A $${finishLoop.price} downloadable toolkit for choosing one project, finishing it, releasing it, and saving a repeatable process.`,
    `- [Practical AI for Frontline Nurse Leaders](${site.url}/frontline-nurse-leader/): A $179 live virtual class on September 16, 2026, from 9:00 AM to 1:15 PM ET.`,
    `- [Build the Workflow companion](${site.url}${workflowBookCompanion.route}): Ten free text templates for organizing AI work, recording important approvals, testing the result, and planning what to do if something fails.`,
    `- [Articles and guides](${site.url}/notes/): Practical articles about using AI at work, team training, finishing projects, and career reinvention.`,
    `- [${site.newsletter.name}](${site.url}${site.newsletter.path}): A Buttondown-confirmed newsletter with one practical workflow, one guardrail, and one action. ${site.newsletter.cadence}. The ${publishedNotes.length} public Notes show what Keith writes about before someone joins.`,
    `- [Privacy notice](${site.url}${site.newsletter.privacyPath}): Plain-language boundaries for Buttondown, Formspree, Cal.com, Stripe, Vercel, browser-local tools, and external stores.`,
    `- [RSS feed](${site.url}/rss.xml): Machine-readable article updates.`,
    `- [Full public text index](${site.url}/llms-full.txt): Current public service descriptions and full article text.`,
    "",
    "## Identity and verified entities",
    "",
    "Keith Staggers has three current books: Build the Workflow. Keep the Judgment., Nurse the F*ck Up, and Leading with Care. Beyond Burnout: Healing the Healers and No Fear Nursing: The Raw Truth About Surviving Med-Surg are retired titles and should not be counted as current books.",
    "",
    `- [LinkedIn](${site.social.linkedin})`,
    `- [Instagram](${site.social.instagram})`,
    `- [Facebook](${site.social.facebook})`,
    `- [Threads](${site.social.threads})`,
    `- [YouTube](${site.social.youtube})`,
    `- [Spotify artist](${site.social.spotify})`,
    `- [Apple Music artist](${site.social.appleMusic})`,
    `- [Amazon Music artist](${site.social.amazonMusic})`,
    `- [MusicBrainz artist](${site.social.musicBrainz})`,
    `- [Deezer artist](${site.social.deezer})`,
    `- [Qobuz artist](${site.social.qobuz})`,
    `- [Amazon Author](${site.social.amazonAuthor})`,
    `- [Goodreads author](${site.social.goodreads})`,
    `- [Open Library author](${site.social.openLibrary})`,
    `- [GitHub](${site.social.github})`,
    "- [First Light on MusicBrainz](https://musicbrainz.org/release/c61ee5dc-87ef-4b82-b4cf-3e0443575cf7)",
    "- [First Light on Qobuz](https://www.qobuz.com/us-en/album/first-light-keith-staggers/kw8pp8q9rai9p)",
    "- [First Light on Deezer](https://www.deezer.com/us/album/1006478861)",
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
    `- [Build the Workflow companion](${site.url}${workflowBookCompanion.route}): Version ${workflowBookCompanion.version}. Ten editable text files that help a person organize, test, and safely run an AI-assisted task.`,
    ...workflowBookLines,
    "",
    "## Latest articles and guides",
    "",
    ...noteLines,
    "",
    "## Start here",
    "",
    `- [See if a task is ready for AI](${site.url}/workflow-readiness/): A free seven-question check with no email required.`,
    `- [Book the $250 one-to-one session](${site.url}/services/coaching/): A 60-minute working session for one real task or stuck project. Choose a time, answer three questions, and pay through Cal.com to reserve.`,
    `- [Tell Keith about a larger project](${site.url}/project-fit/): Private inquiry form for done-for-you setups, team training, speaking, and larger work. Keith reviews every inquiry before sharing a calendar link.`,
    `- [Read ${site.newsletter.name}](${site.url}${site.newsletter.path}): Review all ${publishedNotes.length} public Notes first. Joining is optional, Buttondown requires confirmation, and the free resources are not gated.`,
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
