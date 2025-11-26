import WhatsAppButton from '@/components/Common/WhatsAppButton';
import { getSettings } from '@/lib/supabase';
import { Clock, Phone, Mail, TikTok, MapPin } from 'lucide-react';

export const metadata = {
  title: 'Contact | HairByTofunmi - Book via WhatsApp',
  description: 'Reach out to HairByTofunmi to book your appointment. View our working hours and social media links. All bookings are handled exclusively on WhatsApp.',
};

export default async function ContactPage() {
  const settings = await getSettings();

  const contactItems = [
    { 
      icon: Clock, 
      title: "Working Hours", 
      value: settings?.working_hours || '9:00 AM — 7:00 PM', 
      href: null 
    },
    { 
      icon: Phone, 
      title: "Bookings & Inquiries", 
      value: "WhatsApp Only", 
      href: `https://wa.me/${settings?.whatsapp_number || '2348012345678'}?text=Hello%20Tofunmi,%20I%20would%20like%20to%20book%20an%20appointment.`, 
      isExternal: true 
    },
    { 
      icon: Mail, 
      title: "Email", 
      value: "hello@hairbytofunmi.com", 
      href: settings?.email_link || 'mailto:hello@hairbytofunmi.com' 
    },
    { 
      icon: MapPin, 
      title: "Location", 
      value: "Private Studio (No Walk-ins)", 
      description: "Full address provided upon booking confirmation."
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fadeIn">
      <header className="text-center mb-16">
        <h1 className="text-6xl font-serif font-extrabold text-deep-violet mb-4">
          Connect & Book
        </h1>
        <p className="text-xl text-muted-lavender max-w-3xl mx-auto">
          All appointments and detailed inquiries are handled exclusively via WhatsApp to ensure a quick and personalized response.
        </p>
      </header>

      {/* Contact Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {contactItems.map((item, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-premium space-y-3 border-l-4 border-muted-lavender transition duration-300 hover:border-soft-gold">
            <item.icon size={32} className="text-soft-gold" />
            <h2 className="text-2xl font-serif font-bold text-deep-violet">{item.title}</h2>
            {item.href ? (
              <a 
                href={item.href} 
                target={item.isExternal ? "_blank" : "_self"} 
                rel={item.isExternal ? "noopener noreferrer" : ""}
                className="text-muted-lavender hover:text-deep-violet hover:underline font-medium block"
              >
                {item.value}
              </a>
            ) : (
              <p className="text-deep-violet font-medium">{item.value}</p>
            )}
            {item.description && <p className='text-deep-violet/70 text-sm'>{item.description}</p>}
          </div>
        ))}
      </div>

      {/* Main CTA */}
      <div className="text-center mt-16">
        <WhatsAppButton 
          styleName="general inquiry" 
          whatsappNumber={settings?.whatsapp_number || '2348012345678'} 
        />
        <p className="mt-4 text-sm text-deep-violet/70">
          Click above to start your booking conversation now.
        </p>
      </div>

      {/* Socials */}
      <div className="mt-16 pt-12 border-t border-subtle-gray text-center">
        <h3 className="text-2xl font-serif font-bold text-deep-violet mb-6">Follow My Work</h3>
        <div className="flex justify-center space-x-6">
          <a href={settings?.tiktok_link || '#'} target="_blank" rel="noopener noreferrer" aria-label="TikTok">
            <TikTok size={32} className="text-deep-violet hover:text-soft-gold transition transform hover:scale-110" />
          </a>
          <a href='#' target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            {/* Placeholder for Instagram (can be added to settings table later) */}
            <Instagram size={32} className="text-deep-violet hover:text-soft-gold transition transform hover:scale-110" />
          </a>
        </div>
      </div>
    </div>
  );
}
