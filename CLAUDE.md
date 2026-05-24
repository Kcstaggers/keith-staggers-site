# Project context for Claude

This file gets you (the AI assistant) up to speed on Keith Staggers' personal site so a fresh chat can pick up where the last one left off. Read this top-to-bottom before touching anything.

## What this is

Personal/portfolio site for Keith Staggers — Tampa-based retired Baltimore detective (1992-2013) → registered nurse (2014-2023) → AI-native digital creator (2023-now). 50+ albums, 800+ songs, 3 published books, 1000+ AI-generated images/films. The site exists to **get him hired and make him money** through done-for-you AI work, coaching, training, and speaking.

Live at **https://www.keithstaggers.com** (apex redirects to www).

Editorial-magazine aesthetic — think New Yorker / Monocle. Dark background, serif headlines, generous whitespace, sparing amber-italic accents. Not a Canva template, not a startup landing page.

## Tech stack

- **Astro 5** (static site generation, TypeScript strict)
- **Tailwind v4** via `@tailwindcss/vite` — config lives in `src/styles/global.css` using `@theme` (no `tailwind.config.js`)
- **Fontsource variable fonts**: Fraunces (serif), Inter (sans)
- **Cal.com embed** for booking
- **@vercel/analytics/astro** for pageview tracking
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
├── pages/index.astro          # The only page. Order of components here = page order.
├── layouts/Base.astro         # HTML shell, fonts, masthead/nav/footer/HirePill, Cal.com embed, Vercel Analytics
├── components/
│   ├── Masthead.astro         # "IN STUDIO · Issue 26" bar with live clock
│   ├── Nav.astro              # Logo + section links + amber "Hire me" pill
│   ├── Hero.astro             # The big landing block with portrait
│   ├── TableOfContents.astro  # "Inside this issue" — five pillars with page numbers
│   ├── Music.astro            # Featured album + Spotify grid + streaming-platforms strip
│   ├── Visuals.astro          # 13-tile bento of photos + autoplay-muted-loop videos
│   ├── Services.astro         # 4 service cards with pricing
│   ├── Testimonials.astro     # 3-column quote grid
│   ├── About.astro            # Drop-cap narrative + CareerTimeline + PullQuote
│   ├── CareerTimeline.astro   # Three-era timeline (Detective / Nurse / AI Creator)
│   ├── PullQuote.astro        # Reusable big-quote block
│   ├── Books.astro            # 3 books with cover images linking to Amazon
│   ├── Newsletter.astro       # Stub signup form (not wired to a provider yet)
│   ├── Footer.astro           # Giant wordmark + 4-col grid
│   ├── HirePill.astro         # Floating bottom-right "Open for projects · Hire me"
│   └── SectionCTA.astro       # Reusable end-of-section CTA. Used by Music/Visuals/About/Books
├── data/                       # CONTENT LIVES HERE. Edit these to change copy.
│   ├── site.ts                # Name, tagline, email, city, booking config, availability
│   ├── albums.ts              # 7 albums with Spotify/Apple/Amazon IDs
│   ├── books.ts               # 3 books with Amazon URL + blurbs
│   ├── services.ts            # 4 services with pricing
│   └── testimonials.ts        # 3 testimonials (Kevin Lazar, Kristen Smith, Alex Rivera)
├── utils/booking.ts            # getBookingHref() and getCalAttrs() helpers
└── styles/global.css           # Tailwind v4 @theme — colors, fonts, custom utilities
public/
├── favicon.svg
└── media/                      # Optimized images and videos. 13MB total. See "Media" below.
Media/                          # SOURCE files (PNGs, MP4s). ~80MB. GITIGNORED. Don't commit.
preview-build/                  # Local file:// preview output. GITIGNORED.
```

## Page order (src/pages/index.astro)

`Hero → TableOfContents → Music → Visuals → Services → Testimonials → About → Books → Newsletter`

Rationale: creative work (Music + Visuals) lands before the pitch (Services + Testimonials), then the personal story (About + Books), then the soft ask (Newsletter). Don't reorder without a real reason — Keith has scroll-depth opinions.

## Design system

Tokens are defined in `src/styles/global.css` via Tailwind v4's `@theme` directive. Use semantic class names (`text-paper-dim`, `bg-ink`, `border-rule`) — never raw hex.

| Token | Hex | Usage |
|------|------|------|
| `--color-ink` | `#0a0a0a` | Page background |
| `--color-paper` | `#e8e4dc` | Body text |
| `--color-paper-dim` | `#b8b2a6` | Subheads, secondary text |
| `--color-paper-faint` | `#8a847a` | Captions, metadata |
| `--color-rule` | `#2a2a2a` | Dividers, borders |
| `--color-amber` | `#c89860` | Accent — used sparingly |

**Typography stack:** Fraunces (serif, the workhorse), Inter (sans, used rarely), monospace (eyebrows and captions). The eyebrow pattern `eyebrow` (small uppercase + tight tracking, monospace) opens every section.

**Amber rule:** ~6-8 amber moments per scroll, max. The amber italic accent is a *spice*. If you find yourself reaching for it twice in the same block, you're using it too much.

## Conventions Keith cares about

These are real rules from prior iterations — violating them will require rework.

