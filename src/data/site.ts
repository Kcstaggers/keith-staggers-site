export const site = {
  name: "Keith Staggers",
  tagline: "Practical AI help for real work.",
  description:
    "Keith Staggers is an AI trainer and workflow builder, nurse leader, author, and independent R&B/soul artist. He helps leaders and small teams use AI for real work while keeping human judgment at the decision point.",
  url: "https://www.keithstaggers.com",
  city: "Tampa, FL",
  availability: {
    status: "open" as "open" | "limited" | "booked",
    label: "Open for projects",
  },
  verification: {
    google: "rgjOz-yffU1GPVoW7egiohALY7BiR2sCpCCV8zsojkY",
  },
  buy: {
    bookLabel: "Buy Build the Workflow",
    bookPath: "/books/build-the-workflow-keep-the-judgment/",
    productLabel: "Get The Finish Loop",
    productPath: "/finish-loop/",
  },
  newsletter: {
    name: "The Frontline AI Brief",
    path: "/newsletter/",
    privacyPath: "/privacy/",
    provider: "Buttondown",
    buttondownUsername: "staggers",
    cadence: "At most two emails per month",
  },
  booking: {
    // Larger projects remain gated through Project Fit. The fixed-price
    // one-to-one session is the only direct-booking exception and is defined
    // on that service record instead of changing this global route.
    enabled: false,
    username: "",
    eventSlug: "",
    intakePath: "/project-fit/",
    buttonLabel: "Tell Keith about your task",
  },
  social: {
    linkedin: "https://www.linkedin.com/in/keithstaggers/",
    github: "https://github.com/Kcstaggers",
    spotify: "https://open.spotify.com/artist/4BAYMh3hDuSfEQHAOoOu0g",
    appleMusic: "https://music.apple.com/us/artist/keith-staggers/1743790202",
    facebook: "https://www.facebook.com/people/Keith-Staggers/61564900019924/",
    instagram: "https://www.instagram.com/sta_ggers/",
    threads: "https://www.threads.com/@sta_ggers",
    youtube: "https://www.youtube.com/@kcstaggers",
    amazonMusic: "https://music.amazon.com/artists/B0D2YZYWJ8/keith-staggers",
    musicBrainz: "https://musicbrainz.org/artist/72a34e28-f999-438c-be3b-b4b51604eb43",
    deezer: "https://www.deezer.com/us/artist/264192171",
    qobuz: "https://www.qobuz.com/us-en/interpreter/keith-staggers/22287121",
    amazonAuthor: "https://amazon.com/author/keithstaggers",
    goodreads: "https://www.goodreads.com/author/show/45798281.Keith_Staggers",
    openLibrary: "https://openlibrary.org/authors/OL16535970A/Keith_Staggers",
  },
  nav: [
    { label: "How I Help", href: "/services/" },
    { label: "Proof", href: "/proof/" },
    { label: "Buy", href: "/#finish-loop" },
    { label: "Articles", href: "/notes/" },
    { label: "Books", href: "/books/" },
    { label: "About", href: "/about/" },
  ],
};
