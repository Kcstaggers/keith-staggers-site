import assert from "node:assert/strict";
import test from "node:test";

import {
  appendValidatedStripeUtm,
  getValidatedBookUtm,
  getValidatedStripeUtm,
} from "../src/utils/campaignAttribution.ts";

test("accepts only Stripe-supported UTM fields with bounded slug values", () => {
  const attribution = getValidatedStripeUtm(
    "?utm_source=linkedin&utm_medium=organic_social&utm_campaign=frontline_nurse_leader_2026_09&utm_content=manager_post_01&utm_term=nurse_leader&fbclid=visitor-id&email=person%40example.com"
  );

  assert.deepEqual(attribution, {
    utm_source: "linkedin",
    utm_medium: "organic_social",
    utm_campaign: "frontline_nurse_leader_2026_09",
    utm_content: "manager_post_01",
    utm_term: "nurse_leader",
  });
});

test("rejects ambiguous or invalid UTM values", () => {
  const attribution = getValidatedStripeUtm(
    `?utm_source=linkedin.com&utm_medium=organic%20social&utm_campaign=${"a".repeat(151)}&utm_content=first&utm_content=second&utm_term=nurse-leader`
  );

  assert.deepEqual(attribution, { utm_term: "nurse-leader" });
});

test("adds validated UTM values to a Stripe Payment Link only", () => {
  const attribution = getValidatedStripeUtm(
    "?utm_source=facebook&utm_medium=paid_social&utm_campaign=cohort_launch&utm_content=video_01"
  );
  const result = appendValidatedStripeUtm(
    "https://buy.stripe.com/eVq6oH9wt2iV2B50rF6wE00",
    attribution
  );
  const checkout = new URL(result);

  assert.equal(checkout.origin, "https://buy.stripe.com");
  assert.equal(checkout.searchParams.get("utm_source"), "facebook");
  assert.equal(checkout.searchParams.get("utm_medium"), "paid_social");
  assert.equal(checkout.searchParams.get("utm_campaign"), "cohort_launch");
  assert.equal(checkout.searchParams.get("utm_content"), "video_01");
  assert.equal(checkout.searchParams.has("utm_term"), false);

  assert.equal(
    appendValidatedStripeUtm("https://example.com/checkout", attribution),
    "https://example.com/checkout"
  );
});

test("accepts privacy-safe book campaign attribution", () => {
  assert.deepEqual(
    getValidatedBookUtm(
      "?utm_source=facebook&utm_medium=organic_social&utm_campaign=nurse_book_social_2026&utm_content=post_01&email=person%40example.com&fbclid=visitor-id"
    ),
    {
      utm_source: "facebook",
      utm_medium: "organic_social",
      utm_campaign: "nurse_book_social_2026",
      utm_content: "post_01",
    }
  );
});

test("rejects unknown, ambiguous, and personal-looking book attribution", () => {
  assert.deepEqual(
    getValidatedBookUtm(
      "?utm_source=reddit&utm_medium=organic_social&utm_campaign=nurse_book_social_2026"
    ),
    {}
  );
  assert.deepEqual(
    getValidatedBookUtm(
      "?utm_source=facebook&utm_source=instagram&utm_medium=organic_social&utm_campaign=nurse_book_social_2026"
    ),
    {}
  );
  assert.deepEqual(
    getValidatedBookUtm(
      "?utm_source=linkedin&utm_medium=organic_social&utm_campaign=keith%20staggers&utm_content=post%40example.com"
    ),
    {
      utm_source: "linkedin",
      utm_medium: "organic_social",
    }
  );
});
