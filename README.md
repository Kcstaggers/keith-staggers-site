# Keith Staggers Studio

Production website for [Keith Staggers](https://www.keithstaggers.com). Keith helps leaders and small teams use AI to save time. He builds solutions for repetitive tasks, works one-to-one on real problems, trains teams, and speaks at events.

The site is a plain-language storefront. It explains how Keith can help before introducing his method, products, career story, books, or creative work.

## Stack

- Astro 7 with static site generation
- TypeScript strict mode
- Tailwind CSS v4 through the Vite plugin
- Inter and Fraunces variable fonts
- Vercel Web Analytics
- Spotify embeds
- Node.js 24.x

There is no server-side rendering, database, CMS, or public calendar integration. Content is stored in TypeScript data files.

## Offer funnel

1. The homepage answers what Keith does, who he helps, and how to start.
2. Visitors see four recognizable service categories immediately:
   - Done-for-You AI Setup from $2,500
   - One-to-One AI Working Session at $250
   - Practical AI Training, including a $179 public class and team workshops from $3,500
   - AI Speaking for Leaders and Teams from $3,500
3. Concrete examples explain how AI can help with familiar work before the site explains Keith's method.
4. The Finish Loop is introduced as a $49 project-finishing toolkit for solo creators before its product name is used on its own.
5. Every service inquiry goes through `/project-fit/`, presented to visitors as `Tell Keith about your task`.
6. The form sends only after the visitor intentionally submits it through the approved Formspree route.
7. Keith reviews the inquiry and shares a private calendar link only when the conversation fits.
8. Every HTML page ends with four measured paths: the owned Build the Workflow book page, The Finish Loop, Project Fit, and the newsletter.
9. `/newsletter/` uses Buttondown's normal double-confirmation POST. It promises at most two emails per month, leaves consent unchecked, and keeps all free resources open without an email gate.

Recruiters and employment inquiries can use the same form without being forced into a sales-budget answer.

The Lemon Squeezy checkout URL lives in `src/data/products.ts`. Replace it only after the live product and fulfillment path have been verified. Current activation details live in `CLAUDE.md`.

## Copy clarity release standard

Every public surface is written for a cold reader who does not know Keith, his product names, or AI consulting terms.

- State the service category before a branded offer name.
- Lead with the buyer's problem and the result, then explain the method.
- Use concrete examples before technical terms.
- Make buttons say what happens next.
- Keep the same plain-English identity in visible copy, metadata, structured data, RSS, `llms.txt`, and `llms-full.txt`.
- Preserve the tagline `Build the workflow. Keep the judgment.` as supporting language, not the primary explanation.

Before release, view the rendered homepage as a new visitor. Within ten seconds it must answer: who Keith helps, what he does, and which action to take. `npm run build` runs the permanent copy-clarity checks in `scripts/verify-seo.mjs`. Those automated checks are the minimum. A rendered cold-reader review is still required.

## Routes

The build generates 27 static HTML pages. Twenty-five are indexable and appear in the sitemap. The Finish Loop thank-you page and privacy notice are intentionally noindex with followed links.

| Route | Purpose |
|---|---|
| `/` | Plain-English homepage and four service choices |
| `/about/` | Keith's public identity, career arc, and operating method |
| `/books/` | Owned catalog hub for Keith's three published books |
| `/books/build-the-workflow-keep-the-judgment/` | Practical AI workflow book with verified Kindle purchase path and paperback propagation status |
| `/books/nurse-the-fck-up/` | Verified book record and direct Amazon handoff |
| `/books/leading-with-care/` | Verified book record and direct Amazon handoff |
| `/finish-loop/` | $49 project-finishing toolkit sales page |
| `/finish-loop/thank-you/` | Post-purchase handoff, intentionally excluded from indexing |
| `/frontline-nurse-leader/` | Live practical AI class for frontline nurse leaders |
| `/newsletter/` | Indexed Buttondown-confirmed newsletter page with five public Note examples |
| `/privacy/` | Plain-language provider and data notice, intentionally excluded from indexing |
| `/project-fit/` | Tell Keith about your task form before scheduling |
| `/proof/` | Plain-English examples of independent work |
| `/services/` | Four clear ways Keith can help |
| `/services/done-for-you/` | Done-for-You AI Setup |
| `/services/coaching/` | One-to-One AI Working Session |
| `/services/training/` | Practical AI Training |
| `/services/speaking/` | AI Speaking for Leaders and Teams |
| `/workflow-readiness/` | Seven-question, no-email workflow readiness check |
| `/workflow-testing-template/` | Free 10-case browser worksheet with CSV and print-to-PDF export |
| `/workflow-book/` | Ten free companion templates for Build the Workflow. Keep the Judgment. |
| `/notes/` | Practical AI articles and guides |
| `/notes/the-finishing-problem/` | Article and guide |
| `/notes/the-monday-morning-test/` | Article and guide |
| `/notes/three-careers-one-standard/` | Article and guide |
| `/notes/ai-workflow-handoff-run-stop-recover/` | Article and guide |
| `/notes/one-idea-six-content-jobs/` | Article and guide |

Service and published article routes are generated from their data files with Astro `getStaticPaths()`. Draft articles are filtered from every public surface.

Additional machine-readable routes:

- `/sitemap.xml` with truthful per-route modification dates.
- `/rss.xml` with every published article.
- `/llms.txt` as a concise canonical-source map with the plain-English identity.
- `/llms-full.txt` as a full public service and article text index.
- `/robots.txt` with the canonical sitemap location.

Vercel sends `X-Robots-Tag: noindex, follow` for RSS, both AI plaintext indexes, the PDF guide, and raw workflow-book template files. Their canonical HTML hubs remain the preferred search surfaces.

## Local development

Requires Node.js 24.x and npm.

```bash
npm ci
npm run dev
```

Open [http://localhost:4321](http://localhost:4321).

Run the verification commands before publishing:

```bash
npm run verify
npm audit --omit=dev --audit-level=high
npm run preview
```

`npm run build` includes the repository SEO verifier. The static build is written to `dist/`. After production deployment, run `npm run verify:live`. Submit only changed live canonical URLs to Bing with `npm run submit:indexnow -- <path>`. Use `--all` only for an intentional full-sitemap submission.

## Where to edit

| Change | File |
|---|---|
| Site identity, navigation, buy paths, newsletter settings, social links, and qualification path | `src/data/site.ts` |
| Finish Loop price, content, and checkout URL | `src/data/products.ts` |
| Service offers, pricing, and detail pages | `src/data/services.ts` |
| Articles and guides | `src/data/notes.ts` |
| Albums, tracks, and books | `src/data/albums.ts`, `src/data/tracks.ts`, `src/data/books.ts` |
| Homepage order | `src/pages/index.astro` |
| Homepage sections | `src/components/Studio*.astro` |
| Shared shell, metadata, structured data, and analytics | `src/layouts/Base.astro` |
| Global four-path conversion band | `src/components/SiteConversion.astro` |
| Newsletter signup and public examples | `src/pages/newsletter.astro` |
| Plain-language privacy notice | `src/pages/privacy.astro` |
| Fixed-page sitemap modification dates | `src/data/route-metadata.ts` |
| Build-time SEO release gate | `scripts/verify-seo.mjs` |
| Read-only production smoke test | `scripts/verify-live.mjs` |
| Bing IndexNow changed-URL submission | `scripts/submit-indexnow.mjs` |
| Design tokens and global styling | `src/styles/global.css` |
| Optimized public media | `public/media/` |

Source media, paid product files, editable product materials, and local build output are intentionally excluded from the public repository.

## Deployment

The public repository is [Kcstaggers/keith-staggers-site](https://github.com/Kcstaggers/keith-staggers-site).

Vercel automatically creates previews for branches and deploys production when a verified pull request is merged into `main`. `vercel.json` runs the full `npm run build` quality gate in Vercel.

Publishing flow:

1. Create a focused branch.
2. Run Astro check and the production build.
3. Push the branch and inspect the Vercel preview.
4. Verify desktop, mobile, navigation, forms, images, and relevant console output.
5. Merge the pull request into `main`.
6. Wait for the production deployment to become ready.
7. Verify the live routes and conversion links at [www.keithstaggers.com](https://www.keithstaggers.com).
8. Run the live smoke test and submit only changed canonical URLs through IndexNow.

The apex domain returns a permanent 308 to the matching `www` route. Vercel generates the site from `main`.

Vercel previews and production deployments run `npm run build`, including the static build and repository SEO verifier. The release operator also runs `npm run verify` and the high-severity production dependency audit before merge.

## Guardrails

- Keep the public calendar private. Service calls must remain behind `/project-fit/`.
- Never add personal form answers to analytics.
- Never commit secrets, environment files, customer ZIPs, or editable paid-product sources.
- Books use owned catalog and detail pages, then link directly to Amazon with privacy-safe click measurement.
- Keep customer-facing availability worldwide rather than geographically limited.
- Follow the current operating and deployment record in `CLAUDE.md` before changing checkout, DNS, or production behavior.
