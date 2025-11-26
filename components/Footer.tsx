import { Mail, Clock, MessageCircle } from 'lucide-react';
import Logo from './Logo';
import { useData } from '@/context/DataContext';

export default function Footer() {
  const { contact } = useData();
  const tiktokHandle = contact.tiktok.split('/').pop()?.replace('?', '');

  return (
    <footer className="bg-dark text-stone-300 py-16 mt-24">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-12 text-center md:text-left">
        
        {/* Brand & Bio */}
        <div className="md:col-span-2 flex flex-col items-center md:items-start">
          <div className="flex items-center gap-3 mb-4">
             <Logo className="w-10 h-10 text-primary" />
             <span className="font-serif text-3xl text-primary font-bold">HairByTofunmi</span>
          </div>
          <p className="text-sm leading-relaxed max-w-md text-stone-400">
            {contact.bio}
          </p>
        </div>

        {/* Operating Hours & Contact */}
        <div>
          <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-sm border-b border-primary/50 pb-2">Information</h4>
          <div className="flex items-center gap-2 mb-2">
            <Clock size={16} className="text-primary" />
            <span className="text-sm font-medium text-white">Hours:</span>
            <span className="text-sm text-stone-400">{contact.hours}</span>
          </div>
          <a href={`mailto:${contact.email}`} className="flex items-center gap-2 mb-2 hover:text-primary transition">
            <Mail size={16} className="text-primary" />
            <span className="text-sm">{contact.email}</span>
          </a>
          <a href={contact.tiktok} target="_blank" rel="noopener noreferrer" className="text-sm hover:text-primary transition block mt-2">
            TikTok: <span className="font-bold">@{tiktokHandle}</span>
          </a>
        </div>

        {/* Quick Booking */}
        <div className="flex flex-col items-center md:items-start">
           <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-sm border-b border-primary/50 pb-2">Book Appointment</h4>
           <p className="text-sm mb-6 text-stone-400">All bookings are handled personally via WhatsApp for optimal service.</p>
           <a 
            href={`https://wa.me/${contact.whatsapp}`} 
            target="_blank"
            className="flex items-center gap-2 bg-primary text-dark px-6 py-3 rounded-full font-bold hover:bg-white transition-colors shadow-lg"
           >
             <MessageCircle size={20} />
             Chat with Tofunmi
           </a>
        </div>
      </div>
      <div className="text-center text-xs text-stone-600 mt-16 border-t border-stone-800 pt-6">
        © {new Date().getFullYear()} HairByTofunmi. All rights reserved.
      </div>
    </footer>
  );
}
