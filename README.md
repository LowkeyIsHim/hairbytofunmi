# 💜 HairByTofunmi: Premium Hair Styling

This repository contains the complete, production-ready website for "HairByTofunmi," a premium female hair stylist brand. It is built with **Next.js 14 (App Router)**, **Tailwind CSS** for styling, and **Supabase** for a free-tier, real-time backend.

## ✨ Features

* **Premium Design:** Elegant, feminine aesthetic with a deep violet and rose gold palette.
* **Real-time Public Site:** Public pages (Services, Portfolio) update immediately when the Admin makes a change.
* **Secure Admin Panel:** Login via email Magic Link (passwordless).
* **Full CRUD:** Stylist can Create, Read, Update, and Delete hair styles.
* **Settings Management:** Admin can update Bio, Working Hours, and Social Links.
* **WhatsApp Booking:** Every style and portfolio item has a direct "Book on WhatsApp" CTA with a pre-filled message.
* **Mobile-Responsive:** Optimized for all devices.
* **SEO:** Full SEO/Open Graph metadata support.

## 🚀 Setup and Deployment

### 1. Prerequisites

* Node.js (LTS version)
* GitHub Account (for deployment)
* Vercel Account (for free hosting)
* **Supabase Project (for backend)**

### 2. Supabase Backend Setup

1.  **Create a Project:** Go to [Supabase](https://supabase.com/) and create a new project.
2.  **Get Credentials:** Navigate to **Project Settings -> API**. Copy your **Project URL** and **`anon` public key**.
3.  **Get Service Role Key:** In the same place, copy the **`service_role` key (Secret)**. **DO NOT expose this key in public code.**
4.  **Database Schema:** Use the **SQL Editor** to run the schema creation and seed data scripts provided in the **Database Setup Instructions** section above.
    * **Crucial:** Set up **Row Level Security (RLS)** as described to protect your data.

### 3. Environment Variables

Create a file named `.env.local` in the root of your project and populate it with your keys:

