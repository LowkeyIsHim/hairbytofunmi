import Link from 'next/link';
import { Mail, Clock, MessageCircle } from 'lucide-react';
import Logo from './Logo';
import { useData } from '@/context/DataContext';

export default function Footer() {
  const { contact } = useData();
  const tiktokHandle = contact.tiktok.split('/').pop()?.replace('?_r=1&_t=ZS-91ig71qDCE5', '');

  return (
    <footer className="bg-dark text-stone-300 py-16 mt-24">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-12 text-center md:text-left">
        
        {/* Brand & Mission */}
        <div className="md:col-span-2 flex flex-col items-center md:items-start">
          <Link href="/" className="flex items-center gap-3 mb-4">
             <Logo className="w-10 h-10 text-primary" />
             <span className="font-serif text-3xl text-primary font-bold">HairByTofunmi</span>
          </Link>
          <p className="text-sm leading-relaxed max-w-md text-stone-400">
            Transforming hair dreams into reality with elegance, style, and care. Book your premium experience today.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-sm border-b border-primary/50 pb-2">Navigation</h4>
          <ul className="space-y-2">
            <li><Link href="/portfolio" className="hover:text-primary transition text-sm">Styles Portfolio</Link></li>
            <li><Link href="/contact#about" className="hover:text-primary transition text-sm">Our Philosophy</Link></li>
            <li><Link href="/contact" className="hover:text-primary transition text-sm">Contact Information</Link></li>
          </ul>
        </div>

        {/* Contact & Hours */}
        <div className="flex flex-col items-center md:items-start">
           <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-sm border-b border-primary/50 pb-2">Information</h4>
          <div className="flex items-center gap-2 mb-2">
            <Clock size={16} className="text-primary" />
            <span className="text-sm font-medium text-white">Hours:</span>
          </div>
          <span className="text-sm text-stone-400 mb-4">{contact.hours}</span>

          <a href={`mailto:${contact.email}`} className="flex items-center gap-2 mb-2 hover:text-primary transition">
            <Mail size={16} className="text-primary" />
            <span className="text-sm">{contact.email}</span>
          </a>
           <a 
            href={`https://wa.me/${contact.whatsapp}`} 
            target="_blank"
            className="flex items-center gap-2 bg-primary text-dark px-4 py-2 rounded-full font-bold hover:bg-white transition-colors text-sm mt-4"
           >
             <MessageCircle size={16} />
             WhatsApp Booking
           </a>
        </div>
      </div>
      <div className="text-center text-xs text-stone-600 mt-16 border-t border-stone-800 pt-6">
        © {new Date().getFullYear()} HairByTofunmi. All rights reserved. | Developed by Gemini AI
      </div>
    </footer>
  );
}
