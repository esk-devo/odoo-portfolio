# Shady El Agamy — Landing Page · Build Prompts

> **إزاي تستخدم الملف ده:**
> 1. اعمل فولدر جديد للمشروع وافتحه في VS Code.
> 2. انسخ **Prompt 0** وحطه في ملف `CLAUDE.md` في root المشروع (ده الـ context الثابت لكل البرومتس).
> 3. نفّذ البرومتس بالترتيب **واحد واحد**. بعد كل برومبت: شغّل `npm run dev`، افتح المتصفح، اتأكد إن كل حاجة تمام، واعمل `git commit`.
> 4. ماتدمجش برومتين في مرة واحدة — كل مرحلة صغيرة أسهل في المراجعة.
>
> الديزاين المرجعي: الـ canvas على Claude Design (Desktop Light / Dark / Mobile / Logo / About).

---

## Prompt 0 — Project context (save as `CLAUDE.md`)

```md
# Project: Shady El Agamy — Odoo Consultant Landing Page

## What this is
A single-page landing site (English, LTR) for Shady El Agamy, Odoo Functional Consultant (Accounting & ERP), based in Alexandria, Egypt.
Goal: premium, clean, fast. Light mode is the DEFAULT; dark mode via a toggle.

## Stack
- React + Vite (JavaScript, no TypeScript)
- Tailwind CSS v4 (`@tailwindcss/vite`), theme tokens via `@theme` + CSS variables
- Framer Motion for animations
- lucide-react for icons
- No backend. Deployed on Vercel.

## Brand colors (from the client brief — do NOT change)
- Odoo Purple (primary): #714B67
- Odoo Teal (accent): #00A09D
- Dark Slate (text / dark surfaces): #1F2937
- Light Gray (background): #F8FAFC
- Logo accent node (gold): #D4A657

## Theme tokens (CSS variables, switched by `.dark` on <html>)
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
- Buttons: bg #714B67 + white text in BOTH modes.
- Teal #00A09D is for icons/dots/lines only. Teal TEXT uses --teal-tx (contrast).
- Hero background: light = subtle 64px grid lines; dark = NO grid, soft gradient
  (purple radial top-left, teal radial right, base #151B2B → #111827).

## Typography
- Headings: "Sora" 600/700, tight letter-spacing (-0.02em to -0.035em)
- Body: "Inter" 400/500/600
- Load both from Google Fonts with `display=swap` + preconnect.

## Sections (in order)
Navbar → Hero → Logo marquee → About → Experience → Expertise → How it connects → Projects → Contact → Footer

## Code rules
- Small, readable components in `src/components/`. Content lives in `src/data/content.js` (no hard-coded copy inside components).
- Mobile-first + fully responsive (test 360px, 768px, 1280px).
- Accessibility: semantic tags, real <button>/<a>, aria-label on icon-only buttons, visible focus rings, text contrast ≥ 4.5:1.
- Respect `prefers-reduced-motion` for EVERY animation.
- No "Download CV" button anywhere.
- Prefer the simplest solution; don't add libraries beyond the stack without asking.
- After each task: list the files you changed and how to test it.
```

---

## Prompt 1 — Setup + theme

