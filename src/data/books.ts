export type BookEdition = {
  format: "Kindle" | "Paperback";
  schemaFormat: "EBook" | "Paperback";
  asin: string;
  priceUsd?: string;
  status: "live" | "propagating";
  amazonUrl?: string;
  isbn13?: string;
  pageCount?: number;
};

export type LiveBookEdition = BookEdition & {
  status: "live";
  amazonUrl: string;
};

export type DirectAudiobookEdition = {
  format: "Audiobook";
  schemaFormat: "AudiobookFormat";
  priceUsd: string;
  status: "live";
  checkoutUrl: string;
  datePublished: string;
  durationIso: string;
  durationLabel: string;
  deliveryLabel: "MP3 download";
  availabilityLabel: "Immediate delivery";
  narrationDisclosure: string;
};

export type Book = {
  slug: string;
  title: string;
  subtitle: string;
  topic: string;
  blurb: string;
  seoTitle: string;
  seoDescription: string;
  datePublished: string;
  dateModified: string;
  coverWidth: number;
  coverHeight: number;
  publisher: "Independently published";
  language: "English";
  languageCode: "en-US";
  editions: BookEdition[];
  directAudiobook?: DirectAudiobookEdition;
  goodreadsUrl?: string;
  openLibraryUrl?: string;
  companionUrl?: string;
  featured: boolean;
  overview: string[];
  themes: string[];
  audience: string[];
};

export const liveEditionsFor = (book: Book): LiveBookEdition[] =>
  book.editions.filter(
    (edition): edition is LiveBookEdition =>
      edition.status === "live" && Boolean(edition.amazonUrl)
  );

export const primaryLiveEditionFor = (book: Book) =>
  liveEditionsFor(book)[0] ?? book.editions[0];

export const paperbackEditionFor = (book: Book) =>
  book.editions.find((edition) => edition.format === "Paperback");

