export type Book = {
  slug: string;
  title: string;
  subtitle: string;
  blurb: string;
  seoTitle: string;
  seoDescription: string;
  datePublished: string;
  dateModified: string;
  isbn13: string;
  asin: string;
  publisher: "Independently published";
  format: "Paperback";
  language: "English";
  languageCode: "en-US";
  pageCount: number;
  amazonUrl: string;
  featured: boolean;
  overview: string[];
  themes: string[];
  audience: string[];
};

export const books: Book[] = [
  {
    slug: "nurse-the-fck-up",
    title: "Nurse the F*ck Up",
    subtitle: "The Raw Truth About Surviving Med-Surg",
    blurb:
      "A plainspoken book about the patient loads, red tape, pressure, and emotional weight of med-surg nursing, written from inside the work.",
    seoTitle: "Nurse the F*ck Up by Keith Staggers",
    seoDescription:
      "Read about Nurse the F*ck Up by Keith Staggers, a candid 2023 paperback on the human and operational reality of surviving med-surg nursing.",
    datePublished: "2023-09-16",
    dateModified: "2026-07-25",
    isbn13: "9798861621335",
    asin: "B0CJ44XP81",
    publisher: "Independently published",
    format: "Paperback",
    language: "English",
    languageCode: "en-US",
    pageCount: 166,
    amazonUrl: "https://www.amazon.com/dp/B0CJ44XP81",
    featured: true,
    overview: [
      "Nurse the F*ck Up is Keith Staggers' plainspoken 2023 book about surviving med-surg nursing. It focuses on the patient loads, red tape, pressure, and emotional weight that make bedside work hard to sustain.",
      "The book comes from Keith's experience as a nurse and nurse leader. It addresses the human and operational side of the job. It is not clinical instruction and does not replace workplace policy or professional judgment.",
      "Of Keith's healthcare books, this is the one he is most proud of. The title is intentionally direct because the subject is direct: what it takes to keep showing up, protect your standards, and stay honest about the work.",
    ],
    themes: [
      "The daily pressure and emotional weight of med-surg nursing",
      "Staying useful without pretending the work is easy",
      "The gap between motivational language and bedside reality",
      "Professional standards, survival, and honest reflection",
    ],
    audience: [
      "Working med-surg nurses who want a direct account of the job",
      "New bedside nurses looking for an honest picture of the pressure",
      "Nurse leaders trying to understand the friction their teams carry",
    ],
  },
  {
    slug: "leading-with-care",
    title: "Leading with Care",
    subtitle: "Mastering Healthcare Management",
    blurb:
      "An earlier healthcare leadership book about conflict, change, staff retention, and efficiency, grounded in a career spanning public safety, nursing, and nurse leadership.",
    seoTitle: "Leading with Care by Keith Staggers",
    seoDescription:
      "Read about Leading with Care by Keith Staggers, a 2023 paperback on conflict, change, retention, and practical healthcare leadership.",
    datePublished: "2023-11-24",
    dateModified: "2026-07-25",
    isbn13: "9798869793935",
    asin: "B0CNYLZ5FC",
    publisher: "Independently published",
    format: "Paperback",
    language: "English",
    languageCode: "en-US",
    pageCount: 178,
    amazonUrl: "https://www.amazon.com/dp/B0CNYLZ5FC",
    featured: false,
    overview: [
      "Leading with Care is Keith Staggers' earlier 2023 book on practical healthcare leadership. Its core subjects include conflict resolution, change management, staff retention, and operational efficiency.",
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
