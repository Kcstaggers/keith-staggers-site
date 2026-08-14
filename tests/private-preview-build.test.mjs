import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import test from "node:test";

const execFileAsync = promisify(execFile);
const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const encryptScript = join(repositoryRoot, "scripts", "encrypt-private-previews.mjs");
const prepareScript = join(repositoryRoot, "scripts", "prepare-private-previews.mjs");
const prospectId = "PROSPECT-0123456789abcdef0123456789abcdef";
const route = `/private-preview/${prospectId}/`;
const html = `<!doctype html><html><head><meta name="robots" content="noindex,nofollow,noarchive"></head><body><p>Unofficial concept. Not installed on or endorsed by this business.</p><a href="https://example.com/contact">Contact</a><a href="https://www.keithstaggers.com/lead-path-kit/?p=${prospectId}">Check compatibility</a><script defer src="/_vercel/insights/script.js"></script></body></html>`;
const digest = (value) => createHash("sha256").update(value).digest("hex");

test("encrypted bundle prepares only the exact opaque route", async () => {
  const directory = await mkdtemp(join(tmpdir(), "private-preview-build-"));
  const artifacts = join(directory, "artifacts");
  const outputRoot = await mkdtemp(join(repositoryRoot, "public", "private-preview-test-"));
  await mkdir(artifacts, { recursive: true });
  const htmlPath = join(artifacts, "index.html");
  const evidencePath = join(artifacts, "publication-evidence.json");
  const manifestPath = join(directory, "sources.json");
  const bundlePath = join(directory, "private-previews.enc.json");
  const keyPath = join(directory, "private-key.txt");
  await writeFile(htmlPath, html);
  await writeFile(evidencePath, JSON.stringify({
    prospectId,
    route,
    retentionDate: "2099-12-31",
    hostedArtifact: { bytes: Buffer.byteLength(html), sha256: digest(html) },
    state: "READY_FOR_APPROVED_PUBLICATION",
  }));
  await writeFile(manifestPath, JSON.stringify({
    schemaVersion: "1.0",
    records: [{ prospectId, route, retentionDate: "2099-12-31", htmlPath, publicationEvidencePath: evidencePath }],
  }));

  try {
    await execFileAsync(process.execPath, [encryptScript, manifestPath, bundlePath, keyPath]);
    const key = (await readFile(keyPath, "utf8")).trim();
    const encryptedText = await readFile(bundlePath, "utf8");
    assert.equal(encryptedText.includes(prospectId), false);
    assert.equal(encryptedText.includes("Unofficial concept"), false);

    await execFileAsync(process.execPath, [prepareScript], {
      env: {
        ...process.env,
        PRIVATE_PREVIEW_BUNDLE_PATH: bundlePath,
        PRIVATE_PREVIEW_KEY_HEX: key,
        PRIVATE_PREVIEW_OUTPUT_DIR: outputRoot,
      },
    });
    assert.equal(await readFile(join(outputRoot, prospectId, "index.html"), "utf8"), html);
    await assert.rejects(readFile(join(outputRoot, "PROSPECT-ffffffffffffffffffffffffffffffff", "index.html")));
  } finally {
    await rm(outputRoot, { recursive: true, force: true });
  }
});

test("wrong private-preview key fails closed", async () => {
  const directory = await mkdtemp(join(tmpdir(), "private-preview-key-"));
  const bundlePath = join(directory, "bundle.json");
  const outputRoot = await mkdtemp(join(repositoryRoot, "public", "private-preview-test-"));
  await writeFile(bundlePath, JSON.stringify({
    schemaVersion: "1.0",
    algorithm: "aes-256-gcm",
    ivHex: "00".repeat(12),
    authTagHex: "00".repeat(16),
    ciphertextBase64: "AA==",
    plaintextSha256: "00".repeat(32),
    recordCount: 1,
  }));
  try {
    await assert.rejects(execFileAsync(process.execPath, [prepareScript], {
      env: {
        ...process.env,
        PRIVATE_PREVIEW_BUNDLE_PATH: bundlePath,
        PRIVATE_PREVIEW_KEY_HEX: "11".repeat(32),
        PRIVATE_PREVIEW_OUTPUT_DIR: outputRoot,
      },
    }));
  } finally {
    await rm(outputRoot, { recursive: true, force: true });
  }
});
