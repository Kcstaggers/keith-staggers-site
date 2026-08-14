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
const pilotConfigPath = resolve(siteRoot, "src/data/clientToolPilot.ts");
const pilotConfigSource = await readFile(pilotConfigPath, "utf8");
const pilotPagePath = resolve(siteRoot, "src/pages/client-tool-pilot.astro");
const pilotPageSource = await readFile(pilotPagePath, "utf8");
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
check(
  /CLIENT_TOOL_PILOT_FORM_ENABLED\s*=\s*true/.test(pilotConfigSource),
  "Gate 2B local candidate enables the founding intake flag",
);
check(pilotConfigSource.includes('CLIENT_TOOL_PILOT_SUBJECT = "[KS Client Tool Pilot] {{ email }}"'), "pilot subject marker is frozen in configuration");
check(pilotConfigSource.includes('CLIENT_TOOL_PILOT_FORM_TYPE = "Interactive Client Tool Pilot"'), "pilot form type is frozen in configuration");
check(pilotConfigSource.includes('CLIENT_TOOL_PILOT_INQUIRY_MARKER = "ks-client-tool-pilot-v1"'), "pilot body marker is frozen in configuration");
check(pilotConfigSource.includes('CLIENT_TOOL_PILOT_SOURCE_PAGE = "/client-tool-pilot/"'), "pilot source page is frozen in configuration");
check(pilotConfigSource.includes('CLIENT_TOOL_PILOT_OFFER_VERSION = "founding-wave1-v1"'), "pilot offer version is frozen in configuration");
check(pilotConfigSource.includes('CLIENT_TOOL_PILOT_PRODUCTION_HOST = "www.keithstaggers.com"'), "pilot production host is frozen in configuration");

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
  check(pilotHtml.includes('name="robots" content="noindex,nofollow"'), "pilot page is noindex and nofollow");
  const formMatches = pilotHtml.match(/<form\b[^>]*data-client-tool-pilot-form[^>]*>/gi) ?? [];
  check(formMatches.length === 1, "enabled pilot renders exactly one application form");
  check(!pilotHtml.includes("data-pilot-closed"), "enabled pilot renders no closed-intake notice");
  check(/<form\b[^>]*data-client-tool-pilot-form[^>]*data-form-configured="true"[^>]*data-form-endpoint="https:\/\/formspree\.io\/f\/xwvgnryp"[^>]*data-production-host="www\.keithstaggers\.com"[^>]*accept-charset="UTF-8"/i.test(pilotHtml), "enabled pilot binds the exact endpoint and canonical production host as inert data");
  check(!/<form\b[^>]*(?:\saction=|\smethod=)/i.test(pilotHtml), "enabled pilot has no native form action or method and fails closed without JavaScript");
  check(!/Client Tool Pilot Applied/i.test(pilotHtml), "enabled pilot adds no form-specific analytics event");

  const requiredMarkers = ["data-pilot-offer", "data-pilot-example", "data-pilot-package"];
  for (const marker of requiredMarkers) {
    check((pilotHtml.match(new RegExp(marker, "g")) ?? []).length === 1, `pilot renders exactly one ${marker} block`);
  }
  const markerPositions = [...requiredMarkers.map((marker) => pilotHtml.indexOf(marker)), pilotHtml.search(/<form\b[^>]*data-client-tool-pilot-form/i)];
  check(markerPositions.every((position) => position >= 0), "pilot clarity blocks all render");
  check(markerPositions.every((position, index) => index === 0 || position > markerPositions[index - 1]), "pilot blocks render in offer, example, package, intake order");

  check((pilotHtml.match(/<h1\b/g) ?? []).length === 1, "pilot page has one primary heading");
  const ids = [...pilotHtml.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
  check(new Set(ids).size === ids.length, "pilot page IDs are unique");
  check(pilotHtml.includes('href="#pilot-form"'), "open hero has a direct application action");
  check(pilotHtml.includes("Three complimentary founding builds"), "three-build complimentary limit is visible");
  check(pilotHtml.includes("There is no charge"), "complimentary price boundary is visible");
  check(pilotHtml.includes("You owe no positive review or public testimonial"), "testimonial is explicitly optional");
  check(pilotHtml.includes("Applications are open. Keith reviews each brief before accepting a build."), "application status explains the fit review");
  check(pilotHtml.includes("Public links only. Do not send medical, legal, financial, employment, confidential, or other sensitive material."), "intake safety boundary is adjacent to the form");

  const fieldNames = [...pilotHtml.matchAll(/<(?:input|textarea)\b[^>]*\bname="([^"]+)"/g)].map((match) => match[1]);
  const expectedFieldNames = [
    "subject",
    "form_type",
    "inquiry_marker",
    "source_page",
    "offer_version",
    "submission_id",
    "_gotcha",
    "public_url",
    "recurring_question",
    "next_action_url",
    "email",
    "authority_safety_contact_claims_confirmed",
  ];
  check(JSON.stringify(fieldNames) === JSON.stringify(expectedFieldNames), "pilot payload contains only the frozen field allowlist in exact order");
  check(/name="subject" value="\[KS Client Tool Pilot\] \{\{ email \}\}"/.test(pilotHtml), "pilot subject marker includes the submitter email merge field");
  check(/name="form_type" value="Interactive Client Tool Pilot"/.test(pilotHtml), "pilot form type is exact");
  check(/name="inquiry_marker" value="ks-client-tool-pilot-v1"/.test(pilotHtml), "pilot body marker is exact");
  check(/name="source_page" value="\/client-tool-pilot\/"/.test(pilotHtml), "pilot source page marker is exact");
  check(/name="offer_version" value="founding-wave1-v1"/.test(pilotHtml), "pilot offer version is exact");
  check(/name="submission_id" value=""[^>]*data-pilot-submission-id[^>]*disabled/.test(pilotHtml), "duplicate-prevention ID starts empty and disabled");
  check(/name="_gotcha" type="text" tabindex="-1" autocomplete="off"[^>]*hidden[^>]*disabled/.test(pilotHtml), "honeypot is empty-by-default, disabled, and outside keyboard order");
  check(/name="public_url" type="url"[^>]*autocomplete="url"[^>]*maxlength="500"[^>]*pattern="https:\/\/.\+"[^>]*required[^>]*disabled/.test(pilotHtml), "public source field requires a bounded HTTPS URL and starts fail-closed");
  check(/name="recurring_question"[^>]*minlength="12"[^>]*maxlength="500"[^>]*required[^>]*disabled/.test(pilotHtml), "recurring question has exact length and fail-closed constraints");
  check(/name="next_action_url" type="url"[^>]*maxlength="500"[^>]*pattern="https:\/\/.\+"[^>]*required[^>]*disabled/.test(pilotHtml), "next action field requires a bounded HTTPS URL and starts fail-closed");
  check(/name="email" type="email"[^>]*autocomplete="email"[^>]*maxlength="254"[^>]*required[^>]*disabled/.test(pilotHtml), "email field has exact type, autocomplete, length, and fail-closed constraints");
  check(/name="authority_safety_contact_claims_confirmed" type="checkbox" value="Confirmed" required[^>]*disabled/.test(pilotHtml), "combined authority, safety, contact, and claim confirmation is explicit, required, and fail-closed");
  check(/<button\b[^>]*class="pilot-submit"[^>]*type="submit"[^>]*disabled/.test(pilotHtml), "submit control starts disabled until the guarded script is active");
  check(!/contact_consent|submitted_at|type="file"|type="password"|name="(?:name|phone)"/i.test(pilotHtml), "pilot sends no implied consent, blank timestamp, upload, password, name, or phone field");
  check(/data-pilot-success tabindex="-1" hidden/.test(pilotHtml), "branded success state starts hidden and can receive programmatic focus");

  check(pilotHtml.includes(`href="/tools/${tool.slug}/"`), "working example links to the public proof tool");
  check(pilotHtml.includes(`src="${tool.ogImage}"`), "working example uses the configured share image");
  check(pilotHtml.includes(`alt="${tool.ogImageAlt}"`), "working example uses the configured image description");
  check(/width="1200" height="630"[^>]*loading="eager"[^>]*decoding="async"/.test(pilotHtml), "working example declares exact image dimensions and loading behavior");
  check(pilotHtml.includes(tool.questions[0].title), "working example shows a real first question");
  check(pilotHtml.includes(tool.questions[0].options[0].label), "working example shows a real answer option");
  check(pilotHtml.includes(tool.outcomes.followup.title), "working example shows a real result title");
  check(pilotHtml.includes(tool.outcomes.followup.summary), "working example shows the matching real result summary");
  check(pilotHtml.includes("Share image") && pilotHtml.includes("3 posts") && pilotHtml.includes("Email draft") && pilotHtml.includes("Source + QA"), "working example previews the launch package");
  check(pilotHtml.includes("Interactive guide") && pilotHtml.includes("Launch kit") && pilotHtml.includes("Private handoff"), "what-you-receive band names all three deliverable groups");
  check(pilotHtml.includes("Straightforward, nonregulated service questions only"), "nonregulated pilot boundary is visible");
  check(!/Kevin|Lazar|Wellness\s*Rx|wellnessrx|klazar1987/i.test(pilotHtml), "pilot proof contains no prohibited private-client material");
  check(!/firstaitaskfinder\.com|Full source and answers|What task do you want help with\?/i.test(pilotHtml), "pilot proof contains no fabricated concept copy");
  check(!/prospect question|qualified visitor|Project Fit review/i.test(pilotHtml), "pilot opening and actions avoid internal sales jargon");
}

