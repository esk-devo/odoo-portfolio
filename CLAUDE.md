# Project: Shady El Agamy — Odoo Consultant Landing Page

## Working rules (always)
- **Never push or touch a remote.** No `git push`, no `git remote add`, no creating GitHub repos. Local git only.
- **One step at a time.** After each step: list the files changed + how to test, commit locally, then STOP and wait for "continue".
- Don't install, delete or edit anything outside the approved plan. Don't add libraries beyond the stack without asking.
- If something is unclear, ask instead of guessing.

## What this is
A single-page landing site (English, LTR) for Shady El Agamy, Odoo Functional Consultant (Accounting & ERP), based in Alexandria, Egypt.
Goal: premium, clean, fast. Light mode is the DEFAULT; dark mode via a toggle.
This is a **refactor of the existing project** (see `docs/PROJECT-AUDIT.md`), not a fresh app.

## References
- Spec: `docs/shady-landing-prompts.md` (Prompt 0 = rules, 2–10 = sections, 11 = contact form)
- Design: `docs/design/Desktop — Light.png`, `docs/design/Desktop — Dark.png` (desktop only — mobile is built from the rules below)
- Logo source (exact): `docs/design/shady-logo-light.svg`, `docs/design/shady-logo-dark.svg` (strip the `<metadata>` block when reusing)
- Client brief: `docs/client's brief.pdf`
- Portrait: `src/assets/shady.png` + `src/assets/shady.webp` (use `<picture>`, WebP first)

## Stack
- React 18 + Vite 5 (JavaScript, no TypeScript)
- Tailwind CSS v4 (`@tailwindcss/vite`), tokens via `@theme` + CSS variables (no tailwind.config.js)
- Framer Motion, lucide-react (named imports only — never `import * as Icons`)
- No backend. Deployed on Vercel. Contact form → Web3Forms (last step).

## Brand colors (from the client brief — do NOT change)
- Odoo Purple (primary): #714B67
- Odoo Teal (accent): #00A09D
- Dark Slate (text / dark surfaces): #1F2937
- Light Gray (background): #F8FAFC
- Gold #D4A657 (Tailwind: `bg-accent-gold` / `fill-accent-gold`) — **tiny accent only, in exactly 3 places:** the logo node at (29,82), one dot on the About orbit ring, and the left status strip of the "Stock valuation entry" row in the hero dashboard. Nowhere else.

## Theme tokens (CSS variables, switched by the `.dark` class on <html>)
| token        | light                     | dark                      |
|--------------|---------------------------|---------------------------|
| --bg         | #F8FAFC                   | #111827                   |
| --bg-2       | #F1F5F9                   | #0D1320                   |
| --surface    | #FFFFFF                   | #1F2937                   |
| --border     | #E5E7EB                   | rgba(255,255,255,0.09)    |
| --text       | #1F2937                   | #F8FAFC                   |
| --muted      | #4B5563                   | #CBD5E1                   |
| --subtle     | #5F6B7A                   | #9AA6B6                   |
| --primary-tx | #714B67                   | #D9B3CF                   |
| --teal-tx    | #007C7A                   | #2CC5C1                   |
| --teal-soft  | rgba(0,160,157,0.12)      | rgba(0,160,157,0.16)      |
| --purple-soft| rgba(113,75,103,0.09)     | rgba(113,75,103,0.28)     |
| --glass      | rgba(255,255,255,0.72)    | rgba(31,41,55,0.62)       |
| --glass-bd   | rgba(255,255,255,0.9)     | rgba(255,255,255,0.12)    |
| --logo-node  | #714B67                   | #A97A9C                   |
| --logo-line  | #A99AA5                   | #5E5462                   |

