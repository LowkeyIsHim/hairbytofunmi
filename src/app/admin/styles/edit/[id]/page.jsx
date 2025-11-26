import { createAdminClient } from '@/lib/supabase';
import { cookies } from 'next/headers';
import AdminStyleForm from '@/components/Admin/AdminStyleForm';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Edit Style | HairByTofunmi Admin',
  robots: 'noindex, nofollow',
};

export default async function EditStylePage({ params }) {
  const cookieStore = cookies();
  const supabase = createAdminClient(cookieStore);

  // Fetch the specific style to edit
  const { data: style, error } = await supabase
    .from('styles')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error || !style) {
    console.error('Error fetching style for edit:', error);
    notFound(); // Use Next.js notFound handler
  }

  // Ensure price is converted to string for the number input field
  const initialData = {
    ...style,
    price: style.price.toString(),
  };

  return (
    <div className="max-w-4xl mx-auto">
      <AdminStyleForm initialData={initialData} isEdit={true} />
    </div>
  );
}