check(/addEventListener\("submit", async \(event\)/.test(pilotPageSource), "pilot intercepts submit inside the branded page");
check(/event\.preventDefault\(\)/.test(pilotPageSource), "pilot prevents native Formspree navigation");
check(/pilotForm\.reportValidity\(\)/.test(pilotPageSource), "pilot runs native validity before submission");
check(/pilotForm\.getAttribute\("aria-busy"\) === "true"/.test(pilotPageSource), "pilot blocks duplicate submissions while a request is active");
check(/new URL\(input\.value\)/.test(pilotPageSource) && /parsed\.protocol !== "https:"/.test(pilotPageSource), "pilot validates public HTTPS destinations at runtime");
check(/pilotQuestion\.value\.trim\(\)\.length >= 12/.test(pilotPageSource), "pilot validates twelve non-space question characters");
check(/if \(pilotHoneypot\?\.value\) return/.test(pilotPageSource), "pilot does not send a locally detected honeypot submission");
check(/window\.location\.hostname !== productionHost/.test(pilotPageSource) && /This preview cannot send applications/.test(pilotPageSource), "pilot refuses transport outside the exact production host");
check(/endpointUrl\.origin !== "https:\/\/formspree\.io"/.test(pilotPageSource) && /endpointUrl\.pathname !== "\/f\/xwvgnryp"/.test(pilotPageSource), "pilot refuses any endpoint other than the frozen Formspree route");
check(/crypto\.randomUUID\(\)/.test(pilotPageSource) && /`ctf-\$\{crypto\.randomUUID\(\)\}`/.test(pilotPageSource), "pilot creates a random duplicate-prevention ID");
check(/signature !== pendingSignature/.test(pilotPageSource) && /values\.delete\("submission_id"\)/.test(pilotPageSource), "pilot reuses an ID only for the same logical retry payload");
check(/fetch\(endpoint, \{[\s\S]*method: "POST"[\s\S]*body: new FormData\(pilotForm\)[\s\S]*Accept: "application\/json"/.test(pilotPageSource), "pilot requests the exact JSON Formspree flow");
check(/pilotForm\.hidden = true/.test(pilotPageSource) && /pilotSuccess\.focus\(\)/.test(pilotPageSource), "successful submission hides the form and focuses the branded confirmation");
check(/Your answers are still on this page/.test(pilotPageSource) && /pilotSubmit\.disabled = false/.test(pilotPageSource), "failed submission preserves answers and enables retry");
check(/failure\.definitive = response\.status >= 400 && response\.status < 500/.test(pilotPageSource), "pilot distinguishes definitive client errors from ambiguous delivery failures");
check(/pilotEditableControls\.forEach\(\(control\) => \{ control\.disabled = false; \}\)/.test(pilotPageSource), "pilot enables controls only after the guarded submit listener is installed");
check(!/localStorage|sessionStorage|document\.cookie|indexedDB/i.test(pilotPageSource), "pilot transport stores no application data in browser persistence");
check(!/\btrack\s*\(/.test(pilotPageSource), "pilot application sends no analytics event");

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
  check(privacyHtml.includes("The complimentary client-tool application uses Formspree too"), "privacy notice describes the enabled application in current tense");
  check(privacyHtml.includes("required authority, safety, contact, and claim-approval confirmation"), "privacy notice names the combined confirmation payload");
  check(privacyHtml.includes("fixed routing labels that identify the application version and source page"), "privacy notice discloses routing metadata");
  check(privacyHtml.includes("random duplicate-prevention ID generated for the submission attempt"), "privacy notice discloses the duplicate-prevention ID");
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
