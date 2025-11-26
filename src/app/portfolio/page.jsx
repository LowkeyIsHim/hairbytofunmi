import PortfolioGrid from '@/components/Public/PortfolioGrid';
import { publicSupabase, getSettings } from '@/lib/supabase';
import { Image as ImageIcon } from 'lucide-react';

export const metadata = {
  title: 'Portfolio | HairByTofunmi - Visual Gallery',
  description: 'Browse our visual portfolio of stunning hairstyling work. Click any image to view details and book the style directly via WhatsApp.',
};

export default async function PortfolioPage() {
  // Fetch all styles (primarily for their image URLs)
  const { data: styles, error } = await publicSupabase
    .from('styles')
    .select('id, name, image_url');

  const settings = await getSettings();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fadeIn">
      <header className="text-center mb-16">
        <ImageIcon size={48} className='mx-auto text-soft-gold mb-4'/>
        <h1 className="text-6xl font-serif font-extrabold text-deep-violet mb-4">
          Visual Portfolio
        </h1>
        <p className="text-xl text-muted-lavender max-w-3xl mx-auto">
          A glimpse into the artistry. Click on any image to view details and book that style.
        </p>
      </header>
      
      {error && <p className="text-center text-red-500">Error loading portfolio: {error.message}</p>}

      <PortfolioGrid styles={styles || []} whatsappNumber={settings.whatsapp_number} />

      {styles?.length === 0 && (
        <div className="text-center py-20 text-deep-violet/70 italic">
          The portfolio is currently empty. Check back soon for new styles!
        </div>
      )}
    </div>
  );
}
