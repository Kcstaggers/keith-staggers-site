// PUBLIC FORM CONFIGURATION
// Set this to the exact Formspree endpoint created for website inquiries.
// Example shape: https://formspree.io/f/xxxxxxxx
// The forms stay visible but fail closed unless this value matches that shape.
export const FORMSPREE_ENDPOINT = "https://formspree.io/f/xwvgnryp";

export const formEndpoint = /^https:\/\/formspree\.io\/f\/[a-z0-9]+$/i.test(FORMSPREE_ENDPOINT)
  ? FORMSPREE_ENDPOINT
  : "";

export const formConfigured = Boolean(formEndpoint);

// Proof-First stays fail-closed even though the general website inquiry form is live.
// Change this only with the matching intake-control activation and end-to-end proof.
export const LEAD_PATH_FORM_ENABLED = false;

export const leadPathFormEndpoint = LEAD_PATH_FORM_ENABLED ? formEndpoint : "";

export const leadPathFormConfigured = Boolean(leadPathFormEndpoint);
