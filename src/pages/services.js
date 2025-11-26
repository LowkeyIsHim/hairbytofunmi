// src/pages/services.js
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import WhatsAppButton from '../components/WhatsAppButton'

export default function Services(){
  const [services, setServices] = useState([])

  useEffect(() => {
    async function load(){
      const res = await supabase.from('services').select('*').order('id', { ascending: true })
      if (!res.error) setServices(res.data || [])
    }
    load()
  }, [])

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl text-center text-rose1 font-heading">Services & Pricing</h1>
      <p className="text-center mt-2 text-ivory/70">Editable prices. Choose a style and tap Book to send a prefilled WhatsApp message.</p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map(s => (
          <div className="card p-6" key={s.id}>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-2xl text-rose1 font-semibold">{s.name}</h3>
                <p className="text-ivory/80 mt-2">{s.description}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">₦{Number(s.price).toLocaleString()}</div>
                <div className="text-ivory/70">est.</div>
              </div>
            </div>
            <div className="mt-4">
              <WhatsAppButton service={s.name} />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
