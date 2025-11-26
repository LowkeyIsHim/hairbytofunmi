import WhatsAppButton from './WhatsAppButton';

export default function HeroSection({ settings }) {
  return (
    <section className="relative overflow-hidden pt-20 pb-24 bg-cream-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Tagline and Headline */}
        <p className="text-soft-gold text-lg font-semibold tracking-wider uppercase mb-3">
          Elevate Your Look
        </p>
        <h1 className="text-6xl sm:text-7xl lg:text-8xl font-serif font-extrabold text-deep-violet leading-tight mb-6 animate-fadeInDown">
          HairByTofunmi
        </h1>
        <h2 className="text-xl sm:text-2xl text-muted-lavender max-w-3xl mx-auto mb-10 font-light italic">
          "{settings?.stylist_bio || 'Transforming hair dreams into reality with elegance, style, and care. Specializing in braids, twists, curls, and more.'}"
        </h2>

        {/* CTA Button */}
        <div className="flex justify-center">
          <WhatsAppButton 
            styleName="general inquiry" 
            whatsappNumber={settings?.whatsapp_number || '2348012345678'} 
          />
        </div>
      </div>
      {/* Elegant background texture/effect can be added here */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10 bg-[url('/path/to/elegant-texture.svg')]"></div>
    </section>
  );
}
