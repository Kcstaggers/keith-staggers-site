export const site = {
  name: "Keith Staggers",
  tagline: "Practical AI help for real work.",
  description:
    "Keith Staggers helps leaders and small teams use AI. He builds solutions for repetitive tasks, works one-to-one on real problems, and trains teams.",
  url: "https://www.keithstaggers.com",
  city: "Tampa, FL",
  availability: {
    status: "open" as "open" | "limited" | "booked",
    label: "Open for projects",
  },
  verification: {
    google: "rgjOz-yffU1GPVoW7egiohALY7BiR2sCpCCV8zsojkY",
  },
  newsletter: {
    // Newsletter signups. Create a free account at https://buttondown.com,
    // then set your Buttondown username here and the form posts straight to it.
    // While this is empty, the form falls back to opening an email to you so
    // no signup is ever lost.
    buttondownUsername: "staggers",
  },
  booking: {
    // Public scheduling is intentionally gated. Visitors answer the project-fit
    // questions first. Keith sends the private calendar link only after review.
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
    facebook: "https://www.facebook.com/profile.php?id=61564900019924",
    instagram: "https://www.instagram.com/sta_ggers/",
    youtube: "https://www.youtube.com/@kcstaggers",
    goodreads: "https://www.goodreads.com/author/show/45798281.Keith_Staggers",
    openLibrary: "https://openlibrary.org/authors/OL16535970A/Keith_Staggers",
  },
  nav: [
    { label: "How I Help", href: "/services/" },
    { label: "Examples", href: "/proof/" },
    { label: "Articles", href: "/notes/" },
    { label: "Books", href: "/books/" },
    { label: "About", href: "/about/" },
  ],
};
