import Image from 'next/image';
import { getAllStyles, getSettings } from '@/lib/data';
import WhatsappButton from '@/components/ui/WhatsappButton';
import Button from '@/components/ui/Button';
import StyleCard from '@/components/StyleCard';
import Link from 'next/link';
import { colors } from '@/styles/theme';

export default async function Home() {
  const styles = await getAllStyles();
  const settings = await getSettings();
  
  // Display up to 3 featured styles, or just the first 3 if none are marked
  const featuredStyles = styles.filter(s => s.is_featured).slice(0, 3) || styles.slice(0, 3);

  return (
    <div className="space-y-20 md:space-y-32">
      {/* --- HERO SECTION --- */}
      <section className="relative h-[80vh] flex items-center justify-center text-center px-4">
        <Image
          src="/hero-background-placeholder.jpg" // Placeholder for a key visual
          alt="Elegant hair background image"
          fill
          className="object-cover brightness-75"
          priority
        />
        <div className="relative z-10 p-6 bg-white bg-opacity-90 rounded-2xl max-w-3xl shadow-2xl backdrop-blur-sm">
          <h1 className="text-6xl md:text-8xl font-serif font-extrabold text-[${colors.primary}] mb-4 animate-fadeInDown">
            HairByTofunmi
          </h1>
          <p className="text-xl md:text-2xl font-semibold text-[${colors.text}] mb-6">
            Transforming hair dreams into reality with elegance, style, and care.
          </p>
          <WhatsappButton className="mx-auto" />
        </div>
      </section>

      {/* --- FEATURED STYLES --- */}
      {featuredStyles.length > 0 && (
        <section className="container mx-auto px-4">
          <h2 className="text-4xl font-serif font-bold text-center mb-12">Featured Elegance</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredStyles.map((style) => (
              <StyleCard key={style.id} style={style} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/services">
              <Button variant="ghost">View All Services</Button>
            </Link>
          </div>
        </section>
      )}

      {/* --- SHORT BIO / CTA --- */}
      <section className={`bg-[${colors.accent}] py-16`}>
        <div className="container mx-auto px-4 max-w-4xl text-center space-y-6">
          <h2 className="text-3xl font-serif font-bold text-[${colors.deepViolet}]">The Stylist&apos;s Promise</h2>
          <p className="text-lg text-text leading-relaxed">
            {settings.stylist_bio}
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <WhatsappButton />
            <Link href="/about">
              <Button variant="secondary">Meet Tofunmi</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