export const books: Book[] = [
  {
    slug: "build-the-workflow-keep-the-judgment",
    title: "Build the Workflow. Keep the Judgment.",
    subtitle: "A Practical Field Guide to AI Workflows, Guardrails, and Proof",
    topic: "Practical AI workflows",
    blurb:
      "A practical field guide for turning scattered AI chats and automations into a controlled work system with clear sources, human approval, testing, proof, and a way to recover when something fails.",
    seoTitle: "Build the Workflow. Keep the Judgment. AI Book",
    seoDescription:
      "Buy Build the Workflow. Keep the Judgment. by Keith Staggers, a practical guide to AI workflows, human approval, testing, evidence, and recovery.",
    datePublished: "2026-07-31",
    dateModified: "2026-08-02",
    coverWidth: 600,
    coverHeight: 960,
    publisher: "Independently published",
    language: "English",
    languageCode: "en-US",
    editions: [
      {
        format: "Kindle",
        schemaFormat: "EBook",
        asin: "B0HCC3L365",
        priceUsd: "9.99",
        status: "live",
        amazonUrl: "https://www.amazon.com/dp/B0HCC3L365",
      },
      {
        format: "Paperback",
        schemaFormat: "Paperback",
        asin: "B0HCCG4CTX",
        isbn13: "9798190013788",
        pageCount: 88,
        priceUsd: "17.99",
        status: "propagating",
      },
    ],
    directAudiobook: {
      format: "Audiobook",
      schemaFormat: "AudiobookFormat",
      priceUsd: "12.99",
      status: "live",
      checkoutUrl:
        "https://keithstaggers.lemonsqueezy.com/checkout/buy/9c8c2f24-c58c-4b7b-ad3f-844501fbfcd1",
      datePublished: "2026-08-02",
      durationIso: "PT2H38M13S",
      durationLabel: "2 hours 38 minutes",
      deliveryLabel: "MP3 download",
      availabilityLabel: "Immediate delivery",
      narrationDisclosure: "Narrated with Keith Staggers's authorized AI voice.",
    },
    companionUrl: "/workflow-book/",
    featured: true,
    overview: [
      "Build the Workflow. Keep the Judgment. is for people who use AI for real work but keep losing context, restarting conversations, or depending on processes nobody else can inspect.",
      "The book shows how to separate current facts from old plans, define one repeated task clearly, decide what a person must approve, test normal and failure cases, record evidence, and keep a manual fallback.",
      "It is not a prompt collection or a manual for one AI product. The goal is a useful work system that can survive changing tools while the responsible person keeps control of money, identity, commitments, and judgment.",
    ],
    themes: [
      "Organizing durable context without creating one large junk drawer",
      "Turning repeated work into a clear process with an owner and finish line",
      "Keeping human approval around money, identity, commitments, and professional judgment",
      "Testing normal, broken, private, prohibited, duplicate, and failure cases",
      "Recording proof and recovering when a tool or workflow fails",
    ],
    audience: [
      "Solo operators and creators who use AI across several kinds of work",
      "Consultants and small-business owners building repeatable AI-assisted processes",
      "Team leaders who need clear approval, testing, handoff, and recovery rules",
    ],
  },
  {
    slug: "nurse-the-fck-up",
    title: "Nurse the F*ck Up",
    subtitle: "The Raw Truth About Surviving Med-Surg",
    topic: "Nursing",
    blurb:
      "A no-fluff field guide for med-surg nurses who need practical ways to manage heavy patient loads, handle stress, advocate clearly, and keep their purpose without pretending the work is easy.",
    seoTitle: "Nurse the F*ck Up by Keith Staggers",
    seoDescription:
      "Buy Nurse the F*ck Up by Keith Staggers, a practical field guide for managing patient loads, stress, advocacy, emergencies, and the realities of med-surg nursing.",
    datePublished: "2023-09-16",
    dateModified: "2026-08-03",
    coverWidth: 600,
    coverHeight: 900,
    publisher: "Independently published",
    language: "English",
    languageCode: "en-US",
    editions: [
      {
        format: "Paperback",
        schemaFormat: "Paperback",
        asin: "B0CJ44XP81",
        isbn13: "9798861621335",
        pageCount: 166,
        priceUsd: "10.99",
        status: "live",
        amazonUrl: "https://www.amazon.com/dp/B0CJ44XP81",
      },
    ],
    goodreadsUrl: "https://www.goodreads.com/book/show/201866638-nurse-the-f-ck-up",
    openLibraryUrl:
      "https://openlibrary.org/books/OL62365292M/Nurse_the_F%2Ack_Up_The_Raw_Truth_About_Surviving_Med-Surg",
    featured: false,
    overview: [
      "Nurse the F*ck Up is a practical survival guide for the parts of med-surg nursing that school and policy manuals rarely prepare you to carry. It moves from patient loads and stress to advocacy, emergencies, interdepartmental relationships, career growth, life outside work, and keeping perspective.",
      "Keith writes from experience as a nurse and nurse leader after 21 years in law enforcement. The result is direct, lived guidance for staying useful when the work is fast, emotionally heavy, and full of competing demands.",
      "This is not clinical instruction and does not replace workplace policy or professional judgment. It is a field guide to the human and operational pressure around the work, written without motivational fluff or a promise that the job will become easy.",
    ],
    themes: [
      "Managing heavy patient loads without losing the full picture",
      "Handling stress while protecting standards and judgment",
      "Advocating for yourself and your patients",
      "Responding to emergencies and working across departments",
      "Professional growth, technology, life outside work, and perspective",
    ],
    audience: [
      "Working med-surg nurses who need practical help with the pressure",
      "New bedside nurses who want the honest version of the job",
      "Nurse leaders who want to understand what their teams carry",
    ],
  },
  {
    slug: "leading-with-care",
    title: "Leading with Care",
    subtitle: "Mastering Healthcare Management",
    topic: "Healthcare leadership",
    blurb:
      "A practical healthcare leadership book about conflict, change, staff retention, and efficiency, grounded in a career spanning public safety, nursing, and nurse leadership.",
    seoTitle: "Leading with Care by Keith Staggers",
    seoDescription:
      "Read about Leading with Care by Keith Staggers, a 2023 paperback on conflict, change, retention, and practical healthcare leadership.",
    datePublished: "2023-11-24",
    dateModified: "2026-07-31",
    coverWidth: 600,
    coverHeight: 900,
    publisher: "Independently published",
    language: "English",
    languageCode: "en-US",
    editions: [
      {
        format: "Paperback",
        schemaFormat: "Paperback",
        asin: "B0CNYLZ5FC",
        isbn13: "9798869793935",
        pageCount: 178,
        status: "live",
        amazonUrl: "https://www.amazon.com/dp/B0CNYLZ5FC",
      },
    ],
    goodreadsUrl: "https://www.goodreads.com/book/show/202652162-leading-with-care",
    openLibraryUrl:
      "https://openlibrary.org/books/OL62365304M/Leading_with_Care_Mastering_Healthcare_Management",
    featured: false,
    overview: [
      "Leading with Care is Keith Staggers' 2023 book on practical healthcare leadership. Its core subjects include conflict resolution, change management, staff retention, and operational efficiency.",
      "The experience behind the book spans more than three decades across two separate careers: 21 years in public safety, followed by nursing and nurse leadership from 2014 onward. That combined history, not three decades in healthcare management, is the frame for the work.",
      "The book is for leaders who need to make decisions, communicate clearly, and hold standards without losing sight of the people doing the work.",
    ],
    themes: [
      "Conflict resolution in healthcare teams",
      "Leading people through operational change",
      "Staff retention and the conditions that shape it",
      "Efficiency without losing care or accountability",
    ],
    audience: [
      "New and developing healthcare leaders",
      "Charge nurses and nurse leaders moving into management",
      "Experienced leaders who want a practical cross-career perspective",
    ],
  },
];

export const featuredBook = books.find((book) => book.featured) ?? books[0];
