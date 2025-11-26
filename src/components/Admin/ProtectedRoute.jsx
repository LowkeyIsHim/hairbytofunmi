'use client';
import { useEffect, useState } from 'react';
import { createBrowserClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize Supabase client
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        // Not logged in, redirect to login
        router.replace('/admin/login');
        setIsAuthenticated(false);
      } else {
        // Logged in
        setIsAuthenticated(true);
      }
      setLoading(false);
    };

    checkAuth();
  }, [router, supabase.auth]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-cream-white">
        <Loader2 className="h-8 w-8 text-muted-lavender animate-spin" />
        <p className="ml-3 text-deep-violet">Loading Admin Session...</p>
      </div>
    );
  }

  if (isAuthenticated) {
    return <>{children}</>;
  }
  
  // Render nothing if not authenticated but still loading/redirecting
  return null;
}
