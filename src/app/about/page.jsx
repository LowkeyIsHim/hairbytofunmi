import { Heart, Star, Zap } from 'lucide-react';
import { getSettings } from '@/lib/supabase';

export const metadata = {
  title: 'About HairByTofunmi | My Mission & Process',
  description: 'Learn about Tofunmi, her passion for hairstyling, and the bespoke, elegant process used to deliver protective and beautiful looks.',
};

export default async function AboutPage() {
  const settings = await getSettings();

  const processSteps = [
    { icon: Zap, title: "Virtual Consultation", description: "All bookings start on WhatsApp. We discuss your desired style, hair health, and schedule." },
    { icon: Star, title: "Bespoke Styling", description: "I dedicate myself to crafting your look with precision, using the highest quality techniques and gentle handling." },
    { icon: Heart, title: "Aftercare & Confidence", description: "You leave with a stunning, durable style and personalized aftercare instructions. It's about a complete transformation." },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fadeIn">
      <header className="text-center mb-16">
        <h1 className="text-6xl font-serif font-extrabold text-deep-violet mb-4">
          Meet Tofunmi
        </h1>
        <p className="text-xl text-muted-lavender max-w-3xl mx-auto">
          The heart and hands behind the elegance.
        </p>
      </header>

      {/* Stylist Bio and Image */}
      <section className="bg-white rounded-xl shadow-premium p-8 lg:p-12 mb-16 flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-2/3 space-y-4">
          <h2 className="text-4xl font-serif font-bold text-deep-violet">My Passion, Your Crown</h2>
          <p className="text-lg text-deep-violet/90 leading-relaxed">
            {settings?.stylist_bio}
          </p>
          <p className="text-muted-lavender italic pt-4">
            — Tofunmi, Lead Stylist & Founder
          </p>
        </div>
        <div className="w-full lg:w-1/3 aspect-square relative rounded-lg overflow-hidden shadow-2xl flex-shrink-0">
          {/* Placeholder for Headshot - Stylist needs to provide an image URL */}
          <div className="bg-soft-gold/30 h-full w-full flex items-center justify-center text-deep-violet/50 text-center p-4">
            [Stylist Headshot Placeholder]<br/>(Replace with image URL in Admin Panel Settings)
          </div>
        </div>
      </section>

      {/* The Styling Process */}
      <section className="text-center">
        <h2 className="text-5xl font-serif font-bold text-deep-violet mb-12">
          The Bespoke Styling Process
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {processSteps.map((step, index) => (
            <div key={index} className="space-y-4 p-6 bg-subtle-gray/50 rounded-lg transition duration-300 hover:bg-subtle-gray">
              <step.icon size={40} className="mx-auto text-soft-gold mb-2" />
              <h3 className="text-2xl font-serif font-bold text-deep-violet">{step.title}</h3>
              <p className="text-deep-violet/80">{step.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
