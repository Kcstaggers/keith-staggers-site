import { site } from "../data/site";

export function getBookingHref(): string {
  return site.booking.enabled
    ? `https://cal.com/${site.booking.username}/${site.booking.eventSlug}`
    : `mailto:${site.email}?subject=Work%20with%20me`;
}

export function getCalAttrs(): Record<string, string | undefined> {
  if (!site.booking.enabled) return {};
  return {
    "data-cal-link": `${site.booking.username}/${site.booking.eventSlug}`,
    "data-cal-namespace": "",
    "data-cal-config": '{"layout":"month_view","theme":"light"}',
  };
}
