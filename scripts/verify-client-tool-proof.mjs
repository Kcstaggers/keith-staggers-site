import { createHash } from "node:crypto";
import { readFile, stat } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const siteRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const failures = [];
const checks = [];

function check(condition, label) {
  checks.push({ label, passed: Boolean(condition) });
  if (!condition) failures.push(label);
}

async function exists(path) {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

async function sha256(path) {
  return createHash("sha256").update(await readFile(path)).digest("hex");
}

const sourcePath = resolve(siteRoot, "src/data/clientTools.ts");
const source = await readFile(sourcePath, "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ES2022,
  },
}).outputText;
const moduleUrl = `data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`;
const { clientTools, scoreClientTool, validateClientToolConfig } = await import(moduleUrl);

check(clientTools.length >= 1, "at least one client tool exists");
check(new Set(clientTools.map((tool) => tool.slug)).size === clientTools.length, "tool slugs are unique");
for (const tool of clientTools) validateClientToolConfig(tool);
check(true, "all production tool configurations pass runtime validation");
check(clientTools.every((candidate) => candidate.questions.length >= 1 && candidate.questions.length <= 8), "every tool uses one to eight questions");

const tool = clientTools.find((candidate) => candidate.slug === "first-ai-workflow");
check(Boolean(tool), "First AI Task Finder configuration exists");

const resultCounts = Object.fromEntries(tool.resultOrder.map((key) => [key, 0]));
let total = 0;
let gated = 0;
let standard = 0;
let tied = 0;

function enumerate(questionIndex, answers) {
  if (questionIndex < tool.questions.length) {
    const question = tool.questions[questionIndex];
    for (const option of question.options) {
      enumerate(questionIndex + 1, { ...answers, [question.id]: option.value });
    }
    return;
  }

  total += 1;
  const first = scoreClientTool(tool, answers);
  const second = scoreClientTool(tool, answers);
  check(JSON.stringify(first) === JSON.stringify(second), `combination ${total} is deterministic`);

  const gatesPass = tool.criticalGates.every(
    (gate) => answers[gate.questionId] === gate.passValue,
  );
  if (!gatesPass) {
    gated += 1;
    check(first.gated && first.outcomeKey === "gated", `combination ${total} respects the safety gate`);
    return;
  }

  standard += 1;
  check(!first.gated && tool.resultOrder.includes(first.outcomeKey), `combination ${total} returns a standard result`);
  resultCounts[first.outcomeKey] += 1;
  const maximum = Math.max(...Object.values(first.scores));
  const leaders = tool.resultOrder.filter((key) => first.scores[key] === maximum);
  if (leaders.length > 1) {
    tied += 1;
    check(first.outcomeKey === leaders[0], `combination ${total} uses documented result-order tie priority`);
  }
}

enumerate(0, {});
check(total === 4096, "all 4,096 answer and gate combinations were enumerated");
check(standard === 1024, "1,024 gate-passing combinations return a scored result");
check(gated === 3072, "3,072 failed-gate combinations return only the gated result");
check(tied === 108, "108 standard combinations use the documented tie priority");
check(Object.values(resultCounts).every((count) => count > 0), "every result path is reachable");
check(JSON.stringify(resultCounts) === JSON.stringify({ followup: 283, content: 265, documents: 247, research: 229 }), "result distribution matches the reviewed scoring matrix");

const customKeys = ["clarity", "capacity", "conversion"];
const customFixture = structuredClone(tool);
customFixture.slug = "custom-result-proof";
customFixture.studioLabel = "Northstar Operations Studio";
customFixture.studioHref = "https://northstar-operations.example/";
customFixture.resultOrder = customKeys;
customFixture.outcomes = Object.fromEntries(
  customKeys.map((key, index) => [key, structuredClone(tool.outcomes[tool.resultOrder[index]])]),
);
customFixture.questions = customFixture.questions.map((question) => {
  if (!question.options.some((option) => option.scores)) return question;
  return {
    ...question,
    options: question.options.slice(0, 3).map((option, index) => ({
      ...option,
      value: customKeys[index],
      scores: { [customKeys[index]]: Object.values(option.scores)[0] },
    })),
  };
});
validateClientToolConfig(customFixture);
for (const [index, key] of customKeys.entries()) {
  const answers = Object.fromEntries(customFixture.questions.map((question) => {
    const scoredOption = question.options.find((option) => option.value === key);
    const gate = customFixture.criticalGates.find((candidate) => candidate.questionId === question.id);
    return [question.id, gate?.passValue ?? scoredOption?.value ?? question.options[0].value];
  }));
  check(scoreClientTool(customFixture, answers).outcomeKey === key, `custom result key ${index + 1} is reachable`);
}
check(true, "engine accepts an unrelated three-result client configuration");

