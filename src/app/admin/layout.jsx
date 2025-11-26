import ProtectedRoute from '@/components/Admin/ProtectedRoute';
import Link from 'next/link';
import { LogOut, Home, Settings, LayoutGrid } from 'lucide-react';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// Server-side action to handle logout
async function signOut() {
  'use server';
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get: (name) => cookieStore.get(name)?.value,
        set: (name, value, options) => cookieStore.set({ name, value, ...options }),
        remove: (name, options) => cookieStore.set({ name, value: '', ...options }),
      },
    }
  );
  await supabase.auth.signOut();
  return redirect('/admin/login');
}

export default function AdminLayout({ children }) {
  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: Home },
    { name: 'Styles', href: '/admin/styles', icon: LayoutGrid },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-subtle-gray/50 flex">
        
        {/* Sidebar */}
        <aside className="w-64 bg-deep-violet text-cream-white p-6 sticky top-0 h-screen hidden md:block">
          <h1 className="text-3xl font-serif font-bold text-soft-gold mb-10">Admin Panel</h1>
          
          <nav className="space-y-4 flex-grow">
            {navItems.map((item) => (
              <Link 
                key={item.name}
                href={item.href}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted-lavender/50 transition duration-200"
              >
                <item.icon className='h-5 w-5 text-soft-gold' />
                <span className='font-medium'>{item.name}</span>
              </Link>
            ))}
          </nav>
          
          {/* Logout Form */}
          <form action={signOut} className="mt-10 pt-4 border-t border-muted-lavender/30">
            <button
              type="submit"
              className="flex items-center space-x-3 p-3 w-full rounded-lg text-red-300 hover:bg-red-900 transition duration-200"
            >
              <LogOut className='h-5 w-5' />
              <span className='font-medium'>Sign Out</span>
            </button>
          </form>
        </aside>

        {/* Content Area */}
        <div className="flex-grow p-4 md:p-10">
          {children}
        </div>
      </div>
    </ProtectedRoute>
  );
}
