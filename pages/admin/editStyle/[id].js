import { useState, useEffect } from 'react';
import { supabase } from '../../../supabase/client';
import { useRouter } from 'next/router';
import { usePathname } from 'next/navigation';

export default function EditStyle() {
  const router = useRouter();
  const { id } = router.query;
  const [form, setForm] = useState({ name: '', description: '', price: '', image: '', tags: '', featured: false });

  useEffect(() => {
    if (!id) return;
    fetchStyle();
  }, [id]);

  const fetchStyle = async () => {
    const { data } = await supabase.from('hair_styles').select('*').eq('id', id).single();
    if (data) setForm({ ...data, tags: data.tags.join(', ') });
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await supabase.from('hair_styles').update({
      name: form.name,
      description: form.description,
      price: parseInt(form.price),
      image: form.image,
      tags: form.tags.split(',').map(t => t.trim()),
      featured: form.featured
    }).eq('id', id);
    router.push('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-secondary flex justify-center items-center px-6">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-md shadow-md w-full max-w-lg space-y-4">
        <h1 className="text-2xl font-heading">Edit Style</h1>
        <input name="name" placeholder="Style Name" value={form.name} onChange={handleChange} required className="w-full border px-3 py-2 rounded-md" />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required className="w-full border px-3 py-2 rounded-md" />
        <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} required className="w-full border px-3 py-2 rounded-md" />
        <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} required className="w-full border px-3 py-2 rounded-md" />
        <input name="tags" placeholder="Tags (comma separated)" value={form.tags} onChange={handleChange} className="w-full border px-3 py-2 rounded-md" />
        <div className="flex items-center space-x-2">
          <input type="checkbox" name="featured" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
          <label>Featured</label>
        </div>
        <button type="submit" className="bg-accent text-white px-4 py-2 rounded-md">Save Changes</button>
      </form>
    </div>
  );
}
