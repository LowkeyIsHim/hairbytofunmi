import { CONTACT_INFO } from '@/lib/initialData';
import { Instagram, Mail, Clock } from 'lucide-react';

// Note: Using Lucide-React for icons. If icons fail to load, ensure lucide-react is installed.

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8 text-center md:text-left">
        
        {/* Brand */}
        <div>
          <h3 className="font-serif text-2xl text-primary mb-4">HairByTofunmi</h3>
          <p className="text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
            Transforming hair dreams into reality with elegance and style. 
            Premium styling services for the modern woman.
          </p>
        </div>

        {/* Contact */}
        <div className="flex flex-col items-center md:items-start">
          <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-xs">Contact</h4>
          <a href={CONTACT_INFO.tiktok} target="_blank" className="flex items-center gap-2 mb-2 hover:text-primary transition">
            <span className="text-sm">TikTok: @hairbytofunmi_21</span>
          </a>
          <a href={`mailto:${CONTACT_INFO.email}`} className="flex items-center gap-2 mb-2 hover:text-primary transition">
            <Mail size={16} />
            <span className="text-sm">{CONTACT_INFO.email}</span>
          </a>
          <div className="flex items-center gap-2">
            <Clock size={16} />
            <span className="text-sm">{CONTACT_INFO.hours}</span>
          </div>
        </div>

        {/* Quick Booking */}
        <div className="flex flex-col items-center md:items-start">
           <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-xs">Book Now</h4>
           <p className="text-xs mb-4 text-stone-400">All appointments are scheduled via WhatsApp.</p>
           <a 
            href={`https://wa.me/${CONTACT_INFO.whatsapp}`} 
            className="bg-primary text-stone-900 px-6 py-3 rounded-full font-bold hover:bg-white transition-colors"
           >
             Chat on WhatsApp
           </a>
        </div>
      </div>
      <div className="text-center text-xs text-stone-600 mt-12 border-t border-stone-800 pt-6">
        © {new Date().getFullYear()} HairByTofunmi. All rights reserved.
      </div>
    </footer>
  );
}
