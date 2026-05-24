# Keith Staggers — Personal Site

Editorial-magazine personal site for keithstaggers.com. Built with Astro + Tailwind v4.

## Preview right now (no install needed)

Open `preview-build/index.html` in any browser. That's a static export of the current state — fonts, layout, everything works. The Spotify embeds will load live from open.spotify.com.

## Run the dev server (live reload while editing)

Requires Node 20+ and npm. Install Node from https://nodejs.org if needed.

```bash
cd ~/Desktop/keith-staggers-site
npm install
npm run dev
```

Then open http://localhost:4321.

## Project layout

```
src/
├── pages/
│   └── index.astro            ← the homepage
├── layouts/
│   └── Base.astro             ← HTML shell, font loading, masthead/nav/footer
├── components/
│   ├── Masthead.astro         ← top "IN STUDIO · time" strip
│   ├── Nav.astro              ← logo + nav + Work With Me CTA
│   ├── Hero.astro             ← A body of work, built with AI.
│   ├── TableOfContents.astro  ← Inside this issue.
│   ├── About.astro            ← Detective → Nurse → Creator narrative
│   ├── CareerTimeline.astro   ← three-era timeline
│   ├── PullQuote.astro        ← reusable big-quote component
│   ├── Music.astro            ← featured album + grid (Spotify embeds)
│   ├── Books.astro            ← 3 books with Amazon + Buy Direct buttons
│   ├── Visuals.astro          ← AI photo/film bento grid (placeholders)
│   ├── Services.astro         ← 4 ways to work with you
│   ├── Newsletter.astro       ← Sunday letter signup (stub form)
│   ├── Footer.astro           ← giant wordmark + colophon
│   └── NowPlaying.astro       ← floating live-status pill
├── data/
│   ├── albums.ts              ← real Spotify/Apple/Amazon IDs
│   ├── books.ts               ← real Amazon links
│   └── site.ts                ← nav, email, social, tagline
└── styles/
    └── global.css             ← Tailwind v4 + design tokens (colors, fonts)
```

## Drop in real images

Hero portrait, album covers, book covers, and visuals are placeholders right now. To wire up real images:

1. **Hero portrait** — save your portrait as `public/keith-hero.jpg`, then in `src/components/Hero.astro` replace the placeholder `<aside>` with `<img src="/keith-hero.jpg" alt="Keith Staggers" class="aspect-[4/5] w-full object-cover rounded-sm" />`.
2. **Album covers** — already covered by the Spotify embed iframes.
3. **Book covers** — save as `public/nurse-the-fck-up.jpg`, `public/beyond-burnout.jpg`, `public/leading-with-care.jpg`. Then in `src/components/Books.astro`, replace each placeholder `<div>` with `<img src={`/${book.slug}.jpg`} alt={book.title} class="aspect-[2/3] w-full object-cover rounded-sm" />`.
4. **Visuals tiles** — save 6 images as `public/visuals/01.jpg` through `06.jpg`. In `src/components/Visuals.astro` swap each placeholder `<div>` for an `<img>`.

## Sell books direct (Lemon Squeezy)

1. Sign up at https://lemonsqueezy.com, add each ebook as a digital product, get the buy-link URL.
2. In `src/data/books.ts`, fill in the `directBuyUrl` field for each book. The "Buy direct" button will start working automatically.

## Wire up the newsletter

1. Pick one: ConvertKit, Buttondown, or Beehiiv. Create a form, copy the form action URL.
2. In `src/components/Newsletter.astro`, change the `<form action="#">` to your form action URL, and remove the JS stub at the bottom.

## Deploy to Vercel

1. Push this folder to a GitHub repo:
   ```bash
   git init && git add . && git commit -m "Initial site"
   gh repo create keithstaggers-site --private --source=. --push
   ```
2. Go to https://vercel.com/new, import the repo. Vercel auto-detects Astro. Click Deploy.
3. Once deployed, add your custom domain in Vercel project settings → Domains → add `keithstaggers.com`.
4. Vercel will give you DNS records. Go to wherever your domain is registered (Canva, GoDaddy, etc.), update the nameservers or A/CNAME records as Vercel instructs.
5. SSL is automatic.

## Brand tokens (in `src/styles/global.css`)

| Token | Value | Where it shows up |
|------|------|------|
| `--color-ink` | `#0a0a0a` | Page background |
| `--color-paper` | `#e8e4dc` | Body text |
| `--color-paper-dim` | `#b8b2a6` | Subheads, secondary text |
| `--color-paper-faint` | `#8a847a` | Captions, hints |
| `--color-rule` | `#2a2a2a` | Dividers, borders |
| `--color-amber` | `#c89860` | Accent — sparingly! |

The amber italic accent is reserved for ~6 specific moments per scroll. Resist the urge to use it everywhere.
