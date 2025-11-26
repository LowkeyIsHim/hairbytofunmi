"use client";
import Link from 'next/link';
import Logo from './Logo';
import { useData } from '@/context/DataContext';

export default function Navbar() {
  const { isAuthenticated, contact } = useData();

  const navItems = [
    { name: 'Styles', href: '/portfolio' },
    { name: 'About', href: '/contact#about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="sticky top-0 w-full z-50 bg-secondary/90 backdrop-blur-md border-b border-stone-100 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <Logo className="w-10 h-10 text-primary transition-transform duration-500 group-hover:scale-105" />
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold text-dark tracking-wider">HairByTofunmi</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-primary font-medium">Premium Stylist</span>
            </div>
          </Link>
          
          <div className="flex gap-6 items-center">
            <div className="hidden md:flex gap-8">
                {navItems.map(item => (
                    <Link key={item.name} href={item.href} className="text-sm font-medium hover:text-primary transition-colors">
                        {item.name}
                    </Link>
                ))}
            </div>
            
            {isAuthenticated ? (
               <Link href="/admin" className="text-sm font-medium bg-dark text-white px-4 py-2 rounded-full hover:bg-primary hover:text-dark transition-colors">Dashboard</Link>
            ) : (
               <Link href="/login" className="text-xs text-stone-400 hover:text-primary/70 transition-colors hidden md:block">Admin</Link>
            )}
            
             <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" className="md:hidden bg-primary text-dark p-2 rounded-full hover:bg-dark hover:text-white transition-colors">
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle"><path d="M7.9 20A10 10 0 1 0 5 15l-2 5z"/></svg>
             </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
