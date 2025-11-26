// src/pages/portfolio.js
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Portfolio(){
  const [items, setItems] = useState([])

  useEffect(() => {
    async function load(){
      // get portfolio records
      const res = await supabase.from('portfolio').select('*').order('created_at', { ascending: false })
      if (!res.error) {
        // each record has public_url field
        setItems(res.data || [])
      }
    }
    load()
  }, [])

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl text-center text-rose1 font-heading">Portfolio</h1>
      <p className="text-center mt-2 text-ivory/70">Swipe through recent work. To book, tap any image and use the Book button to WhatsApp us.</p>

      <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
        {items.length ? items.map(it => (
          <figure key={it.id} className="rounded-lg overflow-hidden shadow-lg">
            <img src={it.public_url} alt={it.title || 'Portfolio image'} className="w-full h-64 object-cover" />
            <figcaption className="p-3 bg-black/40">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-ivory">{it.title || 'Style'}</div>
                  <div className="text-ivory/70 text-sm mt-1">{it.description || ''}</div>
                </div>
                <a className="px-3 py-1 rounded-full bg-rose1 text-black font-semibold" href={`https://wa.me/2349021280216?text=${encodeURIComponent(`Hi Tofunmi 👋\nI'd like to book based on this photo: ${it.title || ''}.\nName:\nPreferred date:\nPreferred time:\nNotes:`)}`} target="_blank" rel="noreferrer">Book</a>
              </div>
            </figcaption>
          </figure>
        )) : (
          <div className="col-span-full text-center text-ivory/70">No portfolio images yet. Upload via Admin → Upload.</div>
        )}
      </div>
    </section>
  )
}
