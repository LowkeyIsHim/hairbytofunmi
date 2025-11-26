import { useState } from 'react'

export default function AdminStyleForm({ initial = {}, onSave, onCancel }) {
  const [name, setName] = useState(initial.name || '')
  const [description, setDescription] = useState(initial.description || '')
  const [price, setPrice] = useState(initial.price || '')
  const [tags, setTags] = useState((initial.tags || []).join(', '))
  const [image_url, setImageUrl] = useState(initial.image_url || '')
  const [featured, setFeatured] = useState(initial.featured || false)
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    // Validate basic fields
    if (!name.trim() || !image_url.trim()) {
      alert('Please provide a name and image URL.')
      setSaving(false)
      return
    }
    const payload = {
      ...initial,
      name: name.trim(),
      description: description.trim(),
      price: price ? Number(price) : null,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      image_url: image_url.trim(),
      featured: Boolean(featured)
    }
    await onSave(payload)
    setSaving(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input value={name} onChange={e=>setName(e.target.value)} className="mt-1 w-full p-2 border rounded-md" required />
      </div>
      <div>
        <label className="block text-sm font-medium">Image URL</label>
        <input value={image_url} onChange={e=>setImageUrl(e.target.value)} className="mt-1 w-full p-2 border rounded-md" placeholder="https://..." required />
      </div>
      <div>
        <label className="block text-sm font-medium">Price (NGN)</label>
        <input value={price} onChange={e=>setPrice(e.target.value)} className="mt-1 w-full p-2 border rounded-md" inputMode="numeric" />
      </div>
      <div>
        <label className="block text-sm font-medium">Tags (comma separated)</label>
        <input value={tags} onChange={e=>setTags(e.target.value)} className="mt-1 w-full p-2 border rounded-md" />
      </div>
      <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea value={description} onChange={e=>setDescription(e.target.value)} className="mt-1 w-full p-2 border rounded-md" rows="4" />
      </div>
      <div className="flex items-center gap-3">
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={featured} onChange={e=>setFeatured(e.target.checked)} />
          <span className="text-sm">Featured</span>
        </label>
      </div>

      <div className="flex gap-3">
        <button type="submit" disabled={saving} className="px-4 py-2 bg-brand-600 text-white rounded-md">
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
        <button type="button" onClick={onCancel} className="px-4 py-2 border rounded-md">Cancel</button>
      </div>
    </form>
  )
}
