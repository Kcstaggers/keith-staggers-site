export const STRIPE_UTM_FIELDS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

export type StripeUtmField = (typeof STRIPE_UTM_FIELDS)[number];
export type ValidatedStripeUtm = Partial<Record<StripeUtmField, string>>;

const stripeOrigin = "https://buy.stripe.com";
const stripeUtmValue = /^[A-Za-z0-9_-]{1,150}$/;

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
