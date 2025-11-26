import { createAdminClient, getSettings } from '@/lib/supabase';
import { cookies } from 'next/headers';
import AdminDashboard from '@/components/Admin/AdminDashboard';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Dashboard | HairByTofunmi Admin',
  robots: 'noindex, nofollow',
};

export default async function AdminPage() {
  const cookieStore = cookies();
  const supabase = createAdminClient(cookieStore);

  // Check authentication status
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();
  
  // ProtectedRoute handles redirect, but a server component check is good practice
  if (sessionError || !session) {
    redirect('/admin/login');
  }

  // Fetch data for the dashboard
  const { data: styles, error: stylesError } = await supabase
    .from('styles')
    .select('*')
    .order('created_at', { ascending: false });

  const settings = await getSettings(); // Uses the public client, but accessible here

  if (stylesError) {
    // Basic error handling for server component
    return <div className="text-red-500">Error loading styles data: {stylesError.message}</div>;
  }

  return (
    <AdminDashboard 
      styles={styles || []} 
      totalStyles={styles?.length || 0}
      settings={settings}
    />
  );
}