- **No em dashes (—) anywhere in copy.** Use periods, commas, or `·` (middle dot) instead. Em dashes feel AI-generated. He swept the codebase to remove them.
- **No dated content.** No "Winter 26", no "as of May 2026". The "Issue 26" masthead is fine because it's typographic flavor, not a freshness claim.
- **De-emphasize Tampa in CTAs.** Tampa is biographical (lives there, in the About section). Anywhere customer-facing — CTAs, footer, hero — say "Available worldwide" or "Working worldwide". He doesn't want Tampa narrowing his perceived market for remote work.
- **"Hire me" not "Work with me".** Direct. The CTA button text everywhere is "Hire me →".
- **Every "Hire me" opens the Cal.com modal**, not a scroll-to-services intermediate. Wire via `data-cal-link` attribute (see `src/utils/booking.ts` for `getCalAttrs()`).
- **Books link straight to Amazon.** Buy-direct via Lemon Squeezy was scrapped — the overhead wasn't worth it for book sales.

## Data files — where to make common changes

| Change | File | Notes |
|------|------|------|
| Add/remove/reorder albums | `src/data/albums.ts` | Need real Spotify album ID + Apple/Amazon URLs. Set `featured: true` on the one that anchors the Music section. |
| Edit testimonials | `src/data/testimonials.ts` | Three currently real. Just edit text + name + role. The `placeholder` field used to flag "sample" quotes — leave it unset for real ones. |
| Change service pricing | `src/data/services.ts` | Four services. `pricing` field is a free-form string. |
| Edit availability badge ("Open for projects") | `src/data/site.ts` | `availability.status: "open"\|"limited"\|"booked"` + label. Drives HirePill. |
| Swap Cal.com booking | `src/data/site.ts` | `booking.username` + `booking.eventSlug`. Set `booking.enabled: false` to fall back to mailto. |
| Add a book | `src/data/books.ts` + drop cover at `public/media/book-<slug>.webp` | Cover convention is `book-${book.slug}.webp` at 600×900. |
| Update the bio | `src/components/About.astro` | Three paragraphs. Keep the drop cap on paragraph 1. |
| Change career timeline | `src/components/CareerTimeline.astro` | Three eras. Detective 1992-2013, Nurse 2014-2023, AI Creator 2023-Now. Verify dates with Keith — got these wrong once before. |

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

## Booking integration (Cal.com)

The Cal.com modal popup is wired into `Base.astro` via a `<script is:inline>` that runs only when `site.booking.enabled` is true. Buttons opt into the modal by adding three attributes:

```astro
<a
  href={getBookingHref()}
  data-cal-link={`${site.booking.username}/${site.booking.eventSlug}`}
  data-cal-namespace=""
  data-cal-config='{"layout":"month_view","theme":"dark"}'
>Hire me →</a>
```

Use the helpers in `src/utils/booking.ts`:
- `getBookingHref()` → URL (`https://cal.com/<user>/<slug>` if enabled, else `mailto:`)
- `getCalAttrs()` → spread-able attribute object

If `booking.enabled` is false, falls back gracefully to mailto links and the Cal.com script doesn't load.

## DNS (don't break this)

Domain `keithstaggers.com` is registered at **Canva** (yes, really — auto-renews 9/1/2026 for $18.99). DNS is currently managed at Canva with these two records pointing at Vercel:

| Type | Name | Value |
|------|------|------|
| A | @ | 216.198.79.1 |
| CNAME | www | c33d901cfaa6190b.vercel-dns-017.com. |

Domain is disconnected from Canva's "Connected to Canva" website integration — that's important, the integration locks DNS records. **Do not re-enable it.**

A scheduled task is set for **Aug 15, 2026** to start a Canva → Cloudflare transfer (saves ~$9/yr long-term). Don't initiate that early without checking with Keith.

## Recurring gotchas

- **Sandbox mount can't delete files** in Keith's Desktop folder. `rm -rf .git` etc. will fail. Build in `/tmp/kss-verify` and copy back, or have Keith run destructive commands in his Terminal.
- **Spotify iframes can't autoplay.** That's a browser policy, not a bug. The featured album section uses a tall embed (height=400) so the play button is visible.
- **Vercel auto-detects Astro** — no `vercel.json` needed. Don't add one unless you need to override.
- **GitHub repo is public.** Don't commit secrets, API keys, .env files, or anything you wouldn't want on someone's homepage. The .gitignore covers the usual suspects.

## Pending / nice-to-haves

- Newsletter signup is a stub. Wire to ConvertKit/Buttondown/Beehiiv when Keith picks one. Edit `src/components/Newsletter.astro`.
- AI-workflow lead magnet PDF — discussed but not built. Captures emails from visitors not ready to book.
- Vercel Speed Insights — separate from Web Analytics, currently off. Could enable in Vercel dashboard if Keith wants Lighthouse-style perf data.

## How Keith likes to be communicated with

Quote from him: *"Always give me your best advice. Never sugarcoat anything, be agreeable or just tell me what you think i need to hear. I want and need a capable assistant to give it to me straight with no filter. If I say something stupid or have an idea that's dumb, please just tell me."*

So: push back when warranted, recommend the right answer when there's a clearly right one, skip the apologies and hedging. He's not fragile.
