import { createAdminClient } from '@/lib/supabase';
import { cookies } from 'next/headers';
import AdminTable from '@/components/Admin/AdminTable';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export const metadata = {
  title: 'Styles List | HairByTofunmi Admin',
  robots: 'noindex, nofollow',
};

export default async function AdminStylesPage() {
  const cookieStore = cookies();
  const supabase = createAdminClient(cookieStore);

  // Fetch all styles
  const { data: styles, error } = await supabase
    .from('styles')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return <div className="text-red-500">Error loading styles: {error.message}</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-serif font-bold text-deep-violet">All Hair Styles ({styles?.length || 0})</h1>
        <Link href="/admin/styles/add">
            <Button variant="primary">
                <Plus className='h-4 w-4 mr-2'/>
                Add New Style
            </Button>
        </Link>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-premium">
        <AdminTable styles={styles || []} />
      </div>
    </div>
  );
}
