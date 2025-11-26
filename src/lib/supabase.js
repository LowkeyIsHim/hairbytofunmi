// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js';

// --- Server-Side Client (For reading data securely and handling admin actions) ---
// This client should only be used in Server Components or Server Actions.
export function createServerClient(cookieStore) {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY, // Use SERVICE ROLE KEY for CRUD in admin
    {
      auth: {
        flowType: 'pkce',
        storageKey: 'sb',
        detectSessionInUrl: false,
        persistSession: true,
      },
      db: {
        schema: 'public',
      },
      global: {
        headers: { 'x-client-info': 'supabase-nextjs-server' },
      },
    }
  );
}

// --- Browser-Side Client (For public site real-time and client-side form submission) ---
// This client is safe to use anywhere a client component is needed.
export function createBrowserClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

// --- Public Data Fetching ---
// Used by both public pages and admin dashboard to get the latest list.

const supabaseAnon = createBrowserClient(); // Use anon key for read-only public data

export async function getStyles() {
  const { data, error } = await supabaseAnon
    .from('styles')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching styles:', error);
    return [];
  }
  return data;
}

export async function getSettings() {
  const { data, error } = await supabaseAnon
    .from('settings')
    .select('*')
    .eq('id', 1) // Assuming a single row for site settings
    .single();

  if (error) {
    console.error('Error fetching settings:', error);
    // Return safe defaults if settings fail to load
    return { 
      stylist_bio: "Transforming hair dreams into reality with elegance, style, and care. Specializing in braids, twists, curls, and more.",
      working_hours: "9:00 AM — 7:00 PM",
      whatsapp_number: "2348012345678", // Placeholder
      tiktok_link: "",
      email_link: "",
    };
  }
  return data;
}
