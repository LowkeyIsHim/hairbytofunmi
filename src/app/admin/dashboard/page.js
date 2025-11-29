"use client";
import { useState, useEffect } from "react";
import { collection, addDoc, deleteDoc, doc, onSnapshot, updateDoc, serverTimestamp } from "firebase/firestore";
import { auth } from "@/lib/firebase"; // Only keep auth for the signOut function
import toast from "react-hot-toast";
import { Trash2, Plus, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Dashboard() {
  // CRITICAL: Get db from context, alongside user and loading state
  const { user, loading, db } = useAuth(); 
  const [styles, setStyles] = useState([]);
  const [newStyle, setNewStyle] = useState({ name: "", price: "", description: "", imageUrl: "", featured: false });
  const [isAdding, setIsAdding] = useState(false);
  const router = useRouter();

  // --- SAFE AUTHENTICATION CHECK & REDIRECT ---
  useEffect(() => {
    // Only run this check after the loading state is resolved (auth state determined)
    if (!loading) {
        if (!user) {
            // Safer redirect inside useEffect
            console.log("Dashboard: User not authenticated. Redirecting.");
            router.push("/admin/login");
        }
    }
  }, [loading, user, router]); 

  
  // --- DATA SUBSCRIPTION EFFECT ---
  useEffect(() => {
    // We only subscribe to data if the user is present AND the db object is ready
    if (user && db) {
        console.log("Dashboard: Subscribing to styles collection.");
        
        const stylesCollection = collection(db, "styles"); 
        
        const unsubscribe = onSnapshot(stylesCollection, (snapshot) => {
            setStyles(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        }, (error) => {
            console.error("Error fetching styles:", error);
            toast.error("Failed to load styles data.");
        });
        
        // Cleanup function runs on unmount
        return () => unsubscribe();
    }
  }, [user, db]); // Rerun when user or db (from context) changes

  // Display a loading indicator if authentication is still pending, or if DB is not ready
  if (loading || !db) {
    // AuthContext is showing the main spinner, so we can return null here.
    return null; 
  }
  
  // If we reach here, user is logged in, and db is ready.
  
  // Data Handlers 
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!db) return toast.error("Database not ready.");

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
      console.error(err);
      toast.error("Error adding style");
    }
  };

  // NOTE: window.confirm is not supported in the sandbox. We'll use a direct action.
  const handleDelete = async (id) => {
    if (!db) return toast.error("Database not ready.");
    
    // In a real app, you would use a custom modal here. For now, we perform the delete directly.
    await deleteDoc(doc(db, "styles", id));
    toast.success("Deleted");
  };

  const toggleFeatured = async (style) => {
      if (!db) return toast.error("Database not ready.");
      await updateDoc(doc(db, "styles", style.id), {
          featured: !style.featured
      });
  };

  const handleLogout = async () => {
      await auth.signOut();
      toast.success("Logged out successfully");
      router.push("/admin/login");
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
                          <td className="p-4">
                              <button onClick={() => handleDelete(style.id)} className="text-red-500 hover:text-red-700 transition-colors" title="Delete Style">
                                <Trash2 size={18} />
                              </button>
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
