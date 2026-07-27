# Aura Beauty Lounge — Website

A premium, mobile-first salon website for **Aura Beauty Lounge, Pune**, built with
**React + Vite + Tailwind CSS + Firebase**, and ready to deploy on **Vercel**.

Every feature works out of the box against **mock data and local storage** — no
backend setup required to try it. Three clearly-marked places let you switch each
piece over to real services when you're ready. Nothing else needs to change.

## What's included

- Home, About, Services, Pricing, Gallery (with lightbox), Bridal Makeup, Testimonials,
  Offers (with live countdowns), Contact, Google Maps embed, Instagram feed, floating
  WhatsApp button
- **AI Skin Quiz** — 3-step quiz, rule-based recommendation engine (`src/data/mockData.js`)
- **AI Hairstyle Recommender** — face shape + hair length + occasion → style suggestion
- **Online Booking** — quick form *or* a conversational **AI Concierge chat** that calls
  a real Claude API endpoint (`/api/booking-agent`) to gather details and confirm bookings
- **Staff login + bookings dashboard** — mock auth seeded with a demo account, swaps to
  real Firebase Auth automatically once configured
- SEO: meta tags, Open Graph tags, and `BeautySalon` structured data in `index.html`

## Run it locally

```bash
npm install
npm run dev
```

Open the printed localhost URL. Everything — booking, login, the AI quiz/finder — works
immediately using mock data stored in your browser's `localStorage`.

## The 3 things to replace when you're ready

### 1. Firebase (bookings, staff login)
File: `src/firebase.js` (values sourced from `.env`)

1. Create a project at https://console.firebase.google.com
2. Enable **Firestore** and **Authentication → Email/Password**
3. Copy your web app config into a `.env` file (copy `.env.example` → `.env` first):
   ```
   VITE_FIREBASE_API_KEY=...
   VITE_FIREBASE_AUTH_DOMAIN=...
   VITE_FIREBASE_PROJECT_ID=...
   VITE_FIREBASE_STORAGE_BUCKET=...
   VITE_FIREBASE_MESSAGING_SENDER_ID=...
   VITE_FIREBASE_APP_ID=...
   ```
4. Create a staff user under Authentication → Users (e.g. your salon manager's email)

That's it — `isFirebaseConfigured` in `src/firebase.js` flips to `true` automatically and
every booking / login call switches from `localStorage` to real Firestore/Auth, with the
exact same function signatures (`saveBooking`, `getBookings`, `signIn`, ...).

### 2. Vercel deployment
File: `vercel.json` (already configured for this project)

1. Push this folder to a GitHub repo
2. Import it at https://vercel.com/new
3. Vercel auto-detects Vite; it will use the `vercel.json` already in this repo
4. Add your environment variables (from `.env`) under Project → Settings →
   Environment Variables — including `ANTHROPIC_API_KEY` (server-only, no `VITE_` prefix)
5. Deploy

### 3. API keys (AI concierge, WhatsApp, Maps, Instagram)

| Feature | Variable | Where it's used |
|---|---|---|
| AI booking concierge | `ANTHROPIC_API_KEY` | `api/booking-agent.js` (server-side only) |
| WhatsApp button + booking confirmations | `VITE_WHATSAPP_NUMBER` | `src/data/mockData.js` |
| Google Maps embed | `VITE_GOOGLE_MAPS_EMBED_URL` | `src/components/MapSection.jsx` |
| Instagram live feed | `VITE_INSTAGRAM_ACCESS_TOKEN` | `src/components/InstagramFeed.jsx` |

Without `ANTHROPIC_API_KEY`, the AI Concierge chat still works — it automatically falls
back to a local rule-based assistant (`localMockReply` in `BookingAIAgent.jsx`) so demos
and local development never break.

Without an Instagram token, the feed shows a curated placeholder grid built from the
gallery images — swap in a real token any time with no code changes.

## Local dev with the live AI agent

The AI concierge calls a Vercel serverless function (`/api/booking-agent.js`), which
Vite's dev server doesn't run on its own. To test it locally with the real Claude API:

```bash
npm install -g vercel
vercel dev
```

This serves both the Vite frontend and the `/api` function together, reading
`ANTHROPIC_API_KEY` from your `.env`.

## Project structure

```
aura-beauty-lounge/
├── api/booking-agent.js       # Serverless AI concierge endpoint (Vercel function)
├── public/                    # Favicon, add og-image.jpg here for social previews
├── src/
│   ├── components/            # One file per section (Hero, Services, Booking, ...)
│   ├── data/mockData.js       # ALL salon content — services, pricing, gallery, copy
│   ├── hooks/useInView.js     # Scroll-reveal animation hook
│   ├── firebase.js            # Firebase config + mock/real data layer
│   ├── App.jsx
│   └── index.css
├── .env.example                # Copy to .env and fill in real values
├── tailwind.config.js          # Pink/white/gold design tokens
└── vercel.json
```

## Editing content

Almost everything — services, prices, gallery images, testimonials, offers, salon
address/hours — lives in one file: `src/data/mockData.js`. Edit that file and the whole
site updates; no need to touch individual components for routine content changes.
