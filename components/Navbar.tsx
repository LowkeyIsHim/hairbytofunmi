"use client";
import Link from 'next/link';
import Logo from './Logo';
import { useData } from '@/context/DataContext';

export default function Navbar() {
  const { isAuthenticated, contact } = useData();

  return (
    <nav className="sticky top-0 w-full z-50 bg-secondary/90 backdrop-blur-sm border-b border-stone-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <Logo className="w-10 h-10 text-primary transition-transform duration-300 group-hover:rotate-6" />
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold text-dark tracking-wider">HairByTofunmi</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-primary font-medium">Premium Styling</span>
            </div>
          </Link>
          
          <div className="flex gap-6 items-center">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors hidden sm:block">Styles</Link>
            <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" className="text-sm font-medium text-dark hover:text-primary transition-colors hidden sm:block">Book Now</a>
            {isAuthenticated ? (
               <Link href="/admin" className="text-sm font-medium bg-dark text-white px-4 py-2 rounded-full hover:bg-primary hover:text-dark transition-colors">Dashboard</Link>
            ) : (
               <Link href="/login" className="text-xs text-stone-400 hover:text-primary/70 transition-colors">Admin</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