```
Read CLAUDE.md first.

Set up the project:
1. Create a Vite + React (JavaScript) app in the current folder.
2. Install: tailwindcss @tailwindcss/vite framer-motion lucide-react.
3. Configure Tailwind v4 in vite.config.js and src/index.css:
   - Define all theme tokens from CLAUDE.md as CSS variables on :root and .dark.
   - Map them in @theme so I can use classes like bg-bg, bg-surface, text-muted, border-border, text-primary-tx, text-teal-tx.
   - Add the dark variant: @custom-variant dark (&:where(.dark, .dark *));
   - Add font families: font-display (Sora), font-sans (Inter).
4. Theme handling:
   - Default is LIGHT (ignore system preference).
   - Save the choice in localStorage ("theme").
   - Add a tiny inline script in index.html <head> that applies the saved theme BEFORE React loads (no flash).
   - Create src/hooks/useTheme.js exporting { theme, toggleTheme }.
5. Create src/data/content.js with this content (export named objects):

profile = {
  name: "Shady El Agamy",
  role: "Odoo Functional Consultant · Accounting & ERP",
  location: "Alexandria, Egypt",
  availability: "Open to work · Alexandria, Egypt · Remote & on-site",
  intro: "I turn business requirements into working Odoo systems — configured, customized, tested, and supported from requirements gathering all the way to go-live.",
  email: "shadyelagamy921@gmail.com",
  phone: "+20 122 805 0845",
  whatsapp: "https://wa.me/201228050845",
  github: "https://github.com/GITHUB_USERNAME",     // TODO
  linkedin: "https://www.linkedin.com/in/LINKEDIN", // TODO
}

stats = [
  { value: "2+", label: "Years hands-on with Odoo" },
  { value: "10", label: "Live implementation projects" },
  { value: "4",  label: "Odoo partners worked with" },
  { value: "3",  label: "Countries — Egypt, KSA, Qatar" },
]

clients = ["YAM Automotive","Xpert Logistics","OZ Veterinary","Mabrouka","Daira Rahal","Abu El-Khair","Ajiad","Al Marakhia","Al Dawliya","Ramz","Transformix","ERP Bank","I Solutions"]
// each item later gets an optional `logo` (svg path in /public/logos). For now show initials + name.

about = {
  title: "Making Odoo actually work for the people using it.",
  text: "I'm an Odoo Implementer and Technical Support Specialist with 2 years of experience in configuration, customization, implementation, user training and business process analysis. I gather requirements, configure the right modules, test, troubleshoot — and stay with clients through go-live.",
  tags: ["Accounting & financial flow","Business process analysis","Training & go-live"],
  education: "Bachelor of Information Technology",
  languages: "Arabic (Native) · English (Good)",
}

experience = [
  { role: "Odoo Implementer", company: "Ramz", current: true, text: "End-to-end implementation projects — requirements gathering, configuration, testing, training and go-live support." },
  { role: "Odoo Implementer", company: "Transformix", text: "Full-cycle implementations across industries; simple custom modules and custom views for client operations." },
  { role: "Odoo Technical Support", company: "ERP Bank", text: "Daily operational support and troubleshooting; improved automated workflows and overall system performance." },
  { role: "Odoo Implementer & Support", company: "I Solutions", text: "Configured Sales, Inventory, Purchase and HR; customized views and reports, and trained users." },
]

modules = [
  { key: "accounting", title: "Accounting & Financial Flow", text: "Chart of accounts, taxes, journals, invoicing and reconciliation — wired so every sale, purchase and stock move posts correctly.", featured: true },
  { key: "inventory", title: "Inventory", text: "Warehouses, routes and valuation." },
  { key: "sales", title: "Sales", text: "Quotations, pricelists, orders." },
  { key: "purchase", title: "Purchase", text: "RFQs, vendor bills, replenishment." },
  { key: "pos", title: "Point of Sale", text: "Restaurants, clinics and retail." },
  { key: "hr", title: "HR", text: "Employees, contracts, attendance." },
  { key: "studio", title: "Studio & customization", tags: ["Views editing (XML)","Business logic (Python)","Report customization","User training & go-live","Process analysis"], wide: true },
]

flow = [
  { key: "sales", title: "Sales", text: "Quotation becomes an order" },
  { key: "inventory", title: "Inventory", text: "Delivery and stock moves" },
  { key: "purchase", title: "Purchase", text: "Replenishment and vendor bills" },
  { key: "accounting", title: "Accounting", text: "Journal entries post automatically", highlight: true },
  { key: "reports", title: "Reports", text: "P&L and balance sheet, live" },
]

projects = [
  { name: "YAM Automotive Spare Parts", industry: "Auto parts & trading", icon: "wrench", country: "EG", modules: ["Inventory","Sales","Purchase","Accounting"] },
  { name: "Xpert Logistics", industry: "Logistics & shipping", icon: "truck", country: "SA", modules: ["Accounting","Invoicing","Operations","Custom reports"] },
  { name: "OZ Veterinary Clinic", industry: "Veterinary & healthcare", icon: "heart-pulse", country: "EG", modules: ["POS","Inventory","Services invoicing"] },
  { name: "Mabrouka & Daira Rahal", industry: "Restaurants · F&B", icon: "utensils", country: "EG", modules: ["Odoo POS","Accounting","Inventory"] },
  { name: "Abu El-Khair · Ajiad · Al Marakhia · Al Dawliya", industry: "Trading, import & services", icon: "building", country: "EG", modules: ["Full cycle","Sales","Purchase","HR","Accounting"] },
]

6. Clean the default Vite boilerplate. App.jsx renders an empty <main> for now.
Then tell me exactly which commands to run (in PowerShell) and what I should see.
```

