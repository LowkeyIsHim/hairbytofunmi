'use client';
import Link from 'next/link';
import { Menu, X, Instagram, TikTok, Mail } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getWhatsAppLink } from '@/lib/constants';

// Fetches settings on the client side (useEffect) or assumes it's passed down
export default function Header({ settings }) {
  const [isOpen, setIsOpen] = useState(false);
  const whatsappLink = getWhatsAppLink(settings?.whatsapp_number || '2348012345678', 'Hello Tofunmi, I would like to book an appointment.');

  const navItems = [
    { name: 'Services', href: '/services' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  useEffect(() => {
    // Prevent scrolling when mobile menu is open
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const NavLink = ({ href, children }) => (
    <Link 
      href={href} 
      className="text-deep-violet hover:text-muted-lavender transition duration-300 font-medium py-2 lg:py-0"
      onClick={() => setIsOpen(false)}
    >
      {children}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 bg-cream-white bg-opacity-95 backdrop-blur-sm border-b border-soft-gold/30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <h1 className="text-3xl font-serif text-deep-violet font-bold tracking-tight transition duration-500 hover:text-muted-lavender">
              HairByTofunmi
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex lg:space-x-8 items-center">
            {navItems.map((item) => (
              <NavLink key={item.name} href={item.href}>
                {item.name}
              </NavLink>
            ))}
            <a 
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-4 px-4 py-2 text-sm font-semibold rounded-full text-cream-white bg-muted-lavender hover:bg-deep-violet transition duration-300 shadow-lg hover:shadow-premium transform hover:scale-[1.02]"
            >
                Book Now
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-deep-violet hover:text-muted-lavender transition duration-300 focus:outline-none focus:ring-2 focus:ring-muted-lavender rounded-md"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <div
        className={`fixed inset-0 z-40 bg-cream-white transition-transform duration-500 ease-in-out lg:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="pt-20 pb-4 space-y-4 flex flex-col items-center justify-center h-full">
          {navItems.map((item) => (
            <NavLink key={item.name} href={item.href}>
              <span className="text-3xl font-serif">{item.name}</span>
            </NavLink>
          ))}
          <a 
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 px-6 py-3 text-lg font-semibold rounded-full text-cream-white bg-muted-lavender hover:bg-deep-violet transition duration-300 shadow-xl"
              onClick={() => setIsOpen(false)}
          >
              Book on WhatsApp
          </a>

          <div className='flex space-x-6 pt-10'>
             <a href={settings?.tiktok_link || '#'} target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                <TikTok size={24} className='text-deep-violet hover:text-soft-gold transition'/>
             </a>
             <a href={settings?.email_link || '#'} aria-label="Email">
                <Mail size={24} className='text-deep-violet hover:text-soft-gold transition'/>
             </a>
             {/* Placeholder for Instagram (can be added to settings table later) */}
             <a href='#' target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram size={24} className='text-deep-violet hover:text-soft-gold transition'/>
             </a>
          </div>
        </div>
      </div>
    </header>
  );
}
