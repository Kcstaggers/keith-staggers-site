export const site = {
  name: "Keith Staggers",
  tagline: "AI creator, trainer, and workflow builder.",
  description:
    "Keith Staggers turns repeated work into tested, documented AI workflows people can own, with practical training and speaking for teams. Available worldwide.",
  url: "https://www.keithstaggers.com",
  city: "Tampa, FL",
  availability: {
    status: "open" as "open" | "limited" | "booked",
    label: "Open for projects",
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
    buttonLabel: "Start with fit questions",
  },
  social: {
    linkedin: "https://www.linkedin.com/in/keithstaggers/",
    spotify: "https://open.spotify.com/artist/4BAYMh3hDuSfEQHAOoOu0g",
    appleMusic: "https://music.apple.com/us/artist/keith-staggers",
    facebook: "https://www.facebook.com/profile.php?id=61564900019924",
    instagram: "https://www.instagram.com/sta_ggers/",
    youtube: "",
  },
  nav: [
    { label: "Proof", href: "/proof/" },
    { label: "The Finish Loop", href: "/finish-loop/" },
    { label: "Services", href: "/#services" },
    { label: "Notes", href: "/#notes" },
    { label: "About", href: "/#about" },
  ],
};
