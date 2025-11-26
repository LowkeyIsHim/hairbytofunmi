import Head from 'next/head'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function About() {
  const [bio, setBio] = useState({
    name: 'Tofunmi',
    bio: 'Passionate stylist with years of experience creating polished, long-lasting styles tailored to each client.',
    headshot_url: ''
  })

  useEffect(() => {
    let channel
    async function load() {
      const { data } = await supabase.from('settings').select('value').eq('key','bio').single()
      if (data && data.value) {
        setBio(prev => ({ ...prev, ...data.value }))
      }
      channel = supabase
        .channel('public:settings')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'settings' }, payload => {
          supabase.from('settings').select('value').eq('key','bio').single().then(res => {
            if (res.data && res.data.value) setBio(prev => ({ ...prev, ...res.data.value }))
          })
        })
        .subscribe()
    }
    load()
    return () => {
      if (channel) supabase.removeChannel(channel)
    }
  }, [])

  return (
    <>
      <Head>
        <title>About — HairByTofunmi</title>
        <meta name="description" content="About Tofunmi — stylist profile, approach, and experience." />
      </Head>

      <section className="max-w-4xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-6 items-center">
        <div>
          <img src={bio.headshot_url || '/default-style.jpg'} alt="Tofunmi headshot" className="w-full rounded-xl h-80 object-cover" />
        </div>
        <div>
          <h2 className="text-3xl font-semibold">About {bio.name}</h2>
          <p className="mt-4 text-gray-700">{bio.bio || 'Transforming hair with care and expertise.'}</p>

          <h3 className="mt-6 text-xl font-medium">My approach</h3>
          <ol className="list-decimal ml-5 mt-2 text-gray-600">
            <li>Consultation to understand style and maintenance needs.</li>
            <li>Careful, hygienic preparation and premium products.</li>
            <li>Precision styling with a focus on longevity and comfort.</li>
          </ol>
        </div>
      </section>
    </>
  )
}