const invalidFixture = structuredClone(customFixture);
invalidFixture.questions[0].options[0].scores = { unknown: 1 };
let invalidRejected = false;
try {
  validateClientToolConfig(invalidFixture);
} catch {
  invalidRejected = true;
}
check(invalidRejected, "validator rejects an unknown scoring key");

const oneQuestionFixture = structuredClone(tool);
oneQuestionFixture.slug = "one-question-proof";
oneQuestionFixture.questions = [oneQuestionFixture.questions[0]];
oneQuestionFixture.criticalGates = [];
validateClientToolConfig(oneQuestionFixture);
for (const option of oneQuestionFixture.questions[0].options) {
  check(
    scoreClientTool(oneQuestionFixture, { [oneQuestionFixture.questions[0].id]: option.value }).outcomeKey === option.value,
    `one-question recipe reaches ${option.value}`,
  );
}
check(true, "engine accepts a one-question guide when the routing blueprint needs only one decision");

const distPilotPath = resolve(siteRoot, "dist/client-tool-pilot/index.html");
const distToolPath = resolve(siteRoot, "dist/tools/first-ai-workflow/index.html");
const distPrivacyPath = resolve(siteRoot, "dist/privacy/index.html");
const shareImagePath = resolve(siteRoot, "public/media/client-tool-pilot/first-ai-workflow-share.png");
check(await exists(distPilotPath), "built pilot page exists");
check(await exists(distToolPath), "built proof tool exists");
check(await exists(distPrivacyPath), "built privacy page exists");
check(await exists(shareImagePath), "client-tool share image exists");

if (await exists(distPilotPath)) {
  const pilotHtml = await readFile(distPilotPath, "utf8");
  const formTag = pilotHtml.match(/<form[^>]*data-client-tool-pilot-form[^>]*>/)?.[0] ?? "";
  check(pilotHtml.includes('name="robots" content="noindex,nofollow"'), "pilot page is noindex and nofollow");
  check(formTag.includes('data-form-configured="false"'), "pilot form is fail-closed");
  check(!/\saction=/.test(formTag), "disabled pilot form has no submission endpoint");
  check(!pilotHtml.includes("formspree.io/f/"), "disabled pilot page contains no Formspree endpoint");
  check(/<button\b[^>]*\bclass="pilot-submit"[^>]*\bdisabled\b/.test(pilotHtml), "disabled pilot submit control is rendered disabled");
  check(pilotHtml.includes("Applications are still closed"), "closed intake status is visible");
  check(pilotHtml.includes("Applications are not open yet"), "closed intake heading appears before the application fields");
  check(pilotHtml.indexOf("Applications are not open yet") < pilotHtml.indexOf('id="pilot-url"'), "closed intake heading precedes the first application field");
  check(pilotHtml.includes("Review the short application"), "closed intake action describes the available next step");
  for (const id of ["pilot-url", "pilot-question", "pilot-next", "pilot-email", "pilot-authority"]) {
    check(new RegExp(`<(?:input|textarea)\\b[^>]*\\bid="${id}"[^>]*\\bdisabled\\b`).test(pilotHtml), `closed intake disables ${id}`);
  }
  check(pilotHtml.includes('href="/tools/first-ai-workflow/"'), "finished example is visible before submission");
  check(pilotHtml.includes("Three complimentary founding builds"), "three-build complimentary limit is visible");
  check(pilotHtml.includes("There is no charge"), "no-charge boundary is visible");
  check(pilotHtml.includes("You owe no positive review or public testimonial"), "testimonial is explicitly optional");
  check(pilotHtml.includes("Which service is right for me?"), "ordinary recurring-question example is visible");
  check(pilotHtml.includes('href="/privacy/"'), "pilot form links to the privacy notice");
  check(pilotHtml.includes("When applications open, Formspree will send the four fields above and your required authority and safety confirmation"), "closed pilot privacy copy describes future Formspree use and the full submitted brief");
  check(pilotHtml.includes("Nothing is submitted while this page says applications are closed"), "closed pilot privacy copy matches the fail-closed form state");
  check(pilotHtml.includes("never more than eight"), "fixed question limit is visible");
  check(pilotHtml.includes("straightforward, nonregulated client questions"), "nonregulated pilot boundary is visible");
  check(!/prospect question|qualified visitor|Project Fit review/i.test(pilotHtml), "pilot opening and actions avoid internal sales jargon");
}

