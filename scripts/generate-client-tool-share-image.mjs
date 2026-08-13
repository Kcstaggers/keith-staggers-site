import { readFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const siteRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outputPath = resolve(
  process.argv[2] ?? resolve(siteRoot, "public/media/client-tool-pilot/first-ai-workflow-share.png"),
);
const fontPath = resolve(
  siteRoot,
  "node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2",
);
const fontBase64 = (await readFile(fontPath)).toString("base64");

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <style>
      @font-face {
        font-family: "Inter Local";
        src: url("data:font/woff2;base64,${fontBase64}") format("woff2");
        font-weight: 100 900;
      }
      .inter { font-family: "Inter Local", Arial, sans-serif; }
    </style>
    <radialGradient id="blue-depth" cx="84%" cy="10%" r="70%">
      <stop offset="0" stop-color="#2851ff" stop-opacity="0.14" />
      <stop offset="0.48" stop-color="#2851ff" stop-opacity="0.025" />
      <stop offset="1" stop-color="#050608" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="coral-depth" cx="91%" cy="92%" r="45%">
      <stop offset="0" stop-color="#ff604d" stop-opacity="0.09" />
      <stop offset="1" stop-color="#050608" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="headline-blue" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#5f80ff" />
      <stop offset="1" stop-color="#2851ff" />
    </linearGradient>
    <filter id="blue-glow" x="-80%" y="-80%" width="260%" height="260%">
      <feGaussianBlur stdDeviation="9" />
    </filter>
    <filter id="coral-glow" x="-80%" y="-80%" width="260%" height="260%">
      <feGaussianBlur stdDeviation="8" />
    </filter>
  </defs>

  <rect width="1200" height="630" fill="#050608" />
  <rect width="1200" height="630" fill="url(#blue-depth)" />
  <rect width="1200" height="630" fill="url(#coral-depth)" />

  <path d="M90 72H245" stroke="#2851ff" stroke-width="4" />
  <text class="inter" x="90" y="54" fill="#7891ff" font-size="15" font-weight="720" letter-spacing="3.2">A TWO-MINUTE DECISION TOOL</text>
  <text class="inter" x="1110" y="54" fill="#8f94a1" font-size="13" font-weight="580" letter-spacing="1.6" text-anchor="end">KEITH STAGGERS STUDIO</text>

  <text class="inter" x="86" y="170" fill="#f4f6fb" font-size="106" font-weight="780" letter-spacing="-5">FIRST</text>
  <text class="inter" x="390" y="170" fill="url(#headline-blue)" font-size="106" font-weight="800" letter-spacing="-5">AI</text>
  <text class="inter" x="86" y="275" fill="#f4f6fb" font-size="106" font-weight="780" letter-spacing="-5">TASK FINDER</text>

  <text class="inter" x="90" y="338" fill="#d4d7df" font-size="28" font-weight="560" letter-spacing="-0.5">Choose one repeatable job AI can help draft, organize, or check.</text>

  <path d="M151 450H1049" stroke="#303542" stroke-width="2" />
  <path d="M204 450H548" stroke="#2851ff" stroke-width="3" />
  <path d="M652 450H996" stroke="#2851ff" stroke-width="3" stroke-dasharray="5 11" />

  <circle cx="152" cy="450" r="56" fill="#2851ff" opacity="0.16" filter="url(#blue-glow)" />
  <circle cx="152" cy="450" r="43" fill="#080b12" stroke="#2851ff" stroke-width="4" />
  <circle cx="152" cy="450" r="33" fill="none" stroke="#4d566a" stroke-width="1" />
  <text class="inter" x="152" y="461" fill="#f4f6fb" font-size="31" font-weight="760" text-anchor="middle">1</text>

  <circle cx="600" cy="450" r="56" fill="#2851ff" opacity="0.16" filter="url(#blue-glow)" />
  <circle cx="600" cy="450" r="43" fill="#080b12" stroke="#2851ff" stroke-width="4" />
  <circle cx="600" cy="450" r="33" fill="none" stroke="#4d566a" stroke-width="1" />
  <text class="inter" x="600" y="461" fill="#f4f6fb" font-size="31" font-weight="760" text-anchor="middle">2</text>

  <circle cx="1048" cy="450" r="56" fill="#ff604d" opacity="0.18" filter="url(#coral-glow)" />
  <circle cx="1048" cy="450" r="43" fill="#0c0909" stroke="#ff604d" stroke-width="4" />
  <circle cx="1048" cy="450" r="33" fill="none" stroke="#69453f" stroke-width="1" />
  <text class="inter" x="1048" y="461" fill="#f4f6fb" font-size="31" font-weight="760" text-anchor="middle">3</text>

  <text class="inter" x="152" y="530" fill="#f4f6fb" font-size="18" font-weight="720" letter-spacing="0.4" text-anchor="middle">CHOOSE A</text>
  <text class="inter" x="152" y="555" fill="#aeb2bd" font-size="17" font-weight="560" letter-spacing="0.4" text-anchor="middle">REPEATED TASK</text>

  <text class="inter" x="600" y="530" fill="#f4f6fb" font-size="18" font-weight="720" letter-spacing="0.4" text-anchor="middle">GET A</text>
  <text class="inter" x="600" y="555" fill="#aeb2bd" font-size="17" font-weight="560" letter-spacing="0.4" text-anchor="middle">PRACTICAL PLAN</text>

  <text class="inter" x="1048" y="530" fill="#f4f6fb" font-size="18" font-weight="720" letter-spacing="0.4" text-anchor="middle">KEEP HUMAN</text>
  <text class="inter" x="1048" y="555" fill="#d2a19b" font-size="17" font-weight="560" letter-spacing="0.4" text-anchor="middle">APPROVAL</text>

  <path d="M90 593H1110" stroke="#242833" stroke-width="1" />
  <text class="inter" x="90" y="615" fill="#6f7481" font-size="12" font-weight="570" letter-spacing="1.5">7 QUESTIONS · NO ACCOUNT</text>
  <text class="inter" x="1110" y="615" fill="#6f7481" font-size="12" font-weight="570" letter-spacing="1.5" text-anchor="end">ANSWERS STAY IN YOUR BROWSER</text>
</svg>`;

await mkdir(dirname(outputPath), { recursive: true });
const result = await sharp(Buffer.from(svg))
  .png({ compressionLevel: 9, adaptiveFiltering: true })
  .toFile(outputPath);

const metadata = await sharp(outputPath).metadata();
console.log(JSON.stringify({
  output: outputPath,
  width: metadata.width,
  height: metadata.height,
  format: metadata.format,
  bytes: result.size,
}, null, 2));
