import { createCipheriv, randomBytes } from "node:crypto";
import { chmod, mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import {
  CIPHER_NAME,
  OPAQUE_ID_PATTERN,
  sha256,
  validateHostedHtml,
} from "./private-preview-crypto.mjs";

function usage() {
  throw new Error("Usage: npm run encrypt:private-previews -- <source-manifest.json> <encrypted-bundle.json> <private-key.txt>");
}

const [, , sourceArgument, bundleArgument, keyArgument] = process.argv;
if (!sourceArgument || !bundleArgument || !keyArgument) usage();

const sourcePath = resolve(sourceArgument);
const bundlePath = resolve(bundleArgument);
const keyPath = resolve(keyArgument);
const source = JSON.parse(await readFile(sourcePath, "utf8"));
if (source.schemaVersion !== "1.0" || !Array.isArray(source.records) || source.records.length === 0) {
  throw new Error("The source manifest must contain at least one version 1.0 record.");
}

const seen = new Set();
const records = [];
for (const [index, record] of source.records.entries()) {
  const prospectId = String(record.prospectId ?? "");
  const route = String(record.route ?? "");
  const retentionDate = String(record.retentionDate ?? "");
  if (!OPAQUE_ID_PATTERN.test(prospectId)) throw new Error(`Record ${index} has an invalid prospect ID.`);
  if (seen.has(prospectId)) throw new Error(`Record ${index} repeats a prospect ID.`);
  seen.add(prospectId);
  if (route !== `/private-preview/${prospectId}/`) throw new Error(`Record ${index} has a mismatched route.`);
  if (!/^20[0-9]{2}-[0-9]{2}-[0-9]{2}$/u.test(retentionDate)) throw new Error(`Record ${index} has an invalid retention date.`);

  const htmlPath = resolve(dirname(sourcePath), String(record.htmlPath ?? ""));
  const evidencePath = resolve(dirname(sourcePath), String(record.publicationEvidencePath ?? ""));
  const [htmlBytes, evidenceBytes] = await Promise.all([readFile(htmlPath), readFile(evidencePath)]);
  const html = htmlBytes.toString("utf8");
  const evidence = JSON.parse(evidenceBytes.toString("utf8"));
  validateHostedHtml(html, prospectId);
  if (evidence.prospectId !== prospectId || evidence.route !== route || evidence.retentionDate !== retentionDate) {
    throw new Error(`Record ${index} does not match its publication evidence.`);
  }
  if (evidence.hostedArtifact?.sha256 !== sha256(htmlBytes) || evidence.hostedArtifact?.bytes !== htmlBytes.byteLength) {
    throw new Error(`Record ${index} does not match its hosted artifact hash and byte count.`);
  }
  if (evidence.state !== "READY_FOR_APPROVED_PUBLICATION") {
    throw new Error(`Record ${index} is not ready for approved publication.`);
  }

  records.push({
    prospectId,
    route,
    retentionDate,
    htmlBase64: htmlBytes.toString("base64"),
    htmlSha256: sha256(htmlBytes),
    publicationEvidenceSha256: sha256(evidenceBytes),
  });
}

const plaintext = Buffer.from(JSON.stringify({ schemaVersion: "1.0", records }), "utf8");
const key = randomBytes(32);
const iv = randomBytes(12);
const cipher = createCipheriv(CIPHER_NAME, key, iv);
const ciphertext = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const bundle = {
  schemaVersion: "1.0",
  algorithm: CIPHER_NAME,
  ivHex: iv.toString("hex"),
  authTagHex: cipher.getAuthTag().toString("hex"),
  ciphertextBase64: ciphertext.toString("base64"),
  plaintextSha256: sha256(plaintext),
  recordCount: records.length,
};

await Promise.all([mkdir(dirname(bundlePath), { recursive: true }), mkdir(dirname(keyPath), { recursive: true })]);
await writeFile(bundlePath, `${JSON.stringify(bundle, null, 2)}\n`, { mode: 0o600 });
await writeFile(keyPath, `${key.toString("hex")}\n`, { mode: 0o600 });
await Promise.all([chmod(bundlePath, 0o600), chmod(keyPath, 0o600)]);

console.log(JSON.stringify({ bundlePath, keyPath, recordCount: records.length, plaintextSha256: bundle.plaintextSha256 }, null, 2));
