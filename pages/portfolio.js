import Head from 'next/head'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import ModalLightbox from '../components/ModalLightbox'

export default function Portfolio() {
  const [images, setImages] = useState([])
  const [open, setOpen] = useState(null)
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ''
  const whatsappHref = (styleName) => {
    const base = phone ? `https://wa.me/${phone}` : 'https://wa.me/'
    const text = `Hello! I would like to book "${styleName}" with HairByTofunmi. Please let me know available times.`
    return `${base}?text=${encodeURIComponent(text)}`
  }

  useEffect(() => {
    let channel
    async function load() {
      const { data } = await supabase.from('styles').select('id,name,image_url').order('created_at', { ascending: false })
      setImages(data || [])
      channel = supabase
        .channel('public:styles:portfolio')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'styles' }, () => {
          supabase.from('styles').select('id,name,image_url').order('created_at', { ascending: false }).then(res => setImages(res.data || []))
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
        <title>Portfolio — HairByTofunmi</title>
        <meta name="description" content="Portfolio and gallery of hairstyles by HairByTofunmi." />
      </Head>

      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-semibold mb-6">Portfolio</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {images.map(img => (
            <button key={img.id} onClick={() => setOpen(img)} className="rounded-xl overflow-hidden h-48">
              <img src={img.image_url || '/default-style.jpg'} alt={img.name} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </section>

      <ModalLightbox open={!!open} onClose={()=>setOpen(null)} image={open?.image_url} alt={open?.name}>
        <a href={whatsappHref(open?.name)} className="px-3 py-2 bg-green-600 text-white rounded-md">Book on WhatsApp</a>
      </ModalLightbox>
    </>
  )
}
