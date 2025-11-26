import Head from 'next/head'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import StyleCard from '../components/StyleCard'

export default function Services() {
  const [styles, setStyles] = useState([])
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ''
  const whatsappHref = (styleName) => {
    const base = phone ? `https://wa.me/${phone}` : 'https://wa.me/'
    const text = `Hello! I would like to book "${styleName}" with HairByTofunmi. Please let me know available times.`
    return `${base}?text=${encodeURIComponent(text)}`
  }

  useEffect(() => {
    let channel
    async function load() {
      const { data } = await supabase.from('styles').select('*').order('created_at', { ascending: false })
      setStyles(data || [])
      // realtime subscription to styles
      channel = supabase
        .channel('public:styles')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'styles' }, payload => {
          // simple strategy: refetch on any change
          supabase.from('styles').select('*').order('created_at', { ascending: false }).then(res => setStyles(res.data || []))
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
        <title>Services — HairByTofunmi</title>
        <meta name="description" content="Browse services and prices from HairByTofunmi. Book directly through WhatsApp." />
      </Head>

      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-semibold mb-4">Services</h2>
        <p className="text-gray-600 mb-6">Select a style below and book quickly on WhatsApp.</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {styles.map(s => (
            <StyleCard key={s.id} style={s} onBook={(st)=> window.location.href = whatsappHref(st.name)} onOpen={()=>{}} />
          ))}
        </div>
      </section>
    </>
  )
}
