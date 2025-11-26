import Head from 'next/head'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import AdminStyleForm from '../../components/AdminStyleForm'
import Link from 'next/link'

export default function AdminDashboard() {
  const [session, setSession] = useState(null)
  const [styles, setStyles] = useState([])
  const [editing, setEditing] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [settings, setSettings] = useState({ bio: {}, contacts: {} })

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data: listener } = supabase.auth.onAuthStateChange((_event, s) => setSession(s?.session ?? null))
    return () => listener?.subscription?.unsubscribe?.()
  }, [])

  useEffect(() => {
    if (!session) return
    let channel
    async function load() {
      const { data } = await supabase.from('styles').select('*').order('created_at', { ascending: false })
      setStyles(data || [])
      // settings
      const bioRes = await supabase.from('settings').select('value').eq('key','bio').single()
      if (bioRes.data?.value) setSettings(prev => ({...prev, bio: bioRes.data.value}))
      const contactsRes = await supabase.from('settings').select('value').eq('key','contacts').single()
      if (contactsRes.data?.value) setSettings(prev => ({...prev, contacts: contactsRes.data.value}))

      channel = supabase
        .channel('admin:styles')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'styles' }, () => {
          supabase.from('styles').select('*').order('created_at', { ascending: false }).then(res => setStyles(res.data || []))
        })
        .on('postgres_changes', { event: '*', schema: 'public', table: 'settings' }, () => {
          supabase.from('settings').select('key,value').then(res => {
            const s = {}
            res.data?.forEach(r => { s[r.key] = r.value })
            setSettings(prev => ({ bio: s.bio || prev.bio, contacts: s.contacts || prev.contacts }))
          })
        })
        .subscribe()
    }
    load()
    return () => {
      if (channel) supabase.removeChannel(channel)
    }
  }, [session])

  const requireAuth = () => {
    if (!session) {
      alert('Please login via the magic link first (Admin > Login).')
      return false
    }
    return true
  }

  const handleCreate = async (payload) => {
    if (!requireAuth()) return
    const { error } = await supabase.from('styles').insert([payload])
    if (error) alert(error.message)
    setShowForm(false)
  }

  const handleUpdate = async (payload) => {
    if (!requireAuth()) return
    const { id, ...rest } = payload
    const { error } = await supabase.from('styles').update(rest).eq('id', id)
    if (error) alert(error.message)
    setEditing(null)
    setShowForm(false)
  }

  const handleDelete = async (id) => {
    if (!requireAuth()) return
    if (!confirm('Delete this style?')) return
    const { error } = await supabase.from('styles').delete().eq('id', id)
    if (error) alert(error.message)
  }

  const handleSaveSettings = async (key, value) => {
    if (!requireAuth()) return
    const payload = { key, value }
    // upsert
    const { error } = await supabase.from('settings').upsert([payload], { onConflict: 'key' })
    if (error) alert(error.message)
  }

  const logout = async () => {
    await supabase.auth.signOut()
    setSession(null)
  }

  return (
    <>
      <Head>
        <title>Admin Dashboard — HairByTofunmi</title>
      </Head>

      <section className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Admin Dashboard</h2>
          <div className="flex gap-3">
            <Link href="/"><a className="px-3 py-2 border rounded-md">View Site</a></Link>
            {session ? (
              <button onClick={logout} className="px-3 py-2 bg-brand-600 text-white rounded-md">Logout</button>
            ) : (
              <Link href="/admin/login"><a className="px-3 py-2 bg-brand-600 text-white rounded-md">Login</a></Link>
            )}
          </div>
        </div>

        <div className="mt-6 grid md:grid-cols-3 gap-6">
          <div className="card p-6">
            <h3 className="font-medium">Quick actions</h3>
            <p className="text-sm text-gray-600 mt-2">Create, edit or delete hairstyle entries (image URLs only).</p>
            <div className="mt-4 flex gap-3">
              <button onClick={() => { setEditing(null); setShowForm(true) }} className="px-3 py-2 bg-brand-600 text-white rounded-md">Add New Style</button>
              <div className="ml-auto text-sm text-gray-600">Total: <strong>{styles.length}</strong></div>
            </div>

            <div className="mt-6">
              <h4 className="text-sm font-medium">Stylist bio</h4>
              <textarea value={JSON.stringify(settings.bio, null, 2)} onChange={(e)=>setSettings(prev=>({...prev,bio: JSON.parse(e.target.value)}))} rows="4" className="mt-2 w-full p-2 border rounded-md" />
              <div className="mt-2 flex gap-3">
                <button onClick={() => handleSaveSettings('bio', settings.bio)} className="px-3 py-2 bg-gradient-to-r from-brand-400 to-brand-600 text-white rounded-md">Save</button>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-sm font-medium">Contact settings</h4>
              <label className="block mt-2 text-xs">WhatsApp (phone, international, no +)</label>
              <input value={settings.contacts.whatsapp || ''} onChange={e=>setSettings(prev=>({...prev,contacts:{...prev.contacts,whatsapp:e.target.value}}))} className="mt-1 w-full p-2 border rounded-md" />
              <label className="block mt-2 text-xs">TikTok URL</label>
              <input value={settings.contacts.tiktok || ''} onChange={e=>setSettings(prev=>({...prev,contacts:{...prev.contacts,tiktok:e.target.value}}))} className="mt-1 w-full p-2 border rounded-md" />
              <label className="block mt-2 text-xs">Email</label>
              <input value={settings.contacts.email || ''} onChange={e=>setSettings(prev=>({...prev,contacts:{...prev.contacts,email:e.target.value}}))} className="mt-1 w-full p-2 border rounded-md" />

              <div className="mt-3 flex gap-3">
                <button onClick={() => handleSaveSettings('contacts', settings.contacts)} className="px-3 py-2 bg-brand-600 text-white rounded-md">Save Contacts</button>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">All styles</h3>
            </div>

            <div className="grid gap-4">
              {styles.map(s => (
                <div key={s.id} className="card p-4 flex gap-4 items-start">
                  <img src={s.image_url || '/default-style.jpg'} alt={s.name} className="w-28 h-20 object-cover rounded-md" />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">{s.name}</h4>
                        <p className="text-sm text-gray-600">{s.tags?.join(', ')}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-brand-700">{s.price ? `₦${s.price.toLocaleString()}` : ''}</p>
                        <div className="text-xs text-gray-500">{new Date(s.created_at).toLocaleDateString()}</div>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-700">{s.description}</p>

                    <div className="mt-3 flex gap-2">
                      <button onClick={() => { setEditing(s); setShowForm(true) }} className="px-3 py-2 border rounded-md">Edit</button>
                      <button onClick={() => handleDelete(s.id)} className="px-3 py-2 bg-red-600 text-white rounded-md">Delete</button>
                      {s.featured && <span className="ml-3 px-2 py-1 text-xs bg-yellow-100 rounded-md">Featured</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {showForm && (
              <div className="mt-6 card p-6">
                <h4 className="font-medium mb-3">{editing ? 'Edit style' : 'Create new style'}</h4>
                <AdminStyleForm
                  initial={editing || {}}
                  onSave={async (payload) => {
                    if (editing) {
                      await handleUpdate({ ...editing, ...payload })
                    } else {
                      await handleCreate(payload)
                    }
                  }}
                  onCancel={() => { setShowForm(false); setEditing(null) }}
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
