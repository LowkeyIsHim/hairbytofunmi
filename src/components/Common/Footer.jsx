import Link from 'next/link';
import { Mail, Phone, Clock, TikTok, Instagram } from 'lucide-react';
import { getWhatsAppLink } from '@/lib/constants';

export default function Footer({ settings }) {
  const whatsappLink = getWhatsAppLink(settings?.whatsapp_number || '2348012345678', 'Hello Tofunmi, I would like to inquire about booking.');
  
  const navItems = [
    { name: 'Services', href: '/services' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Admin', href: '/admin' },
  ];

  return (
    <footer className="bg-deep-violet text-cream-white mt-16 border-t-8 border-soft-gold/50 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand and Tagline */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <h2 className="text-4xl font-serif font-bold text-soft-gold">HairByTofunmi</h2>
            <p className="text-sm text-cream-white/80">
              Elegance, Style, and Care.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-muted-lavender">Navigation</h3>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="text-cream-white/70 hover:text-soft-gold transition duration-300 text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Working Hours & Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-muted-lavender">Get in Touch</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2 text-cream-white/70">
                <Clock size={16} className="text-soft-gold" />
                <span>Hours: {settings?.working_hours || '9:00 AM — 7:00 PM'}</span>
              </div>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-cream-white/70 hover:text-soft-gold transition">
                <Phone size={16} className="text-soft-gold" />
                <span>WhatsApp Only</span>
              </a>
              <a href={settings?.email_link || '#'} className="flex items-center space-x-2 text-cream-white/70 hover:text-soft-gold transition">
                <Mail size={16} className="text-soft-gold" />
                <span>Email Inquiry</span>
              </a>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-muted-lavender">Follow</h3>
            <div className="flex space-x-4">
              <a href={settings?.tiktok_link || '#'} target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                <TikTok size={24} className="text-cream-white hover:text-soft-gold transition" />
              </a>
              {/* Placeholder for Instagram (can be added to settings table later) */}
              <a href='#' target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram size={24} className="text-cream-white hover:text-soft-gold transition" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 pt-6 border-t border-muted-lavender/30 text-center text-xs text-cream-white/50">
          <p>&copy; {new Date().getFullYear()} HairByTofunmi. All rights reserved. | Styled with Elegance.</p>
        </div>
      </div>
    </footer>
  );
}
