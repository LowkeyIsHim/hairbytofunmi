"use client";
import Link from 'next/link';
import Logo from './Logo';
import { useData } from '@/context/DataContext';

export default function Navbar() {
  const { isAuthenticated } = useData();

  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <Logo className="w-10 h-10 text-primary transition-transform group-hover:scale-105" />
            <div className="flex flex-col">
              <span className="font-serif text-xl font-bold text-stone-900 tracking-wide">HairByTofunmi</span>
              <span className="text-[10px] uppercase tracking-widest text-primary font-bold">Premium Stylist</span>
            </div>
          </Link>
          
          <div className="flex gap-6 items-center">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">Home</Link>
            {isAuthenticated ? (
               <Link href="/admin" className="text-sm font-medium bg-stone-900 text-white px-4 py-2 rounded-full">Dashboard</Link>
            ) : (
               <Link href="/login" className="text-xs text-stone-400 hover:text-primary">Admin</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
