# Shady Elagamy — Odoo Portfolio (Demo)

A demo personal portfolio website for an Odoo professional.

## Structure

- Root: Vite + React app (Tailwind CSS)
- `api/contact.js`: Vercel serverless function for the contact form
- `src/data/siteData.js`: all text, skills, projects and links

## Run locally

```bash
npm install
copy .env.example .env   # Windows (use cp on mac/linux)
npm run dev
```

The site runs on http://localhost:2001 (strict port). The contact form works via a
Vite dev middleware that reuses `api/contact.js` (no separate backend needed).

## Build

```bash
npm run build
npm run preview
```

## Content

All text, skills, projects and links live in `src/data/siteData.js`.
Every placeholder is marked with a `REPLACE ME` comment.

## Assets to replace

- Portrait: `src/assets/shady.png` (transparent PNG cut-out). Set `person.avatar` in siteData.
- CV: `public/cv.pdf`.

## Environment variables (.env)

See `.env.example`. If SMTP vars are missing, the contact endpoint logs the
message to the console and returns success (dev mode).
For Vercel deployment, add the same env vars in the project settings.
```