# 🎀 HairByTofunmi - Premium Hairstylist Portfolio

A modern, mobile-responsive, and premium website for a female hair stylist, featuring a real-time admin panel for managing hair styles.

## ✨ Tech Stack

* **Frontend:** Next.js (App Router)
* **Styling:** Tailwind CSS
* **Backend & DB:** Supabase (PostgreSQL, Realtime, Auth)
* **Deployment:** Vercel (Frontend)

## 🌟 Features

* **Real-time Updates:** Changes in the admin panel reflect instantly on the public site using Supabase Realtime.
* **Secure Admin Panel:** Protected routes for managing styles, bio, and settings.
* **Zero-Cost Deployment:** Utilizes Vercel and Supabase free tiers.
* **WhatsApp Booking:** Direct booking functionality via WhatsApp with pre-filled messages.
* **Premium UX:** Elegant animations, mobile-first design, and a feminine color palette.

## 🚀 Setup and Deployment

### 1. Supabase Project Setup

This project uses **Supabase** for the database, authentication, and real-time features.

1.  **Create a Project:** Go to [Supabase](https://app.supabase.io/) and create a new project.
2.  **Get Credentials:**
    * Navigate to **Settings** > **API**.
    * Copy the **Project URL** and the **Anon Public Key**.
3.  **Create Database Tables:** Go to the **SQL Editor** and run the following script to create the necessary tables and set up the Row Level Security (RLS).

    ```sql
    -- 1. Styles Table (Publicly accessible for viewing, Admin-only for CRUD)
    CREATE TABLE styles (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT NOT NULL,
      description TEXT,
      price NUMERIC(10, 2) NOT NULL,
      image_url TEXT NOT NULL,
      tags TEXT[] DEFAULT '{}',
      is_featured BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );

    -- RLS for Public Read
    ALTER TABLE styles ENABLE ROW LEVEL SECURITY;
    CREATE POLICY "Allow public read access" ON styles FOR SELECT USING (true);
    CREATE POLICY "Allow authenticated users to modify" ON styles FOR ALL USING (auth.role() = 'authenticated');

    -- 2. Settings Table (For Bio, Social Links, and Hours)
    CREATE TABLE settings (
      id INTEGER PRIMARY KEY DEFAULT 1,
      stylist_bio TEXT,
      working_hours TEXT,
      whatsapp_number TEXT,
      tiktok_link TEXT,
      email_link TEXT,
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );

    -- RLS for Admin Read/Write (Only one row with ID=1)
    ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
    CREATE POLICY "Allow admin read/write on settings" ON settings FOR ALL USING (auth.role() = 'authenticated');
    -- Optional: Allow public read of settings
    CREATE POLICY "Allow public read of settings" ON settings FOR SELECT USING (true);

    -- 3. Seed Initial Data (Hairstyles)
    INSERT INTO styles (name, description, price, image_url, is_featured) VALUES
    ('Butterfly Locs', 'Lightweight, bohemian, and a perfect protective style.', 12000, '[https://picsum.photos/400/500?style=1](https://picsum.photos/400/500?style=1)', TRUE),
    ('Knotless Braids', 'Pain-free, natural-looking, and versatile classic braids.', 9000, '[https://picsum.photos/400/500?style=2](https://picsum.photos/400/500?style=2)', TRUE),
    ('Passion Twists', 'A beautiful blend of twists and coils for a goddess look.', 10000, '[https://picsum.photos/400/500?style=3](https://picsum.photos/400/500?style=3)', TRUE),
    ('French Curls Braid', 'Elegantly braided with soft, flowing curls at the ends.', 8000, '[https://picsum.photos/400/500?style=4](https://picsum.photos/400/500?style=4)', FALSE),
    ('Ghana Braids', 'Thick, stunning feed-in cornrows that last.', 7500, '[https://picsum.photos/400/500?style=5](https://picsum.photos/400/500?style=5)', FALSE),
    ('Cornrows', 'Classic, neat, and simple protective styles.', 4000, '[https://picsum.photos/400/500?style=6](https://picsum.photos/400/500?style=6)', FALSE),
    ('Mini Twists', 'Small, detailed twists for maximum volume and definition.', 6000, '[https://picsum.photos/400/500?style=7](https://picsum.photos/400/500?style=7)', FALSE),
    ('Bantu Knots', 'Stylish and versatile, perfect for stretching natural hair.', 5000, '[https://picsum.photos/400/500?style=8](https://picsum.photos/400/500?style=8)', FALSE),
    ('Goddess Braids', 'Chunky, intricate braids often mixed with other styles.', 11000, '[https://picsum.photos/400/500?style=9](https://picsum.photos/400/500?style=9)', TRUE);

    -- 4. Seed Initial Data (Settings)
    INSERT INTO settings (id, stylist_bio, working_hours, whatsapp_number, tiktok_link, email_link) VALUES
    (1, 'Transforming hair dreams into reality with elegance, style, and care. Specializing in braids, twists, curls, and more. My passion is crafting a look that makes you feel beautiful and confident.', '9:00 AM — 7:00 PM', '2348012345678', '[https://www.tiktok.com/@hairbytofunmi](https://www.tiktok.com/@hairbytofunmi)', 'mailto:hello@hairbytofunmi.com');

    -- 5. Enable Email/Password Auth
    -- Go to Authentication -> Providers and ensure "Email" is enabled.
    -- Sign up the admin email via the Supabase Auth panel or the admin login page once the app is running.
    ```

### 2. Local Environment Configuration

1.  **Clone the Repository:**
    ```bash
    git clone <your-repo-url> HairByTofunmi
    cd HairByTofunmi
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Create `.env.local`:**
    Create a file named `.env.local` in the root directory and add your Supabase credentials:

    ```
    # Supabase Credentials
    NEXT_PUBLIC_SUPABASE_URL="YOUR_SUPABASE_PROJECT_URL"
    NEXT_PUBLIC_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_PUBLIC_KEY"

    # Admin Credentials (For magic link setup, specify the admin email)
    # The first time you run the app, sign up using the admin login page
    # A magic link will be sent to this email.
    ADMIN_EMAIL="tofunmi.stylist@example.com"
    ```

### 3. Running Locally

Start the Next.js development server:

```bash
npm run dev
# or
yarn dev
