import { site } from "../data/site";

export function getBookingHref(): string {
  return site.booking.intakePath;
}

export function getCalAttrs(): Record<string, string | undefined> {
  return {};
}