Rules:
- Dark mode = `.dark` on `<html>` + `@custom-variant dark (&:where(.dark, .dark *));`. Default LIGHT, ignore system preference, save in localStorage `"theme"`, inline script in `index.html` applies it before React loads (no flash).
- Buttons: bg #714B67 + white text in BOTH modes.
- Teal #00A09D is for icons/dots/lines only. Teal TEXT uses --teal-tx (contrast).
- Hero background: light = subtle 64px grid lines; dark = NO grid, soft gradient
  (purple radial top-left, teal radial right, base #151B2B → #111827).

## Typography
- Headings: "Sora" 600/700, tight letter-spacing (-0.02em to -0.035em)
- Body: "Inter" 400/500/600
- Both from Google Fonts with `display=swap` + preconnect.

## Sections (in order)
Navbar → Hero → Logo marquee → About → Experience → Expertise → How it connects → Projects → Contact → Footer
Nav links: About, Experience, Expertise, Projects, **How it connects** (label matches the section).

## Content rules
- All copy lives in `src/data/content.js` (no hard-coded text in components). `src/data/siteData.js` is legacy and gets deleted once every section is migrated.
- The person's name is **"Shady El Agamy"** (confirmed, as in the brief). It is defined **once** in `content.js` (`profile.name`) and reused everywhere (navbar, hero, footer, alt text, meta).
- WhatsApp: the card shows only "Chat on WhatsApp". The link uses the number (https://wa.me/201228050845) but the phone number is **never displayed as text** anywhere on the page.
- Stats: "2+ Years hands-on with Odoo", "10 Live implementation projects", "4 Odoo partners worked with", "2 Countries — Egypt & KSA".
- Clients marquee: **clients only** — YAM Automotive, Xpert Logistics, OZ Veterinary, Mabrouka, Daira Rahal, Abu El-Khair, Ajiad, Al Marakhia, Al Dawliya. (Employers Ramz, Transformix, ERP Bank, I Solutions appear only in Experience.) Initials badge until logos arrive.
- About tags: Accounting & financial flow · Business process analysis · Training & go-live · Client relationship management.
- Studio card pills: Views editing (XML) · Business logic (Python) · Report customization · User training & go-live · Process analysis · Odoo configuration.
- About also holds the Education / Languages row.
- LinkedIn: https://www.linkedin.com/in/shady-elagamy/ · GitHub placeholder: https://github.com/TODO
- No "Download CV" button anywhere.

## Responsive rules
Breakpoints: mobile < 640px, tablet 640–1023px, desktop ≥ 1024px. Navbar collapses below 900px (custom breakpoint).
Test widths: 360, 390, 768, 1024, 1280.

- **Navbar:** logo + name left; theme toggle + hamburger right. "Let's talk" moves inside the menu sheet (focus trap, Esc closes, body scroll lock).
- **Hero:** stacked — text first, dashboard card under it. Card max-width 100%, NO tilt on touch, floating chips stay inside the screen (no horizontal scroll). H1 uses clamp() so the name never breaks badly.
- **Stats:** 2×2 grid on mobile, 4 in a row on desktop.
- **Marquee:** same, tiles 56px tall on mobile (64px desktop).
- **About:** photo on top (max-width ~320px, centered), text under it. Chips stay inside the photo box.
- **Experience:** same timeline, smaller gaps.
- **Expertise:** 1 column on mobile (no spans), 2 on tablet, 3 on desktop. Accounting and Studio span 2 columns on desktop only.
- **How it connects:** VERTICAL on mobile and tablet (line on the left, nodes stacked), horizontal on desktop only.
- **Projects:** 1 / 2 / 3 columns.
- **Contact:** stacked — channel cards first, form under them. LinkedIn and GitHub stay side by side.
- **Footer:** stacked and centered on mobile.
- **Global:** no horizontal scroll at any width, touch targets ≥ 44px, body text ≥ 16px.

## Code rules
- Small, readable components in `src/components/` (shared bits in `src/components/ui/`).
- Accessibility: semantic tags, real <button>/<a>, aria-label on icon-only buttons, visible focus rings, text contrast ≥ 4.5:1 in both themes.
- Respect `prefers-reduced-motion` for EVERY animation.
- Prefer the simplest solution.
- After each task: list the files you changed and how to test it.

## Plan (one step at a time)
1. ✅ Safety: local git + this file
2. Foundation: tokens, `.dark`, fonts, audit bug fixes, `content.js`
3. Logo, favicon, Navbar, Footer
4. Hero + dashboard card + stats
5. Clients marquee
6. About + Experience
7. Expertise (TiltCard upgrade) — remove Services/Skills/Modules
8. How it connects (rework Process + FlowDiagram)
9. Projects (flags + CTA card) — remove Cases
10. Contact layout (channel cards; existing form re-coloured only) — remove CursorGlow, AmbientBackground, Education
11. Polish: SEO, OG image, skip link, MotionConfig, contrast, delete `siteData.js`, build check
12. Contact form LAST: labels, Company field, validation, `src/lib/sendMessage.js` → Web3Forms; remove `api/contact.js`, nodemailer, dotenv

## TODO (to confirm with Shady / add later)
- [ ] GitHub URL (placeholder `https://github.com/TODO`)
- [ ] Client logos (SVGs in `/public/logos`, plus permission to show them)
- [ ] Qatar: any confirmed project there? (stats currently say "2 countries — Egypt & KSA")
- [ ] Project countries — confirm Egypt for: YAM Automotive, OZ Veterinary, Mabrouka & Daira Rahal, Abu El-Khair · Ajiad · Al Marakhia · Al Dawliya
- [ ] Web3Forms access key (`VITE_WEB3FORMS_KEY`)
