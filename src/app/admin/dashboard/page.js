"use client";
import { useState, useEffect } from "react";
import { collection, addDoc, deleteDoc, doc, onSnapshot, updateDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import toast from "react-hot-toast";
import { Trash2, Plus, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [styles, setStyles] = useState([]);
  const [newStyle, setNewStyle] = useState({ name: "", price: "", description: "", imageUrl: "", featured: false });
  const [isAdding, setIsAdding] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "styles"), (snapshot) => {
      setStyles(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

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

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif">Manage Styles</h1>
        <div className="flex gap-4">
            <button onClick={() => setIsAdding(!isAdding)} className="flex items-center gap-2 bg-brand-500 text-white px-4 py-2 rounded shadow hover:bg-brand-600">
                <Plus size={18} /> Add New Style
            </button>
            <button onClick={handleLogout} className="flex items-center gap-2 bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300">
                <LogOut size={18} /> Logout
            </button>
        </div>
      </div>

      {isAdding && (
        <form onSubmit={handleAdd} className="bg-white p-6 rounded shadow mb-8 border border-brand-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input required placeholder="Style Name" className="border p-2 rounded" value={newStyle.name} onChange={e => setNewStyle({...newStyle, name: e.target.value})} />
                <input required placeholder="Price (Numbers only)" type="number" className="border p-2 rounded" value={newStyle.price} onChange={e => setNewStyle({...newStyle, price: e.target.value})} />
                <input required placeholder="Image URL (https://...)" type="url" className="border p-2 rounded col-span-2" value={newStyle.imageUrl} onChange={e => setNewStyle({...newStyle, imageUrl: e.target.value})} />
                <textarea required placeholder="Description" className="border p-2 rounded col-span-2" value={newStyle.description} onChange={e => setNewStyle({...newStyle, description: e.target.value})} />
                <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={newStyle.featured} onChange={e => setNewStyle({...newStyle, featured: e.target.checked})} />
                    Make Featured on Home Page
                </label>
            </div>
            <button type="submit" className="mt-4 bg-black text-white px-6 py-2 rounded">Save Style</button>
        </form>
      )}

      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full text-left">
            <thead className="bg-gray-50 border-b">
                <tr>
                    <th className="p-4">Image</th>
                    <th className="p-4">Name</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Featured</th>
                    <th className="p-4">Actions</th>
                </tr>
            </thead>
            <tbody>
                {styles.map(style => (
                    <tr key={style.id} className="border-b hover:bg-gray-50">
                        <td className="p-4"><img src={style.imageUrl} className="w-12 h-12 object-cover rounded" alt="" /></td>
                        <td className="p-4 font-medium">{style.name}</td>
                        <td className="p-4">₦{style.price}</td>
                        <td className="p-4">
                            <input type="checkbox" checked={style.featured} onChange={() => toggleFeatured(style)} className="cursor-pointer"/>
                        </td>
                        <td className="p-4 text-red-500 cursor-pointer" onClick={() => handleDelete(style.id)}>
                            <Trash2 size={18} />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        {styles.length === 0 && <p className="p-8 text-center text-gray-500">No styles added yet.</p>}
      </div>
    </div>
  );
}
