# Project Audit — odoo-portfolio

_Audit date: 2026-11-19. Read-only review: no project files were changed. This file is the only one created._

---

## A. Overview

**What it is:** a one-page personal portfolio for an Odoo Functional Consultant (Shady Elagamy). It scrolls through Hero → About → Experience → Services → Skills → Modules → Process → Projects → Flow → Education → Contact → Footer. It has a light/dark toggle, a lot of motion effects, and a working contact form that sends email.

**Stack (installed versions, from `node_modules`):**

| Library | Version | Used for |
|---|---|---|
| React / React DOM | 18.3.1 | UI |
| Vite | 5.4.21 | Dev server + build |
| Tailwind CSS | **v4** (4.3.5) via `@tailwindcss/vite` | Styling. **No** `tailwind.config.js` or `postcss.config.js`: v4 is set up inside `src/index.css` with `@theme` |
| Framer Motion | 11.18.2 | Animations |
| lucide-react | 0.441.0 | Icons |
| nodemailer | 6.10.1 | Sends contact-form emails (server side) |
| dotenv | 18.0.10 | Loads `.env` for the contact API |

No router, no TypeScript, no linter, no tests, no git repository.

**How to run it** (scripts in `package.json`):

| Command | What it does |
|---|---|
| `npm run dev` | Starts Vite on **http://localhost:2001** (strict port: fails if 2001 is busy). The contact API also works in dev. |
| `npm run build` | Builds the production site into `dist/` |
| `npm run preview` | Serves the built `dist/` locally. Note: the contact form will **not** work in preview (the API middleware only exists in dev). |

Deployment target is **Vercel** (`api/contact.js` is a Vercel serverless function).

---

## B. Structure map

### Root files

```
index.html          Page shell: meta/SEO tags, Google Fonts, favicon, and a tiny script that applies the saved theme before React loads
package.json        Dependencies + scripts
vite.config.js      React + Tailwind plugins, port 2001, and a dev-only middleware that runs api/contact.js at /api/contact
README.md           Short setup notes
.env / .env.example Contact-form email settings (SMTP). Both are currently identical and empty (no secrets present)
.gitignore          Ignores node_modules, .env, dist
api/contact.js      Contact form backend: validates input, rate-limits, sends email via SMTP (or just logs it if SMTP isn't set)
public/favicon.svg  Site icon (purple "network" mark)
dist/               OLD build output from Nov 11 — out of date, safe to ignore
```

### `src/`

```
src/
├── main.jsx                     Starts React, wraps the app in ThemeProvider, loads index.css
├── App.jsx                      Page layout: lists every section in order
├── index.css                    Tailwind v4 import, theme colors (CSS variables), fonts, reduced-motion rules
├── contexts/
│   └── ThemeContext.jsx         Light/dark state, saves it to localStorage, sets data-theme on <html>
├── hooks/
│   └── useContactForm.js        Sends the form to /api/contact and tracks idle/sending/success/error
├── data/
│   └── siteData.js              ALL text content: name, links, experience, services, skills, projects, etc.
├── assets/
│   └── shady.png                Portrait photo (transparent cut-out), 1231×1278, 1.5 MB
└── components/
    ├── Navbar.jsx               Floating glass "pill" navbar, active-link highlight, scroll progress bar, mobile menu, theme toggle
    ├── Hero.jsx                 Name, title, rotating word, location, "Download CV" + "Contact" buttons, portrait card with floating chips, big faded "ODOO" text
    ├── About.jsx                About paragraph + 4 stat boxes (with count-up number)
    ├── Experience.jsx           Vertical timeline of 4 jobs
    ├── Services.jsx             5 service cards (tilt effect)
    ├── Skills.jsx               Grid of 12 skill boxes
    ├── Modules.jsx              6 Odoo module cards (tilt effect)
    ├── Process.jsx              6-step process line that fills as you scroll
    ├── Cases.jsx                5 project cards ("Featured Projects", id="cases")
    ├── FlowDiagram.jsx          "How it connects": SVG of Sales→Inventory→Purchase→Accounting→Reports with moving dots
    ├── Education.jsx            Degree card + languages
    ├── Contact.jsx              Contact form (floating labels + honeypot) + Email/LinkedIn/WhatsApp cards
    ├── Footer.jsx               Dark footer with copyright, "Built by eskdev" link, giant faded first name
    └── ui/
        ├── AmbientBackground.jsx  Fixed blurred color blobs + faint grid behind the page
        ├── CursorGlow.jsx         Soft glow circle that follows the mouse
        ├── Counter.jsx            Counts a number up when it scrolls into view
        ├── MagneticButton.jsx     Button/link that slightly follows the cursor
        ├── Marquee.jsx            Infinite scrolling text strip
        ├── Reveal.jsx             Fade + slide-in wrapper when scrolled into view
        ├── ThemeToggle.jsx        Sun/moon switch
        └── TiltCard.jsx           3D tilt-on-hover card with spotlight
```

