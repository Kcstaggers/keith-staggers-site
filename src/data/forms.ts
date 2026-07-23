// PUBLIC FORM CONFIGURATION
// Set this to the exact Formspree endpoint created for website inquiries.
// Example shape: https://formspree.io/f/xxxxxxxx
// The forms stay visible but fail closed unless this value matches that shape.
export const FORMSPREE_ENDPOINT = "https://formspree.io/f/xwvgnryp";

export const formEndpoint = /^https:\/\/formspree\.io\/f\/[a-z0-9]+$/i.test(FORMSPREE_ENDPOINT)
  ? FORMSPREE_ENDPOINT
  : "";

export const formConfigured = Boolean(formEndpoint);
