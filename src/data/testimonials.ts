export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  placeholder?: boolean;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Keith built the entire visual identity for my podcast in a week. Cover art, episode thumbnails, social cards. Work I'd budgeted three months and an agency for.",
    name: "Kevin Lazar",
    role: "Podcast host",
  },
  {
    quote:
      "I hired Keith to coach my team through their first AI workflow. Six weeks later we're shipping content three times as fast. He gets it because he's actually done it.",
    name: "Kristen Smith",
    role: "Director of comms",
  },
  {
    quote:
      "Keith's keynote landed harder than any AI talk we've had. The cop-to-nurse-to-creator story makes the abstract feel real for an audience that has heard every pitch.",
    name: "Alex Rivera",
    role: "Conference programmer",
  },
];
