"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  if (pathname.includes('/admin')) return null;

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Services", href: "/services" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${
        scrolled ? "bg-brand-cream/95 backdrop-blur-md py-2 shadow-sm" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center">
          
          {/* Logo Area */}
          <Link href="/" className="z-50">
            {/* We scale the logo down slightly on scroll for a smooth effect */}
            <div className={`transition-all duration-500 ${scrolled ? 'w-32' : 'w-40'}`}>
                <Logo />
            </div>
          </Link>

          {/* Desktop Menu - Centered & Spaced */}
          <div className="hidden md:flex space-x-12 items-center">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="group relative text-xs uppercase tracking-[0.2em] text-brand-dark hover:text-brand-gold transition-colors duration-300"
              >
                {link.name}
                {/* Gold Underline Animation */}
                <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-brand-gold transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
            
            {/* Call to Action Button */}
            <Link href="/book" className="border border-brand-dark px-6 py-2 text-xs uppercase tracking-[0.2em] hover:bg-brand-dark hover:text-brand-cream transition-all duration-300">
                Book Now
            </Link>
          </div>

          {/* Mobile Button */}
          <div className="md:hidden flex items-center z-50">
            <button onClick={() => setIsOpen(!isOpen)} className="text-brand-dark">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
    </nav>

    {/* Mobile Menu Overlay */}
    <AnimatePresence>
      {isOpen && (
        <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-brand-cream z-40 flex flex-col items-center justify-center space-y-8"
        >
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-3xl font-serif text-brand-dark hover:text-brand-gold italic"
              >
                {link.name}
              </Link>
            ))}
             <Link href="/book" onClick={() => setIsOpen(false)} className="mt-8 bg-brand-dark text-brand-cream px-8 py-3 uppercase tracking-widest text-sm">
                Book Appointment
            </Link>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
