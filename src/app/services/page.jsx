import StyleCard from '@/components/Public/StyleCard';
import { publicSupabase, getSettings } from '@/lib/supabase';
import { HairDryer } from 'lucide-react';

export const metadata = {
  title: 'Services & Pricing | HairByTofunmi',
  description: 'View the full list of our premium hairstyling services and their prices, including Butterfly Locs, Knotless Braids, and more. Book your chosen style via WhatsApp.',
};

export default async function ServicesPage() {
  // Fetch all styles, ordered by price (expensive first)
  const { data: styles, error } = await publicSupabase
    .from('styles')
    .select('*')
    .order('price', { ascending: false });

  const settings = await getSettings();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fadeIn">
      <header className="text-center mb-16">
        <HairDryer size={48} className='mx-auto text-soft-gold mb-4'/>
        <h1 className="text-6xl font-serif font-extrabold text-deep-violet mb-4">
          All Services
        </h1>
        <p className="text-xl text-muted-lavender max-w-3xl mx-auto">
          Every style is crafted with dedication to detail, ensuring a perfect finish that protects your natural hair. All prices are for the basic service, final quote will be confirmed on WhatsApp.
        </p>
      </header>

      {error && <p className="text-center text-red-500">Error loading styles: {error.message}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {styles?.map((style) => (
          <StyleCard key={style.id} style={style} whatsappNumber={settings.whatsapp_number} />
        ))}
      </div>

      {styles?.length === 0 && (
        <div className="text-center py-20 text-deep-violet/70 italic">
          No services are currently listed. Please check back soon!
        </div>
      )}
    </div>
  );
}