### Page order (as rendered by `App.jsx`)

1. `AmbientBackground` + `CursorGlow` (decoration, fixed behind everything)
2. `Navbar`
3. `Hero` — `#hero`
4. `Marquee` (skills text strip) — not a section, inline in App.jsx
5. `About` — `#about`
6. `Experience` — `#experience`
7. `Services` — `#services`
8. `Skills` — `#skills`
9. `Modules` — `#modules`
10. `Process` — `#process`
11. `Cases` — `#cases`
12. `FlowDiagram` — `#flow`
13. `Education` — `#education`
14. `Contact` — `#contact`
15. `Footer`

---

## C. How things work

### Theme (light / dark)
- **Where:** `src/contexts/ThemeContext.jsx` (state) + `src/components/ui/ThemeToggle.jsx` (button) + a small inline script in `index.html`.
- **Default:** **light**. It does *not* follow the computer's dark-mode setting.
- **localStorage key:** `"theme"` with value `"light"` or `"dark"`.
- **How it applies:** dark mode = `data-theme="dark"` on `<html>`; light = no attribute. CSS variables in `index.css` switch based on that attribute.
- **Flash on load:** **No flash** — the inline script in `index.html` sets the theme before the page paints. Good.
- When you click the toggle, a `.theme-switching` class adds a short 250 ms color fade.
- ⚠️ But see Problem #3: Tailwind's `dark:` classes don't follow this toggle.

### Styling
- **Tailwind v4**, configured only in `src/index.css` with `@theme` (no config file).
- **Fonts:** Inter (body, `font-sans`) and Space Grotesk (headings, `font-display`), loaded from Google Fonts.
- **Colors** are CSS variables mapped to Tailwind names (`bg-surface`, `text-primary`, `text-gold`…):

| Token | Light (default) | Dark |
|---|---|---|
| `--bg` | `#F8FAFC` | `#0B0B1A` |
| `--bg-soft` | `#F1F5F9` | `#14142B` |
| `--surface` | `#FFFFFF` | `#14142B` |
| `--surface-2` | `#F1F5F9` | `#1B1B3A` |
| `--text` | `#1F2937` | `#F4F4F8` |
| `--text-text-muted` ⚠️ | `#64748B` | `#A9A9C2` |
| `--border` | `rgba(15,23,42,0.08)` | `rgba(255,255,255,0.12)` |
| `--primary` | `#714B67` | `#714B67` |
| `--primary-soft` | `#EDE7EC` | `#9B6B8E` |
| `--accent` | `#00A09D` | `#017E84` |
| `--gold` | `#A8823F` | `#D9B26F` |
| `--glow` | `rgba(113,75,103,0.18)` | `rgba(168,120,200,0.22)` |
| `--shadow` | `rgba(15,23,42,0.10)` | `rgba(0,0,0,0.45)` |

- **Hard-coded colors outside the tokens:** Footer `#1B1B3A`; Navbar glass `rgba(11,11,26,0.55)` / `bg-white/65`; navbar spotlight `rgba(217,178,111,0.18)`; CursorGlow `rgba(168,120,200,0.28)` / `rgba(113,75,103,0.18)`; error text `text-red-400`; `text-white` on buttons.
- Good news: your new brand colors (`#714B67`, `#00A09D`, `#1F2937`, `#F8FAFC`) are **already** the light-theme values. The "gold" color is used a lot and is not in your new palette.

