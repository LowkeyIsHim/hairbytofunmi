// src/app/admin/layout.js (FIXED & UPGRADED)

"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation"; // <-- ADD usePathname
import { useEffect } from "react";
import { LogOut } from "lucide-react";
import { auth } from "@/lib/firebase"; // <-- Needed for logout

export default function AdminLayout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname(); // <-- Get current path

  // Determine if the current page is the login page
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (!loading) {
      if (!user && !isLoginPage) {
        // 1. If NOT logged in and NOT on the login page, redirect to login
        router.push("/admin/login");
      } else if (user && user.email !== "kofoworoladickson@gmail.com") {
        // 2. If logged in but NOT the admin email, kick out to homepage
        auth.signOut(); // Ensure they are logged out completely
        router.push("/"); 
      } else if (user && isLoginPage) {
         // 3. If logged in and on the login page, redirect to dashboard
         router.push("/admin/dashboard");
      }
    }
  }, [user, loading, router, isLoginPage]);

  // If loading, show nothing for a clean transition
  if (loading) return null; 

  // If on the login page, just render the child component (Login.js)
  // The login component handles its own display
  if (isLoginPage) return <>{children}</>; 

  // If we are here, the user is logged in, is the correct admin, and we render the dashboard layout
  if (!user) return null; // Should have been redirected, but safety check

  const handleLogout = () => {
      auth.signOut();
      router.push("/admin/login");
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-brand-dark">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-brand-dark text-brand-cream flex flex-col shadow-2xl">
        <div className="p-6 font-serif text-2xl font-bold border-b border-brand-charcoal">Admin Panel</div>
        <nav className="flex-1 p-4 space-y-2">
            <Link href="/admin/dashboard" className="block px-4 py-2 hover:bg-brand-gold/20 hover:text-brand-gold rounded transition-colors">Dashboard</Link>
            <Link href="/" className="block px-4 py-2 hover:bg-brand-gold/20 hover:text-brand-gold rounded transition-colors">View Live Site</Link>
        </nav>
        <div className="p-4 border-t border-brand-charcoal">
            <button onClick={handleLogout} className="flex items-center gap-2 w-full bg-brand-gold text-brand-dark px-4 py-2 rounded shadow hover:bg-brand-gold/80 transition-colors">
                <LogOut size={18} /> Logout
            </button>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto p-8 bg-brand-cream dark:bg-brand-dark">
        {children}
      </main>
    </div>
  );
}