---

## Prompt 2 — Logo, Navbar, Footer

```
Read CLAUDE.md first.

1. Create src/components/Logo.jsx — an inline SVG "node network" mark, viewBox 0 0 100 100:
   - 5 lines from center (50,52) to: (50,16) (16,41) (84,41) (29,82) (71,82); stroke var(--logo-line), width 5, round caps.
   - center circle r=15 and 4 outer circles r=8 filled var(--logo-node).
   - the circle at (29,82) is gold #D4A657.
   - props: size (default 32), className. aria-hidden by default.
   - Also put the same SVG as public/favicon.svg (light colors) and link it in index.html.

2. Navbar (sticky, top-4, floating pill):
   - max-w-[1200px], rounded-full, glass background (var(--glass) + backdrop-blur), 1px border, soft shadow.
   - Left: Logo + "Shady El Agamy" (Sora 600).
   - Center: links About, Experience, Expertise, Projects, How it works (smooth-scroll to section ids). Highlight the active section while scrolling (IntersectionObserver).
   - Right: GitHub icon link (hidden on mobile), theme toggle button (sun/moon icon, animated swap with Framer Motion, aria-label changes with state), "Let's talk" button (purple) → #contact.
   - Mobile (<900px): hide center links, show a hamburger that opens an accessible menu sheet (focus trap, Esc to close, body scroll lock).

3. Footer: top border; Logo (24px) + "© {current year} Shady El Agamy. All rights reserved." on the left; "Built by eskdev" (link to https://eskdev.vercel.app/) on the right. Stack on mobile.

Add `scroll-margin-top` to sections so the sticky navbar doesn't cover headings.
```

---

## Prompt 3 — Hero + 3D tilt dashboard

```
Read CLAUDE.md first.

Build src/components/Hero.jsx (id="top"):

Layout: max-w-[1200px], two columns on desktop (text left, card right), stacked on mobile.
Background: light = 64px grid lines (rgba(31,41,55,0.045)); dark = no grid, radial gradients
(purple at 12% 0%, teal at 92% 35%) over linear #151B2B → #111827.

Left column:
- Availability pill with a teal dot (with a soft ring).
- H1 "Shady<br/>El Agamy" — Sora 700, clamp(48px, 7vw, 88px), line-height 1.02.
- Role line (Sora 500), intro paragraph (muted, max-w ~540px).
- Buttons: "Start a project" (purple, arrow icon → #contact) and "WhatsApp" (outlined, teal icon → profile.whatsapp, target _blank, rel noopener).
- Row of 44px icon links: GitHub, LinkedIn, Email.

Right column — "Accounting Dashboard" glass card with 3D TILT:
- Wrapper has perspective 1200px. The card follows the mouse:
  use Framer Motion useMotionValue + useSpring + useTransform → rotateX ±5°, rotateY ±6°; reset to 0 on mouse leave.
  Disable tilt on touch devices and when prefers-reduced-motion.
- Card content: header (purple calculator icon box + "Accounting Dashboard" / "Odoo 18 · this month" + 3 small dots),
  a mini bar chart (6 pairs of bars purple/teal, NO numbers, animate heights in on first view),
  3 rows: "Customer invoice — Posted", "Vendor bill — Posted", "Stock valuation entry — Draft" (status pills).
- Two floating glass chips with translateZ for depth (transform-style: preserve-3d):
  top-left "Journal entry created / automatically on invoice" (teal check),
  bottom-right mini flow "Sale → Delivery → Invoice".
- Soft blurred purple/teal glow behind the card.

Under both columns: stats bar (4 items from content.stats) in one rounded card with dividers; numbers count up once when visible.

Entrance animation: text items fade/slide up with a small stagger; card fades in + scales from 0.96.
```