### Content
- Almost all text lives in **`src/data/siteData.js`** (good). Placeholders are marked `REPLACE ME`.
- **Hard-coded inside components** (not in the data file):
  - Hero: rotating words `["Implementation", "Training", "Support"]`, chips `["Accounting", "ERP Implementation", "Go-live support"]`.
  - Navbar: "Contact" button text; it also filters the nav list down to 3 links in code.
  - Cases: "Details coming soon", "Client project", industry→icon rules.
  - Contact: "Send another"; channel links are overwritten in code from `links` (so the `href`s in `contact.channels` are ignored).
  - Footer: "Built by eskdev" + URL; `footer.note` from data is never shown.
  - `index.html`: page title, description, OG tags.

### Animations
- **Framer Motion:** `Reveal` (fade-in on scroll, used everywhere), `TiltCard` (3D tilt), `MagneticButton`, `Counter` (uses `useInView`), Navbar (hide on scroll, sliding active pill, mobile menu), ThemeToggle (knob slide + icon swap), Hero (entrance + floating chips), Contact (success/error messages).
- **CSS / SVG / JS animations:** `AmbientBackground` (`drift` keyframes), `Marquee` (`marquee` keyframes), FlowDiagram (SVG `<animateMotion>` + `flowdown` keyframes on mobile), Hero badge (`animate-ping`), CursorGlow (requestAnimationFrame loop), Hero "ODOO" parallax (requestAnimationFrame), Process progress line (scroll listener).
- **Reduced motion:** respected in most places (`useReducedMotion` + a global CSS rule). Exception: the SVG dots in FlowDiagram keep moving.

### Contact form
1. User fills name / email / message (plus a hidden "website" honeypot field to catch bots).
2. `useContactForm` sends JSON to `POST /api/contact`.
3. `api/contact.js` checks: POST only → allowed origin → rate limit (5 per 15 min per IP, in memory) → honeypot → validation.
4. **Right now, `.env` has no SMTP settings**, so it runs in **dev mode**: it just prints the message to the terminal and shows "Sent (dev mode: logged to console)." **No email is actually sent.**
5. With SMTP set, it emails `CONTACT_TO` (or the SMTP user) with reply-to = the visitor.

### Assets
| Asset | Path | Notes |
|---|---|---|
| Portrait | `src/assets/shady.png` | 1231×1278 PNG, **1.5 MB**. Used only in Hero. |
| Favicon | `public/favicon.svg` | 8.7 KB SVG; contains leftover `c2pa` metadata |
| CV | `/cv.pdf` (expected in `public/`) | **Missing** — the file does not exist |
| OG image | `/og-image.png` | **Missing** — referenced in `index.html` but not in `public/` |
| Logos | — | None. The navbar "logo" is the initials "SE" in a circle |
| Fonts | Google Fonts CDN | Inter + Space Grotesk |

---

## D. Problems I should know about

