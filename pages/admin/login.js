import Head from 'next/head'
import { useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { useRouter } from 'next/router'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')
  const router = useRouter()

  const handleMagicLink = async (e) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signInWithOtp({ email })
    if (error) {
      setMsg(error.message)
    } else {
      setMsg('Check your email for the login link (magic link).')
    }
    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>Admin Login — HairByTofunmi</title>
      </Head>

      <section className="max-w-xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-semibold">Stylist login</h2>
        <p className="text-sm text-gray-600 mt-2">Sign in using a secure magic link sent to your email.</p>

        <form onSubmit={handleMagicLink} className="mt-6 card p-6">
          <label className="block text-sm font-medium">Email</label>
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required className="mt-1 w-full p-2 border rounded-md" />
          <div className="mt-4 flex gap-3">
            <button className="px-4 py-2 bg-brand-600 text-white rounded-md" disabled={loading}>
              {loading ? 'Sending...' : 'Send magic link'}
            </button>
            <button type="button" onClick={() => router.push('/')} className="px-4 py-2 border rounded-md">Back</button>
          </div>
          {msg && <p className="mt-3 text-sm text-gray-600">{msg}</p>}
        </form>
      </section>
    </>
  )
}
