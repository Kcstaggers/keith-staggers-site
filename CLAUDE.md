# Project context for Claude

This file gets you (the AI assistant) up to speed on Keith Staggers' personal site so a fresh chat can pick up where the last one left off. Read this top-to-bottom before touching anything.

## What this is

Personal/portfolio site for Keith Staggers — Tampa-based retired Baltimore detective (1992-2013), nurse then nurse leader (2014-now, he still leads a med-surg unit today), and AI-native digital creator / consultant (2022-now). 50+ albums, 800+ songs, 3 published books, 1000+ AI-generated images/films. The site exists to **get him hired and make him money** through done-for-you AI work, coaching, training, and speaking.

**Canonical career dates live in `/Career/career-timeline.md` (workspace root).** July 12, 2026 brand-consistency pass: his public LinkedIn (linkedin.com/in/keithstaggers) says Founder / AI Consultant since 2022 and that he leads nurses today, so the site must not say the creator era started 2023 or imply nursing ended. Fixed that day in CareerTimeline.astro, About.astro, and StudioStory.astro. Do not reintroduce "2023-now" for the creator era or "then nurse" phrasing.

Live at **https://www.keithstaggers.com** (apex redirects to www).

The current production site uses the near-black AI studio experience built around Keith Photo 9, electric cobalt, ultraviolet depth, and coral actions. It leads with a useful four-part method, then Notes, The Finish Loop, clear buyer-intent services, proof, and Keith's story. Nursing remains a proof-rich specialty without becoming the brand ceiling. The Studio redesign and project-fit gate went live July 13, 2026. The Finish Loop product previews and phone-width corrections went live July 14, 2026. The default social preview is the photo-free 1200 × 630 brand graphic at `public/og-keith-staggers-v2.png`; keep its versioned filename when replacing it so LinkedIn does not reuse an obsolete cached image.

## Tech stack

- **Astro 7** (static site generation, TypeScript strict; Node 24.x pinned for Vercel)
- **Tailwind v4** via `@tailwindcss/vite` — config lives in `src/styles/global.css` using `@theme` (no `tailwind.config.js`)
- **Fontsource variable fonts**: Fraunces (serif), Inter (sans)
- **Project-fit qualification page** before any private booking link is shared
- **@vercel/analytics/astro** for pageviews and privacy-safe conversion events
- **Spotify iframes** for music playback (no SDK, no auth)

No SSR adapter. No DB. No CMS. All content is in `src/data/*.ts` as TypeScript constants — editing those is how you change copy.

## Deploy

GitHub-based auto-deploy. Every push to `main` triggers Vercel.

- **Repo:** `github.com/Kcstaggers/keith-staggers-site` (public)
- **Vercel project:** `keith-staggers-site` under team `keith-staggers-projects` (Hobby plan)
- **Default branch:** `main`
- **Build command:** `astro build` (Vercel auto-detects)
- **Output:** `dist/`
- **Custom domains:** `keithstaggers.com` (307s to www), `www.keithstaggers.com` (production), `keith-staggers-site.vercel.app` (Vercel default)

Keith pushes from his Mac terminal. macOS Keychain holds the GitHub credential — `git push` is silent. There is no PAT or SSH key needed.

For local builds inside this sandbox, use `/tmp/kss-verify` as the build dir — the mount on Keith's Desktop has permission quirks that break `npm install` cleanup. Pattern:

```bash
SRC="/sessions/<session>/mnt/Desktop/keith-staggers-site"
BUILD="/tmp/kss-verify"
cp -r "$SRC"/src "$BUILD/"        # if first time, also copy public/, package.json, package-lock.json, astro.config.mjs, tsconfig.json
cd "$BUILD" && npx astro build
cp /tmp/kss-verify/dist/index.html "$SRC/preview-build/index.html"
cd "$SRC/preview-build" && sed -i 's|/_astro/|./_astro/|g; s|"/favicon.svg"|"./favicon.svg"|g; s|src="/media/|src="./media/|g; s|poster="/media/|poster="./media/|g' index.html
```

The `preview-build/` directory is the local file:// preview Keith opens via a `computer:///Users/keithstaggers/Desktop/keith-staggers-site/preview-build/index.html` link. It's gitignored. Don't ship absolute paths to it.

## Folder layout

