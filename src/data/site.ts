export const site = {
  name: "Keith Staggers",
  tagline: "AI creative producer, coach, trainer & speaker.",
  description:
    "Keith Staggers turns ambitious ideas into finished AI-powered creative work through production, coaching, training, and speaking. Available worldwide.",
  url: "https://keithstaggers.com",
  city: "Tampa, FL",
  email: "hello@keithstaggers.com",
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
    // Live Cal.com booking. Edit here to change the link or button label.
    // Full URL: https://cal.com/<username>/<eventSlug>
    enabled: true,
    username: "keith-staggers-rpphlg",
    eventSlug: "15-min-intro-call",
    buttonLabel: "Book a 15-min intro call",
  },
  social: {
    spotify: "https://open.spotify.com/artist/4BAYMh3hDuSfEQHAOoOu0g",
    appleMusic: "https://music.apple.com/us/artist/keith-staggers",
    facebook: "https://www.facebook.com/profile.php?id=61564900019924",
    instagram: "https://www.instagram.com/sta_ggers/",
    youtube: "",
  },
  nav: [
    { label: "Proof", href: "/#proof" },
    { label: "Services", href: "/#services" },
    { label: "Notes", href: "/#notes" },
    { label: "Story", href: "/#about" },
    { label: "Follow", href: "https://www.facebook.com/profile.php?id=61564900019924" },
  ],
};
