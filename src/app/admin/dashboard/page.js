// src/app/admin/dashboard/page.js (UPGRADED)

"use client";
import { useState, useEffect } from "react";
import { collection, addDoc, deleteDoc, doc, onSnapshot, updateDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import toast from "react-hot-toast";
import { Trash2, Plus, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext"; // <-- NEW IMPORT

export default function Dashboard() {
  const { user, loading } = useAuth(); // <-- GET AUTH STATE
  const [styles, setStyles] = useState([]);
  const [newStyle, setNewStyle] = useState({ name: "", price: "", description: "", imageUrl: "", featured: false });
  const [isAdding, setIsAdding] = useState(false);
  const router = useRouter();

  // --- AUTHENTICATION CHECK EFFECT ---
  useEffect(() => {
    // 1. If loading, do nothing (wait for auth context to finish checking)
    if (loading) return; 

    // 2. If NOT loading and user is NULL, redirect to login
    if (!user) {
      router.push("/admin/login");
      return;
    }
    
    // 3. If NOT loading and user EXISTS, subscribe to data
    const unsubscribe = onSnapshot(collection(db, "styles"), (snapshot) => {
      setStyles(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    
    // Cleanup function runs on unmount or when dependencies change
    return () => unsubscribe();
  }, [user, loading, router]); // Dependency array ensures reruns on state change

  // Data Handlers (handleAdd, handleDelete, toggleFeatured, handleLogout remain the same)

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "styles"), {
        ...newStyle,
        price: Number(newStyle.price),
        createdAt: serverTimestamp()
      });
      setNewStyle({ name: "", price: "", description: "", imageUrl: "", featured: false });
      setIsAdding(false);
      toast.success("Style added successfully!");
    } catch (err) {
      toast.error("Error adding style");
    }
  };

  const handleDelete = async (id) => {
    if(confirm("Are you sure you want to delete this style?")) {
        await deleteDoc(doc(db, "styles", id));
        toast.success("Deleted");
    }
  };

  const toggleFeatured = async (style) => {
      await updateDoc(doc(db, "styles", style.id), {
          featured: !style.featured
      });
  };

  const handleLogout = () => {
      auth.signOut();
      router.push("/admin/login");
  }

  // --- Render logic based on authentication status ---

  // If loading, show the loader (it's already handled by AuthContext, but a fallback is safe)
  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-brand-gold"></div>
      </div>
    );
  }

  // If not loading and no user, we rely on the useEffect redirect above. 
  // This return block ensures we don't try to render the dashboard while waiting for the redirect.
  if (!user) {
    return null; 
  }


  // --- Render the Dashboard when authenticated ---
  return (
    <div className="p-8 bg-brand-cream min-h-screen dark:bg-brand-dark transition-colors">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif text-brand-dark dark:text-brand-cream">Manage Styles</h1>
          <div className="flex gap-4">
              <button 
                  onClick={() => setIsAdding(!isAdding)} 
                  className="flex items-center gap-2 bg-brand-gold text-brand-dark px-4 py-2 rounded shadow hover:bg-brand-dark hover:text-brand-gold transition-colors"
              >
                  <Plus size={18} /> Add New Style
              </button>
              <button 
                  onClick={handleLogout} 
                  className="flex items-center gap-2 border border-gray-400 text-gray-800 dark:text-brand-cream dark:border-brand-cream px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-brand-charcoal transition-colors"
              >
                  <LogOut size={18} /> Logout
              </button>
          </div>
        </div>

        {isAdding && (
          <form onSubmit={handleAdd} className="bg-white dark:bg-brand-charcoal p-6 rounded shadow mb-8 border border-brand-gold transition-colors">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input required placeholder="Style Name" className="border p-3 rounded dark:bg-brand-dark dark:text-brand-cream dark:border-brand-charcoal" value={newStyle.name} onChange={e => setNewStyle({...newStyle, name: e.target.value})} />
                  <input required placeholder="Price (Numbers only)" type="number" className="border p-3 rounded dark:bg-brand-dark dark:text-brand-cream dark:border-brand-charcoal" value={newStyle.price} onChange={e => setNewStyle({...newStyle, price: e.target.value})} />
                  <input required placeholder="Image URL (https://...)" type="url" className="border p-3 rounded col-span-2 dark:bg-brand-dark dark:text-brand-cream dark:border-brand-charcoal" value={newStyle.imageUrl} onChange={e => setNewStyle({...newStyle, imageUrl: e.target.value})} />
                  <textarea required placeholder="Description" className="border p-3 rounded col-span-2 dark:bg-brand-dark dark:text-brand-cream dark:border-brand-charcoal" value={newStyle.description} onChange={e => setNewStyle({...newStyle, description: e.target.value})} />
                  <label className="flex items-center gap-2 cursor-pointer text-brand-dark dark:text-brand-cream">
                      <input type="checkbox" checked={newStyle.featured} onChange={e => setNewStyle({...newStyle, featured: e.target.checked})} className="w-4 h-4 text-brand-gold border-gray-300 rounded focus:ring-brand-gold"/>
                      Make Featured on Home Page
                  </label>
              </div>
              <button type="submit" className="mt-6 bg-brand-dark dark:bg-brand-gold text-brand-cream dark:text-brand-dark px-6 py-2 rounded shadow-md hover:shadow-lg transition-shadow">Save Style</button>
          </form>
        )}

        <div className="bg-white dark:bg-brand-charcoal rounded shadow overflow-hidden">
          <table className="w-full text-left">
              <thead className="bg-gray-100 dark:bg-brand-dark/50 border-b border-brand-gold/50">
                  <tr>
                      <th className="p-4 text-brand-dark dark:text-brand-gold">Image</th>
                      <th className="p-4 text-brand-dark dark:text-brand-gold">Name</th>
                      <th className="p-4 text-brand-dark dark:text-brand-gold">Price</th>
                      <th className="p-4 text-brand-dark dark:text-brand-gold">Featured</th>
                      <th className="p-4 text-brand-dark dark:text-brand-gold">Actions</th>
                  </tr>
              </thead>
              <tbody>
                  {styles.map(style => (
                      <tr key={style.id} className="border-b border-gray-100 dark:border-brand-dark hover:bg-gray-50 dark:hover:bg-brand-dark/50 transition-colors">
                          <td className="p-4"><img src={style.imageUrl} className="w-12 h-12 object-cover rounded shadow-sm" alt="" /></td>
                          <td className="p-4 font-medium text-brand-dark dark:text-brand-cream">{style.name}</td>
                          <td className="p-4 text-brand-dark dark:text-brand-cream">₦{style.price?.toLocaleString()}</td>
                          <td className="p-4">
                              <input type="checkbox" checked={style.featured} onChange={() => toggleFeatured(style)} className="cursor-pointer text-brand-gold focus:ring-brand-gold"/>
                          </td>
                          <td className="p-4 text-red-500 hover:text-red-700 cursor-pointer transition-colors" onClick={() => handleDelete(style.id)}>
                              <Trash2 size={18} />
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>
          {styles.length === 0 && <p className="p-8 text-center text-gray-500 dark:text-brand-charcoal">No styles added yet.</p>}
        </div>
      </div>
    </div>
  );
}