```
src/
├── pages/index.astro          # Homepage. Order of components here = page order.
├── pages/notes/[slug].astro   # Static Studio Notes article template
├── pages/services/[slug].astro # Static service-detail template
├── layouts/Base.astro         # HTML shell, fonts, navigation/footer, structured data, Vercel Analytics
├── components/
│   ├── Masthead.astro         # "IN STUDIO · Issue 26" bar with live clock
│   ├── Nav.astro              # Logo + section links + cobalt action pill
│   ├── Hero.astro             # Business-first hero with formal portrait, receipts, and booking CTA
│   ├── Pathways.astro         # Interactive Make it / Teach us / Bring Keith in selector
│   ├── TableOfContents.astro  # "Inside this issue" — five pillars with page numbers
│   ├── Music.astro            # Featured album + Spotify grid + streaming-platforms strip
│   ├── Visuals.astro          # Compact horizontal media carousel + accessible viewer
│   ├── Services.astro         # Open indexed service rows with pricing and proof
│   ├── Notes.astro            # Three open editorial article rows, placed near the offers
│   ├── Testimonials.astro     # 3-column quote grid
│   ├── About.astro            # Drop-cap narrative + CareerTimeline + PullQuote
│   ├── CareerTimeline.astro   # Three-era timeline (Detective / Nurse / AI Creator)
│   ├── PullQuote.astro        # Reusable big-quote block
│   ├── Books.astro            # 3 books with cover images linking to Amazon
│   ├── ClosingCTA.astro       # Legacy qualification close + direct guide download
│   ├── Newsletter.astro       # Legacy component, intentionally not rendered
│   ├── Footer.astro           # Giant wordmark + 4-col grid
│   ├── HirePill.astro         # Floating bottom-right "Open for projects · Hire me"
│   └── SectionCTA.astro       # Reusable end-of-section CTA. Used by Music/Visuals/About/Books
├── data/                       # CONTENT LIVES HERE. Edit these to change copy.
│   ├── site.ts                # Name, tagline, email, city, qualification path, availability
│   ├── albums.ts              # 7 albums with Spotify/Apple/Amazon IDs
│   ├── books.ts               # 3 books with Amazon URL + blurbs
│   ├── services.ts            # 4 services with pricing
│   ├── notes.ts               # 3 Studio Notes with body copy and related offers
│   └── testimonials.ts        # Empty by design; real testimonials only, with written permission
├── utils/booking.ts            # Compatibility helpers that now return the project-fit path
└── styles/global.css           # Tailwind v4 @theme — colors, fonts, custom utilities
public/
├── favicon.svg
├── og-keith-staggers-v2.png   # Default photo-free social and LinkedIn Featured preview
├── sitemap.xml                 # Homepage, services, and Studio Notes
├── robots.txt                  # Allows indexing and points to sitemap.xml
└── media/                      # Optimized images and videos. 13MB total. See "Media" below.
Media/                          # SOURCE files (PNGs, MP4s). ~80MB. GITIGNORED. Don't commit.
preview-build/                  # Local file:// preview output. GITIGNORED.
```

## Page order (src/pages/index.astro)

`StudioHero → StudioMethod → StudioNotes → StudioProduct → StudioServices → StudioWork → StudioCatalog → StudioStory → StudioClosing`

Rationale: the site provides value before the service pitch. The free method and Notes teach the operating idea. The $49 Finish Loop is the low-risk product. Paid services then split by intent: make it for me, teach us, or bring Keith in. Work, catalog, and story provide proof before the direct close.

## Design system

Tokens are defined in `src/styles/global.css` via Tailwind v4's `@theme` directive. Use semantic class names (`text-paper-dim`, `bg-ink`, `border-rule`) — never raw hex.

| Token | Hex | Usage |
|------|------|------|
| `--color-ink` | `#050608` | True near-black page background |
| `--color-paper` | `#f4f6fb` | Primary cold white type |
| `--color-paper-dim` | `#a8abb7` | Secondary type |
| `--color-paper-faint` | `#727786` | Captions and metadata |
| `--color-rule` | `#282c36` | Dividers, grids, and borders |
| `--color-cobalt` | `#2851ff` | Cobalt action color and active states |
| `--color-signal` | `#ff604d` | Coral action and completion signal |

**Typography stack:** Inter is the display and body workhorse. Monospace labels workflows, captions, and technical detail. Fraunces remains installed for controlled editorial accents outside the main studio surfaces.

