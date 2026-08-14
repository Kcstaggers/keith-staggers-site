import { createDecipheriv } from "node:crypto";
import { existsSync } from "node:fs";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  CIPHER_NAME,
  OPAQUE_ID_PATTERN,
  requireHex,
  resolveInside,
  sha256,
  validateHostedHtml,
} from "./private-preview-crypto.mjs";

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const bundlePath = resolve(process.env.PRIVATE_PREVIEW_BUNDLE_PATH || join(repositoryRoot, "private-previews.enc.json"));
const outputRoot = resolveInside(
  join(repositoryRoot, "public"),
  process.env.PRIVATE_PREVIEW_OUTPUT_DIR || join(repositoryRoot, "public", "private-preview"),
  "Private preview output",
);

await rm(outputRoot, { recursive: true, force: true });
if (!existsSync(bundlePath)) {
  console.log(JSON.stringify({ state: "NO_PRIVATE_PREVIEW_BUNDLE", outputRoot, recordCount: 0 }));
  process.exit(0);
}

const key = requireHex(String(process.env.PRIVATE_PREVIEW_KEY_HEX ?? ""), 32, "PRIVATE_PREVIEW_KEY_HEX");
const bundle = JSON.parse(await readFile(bundlePath, "utf8"));
if (bundle.schemaVersion !== "1.0" || bundle.algorithm !== CIPHER_NAME) {
  throw new Error("The encrypted private-preview bundle has an unsupported schema or algorithm.");
}
const iv = requireHex(String(bundle.ivHex ?? ""), 12, "Bundle IV");
const authTag = requireHex(String(bundle.authTagHex ?? ""), 16, "Bundle authentication tag");
const ciphertext = Buffer.from(String(bundle.ciphertextBase64 ?? ""), "base64");
const decipher = createDecipheriv(CIPHER_NAME, key, iv);
decipher.setAuthTag(authTag);
const plaintext = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
if (sha256(plaintext) !== bundle.plaintextSha256) throw new Error("The decrypted private-preview bundle hash does not match.");

const decoded = JSON.parse(plaintext.toString("utf8"));
if (decoded.schemaVersion !== "1.0" || !Array.isArray(decoded.records) || decoded.records.length !== bundle.recordCount) {
  throw new Error("The decrypted private-preview record count does not match.");
}

const currentDate = new Date().toISOString().slice(0, 10);
const seen = new Set();
for (const [index, record] of decoded.records.entries()) {
  const prospectId = String(record.prospectId ?? "");
  const route = String(record.route ?? "");
  if (!OPAQUE_ID_PATTERN.test(prospectId)) throw new Error(`Record ${index} has an invalid prospect ID.`);
  if (seen.has(prospectId)) throw new Error(`Record ${index} repeats a prospect ID.`);
  seen.add(prospectId);
  if (route !== `/private-preview/${prospectId}/`) throw new Error(`Record ${index} has a mismatched route.`);
  if (String(record.retentionDate ?? "") < currentDate) throw new Error(`Record ${index} is past its retention date.`);

  const htmlBytes = Buffer.from(String(record.htmlBase64 ?? ""), "base64");
  if (sha256(htmlBytes) !== record.htmlSha256) throw new Error(`Record ${index} has a mismatched HTML hash.`);
  const html = htmlBytes.toString("utf8");
  validateHostedHtml(html, prospectId);
  const targetDirectory = resolveInside(outputRoot, join(outputRoot, prospectId), "Private preview record output");
  await mkdir(targetDirectory, { recursive: true });
  await writeFile(join(targetDirectory, "index.html"), htmlBytes, { flag: "wx" });
}

console.log(JSON.stringify({ state: "PRIVATE_PREVIEWS_PREPARED", outputRoot, recordCount: seen.size }));
