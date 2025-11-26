import Head from 'next/head'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import StyleCard from '../components/StyleCard'
import ModalLightbox from '../components/ModalLightbox'

export default function Home() {
  const [featured, setFeatured] = useState([])
  const [openStyle, setOpenStyle] = useState(null)
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ''
  const whatsappHref = (styleName) => {
    const base = phone ? `https://wa.me/${phone}` : 'https://wa.me/'
    const text = `Hello! I would like to book "${styleName}" with HairByTofunmi. Please let me know available times.`
    return `${base}?text=${encodeURIComponent(text)}`
  }

  useEffect(() => {
    let sub
    async function fetchFeatured() {
      const { data } = await supabase
        .from('styles')
        .select('*')
        .eq('featured', true)
        .order('created_at', { ascending: false })
      setFeatured(data || [])
      // realtime
      sub = supabase
        .channel('public:styles:featured')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'styles' }, () => {
          // refetch
          supabase.from('styles').select('*').eq('featured', true).order('created_at', { ascending: false }).then(res => setFeatured(res.data || []))
        })
        .subscribe()
    }
    fetchFeatured()
    return () => {
      if (sub) supabase.removeChannel(sub)
    }
  }, [])

  return (
    <>
      <Head>
        <title>HairByTofunmi — Elegant Hair Styling in Lagos</title>
        <meta name="description" content="Transforming hair dreams into reality with elegance, style, and care. Specializing in braids, twists, curls, and more." />
        <meta property="og:title" content="HairByTofunmi — Elegant Hair Styling" />
        <meta property="og:description" content="Transforming hair dreams into reality with elegance, style, and care." />
        {featured[0] && <meta property="og:image" content={featured[0].image_url} />}
      </Head>

      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-4xl font-extrabold">HairByTofunmi</h2>
            <p className="mt-4 text-lg text-gray-700">Transforming hair dreams into reality with elegance, style, and care. Specializing in braids, twists, curls, and more.</p>
            <div className="mt-6 flex gap-3">
              <a href={whatsappHref('A consultation')} className="px-4 py-3 rounded-md bg-gradient-to-r from-brand-400 to-brand-600 text-white">Book on WhatsApp</a>
              <a href="/portfolio" className="px-4 py-3 rounded-md border">View Portfolio</a>
            </div>
          </div>

          <div>
            <div className="grid grid-cols-2 gap-3">
              {featured.slice(0,4).map(s => (
                <button key={s.id} onClick={() => setOpenStyle(s)} className="overflow-hidden rounded-xl">
                  <img src={s.image_url} alt={s.name} className="object-cover w-full h-36" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-8">
        <h3 className="text-2xl font-semibold mb-6">Featured styles</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map(s => (
            <StyleCard key={s.id} style={s} onBook={(st)=> window.location.href = whatsappHref(st.name)} onOpen={(st)=> setOpenStyle(st)} />
          ))}
        </div>
      </section>

      <ModalLightbox open={!!openStyle} onClose={()=>setOpenStyle(null)} image={openStyle?.image_url} alt={openStyle?.name}>
        <a href={whatsappHref(openStyle?.name)} className="px-3 py-2 bg-green-600 text-white rounded-md">Book on WhatsApp</a>
      </ModalLightbox>
    </>
  )
}