**Accent rule:** Cobalt is for actions, active states, and method lines. Ultraviolet adds depth. Coral marks one decisive action, completion, or exception. Keep the system mostly black and white.

## Conventions Keith cares about

These are real rules from prior iterations — violating them will require rework.

- **No em dashes (—) anywhere in copy.** Use periods, commas, or `·` (middle dot) instead. Em dashes feel AI-generated. He swept the codebase to remove them.
- **No dated content.** No "Winter 26", no "as of May 2026". The "Issue 26" masthead is fine because it's typographic flavor, not a freshness claim.
- **De-emphasize Tampa in CTAs.** Tampa is biographical (lives there, in the About section). Anywhere customer-facing — CTAs, footer, hero — say "Available worldwide" or "Working worldwide". He doesn't want Tampa narrowing his perceived market for remote work.
- **Use a qualification step before scheduling.** Public service CTAs lead to `/project-fit/`. Keith reviews the answers first and shares a private calendar link only when the inquiry fits.
- **Keep recruiter access open.** The project-fit form includes an employment or recruiter path that does not force a sales-budget answer.
- **Books link straight to Amazon.** Buy-direct via Lemon Squeezy was scrapped — the overhead wasn't worth it for book sales.

## Data files — where to make common changes

| Change | File | Notes |
|------|------|------|
| Add/remove/reorder albums | `src/data/albums.ts` | Need real Spotify album ID + Apple/Amazon URLs. Set `featured: true` on the one that anchors the Music section. |
| Edit testimonials | `src/data/testimonials.ts` | EMPTY by design (real-only policy). July 12, 2026 ruling from Keith: "Kristen Smith" and "Alex Rivera" were fabricated placeholders, BURIED, never republish them anywhere. Kevin Lazar IS real (friend, former business partner, active free consulting client): written permission + fresh quote required before any use. Only add quotes with written permission. |
| Change service pricing | `src/data/services.ts` | Four services. `pricing` field is a free-form string. |
| Edit availability badge ("Open for projects") | `src/data/site.ts` | `availability.status: "open"\|"limited"\|"booked"` + label. Drives HirePill. |
| Add or edit a Studio Note | `src/data/notes.ts` | Each note gets a static `/notes/<slug>/` page and a homepage row. Keep claims evidence-based and connect one relevant service. |
| Change the qualification route | `src/data/site.ts` | Edit `booking.intakePath`. Keep public scheduling disabled. |
| Add a book | `src/data/books.ts` + drop cover at `public/media/book-<slug>.webp` | Cover convention is `book-${book.slug}.webp` at 600×900. |
| Update the bio | `src/components/About.astro` | Three paragraphs. Keep the drop cap on paragraph 1. |
| Change career timeline | `src/components/CareerTimeline.astro` | Three eras. Detective 1992-2013, Nurse 2014-Now, AI Creator 2022-Now. These dates are canonical; do not imply nursing ended. |

## Media pipeline

All source files live in `Media/` (gitignored, 80MB). Optimized outputs live in `public/media/` (committed, ~13MB).

**Image optimization** (PIL/Pillow):
- Portraits/photos: max 1200px long side, WebP quality 80
- Hero: max 1400px long side, WebP quality 82
- Book covers: max 900px long side, WebP quality 82
- Naming: `keith-photo-<n>.webp`, `keith-hero.webp`, `book-<slug>.webp`

**Video optimization** (ffmpeg, H.264):
- Short loop videos (10s): scaled to 1280 (16:9) or 900 (1:1), CRF 25-26, `-an` (no audio), `+faststart`
- Longer features (44s+): scaled to 720, CRF 27-28, `-an`, `+faststart`
- Poster frames: extract frame 30 with `ffmpeg ... -vf "select=eq(n\,30)"`, save as WebP q78 alongside the mp4

All gallery videos autoplay muted on loop — `<video autoplay muted loop playsinline preload="metadata">`. No controls, no audio. Editorial feel.

## Inquiry and booking flow

All active public service CTAs route to `/project-fit/`. The page asks for the outcome, timeline, prior work, conversation type, investment fit, and a confidentiality confirmation. It then builds a reviewable email for Keith. No answers are transmitted until the visitor intentionally opens that email.

Keith reviews every inquiry. Qualified people receive the private calendar link in his reply. The live site must not expose a direct scheduling URL or load a calendar embed.

Use the compatibility helpers in `src/utils/booking.ts`:
- `getBookingHref()` returns `site.booking.intakePath`.
- `getCalAttrs()` returns an empty object.