| # | Problem | Where | Rating |
|---|---|---|---|
| 1 | **Muted text color is broken everywhere.** The CSS variable is named `--color-text-text-muted` (typo — "text" twice), so Tailwind never creates the `text-text-muted` class used ~50 times. All "grey" text shows as normal dark text instead. Confirmed in the built CSS. | `src/index.css:12` | **High** |
| 2 | **JavaScript bundle is ~1 MB.** `import * as Icons from "lucide-react"` (in Services, Modules, Cases, Contact) pulls in *every* icon (~1,400) instead of the ~20 used. | 4 components | **High** |
| 3 | **`dark:` classes follow the computer, not the toggle.** Tailwind v4's `dark:` uses the OS setting by default. The site uses `data-theme`, but no `@custom-variant dark` is defined. So `AmbientBackground`'s `dark:` blobs are wrong when the two disagree. | `index.css`, `AmbientBackground.jsx` | **Medium** |
| 4 | **"Download CV" button is a dead link** — `public/cv.pdf` doesn't exist (you're removing it anyway). | `Hero.jsx`, `siteData.js` | Medium (goes away with redesign) |
| 5 | **Portrait is 1.5 MB** (shown at ~300 px wide). Should be WebP/AVIF ~50–100 KB. Also has `loading="lazy"` even though it's at the top of the page, which delays it. | `src/assets/shady.png`, `Hero.jsx:166` | **High** |
| 6 | **Contact email is open to HTML injection.** Name and message are inserted into the email HTML without escaping, so someone could send you an email containing fake links/HTML. | `api/contact.js:116` | **Medium** |
| 7 | **No real email sending configured** — form says "sent" but only logs to the terminal. On Vercel, without SMTP vars, messages are silently lost (visitor sees success). | `.env`, `api/contact.js:90` | **High** (for a real site) |
| 8 | **Rate limiting is weak**: in-memory per server instance (resets on Vercel cold starts) and trusts the `x-forwarded-for` header. Fine for a portfolio, not real protection. | `api/contact.js` | Low |
| 9 | `nodemailer` 6.x is old; current major is 7.x, which also contains security fixes. Should be upgraded. | `package.json` | Medium |
| 10 | **Form labels aren't connected to inputs** (no `htmlFor`/`id`), so screen readers can't tell what each field is. | `Contact.jsx:59–76` | **Medium** |
| 11 | **Contact cards: link inside a tilt card** — only the link part is clickable; external links open in a new tab with no warning text. `mailto:` also opens in `_blank` (unnecessary). | `Contact.jsx:126` | Low |
| 12 | **FlowDiagram desktop nodes aren't keyboard accessible** — SVG `<g>` with mouse events, no focus, no role; SVG is `aria-hidden`, so the module names are invisible to screen readers. Also its dots ignore reduced motion. | `FlowDiagram.jsx:46` | Medium |
| 13 | **Low contrast:** primary button hover becomes `bg-primary-soft` = `#EDE7EC` with **white text** in light mode (almost invisible). Gold text `#A8823F` on white ≈ 3.4:1 (fails for small text). `text-text-muted/60` "Details coming soon" is very faint. | `Navbar.jsx:130`, many `text-gold` uses | **Medium** |
| 14 | **Undefined classes:** `text-navy` (navbar initials) and `bg-primary-soft/8` don't exist, so they do nothing. | `Navbar.jsx:93`, `AmbientBackground.jsx:9` | Low |
| 15 | **ThemeToggle has no visible focus ring** (`focus-visible:outline-none` with no replacement), and its extra `onKeyDown` makes Enter/Space toggle twice on some browsers → may do nothing. | `ThemeToggle.jsx:11–26` | Medium |
| 16 | **Navbar scroll handler re-attaches on every scroll** (`lastY` in the effect's dependencies) and updates state constantly → extra re-renders. `nav` in deps is a module constant (harmless but useless). | `Navbar.jsx:22–41` | Low |
| 17 | **Navbar only shows 3 links** (About, Services, Cases). Experience, Skills, Contact etc. aren't reachable from the menu except "Contact" button. | `Navbar.jsx:8` | Low |
| 18 | **Mobile menu doesn't trap focus**; Tab can move behind the overlay. | `Navbar.jsx` | Low |
| 19 | **No `<a href="#main">` skip link** and `<main>` has no id. | `App.jsx` | Low |
| 20 | **Hero `<h1>` rotating word**: `oneLiner.split(" ").slice(0,-1)` chops the last word of your sentence and replaces it — changing the sentence in data gives odd results. Screen readers hear the word change every 2.2s (no `aria-live` control, minor). | `Hero.jsx:107` | Low |
| 21 | **Lots of always-running animation:** CursorGlow runs a requestAnimationFrame loop forever (even when the mouse doesn't move), 3 large blurred blobs animate constantly, plus Marquee and SVG dots. Can drain battery / lag on weak laptops. | `ui/CursorGlow.jsx`, `AmbientBackground.jsx` | Medium |
| 22 | **Duplicated code:** the section heading block (h2 + subtitle in `Reveal`) is copy-pasted in ~10 components; the floating-label markup is repeated 3×; links (email/LinkedIn/WhatsApp) are duplicated in `links` and `contact.channels`. | many | Low |
| 23 | **Unused data / props:** `footer.note`, `person.headline`, `person.summary`, `nav` "Contact" entry (filtered out), `ThemeToggle`'s `compact` prop, `contact.channels[].href`. `person.avatar = "/src/assets/shady.png"` is a dev-only path that would break in production (Hero uses `import.meta.glob` first, so it's currently harmless). | `siteData.js`, `ThemeToggle.jsx` | Low |
| 24 | **`shadow-black/30` in light mode** on cards/forms gives heavy dark shadows on a light page. | Services, Cases, Contact | Low |
| 25 | **Footer is always dark** (`#1B1B3A`) even in light mode — may be intentional. | `Footer.jsx` | Low |
| 26 | **Missing OG image** (`/og-image.png`) → broken link previews on LinkedIn/WhatsApp. | `index.html:28` | Medium |
| 27 | **`dist/` is stale** (built Nov 11, still has an old 21 KB portrait). Don't deploy from it without rebuilding. | `dist/` | Low |
| 28 | **No git repository** — no history/undo for the redesign. | project root | Medium |
| 29 | **`preview` script can't test the contact form** (API only exists in dev middleware). | `vite.config.js` | Low |
| 30 | Personal phone number and email are public in `siteData.js` (expected for a portfolio, just be aware: the WhatsApp number will be scraped). | `siteData.js` | Low |

Nothing secret is leaked: `.env` currently has no values, and `.env` is in `.gitignore`.

---

## E. Reuse vs. rebuild

### Mapping the new design to existing files

| New section | Existing piece | Fit |
|---|---|---|
| Navbar (+ GitHub link, dark toggle) | `Navbar.jsx`, `ThemeToggle.jsx` | Good base, needs cleanup |
| Hero with **3D-tilt Odoo dashboard card** | `Hero.jsx` + `TiltCard.jsx` | Layout reusable; dashboard card is **new**; portrait moves to About |
| **Clients logo marquee** | `ui/Marquee.jsx` (text only) | Needs image/logo support |
| About (**circle photo**) | `About.jsx` + `shady.png` | Modify |
| Experience timeline | `Experience.jsx` | Good, small changes |
| Expertise (**3D hover cards**) | `Services.jsx` / `Modules.jsx` / `Skills.jsx` + `TiltCard` | Merge into one |
| How it connects (flow) | `FlowDiagram.jsx` | Good, fix a11y |
| Projects | `Cases.jsx` | Good, small changes |
| Contact (form + WhatsApp) | `Contact.jsx`, `useContactForm.js`, `api/contact.js` | Good, fix issues |
| Footer | `Footer.jsx` | Modify |

### File-by-file decision

| File | Decision | What / why |
|---|---|---|
| `package.json` | MODIFY | Upgrade nodemailer to 7.x; add a `lint` script optionally |
| `vite.config.js` | KEEP | Works fine |
| `index.html` | MODIFY | Update title/description, add/replace OG image, update `theme-color` |
| `.env.example` | KEEP | |
| `api/contact.js` | MODIFY | Escape HTML in email, keep rest |
| `public/favicon.svg` | MODIFY (optional) | Strip leftover metadata; keep design |
| `src/main.jsx` | KEEP | |
| `src/App.jsx` | MODIFY | New section order; remove Skills/Modules/Process/Education/CursorGlow; add Clients + Expertise |
| `src/index.css` | MODIFY | Fix `text-muted` typo, add `@custom-variant dark`, align palette to brand (drop/replace gold, set slate `#1F2937`), shared helpers |
| `src/contexts/ThemeContext.jsx` | KEEP | Already light-default, saves to localStorage, no flash |
| `src/hooks/useContactForm.js` | KEEP | Maybe drop the "dev mode" message in production |
| `src/data/siteData.js` | MODIFY | Remove `cv` + "Download CV", add `github`, `clients` (logos), `expertise`; remove unused fields; one source for links |
| `src/assets/shady.png` | MODIFY | Convert to small WebP (square crop for circle photo) |
| `components/Navbar.jsx` | MODIFY | Add GitHub icon link, fix scroll effect, fix contrast, update nav links |
| `components/Hero.jsx` | MODIFY (heavy) | Remove CV button + portrait; add dashboard card; keep badge/title/CTA structure |
| `components/About.jsx` | MODIFY | Add circle photo; keep stats/Counter |
| `components/Experience.jsx` | KEEP / small MODIFY | Restyle colors (gold → brand) |
| `components/Services.jsx` | MODIFY → rename to `Expertise.jsx` | Becomes the 3D hover cards section |
| `components/Skills.jsx` | DELETE | Not in new design (fold key skills into Expertise if wanted) |
| `components/Modules.jsx` | DELETE | Not in new design (could feed Expertise or the dashboard card) |
| `components/Process.jsx` | DELETE | Not in new design |
| `components/Cases.jsx` | MODIFY → rename to `Projects.jsx` | Restyle, remove "Details coming soon" |
| `components/FlowDiagram.jsx` | MODIFY | Keyboard/screen-reader access, reduced motion, brand colors |
| `components/Education.jsx` | DELETE | Not in new design (could move one line into About) |
| `components/Contact.jsx` | MODIFY | Label `htmlFor`/`id`, prominent WhatsApp button, named lucide imports |
| `components/Footer.jsx` | MODIFY | Add GitHub, theme-aware colors, show nav links |
| `ui/AmbientBackground.jsx` | MODIFY or DELETE | Lighter version or remove (performance) |
| `ui/CursorGlow.jsx` | DELETE | Not in design; constant CPU use |
| `ui/Counter.jsx` | KEEP | |
| `ui/MagneticButton.jsx` | KEEP | |
| `ui/Marquee.jsx` | MODIFY | Accept logo images, add alt text, fix reduced-motion selector |
| `ui/Reveal.jsx` | KEEP | |
| `ui/ThemeToggle.jsx` | MODIFY | Visible focus ring, remove double key handler |
| `ui/TiltCard.jsx` | KEEP | Used for the dashboard card and expertise cards |
| `dist/` | DELETE (regenerate) | Stale build |

**NEW files needed:**
- `src/components/Clients.jsx` — logo marquee section
- `src/components/Expertise.jsx` — replaces Services (3D hover cards)
- `src/components/ui/DashboardCard.jsx` — the Odoo-style dashboard mock for the Hero
- `src/components/ui/SectionHeading.jsx` — shared title + subtitle (removes duplication)
- `src/assets/clients/*.svg|webp` — client logos (**you need to provide these, with permission to use them**)
- `src/assets/shady.webp` — optimized portrait
- `public/og-image.png` — 1200×630 social preview

### Recommendation: **refactor this project** (don't start fresh)

- The foundation is **solid and modern**: React 18 + Vite 5 + Tailwind v4, a correct no-flash light-default theme, content already in one data file, a working and reasonably safe contact API, and reusable motion helpers (TiltCard, Reveal, Counter, Marquee).
- Your brand colors are **already** the light-theme values.
- About half the new design maps directly onto existing components; the rest is 3–4 new components.
- The problems found are **fixable in small steps** (a typo, icon imports, a missing CSS line, an image conversion) — none require throwing code away.
- Starting fresh would mean rebuilding the theme system, contact API and dev middleware for no real gain.

One exception: `Hero.jsx` will change so much that rewriting its inside is simpler than editing it — but in the same project.

---

## Next steps (proposed — waiting for your approval)

1. **Set up safety:** `git init` + first commit, so every change can be undone.
2. **Fix the foundation bugs:** muted-text typo, `dark:` variant, lucide named imports (bundle size), undefined classes, contrast of hover state.
3. **Update theme + data:** align palette to your 4 brand colors (replace gold), clean `siteData.js` (remove CV, add GitHub, clients, expertise).
4. **Remove unused sections/files:** Skills, Modules, Process, Education, CursorGlow.
5. **Build new pieces:** SectionHeading, DashboardCard (Hero), Clients marquee, Expertise.
6. **Modify existing sections** in page order: Navbar → Hero → About → Experience → Flow → Projects → Contact → Footer.
7. **Assets & SEO:** optimize portrait to WebP, add client logos, OG image, update meta tags.
8. **Contact form hardening:** escape HTML, upgrade nodemailer, connect labels; set SMTP on Vercel.
9. **Check:** build, test light/dark, mobile, keyboard navigation, and reduced motion.

### Questions for you before starting
- Do you have the **client logos** (and permission to show them)? Which clients?
- What is your **GitHub URL**?
- Should **Skills / Modules / Education** content disappear completely, or be folded into Expertise/About?
- Keep the "gold" color as a small extra accent, or use only your 4 brand colors?
- Do you have SMTP details (e.g. Gmail app password) for real email sending, or should the form only open WhatsApp/email?
