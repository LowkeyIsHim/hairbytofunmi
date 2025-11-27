"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo"; // Use the new Logo component

export default function Footer() {
  const pathname = usePathname();
  if (pathname.includes('/admin')) return null;

  return (
    <footer className="bg-brand-cream dark:bg-brand-dark border-t border-gray-200 dark:border-gray-700 py-16">
      <div className="page-container text-center">
        
        {/* Logo and Brand */}
        <div className="flex justify-center mb-8">
            <Logo className="w-32 h-10" color="text-brand-dark dark:text-brand-cream" />
        </div>

        <p className="font-serif text-2xl mb-4 text-brand-dark dark:text-brand-cream">
            HairByTofunmi
        </p>
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto font-sans text-lg">
          Mastering the art of protective styling with care, precision, and enduring elegance.
        </p>
        
        {/* Navigation Links */}
        <div className="flex justify-center space-x-8 text-sm md:text-base font-medium tracking-wider uppercase text-gray-700 dark:text-gray-300">
            <Link href="/services" className="hover:text-brand-gold transition-colors duration-200">Services</Link>
            <Link href="/portfolio" className="hover:text-brand-gold transition-colors duration-200">Portfolio</Link>
            <Link href="/contact" className="hover:text-brand-gold transition-colors duration-200">Contact</Link>
            <Link href="/admin/login" className="hover:text-brand-gold transition-colors duration-200">Admin Login</Link>
        </div>
        
        {/* Copyright */}
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-12 font-sans">
          © {new Date().getFullYear()} HairByTofunmi. All rights reserved.
        </p>
      </div>
    </footer>
  );
          }