if (await exists(distToolPath)) {
  const toolHtml = await readFile(distToolPath, "utf8");
  check(toolHtml.includes('name="robots" content="noindex,nofollow"'), "proof tool is noindex and nofollow");
  check(toolHtml.includes("/media/client-tool-pilot/first-ai-workflow-share.png"), "proof tool uses its dedicated share image");
  check(toolHtml.includes("We measure starts, completions, and the final result category only"), "bounded analytics disclosure is visible");
  check(toolHtml.includes("First AI Task Finder"), "proof tool uses the plain task-first name");
  check(toolHtml.includes("client follow-up, content, recurring documents, and research"), "proof tool defines its four ordinary result categories");
  check(toolHtml.includes("Tell Keith about this task"), "proof tool call to action states the next action");
  check(!toolHtml.includes("Start a Project Fit review"), "proof tool avoids the internal Project Fit label");
}

if (await exists(distPrivacyPath)) {
  const privacyHtml = await readFile(distPrivacyPath, "utf8");
  check(privacyHtml.includes("complimentary client-tool application"), "privacy notice names the client-tool application");
  check(privacyHtml.includes("When the complimentary client-tool application opens, it will use Formspree too"), "privacy notice does not imply the closed application is active");
  check(privacyHtml.includes("final result category"), "privacy notice names bounded client-tool analytics");
  check(privacyHtml.includes("They use no browser storage"), "privacy notice names the client-tool storage boundary");
  check(privacyHtml.includes("Answers disappear when you reset, reload, or close the page"), "privacy notice explains answer deletion behavior");
}

if (await exists(shareImagePath)) {
  const image = await readFile(shareImagePath);
  const isPng = image.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
  check(isPng, "client-tool share image is a PNG");
  if (isPng && image.length >= 24) {
    check(image.readUInt32BE(16) === 1200, "client-tool share image is 1200 pixels wide");
    check(image.readUInt32BE(20) === 630, "client-tool share image is 630 pixels tall");
  }
  check(image.length <= 500_000, "client-tool share image is 500 KB or smaller");
}

const packageJson = JSON.parse(await readFile(resolve(siteRoot, "package.json"), "utf8"));
check(packageJson.scripts?.["verify:client-tool"] === "node scripts/verify-client-tool-proof.mjs", "package exposes the client-tool verifier");
check(packageJson.scripts?.build?.includes("npm run verify:client-tool"), "production build runs the client-tool verifier");

const routeSource = await readFile(resolve(siteRoot, "src/pages/tools/[slug].astro"), "utf8");
check(!/(localStorage|sessionStorage|document\.cookie)/.test(routeSource), "tool source uses no browser storage or cookies");
for (const call of routeSource.matchAll(/track\([\s\S]*?\);/g)) {
  check(!/(answers?|email|question|label|text)\s*:/.test(call[0]), "analytics call contains no answer or identity field");
}

const packageFlag = process.argv.indexOf("--package");
if (packageFlag !== -1) {
  const packageDir = resolve(process.argv[packageFlag + 1]);
  const required = [
    "source-notes.md",
    "tool-config.ts",
    "scoring-matrix.md",
    "qa-report.md",
    "launch-kit.md",
    "share-image.png",
    "handoff.md",
    "synthetic-intake.json",
    "qualification.md",
    "simulation-log.md",
    "correction-request.md",
    "drafts/receipt.md",
    "drafts/fit-confirmation.md",
    "drafts/review-delivery.md",
    "drafts/correction-reply.md",
    "drafts/feedback-request.md",
    "evidence/question-desktop.png",
    "evidence/question-mobile.png",
    "evidence/result-desktop.png",
    "evidence/result-mobile.png",
    "evidence/print-view.pdf",
    "manifest.json",
    "SHA256SUMS",
  ];
  for (const relative of required) {
    check(await exists(resolve(packageDir, relative)), `package contains ${relative}`);
  }

  if (await exists(resolve(packageDir, "manifest.json"))) {
    const manifest = JSON.parse(await readFile(resolve(packageDir, "manifest.json"), "utf8"));
    for (const entry of manifest.files) {
      const path = resolve(packageDir, entry.path);
      check(await exists(path), `manifest path exists: ${entry.path}`);
      if (await exists(path)) {
        check((await sha256(path)) === entry.sha256, `manifest hash matches: ${entry.path}`);
        check((await stat(path)).size === entry.bytes, `manifest byte count matches: ${entry.path}`);
      }
    }
    const sums = (await readFile(resolve(packageDir, "SHA256SUMS"), "utf8")).trim().split("\n");
    check(sums.length === manifest.files.length, "SHA256SUMS and manifest list the same number of files");
    check(manifest.files.every((entry) => sums.includes(`${entry.sha256}  ${entry.path}`)), "SHA256SUMS matches the manifest");
  }
}

if (failures.length) {
  console.error(JSON.stringify({ status: "FAIL", failures, checks: checks.length }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({
  status: "PASS",
  checks: checks.length,
  combinations: { total, standard, gated, tied },
  resultCounts,
}, null, 2));
