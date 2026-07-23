export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

// Real testimonials only. Keith confirmed that Kevin approved this exact
// quote for public use by text on July 23, 2026.
export const testimonials: Testimonial[] = [
  {
    quote:
      "Keith built the entire visual identity for my podcast in a week. Cover art, episode thumbnails, social cards. Work I'd budgeted three months and an agency for.",
    name: "Kevin Lazar",
    role: "Podcast host",
  },
];
