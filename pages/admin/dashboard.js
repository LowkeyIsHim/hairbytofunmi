import { useState, useEffect } from 'react';
import { supabase } from '../../supabase/client';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const [styles, setStyles] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchStyles();
    const subscription = supabase
      .from('hair_styles')
      .on('*', () => fetchStyles())
      .subscribe();
    return () => supabase.removeSubscription(subscription);
  }, []);

  const fetchStyles = async () => {
    const { data } = await supabase.from('hair_styles').select('*');
    setStyles(data || []);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this style?')) return;
    await supabase.from('hair_styles').delete().eq('id', id);
    fetchStyles();
  };

  return (
    <div className="min-h-screen bg-secondary p-6">
      <h1 className="text-3xl font-heading mb-6">Admin Dashboard</h1>
      <Link href="/admin/addStyle">
        <a className="inline-block mb-4 bg-accent text-white px-4 py-2 rounded-md">Add New Style</a>
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {styles.map(style => (
          <div key={style.id} className="bg-white p-4 rounded-md shadow-md">
            <img src={style.image} alt={style.name} className="w-full h-48 object-cover mb-2 rounded-md" />
            <h2 className="font-semibold text-xl">{style.name}</h2>
            <p>₦{style.price.toLocaleString()}</p>
            <div className="flex space-x-2 mt-2">
              <Link href={`/admin/editStyle/${style.id}`}>
                <a className="bg-primary text-white px-2 py-1 rounded-md">Edit</a>
              </Link>
              <button onClick={() => handleDelete(style.id)} className="bg-red-500 text-white px-2 py-1 rounded-md">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