---

## Prompt 4 — Clients marquee

```
Read CLAUDE.md first.

Build src/components/ClientsMarquee.jsx under the hero:
- Small uppercase caption: "Trusted by teams in automotive, logistics, healthcare & F&B".
- Infinite horizontal marquee of content.clients (render the list twice for a seamless loop, CSS keyframes translateX(0 → -50%), ~48s linear).
- Each item: rounded-2xl tile, 64px tall, border + surface bg; if item has a logo show <img> (grayscale, opacity 70%, full color on hover), else show an initials badge (purple-soft bg) + name in Sora 600.
- Edges fade out with mask-image linear-gradient.
- Pause on hover; NO animation when prefers-reduced-motion (then allow horizontal scroll instead).
- The duplicated list must be aria-hidden so screen readers read each client once.
```

---

## Prompt 5 — About (circle photo) + Experience

```
Read CLAUDE.md first. The photo is at src/assets/shady.png (transparent PNG — I'll add it).

Build src/components/About.jsx (id="about", background var(--bg-2)):
Desktop: photo left, text right. Mobile: photo on top.

Photo block (the "pop-out circle"):
- Container: width 100%, max-width 440px, aspect-ratio 440/540, position relative.
- Inner wrapper: absolute inset-0, overflow hidden, border-radius "0 0 50% 50% / 0 0 40.7% 40.7%" (rectangle top, circle bottom).
- Inside it: a circle at the bottom (width 100%, aspect-ratio 1) with linear-gradient(150deg, #714B67 0%, #8E5F82 45%, #00A09D 100%),
  and the photo absolutely positioned: left -5%, bottom -1.85%, width 110% — so the head pops OUT above the circle.
- Behind: a dashed orbit ring (width 113.6%, aspect 1, left -6.8%, bottom -3.7%) with 3 small dots (teal, gold, purple) that rotates slowly (40s).
- Two floating glass chips (gentle up/down float, 5s, second one delayed):
  "Odoo Implementer / Currently at Ramz" (top-right) and "10 live Odoo projects" (bottom-left).
- Photo: loading="lazy", width/height set, alt="Shady El Agamy". Export a WebP version too and use <picture>.

Text: eyebrow "01 — About me" (teal-tx, uppercase, tracking), H2 about.title, paragraph, tag pills,
a 2-col row (Education / Languages) with a top border, buttons "Work with me" (purple → #contact) and "GitHub" (outlined).

Then src/components/Experience.jsx (id="experience"): eyebrow "02 — Experience", H2 "Where I've implemented Odoo.",
vertical timeline (max-w 820px) from content.experience: dot + line on the left, role — company, "Current" teal pill for the current job.
Items reveal on scroll (fade + slide, stagger).
```

---

## Prompt 6 — Expertise + 3D hover cards

```
Read CLAUDE.md first.

1. Create a reusable src/components/ui/TiltCard.jsx:
   - Framer Motion card that tilts toward the mouse (rotateX/rotateY max ~6°, spring), lifts by translateY(-6px) and gets a stronger purple-tinted shadow on hover.
   - Optional glare: a radial white highlight that follows the mouse (low opacity).
   - Disabled on touch devices and with prefers-reduced-motion (falls back to a simple shadow change).
   - Accepts `as` (div/article/a), className, children.

2. Build src/components/Expertise.jsx (id="expertise"):
   - Eyebrow "03 — Expertise", H2 "The modules I configure, customize and support.", side note "Accounting is the core — everything else is set up so the numbers land in the right place."
   - Grid (1 col mobile, 2 tablet, 3-4 desktop) of TiltCards from content.modules with lucide icons
     (Calculator, Package, TrendingUp, ShoppingCart, Receipt, Users, Code2).
   - The Accounting card is FEATURED: spans 2 columns, solid #714B67 bg, white text.
   - The Studio card spans 2 columns and shows its tags as pills.
   - Icon boxes alternate purple-soft / teal-soft backgrounds.
```

---

