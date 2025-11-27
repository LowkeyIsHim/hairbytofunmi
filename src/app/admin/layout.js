"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/admin/login");
      } else if (user.email !== "kofoworoladickson@gmail.com") {
        router.push("/"); // Kick out non-admins
      }
    }
  }, [user, loading, router]);

  if (loading || !user) return null;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-brand-900 text-white flex flex-col">
        <div className="p-6 font-serif text-2xl font-bold border-b border-brand-800">Admin Panel</div>
        <nav className="flex-1 p-4 space-y-2">
            <a href="/admin/dashboard" className="block px-4 py-2 hover:bg-brand-800 rounded">Dashboard</a>
            <a href="/" className="block px-4 py-2 hover:bg-brand-800 rounded opacity-50">View Live Site</a>
        </nav>
      </aside>
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
}
