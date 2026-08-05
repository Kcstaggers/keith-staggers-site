export const STRIPE_UTM_FIELDS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

export type StripeUtmField = (typeof STRIPE_UTM_FIELDS)[number];
export type ValidatedStripeUtm = Partial<Record<StripeUtmField, string>>;

export const BOOK_UTM_FIELDS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
] as const;

export type BookUtmField = (typeof BOOK_UTM_FIELDS)[number];
export type ValidatedBookUtm = Partial<Record<BookUtmField, string>>;

const stripeOrigin = "https://buy.stripe.com";
const stripeUtmValue = /^[A-Za-z0-9_-]{1,150}$/;
const bookUtmValue = /^[A-Za-z0-9][A-Za-z0-9_-]{0,79}$/;
const bookSources = new Set([
  "facebook",
  "instagram",
  "linkedin",
  "threads",
  "tiktok",
  "x",
  "youtube",
  "newsletter",
]);
const bookMediums = new Set(["organic_social", "paid_social", "email"]);

export const getValidatedStripeUtm = (search: string | URLSearchParams): ValidatedStripeUtm => {
  const params = typeof search === "string" ? new URLSearchParams(search) : search;
  const attribution: ValidatedStripeUtm = {};

  for (const field of STRIPE_UTM_FIELDS) {
    const values = params.getAll(field);
    if (values.length !== 1 || !stripeUtmValue.test(values[0])) continue;
    attribution[field] = values[0];
  }

  return attribution;
};

export const appendValidatedStripeUtm = (href: string, attribution: ValidatedStripeUtm): string => {
  let checkout: URL;

  try {
    checkout = new URL(href);
  } catch {
    return href;
  }

  if (checkout.origin !== stripeOrigin) return href;

  for (const field of STRIPE_UTM_FIELDS) {
    const value = attribution[field];
    if (value && stripeUtmValue.test(value)) checkout.searchParams.set(field, value);
  }

  return checkout.href;
};

export const getValidatedBookUtm = (
  search: string | URLSearchParams
): ValidatedBookUtm => {
  const params = typeof search === "string" ? new URLSearchParams(search) : search;
  const sourceValues = params.getAll("utm_source");
  const mediumValues = params.getAll("utm_medium");

  if (
    sourceValues.length !== 1 ||
    mediumValues.length !== 1 ||
    !bookSources.has(sourceValues[0]) ||
    !bookMediums.has(mediumValues[0])
  ) {
    return {};
  }

  const attribution: ValidatedBookUtm = {
    utm_source: sourceValues[0],
    utm_medium: mediumValues[0],
  };

  for (const field of ["utm_campaign", "utm_content"] as const) {
    const values = params.getAll(field);
    if (values.length === 1 && bookUtmValue.test(values[0])) {
      attribution[field] = values[0];
    }
  }

  return attribution;
};
