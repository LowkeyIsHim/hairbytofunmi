// src/app/page.jsx
import { getSettings, getStyles } from '@/lib/supabase';
import WhatsAppButton from '@/components/shared/WhatsAppButton';
import ServiceCard from '@/components/ui/ServiceCard';
import { BsArrowRight } from 'react-icons/bs';
import Link from 'next/link';
import { motion } from 'framer-motion';

export const metadata = {
  title: 'Home',
};

export default async function HomePage() {
  const [styles, settings] = await Promise.all([getStyles(), getSettings()]);
  const featuredStyles = styles.filter(s => s.is_featured).slice(0, 4);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <section className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-6xl md:text-8xl font-serif font-extrabold text-deep-violet mb-4">
          HairByTofunmi
        </h1>
        <p className="text-xl md:text-2xl font-serif text-rose-gold mb-8">
          The Art of Elegant Styling
        </p>
        
        <p className="max-w-3xl mx-auto text-lg text-gray-600 mb-10">
          {settings.stylist_bio}
        </p>

        <div className="flex justify-center space-x-6">
          <WhatsAppButton styleName="my desired style" className="shadow-2xl hover:shadow-xl" />
          <Link href="/portfolio" passHref>
            <motion.div whileHover={{ scale: 1.05 }}>
              <button className="px-8 py-3 rounded-lg text-deep-violet border-2 border-deep-violet font-bold hover:bg-deep-violet hover:text-white transition-colors duration-300">
                View Portfolio
              </button>
            </motion.div>
          </Link>
        </div>
      </section>

      {/* Featured Styles Section */}
      <section className="py-16 bg-off-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-serif font-bold text-center text-deep-violet mb-12">
            Featured Styles
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredStyles.map((style) => (
              <ServiceCard key={style.id} style={style} isFeatured={true} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/services" passHref>
              <motion.div whileHover={{ x: 5 }}>
                <div className="text-lg font-semibold text-rose-gold hover:text-deep-violet flex items-center justify-center space-x-2 transition-all duration-300">
                  <span>View All Services</span>
                  <BsArrowRight />
                </div>
              </motion.div>
            </Link>
          </div>
        </div>
      </section>

      {/* Booking Process Teaser */}
       <section className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-serif font-bold text-center text-deep-violet mb-12">
          Your Experience
        </h2>
        <div className="flex flex-wrap justify-center text-center">
          <div className="w-full md:w-1/3 p-4">
            <h3 className="text-2xl font-serif font-semibold text-rose-gold mb-2">1. Select</h3>
            <p className="text-gray-600">Browse our elegant portfolio and services to find your perfect style.</p>
          </div>
          <div className="w-full md:w-1/3 p-4">
            <h3 className="text-2xl font-serif font-semibold text-rose-gold mb-2">2. Book</h3>
            <p className="text-gray-600">Click the 'Book on WhatsApp' button to secure your appointment instantly.</p>
          </div>
          <div className="w-full md:w-1/3 p-4">
            <h3 className="text-2xl font-serif font-semibold text-rose-gold mb-2">3. Transform</h3>
            <p className="text-gray-600">Experience a premium service and walk away with your hair dreams realized.</p>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