## Conversion measurement

`Base.astro` records privacy-safe custom events through Vercel Web Analytics. Current events are Booking Intent, Service Interest, Guide Download, Facebook Follow Intent, Pathway Selected, Studio Note Opened, and Media Opened. Properties contain only the page, destination slug, visible link label, or media title. Do not add names, email addresses, form fields, or other personal data.

## DNS (don't break this)

Domain `keithstaggers.com` is registered at **Canva** (yes, really — auto-renews 9/1/2026 for $18.99). DNS is currently managed at Canva with these two records pointing at Vercel:

| Type | Name | Value |
|------|------|------|
| A | @ | 216.198.79.1 |
| CNAME | www | c33d901cfaa6190b.vercel-dns-017.com. |

Domain is disconnected from Canva's "Connected to Canva" website integration — that's important, the integration locks DNS records. **Do not re-enable it.**

A scheduled task is set for **Aug 15, 2026** to start a Canva → Vercel transfer. Keith chose Vercel, not Cloudflare. Don't initiate that early without checking with Keith.

## Recurring gotchas

- **Sandbox mount can't delete files** in Keith's Desktop folder. `rm -rf .git` etc. will fail. Build in `/tmp/kss-verify` and copy back, or have Keith run destructive commands in his Terminal.
- **Spotify iframes can't autoplay.** That's a browser policy, not a bug. The featured album section uses a tall embed (height=400) so the play button is visible.
- **Vercel auto-detects Astro** — no `vercel.json` needed. Don't add one unless you need to override.
- **Keep `compressHTML: true` in `astro.config.mjs`.** Astro 7 defaults to JSX whitespace compression, which removes visible spaces between split text nodes across this site.
- **GitHub repo is public.** Don't commit secrets, API keys, .env files, or anything you wouldn't want on someone's homepage. The .gitignore covers the usual suspects.

## Current production handoff: AI creator studio homepage

Updated July 14, 2026. Keith chose the portrait-and-music Studio homepage as the production direction and rejected the broader Future Wow signal-rain candidate. The live site keeps `public/media/keith-photo-9.webp` as the driving identity image, the approved photo-led Finish Loop presentation, and the project-fit buffer before calendar access.

### Git and rollback

- Authoritative branch: `main`
- Last functional production merge: `db687ca670553cfbbf0bc97de311c28cfe506f8f`
- Explicit pre-redesign rollback commit: `de5bf27`
- Do not overwrite or stage the user-owned untracked files listed later in this document.
- The Studio design and project-fit gate were published to production through PR #3 on July 13, 2026.
- The Finish Loop product previews and mobile sizing corrections were published through PR #5 on July 14, 2026.
- PR #10 restored the approved Finish Loop presentation. Merge commit: `a2400340543ce335194bf8e380ecf7e9601fd590`.
- PR #11 upgraded production to Astro 7.0.9 on Node 24.x. Merge commit: `db687ca670553cfbbf0bc97de311c28cfe506f8f`.

### Design direction

- True near-black canvas, cold white type, electric cobalt active states, ultraviolet depth, and coral action color
- Inter display type with mono utility text
- Keith Photo 9 as a recurring circular identity portal with orbit lines and subtle pointer motion
- Keith Photo 5 is embedded in the actual Finish Loop field-manual cover and drives the homepage product stage, sales page, thank-you page, and social campaign image
- Music is the dominant catalog proof with a featured Spotify stage and six-release rail. The three books appear only as a compact supporting strip
- Open bands, rails, cinematic stages, and thin rules. No cream background, default bento grid, decorative hero eyebrow, or tint over Keith's face
- Homepage order: studio hero, production ticker, useful four-part method, Studio Notes, Finish Loop, service selector, interactive work stage, catalog proof, three-lives story, qualification close

Private generated concepts and the complete design spec are gitignored at:

`private-products/design-concepts/ai-creator-wow/`

The design spec includes the desktop and mobile concepts, responsive rules, motion rules, intentional deviations, and final fidelity ledger.

### New homepage implementation

