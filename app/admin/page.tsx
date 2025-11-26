"use client";
import { useEffect, useState } from 'react';
import { useData } from '@/context/DataContext';
import { useRouter } from 'next/navigation';
import { Trash2, Edit2, Plus, X } from 'lucide-react';
import { HairStyle } from '@/lib/initialData';

export default function AdminDashboard() {
  const { isAuthenticated, styles, addStyle, deleteStyle, updateStyle, logout } = useData();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState<Partial<HairStyle>>({
    name: '', price: 0, category: '', image: ''
  });

  useEffect(() => {
    if (!isAuthenticated) router.push('/login');
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price) return;

    if (isEditing) {
      updateStyle({ ...formData, id: isEditing } as HairStyle);
    } else {
      addStyle({ ...formData, id: Date.now().toString() } as HairStyle);
    }
    resetForm();
  };

  const handleEdit = (style: HairStyle) => {
    setFormData(style);
    setIsEditing(style.id);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({ name: '', price: 0, category: '', image: '' });
    setIsEditing(null);
    setShowForm(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-serif text-3xl">Admin Dashboard</h1>
          <p className="text-stone-500">Manage styles and prices</p>
        </div>
        <button onClick={logout} className="text-sm text-red-500 hover:underline">Logout</button>
      </div>

      <button 
        onClick={() => setShowForm(true)}
        className="mb-8 flex items-center gap-2 bg-primary text-stone-900 px-6 py-3 rounded-lg font-bold hover:bg-amber-400 transition"
      >
        <Plus size={20} /> Add New Style
      </button>

      {/* Add/Edit Form Overlay */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-serif text-2xl">{isEditing ? 'Edit Style' : 'New Style'}</h2>
              <button onClick={resetForm}><X /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Style Name</label>
                <input 
                  type="text" required
                  className="w-full p-2 border rounded"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Price (₦)</label>
                <input 
                  type="number" required
                  className="w-full p-2 border rounded"
                  value={formData.price}
                  onChange={e => setFormData({...formData, price: Number(e.target.value)})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <input 
                  type="text" 
                  className="w-full p-2 border rounded"
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Image URL</label>
                <input 
                  type="text" 
                  className="w-full p-2 border rounded"
                  placeholder="https://..."
                  value={formData.image}
                  onChange={e => setFormData({...formData, image: e.target.value})}
                />
                <p className="text-xs text-stone-500 mt-1">Paste an image link. For demo, use unsplash or placehold.co links.</p>
              </div>
              <button type="submit" className="w-full bg-stone-900 text-white py-3 rounded hover:bg-stone-800">
                {isEditing ? 'Update Style' : 'Save Style'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Styles List */}
      <div className="bg-white rounded-xl shadow border border-stone-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-stone-50 border-b border-stone-100">
            <tr>
              <th className="p-4 font-medium text-stone-500">Image</th>
              <th className="p-4 font-medium text-stone-500">Name</th>
              <th className="p-4 font-medium text-stone-500">Price</th>
              <th className="p-4 font-medium text-stone-500 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {styles.map(style => (
              <tr key={style.id} className="border-b border-stone-50 hover:bg-stone-50/50">
                <td className="p-4">
                  <img src={style.image} alt={style.name} className="w-12 h-12 rounded object-cover bg-stone-200" />
                </td>
                <td className="p-4 font-bold">{style.name}</td>
                <td className="p-4">₦{style.price.toLocaleString()}</td>
                <td className="p-4 text-right space-x-2">
                  <button 
                    onClick={() => handleEdit(style)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button 
                    onClick={() => deleteStyle(style.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
