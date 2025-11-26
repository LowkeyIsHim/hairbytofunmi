// src/pages/index.js
import Link from 'next/link'
import Image from 'next/image'
import WhatsAppButton from '../components/WhatsAppButton'
import { supabase } from '../lib/supabaseClient'
import { useEffect, useState } from 'react'

export default function Home(){
  const [services, setServices] = useState([])

  useEffect(() => {
    // fetch a few services to show on homepage (client-side)
    async function load() {
      try {
        const res = await supabase.from('services').select('*').order('id', { ascending: true }).limit(4)
        if (res.error) throw res.error
        setServices(res.data || [])
      } catch (e) {
        console.error('Error fetching services', e)
      }
    }
    load()
  }, [])

  return (
    <div>
      {/* Hero */}
      <section className="hero-bg h-[74vh] flex items-center justify-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1400&q=60')" }}>
        <div className="max-w-3xl text-center px-6">
          <h1 className="text-4xl md:text-5xl font-heading font-extrabold leading-tight">Premium styles. Personal care. Book your look with <span className="text-rose1">Hairbytofunmi</span>.</h1>
          <p className="mt-4 text-lg text-ivory/90">Hi — I’m Tofunmi. I craft butterfly locs, knotless braids, passion twists and luxury installs that make you feel confident and camera-ready.</p>
          <div className="mt-6 flex justify-center gap-4">
            <WhatsAppButton service="Consultation" />
            <Link href="/portfolio"><a className="px-5 py-3 rounded-full border border-rose1 text-ivory font-semibold">View Portfolio</a></Link>
          </div>
        </div>
      </section>

      {/* Services preview */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-2xl text-center text-rose1 font-heading">Signature Services</h2>
        <p className="mt-2 text-center text-ivory/70">Choose a look, then tap Book to open WhatsApp with a prefilled message.</p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.length ? services.map(s => (
            <article key={s.id} className="card p-5">
              <h3 className="text-xl text-rose1 font-semibold">{s.name} — ₦{s.price.toLocaleString()}</h3>
              <p className="mt-2 text-ivory/80">{s.description}</p>
              <div className="mt-4 flex gap-3">
                <a className="px-4 py-2 rounded-full bg-rose1 text-black font-semibold" href={`https://wa.me/2349021280216?text=${encodeURIComponent(`Hi Tofunmi 👋\nI'd like to book ${s.name}.\nName:\nPreferred date:\nPreferred time:\nNotes:`)}`} target="_blank" rel="noreferrer">Book</a>
                <Link href="/services"><a className="px-4 py-2 rounded-full border border-rose1">More</a></Link>
              </div>
            </article>
          )) : (
            // placeholder skeleton
            <>
              <div className="card p-5 h-36 animate-pulse" />
              <div className="card p-5 h-36 animate-pulse" />
            </>
          )}
        </div>
      </section>
    </div>
  )
}