- `src/components/OrbitalPortrait.astro`
- `src/components/StudioHero.astro`
- `src/components/StudioMethod.astro`
- `src/components/StudioProduct.astro`
- `src/components/StudioServices.astro`
- `src/components/StudioNotes.astro`
- `src/components/StudioWork.astro`
- `src/components/StudioCatalog.astro`
- `src/components/StudioStory.astro`
- `src/components/StudioClosing.astro`
- `src/pages/index.astro` renders only these Studio components.
- `src/components/Nav.astro`, `src/components/Footer.astro`, `src/layouts/Base.astro`, `src/data/site.ts`, and `src/styles/global.css` contain the new studio shell and styling.
- Legacy homepage components remain in the repository but are not rendered, which keeps rollback straightforward.

### Verified behavior

- Desktop hero matches the accepted concept closely and uses the real Photo 9 without altering Keith's identity.
- The method section is a code-native diagram with four stages and practical examples. No generated scene or fake UI is active.
- Service tabs change the selected content and accessible state.
- The media rail opens real videos and images in a labeled accessible dialog.
- Mobile navigation opens and closes correctly.
- A 375px native client viewport has no page-level horizontal overflow.
- The Finish Loop page was also verified at an exact 390px viewport with a 390px document width after replacing implicit grid minimums with `minmax(0, 1fr)`.
- Desktop native client viewport has no page-level horizontal overflow.
- Mobile browser console and page errors were clean during the interaction pass.
- All 11 production routes returned HTTP 200 after the Astro 7 deployment, and the apex domain returned the intended 307 redirect to `www`.
- `npx astro check` passes with 0 errors and 0 warnings, plus 5 existing inactive legacy hints. `npm run build` passes with all 11 static routes.
- A clean `npm ci` and `npm audit` report zero vulnerabilities.
- Production desktop at 1440 pixels and mobile at 390 pixels have no page-level horizontal overflow, visible broken images, or relevant browser console errors.
- Latest QA screenshots are under `/Users/keithstaggers/.codex/visualizations/2026/07/12/019f57c3-3582-7623-9d6a-ffa5103b48ca/` with the `website-value-funnel-` prefix.
- Finish Loop comparison and exact-mobile screenshots use the `finish-loop-` prefix in the same folder.

Before future publishing, rerun `npx astro check` and `npm run build`, commit only intended files, push the branch, and inspect the Vercel preview. The current Studio site, qualification gate, and Finish Loop visual update are already live.

## Current revenue handoff: Finish Loop launch

Updated July 14, 2026. This is the active business task. Read this section before changing the product, checkout, deployment, or storefront.

### Objective

Create automated digital deliverables that generate income for Keith, use his existing images as visual references where useful, and connect the products to an automated checkout and fulfillment path on keithstaggers.com.

Keith's standing authorization: proceed without repeatedly asking permission unless an action will cost money. Ask before any purchase, paid subscription, advertising spend, contractor expense, or other direct charge. Browser safety rules and regulated identity steps still apply.

### Product built

**The Finish Loop** is a $49 one-time digital toolkit for creators who generate ideas but struggle to finish and release them.

Customer bundle:

- `output/products/the-finish-loop-v1.zip`
- 119,328 bytes, seven files
- SHA-256: `b5da9cee4b59581f5774c77623b3486268e4bbd36fe37fb02c3899bfe9713f91`
- Includes a 26-page field manual, offline interactive planner, 30-day shipping calendar, direction-brief library, finish scorecard, start instructions, and license

Private product source and store instructions:

- `private-products/finish-loop/`
- `private-products/finish-loop/store-setup.md`
- `private-products/keith-staggers-product-revenue-plan-v1.md` is the detailed 12-week product and revenue plan

Both `private-products/` and `output/products/` are intentionally gitignored. Do not commit the paid customer ZIP, editable sources, store strategy, or private setup notes to the public GitHub repository.

The local customer bundle was rebuilt on July 14, 2026 to match the approved master brand. The replacement uses the photo-free six-step system map, embedded Inter typography, `kcstaggers@gmail.com` as the working support address, AI Jumpstart naming, and an aligned six-gate scorecard. The verified local ZIP is 119,328 bytes with SHA-256 `b5da9cee4b59581f5774c77623b3486268e4bbd36fe37fb02c3899bfe9713f91`. Lemon Squeezy test product `1214168` still has the superseded Photo 5 cover, portrait store logo, and 912.13 KB ZIP; replace all three with the verified July 14 files before copying the product to live mode. The older 3.03 MB ZIP remains stored but inactive.

### Website implementation

The public implementation includes:

