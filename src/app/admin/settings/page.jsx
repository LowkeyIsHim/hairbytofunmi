import { createAdminClient, createBrowserClient } from '@/lib/supabase'; // NOTE: Added createBrowserClient import for the client component
import { cookies } from 'next/headers';
import { getSettings } from '@/lib/supabase';
// REMOVED: import AdminSettingsForm from './AdminSettingsForm'; // <--- CAUSE OF THE ERROR
import { redirect } from 'next/navigation';
import { useState } from 'react'; // NOTE: Added useState import for the client component
// Assuming Input and Button are imported from your components directory
import Input from '@/components/ui/Input'; 
import Button from '@/components/ui/Button'; 

export const metadata = {
  title: 'Settings | HairByTofunmi Admin',
  robots: 'noindex, nofollow',
};

// Client-side form component within the server page (This is the definition)
const AdminSettingsForm = ({ initialData }) => {
  'use client';
  const [formData, setFormData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  // Initialize browser client for client-side updates
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  // ... (rest of the component logic is unchanged)
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setMessage(null);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      // Supabase RLS allows authenticated users to UPDATE
      const { data, error } = await supabase
        .from('settings')
        .update(formData)
        .eq('id', 1)
        .select();

      if (error) throw error;

      setMessage('Settings updated successfully! The public site is now live.');
      
    } catch (err) {
      console.error('Settings Update Error:', err);
      setError('Failed to update settings. Check console for details.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-serif font-bold text-deep-violet mb-8">Site Settings</h1>
      
      {message && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{message}</span>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow-premium">
        <Input 
          id="stylist_bio" 
          label="Stylist Bio (Homepage Tagline)" 
          type="textarea"
          value={formData.stylist_bio || ''} 
          onChange={handleChange}
          required
        />
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <Input 
            id="working_hours" 
            label="Working Hours" 
            placeholder="e.g., 9:00 AM — 7:00 PM"
            value={formData.working_hours || ''} 
            onChange={handleChange}
            required
          />
          <Input 
            id="whatsapp_number" 
            label="WhatsApp Number (e.g., 2348012345678)" 
            type="tel"
            value={formData.whatsapp_number || ''} 
            onChange={handleChange}
            required
          />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <Input 
            id="tiktok_link" 
            label="TikTok Profile Link" 
            type="url"
            value={formData.tiktok_link || ''} 
            onChange={handleChange}
          />
          <Input 
            id="email_link" 
            label="Email Link (mailto:)" 
            type="url"
            value={formData.email_link || ''} 
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-end pt-4 border-t border-subtle-gray mt-6">
          <Button 
            type="submit" 
            variant="primary" 
            isLoading={loading}
          >
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};


// Server component wrapper (Function is unchanged)
async function AdminSettingsFormWrapper() {
  const cookieStore = cookies();
  const supabase = createAdminClient(cookieStore);

  // Re-check authentication status (though Layout also does this)
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();
  if (sessionError || !session) {
    redirect('/admin/login');
  }

  // Fetch current settings for form
  const settings = await getSettings();

  return <AdminSettingsForm initialData={settings} supabase={supabase} />;
}

export default AdminSettingsFormWrapper;
