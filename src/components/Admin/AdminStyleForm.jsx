'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { publicSupabase } from '@/lib/supabase';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { Check, X } from 'lucide-react';
import Image from 'next/image';

const defaultStyle = {
  name: '',
  description: '',
  price: '',
  image_url: '',
  tags: [],
  is_featured: false,
};

export default function AdminStyleForm({ initialData = defaultStyle, isEdit = false }) {
  const [formData, setFormData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Sync initial data on edit mode
    if (isEdit) {
      setFormData(initialData);
    }
  }, [initialData, isEdit]);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value,
    }));
    // Clear error on input
    if (error) setError(null);
  };

  const handleTagsChange = (e) => {
    const tagsArray = e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag);
    setFormData((prev) => ({
      ...prev,
      tags: tagsArray,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Basic Validation
    if (!formData.name || !formData.price || !formData.image_url) {
      setError('Name, Price, and Image URL are required fields.');
      setLoading(false);
      return;
    }

    try {
      let result;
      const payload = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        image_url: formData.image_url,
        tags: formData.tags,
        is_featured: formData.is_featured,
        updated_at: new Date().toISOString(),
      };
      
      if (isEdit) {
        // Update
        result = await publicSupabase.from('styles').update(payload).eq('id', formData.id).select();
      } else {
        // Create
        result = await publicSupabase.from('styles').insert(payload).select();
      }

      if (result.error) {
        throw new Error(result.error.message);
      }

      alert(`Style successfully ${isEdit ? 'updated' : 'added'}! The public site is now live.`);
      router.push('/admin'); // Redirect to dashboard
      router.refresh(); // Trigger data refresh
      
    } catch (err) {
      console.error('Submission Error:', err);
      setError(err.message || `Failed to ${isEdit ? 'update' : 'add'} style. Check console for details.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow-premium">
      <h2 className="text-3xl font-serif font-bold text-deep-violet mb-6">
        {isEdit ? 'Edit Hair Style' : 'Add New Hair Style'}
      </h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}

      {/* Style Image Preview */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/2">
            <Input 
                id="image_url" 
                label="Image URL" 
                type="url"
                placeholder="[https://example.com/image.jpg](https://example.com/image.jpg)"
                value={formData.image_url} 
                onChange={handleChange}
                required
            />
        </div>
        <div className="w-full md:w-1/2">
            <p className="block text-sm font-medium text-deep-violet mb-2">Image Preview</p>
            <div className="relative w-full aspect-[4/5] bg-subtle-gray rounded-lg overflow-hidden border border-subtle-gray">
                {formData.image_url ? (
                    <Image
                        src={formData.image_url}
                        alt="Style Preview"
                        fill
                        className="object-cover"
                        onError={(e) => { e.target.src = '[https://picsum.photos/400/500?grayscale](https://picsum.photos/400/500?grayscale)'; e.target.srcset = ''; }}
                    />
                ) : (
                    <div className='flex items-center justify-center h-full text-deep-violet/50'>
                        No Image URL provided
                    </div>
                )}
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input 
          id="name" 
          label="Style Name" 
          placeholder="e.g., Butterfly Locs"
          value={formData.name} 
          onChange={handleChange}
          required
        />
        <Input 
          id="price" 
          label="Price (₦)" 
          type="number" 
          step="500"
          placeholder="e.g., 12000"
          value={formData.price} 
          onChange={handleChange}
          required
        />
      </div>

      <Input 
        id="description" 
        label="Description" 
        type="textarea"
        placeholder="A short, elegant description of the style."
        value={formData.description} 
        onChange={handleChange}
      />

      <Input 
        id="tags" 
        label="Category/Tags (Comma Separated)" 
        placeholder="braids, protective, curly"
        value={formData.tags.join(', ')} 
        onChange={handleTagsChange}
      />
      
      {/* Featured Checkbox */}
      <div className="flex items-center space-x-2 pt-2">
        <input
          id="is_featured"
          type="checkbox"
          checked={formData.is_featured}
          onChange={handleChange}
          className="h-5 w-5 rounded text-muted-lavender focus:ring-muted-lavender border-gray-300"
        />
        <label htmlFor="is_featured" className="text-sm font-medium text-deep-violet cursor-pointer">
          Mark as Featured (Show on Homepage)
        </label>
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-4 pt-4 border-t border-subtle-gray mt-6">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => router.push('/admin')}
          disabled={loading}
        >
          <X className='h-4 w-4 mr-2'/>
          Cancel
        </Button>
        <Button 
          type="submit" 
          variant="primary" 
          isLoading={loading}
        >
          <Check className='h-4 w-4 mr-2'/>
          {isEdit ? 'Save Changes' : 'Add New Style'}
        </Button>
      </div>
    </form>
  );
}
