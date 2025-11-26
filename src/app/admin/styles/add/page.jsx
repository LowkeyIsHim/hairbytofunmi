import AdminStyleForm from '@/components/Admin/AdminStyleForm';

export const metadata = {
  title: 'Add New Style | HairByTofunmi Admin',
  robots: 'noindex, nofollow',
};

export default function AddStylePage() {
  return (
    <div className="max-w-4xl mx-auto">
      <AdminStyleForm isEdit={false} />
    </div>
  );
}
