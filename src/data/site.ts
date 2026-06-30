export const site = {
  name: "Keith Staggers",
  tagline: "Detective. Nurse. AI Creator.",
  description:
    "Keith Staggers. AI-native digital creator. Fifty albums, eight hundred songs, three books, a thousand images and films. Made with AI. Working worldwide.",
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
    buttondownUsername: "",
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
    instagram: "",
    youtube: "",
  },
  nav: [
    { label: "Music", href: "#music" },
    { label: "Books", href: "#books" },
    { label: "Visuals", href: "#visuals" },
    { label: "Work with me", href: "#services" },
    { label: "About", href: "#about" },
  ],
};
