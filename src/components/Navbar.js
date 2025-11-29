// src/components/Navbar.js (Updated)

"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import ThemeSwitch from "./ThemeSwitch"; // <-- NEW IMPORT
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  // ... (useState, useEffect, links array remain the same) ...
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
      // Background colors now use Tailwind's dark: utility classes
      className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${
        scrolled 
          ? "bg-brand-cream/95 dark:bg-brand-dark/95 backdrop-blur-md py-2 shadow-sm dark:shadow-lg dark:shadow-black/20" 
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center">
          
          {/* Logo Area */}
          <Link href="/" className="z-50">
            <div className={`transition-all duration-500 ${scrolled ? 'w-32' : 'w-40'}`}>
                <Logo />
            </div>
          </Link>

          {/* Desktop Menu - Centered & Spaced */}
          <div className="hidden md:flex space-x-8 items-center"> {/* Reduced space-x to fit ThemeSwitch */}
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="group relative text-xs uppercase tracking-[0.2em] text-brand-dark dark:text-brand-cream hover:text-brand-gold transition-colors duration-300"
              >
                {link.name}
                {/* Gold Underline Animation */}
                <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-brand-gold transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
            
            {/* The Theme Switch is Placed Here */}
            <ThemeSwitch /> 
            
            {/* Call to Action Button */}
            <Link 
                href="/book" 
                className="
                  relative 
                  group 
                  overflow-hidden 
                  border border-brand-dark dark:border-brand-cream 
                  px-6 py-2 
                  text-xs 
                  uppercase 
                  tracking-[0.2em] 
                  text-brand-dark dark:text-brand-cream
                  transition-colors 
                  duration-500
                "
            >
                {/* Gold Hover Background Wipe */}
                <span 
                    className="
                      absolute inset-0 
                      bg-brand-dark dark:bg-brand-cream
                      transform 
                      scale-x-0 
                      origin-right 
                      transition-transform 
                      duration-500 
                      group-hover:scale-x-100 
                      group-hover:origin-left
                    "
                ></span>
                
                {/* Button Text */}
                <span className="relative z-10 transition-colors duration-500 group-hover:text-brand-cream dark:group-hover:text-brand-dark">
                    Book Now
                </span>
            </Link>
          </div>

          {/* Mobile Button */}
          <div className="md:hidden flex items-center z-50">
             {/* Place the switch in the mobile menu area too */}
            <ThemeSwitch /> 
            <button onClick={() => setIsOpen(!isOpen)} className="text-brand-dark dark:text-brand-cream ml-4">
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
            className="fixed inset-0 bg-brand-cream dark:bg-brand-dark z-40 flex flex-col items-center justify-center space-y-8"
        >
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-3xl font-serif text-brand-dark dark:text-brand-cream hover:text-brand-gold italic"
              >
                {link.name}
              </Link>
            ))}
             <Link 
                href="/book" 
                onClick={() => setIsOpen(false)} 
                className="mt-8 bg-brand-dark dark:bg-brand-cream text-brand-cream dark:text-brand-dark px-8 py-3 uppercase tracking-widest text-sm"
            >
                Book Appointment
            </Link>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
