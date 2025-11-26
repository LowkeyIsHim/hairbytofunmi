// src/pages/admin/upload.js
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { useRouter } from 'next/router'

export default function Upload(){
  const [user, setUser] = useState(null)
  const [file, setFile] = useState(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [message, setMessage] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data.user)
    }
    getUser()
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
    })
    return () => listener?.subscription?.unsubscribe?.()
  }, [])

  async function upload(e){
    e.preventDefault()
    setMessage(null)
    if (!user) return setMessage({ type: 'error', text: 'You must be signed in as admin.'})
    if (!file) return setMessage({ type: 'error', text: 'Pick a file first.'})

    try {
      const fileName = `${Date.now()}_${file.name}`
      const { data, error: uploadError } = await supabase.storage.from('portfolio').upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      })
      if (uploadError) throw uploadError

      const { data: publicUrlData } = supabase.storage.from('portfolio').getPublicUrl(data.path)
      const public_url = publicUrlData.publicUrl

      // insert into DB
      const { error: dbError } = await supabase.from('portfolio').insert([{
        title,
        description,
        price: price ? Number(price) : null,
        public_url
      }])
      if (dbError) throw dbError

      setMessage({ type: 'success', text: 'Uploaded and saved.' })
      setFile(null); setTitle(''); setDescription(''); setPrice('')
    } catch (err) {
      console.error(err)
      setMessage({ type: 'error', text: err.message || 'Upload failed' })
    }
  }

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20">
        <h2 className="text-xl text-rose1">You must be signed in to access Upload</h2>
        <p className="mt-3 text-ivory/70">Go to <a className="text-rose1" href="/admin">Admin</a> to sign in (magic link email).</p>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h2 className="text-2xl text-rose1">Upload portfolio image</h2>
      <form onSubmit={upload} className="mt-6 grid gap-3">
        <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} />
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title (e.g. Butterfly locs)" className="p-3 rounded bg-black/30" />
        <input value={description} onChange={e => setDescription(e.target.value)} placeholder="Short description" className="p-3 rounded bg-black/30" />
        <input value={price} onChange={e => setPrice(e.target.value)} placeholder="Optional price (₦)" className="p-3 rounded bg-black/30" />
        <div className="flex gap-3">
          <button type="submit" className="px-4 py-2 rounded-full bg-rose1 text-black font-semibold">Upload</button>
          <button type="button" onClick={() => { setFile(null); setTitle(''); setDescription(''); setPrice('') }} className="px-4 py-2 rounded-full border">Reset</button>
        </div>
      </form>

      {message && <p className={`mt-4 ${message.type === 'error' ? 'text-red-400' : 'text-green-400'}`}>{message.text}</p>}
      <p className="mt-6 text-ivory/70">Also: Services & prices are editable in Supabase table <code>services</code> or via future admin UI updates.</p>
    </div>
  )
}
