import { createHash } from "node:crypto";
import { resolve, sep } from "node:path";

export const OPAQUE_ID_PATTERN = /^PROSPECT-[0-9a-f]{32}$/u;
export const CIPHER_NAME = "aes-256-gcm";

export function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

export function requireHex(value, bytes, label) {
  const pattern = new RegExp(`^[0-9a-f]{${bytes * 2}}$`, "u");
  if (!pattern.test(value)) {
    throw new Error(`${label} must be exactly ${bytes * 2} lowercase hexadecimal characters.`);
  }
  return Buffer.from(value, "hex");
}

export function resolveInside(baseDirectory, candidate, label) {
  const base = resolve(baseDirectory);
  const target = resolve(candidate);
  if (target !== base && !target.startsWith(`${base}${sep}`)) {
    throw new Error(`${label} must remain inside ${base}.`);
  }
  return target;
}

export function validateHostedHtml(html, prospectId) {
  if (!html.includes("noindex,nofollow,noarchive")) {
    throw new Error(`${prospectId} is missing the exact noindex directive.`);
  }
  if (!html.includes("Unofficial concept. Not installed on or endorsed by this business.")) {
    throw new Error(`${prospectId} is missing the exact unofficial-concept disclosure.`);
  }
  const approvedLoader = '<script defer src="/_vercel/insights/script.js"></script>';
  const approvedOpeningTag = '<script defer src="/_vercel/insights/script.js">';
  if (html.split(approvedLoader).length !== 2) {
    throw new Error(`${prospectId} must contain exactly one approved analytics loader.`);
  }
  const scriptTags = html.match(/<script\b[^>]*>/giu) ?? [];
  if (scriptTags.length !== 1 || scriptTags[0] !== approvedOpeningTag) {
    throw new Error(`${prospectId} contains an unapproved script.`);
  }
  if (/<(?:form|input|textarea|select|button)\b/iu.test(html)) {
    throw new Error(`${prospectId} contains an interactive form control.`);
  }
  if (/\son[a-z]+\s*=/iu.test(html)) {
    throw new Error(`${prospectId} contains an inline event handler.`);
  }
  if (/(?:password|api[_ -]?key|secret|recovery code|credential)/iu.test(html)) {
    throw new Error(`${prospectId} contains credential-like language.`);
  }
}
