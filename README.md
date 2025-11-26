# HairByTofunmi — Premium Stylist Website

A production-ready Next.js website + admin panel for HairByTofunmi. Uses Supabase for auth and realtime database. Deploy frontend to Vercel (free). Admin manages hairstyle entries using image URLs (no uploads). Booking is via WhatsApp.

---

## Features

- Public website: Home, Services, Portfolio, About, Contact
- Admin panel: magic-link login (email), create/edit/delete hairstyles (image URL only), update bio & contact settings
- Realtime updates: changes in admin reflect on public site across devices immediately via Supabase Realtime
- WhatsApp booking: single-click booking with prefilled message
- SEO & Open Graph meta tags
- Accessible & mobile-responsive, feminine/premium design
- Seed script to populate initial content

---

## Tech stack

- Next.js (React)
- Tailwind CSS
- Supabase (Auth + Postgres + Realtime)
- Deployable to Vercel (free plan)

---

## Setup — Local development

1. **Clone repository**
```bash
git clone <your-repo-url>
cd hairbytofunmi
