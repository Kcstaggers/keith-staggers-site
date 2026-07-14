# Keith Staggers Studio

Production website for [Keith Staggers](https://www.keithstaggers.com), an AI creator, trainer, workflow builder, nurse leader, author, and music producer.

The site is a value-first storefront. It teaches Keith's working method, publishes Studio Notes, sells The Finish Loop, presents service offers, and routes serious inquiries through a qualification step.

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

1. The homepage teaches Keith's method and presents Studio Notes.
2. The Finish Loop offers a $49 entry product through Lemon Squeezy.
3. Visitors can explore four paid service paths:
   - AI Jumpstart at $250
   - Done-for-You Builds from $2,500
   - AI Training, including a $179 public cohort and team workshops from $3,500
   - Speaking from $3,500
4. Every service inquiry goes through `/project-fit/`.
5. The form builds a reviewable email. Nothing is transmitted until the visitor intentionally opens and sends it.
6. Keith reviews the inquiry and shares a private calendar link only when the conversation fits.

Recruiters and employment inquiries can use the same form without being forced into a sales-budget answer.

The Lemon Squeezy checkout URL lives in `src/data/products.ts`. Replace it only after the live product and fulfillment path have been verified. Current activation details live in `CLAUDE.md`.

## Routes

The build generates 11 static pages.

| Route | Purpose |
|---|---|
| `/` | Studio homepage and value-first offer path |
| `/finish-loop/` | The Finish Loop sales page |
| `/finish-loop/thank-you/` | Post-purchase handoff, intentionally excluded from indexing |
| `/project-fit/` | Qualification form before scheduling |
| `/services/done-for-you/` | Done-for-You Builds |
| `/services/coaching/` | AI Jumpstart |
| `/services/training/` | AI Training |
| `/services/speaking/` | Speaking |
| `/notes/the-finishing-problem/` | Studio Note |
| `/notes/the-monday-morning-test/` | Studio Note |
| `/notes/three-careers-one-standard/` | Studio Note |

Service and Studio Note routes are generated from their data files with Astro `getStaticPaths()`.

## Local development

Requires Node.js 24.x and npm.

```bash
npm ci
npm run dev
```

Open [http://localhost:4321](http://localhost:4321).

Run the verification commands before publishing:

```bash
npm run astro -- check
npm run build
npm run preview
```

The static build is written to `dist/`.

## Where to edit

| Change | File |
|---|---|
| Site identity, navigation, email, social links, and qualification path | `src/data/site.ts` |
| Finish Loop price, content, and checkout URL | `src/data/products.ts` |
| Service offers, pricing, and detail pages | `src/data/services.ts` |
| Studio Notes | `src/data/notes.ts` |
| Albums, tracks, and books | `src/data/albums.ts`, `src/data/tracks.ts`, `src/data/books.ts` |
| Homepage order | `src/pages/index.astro` |
| Homepage sections | `src/components/Studio*.astro` |
| Shared shell, metadata, structured data, and analytics | `src/layouts/Base.astro` |
| Design tokens and global styling | `src/styles/global.css` |
| Optimized public media | `public/media/` |

Source media, paid product files, editable product materials, and local build output are intentionally excluded from the public repository.

## Deployment

The public repository is [Kcstaggers/keith-staggers-site](https://github.com/Kcstaggers/keith-staggers-site).

Vercel automatically creates previews for branches and deploys production when a verified pull request is merged into `main`.

Publishing flow:

1. Create a focused branch.
2. Run Astro check and the production build.
3. Push the branch and inspect the Vercel preview.
4. Verify desktop, mobile, navigation, forms, images, and relevant console output.
5. Merge the pull request into `main`.
6. Wait for the production deployment to become ready.
7. Verify the live routes and conversion links at [www.keithstaggers.com](https://www.keithstaggers.com).

The apex domain redirects to `www`. Vercel generates the site from `main`.

## Guardrails

- Keep the public calendar private. Service calls must remain behind `/project-fit/`.
- Never add personal form answers to analytics.
- Never commit secrets, environment files, customer ZIPs, or editable paid-product sources.
- Books link directly to Amazon.
- Keep customer-facing availability worldwide rather than geographically limited.
- Follow the current operating and deployment record in `CLAUDE.md` before changing checkout, DNS, or production behavior.
