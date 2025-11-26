// src/pages/admin/index.js
import { useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { useRouter } from 'next/router'

export default function Admin(){
  const [email, setEmail] = useState('kofoworoladickson@gmail.com')
  const [sending, setSending] = useState(false)
  const [message, setMessage] = useState(null)
  const router = useRouter()

  async function sendMagicLink(e){
    e.preventDefault()
    setSending(true)
    const { error } = await supabase.auth.signInWithOtp({ email })
    if (error) setMessage({ type: 'error', text: error.message })
    else setMessage({ type: 'success', text: 'Magic link sent. Check your email.' })
    setSending(false)
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-20">
      <h1 className="text-3xl text-rose1 font-heading text-center">Admin — Hairbytofunmi</h1>
      <p className="mt-3 text-center text-ivory/80">Sign in with your email (magic link). Use the admin Upload page after signing in.</p>

      <form className="mt-8 grid gap-4" onSubmit={sendMagicLink}>
        <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="you@domain.com" className="p-3 rounded border bg-black/30" />
        <button className="px-4 py-2 rounded-full bg-rose1 text-black font-semibold" disabled={sending}>{sending ? 'Sending…' : 'Send magic link'}</button>
      </form>

      {message && <p className={`mt-4 ${message.type === 'error' ? 'text-red-400' : 'text-green-400'}`}>{message.text}</p>}

      <div className="mt-8">
        <p className="text-ivory/70">After signing in you can go to <a className="text-rose1" href="/admin/upload">/admin/upload</a> to manage portfolio and services.</p>
      </div>
    </div>
  )
}
