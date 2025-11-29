"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { Mail, Phone, Instagram, Send, Star } from "lucide-react";

// VVIP Contact Details
const CONTACT = {
    WHATSAPP: "+2349021280216",
    EMAIL: "kofoworoladickson@gmail.com",
    INSTAGRAM_URL: "https://www.instagram.com/hairbytofunmi", // Placeholder assumed
    TIKTOK_URL: "https://www.tiktok.com/@hairbytofunmi_21?_r=1&_t=ZS-91my2ydObNw",
};

export default function Footer() {
  const pathname = usePathname();
  if (pathname.includes('/admin')) return null;

  return (
    // Uses brand-dark background for high-contrast luxury feel
    <footer className="bg-brand-dark text-brand-cream py-20 border-t border-brand-gold/30">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center md:text-left">
        
        {/* Column 1: Brand & Commitment (Refined Typography) */}
        <div className="flex flex-col items-center lg:items-start space-y-4">
            {/* The Logo component handles its own dark/light coloring based on the surrounding parent */}
            <Logo className="w-56" /> 
            <div className="flex items-center gap-2 text-brand-gold">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#C5A059" stroke="none" />)}
            </div>
            <p className="text-brand-cream/70 text-sm leading-relaxed max-w-xs mx-auto lg:mx-0 font-lato">
                Crafting **bespoke hair experiences** for the modern woman. 
                VVIP service guaranteed.
            </p>
        </div>

        {/* Column 2: Navigation (Refined Typography) */}
        <div className="flex flex-col space-y-3 pt-4">
            <h4 className="font-playfair text-xl text-brand-gold mb-3 border-b border-brand-gold/30 pb-1 w-fit mx-auto lg:mx-0">Explore</h4>
            <Link href="/services" className="text-sm uppercase tracking-widest text-brand-cream/80 hover:text-brand-gold transition-colors font-lato">Services</Link>
            <Link href="/portfolio" className="text-sm uppercase tracking-widest text-brand-cream/80 hover:text-brand-gold transition-colors font-lato">Portfolio</Link>
            <Link href="/about" className="text-sm uppercase tracking-widest text-brand-cream/80 hover:text-brand-gold transition-colors font-lato">The Stylist</Link>
            <Link href="/contact" className="text-sm uppercase tracking-widest text-brand-cream/80 hover:text-brand-gold transition-colors font-lato">Contact</Link>
        </div>

        {/* Column 3: Contact Details (Refined Layout) */}
        <div className="flex flex-col space-y-4 pt-4">
            <h4 className="font-playfair text-xl text-brand-gold mb-3 border-b border-brand-gold/30 pb-1 w-fit mx-auto lg:mx-0">Get In Touch</h4>
            
            {/* WhatsApp */}
            <a href={`https://wa.me/${CONTACT.WHATSAPP.replace(/\s/g, '')}`} className="flex items-center justify-center lg:justify-start gap-3 text-brand-cream/80 hover:text-brand-gold transition-colors font-lato">
                <Phone size={18} className="text-brand-gold flex-shrink-0"/> 
                {CONTACT.WHATSAPP}
            </a>

            {/* Email */}
            <a href={`mailto:${CONTACT.EMAIL}`} className="flex items-center justify-center lg:justify-start gap-3 text-brand-cream/80 hover:text-brand-gold transition-colors font-lato">
                <Mail size={18} className="text-brand-gold flex-shrink-0"/> 
                {CONTACT.EMAIL}
            </a>
            
            {/* Booking Link (High visibility CTA) */}
            <Link href="/contact" className="text-base uppercase tracking-widest font-bold text-brand-gold pt-2 hover:opacity-80 transition-opacity font-lato">
                Book Appointment
            </Link>
        </div>

         {/* Column 4: Social Media (Refined Look) */}
        <div className="flex flex-col space-y-4 pt-4">
            <h4 className="font-playfair text-xl text-brand-gold mb-2 border-b border-brand-gold/30 pb-1 w-fit mx-auto lg:mx-0">Connect</h4>
            
            {/* Social Icons */}
            <div className="flex justify-center lg:justify-start space-x-4 mt-4">
                {/* Instagram Icon */}
                <a href={CONTACT.INSTAGRAM_URL || "#"} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="p-3 border border-brand-gold/50 rounded-full text-brand-gold hover:bg-brand-gold hover:text-brand-dark transition-all duration-300">
                    <Instagram size={20} />
                </a>
                
                {/* TikTok Icon */}
                <a href={CONTACT.TIKTOK_URL} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="p-3 border border-brand-gold/50 rounded-full text-brand-gold hover:bg-brand-gold hover:text-brand-dark transition-all duration-300">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
                </a>
                
                {/* Send (Placeholder for other, e.g., Threads or Pinterest) */}
                <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Send" className="p-3 border border-brand-gold/50 rounded-full text-brand-gold hover:bg-brand-gold hover:text-brand-dark transition-all duration-300">
                    <Send size={20} />
                </a>
            </div>
        </div>
      </div>

      {/* Copyright Line */}
      <div className="mt-16 text-center border-t border-brand-charcoal/50 pt-8">
        <p className="text-xs text-brand-cream/60 tracking-widest uppercase font-lato">
          © {new Date().getFullYear()} HairByTofunmi. All rights reserved. | Lagos, Nigeria.
        </p>
      </div>
    </footer>
  );
}
