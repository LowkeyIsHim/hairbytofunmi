import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

// Client for the public site (can read data, but cannot write without auth)
export const publicSupabase = createClient(supabaseUrl, supabaseAnonKey)

// Client for the server/admin (for authenticated actions)
// Use the server-side SSR client for better session management in Next.js
// This should be instantiated inside server components or API routes using cookies.
// The Next.js official Supabase SSR client handles this securely.
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export const createAdminClient = (cookieStore) => {
  return createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        get: (name) => cookieStore.get(name)?.value,
        set: (name, value, options) => cookieStore.set({ name, value, ...options }),
        remove: (name, options) => cookieStore.set({ name, value: '', ...options }),
      },
    }
  )
}

// Function to get the public settings data
export async function getSettings() {
  const { data, error } = await publicSupabase
    .from('settings')
    .select('*')
    .eq('id', 1)
    .single()

  if (error) {
    console.error('Error fetching settings:', error)
    // Return a default structure on error
    return {
      stylist_bio: 'Transforming hair dreams into reality with elegance, style, and care. Specializing in braids, twists, curls, and more.',
      working_hours: '9:00 AM — 7:00 PM',
      whatsapp_number: '2348012345678',
      tiktok_link: '#',
      email_link: 'mailto:hello@hairbytofunmi.com',
    }
  }
  return data
}
