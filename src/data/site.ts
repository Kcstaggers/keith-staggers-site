export const site = {
  name: "Keith Staggers",
  tagline: "AI creator, trainer, and workflow builder.",
  description:
    "Keith Staggers turns ambitious ideas and repeated work into finished AI-powered systems through production, coaching, training, and speaking. Available worldwide.",
  url: "https://keithstaggers.com",
  city: "Tampa, FL",
  // INTERIM (July 12, 2026): hello@keithstaggers.com cannot receive mail until the
  // domain moves to Vercel DNS (Canva blocks MX records). Swap back after the
  // transfer + a verified test email. See CLAUDE.md "email" notes.
  email: "kcstaggers@gmail.com",
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
    { label: "Work", href: "/#visuals" },
    { label: "The Finish Loop", href: "/finish-loop/" },
    { label: "Services", href: "/#services" },
    { label: "Notes", href: "/#notes" },
    { label: "About", href: "/#about" },
  ],
};
