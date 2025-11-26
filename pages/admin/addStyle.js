import { useState } from 'react';
import { supabase } from '../../supabase/client';
import { useRouter } from 'next/router';

export default function AddStyle() {
  const [form, setForm] = useState({ name: '', description: '', price: '', image: '', tags: '', featured: false });
  const router = useRouter();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('hair_styles').insert([{
      name: form.name,
      description: form.description,
      price: parseInt(form.price),
      image: form.image,
      tags: form.tags.split(',').map(t => t.trim()),
      featured: form.featured
    }]);
    if (error) alert(error.message);
    else router.push('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-secondary flex justify-center items-center px-6">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-md shadow-md w-full max-w-lg space-y-4">
        <h1 className="text-2xl font-heading">Add New Style</h1>
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