- `src/data/products.ts`
- `src/components/ProductSpotlight.astro`
- `src/pages/finish-loop.astro`
- `src/pages/finish-loop/thank-you.astro`
- Branded campaign media under `public/media/finish-loop/`
- Product schema, Open Graph assets, sitemap and navigation entries
- Privacy-safe purchase-intent and fulfillment events
- A $250 coaching-session upsell routed through the project-fit gate

The new media is supporting material. The business offer and conversion path remain the focus.

### Git and deployment state

- Authoritative branch: `main`
- PR #10 merged the approved Finish Loop restoration as `a2400340543ce335194bf8e380ecf7e9601fd590`.
- PR #11 merged the Astro 7 upgrade as `db687ca670553cfbbf0bc97de311c28cfe506f8f`.
- Production currently contains The Finish Loop page and the Lemon Squeezy test checkout URL
- The approved photo-led Creator Operating System presentation is live at `https://www.keithstaggers.com/finish-loop/`, with near-black branded planner previews and the homepage Photo 9 in the About block.
- Production desktop, 390-pixel mobile, all 11 routes, thank-you page, image loads, overflow, and browser console were verified after deployment.

Do not replace the test checkout URL with a live checkout URL until Lemon Squeezy approves the store and the live product is configured and verified.

Latest Astro 7 release verification:

- `npx astro check`: zero errors, zero warnings, five existing hints
- `npm run build`: passed, 11 static pages
- The July 14 Astro 7 upgrade cleared the previous eight dependency advisories without using a forced audit fix. A clean `npm ci` and `npm audit` now report zero vulnerabilities.

### Lemon Squeezy state

- Store: `Keith Staggers Studio`
- Store URL: https://keithstaggers.lemonsqueezy.com
- Support email: `kcstaggers@gmail.com`
- Store remains in test mode
- Test product ID: `1214168`
- Product is published in test mode at $49
- Test checkout: https://keithstaggers.lemonsqueezy.com/checkout/buy/3a90d035-c69c-455b-828b-4ae6f3af31a3
- Product cover, store logo, customer ZIP, confirmation message, receipt note, and redirect are configured
- The active Photo 5 cover, portrait logo, and 912.13 KB ZIP in Lemon Squeezy are superseded and awaiting replacement with the verified July 14 assets; the legacy 3.03 MB ZIP is inactive
- Test order `#4295941` passed
- Test checkout, order creation, receipt messaging, and thank-you handoff passed
- Lemon Squeezy disables file downloads in test mode, so the ZIP download cannot be proven from that order

Keith completed the Lemon Squeezy and Stripe regulated identity and payout submission. The dashboard currently says:

`Your application has been received and will be reviewed as soon as possible.`

No additional account action was shown on July 12, 2026. Store activation is the current external gate.

Lemon Squeezy then emailed asking for product examples. Its message had a broken `Reply-To` header pointing to `kcstaggers@gmail.com`, so Keith's first reply at 10:20 AM went back to himself. The requested product information was resubmitted through Lemon Squeezy's official Help Center contact form on July 12, 2026. The form displayed `Your form has been submitted successfully.` Support received the store name, storefront, business website, staging product preview, test product ID, price, deliverable summary, test-checkout status, and an explanation of the broken Reply-To header. No immediate follow-up is due. If the submission remains unanswered for two weeks, send one polite follow-up, then use the Stripe-link fallback instead of repeatedly chasing.

`hello@keithstaggers.com` does not currently forward to `kcstaggers@gmail.com`. A July 12, 2026 DNS check returned no MX record for `keithstaggers.com`, and a search of the logged-in Gmail mailbox returned no messages addressed to `hello@keithstaggers.com`. Configure domain mail routing before publishing this address as a working support channel.

July 12, 2026 attempt (Keith approved the records): plan was Forward Email's free DNS-only tier. RESULT: the TXT record (`@ forward-email=kcstaggers@gmail.com`) SAVED at Canva and is live in the zone. But Canva REFUSES to save any MX record with the error "This record is not allowed while 'Connected to Canva'", even though the Connected to Canva toggle is off and the page confirms the domain is disconnected. Confirmed twice including after a full page reload; TXT and other types save fine, so it is an MX-specific Canva-side flag. Do NOT try to fix it by toggling Connected to Canva on: the integration locks/overwrites DNS and could break the Vercel A/CNAME records. Without MX, hello@ cannot receive mail no matter what else is configured.

