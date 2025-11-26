// src/components/admin/StyleForm.jsx
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@/lib/supabase';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { FaSave } from 'react-icons/fa';

export default function StyleForm({ initialData = {}, isEdit = false }) {
  const router = useRouter();
  const supabase = createBrowserClient();
  const [formData, setFormData] = useState({
    name: '', description: '', price: '', category: '', image_url: '', is_featured: false, ...initialData
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let query = supabase.from('styles');

      if (isEdit) {
        query = query.update(formData).eq('id', formData.id).select();
      } else {
        query = query.insert(formData).select();
      }

      const { error: dbError } = await query;

      if (dbError) throw dbError;

      router.push('/admin/dashboard');
      router.refresh();
    } catch (err) {
      console.error('Submission Error:', err);
      setError('Failed to save style. Please check your data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-premium space-y-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-serif font-bold text-deep-violet">{isEdit ? 'Edit Style' : 'Add New Style'}</h2>
      
      {error && <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}

      <Input id="name" label="Style Name" type="text" value={formData.name} onChange={handleChange} required />
      <Input id="description" label="Description" type="textarea" value={formData.description} onChange={handleChange} />
      <div className="grid grid-cols-2 gap-4">
        <Input id="price" label="Price (₦)" type="number" value={formData.price} onChange={handleChange} required />
        <Input id="category" label="Category/Tags" type="text" value={formData.category} onChange={handleChange} />
      </div>
      <Input id="image_url" label="Image URL" type="url" value={formData.image_url} onChange={handleChange} required />
      
      <div className="flex items-center space-x-2 pt-4">
        <input 
          id="is_featured" 
          type="checkbox" 
          checked={formData.is_featured} 
          onChange={handleChange}
          className="w-4 h-4 text-rose-gold border-gray-300 rounded focus:ring-rose-gold"
        />
        <label htmlFor="is_featured" className="text-sm font-medium text-gray-700">Feature on Homepage</label>
      </div>

      <div className="flex justify-end pt-4">
        <Button type="submit" variant="primary" isLoading={loading} className="flex items-center space-x-2">
          <FaSave />
          <span>{isEdit ? 'Save Changes' : 'Create Style'}</span>
        </Button>
      </div>
    </form>
  );
}
