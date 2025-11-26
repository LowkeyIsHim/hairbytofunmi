import HeroSection from '@/components/Common/HeroSection';
import StyleCard from '@/components/Public/StyleCard';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { publicSupabase, getSettings } from '@/lib/supabase';
import { ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Home | HairByTofunmi - Elegant Hairstylist Services',
  description: 'Welcome to HairByTofunmi. Find your perfect look from our portfolio of premium styles like Butterfly Locs, Knotless Braids, and more. Book your appointment on WhatsApp.',
};

export default async function HomePage() {
  const { data: featuredStyles, error } = await publicSupabase
    .from('styles')
    .select('*')
    .eq('is_featured', true)
    .order('created_at', { ascending: false })
    .limit(4); // Limit to 4 featured styles

  const settings = await getSettings();

  return (
    <div className="animate-fadeIn">
      {/* 1. Hero Section */}
      <HeroSection settings={settings} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* 2. Featured Styles Section */}
        <section className="mt-12">
          <h2 className="text-5xl font-serif font-bold text-center text-deep-violet mb-4">
            Featured Styles
          </h2>
          <p className="text-center text-lg text-muted-lavender mb-12">
            My most requested and beloved designs.
          </p>

          {error && <p className="text-center text-red-500">Error loading styles: {error.message}</p>}
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredStyles?.map((style) => (
              <StyleCard key={style.id} style={style} whatsappNumber={settings.whatsapp_number} />
            ))}
          </div>
          
          <div className="flex justify-center mt-12">
            <Link href="/services">
              <Button variant="primary" className="px-8 py-4 text-lg">
                View All Services
                <ArrowRight className='h-5 w-5 ml-2'/>
              </Button>
            </Link>
          </div>
        </section>

        <hr className="my-16 border-soft-gold/30" />

        {/* 3. About Snippet */}
        <section className="text-center py-8">
          <h2 className="text-4xl font-serif font-bold text-deep-violet mb-4">
            The HairByTofunmi Process
          </h2>
          <p className="text-lg text-deep-violet/80 max-w-4xl mx-auto">
            From initial consultation via WhatsApp to the final look, I ensure a luxurious and relaxing experience. We discuss your hair goals, pre-prep, and aftercare, guaranteeing you leave feeling beautiful and confident. **Quality materials and gentle hands are always guaranteed.**
          </p>
          <div className="mt-8">
             <Link href="/about">
              <Button variant="outline" className="text-sm">
                Learn More About Me
              </Button>
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
