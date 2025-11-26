import Head from 'next/head'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Contact() {
  const [settings, setSettings] = useState({ whatsapp:process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '', tiktok: '', email: 'stylist@example.com' })
  useEffect(() => {
    let channel
    async function load() {
      const { data } = await supabase.from('settings').select('value').eq('key','contacts').single()
      if (data && data.value) setSettings(prev => ({ ...prev, ...data.value }))
      channel = supabase
        .channel('public:settings:contacts')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'settings' }, () => {
          supabase.from('settings').select('value').eq('key','contacts').single().then(res => {
            if (res.data && res.data.value) setSettings(prev => ({ ...prev, ...res.data.value }))
          })
        })
        .subscribe()
    }
    load()
    return () => {
      if (channel) supabase.removeChannel(channel)
    }
  }, [])

  const whatsappHref = settings.whatsapp ? `https://wa.me/${settings.whatsapp}` : '#'

  return (
    <>
      <Head>
        <title>Contact — HairByTofunmi</title>
        <meta name="description" content="Contact HairByTofunmi via WhatsApp, email, or TikTok." />
      </Head>

      <section className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-semibold">Contact</h2>
        <p className="mt-3 text-gray-600">Working hours: 9:00 AM — 7:00 PM</p>

        <div className="mt-6 grid sm:grid-cols-2 gap-6">
          <div className="card p-6">
            <h3 className="font-medium">WhatsApp</h3>
            <p className="text-sm text-gray-600 mt-2">Chat for bookings and enquiries.</p>
            <a href={whatsappHref} className="mt-4 inline-block px-4 py-2 bg-green-600 text-white rounded-md">Message on WhatsApp</a>
          </div>

          <div className="card p-6">
            <h3 className="font-medium">Other</h3>
            <p className="text-sm text-gray-600 mt-2">TikTok & Email</p>
            <div className="mt-4 flex gap-3">
              <a href={settings.tiktok || '#'} className="px-3 py-2 border rounded-md">TikTok</a>
              <a href={`mailto:${settings.email}`} className="px-3 py-2 border rounded-md">Email</a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
