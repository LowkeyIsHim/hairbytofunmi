"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./Logo"; // New Animated Logo
import { usePathname } from "next/navigation";
// Assuming you have a useAuth hook for authenticated links if needed
// import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  // const { user } = useAuth(); // Example: check for user

  if (pathname.includes('/admin')) return null;

  const links = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  // Utility to determine if a link is active
  const isActive = (href) => pathname === href;

  return (
    <nav 
      // Fixed, subtle transparency, soft shadow, defined height
      className="fixed top-0 w-full bg-brand-cream/95 dark:bg-brand-dark/95 backdrop-blur-sm z-50 shadow-md"
      style={{ height: 'var(--navbar-height)' }}
    >
      <div className="max-w-7xl mx-auto px-6 h-full">
        <div className="flex justify-between items-center h-full">
          {/* Logo - Integrated Animated Component */}
          <Link href="/" className="flex-shrink-0 py-2">
            <Logo className="w-36 md:w-48 h-full" color="text-brand-dark dark:text-brand-cream" />
          </Link>

          {/* Desktop Menu - Refined typography and hover/active states */}
          <div className="hidden md:flex space-x-10">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`
                  font-sans font-medium text-base tracking-widest uppercase transition-colors duration-200
                  ${isActive(link.href) 
                    ? 'text-brand-gold border-b-2 border-brand-gold' 
                    : 'text-brand-dark dark:text-brand-cream hover:text-brand-gold'
                  }
                `}
              >
                {link.name}
              </Link>
            ))}
            {/* Example Admin Link */}
            {/* {user && (
                <Link href="/admin" className="font-sans font-medium text-base tracking-widest uppercase transition-colors duration-200 text-brand-dark dark:text-brand-cream hover:text-brand-gold">
                    Admin
                </Link>
            )} */}
          </div>

          {/* Mobile Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="p-2 rounded-md text-brand-dark dark:text-brand-cream hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={{
          open: { height: "auto", opacity: 1 },
          closed: { height: 0, opacity: 0 },
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="md:hidden bg-brand-cream dark:bg-brand-dark absolute w-full overflow-hidden shadow-2xl"
      >
        <div className="px-4 pt-4 pb-8 space-y-6 flex flex-col items-center">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`
                text-2xl font-serif block transition-colors duration-200
                ${isActive(link.href) 
                    ? 'text-brand-gold' 
                    : 'text-brand-dark dark:text-brand-cream hover:text-brand-gold'
                }
              `}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </motion.div>
    </nav>
  );
      }
