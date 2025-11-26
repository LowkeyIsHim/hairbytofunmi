import { createServerClient } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

// 1. Server Component/Route Handler Client (Secure, uses cookies)
export function createAdminClient(cookieStore) {
  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get: (name) => cookieStore.get(name)?.value,
      set: (name, value, options) => cookieStore.set({ name, value, ...options }),
      remove: (name, options) => cookieStore.set({ name, value: '', ...options }),
    },
  });
}

// 2. Client Component Client (Uses session/RLS)
export function createBrowserClient() {
  return createClient(supabaseUrl, supabaseAnonKey);
}

// 3. Server-side Service Client (For seeding/admin tasks, bypasses RLS)
export const supabaseService = createClient(supabaseUrl, supabaseServiceKey);

// --- DB Data Functions ---

export async function getAllStyles() {
  const { data: styles, error } = await supabaseService
    .from('styles')
    .select('*')
    .order('is_featured', { ascending: false })
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching styles:', error);
    return [];
  }
  return styles;
}

export async function getSettings() {
  const { data: settings, error } = await supabaseService
    .from('settings')
    .select('*')
    .limit(1)
    .single();
  
  // Provide defaults if settings are missing
  if (error || !settings) {
    console.warn('Settings not found or error fetching settings. Using defaults.');
    return {
      stylist_bio: "Transforming hair dreams into reality with elegance, style, and care. Specializing in braids, twists, curls, and more.",
      whatsapp_number: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '2348012345678',
      tiktok_link: process.env.NEXT_PUBLIC_TIKTOK_LINK || '#',
      email_link: process.env.NEXT_PUBLIC_EMAIL_LINK || '#',
      working_hours: '9:00 AM — 7:00 PM',
    };
  }
  return settings;
}