CURRENT July 14, 2026: `kcstaggers@gmail.com` is the working support address in Lemon Squeezy, `src/data/site.ts`, the thank-you page, and all three support references in the rebuilt local customer bundle (`LICENSE.txt`, `START-HERE.txt`, and the field-manual back page). The verified ZIP at SHA-256 `b5da9cee4b59581f5774c77623b3486268e4bbd36fe37fb02c3899bfe9713f91` already contains the working Gmail address. If the store is approved before the domain transfer, replace the superseded store ZIP with this verified bundle and launch with Gmail support. The domain will transfer to VERCEL, not Cloudflare. The Aug 15 scheduled reminder includes the post-transfer steps: add the two Forward Email MX records at Vercel DNS, verify `hello@keithstaggers.com` forwards to Gmail, then switch Lemon Squeezy, `site.ts`, and the thank-you page back to `hello@`. Rebuild and re-verify the customer ZIP only if every surface should also switch back. Do not touch Canva's Unlock domain button until that transfer actually starts; a stray July 12 click opened the dialog, and Keith's agent canceled it without changing the lock.

### Exact continuation after approval

1. Confirm the dashboard shows the store is approved and live mode is available.
2. Switch to live mode.
3. Copy The Finish Loop from test mode to live mode. Lemon Squeezy test products do not automatically become live products.
4. Verify the live product price, media, ZIP, receipt note, confirmation message, support address, and redirect.
5. Publish the live product and obtain the live checkout URL.
6. Replace only the test URL in `src/data/products.ts`.
7. From a fresh branch based on current `main`, run a clean `npm ci`, `npx astro check`, `npm run build`, and `npm audit` in an isolated worktree.
8. Stage only the intended tracked file, commit, and push a fresh `agent/finish-loop-live-checkout` branch.
9. Open a new PR, wait for its preview to reach READY, and verify the $49 CTA points to the live checkout.
10. Merge that PR only after the live checkout is verified.
11. Wait for the Git-triggered Vercel production deployment to reach READY.
12. Verify:
    - https://www.keithstaggers.com/finish-loop/
    - The CTA opens the live Lemon Squeezy product without a test-mode banner
    - https://www.keithstaggers.com/finish-loop/thank-you/
    - Relevant browser console errors
13. Prefer a single-use 100 percent owner discount for a no-cost live fulfillment test if Lemon Squeezy supports it. Do not create a $49 live charge without Keith's explicit approval.
14. Verify the downloaded ZIP checksum against the value above.
15. Update `private-products/finish-loop/store-setup.md` with the live product ID, checkout URL, test order, and download result.
16. Mark the active income goal complete only after the live checkout and automated fulfillment path are genuinely working.

Verification story:

A visitor opens Keith's Finish Loop sales page, clicks the $49 call to action, completes Lemon Squeezy checkout, receives automated access to the ZIP, and lands on the site's fulfillment page.

### Files that belong to Keith

The following untracked items predate or sit outside the Finish Loop commits. Preserve them and do not stage, delete, rename, or overwrite them unless Keith specifically requests it:

- `Media 2/`
- `output/`
- `src/components/Hero 2.astro`
- `src/components/Hero 3.astro`
- `src/components/Services 2.astro`
- `src/components/Visuals 2.astro`

## Pending / nice-to-haves

- Newsletter is intentionally off the homepage. Do not restore it until there is a real publishing cadence and at least four issues drafted.
- `business-launch-kit-2026-07-11.md` contains the Facebook cadence, six ready posts, and LinkedIn profile starter copy. No external posts were published as part of the site build.
- Three Studio Notes are now ready as canonical source material for Facebook and future LinkedIn posts: finishing, practical team training, and reinvention.
- Local rollback point before the July 11 redesign: `backup/pre-phenomenal-redesign-2026-07-11`.
- AI-workflow lead magnet PDF — discussed but not built. Captures emails from visitors not ready to book.
- Vercel Speed Insights — separate from Web Analytics, currently off. Could enable in Vercel dashboard if Keith wants Lighthouse-style perf data.

## How Keith likes to be communicated with

Quote from him: *"Always give me your best advice. Never sugarcoat anything, be agreeable or just tell me what you think i need to hear. I want and need a capable assistant to give it to me straight with no filter. If I say something stupid or have an idea that's dumb, please just tell me."*

So: push back when warranted, recommend the right answer when there's a clearly right one, skip the apologies and hedging. He's not fragile.
