'use client';
import { publicSupabase } from '@/lib/supabase';
import { formatPrice } from '@/lib/utils';
import { Edit, Trash2, Eye } from 'lucide-react';
import Link from 'next/link';
import Button from '../ui/Button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AdminTable({ styles: initialStyles }) {
  const router = useRouter();
  const [styles, setStyles] = useState(initialStyles);
  const [loadingId, setLoadingId] = useState(null);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this hair style? This action is irreversible.')) {
      return;
    }
    setLoadingId(id);

    // Supabase RLS allows authenticated users to DELETE
    const { error } = await publicSupabase.from('styles').delete().eq('id', id);

    if (error) {
      console.error('Error deleting style:', error);
      alert('Failed to delete style. Check console for details.');
    } else {
      // Optimistically update the UI
      setStyles(prev => prev.filter(style => style.id !== id));
      router.refresh(); // Trigger a re-fetch for safety/consistency
    }
    setLoadingId(null);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-subtle-gray">
        <thead className="bg-subtle-gray/50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-deep-violet uppercase tracking-wider">Style Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-deep-violet uppercase tracking-wider">Price (₦)</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-deep-violet uppercase tracking-wider">Featured</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-deep-violet uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-subtle-gray">
          {styles.length > 0 ? styles.map((style) => (
            <tr key={style.id} className="hover:bg-subtle-gray/30 transition duration-150">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-deep-violet">{style.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-deep-violet/80">{formatPrice(style.price)}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${style.is_featured ? 'bg-soft-gold/30 text-deep-violet' : 'bg-subtle-gray text-deep-violet/70'}`}>
                  {style.is_featured ? 'Yes' : 'No'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="space-x-2 inline-flex">
                  <Link href={`/admin/styles/edit/${style.id}`}>
                    <Button variant="secondary" className="p-2" aria-label="Edit Style">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button 
                    variant="danger" 
                    onClick={() => handleDelete(style.id)} 
                    isLoading={loadingId === style.id}
                    className="p-2"
                    aria-label="Delete Style"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </td>
            </tr>
          )) : (
            <tr>
                <td colSpan={4} className="px-6 py-10 text-center text-deep-violet/70 italic">
                    No hair styles found. <Link href="/admin/styles/add" className='text-muted-lavender hover:underline'>Click here to add one.</Link>
                </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
