"use client";
import { useEffect, useState } from 'react';
import { useData } from '@/context/DataContext';
import { useRouter } from 'next/navigation';
import { Trash2, Edit2, Plus, X, LogOut } from 'lucide-react';
import { HairStyle } from '@/lib/initialData';

export default function AdminDashboard() {
  const { isAuthenticated, styles, deleteStyle, updateStyle, addStyle, logout } = useData();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState<Partial<HairStyle>>({
    name: '', price: 0, category: 'Braids', image: '', recommended: false
  });

  useEffect(() => {
    if (!isAuthenticated) router.push('/login');
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price) return;

    const styleToSave = { 
        ...formData, 
        price: Number(formData.price), // Ensure price is number
        image: formData.image || 'https://placehold.co/600x800/CFB998/1C1917?text=New+Style'
    } as HairStyle;

    if (isEditing) {
      updateStyle({ ...styleToSave, id: isEditing });
    } else {
      addStyle(styleToSave);
    }
    resetForm();
  };

  const handleEdit = (style: HairStyle) => {
    setFormData(style);
    setIsEditing(style.id);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({ name: '', price: 0, category: 'Braids', image: '', recommended: false });
    setIsEditing(null);
    setShowForm(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8 border-b border-primary/50 pb-4">
        <div>
          <h1 className="font-serif text-4xl text-dark">Stylist Dashboard</h1>
          <p className="text-stone-500 mt-1">Manage styles, images, and pricing.</p>
        </div>
        <button 
          onClick={logout} 
          className="flex items-center gap-2 text-sm text-red-500 font-medium border border-red-500 px-4 py-2 rounded-full hover:bg-red-50 transition"
        >
            <LogOut size={16}/> Logout
        </button>
      </div>

      <div className="flex justify-between items-center mb-8">
        <h2 className="font-serif text-2xl">Style Inventory ({styles.length})</h2>
        <button 
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-dark text-white px-6 py-3 rounded-full font-bold hover:bg-primary hover:text-dark transition shadow-md"
        >
          <Plus size={20} /> Add New Style
        </button>
      </div>


      {/* Add/Edit Form Overlay */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
              <h2 className="font-serif text-2xl text-dark">{isEditing ? 'Edit Style' : 'Add New Style'}</h2>
              <button onClick={resetForm} className="p-2 text-stone-500 hover:text-dark rounded-full"><X size={24} /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-dark">Style Name *</label>
                <input 
                  type="text" required
                  className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                  value={formData.name || ''}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-dark">Price (₦) *</label>
                <input 
                  type="number" required
                  className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                  value={formData.price || 0}
                  onChange={e => setFormData({...formData, price: Number(e.target.value)})}
                />
              </div>
               <div>
                <label className="block text-sm font-medium mb-1 text-dark">Category</label>
                <select 
                  className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                  value={formData.category || 'Braids'}
                  onChange={e => setFormData({...formData, category: e.target.value})}
                >
                    <option value="Braids">Braids</option>
                    <option value="Twists">Twists</option>
                    <option value="Locs">Locs</option>
                    <option value="Cornrows">Cornrows</option>
                    <option value="Natural">Natural</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-dark">Image URL</label>
                <input 
                  type="text" 
                  className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                  placeholder="https://images.unsplash.com/..."
                  value={formData.image || ''}
                  onChange={e => setFormData({...formData, image: e.target.value})}
                />
                <p className="text-xs text-stone-500 mt-1">Paste a direct image link (e.g., from Cloudinary or Unsplash).</p>
              </div>
               <div className="flex items-center space-x-2">
                <input 
                  type="checkbox"
                  id="recommended"
                  checked={formData.recommended || false}
                  onChange={e => setFormData({...formData, recommended: e.target.checked})}
                  className="h-4 w-4 text-primary border-stone-300 rounded focus:ring-primary"
                />
                <label htmlFor="recommended" className="text-sm font-medium text-dark">Mark as Recommended Style (Homepage Highlight)</label>
              </div>
              <button type="submit" className="w-full bg-dark text-white py-3 rounded-lg font-bold uppercase tracking-wider hover:bg-primary hover:text-dark transition shadow-md mt-6">
                {isEditing ? 'Save Changes' : 'Add Style to Site'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Styles List Table */}
      <div className="bg-white rounded-xl shadow-xl border border-stone-100 overflow-hidden mt-8">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="bg-stone-50 border-b border-stone-100">
              <tr>
                <th className="p-4 font-medium text-stone-500">Image</th>
                <th className="p-4 font-medium text-stone-500">Name</th>
                <th className="p-4 font-medium text-stone-500">Category</th>
                <th className="p-4 font-medium text-stone-500">Price (₦)</th>
                <th className="p-4 font-medium text-stone-500">Rec.</th>
                <th className="p-4 font-medium text-stone-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {styles.map(style => (
                <tr key={style.id} className="border-b border-stone-50/50 hover:bg-stone-50/50 transition">
                  <td className="p-4">
                    <img src={style.image} alt={style.name} className="w-16 h-16 rounded object-cover bg-stone-200 shadow-sm" />
                  </td>
                  <td className="p-4 font-bold text-dark">{style.name}</td>
                  <td className="p-4 text-sm text-stone-600">{style.category}</td>
                  <td className="p-4 font-bold text-primary">₦{style.price.toLocaleString()}</td>
                   <td className="p-4">{style.recommended ? '✅' : '❌'}</td>
                  <td className="p-4 text-right space-x-2">
                    <button 
                      onClick={() => handleEdit(style)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition"
                      title="Edit Style"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button 
                      onClick={() => { if(window.confirm(`Are you sure you want to delete ${style.name}?`)) deleteStyle(style.id) }}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-full transition"
                      title="Delete Style"
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
    </div>
  );
}
