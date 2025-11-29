"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import ThemeSwitch from "./ThemeSwitch";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // If the user is on the admin dashboard, hide the public navbar
  if (pathname.includes('/admin')) return null;

  // Handle scroll effect: slight background/shadow on scroll
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

  // Utility function to check if a link is active
  const isActive = (href) => {
    // Check if path is exact match OR if it's the home page
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
    <nav 
      // Fixed position, high z-index, and responsive background based on scroll
      className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out font-lato ${
        scrolled 
          ? "bg-brand-cream/95 dark:bg-brand-dark/95 backdrop-blur-sm py-3 shadow-md dark:shadow-black/30 border-b border-brand-charcoal/10 dark:border-brand-charcoal/50" 
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center">
          
          {/* Logo Area (Wider on large screens for better signature look) */}
          <Link href="/" className="z-50">
            <div className={`transition-all duration-500 ${scrolled ? 'w-auto' : 'w-auto'}`}>
                <Logo />
            </div>
          </Link>

          {/* Desktop Menu - Centered & Spaced */}
          <div className="hidden md:flex space-x-10 items-center">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`
                  group relative text-sm uppercase tracking-[0.2em] font-medium 
                  transition-colors duration-300
                  ${
                    isActive(link.href)
                      ? "text-brand-gold" // Active link is Gold
                      : "text-brand-charcoal dark:text-brand-cream hover:text-brand-gold" // Inactive link is muted/creamy
                  }
                `}
              >
                {link.name}
                {/* Gold Underline Animation - only shows on hover for inactive, always for active */}
                <span 
                    className={`absolute -bottom-1 left-0 h-[1.5px] bg-brand-gold transition-all duration-300 
                      ${isActive(link.href) ? 'w-full' : 'w-0 group-hover:w-full'}
                    `}
                ></span>
              </Link>
            ))}
            
            {/* Call to Action Button - Subtle Gold Border/Text */}
            <Link 
                href="/contact#book" 
                className="
                  relative 
                  group 
                  overflow-hidden 
                  border border-brand-gold 
                  px-5 py-2 
                  text-sm 
                  uppercase 
                  font-bold
                  tracking-widest 
                  text-brand-gold
                  transition-colors 
                  duration-500
                "
            >
                {/* Subtler Background Wipe for Luxury Feel */}
                <span 
                    className="
                      absolute inset-0 
                      bg-brand-gold
                      transform 
                      scale-x-0 
                      origin-right 
                      transition-transform 
                      duration-500 
                      group-hover:scale-x-100 
                    "
                ></span>
                
                {/* Button Text */}
                <span className="relative z-10 transition-colors duration-500 group-hover:text-brand-dark">
                    Book Now
                </span>
            </Link>

            {/* Theme Switch */}
            <ThemeSwitch /> 
          </div>

          {/* Mobile Button & Theme Switch */}
          <div className="md:hidden flex items-center z-50">
            <ThemeSwitch /> 
            <button 
                onClick={() => setIsOpen(!isOpen)} 
                aria-label="Toggle Menu"
                className="text-brand-dark dark:text-brand-cream ml-4 p-1 transition-transform duration-300 hover:scale-110"
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>
    </nav>

    {/* Mobile Menu Overlay - Enhanced framer-motion transition */}
    <AnimatePresence>
      {isOpen && (
        <motion.div 
            initial={{ opacity: 0, scaleY: 0, originY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-brand-cream dark:bg-brand-dark z-40 flex flex-col items-center justify-center space-y-10"
        >
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`
                    text-4xl font-playfair 
                    ${isActive(link.href) ? 'text-brand-gold' : 'text-brand-dark dark:text-brand-cream hover:text-brand-gold'} 
                    transition-colors duration-300
                `}
              >
                {link.name}
              </Link>
            ))}
             <Link 
                href="/contact#book" 
                onClick={() => setIsOpen(false)} 
                className="mt-8 bg-brand-gold text-brand-dark hover:bg-brand-gold/80 transition-colors duration-300 px-10 py-3 uppercase tracking-widest font-bold text-base"
            >
                Book Appointment
            </Link>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
