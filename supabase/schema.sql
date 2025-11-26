-- styles table
create table if not exists styles (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  price numeric,
  tags text[],
  image_url text,
  featured boolean default false,
  created_at timestamptz default now()
);

-- settings table: key-value for site-wide settings
create table if not exists settings (
  key text primary key,
  value jsonb,
  updated_at timestamptz default now()
);

-- Optional: roles / policies instructions will be in README
