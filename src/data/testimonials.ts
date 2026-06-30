export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

// REAL testimonials only. The section hides itself while this is empty.
// When a client says something good, get their permission in writing,
// then add: { quote: "…", name: "Full Name", role: "Title or context" }
export const testimonials: Testimonial[] = [];