## Prompt 7 — How it connects (flow)

```
Read CLAUDE.md first.

Build src/components/HowItConnects.jsx (id="process", background var(--bg-2)):
- Centered eyebrow "04 — How it connects", H2 "One core system. Every department in sync.", subtitle.
- Horizontal flow of 5 steps from content.flow, as an <ol>: 72px circle nodes with icons, title, short text under each.
- Connector line between nodes: teal → border gradient. When the section enters the viewport, animate the line drawing left-to-right
  and light up each node in sequence (Framer Motion, stagger ~0.25s).
- The Accounting node is highlighted (solid purple, white icon, soft ring).
- Mobile: switch to a VERTICAL flow (line on the left, nodes stacked) — don't let the horizontal line break.
```

---

## Prompt 8 — Projects

```
Read CLAUDE.md first.

Build src/components/Projects.jsx (id="projects"):
- Eyebrow "05 — Featured projects", H2 "Real implementations, real industries."
- Responsive grid (1 / 2 / 3 cols) of TiltCards (as="article") from content.projects:
  icon box (lucide: Wrench, Truck, HeartPulse, UtensilsCrossed, Building2), country flag + name on the right,
  H3 name, industry text, module pills at the bottom (margin-top: auto so pills align).
- Flags: small 22×15 components drawn with divs/SVG (EG: red/white/black stripes; SA: green). No emoji, no external images.
- Last card is a CTA link: dashed purple border, purple-soft bg, "Your company could be next." + "Discuss your Odoo project ↗" → #contact.
- Cards reveal on scroll with stagger.
```

---

## Prompt 9 — Contact (UI only for now)

```
Read CLAUDE.md first.

Build src/components/Contact.jsx (id="contact", background var(--bg-2)):
Left: eyebrow "06 — Contact", H2 "Have an Odoo project or an opportunity? Let's talk.", then:
- Big teal WhatsApp card (icon, "Chat on WhatsApp", phone number, arrow) → profile.whatsapp
- Email card → mailto:
- Two half-width cards: LinkedIn, GitHub

Right: form card with real <label>s: Full name, Email, Company (optional), Message (textarea), "Send message" button (purple, send icon).
- Client-side validation (required fields, email format) with accessible inline errors (aria-invalid, aria-describedby).
- Include a hidden honeypot field for spam.
- For now, on submit: just show a success state (no network call). Keep the submit logic in one function `sendMessage(data)` in src/lib/sendMessage.js so we can plug the email service in later.
- Button shows a loading state while sending.
```

---

## Prompt 10 — Polish, SEO, deploy

```
Read CLAUDE.md first.

1. SEO in index.html: <title> "Shady El Agamy — Odoo Functional Consultant | Accounting & ERP", meta description,
   canonical, Open Graph + Twitter tags (create a 1200×630 og-image.png placeholder in /public), theme-color for light & dark,
   and JSON-LD "Person" schema (name, jobTitle, address Alexandria EG, email, sameAs GitHub/LinkedIn).
2. Performance: lazy-load images below the fold, preload the Sora/Inter fonts used above the fold, make sure Lighthouse ≥ 95 on all 4 scores.
3. Accessibility pass: one H1, logical heading order, skip-to-content link, focus-visible styles, color contrast check in BOTH themes.
4. Animations: wrap the app in <MotionConfig reducedMotion="user">.
5. Add a vercel.json only if needed. Give me the steps to deploy on Vercel from GitHub.
List anything you couldn't verify.
```

---

## Prompt 11 — (Later) Connect the form to Shady's email — no backend

```
Read CLAUDE.md first.

Connect the contact form to email WITHOUT a backend using Web3Forms:
- Use the env variable VITE_WEB3FORMS_KEY (add it to .env.local and .env.example; .env.local must be in .gitignore).
- Implement src/lib/sendMessage.js: POST JSON to https://api.web3forms.com/submit with access_key, name, email, company, message,
  subject "New message from shadyelagamy portfolio", and the honeypot field as "botcheck".
- Handle success / error states in the UI (error message + retry).
- Explain how Shady gets the access key (he enters his email on web3forms.com) and how to add the env variable on Vercel.
```
