-- supabase.sql
-- Creates the tables used by the site and seeds example services

-- Services table
create table if not exists services (
  id serial primary key,
  name text not null,
  description text,
  price integer,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Portfolio table
create table if not exists portfolio (
  id serial primary key,
  title text,
  description text,
  price integer,
  public_url text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Sample seed services (you can edit later from Supabase UI)
insert into services (name, description, price) values
('Butterfly Locs (full)', 'Lightweight, textured locs for movement and volume.', 12000),
('Knotless Braids (medium)', 'Comfortable, low-tension braids that look natural.', 9000),
('Passion Twists', 'Bouncy, long-lasting passion twists with neat finish.', 10000),
('French Curls Braid', 'Classic curled braid finish for special occasions.', 8000),
('Ghana Braids', 'Bold, sculptural edges and crisp parting.', 7500),
('Cornrows (simple)', 'Clean, simple cornrows with neat parts.', 4000),
('Mini Twists', 'Small, defined twists for a compact look.', 6000),
('Bantu Knots', 'Stylish Bantu/knot design for protective and fashion looks.', 5000),
('Goddess Braids', 'Large, elegant goddess braids for volume & style.', 11000);
