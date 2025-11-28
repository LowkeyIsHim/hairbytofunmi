"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

export default function Footer() {
  const pathname = usePathname();
  if (pathname.includes('/admin')) return null;

  return (
    <footer className="bg-brand-dark text-brand-cream py-20 border-t border-brand-gold/20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
        
        {/* Column 1: Brand */}
        <div className="flex flex-col items-center md:items-start space-y-4">
             {/* Pass isDark=true so the logo turns white/gold */}
            <Logo className="w-48" isDark={true} />
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto md:mx-0 font-light">
                Crafting bespoke hair experiences for the modern woman. 
                Based in Lagos, Nigeria.
            </p>
        </div>

        {/* Column 2: Navigation */}
        <div className="flex flex-col space-y-4 pt-4">
            <h4 className="font-serif text-xl text-brand-gold mb-2">Explore</h4>
            <Link href="/services" className="text-sm uppercase tracking-widest hover:text-brand-gold transition-colors">Services</Link>
            <Link href="/portfolio" className="text-sm uppercase tracking-widest hover:text-brand-gold transition-colors">Portfolio</Link>
            <Link href="/about" className="text-sm uppercase tracking-widest hover:text-brand-gold transition-colors">The Stylist</Link>
        </div>

        {/* Column 3: Contact */}
        <div className="flex flex-col space-y-4 pt-4">
            <h4 className="font-serif text-xl text-brand-gold mb-2">Connect</h4>
            <a href="mailto:info@hairbytofunmi.com" className="text-gray-300 hover:text-white transition-colors font-light">info@hairbytofunmi.com</a>
            <p className="text-gray-300 font-light">+234 800 000 0000</p>
            
            {/* Social Icons Placeholder */}
            <div className="flex justify-center md:justify-start space-x-4 mt-4">
                <div className="w-8 h-8 rounded-full border border-gray-600 hover:border-brand-gold cursor-pointer transition-colors"></div>
                <div className="w-8 h-8 rounded-full border border-gray-600 hover:border-brand-gold cursor-pointer transition-colors"></div>
            </div>
        </div>
      </div>

      <div className="mt-16 text-center border-t border-gray-800 pt-8">
        <p className="text-xs text-gray-600 tracking-widest uppercase">
          © {new Date().getFullYear()} HairByTofunmi. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
