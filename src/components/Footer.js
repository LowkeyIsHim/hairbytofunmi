// src/components/Footer.js (Upgraded)

"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { Mail, Phone, Instagram, Send, Star } from "lucide-react"; // Added Icons

// VVIP Contact Details
const CONTACT = {
    WHATSAPP: "+2349021280216",
    EMAIL: "kofoworoladickson@gmail.com",
    TIKTOK_URL: "https://www.tiktok.com/@hairbytofunmi_21?_r=1&_t=ZS-91my2ydObNw",
};

export default function Footer() {
  const pathname = usePathname();
  if (pathname.includes('/admin')) return null;

  return (
    // Ensure dark background for maximum contrast and luxury feel
    <footer className="bg-brand-dark text-brand-cream py-20 border-t border-brand-gold/30">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
        
        {/* Column 1: Brand & Commitment */}
        <div className="flex flex-col items-center md:items-start space-y-4">
             {/* Pass isDark=true so the logo turns cream/gold */}
            <Logo className="w-48" isDark={true} />
            <div className="flex items-center gap-2 text-brand-gold">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#C5A059" stroke="none" />)}
            </div>
            <p className="text-brand-charcoal/70 text-sm leading-relaxed max-w-xs mx-auto md:mx-0 font-light">
                Crafting **bespoke hair experiences** for the modern woman. 
                VVIP service guaranteed.
            </p>
        </div>

        {/* Column 2: Navigation */}
        <div className="flex flex-col space-y-3 pt-4">
            <h4 className="font-serif text-xl text-brand-gold mb-3 border-b border-brand-gold/30 pb-1 w-fit mx-auto md:mx-0">Explore</h4>
            <Link href="/services" className="text-sm uppercase tracking-widest hover:text-brand-gold transition-colors">Services</Link>
            <Link href="/portfolio" className="text-sm uppercase tracking-widest hover:text-brand-gold transition-colors">Portfolio</Link>
            <Link href="/about" className="text-sm uppercase tracking-widest hover:text-brand-gold transition-colors">The Stylist</Link>
            <Link href="/contact" className="text-sm uppercase tracking-widest hover:text-brand-gold transition-colors">Contact</Link>
        </div>

        {/* Column 3: Contact Details */}
        <div className="flex flex-col space-y-3 pt-4">
            <h4 className="font-serif text-xl text-brand-gold mb-3 border-b border-brand-gold/30 pb-1 w-fit mx-auto md:mx-0">Get In Touch</h4>
            
            {/* WhatsApp */}
            <a href={`https://wa.me/${CONTACT.WHATSAPP.replace(/\s/g, '')}`} className="flex items-center gap-3 text-brand-cream/80 hover:text-brand-gold transition-colors font-light">
                <Phone size={16} className="text-brand-gold"/> 
                {CONTACT.WHATSAPP}
            </a>

            {/* Email */}
            <a href={`mailto:${CONTACT.EMAIL}`} className="flex items-center gap-3 text-brand-cream/80 hover:text-brand-gold transition-colors font-light">
                <Mail size={16} className="text-brand-gold"/> 
                {CONTACT.EMAIL}
            </a>
            
            {/* Booking Link */}
            <a href={`https://wa.me/${CONTACT.WHATSAPP.replace(/\s/g, '')}`} className="text-sm uppercase tracking-widest text-brand-gold pt-2 hover:opacity-80 transition-opacity">
                Book Appointment
            </a>
        </div>

         {/* Column 4: Social Media */}
        <div className="flex flex-col space-y-4 pt-4">
            <h4 className="font-serif text-xl text-brand-gold mb-2 border-b border-brand-gold/30 pb-1 w-fit mx-auto md:mx-0">Follow Us</h4>
            
            {/* Social Icons */}
            <div className="flex justify-center md:justify-start space-x-4 mt-4">
                {/* TikTok Icon */}
                <a href={CONTACT.TIKTOK_URL} target="_blank" rel="noopener noreferrer" className="p-2 border border-brand-gold/50 rounded-full text-brand-gold hover:bg-brand-gold hover:text-brand-dark transition-colors duration-300">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
                </a>
                
                {/* Instagram Icon Placeholder */}
                <a href="#" target="_blank" rel="noopener noreferrer" className="p-2 border border-brand-gold/50 rounded-full text-brand-gold hover:bg-brand-gold hover:text-brand-dark transition-colors duration-300">
                    <Instagram size={20} />
                </a>
                
                {/* Threads/Other Placeholder */}
                <a href="#" target="_blank" rel="noopener noreferrer" className="p-2 border border-brand-gold/50 rounded-full text-brand-gold hover:bg-brand-gold hover:text-brand-dark transition-colors duration-300">
                    <Send size={20} />
                </a>
            </div>
        </div>
      </div>

      <div className="mt-16 text-center border-t border-brand-charcoal/50 pt-8">
        <p className="text-xs text-brand-charcoal/80 tracking-widest uppercase">
          © {new Date().getFullYear()} HairByTofunmi. All rights reserved. | Lagos, Nigeria.
        </p>
      </div>
    </footer>
  );
}
