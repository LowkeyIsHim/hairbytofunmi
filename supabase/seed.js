/**
 * Usage: SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... node supabase/seed.js
 *
 * This script uses the service role to insert seed data.
 */
const { createClient } = require('@supabase/supabase-js')

const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!url || !serviceRoleKey) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables.')
  process.exit(1)
}

const supabase = createClient(url, serviceRoleKey)

async function main() {
  // Create tables (idempotent if using the SQL above in Supabase).
  console.log('Seeding data...')

  const styles = [
    { name: 'Butterfly Locs', price: 12000, tags: ['locs','butterfly'], image_url: 'https://images.unsplash.com/photo-1600180758897-9b8d5b2b1b2f?auto=format&fit=crop&w=800&q=60', description: 'Soft, flowing butterfly locs.' , featured: true},
    { name: 'Knotless Braids', price: 9000, tags: ['braids','knotless'], image_url: 'https://images.unsplash.com/photo-1615137057181-2d0f1b3e5b3a?auto=format&fit=crop&w=800&q=60', description: 'Lightweight knotless braids.' , featured: true},
    { name: 'Passion Twists', price: 10000, tags: ['twists','passion'], image_url: 'https://images.unsplash.com/photo-1618354694526-6b95d3f2e2f1?auto=format&fit=crop&w=800&q=60', description: 'Flexible and textured passion twists.' },
    { name: 'French Curls Braid', price: 8000, tags: ['braid','curl'], image_url: 'https://images.unsplash.com/photo-1544006659-f0b21884ce1d?auto=format&fit=crop&w=800&q=60', description: 'Sculpted french curls with braids.' },
    { name: 'Ghana Braids', price: 7500, tags: ['braids','ghana'], image_url: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25?auto=format&fit=crop&w=800&q=60', description: 'Classic Ghana braids.' },
    { name: 'Cornrows', price: 4000, tags: ['cornrows'], image_url: 'https://images.unsplash.com/photo-1589601126277-3a35b8b0b86b?auto=format&fit=crop&w=800&q=60', description: 'Precision cornrows for any style.' },
    { name: 'Mini Twists', price: 6000, tags: ['twists','mini'], image_url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=60', description: 'Neat micro/mini twists.' },
    { name: 'Bantu Knots', price: 5000, tags: ['bantu'], image_url: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=800&q=60', description: 'Playful and protected bantu knots.' },
    { name: 'Goddess Braids', price: 11000, tags: ['braids','goddess'], image_url: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=800&q=60', description: 'Large, elegant goddess braids.' }
  ]

  const { error } = await supabase.from('styles').upsert(styles, { onConflict: 'name' })
  if (error) {
    console.error('Seed error', error)
    process.exit(1)
  }

  // default settings
  const contacts = {
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '',
    tiktok: '',
    email: 'stylist@example.com'
  }
  const bio = {
    name: 'Tofunmi',
    bio: 'Passionate stylist transforming hair with care and attention to detail. Specializing in braids, twists, and textured styles.',
    headshot_url: ''
  }

  await supabase.from('settings').upsert([{ key: 'contacts', value: contacts }, { key: 'bio', value: bio }], { onConflict: 'key' })

  console.log('Seed complete.')
  process.exit(0)
}

main().catch(err => { console.error(err); process.exit(1) })
